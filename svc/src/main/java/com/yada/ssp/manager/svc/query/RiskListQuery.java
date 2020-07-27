package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.model.RiskList;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.LinkedList;
import java.util.List;

public class RiskListQuery implements Specification<RiskList> {

    private String riskDate;

    private String merchantId;

    private String riskCode;

    private String orgId;

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getRiskDate() {
        return riskDate;
    }

    public void setRiskDate(String riskDate) {
        this.riskDate = riskDate;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getRiskCode() {
        return riskCode;
    }

    public void setRiskCode(String riskCode) {
        this.riskCode = riskCode;
    }

    @Override
    public Predicate toPredicate(Root<RiskList> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        List<Predicate> list = new LinkedList<>();

        if (null != riskDate && !"".equals(riskDate)) {
            list.add(criteriaBuilder.equal(root.get("riskDate").as(String.class), riskDate));
        }
        if (null != merchantId && !"".equals(merchantId)) {
            list.add(criteriaBuilder.equal(root.get("merchantId").as(String.class), merchantId));
        }
        if (null != riskCode && !"".equals(riskCode)) {
            list.add(criteriaBuilder.equal(root.get("riskCode").as(String.class), riskCode));
        }
        if(null != orgId && !"".equals(orgId)) {
            Join<RiskList, Merchant> joinMerchant = root.join("merchant");
            list.add(criteriaBuilder.like(joinMerchant.get("org").get("orgId").as(String.class), orgId+"%"));
        }

        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[list.size()]));
        }

        return criteriaQuery.getRestriction();
    }
}
