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
	 * Equals based on reference identifier.
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
		final Reference other = (Reference) obj;
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
	 * Hashcode based on reference identifier.
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
	
	/**
	 * {@inheritDoc} Returns keyword.
	 */
	@Override
	public String toString() {
		return keyword;
	}

}
