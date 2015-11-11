package org.arcanic.ramm.memory;

public class MemoryLayout {

	/**
	 * Horizontal screen size.
	 */
	private float screenX;

	/**
	 * Vertical screen size.
	 */
	private float screenY;
	
	/**
	 * Minimum amount of notes in the same memory.
	 */
	private int noteCountMin;
	
	/**
	 * Maximum amount of notes in the same memory.
	 */
	private int noteCountMax;
	
	/**
	 * Minimum space between two notes.
	 */
	private float notePaddingMin;
	
	/**
	 * Maximum space between two notes.
	 */
	private float notePaddingMax;
	
	/**
	 * Minimum ray for a circle memory.
	 */
	private float rayMin;
	
	/**
	 * @return the screenX
	 */
	public float getScreenX() {
		return screenX;
	}

	/**
	 * @param screenX the screenX to set
	 */
	public void setScreenX(float screenX) {
		this.screenX = screenX;
	}

	/**
	 * @return the screenY
	 */
	public float getScreenY() {
		return screenY;
	}

	/**
	 * @param screenY the screenY to set
	 */
	public void setScreenY(float screenY) {
		this.screenY = screenY;
	}

	/**
	 * @return the noteCountMin
	 */
	public int getNoteCountMin() {
		return noteCountMin;
	}

	/**
	 * @param noteCountMin the noteCountMin to set
	 */
	public void setNoteCountMin(int noteCountMin) {
		this.noteCountMin = noteCountMin;
	}

	/**
	 * @return the noteCountMax
	 */
	public int getNoteCountMax() {
		return noteCountMax;
	}

	/**
	 * @param noteCountMax the noteCountMax to set
	 */
	public void setNoteCountMax(int noteCountMax) {
		this.noteCountMax = noteCountMax;
	}

	/**
	 * @return the notePaddingMin
	 */
	public float getNotePaddingMin() {
		return notePaddingMin;
	}

	/**
	 * @param notePaddingMin the notePaddingMin to set
	 */
	public void setNotePaddingMin(float notePaddingMin) {
		this.notePaddingMin = notePaddingMin;
	}

	/**
	 * @return the notePaddingMax
	 */
	public float getNotePaddingMax() {
		return notePaddingMax;
	}

	/**
	 * @param notePaddingMax the notePaddingMax to set
	 */
	public void setNotePaddingMax(float notePaddingMax) {
		this.notePaddingMax = notePaddingMax;
	}

	/**
	 * @return the rayMin
	 */
	public float getRayMin() {
		return rayMin;
	}

	/**
	 * @param rayMin the rayMin to set
	 */
	public void setRayMin(float rayMin) {
		this.rayMin = rayMin;
	}

	/**
	 * @return the rayMax
	 */
	public float getRayMax() {
		return rayMax;
	}

	/**
	 * @param rayMax the rayMax to set
	 */
	public void setRayMax(float rayMax) {
		this.rayMax = rayMax;
	}

	/**
	 * @return the noteSizeMin
	 */
	public float getNoteSizeMin() {
		return noteSizeMin;
	}

	/**
	 * @param noteSizeMin the noteSizeMin to set
	 */
	public void setNoteSizeMin(float noteSizeMin) {
		this.noteSizeMin = noteSizeMin;
	}

	/**
	 * @return the noteSizeMax
	 */
	public float getNoteSizeMax() {
		return noteSizeMax;
	}

	/**
	 * @param noteSizeMax the noteSizeMax to set
	 */
	public void setNoteSizeMax(float noteSizeMax) {
		this.noteSizeMax = noteSizeMax;
	}

	/**
	 * Maximum ray for a circle memory.
	 */
	private float rayMax;
	
	/**
	 * Minimum note size for square memory.
	 */
	private float noteSizeMin;
	
	/**
	 * Maximum note size for square memory.
	 */
	private float noteSizeMax;
}
