package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.AppUser;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by bjy on 2018/7/23.
 * APP用户QUERY
 */
public class AppUserQuery implements Specification<AppUser> {

    private String loginName;
    private String userName;
    private String roleId;
    private String merNo;

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getMerNo() {
        return merNo;
    }

    public void setMerNo(String merNo) {
        this.merNo = merNo;
    }

    @Override
    public Predicate toPredicate(Root<AppUser> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder cb) {

        List<Predicate> list = new LinkedList<>();

        if (null != loginName && !"".equals(loginName)) {
            list.add(cb.equal(root.get("loginName").as(String.class), loginName));
        }
        if (null != userName && !"".equals(userName)) {
            list.add(cb.equal(root.get("userName").as(String.class), userName));
        }
        if (null != roleId && !"".equals(roleId)) {
            list.add(cb.equal(root.get("roleId").as(String.class), roleId));
        }
        if (null != merNo && !"".equals(merNo)) {
            list.add(cb.like(root.get("merNo").as(String.class), "%"+merNo+"%"));
        }

        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[list.size()]));
        }

        return criteriaQuery.getRestriction();
    }
}
