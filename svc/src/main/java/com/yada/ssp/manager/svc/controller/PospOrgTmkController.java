package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.PospOrgTmk;
import com.yada.ssp.manager.svc.query.PospOrgTmkQuery;
import com.yada.ssp.manager.svc.service.PospOrgTmkService;
import com.yada.ssp.manager.svc.util.PoiExcelUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/pospOrgTmk")
public class PospOrgTmkController {

    private final PospOrgTmkService pospOrgTmkService;

    @Autowired
    public PospOrgTmkController(PospOrgTmkService pospOrgTmkService) {
        this.pospOrgTmkService = pospOrgTmkService;
    }

    @GetMapping
    public Page<PospOrgTmk> list(@RequestAttribute("auth") Auth auth,
                                 @ModelAttribute PospOrgTmkQuery query, @PageableDefault(sort = {"orgId", "terminalId", "tmkZmk"}) Pageable pageable) {
        if ((null == query.getOrgId() || "".equals(query.getOrgId())) && auth.getOrgId().length() > 2) {
            query.setOrgId(auth.getOrgId());
        }
        if (query.getOrgId() == null) {
            query.setOrgId("");
        }
        // TODO 密钥数量提示
        // "total", pospOrgTmkService.total(query.getOrgId());
        // "enable", pospOrgTmkService.enable(query.getOrgId());
        // "unable", pospOrgTmkService.unable(query.getOrgId());
        // "termNum", pospOrgTmkService.termNum(query.getOrgId());
        return pospOrgTmkService.findAll(query, pageable);
    }

    @PostMapping
    public void save(@ModelAttribute PospOrgTmk pospOrgTmk) {
        pospOrgTmkService.saveAndUpdate(pospOrgTmk);
    }

    @DeleteMapping("/{orgId}/{tmkZmk}")
    public void delete(@PathVariable String orgId, @PathVariable String tmkZmk) {
        pospOrgTmkService.delete(orgId, tmkZmk);
    }

    @PostMapping("/upload")
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
