package com.yada.ssp.manager.svc.model;

import java.io.Serializable;

/**
 * Created by bjy on 2018/8/6.
 * APP用户表主键
 */

public class AppUserPK implements Serializable {

    //商户号
    private String merNo;
    //登录名
    private String loginName;

    public AppUserPK() {
    }

    public AppUserPK(String merNo, String loginName) {
        this.merNo = merNo;
        this.loginName = loginName;
    }

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
}
