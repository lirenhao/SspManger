package com.yada.ssp.manager.svc.model;

import java.io.Serializable;

public class TermCountPK implements Serializable {

    private String orgId; // 机构号
    private String yearmon; // 月份
    private String merchantId; // 商户号
    private String terminalId; // 终端号

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getYearmon() {
        return yearmon;
    }

    public void setYearmon(String yearmon) {
        this.yearmon = yearmon;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getTerminalId() {
        return terminalId;
    }

    public void setTerminalId(String terminalId) {
        this.terminalId = terminalId;
    }
}
