package com.yada.ssp.manager.svc.dao;

import com.yada.ssp.manager.svc.base.BaseDao;
import com.yada.ssp.manager.svc.model.SettleDetail;

import java.util.List;

public interface SettleDetailDao extends BaseDao<SettleDetail, String> {

    List<SettleDetail> findByMerchantIdAndSettleDateBetween(String merNo, String startDate, String endDate);
}