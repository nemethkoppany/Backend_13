<?php
class Router {
    //Létrehozunk egy privát láthatóságú routes tömböt 
    private $routes = [];

    
    public function addRoute($method, $path, $handler) { //az addRoute függvénnyel tudunk új adatot hozzáfűzni a routes (asszociatív) tömbhöz
        $this->routes[] = [
            'method' => strtoupper($method), //a method kulcs a kérés típusa lesz nagy betűkkel
            'path' => $path, //a path kulcs pedig a kérés URL-je lesz
            'handler' => $handler //a  handler kulcshoz pedig, annak az osztálynak a függvénye fog kerülni, amely kezeli az adott kérést
        ];
    }

    public function dispatch($method, $uri) {//amikor jön egy kérés a szerver felé végigpörgeti a routes tömböt
        foreach ($this->routes as $route) {
            if ($route['method'] === strtoupper($method) && preg_match($this->convertPathToRegex($route['path']), $uri, $matches)) {//vizsgáljuk, hogy a tömbben található kérés methodja és a paraméter metodja megegyezik-e továbbá, hogy a regurális kifejezésnek megfelel-e a kérés URL-je, illetve a paraméterben kapott adat, ha megegyezik bekerül a matches tömbbe
                array_shift($matches); // ha van egyezés, akkor a matches tömbből töröljük  az első elemet az array_shift() függvénnyel, így a tömbben csak a tiszta paraméterek maradnak
                return $this->call_user_func_array($route['handler'], $matches); //majd vissszatérünk a call_user_func_array függvény visszatérési értékével, a handler kulcsot és a megegyező útvonal fontos adatait átadva neki
            }
        }
        http_response_code(404); //ha nincs egyezés 404-el és egy error üzenettel térünk vissza
        echo json_encode(["message" => "Endpoint Not Found"]);
    }

    private function convertPathToRegex($path) {//segédfüggvény ami átalakítja az útvonalat regurális kifejezéssé
        return '#^' . preg_replace('/\{(\w+)\}/', '(?P<\1>[^/]+)', $path) . '$#';
    }

    private function call_user_func_array ($handler, $params) {//Ez a függvény hajtja végre a tényleges hívást
        if (is_array($handler)) {
            $className = $handler[0];//handler tömbből kiveszi a kontroller osztály nevét, és a metódus nevét
            $methodName = $handler[1];
            if (class_exists($className) && method_exists($className, $methodName)) { //ha ezek léteznek
                $controller = new $className(); //létrehozzuk a controller objektumot, itt lefut a kontoller konstruktora(ez kapcsolódik az adatbázishoz)
                return  $controller->$methodName($params); //végül visszadjuk a metódus hívást és átadjuk neki az URL-ből kiszedett paramétereket
            }
        }
        http_response_code(500); //ha nincs ilyen kontroller függvény, 500-as státuszkóddal térünk vissza, és egy json formájú hibaüzenettel
        echo json_encode(["message" => "Handler Not Found"]);
    }
}