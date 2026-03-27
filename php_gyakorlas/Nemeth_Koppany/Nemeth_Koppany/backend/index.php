<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require __DIR__ . '/core/Router.php';
require __DIR__ . '/controller/PetController.php';

$router = new Router();

$router->addRoute("GET",    '/api/pet',       ['PetController', 'getPet']);
$router->addRoute("GET",    '/api/pet/{id}',  ['PetController', 'getPet']);
$router->addRoute("POST",   '/api/pet',       ['PetController', 'createPet']);
$router->addRoute("PUT",    '/api/pet/{id}',  ['PetController', 'putPet']);
$router->addRoute("DELETE", '/api/pet/{id}',  ['PetController', 'deletePet']);

$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
