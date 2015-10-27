package org.arcanic.ramm.sort;

import java.util.List;

import org.arcanic.ramm.document.Reference;

/**
 * Sorted reference included in other references.
 *
 * @author Arcanis
 *
 */
public class InclusiveReference extends SortedReference {

	private List<Reference> parents;

	/**
	 * Default constructor.
	 *
	 * @param reference for id and keyword.
	 */
	public InclusiveReference(final Reference reference) {
		super(reference);
	}

	/**
	 * @return the parents
	 */
	public List<Reference> getParents() {
		return parents;
	}

	/**
	 * @param parents the parents to set
	 */
	public void setParents(final List<Reference> parents) {
		this.parents = parents;
	}

}
