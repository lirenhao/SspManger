package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.MerSettle;
import com.yada.ssp.manager.svc.query.MerSettleQuery;
import com.yada.ssp.manager.svc.service.MerSettleService;
import com.yada.ssp.manager.svc.util.DateUtil;
import org.jxls.common.Context;
import org.jxls.util.JxlsHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/merSettle")
public class MerSettleController {

    private final MerSettleService merSettleService;
    private final ResourceLoader resourceLoader;

    @Autowired
    public MerSettleController(MerSettleService merSettleService, ResourceLoader resourceLoader) {
        this.merSettleService = merSettleService;
        this.resourceLoader = resourceLoader;
    }

    @GetMapping
    public Page<MerSettle> list(@AuthenticationPrincipal Jwt principal,
                                @ModelAttribute MerSettleQuery query, @PageableDefault Pageable pageable) {
        return query(principal, query, pageable);
    }

    @GetMapping("/download")
    public void list(@ModelAttribute MerSettleQuery query, HttpServletResponse resp) {
        download(query, resp, "merSettle.xls", "MER_SETTLE");
    }

    @GetMapping("/success")
    public Page<MerSettle> success(@AuthenticationPrincipal Jwt principal,
                                   @ModelAttribute MerSettleQuery query, @PageableDefault Pageable pageable) {
        query.setStatus("1");
        return query(principal, query, pageable);
    }

    @GetMapping("/success/download")
    public void success(@ModelAttribute MerSettleQuery query, HttpServletResponse resp) {
        query.setStatus("1");
        download(query, resp, "merSettleSuccess.xls", "MER_SETTLE_SUCCESS");
    }

    @GetMapping("/failure")
    public Page<MerSettle> failure(@AuthenticationPrincipal Jwt principal,
                                   @ModelAttribute MerSettleQuery query, @PageableDefault Pageable pageable) {
        query.setStatus("2");
        return query(principal, query, pageable);
    }

    @GetMapping("/failure/download")
    public void failure(@ModelAttribute MerSettleQuery query, HttpServletResponse resp) {
        query.setStatus("2");
        download(query, resp, "merSettleFailure.xls", "MER_SETTLE_FAILURE");
    }

    private Page<MerSettle> query(Jwt principal, MerSettleQuery query, Pageable pageable) {
        query.setOrgId(principal.getClaimAsString("orgId"));
        return merSettleService.findAll(query, pageable);
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
