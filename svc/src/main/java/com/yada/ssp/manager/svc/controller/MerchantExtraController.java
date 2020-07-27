package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.*;
import com.yada.ssp.manager.svc.query.MerchantExtraCheckQuery;
import com.yada.ssp.manager.svc.query.MerchantQuery;
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

import java.util.List;

/**
 * Created by bjy on 2018/11/20.
 * 商户附加资料Controller
 */
@Controller
@RequestMapping("/merchantextra")
public class MerchantExtraController {
    private final MerchantService merchantService;
    private final CcyTypeService typeService;
    private final InternationalCodeService internationalCodeService;
    private final MerchantExtraCheckService merchantExtraCheckService;
    private final MerchantExtraService merchantExtraService;
    @Autowired
    public MerchantExtraController(MerchantService merchantService,CcyTypeService typeService, InternationalCodeService internationalCodeService, MerchantExtraCheckService merchantExtraCheckService, MerchantExtraService merchantExtraService) {
        this.merchantService = merchantService;
        this.typeService = typeService;
        this.internationalCodeService = internationalCodeService;
        this.merchantExtraCheckService = merchantExtraCheckService;
        this.merchantExtraService = merchantExtraService;
    }

    @RequestMapping("/merchantExtraList")
    public String merchantExtraList(Model model, @RequestAttribute("auth") Auth auth,
                                    @ModelAttribute MerchantQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(auth.getOrgId());
        Page page = merchantService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/MerchantExtra/merchantExtraList";
    }

    @RequestMapping("/merchantExtraListForCheck")
    public String merchantExtraListForCheck(Model model, @RequestAttribute("auth") Auth auth,
                                            @ModelAttribute MerchantExtraCheckQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(auth.getOrgId());
        Page page = merchantExtraCheckService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/MerchantExtra/merchantExtraListForCheck";
    }

    @RequestMapping("/merchantExtraUpdate")
    public String merchantExtraUpdate(Model model, String merchantId) {
        MerchantExtraCheck merchantExtraCheck = merchantExtraCheckService.findOne(merchantId);
        List<CcyType> ccyTypeList = typeService.findAll();
        List<InternationalCode> internationalCodeList = internationalCodeService.findAll();
        model.addAttribute("merchantId",merchantId);
        model.addAttribute("ccyTypeList", ccyTypeList);
        model.addAttribute("internationalCodeList", internationalCodeList);
        model.addAttribute("model", merchantExtraCheck);
        return "ssp_pages/MerchantExtra/merchantExtraUpdate";
    }

    @RequestMapping("/saveMerchantExtra")
    public String saveMerchantExtra(MerchantExtraCheck merchantExtraCheck) {
        merchantExtraCheckService.saveMerchantExtra(merchantExtraCheck);
        return "redirect:merchantExtraList";
    }

    @RequestMapping("/merchantExtraDelete")
    public String merchantExtraDelete(String merchantId) {
        merchantExtraCheckService.merchantExtraDelete(merchantId);
        return "redirect:merchantExtraList";
    }

    @RequestMapping("/merchantExtraShow")
    public String merchantExtraShow(Model model, String merchantId){
        Merchant merchant = merchantService.findOne(merchantId);
        model.addAttribute("model",merchant);
        return "ssp_pages/MerchantExtra/merchantExtraShow";
    }

    @RequestMapping("/merchantExtraShowForCheck")
    public String merchantExtraShowForCheck(Model model, String merchantId){
        MerchantExtraCheck merchantExtraCheck = merchantExtraCheckService.findOne(merchantId);
        MerchantExtra merchantExtra = merchantExtraService.findOne(merchantId);
        model.addAttribute("model",merchantExtraCheck);
        model.addAttribute("merchantExtra",merchantExtra);
        return "ssp_pages/MerchantExtra/merchantExtraShowForCheck";
    }

    @RequestMapping("/check")
    public String check(Model model, String merchantId){
        MerchantExtraCheck merchantExtraCheck = merchantExtraCheckService.findOne(merchantId);
        MerchantExtra merchantExtra = merchantExtraService.findOne(merchantId);
        model.addAttribute("model",merchantExtraCheck);
        model.addAttribute("merchantExtra",merchantExtra);
        return "ssp_pages/MerchantExtra/check";
    }

    @RequestMapping("/saveCheck")
    public String saveCheck(String merchantId, String checkReason, String state) {
        merchantExtraCheckService.saveCheck(merchantId,checkReason,state);
        return "redirect:merchantExtraListForCheck";
    }
}
