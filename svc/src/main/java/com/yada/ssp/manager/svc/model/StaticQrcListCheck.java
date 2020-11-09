package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by bjy on 2018/11/27.
 * 商户静态码申请表
 */
@Entity
@Table(name = "T_L_STATIC_QRC_LIST_CHECK")
public class StaticQrcListCheck {

    public static final String TABLE_ALIAS = "商户静态码";
    public static final String ALIAS_LS_ID = "商户静态码ID";
    public static final String ALIAS_MERCHANT_ID = "MERCHANT ID";
    public static final String ALIAS_TERMINAL_ID = "TERMINAL ID";
    public static final String ALIAS_CREATE_DATE = "EFFECTIVE DATE";
    public static final String ALIAS_CCY_CODE = "CURRENCY";
    public static final String ALIAS_USE_CASE = "TRANSACTION TYPE";
    public static final String ALIAS_CARD_ASSO = "CARD ASSOCIATION";
    public static final String ALIAS_QR_VALUE = "MERCHANT QR CODE";
    public static final String ALIAS_CHECK_STATE = "CHECK STATE";
    public static final String ALIAS_CHECK_REASON = "REJECT REASON";
    public static final String ALIAS_OPERATION = "OPERATION";

    //商户静态码ID
    @Id
    @GenericGenerator(name = "uuidGenerator", strategy = "uuid")
    @GeneratedValue(generator = "uuidGenerator")
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



    @Column(name="ccyCode")
    private String ccyType;
    //币种
    @OneToOne(targetEntity = CcyType.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "ccyCode", referencedColumnName = "ccyType",insertable = false,updatable = false)
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

    public String getCcyType() {
        return this.ccyType;
    }

    public void setCcyType(String ccyType) {
        this.ccyType = ccyType;
    }
}
