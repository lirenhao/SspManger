package com.yada.ssp.manager.svc.model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by bjy on 2018/8/27.
 * App设备表
 */

@Entity
@Table(name = "T_B_APP_DEVICE")
@IdClass(AppUserPK.class)
public class AppDevice implements Serializable {

    //商户号
    @Id
    @Column(nullable = false)
    private String merNo;
    //登录名
    @Id
    @Column(nullable = false)
    private String loginName;
    //设备号
    @Column
    private String deviceNo;
    //推送服务标识
    @Column
    private String pushType;
    //设备平台
    @Column
    private String platform;

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

    public String getDeviceNo() {
        return deviceNo;
    }

    public void setDeviceNo(String deviceNo) {
        this.deviceNo = deviceNo;
    }

    public String getPushType() {
        return pushType;
    }

    public void setPushType(String pushType) {
        this.pushType = pushType;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }
}
