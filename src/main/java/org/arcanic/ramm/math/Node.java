package org.arcanic.ramm.math;

/**
 * Two dimensional position in screen or relative to an object.
 *
 * @author Arcanis
 *
 */
public class Node {

	/**
	 * Horizontal position.
	 */
	private double x;

	/**
	 * Vertical position.
	 */
	private double y;

	public Node() {
		x = 0;
		y = 0;
	}

	public Node(final double x, final double y) {
		this.x = x;
		this.y = y;
	}

	/**
	 * @return the x
	 */
	public double getX() {
		return x;
	}

	/**
	 * @return the y
	 */
	public double getY() {
		return y;
	}

	/**
	 * @param x the x to set
	 */
	public void setX(final double x) {
		this.x = x;
	}

	/**
	 * @param y the y to set
	 */
	public void setY(final double y) {
		this.y = y;
	}
}
