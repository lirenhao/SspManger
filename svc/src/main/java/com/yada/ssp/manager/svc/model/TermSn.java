package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "T_B_TERM_SN")
@IdClass(TermSnPK.class)
public class TermSn {

    public static final String TABLE_ALIAS = "终端信息";
    public static final String ALIAS_VENDOR_ID = "VENDOR ID";
    public static final String ALIAS_SN_NO = "SN NO";
    public static final String ALIAS_TERMINAL_ID = "TERMINAL ID";
    public static final String ALIAS_MERCHANT_ID = "MERCHANT ID";
    public static final String ALIAS_PUBLIC_KEY = "POS PUBLIC KEY";
    public static final String ALIAS_PRIVATE_KEY = "POS PRIVATE KEY";
    public static final String ALIAS_LOCATION = "POS LOCATION";

    @Id
    @Column
    private String vendorId; // 厂商ID对应APIOrg中orgId

    @Id
    @Column
    private String snNo;

    @Column
    private String merchantId; // 商户号

    @Column
    private String terminalId; // 终端号

    @Column(length = 2048)
    private String publicKey; // POS公钥

    @Column(length = 2048)
    private String privateKey; // POS私钥

    @Column
    private String location; // 定位信息

    @JsonIgnore
    @OneToOne(targetEntity = MerApiOrg.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "vendorId", referencedColumnName = "orgId", insertable = false, updatable = false)
    private MerApiOrg apiOrg;

    @JsonIgnore
    @OneToOne(targetEntity = Merchant.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "merchantId", referencedColumnName = "merchantId", insertable = false, updatable = false)
    private Merchant merchant;

    @JsonIgnore
    @OneToOne(targetEntity = Terminal.class, fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "merchantId", referencedColumnName = "merchantId", insertable = false, updatable = false),
            @JoinColumn(name = "terminalId", referencedColumnName = "terminalId", insertable = false, updatable = false)
    })
    private Terminal terminal;

    public String getVendorId() {
        return vendorId;
    }

    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
    }

    public String getSnNo() {
        return snNo;
    }

    public void setSnNo(String snNo) {
        this.snNo = snNo;
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

    public String getPublicKey() {
        return publicKey;
    }

    public void setPublicKey(String publicKey) {
        this.publicKey = publicKey;
    }

    public String getPrivateKey() {
        return privateKey;
    }

    public void setPrivateKey(String privateKey) {
        this.privateKey = privateKey;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public MerApiOrg getApiOrg() {
        return apiOrg;
    }

    public void setApiOrg(MerApiOrg apiOrg) {
        this.apiOrg = apiOrg;
    }

    public Merchant getMerchant() {
        return merchant;
    }

    public void setMerchant(Merchant merchant) {
        this.merchant = merchant;
    }

    public Terminal getTerminal() {
        return terminal;
    }

    public void setTerminal(Terminal terminal) {
        this.terminal = terminal;
    }
}
