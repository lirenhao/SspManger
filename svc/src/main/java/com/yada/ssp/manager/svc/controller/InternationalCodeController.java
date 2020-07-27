package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.InternationalCode;
import com.yada.ssp.manager.svc.query.InternationalCodeQuery;
import com.yada.ssp.manager.svc.service.InternationalCodeService;
import com.yada.ssp.manager.svc.service.MerchantExtraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * 国家代码API
 */
@Controller
@RequestMapping("/countryCode")
public class InternationalCodeController {

    private final InternationalCodeService internationalCodeService;
    private final MerchantExtraService merchantExtraService;

    @Autowired
    public InternationalCodeController(InternationalCodeService internationalCodeService, MerchantExtraService merchantExtraService) {
        this.internationalCodeService = internationalCodeService;
        this.merchantExtraService = merchantExtraService;
    }

    @GetMapping
    public Page<InternationalCode> list(@ModelAttribute InternationalCodeQuery query, @PageableDefault Pageable pageable) {
        return internationalCodeService.findAll(query, pageable);
    }

    @PutMapping
    public void save(@ModelAttribute InternationalCode internationalCode) {
        internationalCodeService.saveAndUpdate(internationalCode);
    }

    @GetMapping("/{id}")
    public InternationalCode get(@PathVariable String id) {
        return internationalCodeService.findOne(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        internationalCodeService.delete(id);
    }

    @GetMapping("/{id}/exists")
    public boolean exists(@PathVariable String id) {
        return internationalCodeService.exists(id);
    }

    /**
     * 国家代码是否被使用
     * @param id 币种ID
     * @return 是否被使用
     */
    @GetMapping("/{id}/enable")
    public boolean enable(@PathVariable String id) {
        return merchantExtraService.findListByInternationalCode(id).size() > 0;
    }
}
