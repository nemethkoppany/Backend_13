<?php
require __DIR__ . '/../core/Controller.php';
require __DIR__ . '/../core/Database.php';

class PetController extends Controller {
    private $db;

    private $allowedFields = ['nev', 'leiras', 'ar', 'raktaron', 'kep'];

    public function __construct() {
        $config = require __DIR__ . '/../config.php';
        $this->db = new Database($config['db']);
    }


    public function getPet($params = []) {
        if (!empty($params['id'])) {
            if (!is_numeric($params['id'])) {
                $this->json(["message" => "Az adatok nem megfelelőek!"], 400);
                return;
            }
            $stmt = $this->db->query("SELECT * FROM pet WHERE id = ?", [$params['id']]);
            $pet  = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($pet) {
                $this->json($pet);
            } else {
                $this->json(["message" => "Az elem nem létezik."], 404);
            }
        } else {
            $stmt = $this->db->query("SELECT * FROM pet");
            $pets = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ($pets) {
                $this->json($pets);
            } else {
                $this->json(["message" => "Az elem nem létezik."], 404);
            }
        }
    }


    public function createPet($params = []) {
        $input = $this->getInput();

        if (!is_array($input) ||
            empty($input['nev']) ||
            !isset($input['leiras']) ||
            !isset($input['ar']) ||
            !isset($input['raktaron'])) {
            $this->json(["message" => "Az adatok nem megfelelőek!"], 400);
            return;
        }

        $kep = $input['kep'] ?? null;

        try {
            $this->db->query(
                "INSERT INTO pet (nev, leiras, ar, raktaron, kep) VALUES (?, ?, ?, ?, ?)",
                [$input['nev'], $input['leiras'], $input['ar'], $input['raktaron'], $kep]
            );
            $newId = $this->db->insert_id();
            $this->json(["id" => (int)$newId], 201);
        } catch (PDOException $e) {
            $this->json(["message" => "Database Error: " . $e->getMessage()], 500);
        }
    }

    public function putPet($params = []) {
        if (!isset($params['id']) || !is_numeric($params['id'])) {
            $this->json(["message" => "Az adatok nem megfelelőek!"], 400);
            return;
        }

        $id = (int)$params['id'];
        $input = $this->getInput();


        if (!is_array($input) || empty($input)) {
            $this->json(["message" => "Az adatok nem megfelelőek!"], 400);
            return;
        }


        $fields = array_intersect_key($input, array_flip($this->allowedFields));

        if (empty($fields)) {
            $this->json(["message" => "Az adatok nem megfelelőek!"], 400);
            return;
        }


        $check = $this->db->query("SELECT id FROM pet WHERE id = ?", [$id]);
        if ($check->rowCount() === 0) {
            $this->json(["message" => "Az elem nem létezik."], 404);
            return;
        }

        $setParts = [];
        $values   = [];
        foreach ($fields as $col => $val) {
            $setParts[] = "$col = ?";
            $values[]   = $val;
        }
        $values[] = $id;

        try {
            $this->db->query(
                "UPDATE pet SET " . implode(', ', $setParts) . " WHERE id = ?",
                $values
            );
            $this->json(["message" => "Sikeres módosítás"], 201);
        } catch (PDOException $e) {
            $this->json(["message" => "Database Error: " . $e->getMessage()], 500);
        }
    }


    public function deletePet($params = []) {
        if (!isset($params['id']) || !is_numeric($params['id'])) {
            $this->json(["message" => "Az adatok nem megfelelőek!"], 400);
            return;
        }

        try {
            $stmt = $this->db->query("DELETE FROM pet WHERE id = ?", [$params['id']]);
            if ($stmt->rowCount() === 0) {
                $this->json(["message" => "A kisállat nem létezik."], 404);
                return;
            }
            $this->json(null, 204);
        } catch (PDOException $e) {
            $this->json(["message" => "Database Error: " . $e->getMessage()], 500);
        }
    }
}
