<?php
class Router {
    private $routes = [];

    public function addRoute($method, $path, $handler) {
        $this->routes[] = [
            'method'  => strtoupper($method),
            'path'    => $path,
            'handler' => $handler
        ];
    }

    public function dispatch($method, $uri) {

        $uri = strtok($uri, '?');

        foreach ($this->routes as $route) {
            if ($route['method'] === strtoupper($method) &&
                preg_match($this->convertPathToRegex($route['path']), $uri, $matches)) {
                array_shift($matches);
                return $this->callHandler($route['handler'], $matches);
            }
        }
        http_response_code(404);
        header("Content-Type: application/json; charset=UTF-8");
        echo json_encode(["message" => "Endpoint Not Found"]);
    }

    private function convertPathToRegex($path) {
        return '#^' . preg_replace('/\{(\w+)\}/', '(?P<\1>[^/]+)', $path) . '$#';
    }

    private function callHandler($handler, $params) {
        if (is_array($handler)) {
            [$className, $methodName] = $handler;
            if (class_exists($className) && method_exists($className, $methodName)) {
                $controller = new $className();
                return $controller->$methodName($params);
            }
        }
        http_response_code(500);
        header("Content-Type: application/json; charset=UTF-8");
        echo json_encode(["message" => "Handler Not Found"]);
    }
}
