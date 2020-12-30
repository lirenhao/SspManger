package com.yada.ssp.manager.web.config

import com.yada.ssp.manager.web.security.IPwdDigestService
import com.yada.ssp.manager.web.security.IPwdStrengthService
import com.yada.ssp.manager.web.security.PwdDigestService
import com.yada.ssp.manager.web.security.PwdStrengthService
import org.jasypt.encryption.StringEncryptor
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverterAdapter
import org.springframework.security.web.server.SecurityWebFilterChain

@Configuration
@EnableWebFluxSecurity
@EnableConfigurationProperties(SecurityConfigProperties::class)
class SecurityConfig(
    private val config: SecurityConfigProperties,
    private val stringEncryptor: StringEncryptor
) {

    @Bean
    fun pwdDigestService(): IPwdDigestService = PwdDigestService(config.defaultPwd, stringEncryptor)

    @Bean
    fun pwdStrengthService(): IPwdStrengthService = PwdStrengthService(config.pwdStrength)

    @Bean
    fun configure(http: ServerHttpSecurity): SecurityWebFilterChain {
        http
            .authorizeExchange { exchanges ->
                config.roles.keys.forEach {
                    exchanges.pathMatchers(it).hasAnyRole(*config.roles[it] ?: arrayOf())
                }
                exchanges.anyExchange().authenticated()
            }
            .oauth2ResourceServer()
            .jwt().jwtAuthenticationConverter {
                val jwtConverter = JwtAuthenticationConverter()
                jwtConverter.setJwtGrantedAuthoritiesConverter { jwt: Jwt ->
                    (jwt.getClaimAsMap("realm_access")["roles"] as List<*>)
                        .map { role -> "ROLE_$role" }
                        .map { role -> SimpleGrantedAuthority(role) }
                }
                ReactiveJwtAuthenticationConverterAdapter(jwtConverter).convert(it)
            }

        return http.build()
    }
}
