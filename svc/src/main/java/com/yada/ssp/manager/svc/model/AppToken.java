package com.yada.ssp.manager.svc.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by bjy on 2018/8/27.
 * APPToken
 */

@Entity
@Table(name = "T_B_APP_TOKEN")
@IdClass(AppUserPK.class)
public class AppToken implements Serializable {
    //商户号
    @Id
    @Column(nullable = false)
    private String merNo;
    //登录名
    @Id
    @Column(nullable = false)
    private String loginName;
    // token
    @Column
    private String token;
    // 授权信息
    @Column
    private String roles;
    // 到期时间
    @Column
    private Date expiration;

    public String getMerNo() {
        return merNo;
    }

    public void setMerNo(String merNo) {
        this.merNo = merNo;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public Date getExpiration() {
        return expiration;
    }

    public void setExpiration(Date expiration) {
        this.expiration = expiration;
    }
}
