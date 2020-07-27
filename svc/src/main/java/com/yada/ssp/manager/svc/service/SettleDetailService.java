package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.SettleDetailDao;
import com.yada.ssp.manager.svc.model.SettleDetail;
import com.yada.ssp.manager.svc.query.SettleDetailQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SettleDetailService {

    private final SettleDetailDao settleDetailDao;

    public SettleDetailService(SettleDetailDao settleDetailDao) {
        this.settleDetailDao = settleDetailDao;
    }

    public Page<SettleDetail> findAll(SettleDetailQuery query, Pageable page) {
        return settleDetailDao.findAll(query, page);
    }

    public List<SettleDetail> findAll(SettleDetailQuery query) {
        return settleDetailDao.findAll(query);
    }
}
