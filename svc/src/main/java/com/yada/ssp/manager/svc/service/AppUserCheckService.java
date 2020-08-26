package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.util.md5keyBean;
import com.yada.ssp.manager.svc.dao.AppDeviceDao;
import com.yada.ssp.manager.svc.dao.AppTokenDao;
import com.yada.ssp.manager.svc.dao.AppUserCheckDao;
import com.yada.ssp.manager.svc.dao.AppUserDao;
import com.yada.ssp.manager.svc.model.AppUser;
import com.yada.ssp.manager.svc.model.AppUserCheck;
import com.yada.ssp.manager.svc.model.AppUserPK;
import com.yada.ssp.manager.svc.query.AppUserCheckQuery;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * APP用户Service
 */
@Service
@Transactional
public class AppUserCheckService {

    private final AppUserCheckDao appUserCheckDao;
    private md5keyBean md5;
    private final AppTokenDao appTokenDao;
    private final AppDeviceDao appDeviceDao;
    @Value("${default.password:111111}")
    private String defaultPassword;
    private final AppUserDao appUserDao;

    @Autowired
    public AppUserCheckService(AppUserCheckDao appUserCheckDao, AppTokenDao appTokenDao, AppDeviceDao appDeviceDao, AppUserDao appUserDao) {
        this.appUserCheckDao = appUserCheckDao;
        md5 = new md5keyBean();
        this.appTokenDao = appTokenDao;
        this.appDeviceDao = appDeviceDao;
        this.appUserDao = appUserDao;
    }

    public AppUserCheck findOne(AppUserPK appUserPK) {
        return appUserCheckDao.getOne(appUserPK);
    }

    public Page<AppUserCheck> findAll(AppUserCheckQuery query, Pageable pageable) {
        return appUserCheckDao.findAll(query, pageable);
    }

    public List<AppUserCheck> findAll() {
        return appUserCheckDao.findAll();
    }

    public void delete(AppUserPK appUserPK) {
        AppUserCheck appUserCheck = appUserCheckDao.getOne(appUserPK);
        appUserCheck.setOperation("2");
        appUserCheck.setCheckReason("");
        appUserCheck.setCheckState("0");
        appUserCheckDao.saveAndFlush(appUserCheck);
    }

    public boolean exists(AppUserPK appUserPK) {
        return appUserCheckDao.existsById(appUserPK);
    }

    public void save(AppUserCheck appUserCheck) {
        appUserCheck.setPassWord(md5.getkeyBeanofStr(defaultPassword));
        appUserCheck.setCheckState("0");
        appUserCheck.setOperation("0");
        appUserCheckDao.saveAndFlush(appUserCheck);
    }

    public void updateUser(AppUserPK appUserPK, AppUserCheck appUser) {
        AppUserCheck appUserCheck = appUserCheckDao.getOne(appUserPK);
        appUserCheck.setUserName(appUser.getUserName());
        appUserCheck.setRoles(appUser.getRoles());
        appUserCheck.setTermNo(appUser.getTermNo());
        appUserCheck.setCcyType(appUser.getCcyType());
        appUserCheck.setCheckState("0");
        appUserCheck.setOperation("1");
        appUserCheckDao.saveAndFlush(appUserCheck);
    }

    public void saveCheck(String state, String checkReason, String merNo, String loginName) {
        AppUserCheck appUserCheck = appUserCheckDao.getOne(new AppUserPK(merNo, loginName));
        appUserCheck.setCheckReason(checkReason);
        AppUser appUser = new AppUser();
        if (state.equals("0")) {
            if (appUserCheck.getOperation().equals("2")) {
                AppUserPK appUserPK = new AppUserPK(merNo, loginName);
                if (appUserDao.existsById(appUserPK)) {
                    appUserDao.deleteById(appUserPK);
                }
                appUserCheckDao.deleteById(new AppUserPK(merNo, loginName));
            } else {
                appUserCheck.setCheckState("1");
                BeanUtils.copyProperties(appUserCheck, appUser);
                AppUser curAppUser = appUserDao.findById(new AppUserPK(merNo, loginName)).orElse(null);
                if (curAppUser != null) {
                    appUser.setPassWord(curAppUser.getPassWord());
                } else {
                    appUser.setPassWord(md5.getkeyBeanofStr(defaultPassword));
                }
                appUserDao.saveAndFlush(appUser);
                appUserCheckDao.saveAndFlush(appUserCheck);
            }

            //更新用户之后清除token
            if (appTokenDao.existsById(new AppUserPK(merNo, loginName))) {
                appTokenDao.deleteById(new AppUserPK(merNo, loginName));
            }
            //更新用户之后清除推送设备信息
            if (appDeviceDao.existsById(new AppUserPK(merNo, loginName))) {
                appDeviceDao.deleteById(new AppUserPK(merNo, loginName));
            }
        } else if (state.equals("1")) {
            appUserCheck.setCheckState("2");
            appUserCheckDao.saveAndFlush(appUserCheck);
        }
    }
}
