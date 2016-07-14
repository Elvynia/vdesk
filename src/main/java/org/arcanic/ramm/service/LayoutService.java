package org.arcanic.ramm.service;

import java.util.LinkedList;
import java.util.List;

import org.arcanic.ramm.document.Note;
import org.arcanic.ramm.document.Reference;
import org.arcanic.ramm.layout.Layer;
import org.arcanic.ramm.memory.CircleMemory;
import org.arcanic.ramm.memory.SquareMemory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service providing methods to build layouts with sorted memories.
 *
 * @author Arcanis
 *
 */
@Service
public class LayoutService {

	@Autowired
	private SortService sortService;

	public Layer buildLayer(final Reference reference) {
		final CircleMemory root = new CircleMemory(reference);
		final Layer layer = new Layer(root);
		final LinkedList<SquareMemory> nodes = new LinkedList<>();
		final List<Note> notes = sortService.sortNotes(reference);
		layer.setNodes(nodes);
		return layer;
	}
}
