package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.Mcc;
import com.yada.ssp.manager.svc.query.MccQuery;
import com.yada.ssp.manager.svc.service.MccService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

/**
 * MCC Code API
 */
@RestController
@RequestMapping("/mccCode")
public class MccController {

    private final MccService mccService;

    @Autowired
    public MccController(MccService mccService) {
        this.mccService = mccService;
    }

    @GetMapping
    public Page<Mcc> list(@ModelAttribute MccQuery query, @PageableDefault Pageable pageable) {
        return mccService.findAll(query, pageable);
    }

    @PutMapping
    public void save(@RequestBody Mcc mcc) {
        mccService.saveAndUpdate(mcc);
    }

    @GetMapping("/{id}")
    public Mcc get(@PathVariable String id) {
        return mccService.findOne(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        mccService.deleteMcc(id);
    }

    @GetMapping("/{id}/exists")
    public boolean exists(@PathVariable String id) {
        return mccService.exists(id);
    }
}
