package com.yada.ssp.manager.svc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 币种表
 */
@Entity
@Table(name = "T_D_CCY_TYPE")
public class CcyType {

    @Id
    @Column(nullable = false, length = 3)
    private String ccyType;
    @Column
    private String ccyName;
    @Column
    private String ccyEname;
    @Column
    private String ccySymbol;

    public String getCcySymbol() {
        return ccySymbol;
    }

    public void setCcySymbol(String ccySymbol) {
        this.ccySymbol = ccySymbol;
    }

    public String getCcyType() {
        return ccyType;
    }

    public void setCcyType(String ccyType) {
        this.ccyType = ccyType;
    }

    public String getCcyName() {
        return ccyName;
    }

    public void setCcyName(String ccyName) {
        this.ccyName = ccyName;
    }

    public String getCcyEname() {
        return ccyEname;
    }

    public void setCcyEname(String ccyEname) {
        this.ccyEname = ccyEname;
    }
}
