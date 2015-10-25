package org.arcanic.ramm.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.arcanic.ramm.document.Note;
import org.arcanic.ramm.document.NoteRef;
import org.arcanic.ramm.document.Reference;
import org.arcanic.ramm.repository.NoteRefRepository;
import org.arcanic.ramm.sort.SortedReference;

public class SortService {

	private NoteRefRepository noteRefService;

	public List<SortedReference> sortReferences() {
		final Map<String, SortedReference> sortMap = new HashMap<>();
		final List<NoteRef> noteRefs = noteRefService.findAll();
		for (final NoteRef noteRef : noteRefs) {
			final Reference reference = noteRef.getReference();
			final Note note = noteRef.getNote();
			if (!sortMap.containsKey(reference.getId())) {
				final SortedReference sortedRef = new SortedReference(reference);
				sortMap.put(sortedRef.getId(), sortedRef);
			}
			final SortedReference sortedRef = sortMap.get(reference.getId());
			sortedRef.getNotes().add(note);
			final List<Reference> references = noteRefService.findReferenceByNoteId(note.getId());
		}
		return new ArrayList<>(sortMap.values());
	}
}
