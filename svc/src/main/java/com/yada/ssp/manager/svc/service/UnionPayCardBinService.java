package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.UnionPayCardBinDao;
import com.yada.ssp.manager.svc.model.UnionPayCardBin;
import com.yada.ssp.manager.svc.query.UnionPayCardBinQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by bjy on 2018/7/26.
 * 银联卡binService
 */

@Service
@Transactional
public class UnionPayCardBinService {

    private final UnionPayCardBinDao unionPayCardBinDao;

    @Autowired
    public UnionPayCardBinService(UnionPayCardBinDao unionPayCardBinDao) {
        this.unionPayCardBinDao = unionPayCardBinDao;
    }

    public UnionPayCardBin findOne(String id) {
        return unionPayCardBinDao.getOne(id);
    }

    public Page<UnionPayCardBin> findAll(UnionPayCardBinQuery query, Pageable pageable) {
        return unionPayCardBinDao.findAll(query, pageable);
    }

    public List<UnionPayCardBin> findAll() {
        return unionPayCardBinDao.findAll();
    }

    public void saveAndUpdate(UnionPayCardBin unionPayCardBin) {
        unionPayCardBinDao.saveAndFlush(unionPayCardBin);
    }
}
