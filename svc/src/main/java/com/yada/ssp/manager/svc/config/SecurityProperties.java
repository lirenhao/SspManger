package com.yada.ssp.manager.svc.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@ConfigurationProperties(prefix = "yada.security")
public class SecurityProperties {

    private Map<String, String[]> roles;

    public Map<String, String[]> getRoles() {
        return roles;
    }

    public void setRoles(Map<String, String[]> roles) {
        this.roles = roles;
    }
}
