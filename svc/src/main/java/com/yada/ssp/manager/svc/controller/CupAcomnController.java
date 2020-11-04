package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.CupAcomn;
import com.yada.ssp.manager.svc.query.CupAcomnQuery;
import com.yada.ssp.manager.svc.service.CupAcomnService;
import org.jxls.common.Context;
import org.jxls.util.JxlsHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/cupAcomn")
public class CupAcomnController {

    private final CupAcomnService cupAcomnService;
    private final ResourceLoader resourceLoader;

    @Autowired
    public CupAcomnController(CupAcomnService cupAcomnService, ResourceLoader resourceLoader) {
        this.cupAcomnService = cupAcomnService;
        this.resourceLoader = resourceLoader;
    }

    /**
     * TODO 查询时默认日期是昨天
     */
    @GetMapping
    public Page<CupAcomn> list(@AuthenticationPrincipal Jwt principal,
                       @ModelAttribute CupAcomnQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(principal.getClaimAsString("orgId"));
        query.setStatus("0");
        return cupAcomnService.findAll(query, pageable);
    }

    @GetMapping("/download")
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

    /**
     * 手工处理列表
     * TODO 查询时默认日期是昨天
     */
    @GetMapping("/handle")
    public Page<CupAcomn> handleList(@AuthenticationPrincipal Jwt principal,
                             @ModelAttribute CupAcomnQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(principal.getClaimAsString("orgId"));
        query.setStatus("2");
        return cupAcomnService.findAll(query, pageable);
    }

    @PutMapping("/{lsId}/handle")
    public void handle(@PathVariable String lsId) {
        cupAcomnService.handle(lsId);
    }
}
