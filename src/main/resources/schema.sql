
CREATE TABLE IF NOT EXISTS user
(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL

);

CREATE TABLE IF NOT EXISTS pattern
    (
         pattern_id INT PRIMARY KEY AUTO_INCREMENT,
         name VARCHAR(255) NOT NULL,
         descr text NOT NULL,
         instr text NOT NULL,
         hook_size INT NOT NULL,
         type VARCHAR(150) NOT NULL,
         img_url VARCHAR(250) NOT NULL,
         for_sale TINYINT(1) NOT NULL,
         price INT,
         created TIMESTAMP NOT NULL,
         user_id INT(255),
         FOREIGN KEY (user_id)
            REFERENCES user(user_id)
            ON DELETE SET NULL

    );

CREATE TABLE IF NOT EXISTS species
    (
        species_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS material
(
    material_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_order (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    total_cost INT NOT NULL,
    date TIMESTAMP NOT NULL,
    user_id INT(255),
    FOREIGN KEY (user_id)
        REFERENCES user(user_id)
        ON DELETE NO ACTION

);

CREATE TABLE IF NOT EXISTS pattern_species (
    pattern_species_id INT PRIMARY KEY AUTO_INCREMENT,
    species_id INT,
    pattern_id INT,
    FOREIGN KEY (species_id) REFERENCES species(species_id),
    FOREIGN KEY (pattern_id) REFERENCES pattern(pattern_id)
);

CREATE TABLE IF NOT EXISTS pattern_material (
    pattern_material_id INT PRIMARY KEY AUTO_INCREMENT,
    material_id INT,
    pattern_id INT,
    FOREIGN KEY (material_id) REFERENCES material(material_id),
    FOREIGN KEY (pattern_id) REFERENCES pattern(pattern_id)
);

CREATE TABLE IF NOT EXISTS pattern_order (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    pattern_id INT,
    FOREIGN KEY (order_id) REFERENCES user_order(order_id),
    FOREIGN KEY (pattern_id) REFERENCES  pattern(pattern_id)
);

CREATE TABLE IF NOT EXISTS user_pattern (
    user_pattern_id INT PRIMARY KEY AUTO_INCREMENT,
    pattern_id INT,
    user_id INT,
    FOREIGN KEY (pattern_id) REFERENCES pattern(pattern_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
)
