package org.arcanic.ramm.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.arcanic.ramm.document.Note;
import org.arcanic.ramm.document.NoteRef;
import org.arcanic.ramm.document.Reference;
import org.arcanic.ramm.repository.NoteRefRepository;
import org.arcanic.ramm.repository.ReferenceRepository;
import org.arcanic.ramm.sort.SortedReference;

public class SortService {

	private NoteRefRepository noteRefService;

	private ReferenceRepository referenceService;

	public List<SortedReference> sortReferences() {
		final Map<String, SortedReference> sortMap = new HashMap<>();
		final List<Reference> references = referenceService.findAll();
		for (final Reference reference : references) {
			final SortedReference sortedRef = new SortedReference(reference);
			// Fill notes and retrieve other references linked to each note.
			final List<NoteRef> noteRefs = noteRefService.findByReference(reference);
			final List<Reference> otherRefs = new ArrayList<Reference>();
			for (final NoteRef noteRef : noteRefs) {
				final Note note = noteRef.getNote();
				sortedRef.getNotes().add(note);
				final List<NoteRef> otherNoteRefs = noteRefService.findByNote(note, noteRef.getReference().getId());
				for (final NoteRef otherNoteRef : otherNoteRefs) {
					if (!otherRefs.contains(otherNoteRef.getReference())) {
						otherRefs.add(otherNoteRef.getReference());
					}
				}
			}
			// Check sort type : none, inclusive or connected.
			for (final Reference otherRef : otherRefs) {
				final int noteCount = noteRefService.countByReferenceId(otherRef);
			}
			sortMap.put(sortedRef.getId(), sortedRef);
		}
		return new ArrayList<>(sortMap.values());
	}
}
