package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.CupqrcSettle;
import com.yada.ssp.manager.svc.query.CupqrcSettleQuery;
import com.yada.ssp.manager.svc.service.CupqrcSettleService;
import org.jxls.common.Context;
import org.jxls.util.JxlsHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/cupqrcSettle")
public class CupqrcSettleController {

    private final CupqrcSettleService cupqrcSettleService;
    private final ResourceLoader resourceLoader;

    @Autowired
    public CupqrcSettleController(CupqrcSettleService cupqrcSettleService, ResourceLoader resourceLoader) {
        this.cupqrcSettleService = cupqrcSettleService;
        this.resourceLoader = resourceLoader;
    }

    /**
     * TODO 查询时默认日期是昨天
     */
    @GetMapping
    public Page<CupqrcSettle> list(@RequestAttribute("auth") Auth auth,
                                   @ModelAttribute CupqrcSettleQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(auth.getOrgId());
        query.setStatus("0");
        return cupqrcSettleService.findAll(query, pageable);
    }

    @GetMapping("/download")
    public void download(@RequestAttribute("auth") Auth auth,
                         @ModelAttribute CupqrcSettleQuery query, HttpServletResponse resp) {
        query.setOrgId(auth.getOrgId());
        query.setStatus("0");
        List<CupqrcSettle> page = cupqrcSettleService.findAll(query);
        Context context = new Context();
        context.putVar("page", page);
        context.putVar("merchantId", query.getMerchantId());
        context.putVar("settleDate", query.getSettleDate());
        try {
            resp.setContentType("application/vnd.ms-excel;charset=UTF-8");
            resp.setHeader("Content-disposition",
                    "attachment;filename=\"" + "CUPQRC_SETTLE.xls" + "\"");
            InputStream in = resourceLoader.getResource("classpath:templates/cupqrcSettle.xls").getInputStream();
            JxlsHelper.getInstance().processTemplate(in, resp.getOutputStream(), context);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * TODO 查询时默认日期是昨天
     */
    @GetMapping("/handle")
    public Page<CupqrcSettle> handleList(@RequestAttribute("auth") Auth auth,
                                         @ModelAttribute CupqrcSettleQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(auth.getOrgId());
        query.setStatus("2");
        return cupqrcSettleService.findAll(query, pageable);
    }

    @GetMapping("/{lsId}/handle")
    public void handle(@PathVariable String lsId) {
        cupqrcSettleService.handle(lsId);
    }
}
