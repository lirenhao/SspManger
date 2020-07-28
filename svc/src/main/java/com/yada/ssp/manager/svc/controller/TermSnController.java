package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.TermSn;
import com.yada.ssp.manager.svc.query.TermSnQuery;
import com.yada.ssp.manager.svc.service.TermSnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/termSn")
public class TermSnController {

    private final TermSnService termSnService;

    @Autowired
    public TermSnController(TermSnService termSnService) {
        this.termSnService = termSnService;
    }

    @GetMapping
    public Page<TermSn> list(@RequestAttribute("auth") Auth auth,
                             @ModelAttribute TermSnQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(auth.getOrgId());
        return termSnService.findAll(query, pageable);
    }

    @DeleteMapping("/{vendorId}/{snNo}")
    public String delete(@PathVariable String vendorId, @PathVariable String snNo) {
        termSnService.delete(vendorId, snNo);
        return "redirect:list";
    }
}
