package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.BankListDao;
import com.yada.ssp.manager.svc.model.BankList;
import com.yada.ssp.manager.svc.query.BankListQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by bjy on 2018/12/19.
 * 参数维护表Service
 */
@Service
@Transactional
public class BankListService {

    private final BankListDao bankListDao;

    @Autowired
    public BankListService(BankListDao bankListDao) {
        this.bankListDao = bankListDao;
    }

    public BankList findOne(String accountBankNo) {
        return bankListDao.getOne(accountBankNo);
    }

    public Page<BankList> findAll(BankListQuery query, Pageable pageable) {
        return bankListDao.findAll(query, pageable);
    }

    public List<BankList> findAll() {
        return bankListDao.findAll();
    }

    public void saveAndUpdate(BankList bankList) {
        bankListDao.saveAndFlush(bankList);
    }

    public boolean exists(String accountBankNo) {
        return bankListDao.existsById(accountBankNo);
    }

    public void delete(String accountBankNo) {
        bankListDao.deleteById(accountBankNo);
    }
}
