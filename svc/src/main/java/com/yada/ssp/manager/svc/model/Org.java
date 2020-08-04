package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "T_B_ORG")
public class Org implements Serializable {

    /**
     * 机构ID
     */
    @Id
    @Column(name = "ORG_ID", nullable = false, length = 16)
    private String orgId;
    /**
     * 上级机构编码
     */
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "P_ORG_ID", referencedColumnName = "ORG_ID")
    private Org org;
    /**
     * 下级机构
     */
    @JsonIgnore
    @OneToMany(mappedBy = "org")
    @OrderBy("orgId ASC")
    private Set<Org> children;
    /**
     * 机构级别
     */
    @Column(name = "ORG_LEV")
    private Long orgLev;
    /**
     * 银联联行号
     */
    @Column(name = "CUP_ID", length = 11)
    private String cupId;
    /**
     * 区域代码, 老4位行号
     */
    @Column(name = "ZONE_CODE", length = 4)
    private String zoneCode;
    /**
     * 行号, 新eacq行号,EACQ省行机构号
     */
    @Column(name = "BANK_NO", length = 10)
    private String bankNo;
    /**
     * 机构名称
     */
    @Column(name = "NAME", length = 32)
    private String name;
    /**
     * 联系人
     */
    @Column(name = "CONTACT", length = 16)
    private String contact;
    /**
     * 联系电话
     */
//    @Pattern(regexp = "^1[0-9]{10}|^[0-9]{3,4}-[0-9]{7,9}")
    @Column(name = "TEL", length = 32)
    private String tel;
    /**
     * 传真号码
     */
//    @Pattern(regexp = "^(\\d{3,4})?[-]?\\d{7,9}$")
    @Column(name = "FAX", length = 32)
    private String fax;
    /**
     * 机构地址
     */
    @Column(name = "ADDR", length = 64)
    private String addr;
    /**（预留字段）
     * 状态 (0 关闭、1 正常、2 暂停、3 未启用)
     */
    @Column(name = "STATUS", length = 1)
    private String status;
    /**
     * 新线系统标志, 新旧线标识 1上线 0 不上线
     */
    @Column(name = "ONLINE_FLAG", length = 1)
    private String onlineFlag;
    /**
     * 核心网点机构号
     */
    @Column(name = "ACQ_ORG_ID", length = 10)
    private String acqOrgId;
    /**
     * 核心省行机构号
     */
    @Column(name = "ACQ_BANK_NO", length = 5)
    private String acqBankNo;
    /**
     * EACQ机构号(10位BRANCH_ID)
     */
    @Column(name = "EACQ_ORG_ID", length = 16)
    private String eacqOrgId;

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public Org getOrg() {
        return org;
    }

    public void setOrg(Org org) {
        this.org = org;
    }

    public Set<Org> getChildren() {
        return children;
    }

    public void setChildren(LinkedHashSet<Org> children) {
        this.children = children;
    }

    public Long getOrgLev() {
        return orgLev;
    }

    public void setOrgLev(Long orgLev) {
        this.orgLev = orgLev;
    }

    public String getCupId() {
        return cupId;
    }

    public void setCupId(String cupId) {
        this.cupId = cupId;
    }

    public String getZoneCode() {
        return zoneCode;
    }

    public void setZoneCode(String zoneCode) {
        this.zoneCode = zoneCode;
    }

    public String getBankNo() {
        return bankNo;
    }

    public void setBankNo(String bankNo) {
        this.bankNo = bankNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getOnlineFlag() {
        return onlineFlag;
    }

    public void setOnlineFlag(String onlineFlag) {
        this.onlineFlag = onlineFlag;
    }

    public String getAcqOrgId() {
        return acqOrgId;
    }

    public void setAcqOrgId(String acqOrgId) {
        this.acqOrgId = acqOrgId;
    }

    public String getAcqBankNo() {
        return acqBankNo;
    }

    public void setAcqBankNo(String acqBankNo) {
        this.acqBankNo = acqBankNo;
    }

    public String getEacqOrgId() {
        return eacqOrgId;
    }

    public void setEacqOrgId(String eacqOrgId) {
        this.eacqOrgId = eacqOrgId;
    }
}
