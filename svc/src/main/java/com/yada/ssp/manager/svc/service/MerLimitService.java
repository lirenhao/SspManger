package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.MerLimitDao;
import com.yada.ssp.manager.svc.model.MerLimit;
import com.yada.ssp.manager.svc.query.MerLimitQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MerLimitService {

    private final MerLimitDao merLimitDao;

    @Autowired
    public MerLimitService(MerLimitDao merLimitDao) {
        this.merLimitDao = merLimitDao;
    }

    public Page<MerLimit> findAll(MerLimitQuery query, Pageable pageable) {
        return merLimitDao.findAll(query, pageable);
    }

    public List<String> findAllMerNo() {
        return merLimitDao.findAll().stream().map(MerLimit::getMerchantId).collect(Collectors.toList());
    }

    public MerLimit findOne(String id) {
        return merLimitDao.getOne(id);
    }

    public void saveAndUpdate(MerLimit merLimit) {
        merLimitDao.saveAndFlush(merLimit);
    }

    public void delete(String id) {
        merLimitDao.deleteById(id);
    }
}
