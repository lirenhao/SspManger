package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "T_B_MERCHANT_LIMIT")
public class MerLimit {

    public static final String TABLE_ALIAS = "Risk Control";
    public static final String ALIAS_MERCHANT_ID = "MERCHANT ID";
    public static final String ALIAS_MAX_TRX_COUNT = "MAX TRX COUNT";
    public static final String ALIAS_MAX_TRX_AMOUNT = "MAX TRX AMOUNT";
    public static final String ALIAS_STATUS = "STATUS";

    @Id
    private String merchantId; //商户号
    @Column
    private String maxTrxCount; // 最大交易总笔数
    @Column
    private String maxTrxAmount; // 最大交易总金额
    @Column
    private String status; // 0-close 1-open

    @JsonIgnore
    @OneToOne(targetEntity = Merchant.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "merchantId", referencedColumnName = "merchantId", insertable=false, updatable=false)
    private Merchant merchant;

    public Merchant getMerchant() {
        return merchant;
    }

    public void setMerchant(Merchant merchant) {
        this.merchant = merchant;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getMaxTrxCount() {
        return maxTrxCount;
    }

    public void setMaxTrxCount(String maxTrxCount) {
        this.maxTrxCount = maxTrxCount;
    }

    public String getMaxTrxAmount() {
        return maxTrxAmount;
    }

    public void setMaxTrxAmount(String maxTrxAmount) {
        this.maxTrxAmount = maxTrxAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
