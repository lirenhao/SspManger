package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.Org;
import com.yada.ssp.manager.svc.service.OrgService;
import com.yada.ssp.manager.svc.model.Terminal;
import com.yada.ssp.manager.svc.model.TerminalPK;
import com.yada.ssp.manager.svc.query.TerminalQuery;
import com.yada.ssp.manager.svc.service.TerminalService;
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

/**
 * Created by bjy on 2018/9/4.
 * 终端Controller
 */
@Controller
@RequestMapping("/terminal")
public class TerminalController {
    private final TerminalService terminalService;
    private final OrgService orgService;

    @Autowired
    public TerminalController(TerminalService terminalService, OrgService orgService) {
        this.terminalService = terminalService;
        this.orgService = orgService;
    }

    @RequestMapping("/list")
    public String list(Model model, @RequestAttribute("auth") Auth auth,
                       @ModelAttribute TerminalQuery query, @PageableDefault Pageable pageable) {
        if (null == query.getOrgId() || "".equals(query.getOrgId())) {
            query.setOrgId(auth.getOrgId());
        }
        Page<Terminal> page = terminalService.findAll(query, pageable);
        List<Org> orgList = orgService.findByOrgIdStartingWithList(auth.getOrgId());
        model.addAttribute("orgList", orgList);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/Terminal/list";
    }

    @RequestMapping("/show")
    public String show(Model model, String terminalId, String merchantId) {
        Terminal terminal = terminalService.findOne(new TerminalPK(terminalId, merchantId));
        model.addAttribute("model", terminal);
        return "ssp_pages/Terminal/show";
    }
}
