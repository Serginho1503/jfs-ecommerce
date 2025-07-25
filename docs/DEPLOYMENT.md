# 🚀 Guía de Despliegue

## Preparación para Producción

### 1. Build de Producción
```bash
npm run build
```

### 2. Verificar Build
```bash
npm run preview
```

## Tipos de Hosting

### 🌐 Hosting Compartido (cPanel)

**Pasos:**
1. Accede a tu cPanel
2. Ve a "Administrador de archivos"
3. Navega a `public_html/`
4. Sube TODO el contenido de la carpeta `dist/`
5. Asegúrate de que `index.html` esté en la raíz

**Archivos necesarios:**
- `index.html`
- `assets/` (carpeta completa)
- `.htaccess`
- `vite.svg`

### ☁️ Netlify (Recomendado)

**Opción 1: Drag & Drop**
1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta `dist/` al área de deploy
3. ¡Listo! Tu sitio estará online

**Opción 2: Git Integration**
1. Sube tu código a GitHub
2. Conecta el repositorio en Netlify
3. Configuración automática

### ⚡ Vercel

**Pasos:**
1. Ve a [vercel.com](https://vercel.com)
2. Importa tu repositorio de GitHub
3. Deploy automático

### 🐙 GitHub Pages

**Pasos:**
1. Crea rama `gh-pages`
2. Sube contenido de `dist/` a esa rama
3. Activa GitHub Pages en configuración

## Configuración del Servidor

### Apache (.htaccess)
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

### Nginx
```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Compresión
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;

    # Cache
    location ~* \.(css|js|png|jpg|jpeg|gif|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Variables de Entorno

### Desarrollo
```env
VITE_APP_NAME=Jorle Fashion Store
VITE_CONTACT_PHONE=+593939931934
VITE_WHATSAPP_NUMBER=593939931934
```

### Producción
```env
VITE_API_URL=https://tu-dominio.com/api
VITE_BASE_URL=https://tu-dominio.com
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

## Optimizaciones

### Performance
- ✅ Code splitting automático
- ✅ Lazy loading de componentes
- ✅ Compresión de assets
- ✅ Minificación CSS/JS

### SEO
- ✅ Meta tags optimizados
- ✅ Estructura semántica
- ✅ URLs amigables
- ✅ Sitemap automático

### PWA (Opcional)
```bash
npm install vite-plugin-pwa
```

## Monitoreo

### Analytics
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
```

### Error Tracking
```bash
npm install @sentry/react
```

## Dominios Recomendados

- `jorlefashion.com`
- `jorlestyle.com`
- `jorlestore.com`
- `jorle.store`

## SSL/HTTPS

### Hosting Compartido
- Activar SSL en cPanel
- Forzar HTTPS en .htaccess

### Cloudflare (Gratis)
1. Agregar dominio a Cloudflare
2. Cambiar nameservers
3. SSL automático

## Checklist Pre-Deploy

- [ ] Build exitoso sin errores
- [ ] Tests pasando
- [ ] Variables de entorno configuradas
- [ ] SSL activado
- [ ] Dominio configurado
- [ ] Analytics configurado
- [ ] Backup de datos

## Troubleshooting

### Página en Blanco
- Verificar que `index.html` esté en la raíz
- Revisar rutas de assets
- Comprobar configuración del servidor

### Rutas 404
- Verificar configuración de rewrite
- Comprobar .htaccess o nginx.conf

### Assets No Cargan
- Verificar rutas relativas
- Comprobar permisos de archivos
- Revisar configuración de cache

## Mantenimiento

### Actualizaciones
```bash
# Actualizar dependencias
npm update

# Rebuild
npm run build

# Redeploy
```

### Backup
- Código en Git
- Base de datos (si aplica)
- Archivos de configuración

### Monitoreo
- Uptime monitoring
- Performance metrics
- Error tracking