package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.model.Trans;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by bjy on 2018/8/8.
 * 交易记录查询Query
 */
public class TransQuery implements Specification<Trans> {

    private String merNo; // 商户号
    private String termNo; // 终端号
    private String tranType; // 交易类型
    private String tranDate; // 交易时间
    private String orgId;

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getMerNo() {
        return merNo;
    }

    public void setMerNo(String merNo) {
        this.merNo = merNo;
    }

    public String getTermNo() {
        return termNo;
    }

    public void setTermNo(String termNo) {
        this.termNo = termNo;
    }

    public String getTranType() {
        return tranType;
    }

    public void setTranType(String tranType) {
        this.tranType = tranType;
    }

    public String getTranDate() {
        return tranDate;
    }

    public void setTranDate(String tranDate) {
        this.tranDate = tranDate;
    }

    @Override
    public Predicate toPredicate(Root<Trans> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> list = new LinkedList<>();

        if (null != merNo && !"".equals(merNo)) {
            list.add(cb.equal(root.get("merNo").as(String.class), merNo));
        }
        if (null != termNo && !"".equals(termNo)) {
            list.add(cb.equal(root.get("termNo").as(String.class), termNo));
        }
        if (null != tranType && !"".equals(tranType)) {
            list.add(cb.equal(root.get("tranType").as(String.class), tranType));
        }
        if (null != tranDate && !"".equals(tranDate)) {
            list.add(cb.equal(root.get("tranDate").as(String.class), tranDate));
        }
        if(null != orgId && !"".equals(orgId)) {
            Join<Trans, Merchant> joinMerchant = root.join("merchant");
            list.add(cb.like(joinMerchant.get("org").get("orgId").as(String.class), orgId+"%"));
        }
        if (list.size() > 0) {
            query.where(list.toArray(new Predicate[list.size()]));
        }

        return query.getRestriction();
    }
}
