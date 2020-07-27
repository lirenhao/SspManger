package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.model.SettleDetail;
import com.yada.ssp.manager.svc.util.DateUtil;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.LinkedList;
import java.util.List;

public class SettleDetailQuery implements Specification<SettleDetail> {

    private String merchantId = "";
    private String settleStartDate = DateUtil.getYesterday();
    private String settleEndDate = DateUtil.getYesterday();
    private String orgId;

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getSettleStartDate() {
        return settleStartDate;
    }

    public void setSettleStartDate(String settleStartDate) {
        this.settleStartDate = settleStartDate;
    }

    public String getSettleEndDate() {
        return settleEndDate;
    }

    public void setSettleEndDate(String settleEndDate) {
        this.settleEndDate = settleEndDate;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    @Override
    public Predicate toPredicate(Root<SettleDetail> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        List<Predicate> list = new LinkedList<>();
        list.add(criteriaBuilder.equal(root.get("merchantId").as(String.class), merchantId));
        list.add(criteriaBuilder.between(root.get("settleDate"), settleStartDate, settleEndDate));
        if(null != orgId && !"".equals(orgId)) {
            Join<SettleDetail, Merchant> joinMerchant = root.join("merchant");
            list.add(criteriaBuilder.like(joinMerchant.get("org").get("orgId").as(String.class), orgId+"%"));
        }

        criteriaQuery.where(list.toArray(new Predicate[0]));
        return criteriaQuery.getRestriction();
    }
}
