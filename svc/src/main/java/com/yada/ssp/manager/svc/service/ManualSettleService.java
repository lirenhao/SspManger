package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.ManualSettleCheckDao;
import com.yada.ssp.manager.svc.dao.ManualSettleDao;
import com.yada.ssp.manager.svc.model.ManualSettle;
import com.yada.ssp.manager.svc.model.ManualSettleCheck;
import com.yada.ssp.manager.svc.query.ManualSettleQuery;
import com.yada.ssp.manager.svc.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ManualSettleService {

    private final ManualSettleDao manualSettleDao;
    private final ManualSettleCheckDao manualSettleCheckDao;

    @Autowired
    public ManualSettleService(ManualSettleDao manualSettleDao, ManualSettleCheckDao manualSettleCheckDao) {
        this.manualSettleDao = manualSettleDao;
        this.manualSettleCheckDao = manualSettleCheckDao;
    }

    public ManualSettle findOne(String lsId) {
        return manualSettleDao.getOne(lsId);
    }

    /**
     * 审核
     *
     * @param lsId        ID
     * @param checkReason 审核原因
     * @param state       0-通过 1-驳回
     */
    @Transactional
    public void check(String lsId, String checkReason, String state) {
        ManualSettleCheck check = manualSettleCheckDao.getOne(lsId);
        check.setCheckReason(checkReason);
        if (state.equals("0")) {
            check.setCheckState("1");
            check.setSettleDate(DateUtil.getCurDate());
            manualSettleCheckDao.saveAndFlush(check);
            ManualSettle manualSettle = new ManualSettle();
            manualSettle.setLsId(check.getLsId());
            manualSettle.setInputDate(check.getInputDate());
            manualSettle.setMerchantId(check.getMerchantId());
            manualSettle.setTranAmt(check.getTranAmt());
            manualSettle.setFee(check.getFee());
            manualSettle.setSettleAmt(check.getSettleAmt());
            manualSettle.setSettleDate(check.getSettleDate());
            manualSettleDao.saveAndFlush(manualSettle);
        } else if (state.equals("1")) {
            check.setCheckState("2");
            manualSettleCheckDao.saveAndFlush(check);
        }
    }

    public Page<ManualSettleCheck> findCheckAll(ManualSettleQuery query, Pageable pageable) {
        return manualSettleCheckDao.findAll(query, pageable);
    }

    public ManualSettleCheck findCheckOne(String lsId) {
        return manualSettleCheckDao.getOne(lsId);
    }

    public void saveCheck(ManualSettleCheck manualSettleCheck) {
        manualSettleCheckDao.save(manualSettleCheck);
    }

    public void updateCheck(ManualSettleCheck manualSettleCheck) {
        manualSettleCheckDao.saveAndFlush(manualSettleCheck);
    }

    public void deleteCheck(String lsId) {
        manualSettleCheckDao.deleteById(lsId);
    }
}
