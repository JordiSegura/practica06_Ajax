<?php
$conn = mysqli_connect("localhost", "id4965499_sergi", "12345", "id4965499_practica6");
//$conn = mysqli_connect("localhost", "root", "", "practica6");
$idNota = $_GET['idNota'];
$titulo = $_GET['titulo'];
$descripcion = $_GET['descripcion'];
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$sql = "UPDATE notas SET titulo ='".$titulo."', descripcion ='".$descripcion."' WHERE id_nota = ".$idNota."";
$result = mysqli_query($conn, $sql);

/*$resposta = '{"idNota":"' . $idNota . '","titulo":"' . $titulo . '","descripcion":"' . $descripcion . '"}';
echo $resposta;*/

mysqli_close($conn);