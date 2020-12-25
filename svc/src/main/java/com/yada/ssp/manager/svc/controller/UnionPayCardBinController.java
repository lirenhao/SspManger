package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.UnionPayCardBin;
import com.yada.ssp.manager.svc.query.UnionPayCardBinQuery;
import com.yada.ssp.manager.svc.service.UnionPayCardBinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

/**
 * 银联卡bin API
 */
@RestController
@RequestMapping("/cupCardBin")
public class UnionPayCardBinController {

    private final UnionPayCardBinService unionPayCardBinService;

    @Autowired
    public UnionPayCardBinController(UnionPayCardBinService unionPayCardBinService) {
        this.unionPayCardBinService = unionPayCardBinService;
    }

    @GetMapping
    @Secured(value = {"admin"})
    public Page<UnionPayCardBin> list(@ModelAttribute UnionPayCardBinQuery query, @PageableDefault Pageable pageable) {
        return unionPayCardBinService.findAll(query, pageable);
    }

    @PutMapping
    @Secured(value = {"admin"})
    public void save(@RequestBody UnionPayCardBin unionPayCardBin) {
        unionPayCardBinService.saveAndUpdate(unionPayCardBin);
    }

    @GetMapping("/{id}")
    @Secured(value = {"admin"})
    public UnionPayCardBin get(@PathVariable String id) {
        return unionPayCardBinService.findOne(id);
    }
}
