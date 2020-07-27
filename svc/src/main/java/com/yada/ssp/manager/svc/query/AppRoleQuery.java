package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.AppRole;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by bjy on 2018/8/1.
 * App角色Query
 */
public class AppRoleQuery implements Specification<AppRole> {

    private String id;
    private String name;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public Predicate toPredicate(Root<AppRole> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> list = new LinkedList<>();

        if (null != id && !"".equals(id)) {
            list.add(cb.equal(root.get("id").as(String.class), id));
        }
        if (null != name && !"".equals(name)) {
            list.add(cb.equal(root.get("name").as(String.class), name));
        }
        if (list.size() > 0) {
            query.where(list.toArray(new Predicate[list.size()]));
        }

        return query.getRestriction();
    }
}
