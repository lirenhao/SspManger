package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.MerchantDao;
import com.yada.ssp.manager.svc.model.Merchant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * WEB子商户Service
 */
@Service
@Transactional
public class WebSubsService {

    private final MerchantDao merchantDao;

    @Autowired
    public WebSubsService(MerchantDao merchantDao) {
        this.merchantDao = merchantDao;
    }

    public void saveUpdate(String merId, String[] merIds) {
        Merchant merchant = merchantDao.getOne(merId);
        if (merIds != null) {
            Set<Merchant> merchantSet = Arrays.stream(merIds)
                    .map(merchantDao::getOne).collect(Collectors.toSet());
            merchant.setWebSubs(merchantSet);
        } else {
            merchant.setWebSubs(null);
        }
        merchantDao.saveAndFlush(merchant);
    }
}
