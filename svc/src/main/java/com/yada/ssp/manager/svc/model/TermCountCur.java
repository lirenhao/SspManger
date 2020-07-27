package com.yada.ssp.manager.svc.model;

import javax.persistence.*;

@Entity
@Table(name = "V_R_TERMINAL_COUNT_CUR")
@IdClass(TermCountPK.class)
public class TermCountCur {

    @Id
    @Column
    private String orgId;
    @Id
    @Column
    private String yearmon;
    @Column
    private String merNameEng;
    @Id
    @Column
    private String merchantId;
    @Id
    @Column
    private String terminalId;
    @Column
    private String vendorName;
    @Column
    private String terminalBrand;
    @Column
    private String terminalModel;
    @Column
    private String snNo;
    @Column
    private String installAddress;
    @Column
    private String termStatus;
    @Column
    private String termCreateDate;
    @Column
    private String termModifyDate;
    @Column
    private String bankCustomerNum;

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

    public String getMerNameEng() {
        return merNameEng;
    }

    public void setMerNameEng(String merNameEng) {
        this.merNameEng = merNameEng;
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

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public String getTerminalBrand() {
        return terminalBrand;
    }

    public void setTerminalBrand(String terminalBrand) {
        this.terminalBrand = terminalBrand;
    }

    public String getTerminalModel() {
        return terminalModel;
    }

    public void setTerminalModel(String terminalModel) {
        this.terminalModel = terminalModel;
    }

    public String getSnNo() {
        return snNo;
    }

    public void setSnNo(String snNo) {
        this.snNo = snNo;
    }

    public String getInstallAddress() {
        return installAddress;
    }

    public void setInstallAddress(String installAddress) {
        this.installAddress = installAddress;
    }

    public String getTermStatus() {
        return termStatus;
    }

    public void setTermStatus(String termStatus) {
        this.termStatus = termStatus;
    }

    public String getTermCreateDate() {
        return termCreateDate;
    }

    public void setTermCreateDate(String termCreateDate) {
        this.termCreateDate = termCreateDate;
    }

    public String getTermModifyDate() {
        return termModifyDate;
    }

    public void setTermModifyDate(String termModifyDate) {
        this.termModifyDate = termModifyDate;
    }

    public String getBankCustomerNum() {
        return bankCustomerNum;
    }

    public void setBankCustomerNum(String bankCustomerNum) {
        this.bankCustomerNum = bankCustomerNum;
    }
}
