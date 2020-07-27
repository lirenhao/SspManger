package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.MerApiOrg;
import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.query.MerApiOrgQuery;
import com.yada.ssp.manager.svc.service.MerApiOrgService;
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
 * Created by bjy on 2018/12/19.
 * 参数维护表Controller
 */
@Controller
@RequestMapping("/merapiorg")
public class MerApiOrgController extends BaseController {
    private final MerApiOrgService merApiOrgService;
    private final MerchantService merchantService;

    @Autowired
    public MerApiOrgController(MerApiOrgService merApiOrgService, MerchantService merchantService) {
        this.merApiOrgService = merApiOrgService;
        this.merchantService = merchantService;
    }

    @RequestMapping("/list")
    public String list(Model model, @ModelAttribute MerApiOrgQuery query, @PageableDefault Pageable pageable) {
        Page page = merApiOrgService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/MerApiOrg/list";
    }

    @RequestMapping("/mapping")
    public String mapping(Model model, @ModelAttribute MerApiOrgQuery query, @PageableDefault Pageable pageable) {
        Page page = merApiOrgService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/MerApiOrg/mapping";
    }

    @RequestMapping("/create")
    public String create() {
        return "ssp_pages/MerApiOrg/create";
    }

    @RequestMapping("/save")
    public String save(@ModelAttribute("model") MerApiOrg merApiOrg) {
        merApiOrgService.save(merApiOrg);
        return "redirect:list";
    }

    @RequestMapping("/update")
    public String update(@ModelAttribute("model") MerApiOrg merApiOrg) {
        merApiOrgService.update(merApiOrg);
        return "redirect:list";
    }

    @RequestMapping("/show")
    public String show(Model model, String orgId) {
        model.addAttribute("model", merApiOrgService.findOne(orgId));
        return "ssp_pages/MerApiOrg/show";
    }

    @RequestMapping("/edit")
    public String edit(Model model, String orgId) {
        model.addAttribute("model", merApiOrgService.findOne(orgId));
        return "ssp_pages/MerApiOrg/edit1";
    }

    @RequestMapping("/updateMerchant")
    public String updateMerchant(Model model, String orgId) {
        List<Merchant> merchantList = merchantService.findByOrgId(getCurUser().getOrg().getOrgId());
        model.addAttribute("merchantList",merchantList);

        model.addAttribute("model", merApiOrgService.findOne(orgId));
        return "ssp_pages/MerApiOrg/updateMerchant";
    }

    @RequestMapping("/saveUpdateMerchant")
    public String saveUpdateMerchant(String[] merchantId, String orgId) {
        merApiOrgService.saveUpdateMerchant(merchantId,orgId);
        return "redirect:mapping";
    }

    @RequestMapping("/delete")
    public String delete(String orgId) {
        merApiOrgService.delete(orgId);
        return "redirect:list";
    }

    @ResponseBody
    @RequestMapping("/AJAX_findMerchant")
    public Merchant AJAX_findMerchant(String merchantId) {
        return merchantService.findOne(merchantId);
    }

    @ResponseBody
    @RequestMapping("/AJAX_findMerApiOrg")
    public String AJAX_findMerApiOrg(String orgId) {
        String mess = "*";
        if (merApiOrgService.exists(orgId)) {
            mess = "该机构已存在";
        }
        return mess;
    }
}
