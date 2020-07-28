package com.yada.ssp.manager.svc.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/files")
public class FilesController {

    @Value("#{${files}}")
    private Map<String, String> files;

    @GetMapping("/{url}")
    public String list(@PathVariable String url) {
        return files.get(url);
    }

}
