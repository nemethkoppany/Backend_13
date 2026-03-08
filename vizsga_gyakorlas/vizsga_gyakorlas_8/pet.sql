use pet;

CREATE TABLE pet(
    id INT AUTO_INCREMENT  PRIMARY KEY,
    nev VARCHAR(30) NOT NULL UNIQUE,
    leiras VARCHAR(100) NOT NULL,
    ar DECIMAL NOT NULL,
    raktaron INT NOT NULL,
    kep VARCHAR(100)
);

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL
);

CREATE Trigger beforeinsert BEFORE INSERT ON users
for EACH ROW set new.PASSWORD = pwd_encrypt(new.PASSWORD);

CREATE Function pwd_encrypt(pwd VARCHAR(255))
RETURNS VARCHAR(256) DETERMINISTIC
RETURN SHA2(CONCAT(pwd,"sozva"),256);

CREATE Function login(p_email VARCHAR(255), p_pwd VARCHAR(255))
RETURNS INT DETERMINISTIC
BEGIN
DECLARE ok INT;
SET ok = 0;
SELECT id into ok FROM users WHERE users.email = p_email AND users.PASSWORD = pwd_encrypt(p_pwd);
RETURN ok;
END;


INSERT INTO pet VALUES (NULL,"Hörcsögök", "Ez meg rágcsálók", 10500, 5, "./pictures/horcsog.jpg");
INSERT INTO pet VALUES (NULL,"Tengeri malacok", "Tengeri röfik", 6300, 8, "./pictures/tmalac.jpg");
INSERT INTO pet VALUES (NULL,"Madárpókok", "Veszélyes madárpókok",80000, 3, "./pictures/madarpok.jpg");
INSERT INTO pet VALUES (NULL,"Aranyhalak", "Szép aranyhalak", 3500, 1, "./pictures/aranyhal.jpg");


INSERT INTO users VALUES(NULL, "teszt1@gmail.com", "titkos");

