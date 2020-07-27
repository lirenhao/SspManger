package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.ManualSettleCheck;
import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.query.ManualSettleQuery;
import com.yada.ssp.manager.svc.service.ManualSettleService;
import com.yada.ssp.manager.svc.service.MerchantService;
import com.yada.util.DateUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/manualSettle")
public class ManualSettleController extends BaseController {

    private final ManualSettleService manualSettleService;
    private final MerchantService merchantService;

    public ManualSettleController(ManualSettleService manualSettleService, MerchantService merchantService) {
        this.manualSettleService = manualSettleService;
        this.merchantService = merchantService;
    }

    @RequestMapping("/list")
    public String list(Model model, @ModelAttribute ManualSettleQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(getCurUser().getOrg().getOrgId());
        if (query.getSettleDate() == null || "".equals(query.getSettleDate())) {
            query.setSettleDate(DateUtil.getYesterday());
        }
        Page page = manualSettleService.findCheckAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);

        List<Merchant> merchantList = merchantService.findByOrgId(getCurUser().getOrg().getOrgId());
        model.addAttribute("merchantList", merchantList);

        return "ssp_pages/ManualSettle/list";
    }

    @RequestMapping("/listForCheck")
    public String listForCheck(Model model, @ModelAttribute ManualSettleQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(getCurUser().getOrg().getOrgId());
        Page page = manualSettleService.findCheckAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);

        List<Merchant> merchantList = merchantService.findByOrgId(getCurUser().getOrg().getOrgId());
        model.addAttribute("merchantList", merchantList);

        return "ssp_pages/ManualSettle/listForCheck";
    }

    @RequestMapping("/create")
    public String create(Model model) {
        List<Merchant> merchantList = merchantService.findByOrgId(getCurUser().getOrg().getOrgId());
        model.addAttribute("merchantList", merchantList);
        return "ssp_pages/ManualSettle/create";
    }

    @RequestMapping("/save")
    public String save(@ModelAttribute("model") ManualSettleCheck manualSettleCheck) {
        manualSettleCheck.setInputDate(DateUtil.getCurDate());
        manualSettleCheck.setCheckState("0");
        manualSettleCheck.setOperation("0");
        manualSettleService.saveCheck(manualSettleCheck);
        return "redirect:list";
    }

    @RequestMapping("/edit")
    public String edit(Model model, String lsId) {
        model.addAttribute("model", manualSettleService.findCheckOne(lsId));
        return "ssp_pages/ManualSettle/edit1";
    }

    @RequestMapping("/update")
    public String update(@ModelAttribute("model") ManualSettleCheck manualSettleCheck) {
        manualSettleCheck.setInputDate(DateUtil.getCurDate());
        manualSettleCheck.setCheckState("0");
        manualSettleCheck.setOperation("1");
        manualSettleService.updateCheck(manualSettleCheck);
        return "redirect:list";
    }

    @RequestMapping("/show")
    public String show(Model model, String lsId) {
        model.addAttribute("model", manualSettleService.findCheckOne(lsId));
        return "ssp_pages/ManualSettle/show";
    }

    @RequestMapping("/check")
    public String check(Model model, String lsId) {
        model.addAttribute("model", manualSettleService.findOne(lsId));
        model.addAttribute("check", manualSettleService.findCheckOne(lsId));
        return "ssp_pages/ManualSettle/check";
    }

    @RequestMapping("/saveCheck")
    public String saveCheck(String lsId, String checkReason, String state) {
        manualSettleService.check(lsId, checkReason, state);
        return "redirect:listForCheck";
    }

    @RequestMapping("/delete")
    public String delete(String lsId) {
        manualSettleService.deleteCheck(lsId);
        return "redirect:list";
    }
}
