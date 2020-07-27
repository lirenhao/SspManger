package com.yada.ssp.manager.svc.dao;

import com.yada.ssp.manager.svc.base.BaseDao;
import com.yada.ssp.manager.svc.model.MerchantFee;

import java.util.List;

/**
 * Created by bjy on 2018/11/27.
 * 商户费率表Dao
 */
public interface MerchantFeeDao extends BaseDao<MerchantFee, String> {

    List<MerchantFee> findByMerchantMerchantId(String merchantId);
}
