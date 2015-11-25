package org.arcanic.ramm.memory;

import org.arcanic.ramm.document.Note;

/**
 * Implementation of a square {@link Memory} for {@link Note}.
 *
 * @author Arcanis
 *
 */
public class SquareMemory implements Memory<Note> {

	/**
	 * The note holding memory data.
	 */
	private final Note note;
	
	/**
	 * The reference in which the memory should appear.
	 */
	private String referenceId;

	/**
	 * Horizontal position of the top left corner.
	 */
	private float posX;

	/**
	 * Vertical position of the top left corner.
	 */
	private float posY;

	/**
	 * Constructor with memory data.
	 *
	 * @param note the memory data.
	 */
	public SquareMemory(final Note note) {
		this.note = note;
	}

	/**
	 * {@inheritDoc} Type : {@link Note}.
	 */
	@Override
	public Note getMemory() {
		return note;
	}

	/**
	 * @return the posX
	 */
	public float getPosX() {
		return posX;
	}

	/**
	 * @return the posY
	 */
	public float getPosY() {
		return posY;
	}

	/**
	 * @param posX the posX to set
	 */
	public void setPosX(final float posX) {
		this.posX = posX;
	}

	/**
	 * @param posY the posY to set
	 */
	public void setPosY(final float posY) {
		this.posY = posY;
	}

	/**
	 * @return the referenceId
	 */
	public String getReferenceId() {
		return referenceId;
	}

	/**
	 * @param referenceId the referenceId to set
	 */
	public void setReferenceId(String referenceId) {
		this.referenceId = referenceId;
	}

}
