package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.BankList;
import com.yada.ssp.manager.svc.query.BankListQuery;
import com.yada.ssp.manager.svc.service.BankListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

/**
 * 参数维护API
 */
@RestController
@RequestMapping("/bankList")
public class BankListController {

    private final BankListService bankListService;

    @Autowired
    public BankListController(BankListService bankListService) {
        this.bankListService = bankListService;
    }

    @GetMapping
    public Page<BankList> list(@ModelAttribute BankListQuery query, @PageableDefault Pageable pageable) {
        return bankListService.findAll(query, pageable);
    }

    @PutMapping
    public void save(@RequestBody BankList bankList) {
        bankListService.saveAndUpdate(bankList);
    }

    @GetMapping("/{id}")
    public BankList get(@PathVariable String id) {
        return bankListService.findOne(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        bankListService.delete(id);
    }

    @GetMapping("/{id}/exists")
    public boolean exists(@PathVariable String id) {
        return bankListService.exists(id);
    }
}
