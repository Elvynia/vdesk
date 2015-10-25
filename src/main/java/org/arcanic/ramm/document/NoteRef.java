package org.arcanic.ramm.document;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Simple link between a Note and a Reference.
 *
 * @author Arcanis
 *
 */
@Document
public class NoteRef {

	/**
	 * Link identifier.
	 */
	private long id;

	/**
	 * Note linked to the reference.
	 */
	@DBRef
	private Note note;

	/**
	 * Reference linked by the note.
	 */
	@DBRef
	private Reference reference;

	public long getId() {
		return id;
	}

	/**
	 * @return the note
	 */
	public Note getNote() {
		return note;
	}

	/**
	 * @return the reference
	 */
	public Reference getReference() {
		return reference;
	}

	public void setId(final long id) {
		this.id = id;
	}

	/**
	 * @param note the note to set
	 */
	public void setNote(final Note note) {
		this.note = note;
	}

	/**
	 * @param reference the reference to set
	 */
	public void setReference(final Reference reference) {
		this.reference = reference;
	}
}
