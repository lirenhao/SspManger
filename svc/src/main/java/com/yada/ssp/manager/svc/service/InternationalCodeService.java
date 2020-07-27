package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.InternationalCodeDao;
import com.yada.ssp.manager.svc.model.InternationalCode;
import com.yada.ssp.manager.svc.query.InternationalCodeQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by bjy on 2018/9/6.
 * 国家代码Service
 */

@Service
@Transactional
public class InternationalCodeService {
    private final InternationalCodeDao internationalCodeDao;

    @Autowired
    public InternationalCodeService(InternationalCodeDao internationalCodeDao) {
        this.internationalCodeDao = internationalCodeDao;
    }

    public InternationalCode findOne(String internationalCode) {
        return internationalCodeDao.getOne(internationalCode);
    }

    public Page<InternationalCode> findAll(InternationalCodeQuery query, Pageable pageable) {
        return internationalCodeDao.findAll(query, pageable);
    }

    public List<InternationalCode> findAll() {
        return internationalCodeDao.findAll();
    }

    public void saveAndUpdate(InternationalCode internationalCode) {
        internationalCodeDao.saveAndFlush(internationalCode);
    }

    public void delete(String internationalCode) {
        internationalCodeDao.deleteById(internationalCode);
    }

    public boolean exists(String internationalCode) {
        return internationalCodeDao.existsById(internationalCode);
    }
}
