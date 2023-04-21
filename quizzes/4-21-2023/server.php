<?php
include("./database.php");
global $db;

if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $requestBody = file_get_contents('php://input');
    $requestBody = json_decode($requestBody, true) or die("Could not decode JSON");
    $email = $requestBody['email'];
    $first = $requestBody['first'];
    $last = $requestBody['last'];
    $phone = $requestBody['phone'];
    $address = $requestBody['address'];

    if (emailAlreadyExists($db, $email))
    {
        echo "<h3>Sorry, but your e-mail address is already registered.</h3>";
    }
    else
    {
        $query = "INSERT INTO Customers(email, first, last, phone, address)
    VALUES('$email', '$first', '$last', '$phone', '$address');";
        $success = mysqli_query($db, $query);
        echo "<h3>Thank you for registering!</h3>";
    }

    mysqli_close($db);
}

function emailAlreadyExists($db, $email): bool
{
    $query = "SELECT * FROM Customers WHERE email = '$email'";
    $customers = mysqli_query($db, $query);
    $numRecords = mysqli_num_rows($customers);
    return $numRecords > 0;
}
