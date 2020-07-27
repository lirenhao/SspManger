package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.OrgDao;
import com.yada.ssp.manager.svc.model.Org;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrgService {

    private final OrgDao orgDao;

    @Autowired
    public OrgService(OrgDao orgDao) {
        this.orgDao = orgDao;
    }

    public void save(Org org) {
        orgDao.save(org);
    }

    public void update(Org org) {
        orgDao.save(org);
    }

    public void delete(String id) {
        orgDao.deleteById(id);
        Org org = new Org();
        org.setOrgId(id);
    }

    /**
     * 根据userGrpId查询
     */
    public Org findOne(String orgId) {
        return orgDao.getOne(orgId);
    }

    /**
     * 根据机构号查询当前机构及其下属机构所有
     */
    public List<Org> findByOrgIdStartingWithList(String orgId) {
        Org org = orgDao.getOne(orgId);
        List<Org> orgList = new ArrayList<>();
        getTreeToList(org, orgList);
        return orgList;
    }

    /**
     * 根据机构ID的获取二级机构
     */
    public List<Org> findSecondOrg(String orgId) {
        Org org = orgDao.getOne(orgId);
        List<Org> orgList = new ArrayList<>();
        if ("00".equals(orgId)) {
            orgList.addAll(org.getChildren());
        } else {
            orgList.add(org);
        }
        return orgList;
    }

    /**
     * 将树级结构解为平坦列表
     */
    private void getTreeToList(Org org, List<Org> orgList) {
        orgList.add(org);
        if (org.getChildren() != null && org.getChildren().size() > 0) {
            for (Org node : org.getChildren()) {
                getTreeToList(node, orgList);
            }
        }
    }

    public List<Org> findBypOrgId(String orgId) {
        Org org = new Org();
        org.setOrgId(orgId);
        return orgDao.findByOrg(org);
    }

    public List<Org> findAll() {
        return orgDao.findAll();
    }
}
