package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.PospOrgTmkDao;
import com.yada.ssp.manager.svc.model.PospOrgTmk;
import com.yada.ssp.manager.svc.model.PospOrgTmkPK;
import com.yada.ssp.manager.svc.query.PospOrgTmkQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PospOrgTmkService {

    private final PospOrgTmkDao pospOrgTmkDao;

    @Autowired
    public PospOrgTmkService(PospOrgTmkDao pospOrgTmkDao) {
        this.pospOrgTmkDao = pospOrgTmkDao;
    }

    public Page<PospOrgTmk> findAll(PospOrgTmkQuery query, Pageable pageable) {
        return pospOrgTmkDao.findAll(query, pageable);
    }

    public int total(String orgId) {
        return pospOrgTmkDao.countByOrgIdLike(orgId + "%");
    }

    public int enable(String orgId) {
        return pospOrgTmkDao.countByOrgIdLikeAndTerminalIdNull(orgId + "%");
    }

    public int unable(String orgId) {
        return pospOrgTmkDao.countByOrgIdLikeAndTerminalIdNotNull(orgId + "%");
    }

    public int termNum(String orgId) {
        return pospOrgTmkDao.countTerminalId(orgId + "%");
    }

    public void saveAndUpdate(PospOrgTmk pospOrgTmk) {
        pospOrgTmkDao.saveAndFlush(pospOrgTmk);
    }

    public void delete(String orgId, String tmkZmk) {
        pospOrgTmkDao.deleteById(new PospOrgTmkPK(orgId, tmkZmk));
    }

    public List<PospOrgTmk> batchSave(List<PospOrgTmk> list) {
        List<PospOrgTmk> exists = new ArrayList<>();
        List<PospOrgTmk> saves = new ArrayList<>();
        for(PospOrgTmk tmk: list) {
            if(pospOrgTmkDao.existsById(new PospOrgTmkPK(tmk.getOrgId(), tmk.getTmkZmk()))) {
                exists.add(tmk);
            } else {
                saves.add(tmk);
            }
        }
        pospOrgTmkDao.saveAll(saves);
        return exists;
    }
}
