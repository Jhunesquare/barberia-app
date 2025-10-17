import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api_config.dart';
import '../models/auth_models.dart';

class AuthService {
  // Método para iniciar sesión
  Future<LoginResponse> login(String email, String password) async {
    try {
      final loginRequest = LoginRequest(
        correo: email,
        password: password,
      );

      print('Enviando petición a: ${ApiConfig.authUrl}');
      print('Datos: ${jsonEncode(loginRequest.toJson())}');

      final response = await http
          .post(
            Uri.parse(ApiConfig.authUrl),
            headers: {
              'Content-Type': 'application/json',
            },
            body: jsonEncode(loginRequest.toJson()),
          )
          .timeout(ApiConfig.timeout);

      print('Status Code: ${response.statusCode}');
      print('Response Body: ${response.body}');

      if (response.statusCode == 200) {
        final jsonResponse = jsonDecode(response.body);
        return LoginResponse(
          success: true,
          message: jsonResponse['msg'] ?? 'Login exitoso',
          userType: _determineUserType(jsonResponse),
        );
      } else if (response.statusCode == 404) {
        final jsonResponse = jsonDecode(response.body);
        return LoginResponse(
          success: false,
          message: jsonResponse['msg'] ?? 'Usuario no encontrado',
        );
      } else if (response.statusCode == 400) {
        final jsonResponse = jsonDecode(response.body);
        return LoginResponse(
          success: false,
          message: jsonResponse['msg'] ?? 'Credenciales inválidas',
        );
      } else {
        return LoginResponse(
          success: false,
          message: 'Error del servidor: ${response.statusCode}',
        );
      }
    } catch (e) {
      print('Error en login: $e');
      return LoginResponse(
        success: false,
        message: 'Error de conexión: ${e.toString()}',
      );
    }
  }

  // Método auxiliar para determinar el tipo de usuario (si la API lo devuelve)
  String? _determineUserType(Map<String, dynamic> json) {
    // Aquí puedes agregar lógica para determinar si es cliente o empresa
    // basándote en la respuesta de tu API
    if (json.containsKey('userType')) {
      return json['userType'];
    }
    return null;
  }

  // Método para cerrar sesión (por ahora solo limpia datos locales)
  Future<void> logout() async {
    // TODO: Implementar limpieza de sesión
    // Aquí puedes limpiar SharedPreferences, tokens, etc.
  }
}
