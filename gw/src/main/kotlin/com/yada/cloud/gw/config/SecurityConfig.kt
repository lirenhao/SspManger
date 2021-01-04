package com.yada.cloud.gw.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.oauth2.client.oidc.web.server.logout.OidcClientInitiatedServerLogoutSuccessHandler
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository
import org.springframework.security.web.server.SecurityWebFilterChain
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers
import java.net.URI

@EnableWebFluxSecurity
class SecurityConfig @Autowired constructor(
    private val clientRegistrationRepository: ReactiveClientRegistrationRepository
) {

    @Bean
    fun configure(http: ServerHttpSecurity): SecurityWebFilterChain {
        http.csrf().disable()
        http.authorizeExchange()
            // allow anonymous access to the root page
            .anyExchange().permitAll()
            // RP-initiated logout
            .and().logout {
                val handler = OidcClientInitiatedServerLogoutSuccessHandler(clientRegistrationRepository)
                handler.setPostLogoutRedirectUri("{baseUrl}")
                handler.setLogoutSuccessUrl(URI("/"))
                it.logoutSuccessHandler(handler)
                it.requiresLogout(ServerWebExchangeMatchers.pathMatchers(HttpMethod.GET, "/signout"))
            }
            // enable OAuth2/OIDC
            .oauth2Login()
        return http.build()
    }
}