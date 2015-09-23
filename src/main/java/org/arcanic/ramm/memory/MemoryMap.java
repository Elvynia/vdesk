package org.arcanic.ramm.memory;

import java.util.ArrayList;
import java.util.List;

/**
 * Representation of memory map with references as background circles and notes
 * (square forms) inside.
 *
 * @author Arcanis
 *
 */
public class MemoryMap {

	/**
	 * List of reference memories.
	 */
	private List<CircleMemory> circles;

	/**
	 * Horizontal screen size.
	 */
	private float screenX;

	/**
	 * Vertical screen size.
	 */
	private float screenY;

	/**
	 * List of notes memories.
	 */
	private List<SquareMemory> squares;

	/**
	 * Default constructor with new array instances.
	 */
	public MemoryMap() {
		circles = new ArrayList<>();
		squares = new ArrayList<>();
	}

	/**
	 * @return the circles
	 */
	public List<CircleMemory> getCircles() {
		return circles;
	}

	public float getScreenX() {
		return screenX;
	}

	public float getScreenY() {
		return screenY;
	}

	/**
	 * @return the squares
	 */
	public List<SquareMemory> getSquares() {
		return squares;
	}

	/**
	 * @param circles the circles to set
	 */
	public void setCircles(final List<CircleMemory> circles) {
		this.circles = circles;
	}

	public void setScreenX(final float screenX) {
		this.screenX = screenX;
	}

	public void setScreenY(final float screenY) {
		this.screenY = screenY;
	}

	/**
	 * @param squares the squares to set
	 */
	public void setSquares(final List<SquareMemory> squares) {
		this.squares = squares;
	}
}
