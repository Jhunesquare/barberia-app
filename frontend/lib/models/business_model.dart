class Business {
  final String id;
  final String nombreEstablecimiento;
  final String nombreAdmin;
  final String apellidoAdmin;
  final String direccion;
  final String correo;
  final String rol;
  final bool estado;
  final String? tipoEstablecimiento; // 'barberia' o 'salon'

  Business({
    required this.id,
    required this.nombreEstablecimiento,
    required this.nombreAdmin,
    required this.apellidoAdmin,
    required this.direccion,
    required this.correo,
    required this.rol,
    required this.estado,
    this.tipoEstablecimiento,
  });

  factory Business.fromJson(Map<String, dynamic> json) {
    return Business(
      id: json['id'] ?? '',
      nombreEstablecimiento: json['nombre_establecimiento'] ?? '',
      nombreAdmin: json['nombre_admin'] ?? '',
      apellidoAdmin: json['apellido_admin'] ?? '',
      direccion: json['direccion'] ?? '',
      correo: json['correo'] ?? '',
      rol: json['rol'] ?? '',
      estado: json['estado'] ?? false,
      tipoEstablecimiento: json['tipo_establecimiento'],
    );
  }

  // Método para obtener la imagen según el tipo
  String get imageAsset {
    if (tipoEstablecimiento == null) {
      return 'assets/images/barberia_default.jpg';
    }
    
    switch (tipoEstablecimiento!.toLowerCase()) {
      case 'barberia':
      case 'barbería':
        return 'assets/images/barberia_default.jpg';
      case 'salon':
      case 'salón':
      case 'salon de belleza':
      case 'salón de belleza':
        return 'assets/images/salon_default.jpg';
      default:
        return 'assets/images/barberia_default.jpg';
    }
  }
}
