# 🚀 GUÍA COMPLETA DE DESPLIEGUE - JORLE FASHION STORE

## 📋 PASOS PARA SUBIR AL HOSTING

### 1. **PREPARAR EL PROYECTO**

```bash
# 1. Instalar dependencias
npm install

# 2. Crear build de producción
npm run build
```

### 2. **ARCHIVOS A SUBIR AL HOSTING**

Sube **ÚNICAMENTE** el contenido de la carpeta `dist/` a tu hosting:

```
📁 public_html/ (o www/)
├── index.html
├── 📁 assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── vite.svg
├── .htaccess
├── 📁 api/
│   └── products.php
├── 📁 uploads/ (crear carpeta vacía)
├── 📁 css/
│   └── admin.css
└── 📁 js/
    └── admin.js
```

### 3. **CONFIGURACIÓN DE BASE DE DATOS**

#### **Credenciales actuales:**
```php
$conn1 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_gaviota");
$conn2 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_jorlerosales");
$conn3 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_jorle");
```

#### **Estructura de tablas requerida:**
```sql
-- Tabla productos (en las 3 bases de datos)
CREATE TABLE producto (
    pro_id VARCHAR(50) PRIMARY KEY,
    pro_nombre VARCHAR(255) NOT NULL,
    pro_precioventa DECIMAL(10,2) NOT NULL,
    imagen_path VARCHAR(500),
    pro_talla VARCHAR(50),
    pro_color VARCHAR(50)
);

-- Tabla stock (en las 3 bases de datos)
CREATE TABLE almapro (
    id_pro VARCHAR(50),
    existencia INT DEFAULT 0,
    FOREIGN KEY (id_pro) REFERENCES producto(pro_id)
);
```

### 4. **ARCHIVOS PHP NECESARIOS**

#### **A. API de Productos** (`api/products.php`)
- ✅ Ya incluido en el proyecto
- Conecta a las 3 bases de datos
- Maneja filtros y paginación
- Devuelve JSON para el frontend

#### **B. Guardar Pedidos** (`save_order.php`)
- ✅ Ya incluido en el proyecto
- Guarda pedidos en base de datos
- Integra con WhatsApp

### 5. **CONFIGURACIÓN DEL HOSTING**

#### **A. Permisos de Carpetas**
```bash
chmod 755 public_html/
chmod 755 public_html/uploads/
chmod 644 public_html/.htaccess
```

#### **B. Configuración Apache** (`.htaccess`)
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Compresión GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/javascript
</IfModule>

# Cache
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
</IfModule>
```

### 6. **VERIFICACIÓN POST-DESPLIEGUE**

#### **Checklist de funcionamiento:**
- [ ] ✅ La página principal carga
- [ ] ✅ Los productos se muestran desde la base de datos
- [ ] ✅ Los filtros funcionan (tienda, talla, color)
- [ ] ✅ La búsqueda funciona
- [ ] ✅ El carrito funciona
- [ ] ✅ El checkout funciona
- [ ] ✅ WhatsApp se abre correctamente
- [ ] ✅ Es responsive en móviles

#### **URLs de prueba:**
```
https://tu-dominio.com/                    # Página principal
https://tu-dominio.com/api/products.php    # API de productos (debe devolver JSON)
```

### 7. **HOSTINGS COMPATIBLES**

#### **✅ Recomendados:**
- **Hostinger** - Soporte PHP + MySQL
- **GoDaddy** - Hosting compartido
- **Bluehost** - WordPress + PHP
- **SiteGround** - Hosting premium
- **Namecheap** - Hosting económico

#### **✅ Características necesarias:**
- PHP 7.4 o superior
- MySQL 5.7 o superior
- Soporte para .htaccess
- Al menos 1GB de espacio

### 8. **CONFIGURACIÓN DE DOMINIO**

#### **A. DNS Records:**
```
A Record: @ → IP del hosting
CNAME: www → tu-dominio.com
```

#### **B. SSL Certificate:**
- La mayoría de hostings incluyen SSL gratuito
- Activar "Force HTTPS" en el panel de control

### 9. **MANTENIMIENTO**

#### **A. Backups regulares:**
- Base de datos (semanal)
- Archivos del sitio (mensual)
- Configuraciones (antes de cambios)

#### **B. Actualizaciones:**
- Revisar logs de errores mensualmente
- Actualizar productos regularmente
- Monitorear rendimiento

### 10. **SOLUCIÓN DE PROBLEMAS**

#### **Página en blanco:**
```bash
# Verificar permisos
chmod 644 index.html
chmod 755 assets/

# Verificar .htaccess
# Revisar logs de error del hosting
```

#### **API no funciona:**
```bash
# Verificar conexión a base de datos
# Revisar credenciales en products.php
# Verificar que las tablas existan
```

#### **WhatsApp no abre:**
```bash
# Verificar número de teléfono: 593939931934
# Verificar formato del mensaje
# Probar en diferentes navegadores
```

---

## 🎉 ¡LISTO PARA PRODUCCIÓN!

Tu tienda **Jorle Fashion Store** está completamente preparada para ser desplegada en cualquier hosting que soporte PHP y MySQL.

### 📞 **Contacto configurado:**
- **WhatsApp:** +593 93 993 1934
- **Tiendas:** Gaviota, Rosales, Sauces

### 🛍️ **Funcionalidades incluidas:**
- Catálogo de productos desde base de datos real
- Carrito de compras persistente
- Checkout con selección de tienda
- Integración WhatsApp automática
- Panel de administración (opcional)
- Diseño responsive premium

**¡Tu tienda estará online en minutos!** 🚀