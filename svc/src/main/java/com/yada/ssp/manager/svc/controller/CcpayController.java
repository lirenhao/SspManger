package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.Ccpay;
import com.yada.ssp.manager.svc.model.CcpayCheck;
import com.yada.ssp.manager.svc.net.SspResult;
import com.yada.ssp.manager.svc.query.CcpayCheckQuery;
import com.yada.ssp.manager.svc.service.CcpayCheckService;
import com.yada.ssp.manager.svc.service.CcpayService;
import com.yada.ssp.manager.svc.service.SspService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

/**
 * CCPAY参数配置API
 */
@RestController
@RequestMapping("/ccpay")
public class CcpayController {

    private final CcpayCheckService ccpayCheckService;
    private final CcpayService ccpayService;
    private final SspService sspService;

    @Autowired
    public CcpayController(CcpayCheckService ccpayCheckService, CcpayService ccpayService, SspService sspService) {
        this.ccpayCheckService = ccpayCheckService;
        this.ccpayService = ccpayService;
        this.sspService = sspService;
    }

    @GetMapping
    @Secured(value = {"admin","MerchantChecker","MerchantOperator"})
    public Page<CcpayCheck> list(@AuthenticationPrincipal Jwt principal,
                                 @ModelAttribute CcpayCheckQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(principal.getClaimAsString("orgId"));
        return ccpayCheckService.findAll(query, pageable);
    }

    @PostMapping
    @Secured(value = {"admin","MerchantChecker","MerchantOperator"})
    public void save(@RequestBody CcpayCheck ccpayCheck) {
        ccpayCheckService.save(ccpayCheck);
    }

    @PutMapping
    @Secured(value = {"admin","MerchantChecker","MerchantOperator"})
    public void update(@RequestBody CcpayCheck ccpayCheck) {
        ccpayCheckService.update(ccpayCheck);
    }

    @DeleteMapping("/{merchantId}")
    @Secured(value = {"admin","MerchantChecker","MerchantOperator"})
    public void delete(@PathVariable String merchantId) {
        ccpayCheckService.delete(merchantId);
    }

    @GetMapping("/{merchantId}")
    @Secured(value = {"admin","MerchantChecker","MerchantOperator"})
    public CcpayCheck get(@PathVariable String merchantId) {
        CcpayCheck ccpayCheck = ccpayCheckService.findOne(merchantId);
        if (ccpayCheck.getFee() != null) {
            BigDecimal fee = ccpayCheck.getFee();
            fee = fee.multiply(new BigDecimal(1000)).setScale(0);
            ccpayCheck.setFee(fee);
        }
        return ccpayCheck;
    }

    @GetMapping("/{merchantId}/check")
    @Secured(value = {"admin","MerchantChecker","MerchantOperator"})
    public Ccpay getCheck(@PathVariable String merchantId) {
        return ccpayService.findOne(merchantId);
    }

    @PutMapping("/{merchantId}/check")
    @Secured(value = {"admin","MerchantChecker","MerchantOperator"})
    public void saveCheck(@PathVariable String merchantId, @RequestBody Map<String, String> body) {
        ccpayCheckService.saveCheck(merchantId, body.get("checkReason"), body.get("checkState"));
    }

    /**
     * 修改静态码,不用审核
     *
     * @param merchantId 商户号
     * @return 结果
     */
    @PutMapping("/{merchantId}/staticQrc")
    @Secured(value = {"admin","MerchantChecker","MerchantOperator"})
    public SspResult updateStaticQrc(@PathVariable String merchantId) {
        return sspService.getStaticCode(merchantId);
    }

    /**
     * 修改通知状态,不用审核
     *
     * @param merchantId 商户号
     * @return 结果
     */
    @PutMapping("/{merchantId}/notifyFlag")
    @Secured(value = {"admin","MerchantChecker","MerchantOperator"})
    public SspResult updateNotifyFlag(@PathVariable String merchantId) {
        return sspService.setCallbackPath(merchantId);
    }

    @GetMapping("/{merchantId}/exists")
    @Secured(value = {"admin","MerchantChecker","MerchantOperator"})
    public boolean exists(@PathVariable String merchantId) {
        return ccpayCheckService.exists(merchantId);
    }
}
