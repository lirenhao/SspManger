package com.yada.ssp.manager.svc.model;

import javax.persistence.*;

@Entity
@Table(name = "T_WEB_MER_USER")
@IdClass(MerUserPK.class)
public class MerUser {

    public static final String TABLE_ALIAS = "MERCHANT USER";
    public static final String ALIAS_MERCHANT_ID= "MERCHANT ID";
    public static final String ALIAS_MERCHANT_NAME = "MERCHANT NAME";
    public static final String ALIAS_USER_ID = "USER ID";
    public static final String ALIAS_EMAIL_ADDRESS = "EMAIL ADDRESS";

    //商户号
    @Id
    private String merchantId;

    //商户用户ID
    @Id
    @Column
    private String userId;

    @Column
    private String emailAddress;

    //商户
    @OneToOne(targetEntity = Merchant.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "merchantId", referencedColumnName = "merchantId", insertable=false, updatable=false)
    private Merchant merchant;

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public Merchant getMerchant() {
        return merchant;
    }

    public void setMerchant(Merchant merchant) {
        this.merchant = merchant;
    }
}