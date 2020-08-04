package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

/**
 * API机构表
 */
@Entity
@Table(name = "T_B_MERAPI_ORG")
public class MerApiOrg {

    //机构ID
    @Id
    @Column
    private String orgId;
    //机构名称
    @Column
    private String orgName;
    // 机构类型;0-POS机构,1-商户机构;2-第三方支付机构;9-行内测试
    @Column
    private String orgType;
    //机构公钥
    @Column(length = 2048)
    private String publicKey;
    //通知地址
    @Column
    private String notifyUrl;
    //银行私钥
    @Column(length = 2048)
    private String privateKey;

    //所属商户
    @JsonIgnore
    @OneToMany
    @OrderBy("merchantId ASC")
    @JoinTable(name = "T_B_APIORG_MERLIST", joinColumns = @JoinColumn(name = "ORG_ID"), inverseJoinColumns = @JoinColumn(name = "MERCHANT_ID"))
    private Set<Merchant> merchant;

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getOrgType() {
        return orgType;
    }

    public void setOrgType(String orgType) {
        this.orgType = orgType;
    }

    public String getPublicKey() {
        return publicKey;
    }

    public void setPublicKey(String publicKey) {
        this.publicKey = publicKey;
    }

    public String getNotifyUrl() {
        return notifyUrl;
    }

    public void setNotifyUrl(String notifyUrl) {
        this.notifyUrl = notifyUrl;
    }

    public String getPrivateKey() {
        return privateKey;
    }

    public void setPrivateKey(String privateKey) {
        this.privateKey = privateKey;
    }

    public Set<Merchant> getMerchant() {
        return merchant;
    }

    public void setMerchant(Set<Merchant> merchant) {
        this.merchant = merchant;
    }
}
