package com.cn.hnust.dao;

import com.cn.hnust.pojo.Depart;

import java.util.List;

/**
 * Created by ASUS on 2016/9/27.
 */
public interface IBaseDao<T> {
    int deleteByPrimaryKey(Character id);

    List<T> loadAllData();

    int insert(T record);

    int insertSelective(T record);

    T selectByPrimaryKey(Character id);

    int updateByPrimaryKeySelective(Character record);

    int updateByPrimaryKey(Character record);
}
