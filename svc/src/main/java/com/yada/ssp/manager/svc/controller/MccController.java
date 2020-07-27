package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.Mcc;
import com.yada.ssp.manager.svc.query.MccQuery;
import com.yada.ssp.manager.svc.service.MccService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by bjy on 2018/7/25.
 * MCC码Controller
 */

@Controller
@RequestMapping("/mcc")
public class MccController {

    private final MccService mccService;

    @Autowired
    public MccController(MccService mccService) {
        this.mccService = mccService;
    }

    @RequestMapping("/list")
    public String list(Model model, @ModelAttribute MccQuery query, @PageableDefault Pageable pageable) {
        Page page = mccService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/Mcc/list";
    }

    @RequestMapping("/create")
    public String create() {
        return "ssp_pages/Mcc/create";
    }

    @RequestMapping("/save")
    public String save(@ModelAttribute("model") Mcc mcc) {
        mccService.saveAndUpdate(mcc);
        return "redirect:list";
    }

    @RequestMapping("/show")
    public String show(Model model, String mcc) {
        model.addAttribute("model", mccService.findOne(mcc));
        return "ssp_pages/Mcc/show";
    }

    @RequestMapping("/edit")
    public String edit(Model model, String mcc) {
        model.addAttribute("model", mccService.findOne(mcc));
        return "ssp_pages/Mcc/edit1";
    }

    @RequestMapping("/delete")
    public String delete(String mcc) {
        mccService.deleteMcc(mcc);
        return "redirect:list";
    }

    @ResponseBody
    @RequestMapping("/AJAX_findMcc")
    public String AJAX_findMcc(String mccId) {
        String mess = "*";
        if (mccService.exists(mccId)) {
            mess = "该商户号已存在";
        }
        return mess;
    }
}
