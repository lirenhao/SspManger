package com.yada.ssp.manager.svc.dao;

import com.yada.ssp.manager.svc.base.BaseDao;
import com.yada.ssp.manager.svc.model.Org;

import java.util.List;

public interface OrgDao extends BaseDao<Org, String> {

    List<Org> findByOrg(Org org);
}
