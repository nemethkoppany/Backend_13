<?php

//Beállítjuk, hogy mik kerülhetnek az adott kérések headerjeibe.
header("Access-Control-allow-origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

//importáljuk a szükséges fájlokat, a routert amely segítségével az útvonalakat osztjuk ki és az útvonalakat kezelő függvényeket tartalmazó PetControllert
require __DIR__ . '/core/Router.php';
require __DIR__ . '/controller/PetController.php';

//Példányosítjuk a Router osztályunkat
$router = new Router();

//Itt az addRoute függvény segítségével, hozzáadjuk az adott útvonalakat, minden tulajdonságukkal együtt
$router->addRoute("GET", '/api/pet', ['PetController', "getPet"]);
$router->addRoute("POST", '/api/pet', ["PetController", "createPet"]);
$router->addRoute("DELETE", '/api/pet/{id}', ["PetController", "deletePet"]);
$router->addRoute("PUT", '/api/pet/{id}', ["PetController", "putPet"]);
$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);

?>   