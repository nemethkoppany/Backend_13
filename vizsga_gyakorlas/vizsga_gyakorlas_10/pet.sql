USE pet;

CREATE Table pet(
    id INT AUTO_INCREMENT  PRIMARY KEY,
    nev VARCHAR(30) NOT NULL UNIQUE,
    leiras VARCHAR(100) NOT NULL,
    ar DECIMAL NOT NULL,
    raktaron INT NOT NULL,
    kep VARCHAR(100)
);

CREATE Table users(
      id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL
);

CREATE Trigger beforeinsert before INSERT on users
for each row set new.password = pwd_encrypt(new.password);

DELIMITER $$

CREATE FUNCTION pwd_encrypt(pwd VARCHAR(255))
RETURNS VARCHAR(256)
DETERMINISTIC
BEGIN
    RETURN SHA2(CONCAT(pwd, 'sozva'), 256);
END$$

DELIMITER ;

DELIMITER $$

CREATE FUNCTION login(p_email VARCHAR(255), p_pwd VARCHAR(255))
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE ok INT DEFAULT 0;

    SELECT id INTO ok
    FROM users
    WHERE email = p_email
      AND password = pwd_encrypt(p_pwd)
    LIMIT 1;

    RETURN ok;
END$$

DROP FUNCTION IF EXISTS login;

CREATE FUNCTION login(p_email VARCHAR(255), p_pwd VARCHAR(255))
RETURNS INT DETERMINISTIC
RETURN (SELECT id FROM users WHERE users.email = p_email AND users.password = pwd_encrypt(p_pwd));
--RETURN (SELECT id FROM users WHERE users.email = p_email AND users.password = pwd_encrypt(p_pwd))
DELIMITER ;

INSERT INTO pet VALUES (NULL,"Hörcsögök", "Ez meg rágcsálók", 10500, 5, "./pictures/horcsog.jpg");
INSERT INTO pet VALUES (NULL,"Tengeri malacok", "Tengeri röfik", 6300, 8, "./pictures/tmalac.jpg");
INSERT INTO pet VALUES (NULL,"Madárpókok", "Veszélyes madárpókok",80000, 3, "./pictures/madarpok.jpg");
INSERT INTO pet VALUES (NULL,"Aranyhalak", "Szép aranyhalak", 3500, 1, "./pictures/aranyhal.jpg");


INSERT INTO users VALUES(NULL, "teszt1@gmail.com", "titkos");