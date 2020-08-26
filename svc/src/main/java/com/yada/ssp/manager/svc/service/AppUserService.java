package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.util.md5keyBean;
import com.yada.ssp.manager.svc.dao.AppDeviceDao;
import com.yada.ssp.manager.svc.dao.AppTokenDao;
import com.yada.ssp.manager.svc.dao.AppUserDao;
import com.yada.ssp.manager.svc.model.AppUser;
import com.yada.ssp.manager.svc.model.AppUserPK;
import com.yada.ssp.manager.svc.query.AppUserQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by bjy on 2018/7/23.
 * APP用户Service
 */

@Service
@Transactional
public class AppUserService {

    private final AppUserDao appUserDao;
    private md5keyBean md5;
    private final AppTokenDao appTokenDao;
    private final AppDeviceDao appDeviceDao;

    @Value("${default.password:111111}")
    private String defaultPassword;

    @Autowired
    public AppUserService(AppUserDao appUserDao, AppTokenDao appTokenDao, AppDeviceDao appDeviceDao) {
        this.appUserDao = appUserDao;
        md5 = new md5keyBean();
        this.appTokenDao = appTokenDao;
        this.appDeviceDao = appDeviceDao;
    }

    public AppUser findOne(AppUserPK appUserPK) {
        return appUserDao.findById(appUserPK).orElse(new AppUser());
    }

    public Page<AppUser> findAll(AppUserQuery query, Pageable pageable) {
        return appUserDao.findAll(query, pageable);
    }

    public List<AppUser> findAll() {
        return appUserDao.findAll();
    }

    public void delete(AppUserPK appUserPK) {
        appUserDao.deleteById(appUserPK);
        //删除用户之后清除token
        if (appTokenDao.existsById(appUserPK)) {
            appTokenDao.deleteById(appUserPK);
        }
        //删除用户之后清除推送设备信息
        if (appDeviceDao.existsById(appUserPK)) {
            appDeviceDao.deleteById(appUserPK);
        }
    }

    public boolean exists(AppUserPK appUserPK) {
        return appUserDao.existsById(appUserPK);
    }

    public void saveAndUpdate(AppUser appUser) {
        String password = appUser.getPassWord();
        if (password == null || password.equals("")) {
            password = defaultPassword;
        }
        appUser.setPassWord(md5.getkeyBeanofStr(password));
        appUserDao.saveAndFlush(appUser);
    }

    public void updateUser(AppUserPK appUserPK, String userName, String roles, String termNo, String ccyType) {
        AppUser appUser = appUserDao.getOne(appUserPK);
        appUser.setUserName(userName);
        appUser.setRoles(roles);
        appUser.setTermNo(termNo);
        appUser.setCcyType(ccyType);
        appUserDao.saveAndFlush(appUser);

        //更新用户之后清除token
        if (appTokenDao.existsById(appUserPK)) {
            appTokenDao.deleteById(appUserPK);
        }
        //更新用户之后清除推送设备信息
        if (appDeviceDao.existsById(appUserPK)) {
            appDeviceDao.deleteById(appUserPK);
        }
    }

    public void resetPassword(AppUserPK appUserPK) {
        AppUser appUser = appUserDao.getOne(appUserPK);
        appUser.setPassWord(md5.getkeyBeanofStr(defaultPassword));
        appUserDao.saveAndFlush(appUser);
        //修改密码之后清除token
        if (appTokenDao.existsById(appUserPK)) {
            appTokenDao.deleteById(appUserPK);
        }
        //修改密码之后清除推送设备信息
        if (appDeviceDao.existsById(appUserPK)) {
            appDeviceDao.deleteById(appUserPK);
        }
    }
}
