package org.arcanic.ramm.controller;

import java.util.Arrays;

import org.arcanic.ramm.document.Bubble;
import org.arcanic.ramm.document.Note;
import org.arcanic.ramm.document.Reference;
import org.arcanic.ramm.memory.CircleMemory;
import org.arcanic.ramm.memory.MemoryMap;
import org.arcanic.ramm.memory.SquareMemory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * REST API for {@link Bubble} Documents.
 *
 * @author jeremy.masson
 *
 */
@Controller
@RequestMapping("/memory")
public class MemoryController {

	@RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public MemoryMap view(@RequestBody final MemoryMap map) {
		final Reference ref1 = new Reference();
		ref1.setId("ref1");
		ref1.setKeyword("REF_1");
		final Bubble bubbleX = new Bubble();
		bubbleX.setId("bubbleX");
		bubbleX.setContent("CONTENT BUBBLE XYZ.");
		final Note noteA = new Note();
		noteA.setBubbles(Arrays.asList(bubbleX));
		noteA.setReferences(Arrays.asList(ref1));
		final SquareMemory sm1 = new SquareMemory(noteA);
		sm1.setPosX(200);
		sm1.setPosY(200);
		final CircleMemory cm1 = new CircleMemory(ref1);
		cm1.setCenterX(250);
		cm1.setCenterY(250);
		cm1.setDiameter(700);
		cm1.setColor("#FFFF99");
		map.getCircles().add(cm1);
		map.getSquares().add(sm1);
		return map;
	}
}
