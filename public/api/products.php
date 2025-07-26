<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Activar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Conexiones a las tres bases de datos (usando las mismas credenciales de tus archivos)
$conn1 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_gaviota"); // Tienda Gaviota
$conn2 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_jorlerosales"); // Tienda Rosales
$conn3 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_jorle"); // Tienda Sauces

if ($conn1->connect_error || $conn2->connect_error || $conn3->connect_error) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => "Error de conexión en alguna tienda: " . 
            $conn1->connect_error . " / " . $conn2->connect_error . " / " . $conn3->connect_error
    ]);
    exit;
}

// Configuración de paginación
$productos_por_pagina = 12;
$pagina_actual = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($pagina_actual - 1) * $productos_por_pagina;

// Construir condiciones de filtrado
$conditions = [];
$params = [];
$types = "";

// Filtro por búsqueda
$search_term = isset($_GET['search']) ? trim($_GET['search']) : '';
if (!empty($search_term)) {
    $conditions[] = "p.pro_nombre LIKE ?";
    $types .= 's';
    $params[] = '%' . $search_term . '%';
}

// Filtro por tienda (convertir array de IDs a números)
$tiendas_seleccionadas = [];
if (isset($_GET['tiendas']) && is_array($_GET['tiendas'])) {
    $tiendas_seleccionadas = array_map('intval', $_GET['tiendas']);
}

// Filtro por talla
$tallas_seleccionadas = [];
if (isset($_GET['tallas']) && is_array($_GET['tallas'])) {
    $tallas_seleccionadas = $_GET['tallas'];
}

// Filtro por color
$colores_seleccionados = [];
if (isset($_GET['colores']) && is_array($_GET['colores'])) {
    $colores_seleccionados = $_GET['colores'];
}

// Consulta base para productos (usando la misma estructura de tus archivos)
$sql_productos = "SELECT DISTINCT p.pro_id, p.pro_nombre, p.pro_precioventa, p.imagen_path, p.pro_talla, p.pro_color
                 FROM producto p
                 INNER JOIN almapro ap ON p.pro_id = ap.id_pro
                 WHERE ap.existencia > 0";

// Agregar condiciones de filtrado
if (!empty($tallas_seleccionadas)) {
    $tallas_placeholders = implode(',', array_fill(0, count($tallas_seleccionadas), '?'));
    $conditions[] = "p.pro_talla IN ($tallas_placeholders)";
    $types .= str_repeat('s', count($tallas_seleccionadas));
    $params = array_merge($params, $tallas_seleccionadas);
}

if (!empty($colores_seleccionados)) {
    $colores_placeholders = implode(',', array_fill(0, count($colores_seleccionados), '?'));
    $conditions[] = "p.pro_color IN ($colores_placeholders)";
    $types .= str_repeat('s', count($colores_seleccionados));
    $params = array_merge($params, $colores_seleccionados);
}

if (!empty($conditions)) {
    $sql_productos .= " AND " . implode(" AND ", $conditions);
}

// Obtener productos de todas las tiendas (igual que en tus archivos)
$productos_unicos = [];
$tienda_productos = [];

// Tienda 1 (Gaviota)
$stmt1 = $conn1->prepare($sql_productos);
if ($stmt1 === false) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => "Error al preparar la consulta para Tienda Gaviota: " . $conn1->error
    ]);
    exit;
}
if (!empty($params)) {
    $stmt1->bind_param($types, ...$params);
}
$stmt1->execute();
$result_productos1 = $stmt1->get_result();
while ($row = $result_productos1->fetch_assoc()) {
    $productos_unicos[$row['pro_id']] = $row;
    $tienda_productos[$row['pro_id']][] = 1;
}

// Tienda 2 (Rosales)
$stmt2 = $conn2->prepare($sql_productos);
if ($stmt2 === false) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => "Error al preparar la consulta para Tienda Rosales: " . $conn2->error
    ]);
    exit;
}
if (!empty($params)) {
    $stmt2->bind_param($types, ...$params);
}
$stmt2->execute();
$result_productos2 = $stmt2->get_result();
while ($row = $result_productos2->fetch_assoc()) {
    if (!isset($productos_unicos[$row['pro_id']])) {
        $productos_unicos[$row['pro_id']] = $row;
    }
    $tienda_productos[$row['pro_id']][] = 2;
}

// Tienda 3 (Sauces)
$stmt3 = $conn3->prepare($sql_productos);
if ($stmt3 === false) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => "Error al preparar la consulta para Tienda Sauces: " . $conn3->error
    ]);
    exit;
}
if (!empty($params)) {
    $stmt3->bind_param($types, ...$params);
}
$stmt3->execute();
$result_productos3 = $stmt3->get_result();
while ($row = $result_productos3->fetch_assoc()) {
    if (!isset($productos_unicos[$row['pro_id']])) {
        $productos_unicos[$row['pro_id']] = $row;
    }
    $tienda_productos[$row['pro_id']][] = 3;
}

// Filtrar por tiendas seleccionadas
if (!empty($tiendas_seleccionadas)) {
    $productos_filtrados = [];
    foreach ($productos_unicos as $pro_id => $producto) {
        $tiendas_producto = $tienda_productos[$pro_id];
        $coincide = false;
        foreach ($tiendas_seleccionadas as $tienda) {
            if (in_array($tienda, $tiendas_producto)) {
                $coincide = true;
                break;
            }
        }
        if ($coincide) {
            $productos_filtrados[$pro_id] = $producto;
        }
    }
    $productos_unicos = $productos_filtrados;
}

// Total de productos y paginación
$total_productos = count($productos_unicos);
$total_paginas = ceil($total_productos / $productos_por_pagina);
$productos_pagina = array_slice($productos_unicos, $offset, $productos_por_pagina, true);

// Consulta de stock por tienda para cada producto
$sql_stock = "SELECT ap.existencia 
              FROM almapro ap
              WHERE ap.id_pro = ? AND ap.existencia > 0";

// Agregar información de stock a cada producto
$productos_con_stock = [];
foreach ($productos_pagina as $producto) {
    $stock_info = [];
    
    // Tienda 1 (Gaviota)
    $stmt1 = $conn1->prepare($sql_stock);
    $stmt1->bind_param("s", $producto['pro_id']);
    $stmt1->execute();
    $result1 = $stmt1->get_result();
    if ($row1 = $result1->fetch_assoc()) {
        $stock_info[] = "Tienda Gaviota: " . $row1['existencia'];
    }
    
    // Tienda 2 (Rosales)
    $stmt2 = $conn2->prepare($sql_stock);
    $stmt2->bind_param("s", $producto['pro_id']);
    $stmt2->execute();
    $result2 = $stmt2->get_result();
    if ($row2 = $result2->fetch_assoc()) {
        $stock_info[] = "Tienda Rosales: " . $row2['existencia'];
    }
    
    // Tienda 3 (Sauces)
    $stmt3 = $conn3->prepare($sql_stock);
    $stmt3->bind_param("s", $producto['pro_id']);
    $stmt3->execute();
    $result3 = $stmt3->get_result();
    if ($row3 = $result3->fetch_assoc()) {
        $stock_info[] = "Tienda Sauces: " . $row3['existencia'];
    }
    
    // Agregar información de stock al producto
    $producto['stock'] = $stock_info;
    $producto['categoria'] = 'General'; // Valor por defecto
    $producto['rating'] = 4.5; // Valor por defecto
    $producto['reviews'] = rand(10, 200); // Valor aleatorio
    $producto['isNew'] = rand(0, 1) == 1;
    $producto['isOnSale'] = rand(0, 1) == 1;
    
    $productos_con_stock[] = $producto;
}

// Cerrar conexiones
$conn1->close();
$conn2->close();
$conn3->close();

// Devolver respuesta JSON
echo json_encode([
    'success' => true,
    'products' => $productos_con_stock,
    'pagination' => [
        'total' => $total_productos,
        'pages' => $total_paginas,
        'current_page' => $pagina_actual,
        'per_page' => $productos_por_pagina
    ]
]);
?>