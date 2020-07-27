package com.yada.ssp.manager.svc.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequestMapping("/files")
public class FilesController {

    @Value("#{${files}}")
    private Map<String, String> files;

    @RequestMapping("/{url}")
    public String list(Model model, @PathVariable String url) {
        model.addAttribute("url", files.get(url));
        return "ssp_pages/Files/list";
    }

}
