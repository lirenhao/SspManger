package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.PospOrgTmk;
import com.yada.ssp.manager.svc.query.PospOrgTmkQuery;
import com.yada.ssp.manager.svc.service.PospOrgTmkService;
import com.yada.ssp.manager.svc.util.PoiExcelUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pospOrgTmk")
public class PospOrgTmkController {

    private final PospOrgTmkService pospOrgTmkService;

    @Autowired
    public PospOrgTmkController(PospOrgTmkService pospOrgTmkService) {
        this.pospOrgTmkService = pospOrgTmkService;
    }

    @GetMapping
    @Secured(value = {"admin","MerchantChecker"})
    public Page<PospOrgTmk> list(@AuthenticationPrincipal Jwt principal,
                                 @ModelAttribute PospOrgTmkQuery query, @PageableDefault(sort = {"orgId", "terminalId", "tmkZmk"}) Pageable pageable) {
        if ((null == query.getOrgId() || "".equals(query.getOrgId())) && principal.getClaimAsString("orgId").length() > 2) {
            query.setOrgId(principal.getClaimAsString("orgId"));
        }
        if (query.getOrgId() == null) {
            query.setOrgId("");
        }
        return pospOrgTmkService.findAll(query, pageable);
    }

    @PostMapping
    @Secured(value = {"admin","MerchantChecker"})
    public void save(@RequestBody PospOrgTmk pospOrgTmk) {
        pospOrgTmkService.saveAndUpdate(pospOrgTmk);
    }

    /**
     * 密钥数量提示
     */
    @GetMapping("/scalar")
    @Secured(value = {"admin","MerchantChecker"})
    public Map<String, Integer> scalar(@AuthenticationPrincipal Jwt principal) {
        Map<String, Integer> result = new HashMap<>();
        result.put("total", pospOrgTmkService.total(principal.getClaimAsString("orgId")));
        result.put("enable", pospOrgTmkService.enable(principal.getClaimAsString("orgId")));
        result.put("unable", pospOrgTmkService.unable(principal.getClaimAsString("orgId")));
        result.put("termNum", pospOrgTmkService.termNum(principal.getClaimAsString("orgId")));
        return result;
    }

    @DeleteMapping("/{orgId}/{tmkZmk}")
    @Secured(value = {"admin","MerchantChecker"})
    public void delete(@PathVariable String orgId, @PathVariable String tmkZmk) {
        pospOrgTmkService.delete(orgId, tmkZmk);
    }

    @PostMapping("/upload")
    @Secured(value = {"admin","MerchantChecker"})
    public List<PospOrgTmk> upload(String orgId, MultipartFile file) throws IOException {
        List<PospOrgTmk> batch = new ArrayList<>();
        List<String[]> data = PoiExcelUtil.readExcelOneSheet(file, 5);
        if (data != null && data.size() > 0) {
            data.remove(0);
            data.forEach(tmk -> {
                PospOrgTmk pospOrgTmk = new PospOrgTmk();
                pospOrgTmk.setOrgId(orgId);
                pospOrgTmk.setTmkWeb(tmk[1]);
                pospOrgTmk.setTmkZmk(tmk[2]);
                batch.add(pospOrgTmk);
            });
        }
        return pospOrgTmkService.batchSave(batch);
    }
}
