package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.Terminal;
import com.yada.ssp.manager.svc.model.TerminalPK;
import com.yada.ssp.manager.svc.query.TerminalQuery;
import com.yada.ssp.manager.svc.service.TerminalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 终端API
 */
@RestController
@RequestMapping("/terminal")
public class TerminalController {

    private final TerminalService terminalService;

    @Autowired
    public TerminalController(TerminalService terminalService) {
        this.terminalService = terminalService;
    }

    @GetMapping
    @Secured(value = {"admin","MerchantOperator","MerchantChecker"})
    public Page<Terminal> list(@AuthenticationPrincipal Jwt principal,
                               @ModelAttribute TerminalQuery query, @PageableDefault Pageable pageable) {
        if (null == query.getOrgId() || "".equals(query.getOrgId())) {
            query.setOrgId(principal.getClaimAsString("orgId"));
        }
        return terminalService.findAll(query, pageable);
    }

    @GetMapping("/{merchantId}")
    @Secured(value = {"admin","MerchantOperator","MerchantChecker"})
    public List<Terminal> getByMerNo(@AuthenticationPrincipal Jwt principal, @PathVariable String merchantId) {
        TerminalQuery query = new TerminalQuery();
        query.setOrgId(principal.getClaimAsString("orgId"));
        query.setMerchantId(merchantId);
        return terminalService.findAll(query);
    }

    @GetMapping("/{merchantId}/{terminalId}")
    @Secured(value = {"admin","MerchantOperator","MerchantChecker"})
    public Terminal get(@PathVariable String terminalId, @PathVariable String merchantId) {
        return terminalService.findOne(new TerminalPK(terminalId, merchantId));
    }
}
