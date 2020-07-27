package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * 商户清算明细
 */
@Entity
@Table(name = "V_SETTLE_CUR_MANUAL_LIST")
public class SettleDetail {

    public static final String TABLE_ALIAS = "MER SETTLE DETAIL";
    public static final String ALIAS_MERCHANTID = "MERCHANT ID";
    public static final String ALIAS_TERMINALID = "TERMINAL ID";
    public static final String ALIAS_CARDNO = "CARD NO";
    public static final String ALIAS_TRANDATE = "TXN DATE";
    public static final String ALIAS_TRANTIME = "TXN TIME";
    public static final String ALIAS_TRANAMT = "TXN AMT";
    public static final String ALIAS_FEE = "FEE";
    public static final String ALIAS_SETTLEAMT = "SETT AMT";
    public static final String ALIAS_SETTLEDATE = "SETT DATE";
    public static final String ALIAS_TRANNAME = "TXN NAME";
    public static final String ALIAS_RRN = "TXN RRN";

    @Id
    @Column
    private String lsId;
    @Column
    private String merchantId;
    @Column
    private String terminalId;
    @Column
    private String cardNo;
    @Column
    private String tranDate;
    @Column
    private String tranTime;
    @Column
    private BigDecimal tranAmt;
    @Column
    private BigDecimal fee;
    @Column
    private BigDecimal settleAmt;
    @Column
    private String settleDate;
    @Column
    private String tranName;
    @Column
    private String rrn;
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

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
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

    public BigDecimal getTranAmt() {
        return tranAmt;
    }

    public void setTranAmt(BigDecimal tranAmt) {
        this.tranAmt = tranAmt;
    }

    public BigDecimal getFee() {
        return fee;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
    }

    public BigDecimal getSettleAmt() {
        return settleAmt;
    }

    public void setSettleAmt(BigDecimal settleAmt) {
        this.settleAmt = settleAmt;
    }

    public String getSettleDate() {
        return settleDate;
    }

    public void setSettleDate(String settleDate) {
        this.settleDate = settleDate;
    }

    public String getTranName() {
        return tranName;
    }

    public void setTranName(String tranName) {
        this.tranName = tranName;
    }

    public String getRrn() {
        return rrn;
    }

    public void setRrn(String rrn) {
        this.rrn = rrn;
    }
}
