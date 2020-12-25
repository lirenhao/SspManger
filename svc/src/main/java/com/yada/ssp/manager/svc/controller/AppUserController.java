package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.AppUser;
import com.yada.ssp.manager.svc.model.AppUserCheck;
import com.yada.ssp.manager.svc.model.AppUserPK;
import com.yada.ssp.manager.svc.query.AppUserCheckQuery;
import com.yada.ssp.manager.svc.service.AppUserCheckService;
import com.yada.ssp.manager.svc.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Merchant APP用户API
 */
@RestController
@RequestMapping("/appUser")

public class AppUserController {

    private final AppUserCheckService appUserCheckService;
    private final AppUserService appUserService;

    @Autowired
    public AppUserController(AppUserCheckService appUserCheckService, AppUserService appUserService) {
        this.appUserCheckService = appUserCheckService;
        this.appUserService = appUserService;
    }

    @GetMapping
    @Secured(value = {"admin","MerchantChecker"})
    public Page<AppUserCheck> list(@AuthenticationPrincipal Jwt principal,
                                   @ModelAttribute AppUserCheckQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(principal.getClaimAsString("orgId"));
        return appUserCheckService.findAll(query, pageable);
    }

    @PostMapping
    @Secured(value = {"admin","MerchantChecker"})
    public void save(@RequestBody AppUserCheck appUserCheck) {
        appUserCheckService.save(appUserCheck);
    }

    @PutMapping("/{merNo}/{loginName}")
    @Secured(value = {"admin","MerchantChecker"})
    public void update(@PathVariable String merNo, @PathVariable String loginName, @RequestBody AppUserCheck appUserCheck) {
        appUserCheckService.updateUser(new AppUserPK(merNo, loginName), appUserCheck);
    }

    @GetMapping("/{merNo}/{loginName}")
    @Secured(value = {"admin","MerchantChecker"})
    public AppUserCheck show(@PathVariable String merNo, @PathVariable String loginName) {
        return appUserCheckService.findOne(new AppUserPK(merNo, loginName));
    }

    @GetMapping("/{merNo}/{loginName}/check")
    @Secured(value = {"admin","MerchantChecker"})
    public AppUser showCheck(@PathVariable String merNo, @PathVariable String loginName) {
        return appUserService.findOne(new AppUserPK(merNo, loginName));
    }

    @PutMapping("/{merNo}/{loginName}/check")
    @Secured(value = {"admin","MerchantChecker"})
    public void saveCheck(@PathVariable String merNo, @PathVariable String loginName, @RequestBody Map<String, String> body) {
        appUserCheckService.saveCheck(body.get("checkState"), body.get("checkReason"), merNo, loginName);
    }

    @PutMapping("/{merNo}/{loginName}/resetPwd")
    @Secured(value = {"admin","MerchantChecker"})
    public void resetPassword(@PathVariable String merNo, @PathVariable String loginName) {
        appUserService.resetPassword(new AppUserPK(merNo, loginName));
    }

    @DeleteMapping("/{merNo}/{loginName}")
    @Secured(value = {"admin","MerchantChecker"})
    public void delete(@PathVariable String merNo, @PathVariable String loginName) {
        appUserCheckService.delete(new AppUserPK(merNo, loginName));
    }

    @GetMapping("/{merNo}/{loginName}/exists")
    @Secured(value = {"admin","MerchantChecker"})
    public boolean exists(@PathVariable String merNo, @PathVariable String loginName) {
        return appUserCheckService.exists(new AppUserPK(merNo, loginName));
    }
}
