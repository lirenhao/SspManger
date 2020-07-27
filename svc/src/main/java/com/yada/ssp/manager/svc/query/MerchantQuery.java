package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.Merchant;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by bjy on 2018/7/23.
 * 商户Query
 */
public class MerchantQuery implements Specification<Merchant> {

    private String merchantId;
    private String merchantType;
    private String orgId;
    private String checkState;
    private String operation;

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getMerchantType() {
        return merchantType;
    }

    public void setMerchantType(String merchantType) {
        this.merchantType = merchantType;
    }

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
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
    public Predicate toPredicate(Root<Merchant> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder cb) {
        List<Predicate> list = new LinkedList<>();

        if (null != merchantId && !"".equals(merchantId)) {
            list.add(cb.equal(root.get("merchantId").as(String.class), merchantId));
        }
        if (null != orgId && !"".equals(orgId)) {
            list.add(cb.like(root.get("org").get("orgId").as(String.class), orgId+"%"));
        }
        if (null != merchantType && !"".equals(merchantType)) {
            list.add(cb.equal(root.get("merchantType").as(String.class), merchantType));
        }
        if (null != checkState && !"".equals(checkState)) {
            list.add(cb.equal(root.get("merchantExtraCheck").get("checkState").as(String.class), checkState));
        }
        if (null != operation && !"".equals(operation)) {
            list.add(cb.equal(root.get("merchantExtraCheck").get("operation").as(String.class), operation));
        }
        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[list.size()]));
        }

        return criteriaQuery.getRestriction();
    }
}
