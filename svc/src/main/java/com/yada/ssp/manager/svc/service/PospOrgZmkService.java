package com.yada.ssp.manager.svc.service;

import com.yada.ssp.common.hsm.SspEncryption;
import com.yada.ssp.common.util.TripleDESUtil;
import com.yada.ssp.manager.svc.dao.PospOrgZmkDao;
import com.yada.ssp.manager.svc.model.PospOrgZmk;
import com.yada.ssp.manager.svc.query.PospOrgZmkQuery;
import com.yada.ssp.manager.svc.util.XorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PospOrgZmkService {

    private String checkData = "000000000000000000000000000000000000000000000000";

    private final PospOrgZmkDao pospOrgZmkDao;
    private final SspEncryption sspEncryption;

    @Autowired
    public PospOrgZmkService(PospOrgZmkDao pospOrgZmkDao, SspEncryption sspEncryption) {
        this.pospOrgZmkDao = pospOrgZmkDao;
        this.sspEncryption = sspEncryption;
    }

    public Page<PospOrgZmk> findAll(PospOrgZmkQuery query, Pageable pageable) {
        return pospOrgZmkDao.findAll(query, pageable);
    }

    public List<String> findAllOrgId() {
        return pospOrgZmkDao.findAll().stream()
                .map(PospOrgZmk::getOrgId)
                .collect(Collectors.toList());
    }

    public PospOrgZmk findOne(String id) {
        return pospOrgZmkDao.getOne(id);
    }

    public void saveAndUpdate(PospOrgZmk pospOrgZmk) {
        String zmk = XorUtil.xorHex(pospOrgZmk.getPwd1(), pospOrgZmk.getPwd2());
        String zmkLmk = sspEncryption.getZmkLmk(zmk);
        pospOrgZmk.setZmkLmk(zmkLmk.toUpperCase());
        String checkValue = TripleDESUtil.encode3DesHex(checkData, zmk);
        pospOrgZmk.setCheckValue(checkValue.toUpperCase().substring(0, 6));
        pospOrgZmkDao.saveAndFlush(pospOrgZmk);
    }

    public void delete(String id) {
        pospOrgZmkDao.deleteById(id);
    }
}
