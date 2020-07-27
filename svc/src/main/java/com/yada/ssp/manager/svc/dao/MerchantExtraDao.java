package com.yada.ssp.manager.svc.dao;

import com.yada.ssp.manager.svc.base.BaseDao;
import com.yada.ssp.manager.svc.model.MerchantExtra;

import java.util.List;

/**
 * Created by bjy on 2018/8/3.
 * 商户附加信息Dao
 */
public interface MerchantExtraDao extends BaseDao<MerchantExtra, String> {

    List<MerchantExtra> findByCcyTypeCcyType(String ccyType);

    List<MerchantExtra> findByInternationalCodeInternationalCode(String internationalCode);
}
