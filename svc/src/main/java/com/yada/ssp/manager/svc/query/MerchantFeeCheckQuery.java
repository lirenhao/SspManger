package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.model.MerchantFeeCheck;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by bjy on 2018/11/27.
 * 商户费率表审核查询
 */
public class MerchantFeeCheckQuery implements Specification<MerchantFeeCheck> {
    private String lsId;
    private String merchantId;
    private String feeType;
    private String cardOrgNum;
    private String checkState;
    private String operation;
    private String orgId;

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getLsId() {
        return lsId;
    }

    public void setLsId(String lsId) {
        this.lsId = lsId;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getFeeType() {
        return feeType;
    }

    public void setFeeType(String feeType) {
        this.feeType = feeType;
    }

    public String getCardOrgNum() {
        return cardOrgNum;
    }

    public void setCardOrgNum(String cardOrgNum) {
        this.cardOrgNum = cardOrgNum;
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
    public Predicate toPredicate(Root<MerchantFeeCheck> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder cb) {
        List<Predicate> list = new LinkedList<>();
        if (null != lsId && !"".equals(lsId)) {
            list.add(cb.equal(root.get("lsId").as(String.class), lsId));
        }
        if (null != merchantId && !"".equals(merchantId)) {
            list.add(cb.equal(root.get("merchant").get("merchantId").as(String.class), merchantId));
        }
        if (null != feeType && !"".equals(feeType)) {
            list.add(cb.equal(root.get("feeType").as(String.class), feeType));
        }
        if (null != cardOrgNum && !"".equals(cardOrgNum)) {
            list.add(cb.equal(root.get("cardOrgNum").as(String.class), cardOrgNum));
        }
        if (null != checkState && !"".equals(checkState)) {
            list.add(cb.equal(root.get("checkState").as(String.class), checkState));
        }
        if (null != operation && !"".equals(operation)) {
            list.add(cb.equal(root.get("operation").as(String.class), operation));
        }
        if(null != orgId && !"".equals(orgId)) {
            Join<MerchantFeeCheck, Merchant> joinMerchant = root.join("merchant");
            list.add(cb.like(joinMerchant.get("org").get("orgId").as(String.class), orgId+"%"));
        }
        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[list.size()]));
        }
        return criteriaQuery.getRestriction();
    }
}
