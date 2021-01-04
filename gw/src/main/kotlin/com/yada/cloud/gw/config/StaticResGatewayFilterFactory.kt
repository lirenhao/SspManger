package com.yada.cloud.gw.config

import org.springframework.cloud.gateway.filter.GatewayFilter
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory
import org.springframework.cloud.gateway.support.NotFoundException
import org.springframework.stereotype.Component
import org.springframework.web.reactive.HandlerMapping
import org.springframework.web.server.WebHandler
import reactor.core.publisher.Mono
import reactor.kotlin.core.publisher.switchIfEmpty

@Component
class StaticResGatewayFilterFactory(
    private val resourceHandlerMapping: HandlerMapping
) : AbstractGatewayFilterFactory<StaticResGatewayFilterFactory.Config>(Config::class.java) {

    class Config

    override fun apply(config: Config) = GatewayFilter { exchange, _ ->
        resourceHandlerMapping.getHandler(exchange)
            .cast(WebHandler::class.java)
            .flatMap { handler ->
                handler.handle(exchange)
            }
            .switchIfEmpty {
                Mono.error(NotFoundException("Not Found"))
            }
    }
}