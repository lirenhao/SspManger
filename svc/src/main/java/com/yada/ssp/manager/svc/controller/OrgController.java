package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.Org;
import com.yada.ssp.manager.svc.service.OrgService;
import com.yada.ssp.manager.svc.view.TreeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * TODO 机构接口根据项目在扩充
 */
@RestController
@RequestMapping("org")
public class OrgController {

    private final OrgService orgService;

    @Autowired
    public OrgController(OrgService orgService) {
        this.orgService = orgService;
    }

    @GetMapping
    public List<Org> list() {
        return orgService.findAll();
    }

    @PostMapping
    public void save(Org org, String pid) {
        Org pOrg = orgService.findOne(pid);
        org.setOrg(pOrg);
        orgService.save(org);
    }

    /**
     * 获取机构树
     */
    @GetMapping("/tree")
    @Secured(value = {"admin","FinanceChecker","FinanceOperator","MerchantChecker","MerchantOperator","RiskOperator"})
    public TreeNode[] tree(@AuthenticationPrincipal Jwt principal) {
        return orgService.genOrgTree(principal.getClaimAsString("orgId"));
    }

    /**
     * 获取所有子集机构的key:value
     */
    @GetMapping("/map")
    @Secured(value = {"admin","FinanceChecker","FinanceOperator","MerchantChecker","MerchantOperator","RiskOperator"})
    public Map<String, String> map(@AuthenticationPrincipal Jwt principal) {
        return orgService.findByOrgIdStartingWithList(principal.getClaimAsString("orgId"))
                .stream().collect(Collectors.toMap(Org::getOrgId, Org::getName));
    }

    /**
     * 获取所有二级机构的key:value
     */
    @GetMapping("/second")
    @Secured(value = {"admin","FinanceChecker","FinanceOperator","MerchantChecker","MerchantOperator","RiskOperator"})
    public Map<String, String> secondOrg(@AuthenticationPrincipal Jwt principal) {
        return orgService.findSecondOrg(principal.getClaimAsString("orgId"))
                .stream().collect(Collectors.toMap(Org::getOrgId, Org::getName));
    }

    @GetMapping("/{id}")
    @Secured(value = {"admin","FinanceChecker","FinanceOperator","MerchantChecker","MerchantOperator","RiskOperator"})
    public Org show(@PathVariable String id) {
        return orgService.findOne(id);
    }

    @PutMapping("/{id}")
    @Secured(value = {"admin","FinanceChecker","FinanceOperator","MerchantChecker","MerchantOperator","RiskOperator"})
    public void update(@PathVariable String id, Org org) {
        orgService.update(org);
    }

    @DeleteMapping("/{id}")
    @Secured(value = {"admin","FinanceChecker","FinanceOperator","MerchantChecker","MerchantOperator","RiskOperator"})
    public void delete(@PathVariable String id) {
        orgService.delete(id);
    }

    @GetMapping("/{id}/exists")
    @Secured(value = {"admin","FinanceChecker","FinanceOperator","MerchantChecker","MerchantOperator","RiskOperator"})
    public boolean exists(@PathVariable String id) {
        return orgService.exists(id);
    }
}
