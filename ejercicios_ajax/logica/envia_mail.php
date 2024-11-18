<?php

if (isset($_POST)) {
  error_reporting(0);
    $nombre = $_POST["nombre"];
    $correo = $_POST["correo"];
    $asunto = $_POST["asunto"];
    $comentario = $_POST["comentario"];
    $dominio = $_SERVER["HTTP_HOST"];
    $destinatario = "omnierfox@gmail.com";
    $remitente = "Contacto enviado desde el sitio $dominio.";
    $mensaje = "
    <p>
      Datos enviados desde el formulario del sitio <b>$dominio</b>
    </p>
    <ul>
      <li>Nombre: <b>$nombre</b></li>
      <li>Email: <b>$correo</b></li>
      <li>Asunto: $asunto</li>
      <li>Comentarios: $comentario</li>
      </ul>";
    $cabeceras = "MIME-Version: 1.0\r\n" . "Content-Type: text/html; charset=utf-8\r\n" . "From: Envío Automático No Responder <no-reply@$dominio>";

    $enviar_mail = mail($destinatario, $remitente, $mensaje, $cabeceras);

    if ($enviar_mail) {
        $res = [
            "err" => false,
            "message" => "Tus datos han sido enviados"
        ];
    } else {
        $res = [
            "err" => true,
            "message" => "Error al enviar tus datos. Intenta nuevamente."];
    }

    header( 'Content-type: application/json' );
    echo json_encode($res);
    exit;
}
