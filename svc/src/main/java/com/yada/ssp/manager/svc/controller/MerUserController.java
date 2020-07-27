package com.yada.ssp.manager.svc.controller;

import com.yada.security.model.Org;
import com.yada.security.service.OrgService;
import com.yada.ssp.manager.svc.model.MerUser;
import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.query.MerUserQuery;
import com.yada.ssp.manager.svc.service.MerUserService;
import com.yada.ssp.manager.svc.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/merUser")
public class MerUserController extends BaseController {

    private final MerUserService merUserService;
    private final OrgService orgService;
    private final MerchantService merchantService;

    @Autowired
    public MerUserController(MerUserService merUserService, OrgService orgService, MerchantService merchantService) {
        this.merUserService = merUserService;
        this.orgService = orgService;
        this.merchantService = merchantService;
    }

    @RequestMapping("/list")
    public String list(Model model, @ModelAttribute MerUserQuery query, @PageableDefault Pageable pageable) {
        if (null == query.getOrgId() || "".equals(query.getOrgId())) {
            query.setOrgId(getCurUser().getOrg().getOrgId());
        }
        Page<MerUser> page = merUserService.findAll(query, pageable);
        List<Org> orgList = orgService.findByOrgIdStartingWithList(getCurUser().getOrg().getOrgId());
        model.addAttribute("orgList", orgList);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/MerUser/list";
    }

    @RequestMapping("/create")
    public String create(Model model) {
        List<Org> orgList = orgService.findByOrgIdStartingWithList(getCurUser().getOrg().getOrgId());
        model.addAttribute("orgList", orgList);
        return "ssp_pages/MerUser/create";
    }

    @RequestMapping("/save")
    public String save(RedirectAttributes redirectAttributes, @ModelAttribute("model") MerUser merUser) {
        redirectAttributes.addFlashAttribute("message", merUserService.create(merUser));
        return "redirect:list";
    }

    @RequestMapping("/edit")
    public String edit(Model model, String merchantId, String userId) {
        model.addAttribute("model", merUserService.findOne(merchantId, userId));
        return "ssp_pages/MerUser/edit";
    }


    @RequestMapping("/update")
    public String update(RedirectAttributes redirectAttributes, @ModelAttribute("model") MerUser merUser) {
        redirectAttributes.addFlashAttribute("message", merUserService.update(merUser));
        return "redirect:list";
    }

    @RequestMapping("/resetPwd")
    public String resetPwd(RedirectAttributes redirectAttributes, String merchantId, String userId) {
        redirectAttributes.addFlashAttribute("message", merUserService.resetPwd(merchantId, userId));
        return "redirect:list";
    }

    @RequestMapping("/delete")
    public String delete(RedirectAttributes redirectAttributes, String merchantId, String userId) {
        redirectAttributes.addFlashAttribute("message", merUserService.delete(merchantId, userId));
        return "redirect:list";
    }

    @RequestMapping("/AJAX_findMerchantByOrgId")
    @ResponseBody
    public List<Merchant> AJAX_findMerchantByOrgId(String orgId) {
        List<String> merchantIds = merUserService.findAll().stream()
                .map(MerUser::getMerchantId)
                .collect(Collectors.toList());
        return  merchantService.findByOrgId(orgId).stream()
                .filter(mer -> !merchantIds.contains(mer.getMerchantId()))
                .collect(Collectors.toList());
    }
}
