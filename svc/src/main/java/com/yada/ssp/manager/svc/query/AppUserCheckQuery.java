package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.AppUserCheck;
import com.yada.ssp.manager.svc.model.Merchant;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by bjy on 2018/7/23.
 * APP用户审核QUERY
 */
public class AppUserCheckQuery implements Specification<AppUserCheck> {

    private String loginName;
    private String userName;
    private String roleId;
    private String merNo;
    private String checkState;
    private String operation;
    private String orgId;

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

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    @Override
    public Predicate toPredicate(Root<AppUserCheck> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder cb) {

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
        if (null != checkState && !"".equals(checkState)) {
            list.add(cb.equal(root.get("checkState").as(String.class), checkState));
        }
        if (null != operation && !"".equals(operation)) {
            list.add(cb.equal(root.get("operation").as(String.class), operation));
        }
        if(null != orgId && !"".equals(orgId)) {
            Join<AppUserCheck, Merchant> joinMerchant = root.join("merchant");
            list.add(cb.like(joinMerchant.get("org").get("orgId").as(String.class), orgId+"%"));
        }
        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[0]));
        }

        return criteriaQuery.getRestriction();
    }
}
