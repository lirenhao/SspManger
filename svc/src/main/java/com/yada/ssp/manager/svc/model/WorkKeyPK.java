package com.yada.ssp.manager.svc.model;

import java.io.Serializable;

public class WorkKeyPK implements Serializable {

    private String merchantId;
    private String terminalId;

    public WorkKeyPK() {
    }

    public WorkKeyPK(String merchantId, String terminalId) {
        this.merchantId = merchantId;
        this.terminalId = terminalId;
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
