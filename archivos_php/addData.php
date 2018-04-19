<?php

$titulo = $_GET['titulo'];
$descripcion = $_GET['descripcion'];
// Create connection
$conn = mysqli_connect("localhost", "id4965499_sergi", "12345", "id4965499_practica6");
//$conn = mysqli_connect("localhost", "root", "", "practica6");
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = 'insert into notas (titulo, descripcion) values ("' . $titulo . '", "' . $descripcion . '")';

if (mysqli_query($conn, $sql)) {
    $respuesta = "Se ha insertado la nota.";
    $idNota = mysqli_insert_id($conn);
    $json = '{"respuesta":"' . $respuesta . '","idNota":"' . $idNota . '","titulo":"' . $titulo . '","descripcion":"' . $descripcion . '"}';
    echo $_GET['callback'].'('. $json.')';
   
} else {
    $respuesta = "Error al insertar la nota.";
    $json = '{"respuesta":"' . $respuesta. '"}';
    echo $json;
}

