<?php



session_start();

setLocale(LC_CTYPE, 'FR_fr.UTF-8');

$obj = new stdClass();
$obj->result = true;


$cpt = $_GET["cpt"];
$obj->titre = $_GET["titre"];
$obj->description = $_GET["description"];


if ($cpt == 0)
{
    $obj->result = false;
    $obj->message = "Ajoutez au moins un ingrédient";

    echo json_encode($obj);
    exit();
}

$ingredients = array();
$unites = array();
$quantities = array();


for($i = 1 ; $i <= $cpt ; $i++)
{
    if(isset($_GET["check$i"]))
    {
    array_push($ingredients, $_GET["ingredient$i"]);

        if(isset($_GET["unite$i"]))
        {
            array_push($unites, $_GET["unite$i"]);

            if(isset($_GET["quantity$i"]) && ctype_digit($_GET["quantity$i"]) && $_GET["quantity$i"] != 0 ){

                array_push($quantities,$_GET["quantity$i"]);
                $message = "Le cocktail $obj->titre a été crée";

                $obj->message = $message ;
                $obj->ingredients = $ingredients;
                $obj->quantities = $quantities;
                $obj->unites = $unites;


            }else{
                $obj->result = false;
                $obj->message = "Renseignez une quantité valide ";
                break;
            }
        }else {
            $obj->result = false;
            $obj->message = "Ajoutez au moins une unité";
            break;
        }
    }
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');


echo json_encode($obj);
