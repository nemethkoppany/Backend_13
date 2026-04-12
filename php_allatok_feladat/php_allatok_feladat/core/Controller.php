<?php

//A Controller osztály segítségével az útvonalak kezelésében segítséget nyújtó függvényeket deklarálunk
class Controller {
    protected function json($data,$status = 200) {//a json típusú adat visszatérést segíti megvalósítani, két bemeneti paramétert várunk egy a kérés státuszkódja másik pedig a kérés visszadni kívánt adata (asszociatív tömb)
        http_response_code($status);//itt beállítjuk a http_response_code() függvénnyel, a visszatérés státuszkódját.
       
         if ($data === null) {//ha nincs visszatérítendő adat visszatérünk
            return;
        }
        header("Content-Type: application/json; charset=UTF-8");//ha van visszaadott adat, beállítjuk a kódolást, és Content-Typeot a header() függvénnyel
        echo json_encode($data); //majd kiíratjuk a json_encode() függvényünk(átadva neki a korábbi bemeneti paraméterünket) visszatérését az ehco függvénnyel
    }
    
    protected function getInput() { //a getInput() függvénnyel beolvassuk a kérés törzséből a szerver felé érkező adatokat, a file_get_contents() segítségével egy nagy stringbe (a php://input egy olyan read-only stream ,amellyel hozzátudunk férni egy kérés törzséhez, függetlenül a kérés típusától), json_decode() függvénnyel, pedig php adattípussá alakítjuk a szöveges jsont (asszociatív tömbbé), a true paraméter FONTOS! EZZEL MONDJUK MEG A PHP-nak, hogy asszociatív tömböt adjon vissza és ne egy objektumot.
        return json_decode(file_get_contents("php://input"), true);
    }
}