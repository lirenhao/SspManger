package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yada.ssp.manager.svc.model.Org;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by bjy on 2018/9/4.
 * 终端表
 */

@Entity
@Table(name = "T_B_TERMINAL_BASE_GAS")
@IdClass(TerminalPK.class)
public class Terminal implements Serializable {

    public static final String TABLE_ALIAS = "终端信息";
    public static final String ALIAS_TERMINAL_ID = "TERMINAL ID";
    public static final String ALIAS_MERCHANT_ID = "MERCHANT ID";
    public static final String ALIAS_ACQ_ORG_ID = "ACQUIRER CODE";
    public static final String ALIAS_TERMINAL_TYPE = "TERMINAL TYPE";
    public static final String ALIAS_STATUS = "TERMINAL STATUS";
    public static final String ALIAS_ATTRIBUTE = "POS TERMINAL PROPERTIES";
    public static final String ALIAS_WILDCARD_FLAG = "CARD ASSOCIATION ACCEPTED";
    public static final String ALIAS_TRAN_CTL = "TERMINAL FEATURES";
    public static final String ALIAS_SIGN_FLAG = "TERMINAL PARAMETERS STATUS";
    public static final String ALIAS_BATCH_NO = "TERMINAL BATCH NUMBER";
    public static final String ALIAS_TERMINAL_PARAM = "TERMINAL PARAMETERS";
    public static final String ALIAS_TMK_ZMK = "TERMINAL TMK KEYS";
    public static final String ALIAS_TERMINAL_BRAND = "TERMINAL BRAND";
    public static final String ALIAS_TERMINAL_MODEL = "TERMINAL SERIAL NUMBER";
    public static final String ALIAS_LINE_CONDITION = "CONNECTION STATUS";
    public static final String ALIAS_INSTALL_ADDRESS = "INSTALLATION ADDRESS";
    public static final String ALIAS_INSTALL_DATE = "INSTALLATION DATE";
    public static final String ALIAS_PERSON = "CONTACT PERSON";
    public static final String ALIAS_TELEPHONE = "PHONE NO.";
    public static final String ALIAS_COUNTER_NAME = "OUTLET NAME";
    public static final String ALIAS_COUNTER_PHONE = "OUTLET CONTACT NUMBER";
    public static final String ALIAS_TERMINAL_DESC = "TERMINAL DESCRIPTION";
    public static final String ALIAS_AREA_CODE = "AREA CODE";
    public static final String ALIAS_TIME_ZONE = "TIME";
    public static final String ALIAS_HIS_INSTALL_ADDRESS = "HISTORICAL INSTALLED ADDRESS";
    public static final String ALIAS_RECODE_STAT = "RECORD STATUS";
    public static final String ALIAS_LASTOPER_FLAG = "FINAL OPERATION FLAG";
    public static final String ALIAS_MODIFY_OPER = "MODIFIED USER IDENTITY";
    public static final String ALIAS_MODIFY_DATE = "MODIFIED TIME";
    public static final String ALIAS_CREATE_DATE = "CREATION TIME";

    //终端号
    @Id
    @Column(nullable = false)
    private String terminalId;
    //商户号
    @Id
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "merchantId", referencedColumnName = "merchantId")
    private Merchant merchant;
    //收单机构代码
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACQ_ORG_ID", referencedColumnName = "ACQ_ORG_ID")
    private Org org;
    //终端类型
    @Column
    private String terminalType;
    //终端状态 0-正常1-未签到2-注销3-注销待回執4-待发工单5-审核通过待回执6-待生成工单
    @Column
    private String status;
    //POS终端属性
    @Column
    private String attribute;
    //支持卡组(卡组位图)   目前启用1-4位：代表支持卡组值0或null或空格：不支持 1：支持第1位：VISA  第2位：MASTER  第3位：CUPS  第4位：本带本
    @Column
    private String wildcardFlag;
    //终端功能标识集：1代表支持，0或空代表不支持。第1位：消费第2位：消费撤销第3位：退货 第4位：消费调整 第5位：预授权 第6位：预授权撤销 第7位：预授权完成 第8位：预授权完成撤销 第9位：离线交易 第10位：MOTO交易 第11位：接触式电子现金交易 第12位：非接触式电子现金交易
    @Column
    private String tranCtl;
    //终端签到状态 0-未签到 1-已签到
    @Column
    private String signFlag;
    //终端批次号
    @Column
    private String batchNo;
    //终端参数
    @Column
    private String terminalParam;
    //终端TMK密文
    @Column
    private String tmkZmk;
    //终端品牌
    @Column
    private String terminalBrand;
    //终端型号
    @Column
    private String terminalModel;
    //线路状况 POS开通状况 1-开通 0-关闭
    @Column
    private String lineCondition;
    //装机地址
    @Column
    private String installAddress;
    //装机日期
    @Column
    private String installDate;
    //联系人
    @Column
    private String person;
    //电话
    @Column
    private String telephone;
    //柜台名称
    @Column
    private String counterName;
    //柜台电话
    @Column
    private String counterPhone;
    //终端描述
    @Column
    private String terminalDesc;
    //区域码
    @Column
    private String areaCode;
    //时区
    @Column
    private String timeZone;
    //历史装机地址
    @Column
    private String hisInstallAddress;
    //记录状态 0：无效  1：有效
    @Column
    private String recodeStat;
    //最后操作标志 A-新增 M-修改 D-删除
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

    public String getTerminalId() {
        return terminalId;
    }

    public void setTerminalId(String terminalId) {
        this.terminalId = terminalId;
    }

    public Merchant getMerchant() {
        return merchant;
    }

    public void setMerchant(Merchant merchant) {
        this.merchant = merchant;
    }

    public String getTerminalType() {
        return terminalType;
    }

    public void setTerminalType(String terminalType) {
        this.terminalType = terminalType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public String getWildcardFlag() {
        return wildcardFlag;
    }

    public void setWildcardFlag(String wildcardFlag) {
        this.wildcardFlag = wildcardFlag;
    }

    public String getTranCtl() {
        return tranCtl;
    }

    public void setTranCtl(String tranCtl) {
        this.tranCtl = tranCtl;
    }

    public String getSignFlag() {
        return signFlag;
    }

    public void setSignFlag(String signFlag) {
        this.signFlag = signFlag;
    }

    public String getBatchNo() {
        return batchNo;
    }

    public void setBatchNo(String batchNo) {
        this.batchNo = batchNo;
    }

    public String getTerminalParam() {
        return terminalParam;
    }

    public void setTerminalParam(String terminalParam) {
        this.terminalParam = terminalParam;
    }

    public String getTmkZmk() {
        return tmkZmk;
    }

    public void setTmkZmk(String tmkZmk) {
        this.tmkZmk = tmkZmk;
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

    public String getLineCondition() {
        return lineCondition;
    }

    public void setLineCondition(String lineCondition) {
        this.lineCondition = lineCondition;
    }

    public String getInstallAddress() {
        return installAddress;
    }

    public void setInstallAddress(String installAddress) {
        this.installAddress = installAddress;
    }

    public String getInstallDate() {
        return installDate;
    }

    public void setInstallDate(String installDate) {
        this.installDate = installDate;
    }

    public String getPerson() {
        return person;
    }

    public void setPerson(String person) {
        this.person = person;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getCounterName() {
        return counterName;
    }

    public void setCounterName(String counterName) {
        this.counterName = counterName;
    }

    public String getCounterPhone() {
        return counterPhone;
    }

    public void setCounterPhone(String counterPhone) {
        this.counterPhone = counterPhone;
    }

    public String getTerminalDesc() {
        return terminalDesc;
    }

    public void setTerminalDesc(String terminalDesc) {
        this.terminalDesc = terminalDesc;
    }

    public String getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    public String getTimeZone() {
        return timeZone;
    }

    public void setTimeZone(String timeZone) {
        this.timeZone = timeZone;
    }

    public String getHisInstallAddress() {
        return hisInstallAddress;
    }

    public void setHisInstallAddress(String hisInstallAddress) {
        this.hisInstallAddress = hisInstallAddress;
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

    public Org getOrg() {
        return org;
    }

    public void setOrg(Org org) {
        this.org = org;
    }
}
