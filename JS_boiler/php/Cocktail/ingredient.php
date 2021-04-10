<?php

session_start();

/** https://www.php.net/manual/fr/function.ctype-alpha.php
* pour utiliser la fonction ctype_alpha() caratere en utf-8
*/
setLocale(LC_CTYPE, 'FR_fr.UTF-8');

$obj = new stdClass();
$obj->result = true;


if(isset($_GET["ingredient"]) && $_GET["ingredient"] != "" ){
    $ingredient= $_GET["ingredient"];

    if(ctype_alpha($ingredient)){
        $message = "Ingrédient  $ingredient créer";
        $obj->message = $message ;
        $obj->ingredient = $ingredient;
    }else{
         $obj->result = false;
         $obj->message = "L'ingrédient renseigné est invalide";
    }
}else{
    $obj->result = false;
    $obj->message = "Renseignez un ingédient pour l'ajouter";
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);
