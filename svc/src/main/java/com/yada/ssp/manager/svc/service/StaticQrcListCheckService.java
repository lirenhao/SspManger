package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.StaticQrcListCheckDao;
import com.yada.ssp.manager.svc.dao.StaticQrcListDao;
import com.yada.ssp.manager.svc.model.StaticQrcList;
import com.yada.ssp.manager.svc.model.StaticQrcListCheck;
import com.yada.ssp.manager.svc.query.StaticQrcListCheckQuery;
import com.yada.ssp.manager.svc.util.DateUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by bjy on 2018/12/3.
 * 商户静态码审核Service
 */
@Service
@Transactional
public class StaticQrcListCheckService {
    private final StaticQrcListCheckDao staticQrcListCheckDao;
    private final StaticQrcListDao staticQrcListDao;
    @Autowired
    public StaticQrcListCheckService(StaticQrcListCheckDao staticQrcListCheckDao, StaticQrcListDao staticQrcListDao) {
        this.staticQrcListCheckDao = staticQrcListCheckDao;
        this.staticQrcListDao = staticQrcListDao;
    }

    public StaticQrcListCheck findOne(String lsId) {
        return staticQrcListCheckDao.getOne(lsId);
    }

    public Page<StaticQrcListCheck> findAll(StaticQrcListCheckQuery query, Pageable pageable) {
        return staticQrcListCheckDao.findAll(query, pageable);
    }

    public List<StaticQrcListCheck> findAll() {
        return staticQrcListCheckDao.findAll();
    }

    public void save(StaticQrcListCheck staticQrcListCheck) {
        staticQrcListCheck.setCheckState("0");
        staticQrcListCheck.setOperation("0");
        staticQrcListCheck.setCreateDate(DateUtil.getCurDate());
        staticQrcListCheckDao.saveAndFlush(staticQrcListCheck);
    }

    public void update(StaticQrcListCheck staticQrcListCheck) {
        staticQrcListCheck.setCheckState("0");
        staticQrcListCheck.setOperation("1");
        staticQrcListCheck.setCreateDate(DateUtil.getCurDate());
        staticQrcListCheckDao.saveAndFlush(staticQrcListCheck);
    }

    public void delete(String lsId) {
        StaticQrcListCheck staticQrcListCheck = staticQrcListCheckDao.getOne(lsId);
        staticQrcListCheck.setOperation("2");
        staticQrcListCheck.setCheckState("0");
        staticQrcListCheckDao.saveAndFlush(staticQrcListCheck);
    }

    public boolean exists (String lsId){
        return staticQrcListCheckDao.existsById(lsId);
    }

    public void saveCheck(String lsId, String checkReason, String state) {
        StaticQrcListCheck staticQrcListCheck = staticQrcListCheckDao.getOne(lsId);
        staticQrcListCheck.setCheckReason(checkReason);
        StaticQrcList staticQrcList = new StaticQrcList();
        if(state.equals("0")){
            if(staticQrcListCheck.getOperation().equals("2")){
                if(staticQrcListDao.existsById(lsId)) {
                    staticQrcListDao.deleteById(lsId);
                }
                staticQrcListCheckDao.deleteById(lsId);
            }else {
                staticQrcListCheck.setCheckState("1");
                BeanUtils.copyProperties(staticQrcListCheck, staticQrcList);
                staticQrcListDao.saveAndFlush(staticQrcList);
                staticQrcListCheckDao.saveAndFlush(staticQrcListCheck);
            }
        }else if(state.equals("1")){
            staticQrcListCheck.setCheckState("2");
            staticQrcListCheckDao.saveAndFlush(staticQrcListCheck);
        }

    }
}
