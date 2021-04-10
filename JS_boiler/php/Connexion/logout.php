<?php

session_start();

$obj = new stdClass();
$obj->result = true;

//----------------------------------------

//a simple call to session_destroy() is not enough

$_SESSION = array();

// If you want to destroy the session completely, also delete
// the session cookie.
// Note: this will destroy the session, not just the session data!
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Finally, we destroy the session.
session_destroy();

//----------------------------------------


header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);