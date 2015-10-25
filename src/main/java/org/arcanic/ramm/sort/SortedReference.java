package org.arcanic.ramm.sort;

import java.util.List;

import org.arcanic.ramm.document.Note;
import org.arcanic.ramm.document.Reference;

/**
 * Extended reference with available informations for sorting.
 *
 * @author Arcanis
 *
 */
public class SortedReference extends Reference {

	private List<Reference> connected;

	private List<Reference> inclusives;

	private List<Note> notes;

	public SortedReference(final Reference reference) {
		setId(reference.getId());
		setKeyword(reference.getKeyword());
	}

	/**
	 * @return the connected list of references with note in common, but not
	 *         only (meaning theses notes are linked to an other reference the
	 *         two connected).
	 */
	public List<Reference> getConnected() {
		return connected;
	}

	/**
	 * @return the inclusives
	 */
	public List<Reference> getInclusives() {
		return inclusives;
	}

	/**
	 * @return the notes
	 */
	public List<Note> getNotes() {
		return notes;
	}

	/**
	 * Retrieve total of inclusives and connected references.
	 */
	public int getReferenceCount() {
		return connected.size() + inclusives.size();
	}

	/**
	 * @param connected the connected to set
	 */
	public void setConnected(final List<Reference> connected) {
		this.connected = connected;
	}

	/**
	 * @param inclusives the inclusives to set
	 */
	public void setInclusives(final List<Reference> inclusives) {
		this.inclusives = inclusives;
	}

	/**
	 * @param notes the notes to set
	 */
	public void setNotes(final List<Note> notes) {
		this.notes = notes;
	}
}
