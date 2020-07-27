package com.yada.ssp.manager.svc.model;

import javax.persistence.*;

@Entity
@Table(name = "T_R_HQREPORT_HIS")
@IdClass(HqReportHisPK.class)
public class HqReportHis {

    @Id
    @Column
    private String orgId;

    @Id
    @Column
    private String yearmon;

    @Column
    private Integer countMid;

    @Column
    private Integer newMid;

    @Column
    private Integer lossMid;

    @Column
    private Double tranAmtMon;

    @Column
    private Double tranAmtYear;

    @Column
    private Integer countTid;

    @Column
    private Integer countTidQr;

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

    public Integer getCountMid() {
        return countMid;
    }

    public void setCountMid(Integer countMid) {
        this.countMid = countMid;
    }

    public Integer getNewMid() {
        return newMid;
    }

    public void setNewMid(Integer newMid) {
        this.newMid = newMid;
    }

    public Integer getLossMid() {
        return lossMid;
    }

    public void setLossMid(Integer lossMid) {
        this.lossMid = lossMid;
    }

    public Double getTranAmtMon() {
        return tranAmtMon;
    }

    public void setTranAmtMon(Double tranAmtMon) {
        this.tranAmtMon = tranAmtMon;
    }

    public Double getTranAmtYear() {
        return tranAmtYear;
    }

    public void setTranAmtYear(Double tranAmtYear) {
        this.tranAmtYear = tranAmtYear;
    }

    public Integer getCountTid() {
        return countTid;
    }

    public void setCountTid(Integer countTid) {
        this.countTid = countTid;
    }

    public Integer getCountTidQr() {
        return countTidQr;
    }

    public void setCountTidQr(Integer countTidQr) {
        this.countTidQr = countTidQr;
    }
}
