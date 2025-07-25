<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Conexión a las bases de datos de las tiendas
$conn1 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_gaviota"); // Tienda Gaviota
$conn2 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_jorlerosales"); // Tienda Rosales
$conn3 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_jorle"); // Tienda Sauces

// Verificar conexiones
$connections = [
    1 => ['conn' => $conn1, 'name' => 'Gaviota'],
    2 => ['conn' => $conn2, 'name' => 'Rosales'],
    3 => ['conn' => $conn3, 'name' => 'Sauces']
];

foreach ($connections as $id => $connection) {
    if ($connection['conn']->connect_error) {
        http_response_code(500);
        echo json_encode(['error' => 'Error de conexión a ' . $connection['name'] . ': ' . $connection['conn']->connect_error]);
        exit;
    }
}

function getProductsFromAllStores($connections, $filters = []) {
    $allProducts = [];
    $productMap = [];

    foreach ($connections as $tiendaId => $connection) {
        $conn = $connection['conn'];
        $tiendaName = $connection['name'];
        
        // Query base - ajusta los nombres de las columnas según tu base de datos
        $sql = "SELECT 
                    pro_id,
                    pro_nombre,
                    pro_precioventa,
                    imagen_path,
                    pro_talla,
                    pro_color,
                    stock_cantidad,
                    categoria
                FROM productos 
                WHERE stock_cantidad > 0";
        
        // Aplicar filtros
        $params = [];
        $types = "";
        
        if (!empty($filters['search'])) {
            $sql .= " AND pro_nombre LIKE ?";
            $params[] = "%" . $filters['search'] . "%";
            $types .= "s";
        }
        
        if (!empty($filters['tallas'])) {
            $placeholders = str_repeat('?,', count($filters['tallas']) - 1) . '?';
            $sql .= " AND pro_talla IN ($placeholders)";
            $params = array_merge($params, $filters['tallas']);
            $types .= str_repeat('s', count($filters['tallas']));
        }
        
        if (!empty($filters['colores'])) {
            $placeholders = str_repeat('?,', count($filters['colores']) - 1) . '?';
            $sql .= " AND pro_color IN ($placeholders)";
            $params = array_merge($params, $filters['colores']);
            $types .= str_repeat('s', count($filters['colores']));
        }
        
        $stmt = $conn->prepare($sql);
        
        if (!empty($params)) {
            $stmt->bind_param($types, ...$params);
        }
        
        $stmt->execute();
        $result = $stmt->get_result();
        
        while ($row = $result->fetch_assoc()) {
            $productKey = $row['pro_id'] . '_' . $row['pro_talla'] . '_' . $row['pro_color'];
            
            if (!isset($productMap[$productKey])) {
                $productMap[$productKey] = [
                    'pro_id' => $row['pro_id'],
                    'pro_nombre' => $row['pro_nombre'],
                    'pro_precioventa' => $row['pro_precioventa'],
                    'imagen_path' => $row['imagen_path'],
                    'pro_talla' => $row['pro_talla'],
                    'pro_color' => $row['pro_color'],
                    'categoria' => $row['categoria'] ?? 'general',
                    'stock' => [],
                    'rating' => 4.5 + (rand(0, 8) / 10), // Rating simulado
                    'reviews' => rand(20, 200),
                    'isNew' => rand(0, 1) === 1,
                    'isOnSale' => rand(0, 1) === 1
                ];
            }
            
            // Agregar stock de esta tienda
            if ($row['stock_cantidad'] > 0) {
                $productMap[$productKey]['stock'][] = "Tienda {$tiendaName}: {$row['stock_cantidad']}";
            }
        }
        
        $stmt->close();
    }
    
    // Filtrar por tiendas si se especifica
    if (!empty($filters['tiendas'])) {
        $tiendaNames = [];
        foreach ($filters['tiendas'] as $tiendaId) {
            if (isset($connections[$tiendaId])) {
                $tiendaNames[] = $connections[$tiendaId]['name'];
            }
        }
        
        $productMap = array_filter($productMap, function($product) use ($tiendaNames) {
            foreach ($product['stock'] as $stockInfo) {
                foreach ($tiendaNames as $tiendaName) {
                    if (strpos($stockInfo, "Tienda {$tiendaName}:") !== false) {
                        return true;
                    }
                }
            }
            return false;
        });
    }
    
    return array_values($productMap);
}

// Procesar la solicitud
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET' || $method === 'POST') {
    $filters = [];
    
    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $filters = $input ?? [];
    } else {
        $filters = $_GET;
    }
    
    // Convertir strings de arrays a arrays reales
    if (isset($filters['tiendas']) && is_string($filters['tiendas'])) {
        $filters['tiendas'] = json_decode($filters['tiendas'], true) ?? [];
    }
    if (isset($filters['tallas']) && is_string($filters['tallas'])) {
        $filters['tallas'] = json_decode($filters['tallas'], true) ?? [];
    }
    if (isset($filters['colores']) && is_string($filters['colores'])) {
        $filters['colores'] = json_decode($filters['colores'], true) ?? [];
    }
    
    try {
        $products = getProductsFromAllStores($connections, $filters);
        
        // Paginación
        $page = isset($filters['page']) ? (int)$filters['page'] : 1;
        $limit = isset($filters['limit']) ? (int)$filters['limit'] : 12;
        $offset = ($page - 1) * $limit;
        
        $totalProducts = count($products);
        $totalPages = ceil($totalProducts / $limit);
        $paginatedProducts = array_slice($products, $offset, $limit);
        
        echo json_encode([
            'success' => true,
            'products' => $paginatedProducts,
            'pagination' => [
                'total' => $totalProducts,
                'pages' => $totalPages,
                'current_page' => $page,
                'per_page' => $limit
            ]
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error al obtener productos: ' . $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}

// Cerrar conexiones
foreach ($connections as $connection) {
    $connection['conn']->close();
}
?>