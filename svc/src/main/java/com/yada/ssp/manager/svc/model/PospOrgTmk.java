package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yada.ssp.manager.svc.model.Org;

import javax.persistence.*;

@Entity
@Table(name = "T_B_POSP_ORG_TMK")
@IdClass(PospOrgTmkPK.class)
public class PospOrgTmk {

    public static final String TABLE_ALIAS = "TMK MANAGEMENT";
    public static final String ALIAS_ORG_ID = "ORG";
    public static final String ALIAS_TMK_ZMK = "TMK POS";
    public static final String ALIAS_TMK_WEB = "TMK WEB";
    public static final String ALIAS_TERMINAL_ID = "TERMINAL ID";

    @Id
    @Column
    private String orgId;

    @Id
    @Column
    private String tmkZmk;

    @Column
    private String tmkWeb;

    @Column
    private String terminalId;

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

    public String getTmkZmk() {
        return tmkZmk;
    }

    public void setTmkZmk(String tmkZmk) {
        this.tmkZmk = tmkZmk;
    }

    public String getTmkWeb() {
        return tmkWeb;
    }

    public void setTmkWeb(String tmkWeb) {
        this.tmkWeb = tmkWeb;
    }

    public String getTerminalId() {
        return terminalId;
    }

    public void setTerminalId(String terminalId) {
        this.terminalId = terminalId;
    }

    public Org getOrg() {
        return org;
    }

    public void setOrg(Org org) {
        this.org = org;
    }
}
