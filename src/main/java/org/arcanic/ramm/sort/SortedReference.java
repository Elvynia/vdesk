package org.arcanic.ramm.sort;

import java.util.ArrayList;
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

	private List<Note> notes;

	/**
	 * Clone the reference.
	 *
	 * @param reference with id and keyword.
	 */
	public SortedReference(final Reference reference) {
		notes = new ArrayList<>();
		setId(reference.getId());
		setKeyword(reference.getKeyword());
	}

	/**
	 * @return the notes
	 */
	public List<Note> getNotes() {
		return notes;
	}

	/**
	 * @param notes the notes to set
	 */
	public void setNotes(final List<Note> notes) {
		this.notes = notes;
	}
}
