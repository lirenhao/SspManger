package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * Created by bjy on 2018/11/27.
 * 商户静态码
 */
@Entity
@Table(name = "T_L_STATIC_QRC_LIST")
public class StaticQrcList {

    public static final String TABLE_ALIAS = "商户静态码";
    public static final String ALIAS_LS_ID = "商户静态码ID";
    public static final String ALIAS_MERCHANT_ID = "MERCHANT ID";
    public static final String ALIAS_TERMINAL_ID = "TERMINAL ID";
    public static final String ALIAS_CREATE_DATE = "EFFECTIVE DATE";
    public static final String ALIAS_CCY_CODE = "CURRENCY";
    public static final String ALIAS_USE_CASE = "TRANSACTION TYPE";
    public static final String ALIAS_CARD_ASSO = "CARD ASSOCIATION";
    public static final String ALIAS_QR_VALUE = "MERCHANT QR CODE";

    //商户静态码ID
    @Id
    @Column(nullable = false, length = 32)
    private String lsId;
    //商户号
    @Column
    private String merchantId;
    //终端号
    @Column
    private String terminalId;
    //创建日期
    @Column
    private String createDate;
    //币种
    @JsonIgnore
    @OneToOne(targetEntity = CcyType.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "ccyCode", referencedColumnName = "ccyType")
    private CcyType ccyCode;
    //二维码用途
    @Column
    private String useCase;
    //商户二维码
    @Column
    private String qrValue;
    //卡组 02-VISA 04-MASTER 15-CUPS
    @Column
    private String cardAsso;

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

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public CcyType getCcyCode() {
        return ccyCode;
    }

    public void setCcyCode(CcyType ccyCode) {
        this.ccyCode = ccyCode;
    }

    public String getUseCase() {
        return useCase;
    }

    public void setUseCase(String useCase) {
        this.useCase = useCase;
    }

    public String getQrValue() {
        return qrValue;
    }

    public void setQrValue(String qrValue) {
        this.qrValue = qrValue;
    }

    public String getCardAsso() {
        return cardAsso;
    }

    public void setCardAsso(String cardAsso) {
        this.cardAsso = cardAsso;
    }
}
