package com.yada.cloud.gw.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.core.context.ReactiveSecurityContextHolder
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser
import org.springframework.web.reactive.function.server.ServerResponse
import org.springframework.web.reactive.function.server.router

data class UserInfoData(val id: String, val orgId: String, val roles: List<String>)

@Configuration
class UserRouterConfig {

    @Bean
    fun authRouter() = router {
        GET("/user") {
            ReactiveSecurityContextHolder.getContext()
                    .map { context: SecurityContext -> context.authentication.principal }
                    .cast(DefaultOidcUser::class.java)
                    .map {
                        UserInfoData(
                                it.getClaimAsString("upn") ?: "",
                                it.getClaimAsString("orgId") ?: "",
                                it.getClaimAsStringList("groups") ?: listOf()
                        )
                    }
                    .flatMap { ServerResponse.ok().bodyValue(it) }
                    .switchIfEmpty(ServerResponse.ok().build())
        }
    }
}
