<?php
session_start();
if(!isset($_SESSION["messages"])) $_SESSION["messages"] = '';

// If POST then add the message
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestBody = file_get_contents('php://input');
    $requestBody = json_decode($requestBody, true) or die("Could not decode JSON");
    $message = $requestBody['message'];
    if ($_SESSION['messages'] != '') {
        $_SESSION["messages"] .= ';';
    }
    $_SESSION["messages"] .= $message;
}
// Otherwise, I just want the data

echo $_SESSION['messages'];
