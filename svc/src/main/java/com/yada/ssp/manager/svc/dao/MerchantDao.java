package com.yada.ssp.manager.svc.dao;

import com.yada.ssp.manager.svc.base.BaseDao;
import com.yada.ssp.manager.svc.model.Merchant;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by bjy on 2018/7/23.
 * 商户DAO
 */
public interface MerchantDao extends BaseDao<Merchant, String> {

    @Query("select m.merchantId, m.merNameChn, m.merNameEng from Merchant m where m.org.orgId like concat(?1, '%')")
    List<Object[]> findByOrgId(String orgId);
}
