package com.yada.ssp.manager.svc.model;

import java.io.Serializable;

public class MerUserPK implements Serializable {

    private String merchantId;
    private String userId;

    public MerUserPK() {
    }

    public MerUserPK(String merchantId, String userId) {
        this.merchantId = merchantId;
        this.userId = userId;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
