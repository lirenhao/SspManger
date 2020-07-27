package com.yada.ssp.manager.svc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by bjy on 2018/12/19.
 * 参数维护表
 */

@Entity
@Table(name = "T_D_BANKLIST")
public class BankList {

    public static final String TABLE_ALIAS = "参数维护";
    public static final String ALIAS_ACCOUNT_BANK_NO = "结算开户行号";
    public static final String ALIAS_BANK_NAME = "开户行名称";
    public static final String ALIAS_BIC = "BIC";

    //结算开户行号
    @Id
    @Column
    private String accountBankNo;
    //开户行名称
    @Column
    private String bankName;
    //BIC
    @Column
    private String bic;

    public String getAccountBankNo() {
        return accountBankNo;
    }

    public void setAccountBankNo(String accountBankNo) {
        this.accountBankNo = accountBankNo;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBic() {
        return bic;
    }

    public void setBic(String bic) {
        this.bic = bic;
    }
}
