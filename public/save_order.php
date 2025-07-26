<?php
session_start([
    'cookie_lifetime' => 86400,
    'cookie_secure' => false, // Cambia a true si usas HTTPS
    'cookie_httponly' => true,
    'cookie_samesite' => 'Strict'
]);

if (!isset($_SESSION['initiated'])) {
    session_regenerate_id(true);
    $_SESSION['initiated'] = true;
}

$conn = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_gaviota");

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
$conn->set_charset("utf8mb3");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pro_id = $_POST['pro_id'];
    $pro_nombre = $_POST['pro_nombre'];
    $pro_precioventa = floatval($_POST['pro_precioventa']);
    $nombre_cliente = trim($_POST['nombre_cliente']);
    $telefono_cliente = trim($_POST['telefono_cliente']);
    $direccion_cliente = trim($_POST['direccion_cliente']);

    if (empty($pro_id) || empty($pro_nombre) || empty($nombre_cliente) || empty($telefono_cliente)) {
        die("Error: Todos los campos obligatorios deben estar completos.");
    }

    // Guardar en la base de datos
    $stmt = $conn->prepare("INSERT INTO ordenes (pro_id, pro_nombre, pro_precioventa, nombre_cliente, telefono_cliente, direccion_cliente) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isdsss", $pro_id, $pro_nombre, $pro_precioventa, $nombre_cliente, $telefono_cliente, $direccion_cliente);

    if ($stmt->execute()) {
        $id_orden = $conn->insert_id;

        // Preparar mensaje para WhatsApp
        $mensaje = urlencode("¡Nueva orden!%0A" .
            "ID de orden: $id_orden%0A" .
            "Producto: $pro_nombre%0A" .
            "Precio: $$pro_precioventa%0A" .
            "Cliente: $nombre_cliente%0A" .
            "Teléfono: $telefono_cliente%0A" .
            "Dirección: " . ($direccion_cliente ? $direccion_cliente : "No proporcionada") . "%0A" .
            "Estado: Pendiente");

        // Enviar a WhatsApp (ajústal el número según tu necesidad)
        $whatsapp_url = "https://wa.me/593939931934?text=" . $mensaje;
        header("Location: $whatsapp_url");
        exit();
    } else {
        die("Error al guardar la orden: " . $conn->error);
    }

    $stmt->close();
}

$conn->close();
?>