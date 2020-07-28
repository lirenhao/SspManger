package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.StaticQrcList;
import com.yada.ssp.manager.svc.model.StaticQrcListCheck;
import com.yada.ssp.manager.svc.query.StaticQrcListCheckQuery;
import com.yada.ssp.manager.svc.service.StaticQrcListCheckService;
import com.yada.ssp.manager.svc.service.StaticQrcListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

/**
 * 商户静态码审核API
 */
@RestController
@RequestMapping("/staticQrc")
public class StaticQrcListCheckController {

    private final StaticQrcListCheckService staticQrcListCheckService;
    private final StaticQrcListService staticQrcListService;

    @Autowired
    public StaticQrcListCheckController(StaticQrcListCheckService staticQrcListCheckService, StaticQrcListService staticQrcListService) {
        this.staticQrcListCheckService = staticQrcListCheckService;
        this.staticQrcListService = staticQrcListService;
    }

    @GetMapping
    public Page<StaticQrcListCheck> list(@RequestAttribute("auth") Auth auth,
                                         @ModelAttribute StaticQrcListCheckQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(auth.getOrgId());
        return staticQrcListCheckService.findAll(query, pageable);
    }

    @PostMapping
    public void save(@ModelAttribute StaticQrcListCheck staticQrcListCheck) {
        staticQrcListCheck.setQrValue(staticQrcListCheck.getQrValue().trim());
        staticQrcListCheckService.save(staticQrcListCheck);
    }

    @PutMapping
    public void update(@ModelAttribute StaticQrcListCheck staticQrcListCheck) {
        staticQrcListCheck.setQrValue(staticQrcListCheck.getQrValue().trim());
        staticQrcListCheckService.update(staticQrcListCheck);
    }

    @GetMapping("/{lsId}")
    public StaticQrcListCheck get(@PathVariable String lsId) {
        return staticQrcListCheckService.findOne(lsId);
    }

    @DeleteMapping("/{lsId}")
    public void delete(@PathVariable String lsId) {
        staticQrcListCheckService.delete(lsId);
    }

    @GetMapping("/{lsId}/check")
    public StaticQrcList getCheck(@PathVariable String lsId) {
        return staticQrcListService.findOne(lsId);
    }

    @PutMapping("/{lsId}/check")
    public void saveCheck(@PathVariable String lsId, String checkReason, String state) {
        staticQrcListCheckService.saveCheck(lsId, checkReason, state);
    }

}
