package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.TermSn;
import com.yada.ssp.manager.svc.query.TermSnQuery;
import com.yada.ssp.manager.svc.service.TermSnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/termSn")
public class TermSnController {

    private final TermSnService termSnService;

    @Autowired
    public TermSnController(TermSnService termSnService) {
        this.termSnService = termSnService;
    }

    @GetMapping
    @Secured(value = {"admin","MerchantChecker","MerchantOperator"})
    public Page<TermSn> list(@AuthenticationPrincipal Jwt principal,
                             @ModelAttribute TermSnQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(principal.getClaimAsString("orgId"));
        return termSnService.findAll(query, pageable);
    }

    @DeleteMapping("/{vendorId}/{snNo}")
    @Secured(value = {"admin","MerchantChecker","MerchantOperator"})
    public String delete(@PathVariable String vendorId, @PathVariable String snNo) {
        termSnService.delete(vendorId, snNo);
        return "redirect:list";
    }
}
