package com.jeanyacarini.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")  //Permite que Angular se conecte
public class AuthController {

	@PostMapping("/login")
	// Simularemos la validacion de credenciales
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
		if ("admin".equals(request.getUsername()) && 
			"123456".equals(request.getPassword())) {
			Map<String, String> response = new HashMap<>();
			response.put("token", "token_simulado_secreto_12345");
			response.put("mensaje", "Login exitoso");
			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.status(401).body("Usuario o contraseña incorrectos");
		}
	}
}

// Recibiremos los datos de Angular
class LoginRequest {
	private String username;
	private String password;
	
	public String getUsername() { return username; }
	public void setUsername(String username) { this.username = username; }
	public String getPassword() { return password; }
	public void setPassword(String password) { this.password = password; }
}