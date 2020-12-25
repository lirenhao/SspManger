package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.Risk;
import com.yada.ssp.manager.svc.service.RiskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/risk")
public class RiskController {

    private final RiskService riskService;

    @Autowired
    public RiskController(RiskService riskService) {
        this.riskService = riskService;
    }

    @GetMapping
    @Secured(value = {"admin","RiskOperator"})
    public List<Risk> list() {
        return riskService.findAll();
    }

    @PutMapping
    @Secured(value = {"admin","RiskOperator"})
    public void update(@RequestBody Risk risk) {
        riskService.update(risk);
    }
}
