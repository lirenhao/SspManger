package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.AppRole;
import com.yada.ssp.manager.svc.query.AppRoleQuery;
import com.yada.ssp.manager.svc.service.AppRoleService;
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
 * Created by bjy on 2018/8/1.
 * App角色Controller
 */
@Controller
@RequestMapping("/approle")
public class AppRoleController {
    private final AppRoleService appRoleService;

    @Autowired
    public AppRoleController(AppRoleService appRoleService) {
        this.appRoleService = appRoleService;
    }

    @RequestMapping("/list")
    public String list(Model model, @ModelAttribute AppRoleQuery query, @PageableDefault Pageable pageable) {
        Page page = appRoleService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/AppRole/list";
    }

    @RequestMapping("/create")
    public String create() {
        return "ssp_pages/AppRole/create";
    }

    @RequestMapping("/save")
    public String save(@ModelAttribute("model") AppRole appRole) {
        appRoleService.saveAndUpdate(appRole);
        return "redirect:list";
    }

    @RequestMapping("/show")
    public String show(Model model, String id) {
        model.addAttribute("model", appRoleService.findOne(id));
        return "ssp_pages/AppRole/show";
    }

    @RequestMapping("/edit")
    public String edit(Model model, String id) {
        model.addAttribute("model", appRoleService.findOne(id));
        return "ssp_pages/AppRole/edit1";
    }

    @ResponseBody
    @RequestMapping("/AJAX_findRole")
    public String AJAX_findRole(String id) {
        String mess = "*";
        if (appRoleService.exists(id)) {
            mess = "该角色已存在";
        }
        return mess;
    }
}
