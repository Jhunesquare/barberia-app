# 📝 Vista de Registro con Pestañas

## ✅ Implementación Completa

He creado una vista de registro profesional con dos pestañas (tabs) para registrar tanto clientes como barberías/empresas.

### 📱 Características de la Vista

#### **Pestaña 1: Registro de Cliente**
Campos del formulario:
- ✅ Nombre
- ✅ Apellido
- ✅ Correo electrónico
- ✅ Celular
- ✅ Contraseña
- ✅ Confirmar contraseña

#### **Pestaña 2: Registro de Barbería**
Campos del formulario:
- ✅ Nombre del establecimiento
- ✅ Dirección
- ✅ Nombre del administrador
- ✅ Apellido del administrador
- ✅ Correo electrónico
- ✅ Contraseña
- ✅ Confirmar contraseña

### 🎨 Características de UI/UX

1. **TabBar con íconos:**
   - 👤 Icono de persona para cliente
   - 🏪 Icono de tienda para barbería

2. **Validaciones en todos los campos:**
   - Campos obligatorios
   - Validación de formato de correo
   - Validación de longitud de contraseña (mínimo 6 caracteres)
   - Validación de coincidencia de contraseñas
   - Validación de número de celular (mínimo 10 dígitos)

3. **Experiencia de usuario:**
   - Indicadores de carga durante el registro
   - Mensajes de éxito/error con SnackBars
   - Navegación automática al login después del registro exitoso
   - Campos con íconos descriptivos
   - Opción de mostrar/ocultar contraseña

4. **Diseño responsive:**
   - ScrollView para adaptarse a diferentes tamaños de pantalla
   - Padding consistente
   - Diseño Material 3

### 📁 Archivos Creados

```
frontend/lib/
├── models/
│   └── register_models.dart          # Modelos de datos para registro
├── services/
│   └── register_service.dart         # Servicio de registro (cliente y empresa)
└── views/
    └── register_view.dart             # Vista con pestañas de registro
```

### 🔌 Integración con API

#### **Endpoint para registrar cliente:**
```
POST http://10.0.2.2:3000/api/v1/client/create_client
```

**Body:**
```json
{
  "correo": "cliente@example.com",
  "contraseña": "password123",
  "nombre": "Juan",
  "apellido": "Pérez",
  "celular": "1234567890"
}
```

#### **Endpoint para registrar empresa:**
```
POST http://10.0.2.2:3000/api/v1/business/create_business
```

**Body:**
```json
{
  "nombre_establecimiento": "Barbería El Estilo",
  "nombre_admin": "Carlos",
  "apellido_admin": "González",
  "correo": "admin@barberia.com",
  "direccion": "Calle Principal #123",
  "contraseña": "password123",
  "rol": "admin"
}
```

### 🚀 Cómo usar

1. **Desde la vista de login:**
   - Presiona el botón "Crear cuenta nueva"
   - Se abrirá la vista de registro con pestañas

2. **Registrar un cliente:**
   - Asegúrate de estar en la pestaña "Cliente"
   - Completa todos los campos
   - Presiona "Registrarse"
   - Si es exitoso, volverás al login automáticamente

3. **Registrar una barbería:**
   - Cambia a la pestaña "Barbería"
   - Completa todos los campos
   - Presiona "Registrar Barbería"
   - Si es exitoso, volverás al login automáticamente

### 🧪 Probar la funcionalidad

1. **Ejecuta el backend:**
```bash
cd api-backend
npm run dev
```

2. **Ejecuta la aplicación Flutter:**
```bash
cd frontend
flutter run
```

3. **Flujo de prueba:**
   - Abre la app
   - Presiona "Crear cuenta nueva"
   - Cambia entre las pestañas para ver los diferentes formularios
   - Completa un formulario y registra un usuario
   - Verifica en la consola del backend que la petición llegó
   - Después del registro exitoso, deberías volver al login

### 🐛 Solución de problemas

#### Error "Datos inválidos" o "error de credenciales":
- Verifica que todos los campos requeridos estén completos
- Revisa los logs en la consola de Flutter para ver qué datos se enviaron
- Verifica los logs del backend para ver qué campo falta

#### Error de conexión:
- Asegúrate de que el backend esté corriendo
- Verifica que la URL en `api_config.dart` sea correcta (`http://10.0.2.2:3000`)
- Verifica que CORS esté habilitado en el backend

#### El formulario no valida:
- Asegúrate de llenar todos los campos obligatorios
- Verifica que el correo tenga formato válido
- Verifica que las contraseñas coincidan
- Verifica que la contraseña tenga al menos 6 caracteres

### 🔜 Mejoras futuras sugeridas

1. **Verificación de correo:** Enviar email de verificación
2. **Subir imagen:** Agregar foto de perfil o logo de la barbería
3. **Términos y condiciones:** Checkbox para aceptar términos
4. **Validación del backend:** Verificar que el correo no esté registrado
5. **Guardar sesión:** Iniciar sesión automáticamente después del registro
6. **Más campos para barbería:** Horarios, servicios, etc.

### 📊 Estructura del código

La vista está dividida en 3 componentes principales:

1. **RegisterView:** Widget principal con el TabController
2. **ClientRegisterForm:** Formulario de registro para clientes
3. **BusinessRegisterForm:** Formulario de registro para barberías

Cada formulario tiene su propio estado y controladores independientes, lo que facilita el mantenimiento y las futuras modificaciones.

### 🎯 Validaciones implementadas

| Campo | Validación |
|-------|-----------|
| Nombre/Apellido | No vacío |
| Correo | Formato válido de email |
| Celular | Mínimo 10 dígitos |
| Contraseña | Mínimo 6 caracteres |
| Confirmar contraseña | Debe coincidir con la contraseña |
| Nombre establecimiento | No vacío |
| Dirección | No vacío |

---

## 📱 Capturas de funcionalidades

- ✅ Pestañas para alternar entre Cliente y Barbería
- ✅ Formularios con validación en tiempo real
- ✅ Botones de mostrar/ocultar contraseña
- ✅ Indicadores de carga durante el registro
- ✅ Mensajes de éxito/error
- ✅ Navegación automática al login después del registro
