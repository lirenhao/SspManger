package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.*;
import com.yada.ssp.manager.svc.query.StaticQrcListCheckQuery;
import com.yada.ssp.manager.svc.query.TerminalQuery;
import com.yada.ssp.manager.svc.service.*;
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
 * Created by bjy on 2018/12/3.
 * 商户静态码审核Controller
 */
@Controller
@RequestMapping("/staticqrclistcheck")
public class StaticQrcListCheckController {
    private final StaticQrcListCheckService staticQrcListCheckService;
    private final CcyTypeService ccyTypeService;
    private final MerchantService merchantService;
    private final TerminalService terminalService;
    private final StaticQrcListService staticQrcListService;
    @Autowired
    public StaticQrcListCheckController(StaticQrcListCheckService staticQrcListCheckService, CcyTypeService ccyTypeService, MerchantService merchantService, TerminalService terminalService, StaticQrcListService staticQrcListService) {
        this.staticQrcListCheckService = staticQrcListCheckService;
        this.ccyTypeService = ccyTypeService;
        this.merchantService = merchantService;
        this.terminalService = terminalService;
        this.staticQrcListService = staticQrcListService;
    }

    @RequestMapping("/list")
    public String list(Model model, @RequestAttribute("auth") Auth auth,
                       @ModelAttribute StaticQrcListCheckQuery query, @PageableDefault Pageable pageable) {
        List<CcyType> ccyTypeList = ccyTypeService.findAll();

        query.setOrgId(auth.getOrgId());
        Page page = staticQrcListCheckService.findAll(query, pageable);
        model.addAttribute("ccyTypeList", ccyTypeList);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/StaticQrcListCheck/list";
    }

    @RequestMapping("/listForCheck")
    public String listForCheck(Model model, @RequestAttribute("auth") Auth auth,
                               @ModelAttribute StaticQrcListCheckQuery query, @PageableDefault Pageable pageable) {
        List<CcyType> ccyTypeList = ccyTypeService.findAll();

        query.setOrgId(auth.getOrgId());
        Page page = staticQrcListCheckService.findAll(query, pageable);
        model.addAttribute("ccyTypeList", ccyTypeList);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/StaticQrcListCheck/listForCheck";
    }

    @RequestMapping("/create")
    public String create(Model model, @RequestAttribute("auth") Auth auth) {
        List<CcyType> ccyTypeList = ccyTypeService.findAll();
        model.addAttribute("ccyTypeList", ccyTypeList);

        List<Merchant> merchantList = merchantService.findByOrgId(auth.getOrgId());
        model.addAttribute("merchantList", merchantList);
        return "ssp_pages/StaticQrcListCheck/create";
    }

    @RequestMapping("/save")
    public String save(@ModelAttribute("model") StaticQrcListCheck staticQrcListCheck) {
        staticQrcListCheck.setQrValue(staticQrcListCheck.getQrValue().trim());
        staticQrcListCheckService.save(staticQrcListCheck);
        return "redirect:list";
    }

    @RequestMapping("/update")
    public String update(@ModelAttribute("model") StaticQrcListCheck staticQrcListCheck) {
        staticQrcListCheck.setQrValue(staticQrcListCheck.getQrValue().trim());
        staticQrcListCheckService.update(staticQrcListCheck);
        return "redirect:list";
    }

    @RequestMapping("/show")
    public String show(Model model, String lsId) {
        model.addAttribute("model", staticQrcListCheckService.findOne(lsId));
        return "ssp_pages/StaticQrcListCheck/show";
    }

    @RequestMapping("/showForCheck")
    public String showForCheck(Model model, String lsId) {
        StaticQrcList staticQrcList = staticQrcListService.findOne(lsId);
        model.addAttribute("model", staticQrcListCheckService.findOne(lsId));
        model.addAttribute("staticQrcList",staticQrcList);
        return "ssp_pages/StaticQrcListCheck/showForCheck";
    }
    @RequestMapping("/check")
    public String check(Model model, String lsId) {
        StaticQrcList staticQrcList = staticQrcListService.findOne(lsId);
        model.addAttribute("model", staticQrcListCheckService.findOne(lsId));
        model.addAttribute("staticQrcList",staticQrcList);
        return "ssp_pages/StaticQrcListCheck/check";
    }

    @RequestMapping("/saveCheck")
    public String saveCheck(String lsId, String checkReason, String state) {
        staticQrcListCheckService.saveCheck(lsId,checkReason,state);
        return "redirect:listForCheck";
    }

    @RequestMapping("/edit")
    public String edit(Model model, String lsId) {
        List<CcyType> ccyTypeList = ccyTypeService.findAll();
        model.addAttribute("ccyTypeList", ccyTypeList);
        model.addAttribute("model", staticQrcListCheckService.findOne(lsId));
        return "ssp_pages/StaticQrcListCheck/edit1";
    }

    @RequestMapping("/delete")
    public String delete(String lsId) {
        staticQrcListCheckService.delete(lsId);
        return "redirect:list";
    }

    @ResponseBody
    @RequestMapping("/AJAX_findTerminalByMerchantId")
    public List<Terminal> AJAX_findTerminalByMerchantId(String merchantId) {
        TerminalQuery terminalQuery = new TerminalQuery();
        terminalQuery.setMerchantId(merchantId);
        return terminalService.findAll(terminalQuery);
    }
}
