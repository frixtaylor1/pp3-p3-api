-- Adminer 4.8.1 MySQL 11.1.2-MariaDB-1:11.1.2+maria~ubu2204 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE DATABASE `pp3_p3_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `pp3_p3_db`;

DELIMITER ;;

DROP PROCEDURE IF EXISTS `usp_change_state_preinscription`;;
CREATE PROCEDURE `usp_change_state_preinscription`(IN `p_id` int, IN `p_state` varchar(100))
UPDATE preinscription 
   SET preinscription.state = p_state
WHERE preinscription.id = p_id;;

DROP PROCEDURE IF EXISTS `usp_create_preinscription`;;
CREATE PROCEDURE `usp_create_preinscription`(IN `p_id_user` int, IN `p_id_major` int, IN `p_preinscription_date` date, IN `p_state` varchar(100))
INSERT INTO preinscription (id_user, id_major, preinscription_date, state)
  VALUES (p_id_user, p_id_major, p_preinscription_date, p_state);;

DROP PROCEDURE IF EXISTS `usp_create_user`;;
CREATE PROCEDURE `usp_create_user`(IN `p_nickname` varchar(45), IN `p_password` varchar(45))
INSERT INTO user(nickname, password, name, surname, dni, birthdate, email) 
    VALUES (p_nickname, p_password, NULL, NULL, NULL, NULL, NULL);;

DROP PROCEDURE IF EXISTS `usp_read_major`;;
CREATE PROCEDURE `usp_read_major`(IN `p_id` int)
SELECT * FROM major WHERE major.id = p_id;;

DROP PROCEDURE IF EXISTS `usp_read_preinscription`;;
CREATE PROCEDURE `usp_read_preinscription`(IN `p_id` int)
SELECT * FROM preinscription WHERE preinscription.id = p_id;;

DROP PROCEDURE IF EXISTS `usp_read_user_by_id`;;
CREATE PROCEDURE `usp_read_user_by_id`(IN `p_id` int)
SELECT * FROM user WHERE user.id = p_id;;

DROP PROCEDURE IF EXISTS `usp_remove_preinscription`;;
;;

DROP PROCEDURE IF EXISTS `usp_update_user`;;
CREATE PROCEDURE `usp_update_user`(IN `p_id` int, IN `p_name` varchar(45), IN `p_surname` varchar(45), IN `p_dni` varchar(45), IN `p_birthdate` varchar(45), IN `p_email` varchar(100))
UPDATE user 
  SET user.name      = p_name, 
      user.surname   = p_surname, 
      user.dni       = p_dni, 
      user.birthdate = p_birthdate,
      user.email     = p_email
WHERE user.id = p_id;;

DELIMITER ;

DROP TABLE IF EXISTS `major`;
CREATE TABLE `major` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `capacity` int(11) NOT NULL,
  `description` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `major` (`id`, `name`, `capacity`, `description`) VALUES
(1,	'analisis de sistemas',	100,	'Un analista de sistemas es un profesional que se encarga de estudiar, diseñar, desarrollar y mantener sistemas de software y tecnológicos para satisfacer las necesidades de una organización o cliente. Sus responsabilidades incluyen:\r\n\r\n    Análisis de Requisitos: Identificar y comprender las necesidades de los usuarios y la organización para determinar los requisitos del sistema.\r\n\r\n    Diseño: Crear especificaciones detalladas del sistema, incluyendo la arquitectura, la base de datos, la interfaz de usuario y los algoritmos.\r\n\r\n    Desarrollo: Escribir, programar y codificar el software de acuerdo con las especificaciones de diseño.\r\n\r\n    Pruebas: Verificar que el software funcione correctamente y cumpla con los requisitos mediante pruebas y depuración.\r\n\r\n    Implementación: Llevar a cabo la instalación y puesta en marcha del sistema en un entorno de producción.\r\n\r\n    Mantenimiento: Realizar actualizaciones, correcciones de errores y mejoras en el sistema a lo largo de su ciclo de vida.\r\n\r\n    Documentación: Crear documentación técnica y de usuario para facilitar la comprensión y el uso del sistema.\r\n\r\n    Colaboración: Trabajar en equipo con desarrolladores, diseñadores y otros profesionales para lograr los objetivos del proyecto.\r\n\r\n    Evaluación de Tecnología: Mantenerse al tanto de las últimas tendencias tecnológicas y evaluar su aplicabilidad en proyectos.\r\n\r\nUn analista de sistemas debe ser un solucionador de problemas, tener buenas habilidades de comunicación y ser capaz de comprender tanto las necesidades de negocio como los aspectos técnicos del desarrollo de software. Su objetivo es asegurarse de que los sistemas informáticos satisfagan eficazmente las necesidades de la organización y sean eficientes y confiables.');

DROP TABLE IF EXISTS `preinscription`;
CREATE TABLE `preinscription` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_major` int(11) NOT NULL,
  `preinscription_date` date NOT NULL,
  `state` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_major` (`id_major`),
  CONSTRAINT `preinscription_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `preinscription_ibfk_2` FOREIGN KEY (`id_major`) REFERENCES `major` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `preinscription` (`id`, `id_user`, `id_major`, `preinscription_date`, `state`) VALUES
(1,	1,	1,	'2023-10-14',	'preinscript');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `dni` varchar(45) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `user` (`id`, `nickname`, `password`, `name`, `surname`, `dni`, `birthdate`, `email`) VALUES
(1,	'dev',	'123456',	'Aldo',	'Capurro',	'123123123',	'1987-12-31',	'aldo@capurro.com'),
(2,	'pepe',	'123456',	NULL,	NULL,	NULL,	NULL,	NULL);

-- 2023-10-26 22:38:31
