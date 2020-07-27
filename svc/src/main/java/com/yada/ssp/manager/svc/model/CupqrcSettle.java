package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "T_L_CUR_CUPQRC_SETTLE_LIST")
public class CupqrcSettle {

    public static final String ALIAS_SETTLE_DATE = "SETT DATE";
    public static final String ALIAS_MERCHANT_ID = "MERCHANT ID";
    public static final String ALIAS_TERMINAL_ID = "TERMINAL ID";
    public static final String ALIAS_TRAN_TYPE = "TXN TYPE";
    public static final String ALIAS_PAN = "CARD NUMBER";
    public static final String ALIAS_TRAN_AMT = "TXN AMOUNT";
    public static final String ALIAS_TRAN_DATE = "TXN DATE";
    public static final String ALIAS_TRAN_TIME = "TXN TIME";
    public static final String ALIAS_RRN = "REFERENCE NO";
    public static final String ALIAS_AUTH_CODE = "AUTH CODE";
    public static final String ALIAS_FEE = "FEE";
    public static final String ALIAS_STATUS = "STATUS";

    @Id
    @Column
    private String lsId;
    @Column(name = "LOCAL_SETTLE_DATE")
    private String settleDate; // 清算日期
    @Column
    private String merchantId; // 商户号
    @Column
    private String terminalId; // 终端号
    @Column
    private String tranType;
    @Column(name = "CARD_NO")
    private String pan; // 卡号
    @Column
    private BigDecimal tranAmt; // 交易金额
    @Column(name = "LOCAL_SYS_DATE")
    private String tranDate; // 交易日期
    @Column(name = "LOCAL_SYS_TIME")
    private String tranTime; // 交易时间
    @Column(name = "TRAN_RRN")
    private String rrn; // 参考号
    @Column(name = "AUTH_NO")
    private String authCode; // 授权号
    @Column(name = "ADD_DATA2")
    private BigDecimal fee; // 手续费
    @Column(name = "LOCAL_SETTLE_FLAG")
    private String status; // 清算标识

    @JsonIgnore
    @OneToOne(targetEntity = Merchant.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "merchantId", referencedColumnName = "merchantId", insertable = false, updatable = false)
    private Merchant merchant;

    public Merchant getMerchant() {
        return merchant;
    }

    public void setMerchant(Merchant merchant) {
        this.merchant = merchant;
    }

    public String getLsId() {
        return lsId;
    }

    public void setLsId(String lsId) {
        this.lsId = lsId;
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

    public String getTerminalId() {
        return terminalId;
    }

    public void setTerminalId(String terminalId) {
        this.terminalId = terminalId;
    }

    public String getTranType() {
        return tranType;
    }

    public void setTranType(String tranType) {
        this.tranType = tranType;
    }

    public String getPan() {
        return pan;
    }

    public void setPan(String pan) {
        this.pan = pan;
    }

    public BigDecimal getTranAmt() {
        return tranAmt;
    }

    public void setTranAmt(BigDecimal tranAmt) {
        this.tranAmt = tranAmt;
    }

    public String getTranDate() {
        return tranDate;
    }

    public void setTranDate(String tranDate) {
        this.tranDate = tranDate;
    }

    public String getTranTime() {
        return tranTime;
    }

    public void setTranTime(String tranTime) {
        this.tranTime = tranTime;
    }

    public String getRrn() {
        return rrn;
    }

    public void setRrn(String rrn) {
        this.rrn = rrn;
    }

    public String getAuthCode() {
        return authCode;
    }

    public void setAuthCode(String authCode) {
        this.authCode = authCode;
    }

    public BigDecimal getFee() {
        return fee;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
