<?php
$servername = "localhost";
$username = "ian2";
$password = "123";
$dbname = "negocios_digitales";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

if (is_array($data)) {
    foreach ($data as $cambio) {
        $seccion = $conn->real_escape_string($cambio['seccion']);
        $tipo = $conn->real_escape_string($cambio['tipo']);
        $valor = $conn->real_escape_string($cambio['valor']);

        // Verificar si la sección ya existe
        $sql = "SELECT * FROM contenido WHERE seccion='$seccion'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // Actualizar la sección existente
            $sql = "UPDATE contenido SET $tipo='$valor' WHERE seccion='$seccion'";
        } else {
            // Insertar una nueva sección
            $sql = "INSERT INTO contenido (seccion, $tipo) VALUES ('$seccion', '$valor')";
        }

        if (!$conn->query($sql)) {
            echo json_encode(["error" => "Error actualizando: " . $conn->error]);
            $conn->close();
            exit();
        }
    }
    echo json_encode(["mensaje" => "Actualizado correctamente"]);
} else {
    echo json_encode(["error" => "Datos no válidos"]);
}

$conn->close();
?>