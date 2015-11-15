package org.arcanic.ramm.math;

import java.util.ArrayList;
import java.util.List;

/**
 * POJO handling all informations for circle position calculations.
 *
 * @author Arcanis
 *
 */
public class CircleDemo {

	/**
	 * Angle between notes.
	 */
	private double alpha;

	/**
	 * Center position of the circle.
	 */
	private Node center;

	/**
	 * Whether positions are absolute.
	 */
	private boolean fixed;

	/**
	 * Whether the angle valued and fixed.
	 */
	private boolean fixedAngle;

	/**
	 * Number of notes on the circle.
	 */
	private int noteCount;

	/**
	 * List of note positions.
	 */
	private List<Node> notes;

	/**
	 * Ray of the circle.
	 */
	private double ray;

	public CircleDemo() {
		notes = new ArrayList<>();
	}

	/**
	 * @return the alpha
	 */
	public double getAlpha() {
		return alpha;
	}

	/**
	 * @return the center
	 */
	public Node getCenter() {
		return center;
	}

	/**
	 * @return the noteCount
	 */
	public int getNoteCount() {
		return noteCount;
	}

	/**
	 * @return the notes
	 */
	public List<Node> getNotes() {
		return notes;
	}

	/**
	 * @return the ray
	 */
	public double getRay() {
		return ray;
	}

	public boolean isFixed() {
		return fixed;
	}

	/**
	 * @param alpha the alpha to set
	 */
	public void setAlpha(final double alpha) {
		this.alpha = alpha;
	}

	/**
	 * @param center the center to set
	 */
	public void setCenter(final Node center) {
		this.center = center;
	}

	public void setFixed(final boolean fixed) {
		this.fixed = fixed;
	}

	/**
	 * @param noteCount the noteCount to set
	 */
	public void setNoteCount(final int noteCount) {
		this.noteCount = noteCount;
	}

	/**
	 * @param notes the notes to set
	 */
	public void setNotes(final List<Node> notes) {
		this.notes = notes;
	}

	/**
	 * @param ray the ray to set
	 */
	public void setRay(final double ray) {
		this.ray = ray;
	}

	/**
	 * @return the fixedAngle
	 */
	public boolean isFixedAngle() {
		return fixedAngle;
	}

	/**
	 * @param fixedAngle the fixedAngle to set
	 */
	public void setFixedAngle(boolean fixedAngle) {
		this.fixedAngle = fixedAngle;
	}
}
