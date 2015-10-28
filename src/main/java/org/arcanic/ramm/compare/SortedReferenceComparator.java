package org.arcanic.ramm.compare;

import java.util.Comparator;

import org.arcanic.ramm.sort.SortedReference;

public class SortedReferenceComparator implements Comparator<SortedReference> {

	@Override
	public int compare(SortedReference ref1, SortedReference ref2) {
		return Integer.valueOf(ref1.getNotes().size()).compareTo(ref2.getNotes().size());
	}

}
