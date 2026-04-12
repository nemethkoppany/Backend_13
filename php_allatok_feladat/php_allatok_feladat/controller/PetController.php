<?php
require __DIR__ . '/../core/Controller.php';
require __DIR__ . '/../core/Database.php';

class PetController extends Controller{
    private $db;

    public function __construct()
    {
        $config = require __DIR__ . '/../config.php';
        $this->db = new Database($config['db']);
    }

    public function getPet(){
        $stmt = $this->db->query("SELECT * FROM pet;");
        $pets = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($pets){
            $this->json($pets);
        }
        else{
            $this->json(["message"=> "Az elem nem létezik."], 404);
        }
    }

    public function createPet(){
        $input = $this->getInput();
        if(isset($input["nev"]) && !empty($input['ar'])){
            try{
                $this->db->query("INSERT INTO pet VALUES (NULL, ?, ?, ?, ?,?)", [$input["nev"], $input["leiras"], $input["ar"], $input["raktaron"], $input["kep"]]);
                $newId = $this->db->insert_id();
                $this->json(["id"=> $newId], 201);
            }
            catch(PDOException $e){
                $this->json(["message"=> "Database Error: " . $e->getMessage()], 500);
            }
        }else{
            $this->json(["message"=> "Az adatok nem megfelelőek!"], 400);
        }
    }
    
    public function putPet($id){
        $input = $this->getInput();
        $input["kep"] = $input["kep"] ?? null;


        if(isset($input["nev"]) && isset($input["leiras"]) && isset($input["ar"]) && isset($input["raktaron"]) && isset($id["id"]) && is_numeric($id['id'])){
            try{
                $stmt = $this->db->query("UPDATE pet SET nev = ?, leiras = ?, ar = ?, raktaron = ?, kep = ? WHERE id = ?", [
                    $input["nev"],
                    $input["leiras"],
                    $input["ar"],
                    $input["raktaron"],
                    $input["kep"],
                    $id["id"]
                ]);

                if($stmt->rowCount() === 0){
                    $this->createPet();
                    return;
                }
                $this->json(["message" => "Sikeres módosítás"]);
                return;
            }
            catch(PDOException $e){
                $this->json(["message" => "Database error: " . $e->getMessage()], 500);
                return;
            }
        }
        $this->json(['message' => 'Az adatok nem megfelelőek!'], 400);
    }
    public function deletePet($id){
        if(isset($id['id']) && is_numeric($id['id'])){
            try{
                $stmt = $this->db->query("DELETE FROM pet WHERE id = ?", [$id['id']]);
                if($stmt->rowCount() === 0){
                    $this->json(["message" => "Az elem nem létezik."], 404);
                    return;
                }
                $this->json(null, 204);
                return;
            }
            catch(PDOException $e){
                $this->json(["message" => "Database Error: " . $e->getMessage()], 500);
                return;
            }
        }
        $this->json(["message" => "Az adatok nem megfelelőek!"], 400);
    }
}