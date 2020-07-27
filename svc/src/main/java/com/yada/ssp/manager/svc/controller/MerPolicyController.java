package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.MerPolicy;
import com.yada.ssp.manager.svc.service.MerPolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequestMapping("/merPolicy")
public class MerPolicyController {

    private final MerPolicyService merPolicyService;

    @Autowired
    public MerPolicyController(MerPolicyService merPolicyService) {
        this.merPolicyService = merPolicyService;
    }

    @RequestMapping("/list")
    public String list(Model model) {
        List<MerPolicy> page = merPolicyService.findAll();
        model.addAttribute("page", page);
        return "ssp_pages/MerPolicy/list";
    }

    @RequestMapping("/create")
    public String create() {
        return "ssp_pages/MerPolicy/create";
    }

    @RequestMapping("/save")
    public String save(@ModelAttribute("model") MerPolicy merPolicy) {
        merPolicyService.saveAndUpdate(merPolicy);
        return "redirect:list";
    }

    @RequestMapping("/edit")
    public String edit(Model model, String id) {
        model.addAttribute("model", merPolicyService.findOne(id));
        return "ssp_pages/MerPolicy/edit";
    }

    @RequestMapping("/show")
    public String show(Model model, String id) {
        model.addAttribute("model", merPolicyService.findOne(id));
        return "ssp_pages/MerPolicy/show";
    }

    @RequestMapping("/issue")
    public String issue(RedirectAttributes redirectAttributes, String id) {
        redirectAttributes.addFlashAttribute("message", merPolicyService.issue(id));
        return "redirect:list";
    }

    @ResponseBody
    @RequestMapping("/AJAX_findMerPolicy")
    public String AJAX_findMerPolicy(String id) {
        String mess = "*";
        if (merPolicyService.exists(id)) {
            mess = "该协议ID已存在";
        }
        return mess;
    }
}
