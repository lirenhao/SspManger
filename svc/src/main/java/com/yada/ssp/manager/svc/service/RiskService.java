package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.RiskDao;
import com.yada.ssp.manager.svc.model.Risk;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RiskService {

    private final RiskDao riskDao;

    @Autowired
    public RiskService(RiskDao riskDao) {
        this.riskDao = riskDao;
    }

    public List<Risk> findAll() {
        return riskDao.findAll();
    }


    public Risk findOne(String id) {
        return riskDao.getOne(id);
    }

    public void update(Risk risk) {
        Risk oldRisk = riskDao.getOne(risk.getRiskCode());
        risk.setValueFormat(oldRisk.getValueFormat());
        riskDao.saveAndFlush(risk);
    }
}
