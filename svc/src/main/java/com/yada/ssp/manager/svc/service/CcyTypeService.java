package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.CcyTypeDao;
import com.yada.ssp.manager.svc.model.CcyType;
import com.yada.ssp.manager.svc.query.CcyTypeQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by bjy on 2018/9/5.
 * 币种Service
 */

@Service
@Transactional
public class CcyTypeService {

    private final CcyTypeDao ccyTypeDao;

    @Autowired
    public CcyTypeService(CcyTypeDao ccyTypeDao) {
        this.ccyTypeDao = ccyTypeDao;
    }

    public CcyType findOne(String ccyType) {
        return ccyTypeDao.getOne(ccyType);
    }

    public Page<CcyType> findAll(CcyTypeQuery query, Pageable pageable) {
        return ccyTypeDao.findAll(query, pageable);
    }

    public List<CcyType> findAll() {
        return ccyTypeDao.findAll();
    }

    public void saveAndUpdate(CcyType ccyType) {
        ccyTypeDao.saveAndFlush(ccyType);
    }

    public void delete(String ccyType) {
        ccyTypeDao.deleteById(ccyType);
    }

    public boolean exists(String ccyType) {
        return ccyTypeDao.existsById(ccyType);
    }
}
