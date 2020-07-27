package com.yada.ssp.manager.svc.model;

import javax.persistence.*;

@Entity
@Table(name = "T_B_TERM_WORK_KEY")
@IdClass(WorkKeyPK.class)
public class WorkKey {

    @Id
    @Column
    private String merchantId; // 商户号

    @Id
    @Column
    private String terminalId; // 终端号

    @Column
    private String zmkLmk;

    @Column
    private String tmkLmk;

    @Column
    private String tmkZmk;

    @Column(name = "ZEK_LMK")
    private String tekLmk;

    @Column(name = "ZEK_TMK")
    private String tekTmk;

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

    public String getZmkLmk() {
        return zmkLmk;
    }

    public void setZmkLmk(String zmkLmk) {
        this.zmkLmk = zmkLmk;
    }

    public String getTmkLmk() {
        return tmkLmk;
    }

    public void setTmkLmk(String tmkLmk) {
        this.tmkLmk = tmkLmk;
    }

    public String getTmkZmk() {
        return tmkZmk;
    }

    public void setTmkZmk(String tmkZmk) {
        this.tmkZmk = tmkZmk;
    }

    public String getTekLmk() {
        return tekLmk;
    }

    public void setTekLmk(String tekLmk) {
        this.tekLmk = tekLmk;
    }

    public String getTekTmk() {
        return tekTmk;
    }

    public void setTekTmk(String tekTmk) {
        this.tekTmk = tekTmk;
    }
}
