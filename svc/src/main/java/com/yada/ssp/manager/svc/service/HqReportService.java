package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.HqReportHisDao;
import com.yada.ssp.manager.svc.model.HqReport;
import com.yada.ssp.manager.svc.model.HqReportHis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HqReportService {

    private final HqReportHisDao hqReportHisDao;

    @Autowired
    public HqReportService(HqReportHisDao hqReportHisDao) {
        this.hqReportHisDao = hqReportHisDao;
    }

    public List<HqReport> hqReport(int curYear, String orgId) {
        int perYear = curYear - 1;

        // 查询当年数据
        List<HqReportHis> curList = hqReportHisDao.findByOrgIdAndYearmonLike(orgId, curYear + "%");
        // 查询上年数据
        List<HqReportHis> perList = hqReportHisDao.findByOrgIdAndYearmonLike(orgId, perYear + "%");

        return curList.stream().map(item -> {
            HqReport hq = new HqReport();
            hq.setMonth(getMonth(item.getYearmon()));
            hq.setMerNum(item.getCountMid());
            hq.setAddNum(item.getNewMid());
            hq.setLossNum(item.getLossMid());
            hq.setCurTran(item.getTranAmtMon());
            hq.setSumTran(item.getTranAmtYear());
            hq.setPosNum(item.getCountTid());
            hq.setBarNum(item.getCountTidQr());

            // 获取上个月的数据
            HqReportHis perMonthHq = getPerMonth(hq.getMonth(), curList, perList);
            hq.setMerNumMonthPer(getPercent(hq.getMerNum(), perMonthHq.getCountMid()));
            hq.setCurTranMonthPer(getPercent(hq.getCurTran(), perMonthHq.getTranAmtMon()));
            hq.setSumTranMonthPer(getPercent(hq.getSumTran(), perMonthHq.getTranAmtYear()));
            hq.setPosNumMonthPer(getPercent(hq.getPosNum(), perMonthHq.getCountTid()));

            // 获取上年同月数据
            HqReportHis perYearHq = getPerYear(hq.getMonth(), perList);
            hq.setMerNumYearPer(getPercent(hq.getMerNum(), perYearHq.getCountMid()));
            hq.setCurTranYearPer(getPercent(hq.getCurTran(), perYearHq.getTranAmtMon()));
            hq.setSumTranYearPer(getPercent(hq.getSumTran(), perYearHq.getTranAmtYear()));
            hq.setPosNumYearPer(getPercent(hq.getPosNum(), perYearHq.getCountTid()));

            return hq;
        }).collect(Collectors.toList());
    }

    private HqReportHis getPerMonth(int month, List<HqReportHis> curList, List<HqReportHis> perList) {
        if (month == 0)
            return new HqReportHis();
        if (month == 1) {
            if (perList.size() < 12)
                return new HqReportHis();
            else
                return perList.get(11);
        }
        int perMonth = month - 1;
        List<HqReportHis> list = curList.stream().filter(item -> perMonth == getMonth(item.getYearmon())).collect(Collectors.toList());
        return list.size() == 0 ? new HqReportHis() : list.get(0);
    }

    private HqReportHis getPerYear(int month, List<HqReportHis> perYearList) {
        if (month == 0) {
            return new HqReportHis();
        }
        List<HqReportHis> list = perYearList.stream().filter(item -> month == getMonth(item.getYearmon())).collect(Collectors.toList());
        return list.size() == 0 ? new HqReportHis() : list.get(0);
    }

    private String getPercent(Double numerator, Double denominator) {
        if (denominator == null) {
            return "NA";
        } else {
            BigDecimal num = new BigDecimal(numerator).multiply(new BigDecimal(100));
            BigDecimal den = new BigDecimal(denominator);
            return num.divide(den, 2, BigDecimal.ROUND_HALF_UP).subtract(new BigDecimal(100)).toString() + "%";
        }
    }

    private String getPercent(Integer numerator, Integer denominator) {
        if (denominator != null) {
            BigDecimal num = new BigDecimal(numerator).multiply(new BigDecimal(100));
            BigDecimal den = new BigDecimal(denominator);
            return num.divide(den, 2, BigDecimal.ROUND_HALF_UP).subtract(new BigDecimal(100)).toString() + "%";
        } else {
            return "NA";
        }
    }

    private int getMonth(String yearmon) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
        try {
            Calendar c = Calendar.getInstance();
            c.setTime(sdf.parse(yearmon));
            return c.get(Calendar.MONTH) + 1;
        } catch (ParseException e) {
            return 0;
        }
    }
}
