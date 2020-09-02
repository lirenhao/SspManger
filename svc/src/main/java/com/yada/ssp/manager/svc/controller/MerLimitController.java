package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.MerLimit;
import com.yada.ssp.manager.svc.query.MerLimitQuery;
import com.yada.ssp.manager.svc.service.MerLimitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/merLimit")
public class MerLimitController {

    private final MerLimitService merLimitService;

    @Autowired
    public MerLimitController(MerLimitService merLimitService) {
        this.merLimitService = merLimitService;
    }

    @GetMapping
    public Page<MerLimit> list(@RequestAttribute("auth") Auth auth,
                               @ModelAttribute MerLimitQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(auth.getOrgId());
        return merLimitService.findAll(query, pageable);
    }

    @PostMapping
    public void save(@RequestBody MerLimit merLimit) {
        merLimitService.saveAndUpdate(merLimit);
    }

    @PutMapping
    public void update(@RequestBody MerLimit merLimit) {
        merLimitService.saveAndUpdate(merLimit);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        merLimitService.delete(id);
    }
}
