package com.yada.ssp.manager.web.routers

import com.yada.ssp.manager.web.handlers.OrgHandler
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.function.server.router

@Configuration
class OrgRouterConfig @Autowired constructor(
        private val orgHandler: OrgHandler
) {
    @Bean
    fun orgApiRouter() = router {
        "/org".nest {
            GET("", orgHandler::getTree)
            GET("/{id}", orgHandler::get)
            GET("/{id}/exist", orgHandler::exist)
            PUT("", orgHandler::createOrUpdate)
            DELETE("/{id}", orgHandler::delete)
        }
    }
}