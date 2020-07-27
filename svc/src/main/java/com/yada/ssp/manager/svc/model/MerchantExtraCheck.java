package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * Created by bjy on 2018/8/3.
 * 商户附加信息申请表
 */
@Entity
@Table(name = "T_B_MERCHANT_EXTRA_CHECK")
public class MerchantExtraCheck {

    public static final String TABLE_ALIAS = "商户附加信息";
    public static final String ALIAS_MERNO = "MERCHANT ID";
    public static final String ALIAS_CCY_TYPE = "CURRENCY";
    public static final String ALIAS_INTERNATIONAL_CODE = "COUNTRY CODE";
    public static final String ALIAS_CHECK_STATE = "CHECK STATE";
    public static final String ALIAS_CHECK_REASON = "REJECT REASON";
    public static final String ALIAS_OPERATION = "OPERATION";

    //商户附加信息ID
    @Id
    @Column(nullable = false)
    private String merchantId;

    //商户信息
    @JsonIgnore
    @OneToOne(targetEntity = Merchant.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "merchantId", referencedColumnName = "merchantId")
    private Merchant merchant;

    //币种
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ccyType", referencedColumnName = "ccyType")
    private CcyType ccyType;

    //国家代码
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "internationalCode", referencedColumnName = "internationalCode")
    private InternationalCode internationalCode;
    //审核状态
    @Column
    private String checkState;
    //拒绝原因
    @Column
    private String checkReason;
    //操作
    @Column
    private String operation;

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public CcyType getCcyType() {
        return ccyType;
    }

    public void setCcyType(CcyType ccyType) {
        this.ccyType = ccyType;
    }

    public InternationalCode getInternationalCode() {
        return internationalCode;
    }

    public void setInternationalCode(InternationalCode internationalCode) {
        this.internationalCode = internationalCode;
    }

    public String getCheckState() {
        return checkState;
    }

    public void setCheckState(String checkState) {
        this.checkState = checkState;
    }

    public String getCheckReason() {
        return checkReason;
    }

    public void setCheckReason(String checkReason) {
        this.checkReason = checkReason;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public Merchant getMerchant() {
        return merchant;
    }

    public void setMerchant(Merchant merchant) {
        this.merchant = merchant;
    }
}
