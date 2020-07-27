package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "T_L_CUR_MANUAL_SETTLE_LIST_CK")
public class ManualSettleCheck {

    public static final String TABLE_ALIAS = "MANUAL SETTLE LIST";
    public static final String ALIAS_INPUT_DATE = "INPUT DATE";
    public static final String ALIAS_MERCHANT_ID = "MERCHANT ID";
    public static final String ALIAS_TRAN_AMT = "TRAN AMOUNT";
    public static final String ALIAS_FEE = "FEE";
    public static final String ALIAS_SETTLE_AMT = "SETTLE AMOUNT";
    public static final String ALIAS_SETTLE_DATE = "SETTLE DATE";
    public static final String ALIAS_CHECK_STATE = "CHECK STATE";
    public static final String ALIAS_CHECK_REASON = "REJECT REASON";
    public static final String ALIAS_OPERATION = "OPERATION";

    @Id
    @GenericGenerator(name = "uuidGenerator", strategy = "uuid")
    @GeneratedValue(generator = "uuidGenerator")
    @Column
    private String lsId;
    @Column
    private String inputDate; // 录入日期
    @Column
    private String merchantId;  // 商户号
    @Column
    private String tranAmt;
    @Column
    private String fee;
    @Column
    private String settleAmt; // 清算金额
    @Column
    private String settleDate; // 清算日期
    @Column
    private String checkState; // 审核状态
    @Column
    private String checkReason; // 拒绝原因
    @Column
    private String operation;  // 操作

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

    public String getInputDate() {
        return inputDate;
    }

    public void setInputDate(String inputDate) {
        this.inputDate = inputDate;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getTranAmt() {
        return tranAmt;
    }

    public void setTranAmt(String tranAmt) {
        this.tranAmt = tranAmt;
    }

    public String getFee() {
        return fee;
    }

    public void setFee(String fee) {
        this.fee = fee;
    }

    public String getSettleAmt() {
        return settleAmt;
    }

    public void setSettleAmt(String settleAmt) {
        this.settleAmt = settleAmt;
    }

    public String getSettleDate() {
        return settleDate;
    }

    public void setSettleDate(String settleDate) {
        this.settleDate = settleDate;
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
