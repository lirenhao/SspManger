package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.MerApiOrgDao;
import com.yada.ssp.manager.svc.dao.MerchantDao;
import com.yada.ssp.manager.svc.model.MerApiOrg;
import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.query.MerApiOrgQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by bjy on 2018/12/19.
 * API机构表Service
 */

@Service
@Transactional
public class MerApiOrgService {

    private final MerApiOrgDao merApiOrgDao;
    private final MerchantDao merchantDao;

    @Autowired
    public MerApiOrgService(MerApiOrgDao merApiOrgDao, MerchantDao merchantDao) {
        this.merApiOrgDao = merApiOrgDao;
        this.merchantDao = merchantDao;
    }

    public MerApiOrg findOne(String orgId) {
        return merApiOrgDao.getOne(orgId);
    }

    public Page<MerApiOrg> findAll(MerApiOrgQuery query, Pageable pageable) {
        return merApiOrgDao.findAll(query, pageable);
    }

    public List<MerApiOrg> findAll() {
        return merApiOrgDao.findAll();
    }

    public void save(MerApiOrg merApiOrg) {
        merApiOrgDao.saveAndFlush(merApiOrg);
    }

    public void update(MerApiOrg merApiOrg) {
        MerApiOrg old = merApiOrgDao.getOne(merApiOrg.getOrgId());
        merApiOrg.setMerchant(old.getMerchant());
        merApiOrgDao.saveAndFlush(merApiOrg);
    }

    public boolean exists(String orgId) {
        return merApiOrgDao.existsById(orgId);
    }

    public void delete(String orgId) {
        merApiOrgDao.deleteById(orgId);
    }

    public void saveUpdateMerchant(String[] merIds, String orgId) {
        MerApiOrg merApiOrg = merApiOrgDao.getOne(orgId);
        if(merIds != null) {
            Set<Merchant> merchantSet = Arrays.stream(merIds)
                    .map(merchantDao::getOne).collect(Collectors.toSet());
            merApiOrg.setMerchant(merchantSet);
        } else {
            merApiOrg.setMerchant(null);
        }
        merApiOrgDao.saveAndFlush(merApiOrg);
    }
}
