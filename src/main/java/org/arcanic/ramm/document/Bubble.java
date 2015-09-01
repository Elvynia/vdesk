package org.arcanic.ramm.document;

import java.util.Objects;

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
	 * {@inheritDoc}
	 */
	@Override
	public boolean equals(final Object obj) {
		if (Bubble.class.isAssignableFrom(obj.getClass())) {
			return obj.hashCode() == hashCode();
		}
		return super.equals(obj);
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
	 * {@inheritDoc}
	 */
	@Override
	public int hashCode() {
		return Objects.hash(content);
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
