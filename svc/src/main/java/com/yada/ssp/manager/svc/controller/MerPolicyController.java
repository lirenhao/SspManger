package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.MerPolicy;
import com.yada.ssp.manager.svc.service.MerPolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/merPolicy")
public class MerPolicyController {

    private final MerPolicyService merPolicyService;

    @Autowired
    public MerPolicyController(MerPolicyService merPolicyService) {
        this.merPolicyService = merPolicyService;
    }

    @GetMapping
    @Secured(value = {"admin"})
    public List<MerPolicy> list() {
        return merPolicyService.findAll();
    }

    @PutMapping
    @Secured(value = {"admin"})
    public void save(@RequestBody MerPolicy merPolicy) {
        merPolicyService.saveAndUpdate(merPolicy);
    }

    @GetMapping("/{id}")
    @Secured(value = {"admin"})
    public MerPolicy show(@PathVariable String id) {
        return merPolicyService.findOne(id);
    }

    @GetMapping("/{id}/exists")
    @Secured(value = {"admin"})
    public boolean exists(@PathVariable String id) {
        return merPolicyService.exists(id);
    }
}
