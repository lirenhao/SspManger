package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.Ccpay;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by bjy on 2018/11/19.
 * Ccpay查询
 */
public class CcpayQuery implements Specification<Ccpay> {


    private String merchantId;
    private String ccpayMerName;
    private String notifyFlag;

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

    @Override
    public Predicate toPredicate(Root<Ccpay> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
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
        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[list.size()]));
        }

        return criteriaQuery.getRestriction();
    }
}
