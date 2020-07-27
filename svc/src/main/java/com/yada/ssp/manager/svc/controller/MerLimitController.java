package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.*;
import com.yada.ssp.manager.svc.query.MerLimitQuery;
import com.yada.ssp.manager.svc.service.MerLimitService;
import com.yada.ssp.manager.svc.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/merLimit")
public class MerLimitController {

    private final MerLimitService merLimitService;
    private final MerchantService merchantService;

    @Autowired
    public MerLimitController(MerLimitService merLimitService, MerchantService merchantService) {
        this.merLimitService = merLimitService;
        this.merchantService = merchantService;
    }

    @RequestMapping("/list")
    public String list(Model model, @RequestAttribute("auth") Auth auth,
                       @ModelAttribute MerLimitQuery query, @PageableDefault Pageable pageable) {
        List<Merchant> merchantList = merchantService.findByOrgId(auth.getOrgId());
        model.addAttribute("merchantList", merchantList);

        query.setOrgId(auth.getOrgId());
        Page<MerLimit> page = merLimitService.findAll(query, pageable);
        model.addAttribute("page", page);
        model.addAttribute("query", query);

        return "ssp_pages/MerLimit/list";
    }

    @RequestMapping("/create")
    public String create(Model model, @RequestAttribute("auth") Auth auth) {
        List<String> limitMerList = merLimitService.findAllMerNo();
        List<Merchant> merchantList = merchantService.findByOrgId(auth.getOrgId())
                .stream().filter(item -> !limitMerList.contains(item.getMerchantId())).collect(Collectors.toList());
        model.addAttribute("merchantList", merchantList);
        return "ssp_pages/MerLimit/create";
    }

    @RequestMapping("/save")
    public String save(@ModelAttribute("model") MerLimit merLimit) {
        merLimitService.saveAndUpdate(merLimit);
        return "redirect:list";
    }

    @RequestMapping("/edit")
    public String edit(Model model, String id) {
        MerLimit merLimit = merLimitService.findOne(id);
        model.addAttribute("model", merLimit);
        return "ssp_pages/MerLimit/edit";
    }

    @RequestMapping("/update")
    public String update(@ModelAttribute("model") MerLimit merLimit) {
        merLimitService.saveAndUpdate(merLimit);
        return "redirect:list";
    }

    @RequestMapping("/delete")
    public String delete(String id) {
        merLimitService.delete(id);
        return "redirect:list";
    }
}
