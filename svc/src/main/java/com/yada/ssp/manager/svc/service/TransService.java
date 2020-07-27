package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.TransDao;
import com.yada.ssp.manager.svc.model.Trans;
import com.yada.ssp.manager.svc.query.TransQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by bjy on 2018/8/8.
 * 交易记录查询Sevice
 */

@Service
@Transactional(readOnly = true)
public class TransService {
    private final TransDao transDao;

    @Autowired
    public TransService(TransDao transDao) {
        this.transDao = transDao;
    }

    public Trans findOne(String traceNo) {
        return transDao.getOne(traceNo);
    }

    public Page<Trans> findAll(TransQuery query, Pageable pageable) {
        return transDao.findAll(query, pageable);
    }

    public List<Trans> findAll() {
        return transDao.findAll();
    }
}
