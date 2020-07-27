package com.yada.ssp.manager.svc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by bjy on 2018/8/1.
 * App角色表
 */
@Entity
@Table(name = "T_B_APP_ROLE")
public class AppRole {

    public static final String TABLE_ALIAS = "APP用户";
    public static final String ALIAS_ID = "ROLE";
    public static final String ALIAS_ROLE_NAME = "ROLE NAME";
    public static final String ALIAS_REMARK = "ROLE DESCRIPTION";

    //角色ID
    @Id
    @Column(nullable = false,length = 10)
    private String id;
    //角色名称
    @Column
    private String name;
    //备注
    @Column
    private String remark;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
