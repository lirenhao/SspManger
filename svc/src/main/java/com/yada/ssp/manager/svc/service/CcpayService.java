package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.CcpayCheckDao;
import com.yada.ssp.manager.svc.dao.CcpayDao;
import com.yada.ssp.manager.svc.model.Ccpay;
import com.yada.ssp.manager.svc.model.CcpayCheck;
import com.yada.ssp.manager.svc.query.CcpayQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by bjy on 2018/11/19.
 * CcpayService
 */

@Service
@Transactional
public class CcpayService {

    private final CcpayDao ccpayDao;
    private final CcpayCheckDao ccpayCheckDao;

    @Autowired
    public CcpayService(CcpayDao ccpayDao, CcpayCheckDao ccpayCheckDao) {
        this.ccpayDao = ccpayDao;
        this.ccpayCheckDao = ccpayCheckDao;
    }

    public Ccpay findOne(String merchantId) {
        return ccpayDao.findById(merchantId).orElse(new Ccpay());
    }

    public Page<Ccpay> findAll(CcpayQuery query, Pageable pageable) {
        return ccpayDao.findAll(query, pageable);
    }

    public List<Ccpay> findAll() {
        return ccpayDao.findAll();
    }

    public void saveAndUpdate(Ccpay ccpay) {
        ccpayDao.saveAndFlush(ccpay);
    }

    public boolean exists(String merchantId) {
        return ccpayDao.existsById(merchantId);
    }

    /**
     * 修改静态码
     *
     * @param merchantId 商户号
     * @param qrCode     静态码
     */
    public void updateStaticQrc(String merchantId, String qrCode) {
        Ccpay ccpay = ccpayDao.getOne(merchantId);
        ccpay.setStaticQrc(qrCode);
        ccpayDao.saveAndFlush(ccpay);

        CcpayCheck check = ccpayCheckDao.getOne(merchantId);
        check.setStaticQrc(qrCode);
        ccpayCheckDao.saveAndFlush(check);
    }

    /**
     * 修改通知状态
     *
     * @param merchantId 商户号
     * @param notifyFlag 通知状态
     */
    public void updateNotifyFlag(String merchantId, String notifyFlag) {
        Ccpay ccpay = ccpayDao.getOne(merchantId);
        ccpay.setNotifyFlag(notifyFlag);
        ccpayDao.saveAndFlush(ccpay);

        CcpayCheck check = ccpayCheckDao.getOne(merchantId);
        check.setNotifyFlag(notifyFlag);
        ccpayCheckDao.saveAndFlush(check);
    }

    public void delete(String merchantId) {
        ccpayDao.deleteById(merchantId);
    }
}
