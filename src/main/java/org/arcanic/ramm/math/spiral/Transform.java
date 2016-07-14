package org.arcanic.ramm.math.spiral;

import org.arcanic.ramm.math.Node;

public class Transform {

	private Node borderCircle;

	private String method;

	private Node originCircle;

	private double scale;

	/**
	 * @return the borderCircle
	 */
	public Node getBorderCircle() {
		return borderCircle;
	}

	/**
	 * @return the method
	 */
	public String getMethod() {
		return method;
	}

	/**
	 * @return the originCircle
	 */
	public Node getOriginCircle() {
		return originCircle;
	}

	/**
	 * @return the scale
	 */
	public double getScale() {
		return scale;
	}

	/**
	 * @param borderCircle the borderCircle to set
	 */
	public void setBorderCircle(final Node borderCircle) {
		this.borderCircle = borderCircle;
	}

	/**
	 * @param method the method to set
	 */
	public void setMethod(final String method) {
		this.method = method;
	}

	/**
	 * @param originCircle the originCircle to set
	 */
	public void setOriginCircle(final Node originCircle) {
		this.originCircle = originCircle;
	}

	/**
	 * @param scale the scale to set
	 */
	public void setScale(final double scale) {
		this.scale = scale;
	}
}
