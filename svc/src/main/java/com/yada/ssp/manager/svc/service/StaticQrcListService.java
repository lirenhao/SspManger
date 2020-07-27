package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.StaticQrcListDao;
import com.yada.ssp.manager.svc.model.StaticQrcList;
import com.yada.ssp.manager.svc.query.StaticQrcListQuery;
import com.yada.ssp.manager.svc.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by bjy on 2018/11/27.
 * 商户静态码Service
 */
@Service
@Transactional
public class StaticQrcListService {
    private final StaticQrcListDao staticQrcListDao;


    @Autowired
    public StaticQrcListService(StaticQrcListDao staticQrcListDao) {
        this.staticQrcListDao = staticQrcListDao;
    }

    public StaticQrcList findOne(String lsId) {
        return staticQrcListDao.getOne(lsId);
    }

    public Page<StaticQrcList> findAll(StaticQrcListQuery query, Pageable pageable) {
        return staticQrcListDao.findAll(query, pageable);
    }

    public List<StaticQrcList> findAll() {
        return staticQrcListDao.findAll();
    }

    public void saveAndUpdate(StaticQrcList staticQrcList) {
        staticQrcList.setCreateDate(DateUtil.getCurDate());
        staticQrcListDao.saveAndFlush(staticQrcList);
    }

    public void delete(String lsId) {
        staticQrcListDao.deleteById(lsId);
    }

    public boolean exists (String lsId){
        return staticQrcListDao.existsById(lsId);
    }
}
