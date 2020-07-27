package com.yada.ssp.manager.svc.model;

/**
 * HQ Report展示需要的数据格式
 */
public class HqReport {

    // 月份
    private Integer month;
    // 存量商户数
    private Integer merNum;
    // 存量上月环比
    private String merNumMonthPer;
    // 存量上年环比
    private String merNumYearPer;
    // 当月新增商户数
    private Integer addNum;
    // 当月流失商户数
    private Integer lossNum;
    // 当月交易量
    private Double curTran;
    // 当月交易量上月环比
    private String curTranMonthPer;
    // 当月交易量上年环比
    private String curTranYearPer;
    // 当年累计交易量
    private Double sumTran;
    // 当年交易量上月环比
    private String sumTranMonthPer;
    // 当年交易量上年环比
    private String sumTranYearPer;
    // POS终端数
    private Integer posNum;
    // POS终端数上月环比
    private String posNumMonthPer;
    // POS终端数上年环比
    private String posNumYearPer;
    // 二维码终端数
    private Integer barNum;

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getMerNum() {
        return merNum;
    }

    public void setMerNum(Integer merNum) {
        this.merNum = merNum;
    }

    public String getMerNumMonthPer() {
        return merNumMonthPer;
    }

    public void setMerNumMonthPer(String merNumMonthPer) {
        this.merNumMonthPer = merNumMonthPer;
    }

    public String getMerNumYearPer() {
        return merNumYearPer;
    }

    public void setMerNumYearPer(String merNumYearPer) {
        this.merNumYearPer = merNumYearPer;
    }

    public Integer getAddNum() {
        return addNum;
    }

    public void setAddNum(Integer addNum) {
        this.addNum = addNum;
    }

    public Integer getLossNum() {
        return lossNum;
    }

    public void setLossNum(Integer lossNum) {
        this.lossNum = lossNum;
    }

    public Double getCurTran() {
        return curTran;
    }

    public void setCurTran(Double curTran) {
        this.curTran = curTran;
    }

    public String getCurTranMonthPer() {
        return curTranMonthPer;
    }

    public void setCurTranMonthPer(String curTranMonthPer) {
        this.curTranMonthPer = curTranMonthPer;
    }

    public String getCurTranYearPer() {
        return curTranYearPer;
    }

    public void setCurTranYearPer(String curTranYearPer) {
        this.curTranYearPer = curTranYearPer;
    }

    public Double getSumTran() {
        return sumTran;
    }

    public void setSumTran(Double sumTran) {
        this.sumTran = sumTran;
    }

    public String getSumTranMonthPer() {
        return sumTranMonthPer;
    }

    public void setSumTranMonthPer(String sumTranMonthPer) {
        this.sumTranMonthPer = sumTranMonthPer;
    }

    public String getSumTranYearPer() {
        return sumTranYearPer;
    }

    public void setSumTranYearPer(String sumTranYearPer) {
        this.sumTranYearPer = sumTranYearPer;
    }

    public Integer getPosNum() {
        return posNum;
    }

    public void setPosNum(Integer posNum) {
        this.posNum = posNum;
    }

    public String getPosNumMonthPer() {
        return posNumMonthPer;
    }

    public void setPosNumMonthPer(String posNumMonthPer) {
        this.posNumMonthPer = posNumMonthPer;
    }

    public String getPosNumYearPer() {
        return posNumYearPer;
    }

    public void setPosNumYearPer(String posNumYearPer) {
        this.posNumYearPer = posNumYearPer;
    }

    public Integer getBarNum() {
        return barNum;
    }

    public void setBarNum(Integer barNum) {
        this.barNum = barNum;
    }
}
