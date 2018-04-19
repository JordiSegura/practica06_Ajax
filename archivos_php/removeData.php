<?php
$conn = mysqli_connect("localhost", "id4965499_sergi", "12345", "id4965499_practica6");
//$conn = mysqli_connect("localhost", "root", "", "practica6");
$idNota = $_GET['idNota'];
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "DELETE FROM notas WHERE id_nota ='".$idNota."'";
$result = mysqli_query($conn, $sql);

$resposta = '{"idNota":"' . $idNota . '"}';
    echo $_GET['callback'].'('. $resposta.')';

mysqli_close($conn);