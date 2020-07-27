package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "T_L_CUR_CUP_ACOMN_LIST")
public class CupAcomn {

    public static final String TABLE_ALIAS = "CUP ACOMN LIST";
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
    public static final String ALIAS_FEE_RECEIVABLE = "FEE RECEIVABLE";
    public static final String ALIAS_FEE_PAYABLE = "FEE PAYABLE";
    public static final String ALIAS_STATUS = "STATUS";

    @Id
    @Column
    private String lsId;
    @Column
    private String settleDate; // 清算日期
    @Column
    private String merchantId; // 商户号
    @Column
    private String terminalId; // 终端号
    @Column
    private String messageType; // 交易类型
    @Column
    private String procCode; // 交易类型
    @Column
    private String pan; // 卡号
    @Column
    private BigDecimal tranAmt; // 交易金额
    @Column
    private String tranDate; // 交易日期
    @Column
    private String tranTime; // 交易时间
    @Column
    private String rrn; // 参考号
    @Column
    private String authCode; // 授权号
    @Column
    private BigDecimal feeReceivable; // 应收手续费
    @Column
    private BigDecimal feePayable; // 应付手续费
    @Column
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

    public String getMessageType() {
        return messageType;
    }

    public void setMessageType(String messageType) {
        this.messageType = messageType;
    }

    public String getProcCode() {
        return procCode;
    }

    public void setProcCode(String procCode) {
        this.procCode = procCode;
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

    public BigDecimal getFeeReceivable() {
        return feeReceivable;
    }

    public void setFeeReceivable(BigDecimal feeReceivable) {
        this.feeReceivable = feeReceivable;
    }

    public BigDecimal getFeePayable() {
        return feePayable;
    }

    public void setFeePayable(BigDecimal feePayable) {
        this.feePayable = feePayable;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
