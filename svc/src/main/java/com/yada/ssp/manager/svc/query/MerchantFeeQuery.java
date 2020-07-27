package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.MerchantFee;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by bjy on 2018/11/27.
 * 商户费率表查询
 */
public class MerchantFeeQuery implements Specification<MerchantFee> {
    private String lsId;
    private String merchantId;
    private String feeType;
    private String cardOrgNum;
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

    @Override
    public Predicate toPredicate(Root<MerchantFee> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder cb) {
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
        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[list.size()]));
        }
        return criteriaQuery.getRestriction();
    }
}
