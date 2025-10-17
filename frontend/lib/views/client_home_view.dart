import 'package:flutter/material.dart';
import '../models/business_model.dart';
import '../services/business_service.dart';

class ClientHomeView extends StatefulWidget {
  const ClientHomeView({super.key});

  @override
  State<ClientHomeView> createState() => _ClientHomeViewState();
}

class _ClientHomeViewState extends State<ClientHomeView> {
  final BusinessService _businessService = BusinessService();
  List<Business> _allBusinesses = [];
  List<Business> _filteredBusinesses = [];
  bool _isLoading = true;
  String _selectedFilter = 'Todos';
  String _errorMessage = '';

  final List<String> _filterOptions = [
    'Todos',
    'Barbería',
    'Salón de Belleza',
  ];

  @override
  void initState() {
    super.initState();
    _loadBusinesses();
  }

  Future<void> _loadBusinesses() async {
    setState(() {
      _isLoading = true;
      _errorMessage = '';
    });

    try {
      final businesses = await _businessService.getActiveBusinesses();
      setState(() {
        _allBusinesses = businesses;
        // Aplicar el filtro actual después de cargar
        if (_selectedFilter == 'Todos') {
          _filteredBusinesses = businesses;
        } else {
          _filteredBusinesses = _businessService.filterByType(businesses, _selectedFilter);
        }
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
        _errorMessage = 'Error al cargar establecimientos: $e';
      });
    }
  }

  void _filterBusinesses(String filter) {
    setState(() {
      _selectedFilter = filter;
      if (filter == 'Todos') {
        _filteredBusinesses = _allBusinesses;
      } else {
        _filteredBusinesses = _businessService.filterByType(_allBusinesses, filter);
      }
    });
  }

  void _showLogoutDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Cerrar Sesión'),
          content: const Text('¿Estás seguro de que deseas cerrar sesión?'),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancelar'),
            ),
            ElevatedButton(
              onPressed: () {
                // Cerrar el diálogo
                Navigator.pop(context);
                // Volver al login
                Navigator.pushReplacementNamed(context, '/');
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.red,
                foregroundColor: Colors.white,
              ),
              child: const Text('Cerrar Sesión'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Establecimientos'),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _loadBusinesses,
            tooltip: 'Actualizar',
          ),
        ],
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.primary,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  CircleAvatar(
                    radius: 35,
                    backgroundColor: Colors.white,
                    child: Icon(
                      Icons.person,
                      size: 40,
                      color: Theme.of(context).colorScheme.primary,
                    ),
                  ),
                  const SizedBox(height: 10),
                  const Text(
                    'Mi Cuenta',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
            ListTile(
              leading: const Icon(Icons.person_outline),
              title: const Text('Mi Perfil'),
              onTap: () {
                Navigator.pop(context); // Cerrar el drawer
                // TODO: Navegar a la vista de perfil
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Función en desarrollo'),
                    duration: Duration(seconds: 1),
                  ),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.calendar_today),
              title: const Text('Mis Citas'),
              onTap: () {
                Navigator.pop(context);
                // TODO: Navegar a la vista de citas
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Función en desarrollo'),
                    duration: Duration(seconds: 1),
                  ),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.history),
              title: const Text('Historial'),
              onTap: () {
                Navigator.pop(context);
                // TODO: Navegar al historial
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Función en desarrollo'),
                    duration: Duration(seconds: 1),
                  ),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.settings),
              title: const Text('Configuración'),
              onTap: () {
                Navigator.pop(context);
                // TODO: Navegar a configuración
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Función en desarrollo'),
                    duration: Duration(seconds: 1),
                  ),
                );
              },
            ),
            const Divider(),
            ListTile(
              leading: const Icon(Icons.help_outline),
              title: const Text('Ayuda'),
              onTap: () {
                Navigator.pop(context);
                // TODO: Mostrar ayuda
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Función en desarrollo'),
                    duration: Duration(seconds: 1),
                  ),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.info_outline),
              title: const Text('Acerca de'),
              onTap: () {
                Navigator.pop(context);
                showAboutDialog(
                  context: context,
                  applicationName: 'Stylego',
                  applicationVersion: '1.0.0',
                  applicationLegalese: '© 2025 Stylego',
                  children: [
                    const SizedBox(height: 16),
                    const Text(
                      'Tu aplicación para reservar servicios de belleza y estética.',
                    ),
                  ],
                );
              },
            ),
            const Divider(),
            ListTile(
              leading: const Icon(Icons.logout, color: Colors.red),
              title: const Text(
                'Cerrar Sesión',
                style: TextStyle(color: Colors.red),
              ),
              onTap: _showLogoutDialog,
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          // Filtros
          Container(
            padding: const EdgeInsets.all(16),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: _filterOptions.map((filter) {
                  final isSelected = _selectedFilter == filter;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8.0),
                    child: FilterChip(
                      label: Text(filter),
                      selected: isSelected,
                      onSelected: (selected) {
                        if (selected) {
                          _filterBusinesses(filter);
                        }
                      },
                      selectedColor: Theme.of(context).primaryColor.withOpacity(0.3),
                      checkmarkColor: Theme.of(context).primaryColor,
                    ),
                  );
                }).toList(),
              ),
            ),
          ),

          // Lista de establecimientos
          Expanded(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : _errorMessage.isNotEmpty
                    ? Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.error_outline,
                              size: 60,
                              color: Colors.red[300],
                            ),
                            const SizedBox(height: 16),
                            Text(
                              'Error',
                              style: Theme.of(context).textTheme.titleLarge,
                            ),
                            const SizedBox(height: 8),
                            Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 32),
                              child: Text(
                                _errorMessage,
                                textAlign: TextAlign.center,
                                style: TextStyle(color: Colors.grey[600]),
                              ),
                            ),
                            const SizedBox(height: 16),
                            ElevatedButton.icon(
                              onPressed: _loadBusinesses,
                              icon: const Icon(Icons.refresh),
                              label: const Text('Reintentar'),
                            ),
                          ],
                        ),
                      )
                    : _filteredBusinesses.isEmpty
                        ? Center(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(
                                  Icons.store_outlined,
                                  size: 60,
                                  color: Colors.grey[400],
                                ),
                                const SizedBox(height: 16),
                                Text(
                                  'No hay establecimientos disponibles',
                                  style: TextStyle(
                                    fontSize: 16,
                                    color: Colors.grey[600],
                                  ),
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  _selectedFilter == 'Todos'
                                      ? 'No se encontraron establecimientos activos'
                                      : 'No hay establecimientos de tipo $_selectedFilter',
                                  style: TextStyle(
                                    fontSize: 14,
                                    color: Colors.grey[500],
                                  ),
                                ),
                              ],
                            ),
                          )
                        : RefreshIndicator(
                            onRefresh: _loadBusinesses,
                            child: ListView.builder(
                              padding: const EdgeInsets.all(16),
                              itemCount: _filteredBusinesses.length,
                              itemBuilder: (context, index) {
                                return BusinessCard(
                                  business: _filteredBusinesses[index],
                                  onTap: () {
                                    // TODO: Navegar a detalles del establecimiento
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      SnackBar(
                                        content: Text(
                                          'Abriendo ${_filteredBusinesses[index].nombreEstablecimiento}',
                                        ),
                                      ),
                                    );
                                  },
                                );
                              },
                            ),
                          ),
          ),
        ],
      ),
    );
  }
}

// Widget para la tarjeta de cada establecimiento
class BusinessCard extends StatelessWidget {
  final Business business;
  final VoidCallback onTap;

  const BusinessCard({
    super.key,
    required this.business,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Imagen del establecimiento
            ClipRRect(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(12),
                topRight: Radius.circular(12),
              ),
              child: Container(
                height: 180,
                width: double.infinity,
                color: Colors.grey[300],
                child: Stack(
                  children: [
                    // Imagen temporal basada en el tipo
                    Center(
                      child: Icon(
                        _getIcon(),
                        size: 80,
                        color: Theme.of(context).primaryColor.withOpacity(0.5),
                      ),
                    ),
                    // Badge del tipo de establecimiento
                    if (business.tipoEstablecimiento != null)
                      Positioned(
                        top: 12,
                        right: 12,
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 12,
                            vertical: 6,
                          ),
                          decoration: BoxDecoration(
                            color: _getTypeColor().withOpacity(0.9),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            business.tipoEstablecimiento!,
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ),

            // Información del establecimiento
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Nombre del establecimiento
                  Text(
                    business.nombreEstablecimiento,
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 8),

                  // Dirección
                  Row(
                    children: [
                      Icon(
                        Icons.location_on_outlined,
                        size: 16,
                        color: Colors.grey[600],
                      ),
                      const SizedBox(width: 4),
                      Expanded(
                        child: Text(
                          business.direccion,
                          style: TextStyle(
                            color: Colors.grey[600],
                            fontSize: 14,
                          ),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  // Botón de ver detalles
                  SizedBox(
                    width: double.infinity,
                    child: OutlinedButton.icon(
                      onPressed: onTap,
                      icon: const Icon(Icons.arrow_forward, size: 18),
                      label: const Text('Ver detalles'),
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 12),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  IconData _getIcon() {
    if (business.tipoEstablecimiento == null) {
      return Icons.store;
    }

    switch (business.tipoEstablecimiento!.toLowerCase()) {
      case 'barberia':
      case 'barbería':
        return Icons.content_cut;
      case 'salon':
      case 'salón':
      case 'salon de belleza':
      case 'salón de belleza':
        return Icons.face_retouching_natural;
      default:
        return Icons.store;
    }
  }

  Color _getTypeColor() {
    if (business.tipoEstablecimiento == null) {
      return Colors.grey;
    }

    switch (business.tipoEstablecimiento!.toLowerCase()) {
      case 'barberia':
      case 'barbería':
        return Colors.blue;
      case 'salon':
      case 'salón':
      case 'salon de belleza':
      case 'salón de belleza':
        return Colors.pink;
      default:
        return Colors.grey;
    }
  }
}
