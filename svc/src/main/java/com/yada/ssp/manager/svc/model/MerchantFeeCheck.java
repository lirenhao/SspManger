package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by bjy on 2018/11/27.
 * 商户费率申请表
 */

@Entity
@Table(name = "T_B_MERCHANT_FEE_CHECK")
public class MerchantFeeCheck {

    public static final String TABLE_ALIAS = "商户费率";
    public static final String ALIAS_LS_ID = "商户费率ID";
    public static final String ALIAS_MERCHANT_ID = "MERCHANT ID";
    public static final String ALIAS_FEE_TYPE = "CHARGE AMOUNT STATE";
    public static final String ALIAS_CARD_ORG_NUM = "CARD TYPE";
    public static final String ALIAS_TRAN_CNT = "TRANS COUNT TIER";
    public static final String ALIAS_TRAN_AMT = "TRANS AMOUNT TIER";
    public static final String ALIAS_FEE = "MDR RATES";
//    public static final String ALIAS_STAT = "STATUS";
    public static final String ALIAS_FEE_MIN_AMT = "MINIMUM MDR AMOUNT";
    public static final String ALIAS_START_DATE = "EFFECTIVE DATE";
    public static final String ALIAS_CLOSE_DATE = "DEACTIVATE DATE";
//    public static final String ALIAS_REJECT_RESON = "REJECTION REASON";
    public static final String ALIAS_CHECK_STATE = "CHECK STATE";
    public static final String ALIAS_CHECK_REASON = "REJECT REASON";
    public static final String ALIAS_OPERATION = "OPERATION";
    //商户费率ID
    @Id
    @GenericGenerator(name = "uuidGenerator", strategy = "uuid")
    @GeneratedValue(generator = "uuidGenerator")
    @Column(nullable = false, length = 32)
    private String lsId;
    //商户号
    @JsonIgnore
    @OneToOne(targetEntity = Merchant.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "merchantId", referencedColumnName = "merchantId")
    private Merchant merchant;
    //交易量或交易金额
    @Column
    private String feeType;
    //卡类型
    @Column
    private String cardOrgNum;
    //交易量阶梯
    @Column
    private String tranCnt;
    //交易金额阶梯
    @Column
    private String tranAmt;
    //扣率
    @Column
    private BigDecimal fee;
    //最小交易手续费
    @Column
    private String feeMinAmt;
    //生效日期
    @Column
    private String startDate;
    //失效日期
    @Column
    private String closeDate;
    //审核状态 1 提交待审核 2审核通过 3拒绝 4失效待审核
    @Column
    private String checkState;
    //拒绝原因
    @Column
    private String checkReason;
    //操作
    @Column
    private String operation;

    public String getLsId() {
        return lsId;
    }

    public void setLsId(String lsId) {
        this.lsId = lsId;
    }

    public Merchant getMerchant() {
        return merchant;
    }

    public void setMerchant(Merchant merchant) {
        this.merchant = merchant;
    }

    public String getFeeType() {
        return feeType;
    }

    public void setFeeType(String feeType) {
        this.feeType = feeType;
    }

    public String getCardOrgNum() {
        return cardOrgNum;
    }

    public void setCardOrgNum(String cardOrgNum) {
        this.cardOrgNum = cardOrgNum;
    }

    public String getTranCnt() {
        return tranCnt;
    }

    public void setTranCnt(String tranCnt) {
        this.tranCnt = tranCnt;
    }

    public String getTranAmt() {
        return tranAmt;
    }

    public void setTranAmt(String tranAmt) {
        this.tranAmt = tranAmt;
    }

    public BigDecimal getFee() {
        return fee;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
    }

    public String getFeeMinAmt() {
        return feeMinAmt;
    }

    public void setFeeMinAmt(String feeMinAmt) {
        this.feeMinAmt = feeMinAmt;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getCloseDate() {
        return closeDate;
    }

    public void setCloseDate(String closeDate) {
        this.closeDate = closeDate;
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
