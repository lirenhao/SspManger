package com.yada.ssp.manager.web.routers

import com.yada.ssp.manager.web.handlers.UserHandler
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.function.server.router

@Configuration
class UserRouterConfig @Autowired constructor(
        private val userHandler: UserHandler
) {
    @Bean
    fun userApiRouter() = router {
        "/user".nest {
            GET("", userHandler::getPage)
            POST("", userHandler::create)
            PUT("/policy", userHandler::updatePolicy)
            GET("/list", userHandler::getList)
            GET("/{id}", userHandler::getOne)
            GET("/{id}/exist", userHandler::exist)
            PUT("/{id}/reset", userHandler::reset)
            PUT("/{id}", userHandler::update)
            DELETE("/{id}", userHandler::delete)
        }
    }
}