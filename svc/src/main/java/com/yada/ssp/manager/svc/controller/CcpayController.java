package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.CcpayCheck;
import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.manager.svc.net.SspResult;
import com.yada.ssp.manager.svc.query.CcpayCheckQuery;
import com.yada.ssp.manager.svc.query.MerchantQuery;
import com.yada.ssp.manager.svc.service.CcpayCheckService;
import com.yada.ssp.manager.svc.service.CcpayService;
import com.yada.ssp.manager.svc.service.MerchantService;
import com.yada.ssp.manager.svc.service.SspService;
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

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by bjy on 2018/11/19.
 * Ccpay Controller
 */

@Controller
@RequestMapping("/ccpay")
public class CcpayController {

    private final CcpayCheckService ccpayCheckService;
    private final MerchantService merchantService;
    private final SspService sspService;
    private final CcpayService ccpayService;
    @Autowired
    public CcpayController(CcpayCheckService ccpayCheckService, MerchantService merchantService, SspService sspService, CcpayService ccpayService) {
        this.ccpayCheckService = ccpayCheckService;
        this.merchantService = merchantService;
        this.sspService = sspService;
        this.ccpayService = ccpayService;
    }

    @RequestMapping("/list")
    public String list(Model model, @RequestAttribute("auth") Auth auth,
                       @ModelAttribute CcpayCheckQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(auth.getOrgId());
        Page page = ccpayCheckService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/Ccpay/list";
    }

    @RequestMapping("/listForCheck")
    public String listForCheck(Model model, @RequestAttribute("auth") Auth auth,
                               @ModelAttribute CcpayCheckQuery query, @PageableDefault Pageable pageable) {
        query.setOrgId(auth.getOrgId());
        Page page = ccpayCheckService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/Ccpay/listForCheck";
    }

    @RequestMapping("/create")
    public String create(Model model, @RequestAttribute("auth") Auth auth) {
        List<Merchant> merchantList = merchantService.findByOrgId(auth.getOrgId());
        model.addAttribute("merchantList", merchantList);
        return "ssp_pages/Ccpay/create";
    }

    @RequestMapping("/save")
    public String save(@ModelAttribute("model") CcpayCheck ccpayCheck) {
        ccpayCheckService.save(ccpayCheck);
        return "redirect:list";
    }

    @RequestMapping("/saveCheck")
    public String saveCheck(String merchantId, String checkReason, String state) {
        ccpayCheckService.saveCheck(merchantId,checkReason,state);
        return "redirect:listForCheck";
    }

    @RequestMapping("/update")
    public String update(@ModelAttribute("model") CcpayCheck ccpayCheck) {
        ccpayCheckService.update(ccpayCheck);
        return "redirect:list";
    }

    /**
     * 修改静态码,不用审核
     *
     * @param merchantId 商户号
     * @return 重定向页面
     */
    @RequestMapping("/updateStaticQrc")
    public String updateStaticQrc(String merchantId, RedirectAttributes redirectAttributes) {
        SspResult sspResult = sspService.getStaticCode(merchantId);
        String message;
        if (sspResult.getRespCode().equals("success")) {
            ccpayService.updateStaticQrc(merchantId, sspResult.getQrCode());
            message = "商户号为" + merchantId + "商户获取静态码成功";
        } else {
            message = "商户号为" + merchantId + "商户获取静态码失败,失败原因" + sspResult.getRespMsg();
        }
        redirectAttributes.addFlashAttribute("message", message);
        return "redirect:list";
    }

    /**
     * 修改通知状态,不用审核
     *
     * @param merchantId 商户号
     * @return 重定向页面
     */
    @RequestMapping("/updateNotifyFlag")
    public String updateNotifyFlag(String merchantId, RedirectAttributes redirectAttributes) {
        String message;
        SspResult sspResult = sspService.setCallbackPath(merchantId);
        if (sspResult.getRespCode().equals("success")) {
            ccpayService.updateNotifyFlag(merchantId, "1");
            message = "商户号为" + merchantId + "商户设置通知地址成功";
        } else {
            message = "商户号为" + merchantId + "商户设置通知地址失败,失败原因" + sspResult.getRespMsg();
        }
        redirectAttributes.addFlashAttribute("message", message);
        return "redirect:list";
    }

    @RequestMapping("/show")
    public String show(Model model, String merchantId) {
        String staticQrc = ccpayService.findOne(merchantId).getStaticQrc();
        model.addAttribute("model", ccpayCheckService.findOne(merchantId));
        model.addAttribute("staticQrc",staticQrc);
        return "ssp_pages/Ccpay/show";
    }

    @RequestMapping("/showForCheck")
    public String showForCheck(Model model, String merchantId) {
        model.addAttribute("model", ccpayCheckService.findOne(merchantId));
        model.addAttribute("ccpay", ccpayService.findOne(merchantId));
        return "ssp_pages/Ccpay/showForCheck";
    }

    @RequestMapping("/check")
    public String check(Model model, String merchantId) {
        model.addAttribute("model", ccpayCheckService.findOne(merchantId));
        model.addAttribute("ccpay", ccpayService.findOne(merchantId));
        return "ssp_pages/Ccpay/check";
    }

    @RequestMapping("/edit")
    public String edit(Model model, @RequestAttribute("auth") Auth auth, String merchantId) {
        MerchantQuery merchantQuery = new MerchantQuery();
        merchantQuery.setOrgId(auth.getOrgId());
        List<Merchant> merchantList = merchantService.findByOrgId(auth.getOrgId());
        CcpayCheck ccpayCheck = ccpayCheckService.findOne(merchantId);
        if (ccpayCheck.getFee() != null) {
            BigDecimal fee = ccpayCheck.getFee();
            fee = fee.multiply(new BigDecimal(1000)).setScale(0);
            ccpayCheck.setFee(fee);
        }
        model.addAttribute("merchantList", merchantList);
        model.addAttribute("model", ccpayCheck);
        return "ssp_pages/Ccpay/edit1";
    }

    @RequestMapping("/delete")
    public String delete(String merchantId){
        ccpayCheckService.delete(merchantId);
        return "redirect:list";
    }

    /**
     * 查询该商户号是否已有记录
     *
     * @param merchantId 商户号
     * @return 返回信息
     */
    @ResponseBody
    @RequestMapping("/AJAX_findByMerchantId")
    public String AJAX_findByMerchantId(String merchantId) {
        String mess = "*";
        if (ccpayCheckService.exists(merchantId)) {
            mess = "该商户已存在！";
        }
        return mess;
    }
}
