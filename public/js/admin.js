// Funciones JavaScript para el panel de administración
document.addEventListener('DOMContentLoaded', function() {
    // Previsualización de imagen
    const imageInput = document.getElementById('imagen');
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    let preview = document.getElementById('image-preview');
                    if (!preview) {
                        preview = document.createElement('img');
                        preview.id = 'image-preview';
                        preview.style.maxWidth = '200px';
                        preview.style.marginTop = '10px';
                        preview.style.borderRadius = '8px';
                        imageInput.parentNode.appendChild(preview);
                    }
                    preview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Validación de formulario
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            const nombre = document.getElementById('pro_nombre').value.trim();
            const precio = document.getElementById('pro_precioventa').value;
            
            if (!nombre) {
                alert('El nombre del producto es obligatorio');
                e.preventDefault();
                return;
            }
            
            if (!precio || precio <= 0) {
                alert('El precio debe ser mayor a 0');
                e.preventDefault();
                return;
            }
        });
    }

    // Confirmación para eliminar productos
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                e.preventDefault();
            }
        });
    });
});

// Función para actualizar estadísticas en tiempo real
function updateStats() {
    fetch('/api/stats.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('total-products').textContent = data.totalProducts;
                document.getElementById('total-orders').textContent = data.totalOrders;
                document.getElementById('total-revenue').textContent = '$' + data.totalRevenue.toFixed(2);
            }
        })
        .catch(error => console.error('Error updating stats:', error));
}

// Actualizar estadísticas cada 30 segundos
setInterval(updateStats, 30000);