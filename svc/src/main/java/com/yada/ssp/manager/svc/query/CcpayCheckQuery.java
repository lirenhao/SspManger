package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.CcpayCheck;
import com.yada.ssp.manager.svc.model.Merchant;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by bjy on 2018/11/19.
 * CcpayCheck查询
 */
public class CcpayCheckQuery implements Specification<CcpayCheck> {
    private String merchantId;
    private String ccpayMerName;
    private String notifyFlag;
    private String checkState;
    private String operation;
    private String orgId;

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getCcpayMerName() {
        return ccpayMerName;
    }

    public void setCcpayMerName(String ccpayMerName) {
        this.ccpayMerName = ccpayMerName;
    }

    public String getNotifyFlag() {
        return notifyFlag;
    }

    public void setNotifyFlag(String notifyFlag) {
        this.notifyFlag = notifyFlag;
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
    public Predicate toPredicate(Root<CcpayCheck> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        List<Predicate> list = new LinkedList<>();

        if (null != merchantId && !"".equals(merchantId)) {
            list.add(criteriaBuilder.equal(root.get("merchantId").as(String.class), merchantId));
        }
        if (null != ccpayMerName && !"".equals(ccpayMerName)) {
            list.add(criteriaBuilder.equal(root.get("ccpayMerName").as(String.class), ccpayMerName));
        }
        if (null != notifyFlag && !"".equals(notifyFlag)) {
            list.add(criteriaBuilder.equal(root.get("notifyFlag").as(String.class), notifyFlag));
        }
        if (null != checkState && !"".equals(checkState)) {
            list.add(criteriaBuilder.equal(root.get("checkState").as(String.class), checkState));
        }
        if (null != operation && !"".equals(operation)) {
            list.add(criteriaBuilder.equal(root.get("operation").as(String.class), operation));
        }
        if(null != orgId && !"".equals(orgId)) {
            Join<CcpayCheck, Merchant> joinMerchant = root.join("merchant");
            list.add(criteriaBuilder.like(joinMerchant.get("org").get("orgId").as(String.class), orgId+"%"));
        }
        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[list.size()]));
        }

        return criteriaQuery.getRestriction();
    }
}
