package com.yada.ssp.manager.svc.controller;

import com.yada.security.model.Org;
import com.yada.security.service.OrgService;
import com.yada.ssp.manager.svc.model.PospOrgZmk;
import com.yada.ssp.manager.svc.query.PospOrgZmkQuery;
import com.yada.ssp.manager.svc.service.PospOrgZmkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/pospOrgZmk")
public class PospOrgZmkController extends BaseController {

    private final PospOrgZmkService pospOrgZmkService;
    private final OrgService orgService;

    @Autowired
    public PospOrgZmkController(PospOrgZmkService pospOrgZmkService, OrgService orgService) {
        this.pospOrgZmkService = pospOrgZmkService;
        this.orgService = orgService;
    }

    @RequestMapping("/list")
    public String list(Model model, @ModelAttribute PospOrgZmkQuery query, @PageableDefault Pageable pageable) {

        List<Org> orgList = orgService.findSecondOrg(getCurUser().getOrg().getOrgId());
        model.addAttribute("orgList", orgList);

        if ((null == query.getOrgId() || "".equals(query.getOrgId())) && getCurUser().getOrg().getOrgId().length() > 2) {
            query.setOrgId(getCurUser().getOrg().getOrgId());
        }
        Page<PospOrgZmk> page = pospOrgZmkService.findAll(query, pageable);
        model.addAttribute("page", page);
        model.addAttribute("query", query);

        return "ssp_pages/PospOrgZmk/list";
    }

    @RequestMapping("/create")
    public String create(Model model) {
        List<String> limitOrgList = pospOrgZmkService.findAllOrgId();
        List<Org> orgList = orgService.findSecondOrg(getCurUser().getOrg().getOrgId())
                .stream().filter(item -> !limitOrgList.contains(item.getOrgId())).collect(Collectors.toList());
        model.addAttribute("orgList", orgList);
        return "ssp_pages/PospOrgZmk/create";
    }

    @RequestMapping("/save")
    public String save(@ModelAttribute("model") PospOrgZmk pospOrgZmk) {
        pospOrgZmkService.saveAndUpdate(pospOrgZmk);
        return "redirect:list";
    }

    @RequestMapping("/edit")
    public String edit(Model model, String id) {
        PospOrgZmk pospOrgZmk = pospOrgZmkService.findOne(id);
        model.addAttribute("model", pospOrgZmk);
        return "ssp_pages/PospOrgZmk/edit";
    }

    @RequestMapping("/update")
    public String update(@ModelAttribute("model") PospOrgZmk merLimit) {
        pospOrgZmkService.saveAndUpdate(merLimit);
        return "redirect:list";
    }

    @RequestMapping("/delete")
    public String delete(String id) {
        pospOrgZmkService.delete(id);
        return "redirect:list";
    }
}
