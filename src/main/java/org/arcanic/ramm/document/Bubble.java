package org.arcanic.ramm.document;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Bubble collection carrying a text note.
 *
 * @author jeremy.masson
 *
 */
@Document(collection = "bubbles")
public class Bubble {

	/**
	 * Bubble text content.
	 */
	private String content;

	/**
	 * Bubble generated identifier.
	 */
	private String id;

	/**
	 * Default constructor.
	 */
	public Bubble() {
	}

	/**
	 * Constructor with identifier.
	 *
	 * @param id the bubble identifier.
	 */
	public Bubble(final String id) {
		this.id = id;
	}

	/**
	 * Constructor with identifier and content.
	 *
	 * @param id the bubble identifier.
	 * @param content the bubble text content.
	 */
	public Bubble(final String id, final String content) {
		this(id);
		this.content = content;
	}

	/**
	 * Equals based on bubble identifier.
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
		final Bubble other = (Bubble) obj;
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
	 * @return the content
	 */
	public String getContent() {
		return content;
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * Hash code based on bubble identifier.
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
	 * @param content the content to set
	 */
	public void setContent(final String content) {
		this.content = content;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(final String id) {
		this.id = id;
	}

}
