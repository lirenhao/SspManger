package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.ManualSettle;
import com.yada.ssp.manager.svc.model.ManualSettleCheck;
import com.yada.ssp.manager.svc.query.ManualSettleQuery;
import com.yada.ssp.manager.svc.service.ManualSettleService;
import com.yada.ssp.manager.svc.util.DateUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

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
    public Page<ManualSettleCheck> list(@RequestAttribute("auth") Auth auth,
                                        @ModelAttribute ManualSettleQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(auth.getOrgId());
        return manualSettleService.findCheckAll(query, pageable);
    }

    @PostMapping
    public void save(@RequestBody ManualSettleCheck manualSettleCheck) {
        manualSettleCheck.setInputDate(DateUtil.getCurDate());
        manualSettleCheck.setCheckState("0");
        manualSettleCheck.setOperation("0");
        manualSettleService.saveCheck(manualSettleCheck);
    }

    @PutMapping
    public void update(@RequestBody ManualSettleCheck manualSettleCheck) {
        manualSettleCheck.setInputDate(DateUtil.getCurDate());
        manualSettleCheck.setCheckState("0");
        manualSettleCheck.setOperation("1");
        manualSettleService.updateCheck(manualSettleCheck);
    }

    @GetMapping("/{lsId}")
    public ManualSettleCheck getCheck(@PathVariable String lsId) {
        return manualSettleService.findCheckOne(lsId);
    }

    @DeleteMapping("/{lsId}")
    public void delete(@PathVariable String lsId) {
        manualSettleService.deleteCheck(lsId);
    }

    @PutMapping("/{lsId}/check")
    public void saveCheck(@PathVariable String lsId, String checkReason, String checkState) {
        manualSettleService.check(lsId, checkReason, checkState);
    }

    @GetMapping("/{lsId}/check")
    public ManualSettle show(@PathVariable String lsId) {
        return manualSettleService.findOne(lsId);
    }
}
