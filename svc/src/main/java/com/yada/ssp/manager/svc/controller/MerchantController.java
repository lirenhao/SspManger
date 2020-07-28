package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.query.MerchantQuery;
import com.yada.ssp.manager.svc.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 商户API
 */
@RestController
@RequestMapping("/merchant")
public class MerchantController {

    private final MerchantService merchantService;

    @Autowired
    public MerchantController(MerchantService merchantService) {
        this.merchantService = merchantService;
    }

    @GetMapping
    public Page<Merchant> list(@RequestAttribute("auth") Auth auth,
                       @ModelAttribute MerchantQuery query, @PageableDefault Pageable pageable) {
        if (null == query.getOrgId() || "".equals(query.getOrgId())) {
            query.setOrgId(auth.getOrgId());
        }
        return merchantService.findAll(query, pageable);
    }

    @GetMapping("/orgId")
    public List<Merchant> getByOrgId(@RequestAttribute("auth") Auth auth) {
        return merchantService.findByOrgId(auth.getOrgId());
    }

    @GetMapping("/{id}")
    public Merchant get(@PathVariable String id) {
        return merchantService.findOne(id);
    }

}
