package com.yada.ssp.manager.svc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 商户附加信息
 */
@Entity
@Table(name = "T_B_MERCHANT_EXTRA")
public class MerchantExtra {

    //商户附加信息ID
    @Id
    private String merchantId;

    //币种
    @Column
    private String ccyType;

    //国家代码
    @Column
    private String internationalCode;

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getCcyType() {
        return ccyType;
    }

    public void setCcyType(String ccyType) {
        this.ccyType = ccyType;
    }

    public String getInternationalCode() {
        return internationalCode;
    }

    public void setInternationalCode(String internationalCode) {
        this.internationalCode = internationalCode;
    }
}
