<?php

session_start();

/** https://www.php.net/manual/fr/function.ctype-alpha.php
* pour utiliser la fonction ctype_alpha() caratere en utf-8
*/
setLocale(LC_CTYPE, 'FR_fr.UTF-8');

$obj = new stdClass();
$obj->result = true;


if(isset($_GET["unite"]) && $_GET["unite"] != "" ){
    $unite= $_GET["unite"];

    if(ctype_alpha($unite)){
        $message = "L'unité $unite créer";
        $obj->message = $message ;
        $obj->unite = $unite;

    }else{
         $obj->result = false;
         $obj->message = "L'unité renseigné est invalide";
    }
}else{
    $obj->result = false;
    $obj->message = "Renseignez une unité pour l'ajouter";
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);
