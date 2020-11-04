package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.query.MerchantQuery;
import com.yada.ssp.manager.svc.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

/**
 * 商户API
 */
@RestController
@RequestMapping("/merchant")
public class MerchantController {

    private final MerchantService merchantService;

    @Autowired
    public MerchantController(MerchantService merchantService) {
        this.merchantService = merchantService;
    }

    @GetMapping
    public Page<Merchant> list(@AuthenticationPrincipal Jwt principal,
                               @ModelAttribute MerchantQuery query, @PageableDefault Pageable pageable) {
        if (null == query.getOrgId() || "".equals(query.getOrgId())) {
            query.setOrgId(principal.getClaimAsString("orgId"));
        }
        return merchantService.findAll(query, pageable);
    }

    @GetMapping("/orgId")
    public List<Merchant> getByOrgId(@AuthenticationPrincipal Jwt principal) {
        return merchantService.findByOrgId(principal.getClaimAsString("orgId"));
    }

    @GetMapping("/orgId/{orgId}")
    public List<Merchant> getByOrgId(@AuthenticationPrincipal Jwt principal, @PathVariable String orgId) {
        if (orgId.startsWith(principal.getClaimAsString("orgId")))
            return merchantService.findByOrgId(orgId);
        else
            return Collections.emptyList();
    }

    @GetMapping("/{id}")
    public Merchant get(@PathVariable String id) {
        return merchantService.findOne(id);
    }

}
