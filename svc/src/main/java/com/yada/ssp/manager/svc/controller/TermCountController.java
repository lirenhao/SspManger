package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
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
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Controller
@RequestMapping("/termCount")
public class TermCountController {

    private final TermCountService termCountService;
    private final ResourceLoader resourceLoader;

    @Autowired
    public TermCountController(TermCountService termCountService, ResourceLoader resourceLoader) {
        this.termCountService = termCountService;
        this.resourceLoader = resourceLoader;
    }

    @RequestMapping("/list")
    public String list(Model model, @RequestAttribute("auth") Auth auth,
                       String month, @PageableDefault Pageable pageable) {
        if(null == month || "".equals(month) || DateUtil.getCurMonth().equals(month)) {
            Page<TermCountCur> page = termCountService.findCurMonth(auth.getOrgId(), pageable);
            model.addAttribute("page", page);
            model.addAttribute("month", DateUtil.getCurMonth());
        } else {
            Page<TermCountHis> page = termCountService.findHis(month, auth.getOrgId(), pageable);
            model.addAttribute("page", page);
            model.addAttribute("month", month);
        }
        return "ssp_pages/TermCount/list";
    }

    @RequestMapping("/download")
    public void download(@RequestAttribute("auth") Auth auth, String month, HttpServletResponse resp) {
        Context context = new Context();
        if(null == month || "".equals(month) || DateUtil.getCurMonth().equals(month)) {
            List<TermCountCur> page = termCountService.findCurMonth(auth.getOrgId());
            context.putVar("page", page);
            context.putVar("month", DateUtil.getCurMonth());
        } else {
            List<TermCountHis> page = termCountService.findHis(month, auth.getOrgId());
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
