package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.HqReport;
import com.yada.ssp.manager.svc.service.HqReportService;
import com.yada.ssp.manager.svc.util.DateUtil;
import org.jxls.common.Context;
import org.jxls.util.JxlsHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
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
    public List<HqReport> list(@RequestAttribute("auth") Auth auth, Integer year, String orgId) {
        return query(auth, year, orgId);
    }

    @GetMapping("/download")
    public void download(@RequestAttribute("auth") Auth auth, HttpServletResponse resp, Integer year, String orgId) {
        Context context = new Context();
        List<HqReport> page = query(auth, year, orgId);
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

    private List<HqReport> query(Auth auth, Integer year, String orgId) {
        if (year == null) {
            year = Integer.parseInt(DateUtil.getCurYear());
        }
        if(orgId == null || !orgId.startsWith(auth.getOrgId())) {
            orgId = auth.getOrgId();
        }
       return hqReportService.hqReport(year, orgId);
    }
}
