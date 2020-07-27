package com.yada.ssp.manager.svc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by bjy on 2018/7/25.
 * MCC码表
 */

@Entity
@Table(name = "T_D_MCC")
public class Mcc {

    public static final String TABLE_ALIAS = "MCC CODE";
    public static final String ALIAS_MCC = "MCC CODE";
    public static final String ALIAS_REMARK = "REMARK";

    //mcc码
    @Id
    @Column(nullable = false, length = 16)
    private String mcc;

    //备注
    @Column
    private String remark;

    public String getMcc() {
        return mcc;
    }

    public void setMcc(String mcc) {
        this.mcc = mcc;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
