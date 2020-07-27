package com.yada.ssp.manager.svc.dao;

import com.yada.ssp.manager.svc.base.BaseDao;
import com.yada.ssp.manager.svc.model.TermSn;
import com.yada.ssp.manager.svc.model.TermSnPK;

import java.util.List;

public interface TermSnDao extends BaseDao<TermSn, TermSnPK> {

    TermSn findByVendorIdAndSnNo(String vendorId, String snNo);

    List<TermSn> findByMerchantIdAndTerminalId(String merchantId, String terminalId);
}