package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.TermCountCur;
import com.yada.ssp.manager.svc.model.TermCountHis;
import com.yada.ssp.manager.svc.service.TermCountService;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/termCount")
public class TermCountController {

    private final TermCountService termCountService;
    private final ResourceLoader resourceLoader;

    @Autowired
    public TermCountController(TermCountService termCountService, ResourceLoader resourceLoader) {
        this.termCountService = termCountService;
        this.resourceLoader = resourceLoader;
    }

    @GetMapping
    public Page list(@AuthenticationPrincipal Jwt principal, String month, @PageableDefault Pageable pageable) {
        if (null == month || "".equals(month) || DateUtil.getCurMonth().equals(month)) {
            return termCountService.findCurMonth(principal.getClaimAsString("orgId"), pageable);
        } else {
            return termCountService.findHis(month, principal.getClaimAsString("orgId"), pageable);
        }
    }

    @GetMapping("/download")
    public void download(@AuthenticationPrincipal Jwt principal, String month, HttpServletResponse resp) {
        Context context = new Context();
        if (null == month || "".equals(month) || DateUtil.getCurMonth().equals(month)) {
            List<TermCountCur> page = termCountService.findCurMonth(principal.getClaimAsString("orgId"));
            context.putVar("page", page);
            context.putVar("month", DateUtil.getCurMonth());
        } else {
            List<TermCountHis> page = termCountService.findHis(month, principal.getClaimAsString("orgId"));
            context.putVar("page", page);
            context.putVar("month", month);
        }
        try {
            resp.setContentType("application/vnd.ms-excel;charset=UTF-8");
            resp.setHeader("Content-disposition",
                    "attachment;filename=\"" + "TERMINAL_" + month + ".xls" + "\"");
            InputStream in = resourceLoader.getResource("classpath:templates/termCount.xls").getInputStream();
            JxlsHelper.getInstance().processTemplate(in, resp.getOutputStream(), context);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
