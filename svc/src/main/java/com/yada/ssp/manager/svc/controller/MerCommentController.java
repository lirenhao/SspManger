package com.yada.ssp.manager.svc.controller;

import com.yada.ssp.manager.svc.auth.model.Auth;
import com.yada.ssp.manager.svc.model.MerComment;
import com.yada.ssp.manager.svc.query.MerCommentQuery;
import com.yada.ssp.manager.svc.service.MerCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/merComment")
public class MerCommentController {

    private final MerCommentService merCommentService;

    @Autowired
    public MerCommentController(MerCommentService merCommentService) {
        this.merCommentService = merCommentService;
    }

    @GetMapping
    public Page<MerComment> list(@RequestAttribute("auth") Auth auth,
                                 @ModelAttribute MerCommentQuery query, @PageableDefault Pageable pageable) {
        if (null == query.getOrgId() || "".equals(query.getOrgId())) {
            query.setOrgId(auth.getOrgId());
        }
        return merCommentService.findAll(query, pageable);
    }

    @GetMapping("/{id}")
    public MerComment show(@PathVariable String id) {
        return merCommentService.findOne(id);
    }

    @PutMapping("/{id}/reply")
    public String reply(@RequestAttribute("auth") Auth auth, @PathVariable String id, String content) {
        merCommentService.reply(id, auth.getUserId(), content);
        return "redirect:list";
    }

}
