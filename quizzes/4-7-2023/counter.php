<?php
session_start();
if(!isset($_SESSION["counter"])) $_SESSION["counter"] = 0;

// If POST then increment the counter
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $_SESSION["counter"] = $_SESSION["counter"] + 1;
}
// Otherwise, I just want the data

echo $_SESSION['counter'];
