package com.yada.ssp.manager.svc.model;

import java.io.Serializable;

public class MerSettlePK implements Serializable {

    private String settleDate; // 清算日期
    private String merchantId; // 商户号

    public MerSettlePK() {
    }

    public MerSettlePK(String settleDate, String merchantId) {
        this.settleDate = settleDate;
        this.merchantId = merchantId;
    }

    public String getSettleDate() {
        return settleDate;
    }

    public void setSettleDate(String settleDate) {
        this.settleDate = settleDate;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }
}
