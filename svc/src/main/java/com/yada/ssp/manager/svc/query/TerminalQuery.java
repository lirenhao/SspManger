package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.Terminal;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by bjy on 2018/9/4.
 * 终端Query
 */
public class TerminalQuery implements Specification<Terminal> {

    private String orgId;
    private String terminalId;
    private String merchantId;

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getTerminalId() {
        return terminalId;
    }

    public void setTerminalId(String terminalId) {
        this.terminalId = terminalId;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    @Override
    public Predicate toPredicate(Root<Terminal> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder cb) {
        List<Predicate> list = new LinkedList<>();

        if (null != terminalId && !"".equals(terminalId)) {
            list.add(cb.equal(root.get("terminalId").as(String.class), terminalId));
        }
        if (null != merchantId && !"".equals(merchantId)) {
            list.add(cb.equal(root.get("merchant").get("merchantId").as(String.class), merchantId));
        }
        if (null != orgId && !"".equals(orgId)) {
            list.add(cb.like(root.get("org").get("orgId").as(String.class), orgId + "%"));
        }

        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[list.size()]));
        }

        return criteriaQuery.getRestriction();
    }
}
