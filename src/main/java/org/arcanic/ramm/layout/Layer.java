package org.arcanic.ramm.layout;

import java.util.LinkedList;

import org.arcanic.ramm.memory.CircleMemory;
import org.arcanic.ramm.memory.SquareMemory;

/**
 * Layout for one memory.
 *
 * @author Arcanis
 *
 */
public class Layer {

	private LinkedList<SquareMemory> nodes;

	private final CircleMemory root;

	public Layer(final CircleMemory root) {
		this.root = root;
	}

	/**
	 * @return the root
	 */
	public CircleMemory getRoot() {
		return root;
	}

	/**
	 * @return the nodes
	 */
	public LinkedList<SquareMemory> getNodes() {
		return nodes;
	}

	/**
	 * @param nodes the nodes to set
	 */
	public void setNodes(LinkedList<SquareMemory> nodes) {
		this.nodes = nodes;
	}
}
