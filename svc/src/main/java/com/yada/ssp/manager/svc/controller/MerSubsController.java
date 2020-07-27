package com.yada.ssp.manager.svc.controller;

import com.yada.security.model.Org;
import com.yada.security.service.OrgService;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * WEB子商户Controller
 */
@Controller
@RequestMapping("/merSubs")
public class MerSubsController extends BaseController {

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
    public String list(Model model, @ModelAttribute MerchantQuery query, @PageableDefault Pageable pageable) {
        if (null == query.getOrgId() || "".equals(query.getOrgId())) {
            query.setOrgId(getCurUser().getOrg().getOrgId());
        }
        Page<Merchant> page = merchantService.findAll(query, pageable);
        List<Org> orgList = orgService.findByOrgIdStartingWithList(getCurUser().getOrg().getOrgId());
        model.addAttribute("orgList", orgList);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/MerSubs/list";
    }

    @RequestMapping("/edit")
    public String edit(Model model, String merchantId) {
        List<Merchant> merchantList = merchantService.findByOrgId(getCurUser().getOrg().getOrgId());
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
