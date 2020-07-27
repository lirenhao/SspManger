package com.yada.ssp.manager.svc.controller;

import com.yada.security.model.Org;
import com.yada.security.service.OrgService;
import com.yada.ssp.manager.svc.model.MerComment;
import com.yada.ssp.manager.svc.query.MerCommentQuery;
import com.yada.ssp.manager.svc.service.MerCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/merComment")
public class MerCommentController extends BaseController {

    private final MerCommentService merCommentService;
    private final OrgService orgService;

    @Autowired
    public MerCommentController(MerCommentService merCommentService, OrgService orgService) {
        this.merCommentService = merCommentService;
        this.orgService = orgService;
    }

    @RequestMapping("/list")
    public String list(Model model, @ModelAttribute MerCommentQuery query, @PageableDefault Pageable pageable) {
        if (null == query.getOrgId() || "".equals(query.getOrgId())) {
            query.setOrgId(getCurUser().getOrg().getOrgId());
        }
        Page<MerComment> page = merCommentService.findAll(query, pageable);
        List<Org> orgList = orgService.findByOrgIdStartingWithList(getCurUser().getOrg().getOrgId());
        model.addAttribute("orgList", orgList);
        model.addAttribute("query", query);
        model.addAttribute("page", page);
        return "ssp_pages/MerComment/list";
    }

    @RequestMapping("/show")
    public String show(Model model, String commentId) {
        model.addAttribute("model", merCommentService.findOne(commentId));
        return "ssp_pages/MerComment/show";
    }

    @RequestMapping("/reply")
    public String reply(String commentId, String content) {
        merCommentService.reply(commentId, getCurUser().getOrg().getOrgId(), content);
        return "redirect:list";
    }

}
