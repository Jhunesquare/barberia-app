class ApiConfig {
  // Cambia esta URL a la dirección de tu servidor backend
  // Si estás usando un emulador Android: usa 10.0.2.2
  // Si estás usando iOS Simulator: usa localhost
  // Si estás probando en dispositivo físico: usa la IP de tu computadora
  
  // 🔧 CONFIGURACIÓN PARA ANDROID EMULATOR
  static const String baseUrl = 'http://10.0.2.2:3000';
  
  // 📱 Para dispositivo físico, descomenta y usa tu IP local:
  // static const String baseUrl = 'http://192.168.X.X:3000';
  
  // 🍎 Para iOS Simulator, descomenta:
  // static const String baseUrl = 'http://localhost:3000';
  
  // Endpoints
  static const String authEndpoint = '/api/v1/auth';
  static const String clientEndpoint = '/api/v1/client';
  static const String businessEndpoint = '/api/v1/business';
  
  // URL completa para autenticación
  static String get authUrl => '$baseUrl$authEndpoint';
  
  // Timeout para las peticiones
  static const Duration timeout = Duration(seconds: 30);
}
