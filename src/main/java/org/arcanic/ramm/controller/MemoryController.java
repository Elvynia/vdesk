package org.arcanic.ramm.controller;

import org.arcanic.ramm.document.Bubble;
import org.arcanic.ramm.memory.MemoryMap;
import org.arcanic.ramm.service.MemoryService;
import org.springframework.beans.factory.annotation.Autowired;
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

	@Autowired
	private MemoryService memoryService;

	@RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public MemoryMap viewDefault(@RequestBody final MemoryMap map) {
		return memoryService.generateTestMap(map);
	}

	@RequestMapping(value = "/test", method = RequestMethod.POST, headers = "Accept=application/json", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public MemoryMap viewTest(@RequestBody final MemoryMap map) {
		return memoryService.generateTestMap(map);
	}
}
