package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.CupAcomn;
import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.query.CupAcomnQuery;
import com.yada.ssp.manager.svc.service.CupAcomnService;
import com.yada.ssp.manager.svc.service.MerchantService;
import com.yada.util.DateUtil;
import org.jxls.common.Context;
import org.jxls.util.JxlsHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Controller
@RequestMapping("/cupAcomn")
public class CupAcomnController extends BaseController {

    private final CupAcomnService cupAcomnService;
    private final MerchantService merchantService;
    private final ResourceLoader resourceLoader;

    @Autowired
    public CupAcomnController(CupAcomnService cupAcomnService, MerchantService merchantService, ResourceLoader resourceLoader) {
        this.cupAcomnService = cupAcomnService;
        this.merchantService = merchantService;
        this.resourceLoader = resourceLoader;
    }

    @RequestMapping("/list")
    public String list(Model model, @ModelAttribute CupAcomnQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(getCurUser().getOrg().getOrgId());
        if (query.getSettleDate() == null || "".equals(query.getSettleDate())) {
            query.setSettleDate(DateUtil.getYesterday());
        }
        query.setStatus("0");
        Page<CupAcomn> page = cupAcomnService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);

        List<Merchant> merchantList = merchantService.findByOrgId(getCurUser().getOrg().getOrgId());
        model.addAttribute("merchantList", merchantList);

        return "ssp_pages/CupAcomn/list";
    }

    @RequestMapping("/download")
    public void download(@ModelAttribute CupAcomnQuery query, HttpServletResponse resp) {
        query.setStatus("0");
        List<CupAcomn> page = cupAcomnService.findAll(query);
        Context context = new Context();
        context.putVar("page", page);
        context.putVar("merchantId", query.getMerchantId());
        context.putVar("settleDate", query.getSettleDate());
        try {
            resp.setContentType("application/vnd.ms-excel;charset=UTF-8");
            resp.setHeader("Content-disposition",
                    "attachment;filename=\"" + "CUP_ACOMN.xls" + "\"");
            InputStream in = resourceLoader.getResource("classpath:templates/cupAcomn.xls").getInputStream();
            JxlsHelper.getInstance().processTemplate(in, resp.getOutputStream(), context);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/handle")
    public String handle(String lsId, RedirectAttributes redirectAttrs) {
        cupAcomnService.handle(lsId);
        redirectAttrs.addFlashAttribute("message", "Transaction is Handled!");
        return "redirect:list";
    }

    @RequestMapping("/handleList")
    public String handleList(Model model, @ModelAttribute CupAcomnQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(getCurUser().getOrg().getOrgId());
        if (query.getSettleDate() == null || "".equals(query.getSettleDate())) {
            query.setSettleDate(DateUtil.getYesterday());
        }
        query.setStatus("2");

        Page<CupAcomn> page = cupAcomnService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);

        List<Merchant> merchantList = merchantService.findByOrgId(getCurUser().getOrg().getOrgId());
        model.addAttribute("merchantList", merchantList);

        return "ssp_pages/CupAcomn/handleList";
    }
}
