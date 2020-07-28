package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.MerLimit;
import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.query.MerLimitQuery;
import com.yada.ssp.manager.svc.service.MerLimitService;
import com.yada.ssp.manager.svc.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/merLimit")
public class MerLimitController {

    private final MerLimitService merLimitService;
    private final MerchantService merchantService;

    @Autowired
    public MerLimitController(MerLimitService merLimitService, MerchantService merchantService) {
        this.merLimitService = merLimitService;
        this.merchantService = merchantService;
    }

    @GetMapping
    public Page<MerLimit> list(@RequestAttribute("auth") Auth auth,
                               @ModelAttribute MerLimitQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(auth.getOrgId());
        return merLimitService.findAll(query, pageable);
    }

    @RequestMapping("/create")
    public String create(Model model, @RequestAttribute("auth") Auth auth) {
        List<String> limitMerList = merLimitService.findAllMerNo();
        List<Merchant> merchantList = merchantService.findByOrgId(auth.getOrgId())
                .stream().filter(item -> !limitMerList.contains(item.getMerchantId())).collect(Collectors.toList());
        model.addAttribute("merchantList", merchantList);
        return "ssp_pages/MerLimit/create";
    }

    @PostMapping
    public void save(@ModelAttribute MerLimit merLimit) {
        merLimitService.saveAndUpdate(merLimit);
    }

    @PutMapping
    public void update(@ModelAttribute MerLimit merLimit) {
        merLimitService.saveAndUpdate(merLimit);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        merLimitService.delete(id);
    }
}
