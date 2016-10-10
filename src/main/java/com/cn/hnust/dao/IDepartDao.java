package com.cn.hnust.dao;

import com.cn.hnust.pojo.Depart;

import java.util.List;

public interface IDepartDao extends IBaseDao<Depart> {
    List<Depart> loadAllData();
}