package com.yada.ssp.manager.svc.dao;

import com.yada.ssp.manager.svc.base.BaseDao;
import com.yada.ssp.manager.svc.model.MerchantExtraCheck;

import java.util.List;

/**
 * Created by bjy on 2018/12/3.
 * 商户附加信息申请Dao
 */
public interface MerchantExtraCheckDao extends BaseDao<MerchantExtraCheck, String> {

    List<MerchantExtraCheck> findByCcyTypeCcyType(String ccyType);

    List<MerchantExtraCheck> findByInternationalCodeInternationalCode(String internationalCode);
}