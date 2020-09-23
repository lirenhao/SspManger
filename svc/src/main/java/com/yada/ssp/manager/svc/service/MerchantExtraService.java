package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.MerchantExtraDao;
import com.yada.ssp.manager.svc.model.MerchantExtra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by bjy on 2018/8/3.
 * 商户附加信息Service
 */

@Service
@Transactional(readOnly = true)
public class MerchantExtraService {

    private final MerchantExtraDao merchantExtraDao;

    @Autowired
    public MerchantExtraService(MerchantExtraDao merchantExtraDao) {
        this.merchantExtraDao = merchantExtraDao;
    }

    public MerchantExtra findOne(String merchantId) {
        return merchantExtraDao.findById(merchantId).orElse(new MerchantExtra());
    }

    public List<MerchantExtra> findAll() {
        return merchantExtraDao.findAll();
    }

    public void saveAndUpdate(MerchantExtra merchantExtra) {
        merchantExtraDao.saveAndFlush(merchantExtra);
    }

    public List<MerchantExtra> findListByCcyType(String ccyType) {
        return merchantExtraDao.findByCcyType(ccyType);
    }

    public List<MerchantExtra> findListByInternationalCode(String internationalCode) {
        return merchantExtraDao.findByInternationalCode(internationalCode);
    }
}
