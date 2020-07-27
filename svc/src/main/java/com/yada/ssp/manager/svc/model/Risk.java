package com.yada.ssp.manager.svc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "T_B_RISK")
public class Risk {

    public static final String TABLE_ALIAS = "Risk Monitoring";
    public static final String ALIAS_RISK_CODE = "RISK CODE";
    public static final String ALIAS_RISK_NAME = "RISK NAME";
    public static final String ALIAS_VALUE = "RISK LIMIT";

    @Id
    private String riskCode;
    @Column
    private String riskName;
    @Column
    private String value;
    @Column
    private String valueFormat;

    public String getRiskCode() {
        return riskCode;
    }

    public void setRiskCode(String riskCode) {
        this.riskCode = riskCode;
    }

    public String getRiskName() {
        return riskName;
    }

    public void setRiskName(String riskName) {
        this.riskName = riskName;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getValueFormat() {
        return valueFormat;
    }

    public void setValueFormat(String valueFormat) {
        this.valueFormat = valueFormat;
    }
}
