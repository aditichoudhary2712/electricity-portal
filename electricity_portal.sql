-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: electricity_portal
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `application_id` varchar(20) DEFAULT NULL,
  `applicant_name` varchar(100) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `father_name` varchar(100) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `house_no` varchar(50) DEFAULT NULL,
  `street` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state_name` varchar(100) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `connection_type` varchar(50) DEFAULT NULL,
  `supply_type` varchar(50) DEFAULT NULL,
  `load_requirement` varchar(20) DEFAULT NULL,
  `phases` varchar(20) DEFAULT NULL,
  `meter_type` varchar(50) DEFAULT NULL,
  `document_type` varchar(50) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Pending',
  `submitted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `district_code` int DEFAULT NULL,
  `block_code` int DEFAULT NULL,
  `panchayat_code` int DEFAULT NULL,
  `village_code` int DEFAULT NULL,
  `section_code` int DEFAULT NULL,
  `tariff_code` int DEFAULT NULL,
  `phase_code` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `application_id` (`application_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,NULL,'anjali','Female','akhilesh kumar','8987039379','anjali9934@gmail.com','441','kharanja raod','patna','bihar','801503','Domestic','LT Supply','5','1','Single Phase','','Pending','2026-05-31 15:36:36',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'APP000002','aditi','Female','akhilesh kumar','8210339931','adeeexoxo2005@gmail.com','434','kharanja road','patna','bihar','801503','Domestic','LT Supply','5','1','Single Phase','','Pending','2026-05-31 20:57:19',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'APP000003','aman','Male','akhilesh','9934879929','aman123@gmail.com','467','saguna more danapur ','patna','bihar','801503','Domestic','LT Supply','5','1','Single Phase','','Approved','2026-05-31 21:14:21',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'APP000004','Babli','Female','Akhilesh kumar','8210337912','babli9934@gmail.com','467','mahindaru, sultanganj','patna','bihar','801503','Domestic','LT Supply','5','2','Three Phase','','Pending','2026-05-31 21:34:37',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `block`
--

DROP TABLE IF EXISTS `block`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `block` (
  `block_code` int NOT NULL AUTO_INCREMENT,
  `block_name` varchar(100) NOT NULL,
  `district_code` int DEFAULT NULL,
  `subdivision_code` int DEFAULT NULL,
  PRIMARY KEY (`block_code`),
  KEY `district_code` (`district_code`),
  KEY `fk_block_subdivision` (`subdivision_code`),
  CONSTRAINT `block_ibfk_1` FOREIGN KEY (`district_code`) REFERENCES `district` (`district_code`),
  CONSTRAINT `fk_block_subdivision` FOREIGN KEY (`subdivision_code`) REFERENCES `subdivision` (`subdivision_code`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `block`
--

LOCK TABLES `block` WRITE;
/*!40000 ALTER TABLE `block` DISABLE KEYS */;
INSERT INTO `block` VALUES (1,'Patna Sadar',1,1),(2,'Phulwari Sharif',1,2),(3,'Bodh Gaya',2,3),(4,'Sherghati',2,4),(5,'Musahari',3,5),(6,'Kanti',3,6),(7,'Hilsa',4,7),(8,'Rajgir',4,8),(9,'Jagdishpur',5,9),(10,'Nathnagar',5,10),(11,'Darbhanga Sadar',6,11),(12,'Jale',6,12),(13,'Purnia East',7,13),(14,'Banmankhi',7,14),(15,'Rosera',8,15),(16,'Patori',8,16);
/*!40000 ALTER TABLE `block` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `district`
--

DROP TABLE IF EXISTS `district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `district` (
  `district_code` int NOT NULL AUTO_INCREMENT,
  `district_name` varchar(100) NOT NULL,
  `division_code` int DEFAULT NULL,
  `district_id` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`district_code`),
  UNIQUE KEY `district_id` (`district_id`),
  KEY `fk_district_division` (`division_code`),
  CONSTRAINT `fk_district_division` FOREIGN KEY (`division_code`) REFERENCES `division` (`division_code`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `district`
--

LOCK TABLES `district` WRITE;
/*!40000 ALTER TABLE `district` DISABLE KEYS */;
INSERT INTO `district` VALUES (1,'Patna',1,'101'),(2,'Gaya',2,'102'),(3,'Muzaffarpur',3,'103'),(4,'Nalanda',1,'104'),(5,'Bhagalpur',4,'105'),(6,'Darbhanga',5,'106'),(7,'Purnia',6,'107'),(8,'Samastipur',5,'108');
/*!40000 ALTER TABLE `district` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `division`
--

DROP TABLE IF EXISTS `division`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `division` (
  `division_code` int NOT NULL AUTO_INCREMENT,
  `division_name` varchar(100) NOT NULL,
  PRIMARY KEY (`division_code`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `division`
--

LOCK TABLES `division` WRITE;
/*!40000 ALTER TABLE `division` DISABLE KEYS */;
INSERT INTO `division` VALUES (1,'Patna Division'),(2,'Magadh Division'),(3,'Tirhut Division'),(4,'Bhagalpur Division'),(5,'Darbhanga Division'),(6,'Purnia Division');
/*!40000 ALTER TABLE `division` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location_master`
--

DROP TABLE IF EXISTS `location_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `district` varchar(50) DEFAULT NULL,
  `block` varchar(50) DEFAULT NULL,
  `panchayat` varchar(50) DEFAULT NULL,
  `village` varchar(50) DEFAULT NULL,
  `division` varchar(50) DEFAULT NULL,
  `sub_division` varchar(50) DEFAULT NULL,
  `section` varchar(50) DEFAULT NULL,
  `tariff` varchar(50) DEFAULT NULL,
  `phase` varchar(20) DEFAULT NULL,
  `load_value` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location_master`
--

LOCK TABLES `location_master` WRITE;
/*!40000 ALTER TABLE `location_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `location_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp_verification`
--

DROP TABLE IF EXISTS `otp_verification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `otp_verification` (
  `otp_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `otp_code` varchar(10) NOT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `verified` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`otp_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `otp_verification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp_verification`
--

LOCK TABLES `otp_verification` WRITE;
/*!40000 ALTER TABLE `otp_verification` DISABLE KEYS */;
/*!40000 ALTER TABLE `otp_verification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `panchayat`
--

DROP TABLE IF EXISTS `panchayat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `panchayat` (
  `panchayat_code` int NOT NULL AUTO_INCREMENT,
  `panchayat_name` varchar(100) NOT NULL,
  `block_code` int DEFAULT NULL,
  PRIMARY KEY (`panchayat_code`),
  KEY `block_code` (`block_code`),
  CONSTRAINT `panchayat_ibfk_1` FOREIGN KEY (`block_code`) REFERENCES `block` (`block_code`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `panchayat`
--

LOCK TABLES `panchayat` WRITE;
/*!40000 ALTER TABLE `panchayat` DISABLE KEYS */;
INSERT INTO `panchayat` VALUES (1,'Digha East',1),(2,'Rajapur Panchayat',1),(3,'Kurji Panchayat',2),(4,'Saidpur Panchayat',2),(5,'Manpur Panchayat',3),(6,'Chandauti Panchayat',3),(7,'Sherghati East',4),(8,'Sherghati West',4),(9,'Musahari North',5),(10,'Musahari South',5),(11,'Kanti East',6),(12,'Kanti West',6),(13,'Hilsa Nagar',7),(14,'Hilsa Rural',7),(15,'Rajgir East',8),(16,'Rajgir West',8),(17,'Jagdishpur North',9),(18,'Jagdishpur South',9),(19,'Nathnagar East',10),(20,'Nathnagar West',10),(21,'Sadar East',11),(22,'Sadar West',11),(23,'Jale North',12),(24,'Jale South',12),(25,'Purnia East Panchayat',13),(26,'Banmankhi East',13),(27,'Purnia West Panchayat',14),(28,'Banmankhi West',14),(29,'Rosera East',15),(30,'Rosera West',15),(31,'Patori East',16),(32,'Patori West',16);
/*!40000 ALTER TABLE `panchayat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phase_master`
--

DROP TABLE IF EXISTS `phase_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phase_master` (
  `phase_code` int NOT NULL AUTO_INCREMENT,
  `phase_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`phase_code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phase_master`
--

LOCK TABLES `phase_master` WRITE;
/*!40000 ALTER TABLE `phase_master` DISABLE KEYS */;
INSERT INTO `phase_master` VALUES (1,'Single Phase'),(2,'Three Phase');
/*!40000 ALTER TABLE `phase_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `section` (
  `section_code` int NOT NULL AUTO_INCREMENT,
  `section_name` varchar(100) DEFAULT NULL,
  `subdivision_code` int DEFAULT NULL,
  PRIMARY KEY (`section_code`),
  KEY `subdivision_code` (`subdivision_code`),
  CONSTRAINT `section_ibfk_1` FOREIGN KEY (`subdivision_code`) REFERENCES `subdivision` (`subdivision_code`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
INSERT INTO `section` VALUES (1,'Patna Urban Section',1),(2,'Patna Rural Section',1),(3,'Danapur East Section',2),(4,'Danapur West Section',2),(5,'Gaya Urban Section',3),(6,'Gaya Rural Section',3),(7,'Sherghati Town Section',4),(8,'Sherghati Rural Section',4),(9,'Muzaffarpur Urban Section',5),(10,'Muzaffarpur Rural Section',5),(11,'Kanti Section',6),(12,'Marwan Section',6),(13,'Bihar Sharif Urban Section',7),(14,'Bihar Sharif Rural Section',7),(15,'Rajgir Tourist Section',8),(16,'Rajgir Rural Section',8),(17,'Bhagalpur Urban Section',9),(18,'Bhagalpur Rural Section',9),(19,'Kahalgaon Thermal Section',10),(20,'Kahalgaon Rural Section',10),(21,'Darbhanga Urban Section',11),(22,'Darbhanga Rural Section',11),(23,'Benipur Town Section',12),(24,'Benipur Rural Section',12),(25,'Purnia Urban Section',13),(26,'Purnia Rural Section',13),(27,'Banmankhi Town Section',14),(28,'Banmankhi Rural Section',14),(29,'Samastipur Urban Section',15),(30,'Samastipur Rural Section',15),(31,'Rosera Town Section',16),(32,'Rosera Rural Section',16);
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subdivision`
--

DROP TABLE IF EXISTS `subdivision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subdivision` (
  `subdivision_code` int NOT NULL AUTO_INCREMENT,
  `subdivision_name` varchar(100) NOT NULL,
  `district_code` int NOT NULL,
  PRIMARY KEY (`subdivision_code`),
  KEY `district_code` (`district_code`),
  CONSTRAINT `subdivision_ibfk_1` FOREIGN KEY (`district_code`) REFERENCES `district` (`district_code`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subdivision`
--

LOCK TABLES `subdivision` WRITE;
/*!40000 ALTER TABLE `subdivision` DISABLE KEYS */;
INSERT INTO `subdivision` VALUES (1,'Patna Sadar',1),(2,'Danapur',1),(3,'Gaya Sadar',2),(4,'Sherghati',2),(5,'Muzaffarpur Sadar',3),(6,'West Muzaffarpur',3),(7,'Bihar Sharif',4),(8,'Rajgir',4),(9,'Bhagalpur Sadar',5),(10,'Kahalgaon',5),(11,'Darbhanga Sadar',6),(12,'Benipur',6),(13,'Purnia Sadar',7),(14,'Banmankhi',7),(15,'Samastipur Sadar',8),(16,'Rosera',8);
/*!40000 ALTER TABLE `subdivision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tariff`
--

DROP TABLE IF EXISTS `tariff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tariff` (
  `tariff_code` int NOT NULL AUTO_INCREMENT,
  `tariff_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`tariff_code`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tariff`
--

LOCK TABLES `tariff` WRITE;
/*!40000 ALTER TABLE `tariff` DISABLE KEYS */;
INSERT INTO `tariff` VALUES (1,'Domestic'),(2,'Commercial'),(3,'Industrial'),(4,'Agricultural'),(5,'Temporary Connection'),(6,'Street Light'),(7,'Government Supply');
/*!40000 ALTER TABLE `tariff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `permanent_house_no` varchar(50) DEFAULT NULL,
  `permanent_street` varchar(100) DEFAULT NULL,
  `permanent_address_line` varchar(255) DEFAULT NULL,
  `permanent_city` varchar(100) DEFAULT NULL,
  `permanent_state` varchar(100) DEFAULT NULL,
  `permanent_pincode` varchar(10) DEFAULT NULL,
  `correspondence_house_no` varchar(50) DEFAULT NULL,
  `correspondence_street` varchar(100) DEFAULT NULL,
  `correspondence_address_line` varchar(255) DEFAULT NULL,
  `correspondence_city` varchar(100) DEFAULT NULL,
  `correspondence_state` varchar(100) DEFAULT NULL,
  `correspondence_pincode` varchar(10) DEFAULT NULL,
  `role` varchar(20) DEFAULT 'consumer',
  `is_verified` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Aditi','9876543210','aditi@gmail.com','22A','MG Road','Near Park','Patna','Bihar','800001','22A','MG Road','Near Park','Patna','Bihar','800001','consumer',0,'2026-05-26 06:47:45');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `village`
--

DROP TABLE IF EXISTS `village`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `village` (
  `village_code` int NOT NULL AUTO_INCREMENT,
  `village_name` varchar(100) NOT NULL,
  `panchayat_code` int DEFAULT NULL,
  PRIMARY KEY (`village_code`),
  KEY `panchayat_code` (`panchayat_code`),
  CONSTRAINT `village_ibfk_1` FOREIGN KEY (`panchayat_code`) REFERENCES `panchayat` (`panchayat_code`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `village`
--

LOCK TABLES `village` WRITE;
/*!40000 ALTER TABLE `village` DISABLE KEYS */;
INSERT INTO `village` VALUES (1,'Digha Village A',1),(2,'Digha Village B',1),(3,'Rajapur Village A',2),(4,'Rajapur Village B',2),(5,'Kurji Village A',3),(6,'Kurji Village B',3),(7,'Saidpur Village A',4),(8,'Saidpur Village B',4),(9,'Manpur Village A',5),(10,'Manpur Village B',5),(11,'Chandauti Village A',6),(12,'Chandauti Village B',6),(13,'Sherghati Village A',7),(14,'Sherghati Village B',7),(15,'Sherghati West Village A',8),(16,'Sherghati West Village B',8),(17,'Musahari Village A',9),(18,'Musahari Village B',9),(19,'Musahari South Village A',10),(20,'Musahari South Village B',10),(21,'Kanti Village A',11),(22,'Kanti Village B',11),(23,'Kanti West Village A',12),(24,'Kanti West Village B',12),(25,'Hilsa Village A',13),(26,'Hilsa Village B',13),(27,'Hilsa Rural Village A',14),(28,'Hilsa Rural Village B',14),(29,'Rajgir East Village A',15),(30,'Rajgir East Village B',15),(31,'Rajgir West Village A',16),(32,'Rajgir West Village B',16),(33,'Jagdishpur North Village A',17),(34,'Jagdishpur North Village B',17),(35,'Jagdishpur South Village A',18),(36,'Jagdishpur South Village B',18),(37,'Nathnagar East Village A',19),(38,'Nathnagar East Village B',19),(39,'Nathnagar West Village A',20),(40,'Nathnagar West Village B',20),(41,'Sadar East Village A',21),(42,'Sadar East Village B',21),(43,'Sadar West Village A',22),(44,'Sadar West Village B',22),(45,'Jale North Village A',23),(46,'Jale North Village B',23),(47,'Jale South Village A',24),(48,'Jale South Village B',24),(49,'Purnia East Village A',25),(50,'Purnia East Village B',25),(51,'Banmankhi East Village A',26),(52,'Banmankhi East Village B',26),(53,'Purnia West Village A',27),(54,'Purnia West Village B',27),(55,'Banmankhi West Village A',28),(56,'Banmankhi West Village B',28),(57,'Rosera East Village A',29),(58,'Rosera East Village B',29),(59,'Rosera West Village A',30),(60,'Rosera West Village B',30),(61,'Patori East Village A',31),(62,'Patori East Village B',31),(63,'Patori West Village A',32),(64,'Patori West Village B',32);
/*!40000 ALTER TABLE `village` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `village_mapping`
--

DROP TABLE IF EXISTS `village_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `village_mapping` (
  `mapping_id` int NOT NULL AUTO_INCREMENT,
  `village_code` int DEFAULT NULL,
  `section_code` int DEFAULT NULL,
  `tariff_code` int DEFAULT NULL,
  `phase_code` int DEFAULT NULL,
  `default_load` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`mapping_id`),
  KEY `village_code` (`village_code`),
  KEY `section_code` (`section_code`),
  KEY `tariff_code` (`tariff_code`),
  KEY `phase_code` (`phase_code`),
  CONSTRAINT `village_mapping_ibfk_1` FOREIGN KEY (`village_code`) REFERENCES `village` (`village_code`),
  CONSTRAINT `village_mapping_ibfk_2` FOREIGN KEY (`section_code`) REFERENCES `section` (`section_code`),
  CONSTRAINT `village_mapping_ibfk_3` FOREIGN KEY (`tariff_code`) REFERENCES `tariff` (`tariff_code`),
  CONSTRAINT `village_mapping_ibfk_4` FOREIGN KEY (`phase_code`) REFERENCES `phase_master` (`phase_code`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `village_mapping`
--

LOCK TABLES `village_mapping` WRITE;
/*!40000 ALTER TABLE `village_mapping` DISABLE KEYS */;
INSERT INTO `village_mapping` VALUES (1,1,1,1,1,2.00),(2,2,1,1,1,2.00),(3,3,1,1,1,2.00),(4,4,1,1,1,2.00),(5,5,2,1,1,3.00),(6,6,2,1,1,3.00),(7,7,2,1,1,3.00),(8,8,2,1,1,3.00),(9,9,5,1,1,2.00),(10,10,5,1,1,2.00),(11,11,5,2,2,5.00),(12,12,5,2,2,5.00),(13,13,7,1,1,2.00),(14,14,7,1,1,2.00),(15,15,8,1,1,2.00),(16,16,8,1,1,2.00),(17,17,9,1,1,3.00),(18,18,9,1,1,3.00),(19,19,10,2,2,5.00),(20,20,10,2,2,5.00),(21,21,1,1,1,2.00),(22,22,1,1,1,2.00),(23,23,1,1,1,2.00),(24,24,1,1,1,2.00),(25,25,1,1,1,2.00),(26,26,1,1,1,2.00),(27,27,1,1,1,2.00),(28,28,1,1,1,2.00),(29,29,1,1,1,2.00),(30,30,1,1,1,2.00),(31,31,1,1,1,2.00),(32,32,1,1,1,2.00),(33,33,1,1,1,2.00),(34,34,1,1,1,2.00),(35,35,1,1,1,2.00),(36,36,1,1,1,2.00),(37,37,1,1,1,2.00),(38,38,1,1,1,2.00),(39,39,1,1,1,2.00),(40,40,1,1,1,2.00),(41,41,1,1,1,2.00),(42,42,1,1,1,2.00),(43,43,1,1,1,2.00),(44,44,1,1,1,2.00),(45,45,1,1,1,2.00),(46,46,1,1,1,2.00),(47,47,1,1,1,2.00),(48,48,1,1,1,2.00),(49,49,1,1,1,2.00),(50,50,1,1,1,2.00),(51,51,1,1,1,2.00),(52,52,1,1,1,2.00),(53,53,1,1,1,2.00),(54,54,1,1,1,2.00),(55,55,1,1,1,2.00),(56,56,1,1,1,2.00),(57,57,1,1,1,2.00),(58,58,1,1,1,2.00),(59,59,1,1,1,2.00),(60,60,1,1,1,2.00),(61,61,1,1,1,2.00),(62,62,1,1,1,2.00),(63,63,1,1,1,2.00),(64,64,1,1,1,2.00);
/*!40000 ALTER TABLE `village_mapping` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-04 20:08:05
