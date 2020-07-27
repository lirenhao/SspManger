package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.UnionPayCardBin;
import com.yada.ssp.manager.svc.query.UnionPayCardBinQuery;
import com.yada.ssp.manager.svc.service.UnionPayCardBinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by bjy on 2018/7/26.
 * 银联卡binController
 */

@Controller
@RequestMapping("/unionpaycardbin")
public class UnionPayCardBinController {

    private final UnionPayCardBinService unionPayCardBinService;

    @Autowired
    public UnionPayCardBinController(UnionPayCardBinService unionPayCardBinService) {
        this.unionPayCardBinService = unionPayCardBinService;
    }

    @RequestMapping("/list")
    public String list(Model model, @ModelAttribute UnionPayCardBinQuery query, @PageableDefault Pageable pageable) {
        Page page = unionPayCardBinService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/UnionPayCardBin/list";
    }

    @RequestMapping("/save")
    public String save(@ModelAttribute("model") UnionPayCardBin unionPayCardBin) {
        unionPayCardBinService.saveAndUpdate(unionPayCardBin);
        return "redirect:list";
    }

    @RequestMapping("/show")
    public String show(Model model, String id) {
        model.addAttribute("model", unionPayCardBinService.findOne(id));
        return "ssp_pages/UnionPayCardBin/show";
    }
}
