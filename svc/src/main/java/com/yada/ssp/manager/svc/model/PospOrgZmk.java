package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yada.ssp.manager.svc.model.Org;

import javax.persistence.*;

@Entity
@Table(name = "T_B_POSP_ORG_ZMK")
public class PospOrgZmk {

    public static final String TABLE_ALIAS = "ZMK POS";
    public static final String ALIAS_ORG_ID = "ORG";
    public static final String ALIAS_PWD_1 = "KEY-1";
    public static final String ALIAS_PWD_2 = "KEY-2";
    public static final String ALIAS_ZMK_LMK = "ENC ZMK";
    public static final String ALIAS_CHECK_VALUE = "CHECK_VALUE";

    @Id
    private String orgId;
    @Column
    private String zmkLmk;
    @Column
    private String checkValue;
    @Transient
    private String pwd1;
    @Transient
    private String pwd2;

    @JsonIgnore
    @OneToOne(targetEntity = Org.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "orgId", referencedColumnName = "ORG_ID", insertable=false, updatable=false)
    private Org org;

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getZmkLmk() {
        return zmkLmk;
    }

    public void setZmkLmk(String zmkLmk) {
        this.zmkLmk = zmkLmk;
    }

    public String getCheckValue() {
        return checkValue;
    }

    public void setCheckValue(String checkValue) {
        this.checkValue = checkValue;
    }

    public Org getOrg() {
        return org;
    }

    public void setOrg(Org org) {
        this.org = org;
    }

    public String getPwd1() {
        return pwd1;
    }

    public void setPwd1(String pwd1) {
        this.pwd1 = pwd1;
    }

    public String getPwd2() {
        return pwd2;
    }

    public void setPwd2(String pwd2) {
        this.pwd2 = pwd2;
    }
}
