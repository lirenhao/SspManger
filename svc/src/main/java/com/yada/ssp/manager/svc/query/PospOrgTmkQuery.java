package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.PospOrgTmk;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.LinkedList;
import java.util.List;

public class PospOrgTmkQuery implements Specification<PospOrgTmk> {

    private String orgId;

    private String tmkZmk;

    private String merchantId;

    private String terminalId;

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getTmkZmk() {
        return tmkZmk;
    }

    public void setTmkZmk(String tmkZmk) {
        this.tmkZmk = tmkZmk;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getTerminalId() {
        return terminalId;
    }

    public void setTerminalId(String terminalId) {
        this.terminalId = terminalId;
    }

    @Override
    public Predicate toPredicate(Root<PospOrgTmk> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        List<Predicate> list = new LinkedList<>();
        if (null != orgId && !"".equals(orgId)) {
            list.add(criteriaBuilder.equal(root.get("orgId").as(String.class), orgId));
        }
        if (null != tmkZmk && !"".equals(tmkZmk)) {
            list.add(criteriaBuilder.equal(root.get("tmkZmk").as(String.class), tmkZmk));
        }
        if (null != terminalId && !"".equals(terminalId)) {
            list.add(criteriaBuilder.equal(root.get("terminalId").as(String.class), terminalId));
        }
        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[0]));
        }
        return criteriaQuery.getRestriction();
    }
}
