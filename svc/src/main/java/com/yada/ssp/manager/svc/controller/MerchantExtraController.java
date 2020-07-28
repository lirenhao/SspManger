package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.MerchantExtra;
import com.yada.ssp.manager.svc.model.MerchantExtraCheck;
import com.yada.ssp.manager.svc.query.MerchantExtraCheckQuery;
import com.yada.ssp.manager.svc.service.MerchantExtraCheckService;
import com.yada.ssp.manager.svc.service.MerchantExtraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

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
    public Page<MerchantExtraCheck> list(@RequestAttribute("auth") Auth auth,
                                         @ModelAttribute MerchantExtraCheckQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(auth.getOrgId());
        return merchantExtraCheckService.findAll(query, pageable);
    }

    @PutMapping
    public void update(MerchantExtraCheck merchantExtraCheck) {
        merchantExtraCheckService.saveMerchantExtra(merchantExtraCheck);
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
    public void check(@PathVariable String id, String checkReason, String state) {
        merchantExtraCheckService.saveCheck(id, checkReason, state);
    }
}
