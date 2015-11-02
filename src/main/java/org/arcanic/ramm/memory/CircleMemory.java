package org.arcanic.ramm.memory;

import org.arcanic.ramm.document.Reference;

/**
 * Implementation of a circle {@link Memory} for {@link Reference}.
 *
 * @author Arcanis
 *
 */
public class CircleMemory implements Memory<Reference> {
	
	/**
	 * Unit size for rays in circle memories.
	 */
	public static final int UNIT_RAY_PX = 200;

	/**
	 * Horizontal axis position of the center.
	 */
	private float centerX;

	/**
	 * Vertical position of the center.
	 */
	private float centerY;

	/**
	 * Background color of this circle.
	 */
	private String color;

	/**
	 * Diameter of the circle.
	 */
	private float ray;

	/**
	 * The reference holding memory data.
	 */
	private final Reference reference;

	/**
	 * Constructor with memory data.
	 *
	 * @param reference the memory data.
	 */
	public CircleMemory(final Reference reference) {
		this.reference = reference;
	}

	/**
	 * @return the centerX
	 */
	public float getCenterX() {
		return centerX;
	}

	/**
	 * @return the centerY
	 */
	public float getCenterY() {
		return centerY;
	}

	public String getColor() {
		return color;
	}

	/**
	 * {@inheritDoc} Type : {@link Reference}.
	 */
	@Override
	public Reference getMemory() {
		return reference;
	}

	/**
	 * @param centerX the centerX to set
	 */
	public void setCenterX(final float centerX) {
		this.centerX = centerX;
	}

	/**
	 * @param centerY the centerY to set
	 */
	public void setCenterY(final float centerY) {
		this.centerY = centerY;
	}

	public void setColor(final String color) {
		this.color = color;
	}

	/**
	 * @return the ray
	 */
	public float getRay() {
		return ray;
	}

	/**
	 * @param ray the ray to set
	 */
	public void setRay(float ray) {
		this.ray = ray;
	}

}
