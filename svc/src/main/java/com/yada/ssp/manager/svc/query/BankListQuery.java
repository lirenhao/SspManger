package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.BankList;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by bjy on 2018/12/19.
 * 参数维护表Query
 */
public class BankListQuery implements Specification<BankList> {

    private String accountBankNo;

    public String getAccountBankNo() {
        return accountBankNo;
    }

    public void setAccountBankNo(String accountBankNo) {
        this.accountBankNo = accountBankNo;
    }

    @Override
    public Predicate toPredicate(Root<BankList> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        List<Predicate> list = new LinkedList<>();

        if (null != accountBankNo && !"".equals(accountBankNo)) {
            list.add(criteriaBuilder.equal(root.get("accountBankNo").as(String.class), accountBankNo));
        }

        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[list.size()]));
        }

        return criteriaQuery.getRestriction();
    }
}
