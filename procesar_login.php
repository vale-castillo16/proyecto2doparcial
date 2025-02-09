<?php
// Conexión a la base de datos
$servername = "localhost";
$username_db = "ian";  // Asegúrate de usar tu usuario de MySQL
$password_db = "123";  // Asegúrate de usar tu contraseña de MySQL
$dbname = "negocios_digitales";  // Cambia esto por el nombre de tu base de datos

$conn = new mysqli($servername, $username_db, $password_db, $dbname);

// Verificar si hay errores en la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Recibir los datos del formulario
$username = $_POST['ian'];
$password = $_POST['123'];

// Consultar la base de datos para verificar el usuario y la contraseña
$sql = "SELECT * FROM usuarios WHERE username = '$username' AND password = '$password'";
$result = $conn->query($sql);

// Si se encuentra el usuario
if ($result->num_rows > 0) {
    // Redirigir a la página de administrador si las credenciales son correctas
    header('Location: index.html');
    exit();
} else {
    // Si las credenciales son incorrectas, redirigir al login con el mensaje de error
    header('Location: login.html?error=Credenciales incorrectas');
    exit();
}

// Cerrar la conexión
$conn->close();
?>