package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.ManualSettle;
import com.yada.ssp.manager.svc.model.ManualSettleCheck;
import com.yada.ssp.manager.svc.query.ManualSettleQuery;
import com.yada.ssp.manager.svc.service.ManualSettleService;
import com.yada.ssp.manager.svc.util.DateUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 手工调账
 */
@RestController
@RequestMapping("/manualSettle")
public class ManualSettleController {

    private final ManualSettleService manualSettleService;

    public ManualSettleController(ManualSettleService manualSettleService) {
        this.manualSettleService = manualSettleService;
    }

    @GetMapping
    @Secured(value = {"admin","FinanceOperator","FinanceChecker"})
    public Page<ManualSettleCheck> list(@AuthenticationPrincipal Jwt principal,
                                        @ModelAttribute ManualSettleQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(principal.getClaimAsString("orgId"));
        return manualSettleService.findCheckAll(query, pageable);
    }

    @PostMapping
    @Secured(value = {"admin","FinanceOperator","FinanceChecker"})
    public void save(@RequestBody ManualSettleCheck manualSettleCheck) {
        manualSettleCheck.setInputDate(DateUtil.getCurDate());
        manualSettleCheck.setCheckState("0");
        manualSettleCheck.setOperation("0");
        manualSettleService.saveCheck(manualSettleCheck);
    }

    @PutMapping
    @Secured(value = {"admin","FinanceOperator","FinanceChecker"})
    public void update(@RequestBody ManualSettleCheck manualSettleCheck) {
        manualSettleCheck.setInputDate(DateUtil.getCurDate());
        manualSettleCheck.setCheckState("0");
        manualSettleCheck.setOperation("1");
        manualSettleService.updateCheck(manualSettleCheck);
    }

    @GetMapping("/{lsId}")
    @Secured(value = {"admin","FinanceOperator","FinanceChecker"})
    public ManualSettleCheck getCheck(@PathVariable String lsId) {
        return manualSettleService.findCheckOne(lsId);
    }

    @DeleteMapping("/{lsId}")
    @Secured(value = {"admin","FinanceOperator","FinanceChecker"})
    public void delete(@PathVariable String lsId) {
        manualSettleService.deleteCheck(lsId);
    }

    @PutMapping("/{lsId}/check")
    @Secured(value = {"admin","FinanceOperator","FinanceChecker"})
    public void saveCheck(@PathVariable String lsId, @RequestBody Map<String, String> body) {
        manualSettleService.check(lsId, body.get("checkReason"), body.get("checkState"));
    }

    @GetMapping("/{lsId}/check")
    @Secured(value = {"admin","FinanceOperator","FinanceChecker"})
    public ManualSettle show(@PathVariable String lsId) {
        return manualSettleService.findOne(lsId);
    }
}
