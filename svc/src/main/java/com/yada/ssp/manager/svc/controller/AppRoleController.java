package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.AppRole;
import com.yada.ssp.manager.svc.query.AppRoleQuery;
import com.yada.ssp.manager.svc.service.AppRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Merchant App角色API
 */
@RestController
@RequestMapping("/appRole")

public class AppRoleController {

    private final AppRoleService appRoleService;

    @Autowired
    public AppRoleController(AppRoleService appRoleService) {
        this.appRoleService = appRoleService;
    }

    @GetMapping
    @Secured(value = {"admin"})
    public Page<AppRole> list(@ModelAttribute AppRoleQuery query, @PageableDefault Pageable pageable) {
        return appRoleService.findAll(query, pageable);
    }

    @GetMapping("/list")
    @Secured(value = {"admin"})
    public List<AppRole> list() {
        return appRoleService.findAll();
    }

    @PutMapping
    @Secured(value = {"admin"})
    public void save(@RequestBody AppRole appRole) {
        appRoleService.saveAndUpdate(appRole);
    }

    @GetMapping("/{id}")
    @Secured(value = {"admin"})
    public AppRole show(@PathVariable String id) {
        return appRoleService.findOne(id);
    }

    @GetMapping("/{id}/exists")
    @Secured(value = {"admin"})
    public Boolean exists(@PathVariable String id) {
        return appRoleService.exists(id);
    }
}
