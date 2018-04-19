<?php

$conn = mysqli_connect("localhost", "id4965499_sergi", "12345", "id4965499_practica6");
//$conn = mysqli_connect("localhost", "root", "", "practica6");
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT id_nota, titulo, descripcion FROM notas";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $resposta = '{"notas":[';
    while ($row = mysqli_fetch_assoc($result)) {
        $idNota = $row['id_nota'];
        $titulo = $row['titulo'];
        $descripcion = $row['descripcion'];
        $resposta .= '{"idNota":"' . $idNota . '","titulo":"' . $titulo . '","descripcion":"' . $descripcion . '"},';
    }
    $resposta .= '{}]}';
    echo $_GET['callback'].'('. $resposta.')';
} else {
    echo "0 results";
}

mysqli_close($conn);