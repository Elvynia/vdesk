package org.arcanic.ramm.service;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import org.arcanic.ramm.document.Bubble;
import org.arcanic.ramm.document.Note;
import org.arcanic.ramm.document.Reference;
import org.arcanic.ramm.memory.CircleMemory;
import org.arcanic.ramm.memory.MemoryMap;
import org.arcanic.ramm.memory.SquareMemory;
import org.arcanic.ramm.sort.SortedReference;
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
	 *
	 */
	private SortService sortService;

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
		final float refX = originX;
		final float refY = originY;
		final double angle = 0;
		// final float diagonal = (float) Math.sqrt(Math.pow(map.getScreenX(),
		// 2) + Math.pow(map.getScreenY(), 2));
		final List<SortedReference> references = sortService.sortReferences();
		final Iterator<SortedReference> it = references.iterator();
		// Create a circle memory for each reference.
		while (map.getCircles().size() < references.size()) {
			double noteAngle = 0;
			final SortedReference reference = it.next();
			final CircleMemory cm = new CircleMemory(reference);
			cm.setRay(CircleMemory.UNIT_RAY_PX);
			cm.setCenterX(refX);
			cm.setCenterY(refY);
			final double angleUnit = 2 * Math.PI / reference.getNotes().size();
			// Place notes inside the reference.
			for (final Note note : reference.getNotes()) {
				final SquareMemory sm = new SquareMemory(note);

				// sm.setPosX(noteX);
				// sm.setPosY(noteY);
				noteAngle += angleUnit;
			}
		}
		return map;
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
}
