package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.MerSettle;
import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.query.MerSettleQuery;
import com.yada.ssp.manager.svc.service.MerSettleService;
import com.yada.ssp.manager.svc.service.MerchantService;
import com.yada.ssp.manager.svc.util.DateUtil;
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
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Controller
@RequestMapping("/merSettle")
public class MerSettleController {

    private final MerSettleService merSettleService;
    private final MerchantService merchantService;
    private final ResourceLoader resourceLoader;

    @Autowired
    public MerSettleController(MerSettleService merSettleService, MerchantService merchantService, ResourceLoader resourceLoader) {
        this.merSettleService = merSettleService;
        this.merchantService = merchantService;
        this.resourceLoader = resourceLoader;
    }

    @RequestMapping("/list")
    public String list(Model model, @RequestAttribute("auth") Auth auth,
                       @ModelAttribute MerSettleQuery query, @PageableDefault Pageable pageable) {
        query(model, auth, query, pageable);
        return "ssp_pages/MerSettle/list";
    }

    @RequestMapping("/listLoad")
    public void list(@ModelAttribute MerSettleQuery query, HttpServletResponse resp) {
        download(query, resp, "merSettle.xls", "MER_SETTLE");
    }

    @RequestMapping("/success")
    public String success(Model model, @RequestAttribute("auth") Auth auth,
                          @ModelAttribute MerSettleQuery query, @PageableDefault Pageable pageable) {
        query.setStatus("1");
        query(model, auth, query, pageable);
        return "ssp_pages/MerSettle/success";
    }

    @RequestMapping("/successLoad")
    public void success(@ModelAttribute MerSettleQuery query, HttpServletResponse resp) {
        query.setStatus("1");
        download(query, resp, "merSettleSuccess.xls", "MER_SETTLE_SUCCESS");
    }

    @RequestMapping("/failure")
    public String failure(Model model, @RequestAttribute("auth") Auth auth,
                          @ModelAttribute MerSettleQuery query, @PageableDefault Pageable pageable) {
        query.setStatus("2");
        query(model, auth, query, pageable);
        return "ssp_pages/MerSettle/failure";
    }

    @RequestMapping("/failureLoad")
    public void failure(@ModelAttribute MerSettleQuery query, HttpServletResponse resp) {
        query.setStatus("2");
        download(query, resp, "merSettleFailure.xls", "MER_SETTLE_FAILURE");
    }

    private void query(Model model, Auth auth, MerSettleQuery query, Pageable pageable) {
        query.setOrgId(auth.getOrgId());
        Page<MerSettle> page = merSettleService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);

        List<Merchant> merchantList = merchantService.findByOrgId(auth.getOrgId());
        model.addAttribute("merchantList", merchantList);
    }

    private void download(MerSettleQuery query, HttpServletResponse resp, String templateName, String targetName) {
        List<MerSettle> page = merSettleService.findAll(query);
        Context context = new Context();
        context.putVar("page", page);
        context.putVar("merchantId", query.getMerchantId());
        context.putVar("settleDate", query.getSettleStartDate() + "->" + query.getSettleEndDate());
        try {
            resp.setContentType("application/vnd.ms-excel;charset=UTF-8");
            resp.setHeader("Content-disposition",
                    "attachment;filename=\"" + targetName + DateUtil.getCurDate() + ".xls" + "\"");
            InputStream in = resourceLoader.getResource("classpath:templates/" + templateName).getInputStream();
            JxlsHelper.getInstance().processTemplate(in, resp.getOutputStream(), context);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
