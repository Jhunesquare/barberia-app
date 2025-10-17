import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api_config.dart';
import '../models/business_model.dart';

class BusinessService {
  // Obtener todos los establecimientos activos
  Future<List<Business>> getActiveBusinesses() async {
    try {
      print('Obteniendo empresas desde: ${ApiConfig.baseUrl}${ApiConfig.businessEndpoint}');

      final response = await http
          .get(
            Uri.parse('${ApiConfig.baseUrl}${ApiConfig.businessEndpoint}'),
            headers: {
              'Content-Type': 'application/json',
            },
          )
          .timeout(ApiConfig.timeout);

      print('Status Code: ${response.statusCode}');
      print('Response Body: ${response.body}');

      if (response.statusCode == 200) {
        final jsonResponse = jsonDecode(response.body);
        final List<dynamic> businessList = jsonResponse['data_list'] ?? [];
        
        return businessList.map((json) => Business.fromJson(json)).toList();
      } else if (response.statusCode == 404) {
        // No hay establecimientos
        return [];
      } else {
        throw Exception('Error al obtener establecimientos: ${response.statusCode}');
      }
    } catch (e) {
      print('Error en getActiveBusinesses: $e');
      throw Exception('Error de conexión: ${e.toString()}');
    }
  }

  // Filtrar establecimientos por tipo
  List<Business> filterByType(List<Business> businesses, String? type) {
    if (type == null || type.isEmpty || type == 'Todos') {
      return businesses;
    }
    
    return businesses.where((business) {
      if (business.tipoEstablecimiento == null) {
        return false;
      }
      return business.tipoEstablecimiento!.toLowerCase().contains(type.toLowerCase());
    }).toList();
  }
}
