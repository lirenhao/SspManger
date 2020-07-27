package com.yada.ssp.manager.svc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by bjy on 2018/9/6.
 * 国家代码表
 */


@Entity
@Table(name = "T_D_INTERNATIONAL_CODE")
public class InternationalCode {

    public static final String TABLE_ALIAS = "国家代码";
    public static final String ALIAS_INTERNATIONAL_CODE = "COUNTRY CODE";
    public static final String ALIAS_CODE_NAME = "CHINESE NAME";
    public static final String ALIAS_CODE_ENAME = "ENGLISH NAME";

    @Id
    @Column(nullable = false, length = 2)
    private String internationalCode;
    @Column
    private String codeName;
    @Column
    private String codeEname;

    public String getInternationalCode() {
        return internationalCode;
    }

    public void setInternationalCode(String internationalCode) {
        this.internationalCode = internationalCode;
    }

    public String getCodeName() {
        return codeName;
    }

    public void setCodeName(String codeName) {
        this.codeName = codeName;
    }

    public String getCodeEname() {
        return codeEname;
    }

    public void setCodeEname(String codeEname) {
        this.codeEname = codeEname;
    }
}
