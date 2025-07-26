<?php
// Activar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Conexiones a las tres bases de datos (ajusta las credenciales)
$conn1 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_gaviota"); // Tienda 1
$conn2 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_jorlerosales"); // Tienda 2
$conn3 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_jorle"); // Tienda 3

if ($conn1->connect_error || $conn2->connect_error || $conn3->connect_error) {
    die("<p class='error'>Error de conexión en alguna tienda: " . 
        $conn1->connect_error . " / " . $conn2->connect_error . " / " . $conn3->connect_error . "</p>");
}

// Configuración de paginación
$productos_por_pagina = 12;
$pagina_actual = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 1;
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

// Filtro por tienda (stock)
$tiendas_seleccionadas = [];
if (isset($_GET['tienda1'])) $tiendas_seleccionadas[] = 1; // Tienda Gaviota
if (isset($_GET['tienda2'])) $tiendas_seleccionadas[] = 2; // Tienda Rosales
if (isset($_GET['tienda3'])) $tiendas_seleccionadas[] = 3; // Tienda Sauces

// Filtro por talla
$tallas_seleccionadas = [];
if (isset($_GET['talla_xs'])) $tallas_seleccionadas[] = 'XS';
if (isset($_GET['talla_s'])) $tallas_seleccionadas[] = 'S';
if (isset($_GET['talla_m'])) $tallas_seleccionadas[] = 'M';
if (isset($_GET['talla_l'])) $tallas_seleccionadas[] = 'L';
if (isset($_GET['talla_xl'])) $tallas_seleccionadas[] = 'XL';
if (isset($_GET['talla_xxl'])) $tallas_seleccionadas[] = 'XXL';

// Filtro por color
$colores_seleccionados = [];
if (isset($_GET['color_negro'])) $colores_seleccionados[] = 'Negro';
if (isset($_GET['color_azul'])) $colores_seleccionados[] = 'Azul';
if (isset($_GET['color_gris'])) $colores_seleccionados[] = 'Gris';
if (isset($_GET['color_celeste'])) $colores_seleccionados[] = 'Celeste';
if (isset($_GET['color_beige'])) $colores_seleccionados[] = 'Beige';
if (isset($_GET['color_blanco'])) $colores_seleccionados[] = 'Blanco';

// Consulta base para productos
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

// Obtener productos de todas las tiendas
$productos_unicos = [];
$tienda_productos = [];

// Tienda 1 (Gaviota)
$stmt1 = $conn1->prepare($sql_productos);
if ($stmt1 === false) {
    die("<p class='error'>Error al preparar la consulta para Tienda 1: " . $conn1->error . "<br>Consulta: " . htmlspecialchars($sql_productos) . "</p>");
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
    die("<p class='error'>Error al preparar la consulta para Tienda 2: " . $conn2->error . "<br>Consulta: " . htmlspecialchars($sql_productos) . "</p>");
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
    die("<p class='error'>Error al preparar la consulta para Tienda 3: " . $conn3->error . "<br>Consulta: " . htmlspecialchars($sql_productos) . "</p>");
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

if (!empty($productos_pagina)) {
    echo '<div class="productos-container">';
    foreach ($productos_pagina as $producto) {
        echo '<div class="producto">';
        $imagen = $producto['imagen_path'] 
            ? htmlspecialchars($producto['imagen_path']) 
            : 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
        echo '<img src="' . $imagen . '" alt="' . htmlspecialchars($producto['pro_nombre']) . '">';
        echo '<div class="producto-content">';
        echo '<h2>' . htmlspecialchars($producto['pro_nombre']) . '</h2>';
        echo '<p class="precio">$' . number_format($producto['pro_precioventa'], 2) . '</p>';
        
        // Lista de stock por tienda (solo mostrar las tiendas seleccionadas)
        echo '<div class="stock-lista">';
        // Si no hay tiendas seleccionadas, mostrar todas
        if (empty($tiendas_seleccionadas)) {
            $tiendas_seleccionadas = [1, 2, 3]; // Mostrar todas las tiendas por defecto
        }
        // Tienda 1 (Gaviota)
        if (in_array(1, $tiendas_seleccionadas)) {
            $stmt1 = $conn1->prepare($sql_stock);
            $stmt1->bind_param("i", $producto['pro_id']);
            $stmt1->execute();
            $result1 = $stmt1->get_result();
            if ($row1 = $result1->fetch_assoc()) {
                echo '<p>Tienda Gaviota:   ' . htmlspecialchars($row1['existencia']) . '</p>';
            } else {
                echo '<p>Tienda Gaviota:   Sin stock</p>';
            }
        }
        
        // Tienda 2 (Rosales)
        if (in_array(2, $tiendas_seleccionadas)) {
            $stmt2 = $conn2->prepare($sql_stock);
            $stmt2->bind_param("i", $producto['pro_id']);
            $stmt2->execute();
            $result2 = $stmt2->get_result();
            if ($row2 = $result2->fetch_assoc()) {
                echo '<p>Tienda Rosales:   ' . htmlspecialchars($row2['existencia']) . '</p>';
            } else {
                echo '<p>Tienda Rosales:   Sin stock</p>';
            }
        }
        
        // Tienda 3 (Sauces)
        if (in_array(3, $tiendas_seleccionadas)) {
            $stmt3 = $conn3->prepare($sql_stock);
            $stmt3->bind_param("i", $producto['pro_id']);
            $stmt3->execute();
            $result3 = $stmt3->get_result();
            if ($row3 = $result3->fetch_assoc()) {
                echo '<p>Tienda Sauces:   ' . htmlspecialchars($row3['existencia']) . '</p>';
            } else {
                echo '<p>Tienda Sauces:   Sin stock</p>';
            }
        }
        echo '</div>';
        
        echo '<button class="btn-comprar">Comprar</button>';
        echo '</div>';
        echo '</div>';
    }
    echo '</div>';

    // Paginación
    echo '<div class="paginacion">';
    if ($pagina_actual > 1) {
        echo '<a href="?pagina=' . ($pagina_actual - 1) . '&' . http_build_query($_GET) . '" class="btn-pagina">Anterior</a>';
    }
    for ($i = 1; $i <= $total_paginas; $i++) {
        $clase_activa = ($i == $pagina_actual) ? 'activa' : '';
        echo '<a href="?pagina=' . $i . '&' . http_build_query($_GET) . '" class="btn-pagina ' . $clase_activa . '">' . $i . '</a>';
    }
    if ($pagina_actual < $total_paginas) {
        echo '<a href="?pagina=' . ($pagina_actual + 1) . '&' . http_build_query($_GET) . '" class="btn-pagina">Siguiente</a>';
    }
    echo '</div>';
} else {
    echo '<p class="no-products">No hay productos disponibles con los filtros seleccionados.</p>';
}

// Cerrar conexiones
$conn1->close();
$conn2->close();
$conn3->close();
?>