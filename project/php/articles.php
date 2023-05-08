<?php
include("./database.php");
global $db;

function request_path()
{
    $requestBody = file_get_contents('php://input');
    $requestBody = json_decode($requestBody, true) or die("Could not decode JSON");
    $path = $requestBody['path'];
    if (empty($path))
    {
        return '/';
    }
    return $path;
}

function article_id()
{
    $requestBody = file_get_contents('php://input');
    $requestBody = json_decode($requestBody, true) or die("Could not decode JSON");
    return $requestBody['id'];
}

function comment_name()
{
    $requestBody = file_get_contents('php://input');
    $requestBody = json_decode($requestBody, true) or die("Could not decode JSON");
    return $requestBody['name'];
}

function comment_content()
{
    $requestBody = file_get_contents('php://input');
    $requestBody = json_decode($requestBody, true) or die("Could not decode JSON");
    return $requestBody['comment'];
}

$routes = [
    '/' => function()
    {
        echo '';
    },
    '/article' => function()
    {
        global $db;
        $id = article_id();
        $query = "SELECT * FROM `articles` WHERE id = $id;";
        $query = mysqli_query($db, $query);
        $article = mysqli_fetch_object($query);
        echo json_encode($article);
    },
    '/comments' => function()
    {
        global $db;
        $id = article_id();
        $query = "SELECT * FROM `comments` WHERE article = $id ORDER BY `created` DESC;";
        $query = mysqli_query($db, $query);
        $comments = [];
        while ($row = mysqli_fetch_object($query)) {
            $comments[] = $row;
        }
        echo json_encode($comments);
    },
    '/add-comment' => function()
    {
        global $db;
        $id = article_id();
        $name = comment_name();
        $comment = comment_content();
        $query = "INSERT INTO `comments` (`article`, `author`, `comment`) VALUES ($id, \"$name\", \"$comment\")";
        echo mysqli_query($db, $query);
    },
    '/articles' => function()
    {
        global $db;
        $query = "SELECT * FROM `articles` ORDER BY `created` DESC;";
        $query = mysqli_query($db, $query);
        $articles = [];
        while ($row = mysqli_fetch_object($query)) {
            $articles[] = $row;
        }
        echo json_encode($articles);
    },
    '/articles/recent' => function()
    {
        global $db;
        $query = "SELECT * FROM `articles` ORDER BY `created` DESC LIMIT 1;";
        $query = mysqli_query($db, $query);
        $article = mysqli_fetch_object($query);
        echo json_encode($article);
    },
];

$path = request_path();

if (isset($routes[$path]) AND is_callable($routes[$path]))
{
    $routes[$path]();
}
else
{
    echo 'Unknown route';
}
