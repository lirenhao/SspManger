package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.Org;
import com.yada.ssp.manager.svc.service.OrgService;
import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.query.MerchantQuery;
import com.yada.ssp.manager.svc.service.MerSubsService;
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
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * WEB子商户Controller
 */
@Controller
@RequestMapping("/merSubs")
public class MerSubsController {

    private final OrgService orgService;
    private final MerchantService merchantService;
    private final MerSubsService merSubsService;

    @Autowired
    public MerSubsController(OrgService orgService, MerchantService merchantService, MerSubsService merSubsService) {
        this.orgService = orgService;
        this.merchantService = merchantService;
        this.merSubsService = merSubsService;
    }

    @RequestMapping("/list")
    public String list(Model model, @RequestAttribute("auth") Auth auth,
                       @ModelAttribute MerchantQuery query, @PageableDefault Pageable pageable) {
        if (null == query.getOrgId() || "".equals(query.getOrgId())) {
            query.setOrgId(auth.getOrgId());
        }
        Page<Merchant> page = merchantService.findAll(query, pageable);
        List<Org> orgList = orgService.findByOrgIdStartingWithList(auth.getOrgId());
        model.addAttribute("orgList", orgList);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/MerSubs/list";
    }

    @RequestMapping("/edit")
    public String edit(Model model, @RequestAttribute("auth") Auth auth, String merchantId) {
        List<Merchant> merchantList = merchantService.findByOrgId(auth.getOrgId());
        model.addAttribute("merchantList", merchantList);

        model.addAttribute("model", merchantService.findOne(merchantId));
        return "ssp_pages/MerSubs/edit";
    }

    @RequestMapping("/update")
    public String update(String merNo, String[] merchantId) {
        merSubsService.saveUpdate(merNo, merchantId);
        return "redirect:list";
    }

    @ResponseBody
    @RequestMapping("/AJAX_findMerchant")
    public Merchant AJAX_findMerchant(String merchantId) {
        return merchantService.findOne(merchantId);
    }

}
