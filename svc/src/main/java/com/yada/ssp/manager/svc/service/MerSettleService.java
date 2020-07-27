package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.MerSettleDao;
import com.yada.ssp.manager.svc.model.MerSettle;
import com.yada.ssp.manager.svc.query.MerSettleQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MerSettleService {

    private final MerSettleDao merSettleDao;

    public MerSettleService(MerSettleDao merSettleDao) {
        this.merSettleDao = merSettleDao;
    }

    public Page<MerSettle> findAll (MerSettleQuery query, Pageable page) {
        return merSettleDao.findAll(query, page);
    }

    public List<MerSettle> findAll (MerSettleQuery query) {
        return merSettleDao.findAll(query);
    }
}
