package com.yada.ssp.manager.svc.model;

import java.io.Serializable;

public class HqReportHisPK implements Serializable {

    private String orgId;
    private String yearmon;

    public HqReportHisPK() {
    }

    public HqReportHisPK(String orgId, String yearmon) {
        this.orgId = orgId;
        this.yearmon = yearmon;
    }

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getYearmon() {
        return yearmon;
    }

    public void setYearmon(String yearmon) {
        this.yearmon = yearmon;
    }
}
