create table if not exists users(
                      username VARCHAR (100) not null primary key,
                      password VARCHAR(150) not null,
                      enabled boolean not null
);

create table if not exists authorities (
                             username VARCHAR(100) not null,
                             authority VARCHAR(50) not null,
                             constraint fk_authorities_users foreign key(username) references users(username)
);

/*Only run at first compile: create unique index ix_auth_username on authorities (username,authority);*/


CREATE TABLE IF NOT EXISTS pattern
    (
         id INT PRIMARY KEY AUTO_INCREMENT,
         name VARCHAR(100) NOT NULL,
         descr text(2000),
         instr text(2000),
         hook_size_from INT NOT NULL,
         hook_size_to INT NOT NULL,
         type VARCHAR(150) NOT NULL,
         img_url VARCHAR(250) NOT NULL,
         for_sale TINYINT(1) NOT NULL,
         price INT,
         created_by_user VARCHAR(100) NOT NULL,
         created TIMESTAMP NOT NULL
    );



CREATE TABLE IF NOT EXISTS user_pattern (
    pattern INT NOT NULL ,
    users VARCHAR(100) NOT NULL,
    primary key (pattern, users),
    FOREIGN KEY (pattern) REFERENCES pattern(id) ON DELETE CASCADE,
    FOREIGN KEY (users) REFERENCES users(username) ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS species (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS material (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS pattern_material (
    material INT NOT NULL ,
    pattern INT NOT NULL,
    PRIMARY KEY  (material, pattern),
    FOREIGN KEY (material) REFERENCES material(id) ON DELETE CASCADE,
    FOREIGN KEY (pattern) REFERENCES pattern(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pattern_species (
    species INT NOT NULL ,
    pattern INT NOT NULL,
    PRIMARY KEY (species, pattern),
    FOREIGN KEY (species) REFERENCES species(id) ON DELETE CASCADE,
    FOREIGN KEY (pattern) REFERENCES pattern(id) ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS user_order (
    id INT PRIMARY KEY AUTO_INCREMENT,
    total_cost INT NOT NULL,
    date TIMESTAMP NOT NULL,
    user VARCHAR(100) NOT NULL,
    FOREIGN KEY (user) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pattern_order (
    pattern INT NOT NULL,
    user_order INT NOT NULL,
    PRIMARY KEY (pattern, user_order),
    FOREIGN KEY (pattern) REFERENCES pattern(id) ON DELETE CASCADE,
    FOREIGN KEY (user_order) REFERENCES user_order(id) ON DELETE CASCADE
);