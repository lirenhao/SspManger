package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.MerSettle;
import com.yada.ssp.manager.svc.model.SettleDetail;
import com.yada.ssp.manager.svc.query.MerSettleQuery;
import com.yada.ssp.manager.svc.query.SettleDetailQuery;
import com.yada.ssp.manager.svc.service.MerSettleService;
import com.yada.ssp.manager.svc.service.SettleDetailService;
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
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/settleDetail")
public class SettleDetailController {

    private final SettleDetailService settleDetailService;
    private final MerSettleService merSettleService;
    private final ResourceLoader resourceLoader;

    @Autowired
    public SettleDetailController(SettleDetailService settleDetailService, MerSettleService merSettleService,
                                  ResourceLoader resourceLoader) {
        this.settleDetailService = settleDetailService;
        this.merSettleService = merSettleService;
        this.resourceLoader = resourceLoader;
    }

    @GetMapping
    public Page<SettleDetail> list(@AuthenticationPrincipal Jwt principal,
                                   @ModelAttribute SettleDetailQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(principal.getClaimAsString("orgId"));
        return settleDetailService.findAll(query, pageable);
    }

    @GetMapping("/download")
    public void list(@AuthenticationPrincipal Jwt principal,
                     @ModelAttribute SettleDetailQuery query, HttpServletResponse resp) {
        query.setOrgId(principal.getClaimAsString("orgId"));
        List<SettleDetail> page = settleDetailService.findAll(query);
        Context context = new Context();
        context.putVar("page", page);
        context.putVar("query", query);

        MerSettleQuery merSettleQuery = new MerSettleQuery();
        merSettleQuery.setMerchantId(query.getMerchantId());
        merSettleQuery.setSettleStartDate(query.getSettleStartDate());
        merSettleQuery.setSettleEndDate(query.getSettleEndDate());
        merSettleQuery.setOrgId(principal.getClaimAsString("orgId"));
        List<MerSettle> list = merSettleService.findAll(merSettleQuery);
        if (list.size() > 0) {
            context.putVar("total", list.get(0));
        } else {
            context.putVar("total", new MerSettle());
        }
        context.putVar("totalCount", page.size());
        BigDecimal totalAmt = list.stream().map(MerSettle::getSettleAmt).reduce(new BigDecimal(0), BigDecimal::add);
        context.putVar("totalAmt", totalAmt.toString());
        try {
            resp.setContentType("application/vnd.ms-excel;charset=UTF-8");
            resp.setHeader("Content-disposition",
                    "attachment;filename=\"MER_SETTLE_DETAIL" + DateUtil.getCurDate() + ".xls" + "\"");
            InputStream in = resourceLoader.getResource("classpath:templates/merSettleDetail.xls").getInputStream();
            JxlsHelper.getInstance().processTemplate(in, resp.getOutputStream(), context);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
