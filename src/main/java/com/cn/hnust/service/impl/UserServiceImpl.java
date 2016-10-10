package com.cn.hnust.service.impl;

import com.cn.hnust.dao.IUserDao;
import com.cn.hnust.pojo.User;
import com.cn.hnust.service.IUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("userService")
public class UserServiceImpl implements IUserService {
	@Resource
	private IUserDao userDao;

	public User getUserById(int userId) {
			// TODO Auto-generated method stub
			return this.userDao.selectByPrimaryKey(userId);
	}

	public List<User> loadAllData(){
		return this.userDao.loadAllData();
	}
}
