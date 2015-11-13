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
		final double originAngle = 2 * Math.PI / circleDemo.getNoteCount();
		circleDemo.setAlpha(originAngle);
		circleDemo.setRay(CircleMemory.UNIT_RAY_PX);
		circleDemo.setCenter(new Node(1080, 520));
		for (int i = 0; i < circleDemo.getNoteCount(); ++i) {
			final Node node = new Node();
			node.setX(Math.cos(circleDemo.getAlpha()) * circleDemo.getRay());
			node.setY(Math.sin(circleDemo.getAlpha()) * circleDemo.getRay());
			circleDemo.setAlpha(circleDemo.getAlpha() + originAngle);
			circleDemo.getNotes().add(node);
		}
		return circleDemo;
	}
}
