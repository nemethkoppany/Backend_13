CREATE DATABASE Macska

create table cat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) not null,
    breed VARCHAR(100) not null,
    gender BOOLEAN default false,
    age INT,
    picurl VARCHAR(255));
)

INSERT INTO cat (id, name, breed, gender, age, picurl) VALUES
(1, 'Mirci', 'Maine Coon', false, 3, 'https://img.fera.hu/images/companies/1/burmski.png?1669053195905'),
(2, 'Zsazsa', 'sziámi', false, 9, 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQe9HjLeysD9VhTy7sm-TKYzxOZSNkGsKggJR5BSozj8mkexkL525UQcKwXAQ3kufz_1NDshEM5O4hUMRGCdO4GR8PpDnsZKr960odqow'),
(3, 'Murci', 'perzsa', true, 11, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTelVIpNwYr5qvQWxO0ITshuYX6ptBtPhuhvb-_ya8oQENOduMEC9SNgweez0RsyFfLKtkQxFN3mBwNaVoYnTjYjg'),
(4, 'Figura', 'perzsa keverék', true, 3, 'https://www.zooplus.hu/magazin/wp-content/uploads/2017/03/britisch-kurzhaar-gelb-augen.jpg'),
(5, 'Berci', 'amerikai rövidszőrű', true, 2, 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS78cR5VQ6K96vM9TmFSDOSThfp7pEhS0SGw9_gIdGPLsyO2AuUrFwNDKdQYZeVbf7I3Yh6_O-MQUFvyrGD-VYafA'),
(6, 'Liza', 'ragdoll', false, 12, 'https://welovecatz.hu/media/images/2024_03_gettyimages-1490923008_LL1QU8s.2e16d0ba.fill-10000x10000.jpg'),
(7, 'Cuki', 'abesszin', true, 8, 'https://www.zooplus.hu/magazin/wp-content/uploads/2017/03/maine-coon-kitten.jpg'),
(8, 'Briós', 'házi keverék', false, 7, 'https://www.purina.hu/sites/default/files/styles/ttt_image_original/public/2024-01/sitesdefaultfilesstylessquare_medium_440x440public2022-06Maine-Coon-Cat-compressed-0.webp?itok=J0clLc_2');
