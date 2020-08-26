package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
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
    public Page<AppUserCheck> list(@RequestAttribute("auth") Auth auth,
                                   @ModelAttribute AppUserCheckQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(auth.getOrgId());
        return appUserCheckService.findAll(query, pageable);
    }

    @PostMapping
    public void save(@RequestBody AppUserCheck appUserCheck) {
        appUserCheckService.save(appUserCheck);
    }

    @PutMapping("/{merNo}/{loginName}")
    public void update(@PathVariable String merNo, @PathVariable String loginName, @RequestBody AppUserCheck appUserCheck) {
        appUserCheckService.updateUser(new AppUserPK(merNo, loginName), appUserCheck);
    }

    @GetMapping("/{merNo}/{loginName}")
    public AppUserCheck show(@PathVariable String merNo, @PathVariable String loginName) {
        return appUserCheckService.findOne(new AppUserPK(merNo, loginName));
    }

    @GetMapping("/{merNo}/{loginName}/check")
    public AppUser showCheck(@PathVariable String merNo, @PathVariable String loginName) {
        return appUserService.findOne(new AppUserPK(merNo, loginName));
    }

    @PutMapping("/{merNo}/{loginName}/check")
    public void saveCheck(@PathVariable String merNo, @PathVariable String loginName, @RequestBody Map<String, String> body) {
        appUserCheckService.saveCheck(body.get("checkState"), body.get("checkReason"), merNo, loginName);
    }

    @PutMapping("/{merNo}/{loginName}/resetPwd")
    public void resetPassword(@PathVariable String merNo, @PathVariable String loginName) {
        appUserService.resetPassword(new AppUserPK(merNo, loginName));
    }

    @DeleteMapping("/{merNo}/{loginName}")
    public void delete(@PathVariable String merNo, @PathVariable String loginName) {
        appUserCheckService.delete(new AppUserPK(merNo, loginName));
    }

    @GetMapping("/{merNo}/{loginName}/exists")
    public boolean exists(@PathVariable String merNo, @PathVariable String loginName) {
        return appUserCheckService.exists(new AppUserPK(merNo, loginName));
    }
}
