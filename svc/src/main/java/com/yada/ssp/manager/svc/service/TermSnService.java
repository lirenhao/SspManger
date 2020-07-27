package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.TermSnDao;
import com.yada.ssp.manager.svc.model.TermSn;
import com.yada.ssp.manager.svc.model.TermSnPK;
import com.yada.ssp.manager.svc.query.TermSnQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TermSnService {

    private final TermSnDao termSnDao;

    @Autowired
    public TermSnService(TermSnDao termSnDao) {
        this.termSnDao = termSnDao;
    }

    public Page<TermSn> findAll(TermSnQuery query, Pageable pageable) {
        return termSnDao.findAll(query, pageable);
    }

    public void delete(String orgId, String sn) {
        termSnDao.deleteById(new TermSnPK(orgId, sn));
    }
}
