package com.yada.ssp.manager.svc.model;

import java.io.Serializable;

public class RiskTranPK implements Serializable {

    private String lsId; // 交易ID
    private String riskId; // 风险ID

    public String getLsId() {
        return lsId;
    }

    public void setLsId(String lsId) {
        this.lsId = lsId;
    }

    public String getRiskId() {
        return riskId;
    }

    public void setRiskId(String riskId) {
        this.riskId = riskId;
    }
}
