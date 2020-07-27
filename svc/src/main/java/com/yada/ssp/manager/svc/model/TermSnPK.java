package com.yada.ssp.manager.svc.model;

import java.io.Serializable;

public class TermSnPK implements Serializable {

    private String vendorId;
    private String snNo;

    public TermSnPK() {
    }

    public TermSnPK(String vendorId, String snNo) {
        this.vendorId = vendorId;
        this.snNo = snNo;
    }

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
}
