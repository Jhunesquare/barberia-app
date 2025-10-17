// Modelo para registro de cliente
class ClientRegisterRequest {
  final String correo;
  final String password;
  final String nombre;
  final String apellido;
  final String celular;

  ClientRegisterRequest({
    required this.correo,
    required this.password,
    required this.nombre,
    required this.apellido,
    required this.celular,
  });

  Map<String, dynamic> toJson() {
    return {
      'correo': correo,
      'contraseña': password,
      'nombre': nombre,
      'apellido': apellido,
      'celular': celular,
    };
  }
}

// Modelo para registro de empresa/barbería
class BusinessRegisterRequest {
  final String nombreEstablecimiento;
  final String nombreAdmin;
  final String apellidoAdmin;
  final String correo;
  final String direccion;
  final String password;
  final String rol;
  final String? tipoEstablecimiento;

  BusinessRegisterRequest({
    required this.nombreEstablecimiento,
    required this.nombreAdmin,
    required this.apellidoAdmin,
    required this.correo,
    required this.direccion,
    required this.password,
    required this.rol,
    this.tipoEstablecimiento,
  });

  Map<String, dynamic> toJson() {
    final json = {
      'nombre_establecimiento': nombreEstablecimiento,
      'nombre_admin': nombreAdmin,
      'apellido_admin': apellidoAdmin,
      'correo': correo,
      'direccion': direccion,
      'contraseña': password,
      'rol': rol,
    };
    
    if (tipoEstablecimiento != null) {
      json['tipo_establecimiento'] = tipoEstablecimiento!;
    }
    
    return json;
  }
}

// Modelo para respuesta de registro
class RegisterResponse {
  final bool success;
  final String message;

  RegisterResponse({
    required this.success,
    required this.message,
  });

  factory RegisterResponse.fromJson(Map<String, dynamic> json) {
    return RegisterResponse(
      success: json['success'] ?? false,
      message: json['msg'] ?? json['message'] ?? '',
    );
  }
}
