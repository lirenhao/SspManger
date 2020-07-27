package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * Created by bjy on 2018/8/7.
 * 交易记录查询表
 */

@Entity
@Table(name = "T_V_TRANS")
public class Trans {

    public static final String TABLE_ALIAS = "交易记录查询";
    public static final String ALIAS_TRACENO = "BANK LS NUMBER";
    public static final String ALIAS_BATCHNO = "BATCH NUMBER";
    public static final String ALIAS_TRANAMT = "TRANSACTION AMOUNT";
    public static final String ALIAS_TRANTYPE = "TYPE OF TRANSACTION";
    public static final String ALIAS_TRANDATE = "TRANSACTION DATE";
    public static final String ALIAS_CHANNEL = "CARD TYPE";
    public static final String ALIAS_CARDNO = "CARD NUMBER";
    public static final String ALIAS_MERNO = "MERCHANT ID";
    public static final String ALIAS_TERMNO = "TERMINAL ID";
    public static final String ALIAS_RRN = "REFERENCE NUMBER";
    public static final String ALIAS_RESPCODE = "RESPONSE CODE";
    public static final String ALIAS_MERTRACENO = "MER TRACE NO";
    public static final String ALIAS_CHANNELTRACENO = "CHANNEL TRACE NO";

    @Id
    @Column(name = "BANK_LS_NO")
    private String traceNo; // 流水号
    @Column
    private Long batchNo; // 批次号
    @Column
    private Float tranAmt; // 交易金额
    @Column
    private String tranType; // 交易类型
    @Column
    private String tranDate; // 交易日期
    @Column
    private String tranTime; // 交易时间
    @Column
    private String channel; // 交易渠道
    @Column
    private String cardNo; // 卡号
    @Column
    private String merNo; // 商户号
    @Column
    private String termNo; // 终端号
    @Column
    private String rrn; // 参考号
    @Column
    private String respCode; // 返回码
    @Column
    private String merTraceNo; // 商户交易订单号
    @Column
    private String channelTraceNo; // 渠道交易流水号

    @JsonIgnore
    @OneToOne(targetEntity = Merchant.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "merNo", referencedColumnName = "merchantId", insertable = false, updatable = false)
    private Merchant merchant;

    public Merchant getMerchant() {
        return merchant;
    }

    public void setMerchant(Merchant merchant) {
        this.merchant = merchant;
    }

    public String getTraceNo() {
        return traceNo;
    }

    public void setTraceNo(String traceNo) {
        this.traceNo = traceNo;
    }

    public Long getBatchNo() {
        return batchNo;
    }

    public void setBatchNo(Long batchNo) {
        this.batchNo = batchNo;
    }

    public Float getTranAmt() {
        return tranAmt;
    }

    public void setTranAmt(Float tranAmt) {
        this.tranAmt = tranAmt;
    }

    public String getTranType() {
        return tranType;
    }

    public void setTranType(String tranType) {
        this.tranType = tranType;
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

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public String getMerNo() {
        return merNo;
    }

    public void setMerNo(String merNo) {
        this.merNo = merNo;
    }

    public String getTermNo() {
        return termNo;
    }

    public void setTermNo(String termNo) {
        this.termNo = termNo;
    }

    public String getRrn() {
        return rrn;
    }

    public void setRrn(String rrn) {
        this.rrn = rrn;
    }

    public String getRespCode() {
        return respCode;
    }

    public void setRespCode(String respCode) {
        this.respCode = respCode;
    }

    public String getMerTraceNo() {
        return merTraceNo;
    }

    public void setMerTraceNo(String merTraceNo) {
        this.merTraceNo = merTraceNo;
    }

    public String getChannelTraceNo() {
        return channelTraceNo;
    }

    public void setChannelTraceNo(String channelTraceNo) {
        this.channelTraceNo = channelTraceNo;
    }
}
