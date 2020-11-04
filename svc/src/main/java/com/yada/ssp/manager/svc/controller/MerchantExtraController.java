package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.MerchantExtra;
import com.yada.ssp.manager.svc.model.MerchantExtraCheck;
import com.yada.ssp.manager.svc.query.MerchantExtraCheckQuery;
import com.yada.ssp.manager.svc.service.MerchantExtraCheckService;
import com.yada.ssp.manager.svc.service.MerchantExtraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 商户附加资料API
 */
@RestController
@RequestMapping("/merchantExtra")
public class MerchantExtraController {

    private final MerchantExtraCheckService merchantExtraCheckService;
    private final MerchantExtraService merchantExtraService;

    @Autowired
    public MerchantExtraController(MerchantExtraCheckService merchantExtraCheckService, MerchantExtraService merchantExtraService) {
        this.merchantExtraCheckService = merchantExtraCheckService;
        this.merchantExtraService = merchantExtraService;
    }

    @GetMapping
    public Page<MerchantExtraCheck> list(@AuthenticationPrincipal Jwt principal,
                                         @ModelAttribute MerchantExtraCheckQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(principal.getClaimAsString("orgId"));
        return merchantExtraCheckService.findAll(query, pageable);
    }

    @PutMapping
    public void update(@RequestBody MerchantExtraCheck merchantExtraCheck) {
        merchantExtraCheckService.saveMerchantExtra(merchantExtraCheck);
    }

    @GetMapping("/{id}")
    public MerchantExtraCheck get(@PathVariable String id) {
        return merchantExtraCheckService.findOne(id);
    }

    @DeleteMapping("/{id}")
    public void merchantExtraDelete(@PathVariable String id) {
        merchantExtraCheckService.merchantExtraDelete(id);
    }

    @GetMapping("/{id}/check")
    public MerchantExtra merchantExtraShowForCheck(@PathVariable String id) {
        return merchantExtraService.findOne(id);
    }

    @PutMapping("/{id}/check")
    public void check(@PathVariable String id, @RequestBody Map<String, String> body) {
        merchantExtraCheckService.saveCheck(id, body.get("checkReason"), body.get("checkState"));
    }
}
