package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.InternationalCode;
import com.yada.ssp.manager.svc.model.MerchantExtra;
import com.yada.ssp.manager.svc.query.InternationalCodeQuery;
import com.yada.ssp.manager.svc.service.InternationalCodeService;
import com.yada.ssp.manager.svc.service.MerchantExtraService;
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
 * Created by bjy on 2018/9/6.
 * 国家代码Controller
 */

@Controller
@RequestMapping("/internationalcode")
public class InternationalCodeController {

    private final InternationalCodeService internationalCodeService;
    private final MerchantExtraService merchantExtraService;

    @Autowired
    public InternationalCodeController(InternationalCodeService internationalCodeService, MerchantExtraService merchantExtraService) {
        this.internationalCodeService = internationalCodeService;
        this.merchantExtraService = merchantExtraService;
    }

    @RequestMapping("/list")
    public String list(Model model, @ModelAttribute InternationalCodeQuery query, @PageableDefault Pageable pageable) {
        Page page = internationalCodeService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/InternationalCode/list";
    }

    @RequestMapping("/create")
    public String create() {
        return "ssp_pages/InternationalCode/create";
    }

    @RequestMapping("/save")
    public String save(@ModelAttribute("model") InternationalCode internationalCode) {
        internationalCodeService.saveAndUpdate(internationalCode);
        return "redirect:list";
    }

    @RequestMapping("/show")
    public String show(Model model, String internationalCode) {
        model.addAttribute("model", internationalCodeService.findOne(internationalCode));
        return "ssp_pages/InternationalCode/show";
    }

    @RequestMapping("/edit")
    public String edit(Model model, String internationalCode) {
        model.addAttribute("model", internationalCodeService.findOne(internationalCode));
        return "ssp_pages/InternationalCode/edit1";
    }

    @RequestMapping("/delete")
    public String delete(String internationalCode) {
        internationalCodeService.delete(internationalCode);
        return "redirect:list";
    }

    @ResponseBody
    @RequestMapping("/AJAX_findInternationalCode")
    public String AJAX_findInternationalCode(String internationalCode) {
        String mess = "*";
        if (internationalCodeService.exists(internationalCode)) {
            mess = "该商户号已存在";
        }
        return mess;
    }

    @ResponseBody
    @RequestMapping("/AJAX_isCanDelete")
    public String AJAX_isCanDelete(String internationalCode) {
        String mess = "*";
        List<MerchantExtra> merchantExtraList = merchantExtraService.findListByInternationalCode(internationalCode);
        if (merchantExtraList != null && merchantExtraList.size() > 0) {
            mess = "该国家代码已被使用不能删除";
        }
        return mess;
    }
}
