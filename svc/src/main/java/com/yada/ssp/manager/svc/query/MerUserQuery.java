package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.MerUser;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.LinkedList;
import java.util.List;

public class MerUserQuery implements Specification<MerUser> {

    private String orgId;
    private String merchantId;

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    @Override
    public Predicate toPredicate(Root<MerUser> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder cb) {
        List<Predicate> list = new LinkedList<>();


        if (null != orgId && !"".equals(orgId)) {
            list.add(cb.like(root.get("merchant").get("org").get("orgId").as(String.class), orgId+"%"));
        }
        if (null != merchantId && !"".equals(merchantId)) {
            list.add(cb.equal(root.get("merchantId").as(String.class), merchantId));
        }
        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[0]));
        }

        return criteriaQuery.getRestriction();
    }
}
