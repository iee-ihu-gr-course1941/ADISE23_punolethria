-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.11.4-MariaDB-1~deb12u1-log - Debian 12
-- Server OS:                    debian-linux-gnu
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping structure for table naumaxiaDatabase.foeboard
CREATE TABLE IF NOT EXISTS `foeboard` (
  `grammh` tinyint(4) DEFAULT NULL,
  `sthlh` tinyint(4) DEFAULT NULL,
  `content` tinyint(4) DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='Apothikeysh twn syntetagmenwn tou kathe keliou tou kathe pliou pou topotheteitai ston pinaka';

-- Dumping data for table naumaxiaDatabase.foeboard: ~100 rows (approximately)
INSERT INTO `foeboard` (`grammh`, `sthlh`, `content`) VALUES
(0, 0, NULL),
(0, 1, NULL),
(0, 2, NULL),
(0, 3, NULL),
(0, 4, NULL),
(0, 5, NULL),
(0, 6, NULL),
(0, 7, NULL),
(0, 8, NULL),
(0, 9, NULL),
(1, 0, NULL),
(1, 1, NULL),
(1, 2, NULL),
(1, 3, NULL),
(1, 4, NULL),
(1, 5, NULL),
(1, 6, NULL),
(1, 7, NULL),
(1, 8, NULL),
(1, 9, NULL),
(2, 0, NULL),
(2, 1, NULL),
(2, 2, NULL),
(2, 3, NULL),
(2, 4, NULL),
(2, 5, NULL),
(2, 6, NULL),
(2, 7, NULL),
(2, 8, NULL),
(2, 9, NULL),
(3, 0, NULL),
(3, 1, NULL),
(3, 2, NULL),
(3, 3, NULL),
(3, 4, NULL),
(3, 5, NULL),
(3, 6, NULL),
(3, 7, NULL),
(3, 8, NULL),
(3, 9, NULL),
(4, 0, NULL),
(4, 1, NULL),
(4, 2, NULL),
(4, 3, NULL),
(4, 4, NULL),
(4, 5, NULL),
(4, 6, NULL),
(4, 7, NULL),
(4, 8, NULL),
(4, 9, NULL),
(5, 0, NULL),
(5, 1, NULL),
(5, 2, NULL),
(5, 3, NULL),
(5, 4, NULL),
(5, 5, NULL),
(5, 6, NULL),
(5, 7, NULL),
(5, 8, NULL),
(5, 9, NULL),
(6, 0, NULL),
(6, 1, NULL),
(6, 2, NULL),
(6, 3, NULL),
(6, 4, NULL),
(6, 5, NULL),
(6, 6, NULL),
(6, 7, NULL),
(6, 8, NULL),
(6, 9, NULL),
(7, 0, NULL),
(7, 1, NULL),
(7, 2, NULL),
(7, 3, NULL),
(7, 4, NULL),
(7, 5, NULL),
(7, 6, NULL),
(7, 7, NULL),
(7, 8, NULL),
(7, 9, NULL),
(8, 0, NULL),
(8, 1, NULL),
(8, 2, NULL),
(8, 3, NULL),
(8, 4, NULL),
(8, 5, NULL),
(8, 6, NULL),
(8, 7, NULL),
(8, 8, NULL),
(8, 9, NULL),
(9, 0, NULL),
(9, 1, NULL),
(9, 2, NULL),
(9, 3, NULL),
(9, 4, NULL),
(9, 5, NULL),
(9, 6, NULL),
(9, 7, NULL),
(9, 8, NULL),
(9, 9, NULL);


-- Dumping structure for table naumaxiaDatabase.friendlyboard
CREATE TABLE IF NOT EXISTS `friendlyboard` (
  `grammh` tinyint(4) DEFAULT NULL,
  `sthlh` tinyint(4) DEFAULT NULL,
  `content` tinyint(4) DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='Apothikeysh twn syntetagmenwn tou kathe keliou tou kathe pliou pou topotheteitai ston pinaka';

-- Dumping data for table naumaxiaDatabase.foeboard: ~100 rows (approximately)
INSERT INTO `friendlyboard` (`grammh`, `sthlh`, `content`) VALUES
(0, 0, NULL),
(0, 1, NULL),
(0, 2, NULL),
(0, 3, NULL),
(0, 4, NULL),
(0, 5, NULL),
(0, 6, NULL),
(0, 7, NULL),
(0, 8, NULL),
(0, 9, NULL),
(1, 0, NULL),
(1, 1, NULL),
(1, 2, NULL),
(1, 3, NULL),
(1, 4, NULL),
(1, 5, NULL),
(1, 6, NULL),
(1, 7, NULL),
(1, 8, NULL),
(1, 9, NULL),
(2, 0, NULL),
(2, 1, NULL),
(2, 2, NULL),
(2, 3, NULL),
(2, 4, NULL),
(2, 5, NULL),
(2, 6, NULL),
(2, 7, NULL),
(2, 8, NULL),
(2, 9, NULL),
(3, 0, NULL),
(3, 1, NULL),
(3, 2, NULL),
(3, 3, NULL),
(3, 4, NULL),
(3, 5, NULL),
(3, 6, NULL),
(3, 7, NULL),
(3, 8, NULL),
(3, 9, NULL),
(4, 0, NULL),
(4, 1, NULL),
(4, 2, NULL),
(4, 3, NULL),
(4, 4, NULL),
(4, 5, NULL),
(4, 6, NULL),
(4, 7, NULL),
(4, 8, NULL),
(4, 9, NULL),
(5, 0, NULL),
(5, 1, NULL),
(5, 2, NULL),
(5, 3, NULL),
(5, 4, NULL),
(5, 5, NULL),
(5, 6, NULL),
(5, 7, NULL),
(5, 8, NULL),
(5, 9, NULL),
(6, 0, NULL),
(6, 1, NULL),
(6, 2, NULL),
(6, 3, NULL),
(6, 4, NULL),
(6, 5, NULL),
(6, 6, NULL),
(6, 7, NULL),
(6, 8, NULL),
(6, 9, NULL),
(7, 0, NULL),
(7, 1, NULL),
(7, 2, NULL),
(7, 3, NULL),
(7, 4, NULL),
(7, 5, NULL),
(7, 6, NULL),
(7, 7, NULL),
(7, 8, NULL),
(7, 9, NULL),
(8, 0, NULL),
(8, 1, NULL),
(8, 2, NULL),
(8, 3, NULL),
(8, 4, NULL),
(8, 5, NULL),
(8, 6, NULL),
(8, 7, NULL),
(8, 8, NULL),
(8, 9, NULL),
(9, 0, NULL),
(9, 1, NULL),
(9, 2, NULL),
(9, 3, NULL),
(9, 4, NULL),
(9, 5, NULL),
(9, 6, NULL),
(9, 7, NULL),
(9, 8, NULL),
(9, 9, NULL),


-- Dumping structure for table naumaxiaDatabase.paiktes
CREATE TABLE `paiktes` (
	`etiketaPaikth` VARCHAR(20) NOT NULL COLLATE 'utf8mb3_bin',
	`usernamePaikth` VARCHAR(20) NOT NULL DEFAULT 'Εισαγωγή username' COLLATE 'utf8mb3_bin',
	`passwordPaikth` VARCHAR(100) NOT NULL DEFAULT '' COLLATE 'utf8mb3_bin',
	`idPaikth` VARCHAR(16) NOT NULL DEFAULT,
	PRIMARY KEY (`idPaikth`) USING BTREE
)
-- Dumping data for table naumaxiaDatabase.paiktes: ~0 rows (approximately)

-- Dumping structure for table naumaxiaDatabase.statuspaixnidiou
CREATE TABLE `statuspaixnidiou` (
	`game_status` ENUM('not active','initialized','active','ended','aborted') NOT NULL DEFAULT 'not active' COLLATE 'utf8mb3_bin',
	`result` ENUM('friendly','foe',NULL) NULL DEFAULT NULL COLLATE 'utf8mb3_bin',
	`last_change` TIMESTAMP NULL DEFAULT NULL,
	`round` INT(11) NULL DEFAULT NULL
)
COMMENT='apothikeysh twn plhroforiwn tou paixnidiou'
COLLATE='utf8mb3_bin'
ENGINE=InnoDB
;


INSERT INTO `statuspaixnidiou` (`game_status`,`result`,`last_change`,`round`) VALUES('not active',NULL,NULL,-3);

-- Dumping data for table naumaxiaDatabase.statuspaixnidiou: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
