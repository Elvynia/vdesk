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
	 * List of notes memories.
	 */
	private List<SquareMemory> squares;
	
	/**
	 * Layout with all limit values.
	 */
	private MemoryLayout memoryLayout;

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

	/**
	 * @param squares the squares to set
	 */
	public void setSquares(final List<SquareMemory> squares) {
		this.squares = squares;
	}

	/**
	 * @return the memoryLayout
	 */
	public MemoryLayout getMemoryLayout() {
		return memoryLayout;
	}

	/**
	 * @param memoryLayout the memoryLayout to set
	 */
	public void setMemoryLayout(MemoryLayout memoryLayout) {
		this.memoryLayout = memoryLayout;
	}
}
