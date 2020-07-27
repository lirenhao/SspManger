package com.yada.ssp.manager.svc.service;

import com.yada.security.util.DictUtil;
import com.yada.ssp.manager.svc.dao.CupqrcSettleDao;
import com.yada.ssp.manager.svc.model.CupqrcSettle;
import com.yada.ssp.manager.svc.query.CupqrcSettleQuery;
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
public class CupqrcSettleService {
    private final CupqrcSettleDao cupqrcSettleDao;

    @Autowired
    public CupqrcSettleService(CupqrcSettleDao cupqrcSettleDao) {
        this.cupqrcSettleDao = cupqrcSettleDao;
    }

    public Page<CupqrcSettle> findAll(CupqrcSettleQuery query, Pageable pageable) {
        return cupqrcSettleDao.findAll(query, pageable);
    }

    public List<CupqrcSettle> findAll(CupqrcSettleQuery query) {
        return cupqrcSettleDao.findAll(query).stream().map(this::dict).collect(Collectors.toList());
    }

    public void handle(String id) {
        CupqrcSettle cupqrcSettle = cupqrcSettleDao.getOne(id);
        cupqrcSettle.setStatus("2");
        cupqrcSettleDao.saveAndFlush(cupqrcSettle);
    }

    private CupqrcSettle dict(CupqrcSettle cupqrcSettle) {
        CupqrcSettle copy = new CupqrcSettle();
        BeanUtils.copyProperties(cupqrcSettle, copy);
        copy.setTranDate(cupqrcSettle.getTranDate() + cupqrcSettle.getTranTime());
        DictUtil.getDictByType("TRAN_TYPE").forEach(item -> {
            if (item.getDictcode().equals(cupqrcSettle.getTranType()))
                copy.setTranType(item.getDictcodename());
        });
        DictUtil.getDictByType("TRAN_HANDLE").forEach(item -> {
            if (item.getDictcode().equals(cupqrcSettle.getStatus()))
                copy.setStatus(item.getDictcodename());
        });
        return copy;
    }
}
