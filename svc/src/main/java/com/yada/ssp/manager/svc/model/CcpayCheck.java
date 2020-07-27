package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * CcPay申请表
 */
@Entity
@Table(name = "T_B_MERCHANT_CCPAY_CHECK")
public class CcpayCheck {

    public static final String TABLE_ALIAS = "CcPay";
    public static final String ALIAS_MERCHANT_ID = "MERCHANT ID";
    public static final String ALIAS_CCPAY_MER_NAME = "MERCHANT DOING BUSINESS NAME";
    public static final String ALIAS_CCPAY_MER_PASS = "PASSWORD";
    public static final String ALIAS_STATIC_QRC = "STATIC QR CODE";
    public static final String ALIAS_NOTIFY_FLAG = "STATUS";
    public static final String ALIAS_CCPAY_FEE = "MDR RATES";
    public static final String ALIAS_CHECK_STATE = "CHECK STATE";
    public static final String ALIAS_CHECK_REASON = "REJECT REASON";
    public static final String ALIAS_OPERATION = "OPERATION";

    //商户号
    @Id
    @Column(nullable = false)
    private String merchantId;
    //用户名
    @Column
    private String ccpayMerName;
    //用户密码
    @Column
    private String ccpayMerPass;
    //静态二维码
    @Column
    private String staticQrc;
    //通知状态
    @Column
    private String notifyFlag;
    //扣率
    @Column
    private BigDecimal fee;
    //审核状态
    @Column
    private String checkState;
    //拒绝原因
    @Column
    private String checkReason;
    //操作
    @Column
    private String operation;
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

    public String getCcpayMerName() {
        return ccpayMerName;
    }

    public void setCcpayMerName(String ccpayMerName) {
        this.ccpayMerName = ccpayMerName;
    }

    public String getCcpayMerPass() {
        return ccpayMerPass;
    }

    public void setCcpayMerPass(String ccpayMerPass) {
        this.ccpayMerPass = ccpayMerPass;
    }

    public String getStaticQrc() {
        return staticQrc;
    }

    public void setStaticQrc(String staticQrc) {
        this.staticQrc = staticQrc;
    }

    public String getNotifyFlag() {
        return notifyFlag;
    }

    public void setNotifyFlag(String notifyFlag) {
        this.notifyFlag = notifyFlag;
    }

    public BigDecimal getFee() {
        return fee;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
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
}
