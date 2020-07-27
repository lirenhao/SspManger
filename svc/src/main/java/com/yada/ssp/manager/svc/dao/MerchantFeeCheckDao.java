package com.yada.ssp.manager.svc.dao;

import com.yada.ssp.manager.svc.base.BaseDao;
import com.yada.ssp.manager.svc.model.MerchantFeeCheck;

import java.util.List;

/**
 * Created by bjy on 2018/12/3.
 * 商户费率申请Dao
 */
public interface MerchantFeeCheckDao extends BaseDao<MerchantFeeCheck, String> {
    List<MerchantFeeCheck> findByMerchantMerchantId(String merchantId);
}
