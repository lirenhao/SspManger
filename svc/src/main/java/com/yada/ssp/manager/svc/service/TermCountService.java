package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.TermCountCurDao;
import com.yada.ssp.manager.svc.dao.TermCountHisDao;
import com.yada.ssp.manager.svc.model.TermCountCur;
import com.yada.ssp.manager.svc.model.TermCountHis;
import com.yada.ssp.manager.svc.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TermCountService {

    private TermCountHisDao termCountHisDao;
    private TermCountCurDao termCountCurDao;

    @Autowired
    public TermCountService(TermCountHisDao termCountHisDao, TermCountCurDao termCountCurDao) {
        this.termCountHisDao = termCountHisDao;
        this.termCountCurDao = termCountCurDao;
    }

    public Page<TermCountHis> findHis(String yearmon, String orgId, Pageable pageable) {
        return termCountHisDao.findAll(
                (root, query, cb) -> query.where(
                        cb.equal(root.get("yearmon").as(String.class), yearmon),
                        cb.like(root.get("orgId").as(String.class), orgId + "%")
                ).getRestriction(), pageable);
    }

    public Page<TermCountCur> findCurMonth(String orgId, Pageable pageable) {
        return termCountCurDao.findAll(
                (root, query, cb) -> query.where(
                        cb.equal(root.get("yearmon").as(String.class), DateUtil.getCurMonth()),
                        cb.like(root.get("orgId").as(String.class), orgId + "%")
                ).getRestriction(), pageable);
    }

    public List<TermCountHis> findHis(String yearmon, String orgId) {
        return termCountHisDao.findAll(
                (root, query, cb) -> query.where(
                        cb.equal(root.get("yearmon").as(String.class), yearmon),
                        cb.like(root.get("orgId").as(String.class), orgId + "%")
                ).getRestriction());
    }

    public List<TermCountCur> findCurMonth(String orgId) {
        return termCountCurDao.findAll(
                (root, query, cb) -> query.where(
                        cb.equal(root.get("yearmon").as(String.class), DateUtil.getCurMonth()),
                        cb.like(root.get("orgId").as(String.class), orgId + "%")
                ).getRestriction());
    }
}
