package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.MerSettle;
import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.util.DateUtil;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.math.BigDecimal;
import java.util.LinkedList;
import java.util.List;

public class MerSettleQuery implements Specification<MerSettle> {

    private String settleStartDate = DateUtil.getYesterday();
    private String settleEndDate = DateUtil.getYesterday();
    private String merchantId;
    private String status;

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public Predicate toPredicate(Root<MerSettle> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        List<Predicate> list = new LinkedList<>();

        list.add(criteriaBuilder.between(root.get("settleDate"), settleStartDate, settleEndDate));
        if (null != merchantId && !"".equals(merchantId)) {
            list.add(criteriaBuilder.equal(root.get("merchantId").as(String.class), merchantId));
        }
        if ("1".equals(status)) {
            list.add(criteriaBuilder.gt(root.get("settleAmt").as(BigDecimal.class), 0));
            list.add(criteriaBuilder.isNotNull(root.get("bicCode").as(String.class)));
        }
        if ("2".equals(status)) {
            list.add(criteriaBuilder.or(
                    criteriaBuilder.le(root.get("settleAmt").as(BigDecimal.class), 0),
                    criteriaBuilder.isNull(root.get("bicCode").as(String.class))
            ));
        }
        if(null != orgId && !"".equals(orgId)) {
            Join<MerSettle, Merchant> joinMerchant = root.join("merchant");
            list.add(criteriaBuilder.like(joinMerchant.get("org").get("orgId").as(String.class), orgId+"%"));
        }
        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[0]));
        }

        return criteriaQuery.getRestriction();
    }
}
