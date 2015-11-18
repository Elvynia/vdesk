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
import org.arcanic.ramm.repository.NoteRepository;
import org.arcanic.ramm.repository.ReferenceRepository;
import org.arcanic.ramm.sort.ConnectedReference;
import org.arcanic.ramm.sort.InclusiveReference;
import org.arcanic.ramm.sort.SortedReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SortService {

	@Autowired
	private NoteRefRepository noteRefService;

	@Autowired
	private NoteRepository noteService;

	@Autowired
	private ReferenceRepository referenceService;

	/**
	 * Sorte notes by gathering their references to make a chain. Notes with the
	 * most references in common are next to each others.
	 *
	 * @return List<Note> the notes sorted by reference count.
	 */
	public List<Note> sortNotes() {
		final LinkedList<Note> notes = new LinkedList<>();
		final List<Note> dbNotes = noteService.findAll();
		for (final Note dbNote : dbNotes) {
			dbNote.setReferences(new ArrayList<>());
			final List<NoteRef> noteRefs = noteRefService.findByNote(dbNote);
			for (final NoteRef noteRef : noteRefs) {
				dbNote.getReferences().add(noteRef.getReference());
			}
			notes.add(dbNote);
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
		final List<SortedReference> sortedRefs = new ArrayList<>();
		final List<Reference> references = referenceService.findAll();
		for (final Reference reference : references) {
			SortedReference sortedRef = new SortedReference(reference);
			// Fill notes and retrieve other references linked to each note.
			final List<NoteRef> noteRefs = noteRefService.findByReference(reference);
			final List<Reference> otherRefs = new ArrayList<>();
			final List<String> noteIds = new ArrayList<>();
			for (final NoteRef noteRef : noteRefs) {
				final Note note = noteRef.getNote();
				noteIds.add(note.getId());
				sortedRef.getNotes().add(note);
				final List<NoteRef> otherNoteRefs = noteRefService.findByNote(note, noteRef.getReference().getId());
				for (final NoteRef otherNoteRef : otherNoteRefs) {
					if (!otherRefs.contains(otherNoteRef.getReference())) {
						otherRefs.add(otherNoteRef.getReference());
					}
				}
			}
			// Check sort type : none, inclusive or connected.
			final List<Reference> parents = new ArrayList<>();
			final List<Reference> siblings = new ArrayList<>();
			for (final Reference otherRef : otherRefs) {
				final int noteCount = noteRefService.countByReferenceId(otherRef, noteIds);
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
		return sortedRefs;
	}
}
