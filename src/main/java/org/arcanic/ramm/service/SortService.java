package org.arcanic.ramm.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.arcanic.ramm.compare.SortedReferenceComparator;
import org.arcanic.ramm.document.Note;
import org.arcanic.ramm.document.NoteRef;
import org.arcanic.ramm.document.Reference;
import org.arcanic.ramm.repository.NoteRefRepository;
import org.arcanic.ramm.repository.ReferenceRepository;
import org.arcanic.ramm.sort.ConnectedReference;
import org.arcanic.ramm.sort.InclusiveReference;
import org.arcanic.ramm.sort.SortedReference;

public class SortService {

	private NoteRefRepository noteRefService;

	private ReferenceRepository referenceService;

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
