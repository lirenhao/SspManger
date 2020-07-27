package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.Trans;
import com.yada.ssp.manager.svc.query.TransQuery;
import com.yada.ssp.manager.svc.service.TransService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

/**
 * Created by bjy on 2018/8/8.
 * 交易记录查询Controller
 */

@Controller
@RequestMapping("/trans")
public class TransController {
    private final TransService transService;

    @Autowired
    public TransController(TransService transService) {
        this.transService = transService;
    }

    @GetMapping("/list")
    public String view(Model model, @PageableDefault Pageable pageable) {
        model.addAttribute("page", new PageImpl<Trans>(Collections.emptyList(), pageable, 0));
        return "ssp_pages/Trans/list";
    }

    @PostMapping("/list")
    public String list(Model model, @RequestAttribute("auth") Auth auth,
                       @ModelAttribute TransQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(auth.getOrgId());
        Page<Trans> page = transService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/Trans/list";
    }

    @RequestMapping("/show")
    public String show(Model model, String traceNo) {
        model.addAttribute("model", transService.findOne(traceNo));
        return "ssp_pages/Trans/show";
    }
}
