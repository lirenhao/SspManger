package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.Risk;
import com.yada.ssp.manager.svc.model.RiskList;
import com.yada.ssp.manager.svc.model.RiskTran;
import com.yada.ssp.manager.svc.query.RiskListQuery;
import com.yada.ssp.manager.svc.service.RiskListService;
import com.yada.ssp.manager.svc.service.RiskService;
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

@Controller
@RequestMapping("/riskList")
public class RiskListController {

    private final RiskService riskService;
    private final RiskListService riskListService;

    @Autowired
    public RiskListController(RiskService riskService, RiskListService riskListService) {
        this.riskService = riskService;
        this.riskListService = riskListService;
    }

    @RequestMapping("/list")
    public String list(Model model, @RequestAttribute("auth") Auth auth,
                       @ModelAttribute RiskListQuery query, @PageableDefault Pageable pageable) {
        List<Risk> riskList =  riskService.findAll();
        model.addAttribute("riskList", riskList);

        query.setOrgId(auth.getOrgId());
        Page<RiskList> page = riskListService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/RiskList/list";
    }

    @RequestMapping("/show")
    public String edit(Model model, String id) {
        RiskList riskList = riskListService.findOne(id);
        List<RiskTran> riskTrans = riskListService.findRiskTran(id);
        model.addAttribute("model", riskList);
        model.addAttribute("trans", riskTrans);
        return "ssp_pages/RiskList/show";
    }
}
