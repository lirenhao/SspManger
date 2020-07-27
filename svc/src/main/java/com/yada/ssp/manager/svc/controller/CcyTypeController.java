package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.CcyType;
import com.yada.ssp.manager.svc.model.MerchantExtra;
import com.yada.ssp.manager.svc.query.CcyTypeQuery;
import com.yada.ssp.manager.svc.service.CcyTypeService;
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
 * Created by bjy on 2018/9/5.
 * 币种Controller
 */

@Controller
@RequestMapping("/ccytype")
public class CcyTypeController {

    private final CcyTypeService typeService;
    private final MerchantExtraService merchantExtraService;

    @Autowired
    public CcyTypeController(CcyTypeService typeService, MerchantExtraService merchantExtraService) {
        this.typeService = typeService;
        this.merchantExtraService = merchantExtraService;
    }

    @RequestMapping("/list")
    public String list(Model model, @ModelAttribute CcyTypeQuery query, @PageableDefault Pageable pageable) {
        Page page = typeService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/CcyType/list";
    }

    @RequestMapping("/create")
    public String create() {
        return "ssp_pages/CcyType/create";
    }

    @RequestMapping("/save")
    public String save(@ModelAttribute("model") CcyType ccyType) {
        typeService.saveAndUpdate(ccyType);
        return "redirect:list";
    }

    @RequestMapping("/show")
    public String show(Model model, String ccyType) {
        model.addAttribute("model", typeService.findOne(ccyType));
        return "ssp_pages/CcyType/show";
    }

    @RequestMapping("/edit")
    public String edit(Model model, String ccyType) {
        model.addAttribute("model", typeService.findOne(ccyType));
        return "ssp_pages/CcyType/edit1";
    }

    @RequestMapping("/delete")
    public String delete(String ccyType) {
        typeService.delete(ccyType);
        return "redirect:list";
    }

    @ResponseBody
    @RequestMapping("/AJAX_findCcyType")
    public String AJAX_findCcyType(String ccyType) {
        String mess = "*";
        if (typeService.exists(ccyType)) {
            mess = "该币种类型已存在";
        }
        return mess;
    }

    @ResponseBody
    @RequestMapping("/AJAX_isCanDelete")
    public String AJAX_isCanDelete(String ccyType) {
        String mess = "*";
        List<MerchantExtra> merchantExtraList = merchantExtraService.findListByCcyType(ccyType);
        if (merchantExtraList != null && merchantExtraList.size() > 0) {
            mess = "该币种类型已被使用不能删除";
        }
        return mess;
    }

}
