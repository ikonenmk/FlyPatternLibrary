
CREATE TABLE IF NOT EXISTS user
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL

);

CREATE TABLE IF NOT EXISTS pattern
    (
         id INT PRIMARY KEY AUTO_INCREMENT,
         name VARCHAR(255) NOT NULL,
         descr text NOT NULL,
         instr text NOT NULL,
         hook_size INT NOT NULL,
         type VARCHAR(150) NOT NULL,
         img_url VARCHAR(250) NOT NULL,
         for_sale TINYINT(1) NOT NULL,
         price INT,
         created TIMESTAMP NOT NULL
    );



CREATE TABLE IF NOT EXISTS user_pattern (
    pattern INT,
    user INT,
    primary key (pattern, user)

);

CREATE TABLE IF NOT EXISTS species (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS material (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS pattern_material (
    material INT,
    pattern INT,
    primary key (pattern, material)
);

CREATE TABLE IF NOT EXISTS pattern_species (
    species INT,
    pattern INT,
    primary key(species, pattern)
);