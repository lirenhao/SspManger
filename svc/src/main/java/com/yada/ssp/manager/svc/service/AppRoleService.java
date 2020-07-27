package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.AppRoleDao;
import com.yada.ssp.manager.svc.model.AppRole;
import com.yada.ssp.manager.svc.query.AppRoleQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by bjy on 2018/8/1.
 * App角色Service
 */

@Service
@Transactional
public class AppRoleService {
    private final AppRoleDao appRoleDao;

    @Autowired
    public AppRoleService(AppRoleDao appRoleDao) {
        this.appRoleDao = appRoleDao;
    }

    public AppRole findOne(String id) {
        return appRoleDao.getOne(id);
    }

    public Page<AppRole> findAll(AppRoleQuery query, Pageable pageable) {
        return appRoleDao.findAll(query, pageable);
    }

    public List<AppRole> findAll() {
        return appRoleDao.findAll();
    }

    public void saveAndUpdate(AppRole appRole) {
        appRoleDao.saveAndFlush(appRole);
    }

    public boolean exists (String id){
        return appRoleDao.existsById(id);
    }
}
