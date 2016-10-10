package org.smy.mvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/user")
public class MyTest {
	
	@ResponseBody
	@RequestMapping("/showUser")
	public String test(){
		return "myBest";
		
	}
}
