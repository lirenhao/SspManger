package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.MerApiOrg;
import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.query.MerApiOrgQuery;
import com.yada.ssp.manager.svc.service.MerApiOrgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

/**
 * 商户API机构参数维护API
 */
@RestController
@RequestMapping("/merApiOrg")
public class MerApiOrgController {

    private final MerApiOrgService merApiOrgService;

    @Autowired
    public MerApiOrgController(MerApiOrgService merApiOrgService) {
        this.merApiOrgService = merApiOrgService;
    }

    @GetMapping
    @Secured(value = {"admin","MerchantChecker"})
    public Page<MerApiOrg> page(@ModelAttribute MerApiOrgQuery query, @PageableDefault Pageable pageable) {
        return merApiOrgService.findAll(query, pageable);
    }

    @PostMapping
    @Secured(value = {"admin","MerchantChecker"})
    public void save(@RequestBody MerApiOrg merApiOrg) {
        merApiOrgService.save(merApiOrg);
    }

    @PutMapping
    @Secured(value = {"admin","MerchantChecker"})
    public void update(@RequestBody MerApiOrg merApiOrg) {
        merApiOrgService.update(merApiOrg);
    }

    @GetMapping("/list")
    @Secured(value = {"admin","MerchantChecker"})
    public List<MerApiOrg> list() {
        return merApiOrgService.findAll();
    }

    @GetMapping("/{orgId}")
    @Secured(value = {"admin","MerchantChecker"})
    public MerApiOrg show(@PathVariable String orgId) {
        return merApiOrgService.findOne(orgId);
    }

    @DeleteMapping("/{orgId}")
    @Secured(value = {"admin","MerchantChecker"})
    public void delete(@PathVariable String orgId) {
        merApiOrgService.delete(orgId);
    }

    @GetMapping("/{orgId}/exists")
    @Secured(value = {"admin","MerchantChecker"})
    public boolean exists(@PathVariable String orgId) {
        return merApiOrgService.exists(orgId);
    }

    @GetMapping("/{orgId}/mapping")
    @Secured(value = {"admin","MerchantChecker"})
    public Set<Merchant> getMerchant(@PathVariable String orgId) {
        return merApiOrgService.findOne(orgId).getMerchant();
    }

    @PutMapping("/{orgId}/mapping")
    @Secured(value = {"admin","MerchantChecker"})
    public void saveUpdateMerchant(@PathVariable String orgId, @RequestBody String[] merchantId) {
        merApiOrgService.saveUpdateMerchant(merchantId, orgId);
    }
}
