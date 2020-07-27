package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.RiskListDao;
import com.yada.ssp.manager.svc.dao.RiskTranDao;
import com.yada.ssp.manager.svc.model.RiskList;
import com.yada.ssp.manager.svc.model.RiskTran;
import com.yada.ssp.manager.svc.query.RiskListQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RiskListService {

    private final RiskListDao riskListDao;
    private final RiskTranDao riskTranDao;

    @Autowired
    public RiskListService(RiskListDao riskListDao, RiskTranDao riskTranDao) {
        this.riskListDao = riskListDao;
        this.riskTranDao = riskTranDao;
    }

    public Page<RiskList> findAll(RiskListQuery query, Pageable pageable) {
        return riskListDao.findAll(query, pageable);
    }

    public RiskList findOne(String id) {
        return riskListDao.getOne(id);
    }

    public List<RiskTran> findRiskTran(String riskId) {
        return riskTranDao.findByRiskIdOrderByTranTime(riskId);
    }

}
