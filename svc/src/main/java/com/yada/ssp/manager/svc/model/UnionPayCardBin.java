package com.yada.ssp.manager.svc.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by bjy on 2018/7/26.
 * 银联卡bin表
 */

@Entity
@Table(name = "T_D_UNIONPAY_CARD_BIN")
public class UnionPayCardBin {

    public static final String TABLE_ALIAS = "银联卡bin";
    public static final String TABLE_ID = "银联卡binID";
    public static final String ALIAS_ISSUERIIN = "ISSUER IIN";
    public static final String ALIAS_ISSUERNAME = "ISSUER NAME";
    public static final String ALIAS_CARDLEVEL = "BANK CARD LEVEL";
    public static final String ALIAS_ISSUINGREGION = "ISSUING AREA";
    public static final String ALIAS_PCTBUSINESSTYPE = "PCT BUSINESS TYPE";
    public static final String ALIAS_BILLINGCURRENCY1 = "记账汇率1";
    public static final String ALIAS_BILLINGCURRENCY2 = "记账汇率2";
    public static final String ALIAS_BILLINGCURRENCY3 = "记账汇率3";
    public static final String ALIAS_RESERVED = "预留";
    public static final String ALIAS_BINLENGTH = "CARD BIN LENGTH";
    public static final String ALIAS_BIN = "CARD BIN";
    public static final String ALIAS_PANLENGTH = "密码长度";
    public static final String ALIAS_CARDTYPE = "BANK CARD CATEGORIES";
    public static final String ALIAS_SINGLEDUALMESSAGE = "单一/双重信息";
    public static final String ALIAS_TRANSATIONTYPESUPPORTED = "支持交易类别";
    public static final String ALIAS_TRANSATIONCHANNELSUPPORTED = "支持交易渠道";
    public static final String ALIAS_NETWORKOPENED = "网络开启";

    //银联卡binID
    @Id
    @GenericGenerator(name = "uuidGenerator", strategy = "uuid")
    @GeneratedValue(generator = "uuidGenerator")
    @Column(nullable = false)
    private String id;

    @Column
    private String issuerIin;
    @Column
    private String issuerName;
    @Column
    private String cardLevel;
    @Column
    private String issuingRegion;
    @Column
    private String cardProduct;
    @Column
    private String pctBusinessType;
    @Column
    private Long billingCurrency1;
    @Column
    private Long billingCurrency2;
    @Column
    private Long billingCurrency3;
    @Column
    private String reserved;
    @Column
    private Long binLength;
    @Column
    private String bin;
    @Column
    private Long panLength;
    @Column
    private String cardType;
    @Column
    private Long singleDualMessage;
    @Column
    private Long transationTypeSupported;
    @Column
    private Long transationChannelSupported;
    @Column
    private Long networkOpened;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIssuerIin() {
        return issuerIin;
    }

    public void setIssuerIin(String issuerIin) {
        this.issuerIin = issuerIin;
    }

    public String getIssuerName() {
        return issuerName;
    }

    public void setIssuerName(String issuerName) {
        this.issuerName = issuerName;
    }

    public String getCardLevel() {
        return cardLevel;
    }

    public void setCardLevel(String cardLevel) {
        this.cardLevel = cardLevel;
    }

    public String getIssuingRegion() {
        return issuingRegion;
    }

    public void setIssuingRegion(String issuingRegion) {
        this.issuingRegion = issuingRegion;
    }

    public String getCardProduct() {
        return cardProduct;
    }

    public void setCardProduct(String cardProduct) {
        this.cardProduct = cardProduct;
    }

    public String getPctBusinessType() {
        return pctBusinessType;
    }

    public void setPctBusinessType(String pctBusinessType) {
        this.pctBusinessType = pctBusinessType;
    }

    public Long getBillingCurrency1() {
        return billingCurrency1;
    }

    public void setBillingCurrency1(Long billingCurrency1) {
        this.billingCurrency1 = billingCurrency1;
    }

    public Long getBillingCurrency2() {
        return billingCurrency2;
    }

    public void setBillingCurrency2(Long billingCurrency2) {
        this.billingCurrency2 = billingCurrency2;
    }

    public Long getBillingCurrency3() {
        return billingCurrency3;
    }

    public void setBillingCurrency3(Long billingCurrency3) {
        this.billingCurrency3 = billingCurrency3;
    }

    public String getReserved() {
        return reserved;
    }

    public void setReserved(String reserved) {
        this.reserved = reserved;
    }

    public Long getBinLength() {
        return binLength;
    }

    public void setBinLength(Long binLength) {
        this.binLength = binLength;
    }

    public String getBin() {
        return bin;
    }

    public void setBin(String bin) {
        this.bin = bin;
    }

    public Long getPanLength() {
        return panLength;
    }

    public void setPanLength(Long panLength) {
        this.panLength = panLength;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public Long getSingleDualMessage() {
        return singleDualMessage;
    }

    public void setSingleDualMessage(Long singleDualMessage) {
        this.singleDualMessage = singleDualMessage;
    }

    public Long getTransationTypeSupported() {
        return transationTypeSupported;
    }

    public void setTransationTypeSupported(Long transationTypeSupported) {
        this.transationTypeSupported = transationTypeSupported;
    }

    public Long getTransationChannelSupported() {
        return transationChannelSupported;
    }

    public void setTransationChannelSupported(Long transationChannelSupported) {
        this.transationChannelSupported = transationChannelSupported;
    }

    public Long getNetworkOpened() {
        return networkOpened;
    }

    public void setNetworkOpened(Long networkOpened) {
        this.networkOpened = networkOpened;
    }
}
