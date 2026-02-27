package com.jeanyacarini.backend.controllers;

import com.jeanyacarini.backend.models.Usuario;
import com.jeanyacarini.backend.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")  //Permite que Angular se conecte
public class AuthController {
	
	@Autowired
	private UsuarioRepository usuarioRepository;

	// ENDPOINT: Registrar usuario
	@PostMapping("/register")
	public ResponseEntity<?> registrarUsuario(@RequestBody Usuario nuevoUsuario) {
		Map<String, Object> response = new HashMap<>();
		
		// Validacion de correo, existe o no existe en BD
		Optional<Usuario> usuarioExistente = usuarioRepository.findByCorreo(nuevoUsuario.getCorreo());
		if (usuarioExistente.isPresent()) {
			response.put("mensaje", "Error: El correo " + nuevoUsuario.getCorreo() + " ya esta registrado.");
			return ResponseEntity.badRequest().body(response);
		}
		
		// Guardamos el usuario en la BD
		Usuario usuarioGuardado = usuarioRepository.save(nuevoUsuario);
		
		response.put("mensaje", "¡Usuario registrado con exito!");
		response.put("usuario", usuarioGuardado);
		return ResponseEntity.ok(response);
	}
	
	// ENDPOINT: Login
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Map<String, String> credenciales) {
		Map<String, Object> response = new HashMap<>();
		
		//Extraemos los datos del Frontend (Rest Client)
		String correo = credenciales.get("correo");
		String contrasena = credenciales.get("contrasena");
		
		//Busca el usuario por medio del correo en BD
		Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreo(correo);
		
		//Consulta si el correo exite en la BD
		if (usuarioOpt.isEmpty()) {
			response.put("mensaje", "Error: El correo no esta registrado.");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response); //Devolvemos error no esta autorizado
		}
		
		//Extraemos el usuario real (wrapper)
		Usuario usuarioReal = usuarioOpt.get();
		
		//Validacion de la contraseña
		if (!usuarioReal.getContrasena().equals(contrasena)) {
			response.put("mensaje", "Error: Contraseña incorrecta.");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}
		
		//Las credenciales son Validas
		response.put("mensaje", "¡Bienvenido otra vez, " + usuarioReal.getNombre() + "!");
		response.put("usuario" , usuarioReal); // Enviamos los datos al Frontend
		
		return ResponseEntity.ok(response);
	}
}