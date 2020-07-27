package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.CupqrcSettle;
import com.yada.ssp.manager.svc.model.Merchant;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.LinkedList;
import java.util.List;

public class CupqrcSettleQuery implements Specification<CupqrcSettle> {

    private String settleDate;
    private String merchantId;
    private String status;
    private String orgId;

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getSettleDate() {
        return settleDate;
    }

    public void setSettleDate(String settleDate) {
        this.settleDate = settleDate;
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
    public Predicate toPredicate(Root<CupqrcSettle> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        List<Predicate> list = new LinkedList<>();

        if (null != settleDate && !"".equals(settleDate)) {
            list.add(criteriaBuilder.equal(root.get("settleDate").as(String.class), settleDate));
        }
        if (null != merchantId && !"".equals(merchantId)) {
            list.add(criteriaBuilder.equal(root.get("merchantId").as(String.class), merchantId));
        }
        if (null != status && !"".equals(status)) {
            list.add(criteriaBuilder.equal(root.get("status").as(String.class), status));
        }
        if(null != orgId && !"".equals(orgId)) {
            Join<CupqrcSettle, Merchant> joinMerchant = root.join("merchant");
            list.add(criteriaBuilder.like(joinMerchant.get("org").get("orgId").as(String.class), orgId+"%"));
        }

        list.add(criteriaBuilder.notEqual(root.get("status").as(String.class), "1"));
        criteriaQuery.where(list.toArray(new Predicate[list.size()]));
        return criteriaQuery.getRestriction();
    }
}
