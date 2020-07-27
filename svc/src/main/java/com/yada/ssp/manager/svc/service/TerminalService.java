package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.TerminalDao;
import com.yada.ssp.manager.svc.model.Terminal;
import com.yada.ssp.manager.svc.model.TerminalPK;
import com.yada.ssp.manager.svc.query.TerminalQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by bjy on 2018/9/4.
 * 终端Service
 */

@Service
@Transactional(readOnly = true)
public class TerminalService {
    private final TerminalDao terminalDao;

    @Autowired
    public TerminalService(TerminalDao terminalDao) {
        this.terminalDao = terminalDao;
    }

    public Terminal findOne(TerminalPK terminalPK) {
        return terminalDao.getOne(terminalPK);
    }

    public Page<Terminal> findAll(TerminalQuery query, Pageable pageable) {
        return terminalDao.findAll(query, pageable);
    }

    public List<Terminal> findAll(TerminalQuery query) {
        return terminalDao.findAll(query);
    }

    public List<Terminal> findAll() {
        return terminalDao.findAll();
    }
}
