package org.arcanic.ramm.controller;

import java.util.List;

import org.arcanic.ramm.document.Reference;
import org.arcanic.ramm.repository.ReferenceRepository;
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

/**
 * REST API for {@link Reference} Documents.
 *
 * @author jeremy.masson
 *
 */
@Controller
@RequestMapping("/reference")
public class ReferenceController {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ReferenceRepository referenceService;

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public Reference create(@RequestBody final Reference ref) {
		logger.debug("Calling ReferenceController::create() with keyword '{}'.", ref.getKeyword());
		return referenceService.insert(ref);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable final String id) {
		logger.debug("Calling ReferenceController::delete() with id '{}'.", id);
		referenceService.delete(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody List<Reference> get(@PathVariable final String id) {
		logger.debug("Calling ReferenceController::get() with id '{}'.", id);
		return referenceService.findAll();
	}

	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody List<Reference> list() {
		logger.debug("Calling ReferenceController::list().");
		return referenceService.findAll();
	}
}
