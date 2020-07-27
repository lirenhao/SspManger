package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.*;
import com.yada.ssp.manager.svc.query.AppUserCheckQuery;
import com.yada.ssp.manager.svc.query.TerminalQuery;
import com.yada.ssp.manager.svc.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

/**
 * Created by bjy on 2018/7/23.
 * APP用户Controller
 */
@Controller
@RequestMapping("/appuser")
public class AppUserController {
    private final AppUserCheckService appUserCheckService;
    private final AppRoleService appRoleService;
    private final MerchantService merchantService;
    private final CcyTypeService ccyTypeService;
    private final TerminalService terminalService;
    private final AppUserService appUserService;
    @Autowired
    public AppUserController(AppUserCheckService appUserCheckService, AppRoleService appRoleService, MerchantService merchantService, CcyTypeService ccyTypeService, TerminalService terminalService, AppUserService appUserService) {
        this.appUserCheckService = appUserCheckService;
        this.appRoleService = appRoleService;
        this.merchantService = merchantService;
        this.ccyTypeService = ccyTypeService;
        this.terminalService = terminalService;
        this.appUserService = appUserService;
    }

    @RequestMapping("/list")
    public String list(Model model, @RequestAttribute("auth") Auth auth,
                       @ModelAttribute AppUserCheckQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(auth.getOrgId());
        Page page = appUserCheckService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/AppUser/list";
    }

    @RequestMapping("/listForCheck")
    public String listForCheck(Model model, @RequestAttribute("auth") Auth auth,
                               @ModelAttribute AppUserCheckQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(auth.getOrgId());
        Page page = appUserCheckService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/AppUser/listForCheck";
    }

    @RequestMapping("/create")
    public String create(Model model, @RequestAttribute("auth") Auth auth) {
        List<CcyType> ccyTypeList = ccyTypeService.findAll();
        List<Merchant> merchantList = merchantService.findByOrgId(auth.getOrgId());
        List<AppRole> roleList = appRoleService.findAll();
        model.addAttribute("merchantList", merchantList);
        model.addAttribute("roleList", roleList);
        model.addAttribute("ccyTypeList", ccyTypeList);
        return "ssp_pages/AppUser/create";
    }

    @RequestMapping("/save")
    public String save(@ModelAttribute("model") AppUserCheck appUserCheck) {
        appUserCheckService.saveAndUpdate(appUserCheck);
        return "redirect:list";
    }

    @RequestMapping("/updateUser")
    public String updateUser(String merNo, String loginName, String userName, String roles, String termNo, String ccyType) {
        appUserCheckService.updateUser(new AppUserPK(merNo, loginName), userName, roles, termNo, ccyType);
        return "redirect:list";
    }

    @RequestMapping("/show")
    public String show(Model model, String merNo, String loginName) {
        AppUserCheck appUserCheck = appUserCheckService.findOne(new AppUserPK(merNo, loginName));
        if (appUserCheck.getRoles() != null && !appUserCheck.getRoles().equals("")) {
            String[] userRoleList = appUserCheck.getRoles().split(",");
            model.addAttribute("userRoleList", userRoleList);
        }
        List<AppRole> roleList = appRoleService.findAll();
        model.addAttribute("roleList", roleList);
        model.addAttribute("model", appUserCheck);
        return "ssp_pages/AppUser/show";
    }

    @RequestMapping("/showForCheck")
    public String showForCheck(Model model, String merNo, String loginName) {
        AppUserCheck appUserCheck = appUserCheckService.findOne(new AppUserPK(merNo, loginName));
        if (appUserCheck.getRoles() != null && !appUserCheck.getRoles().equals("")) {
            String[] userRoleList = appUserCheck.getRoles().split(",");
            model.addAttribute("userRoleCheckList", userRoleList);
        }
        AppUser appUser = appUserService.findOne(new AppUserPK(merNo, loginName));
        if (appUser!=null && appUser.getRoles() != null && !appUser.getRoles().equals("")) {
            String[] userRoleList = appUser.getRoles().split(",");
            model.addAttribute("userRoleList", userRoleList);
        }
        List<AppRole> roleList = appRoleService.findAll();
        model.addAttribute("appUser", appUser);
        model.addAttribute("roleList", roleList);
        model.addAttribute("model", appUserCheck);
        return "ssp_pages/AppUser/showForCheck";
    }

    @RequestMapping("/check")
    public String check(Model model, String merNo, String loginName) {
        AppUserCheck appUserCheck = appUserCheckService.findOne(new AppUserPK(merNo, loginName));
        if (appUserCheck.getRoles() != null && !appUserCheck.getRoles().equals("")) {
            String[] userRoleList = appUserCheck.getRoles().split(",");
            model.addAttribute("userRoleCheckList", userRoleList);
        }
        AppUser appUser = appUserService.findOne(new AppUserPK(merNo, loginName));
        if (appUser!=null && appUser.getRoles() != null && !appUser.getRoles().equals("")) {
            String[] userRoleList = appUser.getRoles().split(",");
            model.addAttribute("userRoleList", userRoleList);
        }
        List<AppRole> roleList = appRoleService.findAll();
        model.addAttribute("appUser", appUser);
        model.addAttribute("roleList", roleList);
        model.addAttribute("model", appUserCheck);
        return "ssp_pages/AppUser/check";
    }

    @RequestMapping("/saveCheck")
    public String saveCheck(String state, String checkReason, String merNo, String loginName) {
        appUserCheckService.saveCheck(state,checkReason,merNo,loginName);
        return "redirect:listForCheck";
    }

    @RequestMapping("/edit")
    public String edit(Model model, String merNo, String loginName) {
        AppUserCheck appUserCheck = appUserCheckService.findOne(new AppUserPK(merNo, loginName));
        if (appUserCheck.getRoles() != null && !appUserCheck.getRoles().equals("")) {
            String[] userRoleList = appUserCheck.getRoles().split(",");
            model.addAttribute("userRoleList", userRoleList);
        }
        List<CcyType> ccyTypeList = ccyTypeService.findAll();
        List<AppRole> roleList = appRoleService.findAll();
        Merchant merchant = merchantService.findOne(merNo);
        TerminalQuery terminalQuery = new TerminalQuery();
        terminalQuery.setMerchantId(appUserCheck.getMerNo());
        List<Terminal> terminalList = terminalService.findAll(terminalQuery);
        model.addAttribute("merchant", merchant);
        model.addAttribute("roleList", roleList);
        model.addAttribute("model", appUserCheck);
        model.addAttribute("ccyTypeList", ccyTypeList);
        model.addAttribute("terminalList", terminalList);
        return "ssp_pages/AppUser/edit1";
    }

    @RequestMapping("/resetPassword")
    public String resetPassword(String merNo, String loginName, RedirectAttributes redirectAttrs) {
        appUserService.resetPassword(new AppUserPK(merNo, loginName));
        redirectAttrs.addFlashAttribute("message", String.format("用户[%s@%s]密码已重置!", merNo, loginName));
        return "redirect:list";
    }

    @RequestMapping("/delete")
    public String delete(String merNo, String loginName) {
        appUserCheckService.delete(new AppUserPK(merNo, loginName));
        return "redirect:list";
    }

    @ResponseBody
    @RequestMapping("/AJAX_findUserByMerNoAndLoginName")
    public String AJAX_findUserByMerNoAndLoginName(String merNo, String loginName) {
        String mess = "*";
        if (appUserCheckService.exists(new AppUserPK(merNo, loginName))) {
            mess = "该商户下此登录名已存在！";
        }
        return mess;
    }

    @ResponseBody
    @RequestMapping("/AJAX_findTerminalByMerchantId")
    public List<Terminal> AJAX_findTerminalByMerchantId(String merchantId) {
        TerminalQuery terminalQuery = new TerminalQuery();
        terminalQuery.setMerchantId(merchantId);
        return terminalService.findAll(terminalQuery);
    }
}
