package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.RiskList;
import com.yada.ssp.manager.svc.model.RiskTran;
import com.yada.ssp.manager.svc.query.RiskListQuery;
import com.yada.ssp.manager.svc.service.RiskListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/riskList")
public class RiskListController {

    private final RiskListService riskListService;

    @Autowired
    public RiskListController(RiskListService riskListService) {
        this.riskListService = riskListService;
    }

    @GetMapping
    public Page<RiskList> list(@AuthenticationPrincipal Jwt principal,
                               @ModelAttribute RiskListQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(principal.getClaimAsString("orgId"));
        return riskListService.findAll(query, pageable);
    }

    @GetMapping("/{id}")
    public RiskList get(@PathVariable String id) {
        return riskListService.findOne(id);
    }

    @GetMapping("/{id}/trans")
    public List<RiskTran> getTrans(@PathVariable String id) {
        return riskListService.findRiskTran(id);
    }
}
