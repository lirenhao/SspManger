package com.yada.cloud.gw.config

import org.springframework.security.core.Authentication
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository
import org.springframework.security.web.server.DefaultServerRedirectStrategy
import org.springframework.security.web.server.WebFilterExchange
import org.springframework.security.web.server.authentication.logout.RedirectServerLogoutSuccessHandler
import org.springframework.security.web.server.authentication.logout.ServerLogoutSuccessHandler
import org.springframework.stereotype.Component
import org.springframework.web.util.UriComponentsBuilder
import reactor.core.publisher.Mono
import reactor.kotlin.core.publisher.switchIfEmpty
import java.net.URI
import java.nio.charset.StandardCharsets

@Component
class OAuthLogoutSuccessHandler(
    private val clientRegistrationRepository: ReactiveClientRegistrationRepository
) : ServerLogoutSuccessHandler {

    private val redirectStrategy = DefaultServerRedirectStrategy()
    private val serverLogoutSuccessHandler = RedirectServerLogoutSuccessHandler()

    override fun onLogoutSuccess(exchange: WebFilterExchange, authentication: Authentication): Mono<Void> {
        return Mono.just(authentication)
            .filter(OAuth2AuthenticationToken::class.java::isInstance)
            .map(OAuth2AuthenticationToken::class.java::cast)
            .flatMap { oauth2Authentication ->
                val clientRegistrationId = oauth2Authentication.authorizedClientRegistrationId
                this.clientRegistrationRepository
                    .findByRegistrationId(clientRegistrationId)
                    .map {
                        URI(it.providerDetails.configurationMetadata["end_session_endpoint"].toString())
                    }
                    .map {
                        val redirectUri = exchange.exchange.request.queryParams["redirect_uri"]?.get(0)
                        val builder = UriComponentsBuilder.fromUri(it)
                        if (redirectUri != null) {
                            builder.queryParam("post_logout_redirect_uri", redirectUri)
                        }
                        builder.encode(StandardCharsets.UTF_8).build().toUri()
                    }
            }.switchIfEmpty {
                this.serverLogoutSuccessHandler.onLogoutSuccess(exchange, authentication).then(Mono.empty())
            }.flatMap { redirectStrategy.sendRedirect(exchange.exchange, it) }

    }
}