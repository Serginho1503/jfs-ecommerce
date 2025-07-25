# 🚀 Instrucciones de Despliegue - Jorle Fashion Store

## 📋 Pasos para Subir al Hosting

### 1. **Preparar para Producción**
```bash
# Instalar dependencias
npm install

# Crear build de producción
npm run build
```

### 2. **Archivos a Subir**
Después del build, sube SOLO la carpeta `dist/` a tu hosting:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── vite.svg
└── .htaccess (si usas Apache)
```

### 3. **Tipos de Hosting Compatibles**

#### **🌐 Hosting Compartido (cPanel)**
- Sube el contenido de `dist/` a `public_html/`
- Incluye el archivo `.htaccess` para Apache
- Compatible con: Hostinger, GoDaddy, Bluehost, etc.

#### **☁️ Hosting en la Nube**
- **Netlify**: Arrastra la carpeta `dist/`
- **Vercel**: Conecta el repositorio Git
- **GitHub Pages**: Sube a rama `gh-pages`

#### **🐳 VPS/Servidor**
- Nginx o Apache configurado
- Node.js NO requerido (es una SPA estática)
- Solo archivos estáticos

### 4. **Configuración del Servidor**

#### **Apache (.htaccess ya incluido)**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

#### **Nginx**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 5. **Variables de Entorno**
Si necesitas configurar variables:
1. Copia `.env.example` como `.env`
2. Configura tus valores
3. Ejecuta `npm run build` nuevamente

### 6. **Verificación Post-Despliegue**
✅ La página carga correctamente
✅ El slider funciona
✅ Los productos se muestran
✅ El carrito funciona
✅ Los filtros responden
✅ Es responsive en móviles

### 7. **Dominios Recomendados**
- `jorlefashion.com`
- `jorlestyle.com`
- `jorlestore.com`

### 8. **SSL/HTTPS**
- La mayoría de hostings incluyen SSL gratuito
- Asegúrate de activarlo para seguridad

## 🔧 Solución de Problemas

### **Página en blanco**
- Verifica que subiste el contenido de `dist/`, no la carpeta completa
- Revisa que `index.html` esté en la raíz

### **Rutas no funcionan**
- Asegúrate de tener `.htaccess` (Apache) o configuración Nginx
- Verifica que el servidor soporte URL rewriting

### **Imágenes no cargan**
- Las imágenes usan URLs externas (Pexels)
- No requieren configuración adicional

## 📞 Soporte
Si tienes problemas, verifica:
1. Consola del navegador (F12)
2. Logs del servidor
3. Configuración de DNS

¡Tu tienda estará online en minutos! 🎉