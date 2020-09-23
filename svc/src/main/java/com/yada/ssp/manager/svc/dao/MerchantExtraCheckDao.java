package com.yada.ssp.manager.svc.dao;

import com.yada.ssp.manager.svc.base.BaseDao;
import com.yada.ssp.manager.svc.model.MerchantExtraCheck;

import java.util.List;

/**
 * 商户附加信息申请Dao
 */
public interface MerchantExtraCheckDao extends BaseDao<MerchantExtraCheck, String> {

    List<MerchantExtraCheck> findByCcyType(String ccyType);

    List<MerchantExtraCheck> findByInternationalCode(String internationalCode);
}
