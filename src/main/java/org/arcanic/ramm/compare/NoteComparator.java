package org.arcanic.ramm.compare;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.arcanic.ramm.document.Note;
import org.arcanic.ramm.document.Reference;

public class NoteComparator implements Comparator<Note> {

	@Override
	public int compare(final Note note1, final Note note2) {
		final List<Reference> refs1 = note1.getReferences();
		final List<Reference> refs2 = note2.getReferences();
		final List<Reference> uncommonRefs1 = new ArrayList<>();
		final List<Reference> uncommonRefs2 = new ArrayList<>();
		Collections.copy(uncommonRefs1, refs1);
		Collections.copy(uncommonRefs2, refs2);
		uncommonRefs1.removeAll(refs2);
		uncommonRefs2.removeAll(refs1);
		if (uncommonRefs1.size() == uncommonRefs2.size()) {
			return Integer.compare(refs1.size(), refs2.size());
		} else {
			return Integer.compare(uncommonRefs1.size(), uncommonRefs2.size());
		}
	}

}
