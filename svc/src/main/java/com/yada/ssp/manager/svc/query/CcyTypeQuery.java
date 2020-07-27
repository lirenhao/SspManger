package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.CcyType;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by bjy on 2018/9/5.
 * 币种Query
 */
public class CcyTypeQuery implements Specification<CcyType> {

    private String ccyType;
    private String ccyName;
    private String ccyEname;

    public String getCcyType() {
        return ccyType;
    }

    public void setCcyType(String ccyType) {
        this.ccyType = ccyType;
    }

    public String getCcyName() {
        return ccyName;
    }

    public void setCcyName(String ccyName) {
        this.ccyName = ccyName;
    }

    public String getCcyEname() {
        return ccyEname;
    }

    public void setCcyEname(String ccyEname) {
        this.ccyEname = ccyEname;
    }

    @Override
    public Predicate toPredicate(Root<CcyType> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        List<Predicate> list = new LinkedList<>();

        if (null != ccyType && !"".equals(ccyType)) {
            list.add(criteriaBuilder.equal(root.get("ccyType").as(String.class), ccyType));
        }
        if (null != ccyName && !"".equals(ccyName)) {
            list.add(criteriaBuilder.equal(root.get("ccyName").as(String.class), ccyName));
        }
        if (null != ccyEname && !"".equals(ccyEname)) {
            list.add(criteriaBuilder.equal(root.get("ccyEname").as(String.class), ccyEname));
        }
        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[list.size()]));
        }

        return criteriaQuery.getRestriction();
    }
}
