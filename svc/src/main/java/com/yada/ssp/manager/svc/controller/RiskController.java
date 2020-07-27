package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.Risk;
import com.yada.ssp.manager.svc.service.RiskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/risk")
public class RiskController {

    private final RiskService riskService;

    @Autowired
    public RiskController(RiskService riskService) {
        this.riskService = riskService;
    }

    @RequestMapping("/list")
    public String list(Model model) {
        List<Risk> page = riskService.findAll();
        model.addAttribute("page", page);
        return "ssp_pages/Risk/list";
    }

    @RequestMapping("/edit")
    public String edit(Model model, String id) {
        Risk risk = riskService.findOne(id);
        model.addAttribute("model", risk);
        return "ssp_pages/Risk/edit";
    }

    @RequestMapping("/update")
    public String update(@ModelAttribute("model") Risk risk) {
        riskService.update(risk);
        return "redirect:list";
    }
}
