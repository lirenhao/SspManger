package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.PospOrgZmk;
import com.yada.ssp.manager.svc.query.PospOrgZmkQuery;
import com.yada.ssp.manager.svc.service.PospOrgZmkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pospOrgZmk")
public class PospOrgZmkController {

    private final PospOrgZmkService pospOrgZmkService;

    @Autowired
    public PospOrgZmkController(PospOrgZmkService pospOrgZmkService) {
        this.pospOrgZmkService = pospOrgZmkService;
    }

    @GetMapping
    public Page<PospOrgZmk> list(@RequestAttribute("auth") Auth auth,
                                 @ModelAttribute PospOrgZmkQuery query, @PageableDefault Pageable pageable) {
        if ((null == query.getOrgId() || "".equals(query.getOrgId())) && auth.getOrgId().length() > 2) {
            query.setOrgId(auth.getOrgId());
        }
        return pospOrgZmkService.findAll(query, pageable);
    }

    @PostMapping
    public void save(@RequestBody PospOrgZmk pospOrgZmk) {
        pospOrgZmkService.saveAndUpdate(pospOrgZmk);
    }

    @PutMapping
    public void update(PospOrgZmk merLimit) {
        pospOrgZmkService.saveAndUpdate(merLimit);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        pospOrgZmkService.delete(id);
    }
}
