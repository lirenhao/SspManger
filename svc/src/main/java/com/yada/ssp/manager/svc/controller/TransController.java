package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.Trans;
import com.yada.ssp.manager.svc.query.TransQuery;
import com.yada.ssp.manager.svc.service.TransService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

/**
 * 交易记录查询API
 */
@RestController
@RequestMapping("/trans")
public class TransController {

    private final TransService transService;

    @Autowired
    public TransController(TransService transService) {
        this.transService = transService;
    }

    @GetMapping
    public Page<Trans> list(@RequestAttribute("auth") Auth auth,
                            @ModelAttribute TransQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(auth.getOrgId());
        return transService.findAll(query, pageable);
    }

    @GetMapping("/{traceNo}")
    public Trans show(@PathVariable String traceNo) {
        return transService.findOne(traceNo);
    }
}
