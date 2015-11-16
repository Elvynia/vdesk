package org.arcanic.ramm.controller;

import org.arcanic.ramm.math.CircleDemo;
import org.arcanic.ramm.service.MathService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/math")
public class MathController {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private MathService mathService;

	@RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public CircleDemo circle(@RequestBody final CircleDemo circleDemo) {
		logger.debug("Calling MathController::circle().");
		return mathService.processCircleDemo(circleDemo);
	}
}