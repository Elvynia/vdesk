package org.arcanic.ramm.service;

import org.arcanic.ramm.math.CircleDemo;
import org.arcanic.ramm.math.Node;
import org.arcanic.ramm.memory.CircleMemory;
import org.springframework.stereotype.Service;

/**
 * Service providing methods to resolve calculations.
 *
 * @author Arcanis
 *
 */
@Service
public class MathService {

	/**
	 * Process calculation to find note distribution.
	 *
	 * @param circleDemo the demo with note number and angle.
	 * @return CircleDemo the demo with positions and size.
	 */
	public CircleDemo processCircleDemo(final CircleDemo circleDemo) {
		if (circleDemo.isFixedAngle() && circleDemo.getArc() > 0) {
			// Angle fixed by 2 * Math.Pi / noteCount.
			circleDemo.setAlpha(2 * Math.PI / circleDemo.getNoteCount());
			// Calculate ray from arc size.
			circleDemo.setRay(Math.round(circleDemo.getArc() / circleDemo.getAlpha()));
		} else {
			if (circleDemo.getAlpha() <= 0) {
				// Angle fixed by 2 * Math.Pi / noteCount.
				circleDemo.setAlpha(2 * Math.PI / circleDemo.getNoteCount());
			} else {
				// Angle fixed by Math.Pi / alpha.
				circleDemo.setAlpha(Math.PI / circleDemo.getAlpha());
			}
			// Check if ray is valued.
			if (circleDemo.getRay() <= 0) {
				// Set to default ray.
				circleDemo.setRay(CircleMemory.UNIT_RAY_PX);
			}

		}
		circleDemo.setCenter(new Node(1080, 520));
		for (int i = 0; i < circleDemo.getNoteCount(); ++i) {
			// Node with absolute positions.
			final Node node = new Node();
			node.setX(Math.round(Math.cos(circleDemo.getAlpha() * i) * circleDemo.getRay()));
			node.setY(Math.round(Math.sin(circleDemo.getAlpha() * i) * circleDemo.getRay()));
			circleDemo.getNotes().add(node);
			// Node with fixed positions.
			final Node fixedNode = new Node();
			fixedNode.setX(node.getX() + circleDemo.getCenter().getX());
			fixedNode.setY(node.getY() + circleDemo.getCenter().getY());
			circleDemo.getFixedNotes().add(fixedNode);
		}
		circleDemo.setAlpha(Math.PI / circleDemo.getAlpha());
		return circleDemo;
	}

	public Node processCircleNode(final double ray, final double angle) {
		final Node node = new Node();
		node.setX(Math.round(Math.cos(angle) * ray));
		node.setY(Math.round(Math.sin(angle) * ray));
		return node;
	}
}
