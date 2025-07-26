<?php
session_start();

// Verificar si el usuario está autenticado
if (!isset($_SESSION['admin_id'])) {
    header("Location: login.php");
    exit();
}

// Conexión a las bases de datos
$conn1 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_gaviota"); // Tienda Gaviota
$conn2 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_jorlerosales"); // Tienda Rosales
$conn3 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_jorle"); // Tienda Sauces

if ($conn1->connect_error || $conn2->connect_error || $conn3->connect_error) {
    die("Error de conexión: " . $conn1->connect_error . " / " . $conn2->connect_error . " / " . $conn3->connect_error);
}

// Obtener datos del formulario
$pro_id = isset($_POST['pro_id']) && !empty($_POST['pro_id']) ? (int)$_POST['pro_id'] : null;
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
    $upload_dir = 'uploads/';
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }
    $imagen_name = uniqid() . '_' . basename($_FILES['imagen']['name']);
    $imagen_path = $upload_dir . $imagen_name;
    move_uploaded_file($_FILES['imagen']['tmp_name'], $imagen_path);
}

if ($pro_id) {
    // Actualizar producto existente
    $sql_update = "UPDATE producto SET pro_nombre = ?, pro_precioventa = ?, pro_talla = ?, pro_color = ?" . ($imagen_path ? ", imagen_path = ?" : "") . " WHERE pro_id = ?";
    $stmt1 = $conn1->prepare($sql_update);
    $stmt2 = $conn2->prepare($sql_update);
    $stmt3 = $conn3->prepare($sql_update);

    if ($imagen_path) {
        $stmt1->bind_param("sdsssi", $pro_nombre, $pro_precioventa, $pro_talla, $pro_color, $imagen_path, $pro_id);
        $stmt2->bind_param("sdsssi", $pro_nombre, $pro_precioventa, $pro_talla, $pro_color, $imagen_path, $pro_id);
        $stmt3->bind_param("sdsssi", $pro_nombre, $pro_precioventa, $pro_talla, $pro_color, $imagen_path, $pro_id);
    } else {
        $stmt1->bind_param("sdssi", $pro_nombre, $pro_precioventa, $pro_talla, $pro_color, $pro_id);
        $stmt2->bind_param("sdssi", $pro_nombre, $pro_precioventa, $pro_talla, $pro_color, $pro_id);
        $stmt3->bind_param("sdssi", $pro_nombre, $pro_precioventa, $pro_talla, $pro_color, $pro_id);
    }

    $stmt1->execute();
    $stmt2->execute();
    $stmt3->execute();
} else {
    // Insertar nuevo producto
    $sql_insert = "INSERT INTO producto (pro_nombre, pro_precioventa, pro_talla, pro_color, imagen_path) VALUES (?, ?, ?, ?, ?)";
    $stmt1 = $conn1->prepare($sql_insert);
    $stmt2 = $conn2->prepare($sql_insert);
    $stmt3 = $conn3->prepare($sql_insert);

    $stmt1->bind_param("sdsss", $pro_nombre, $pro_precioventa, $pro_talla, $pro_color, $imagen_path);
    $stmt2->bind_param("sdsss", $pro_nombre, $pro_precioventa, $pro_talla, $pro_color, $imagen_path);
    $stmt3->bind_param("sdsss", $pro_nombre, $pro_precioventa, $pro_talla, $pro_color, $imagen_path);

    $stmt1->execute();
    $stmt2->execute();
    $stmt3->execute();

    $pro_id = $conn1->insert_id;
}

// Actualizar stock en almapro
$sql_stock = "INSERT INTO almapro (id_pro, existencia) VALUES (?, ?) ON DUPLICATE KEY UPDATE existencia = ?";
$stmt1 = $conn1->prepare($sql_stock);
$stmt2 = $conn2->prepare($sql_stock);
$stmt3 = $conn3->prepare($sql_stock);

$stmt1->bind_param("iii", $pro_id, $stock_gaviota, $stock_gaviota);
$stmt2->bind_param("iii", $pro_id, $stock_rosales, $stock_rosales);
$stmt3->bind_param("iii", $pro_id, $stock_sauces, $stock_sauces);

$stmt1->execute();
$stmt2->execute();
$stmt3->execute();

$conn1->close();
$conn2->close();
$conn3->close();

// Redirigir al dashboard
header("Location: dashboard.php");
exit();
?>