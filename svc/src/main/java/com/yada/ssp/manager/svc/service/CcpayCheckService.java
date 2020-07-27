package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.util.md5keyBean;
import com.yada.ssp.manager.svc.dao.CcpayCheckDao;
import com.yada.ssp.manager.svc.dao.CcpayDao;
import com.yada.ssp.manager.svc.model.Ccpay;
import com.yada.ssp.manager.svc.model.CcpayCheck;
import com.yada.ssp.manager.svc.query.CcpayCheckQuery;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by bjy on 2018/11/19.
 * CcpayService
 */

@Service
@Transactional
public class CcpayCheckService {

    private final CcpayCheckDao ccpayCheckDao;
    private md5keyBean md5;
    private final CcpayDao ccpayDao;

    @Autowired
    public CcpayCheckService(CcpayCheckDao ccpayCheckDao, CcpayDao ccpayDao) {
        this.ccpayCheckDao = ccpayCheckDao;
        md5 = new md5keyBean();
        this.ccpayDao = ccpayDao;
    }

    public CcpayCheck findOne(String merchantId) {
        return ccpayCheckDao.getOne(merchantId);
    }

    public Page<CcpayCheck> findAll(CcpayCheckQuery query, Pageable pageable) {
        return ccpayCheckDao.findAll(query, pageable);
    }

    public List<CcpayCheck> findAll() {
        return ccpayCheckDao.findAll();
    }

    public void saveAndUpdate(CcpayCheck ccpayCheck) {
        ccpayCheckDao.saveAndFlush(ccpayCheck);
    }

    public boolean exists(String merchantId) {
        return ccpayCheckDao.existsById(merchantId);
    }

    public void save(CcpayCheck ccpayCheck) {
        BigDecimal fee = ccpayCheck.getFee();
        fee = fee.divide(new BigDecimal(1000), 3, BigDecimal.ROUND_HALF_UP);
        ccpayCheck.setFee(fee);
        ccpayCheck.setCcpayMerPass(md5.getkeyBeanofStr(ccpayCheck.getCcpayMerPass()).toLowerCase());
        ccpayCheck.setNotifyFlag("0");
        ccpayCheck.setCheckReason("");
        ccpayCheck.setCheckState("0");
        ccpayCheck.setOperation("0");
        ccpayCheckDao.saveAndFlush(ccpayCheck);
    }

    public void update(CcpayCheck ccpayCheck) {
        BigDecimal fee = ccpayCheck.getFee();
        fee = fee.divide(new BigDecimal(1000), 3, BigDecimal.ROUND_HALF_UP);
        ccpayCheck.setFee(fee);
        ccpayCheck.setCheckReason("");
        ccpayCheck.setCheckState("0");
        ccpayCheck.setOperation("1");
        ccpayCheck.setCcpayMerPass(md5.getkeyBeanofStr(ccpayCheck.getCcpayMerPass()).toLowerCase());
        ccpayCheckDao.saveAndFlush(ccpayCheck);
    }

    public void delete(String merchantId) {
        CcpayCheck ccpayCheck = ccpayCheckDao.getOne(merchantId);
        ccpayCheck.setOperation("2");
        ccpayCheck.setCheckState("0");
        ccpayCheck.setCheckReason("");
        ccpayCheckDao.saveAndFlush(ccpayCheck);
    }

    public void saveCheck(String merchantId, String checkReason, String state) {
        CcpayCheck ccpayCheck = ccpayCheckDao.getOne(merchantId);
        ccpayCheck.setCheckReason(checkReason);
        Ccpay ccpay = new Ccpay();
        if (state.equals("0")) {
            if (ccpayCheck.getOperation().equals("2")) {
                if (ccpayDao.existsById(merchantId)) {
                    ccpayDao.deleteById(merchantId);
                }
                ccpayCheckDao.deleteById(merchantId);
            } else {
                ccpayCheck.setCheckState("1");
                BeanUtils.copyProperties(ccpayCheck, ccpay);
                Ccpay curCcpay = ccpayDao.getOne(merchantId);
                if (curCcpay != null) {
                    ccpay.setNotifyFlag(curCcpay.getNotifyFlag());
                    ccpay.setStaticQrc(curCcpay.getStaticQrc());
                } else {
                    ccpay.setNotifyFlag("0");
                    ccpay.setStaticQrc("");
                }
                ccpayDao.saveAndFlush(ccpay);
                ccpayCheckDao.saveAndFlush(ccpayCheck);
            }
        } else if (state.equals("1")) {
            ccpayCheck.setCheckState("2");
            ccpayCheckDao.saveAndFlush(ccpayCheck);
        }
    }
}
