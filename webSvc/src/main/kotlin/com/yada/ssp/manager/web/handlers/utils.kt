package com.yada.ssp.manager.web.handlers

import org.springframework.http.HttpStatus
import org.springframework.web.reactive.function.BodyInserters.fromValue
import org.springframework.web.reactive.function.server.ServerResponse
import org.springframework.web.reactive.function.server.ServerResponse.ok
import org.springframework.web.server.ResponseStatusException
import reactor.core.publisher.Mono

data class UserUpdateData(val orgId: String?, val roles: Set<String>?, val status: String?, val email: String?)

inline fun <reified T : Any> withNotFound(m: Mono<T>, msg: String? = null): Mono<ServerResponse> =
        m.flatMap { ok().body(fromValue(it)) }
                .switchIfEmpty(Mono.error(ResponseStatusException(HttpStatus.NOT_FOUND, msg)))