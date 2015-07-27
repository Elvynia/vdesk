package org.arcanic.ramm.document;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bubbles")
public class Bubble {

	private String description;

	@DBRef
	private List<Bubble> links;

	@Id
	private String title;

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @return the links
	 */
	public List<Bubble> getLinks() {
		return links;
	}

	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param description
	 *            the description to set
	 */
	public void setDescription(final String description) {
		this.description = description;
	}

	/**
	 * @param links
	 *            the links to set
	 */
	public void setLinks(final List<Bubble> links) {
		this.links = links;
	}

	/**
	 * @param title
	 *            the title to set
	 */
	public void setTitle(final String title) {
		this.title = title;
	}
}
