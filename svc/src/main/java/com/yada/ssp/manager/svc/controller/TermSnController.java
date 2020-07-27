package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.MerApiOrg;
import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.model.TermSn;
import com.yada.ssp.manager.svc.model.Terminal;
import com.yada.ssp.manager.svc.query.TermSnQuery;
import com.yada.ssp.manager.svc.query.TerminalQuery;
import com.yada.ssp.manager.svc.service.MerApiOrgService;
import com.yada.ssp.manager.svc.service.MerchantService;
import com.yada.ssp.manager.svc.service.TermSnService;
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
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/termSn")
public class TermSnController {

    private final TermSnService termSnService;
    private final MerApiOrgService orgService;
    private final MerchantService merchantService;
    private final TerminalService terminalService;

    @Autowired
    public TermSnController(TermSnService termSnService, MerApiOrgService orgService,
                            MerchantService merchantService, TerminalService terminalService) {
        this.termSnService = termSnService;
        this.orgService = orgService;
        this.merchantService = merchantService;
        this.terminalService = terminalService;
    }

    @RequestMapping("/list")
    public String list(Model model, @RequestAttribute("auth") Auth auth,
                       @ModelAttribute TermSnQuery query, @PageableDefault Pageable pageable) {
        List<MerApiOrg> orgList = orgService.findAll();
        model.addAttribute("orgList", orgList);

        List<Merchant> merList = merchantService.findByOrgId(auth.getOrgId());
        model.addAttribute("merList", merList);

        TerminalQuery termQuery = new TerminalQuery();
        termQuery.setOrgId(auth.getOrgId());
        termQuery.setMerchantId(query.getMerchantId());
        List<Terminal> termList = terminalService.findAll(termQuery);
        model.addAttribute("termList", termList);

        query.setOrgId(auth.getOrgId());
        Page<TermSn> page = termSnService.findAll(query, pageable);
        model.addAttribute("page", page);
        model.addAttribute("query", query);

        return "ssp_pages/TermSn/list";
    }

    @RequestMapping("/delete")
    public String delete(String vendorId, String snNo) {
        termSnService.delete(vendorId, snNo);
        return "redirect:list";
    }

    @ResponseBody
    @RequestMapping("/AJAX_findTerminal")
    public List<Terminal> AJAX_findTerminal(@RequestAttribute("auth") Auth auth, String merchantId) {
        TerminalQuery query = new TerminalQuery();
        query.setOrgId(auth.getOrgId());
        query.setMerchantId(merchantId);
        return terminalService.findAll(query);
    }
}
