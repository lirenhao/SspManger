package com.yada.ssp.manager.svc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;

/**
 * CcPay表
 */
@Entity
@Table(name = "T_B_MERCHANT_CCPAY")
public class Ccpay {

    public static final String TABLE_ALIAS = "CcPay";
    public static final String ALIAS_MERCHANT_ID = "MERCHANT ID";
    public static final String ALIAS_CCPAY_MER_NAME = "MERCHANT DOING BUSINESS NAME";
    public static final String ALIAS_CCPAY_MER_PASS = "PASSWORD";
    public static final String ALIAS_STATIC_QRC = "STATIC QR CODE";
    public static final String ALIAS_NOTIFY_FLAG = "STATUS";
    public static final String ALIAS_CCPAY_FEE = "MDR RATES";
    //商户号
    @Id
    @Column(nullable = false)
    private String merchantId;
    //用户名
    @Column
    private String ccpayMerName;
    //用户密码
    @Column
    private String ccpayMerPass;
    //静态二维码
    @Column
    private String staticQrc;
    //通知状态
    @Column
    private String notifyFlag;
    //扣率
    @Column
    private BigDecimal fee;

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getCcpayMerName() {
        return ccpayMerName;
    }

    public void setCcpayMerName(String ccpayMerName) {
        this.ccpayMerName = ccpayMerName;
    }

    public String getCcpayMerPass() {
        return ccpayMerPass;
    }

    public void setCcpayMerPass(String ccpayMerPass) {
        this.ccpayMerPass = ccpayMerPass;
    }

    public String getStaticQrc() {
        return staticQrc;
    }

    public void setStaticQrc(String staticQrc) {
        this.staticQrc = staticQrc;
    }

    public String getNotifyFlag() {
        return notifyFlag;
    }

    public void setNotifyFlag(String notifyFlag) {
        this.notifyFlag = notifyFlag;
    }

    public BigDecimal getFee() {
        return fee;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
    }
}
