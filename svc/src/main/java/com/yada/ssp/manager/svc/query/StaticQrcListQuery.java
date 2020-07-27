package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.StaticQrcList;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by bjy on 2018/11/27.
 * 商户静态码查询
 */
public class StaticQrcListQuery implements Specification<StaticQrcList> {

    private String merchantId;
    private String terminalId;
    private String ccyCode;
    private String useCase;
    private String lsId;

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

    @Override
    public Predicate toPredicate(Root<StaticQrcList> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder cb) {
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

        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[list.size()]));
        }

        return criteriaQuery.getRestriction();
    }
}
