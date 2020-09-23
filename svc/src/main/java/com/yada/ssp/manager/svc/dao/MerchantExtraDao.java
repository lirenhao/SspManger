package com.yada.ssp.manager.svc.dao;

import com.yada.ssp.manager.svc.base.BaseDao;
import com.yada.ssp.manager.svc.model.MerchantExtra;

import java.util.List;

/**
 * 商户附加信息Dao
 */
public interface MerchantExtraDao extends BaseDao<MerchantExtra, String> {

    List<MerchantExtra> findByCcyType(String ccyType);

    List<MerchantExtra> findByInternationalCode(String internationalCode);
}
