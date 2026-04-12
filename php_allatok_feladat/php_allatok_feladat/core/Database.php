<?php
class Database { 
    protected $pdo; //létrehozzuk a protected láthatóságú pdo változót
    public function __construct($config) {//a konstruktor segítségével kapcsolódunk az adatbázishoz
        try {
            $dsn = "mysql:host={$config['host']};dbname={$config['name']};charset=utf8"; //összefüzzük egy stringgé a mysql kapcsolathoz szükséges paraméterekkel(a config fájlból) a felépítéshez
            $this->pdo = new PDO($dsn, $config['user'], $config['password']); //Példányosítjuk a PDO osztályt, a korábbi összefűzött stringgel, és a configban található user és jelszó segítségével 
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //Beállítjuk a az attribútumnak a PDO osztály tulajdonságait a pdo objektumnak
        } catch (PDOException $e) { //ha hiba történik kiírjuk mi történt
            die("Database connection failed: " . $e->getMessage());
        }
    }
    public function insert_id() { //visszaadjuk az adatbázistáblához fűzött adat beszúrás azonosítóját
        return $this->pdo->lastInsertId();
    }
    public function query($sql, $params = []) { //a query függvénnyel különböző műveleteket és lekérdezéseket hajtunk végre az adatbázisban
        $stmt = $this->pdo->prepare($sql); //előkészítjük az sql lekérdezést (előkészített lekérdezések)
        $stmt->execute($params);//Végrehajtjuk az execute függvénnyel a megadott query parancsot
        return $stmt; //visszaadjuk a PDOStatement objektumot, később a fetchAll-lal egy több dimenziós tömbként visszaadjuk az adatbázisból érkező értékeket
    }

    public function __destruct() //a destruktor segítségével bontjuk a mySQL szerverünkkel a kapcsolatot
    {
        $this->pdo = null;
    }
}