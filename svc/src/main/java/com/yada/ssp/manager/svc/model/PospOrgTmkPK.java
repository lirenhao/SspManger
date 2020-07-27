package com.yada.ssp.manager.svc.model;

import java.io.Serializable;

public class PospOrgTmkPK implements Serializable {

    private String orgId;
    private String tmkZmk;

    public PospOrgTmkPK() {
    }

    public PospOrgTmkPK(String orgId, String tmkZmk) {
        this.orgId = orgId;
        this.tmkZmk = tmkZmk;
    }

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
}
