package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.HqReport;
import com.yada.ssp.manager.svc.service.HqReportService;
import com.yada.ssp.manager.svc.util.DateUtil;
import org.jxls.common.Context;
import org.jxls.util.JxlsHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/hqReport")
public class HqReportController {

    private final HqReportService hqReportService;
    private final ResourceLoader resourceLoader;

    @Autowired
    public HqReportController(HqReportService hqReportService, ResourceLoader resourceLoader) {
        this.hqReportService = hqReportService;
        this.resourceLoader = resourceLoader;
    }

    @GetMapping
    @Secured(value = {"admin","FinanceOperator","FinanceChecker","MerchantChecker","MerchantOperator"})
    public List<HqReport> list(@AuthenticationPrincipal Jwt principal, Integer year, String orgId) {
        return query(principal, year, orgId);
    }

    @GetMapping("/download")
    @Secured(value = {"admin","FinanceOperator","FinanceChecker","MerchantChecker","MerchantOperator"})
    public void download(@AuthenticationPrincipal Jwt principal, HttpServletResponse resp, Integer year, String orgId) {
        Context context = new Context();
        List<HqReport> page = query(principal, year, orgId);
        context.putVar("page", page);
        context.putVar("year", year);
        try {
            resp.setContentType("application/vnd.ms-excel;charset=UTF-8");
            resp.setHeader("Content-disposition",
                    "attachment;filename=\"" + "HQReport_" + year + ".xls" + "\"");
            InputStream in = resourceLoader.getResource("classpath:templates/hqReport.xls").getInputStream();
            JxlsHelper.getInstance().processTemplate(in, resp.getOutputStream(), context);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private List<HqReport> query(Jwt principal, Integer year, String orgId) {
        if (year == null) {
            year = Integer.parseInt(DateUtil.getCurYear());
        }
        if(orgId == null || !orgId.startsWith(principal.getClaimAsString("orgId"))) {
            orgId = principal.getClaimAsString("orgId");
        }
       return hqReportService.hqReport(year, orgId);
    }
}
