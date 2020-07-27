package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.MccDao;
import com.yada.ssp.manager.svc.model.Mcc;
import com.yada.ssp.manager.svc.query.MccQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by bjy on 2018/7/25.
 * MCC码Service
 */

@Service
@Transactional
public class MccService {

    private final MccDao mccDao;

    @Autowired
    public MccService(MccDao mccDao) {
        this.mccDao = mccDao;
    }

    public Mcc findOne(String mcc) {
        return mccDao.getOne(mcc);
    }

    public Page<Mcc> findAll(MccQuery query, Pageable pageable) {
        return mccDao.findAll(query, pageable);
    }

    public List<Mcc> findAll() {
        return mccDao.findAll();
    }

    public void saveAndUpdate(Mcc mcc) {
        mccDao.saveAndFlush(mcc);
    }

    public void deleteMcc(String mcc) {
        mccDao.deleteById(mcc);
    }

    public boolean exists (String mcc){
        return mccDao.existsById(mcc);
    }
}
