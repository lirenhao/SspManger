package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.model.StaticQrcListCheck;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by bjy on 2018/11/27.
 * 商户静态码审核查询
 */
public class StaticQrcListCheckQuery implements Specification<StaticQrcListCheck> {

    private String merchantId;
    private String terminalId;
    private String ccyCode;
    private String useCase;
    private String lsId;
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

    public String getTerminalId() {
        return terminalId;
    }

    public void setTerminalId(String terminalId) {
        this.terminalId = terminalId;
    }

    public String getCcyCode() {
        return ccyCode;
    }

    public void setCcyCode(String ccyCode) {
        this.ccyCode = ccyCode;
    }

    public String getUseCase() {
        return useCase;
    }

    public void setUseCase(String useCase) {
        this.useCase = useCase;
    }

    public String getLsId() {
        return lsId;
    }

    public void setLsId(String lsId) {
        this.lsId = lsId;
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
    public Predicate toPredicate(Root<StaticQrcListCheck> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder cb) {
        List<Predicate> list = new LinkedList<>();

        if (null != lsId && !"".equals(lsId)) {
            list.add(cb.equal(root.get("lsId").as(String.class), lsId));
        }
        if (null != merchantId && !"".equals(merchantId)) {
            list.add(cb.equal(root.get("merchantId").as(String.class), merchantId));
        }
        if (null != terminalId && !"".equals(terminalId)) {
            list.add(cb.equal(root.get("terminalId").as(String.class), terminalId));
        }
        if (null != ccyCode && !"".equals(ccyCode)) {
            list.add(cb.equal(root.get("ccyCode").get("ccyType").as(String.class), ccyCode));
        }
        if (null != useCase && !"".equals(useCase)) {
            list.add(cb.equal(root.get("useCase").as(String.class), useCase));
        }
        if (null != checkState && !"".equals(checkState)) {
            list.add(cb.equal(root.get("checkState").as(String.class), checkState));
        }
        if (null != operation && !"".equals(operation)) {
            list.add(cb.equal(root.get("operation").as(String.class), operation));
        }
        if(null != orgId && !"".equals(orgId)) {
            Join<StaticQrcListCheck, Merchant> joinMerchant = root.join("merchant");
            list.add(cb.like(joinMerchant.get("org").get("orgId").as(String.class), orgId+"%"));
        }
        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[list.size()]));
        }

        return criteriaQuery.getRestriction();
    }
}
