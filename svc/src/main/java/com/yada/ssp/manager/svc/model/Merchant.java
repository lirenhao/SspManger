package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

/**
 * 商户信息
 */
@Entity
@Table(name = "T_B_MERCHANT_BASE_GAS")
public class Merchant {

    //商户号
    @Id
    @Column(nullable = false)
    private String merchantId;

    //商户类型：J间联 D直联 集团O
    @Column
    private String merchantType;

    //商户是否属于某集团：0不属于1属于
    @Column
    private String merLev;

    //所属集团商户号
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pMerId", referencedColumnName = "merchantId")
    private Merchant merchant;

    //下级商户
    @JsonIgnore
    @OneToMany(mappedBy = "merchant")
    @OrderBy("merchantId ASC")
    private Set<Merchant> children;

    //收单机构代码
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACQ_ORG_ID", referencedColumnName = "ACQ_ORG_ID")
    private Org org;

    //商户附加资料
    @JsonIgnore
    @OneToOne(targetEntity = MerchantExtra.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "merchantId", referencedColumnName = "merchantId")
    private MerchantExtra merchantExtra;

    //商户附加资料审核
    @JsonIgnore
    @OneToOne(targetEntity = MerchantExtraCheck.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "merchantId", referencedColumnName = "merchantId")
    private MerchantExtraCheck merchantExtraCheck;

    //商户web子商户
    @JsonIgnore
    @OneToMany
    @OrderBy("merchantId ASC")
    @JoinTable(name = "T_WEB_MER_SUBS", joinColumns = @JoinColumn(name = "MER_NO"), inverseJoinColumns = @JoinColumn(name = "MER_SUB_NO"))
    private Set<Merchant> webSubs;

    //签约机构代码
    @Column
    private String signOrgId;

    //入账凭单打印机构
    @Column
    private String voucherOrgId;

    //区域代码
    @Column
    private String zoneId;

    //商户状态 0-待审批 1正常 3-注销
    @Column
    private String merStatus;

    //商户风险级别
    @Column
    private String merRisk;

    //商户所属分组
    @Column
    private String merGroup;

    //商户类别MCC
    @Column
    private String mcc;

    //商户中文名称
    @Column
    private String merNameChn;

    //商户中文简称
    @Column
    private String merNameChnAbbr;

    //商户英文名称
    @Column
    private String merNameEng;

    //商户英文简称
    @Column
    private String merNameEngAbbr;

    //经营场所中文名称
    @Column
    private String businessAddressChn;

    //经营场所英文名称
    @Column
    private String businessAddressEng;

    //所在城市英文名称
    @Column
    private String cityEng;

    //公司所属类型0个体 1企业 2事业
    @Column
    private String companyType;

    //商户功能标志：1代表支持，0或空代表不支持。第1位：消费第2位：消费撤销第3位：退货第4位：消费调整第5位：小费第6位：预授权第7位：预授权撤销第8位：预授权完成第9位：预授权完成撤销第10位：手输卡号第11位：离线交易第12位：MOTO交易第13位：电子现金交易第14位：限制退货第15位：非接交易第16位：余额查询第17位：取现第18-20位：保留
    @Column
    private String tranCtl;

    //结算账户性质：0-本行对公 1-本行对私 2-他行对公 3-他行对私
    @Column
    private String accountType;

    //结算方式： 0：自动结算 1：手工结算
    @Column
    private String settleMode;

    //结算账户号
    @Column
    private String accountNo;

    //结算账户名称
    @Column
    private String accountName;

    //结算开户行号
    @Column
    private String accountBankNo;

    //结算开户行名称
    @Column
    private String accountBankName;

    //营业执照
    @Column
    private String businessLicense;

    //企业代码
    @Column
    private String enterpriseCode;

    //法人证件类型 0-身份证号 1-护照 2-驾驶证
    @Column(name = "LEGAL_PERSON_ID_TYEP")
    private String legalPersonIdType;

    //法人证件号码
    @Column
    private String legalPersonId;

    //法人名称
    @Column
    private String legalPersonName;

    //注册地址
    @Column
    private String regAddress;

    //注册资金
    @Column
    private String regCapital;

    //员工人数
    @Column
    private String employeeNum;

    //联系人
    @Column
    private String contactPersonName;

    //电话
    @Column
    private String telephone;

    //传真
    @Column
    private String tax;

    //电子邮件
    @Column
    private String email;

    //邮编
    @Column
    private String postcode;

    //通信地址
    @Column
    private String commAddress;

    //申请日期
    @Column
    private String applyDate;

    //启用日期
    @Column
    private String startDate;

    //银行客户经理
    @Column
    private String bankCustomerName;

    //银行客户经理工号
    @Column
    private String bankCustomerNum;

    //协议编号
    @Column
    private String protocolNum;

    //备注
    @Column
    private String remark;

    //冻结标志 0代表商户解挂1 代表商户挂起2 代表商户解挂审核中
    @Column
    private String frozenFlag;

    //审批被退回原因
    @Column
    private String rejectReson;

    //注销时间
    @Column
    private String logoutDate;

    //注销原因
    @Column
    private String logoutReson;

    //记录状态 1-有效 2-待审批 3-未通过
    @Column
    private String recodeStat;

    //最后操作标志 A-新增 M-修改
    @Column
    private String lastoperFlag;

    //修改的用户标识
    @Column
    private String modifyOper;

    //修改时间
    @Column
    private String modifyDate;

    //创建时间
    @Column
    private String createDate;

    //受理卡种 目前启用1-4位：代表支持卡组值0或null或空格：不支持 1：支持第1位：VISA  第2位：MASTER  第3位：CUPS  第4位：本带本
    @Column
    private String cardCtl;

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getMerchantType() {
        return merchantType;
    }

    public void setMerchantType(String merchantType) {
        this.merchantType = merchantType;
    }

    public String getMerLev() {
        return merLev;
    }

    public void setMerLev(String merLev) {
        this.merLev = merLev;
    }

    public Merchant getMerchant() {
        return merchant;
    }

    public void setMerchant(Merchant merchant) {
        this.merchant = merchant;
    }

    public Set<Merchant> getChildren() {
        return children;
    }

    public void setChildren(Set<Merchant> children) {
        this.children = children;
    }

    public Org getOrg() {
        return org;
    }

    public void setOrg(Org org) {
        this.org = org;
    }

    public String getSignOrgId() {
        return signOrgId;
    }

    public void setSignOrgId(String signOrgId) {
        this.signOrgId = signOrgId;
    }

    public String getVoucherOrgId() {
        return voucherOrgId;
    }

    public void setVoucherOrgId(String voucherOrgId) {
        this.voucherOrgId = voucherOrgId;
    }

    public String getZoneId() {
        return zoneId;
    }

    public void setZoneId(String zoneId) {
        this.zoneId = zoneId;
    }

    public String getMerStatus() {
        return merStatus;
    }

    public void setMerStatus(String merStatus) {
        this.merStatus = merStatus;
    }

    public String getMerRisk() {
        return merRisk;
    }

    public void setMerRisk(String merRisk) {
        this.merRisk = merRisk;
    }

    public String getMerGroup() {
        return merGroup;
    }

    public void setMerGroup(String merGroup) {
        this.merGroup = merGroup;
    }

    public String getMcc() {
        return mcc;
    }

    public void setMcc(String mcc) {
        this.mcc = mcc;
    }

    public String getMerNameChn() {
        return merNameChn;
    }

    public void setMerNameChn(String merNameChn) {
        this.merNameChn = merNameChn;
    }

    public String getMerNameChnAbbr() {
        return merNameChnAbbr;
    }

    public void setMerNameChnAbbr(String merNameChnAbbr) {
        this.merNameChnAbbr = merNameChnAbbr;
    }

    public String getMerNameEng() {
        return merNameEng;
    }

    public void setMerNameEng(String merNameEng) {
        this.merNameEng = merNameEng;
    }

    public String getMerNameEngAbbr() {
        return merNameEngAbbr;
    }

    public void setMerNameEngAbbr(String merNameEngAbbr) {
        this.merNameEngAbbr = merNameEngAbbr;
    }

    public String getBusinessAddressChn() {
        return businessAddressChn;
    }

    public void setBusinessAddressChn(String businessAddressChn) {
        this.businessAddressChn = businessAddressChn;
    }

    public String getBusinessAddressEng() {
        return businessAddressEng;
    }

    public void setBusinessAddressEng(String businessAddressEng) {
        this.businessAddressEng = businessAddressEng;
    }

    public String getCityEng() {
        return cityEng;
    }

    public void setCityEng(String cityEng) {
        this.cityEng = cityEng;
    }

    public String getCompanyType() {
        return companyType;
    }

    public void setCompanyType(String companyType) {
        this.companyType = companyType;
    }

    public String getTranCtl() {
        return tranCtl;
    }

    public void setTranCtl(String tranCtl) {
        this.tranCtl = tranCtl;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getSettleMode() {
        return settleMode;
    }

    public void setSettleMode(String settleMode) {
        this.settleMode = settleMode;
    }

    public String getAccountNo() {
        return accountNo;
    }

    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getAccountBankNo() {
        return accountBankNo;
    }

    public void setAccountBankNo(String accountBankNo) {
        this.accountBankNo = accountBankNo;
    }

    public String getAccountBankName() {
        return accountBankName;
    }

    public void setAccountBankName(String accountBankName) {
        this.accountBankName = accountBankName;
    }

    public String getBusinessLicense() {
        return businessLicense;
    }

    public void setBusinessLicense(String businessLicense) {
        this.businessLicense = businessLicense;
    }

    public String getEnterpriseCode() {
        return enterpriseCode;
    }

    public void setEnterpriseCode(String enterpriseCode) {
        this.enterpriseCode = enterpriseCode;
    }

    public String getLegalPersonIdType() {
        return legalPersonIdType;
    }

    public void setLegalPersonIdType(String legalPersonIdType) {
        this.legalPersonIdType = legalPersonIdType;
    }

    public String getLegalPersonId() {
        return legalPersonId;
    }

    public void setLegalPersonId(String legalPersonId) {
        this.legalPersonId = legalPersonId;
    }

    public String getLegalPersonName() {
        return legalPersonName;
    }

    public void setLegalPersonName(String legalPersonName) {
        this.legalPersonName = legalPersonName;
    }

    public String getRegAddress() {
        return regAddress;
    }

    public void setRegAddress(String regAddress) {
        this.regAddress = regAddress;
    }

    public String getRegCapital() {
        return regCapital;
    }

    public void setRegCapital(String regCapital) {
        this.regCapital = regCapital;
    }

    public String getEmployeeNum() {
        return employeeNum;
    }

    public void setEmployeeNum(String employeeNum) {
        this.employeeNum = employeeNum;
    }

    public String getContactPersonName() {
        return contactPersonName;
    }

    public void setContactPersonName(String contactPersonName) {
        this.contactPersonName = contactPersonName;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getTax() {
        return tax;
    }

    public void setTax(String tax) {
        this.tax = tax;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getCommAddress() {
        return commAddress;
    }

    public void setCommAddress(String commAddress) {
        this.commAddress = commAddress;
    }

    public String getApplyDate() {
        return applyDate;
    }

    public void setApplyDate(String applyDate) {
        this.applyDate = applyDate;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getBankCustomerName() {
        return bankCustomerName;
    }

    public void setBankCustomerName(String bankCustomerName) {
        this.bankCustomerName = bankCustomerName;
    }

    public String getBankCustomerNum() {
        return bankCustomerNum;
    }

    public void setBankCustomerNum(String bankCustomerNum) {
        this.bankCustomerNum = bankCustomerNum;
    }

    public String getProtocolNum() {
        return protocolNum;
    }

    public void setProtocolNum(String protocolNum) {
        this.protocolNum = protocolNum;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getFrozenFlag() {
        return frozenFlag;
    }

    public void setFrozenFlag(String frozenFlag) {
        this.frozenFlag = frozenFlag;
    }

    public String getRejectReson() {
        return rejectReson;
    }

    public void setRejectReson(String rejectReson) {
        this.rejectReson = rejectReson;
    }

    public String getLogoutDate() {
        return logoutDate;
    }

    public void setLogoutDate(String logoutDate) {
        this.logoutDate = logoutDate;
    }

    public String getLogoutReson() {
        return logoutReson;
    }

    public void setLogoutReson(String logoutReson) {
        this.logoutReson = logoutReson;
    }

    public String getRecodeStat() {
        return recodeStat;
    }

    public void setRecodeStat(String recodeStat) {
        this.recodeStat = recodeStat;
    }

    public String getLastoperFlag() {
        return lastoperFlag;
    }

    public void setLastoperFlag(String lastoperFlag) {
        this.lastoperFlag = lastoperFlag;
    }

    public String getModifyOper() {
        return modifyOper;
    }

    public void setModifyOper(String modifyOper) {
        this.modifyOper = modifyOper;
    }

    public String getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(String modifyDate) {
        this.modifyDate = modifyDate;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getCardCtl() {
        return cardCtl;
    }

    public void setCardCtl(String cardCtl) {
        this.cardCtl = cardCtl;
    }

    public MerchantExtra getMerchantExtra() {
        return merchantExtra;
    }

    public void setMerchantExtra(MerchantExtra merchantExtra) {
        this.merchantExtra = merchantExtra;
    }

    public MerchantExtraCheck getMerchantExtraCheck() {
        return merchantExtraCheck;
    }

    public void setMerchantExtraCheck(MerchantExtraCheck merchantExtraCheck) {
        this.merchantExtraCheck = merchantExtraCheck;
    }

    public Set<Merchant> getWebSubs() {
        return webSubs;
    }

    public void setWebSubs(Set<Merchant> webSubs) {
        this.webSubs = webSubs;
    }
}
