package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.Trans;
import com.yada.ssp.manager.svc.query.TransQuery;
import com.yada.ssp.manager.svc.service.TransService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

/**
 * 交易记录查询API
 */
@RestController
@RequestMapping("/trans")
public class TransController {

    private final TransService transService;

    @Autowired
    public TransController(TransService transService) {
        this.transService = transService;
    }

    @GetMapping
    @Secured(value = {"admin","MerchantOperator"})
    public Page<Trans> list(@AuthenticationPrincipal Jwt principal,
                            @ModelAttribute TransQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(principal.getClaimAsString("orgId"));
        return transService.findAll(query, pageable);
    }

    @GetMapping("/{traceNo}")
    @Secured(value = {"admin","MerchantOperator"})
    public Trans show(@PathVariable String traceNo) {
        return transService.findOne(traceNo);
    }
}
