package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.MerchantFeeDao;
import com.yada.ssp.manager.svc.model.MerchantFee;
import com.yada.ssp.manager.svc.query.MerchantFeeQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by bjy on 2018/11/27.
 * 商户费率表Service
 */
@Service
@Transactional
public class MerchantFeeService {
    private final MerchantFeeDao merchantFeeDao;

    @Autowired
    public MerchantFeeService(MerchantFeeDao merchantFeeDao) {
        this.merchantFeeDao = merchantFeeDao;
    }

    public MerchantFee findOne(String lsId) {
        return merchantFeeDao.getOne(lsId);
    }

    public Page<MerchantFee> findAll(MerchantFeeQuery query, Pageable pageable) {
        return merchantFeeDao.findAll(query, pageable);
    }

    public List<MerchantFee> findAll() {
        return merchantFeeDao.findAll();
    }

    public void delete(String lsId) {
        merchantFeeDao.deleteById(lsId);
    }

    public boolean exists(String lsId) {
        return merchantFeeDao.existsById(lsId);
    }

    public List<MerchantFee> findListByMerchantId(String merchantId) {
        return merchantFeeDao.findByMerchantMerchantId(merchantId);
    }
}
