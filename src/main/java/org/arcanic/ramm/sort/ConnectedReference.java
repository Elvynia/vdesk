package org.arcanic.ramm.sort;

import java.util.List;

import org.arcanic.ramm.document.Reference;

/**
 * Sorted reference connected with other references.
 *
 * @author Arcanis
 *
 */
public class ConnectedReference extends SortedReference {

	private List<Reference> siblings;

	/**
	 * Default constructor.
	 *
	 * @param reference for id and keyword.
	 */
	public ConnectedReference(final Reference reference) {
		super(reference);
	}

	/**
	 * @return the siblings
	 */
	public List<Reference> getSiblings() {
		return siblings;
	}

	/**
	 * @param siblings the siblings to set
	 */
	public void setSiblings(List<Reference> siblings) {
		this.siblings = siblings;
	}

}