package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.RiskList;
import com.yada.ssp.manager.svc.model.RiskTran;
import com.yada.ssp.manager.svc.query.RiskListQuery;
import com.yada.ssp.manager.svc.service.RiskListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
    public Page<RiskList> list(@RequestAttribute("auth") Auth auth,
                               @ModelAttribute RiskListQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(auth.getOrgId());
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
