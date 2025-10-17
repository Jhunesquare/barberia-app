class LoginRequest {
  final String correo;
  final String password;

  LoginRequest({
    required this.correo,
    required this.password,
  });

  Map<String, dynamic> toJson() {
    return {
      'correo': correo,
      'contraseña': password, // Enviamos como "contraseña" a la API
    };
  }
}

class LoginResponse {
  final bool success;
  final String message;
  final String? userType; // 'client' o 'business'

  LoginResponse({
    required this.success,
    required this.message,
    this.userType,
  });

  factory LoginResponse.fromJson(Map<String, dynamic> json) {
    return LoginResponse(
      success: json['success'] ?? false,
      message: json['msg'] ?? json['message'] ?? '',
      userType: json['userType'],
    );
  }
}
