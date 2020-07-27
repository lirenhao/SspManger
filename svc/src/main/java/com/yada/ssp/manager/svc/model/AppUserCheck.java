package com.yada.ssp.manager.svc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by bjy on 2018/7/23.
 * APP用户申请表
 */

@Entity
@Table(name = "T_B_APP_USER_CHECK")
@IdClass(AppUserPK.class)
public class AppUserCheck implements Serializable {

    public static final String TABLE_ALIAS = "APP用户";
    public static final String ALIAS_MER_NO = "MID";
    public static final String ALIAS_MER_NAME = "MERCHANT NAME";
    public static final String ALIAS_LOGIN_NAME = "LOGIN NAME";
    public static final String ALIAS_USER_NAME = "USER NAME";
    public static final String ALIAS_PASS_WORD = "LOGIN PASSWORD";
    public static final String ALIAS_ROLE_ID = "USER ROLES";
    public static final String ALIAS_TERM_NO = "TID";
    public static final String ALIAS_CRY = "CURRENCY OF THE TRANSACTION";
    public static final String ALIAS_CHECK_STATE = "CHECK STATE";
    public static final String ALIAS_CHECK_REASON = "REJECT REASON";
    public static final String ALIAS_OPERATION = "OPERATION";

    //商户号
    @Id
    @Column(nullable = false)
    private String merNo;
    //登录名
    @Id
    @Column(nullable = false)
    private String loginName;
    //用户名
    @Column
    private String userName;
    //用户密码
    @Column
    private String passWord;
    //角色ID
    @Column
    private String roles;
    //用户绑定的终端号
    @Column
    private String termNo;
    //用户绑定的交易币种
    @Column
    private String ccyType;
    //审核状态
    @Column
    private String checkState;
    //拒绝原因
    @Column
    private String checkReason;
    //操作
    @Column
    private String operation;
    //商户
    @JsonIgnore
    @OneToOne(targetEntity = Merchant.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "merNo", referencedColumnName = "merchantId", insertable=false, updatable=false)
    private Merchant merchant;

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public String getMerNo() {
        return merNo;
    }

    public void setMerNo(String merNo) {
        this.merNo = merNo;
    }

    public String getTermNo() {
        return termNo;
    }

    public void setTermNo(String termNo) {
        this.termNo = termNo;
    }

    public String getCcyType() {
        return ccyType;
    }

    public void setCcyType(String ccyType) {
        this.ccyType = ccyType;
    }

    public String getCheckState() {
        return checkState;
    }

    public void setCheckState(String checkState) {
        this.checkState = checkState;
    }

    public String getCheckReason() {
        return checkReason;
    }

    public void setCheckReason(String checkReason) {
        this.checkReason = checkReason;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public Merchant getMerchant() {
        return merchant;
    }

    public void setMerchant(Merchant merchant) {
        this.merchant = merchant;
    }
}
