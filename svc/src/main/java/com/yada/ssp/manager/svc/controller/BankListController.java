package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.model.BankList;
import com.yada.ssp.manager.svc.query.BankListQuery;
import com.yada.ssp.manager.svc.service.BankListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by bjy on 2018/12/19.
 * 参数维护Controller
 */
@Controller
@RequestMapping("/banklist")
public class BankListController {

    private final BankListService bankListService;

    @Autowired
    public BankListController(BankListService bankListService) {
        this.bankListService = bankListService;
    }

    @RequestMapping("/list")
    public String list(Model model, @ModelAttribute BankListQuery query, @PageableDefault Pageable pageable) {
        Page page = bankListService.findAll(query, pageable);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/BankList/list";
    }

    @RequestMapping("/create")
    public String create() {
        return "ssp_pages/BankList/create";
    }

    @RequestMapping("/save")
    public String save(@ModelAttribute("model") BankList bankList) {
        bankListService.saveAndUpdate(bankList);
        return "redirect:list";
    }

    @RequestMapping("/show")
    public String show(Model model, String accountBankNo) {
        model.addAttribute("model", bankListService.findOne(accountBankNo));
        return "ssp_pages/BankList/show";
    }

    @RequestMapping("/edit")
    public String edit(Model model, String accountBankNo) {
        model.addAttribute("model", bankListService.findOne(accountBankNo));
        return "ssp_pages/BankList/edit1";
    }

    @RequestMapping("/delete")
    public String delete(String accountBankNo) {
        bankListService.delete(accountBankNo);
        return "redirect:list";
    }

    @ResponseBody
    @RequestMapping("/AJAX_findBankList")
    public String AJAX_findBankList(String accountBankNo) {
        String mess = "*";
        if (bankListService.exists(accountBankNo)) {
            mess = "该参数已存在";
        }
        return mess;
    }
}
