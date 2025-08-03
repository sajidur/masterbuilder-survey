-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: mukut_feature_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `mukut_feature_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `mukut_feature_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `mukut_feature_db`;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `id` varchar(36) NOT NULL,
  `text` text DEFAULT NULL,
  `selectedOptionIds` text DEFAULT NULL,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `questionId` varchar(36) DEFAULT NULL,
  `questionModelId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c38697a57844f52584abdb878d7` (`questionId`),
  KEY `FK_f13ef27eef1c75e46e876bafff1` (`questionModelId`),
  CONSTRAINT `FK_c38697a57844f52584abdb878d7` FOREIGN KEY (`questionId`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_f13ef27eef1c75e46e876bafff1` FOREIGN KEY (`questionModelId`) REFERENCES `question-models` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app`
--

DROP TABLE IF EXISTS `app`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `tier` varchar(255) NOT NULL,
  `serialNumber` varchar(255) NOT NULL,
  `moduleId` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_90a5338d9592425e6faf5294a1a` (`moduleId`),
  CONSTRAINT `FK_90a5338d9592425e6faf5294a1a` FOREIGN KEY (`moduleId`) REFERENCES `modules` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app`
--

LOCK TABLES `app` WRITE;
/*!40000 ALTER TABLE `app` DISABLE KEYS */;
INSERT INTO `app` VALUES ('0e87a206-39fe-4035-a3e3-0c8bf6f12512','Consolidation','','9','37e9a5fe-badd-40c4-afb9-e367ad57d6bf','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-20 15:02:08.040000','2025-07-20 15:02:08.040000','admin','admin'),('15b816f2-ab33-4c5e-93a1-1ec28e3441c7','Foreign Trade','3,4','8','37e9a5fe-badd-40c4-afb9-e367ad57d6bf','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-10 16:15:47.562000','2025-07-15 17:49:37.687000','admin','admin'),('1904f60d-57b3-439c-a6fa-ac497ea8ed9c','Payroll','3, 4, 5','2','0210eb0d-6a4b-4512-a6b0-06649d0bdb12','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-10 15:01:16.134000','2025-07-10 15:01:16.134000','admin','admin'),('3b584198-b820-465e-a4f9-f2834589ca8d','Tax Accounting','3, 4, 5','3','37e9a5fe-badd-40c4-afb9-e367ad57d6bf','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-08 17:43:39.411000','2025-07-08 18:38:20.634000','admin','admin'),('45509fe8-d5e9-469c-90fc-41e6617dbdc7','Employees','3, 4, 5','1','0210eb0d-6a4b-4512-a6b0-06649d0bdb12','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-10 15:01:04.015000','2025-07-10 15:37:17.004000','admin','admin'),('4a646046-f3b9-4357-8fb0-dff235790bc5','Project Accounting','3, 4, 5','5','37e9a5fe-badd-40c4-afb9-e367ad57d6bf','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-08 18:39:06.306000','2025-07-08 18:39:06.306000','admin','admin'),('5a6eb74e-c9ee-413d-9a0f-2365fd348307','Purchase','3, 4, 5','1','95c9a50b-953b-4738-b609-275911fcdfb0','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-10 14:58:22.217000','2025-07-10 14:59:03.962000','admin','admin'),('62972fd5-d2ef-411d-8fa3-330e32e3ed26','Fixed Asset','3, 4, 5','2','37e9a5fe-badd-40c4-afb9-e367ad57d6bf','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-08 17:38:46.109000','2025-07-08 18:38:12.550000','admin','admin'),('66befc8a-36f6-434b-add0-3a2625295caa','Cost Accounting','3, 4, 5','4','37e9a5fe-badd-40c4-afb9-e367ad57d6bf','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-08 18:38:46.760000','2025-07-08 18:38:46.760000','admin','admin'),('8b1dbb89-4f9a-41e6-9231-66cc375aeae0','Accounting','3, 4, 5','1','37e9a5fe-badd-40c4-afb9-e367ad57d6bf','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-06 16:57:43.253000','2025-07-08 18:38:03.006000','admin','admin'),('a1f83a6b-8e4b-4ce9-8d02-ee559e457ea7','Financial Management','3,4','6','37e9a5fe-badd-40c4-afb9-e367ad57d6bf','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-08 18:39:34.086000','2025-07-08 18:39:34.086000','admin','admin'),('a2e440bd-4969-4df3-a9f9-9286ff1bbca4','Share Management','3,4','7','37e9a5fe-badd-40c4-afb9-e367ad57d6bf','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-10 15:42:36.881000','2025-07-15 17:29:57.477000','admin','admin'),('bce257e3-d95c-4d05-bd76-6beddbf0447b','Home','','2','e3c28cc8-7e92-4052-9c70-76418fcc38dc','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-21 12:10:43.121000','2025-07-21 12:10:43.121000','admin','admin'),('cdd8d06f-2acc-4c81-a77a-efa305e7dca9','Sales','3, 4, 5','1','56726da6-a4cf-4d7a-9742-9533c14b4289','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-10 15:00:24.574000','2025-07-10 15:00:24.574000','admin','admin'),('da45bd74-60c5-4f47-b22c-8255edf6f03c','App-Test','','1','bd598bf2-c3f6-4501-be57-66ef7641f11b','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-21 12:32:57.471000','2025-07-21 12:32:57.471000','admin','admin'),('de8c4c44-facd-4ecb-91c9-81bb8580a2a2','Inventory','3, 4, 5','2','95c9a50b-953b-4738-b609-275911fcdfb0','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-10 14:58:40.339000','2025-07-10 14:59:18.354000','admin','admin'),('e21482e7-b464-41bf-bedc-76827af91a7e','Settings','','1','e3c28cc8-7e92-4052-9c70-76418fcc38dc','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-21 12:09:55.966000','2025-07-21 12:09:55.966000','admin','admin');
/*!40000 ALTER TABLE `app` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `button`
--

DROP TABLE IF EXISTS `button`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `button` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `serialNumber` varchar(255) NOT NULL,
  `buttonAction` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `button`
--

LOCK TABLES `button` WRITE;
/*!40000 ALTER TABLE `button` DISABLE KEYS */;
INSERT INTO `button` VALUES ('f83f9943-a9bb-45cd-9c37-e2249006d860','Test-Button-01','1','Test-Action','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-30 17:49:49.683000','2025-07-30 17:49:49.683000','admin','admin');
/*!40000 ALTER TABLE `button` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datapoint`
--

DROP TABLE IF EXISTS `datapoint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datapoint` (
  `id` varchar(36) NOT NULL,
  `itemId` varchar(255) NOT NULL,
  `dpGroupCode` varchar(255) NOT NULL,
  `dataPoint` varchar(255) NOT NULL,
  `serialNumber` varchar(255) NOT NULL,
  `dataType` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `isHide` tinyint(4) NOT NULL DEFAULT 0,
  `isRequired` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `regional` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datapoint`
--

LOCK TABLES `datapoint` WRITE;
/*!40000 ALTER TABLE `datapoint` DISABLE KEYS */;
INSERT INTO `datapoint` VALUES ('22172170-8250-4d93-bb0f-12b35f4114b4','996f270f-5858-4553-9470-3dddadedc890','0','Branch','6','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-30 18:04:29.000000','2025-07-30 18:04:50.000000','admin','admin','All'),('7ac374d7-9e59-4661-a475-9f16a6b0608a','996f270f-5858-4553-9470-3dddadedc890','0','Company Code','3','number','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-07-28 15:21:33.000000','2025-07-30 17:58:25.000000','admin','admin','All'),('7ee946a8-0e76-4230-8f37-4993eecd8f9e','996f270f-5858-4553-9470-3dddadedc890','0','Company Name','2','text','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-07-28 14:14:05.000000','2025-07-28 14:14:05.000000','admin','admin','All'),('86bb3f3f-1020-46e4-8d1e-0252c614f75c','996f270f-5858-4553-9470-3dddadedc890','0','Company Type','4','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-07-30 17:58:44.000000','2025-07-30 18:03:37.000000','admin','admin','All'),('b9f9aa91-6ab5-4f27-a6da-7554763f164b','996f270f-5858-4553-9470-3dddadedc890','0','Department','7','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-30 18:05:10.000000','2025-07-30 18:06:42.000000','admin','admin','All'),('e6d866bf-3709-434f-b641-ceba3cbac2fd','996f270f-5858-4553-9470-3dddadedc890','0','Location','5','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-30 18:03:59.000000','2025-07-30 18:03:59.000000','admin','admin','All'),('f89165ef-dc03-4c6a-872a-8eb257e8aae1','996f270f-5858-4553-9470-3dddadedc890','0','Organogram','8','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-30 18:06:49.000000','2025-07-30 18:06:49.000000','admin','admin','All'),('f898c4de-df5e-4e9d-8004-b4781e3d2887','996f270f-5858-4553-9470-3dddadedc890','0','Company Logo','1','text','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-07-28 14:11:06.000000','2025-07-30 20:07:08.000000','admin','admin','All');
/*!40000 ALTER TABLE `datapoint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datapointmap`
--

DROP TABLE IF EXISTS `datapointmap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datapointmap` (
  `id` varchar(36) NOT NULL,
  `itemId` varchar(255) NOT NULL,
  `dpGroupId` varchar(255) NOT NULL,
  `dataPointId` varchar(255) NOT NULL,
  `serialNumber` varchar(255) DEFAULT NULL,
  `dataType` varchar(255) DEFAULT NULL,
  `userId` varchar(255) NOT NULL,
  `isHide` tinyint(4) NOT NULL DEFAULT 0,
  `isRequired` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datapointmap`
--

LOCK TABLES `datapointmap` WRITE;
/*!40000 ALTER TABLE `datapointmap` DISABLE KEYS */;
INSERT INTO `datapointmap` VALUES ('22fe2b40-51df-499d-b007-8c027aab5971','996f270f-5858-4553-9470-3dddadedc890','ca11b6ca-e628-4f57-8bb2-8582772a7a90','30238a17-27fc-4a59-b537-7d09af417ea5','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-24 18:03:38.000000','2025-07-24 18:03:48.000000','admin','admin'),('56166cc4-08d0-4e5a-b5f0-1c9c25887a91','996f270f-5858-4553-9470-3dddadedc890','a6e8a917-4d27-4f0b-8268-c477b768845b','7ac374d7-9e59-4661-a475-9f16a6b0608a',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-30 18:09:28.000000','2025-07-30 18:09:28.000000','admin','admin'),('87295714-c91f-4e4e-bc8c-313bb091d409','996f270f-5858-4553-9470-3dddadedc890','a6e8a917-4d27-4f0b-8268-c477b768845b','7ee946a8-0e76-4230-8f37-4993eecd8f9e',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-30 18:09:17.000000','2025-07-30 18:09:17.000000','admin','admin'),('98a8eced-9a49-4c71-8b83-4445e1608621','996f270f-5858-4553-9470-3dddadedc890','a6e8a917-4d27-4f0b-8268-c477b768845b','f898c4de-df5e-4e9d-8004-b4781e3d2887','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-30 18:09:06.000000','2025-07-30 20:01:43.000000','admin','admin');
/*!40000 ALTER TABLE `datapointmap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designdefinitions`
--

DROP TABLE IF EXISTS `designdefinitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designdefinitions` (
  `id` varchar(36) NOT NULL,
  `contentTypeId` varchar(255) NOT NULL,
  `contentTypeName` varchar(255) NOT NULL,
  `fileType` varchar(255) NOT NULL,
  `type` enum('CLASS','ACTION','ACTIVITY_DIAGRAM','CLASS_DIAGRAM') NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`content`)),
  `imageUrl` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designdefinitions`
--

LOCK TABLES `designdefinitions` WRITE;
/*!40000 ALTER TABLE `designdefinitions` DISABLE KEYS */;
/*!40000 ALTER TABLE `designdefinitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dpgroupmap`
--

DROP TABLE IF EXISTS `dpgroupmap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dpgroupmap` (
  `id` varchar(36) NOT NULL,
  `itemId` varchar(255) NOT NULL,
  `subItemId` varchar(255) DEFAULT NULL,
  `subSubItemId` varchar(255) DEFAULT NULL,
  `subSubSubItemId` varchar(255) DEFAULT NULL,
  `dpGroupId` varchar(255) NOT NULL,
  `serialNumber` varchar(255) DEFAULT NULL,
  `displayType` varchar(255) DEFAULT NULL,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dpgroupmap`
--

LOCK TABLES `dpgroupmap` WRITE;
/*!40000 ALTER TABLE `dpgroupmap` DISABLE KEYS */;
INSERT INTO `dpgroupmap` VALUES ('aa583075-8340-4d0a-8d09-28246a4a7073','996f270f-5858-4553-9470-3dddadedc890','d1b6d2a6-9046-4f6e-afd1-207baa7ae478','43ee46e2-9b31-4cb4-8da9-5fe7be35831c','fce39872-38ce-477a-bc11-169de5b4d7fd','ca11b6ca-e628-4f57-8bb2-8582772a7a90',NULL,'','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-24 18:32:49.000000','2025-07-24 18:32:49.000000','admin','admin'),('ca9d3baf-b2d1-4b07-900b-c20e8d79fcae','5b4d27ea-bcc5-4e60-bf6d-d09abc86ff00',NULL,NULL,NULL,'Item-test/',NULL,'','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-30 17:47:10.000000','2025-07-30 17:47:10.000000','admin','admin'),('cde04149-94ce-4344-84a9-f71a417def8e','996f270f-5858-4553-9470-3dddadedc890','d1b6d2a6-9046-4f6e-afd1-207baa7ae478','43ee46e2-9b31-4cb4-8da9-5fe7be35831c','fce39872-38ce-477a-bc11-169de5b4d7fd','ca11b6ca-e628-4f57-8bb2-8582772a7a90',NULL,'','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-24 18:04:06.000000','2025-07-24 18:04:18.000000','admin','admin');
/*!40000 ALTER TABLE `dpgroupmap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feature`
--

DROP TABLE IF EXISTS `feature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feature` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `remarks` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feature`
--

LOCK TABLES `feature` WRITE;
/*!40000 ALTER TABLE `feature` DISABLE KEYS */;
/*!40000 ALTER TABLE `feature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `field`
--

DROP TABLE IF EXISTS `field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `field` (
  `id` varchar(36) NOT NULL,
  `serialNumber` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `fieldGroupCode` varchar(255) NOT NULL,
  `tier` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `subItemId` varchar(255) DEFAULT NULL,
  `subSubItemId` varchar(255) DEFAULT NULL,
  `subSubSubItemId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `displayType` varchar(255) NOT NULL,
  `dataType` varchar(255) DEFAULT NULL,
  `isRequired` tinyint(4) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `itemId` varchar(2555) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6ef898729970148a88342f1d29f` (`subSubSubItemId`),
  CONSTRAINT `FK_6ef898729970148a88342f1d29f` FOREIGN KEY (`subSubSubItemId`) REFERENCES `sub_sub_sub_item` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field`
--

LOCK TABLES `field` WRITE;
/*!40000 ALTER TABLE `field` DISABLE KEYS */;
INSERT INTO `field` VALUES ('0ff1096c-c3dd-4302-88b2-bc76eb814247','2','','Item-test-2','C','',NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-26 17:49:32.327000','2025-07-27 18:26:47.422000','admin','admin','Tree','',0,'test','5b4d27ea-bcc5-4e60-bf6d-d09abc86ff00'),('a6e8a917-4d27-4f0b-8268-c477b768845b','1',NULL,'Organizational Setup/1','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-30 18:08:33.801000','2025-07-30 18:08:33.801000','admin','admin','List',NULL,NULL,'Basic Info','996f270f-5858-4553-9470-3dddadedc890'),('ca11b6ca-e628-4f57-8bb2-8582772a7a90','1','','Item-test-1','C','',NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-13 17:55:08.845000','2025-07-27 18:26:55.005000','admin','admin','tree','',0,'test','5b4d27ea-bcc5-4e60-bf6d-d09abc86ff00');
/*!40000 ALTER TABLE `field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `menuId` varchar(255) NOT NULL,
  `serialNumber` varchar(255) NOT NULL,
  `buttonType` varchar(255) NOT NULL,
  `buttonLabel` varchar(255) NOT NULL,
  `navigationTo` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `itemType` varchar(36) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c737f46f32e0a98e23bda86a8fc` (`menuId`),
  CONSTRAINT `FK_c737f46f32e0a98e23bda86a8fc` FOREIGN KEY (`menuId`) REFERENCES `menu` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES ('083f14b0-7665-4b83-b6d3-aee50eb80792','Advance Request','ea425177-675a-4dc2-83e6-293dfcc3c108','1','','','','List of Advance Money Requests','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-13 20:18:20.518000','2025-07-21 14:53:56.077000','admin','admin'),('08419323-d4cf-466c-afd7-7a90dd0350ac','Add Purchase Return','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','10','','','','New Purchase Return','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:13:35.491000','2025-07-30 19:57:31.892102','admin','admin'),('08a5c769-b71a-420b-8145-fd969559c338','Letter of Credit','809dace8-03d1-4ee9-917a-bf1ddabe359f','1','','','','List of All L/C','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-13 11:37:34.299000','2025-07-30 19:57:31.892102','admin','admin'),('0908fb1e-d06a-4833-b6df-92fcd5a5a886','Add New','cd3eccd2-48b5-4376-bd78-8d9473709a19','6','','','','New Invoice/List/Bill','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-21 15:10:13.797000','2025-07-21 15:10:13.797000','admin','admin'),('097cfdf2-f415-4a83-9d22-07a11740354e','Reconciliation','e9f43875-7e77-4ad1-98fc-6df5fb99e0c2','05','','','','List of Recon. Rules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:39:34.648000','2025-07-30 19:57:31.892102','admin','admin'),('0b142982-10a4-4134-9f40-cc2ba56c1939','Expense Claim','ea425177-675a-4dc2-83e6-293dfcc3c108','2','','','','List of Claimed Expenses','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-13 20:18:57.550000','2025-07-21 14:54:02.109000','admin','admin'),('0c6c8355-bc79-4a73-83fa-38512e97c2a6','Add Cost Centre','64547663-9950-4e9e-882c-69992a57e7cb','03','','','','New Cost Centre','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:52:12.171000','2025-07-30 19:57:31.892102','admin','admin'),('0e32390d-cd3c-41fd-b986-c4b61be588e5','Disposal','e129b8dc-9600-49dd-8bef-ec50db77d9da','06','','','','Disposal Schedule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:48:54.077000','2025-07-30 19:57:31.892102','admin','admin'),('12a57c4a-5a44-4668-89e6-960fbbe5525a','Add Project','96a5286c-1404-48a5-8108-1fd34c21ab73','02','','','','New Project','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:55:58.070000','2025-07-30 19:57:31.892102','admin','admin'),('14e384db-1135-4d49-abc7-6245958090a5','Recurring Bill / Expense','a984fb09-8a37-43fe-9076-bc11d451dbe5','04','','','','List of 	Recurring Bills','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:33:23.131000','2025-07-30 19:57:31.892102','admin','admin'),('153729ec-cff9-40b2-97a9-d510b173e5e7','Add Con. Account','05f960bc-2aef-4f1a-8a9b-a713c6143bf3','5','','','','New Consolidated Account','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-08 20:44:32.074000','2025-07-30 19:57:31.892102','admin','admin'),('16207e60-f981-415a-a683-908229be87b2','Add Bill','a984fb09-8a37-43fe-9076-bc11d451dbe5','06','','','','New Bill','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:35:46.555000','2025-07-30 19:57:31.892102','admin','admin'),('1912e526-4d84-4e94-a397-4a617e3c4bed','Add Auditor','cf3250ea-e67c-45a7-8020-efdef79fc3d6','06','','','','New Auditor','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-24 18:43:40.902000','2025-07-30 19:57:31.892102','admin','admin'),('191bdb96-2f59-4dd2-ae9a-5e8aa2075fb6','Add Sales Receipt','1405b8aa-4e49-4cc9-bd26-764f87dd055e','08','','','','New Sales Receipt','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-09 17:50:33.045000','2025-07-30 19:57:31.892102','admin','admin'),('1af33e5d-6423-4ec5-b271-28843ad83654','Add Asset','e129b8dc-9600-49dd-8bef-ec50db77d9da','07','','','','New Asset','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:49:16.512000','2025-07-30 19:57:31.892102','admin','admin'),('1bba20c3-3c01-4961-8018-71cf8cb6cc1a','Financial Modelling','e7346c4c-b50b-47c5-95a7-1cc3f3062fa2','04','','','','FM Schedules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 12:00:30.799000','2025-07-30 19:57:31.892102','admin','admin'),('1c02efec-cc33-4a24-a76f-07ac6b21e208','Vendor Credit','a984fb09-8a37-43fe-9076-bc11d451dbe5','05','','','','List of Vendor Credits','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:35:26.393000','2025-07-30 19:57:31.892102','admin','admin'),('221c4e58-dff7-4368-8412-dee82d9581b6','Add Customer','0edc1b72-e5e9-4658-a456-06906c9aa80d','02','','','','New Customer','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:25:22.989000','2025-07-30 19:57:31.892102','admin','admin'),('2754af0e-1136-4f06-8ad8-76b47d31905b','Sales Order','0edc1b72-e5e9-4658-a456-06906c9aa80d','05','','','','List of Sales Orders','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:28:43.013000','2025-07-30 19:57:31.892102','admin','admin'),('2c2978cc-e969-4362-89d6-336b67f3cc35','Utilization Tracking','809dace8-03d1-4ee9-917a-bf1ddabe359f','3','','','','Utilization Schedule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-15 12:25:26.539000','2025-07-30 19:57:31.892102','admin','admin'),('2d29cfef-3655-45d3-b312-6e8f96830807','Reconsiliation Rule','05f960bc-2aef-4f1a-8a9b-a713c6143bf3','4','','','','List of Rules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-08 20:46:20.508000','2025-07-30 19:57:31.892102','admin','admin'),('36f3da69-2369-4401-b856-f12f4fbf3c99','Purchase Return','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','09','','','','List of Purchase Return','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:13:01.846000','2025-07-30 19:57:31.892102','admin','admin'),('395d1a1b-7b43-4251-901a-c99f4ab86a25','Add Loan','ddac32d5-ce66-4f08-8d1d-806f08e0171f','05','','','','New Loan','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-21 14:47:43.252000','2025-07-21 14:48:36.828000','admin','admin'),('3bc79640-ba6d-435e-b287-7605c20290b5','Expiry Alerts','809dace8-03d1-4ee9-917a-bf1ddabe359f','4','','','','Rules for Expiry Alert','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-15 12:28:06.967000','2025-07-30 19:57:31.892102','admin','admin'),('3bd78023-3993-4b20-9d1b-079668b9c885','Repayment Schedule','ddac32d5-ce66-4f08-8d1d-806f08e0171f','03','','','','Schedule of Repayment','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-21 14:46:32.753000','2025-07-21 14:48:26.226000','admin','admin'),('3ca59eec-4633-4dfe-97ec-16a940f87717','Add Purchase Order','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','06','','','','New Purchase Order','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:11:34.443000','2025-07-30 19:57:31.892102','admin','admin'),('3ce909de-a200-4674-83bd-eec54877b420','GRN','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','07','','','','List of Receive Notes','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:12:00.842000','2025-07-30 19:57:31.892102','admin','admin'),('3e9187a1-ac71-403d-8870-762ffd51cddd','Purchase Order','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','05','','','','List of Purchase Orders','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:11:09.464000','2025-07-30 19:57:31.892102','admin','admin'),('4067bdff-f934-4b53-bb74-fc2a7157f6ec','Add GRN','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','08','','','','New Receive Note','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:12:29.555000','2025-07-30 19:57:31.892102','admin','admin'),('416f2dc6-ef21-4523-8aa6-41090e2c7b33','Add Quotation','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','04','','','','New Quotation','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:10:49.126000','2025-07-30 19:57:31.892102','admin','admin'),('44e2850c-ce34-4049-a8a4-c374e2783363','Add Revenue Centre','64547663-9950-4e9e-882c-69992a57e7cb','04','','','','New Revenue Centre','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:52:32.936000','2025-07-30 19:57:31.892102','admin','admin'),('485e64be-11ec-45ea-81cf-fafc515838ff','Credit Note','1405b8aa-4e49-4cc9-bd26-764f87dd055e','05','','','','List of Credit Notes','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-09 17:49:08.419000','2025-07-30 19:57:31.892102','admin','admin'),('4956bb0a-9d2d-4cf7-ba92-c958f1407270','Amendments','809dace8-03d1-4ee9-917a-bf1ddabe359f','2','','','','List of Amendments','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-15 12:19:37.749000','2025-07-15 12:19:37.749000','admin','admin'),('4bf7d8d0-8692-4757-aab3-4553d893cfcc','Bill of Lading','cd3eccd2-48b5-4376-bd78-8d9473709a19','3','','','','List of Bill of Lading','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-15 12:29:16.621000','2025-07-30 19:57:31.892102','admin','admin'),('4f848800-2ea9-4b9b-a01e-cc04a040cd2c','Shipping Bill','cd3eccd2-48b5-4376-bd78-8d9473709a19','5','','','','List of Shipping Bill','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-15 12:29:57.252000','2025-07-30 19:57:31.892102','admin','admin'),('518db015-bf58-4da2-a019-439156e69ba4','Consolidations','05f960bc-2aef-4f1a-8a9b-a713c6143bf3','2','','','','List of Consolidated Statements','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-08 20:12:56.619000','2025-07-30 19:57:31.892102','admin','admin'),('56c43a0c-2937-462f-bbb3-6eca51b6972a','Time & Expense Tracking','96a5286c-1404-48a5-8108-1fd34c21ab73','04','','','','Tracking Schedules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:56:48.972000','2025-07-30 19:57:31.892102','admin','admin'),('5b4d27ea-bcc5-4e60-bf6d-d09abc86ff00','Item-test','dc337edf-8acd-45db-b01a-7e4293a2f029','1','','','','test','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-21 12:33:38.627000','2025-07-30 19:57:31.892102','admin','admin'),('5cb5187b-a92e-4540-930d-3be3ca46668a','Chart of Accounts','cf3250ea-e67c-45a7-8020-efdef79fc3d6','01','','','','My test List of All Accounts','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-08 19:43:24.717000','2025-07-30 19:57:31.892102','admin','admin'),('5f288d86-19e8-4b2c-91d2-558937a83d5c','Asset Acquisition','e129b8dc-9600-49dd-8bef-ec50db77d9da','01','','','','List of all Assets','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:46:37.471000','2025-07-30 19:57:31.892102','admin','admin'),('5f36d5df-bee8-46a7-aa32-664690863a2f','Performance Mgt','e7346c4c-b50b-47c5-95a7-1cc3f3062fa2','05','','','','Rules for Performance','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 12:00:50.370000','2025-07-30 19:57:31.892102','admin','admin'),('61ddbc58-8b74-4b7a-8d55-06b9b629250c','Add Account','cf3250ea-e67c-45a7-8020-efdef79fc3d6','04','','','','New Account','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-08 20:43:12.583000','2025-07-30 19:57:31.892102','admin','admin'),('62fc7d12-e403-4327-a192-6faa3e3b0f89','Inter-company Recon','05f960bc-2aef-4f1a-8a9b-a713c6143bf3','3','','','','Inter-company Transactions','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-08 20:44:51.994000','2025-07-30 19:57:31.892102','admin','admin'),('64922f71-cf1c-4d08-a455-d99603000874','Market Analysis','052eee4e-3e8a-4b3a-b8ef-ff7036436cc1','05','','','','Analysis Rules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-13 11:37:02.903000','2025-07-30 19:57:31.892102','admin','admin'),('65340de7-9587-40a5-9f43-8ad75697a19e','Share Management','052eee4e-3e8a-4b3a-b8ef-ff7036436cc1','02','','','','Schedule for Share','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-13 11:35:26.639000','2025-07-30 19:57:31.892102','admin','admin'),('6765811a-9b92-4319-81f7-51799651a942','Attendance','3fbe0e76-b801-4912-8040-cedaf367a2af','3','','','','Attendance Schedule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-13 11:43:04.542000','2025-07-30 19:57:31.892102','admin','admin'),('68a56585-1403-4f57-ba8b-a1f83b68eb71','Sales Receipt','1405b8aa-4e49-4cc9-bd26-764f87dd055e','02','','','','List of Sales Receipts','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-08 17:52:27.406000','2025-07-30 19:57:31.892102','admin','admin'),('69780a21-3331-45d3-8b3b-fc8eed4668ca','Job Costing','64547663-9950-4e9e-882c-69992a57e7cb','08','','','','Rules for Costing','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:54:38.843000','2025-07-30 19:57:31.892102','admin','admin'),('6af99983-27ed-4d74-83ed-0bf3af6aed0d','Cost Centre','64547663-9950-4e9e-882c-69992a57e7cb','01 ','','','','List of Cost Centres','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:51:28.662000','2025-07-30 19:57:31.892102','admin','admin'),('6e547220-d6f9-4ee9-80fa-f4c208565c6b','Tax Setup','d343c3cd-6e3e-4116-97da-066a05173843','01','','','','List of Tax Rates','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:43:54.389000','2025-07-30 19:57:31.892102','admin','admin'),('705f0e11-b352-470b-84b9-0f4c5f6c653b','Product & Service Costing','64547663-9950-4e9e-882c-69992a57e7cb','06','','','','Rules for Costing','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:53:42.007000','2025-07-30 19:57:31.892102','admin','admin'),('7605baf1-c5cb-44e6-80aa-1cead09b49c2','Items','9d7953d3-2866-4b52-9c0d-8a559a12a0a4','1','','','','List of All Items','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:15:06.865000','2025-07-30 19:57:31.892102','admin','admin'),('76c17f9f-7f00-452c-bf64-3e5fba3435fa','Add Payment Made','a984fb09-8a37-43fe-9076-bc11d451dbe5','07','','','','New Payment','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:36:04.183000','2025-07-30 19:57:31.892102','admin','admin'),('7a0e8d40-a051-4e84-80f7-00bb571c990a','Disbursement Tracking','ddac32d5-ce66-4f08-8d1d-806f08e0171f','02','','','','Schedule of Disbursment','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-21 14:46:06.383000','2025-07-21 14:48:19.986000','admin','admin'),('7b5259f5-7ae8-4846-bc6d-ded8eb60504d','Expense','a984fb09-8a37-43fe-9076-bc11d451dbe5','03','','','','List of All Expenses','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:32:22.460000','2025-07-30 19:57:31.892102','admin','admin'),('7f662fcb-a07f-4c56-892a-78c749557130','Invoice','1405b8aa-4e49-4cc9-bd26-764f87dd055e','01','','','','List of invoices','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-08 17:47:30.465000','2025-07-30 19:57:31.892102','admin','admin'),('7fe5b7a0-9f06-48cc-bf26-7d5d45f14f16','Cons. Chart of Accounts','05f960bc-2aef-4f1a-8a9b-a713c6143bf3','1','','','','All Accounts','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-28 12:35:06.353000','2025-07-30 19:57:31.892102','admin','admin'),('810b288a-3cd1-4bd6-820c-1795facf8903','Customer','0edc1b72-e5e9-4658-a456-06906c9aa80d','01','','','','List of All Customers','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:25:03.746000','2025-07-30 19:57:31.892102','admin','admin'),('81f22350-6d23-441d-8dc5-6f80fcee5b69','Employee','3fbe0e76-b801-4912-8040-cedaf367a2af','1','','','','List of Employees','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-13 11:42:22.551000','2025-07-30 19:57:31.892102','admin','admin'),('84d49968-13ac-4f4f-a5e9-004275c390ed','Billing & Revenue Recognition','96a5286c-1404-48a5-8108-1fd34c21ab73','05','','','','Recognition Schedules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:57:49.807000','2025-07-30 19:57:31.892102','admin','admin'),('867559ad-0653-4165-aa8a-ca4363d71913','Add Payment Receipt','1405b8aa-4e49-4cc9-bd26-764f87dd055e','09','','','','New Payment Receipt','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:30:21.800000','2025-07-30 19:57:31.892102','admin','admin'),('8690ac58-a5d1-460c-8584-68a758c206e4','Add Items','9d7953d3-2866-4b52-9c0d-8a559a12a0a4','2','','','','New Items','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:15:46.582000','2025-07-30 19:57:31.892102','admin','admin'),('86c25608-9986-425b-8be7-cb3135e2e829','Packing List','cd3eccd2-48b5-4376-bd78-8d9473709a19','2','','','','List of Packing List','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-15 12:29:02.055000','2025-07-30 19:57:31.892102','admin','admin'),('8888fdf5-55fe-460e-b91f-aad218eac5fc','Process Costing','64547663-9950-4e9e-882c-69992a57e7cb','09','','','','Rules for Costing','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:54:55.037000','2025-07-30 19:57:31.892102','admin','admin'),('8cc35be4-3624-4114-9dbc-b3411b6ee26d','Audit & Compliance','cf3250ea-e67c-45a7-8020-efdef79fc3d6','03','','','','List of Auditors','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-08 20:13:46.925000','2025-07-30 19:57:31.892102','admin','admin'),('8ee154e3-1b86-4513-9ad7-db4a059255ad','Bank','e9f43875-7e77-4ad1-98fc-6df5fb99e0c2','02','','','','List of Bank A/Cs','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:37:38.182000','2025-07-30 19:57:31.892102','admin','admin'),('91d9e78c-ac99-4a68-8217-e76b12a68511','Compliance Tracking','d343c3cd-6e3e-4116-97da-066a05173843','04','','','','Rules of Compliance','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:45:53.602000','2025-07-30 19:57:31.892102','admin','admin'),('927d8556-8fde-454f-8cee-852d6f59ccf0','Add Quote','0edc1b72-e5e9-4658-a456-06906c9aa80d','04','','','','New Quotes','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:26:28.730000','2025-07-30 19:57:31.892102','admin','admin'),('9611027a-d508-4e82-a215-e5280937bce2','Revenue Centre','64547663-9950-4e9e-882c-69992a57e7cb','02','','','','List of Revenue Centres','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:51:48.347000','2025-07-30 19:57:31.892102','admin','admin'),('996f270f-5858-4553-9470-3dddadedc890','Organizational Setup','adf6e054-4ae5-4565-a0ee-d0e60ed50ab3','01','','','','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-06 16:59:44.875000','2025-07-30 19:57:31.892102','admin','admin'),('9994f272-6709-4608-9fa2-b1f61f4049c4','Currency Setup','adf6e054-4ae5-4565-a0ee-d0e60ed50ab3','03','','','','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-21 13:07:39.672000','2025-07-30 19:57:31.892102','admin','admin'),('9ac67656-5add-4415-b622-78d349bfec7e','Inventory Adjustment','9d7953d3-2866-4b52-9c0d-8a559a12a0a4','3','','','','Adjustment Entries','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:16:02.061000','2025-07-30 19:57:31.892102','admin','admin'),('9bdaaf2c-33f2-45c7-abf0-beba5d0c0dbe','Add Budget','96a5286c-1404-48a5-8108-1fd34c21ab73','07','','','',' New Budget','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-21 15:06:14.565000','2025-07-30 19:57:31.892102','admin','admin'),('9c996204-ae36-4002-925c-c281e6c7f08b','Cash','e9f43875-7e77-4ad1-98fc-6df5fb99e0c2','01','','','','List of Cash A/Cs','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:37:18.451000','2025-07-30 19:57:31.892102','admin','admin'),('9e312751-a953-4a12-9cd3-9df2170a5231','EMI Automation','ddac32d5-ce66-4f08-8d1d-806f08e0171f','04','','','','Rules of EMI Posting','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-21 14:47:03.797000','2025-07-21 14:48:31.649000','admin','admin'),('9fcdd276-3e01-4025-b62c-0c1d12897611','Maintenance','e129b8dc-9600-49dd-8bef-ec50db77d9da','05','','','','Maintenance Schedule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:48:36.002000','2025-07-30 19:57:31.892102','admin','admin'),('a044d8d6-2bcf-4226-a727-c8d18f9af377','Cost Element Accounting','64547663-9950-4e9e-882c-69992a57e7cb','05','','','','Cost Reports','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:52:59.404000','2025-07-30 19:57:31.892102','admin','admin'),('a0632231-df7c-419a-9016-f1c7b876e3f2','Loan Register','ddac32d5-ce66-4f08-8d1d-806f08e0171f','01','','','','List of all Loans','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-21 14:45:33.616000','2025-07-21 14:48:12.105000','admin','admin'),('a323c849-587c-4939-986e-ac274ee2aaef','Add Company','adf6e054-4ae5-4565-a0ee-d0e60ed50ab3','02','','','','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-08 20:14:46.037000','2025-07-30 19:57:31.892102','admin','admin'),('a592af95-6138-407c-8477-7982fb8bd424','Vendor','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','01','','','','List of All Vendors','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:09:32.103000','2025-07-30 19:57:31.892102','admin','admin'),('a96047f6-ef0f-4ea3-9fde-03cef1739eee','Adjust Advance','ea425177-675a-4dc2-83e6-293dfcc3c108','3','','','','List of Advance Adjustments','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-13 20:19:53.189000','2025-07-21 14:54:08.436000','admin','admin'),('a989196f-6a7b-4ac3-8144-a6e196087271','Bill','a984fb09-8a37-43fe-9076-bc11d451dbe5','01','','','','List of All Bills','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:31:44.962000','2025-07-30 19:57:31.892102','admin','admin'),('af9e6b07-dce6-4b0c-9c97-dca08de698fd','Leave Management','3fbe0e76-b801-4912-8040-cedaf367a2af','2','','','','Leave Schedule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-13 11:42:44.194000','2025-07-30 19:57:31.892102','admin','admin'),('b1aabe66-c893-4960-957e-31a375c3130e','Quote','0edc1b72-e5e9-4658-a456-06906c9aa80d','03','','','','List of All Quotes','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:26:03.255000','2025-07-30 19:57:31.892102','admin','admin'),('b2179dfb-be65-41df-a978-92ce96f273cb','Budgeting','96a5286c-1404-48a5-8108-1fd34c21ab73','03','','','','Budget Schedules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:56:34.450000','2025-07-30 19:57:31.892102','admin','admin'),('b5c5ead6-e043-45be-b177-0b90e5f29721','Add Challan','0edc1b72-e5e9-4658-a456-06906c9aa80d','08','','','','New Challan','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:33:43.000000','2025-07-30 19:57:31.892102','admin','admin'),('b7ec9557-0506-4ba5-9e7c-a7740b2aa877','Add Account','e9f43875-7e77-4ad1-98fc-6df5fb99e0c2','04','','','','New Account','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:38:21.122000','2025-07-30 19:57:31.892102','admin','admin'),('b9c882d8-7d56-49ba-9303-c51f264fd06a','Payroll Setup','dabd23fd-26b5-407e-83c7-c8335f517c0a','1','','','','Set Payroll Sheet','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-21 14:57:01.897000','2025-07-30 19:57:31.892102','admin','admin'),('bbf38bae-0a95-4b8f-93df-b2be5150e08b','Compensation','3fbe0e76-b801-4912-8040-cedaf367a2af','4','','','','Compensation Setup','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-13 11:43:28.819000','2025-07-30 19:57:31.892102','admin','admin'),('bc50a01c-00ec-4e5d-af26-b0884bdd3670','Commercial Invoice','cd3eccd2-48b5-4376-bd78-8d9473709a19','1','','','','List of Com. Invoice','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-15 12:28:46.292000','2025-07-30 19:57:31.892102','admin','admin'),('bceb1b2b-bdc5-4501-88cc-bd2904401b8b','Share Capital Setup','052eee4e-3e8a-4b3a-b8ef-ff7036436cc1','01','','','','Share Structure','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-13 11:35:12.718000','2025-07-30 19:57:31.892102','admin','admin'),('be01e24a-1d6c-4940-a4e9-377972f166a9','Reporting and Analytics','e7346c4c-b50b-47c5-95a7-1cc3f3062fa2','03','','','','Schedules of Reporting','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 12:00:05.620000','2025-07-30 19:57:31.892102','admin','admin'),('bf1906c4-f9da-4307-ad23-e1721bd1fa85','Add Budget','e7346c4c-b50b-47c5-95a7-1cc3f3062fa2','07','','','','New Budget / Forecast','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-21 14:27:02.334000','2025-07-30 19:57:31.892102','admin','admin'),('c396975a-419a-47da-8735-db0ce4d63cdf','Wallet','e9f43875-7e77-4ad1-98fc-6df5fb99e0c2','03','','','','List of Wallets','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:37:55.617000','2025-07-30 19:57:31.892102','admin','admin'),('c4b264c7-73db-4189-85ee-6f72d8fab8fc','Add Invoice','1405b8aa-4e49-4cc9-bd26-764f87dd055e','07','','','','New Invoice','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-09 17:50:04.681000','2025-07-30 19:57:31.892102','admin','admin'),('c4e8556f-0055-4818-9e44-816f7b2a5157','Add Vendor','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','02','','','','New Vendor','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:09:57.184000','2025-07-30 19:57:31.892102','admin','admin'),('c635fc81-2e0e-4042-b81e-339c094a840c','Pay Run','dabd23fd-26b5-407e-83c7-c8335f517c0a','2','','','','Run Payroll','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-13 11:43:47.791000','2025-07-30 19:57:31.892102','admin','admin'),('c6fdabf3-1aa7-466c-824c-ace6400d2d6e','Quotation','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','03','','','','List of All Quotations','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:10:18.102000','2025-07-30 19:57:31.892102','admin','admin'),('c7095bfe-4005-4099-921b-f84c283fc802','Variance Analysis','e7346c4c-b50b-47c5-95a7-1cc3f3062fa2','02','','','','Rules of Analysis','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:59:49.297000','2025-07-30 19:57:31.892102','admin','admin'),('c942985e-ff92-4070-9170-dec8efa3e0b0','Delivery Challan','0edc1b72-e5e9-4658-a456-06906c9aa80d','07','','','','List of All Challans','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:29:49.056000','2025-07-30 19:57:31.892102','admin','admin'),('c95004af-a57d-4f88-bd12-357d75f04b70','Asset Revaluation','e129b8dc-9600-49dd-8bef-ec50db77d9da','04','','','','Revaluaction Schedule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:48:17.744000','2025-07-30 19:57:31.892102','admin','admin'),('c9fafd10-c441-43f3-96fa-15b7995f4c56','Journal / Voucher','cf3250ea-e67c-45a7-8020-efdef79fc3d6','02','','','','List of All Vouchers','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-08 20:12:31.794000','2025-07-30 19:57:31.892102','admin','admin'),('cc42a4de-a42d-44ef-b8ae-a976b9b29c07','Certificate of Origin','cd3eccd2-48b5-4376-bd78-8d9473709a19','4','','','','List of Certificate','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-15 12:29:35.304000','2025-07-30 19:57:31.892102','admin','admin'),('cc9725f3-25c0-46b9-bc19-6fd08413c458','Add Sales Order','0edc1b72-e5e9-4658-a456-06906c9aa80d','06','','','','New Sales Order','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 15:29:10.774000','2025-07-30 19:57:31.892102','admin','admin'),('cfc0e06e-c8f8-4da7-bfb0-4301d1f1f195','Payment made','a984fb09-8a37-43fe-9076-bc11d451dbe5','02','','','','List of All Payments','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:32:02.930000','2025-07-30 19:57:31.892102','admin','admin'),('d580b963-ca71-4b62-bfb1-73d8e7f7baa0','Recurring Invoices / Subscription','1405b8aa-4e49-4cc9-bd26-764f87dd055e','04','','','','List of Recurring Invoices','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-09 17:46:47.655000','2025-07-30 19:57:31.892102','admin','admin'),('d6991222-bac4-4a49-95cb-4b58dcb0d759','Revenue Recognition','1405b8aa-4e49-4cc9-bd26-764f87dd055e','06','','','',' List of Recognition Schedules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-09 17:49:24.195000','2025-07-30 19:57:31.892102','admin','admin'),('d8b48f45-94c5-41db-8130-9292fca2fa73','Add L/C','809dace8-03d1-4ee9-917a-bf1ddabe359f','5','','','','New L/C','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-21 15:08:42.032000','2025-07-21 15:08:42.032000','admin','admin'),('d950d245-fab7-4b59-86dc-fb69591ecb66','EPS Calculation','052eee4e-3e8a-4b3a-b8ef-ff7036436cc1','03','','','','Rules for EPS','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-13 11:35:36.336000','2025-07-30 19:57:31.892102','admin','admin'),('dcc85e15-4934-4164-a31f-9cc7026fe4c2','Activity based Costing','64547663-9950-4e9e-882c-69992a57e7cb','07','','','','Rules for Costing','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:54:00.121000','2025-07-30 19:57:31.892102','admin','admin'),('dfb30eaa-6509-4f7d-b682-45cf61e2f604','Add Amendment','809dace8-03d1-4ee9-917a-bf1ddabe359f','6','','','','New Amendment','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-21 15:08:59.328000','2025-07-21 15:08:59.328000','admin','admin'),('e392cf72-c970-4433-9666-988ed9cc70bc','Add Tax Rate','d343c3cd-6e3e-4116-97da-066a05173843','02','','','','New Tax Rate','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:44:12.967000','2025-07-30 19:57:31.892102','admin','admin'),('e85c74af-3bab-4547-b12b-9aa3baaf4591','Depreciation','e129b8dc-9600-49dd-8bef-ec50db77d9da','03','','','','Depreciation Schedule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:47:49.083000','2025-07-30 19:57:31.892102','admin','admin'),('e93e00f2-7bf3-4086-9f21-136407c13ef1','Add Currency','adf6e054-4ae5-4565-a0ee-d0e60ed50ab3','04','','','','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-08 20:20:28.269000','2025-07-30 19:57:31.892102','admin','admin'),('ed93d4f7-0a21-47bb-8093-305b8ef8d6db','Withholding Mgt','d343c3cd-6e3e-4116-97da-066a05173843','03','','','','Withholding Schedule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:44:37.144000','2025-07-30 19:57:31.892102','admin','admin'),('ede3d41b-e4c6-43c7-82f0-5423292b1fdc','Add Expense','a984fb09-8a37-43fe-9076-bc11d451dbe5','08','','','','New Expense','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:36:22.240000','2025-07-30 19:57:31.892102','admin','admin'),('edee2a02-298d-4da1-a0ce-6c28711b3f91','Add Credit Note','1405b8aa-4e49-4cc9-bd26-764f87dd055e','10','','','','New Credit Note','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:31:11.200000','2025-07-30 19:57:31.892102','admin','admin'),('eebc0ad6-3c6e-4add-87c5-45b0c4229121','Add Voucher','cf3250ea-e67c-45a7-8020-efdef79fc3d6','05','','','','New Journal','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-08 20:43:44.027000','2025-07-30 19:57:31.892102','admin','admin'),('ef120ebf-b09d-4997-93a0-64a549f46946','Sales Return','0edc1b72-e5e9-4658-a456-06906c9aa80d','09','','','','List of Sales Returns','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-13 11:40:25.505000','2025-07-30 19:57:31.892102','admin','admin'),('f029eddc-1146-46d1-975e-b1c9f64caba4','Project Compliance','96a5286c-1404-48a5-8108-1fd34c21ab73','06','','','','List of Compliance Rules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:58:09.268000','2025-07-30 19:57:31.892102','admin','admin'),('f6a98bbd-c94d-47ab-b520-25d1ba19c1f9','Add Depriciation Rate','e129b8dc-9600-49dd-8bef-ec50db77d9da','08','','','','List of Depriciation Rates','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-21 15:01:22.930000','2025-07-21 15:01:22.930000','admin','admin'),('f78d560a-69ae-48a4-aadf-b11fdbf00f53','Project Setup','96a5286c-1404-48a5-8108-1fd34c21ab73','01','','','','List of All Projects','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:55:27.369000','2025-07-30 19:57:31.892102','admin','admin'),('fc057ab9-cdf9-49ac-b52a-87655eff0e1e','Financial KPI tracking','e7346c4c-b50b-47c5-95a7-1cc3f3062fa2','06','','','','Rules for KPI Track','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 12:01:11.098000','2025-07-30 19:57:31.892102','admin','admin'),('fd161920-95bd-4b3b-a112-122a6144f221','Budget & Forecast','e7346c4c-b50b-47c5-95a7-1cc3f3062fa2','01','','','','Schedules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:59:29.514000','2025-07-30 19:57:31.892102','admin','admin'),('fdcba465-4f12-444c-b40e-b561d06b15a5','Profit Distribution','052eee4e-3e8a-4b3a-b8ef-ff7036436cc1','04','','','','Diatribution Schedule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-13 11:35:48.241000','2025-07-30 19:57:31.892102','admin','admin'),('fefc2804-c993-4a0e-9046-e286e045e040','Asset Tracking','e129b8dc-9600-49dd-8bef-ec50db77d9da','02','','','','List of Locationwise Assets','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:47:01.146000','2025-07-30 19:57:31.892102','admin','admin'),('ff7b4a10-5ca1-41ec-be36-90289dd8df32','Add Vendor Credit','a984fb09-8a37-43fe-9076-bc11d451dbe5','09','','','','New Vendor Credit','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-10 11:36:41.043000','2025-07-30 19:57:31.892102','admin','admin'),('ffc8051e-bd1f-4120-a303-0edd80b59253','Payment Receipt','1405b8aa-4e49-4cc9-bd26-764f87dd055e','03','','','','List of Payment Receipts','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-09 17:46:18.928000','2025-07-30 19:57:31.892102','admin','admin'),('ffcb635a-b508-484d-84d6-1a44e960af0d','Add Sales Return','0edc1b72-e5e9-4658-a456-06906c9aa80d','10','','','','New Sales Return','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2025-07-13 11:40:50.306000','2025-07-30 19:57:31.892102','admin','admin');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `appId` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `tier` varchar(255) NOT NULL,
  `serialNumber` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c5377061afbd9eb0a8eafc541a1` (`appId`),
  CONSTRAINT `FK_c5377061afbd9eb0a8eafc541a1` FOREIGN KEY (`appId`) REFERENCES `app` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES ('052eee4e-3e8a-4b3a-b8ef-ff7036436cc1','Share Management','a2e440bd-4969-4df3-a9f9-9286ff1bbca4','a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','1','2025-07-13 11:33:55.461000','2025-07-15 17:30:59.786000','admin','admin'),('05f960bc-2aef-4f1a-8a9b-a713c6143bf3','Consolidation','0e87a206-39fe-4035-a3e3-0c8bf6f12512','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','1','2025-07-20 15:02:55.492000','2025-07-20 15:02:55.492000','admin','admin'),('0edc1b72-e5e9-4658-a456-06906c9aa80d','Sales','cdd8d06f-2acc-4c81-a77a-efa305e7dca9','a52c4775-308c-4d4c-b1ac-7894dac55a1d','3, 4, 5','1','2025-07-10 15:04:50.010000','2025-07-10 15:04:50.010000','admin','admin'),('1405b8aa-4e49-4cc9-bd26-764f87dd055e','Accts Receivable','8b1dbb89-4f9a-41e6-9231-66cc375aeae0','a52c4775-308c-4d4c-b1ac-7894dac55a1d','3, 4, 5','2','2025-07-08 17:40:26.579000','2025-07-08 18:42:58.835000','admin','admin'),('3fbe0e76-b801-4912-8040-cedaf367a2af','Employee Info','45509fe8-d5e9-469c-90fc-41e6617dbdc7','a52c4775-308c-4d4c-b1ac-7894dac55a1d','3, 4, 5','1','2025-07-10 15:05:38.614000','2025-07-10 15:05:38.614000','admin','admin'),('64547663-9950-4e9e-882c-69992a57e7cb','Cost Accounting','66befc8a-36f6-434b-add0-3a2625295caa','a52c4775-308c-4d4c-b1ac-7894dac55a1d','3, 4, 5','1','2025-07-08 19:41:04.667000','2025-07-08 19:41:04.667000','admin','admin'),('809dace8-03d1-4ee9-917a-bf1ddabe359f','L/C Management','15b816f2-ab33-4c5e-93a1-1ec28e3441c7','a52c4775-308c-4d4c-b1ac-7894dac55a1d','3,4','1','2025-07-13 11:34:28.412000','2025-07-15 12:18:21.239000','admin','admin'),('96a5286c-1404-48a5-8108-1fd34c21ab73','Project Accounting','4a646046-f3b9-4357-8fb0-dff235790bc5','a52c4775-308c-4d4c-b1ac-7894dac55a1d','3, 4, 5','1','2025-07-08 19:41:36.092000','2025-07-08 19:41:36.092000','admin','admin'),('9d7953d3-2866-4b52-9c0d-8a559a12a0a4','Items','de8c4c44-facd-4ecb-91c9-81bb8580a2a2','a52c4775-308c-4d4c-b1ac-7894dac55a1d','3, 4, 5','1','2025-07-10 15:02:30.536000','2025-07-10 15:02:30.536000','admin','admin'),('a984fb09-8a37-43fe-9076-bc11d451dbe5','Accts Payable','8b1dbb89-4f9a-41e6-9231-66cc375aeae0','a52c4775-308c-4d4c-b1ac-7894dac55a1d','3, 4, 5','3','2025-07-08 17:40:59.085000','2025-07-08 18:43:06.721000','admin','admin'),('adf6e054-4ae5-4565-a0ee-d0e60ed50ab3','Organization','e21482e7-b464-41bf-bedc-76827af91a7e','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','1','2025-07-21 12:12:08.813000','2025-07-21 12:12:08.813000','admin','admin'),('c24005d4-7299-4ae3-884b-77da8235aea9','My Portal','bce257e3-d95c-4d05-bd76-6beddbf0447b','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2','2025-07-21 12:12:53.244000','2025-07-21 12:12:53.244000','admin','admin'),('cd3eccd2-48b5-4376-bd78-8d9473709a19','Documentation','15b816f2-ab33-4c5e-93a1-1ec28e3441c7','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2','2025-07-15 12:18:10.351000','2025-07-15 12:18:10.351000','admin','admin'),('cf3250ea-e67c-45a7-8020-efdef79fc3d6','Accounting','8b1dbb89-4f9a-41e6-9231-66cc375aeae0','a52c4775-308c-4d4c-b1ac-7894dac55a1d','3, 4, 5','1','2025-07-06 16:58:28.365000','2025-07-08 18:42:48.679000','admin','admin'),('d343c3cd-6e3e-4116-97da-066a05173843','Tax Accounting','3b584198-b820-465e-a4f9-f2834589ca8d','a52c4775-308c-4d4c-b1ac-7894dac55a1d','3, 4, 5','1','2025-07-08 18:42:26.552000','2025-07-08 18:42:26.552000','admin','admin'),('d63cb0fe-1fe0-4cde-a554-fa132cddda9c','Purchase','5a6eb74e-c9ee-413d-9a0f-2365fd348307','a52c4775-308c-4d4c-b1ac-7894dac55a1d','3, 4, 5','1','2025-07-10 15:02:07.748000','2025-07-10 15:02:07.748000','admin','admin'),('d8885ec1-3006-41e5-b849-62199ad991e5','Dashboard','bce257e3-d95c-4d05-bd76-6beddbf0447b','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','1','2025-07-21 12:12:38.853000','2025-07-21 12:12:38.853000','admin','admin'),('dabd23fd-26b5-407e-83c7-c8335f517c0a','Payroll','1904f60d-57b3-439c-a6fa-ac497ea8ed9c','a52c4775-308c-4d4c-b1ac-7894dac55a1d','3, 4, 5','1','2025-07-10 15:08:18.740000','2025-07-10 15:08:18.740000','admin','admin'),('dc337edf-8acd-45db-b01a-7e4293a2f029','Menu-test','da45bd74-60c5-4f47-b22c-8255edf6f03c','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','1','2025-07-21 12:33:15.065000','2025-07-21 12:33:15.065000','admin','admin'),('ddac32d5-ce66-4f08-8d1d-806f08e0171f','Loan Management','a1f83a6b-8e4b-4ce9-8d02-ee559e457ea7','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2','2025-07-21 14:44:55.035000','2025-07-21 14:44:55.035000','admin','admin'),('e129b8dc-9600-49dd-8bef-ec50db77d9da','Fixed Asset','62972fd5-d2ef-411d-8fa3-330e32e3ed26','a52c4775-308c-4d4c-b1ac-7894dac55a1d','3, 4, 5','1','2025-07-08 19:40:27.672000','2025-07-08 19:40:27.672000','admin','admin'),('e7346c4c-b50b-47c5-95a7-1cc3f3062fa2','Financial Planning','a1f83a6b-8e4b-4ce9-8d02-ee559e457ea7','a52c4775-308c-4d4c-b1ac-7894dac55a1d','3, 4, 5','1','2025-07-08 19:42:00.140000','2025-07-08 19:42:00.140000','admin','admin'),('e9f43875-7e77-4ad1-98fc-6df5fb99e0c2','Cash & Bank','8b1dbb89-4f9a-41e6-9231-66cc375aeae0','a52c4775-308c-4d4c-b1ac-7894dac55a1d','3, 4, 5','4','2025-07-08 17:42:24.378000','2025-07-08 18:43:14.067000','admin','admin'),('ea425177-675a-4dc2-83e6-293dfcc3c108','Expense Management','45509fe8-d5e9-469c-90fc-41e6617dbdc7','a52c4775-308c-4d4c-b1ac-7894dac55a1d','','2','2025-07-13 20:17:20.361000','2025-07-13 20:17:20.361000','admin','admin');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modules` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `tier` varchar(255) NOT NULL,
  `serialNumber` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES ('0210eb0d-6a4b-4512-a6b0-06649d0bdb12','HR','3, 4, 5','2','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-06 15:55:27.642000','2025-07-08 18:36:45.091000','admin','admin'),('37e9a5fe-badd-40c4-afb9-e367ad57d6bf','Fin','3, 4, 5','1','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-06 15:55:15.751000','2025-07-08 19:22:04.046000','admin','admin'),('56726da6-a4cf-4d7a-9742-9533c14b4289','CRM','3, 4, 5','4','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-08 17:37:11.733000','2025-07-10 15:34:34.095000','admin','admin'),('95c9a50b-953b-4738-b609-275911fcdfb0','SCM','3, 4, 5','3','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-06 20:21:10.949000','2025-07-06 20:21:10.949000','admin','admin'),('bd598bf2-c3f6-4501-be57-66ef7641f11b','Mod-Test','','9','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-21 12:31:43.556000','2025-07-21 12:32:36.054000','admin','admin'),('e3c28cc8-7e92-4052-9c70-76418fcc38dc','Sys','','5','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-21 12:09:05.699000','2025-07-21 12:09:05.699000','admin','admin');
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `options` (
  `id` varchar(36) NOT NULL,
  `text` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `questionId` varchar(255) DEFAULT NULL,
  `questionModelId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_46b668c49a6c4154d4643d875a5` (`questionId`),
  KEY `FK_236588fb96ad67e74a0f9a25d62` (`questionModelId`),
  CONSTRAINT `FK_236588fb96ad67e74a0f9a25d62` FOREIGN KEY (`questionModelId`) REFERENCES `question-models` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_46b668c49a6c4154d4643d875a5` FOREIGN KEY (`questionId`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `options`
--

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question-models`
--

DROP TABLE IF EXISTS `question-models`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question-models` (
  `id` varchar(36) NOT NULL,
  `text` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `required` tinyint(4) NOT NULL DEFAULT 0,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `parentQuestionId` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9aad70cb07c9e70f20fbb8576e0` (`parentQuestionId`),
  CONSTRAINT `FK_9aad70cb07c9e70f20fbb8576e0` FOREIGN KEY (`parentQuestionId`) REFERENCES `questions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question-models`
--

LOCK TABLES `question-models` WRITE;
/*!40000 ALTER TABLE `question-models` DISABLE KEYS */;
/*!40000 ALTER TABLE `question-models` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questiongroups`
--

DROP TABLE IF EXISTS `questiongroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questiongroups` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `surveyId` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_79d4582a7f4e87bf857f7992d5a` (`surveyId`),
  CONSTRAINT `FK_79d4582a7f4e87bf857f7992d5a` FOREIGN KEY (`surveyId`) REFERENCES `survey-configs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questiongroups`
--

LOCK TABLES `questiongroups` WRITE;
/*!40000 ALTER TABLE `questiongroups` DISABLE KEYS */;
/*!40000 ALTER TABLE `questiongroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` varchar(36) NOT NULL,
  `text` varchar(255) NOT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `required` tinyint(4) NOT NULL DEFAULT 0,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `questionGroupId` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('8dfa476a-9357-4570-9a56-262233a76822','admin','d21a8638-9c0e-43a0-a804-0d045126eebe','2025-07-12 17:19:18.823271','2025-07-12 17:19:18.823271'),('d3dd4874-f19e-4c40-a733-4f58f8635e45','admin','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-06 15:53:11.066024','2025-07-06 15:53:11.066024');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_item`
--

DROP TABLE IF EXISTS `sub_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_item` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `tier` varchar(255) NOT NULL,
  `itemId` varchar(255) NOT NULL,
  `templateId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) NOT NULL,
  `serialNumber` varchar(255) NOT NULL,
  `buttonType` varchar(255) NOT NULL,
  `buttonLabel` varchar(255) NOT NULL,
  `layout` varchar(255) NOT NULL,
  `templateText` varchar(255) DEFAULT NULL,
  `navigationTo` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3968ea6e908906cbf19167614c6` (`itemId`),
  CONSTRAINT `FK_3968ea6e908906cbf19167614c6` FOREIGN KEY (`itemId`) REFERENCES `item` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_item`
--

LOCK TABLES `sub_item` WRITE;
/*!40000 ALTER TABLE `sub_item` DISABLE KEYS */;
INSERT INTO `sub_item` VALUES ('008249fc-a1a5-4ddb-9b42-512f0d26720c','Item Details','','08419323-d4cf-466c-afd7-7a90dd0350ac',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Section',NULL,'','','2025-07-13 13:35:32.939000','2025-07-29 19:47:52.578000','admin','admin'),('02f6309c-5ccc-4345-a1b3-79ff4fdb66cd','Other Details','','221c4e58-dff7-4368-8412-dee82d9581b6',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Tab',NULL,'','','2025-07-13 15:22:13.702000','2025-07-21 16:27:20.538000','admin','admin'),('04a58f00-fd7b-48b4-80ee-576fa5c69e4b','Basic Information','','b5c5ead6-e043-45be-b177-0b90e5f29721',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Section',NULL,'','','2025-07-21 16:22:16.791000','2025-07-21 16:34:41.044000','admin','admin'),('05fc8c78-3259-4a05-8ede-f876168e63f1','Order Details','','3ca59eec-4633-4dfe-97ec-16a940f87717',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','5','','','Mix-Tab',NULL,'','','2025-07-13 13:22:31.096000','2025-07-21 16:38:03.381000','admin','admin'),('07fe8f5e-31cc-4a5c-9ec3-a1322af90b68','Other Details','','927d8556-8fde-454f-8cee-852d6f59ccf0',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Tab',NULL,'','','2025-07-13 15:30:11.163000','2025-07-21 16:27:42.763000','admin','admin'),('0a1f229e-5150-4508-a41e-48de96fa2997','Item Description','','927d8556-8fde-454f-8cee-852d6f59ccf0',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Tab',NULL,'','','2025-07-13 15:30:27.632000','2025-07-21 16:27:48.751000','admin','admin'),('0bdd47a0-eeb0-4f0e-9435-663e12f83bc0','Basic Information','','867559ad-0653-4165-aa8a-ca4363d71913',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Tab',NULL,'','','2025-07-21 15:55:28.569000','2025-07-21 15:55:28.569000','admin','admin'),('0fed4934-de2b-4b12-950f-7ca730a0f423','Item Details','','ff7b4a10-5ca1-41ec-be36-90289dd8df32',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Section',NULL,'','','2025-07-21 16:10:22.638000','2025-07-21 16:10:22.638000','admin','admin'),('121de1f3-1a7f-4c45-bb89-b3b79cddab71','Tax Method','','3ca59eec-4633-4dfe-97ec-16a940f87717',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Tab',NULL,'','','2025-07-13 13:22:22.072000','2025-07-21 16:37:59.025000','admin','admin'),('126fa9bc-c98c-4d6e-817b-1d05703bb0f6','Other Details','','c4e8556f-0055-4818-9e44-816f7b2a5157',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Tab',NULL,'','','2025-07-13 12:58:31.098000','2025-07-21 16:36:05.603000','admin','admin'),('182d722b-fda9-4f38-b8f5-fc8f28c96455','Customer info','','cc9725f3-25c0-46b9-bc19-6fd08413c458',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Tab',NULL,'','','2025-07-21 16:21:12.810000','2025-07-21 16:21:12.810000','admin','admin'),('1ba34c07-de15-4151-b29f-853592961519','Other Details','','191bdb96-2f59-4dd2-ae9a-5e8aa2075fb6',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Tab',NULL,'','','2025-07-21 15:51:23.184000','2025-07-21 15:54:44.286000','admin','admin'),('1ce277e8-e51f-471d-a82a-20fb3b8abf49','Bill Details','','16207e60-f981-415a-a683-908229be87b2',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Tab',NULL,'','','2025-07-13 12:02:09.384000','2025-07-21 16:11:34.140000','admin','admin'),('2287b499-e908-4d19-9e59-5a9aa3f52538','General Info','','927d8556-8fde-454f-8cee-852d6f59ccf0',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Tab',NULL,'','','2025-07-13 15:23:03.899000','2025-07-21 16:27:36.736000','admin','admin'),('2db67149-08a5-4e49-94ba-2362f58205f6','Others','','b5c5ead6-e043-45be-b177-0b90e5f29721',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Section',NULL,'','','2025-07-21 16:22:36.898000','2025-07-21 16:34:57.039000','admin','admin'),('2df031e5-b9b6-4393-9b79-11bd15841bdb','Basic Information','','08419323-d4cf-466c-afd7-7a90dd0350ac',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Section',NULL,'','','2025-07-13 13:24:16.409000','2025-07-21 16:39:10.277000','admin','admin'),('2ffa86c3-328a-4153-a4d5-e5a2a9ea5e35','Delivery & payment','','927d8556-8fde-454f-8cee-852d6f59ccf0',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Tab',NULL,'','','2025-07-13 15:30:36.626000','2025-07-21 16:27:56.495000','admin','admin'),('31090ade-d4b6-4a23-b4e2-3776c5efda91','Receive Details','','867559ad-0653-4165-aa8a-ca4363d71913',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Tab',NULL,'','','2025-07-21 15:55:52.280000','2025-07-21 16:00:15.806000','admin','admin'),('322cb8bb-c110-4958-8c35-d1466f515dd6','Contra','','c9fafd10-c441-43f3-96fa-15b7995f4c56',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Tab',NULL,'','List of All Vouchers','2025-07-13 11:54:47.030000','2025-07-30 17:42:01.022000','admin','admin'),('32bd7bc7-b072-420c-8d95-221a419ea454','Attachment','','927d8556-8fde-454f-8cee-852d6f59ccf0',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','7','','','Mix-Tab',NULL,'','','2025-07-13 15:31:08.243000','2025-07-21 16:28:11.061000','admin','admin'),('336a359b-ec98-466e-80d8-04053824e6d0','Customer info','','ffcb635a-b508-484d-84d6-1a44e960af0d',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Section',NULL,'','','2025-07-21 16:22:56.752000','2025-07-21 16:33:56.156000','admin','admin'),('33829c2a-b1f3-4691-8d62-7aae67b0ec9f','Tax Information','','927d8556-8fde-454f-8cee-852d6f59ccf0',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','5','','','Mix-Tab',NULL,'','','2025-07-13 15:30:45.535000','2025-07-21 16:28:02.147000','admin','admin'),('38bf478e-b7f5-4e79-8f5c-ec808950b312','Item Details','','ffcb635a-b508-484d-84d6-1a44e960af0d',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Section',NULL,'','','2025-07-21 16:23:03.024000','2025-07-21 16:34:01.183000','admin','admin'),('3c90d955-ccaf-4d69-998f-82de057071df','Others','','08419323-d4cf-466c-afd7-7a90dd0350ac',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Section',NULL,'','','2025-07-13 13:35:41.231000','2025-07-21 16:39:25.574000','admin','admin'),('3ccde9a6-9166-4f66-877f-702a27064ba5','Basic Info','','8690ac58-a5d1-460c-8584-68a758c206e4',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Section',NULL,'','','2025-07-21 16:30:17.593000','2025-07-21 16:31:38.981000','admin','admin'),('3cd6f136-f7c2-4c09-a61b-76156e97183b','Multi-Company Setup','','996f270f-5858-4553-9470-3dddadedc890',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Tab',NULL,'','List of Companies','2025-07-13 11:45:30.115000','2025-07-20 15:18:27.368000','admin','admin'),('3d04ad7d-ceda-4381-8318-711a9a260466','Item Details','','b5c5ead6-e043-45be-b177-0b90e5f29721',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Section',NULL,'','','2025-07-21 16:22:29.395000','2025-07-21 16:34:51.879000','admin','admin'),('3e2b822f-96d5-45e1-a245-11e2fa1234e8','NULL','','a323c849-587c-4939-986e-ac274ee2aaef',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','0','','','Section',NULL,'','New Company','2025-07-20 15:12:42.834000','2025-07-20 15:28:58.861000','admin','admin'),('49dd6a5f-6df9-4c45-8f47-4e676fd32000','NULL','','61ddbc58-8b74-4b7a-8d55-06b9b629250c',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','0','','','Section',NULL,'','New Account','2025-07-20 15:30:01.649000','2025-07-20 15:30:01.649000','admin','admin'),('4a882c62-66cc-4948-ab3d-7641e7ccad30','Item Details','','8690ac58-a5d1-460c-8584-68a758c206e4',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Section',NULL,'','','2025-07-21 16:30:27.850000','2025-07-21 16:31:28.042000','admin','admin'),('4a9b4672-40ce-4b3a-be31-e3435c168a94','Other Details','','416f2dc6-ef21-4523-8aa6-41090e2c7b33',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Tab',NULL,'','','2025-07-13 13:11:22.472000','2025-07-21 16:36:33.203000','admin','admin'),('4ad68452-78b8-4905-b9ec-a4aa7f990bb5','Payment Details','','76c17f9f-7f00-452c-bf64-3e5fba3435fa',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Tab',NULL,'','','2025-07-21 16:06:52.831000','2025-07-21 16:06:52.831000','admin','admin'),('5063cc04-31f1-4be9-bb21-470b3a78d41c','Basic Information','','ff7b4a10-5ca1-41ec-be36-90289dd8df32',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Section',NULL,'','','2025-07-21 16:10:14.502000','2025-07-21 16:10:14.502000','admin','admin'),('57800517-0cf3-47c2-88b4-1d9377c24b3e','Basic Information','','16207e60-f981-415a-a683-908229be87b2',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Tab',NULL,'','','2025-07-13 12:01:51.945000','2025-07-21 16:11:19.066000','admin','admin'),('5c56fdff-9e6c-4df2-bc2a-095bc04d3474','Others','','3ca59eec-4633-4dfe-97ec-16a940f87717',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','7','','','Mix-Tab',NULL,'','','2025-07-13 13:23:00.435000','2025-07-21 16:38:12.527000','admin','admin'),('5ccfe169-e7a8-41b3-9a36-3db6bdbe9475','Sub_Item-test','','5b4d27ea-bcc5-4e60-bf6d-d09abc86ff00',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','P-Button','Edit','Tab',NULL,'Nev-Test','Intro-Test','2025-07-21 12:34:12.516000','2025-07-21 13:10:36.567000','admin','admin'),('5f792cdb-040d-4924-aff0-3bdb008b3585','Terms & Condition','','c4b264c7-73db-4189-85ee-6f72d8fab8fc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','5','','','Mix-Tab',NULL,'','','2025-07-13 12:00:50.272000','2025-07-21 16:13:07.291000','admin','admin'),('601196e6-a452-4ec6-acc5-0582739a74de','Attachments','','c4b264c7-73db-4189-85ee-6f72d8fab8fc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','6','','','Mix-Tab',NULL,'','','2025-07-13 12:00:58.125000','2025-07-21 16:13:23.728000','admin','admin'),('62182da5-134e-46c0-808e-66a8f284bc04','Tax Method','','cc9725f3-25c0-46b9-bc19-6fd08413c458',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Tab',NULL,'','','2025-07-21 16:21:28.655000','2025-07-21 16:21:28.655000','admin','admin'),('6300bd2a-c0cb-4328-bcfb-699f0db25df5','Shipping Information','','c4b264c7-73db-4189-85ee-6f72d8fab8fc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Tab',NULL,'','','2025-07-13 12:00:41.514000','2025-07-21 16:13:02.120000','admin','admin'),('6330c9b1-7f90-4e86-bd23-c5c194c47fae','Other Details','','ede3d41b-e4c6-43c7-82f0-5423292b1fdc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Tab',NULL,'','','2025-07-21 16:09:12.204000','2025-07-21 16:09:12.204000','admin','admin'),('66b6b3b7-e0a2-48a0-b7ee-666ff68b0cf6','Contact Person','','c4e8556f-0055-4818-9e44-816f7b2a5157',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Tab',NULL,'','','2025-07-13 12:58:23.702000','2025-07-21 16:36:00.247000','admin','admin'),('67d96bef-f1c0-44c7-add3-f7acd9a59080','Payment','','c9fafd10-c441-43f3-96fa-15b7995f4c56',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Tab',NULL,'','List of All Vouchers','2025-07-13 11:54:38.971000','2025-07-30 17:42:09.088000','admin','admin'),('68178556-ab23-430d-a033-f1f0e95e8a38','Journal','','c9fafd10-c441-43f3-96fa-15b7995f4c56',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Tab',NULL,'','List of All Vouchers','2025-07-13 11:55:00.045000','2025-07-30 17:41:52.015000','admin','admin'),('7284e551-a043-4251-be6f-700158b98269','NULL','','e93e00f2-7bf3-4086-9f21-136407c13ef1',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','0','','','Section',NULL,'','New Currency','2025-07-20 15:12:58.242000','2025-07-20 15:29:29.646000','admin','admin'),('72a8002f-11ae-46bd-b22a-ff2e46be5b00','Other Details','','867559ad-0653-4165-aa8a-ca4363d71913',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Tab',NULL,'','','2025-07-21 15:55:44.891000','2025-07-21 15:55:44.891000','admin','admin'),('7c019e8b-100b-4421-acf3-42ac60cde3d2','Others','','ffcb635a-b508-484d-84d6-1a44e960af0d',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Section',NULL,'','','2025-07-21 16:25:51.369000','2025-07-21 16:34:05.995000','admin','admin'),('7c30cde5-d27c-4243-9033-e518a8760652','Payment','','eebc0ad6-3c6e-4add-87c5-45b0c4229121',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Tab',NULL,'','','2025-07-13 11:51:31.165000','2025-07-30 17:43:28.308000','admin','admin'),('804b13fb-c63d-4029-b78b-c3ad3bff648a','Other Details','','76c17f9f-7f00-452c-bf64-3e5fba3435fa',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Tab',NULL,'','','2025-07-21 16:06:43.831000','2025-07-21 16:06:43.831000','admin','admin'),('81f3b76e-1491-4391-b95b-13f0815d355a','Others','','8690ac58-a5d1-460c-8584-68a758c206e4',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','6','','','Mix-Section',NULL,'','','2025-07-21 16:33:06.862000','2025-07-21 16:33:06.862000','admin','admin'),('821aa137-9079-42d3-8e75-dd7c362b01db','List of Auditors','','8cc35be4-3624-4114-9dbc-b3411b6ee26d',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Section',NULL,'','Details of Auditors','2025-07-13 11:55:58.121000','2025-07-24 18:58:45.853000','admin','admin'),('83052c79-c91a-451b-b81a-12368d6ff1e1','Receive Details','','191bdb96-2f59-4dd2-ae9a-5e8aa2075fb6',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Tab',NULL,'','','2025-07-21 15:51:31.622000','2025-07-21 16:00:04.829000','admin','admin'),('84de4e77-e14b-4e9e-9ca4-639a84f8dd85','Primary Information','','221c4e58-dff7-4368-8412-dee82d9581b6',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Tab',NULL,'','','2025-07-13 15:21:42.491000','2025-07-21 16:27:04.161000','admin','admin'),('863c35e8-cf63-4945-9069-114ee8611970','Terms & Condition','','16207e60-f981-415a-a683-908229be87b2',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Tab',NULL,'','','2025-07-13 12:02:24.871000','2025-07-21 16:11:41.325000','admin','admin'),('87b20204-504f-46a1-a6bc-dbe8203a98cd','Terms & Condition','','416f2dc6-ef21-4523-8aa6-41090e2c7b33',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','6','','','Mix-Tab',NULL,'','','2025-07-13 13:12:04.568000','2025-07-21 16:37:11.169000','admin','admin'),('886f4e6b-6a2f-4574-89ed-491d57fd001c','General Info','','416f2dc6-ef21-4523-8aa6-41090e2c7b33',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Tab',NULL,'','','2025-07-13 13:11:12.299000','2025-07-21 16:36:26.677000','admin','admin'),('940d66dd-93f5-4f3a-a222-af37a2a42032','Item Details','','ede3d41b-e4c6-43c7-82f0-5423292b1fdc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Tab',NULL,'','','2025-07-21 16:09:03.102000','2025-07-21 16:09:03.102000','admin','admin'),('9727a302-2d5f-41a5-abf3-4a9ed3b326e9','Delivary Details','','3ca59eec-4633-4dfe-97ec-16a940f87717',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Tab',NULL,'','','2025-07-13 13:22:13.596000','2025-07-21 16:37:55.181000','admin','admin'),('97b6abd5-e82d-41ce-8644-ff92d4345628','Attachment','','416f2dc6-ef21-4523-8aa6-41090e2c7b33',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','7','','','Mix-Tab',NULL,'','','2025-07-13 13:12:11.603000','2025-07-21 16:37:14.808000','admin','admin'),('999af9fb-4c77-4572-be25-51d1002dc9cd','Configure Sales','','8690ac58-a5d1-460c-8584-68a758c206e4',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Section',NULL,'','','2025-07-21 16:30:45.691000','2025-07-21 16:32:03.974000','admin','admin'),('9b146eff-2aec-4664-b44d-8616e8a8ca4c','Tags','','c4b264c7-73db-4189-85ee-6f72d8fab8fc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','7','','','Mix-Tab',NULL,'','','2025-07-13 12:01:07.835000','2025-07-21 16:13:29.319000','admin','admin'),('9c9cc1e2-5aa6-45d0-b31e-299f5b439874','Delivary Details','','cc9725f3-25c0-46b9-bc19-6fd08413c458',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Tab',NULL,'','','2025-07-21 16:21:20.370000','2025-07-21 16:21:20.370000','admin','admin'),('9d2581f4-4251-4a57-87cd-58ba9d7b528b','Item Description','','416f2dc6-ef21-4523-8aa6-41090e2c7b33',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Tab',NULL,'','','2025-07-13 13:11:31.773000','2025-07-21 16:36:54.993000','admin','admin'),('9d9a10c0-6e8a-402d-b554-a0401f8240cc','Contra','','eebc0ad6-3c6e-4add-87c5-45b0c4229121',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Tab',NULL,'','','2025-07-13 11:51:39.044000','2025-07-30 17:43:37.370000','admin','admin'),('a1c4491f-4257-4de8-a06c-8934629a1181','Vendor Contact','','16207e60-f981-415a-a683-908229be87b2',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Tab',NULL,'','','2025-07-13 12:02:01.465000','2025-07-21 16:11:27.290000','admin','admin'),('a2b84135-7fac-4124-ab83-8ed7772b911c','Basic Information','','76c17f9f-7f00-452c-bf64-3e5fba3435fa',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Tab',NULL,'','','2025-07-21 16:06:17.067000','2025-07-21 16:06:17.067000','admin','admin'),('a5c7cad4-1427-467e-8777-ca7d5e8a9167','Customer Contact','','c4b264c7-73db-4189-85ee-6f72d8fab8fc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Tab',NULL,'','','2025-07-13 12:00:21.593000','2025-07-21 16:12:46.464000','admin','admin'),('a68f274d-1e1d-49c0-9d3e-9886e88d03a1','Others','','4067bdff-f934-4b53-bb74-fc2a7157f6ec',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Sec',NULL,'','','2025-07-13 13:33:05.039000','2025-07-28 12:52:06.398000','admin','admin'),('abbd4e9b-11a8-411a-ba46-8bd102c34314','Other Details','','ff7b4a10-5ca1-41ec-be36-90289dd8df32',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Section',NULL,'','','2025-07-21 16:10:31.869000','2025-07-21 16:10:31.869000','admin','admin'),('abfd8147-e58d-47cd-8111-2ab6326bd273','Vendor info','','4067bdff-f934-4b53-bb74-fc2a7157f6ec',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Section',NULL,'','','2025-07-13 13:32:36.485000','2025-07-21 16:38:49.274000','admin','admin'),('ae6938fe-ade0-4740-b820-82da31d1305e','Multi-Currencty Setup','','9994f272-6709-4608-9fa2-b1f61f4049c4',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Tab',NULL,'','List of Currencies','2025-07-13 11:45:44.034000','2025-07-29 17:50:41.664000','admin','admin'),('b0282fa8-750c-42c1-ac98-a06fc2ae65b6','Basic Information','','3ca59eec-4633-4dfe-97ec-16a940f87717',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Tab',NULL,'','','2025-07-13 13:21:52.777000','2025-07-21 16:37:37.002000','admin','admin'),('b1b2e257-66e2-4e8a-ab01-c06f625f0669','Terms & Condition','','3ca59eec-4633-4dfe-97ec-16a940f87717',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','6','','','Mix-Tab',NULL,'','','2025-07-13 13:22:39.455000','2025-07-21 16:38:08.100000','admin','admin'),('b91950bd-7306-493a-9a85-63b29463d81a','Other Details','','edee2a02-298d-4da1-a0ce-6c28711b3f91',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Section',NULL,'','','2025-07-21 15:56:34.671000','2025-07-21 15:56:34.671000','admin','admin'),('bb315402-7f6a-4f29-9f3f-e921a0f5aa2f','Attachments','','16207e60-f981-415a-a683-908229be87b2',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','5','','','Mix-Tab',NULL,'','','2025-07-13 12:02:43.942000','2025-07-21 16:11:50.425000','admin','admin'),('c1c319c2-6691-412d-a618-a7a7b9b745c5','Basic Information','','ede3d41b-e4c6-43c7-82f0-5423292b1fdc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Tab',NULL,'','','2025-07-21 16:08:55.605000','2025-07-21 16:08:55.605000','admin','admin'),('c375b6e7-0736-49be-9f43-fe249a31586b','Terms & Condition','','927d8556-8fde-454f-8cee-852d6f59ccf0',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','6','','','Mix-Tab',NULL,'','','2025-07-13 15:30:58.597000','2025-07-21 16:28:06.771000','admin','admin'),('c3b8ee89-3784-4557-8dde-4e55ab8844c7','Delivery & payment','','416f2dc6-ef21-4523-8aa6-41090e2c7b33',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Tab',NULL,'','','2025-07-13 13:11:41.549000','2025-07-21 16:36:59.126000','admin','admin'),('c47f80c5-3ef7-4876-b361-3a52a635bc13','Primary Info','','c4e8556f-0055-4818-9e44-816f7b2a5157',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Tab',NULL,'','','2025-07-13 12:57:10.505000','2025-07-21 16:35:46.490000','admin','admin'),('c6c2ce6d-cdce-4fd2-a954-e01fcab285bd','Terms & Condition','','cc9725f3-25c0-46b9-bc19-6fd08413c458',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','6','','','Mix-Tab',NULL,'','','2025-07-21 16:21:43.913000','2025-07-21 16:21:43.913000','admin','admin'),('c732abc2-2753-4ab4-8d7f-76beafb3fad5','Order Details','','cc9725f3-25c0-46b9-bc19-6fd08413c458',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','5','','','Mix-Tab',NULL,'','','2025-07-21 16:21:36.494000','2025-07-21 16:21:36.494000','admin','admin'),('c741d50c-0945-4af5-819b-8338fc872a08','Vendor info','','3ca59eec-4633-4dfe-97ec-16a940f87717',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Tab',NULL,'','','2025-07-13 13:22:01.609000','2025-07-21 16:37:43.530000','admin','admin'),('c8bbbbe7-b805-43fc-b073-6b23d46fbfd6','Configure Inventory','','8690ac58-a5d1-460c-8584-68a758c206e4',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','5','','','Mix-Section',NULL,'','','2025-07-21 16:32:58.623000','2025-07-21 16:32:58.623000','admin','admin'),('c9043159-1fe0-40d9-851a-665fb933612e','Remarks','','221c4e58-dff7-4368-8412-dee82d9581b6',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','5','','','Mix-Tab',NULL,'','','2025-07-13 15:22:23.847000','2025-07-21 16:27:26.306000','admin','admin'),('ce2d0a89-dfa1-4b63-94a5-074b40d32161','Contact Person','','221c4e58-dff7-4368-8412-dee82d9581b6',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Tab',NULL,'','','2025-07-13 15:22:05.653000','2025-07-21 16:27:15.219000','admin','admin'),('d1acba50-2121-49b7-a3bb-fae1c7ed1605','Item Details','','edee2a02-298d-4da1-a0ce-6c28711b3f91',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Section',NULL,'','','2025-07-21 15:56:25.462000','2025-07-21 15:56:25.462000','admin','admin'),('d1b6d2a6-9046-4f6e-afd1-207baa7ae478','Company Setup','','996f270f-5858-4553-9470-3dddadedc890',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Tab',NULL,'','Setup your company','2025-07-13 11:45:21.068000','2025-07-20 15:18:19.186000','admin','admin'),('d32ae6e7-da66-4b8a-8113-23037c2bf0b0','Vendor info','','08419323-d4cf-466c-afd7-7a90dd0350ac',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Section',NULL,'','','2025-07-13 13:35:24.673000','2025-07-21 16:39:17.415000','admin','admin'),('d493cef0-a04c-4278-bbd1-8b563417fa2d','Remarks','','c4e8556f-0055-4818-9e44-816f7b2a5157',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','5','','','Mix-Tab',NULL,'','','2025-07-13 12:58:38.984000','2025-07-21 16:36:10.359000','admin','admin'),('d51ec6a2-06f6-412e-95bb-a29165269549','Configure Purchase','','8690ac58-a5d1-460c-8584-68a758c206e4',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Section',NULL,'','','2025-07-21 16:30:36.174000','2025-07-21 16:31:44.759000','admin','admin'),('d5c736fa-e451-4641-92ca-b78ee2f53d4a','Basic Information','','cc9725f3-25c0-46b9-bc19-6fd08413c458',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Tab',NULL,'','','2025-07-21 16:21:03.492000','2025-07-21 16:21:03.492000','admin','admin'),('d5fb6786-394e-47d8-a432-c5a248bab471','Basic Information','','edee2a02-298d-4da1-a0ce-6c28711b3f91',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Section',NULL,'','','2025-07-21 15:56:08.096000','2025-07-21 15:56:17.494000','admin','admin'),('dbb5f5af-2c43-4ee3-919c-29d29986ddb5','Basic Information','','c4b264c7-73db-4189-85ee-6f72d8fab8fc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Tab',NULL,'','','2025-07-13 12:00:02.155000','2025-07-21 16:12:40.363000','admin','admin'),('dd71bbb8-0f91-44f6-ad79-97dc3364d2d0','Invoice Details','','c4b264c7-73db-4189-85ee-6f72d8fab8fc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Tab',NULL,'','','2025-07-13 12:00:32.577000','2025-07-21 16:12:56.006000','admin','admin'),('dd7fac19-a7bd-4a27-b6e0-0cea5526e193','Tags','','16207e60-f981-415a-a683-908229be87b2',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','6','','','Mix-Tab',NULL,'','','2025-07-13 12:02:56.011000','2025-07-21 16:11:58.035000','admin','admin'),('ddc832e2-49e7-4249-8085-229c5faa4cf0','Item Details','','867559ad-0653-4165-aa8a-ca4363d71913',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Tab',NULL,'','','2025-07-21 15:55:36.616000','2025-07-21 15:55:36.616000','admin','admin'),('dfe1b7dc-9552-413a-a738-58a6676f6c38','Basic Information','','4067bdff-f934-4b53-bb74-fc2a7157f6ec',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Section',NULL,'','','2025-07-13 13:24:07.010000','2025-07-21 16:38:21.013000','admin','admin'),('e24302e4-2292-429c-83dc-8babc0a01ea5','Tax Information','','416f2dc6-ef21-4523-8aa6-41090e2c7b33',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','5','','','Mix-Tab',NULL,'','','2025-07-13 13:11:54.083000','2025-07-21 16:37:03.957000','admin','admin'),('e2a7d3cb-294c-41b5-bb5c-cd0e053b803b','Address','','c4e8556f-0055-4818-9e44-816f7b2a5157',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Tab',NULL,'','','2025-07-13 12:57:30.206000','2025-07-21 16:35:51.816000','admin','admin'),('e2fd1cc6-c439-4524-aca0-889b6b5e846b','Basic Information','','ffcb635a-b508-484d-84d6-1a44e960af0d',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Section',NULL,'','','2025-07-21 16:22:49.657000','2025-07-21 16:33:49.588000','admin','admin'),('ea036931-3706-4fdf-afbb-7a2824ad1ff0','Basic Information','','191bdb96-2f59-4dd2-ae9a-5e8aa2075fb6',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Tab',NULL,'','','2025-07-21 15:51:00.323000','2025-07-21 15:54:27.960000','admin','admin'),('ea6168e3-98e6-4f01-b4cd-b8fb0f54da15','Journal','','eebc0ad6-3c6e-4add-87c5-45b0c4229121',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Tab',NULL,'','','2025-07-13 11:51:47.664000','2025-07-30 17:43:44.614000','admin','admin'),('ead682b1-649f-46bd-85d6-8647bab03165','Item Details','','76c17f9f-7f00-452c-bf64-3e5fba3435fa',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Tab',NULL,'','','2025-07-21 16:06:27.003000','2025-07-21 16:06:27.003000','admin','admin'),('ec3ae7f0-ac20-44d6-a2d7-9ddc6d94fad0','Receive','','c9fafd10-c441-43f3-96fa-15b7995f4c56',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Tab',NULL,'','List of All Vouchers','2025-07-13 11:54:24.421000','2025-07-30 17:42:16.353000','admin','admin'),('ee795db3-a07a-46af-b352-7565cde10bfc','Address','','221c4e58-dff7-4368-8412-dee82d9581b6',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Tab',NULL,'','','2025-07-13 15:21:52.112000','2025-07-21 16:27:09.458000','admin','admin'),('efa47c5c-e9d6-4c1e-9527-f06fb642711d','Others','','cc9725f3-25c0-46b9-bc19-6fd08413c458',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','7','','','Mix-Tab',NULL,'','','2025-07-21 16:21:56.418000','2025-07-21 16:21:56.418000','admin','admin'),('f7351fb3-6f1b-40aa-b908-5e4cd4f67a4f','Item Details','','191bdb96-2f59-4dd2-ae9a-5e8aa2075fb6',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Tab',NULL,'','','2025-07-21 15:51:14.052000','2025-07-21 15:54:35.820000','admin','admin'),('f7dc24c7-27ce-4dbc-83df-478d35747b8f','NULL','','2d29cfef-3655-45d3-b312-6e8f96830807',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','0','','','Section',NULL,'','New Rule','2025-07-20 15:28:11.142000','2025-07-20 15:28:11.142000','admin','admin'),('fa53a855-c733-4645-9cb8-eb52a3ad898e','Receive','','eebc0ad6-3c6e-4add-87c5-45b0c4229121',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Tab',NULL,'','','2025-07-13 11:51:20.388000','2025-07-30 17:43:20.868000','admin','admin'),('fc6c33dc-39ae-4c3a-916b-e6ddaecfaeeb','Item Details','','4067bdff-f934-4b53-bb74-fc2a7157f6ec',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Section',NULL,'','','2025-07-13 13:32:53.696000','2025-07-21 16:38:55.092000','admin','admin'),('fdcc3907-6763-4804-be8c-5a21ea508356','Customer info','','b5c5ead6-e043-45be-b177-0b90e5f29721',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Section',NULL,'','','2025-07-21 16:22:23.091000','2025-07-21 16:34:45.184000','admin','admin'),('fe6ff73a-b5b7-4d35-a7fa-0edafd99da70','Payment Details','','ede3d41b-e4c6-43c7-82f0-5423292b1fdc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Tab',NULL,'','','2025-07-21 16:09:21.053000','2025-07-21 16:09:21.053000','admin','admin');
/*!40000 ALTER TABLE `sub_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_sub_item`
--

DROP TABLE IF EXISTS `sub_sub_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_sub_item` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `subItemId` varchar(255) NOT NULL,
  `tier` varchar(255) NOT NULL,
  `layout` varchar(255) NOT NULL,
  `buttonLabel` varchar(255) NOT NULL,
  `navigationTo` varchar(255) NOT NULL,
  `serialNumber` varchar(255) NOT NULL,
  `templateId` varchar(255) DEFAULT NULL,
  `templateText` varchar(255) DEFAULT NULL,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `buttonType` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_68b1048d444225fd29422a40ab2` (`subItemId`),
  CONSTRAINT `FK_68b1048d444225fd29422a40ab2` FOREIGN KEY (`subItemId`) REFERENCES `sub_item` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_sub_item`
--

LOCK TABLES `sub_sub_item` WRITE;
/*!40000 ALTER TABLE `sub_sub_item` DISABLE KEYS */;
INSERT INTO `sub_sub_item` VALUES ('e23e7fea-877b-4a0b-83a5-758857dc569c','SS_Item-test','5ccfe169-e7a8-41b3-9a36-3db6bdbe9475','','Mix-Tab','Button-Test','Nev-Test','1',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-21 12:34:49.302000','2025-07-21 13:09:49.492000','admin','admin','Edit Button');
/*!40000 ALTER TABLE `sub_sub_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_sub_item_answer`
--

DROP TABLE IF EXISTS `sub_sub_item_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_sub_item_answer` (
  `id` varchar(36) NOT NULL,
  `subSubItemId` varchar(255) NOT NULL,
  `answerId` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_sub_item_answer`
--

LOCK TABLES `sub_sub_item_answer` WRITE;
/*!40000 ALTER TABLE `sub_sub_item_answer` DISABLE KEYS */;
/*!40000 ALTER TABLE `sub_sub_item_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_sub_sub_item`
--

DROP TABLE IF EXISTS `sub_sub_sub_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_sub_sub_item` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `subSubItemId` varchar(255) NOT NULL,
  `tier` varchar(255) NOT NULL,
  `layout` varchar(255) NOT NULL,
  `serialNumber` varchar(255) NOT NULL,
  `templateId` varchar(255) DEFAULT NULL,
  `templateText` varchar(255) DEFAULT NULL,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7889d645c39fc804f02319421b0` (`subSubItemId`),
  CONSTRAINT `FK_7889d645c39fc804f02319421b0` FOREIGN KEY (`subSubItemId`) REFERENCES `sub_sub_item` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_sub_sub_item`
--

LOCK TABLES `sub_sub_sub_item` WRITE;
/*!40000 ALTER TABLE `sub_sub_sub_item` DISABLE KEYS */;
INSERT INTO `sub_sub_sub_item` VALUES ('983d4cbc-dde3-4493-8897-9383ffc6efd1','SSS_Item-test','e23e7fea-877b-4a0b-83a5-758857dc569c','','Mix-Tab','1',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-21 12:35:15.162000','2025-07-21 13:08:45.660000','admin','admin');
/*!40000 ALTER TABLE `sub_sub_sub_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey-configs`
--

DROP TABLE IF EXISTS `survey-configs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey-configs` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey-configs`
--

LOCK TABLES `survey-configs` WRITE;
/*!40000 ALTER TABLE `survey-configs` DISABLE KEYS */;
/*!40000 ALTER TABLE `survey-configs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `template_button_map`
--

DROP TABLE IF EXISTS `template_button_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `template_button_map` (
  `id` varchar(36) NOT NULL,
  `itemId` varchar(255) NOT NULL,
  `dfGroupId` varchar(255) NOT NULL,
  `subitemId` varchar(255) NOT NULL,
  `subsubitemId` varchar(255) NOT NULL,
  `subsubsubitemId` varchar(255) NOT NULL,
  `serialNumber` int(11) NOT NULL,
  `buttonName` varchar(255) NOT NULL,
  `buttonAction` varchar(255) NOT NULL,
  `buttonType` varchar(255) NOT NULL,
  `navigationTo` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `template_button_map`
--

LOCK TABLES `template_button_map` WRITE;
/*!40000 ALTER TABLE `template_button_map` DISABLE KEYS */;
INSERT INTO `template_button_map` VALUES ('0513d82f-db27-4e2c-b187-582303ee8d21','5b4d27ea-bcc5-4e60-bf6d-d09abc86ff00','0ff1096c-c3dd-4302-88b2-bc76eb814247','5ccfe169-e7a8-41b3-9a36-3db6bdbe9475','e23e7fea-877b-4a0b-83a5-758857dc569c','983d4cbc-dde3-4493-8897-9383ffc6efd1',2,'f83f9943-a9bb-45cd-9c37-e2249006d860','Test-Action','P-Button','test2','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-30 18:39:23.475235','2025-07-30 18:39:23.475235','admin','admin'),('d606e479-9fa4-45b8-a777-bbf3e160dd1a','5b4d27ea-bcc5-4e60-bf6d-d09abc86ff00','0ff1096c-c3dd-4302-88b2-bc76eb814247','5ccfe169-e7a8-41b3-9a36-3db6bdbe9475','e23e7fea-877b-4a0b-83a5-758857dc569c','983d4cbc-dde3-4493-8897-9383ffc6efd1',1,'f83f9943-a9bb-45cd-9c37-e2249006d860','Test-Action','P-Button','test','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-30 18:38:26.820154','2025-07-30 18:44:00.193000','admin','admin');
/*!40000 ALTER TABLE `template_button_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templates`
--

DROP TABLE IF EXISTS `templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `templates` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templates`
--

LOCK TABLES `templates` WRITE;
/*!40000 ALTER TABLE `templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('a52c4775-308c-4d4c-b1ac-7894dac55a1d','admin','sajid.ict@gmail.com','$2b$10$c8SZ0fArCXx87D2DeC5cM..Lw4kTe/nzM42T/V0IzBuFPWezjDKpK','2025-07-06 15:53:11.054386','2025-07-06 15:53:11.054386'),('d21a8638-9c0e-43a0-a804-0d045126eebe','sajid','sajid.ict@gmail.com','$2b$10$9RUAEa6j0MBUbcsWB.wRfelKXQB5E4COONdSjZke0p1mpoAL9gvQG','2025-07-12 17:19:18.818471','2025-07-12 17:19:18.818471');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'mukut_feature_db'
--

--
-- Dumping routines for database 'mukut_feature_db'
--
/*!50003 DROP PROCEDURE IF EXISTS `GetDataGroup` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetDataGroup`()
BEGIN
    SELECT 
        md.serialNumber AS moduleSerial,
        md.name AS moduleName,
        app.serialNumber AS appSerial,
        app.name AS appName,
        menu.serialNumber AS menuSerial,
        menu.title AS menuTitle,
        item.serialNumber AS itemSerial,
        item.name AS itemName,
   --      si.serialNumber AS subItemSerial,
--         si.name AS subItemName,
--         ssi.name AS subSubItemName,
--         sssi.name as subsubsubItemName,
		md.id AS moduleid,
		app.id AS appid,
		menu.id AS menuid,
		item.id as itemid,
-- 		si.id as subitemid,
-- 		ssi.id as subsubitemid,
-- 		sssi.id as subsubsubitemid,
        fi.*
    FROM field fi 
	left JOIN item ON item.id = fi.itemId
	left JOIN menu ON menu.id = item.menuid
	left JOIN app ON app.id = menu.appid
    left join modules md on md.id=app.moduleid
--     left JOIN sub_item si ON item.id = si.itemId
--     left JOIN sub_sub_item ssi ON si.id = ssi.subItemId
-- 	left JOIN sub_sub_sub_item sssi ON ssi.id = sssi.subSubItemId
    ORDER BY 
        md.serialNumber,
        app.serialNumber,
        menu.serialNumber,
        item.serialNumber,
--         si.serialNumber,
--         ssi.serialNumber,
--         sssi.serialNumber,
        fi.serialNumber;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetDataPoint` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetDataPoint`()
BEGIN
      SELECT 
        md.serialNumber AS moduleSerial,
        md.name AS moduleName,
        app.serialNumber AS appSerial,
        app.name AS appName,
        menu.serialNumber AS menuSerial,
        menu.title AS menuTitle,
        item.serialNumber AS itemSerial,
        item.name AS itemName,
   --      si.serialNumber AS subItemSerial,
--         si.name AS subItemName,
--         ssi.name AS subSubItemName,
--         sssi.name as subsubsubItemName,
		md.id AS moduleid,
		app.id AS appid,
		menu.id AS menuid,
		item.id as itemid,
-- 		si.id as subitemid,
-- 		ssi.id as subsubitemid,
-- 		sssi.id as subsubsubitemid,
		fi.fieldgroupcode,
        dp.*
    FROM datapoint dp
    left join field fi on fi.id=dp.dpGroupCode
	left JOIN item ON item.id = dp.itemId
	left JOIN menu ON menu.id = item.menuid
	left JOIN app ON app.id = menu.appid
    left join modules md on md.id=app.moduleid
--     left JOIN sub_item si ON item.id = si.itemId
--     left JOIN sub_sub_item ssi ON si.id = ssi.subItemId
-- 	left JOIN sub_sub_sub_item sssi ON ssi.id = sssi.subSubItemId
    ORDER BY 
      --  md.serialNumber,
     --   app.serialNumber,
    --   menu.serialNumber,
        item.serialNumber,
        dp.serialNumber,
--         si.serialNumber,
--         ssi.serialNumber,
--         sssi.serialNumber,
        fi.serialNumber;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getDataPointmapsBySP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getDataPointmapsBySP`()
BEGIN
SELECT 
    fi.fieldGroupCode,
    fi.name,
    dp.dataPoint AS datapoint,
    i.name as itemName,
    dtm.*,
    md.id as moduleid,
    app.id as appid,
    menu.id as menuid,
	md.name AS moduleName,
	app.name AS appName,
	menu.title AS menuTitle
FROM datapointmap dtm
INNER JOIN field fi ON dtm.dpgroupid = fi.id
INNER JOIN datapoint dp ON dtm.datapointid  = dp.id
INNER JOIN item i ON dtm.itemId = i.id
INNER JOIN menu  ON menu.id  =i.menuid
INNER JOIN app ON app.id  = menu.appid
INNER JOIN modules md ON md.id  = app.moduleid

LIMIT 0, 10000;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetDPGroupMap` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetDPGroupMap`()
BEGIN
SELECT item.name as itemName,si.name as subItemName,ssi.name as subSubItemName,sssi.name as subsubsubItemName,field.fieldGroupCode,dgm.* ,
    md.id as moduleid,
    app.id as appid,
    menu.id as menuid,
	si.id as subitemid,
    ssi.id as subsubitemid,
    sssi.id as subsubsubitemid,
	md.name AS moduleName,
	app.name AS appName,
	menu.title AS menuTitle

FROM dpgroupmap dgm
inner join item on item.id=dgm.itemId
inner join field on field.id=dgm.dpGroupId
INNER JOIN menu  ON menu.id  =item.menuid
INNER JOIN app ON app.id  = menu.appid
INNER JOIN modules md ON md.id  = app.moduleid
left join sub_item si on dgm.subItemId=si.id
left join sub_sub_item ssi on dgm.subSubItemId=ssi.id
left join sub_sub_sub_item sssi on dgm.subSubSubItemId=sssi.id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Getsubitemdata` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Getsubitemdata`()
BEGIN
    SELECT 
        m.serialNumber AS moduleSerial,
        m.name AS moduleName,
		m.id AS moduleid,
		app.id AS appid,
		menu.id AS menuid,
        i.id as itemid,
        app.serialNumber AS appSerial,
        app.name AS appName,
        menu.serialNumber AS menuSerial,
        menu.title AS menuTitle,
        i.name as itemName,
        si.*
    FROM sub_item si
    left join item i on i.id=si.itemid
	left JOIN menu ON menu.id = i.menuId
	left JOIN app ON app.id = menu.appId
    left join modules m on m.id=app.moduleId
    ORDER BY 
        m.serialNumber,
        app.serialNumber,
        menu.serialNumber,
        i.serialNumber,
        si.serialNumber;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Getsubsubitemdata` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Getsubsubitemdata`()
BEGIN
    SELECT 
        m.serialNumber AS moduleSerial,
		m.id AS moduleid,
        m.name AS moduleName,
        app.serialNumber AS appSerial,
		app.id AS appid,
        app.name AS appName,
        menu.serialNumber AS menuSerial,
		menu.id AS menuid,
        menu.title AS menuTitle,
		i.id as itemid,
        i.name as itemName,
		si.id as subitemid,
        si.name as subitem,
        ssi.*
    FROM sub_sub_item ssi
	left join sub_item si on si.id=ssi.subItemId
    left join item i on i.id=si.itemid
	left JOIN menu ON menu.id = i.menuId
	left JOIN app ON app.id = menu.appId
    left join modules m on m.id=app.moduleId
    ORDER BY 
        m.serialNumber,
        app.serialNumber,
        menu.serialNumber,
        i.serialNumber,
        si.serialNumber,
        ssi.serialNumber;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Getsubsubsubitemdata` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Getsubsubsubitemdata`()
BEGIN
    SELECT 
        m.serialNumber AS moduleSerial,
        m.name AS moduleName,
        app.serialNumber AS appSerial,
        app.name AS appName,
        menu.serialNumber AS menuSerial,
        menu.title AS menuTitle,
        i.name as itemName,
        si.name as subitem,
        ssi.name as subsubitem,
		m.id AS moduleid,
		app.id AS appid,
		menu.id AS menuid,
		i.id as itemid,
		si.id as subitemid,
		ssi.id as subsubitemid,
        sssi.*
    FROM sub_sub_sub_item sssi
	left join sub_sub_item ssi on ssi.id=sssi.subSubItemId
	left join sub_item si on si.id=ssi.subItemId
    left join item i on i.id=si.itemid
	left JOIN menu ON menu.id = i.menuId
	left JOIN app ON app.id = menu.appId
    left join modules m on m.id=app.moduleId
    ORDER BY 
        m.serialNumber,
        app.serialNumber,
        menu.serialNumber,
        i.serialNumber,
        si.serialNumber,
        ssi.serialNumber,
        sssi.serialNumber;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetTemplateButtonMap` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTemplateButtonMap`()
BEGIN
SELECT md.id as moduleid,	md.name AS moduleName,
	app.name AS appName,
	menu.title AS menuTitle,app.id as appid,menu.id as menuid,item.name as itemName,field.fieldGroupCode,field.tier,field.displayType,
si.name as subItemName,ssi.name as subSubItemName,sssi.name as subsubsubItemName,
si.id as subitemid,
ssi.id as subsubitemid,
sssi.id as subsubsubitemid,
button.name as buttonNameDisplay,button.buttonAction as buttonAction,
tb.* FROM mukut_feature_db.template_button_map tb
inner join item on tb.itemId=item.id
inner join button on button.id=tb.buttonName
inner JOIN menu ON menu.id = item.menuid
inner JOIN app ON app.id = menu.appid
inner join modules md on md.id=app.moduleid
inner join field on field.id=tb.dfGroupId
left join sub_item si on si.itemid=item.id
left join sub_sub_item ssi on ssi.subItemId=si.id
left join sub_sub_sub_item sssi on sssi.subSubItemId=ssi.id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ItemsData` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ItemsData`()
BEGIN
    SELECT 
        m.serialNumber AS moduleSerial,
        m.name AS moduleName,
		m.id AS moduleid,
		app.id AS appid,
		menu.id AS menuid,
        app.serialNumber AS appSerial,
        app.name AS appName,
        menu.serialNumber AS menuSerial,
        menu.title AS menuTitle,
        item.*
    FROM item
	left JOIN menu ON menu.id = item.menuId
	left JOIN app ON app.id = menu.appId
    left join modules m on m.id=app.moduleId
    ORDER BY 
        m.serialNumber,
        app.serialNumber,
        menu.serialNumber,
        item.serialNumber;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `menuData` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `menuData`()
BEGIN
    SELECT 
        m.serialNumber AS moduleSerial,
		m.id AS moduleid,
		app.id AS appid,
        m.name AS moduleName,
        app.serialNumber AS appSerial,
        app.name AS appName,
        menu.*
    FROM menu
	left JOIN app ON app.id = menu.appId
    left join modules m on m.id=app.moduleId
    ORDER BY 
        m.serialNumber,
        app.serialNumber,
        menu.serialNumber;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ReportData` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ReportData`()
BEGIN
    SELECT 
        md.serialNumber as moduleserialNumber,md.name as modulename,
        app.serialNumber as appserialNumber, app.name as appname,
        menu.serialNumber as menuserialNumber,
        menu.title,
        item.serialNumber as itemserialNumber,item.name as itemName,item.itemType as itemType,item.buttonType as regName,item.buttonLabel as itemViewEntry,item.description as itemdescription,
        si.serialNumber as siserialNumber,si.name as siitem,si.layout as silayout,si.description as sidescription,si.buttonLabel as sibuttonLabel, si.navigationTo as sisinavigationTo,
        ssi.serialNumber as ssiserialNumber,ssi.name as ssiname,ssi.layout as ssilayout,ssi.buttonLabel as ssibuttonLabel,ssi.navigationTo as ssinavigationTo,
        sssi.serialNumber as sssiserialNumber,sssi.name as sssiname,sssi.layout as sssilayout,
        fi.serialNumber as groupserialNumber,fi.fieldGroupCode,
        fi.id as dpgroupid,
        fi.tier as dpgrouptier,fi.displayType as dpgroupdisplay,fi.description as dpgroupremarks,
        dp.*
    FROM modules md 
    left JOIN app ON md.id = app.moduleId
    left JOIN menu ON app.id = menu.appId
    left JOIN item ON menu.id = item.menuId
    left JOIN sub_item si ON item.id = si.itemId
    left JOIN sub_sub_item ssi ON si.id = ssi.subItemId
	left JOIN sub_sub_sub_item sssi ON ssi.id = sssi.subSubItemId
	left JOIN field fi ON fi.itemId = item.id
	left JOIN datapoint dp ON dp.itemid = item.id
    ORDER BY 
        md.serialNumber,
        app.serialNumber,
        menu.serialNumber,
        item.serialNumber,
        si.serialNumber,
        ssi.serialNumber,
        sssi.serialNumber,
        fi.serialNumber;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-31 13:00:10
