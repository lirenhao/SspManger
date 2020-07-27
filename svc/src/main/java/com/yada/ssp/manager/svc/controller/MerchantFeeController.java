package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.model.MerchantFee;
import com.yada.ssp.manager.svc.model.MerchantFeeCheck;
import com.yada.ssp.manager.svc.query.MerchantFeeCheckQuery;
import com.yada.ssp.manager.svc.service.MerchantFeeCheckService;
import com.yada.ssp.manager.svc.service.MerchantFeeService;
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

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by bjy on 2018/11/27.
 * 商户费率表
 */
@Controller
@RequestMapping("/merchantfee")
public class MerchantFeeController extends BaseController {
    private final MerchantFeeCheckService merchantFeeCheckService;
    private final MerchantService merchantService;
    private final MerchantFeeService merchantFeeService;
    @Autowired
    public MerchantFeeController(MerchantFeeCheckService merchantFeeCheckService, MerchantService merchantService, MerchantFeeService merchantFeeService) {
        this.merchantFeeCheckService = merchantFeeCheckService;
        this.merchantService = merchantService;
        this.merchantFeeService = merchantFeeService;
    }

    @RequestMapping("/list")
    public String list(Model model, @ModelAttribute MerchantFeeCheckQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(getCurUser().getOrg().getOrgId());
        Page page = merchantFeeCheckService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/MerchantFee/list";
    }

    @RequestMapping("/listForCheck")
    public String listForCheck(Model model, @ModelAttribute MerchantFeeCheckQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(getCurUser().getOrg().getOrgId());
        Page page = merchantFeeCheckService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/MerchantFee/listForCheck";
    }

    @RequestMapping("/create")
    public String create(Model model) {
        List<Merchant> merchantList = merchantService.findByOrgId(getCurUser().getOrg().getOrgId());
        model.addAttribute("merchantList", merchantList);
        return "ssp_pages/MerchantFee/create";
    }

    @RequestMapping("/save")
    public String save(@ModelAttribute("model") MerchantFeeCheck merchantFeeCheck) {
        merchantFeeCheckService.save(merchantFeeCheck);
        return "redirect:list";
    }

    @RequestMapping("/update")
    public String update(@ModelAttribute("model") MerchantFeeCheck merchantFeeCheck) {
        merchantFeeCheckService.update(merchantFeeCheck);
        return "redirect:list";
    }

    @RequestMapping("/saveCheck")
    public String saveCheck(String lsId, String state, String checkReason) {
        merchantFeeCheckService.saveCheck(lsId,state,checkReason);
        return "redirect:listForCheck";
    }

    @RequestMapping("/show")
    public String show(Model model, String lsId) {
        model.addAttribute("model", merchantFeeCheckService.findOne(lsId));
        return "ssp_pages/MerchantFee/show";
    }

    @RequestMapping("/showForCheck")
    public String showForCheck(Model model, String lsId) {
        model.addAttribute("model", merchantFeeCheckService.findOne(lsId));
        model.addAttribute("merchantFee",merchantFeeService.findOne(lsId));
        return "ssp_pages/MerchantFee/showForCheck";
    }

    @RequestMapping("/check")
    public String check(Model model, String lsId) {
        model.addAttribute("model", merchantFeeCheckService.findOne(lsId));
        model.addAttribute("merchantFee",merchantFeeService.findOne(lsId));
        return "ssp_pages/MerchantFee/check";
    }

    @RequestMapping("/edit")
    public String edit(Model model, String lsId) {
        MerchantFeeCheck merchantFeeCheck = merchantFeeCheckService.findOne(lsId);
        BigDecimal fee = merchantFeeCheck.getFee();
        fee = fee.multiply(new BigDecimal(10000)).setScale(0);
        merchantFeeCheck.setFee(fee);
        model.addAttribute("model", merchantFeeCheck);
        if (merchantFeeCheck.getCheckState().equals("1") || merchantFeeCheck.getCheckState().equals("3")) {
            return "ssp_pages/MerchantFee/edit1";
        } else if (merchantFeeCheck.getCheckState().equals("2") || merchantFeeCheck.getCheckState().equals("4")) {
            return "ssp_pages/MerchantFee/editOnlyCloseDate";
        }
        return "ssp_pages/MerchantFee/edit1";
    }

    @RequestMapping("/delete")
    public String delete(String lsId) {
        merchantFeeCheckService.delete(lsId);
        return "redirect:list";
    }

    @ResponseBody
    @RequestMapping("/AJAX_getFeeType")
    public String AJAX_getFeeType(String merchantId) {
        String feeType = "*";
        List<MerchantFee> merchantFeeList = merchantFeeService.findListByMerchantId(merchantId);
        if (merchantFeeList != null && merchantFeeList.size() > 0) {
            feeType = merchantFeeList.get(0).getFeeType();
        }
        return feeType;
    }
}
