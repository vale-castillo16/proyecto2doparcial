<?php
$servername = "localhost";
$username = "ian2";
$password = "123";
$dbname = "negocios_digitales";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT * FROM materias";
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[$row['id']] = $row;
    }
}

$conn->close();
echo json_encode($data);
?>