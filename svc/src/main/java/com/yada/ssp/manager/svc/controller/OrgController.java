package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.Org;
import com.yada.ssp.manager.svc.service.OrgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


/**
 * TODO 机构接口根据项目在扩充
 */
@RestController
@RequestMapping("org")
public class OrgController {

    private final OrgService orgService;

    @Autowired
    public OrgController(OrgService orgService) {
        this.orgService = orgService;
    }

    @GetMapping
    public Org list(@RequestAttribute("auth") Auth auth) {
        // 获取当前用户所在机构
        return orgService.findOne(auth.getOrgId());
    }

    @PostMapping
    public void save(Org org, String pid) {
        Org pOrg = orgService.findOne(pid);
        org.setOrg(pOrg);
        orgService.save(org);
    }

    @GetMapping("/{id}")
    public Org show(@PathVariable String id) {
        return orgService.findOne(id);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable String id, Org org) {
        orgService.update(org);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        orgService.delete(id);
    }

    @GetMapping("/{id}/exists")
    public boolean exists(@PathVariable String id) {
        return orgService.exists(id);
    }
}
