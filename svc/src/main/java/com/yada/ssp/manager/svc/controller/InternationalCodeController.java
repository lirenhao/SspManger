package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.InternationalCode;
import com.yada.ssp.manager.svc.query.InternationalCodeQuery;
import com.yada.ssp.manager.svc.service.InternationalCodeService;
import com.yada.ssp.manager.svc.service.MerchantExtraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 国家代码API
 */
@RestController
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
    @Secured(value = {"admin","FinanceChecker","FinanceOperator","MerchantChecker","MerchantOperator","RiskOperator"})
    public Page<InternationalCode> list(@ModelAttribute InternationalCodeQuery query, @PageableDefault Pageable pageable) {
        return internationalCodeService.findAll(query, pageable);
    }

    @GetMapping("/list")
    @Secured(value = {"admin","FinanceChecker","FinanceOperator","MerchantChecker","MerchantOperator","RiskOperator"})
    public List<InternationalCode> list() {
        return internationalCodeService.findAll();
    }

    @PutMapping
    @Secured(value = {"admin","FinanceChecker","FinanceOperator","MerchantChecker","MerchantOperator","RiskOperator"})
    public void save(@RequestBody InternationalCode internationalCode) {
        internationalCodeService.saveAndUpdate(internationalCode);
    }

    @GetMapping("/{id}")
    @Secured(value = {"admin","FinanceChecker","FinanceOperator","MerchantChecker","MerchantOperator","RiskOperator"})
    public InternationalCode get(@PathVariable String id) {
        return internationalCodeService.findOne(id);
    }

    @DeleteMapping("/{id}")
    @Secured(value = {"admin","FinanceChecker","FinanceOperator","MerchantChecker","MerchantOperator","RiskOperator"})
    public void delete(@PathVariable String id) {
        internationalCodeService.delete(id);
    }

    @GetMapping("/{id}/exists")
    @Secured(value = {"admin","FinanceChecker","FinanceOperator","MerchantChecker","MerchantOperator","RiskOperator"})
    public boolean exists(@PathVariable String id) {
        return internationalCodeService.exists(id);
    }

    /**
     * 国家代码是否被使用
     * @param id 币种ID
     * @return 是否被使用
     */
    @GetMapping("/{id}/enable")
    @Secured(value = {"admin","FinanceChecker","FinanceOperator","MerchantChecker","MerchantOperator","RiskOperator"})
    public boolean enable(@PathVariable String id) {
        return merchantExtraService.findListByInternationalCode(id).size() > 0;
    }
}
