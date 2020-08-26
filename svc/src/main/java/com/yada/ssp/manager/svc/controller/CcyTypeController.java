package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.CcyType;
import com.yada.ssp.manager.svc.query.CcyTypeQuery;
import com.yada.ssp.manager.svc.service.CcyTypeService;
import com.yada.ssp.manager.svc.service.MerchantExtraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

/**
 * 币种API
 */

@RestController
@RequestMapping("/ccyType")
public class CcyTypeController {

    private final CcyTypeService typeService;
    private final MerchantExtraService merchantExtraService;

    @Autowired
    public CcyTypeController(CcyTypeService typeService, MerchantExtraService merchantExtraService) {
        this.typeService = typeService;
        this.merchantExtraService = merchantExtraService;
    }

    @GetMapping
    public Page<CcyType> list(@ModelAttribute CcyTypeQuery query, @PageableDefault Pageable pageable) {
        return typeService.findAll(query, pageable);
    }

    @PutMapping
    public void save(@RequestBody CcyType ccyType) {
        typeService.saveAndUpdate(ccyType);
    }

    @GetMapping("/{id}")
    public CcyType get(@PathVariable String id) {
        return typeService.findOne(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        typeService.delete(id);
    }

    @GetMapping("/{id}/exists")
    public boolean exists(@PathVariable String id) {
        return typeService.exists(id);
    }

    /**
     * 币种是否被使用
     * @param id 币种ID
     * @return 是否被使用
     */
    @GetMapping("/{id}/enable")
    public boolean enable(@PathVariable String id) {
        return merchantExtraService.findListByCcyType(id).size() > 0;
    }

}
