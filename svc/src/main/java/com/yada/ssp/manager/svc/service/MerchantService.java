package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.MerchantDao;
import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.query.MerchantQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by bjy on 2018/7/23.
 * 商户Service
 */

@Service
@Transactional(readOnly = true)
public class MerchantService {

    private final MerchantDao merchantDao;

    @Autowired
    public MerchantService(MerchantDao merchantDao) {
        this.merchantDao = merchantDao;

    }

    public Merchant findOne(String merNo) {
        return merchantDao.getOne(merNo);
    }

    public Page<Merchant> findAll(MerchantQuery query, Pageable pageable) {
        return merchantDao.findAll(query, pageable);
    }

    public List<Merchant> findByOrgId(String orgId) {
        return merchantDao.findByOrgId(orgId).stream().map(obj -> {
            Merchant mer = new Merchant();
            mer.setMerchantId(obj[0] + "");
            mer.setMerNameChn(obj[1] + "");
            mer.setMerNameEng(obj[2] + "");
            return mer;
        }).collect(Collectors.toList());
    }

}
