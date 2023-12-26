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

-- Dumping structure for table naumaxiaDatabase.boatsreset
CREATE TABLE IF NOT EXISTS `boatsreset` (
  `onomaPliou` varchar(20) NOT NULL,
  `mhkosPliou` tinyint(4) NOT NULL DEFAULT 0,
  `posothtaPliwn` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`onomaPliou`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='Xrhsh gia reset twn diathesimwn karaviwn kathe paikth';

-- Dumping data for table naumaxiaDatabase.boatsreset: ~4 rows (approximately)
INSERT INTO `boatsreset` (`onomaPliou`, `mhkosPliou`, `posothtaPliwn`) VALUES
	('aeroplanoforo', 5, 1),
	('antitorpiliko', 4, 1),
	('polemiko', 3, 1),
	('ypovrixio', 2, 2);

-- Dumping structure for table naumaxiaDatabase.foeboard
CREATE TABLE IF NOT EXISTS `foeboard` (
  `grammh` tinyint(4) DEFAULT NULL,
  `sthlh` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='Apothikeysh twn syntetagmenwn tou kathe keliou tou kathe pliou pou topotheteitai ston pinaka';

-- Dumping data for table naumaxiaDatabase.foeboard: ~100 rows (approximately)
INSERT INTO `foeboard` (`grammh`, `sthlh`) VALUES
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL);

-- Dumping structure for table naumaxiaDatabase.foeboats
CREATE TABLE IF NOT EXISTS `foeboats` (
  `onomaPliou` varchar(20) NOT NULL,
  `mhkosPliou` tinyint(4) NOT NULL,
  `posothtaPliwn` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`onomaPliou`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='apothikeysh twn diathesimwn pliwn tou foe';

-- Dumping data for table naumaxiaDatabase.foeboats: ~4 rows (approximately)
INSERT INTO `foeboats` (`onomaPliou`, `mhkosPliou`, `posothtaPliwn`) VALUES
	('aeroplanoforo', 5, 1),
	('antitorpiliko', 4, 1),
	('polemiko', 3, 1),
	('ypovrixio', 2, 2);



-- Dumping structure for table naumaxiaDatabase.friendlyboard
CREATE TABLE IF NOT EXISTS `friendlyboard` (
  `grammh` tinyint(4) DEFAULT NULL,
  `sthlh` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='Apothikeysh twn syntetagmenwn tou kathe keliou tou kathe pliou pou topotheteitai ston pinaka';

-- Dumping data for table naumaxiaDatabase.friendlyboard: ~100 rows (approximately)
INSERT INTO `friendlyboard` (`grammh`, `sthlh`) VALUES
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL),
	(NULL, NULL);

-- Dumping structure for table naumaxiaDatabase.friendlyboats
CREATE TABLE IF NOT EXISTS `friendlyboats` (
  `onomaPliou` varchar(20) NOT NULL,
  `mhkosPliou` tinyint(4) NOT NULL,
  `posothtaPliwn` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`onomaPliou`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='apothikeysh twn diathesimwn pliwn tou friendly';

-- Dumping data for table naumaxiaDatabase.friendlyboats: ~4 rows (approximately)
INSERT INTO `friendlyboats` (`onomaPliou`, `mhkosPliou`, `posothtaPliwn`) VALUES
	('aeroplanoforo', 5, 1),
	('antitorpiliko', 4, 1),
	('polemiko', 3, 1),
	('ypovrixio', 2, 2);



-- Dumping structure for table naumaxiaDatabase.paiktes
CREATE TABLE IF NOT EXISTS `paiktes` (
  `etiketaPaikth` varchar(20) NOT NULL,
  `usernamePaikth` varchar(20) NOT NULL DEFAULT 'Εισαγωγή username',
  `passwordPaikth` varchar(50) NOT NULL,
  PRIMARY KEY (`etiketaPaikth`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='apothikeysh twn stoixeiwn twn paiktwn';

-- Dumping data for table naumaxiaDatabase.paiktes: ~0 rows (approximately)

-- Dumping structure for table naumaxiaDatabase.statuspaixnidiou
CREATE TABLE IF NOT EXISTS `statuspaixnidiou` (
  `status` enum('not active','initialized','active','ended','aborted') NOT NULL DEFAULT 'not active',
  `result` enum('friendly','foe','draw') DEFAULT NULL,
  `last_change` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='apothikeysh twn plhroforiwn tou paixnidiou';

-- Dumping data for table naumaxiaDatabase.statuspaixnidiou: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
