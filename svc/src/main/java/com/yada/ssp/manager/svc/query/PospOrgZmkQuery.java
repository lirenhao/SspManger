package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.PospOrgZmk;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.LinkedList;
import java.util.List;

public class PospOrgZmkQuery implements Specification<PospOrgZmk> {

    private String orgId;

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    @Override
    public Predicate toPredicate(Root<PospOrgZmk> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        List<Predicate> list = new LinkedList<>();
        if (null != orgId && !"".equals(orgId)) {
            list.add(criteriaBuilder.equal(root.get("orgId").as(String.class), orgId));
        }
        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[0]));
        }
        return criteriaQuery.getRestriction();
    }
}
