package com.yada.ssp.manager.svc.service;

import com.yada.security.util.DictUtil;
import com.yada.ssp.manager.svc.dao.CupAcomnDao;
import com.yada.ssp.manager.svc.model.CupAcomn;
import com.yada.ssp.manager.svc.query.CupAcomnQuery;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CupAcomnService {
    private final CupAcomnDao cupAcomnDao;

    @Autowired
    public CupAcomnService(CupAcomnDao cupAcomnDao) {
        this.cupAcomnDao = cupAcomnDao;
    }

    public Page<CupAcomn> findAll(CupAcomnQuery query, Pageable pageable) {
        return cupAcomnDao.findAll(query, pageable);
    }

    public List<CupAcomn> findAll(CupAcomnQuery query) {
        return cupAcomnDao.findAll(query).stream().map(this::dict).collect(Collectors.toList());
    }

    public void handle(String id) {
        CupAcomn cupAcomn = cupAcomnDao.getOne(id);
        cupAcomn.setStatus("2");
        cupAcomnDao.saveAndFlush(cupAcomn);
    }

    private CupAcomn dict(CupAcomn cupAcomn) {
        CupAcomn copy = new CupAcomn();
        BeanUtils.copyProperties(cupAcomn, copy);
        copy.setTranDate(cupAcomn.getTranDate() + cupAcomn.getTranTime());
        DictUtil.getDictByType("CUP_TRAN_TYPE").forEach(item -> {
            if (item.getDictcode().equals(cupAcomn.getMessageType() + cupAcomn.getProcCode()))
                copy.setMessageType(item.getDictcodename());
        });
        DictUtil.getDictByType("TRAN_HANDLE").forEach(item -> {
            if (item.getDictcode().equals(cupAcomn.getStatus()))
                copy.setStatus(item.getDictcodename());
        });
        return copy;
    }
}
