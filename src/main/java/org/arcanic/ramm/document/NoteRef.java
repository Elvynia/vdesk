package org.arcanic.ramm.document;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Simple link between a Note and a Reference.
 *
 * @author Arcanis
 *
 */
@Document(collection = "noteRefs")
public class NoteRef {

	/**
	 * Link identifier.
	 */
	private String id;

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

	/**
	 * Equals based on noteRef identifier.
	 *
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(final Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		final NoteRef other = (NoteRef) obj;
		if (id == null) {
			if (other.id != null) {
				return false;
			}
		} else if (!id.equals(other.id)) {
			return false;
		}
		return true;
	}

	public String getId() {
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

	/**
	 * Hashcode based on noteRef identifier.
	 *
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (id == null ? 0 : id.hashCode());
		return result;
	}

	public void setId(final String id) {
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
