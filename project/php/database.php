<?php
$dbLocation = '127.0.0.1:3306';
$dbUsername = 'php';
$dbPassword = 'password';
$dbName = 'CSCE464-Project';
$db = mysqli_connect($dbLocation, $dbUsername, $dbPassword, $dbName);

if (mysqli_connect_errno() || ($db == null))
{
    echo "<h3>Database connection failed. Connection script now terminating.</h3>";
    exit(0);
}
