package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.service.MerSubsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * WEB子商户API
 */
@RestController
@RequestMapping("/merSubs")
public class MerSubsController {

    private final MerSubsService merSubsService;

    @Autowired
    public MerSubsController(MerSubsService merSubsService) {
        this.merSubsService = merSubsService;
    }

    @PutMapping("/{merNo}")
    public void update(@PathVariable String merNo, String[] merchantId) {
        merSubsService.saveUpdate(merNo, merchantId);
    }
}
