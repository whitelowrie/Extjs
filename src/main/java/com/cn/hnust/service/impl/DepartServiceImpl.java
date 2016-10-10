package com.cn.hnust.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.hnust.dao.IDepartDao;
import com.cn.hnust.pojo.Depart;
import com.cn.hnust.service.IDepartService;

import java.util.List;

@Service("departService")
public class DepartServiceImpl implements IDepartService {
	@Resource
	private IDepartDao departDao;

	public Depart getModelById(char userId) {
		return this.departDao.selectByPrimaryKey(userId);
	}

	public List<Depart> loadAllData() {
		return departDao.loadAllData();
	}


}
