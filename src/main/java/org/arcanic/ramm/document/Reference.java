package org.arcanic.ramm.document;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Reference collection managing keywords linking bubbles.
 *
 * @author jeremy.masson
 *
 */
@Document(collection = "references")
public class Reference {

	/**
	 * Bubble generated identifier.
	 */
	private String id;

	/**
	 * Single keyword that can be used to connect bubbles.
	 */
	private String keyword;

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @return the keyword
	 */
	public String getKeyword() {
		return keyword;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(final String id) {
		this.id = id;
	}

	/**
	 * @param keyword the keyword to set
	 */
	public void setKeyword(final String keyword) {
		this.keyword = keyword;
	}

}
