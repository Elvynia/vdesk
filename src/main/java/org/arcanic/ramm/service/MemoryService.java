package org.arcanic.ramm.service;

import java.awt.Color;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import org.arcanic.ramm.document.Bubble;
import org.arcanic.ramm.document.Note;
import org.arcanic.ramm.document.Reference;
import org.arcanic.ramm.math.Node;
import org.arcanic.ramm.memory.CircleMemory;
import org.arcanic.ramm.memory.MemoryMap;
import org.arcanic.ramm.memory.SquareMemory;
import org.arcanic.ramm.sort.ConnectedReference;
import org.arcanic.ramm.sort.SortedReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service for {@link MemoryMap} generation.
 *
 * @author Arcanis
 *
 */
@Service
public class MemoryService {

	/**
	 * Math service.
	 */
	@Autowired
	private MathService mathService;

	/**
	 * Internal random generator.
	 */
	private final Random random = new Random();

	/**
	 * Sorting service.
	 */
	@Autowired
	private SortService sortService;

	private Color generateRandomColor() {
		final float hue = random.nextFloat();
		// Saturation between 0.1 and 0.3
		final float saturation = (random.nextInt(2000) + 1000) / 10000f;
		final float luminance = 0.9f;
		return Color.getHSBColor(hue, saturation, luminance);
	}

	/**
	 * Generate default memory map for note view.
	 *
	 * @param map the map with screen size values.
	 * @param references the memory root objects.
	 * @return MemoryMap the same memory map instance as parameter but filled
	 *         with circle and square memories.
	 */
	public MemoryMap generateReferenceMap(final MemoryMap map) {
		final float originX = map.getMemoryLayout().getScreenX() / 2;
		final float originY = map.getMemoryLayout().getScreenY() / 2;
		Node pRef = new Node(originX, originY);
		final List<SortedReference> references = sortService.sortReferences();
		final Iterator<SortedReference> it = references.iterator();
		// Create a circle memory for each reference.
		while (map.getCircles().size() < references.size()) {
			final SortedReference reference = it.next();
			final CircleMemory cm = new CircleMemory(reference);
			cm.setRay(CircleMemory.UNIT_RAY_PX);
			cm.setCenterX((float) pRef.getX());
			cm.setCenterY((float) pRef.getY());
			cm.setColor(getColorAsString(generateRandomColor()));
			double noteAngle = 0;
			final double noteAngleUnit = 2 * Math.PI / reference.getNotes().size();
			// Place notes inside the reference.
			for (final Note note : reference.getNotes()) {
				final Node pNode = mathService.processCircleNode(cm.getRay(), noteAngle);
				map.getSquares().add(generateSquareMemory(pNode, note));
				noteAngle += noteAngleUnit;
			}
			map.getCircles().add(cm);
			// Iterate connected references.
			if (reference instanceof ConnectedReference) {
				final ConnectedReference cRef = (ConnectedReference) reference;
				// Iterate reference position.
				pRef.setX(pRef.getX() + cm.getRay() * 1.25f);
				double refAngle = 0;
				final double refAngleUnit = 2 * Math.PI / cRef.getSiblings().size();
				for (final Reference sibling : cRef.getSiblings()) {
					// Build connected memory.
					final CircleMemory ccm = new CircleMemory(sibling);
					cm.setRay(CircleMemory.UNIT_RAY_PX);
					// Calculate position.
					pRef = mathService.processCircleNode(ccm.getRay(), refAngle);
					// Set position.
					cm.setCenterX((float) pRef.getX());
					cm.setCenterY((float) pRef.getY());
					cm.setColor(getColorAsString(generateRandomColor()));
					map.getCircles().add(ccm);
					refAngle += refAngleUnit;
				}
			}
			break;
		}
		return map;
	}

	private SquareMemory generateSquareMemory(final Node position, final Note note) {
		final SquareMemory sm = new SquareMemory(note);
		sm.setPosX((float) position.getX());
		sm.setPosY((float) position.getY());
		return sm;
	}

	/**
	 * Generate default memory map for note view.
	 *
	 * @param map the map with screen size values.
	 * @return MemoryMap the same memory map instance as parameter but filled
	 *         with circle and square memories.
	 */
	public MemoryMap generateTestMap(final MemoryMap map) {
		final Reference ref1 = new Reference();
		ref1.setId("ref1");
		ref1.setKeyword("REF_1");

		final Bubble bubbleX = new Bubble();
		bubbleX.setId("bubbleX");
		bubbleX.setContent("CONTENT BUBBLE XYZ.");

		final Note noteA = new Note();
		noteA.setId("noteA");
		noteA.setBubbles(Arrays.asList(bubbleX));
		noteA.setReferences(Arrays.asList(ref1));

		final SquareMemory sm1 = new SquareMemory(noteA);
		sm1.setPosX(200);
		sm1.setPosY(200);

		final CircleMemory cm1 = new CircleMemory(ref1);
		cm1.setCenterX(250);
		cm1.setCenterY(250);
		cm1.setRay(350);
		cm1.setColor("#FFFF99");

		final Reference ref2 = new Reference();
		ref2.setId("ref2");
		ref2.setKeyword("REF_2");

		final Note noteB = new Note();
		noteB.setId("noteB");
		noteB.setBubbles(Arrays.asList(bubbleX));
		noteB.setReferences(Arrays.asList(ref2));

		final SquareMemory sm2 = new SquareMemory(noteB);
		sm2.setPosX(800);
		sm2.setPosY(800);

		final CircleMemory cm2 = new CircleMemory(ref2);
		cm2.setCenterX(700);
		cm2.setCenterY(700);
		cm2.setRay(450);
		cm2.setColor("#66FF66");

		final Note noteC = new Note();
		noteC.setId("noteC");
		noteC.setBubbles(Arrays.asList(bubbleX));
		noteC.setReferences(Arrays.asList(ref1, ref2));

		final SquareMemory sm3 = new SquareMemory(noteC);
		sm3.setPosX(380);
		sm3.setPosY(380);

		map.getCircles().add(cm1);
		map.getCircles().add(cm2);
		map.getSquares().add(sm1);
		map.getSquares().add(sm2);
		map.getSquares().add(sm3);
		return map;
	}

	private String getColorAsString(final Color color) {
		final StringBuilder sb = new StringBuilder("rgb(");
		sb.append(color.getRed()).append(", ");
		sb.append(color.getGreen()).append(", ");
		sb.append(color.getBlue()).append(")");
		return sb.toString();
	}
}
