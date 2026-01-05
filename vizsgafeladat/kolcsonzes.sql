CREATE TABLE berlok(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    jogositvany VARCHAR(15) NOT NULL,
    email VARCHAR(30) UNIQUE,
    jelszo VARCHAR(256) NOT NULL,
    telefonszam VARCHAR(20)
)
 
ALTER TABLE berlok
MODIFY COLUMN jelszo VARCHAR(256) NOT NULL;
 
CREATE Trigger insertberlo BEFORE INSERT ON berlok
FOR EACH ROW SET NEW.jelszo = jelszo_encrypt(NEW.jelszo);
 
 


CREATE FUNCTION jelszo_encrypt(jelsz VARCHAR(30))
RETURNS VARCHAR(256) DETERMINISTIC
RETURN SHA2(CONCAT(jelsz,'sozas'), 256);
 
DROP FUNCTION IF EXISTS jelszo_encrypt;
 

 
 
CREATE TABLE autok(
    id INT AUTO_INCREMENT PRIMARY KEY,
    rendszam VARCHAR(7) NOT NULL UNIQUE,
    tipus VARCHAR(100) NOT NULL,
    evjarat INT,
    szin VARCHAR(30) NOT NULL,
    kep VARCHAR(255)
)

CREATE Trigger nagybetu_auto BEFORE INSERT ON autok
FOR EACH ROW SET NEW.rendszam =  UPPER(NEW.rendszam);
 
CREATE TABLE kolcsonzes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    berloid INT,
    autoid INT,
    berletkezdete TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    napokszama INT,
    visszahozva TIMESTAMP,
    napidij DECIMAL NOT NULL,
 
    FOREIGN KEY(berloid) REFERENCES berlok(id),
    FOREIGN KEY(autoid) REFERENCES autok(id)
 
)


CREATE FUNCTION login(email VARCHAR(30), jelszo VARCHAR(30))
RETURNS  INTEGER DETERMINISTIC
BEGIN
DECLARE ok INTEGER;
SET ok = 0;
SELECT id INTO ok FROM berlok WHERE berlok.email = email AND berlok.jelszo = jelszo_encrypt(jelszo);
RETURN ok;
end;

INSERT INTO berlok VALUES(
    NULL, "Kandúr Károly", "LR123456", "Kandi@kandi.hu", "Titok123", "0622354784"
);

INSERT INTO berlok VALUES(
    NULL, "Gipsz Jakab", "VE566666", "Gipsz@gipsz.hu", "Titok123", "06305248787"
)

INSERT INTO autok VALUES(
    NULL,"AALA475","Ford Ka",2005,"szürke", NULL   
);
INSERT INTO autok VALUES(
    NULL, "ABC123", "VW Golf", 2022, "fehér", NULL 
);
INSERT INTO autok VALUES(
    NULL, "AAJQ625", "Ford Mondeo", 2021, "kék", NULL
);
INSERT INTO autok VALUES(
    NULL,"AADD596", "Seat Toledo", 2008, "zöld", NULL
);

CREATE FUNCTION szabade(auto_id INT, kezdet DATE, napok INT)
RETURNS TINYINT(1)
DETERMINISTIC
BEGIN
    DECLARE vege DATE;
    SET vege = DATE_ADD(kezdet, INTERVAL napok DAY);

    IF EXISTS (
        SELECT 1 FROM kolcsonzes
        WHERE autoid = auto_id
          AND (visszahozva IS NULL OR visszahozva >= kezdet)
          AND berletkezdete <= vege
    ) THEN
        RETURN 0;
    ELSE
        RETURN 1;
