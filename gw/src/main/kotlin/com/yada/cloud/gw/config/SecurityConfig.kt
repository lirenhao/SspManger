package com.yada.cloud.gw.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.security.config.Customizer.withDefaults
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.oauth2.client.oidc.web.server.logout.OidcClientInitiatedServerLogoutSuccessHandler
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository
import org.springframework.security.web.server.SecurityWebFilterChain

@EnableWebFluxSecurity
class SecurityConfig @Autowired constructor(
        private val clientRegistrationRepository: ReactiveClientRegistrationRepository
) {

    @Bean
    fun configure(http: ServerHttpSecurity): SecurityWebFilterChain {
        http.csrf().disable()
        http.authorizeExchange()
                // all other requests
                .anyExchange().authenticated()
                // RP-initiated logout
                .and().logout().logoutSuccessHandler(OidcClientInitiatedServerLogoutSuccessHandler(clientRegistrationRepository))
                // enable OAuth2/OIDC
                .and().oauth2Login(withDefaults())
                .exceptionHandling()
        return http.build()
    }
}