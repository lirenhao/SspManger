package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.ManualSettleCheck;
import com.yada.ssp.manager.svc.model.Merchant;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.LinkedList;
import java.util.List;

public class ManualSettleQuery implements Specification<ManualSettleCheck> {

    private String settleDate;
    private String merchantId;
    private String checkState;
    private String operation;
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

    public String getCheckState() {
        return checkState;
    }

    public void setCheckState(String checkState) {
        this.checkState = checkState;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    @Override
    public Predicate toPredicate(Root<ManualSettleCheck> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        List<Predicate> list = new LinkedList<>();

        if (null != settleDate && !"".equals(settleDate)) {
            list.add(criteriaBuilder.equal(root.get("settleDate").as(String.class), settleDate));
        }
        if (null != merchantId && !"".equals(merchantId)) {
            list.add(criteriaBuilder.equal(root.get("merchantId").as(String.class), merchantId));
        }
        if (null != checkState && !"".equals(checkState)) {
            list.add(criteriaBuilder.equal(root.get("checkState").as(String.class), checkState));
        }
        if (null != operation && !"".equals(operation)) {
            list.add(criteriaBuilder.equal(root.get("operation").as(String.class), operation));
        }
        if(null != orgId && !"".equals(orgId)) {
            Join<ManualSettleCheck, Merchant> joinMerchant = root.join("merchant");
            list.add(criteriaBuilder.like(joinMerchant.get("org").get("orgId").as(String.class), orgId+"%"));
        }
        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[list.size()]));
        }

        return criteriaQuery.getRestriction();
    }
}
