package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.InternationalCode;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by bjy on 2018/9/6.
 * 国家代码Query
 */
public class InternationalCodeQuery implements Specification<InternationalCode> {

    private String internationalCode;
    private String codeName;
    private String codeEname;

    public String getInternationalCode() {
        return internationalCode;
    }

    public void setInternationalCode(String internationalCode) {
        this.internationalCode = internationalCode;
    }

    public String getCodeName() {
        return codeName;
    }

    public void setCodeName(String codeName) {
        this.codeName = codeName;
    }

    public String getCodeEname() {
        return codeEname;
    }

    public void setCodeEname(String codeEname) {
        this.codeEname = codeEname;
    }

    @Override
    public Predicate toPredicate(Root<InternationalCode> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        List<Predicate> list = new LinkedList<>();

        if (null != internationalCode && !"".equals(internationalCode)) {
            list.add(criteriaBuilder.equal(root.get("internationalCode").as(String.class), internationalCode));
        }
        if (null != codeName && !"".equals(codeName)) {
            list.add(criteriaBuilder.equal(root.get("codeName").as(String.class), codeName));
        }
        if (null != codeEname && !"".equals(codeEname)) {
            list.add(criteriaBuilder.equal(root.get("codeEname").as(String.class), codeEname));
        }
        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[list.size()]));
        }

        return criteriaQuery.getRestriction();
    }
}
