package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.MerApiOrg;
import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.query.MerApiOrgQuery;
import com.yada.ssp.manager.svc.service.MerApiOrgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

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
    public Page<MerApiOrg> list(@ModelAttribute MerApiOrgQuery query, @PageableDefault Pageable pageable) {
        return merApiOrgService.findAll(query, pageable);
    }

    @PostMapping
    public void save(@ModelAttribute MerApiOrg merApiOrg) {
        merApiOrgService.save(merApiOrg);
    }

    @PutMapping
    public void update(@ModelAttribute MerApiOrg merApiOrg) {
        merApiOrgService.update(merApiOrg);
    }

    @GetMapping("/{orgId}")
    public MerApiOrg show(@PathVariable String orgId) {
        return merApiOrgService.findOne(orgId);
    }

    @DeleteMapping("/{orgId}")
    public void delete(@PathVariable String orgId) {
        merApiOrgService.delete(orgId);
    }

    @GetMapping("/{orgId}/exists")
    public boolean exists(@PathVariable String orgId) {
        return merApiOrgService.exists(orgId);
    }

    @GetMapping("/{orgId}/mapping")
    public Set<Merchant> getMerchant(@PathVariable String orgId) {
        return merApiOrgService.findOne(orgId).getMerchant();
    }

    @PutMapping("/{orgId}/mapping")
    public void saveUpdateMerchant(@PathVariable String orgId, String[] merchantId) {
        merApiOrgService.saveUpdateMerchant(merchantId, orgId);
    }
}
