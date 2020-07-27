package com.yada.ssp.manager.svc.dao;

import com.yada.ssp.manager.svc.base.BaseDao;
import com.yada.ssp.manager.svc.model.PospOrgTmk;
import com.yada.ssp.manager.svc.model.PospOrgTmkPK;
import org.springframework.data.jpa.repository.Query;

public interface PospOrgTmkDao extends BaseDao<PospOrgTmk, PospOrgTmkPK> {
    int countByOrgIdLike(String orgId);
    int countByOrgIdLikeAndTerminalIdNull(String orgId);
    int countByOrgIdLikeAndTerminalIdNotNull(String orgId);
    @Query("select count(distinct t.terminalId) from PospOrgTmk t where t.orgId like concat(?1, '%') and t.terminalId is not null")
    int countTerminalId(String orgId);
}
