package org.arcanic.ramm.controller;

import java.util.List;

import org.arcanic.ramm.document.Bubble;
import org.arcanic.ramm.repository.BubbleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * REST API for {@link Bubble} Documents.
 *
 * @author jeremy.masson
 *
 */
@Controller
@RequestMapping("/bubble")
public class BubbleController {

	@Autowired
	private BubbleRepository bubbleService;

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Bubble create(@RequestBody final Bubble bubble) {
		logger.debug("Calling BubbleController::create() with content '{}'.", bubble.getContent());
		return bubbleService.insert(bubble);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable final String id) {
		logger.debug("Calling BubbleController::delete() with id '{}'.", id);
		bubbleService.delete(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, headers = "Accept=application/json", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Bubble get(@PathVariable final String id) {
		logger.debug("Calling BubbleController::detail() with id '{}'.", id);
		return bubbleService.findOne(id);
	}

	@RequestMapping(method = RequestMethod.GET, headers = "Accept=application/json", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Bubble> list() {
		logger.debug("Calling BubbleController::list()");
		return bubbleService.findAll();
	}
}
