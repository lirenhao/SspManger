package com.yada.ssp.manager.svc.controller;

import com.yada.security.model.Org;
import com.yada.security.service.OrgService;
import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.query.MerchantQuery;
import com.yada.ssp.manager.svc.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * Created by bjy on 2018/7/23.
 * 商户Controller
 */
@Controller
@RequestMapping("/merchant")
public class MerchantController extends BaseController {
    private final MerchantService merchantService;
    private final OrgService orgService;

    @Autowired
    public MerchantController(MerchantService merchantService, OrgService orgService) {
        this.merchantService = merchantService;
        this.orgService = orgService;
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
        return "ssp_pages/Merchant/list";
    }

    @RequestMapping("/show")
    public String show(Model model, String merchantId) {
        Merchant merchant = merchantService.findOne(merchantId);
        model.addAttribute("model", merchant);
        return "ssp_pages/Merchant/show";
    }
}
