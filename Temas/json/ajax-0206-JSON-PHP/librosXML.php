<?php
$servidor = "localhost";
$usuario = "root"; 
$pwd = "root";  
$db = "quiz";
$link = mysqli_connect($servidor, $usuario, $pwd, $db);

// buscar todos los registros
$query = "SELECT * FROM preguntas";
// esta ves voy a guardar el resultado del 'query'
$resultado = mysqli_query($link, $query)
or die ("Error FATAL al buscar datos de $db: " . mysqli_error() );
// aquí leo todos los registros encontrados, uno
print header("Content-type:text/xml");
print "<?xml version='1.0' encoding='UTF-8'?>";
print "<preguntas>"; 
while( $renglon = mysqli_fetch_object($resultado)){
	$pregunta = $renglon->pregunta;
	$op1 = $renglon->op1;
	$op2 = $renglon->op2;
	$op3 = $renglon->op3;
	$op4 = $renglon->op4;
	$buena = $renglon->buena;
	$examen = $renglon->examen;
	print "<pregunta>";
	print "<enunciado>".$pregunta."</enunciado>";
	print "<op1>".$op1."</op1>";
	print "<op2>".$op2."</op2>";
	print "<op3>".$op3."</op3>";
	print "<op4>".$op4."</op4>";
	print "<buena>".$buena."</buena>";
	print "<examen>".$examen."</examen>";
	print "</pregunta>"; 
}
print "</preguntas>";
mysql_close($link);
?>