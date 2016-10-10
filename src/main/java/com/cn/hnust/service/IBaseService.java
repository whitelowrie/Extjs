package com.cn.hnust.service;

import java.util.List;

/**
 * Created by ASUS on 2016/9/27.
 */
public interface IBaseService<T> {
    public T getModelById(char Id);

    public List<T> loadAllData();

    public int getCount();
}
