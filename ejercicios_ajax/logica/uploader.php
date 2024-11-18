<?php
//var_dump($_FILES);
//echo "Hola! respuesta desde el servidor";

if (isset($_FILES["archivos"])) {
    $nombre = $_FILES["archivos"]["name"];
    $archivo = $_FILES["archivos"]["tmp_name"];
    $error = $_FILES["archivos"]["error"];
    $destino = "../files/$nombre";
    $subir = move_uploaded_file($archivo, $destino);

    if ($subir) {
        $res = array(
            "err" => false,
            "status" => http_response_code(200),
            "statusText" => "Archivo $nombre subido con éxito",
            "files" => $_FILES["archivos"]);
    } else {
        $res = array(
            "err" => true,
            "status" => http_response_code(400),
            "statusText" => "El archivo $nombre no a podido ser subido con éxito",
            "files" => $_FILES["archivos"]);
    }
    echo json_encode($res);

}
