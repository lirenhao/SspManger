package com.yada.ssp.manager.svc.dao;

import com.yada.ssp.manager.svc.base.BaseDao;
import com.yada.ssp.manager.svc.model.RiskTran;
import com.yada.ssp.manager.svc.model.RiskTranPK;

import java.util.List;

public interface RiskTranDao extends BaseDao<RiskTran, RiskTranPK> {

    List<RiskTran> findByRiskIdOrderByTranTime(String riskCode);
}
