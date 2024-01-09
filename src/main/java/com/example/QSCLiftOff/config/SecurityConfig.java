package com.example.QSCLiftOff.config;

import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.Disabled;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf((csrf) -> csrf
                        .ignoringRequestMatchers("/api/*")
                        .ignoringRequestMatchers("/sessions/*")
                )
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll()
                )
                .httpBasic(Customizer.withDefaults())
//                .formLogin(Customizer.withDefaults())
                .formLogin(httpSecurityFormLoginConfigurer ->
                        httpSecurityFormLoginConfigurer.loginPage("http://localhost:3000/login")
//                                .loginProcessingUrl("http://localhost:8080/api/login")
                                .defaultSuccessUrl("http://localhost:3000/")

                );
        return http.build();
    }

}
