<?php
session_start();

// Conexión a las bases de datos
$conn1 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_gaviota");
$conn2 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_jorlerosales");
$conn3 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_jorle");

if ($conn1->connect_error || $conn2->connect_error || $conn3->connect_error) {
    die("Error de conexión: " . $conn1->connect_error . " / " . $conn2->connect_error . " / " . $conn3->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pro_nombre = trim($_POST['pro_nombre']);
    $pro_precioventa = floatval($_POST['pro_precioventa']);
    $pro_talla = trim($_POST['pro_talla']);
    $pro_color = trim($_POST['pro_color']);
    $stock_gaviota = (int)$_POST['stock_gaviota'];
    $stock_rosales = (int)$_POST['stock_rosales'];
    $stock_sauces = (int)$_POST['stock_sauces'];

    // Manejo de la imagen
    $imagen_path = null;
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $upload_dir = '../uploads/';
        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0755, true);
        }
        $imagen_name = uniqid() . '_' . basename($_FILES['imagen']['name']);
        $imagen_path = 'uploads/' . $imagen_name;
        move_uploaded_file($_FILES['imagen']['tmp_name'], $upload_dir . $imagen_name);
    }

    // Generar ID único para el producto
    $pro_id = 'PROD' . time() . rand(100, 999);

    // Insertar en las 3 bases de datos
    $sql_insert = "INSERT INTO producto (pro_id, pro_nombre, pro_precioventa, pro_talla, pro_color, imagen_path) VALUES (?, ?, ?, ?, ?, ?)";
    
    // Tienda Gaviota
    $stmt1 = $conn1->prepare($sql_insert);
    $stmt1->bind_param("ssdsss", $pro_id, $pro_nombre, $pro_precioventa, $pro_talla, $pro_color, $imagen_path);
    $stmt1->execute();
    
    // Insertar stock
    if ($stock_gaviota > 0) {
        $sql_stock = "INSERT INTO almapro (id_pro, existencia) VALUES (?, ?)";
        $stmt_stock1 = $conn1->prepare($sql_stock);
        $stmt_stock1->bind_param("si", $pro_id, $stock_gaviota);
        $stmt_stock1->execute();
    }

    // Tienda Rosales
    $stmt2 = $conn2->prepare($sql_insert);
    $stmt2->bind_param("ssdsss", $pro_id, $pro_nombre, $pro_precioventa, $pro_talla, $pro_color, $imagen_path);
    $stmt2->execute();
    
    if ($stock_rosales > 0) {
        $stmt_stock2 = $conn2->prepare($sql_stock);
        $stmt_stock2->bind_param("si", $pro_id, $stock_rosales);
        $stmt_stock2->execute();
    }

    // Tienda Sauces
    $stmt3 = $conn3->prepare($sql_insert);
    $stmt3->bind_param("ssdsss", $pro_id, $pro_nombre, $pro_precioventa, $pro_talla, $pro_color, $imagen_path);
    $stmt3->execute();
    
    if ($stock_sauces > 0) {
        $stmt_stock3 = $conn3->prepare($sql_stock);
        $stmt_stock3->bind_param("si", $pro_id, $stock_sauces);
        $stmt_stock3->execute();
    }

    // Redirigir de vuelta al dashboard
    header("Location: dashboard.php?success=1");
    exit();
}

$conn1->close();
$conn2->close();
$conn3->close();
?>