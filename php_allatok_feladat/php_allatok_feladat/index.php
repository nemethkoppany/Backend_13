<?php
header("Access-Control-allow-origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

require __DIR__ . '/core/Router.php';
require __DIR__ . '/controller/PetController.php';

$router = new Router();

$router->addRoute("GET", '/api/pet', ['PetController', "getPet"]);
$router->addRoute("POST", '/api/pet', ["PetController", "createPet"]);
$router->addRoute("DELETE", '/api/pet/{id}', ["PetController", "deletePet"]);
$router->addRoute("PUT", '/api/pet/{id}', ["PetController", "putPet"]);

$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
?>