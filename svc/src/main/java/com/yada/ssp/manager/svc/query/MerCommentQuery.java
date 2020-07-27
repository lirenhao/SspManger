package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.MerComment;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.LinkedList;
import java.util.List;

public class MerCommentQuery implements Specification<MerComment> {

    private String orgId;
    private String merchantId;
    private String status;

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public Predicate toPredicate(Root<MerComment> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder cb) {
        List<Predicate> list = new LinkedList<>();


        if (null != orgId && !"".equals(orgId)) {
            list.add(cb.like(root.get("merchant").get("org").get("orgId").as(String.class), orgId+"%"));
        }
        if (null != merchantId && !"".equals(merchantId)) {
            list.add(cb.equal(root.get("merchantId").as(String.class), merchantId));
        }
        if (null != status && !"".equals(status)) {
            list.add(cb.like(root.get("status").as(String.class), status));
        }
        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[0]));
        }

        return criteriaQuery.getRestriction();
    }
}
