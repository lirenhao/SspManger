package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.Terminal;
import com.yada.ssp.manager.svc.model.TerminalPK;
import com.yada.ssp.manager.svc.query.TerminalQuery;
import com.yada.ssp.manager.svc.service.TerminalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 终端API
 */
@RestController
@RequestMapping("/terminal")
public class TerminalController {

    private final TerminalService terminalService;

    @Autowired
    public TerminalController(TerminalService terminalService) {
        this.terminalService = terminalService;
    }

    @GetMapping
    public Page<Terminal> list(@RequestAttribute("auth") Auth auth,
                               @ModelAttribute TerminalQuery query, @PageableDefault Pageable pageable) {
        if (null == query.getOrgId() || "".equals(query.getOrgId())) {
            query.setOrgId(auth.getOrgId());
        }
        return terminalService.findAll(query, pageable);
    }

    @GetMapping("/{merchantId}")
    public List<Terminal> getByMerNo(@RequestAttribute("auth") Auth auth, @PathVariable String merchantId) {
        TerminalQuery query = new TerminalQuery();
        query.setOrgId(auth.getOrgId());
        query.setMerchantId(merchantId);
        return terminalService.findAll(query);
    }

    @GetMapping("/{merchantId}/{terminalId}")
    public Terminal get(@PathVariable String terminalId, @PathVariable String merchantId) {
        return terminalService.findOne(new TerminalPK(terminalId, merchantId));
    }
}
