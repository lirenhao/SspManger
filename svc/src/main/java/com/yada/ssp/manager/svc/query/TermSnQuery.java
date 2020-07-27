package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.model.TermSn;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.LinkedList;
import java.util.List;

public class TermSnQuery implements Specification<TermSn> {

    private String vendorId;

    private String snNo;

    private String merchantId;

    private String terminalId;

    private String orgId;

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getVendorId() {
        return vendorId;
    }

    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
    }

    public String getSnNo() {
        return snNo;
    }

    public void setSnNo(String snNo) {
        this.snNo = snNo;
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
    public Predicate toPredicate(Root<TermSn> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        List<Predicate> list = new LinkedList<>();
        if (null != vendorId && !"".equals(vendorId)) {
            list.add(criteriaBuilder.equal(root.get("vendorId").as(String.class), vendorId));
        }
        if (null != snNo && !"".equals(snNo)) {
            list.add(criteriaBuilder.equal(root.get("snNo").as(String.class), snNo));
        }
        if (null != merchantId && !"".equals(merchantId)) {
            list.add(criteriaBuilder.equal(root.get("merchantId").as(String.class), merchantId));
        }
        if (null != terminalId && !"".equals(terminalId)) {
            list.add(criteriaBuilder.equal(root.get("terminalId").as(String.class), terminalId));
        }
        if(null != orgId && !"".equals(orgId)) {
            Join<TermSn, Merchant> joinMerchant = root.join("merchant");
            list.add(criteriaBuilder.like(joinMerchant.get("org").get("orgId").as(String.class), orgId+"%"));
        }

        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[0]));
        }
        return criteriaQuery.getRestriction();
    }
}
