CREATE DATABASE db_noticias;

USE db_noticias;

CREATE TABLE users(
    id_usr INT(2) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(20) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

CREATE TABLE secciones(
    id_secc INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo_secc VARCHAR(60) NOT NULL
);

CREATE TABLE contenidos(
    id_cont INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    imagen BLOB NOT NULL,
    body TEXT NOT NULL,
    titulo_seccion INT(3),
    users_id INT(2),
    created timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (users_id) REFERENCES users(id_usr),
    CONSTRAINT fk_titulo_secc FOREIGN KEY (titulo_seccion) REFERENCES secciones(id_secc)
);

