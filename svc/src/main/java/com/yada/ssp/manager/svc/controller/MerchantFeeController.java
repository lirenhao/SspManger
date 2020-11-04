package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.MerchantFee;
import com.yada.ssp.manager.svc.model.MerchantFeeCheck;
import com.yada.ssp.manager.svc.query.MerchantFeeCheckQuery;
import com.yada.ssp.manager.svc.service.MerchantFeeCheckService;
import com.yada.ssp.manager.svc.service.MerchantFeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * 商户费率表
 * TODO 费率展示10000位
 */
@RestController
@RequestMapping("/merchantFee")
public class MerchantFeeController {

    private final MerchantFeeCheckService merchantFeeCheckService;
    private final MerchantFeeService merchantFeeService;

    @Autowired
    public MerchantFeeController(MerchantFeeCheckService merchantFeeCheckService, MerchantFeeService merchantFeeService) {
        this.merchantFeeCheckService = merchantFeeCheckService;
        this.merchantFeeService = merchantFeeService;
    }

    @GetMapping
    public Page<MerchantFeeCheck> list(@AuthenticationPrincipal Jwt principal,
                                       @ModelAttribute MerchantFeeCheckQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(principal.getClaimAsString("orgId"));
        return merchantFeeCheckService.findAll(query, pageable);
    }

    @PostMapping
    public void save(@RequestBody MerchantFeeCheck merchantFeeCheck) {
        merchantFeeCheckService.save(merchantFeeCheck);
    }

    @PutMapping
    public String update(@RequestBody MerchantFeeCheck merchantFeeCheck) {
        merchantFeeCheckService.update(merchantFeeCheck);
        return "redirect:list";
    }

    @GetMapping("/feeType")
    public String getFeeType(String merchantId) {
        String feeType = "*";
        List<MerchantFee> merchantFeeList = merchantFeeService.findListByMerchantId(merchantId);
        if (merchantFeeList != null && merchantFeeList.size() > 0) {
            feeType = merchantFeeList.get(0).getFeeType();
        }
        return feeType;
    }

    @GetMapping("/{id}")
    public MerchantFeeCheck get(@PathVariable String id) {
        return merchantFeeCheckService.findOne(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        merchantFeeCheckService.delete(id);
    }

    @GetMapping("/{id}/check")
    public MerchantFee getCheck(@PathVariable String id) {
        return merchantFeeService.findOne(id);
    }

    @PutMapping("/{id}/check")
    public void check(@PathVariable String id, @RequestBody Map<String, String> body) {
        merchantFeeCheckService.saveCheck(id, body.get("checkReason"), body.get("checkState"));
    }

    // TODO 修改时费率状态控制
    public String edit(Model model, String lsId) {
        MerchantFeeCheck merchantFeeCheck = merchantFeeCheckService.findOne(lsId);
        BigDecimal fee = merchantFeeCheck.getFee();
        fee = fee.multiply(new BigDecimal(10000)).setScale(0);
        merchantFeeCheck.setFee(fee);
        model.addAttribute("model", merchantFeeCheck);
        if (merchantFeeCheck.getCheckState().equals("1") || merchantFeeCheck.getCheckState().equals("3")) {
            return "ssp_pages/MerchantFee/edit1";
        } else if (merchantFeeCheck.getCheckState().equals("2") || merchantFeeCheck.getCheckState().equals("4")) {
            return "ssp_pages/MerchantFee/editOnlyCloseDate";
        }
        return "ssp_pages/MerchantFee/edit1";
    }
}
