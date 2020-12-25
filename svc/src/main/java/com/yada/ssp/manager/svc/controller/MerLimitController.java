package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.MerLimit;
import com.yada.ssp.manager.svc.query.MerLimitQuery;
import com.yada.ssp.manager.svc.service.MerLimitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/merLimit")
public class MerLimitController {

    private final MerLimitService merLimitService;

    @Autowired
    public MerLimitController(MerLimitService merLimitService) {
        this.merLimitService = merLimitService;
    }

    @GetMapping
    @Secured(value = {"admin","RiskOperator"})
    public Page<MerLimit> list(@AuthenticationPrincipal Jwt principal,
                               @ModelAttribute MerLimitQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(principal.getClaimAsString("orgId"));
        return merLimitService.findAll(query, pageable);
    }

    @PostMapping
    @Secured(value = {"admin","RiskOperator"})
    public void save(@RequestBody MerLimit merLimit) {
        merLimitService.saveAndUpdate(merLimit);
    }

    @PutMapping
    @Secured(value = {"admin","RiskOperator"})
    public void update(@RequestBody MerLimit merLimit) {
        merLimitService.saveAndUpdate(merLimit);
    }

    @DeleteMapping("/{id}")
    @Secured(value = {"admin","RiskOperator"})
    public void delete(@PathVariable String id) {
        merLimitService.delete(id);
    }
}
