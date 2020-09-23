package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.MerPolicy;
import com.yada.ssp.manager.svc.service.MerPolicyService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<MerPolicy> list() {
        return merPolicyService.findAll();
    }

    @PutMapping
    public void save(@RequestBody MerPolicy merPolicy) {
        merPolicyService.saveAndUpdate(merPolicy);
    }

    @GetMapping("/{id}")
    public MerPolicy show(@PathVariable String id) {
        return merPolicyService.findOne(id);
    }

    @GetMapping("/{id}/exists")
    public boolean exists(@PathVariable String id) {
        return merPolicyService.exists(id);
    }
}
