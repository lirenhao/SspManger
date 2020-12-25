package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.service.WebSubsService;
import com.yada.ssp.manager.svc.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

/**
 * WEB子商户API
 */
@RestController
@RequestMapping("/webSubs")
public class WebSubsController {

    private final MerchantService merchantService;
    private final WebSubsService webSubsService;

    @Autowired
    public WebSubsController(MerchantService merchantService, WebSubsService webSubsService) {
        this.merchantService = merchantService;
        this.webSubsService = webSubsService;
    }

    @GetMapping("/{merNo}")
    @Secured(value = {"admin","MerchantOperator"})
    public Set<Merchant> getSubs(@PathVariable String merNo) {
        return merchantService.findOne(merNo).getWebSubs();
    }

    @PutMapping("/{merNo}")
    @Secured(value = {"admin","MerchantOperator"})
    public void update(@PathVariable String merNo, @RequestBody String[] merchantId) {
        webSubsService.saveUpdate(merNo, merchantId);
    }
}
