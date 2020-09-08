package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.MerchantFeeCheckDao;
import com.yada.ssp.manager.svc.dao.MerchantFeeDao;
import com.yada.ssp.manager.svc.model.MerchantFee;
import com.yada.ssp.manager.svc.model.MerchantFeeCheck;
import com.yada.ssp.manager.svc.query.MerchantFeeCheckQuery;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by bjy on 2018/11/27.
 * 商户费率表Service
 */
@Service
@Transactional
public class MerchantFeeCheckService {
    private final MerchantFeeCheckDao merchantFeeCheckDao;
    private final MerchantFeeDao merchantFeeDao;
    @Autowired
    public MerchantFeeCheckService(MerchantFeeCheckDao merchantFeeCheckDao, MerchantFeeDao merchantFeeDao) {
        this.merchantFeeCheckDao = merchantFeeCheckDao;
        this.merchantFeeDao = merchantFeeDao;
    }

    public MerchantFeeCheck findOne(String lsId) {
        return merchantFeeCheckDao.findById(lsId).orElse(new MerchantFeeCheck());
    }

    public Page<MerchantFeeCheck> findAll(MerchantFeeCheckQuery query, Pageable pageable) {
        return merchantFeeCheckDao.findAll(query, pageable);
    }

    public List<MerchantFeeCheck> findAll() {
        return merchantFeeCheckDao.findAll();
    }

    public void save(MerchantFeeCheck merchantFeeCheck) {
        BigDecimal fee = merchantFeeCheck.getFee();
        fee = fee.divide(new BigDecimal(10000), 4, BigDecimal.ROUND_HALF_UP);
        merchantFeeCheck.setFee(fee);
        merchantFeeCheck.setCloseDate("99999999");
        merchantFeeCheck.setCheckState("1");
        merchantFeeCheck.setOperation("0");
        merchantFeeCheck.setCheckReason("");
        merchantFeeCheckDao.saveAndFlush(merchantFeeCheck);
    }

    public void update(MerchantFeeCheck merchantFeeCheck){

        if(merchantFeeCheck.getCheckState().equals("1")||merchantFeeCheck.getCheckState().equals("3")){
            BigDecimal fee = merchantFeeCheck.getFee();
            fee = fee.divide(new BigDecimal(10000), 4, BigDecimal.ROUND_HALF_UP);
            merchantFeeCheck.setFee(fee);
            merchantFeeCheck.setCheckState("1");
            merchantFeeCheck.setCheckReason("");
            merchantFeeCheck.setOperation("1");
            merchantFeeCheck.setCloseDate("99999999");
            merchantFeeCheckDao.saveAndFlush(merchantFeeCheck);
        }else {
            BigDecimal fee = merchantFeeCheck.getFee();
            fee = fee.divide(new BigDecimal(10000), 4, BigDecimal.ROUND_HALF_UP);
            merchantFeeCheck.setFee(fee);
            merchantFeeCheck.setCheckState("4");
            merchantFeeCheck.setOperation("1");
            merchantFeeCheck.setCheckReason("");
            merchantFeeCheckDao.saveAndFlush(merchantFeeCheck);
        }

    }

    public void delete(String lsId) {
        MerchantFeeCheck merchantFeeCheck = merchantFeeCheckDao.getOne(lsId);
        merchantFeeCheck.setCheckReason("");
        merchantFeeCheck.setOperation("2");
        merchantFeeCheck.setCheckState("1");
        merchantFeeCheckDao.saveAndFlush(merchantFeeCheck);
    }

    public boolean exists(String lsId) {
        return merchantFeeCheckDao.existsById(lsId);
    }

    public List<MerchantFeeCheck> findListByMerchantId(String merchantId) {
        return merchantFeeCheckDao.findByMerchantMerchantId(merchantId);
    }

    public void saveCheck(String lsId, String state, String checkReason) {
        MerchantFeeCheck merchantFeeCheck = merchantFeeCheckDao.getOne(lsId);
        merchantFeeCheck.setCheckReason(checkReason);
        MerchantFee merchantFee = new MerchantFee();
        if(state.equals("0")){
            if(merchantFeeCheck.getOperation().equals("2")){
                if(merchantFeeDao.existsById(lsId)) {
                    merchantFeeDao.deleteById(lsId);
                }
                merchantFeeCheckDao.deleteById(lsId);
            }else {
                merchantFeeCheck.setCheckState("2");
                BeanUtils.copyProperties(merchantFeeCheck, merchantFee);
                merchantFeeDao.saveAndFlush(merchantFee);
                merchantFeeCheckDao.saveAndFlush(merchantFeeCheck);
            }
        }else if(state.equals("1")){
            merchantFeeCheck.setCheckState("3");
            merchantFeeCheckDao.saveAndFlush(merchantFeeCheck);
        }
    }
}
