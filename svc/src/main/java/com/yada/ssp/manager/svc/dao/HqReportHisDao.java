package com.yada.ssp.manager.svc.dao;

import com.yada.ssp.manager.svc.base.BaseDao;
import com.yada.ssp.manager.svc.model.HqReportHis;
import com.yada.ssp.manager.svc.model.HqReportHisPK;

import java.util.List;

public interface HqReportHisDao extends BaseDao<HqReportHis, HqReportHisPK> {

    List<HqReportHis> findByOrgIdAndYearmonLike(String orgId, String year);
}
