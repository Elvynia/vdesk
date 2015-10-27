package org.arcanic.ramm.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
			// Fill notes.
			final List<NoteRef> noteRefs = noteRefService.findByReference(reference);
			final List<Reference> linkedRefs = new ArrayList<Reference>();
			for (final NoteRef noteRef : noteRefs) {
				sortedRef.getNotes().add(noteRef.getNote());
				// TODO : If note has other references add them to linkedRefs.
				// if (!linkedRefs.contains(noteRef.getReference())) {
				// linkedRefs.add(noteRef.getReference());
				// }
			}
			// Check sort type : none, inclusive or connected.
			for (final Reference linkedRef : linkedRefs) {
				// final int noteCount =
			}
			sortMap.put(sortedRef.getId(), sortedRef);
		}
		return new ArrayList<>(sortMap.values());
	}
}
