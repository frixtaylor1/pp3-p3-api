SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';


create database `inscription`;
use `inscription`;


DELIMITER ;;


CREATE PROCEDURE `create_user` (IN `p_name` varchar(50), IN `p_surname` varchar(50), IN `p_dni` varchar(9), IN `p_mail` varchar(50), IN `p_birthDate` date, IN `p_age` int)
BEGIN
    INSERT INTO users (`name`, `surname`, `dni`, `mail`, `birthDate`, `age`) VALUES (p_name, p_surname, p_dni, p_mail, p_birthDate, p_age);
END;

CREATE PROCEDURE `add_preinscription` (IN `id_users` int, IN `p_name` varchar(50), IN `p_surname` varchar(50), IN `p_dni` varchar(9), IN `p_mail` varchar(50), IN `p_birthDate` date, IN `p_age` int)
BEGIN
    INSERT INTO preinscription (id_users, `name`, `surname`, `dni`, `mail`, `birthDate`, `age`, `status`) VALUES (id_users, p_name, p_surname, p_dni, p_mail, p_birthDate, p_age , 'pending');
END;

CREATE PROCEDURE `add_career` (IN `p_name` varchar(50), IN `id_preinscription` int)
BEGIN
    INSERT INTO career (`name`, id_preinscription) VALUES (p_name, id_preinscription);
END;


CREATE PROCEDURE `delete_preinscription_user` (IN `id_users` int)
BEGIN
    DELETE FROM preinscription WHERE id_users = id_users;
END;

CREATE PROCEDURE `delete_user` (IN `id_users` int)
BEGIN
    DELETE FROM users WHERE id = id_users;
END;

CREATE PROCEDURE `create_preinscription` (
    IN `name` varchar(50),
    IN `surname` varchar(50),
    IN `dni` varchar(9),
    IN `mail` varchar(50),
    IN `birthDate` date,
    IN `age` int,
    IN `career_name` varchar(50) 
)
BEGIN
    DECLARE new_user_id INT;
    DECLARE new_preinscription_id INT;
    DECLARE new_career_id INT; -- Variable para almacenar el ID de la carrera
    
    -- Insertar el usuario en la tabla "users"
    INSERT INTO users (`name`, `surname`, `dni`, `mail`, `birthDate`, `age`)
    VALUES (`name`, `surname`, `dni`, `mail`, `birthDate`, `age`);
    
    -- Obtener el ID del nuevo usuario insertado
    SET new_user_id = LAST_INSERT_ID();
    
    -- Insertar la preinscripción en la tabla "preinscription"
    INSERT INTO preinscription (id_users, `name`, `surname`, `dni`, `mail`, `birthDate`, `age`, `status`)
    VALUES (new_user_id, `name`, `surname`, `dni`, `mail`, `birthDate`, `age`, 'pending');
    
    -- Obtener el ID de la nueva preinscripción
    SET new_preinscription_id = LAST_INSERT_ID();
    
    -- Insertar la carrera en la tabla "career"
    INSERT INTO career (`name`, id_preinscription)
    VALUES (`career_name`, new_preinscription_id);
    
    -- Obtener el ID de la nueva carrera insertada
    SET new_career_id = LAST_INSERT_ID();
    
    -- Devolver el ID de la preinscripción creada y el ID de la carrera creada
    SELECT new_preinscription_id AS preinscription_id, new_career_id AS career_id;
END;;




CREATE PROCEDURE `confirmPreinscription` (IN `p_mail` VARCHAR(50))
BEGIN
    DECLARE preinscription_id INT;

    -- Buscar la preinscripción por correo electrónico
    SELECT id INTO preinscription_id
    FROM preinscription
    WHERE mail = p_mail AND `status` = 'pending'
    LIMIT 1;

    IF preinscription_id IS NOT NULL THEN
        -- Actualizar el estado de la preinscripción a "confirmed"
        UPDATE preinscription
        SET `status` = 'confirmed'
        WHERE id = preinscription_id;

        -- Devolver un valor 1 para indicar éxito
        SELECT 1 AS Result;
    ELSE
        -- Devolver un valor 0 para indicar que no se encontró la preinscripción
        SELECT 0 AS Result;
    END IF;
END;;


CREATE PROCEDURE `cancelPreinscription` (IN `p_mail` VARCHAR(50))
BEGIN
    DECLARE preinscription_id INT;

    -- Buscar la preinscripción por correo electrónico
    SELECT id INTO preinscription_id
    FROM preinscription
    WHERE mail = p_mail AND `status` = 'pending'
    LIMIT 1;

    IF preinscription_id IS NOT NULL THEN
        -- Actualizar el estado de la preinscripción a "canceled"
        UPDATE preinscription
        SET `status` = 'canceled'
        WHERE id = preinscription_id;

        -- Devolver un mensaje de éxito
        SELECT 'Pre-inscription canceled successfully' AS Message;
    ELSE
        -- Devolver un mensaje de error si no se encontró la preinscripción
        SELECT 'Pre-inscription not found or already canceled' AS Message;
    END IF;
END;;


DELIMITER ;


create table users (
    id int primary key auto_increment,
    `name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
    `surname` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
    `dni` varchar(9) not null unique,
    `mail` varchar(50) not null unique,
    `birthDate` date not null,
    `age` int not null
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;



create table preinscription (
    id int primary key auto_increment,
    `name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
    `surname` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
    `dni` varchar(9) not null unique,
    `mail` varchar(50) not null unique,
    `birthDate` date not null,
    `age` int not null,
    `status` varchar(10),
    id_users int,
    foreign key (id_users) references users(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

create table career (
    id int primary key auto_increment,
    `name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
    id_preinscription int,
    foreign key (id_preinscription) references preinscription(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;











