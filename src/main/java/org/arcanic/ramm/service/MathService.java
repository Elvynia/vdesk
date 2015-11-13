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
		circleDemo.setAlpha(2 * Math.PI / circleDemo.getNoteCount());
		circleDemo.setRay(CircleMemory.UNIT_RAY_PX);
		circleDemo.setCenter(new Node(1080, 520));
		for (int i = 0; i < circleDemo.getNoteCount(); ++i) {
			final Node node = new Node();
			node.setX(Math.round(Math.cos(circleDemo.getAlpha() * i) * circleDemo.getRay()));
			node.setY(Math.round(Math.sin(circleDemo.getAlpha() * i) * circleDemo.getRay()));
			if (circleDemo.isFixed()) {
				node.setX(node.getX() + circleDemo.getCenter().getX());
				node.setY(node.getY() + circleDemo.getCenter().getY());
			}
			circleDemo.getNotes().add(node);
		}
		return circleDemo;
	}
}
