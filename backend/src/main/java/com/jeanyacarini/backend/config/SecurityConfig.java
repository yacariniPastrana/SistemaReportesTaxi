package com.jeanyacarini.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.csrf(csrf -> csrf.disable()) // Necesario para Angular
			.authorizeHttpRequests(auth -> auth
				.requestMatchers("/auth/login").permitAll() // conexion con el login
				.anyRequest().authenticated()
				);
		return http.build();
	}
}
