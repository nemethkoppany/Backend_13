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

CREATE Function pwd_encrypt(pwd varchar(255))
RETURNS varchar(256) DETEREMINISTIC 
return sha2(conccat(pwd,"sozva"),256);

CREATE Function login(p_email varchar(255), p_pwd varchar(255))
RETURNS int DETEREMINISTIC
BEGIN
DECLARE ok INT;
SET ok = 0;
SELECT id INTO ok from users where users.email = p_eamil AND users.password = pwd_encrypt(p_pwd)


INSERT INTO pet VALUES (NULL,"Hörcsögök", "Ez meg rágcsálók", 10500, 5, "./pictures/horcsog.jpg");
INSERT INTO pet VALUES (NULL,"Tengeri malacok", "Tengeri röfik", 6300, 8, "./pictures/tmalac.jpg");
INSERT INTO pet VALUES (NULL,"Madárpókok", "Veszélyes madárpókok",80000, 3, "./pictures/madarpok.jpg");
INSERT INTO pet VALUES (NULL,"Aranyhalak", "Szép aranyhalak", 3500, 1, "./pictures/aranyhal.jpg");


INSERT INTO users VALUES(NULL, "teszt1@gmail.com", "titkos");