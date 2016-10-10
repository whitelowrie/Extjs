package com.cn.hnust.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.hnust.pojo.Depart;
import com.cn.hnust.service.IDepartService;

import java.util.List;

@Controller
@RequestMapping("/depart")
public class DepartController {
	@Resource
	private IDepartService departService;
	
	@ResponseBody
	@RequestMapping("/load")
	public Object loadAllData(HttpServletRequest request){
		List<Depart> departList = this.departService.loadAllData();
		JSONArray json = (JSONArray)JSONArray.toJSON(departList);
		JSONObject jsonobj = new JSONObject();
		jsonobj.put("root",json);
		jsonobj.put("success", true);
		jsonobj.put("total", json.size());
		jsonobj.put("message","没有信息!");
		
		return jsonobj;
	}

	@ResponseBody
	@RequestMapping("/getDepart")
	public String toIndex(HttpServletRequest request,Model model){
		Character userId = request.getParameter("id").toCharArray()[0];
		Depart depart = this.departService.getModelById(userId);
		model.addAttribute("depart", depart);
		return "showDepart";
	}

	@ResponseBody
	@RequestMapping("/new")
	public Object createDepart(@RequestBody Depart[] departArray){
		return null;
	}

	@ResponseBody
	@RequestMapping("/modify")
	public Object modifyDepart(@RequestBody Depart[] departArray){
		return null;
	}

	@ResponseBody
	@RequestMapping("/destory")
	public Object removeDepart(@RequestBody Depart[] departArray){
		return null;
	}
}
