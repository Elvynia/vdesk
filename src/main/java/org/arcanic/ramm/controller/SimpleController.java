package org.arcanic.ramm.controller;

import java.util.ArrayList;
import java.util.List;

import org.arcanic.ramm.document.Bubble;
import org.arcanic.ramm.repository.BubbleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
@RequestMapping("/simple")
public class SimpleController {

	@Autowired
	private BubbleRepository bubbleRepository;

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@RequestMapping(method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void create(@RequestBody Bubble bubble) {
		logger.debug("Calling SimpleController::create() with title '{}' and desc '{}'.", bubble.getTitle(),
				bubble.getDescription());
		bubble = bubbleRepository.insert(bubble);
		logger.debug("New bubble saved ! Total number of bubbles : {}.", bubbleRepository.count());
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable final String id) {
		logger.debug("Calling SimpleController::delete() with id '{}'.", id);
		bubbleRepository.delete(id);
		logger.debug("New bubble saved ! Total number of bubbles : {}.", bubbleRepository.count());
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, headers = "Accept=application/json", produces = "application/json")
	public @ResponseBody Bubble detail(@PathVariable final String id) {
		logger.debug("CALLED DETAIL VIEW CONTROLLER.");
		return bubbleRepository.findOne(id);
	}

	@RequestMapping(method = RequestMethod.GET, headers = "Accept=application/json", produces = "application/json")
	public @ResponseBody List<Bubble> list() {
		logger.debug("CALLED SIMPLE VIEW CONTROLLER.");
		return new ArrayList<Bubble>(bubbleRepository.findAll());
	}

	@RequestMapping(method = RequestMethod.POST)
	public String update(@RequestBody Bubble bubble) {
		logger.debug("Calling SimpleController::update() with title '{}' and desc '{}'.", bubble.getTitle(),
				bubble.getDescription());
		if (bubbleRepository.exists(bubble.getTitle())) {
			bubble = bubbleRepository.save(bubble);
			return "";
		} else {
			return "error.notexist";
		}
	}
}
