package org.arcanic.ramm.math;

import java.util.LinkedList;

import org.arcanic.ramm.document.Reference;
import org.arcanic.ramm.math.spiral.Parameters;
import org.arcanic.ramm.math.spiral.Transform;

public class SpiralDemo {

	private Node center;

	private LinkedList<Node> nodes;

	private Parameters parameters;

	private double ray;

	private Reference root;

	private Transform transform;

	/**
	 * @return the center
	 */
	public Node getCenter() {
		return center;
	}

	/**
	 * @return the nodes
	 */
	public LinkedList<Node> getNodes() {
		return nodes;
	}

	/**
	 * @return the parameters
	 */
	public Parameters getParameters() {
		return parameters;
	}

	/**
	 * @return the ray
	 */
	public double getRay() {
		return ray;
	}

	/**
	 * @return the root
	 */
	public Reference getRoot() {
		return root;
	}

	/**
	 * @return the transform
	 */
	public Transform getTransform() {
		return transform;
	}

	/**
	 * @param center the center to set
	 */
	public void setCenter(final Node center) {
		this.center = center;
	}

	/**
	 * @param nodes the nodes to set
	 */
	public void setNodes(final LinkedList<Node> nodes) {
		this.nodes = nodes;
	}

	/**
	 * @param parameters the parameters to set
	 */
	public void setParameters(final Parameters parameters) {
		this.parameters = parameters;
	}

	/**
	 * @param ray the ray to set
	 */
	public void setRay(final double ray) {
		this.ray = ray;
	}

	/**
	 * @param root the root to set
	 */
	public void setRoot(final Reference root) {
		this.root = root;
	}

	/**
	 * @param transform the transform to set
	 */
	public void setTransform(final Transform transform) {
		this.transform = transform;
	}

}
