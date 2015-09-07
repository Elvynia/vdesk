package org.arcanic.ramm.controller;

import java.util.List;

import org.arcanic.ramm.document.Note;
import org.arcanic.ramm.repository.NoteRepository;
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
 * REST API for {@link Note} Documents.
 *
 * @author jeremy.masson
 *
 */
@Controller
@RequestMapping("/note")
public class NoteController {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private NoteRepository noteService;

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void create(@RequestBody final Note note) {
		logger.debug("Calling NoteController::create()");
		noteService.insert(note);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable final String id) {
		logger.debug("Calling NoteController::delete() with id '{}'.", id);
		noteService.delete(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, headers = "Accept=application/json", produces = "application/json")
	public @ResponseBody Note get(@PathVariable final String id) {
		logger.debug("Calling NoteController::detail() with id '{}'.", id);
		return noteService.findOne(id);
	}

	@RequestMapping(method = RequestMethod.GET, headers = "Accept=application/json", produces = "application/json")
	public @ResponseBody List<Note> list() {
		logger.debug("Calling NoteController::list()");
		return noteService.findAll();
	}

}
