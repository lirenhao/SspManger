package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.Org;
import com.yada.ssp.manager.svc.service.OrgService;
import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.model.PospOrgTmk;
import com.yada.ssp.manager.svc.model.Terminal;
import com.yada.ssp.manager.svc.query.PospOrgTmkQuery;
import com.yada.ssp.manager.svc.query.TerminalQuery;
import com.yada.ssp.manager.svc.service.MerchantService;
import com.yada.ssp.manager.svc.service.PospOrgTmkService;
import com.yada.ssp.manager.svc.service.TerminalService;
import com.yada.ssp.manager.svc.util.PoiExcelUtil;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/pospOrgTmk")
public class PospOrgTmkController {

    private final PospOrgTmkService pospOrgTmkService;
    private final OrgService orgService;
    private final MerchantService merchantService;
    private final TerminalService terminalService;

    @Autowired
    public PospOrgTmkController(PospOrgTmkService pospOrgTmkService, OrgService orgService,
                                MerchantService merchantService, TerminalService terminalService) {
        this.pospOrgTmkService = pospOrgTmkService;
        this.orgService = orgService;
        this.merchantService = merchantService;
        this.terminalService = terminalService;
    }

    @RequestMapping("/list")
    public String list(Model model, @RequestAttribute("auth") Auth auth,
                       @ModelAttribute PospOrgTmkQuery query, @PageableDefault( sort = { "orgId", "terminalId", "tmkZmk" }) Pageable pageable) {
        List<Org> orgList = orgService.findSecondOrg(auth.getOrgId());
        model.addAttribute("orgList", orgList);

        List<Merchant> merList = merchantService.findByOrgId(auth.getOrgId());
        model.addAttribute("merList", merList);

        if ((null == query.getOrgId() || "".equals(query.getOrgId())) && auth.getOrgId().length() > 2) {
            query.setOrgId(auth.getOrgId());
        }
        if (query.getOrgId() == null) {
            query.setOrgId("");
        }
        Page<PospOrgTmk> page = pospOrgTmkService.findAll(query, pageable);
        model.addAttribute("page", page);
        model.addAttribute("query", query);

        model.addAttribute("total", pospOrgTmkService.total(query.getOrgId()));
        model.addAttribute("enable", pospOrgTmkService.enable(query.getOrgId()));
        model.addAttribute("unable", pospOrgTmkService.unable(query.getOrgId()));
        model.addAttribute("termNum", pospOrgTmkService.termNum(query.getOrgId()));;

        return "ssp_pages/PospOrgTmk/list";
    }

    @RequestMapping("/create")
    public String create(Model model, @RequestAttribute("auth") Auth auth) {
        List<Org> orgList = orgService.findSecondOrg(auth.getOrgId());
        model.addAttribute("orgList", orgList);
        return "ssp_pages/PospOrgTmk/create";
    }

    @RequestMapping("/save")
    public String save(@ModelAttribute("model") PospOrgTmk pospOrgTmk) {
        pospOrgTmkService.saveAndUpdate(pospOrgTmk);
        return "redirect:list";
    }

    @RequestMapping("/delete")
    public String delete(String orgId, String tmkZmk) {
        pospOrgTmkService.delete(orgId, tmkZmk);
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

    @RequestMapping("/upload")
    public String upload(Model model, @RequestAttribute("auth") Auth auth) {
        List<Org> orgList = orgService.findSecondOrg(auth.getOrgId());
        model.addAttribute("orgList", orgList);
        return "ssp_pages/PospOrgTmk/upload";
    }

    @RequestMapping("/result")
    public String result(Model model, String orgId, MultipartFile file) {
        try {
            List<PospOrgTmk> batch = new ArrayList<>();
            List<String[]> data = PoiExcelUtil.readExcelOneSheet(file, 5);
            if (data != null && data.size() > 0) {
                data.remove(0);
                data.forEach(tmk -> {
                    PospOrgTmk pospOrgTmk = new PospOrgTmk();
                    pospOrgTmk.setOrgId(orgId);
                    pospOrgTmk.setTmkWeb(tmk[1]);
                    pospOrgTmk.setTmkZmk(tmk[2]);
                    batch.add(pospOrgTmk);
                });
            }
            List<PospOrgTmk> exists = pospOrgTmkService.batchSave(batch);
            model.addAttribute("exists", exists);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "ssp_pages/PospOrgTmk/result";
    }
}
