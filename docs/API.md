# 📡 Documentación de API

## Endpoints Simulados

La aplicación actualmente usa datos simulados, pero está preparada para conectarse a una API real.

## Estructura de Datos

### Producto
```json
{
  "pro_id": "string",
  "pro_nombre": "string",
  "pro_precioventa": "string",
  "imagen_path": "string",
  "pro_talla": "string",
  "pro_color": "string",
  "stock": ["string"],
  "categoria": "string",
  "descripcion": "string",
  "rating": "number",
  "reviews": "number",
  "isNew": "boolean",
  "isOnSale": "boolean",
  "originalPrice": "string"
}
```

### Pedido
```json
{
  "numero_pedido": "string",
  "tipo_entrega": "pickup|shipping",
  "nombres": "string",
  "cedula": "string",
  "telefono": "string",
  "ciudad": "string",
  "provincia": "string",
  "direccion": "string",
  "productos": "string", // JSON stringified
  "total": "number",
  "fecha_pedido": "string"
}
```

## Endpoints Futuros

### Productos

#### GET /api/products
Obtener lista de productos con filtros

**Query Parameters:**
- `page`: Número de página
- `limit`: Productos por página
- `tiendas[]`: IDs de tiendas
- `tallas[]`: Tallas
- `colores[]`: Colores
- `search`: Término de búsqueda

**Response:**
```json
{
  "products": [Product],
  "total": "number",
  "pages": "number",
  "currentPage": "number"
}
```

#### GET /api/products/:id
Obtener producto específico

**Response:**
```json
{
  "product": Product
}
```

#### POST /api/products/search
Búsqueda de productos

**Body:**
```json
{
  "query": "string",
  "filters": {
    "tiendas": ["number"],
    "tallas": ["string"],
    "colores": ["string"]
  }
}
```

### Pedidos

#### POST /api/orders
Crear nuevo pedido

**Body:**
```json
{
  "numero_pedido": "string",
  "tipo_entrega": "pickup|shipping",
  "customer_data": {
    "nombres": "string",
    "cedula": "string",
    "telefono": "string",
    "ciudad": "string",
    "provincia": "string",
    "direccion": "string"
  },
  "items": [CartItem],
  "total": "number"
}
```

**Response:**
```json
{
  "success": "boolean",
  "order_id": "string",
  "message": "string"
}
```

#### GET /api/orders/:id
Obtener pedido específico

**Response:**
```json
{
  "order": Order,
  "status": "string"
}
```

## Implementación con Backend

### PHP (Recomendado para hosting compartido)

```php
<?php
// api/products.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        getProducts();
        break;
    case 'POST':
        searchProducts();
        break;
}

function getProducts() {
    // Conectar a base de datos
    // Aplicar filtros
    // Retornar JSON
}
?>
```

### Node.js + Express

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/products', (req, res) => {
  // Lógica de productos
});

app.post('/api/orders', (req, res) => {
  // Lógica de pedidos
});

app.listen(3000);
```

## Base de Datos

### Tabla: productos
```sql
CREATE TABLE productos (
  pro_id VARCHAR(50) PRIMARY KEY,
  pro_nombre VARCHAR(255) NOT NULL,
  pro_precioventa DECIMAL(10,2) NOT NULL,
  imagen_path VARCHAR(500),
  pro_talla VARCHAR(10),
  pro_color VARCHAR(50),
  categoria VARCHAR(100),
  descripcion TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews INT DEFAULT 0,
  is_new BOOLEAN DEFAULT FALSE,
  is_on_sale BOOLEAN DEFAULT FALSE,
  original_price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla: stock
```sql
CREATE TABLE stock (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pro_id VARCHAR(50),
  tienda_id INT,
  cantidad INT DEFAULT 0,
  FOREIGN KEY (pro_id) REFERENCES productos(pro_id)
);
```

### Tabla: pedidos
```sql
CREATE TABLE pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  numero_pedido VARCHAR(100) UNIQUE NOT NULL,
  tipo_entrega ENUM('pickup', 'shipping'),
  nombres VARCHAR(255),
  cedula VARCHAR(20),
  telefono VARCHAR(20),
  ciudad VARCHAR(100),
  provincia VARCHAR(100),
  direccion TEXT,
  productos JSON,
  total DECIMAL(10,2),
  estado ENUM('pendiente', 'confirmado', 'enviado', 'entregado') DEFAULT 'pendiente',
  fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Autenticación (Futuro)

### JWT Token
```javascript
// Login
POST /api/auth/login
{
  "email": "string",
  "password": "string"
}

// Response
{
  "token": "jwt_token",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string"
  }
}
```

### Headers
```javascript
Authorization: Bearer jwt_token
```

## Rate Limiting

```javascript
// 100 requests per 15 minutes
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));
```

## Error Handling

### Códigos de Estado
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

### Formato de Error
```json
{
  "error": true,
  "message": "Descripción del error",
  "code": "ERROR_CODE",
  "details": {}
}
```

## Testing API

### Postman Collection
```json
{
  "info": {
    "name": "Jorle Fashion Store API"
  },
  "item": [
    {
      "name": "Get Products",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/api/products"
      }
    }
  ]
}
```

### cURL Examples
```bash
# Obtener productos
curl -X GET "https://api.jorlefashion.com/products"

# Crear pedido
curl -X POST "https://api.jorlefashion.com/orders" \
  -H "Content-Type: application/json" \
  -d '{"numero_pedido":"PED-001","total":89.99}'
```