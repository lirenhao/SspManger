package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;

@Entity
@Table(name = "T_L_CUR_MER_SETTLE_LIST")
@IdClass(MerSettlePK.class)
public class MerSettle implements Serializable {

    public static final String TABLE_ALIAS = "MER SETTLE LIST";
    public static final String ALIAS_SETTLEDATE = "SETT DATE";
    public static final String ALIAS_ACQORGNAME = "BRANCH NAME";
    public static final String ALIAS_BOCORG = "BRACH CODE";
    public static final String ALIAS_MERCHANTID = "MERCHANT ID";
    public static final String ALIAS_MERNAMEENG = "MERCHANT NAME";
    public static final String ALIAS_ACCOUNTNO = "ACCT NUMER";
    public static final String ALIAS_ACCOUNTNAME = "ACCT NAME";
    public static final String ALIAS_BICCODE = "BANK NUMBER";
    public static final String ALIAS_ACCOUNTBANKNAMe = "BANK NAME";
    public static final String ALIAS_TRANCOUNT = "TXN COUNT";
    public static final String ALIAS_TRANAMT = "TXN AMT";
    public static final String ALIAS_FEE = "FEES";
    public static final String ALIAS_SETTLEAMT = "NET SETT AMT";

    @Id
    @Column
    private String settleDate;
    @Column
    private String acqOrgName;
    @Column
    private String bocOrg;
    @Id
    @Column
    private String merchantId;
    @Column
    private String merNameEng;
    @Column
    private String accountNo;
    @Column
    private String accountName;
    @Column
    private String bicCode;
    @Column
    private String accountBankName;
    @Column
    private BigInteger tranCount;
    @Column
    private BigDecimal tranAmt;
    @Column
    private BigDecimal fee;
    @Column
    private BigDecimal settleAmt;

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

    public String getSettleDate() {
        return settleDate;
    }

    public void setSettleDate(String settleDate) {
        this.settleDate = settleDate;
    }

    public String getAcqOrgName() {
        return acqOrgName;
    }

    public void setAcqOrgName(String acqOrgName) {
        this.acqOrgName = acqOrgName;
    }

    public String getBocOrg() {
        return bocOrg;
    }

    public void setBocOrg(String bocOrg) {
        this.bocOrg = bocOrg;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getMerNameEng() {
        return merNameEng;
    }

    public void setMerNameEng(String merNameEng) {
        this.merNameEng = merNameEng;
    }

    public String getAccountNo() {
        return accountNo;
    }

    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getBicCode() {
        return bicCode;
    }

    public void setBicCode(String bicCode) {
        this.bicCode = bicCode;
    }

    public String getAccountBankName() {
        return accountBankName;
    }

    public void setAccountBankName(String accountBankName) {
        this.accountBankName = accountBankName;
    }

    public BigInteger getTranCount() {
        return tranCount;
    }

    public void setTranCount(BigInteger tranCount) {
        this.tranCount = tranCount;
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
}
