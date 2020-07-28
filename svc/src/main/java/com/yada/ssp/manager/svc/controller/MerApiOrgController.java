package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.MerApiOrg;
import com.yada.ssp.manager.svc.query.MerApiOrgQuery;
import com.yada.ssp.manager.svc.service.MerApiOrgService;
import com.yada.ssp.manager.svc.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

/**
 * 商户API机构参数维护API
 */
@RestController
@RequestMapping("/merApiOrg")
public class MerApiOrgController {

    private final MerApiOrgService merApiOrgService;
    private final MerchantService merchantService;

    @Autowired
    public MerApiOrgController(MerApiOrgService merApiOrgService, MerchantService merchantService) {
        this.merApiOrgService = merApiOrgService;
        this.merchantService = merchantService;
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

    @PutMapping("/{orgId}/merchant")
    public String saveUpdateMerchant(@PathVariable String orgId, String[] merchantId) {
        merApiOrgService.saveUpdateMerchant(merchantId, orgId);
        return "redirect:mapping";
    }

    @DeleteMapping("/{orgId}")
    public void delete(@PathVariable String orgId) {
        merApiOrgService.delete(orgId);
    }

    @GetMapping("/{orgId}/exists")
    public boolean exists(@PathVariable String orgId) {
        return merApiOrgService.exists(orgId);
    }
}
