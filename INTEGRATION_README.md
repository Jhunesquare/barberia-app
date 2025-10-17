# 🚀 Integración de Login con API Backend

## ✅ Cambios realizados

### Frontend (Flutter)
1. **Dependencias agregadas** (`pubspec.yaml`):
   - `http`: Para realizar peticiones HTTP
   - `shared_preferences`: Para guardar datos de sesión
   - `provider`: Para manejo de estado

2. **Archivos creados**:
   - `lib/config/api_config.dart`: Configuración de URLs y endpoints
   - `lib/models/auth_models.dart`: Modelos de datos para login
   - `lib/services/auth_service.dart`: Servicio para comunicarse con la API
   - `lib/views/login_view.dart`: Vista actualizada con integración de API

3. **Vista de Login actualizada**:
   - Conectada con el servicio de autenticación
   - Manejo de errores y respuestas de la API
   - Indicadores de carga durante la petición
   - Mensajes de éxito/error mediante SnackBars

### Backend (Node.js/Express)
1. **CORS habilitado** (`src/app.js`):
   - Permite peticiones desde Flutter

2. **Bug corregido** (`src/services/auth.service.js`):
   - Variable `userSnapshot` estaba indefinida
   - Ahora devuelve el tipo de usuario (`client` o `business`)

## 📋 Pasos para probar

### 1. Instalar dependencias del backend
```bash
cd api-backend
npm install cors  # Si no está instalado
```

### 2. Iniciar el servidor backend
```bash
cd api-backend
npm start
```
El servidor debería estar corriendo en `http://localhost:3000`

### 3. Configurar la URL en Flutter

Abre `frontend/lib/config/api_config.dart` y ajusta la URL según tu entorno:

**Para Android Emulator:**
```dart
static const String baseUrl = 'http://10.0.2.2:3000';
```

**Para iOS Simulator:**
```dart
static const String baseUrl = 'http://localhost:3000';
```

**Para dispositivo físico:**
```dart
static const String baseUrl = 'http://TU_IP_LOCAL:3000';
```

Para obtener tu IP local:
- **Windows**: `ipconfig` en CMD
- **Mac/Linux**: `ifconfig` en Terminal

### 4. Instalar dependencias de Flutter
```bash
cd frontend
flutter pub get
```

### 5. Ejecutar la aplicación Flutter
```bash
cd frontend
flutter run
```

## 🔐 Probar el Login

1. Ingresa un correo electrónico de un usuario existente en tu base de datos
2. Ingresa la contraseña
3. Presiona "Iniciar Sesión"

### Respuestas esperadas:

**Login exitoso (200):**
```json
{
  "msg": "usuario [correo] logueado correctamente",
  "userType": "client" // o "business"
}
```

**Usuario no encontrado (404):**
```json
{
  "msg": "user [correo] no found"
}
```

**Contraseña incorrecta (404):**
```json
{
  "msg": "contraseña incorrecta"
}
```

**Credenciales faltantes (400):**
```json
{
  "msg": "error de credenciales"
}
```

## 🐛 Solución de problemas

### Error: "Connection refused" o "Failed to connect"
- ✅ Verifica que el backend esté corriendo
- ✅ Verifica la URL en `api_config.dart`
- ✅ Si usas Android Emulator, usa `10.0.2.2` en lugar de `localhost`

### Error: "CORS policy"
- ✅ Verifica que `cors` esté instalado en el backend
- ✅ Verifica que `app.use(cors())` esté en `app.js`

### Error: "404 Not Found"
- ✅ Verifica que el usuario exista en Firebase
- ✅ Verifica que el endpoint sea correcto: `POST /api/v1/auth`

### La contraseña siempre falla
- ✅ Verifica que las contraseñas en Firebase estén hasheadas con bcrypt
- ✅ Verifica que el campo en Firebase se llame `contraseña`

## 📱 Ver los logs

### Logs de Flutter:
Los verás en la consola donde ejecutaste `flutter run`, incluyendo:
- URL de la petición
- Datos enviados
- Status code
- Respuesta del servidor

### Logs del Backend:
Los verás en la consola donde ejecutaste `npm start`, incluyendo:
- Tipo de usuario (cliente o empresa)
- Errores de Firebase o bcrypt

## 🔜 Próximos pasos

1. **Guardar sesión**: Usar SharedPreferences para mantener al usuario logueado
2. **Navegación**: Crear pantalla principal y navegar después del login exitoso
3. **Token JWT**: Implementar tokens para autenticación persistente
4. **Registro**: Crear la vista de registro de usuarios
5. **Recuperar contraseña**: Implementar función de recuperación de contraseña

## 📁 Estructura de archivos creada

```
frontend/
├── lib/
│   ├── config/
│   │   └── api_config.dart          # Configuración de API
│   ├── models/
│   │   └── auth_models.dart         # Modelos de autenticación
│   ├── services/
│   │   └── auth_service.dart        # Servicio de autenticación
│   └── views/
│       └── login_view.dart          # Vista de login actualizada
└── API_SETUP.md                     # Guía de configuración
```
