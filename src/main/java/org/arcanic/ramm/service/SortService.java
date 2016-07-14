package org.arcanic.ramm.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import org.arcanic.ramm.compare.NoteComparator;
import org.arcanic.ramm.compare.SortedReferenceComparator;
import org.arcanic.ramm.document.Note;
import org.arcanic.ramm.document.NoteRef;
import org.arcanic.ramm.document.Reference;
import org.arcanic.ramm.repository.NoteRefRepository;
import org.arcanic.ramm.repository.ReferenceRepository;
import org.arcanic.ramm.sort.ConnectedReference;
import org.arcanic.ramm.sort.InclusiveReference;
import org.arcanic.ramm.sort.SortedReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SortService {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private NoteRefRepository noteRefService;

	// @Autowired
	// private NoteRepository noteService;

	@Autowired
	private ReferenceRepository referenceService;

	/**
	 * Sort notes by gathering their references to make a chain. Notes with the
	 * most references in common are next to each others.
	 *
	 * @return List<Note> the notes sorted by reference count.
	 */
	public List<Note> sortNotes(final Reference reference) {
		final LinkedList<Note> notes = new LinkedList<>();
		final List<NoteRef> refs = noteRefService.findByReference(reference);
		for (final NoteRef ref : refs) {
			final Note note = ref.getNote();
			note.setReferences(new ArrayList<>());
			final List<NoteRef> noteRefs = noteRefService.findByNote(note);
			for (final NoteRef noteRef : noteRefs) {
				note.getReferences().add(noteRef.getReference());
			}
			notes.add(note);
		}
		// Sort notes in natural order by comparator.
		Collections.sort(notes, new NoteComparator());
		// Then reverse to have more important notes first.
		Collections.reverse(notes);
		return notes;
	}

	/**
	 * Sort references by gathering the notes to identify their types
	 * (connected, inclusive) and links.
	 *
	 * @return List<SortedReference> the reference sorted by note count.
	 */
	public List<SortedReference> sortReferences() {
		logger.debug("Calling BubbleController::sortReferences() :");
		final List<SortedReference> sortedRefs = new ArrayList<>();
		final List<Reference> references = referenceService.findAll();
		logger.debug("\tFound {} references : {}", references.size(), references.toString());
		for (final Reference reference : references) {
			logger.debug("\tProcessing reference {} with ID {} : ", reference, reference.getId());
			SortedReference sortedRef = new SortedReference(reference);
			// Fill notes and retrieve other references linked to each note.
			final List<NoteRef> noteRefs = noteRefService.findByReference(reference);
			logger.debug("\t\tFound {} noteRefs : {}", noteRefs.size(), noteRefs.toString());
			final List<Reference> otherRefs = new ArrayList<>();
			final List<String> noteIds = new ArrayList<>();
			for (final NoteRef noteRef : noteRefs) {
				logger.debug("\t\tProcessing noteRef : {}", noteRef);
				final Note note = noteRef.getNote();
				noteIds.add(note.getId());
				sortedRef.getNotes().add(note);
				final List<NoteRef> otherNoteRefs = noteRefService.findReferencesByNote(note.getId(),
						noteRef.getReference().getId());
				logger.debug("\t\t\tFound {} otherNoteRefs : {}", otherNoteRefs.size(), otherNoteRefs.toString());
				for (final NoteRef otherNoteRef : otherNoteRefs) {
					if (!otherRefs.contains(otherNoteRef.getReference())) {
						logger.debug("\t\t\t\tAdding other reference {}", otherNoteRef.getReference());
						otherRefs.add(otherNoteRef.getReference());
					}
				}
			}
			// Check sort type : none, inclusive or connected.
			final List<Reference> parents = new ArrayList<>();
			final List<Reference> siblings = new ArrayList<>();
			for (final Reference otherRef : otherRefs) {
				logger.debug("\t\tProcessing other reference {} : ", otherRef);
				final Integer noteCount = noteRefService.countByReferenceIdAndNoteIdIn(otherRef.getId(), noteIds)
						.size();
				logger.debug("\t\t\tFound {} notes.", noteCount);
				if (noteCount == noteIds.size()) {
					parents.add(otherRef);
				} else if (noteCount > 0) {
					siblings.add(otherRef);
				}
			}
			if (parents.size() > 0 && siblings.size() == 0) {
				// If there is only parents, this reference is included in them.
				sortedRef = new InclusiveReference(sortedRef);
				((InclusiveReference) sortedRef).getParents();
			} else if (siblings.size() > 0) {
				// Otherwise if it has siblings through notes the reference is
				// connected to them.
				sortedRef = new ConnectedReference(sortedRef);
				((ConnectedReference) sortedRef).getSiblings().addAll(siblings);
			}
			sortedRefs.add(sortedRef);
		}
		// Now sort list by noteCount.
		// FIXME: Also sort by siblingCount, parentCount ?
		Collections.sort(sortedRefs, new SortedReferenceComparator());
		Collections.reverse(sortedRefs);
		return sortedRefs;
	}
}
