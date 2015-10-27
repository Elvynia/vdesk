package org.arcanic.ramm.document;

import java.util.List;

import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Note collection managing connections between bubbles and references.
 *
 * @author jeremy.masson
 *
 */
@Document(collection = "notes")
public class Note {

	/**
	 * Text bubbles attached to this note.
	 */
	@DBRef
	private List<Bubble> bubbles;

	/**
	 * Bubble generated identifier.
	 */
	private String id;

	/**
	 * References attached to this note.
	 */
	@Transient
	private transient List<Reference> references;

	/**
	 * Equals based on note identifier.
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
		final Note other = (Note) obj;
		if (id == null) {
			if (other.id != null) {
				return false;
			}
		} else if (!id.equals(other.id)) {
			return false;
		}
		return true;
	}

	/**
	 * @return the bubbles
	 */
	public List<Bubble> getBubbles() {
		return bubbles;
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @return the references
	 */
	public List<Reference> getReferences() {
		return references;
	}

	/**
	 * Hashcode based on note identifier.
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

	/**
	 * @param bubbles the bubbles to set
	 */
	public void setBubbles(final List<Bubble> bubbles) {
		this.bubbles = bubbles;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(final String id) {
		this.id = id;
	}

	/**
	 * @param references the references to set
	 */
	public void setReferences(final List<Reference> references) {
		this.references = references;
	}
}
