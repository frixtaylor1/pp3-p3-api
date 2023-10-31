-- Adminer 4.8.1 MySQL 11.1.2-MariaDB-1:11.1.2+maria~ubu2204 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE DATABASE `pp3_p3_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `pp3_p3_db`;

DELIMITER ;;

DROP PROCEDURE IF EXISTS `usp_confirm_preinscription`;;
CREATE PROCEDURE `usp_confirm_preinscription`(IN `p_id` int, IN `p_state` varchar(100))
UPDATE preinscription 
   SET preinscription.state = p_state
WHERE preinscription.id = p_id;;

DROP PROCEDURE IF EXISTS `usp_create_preinscription`;;
CREATE PROCEDURE `usp_create_preinscription`(IN `p_id_user` int, IN `p_id_major` int, IN `p_preinscription_date` date, IN `p_state` varchar(100))
INSERT INTO preinscription (id_user, id_major, preinscription_date, state)
  VALUES (p_id_user, p_id_major, p_preinscription_date, p_state);;

DROP PROCEDURE IF EXISTS `usp_create_user`;;
CREATE PROCEDURE `usp_create_user`(IN `p_nickname` varchar(45), IN `p_password` varchar(45))
INSERT INTO `pp3_p3_db`.`user` (nickname, password, name, surname, dni, birthdate, email) 
    VALUES (p_nickname, p_password, NULL, NULL, NULL, NULL, NULL);;

DROP PROCEDURE IF EXISTS `usp_read_major`;;
CREATE PROCEDURE `usp_read_major`(IN `p_id` int)
SELECT * FROM major WHERE major.id = p_id;;

DROP PROCEDURE IF EXISTS `usp_read_preinscription`;;
CREATE PROCEDURE `usp_read_preinscription`(IN `p_id` int)
SELECT * FROM preinscription WHERE preinscription.id = p_id;;

DROP PROCEDURE IF EXISTS `usp_read_user_by_id`;;
CREATE PROCEDURE `usp_read_user_by_id`(IN `p_id` int)
SELECT * FROM `pp3_p3_db`.`user` WHERE `pp3_p3_db`.`user`.id = p_id;;

DROP PROCEDURE IF EXISTS `usp_remove_preinscription`;;
;;

DROP PROCEDURE IF EXISTS `usp_update_user`;;
CREATE PROCEDURE `usp_update_user`(IN `p_id` int, IN `p_name` varchar(45), IN `p_surname` varchar(45), IN `p_dni` varchar(45), IN `p_birthdate` varchar(45), IN `p_email` varchar(100))
UPDATE  `pp3_p3_db`.`user` 
  SET `pp3_p3_db`.`user`.name      = p_name, 
      `pp3_p3_db`.`user`.surname   = p_surname, 
      `pp3_p3_db`.`user`.dni       = p_dni, 
      `pp3_p3_db`.`user`.birthdate = p_birthdate,
      `pp3_p3_db`.`user`.email     = p_email
WHERE `pp3_p3_db`.`user`.id = p_id;;

DELIMITER ;

DROP TABLE IF EXISTS `major`;
CREATE TABLE `major` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `capacity` int(11) NOT NULL,
  `description` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `pp3_p3_db`.`user`;
CREATE TABLE `pp3_p3_db`.`user` (
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
  CONSTRAINT `preinscription_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `pp3_p3_db`.`user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `preinscription_ibfk_2` FOREIGN KEY (`id_major`) REFERENCES `major` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- 2023-10-26 22:38:31
