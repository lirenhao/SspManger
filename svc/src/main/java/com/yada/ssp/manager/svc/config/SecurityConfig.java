package com.yada.ssp.manager.svc.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;

import java.util.List;
import java.util.stream.Collectors;

@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled=true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final SecurityProperties securityProperties;

    @Autowired
    public SecurityConfig(SecurityProperties securityProperties) {
        this.securityProperties = securityProperties;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests(registry -> {
                    registry.anyRequest().authenticated();
                })
                .oauth2ResourceServer()
                .jwt()
                .jwtAuthenticationConverter(it -> {
                    JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
                    jwtConverter.setJwtGrantedAuthoritiesConverter(jwt ->
                            ((List<String>) jwt.getClaimAsMap("realm_access").get("roles"))
                                    .stream()
                                    .map(roleName -> "ROLE_" + roleName) // prefix to map to a Spring Security "role"
                                    .map(SimpleGrantedAuthority::new)
                                    .collect(Collectors.toList())
                    );
                    return jwtConverter.convert(it);
                });
    }
}