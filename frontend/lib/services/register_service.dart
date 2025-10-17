import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api_config.dart';
import '../models/register_models.dart';

class RegisterService {
  // Registrar cliente
  Future<RegisterResponse> registerClient({
    required String correo,
    required String password,
    required String nombre,
    required String apellido,
    required String celular,
  }) async {
    try {
      final registerRequest = ClientRegisterRequest(
        correo: correo,
        password: password,
        nombre: nombre,
        apellido: apellido,
        celular: celular,
      );

      print('Registrando cliente en: ${ApiConfig.baseUrl}${ApiConfig.clientEndpoint}/create_client');
      print('Datos: ${jsonEncode(registerRequest.toJson())}');

      final response = await http
          .post(
            Uri.parse('${ApiConfig.baseUrl}${ApiConfig.clientEndpoint}/create_client'),
            headers: {
              'Content-Type': 'application/json',
            },
            body: jsonEncode(registerRequest.toJson()),
          )
          .timeout(ApiConfig.timeout);

      print('Status Code: ${response.statusCode}');
      print('Response Body: ${response.body}');

      if (response.statusCode == 200 || response.statusCode == 201) {
        final jsonResponse = jsonDecode(response.body);
        return RegisterResponse(
          success: true,
          message: jsonResponse['msg'] ?? 'Cliente registrado exitosamente',
        );
      } else if (response.statusCode == 400) {
        final jsonResponse = jsonDecode(response.body);
        return RegisterResponse(
          success: false,
          message: jsonResponse['msg'] ?? 'Datos inválidos',
        );
      } else {
        return RegisterResponse(
          success: false,
          message: 'Error del servidor: ${response.statusCode}',
        );
      }
    } catch (e) {
      print('Error en registro de cliente: $e');
      return RegisterResponse(
        success: false,
        message: 'Error de conexión: ${e.toString()}',
      );
    }
  }

  // Registrar empresa/barbería
  Future<RegisterResponse> registerBusiness({
    required String nombreEstablecimiento,
    required String nombreAdmin,
    required String apellidoAdmin,
    required String correo,
    required String direccion,
    required String password,
    String rol = 'admin', // Valor por defecto
    String? tipoEstablecimiento,
  }) async {
    try {
      final registerRequest = BusinessRegisterRequest(
        nombreEstablecimiento: nombreEstablecimiento,
        nombreAdmin: nombreAdmin,
        apellidoAdmin: apellidoAdmin,
        correo: correo,
        direccion: direccion,
        password: password,
        rol: rol,
        tipoEstablecimiento: tipoEstablecimiento,
      );

      print('Registrando empresa en: ${ApiConfig.baseUrl}${ApiConfig.businessEndpoint}/create_business');
      print('Datos: ${jsonEncode(registerRequest.toJson())}');

      final response = await http
          .post(
            Uri.parse('${ApiConfig.baseUrl}${ApiConfig.businessEndpoint}/create_business'),
            headers: {
              'Content-Type': 'application/json',
            },
            body: jsonEncode(registerRequest.toJson()),
          )
          .timeout(ApiConfig.timeout);

      print('Status Code: ${response.statusCode}');
      print('Response Body: ${response.body}');

      if (response.statusCode == 200 || response.statusCode == 201) {
        final jsonResponse = jsonDecode(response.body);
        return RegisterResponse(
          success: true,
          message: jsonResponse['msg'] ?? 'Empresa registrada exitosamente',
        );
      } else if (response.statusCode == 400) {
        final jsonResponse = jsonDecode(response.body);
        return RegisterResponse(
          success: false,
          message: jsonResponse['msg'] ?? 'Datos inválidos',
        );
      } else {
        return RegisterResponse(
          success: false,
          message: 'Error del servidor: ${response.statusCode}',
        );
      }
    } catch (e) {
      print('Error en registro de empresa: $e');
      return RegisterResponse(
        success: false,
        message: 'Error de conexión: ${e.toString()}',
      );
    }
  }
}
