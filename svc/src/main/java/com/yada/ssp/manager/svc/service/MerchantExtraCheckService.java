package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.MerchantExtraCheckDao;
import com.yada.ssp.manager.svc.dao.MerchantExtraDao;
import com.yada.ssp.manager.svc.model.MerchantExtra;
import com.yada.ssp.manager.svc.model.MerchantExtraCheck;
import com.yada.ssp.manager.svc.query.MerchantExtraCheckQuery;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by bjy on 2018/8/3.
 * 商户附加信息审核Service
 */

@Service
@Transactional
public class MerchantExtraCheckService {

    private final MerchantExtraCheckDao merchantExtraCheckDao;
    private final MerchantExtraDao merchantExtraDao;

    @Autowired
    public MerchantExtraCheckService(MerchantExtraCheckDao merchantExtraCheckDao, MerchantExtraDao merchantExtraDao) {
        this.merchantExtraCheckDao = merchantExtraCheckDao;
        this.merchantExtraDao = merchantExtraDao;
    }

    public MerchantExtraCheck findOne(String merchantId) {
        return merchantExtraCheckDao.getOne(merchantId);
    }

    public Page<MerchantExtraCheck> findAll(MerchantExtraCheckQuery query, Pageable pageable) {
        return merchantExtraCheckDao.findAll(query, pageable);
    }

    public List<MerchantExtraCheck> findAll() {
        return merchantExtraCheckDao.findAll();
    }

    public void saveAndUpdate(MerchantExtraCheck merchantExtraCheck) {
        merchantExtraCheckDao.saveAndFlush(merchantExtraCheck);
    }

    public void saveMerchantExtra(MerchantExtraCheck merchantExtraCheck) {
        merchantExtraCheck.setCheckState("0");
        if (merchantExtraDao.existsById(merchantExtraCheck.getMerchantId())) {
            merchantExtraCheck.setOperation("1");
        } else {
            merchantExtraCheck.setOperation("0");
        }
        merchantExtraCheck.setCheckReason("");
        merchantExtraCheckDao.saveAndFlush(merchantExtraCheck);
    }

    public void merchantExtraDelete(String merchantId) {
        MerchantExtraCheck merchantExtraCheck = merchantExtraCheckDao.getOne(merchantId);
        merchantExtraCheck.setCheckState("0");
        merchantExtraCheck.setOperation("2");
        merchantExtraCheck.setCheckReason("");
        merchantExtraCheckDao.saveAndFlush(merchantExtraCheck);
    }

    public void saveCheck(String merchantId, String checkReason, String state) {
        MerchantExtraCheck merchantExtraCheck = merchantExtraCheckDao.getOne(merchantId);
        merchantExtraCheck.setCheckReason(checkReason);
        MerchantExtra merchantExtra = new MerchantExtra();
        if (state.equals("0")) {
            if (merchantExtraCheck.getOperation().equals("2")) {
                if(merchantExtraDao.existsById(merchantId)) {
                    merchantExtraDao.deleteById(merchantId);
                }
                merchantExtraCheckDao.deleteById(merchantId);
            } else {
                merchantExtraCheck.setCheckState("1");
                BeanUtils.copyProperties(merchantExtraCheck, merchantExtra);
                merchantExtraDao.saveAndFlush(merchantExtra);
                merchantExtraCheckDao.saveAndFlush(merchantExtraCheck);
            }
        } else if (state.equals("1")) {
            merchantExtraCheck.setCheckState("2");
            merchantExtraCheckDao.saveAndFlush(merchantExtraCheck);
        }
    }
}
