package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.Mcc;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by bjy on 2018/7/25.
 * MCC码查询
 */
public class MccQuery implements Specification<Mcc> {

    private String mcc;

    public String getMcc() {
        return mcc;
    }

    public void setMcc(String mcc) {
        this.mcc = mcc;
    }

    @Override
    public Predicate toPredicate(Root<Mcc> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        List<Predicate> list = new LinkedList<>();

        if (null != mcc && !"".equals(mcc)) {
            list.add(criteriaBuilder.equal(root.get("mcc").as(String.class), mcc));
        }

        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[list.size()]));
        }

        return criteriaQuery.getRestriction();
    }
}
