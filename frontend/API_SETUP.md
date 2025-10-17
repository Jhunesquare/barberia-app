# Configuración de la API Backend

## Configurar la URL del servidor

Abre el archivo `lib/config/api_config.dart` y modifica la variable `baseUrl` según tu entorno:

### 1. Desarrollo local con emulador Android:
```dart
static const String baseUrl = 'http://10.0.2.2:3000';
```

### 2. Desarrollo local con iOS Simulator:
```dart
static const String baseUrl = 'http://localhost:3000';
```

### 3. Desarrollo local con dispositivo físico:
Usa la IP de tu computadora en la red local:
```dart
static const String baseUrl = 'http://192.168.X.X:3000';
```

Para obtener tu IP:
- **Windows**: Ejecuta `ipconfig` en CMD y busca "IPv4 Address"
- **Mac/Linux**: Ejecuta `ifconfig` o `ip addr`

### 4. Producción:
```dart
static const String baseUrl = 'https://tu-dominio.com';
```

## Iniciar el servidor backend

Antes de probar el login, asegúrate de que tu servidor backend esté corriendo:

```bash
cd api-backend
npm install  # Si no has instalado las dependencias
npm start    # O el comando que uses para iniciar tu servidor
```

## Verificar la conexión

1. Asegúrate de que el backend esté corriendo en el puerto 3000 (o el puerto configurado)
2. Verifica que no haya errores de CORS en el backend
3. Revisa los logs en la consola de Flutter para ver las peticiones HTTP

## Solución de problemas

### Error de conexión:
- Verifica que el backend esté corriendo
- Verifica la URL en `api_config.dart`
- Si usas Android Emulator, usa `10.0.2.2` en lugar de `localhost`

### Error CORS:
Agrega CORS en tu backend (app.js):
```javascript
const cors = require('cors');
app.use(cors());
```

### Timeout:
Puedes ajustar el timeout en `api_config.dart`:
```dart
static const Duration timeout = Duration(seconds: 30);
```
