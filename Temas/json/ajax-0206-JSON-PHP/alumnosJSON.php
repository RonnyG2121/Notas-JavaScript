<?php
$cadena = $_GET["q"];
$usuario = "root"; 
$pwd = ""; 
$servidor = "localhost"; 
$db = "escuela";
$link = mysql_pconnect( $servidor, $usuario, $pwd );
if( !$link ) {
	header( "location: error_mysql.html" ); exit;
}
if( !mysql_select_db( $db ) ) { 
	header( "location: error_mysql.html" ); exit;
}

// buscar todos los registros
$query = "SELECT * FROM alumnos WHERE promedio=".$cadena." ORDER BY nombre";
// esta ves voy a guardar el resultado del 'query'
$resultado = mysql_query( $query )
or die ("Error FATAL al buscar datos de $db: " . mysql_error() );
// aquí averiguo cuantos registros fueron encontrados 
$registros = mysql_num_rows( $resultado );
$i = 0;
// aquí leo todos los registros encontrados, uno
//print header("Content-type:text/xml");
print "[";
while( $renglon = mysql_fetch_object($resultado)){
	print "{";
	$nombre = $renglon->nombre;
	$apellidos = $renglon->apellidos;
	$promedio = $renglon->promedio;
	print '"nombre":"'.$nombre.'",';
	print '"apellidos":"'.$apellidos.'",';
	print '"promedio":"'.$promedio.'"';
	print "}"; 
	$i++;
	if($i<$registros){
		print ", ";
	}
}
print "]";
mysql_close($link);
?>