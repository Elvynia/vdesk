package org.arcanic.ramm.document;

import java.util.List;

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
	@DBRef
	private List<Reference> references;

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
