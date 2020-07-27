package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.MerApiOrg;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by bjy on 2018/12/19.
 * API机构表Query
 */
public class MerApiOrgQuery implements Specification<MerApiOrg> {

    private String orgId;
    private String orgName;

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    @Override
    public Predicate toPredicate(Root<MerApiOrg> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        List<Predicate> list = new LinkedList<>();

        if (null != orgId && !"".equals(orgId)) {
            list.add(criteriaBuilder.equal(root.get("orgId").as(String.class), orgId));
        }
        if (null != orgName && !"".equals(orgName)) {
            list.add(criteriaBuilder.equal(root.get("orgName").as(String.class), orgName));
        }
        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[list.size()]));
        }

        return criteriaQuery.getRestriction();
    }
}
