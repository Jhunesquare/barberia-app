# 🔧 Configuración rápida del Backend

## Instalar CORS

El paquete `cors` es necesario para permitir que Flutter se comunique con el backend.

```bash
cd api-backend
npm install cors
```

## Verificar que el servidor inicie correctamente

```bash
cd api-backend
npm run dev
```

Deberías ver algo como:
```
Server listening on port 3000
```

## Probar el endpoint de autenticación

Puedes probar el endpoint con `curl` o Postman:

### Con curl (Windows PowerShell):
```powershell
$body = @{
    correo = "test@example.com"
    contraseña = "password123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/v1/auth" -Method POST -Body $body -ContentType "application/json"
```

### Con curl (Git Bash o WSL):
```bash
curl -X POST http://localhost:3000/api/v1/auth \
  -H "Content-Type: application/json" \
  -d '{"correo":"test@example.com","contraseña":"password123"}'
```

### Con Postman:
1. Method: POST
2. URL: `http://localhost:3000/api/v1/auth`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "correo": "test@example.com",
  "contraseña": "password123"
}
```

## Verificar que CORS esté funcionando

Una vez instalado CORS y reiniciado el servidor, deberías ver estas cabeceras en las respuestas:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE`
- `Access-Control-Allow-Headers: Content-Type`

## Puerto del servidor

Por defecto, el servidor debería estar en el puerto **3000**. Si usas otro puerto, actualízalo en:
- `frontend/lib/config/api_config.dart`
