<?php

session_start();

$obj = new stdClass();
$obj->result = true;


if(isset($_POST["username"],$_POST["password"])){
    $username = $_POST["username"];
    $password = $_POST["password"];
    if($username == "test" && $password == "test"){
        $obj->message = "welcome";
        $_SESSION["user_id"] = 1;
    }else{
         $obj->result = false;
         $obj->message = "user or password incorrect";
    }
}else{
    $obj->result = false;
    $obj->message = "username and password are required";

}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);