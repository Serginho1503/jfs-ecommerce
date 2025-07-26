<?php
session_start();

// Verificar autenticación (opcional)
// if (!isset($_SESSION['admin_logged_in'])) {
//     header('Location: login.php');
//     exit;
// }

// Conexiones a las bases de datos
$conn1 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_gaviota");
$conn2 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_jorlerosales");
$conn3 = new mysqli("localhost", "doctorbo_sistemas", "1718142449@saaz", "doctorbo_jorle");

if ($conn1->connect_error || $conn2->connect_error || $conn3->connect_error) {
    die("Error de conexión: " . $conn1->connect_error . " / " . $conn2->connect_error . " / " . $conn3->connect_error);
}

// Obtener estadísticas
$total_productos = 0;
$total_pedidos = 0;

// Contar productos en todas las tiendas
$result1 = $conn1->query("SELECT COUNT(*) as count FROM producto");
$result2 = $conn2->query("SELECT COUNT(*) as count FROM producto");
$result3 = $conn3->query("SELECT COUNT(*) as count FROM producto");

if ($result1) $total_productos += $result1->fetch_assoc()['count'];
if ($result2) $total_productos += $result2->fetch_assoc()['count'];
if ($result3) $total_productos += $result3->fetch_assoc()['count'];

// Obtener productos recientes
$productos_recientes = [];
$sql = "SELECT pro_id, pro_nombre, pro_precioventa, imagen_path FROM producto ORDER BY pro_id DESC LIMIT 10";

$result1 = $conn1->query($sql);
if ($result1) {
    while ($row = $result1->fetch_assoc()) {
        $row['tienda'] = 'Gaviota';
        $productos_recientes[] = $row;
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Jorle Fashion Store</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/admin.css">
</head>
<body>
    <div class="admin-container">
        <div class="admin-header">
            <h1>Dashboard - Jorle Fashion Store</h1>
            <p>Panel de administración</p>
        </div>

        <div class="admin-stats">
            <div class="stat-card">
                <h3>Total Productos</h3>
                <p class="number" id="total-products"><?php echo $total_productos; ?></p>
            </div>
            <div class="stat-card">
                <h3>Pedidos Hoy</h3>
                <p class="number" id="total-orders"><?php echo $total_pedidos; ?></p>
            </div>
            <div class="stat-card">
                <h3>Ventas del Mes</h3>
                <p class="number" id="total-revenue">$0.00</p>
            </div>
            <div class="stat-card">
                <h3>Tiendas Activas</h3>
                <p class="number">3</p>
            </div>
        </div>

        <div class="admin-form">
            <h2>Agregar Nuevo Producto</h2>
            <form id="product-form" action="save_product.php" method="POST" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="pro_nombre">Nombre del Producto:</label>
                    <input type="text" id="pro_nombre" name="pro_nombre" required>
                </div>
                
                <div class="form-group">
                    <label for="pro_precioventa">Precio de Venta:</label>
                    <input type="number" id="pro_precioventa" name="pro_precioventa" step="0.01" required>
                </div>
                
                <div class="form-group">
                    <label for="pro_talla">Talla:</label>
                    <select id="pro_talla" name="pro_talla" required>
                        <option value="">Seleccionar talla</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="pro_color">Color:</label>
                    <select id="pro_color" name="pro_color" required>
                        <option value="">Seleccionar color</option>
                        <option value="Negro">Negro</option>
                        <option value="Azul">Azul</option>
                        <option value="Gris">Gris</option>
                        <option value="Celeste">Celeste</option>
                        <option value="Beige">Beige</option>
                        <option value="Blanco">Blanco</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="imagen">Imagen del Producto:</label>
                    <input type="file" id="imagen" name="imagen" accept="image/*">
                </div>
                
                <h3>Stock por Tienda</h3>
                <div class="form-group">
                    <label for="stock_gaviota">Stock Tienda Gaviota:</label>
                    <input type="number" id="stock_gaviota" name="stock_gaviota" min="0" value="0">
                </div>
                
                <div class="form-group">
                    <label for="stock_rosales">Stock Tienda Rosales:</label>
                    <input type="number" id="stock_rosales" name="stock_rosales" min="0" value="0">
                </div>
                
                <div class="form-group">
                    <label for="stock_sauces">Stock Tienda Sauces:</label>
                    <input type="number" id="stock_sauces" name="stock_sauces" min="0" value="0">
                </div>
                
                <button type="submit" class="btn-primary">Guardar Producto</button>
            </form>
        </div>

        <div class="products-table">
            <h2>Productos Recientes</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Tienda</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($productos_recientes as $producto): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($producto['pro_id']); ?></td>
                        <td>
                            <?php if ($producto['imagen_path']): ?>
                                <img src="<?php echo htmlspecialchars($producto['imagen_path']); ?>" alt="Producto">
                            <?php else: ?>
                                <div style="width:50px;height:50px;background:#f0f0f0;border-radius:8px;"></div>
                            <?php endif; ?>
                        </td>
                        <td><?php echo htmlspecialchars($producto['pro_nombre']); ?></td>
                        <td>$<?php echo number_format($producto['pro_precioventa'], 2); ?></td>
                        <td><?php echo htmlspecialchars($producto['tienda']); ?></td>
                        <td>
                            <button class="btn-primary" onclick="editProduct(<?php echo $producto['pro_id']; ?>)">Editar</button>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

    <script src="../js/admin.js"></script>
</body>
</html>

<?php
$conn1->close();
$conn2->close();
$conn3->close();
?>