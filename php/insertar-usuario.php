<?php

error_reporting(0);
header('Content-type: application/json; charset=utf8');

$fecha = $_POST['fecha'];
$nombre = $_POST['nombre'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];
$trabajo = $_POST['trabajo'];

function validarDatos($fecha, $nombre, $telefono, $correo, $trabajo){
	if($fecha == ''){
		return false;
	} elseif($nombre == ''){
		return false;
	} elseif($telefono == ''){ //|| is_int($edad)){
		return false;
	} elseif($correo == ''){
		return false;
	} elseif($trabajo == ''){
		return false;
	}
	return true;
}

if(validarDatos($fecha, $nombre, $telefono, $correo, $trabajo)){
	$conexion = new mysqli('localhost', 'root', '', 'clientes');
	$conexion->set_charset('utf8');

	if($conexion->connect_errno){
		$respuesta = ['error' => true];
	} else {
		$statement = $conexion->prepare("INSERT INTO usuarios(fecha, nombre, telefono, correo, trabajo) VALUES(?,?,?,?,?)");
		$statement->bind_param("sssss", $fecha, $nombre, $telefono, $correo, $trabajo);
		$statement->execute();

		if($conexion->affected_rows <= 0){
			$respuesta = ['error' => true];
		}

		$respuesta = [];
	}
} else {
	$respuesta = ['error' => true];
}

echo json_encode($respuesta);
