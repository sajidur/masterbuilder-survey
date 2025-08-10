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
INSERT INTO `button` VALUES ('31e79321-ce90-421b-8b12-dc303393e376','Search','8','Utility Tool','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-03 16:12:28.369000','2025-08-03 16:12:28.369000','admin','admin'),('8417f9ae-34da-4bbe-9893-770068d33c40','Bookmark','11','Favorite','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-03 16:52:48.037000','2025-08-03 16:52:48.037000','admin','admin'),('8443f459-fdc4-492d-9d51-b95e5ec5d59e','Edit','3','Modify','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-03 16:03:55.082000','2025-08-03 16:03:55.082000','admin','admin'),('963fa5f2-43a6-4734-8ccc-8bb5597830cd','Help','13','System Guide','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-03 16:56:12.112000','2025-08-03 16:56:27.000000','admin','admin'),('9b18441d-09ee-4cb8-8529-1a6528284e50','Settings','9','System Setting','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-03 16:13:19.321000','2025-08-03 16:13:19.321000','admin','admin'),('9dda2846-909b-4e82-9fb3-1e59594bd973','Print','5','Output','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-03 16:10:56.208000','2025-08-03 16:10:56.208000','admin','admin'),('b32faf1f-98e7-4fed-906d-a28f53cd533f','Export','7','Utility Tool','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-03 16:12:07.444000','2025-08-03 16:12:07.444000','admin','admin'),('bf19b921-f0d4-4c49-9d56-987fac664b56','View','4','Display','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-03 16:10:39.445000','2025-08-03 16:10:39.445000','admin','admin'),('bfc7100d-4c4c-42a2-8cb2-ce5e8c855323','Notification','12','Utility Tool','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-03 16:55:38.569000','2025-08-03 16:55:38.569000','admin','admin'),('c2e7d5b1-0385-4f80-825c-6caa4368d523','Import','6','Utility Tool','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-03 16:11:50.235000','2025-08-03 16:11:50.235000','admin','admin'),('d0b4cb36-ca4e-40d0-8bca-d4412228ce0c','Home','10','Welcome Page','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-03 16:13:38.714000','2025-08-03 16:13:38.714000','admin','admin'),('d5fdc06c-56f5-475c-8f69-829740d9c92c','Save','2','Store','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-03 16:03:36.195000','2025-08-03 16:03:36.195000','admin','admin'),('e06eb4d6-ac63-4ee8-bc4a-a9ef293bad7e','New','1','Create','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-03 16:03:22.641000','2025-08-03 16:03:22.641000','admin','admin'),('f83f9943-a9bb-45cd-9c37-e2249006d860','Test-Button-01','0','Test-Action','','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-30 17:49:49.683000','2025-08-03 16:02:10.000000','admin','admin');
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
INSERT INTO `datapoint` VALUES ('01bcbaea-2ce4-4b60-b6a9-c6d9ef69813b','5cb5187b-a92e-4540-930d-3be3ca46668a','0','Account Code','1','number','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 14:11:17.000000','2025-08-06 14:11:17.000000','admin','admin','All'),('09fa367b-e884-4c44-9a8e-466a8bb53087','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Paid To','8','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 16:33:04.000000','2025-08-07 14:36:19.000000','admin','admin','All'),('0c6358d2-a405-4f14-8703-475cd413d8e2','a323c849-587c-4939-986e-ac274ee2aaef','0','Company Type','3','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 13:35:42.000000','2025-08-06 13:35:42.000000','admin','admin','All'),('0f939cf2-a7e6-4546-bcf1-d9a84769aa77','996f270f-5858-4553-9470-3dddadedc890','0','Reporting','10','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',1,0,'2025-07-31 19:37:20.000000','2025-07-31 19:37:20.000000','admin','admin','All'),('0fc483cf-c504-4afc-84f0-e095f5ff51fa','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Attachments','28','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-07 13:44:27.000000','2025-08-07 14:38:24.000000','admin','admin','All'),('15fdc68e-c0a1-44ec-9ccd-35b7e23d10e9','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Description','26','text','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-07 13:43:00.000000','2025-08-07 14:38:03.000000','admin','admin','All'),('181285bb-e3d0-4204-98f6-332d6919c043','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Contra Type','2','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 16:30:14.000000','2025-08-07 14:35:37.000000','admin','admin','All'),('22172170-8250-4d93-bb0f-12b35f4114b4','996f270f-5858-4553-9470-3dddadedc890','0','Branch Name','7','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-30 18:04:29.000000','2025-07-31 19:27:41.000000','admin','admin','All'),('226f4ba9-0440-48f7-be4d-d1752370a176','a323c849-587c-4939-986e-ac274ee2aaef','0','Company Name','2','text','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 13:35:21.000000','2025-08-06 13:35:21.000000','admin','admin','All'),('2a32b14b-31cc-4675-a5bc-a6f71fc791ed','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Voucher Date','5','date','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 16:31:53.000000','2025-08-07 14:35:57.000000','admin','admin','All'),('3393f709-0103-41d7-954e-1f7228b0e439','e93e00f2-7bf3-4086-9f21-136407c13ef1','0','Currency Name','1','text','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 13:16:51.000000','2025-08-06 13:16:51.000000','admin','admin','All'),('34e2438d-d6ad-4e49-894f-3df06942b9b6','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Payment From','17','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-07 13:22:19.000000','2025-08-07 14:37:10.000000','admin','admin','All'),('3b96f83d-c838-46b3-8104-229a79d974a9','9994f272-6709-4608-9fa2-b1f61f4049c4','0','Currency Name','1','text','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 13:10:54.000000','2025-08-06 13:10:54.000000','admin','admin','All'),('3b983ea0-d539-4e0e-8824-25a1f160f94f','e93e00f2-7bf3-4086-9f21-136407c13ef1','0','Symbol','2','text','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:17:13.000000','2025-08-06 13:17:13.000000','admin','admin','All'),('3ccad696-34c0-4a29-9853-d46b6551d93d','61ddbc58-8b74-4b7a-8d55-06b9b629250c','0','Account Name','2','text','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 15:49:09.000000','2025-08-06 15:49:09.000000','admin','admin','All'),('43258ea3-78b2-4ff2-8594-a334262027d1','5b4d27ea-bcc5-4e60-bf6d-d09abc86ff00','0','Test-Field-2','2','text','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-03 15:40:07.000000','2025-08-03 15:40:07.000000','admin','admin','All'),('45a80c8a-01e5-443c-914c-1870bddcf8fe','61ddbc58-8b74-4b7a-8d55-06b9b629250c','0','Link with Con. CoA','7','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 15:50:38.000000','2025-08-06 15:50:38.000000','admin','admin','All'),('47502e41-eb51-41e4-a569-bc3bec12e214','61ddbc58-8b74-4b7a-8d55-06b9b629250c','0','Account Type','3','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 15:49:20.000000','2025-08-06 15:49:26.000000','admin','admin','All'),('4906071f-35a9-4c71-a0b4-b710a0320e75','9994f272-6709-4608-9fa2-b1f61f4049c4','0','Link','4','text','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:12:06.000000','2025-08-06 13:12:06.000000','admin','admin','All'),('4b9b48b9-edf0-4feb-9644-46a929c0f5da','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Received from','6','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 16:32:16.000000','2025-08-07 14:36:04.000000','admin','admin','All'),('51bac85a-59e8-41b2-94c0-04d3ed270242','61ddbc58-8b74-4b7a-8d55-06b9b629250c','0','Initial Balance','5','number','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 15:49:53.000000','2025-08-06 15:49:53.000000','admin','admin','All'),('5246d84c-c6b2-4486-84d7-4866afc2b923','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Bank Name','20','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-07 13:23:29.000000','2025-08-07 14:37:27.000000','admin','admin','All'),('57557edb-93d9-45d5-955b-cd99468fee5d','a323c849-587c-4939-986e-ac274ee2aaef','0','Designation','8','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 13:49:16.000000','2025-08-06 13:49:16.000000','admin','admin','All'),('5c9eb628-a8e9-4588-bbf0-2eadebd1a16b','e93e00f2-7bf3-4086-9f21-136407c13ef1','0','Base Currency Set','3','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 13:18:03.000000','2025-08-06 13:18:03.000000','admin','admin','All'),('5cc3fb71-b0e2-4de6-8e52-da0e65908de5','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Payment Mode','16','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-07 13:22:08.000000','2025-08-07 14:37:03.000000','admin','admin','All'),('6c10bbb3-65cf-4a57-8047-3852ebbfc08a','a323c849-587c-4939-986e-ac274ee2aaef','0','Company Code','1','number','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 13:35:06.000000','2025-08-06 13:35:06.000000','admin','admin','All'),('70334e3a-7b62-4283-9b97-075c47e1e874','a323c849-587c-4939-986e-ac274ee2aaef','0','	Reporting','9','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 13:40:29.000000','2025-08-06 13:49:23.000000','admin','admin','All'),('714f0e75-b257-4ad6-9ea9-b60bd3392985','5cb5187b-a92e-4540-930d-3be3ca46668a','0','Account Type','3','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 14:12:32.000000','2025-08-06 14:12:32.000000','admin','admin','All'),('721cb026-1160-46bf-86a7-f21f4a06dfbe','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Withdrawn By','10','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 16:34:17.000000','2025-08-07 14:36:30.000000','admin','admin','All'),('7979e5c1-93f2-4543-9692-1cf289f2b037','5b4d27ea-bcc5-4e60-bf6d-d09abc86ff00','0','Test-Field-1','1','text','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-03 15:39:49.000000','2025-08-03 15:40:14.000000','admin','admin','All'),('79e6134f-2d56-4478-84ab-9bcb575dadf3','61ddbc58-8b74-4b7a-8d55-06b9b629250c','0','Assign Currency','6','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 15:50:16.000000','2025-08-06 15:50:16.000000','admin','admin','All'),('7ac374d7-9e59-4661-a475-9f16a6b0608a','996f270f-5858-4553-9470-3dddadedc890','0','Company Code','3','number','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-07-28 15:21:33.000000','2025-07-30 17:58:25.000000','admin','admin','All'),('7de9281a-87af-4912-a8c1-8ad6da590917','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Received In','15','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-07 13:21:15.000000','2025-08-07 14:36:58.000000','admin','admin','All'),('7ee946a8-0e76-4230-8f37-4993eecd8f9e','996f270f-5858-4553-9470-3dddadedc890','0','Company Name','1','text','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-07-28 14:14:05.000000','2025-07-31 16:06:46.000000','admin','admin','All'),('85084775-29a9-4f92-b431-df234ac40235','996f270f-5858-4553-9470-3dddadedc890','0','Link Company','5','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',1,0,'2025-07-31 19:28:34.000000','2025-07-31 19:28:34.000000','admin','admin','All'),('850df8d5-6aa2-4111-be88-9305393abd19','5cb5187b-a92e-4540-930d-3be3ca46668a','0','Actions','7','boolean','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 14:13:44.000000','2025-08-06 14:13:44.000000','admin','admin','All'),('86bb3f3f-1020-46e4-8d1e-0252c614f75c','996f270f-5858-4553-9470-3dddadedc890','0','Company Type','4','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-07-30 17:58:44.000000','2025-07-30 18:03:37.000000','admin','admin','All'),('877d9317-fb42-432e-a3e8-0da7f9c31a27','a323c849-587c-4939-986e-ac274ee2aaef','0','Link Company','4','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 13:36:27.000000','2025-08-06 13:43:04.000000','admin','admin','All'),('8eb7d7f4-fcbf-4d15-ac7d-8bbcc4717422','61ddbc58-8b74-4b7a-8d55-06b9b629250c','0','Tags','8','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 15:50:52.000000','2025-08-06 15:50:52.000000','admin','admin','All'),('9d350971-0176-4fcc-b518-2526b9eeb200','9994f272-6709-4608-9fa2-b1f61f4049c4','0','Symbol','2','text','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:11:09.000000','2025-08-06 13:11:09.000000','admin','admin','All'),('9d6e8709-5b4d-419f-bc05-b639b758a7a7','5cb5187b-a92e-4540-930d-3be3ca46668a','0','Account Name','2','text','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 14:11:26.000000','2025-08-06 14:11:26.000000','admin','admin','All'),('9de09514-037f-4b86-a1af-137e4e2bae25','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Deposit To','12','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 16:34:38.000000','2025-08-07 14:36:40.000000','admin','admin','All'),('a3c38171-214e-4588-9823-146c74396434','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Received By','7','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 16:32:35.000000','2025-08-07 14:36:12.000000','admin','admin','All'),('a43180eb-286b-4107-9d52-050f94548bdd','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Voucher Type','1','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 16:29:59.000000','2025-08-07 14:35:28.000000','admin','admin','All'),('a572b527-f6ba-4baa-88da-d04e6e39ecfc','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Instrument No.','22','number','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-07 13:24:41.000000','2025-08-07 14:37:38.000000','admin','admin','All'),('af798f30-ae38-4332-8bd8-995c8c7fcc57','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Withdrawn From','13','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 16:34:55.000000','2025-08-07 14:36:45.000000','admin','admin','All'),('b102c571-86b9-4019-bb52-dad16d5b5bd7','5cb5187b-a92e-4540-930d-3be3ca46668a','0','Tags','8','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 14:13:55.000000','2025-08-06 14:13:55.000000','admin','admin','All'),('b1a1b435-ccd3-4101-b070-b25a4e4ce66e','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Instrument Date','23','date','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-07 13:24:59.000000','2025-08-07 14:37:45.000000','admin','admin','All'),('b49572a7-916c-4787-af67-1424547f5b45','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Deposit Date','24','date','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-07 13:41:52.000000','2025-08-07 14:37:50.000000','admin','admin','All'),('b5ac627b-8d1e-41e6-9ef3-34f3b54e9b0a','9994f272-6709-4608-9fa2-b1f61f4049c4','0','Status','5','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 13:12:18.000000','2025-08-06 13:12:18.000000','admin','admin','All'),('b6dac4cb-373b-4055-a7ca-8da39bf7d26e','a323c849-587c-4939-986e-ac274ee2aaef','0','Location','5','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 13:43:15.000000','2025-08-06 13:43:15.000000','admin','admin','All'),('b9250e93-6737-4969-9934-a62177e25065','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Debit Ledger','18','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-07 13:22:48.000000','2025-08-07 14:37:16.000000','admin','admin','All'),('b9f9aa91-6ab5-4f27-a6da-7554763f164b','996f270f-5858-4553-9470-3dddadedc890','0','Department','8','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-30 18:05:10.000000','2025-07-31 19:27:35.000000','admin','admin','All'),('bb1f0a82-ce2f-4403-9d76-f3d19ed98dbb','a323c849-587c-4939-986e-ac274ee2aaef','0','Department','7','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 13:39:49.000000','2025-08-06 13:42:23.000000','admin','admin','All'),('bd0b4570-e8dd-482b-afcf-2a3460ede23c','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Tag','27','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-07 13:43:12.000000','2025-08-07 14:38:19.000000','admin','admin','All'),('bd708196-86a6-458d-b0df-a7556764ae5e','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Voucher No.','4','number','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 16:31:34.000000','2025-08-07 14:35:51.000000','admin','admin','All'),('c1930e46-c3c0-409d-ab3c-af34e5d9cd5e','5cb5187b-a92e-4540-930d-3be3ca46668a','0','Initial Balance','5','number','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 14:12:59.000000','2025-08-06 14:12:59.000000','admin','admin','All'),('c3693940-34b4-42a5-a681-a276996929ff','5cb5187b-a92e-4540-930d-3be3ca46668a','0','Financial Reporting','4','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 14:12:44.000000','2025-08-06 14:12:44.000000','admin','admin','All'),('cade020e-d637-4926-a1e9-dfda89ee9795','61ddbc58-8b74-4b7a-8d55-06b9b629250c','0','Account Code','1','number','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 15:49:00.000000','2025-08-06 15:49:00.000000','admin','admin','All'),('cf0cd839-dc79-4173-9ba7-b0fdf9d30086','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Journal Type','3','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 16:30:38.000000','2025-08-07 14:35:44.000000','admin','admin','All'),('d3028ea2-2e01-4929-abc8-b3be7945e7d1','5cb5187b-a92e-4540-930d-3be3ca46668a','0','Link with Con. CoA','6','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 14:13:24.000000','2025-08-06 14:13:24.000000','admin','admin','All'),('da6b1db2-5c9a-4e0e-8d11-964a7943c331','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Paid By','9','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 16:33:13.000000','2025-08-07 14:36:24.000000','admin','admin','All'),('dc979882-d399-4c2d-9a46-af69825fc38f','a323c849-587c-4939-986e-ac274ee2aaef','0','Branch','6','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:39:05.000000','2025-08-06 13:42:27.000000','admin','admin','All'),('dd63857a-3571-461c-9ffb-226827c99f44','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Amount','25','number','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-07 13:42:39.000000','2025-08-07 14:37:57.000000','admin','admin','All'),('de293687-0a7a-4b43-b56b-03dfe6d6cb42','9994f272-6709-4608-9fa2-b1f61f4049c4','0','Update Rule','3','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:11:37.000000','2025-08-06 13:11:53.000000','admin','admin','All'),('e6d866bf-3709-434f-b641-ceba3cbac2fd','996f270f-5858-4553-9470-3dddadedc890','0','Location','6','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-07-30 18:03:59.000000','2025-07-31 19:27:50.000000','admin','admin','All'),('e875ca48-e3bd-41ed-870e-2b79494ced11','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Credit Ledger','19','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-07 13:23:00.000000','2025-08-07 14:37:23.000000','admin','admin','All'),('e91a5bc2-1f86-4f0a-b700-29eb00c8339d','61ddbc58-8b74-4b7a-8d55-06b9b629250c','0','Financial Reporting','4','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-06 15:49:37.000000','2025-08-06 15:49:37.000000','admin','admin','All'),('ef43a60f-0c61-4ce3-bc06-2fd527eee2a8','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Branch','21','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-07 13:23:58.000000','2025-08-07 14:37:33.000000','admin','admin','All'),('f89165ef-dc03-4c6a-872a-8eb257e8aae1','996f270f-5858-4553-9470-3dddadedc890','0','Designation','9','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-30 18:06:49.000000','2025-07-31 19:35:49.000000','admin','admin','All'),('f898c4de-df5e-4e9d-8004-b4781e3d2887','996f270f-5858-4553-9470-3dddadedc890','0','Company Logo','2','text','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-28 14:11:06.000000','2025-07-31 16:07:03.000000','admin','admin','All'),('f99c0b73-e6cf-4f89-90c9-0e0b11c2d349','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Received Mode','14','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,1,'2025-08-07 13:20:20.000000','2025-08-07 14:36:51.000000','admin','admin','All'),('fe54c87e-da65-48c5-8fef-98357b7ed431','eebc0ad6-3c6e-4add-87c5-45b0c4229121','0','Deposit By','11','dropdown','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 16:34:24.000000','2025-08-07 14:36:35.000000','admin','admin','All');
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
INSERT INTO `datapointmap` VALUES ('068b23ef-3ab5-48ae-aa9c-37602a983286','996f270f-5858-4553-9470-3dddadedc890','62dedd8f-dd4d-4901-b6f5-735fda7fc229','22172170-8250-4d93-bb0f-12b35f4114b4',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-03 15:37:54.000000','2025-08-03 15:37:54.000000','admin','admin'),('15ea6696-b840-454a-9d4b-ebb149ae354c','5cb5187b-a92e-4540-930d-3be3ca46668a','1c6b38f5-28ff-4f6f-a5ce-d63343ec3631','01bcbaea-2ce4-4b60-b6a9-c6d9ef69813b',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 14:14:16.000000','2025-08-06 14:14:16.000000','admin','admin'),('185c48fa-5e32-4de3-9575-4cc2adb10e28','9994f272-6709-4608-9fa2-b1f61f4049c4','f4e27717-b93c-4e83-8f2d-c83cc862b1e9','de293687-0a7a-4b43-b56b-03dfe6d6cb42',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:12:54.000000','2025-08-06 13:12:54.000000','admin','admin'),('197576ff-6bc8-4501-8aba-008773ccdbdd','5cb5187b-a92e-4540-930d-3be3ca46668a','1c6b38f5-28ff-4f6f-a5ce-d63343ec3631','c3693940-34b4-42a5-a681-a276996929ff','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',1,0,'2025-08-06 14:14:27.000000','2025-08-06 15:48:03.000000','admin','admin'),('19c2a31e-05c0-48ea-af4d-a5483343c6e6','a323c849-587c-4939-986e-ac274ee2aaef','af7656ca-37e7-4607-8a06-64644576378c','0c6358d2-a405-4f14-8703-475cd413d8e2',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:41:35.000000','2025-08-06 13:41:35.000000','admin','admin'),('1dd991ac-9191-43bc-910e-f98b86eb1327','a323c849-587c-4939-986e-ac274ee2aaef','e20f4590-cd34-435c-a3f7-3cbf2211302d','dc979882-d399-4c2d-9a46-af69825fc38f',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:48:21.000000','2025-08-06 13:48:21.000000','admin','admin'),('1fb04d3c-724c-42f7-8165-4433913d91a0','9994f272-6709-4608-9fa2-b1f61f4049c4','f4e27717-b93c-4e83-8f2d-c83cc862b1e9','4906071f-35a9-4c71-a0b4-b710a0320e75',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:13:01.000000','2025-08-06 13:13:01.000000','admin','admin'),('22fe2b40-51df-499d-b007-8c027aab5971','996f270f-5858-4553-9470-3dddadedc890','ca11b6ca-e628-4f57-8bb2-8582772a7a90','30238a17-27fc-4a59-b537-7d09af417ea5','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-24 18:03:38.000000','2025-07-24 18:03:48.000000','admin','admin'),('24c72bc2-1ba8-4af1-9f96-08f361aa093b','996f270f-5858-4553-9470-3dddadedc890','62dedd8f-dd4d-4901-b6f5-735fda7fc229','e6d866bf-3709-434f-b641-ceba3cbac2fd',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 12:37:05.000000','2025-08-06 12:37:05.000000','admin','admin'),('24d4ed05-5412-4809-ad39-52a8a2d9ac56','a323c849-587c-4939-986e-ac274ee2aaef','bcc13e3b-600d-4c60-967e-b91a8d6a8fe3','226f4ba9-0440-48f7-be4d-d1752370a176',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:43:44.000000','2025-08-06 13:43:44.000000','admin','admin'),('282e34bd-9ca8-4b43-9c44-cdfea9607520','e93e00f2-7bf3-4086-9f21-136407c13ef1','15c2e9cb-606e-444a-868b-33320c24a504','3b983ea0-d539-4e0e-8824-25a1f160f94f',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:20:14.000000','2025-08-06 13:20:14.000000','admin','admin'),('2a56d189-f503-4aa8-895a-f68055e51c6f','996f270f-5858-4553-9470-3dddadedc890','e2e05f1f-bd3e-462b-85b1-d0cc99413a4d','7ee946a8-0e76-4230-8f37-4993eecd8f9e','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 12:36:34.000000','2025-08-06 12:37:23.000000','admin','admin'),('32d0cb06-f2e5-4f90-9fda-8f0f1b48e64a','996f270f-5858-4553-9470-3dddadedc890','e2e05f1f-bd3e-462b-85b1-d0cc99413a4d','85084775-29a9-4f92-b431-df234ac40235',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 12:37:11.000000','2025-08-06 12:37:11.000000','admin','admin'),('35c5e490-d3c5-49b0-bfc3-dbccaeceaa58','5cb5187b-a92e-4540-930d-3be3ca46668a','1c6b38f5-28ff-4f6f-a5ce-d63343ec3631','9d6e8709-5b4d-419f-bc05-b639b758a7a7',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 14:14:21.000000','2025-08-06 14:14:21.000000','admin','admin'),('39d3e87c-996d-44f5-b223-14856897720e','a323c849-587c-4939-986e-ac274ee2aaef','0c86d624-4246-4c7e-bf5d-bd1b99446a3c','70334e3a-7b62-4283-9b97-075c47e1e874',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:51:30.000000','2025-08-06 13:51:30.000000','admin','admin'),('3a0d509c-c961-46e5-8c38-53f2eb9d429e','996f270f-5858-4553-9470-3dddadedc890','a5dd2be0-9d2c-4ae7-bee3-b9d799b80958','7ee946a8-0e76-4230-8f37-4993eecd8f9e',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-03 15:34:05.000000','2025-08-03 15:34:05.000000','admin','admin'),('3cf9aade-e494-4ba1-97af-e9f83f09cd2c','9994f272-6709-4608-9fa2-b1f61f4049c4','f4e27717-b93c-4e83-8f2d-c83cc862b1e9','9d350971-0176-4fcc-b518-2526b9eeb200',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:12:49.000000','2025-08-06 13:12:49.000000','admin','admin'),('3db1472e-dae9-4e42-82e9-4fdecff1e587','a323c849-587c-4939-986e-ac274ee2aaef','04b1c2eb-a3cf-426b-8151-ebbbfac4c588','dc979882-d399-4c2d-9a46-af69825fc38f','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:45:22.000000','2025-08-06 13:46:36.000000','admin','admin'),('3dc5028d-e0ba-4d56-a2c4-96eaf1c5ed61','a323c849-587c-4939-986e-ac274ee2aaef','af7656ca-37e7-4607-8a06-64644576378c','877d9317-fb42-432e-a3e8-0da7f9c31a27',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:41:45.000000','2025-08-06 13:41:45.000000','admin','admin'),('4bfd2c6e-1ab0-4ebf-971e-97c18389b2c0','996f270f-5858-4553-9470-3dddadedc890','e2e05f1f-bd3e-462b-85b1-d0cc99413a4d','7ac374d7-9e59-4661-a475-9f16a6b0608a','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 12:36:42.000000','2025-08-06 12:37:31.000000','admin','admin'),('4c432bc5-da68-4e45-9c9f-484096184d62','996f270f-5858-4553-9470-3dddadedc890','3f4195f0-d2b5-43ee-8f44-1fc6ddee460b','7ee946a8-0e76-4230-8f37-4993eecd8f9e',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-03 17:59:14.000000','2025-08-03 17:59:14.000000','admin','admin'),('4dce4def-2b99-4fad-a24c-c4c872efa93d','9994f272-6709-4608-9fa2-b1f61f4049c4','f4e27717-b93c-4e83-8f2d-c83cc862b1e9','b5ac627b-8d1e-41e6-9ef3-34f3b54e9b0a',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:13:05.000000','2025-08-06 13:13:05.000000','admin','admin'),('4e2b6963-66b0-47f8-bda9-1f1a9fd4d162','996f270f-5858-4553-9470-3dddadedc890','a5dd2be0-9d2c-4ae7-bee3-b9d799b80958','22172170-8250-4d93-bb0f-12b35f4114b4','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-31 19:24:09.000000','2025-08-03 15:32:55.000000','admin','admin'),('56166cc4-08d0-4e5a-b5f0-1c9c25887a91','996f270f-5858-4553-9470-3dddadedc890','a6e8a917-4d27-4f0b-8268-c477b768845b','7ac374d7-9e59-4661-a475-9f16a6b0608a',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-30 18:09:28.000000','2025-07-30 18:09:28.000000','admin','admin'),('5759318b-9c48-46dd-99df-359909f1939f','a323c849-587c-4939-986e-ac274ee2aaef','e20f4590-cd34-435c-a3f7-3cbf2211302d','57557edb-93d9-45d5-955b-cd99468fee5d',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:49:45.000000','2025-08-06 13:49:45.000000','admin','admin'),('653772ae-3eb9-4208-bf24-236f3fa564c3','a323c849-587c-4939-986e-ac274ee2aaef','0c86d624-4246-4c7e-bf5d-bd1b99446a3c','dc979882-d399-4c2d-9a46-af69825fc38f',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:50:39.000000','2025-08-06 13:50:39.000000','admin','admin'),('6c3c07e3-b76f-4d87-a716-b2e0f3d1b585','996f270f-5858-4553-9470-3dddadedc890','f93ecd0e-914f-404d-b26b-f310a52843ef','22172170-8250-4d93-bb0f-12b35f4114b4','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-31 19:23:16.000000','2025-07-31 20:00:17.000000','admin','admin'),('7059abea-684a-45ee-afab-914ecb968c7a','a323c849-587c-4939-986e-ac274ee2aaef','af7656ca-37e7-4607-8a06-64644576378c','226f4ba9-0440-48f7-be4d-d1752370a176',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:40:58.000000','2025-08-06 13:40:58.000000','admin','admin'),('70b9379d-243f-4b7a-a8f8-93e85d0f09aa','9994f272-6709-4608-9fa2-b1f61f4049c4','f4e27717-b93c-4e83-8f2d-c83cc862b1e9','3b96f83d-c838-46b3-8104-229a79d974a9',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:12:38.000000','2025-08-06 13:12:38.000000','admin','admin'),('78ff4d07-dfd7-4ad3-b1df-26ad8c085779','61ddbc58-8b74-4b7a-8d55-06b9b629250c','b4c3f6ef-fecb-40e5-be4e-b38725bd44d8','3ccad696-34c0-4a29-9853-d46b6551d93d',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 15:52:36.000000','2025-08-06 15:52:36.000000','admin','admin'),('7bf4f329-100e-4253-a311-1cc138f04480','996f270f-5858-4553-9470-3dddadedc890','62dedd8f-dd4d-4901-b6f5-735fda7fc229','0f939cf2-a7e6-4546-bcf1-d9a84769aa77',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-31 19:39:46.000000','2025-07-31 19:39:46.000000','admin','admin'),('7c33956d-7bf1-4757-8290-f3c99c3d68aa','61ddbc58-8b74-4b7a-8d55-06b9b629250c','b4c3f6ef-fecb-40e5-be4e-b38725bd44d8','79e6134f-2d56-4478-84ab-9bcb575dadf3',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 15:52:57.000000','2025-08-06 15:52:57.000000','admin','admin'),('80524e1b-e823-40c4-a8ba-70f7312bf99b','e93e00f2-7bf3-4086-9f21-136407c13ef1','15c2e9cb-606e-444a-868b-33320c24a504','5c9eb628-a8e9-4588-bbf0-2eadebd1a16b',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:20:17.000000','2025-08-06 13:20:17.000000','admin','admin'),('87295714-c91f-4e4e-bc8c-313bb091d409','996f270f-5858-4553-9470-3dddadedc890','a6e8a917-4d27-4f0b-8268-c477b768845b','7ee946a8-0e76-4230-8f37-4993eecd8f9e',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-30 18:09:17.000000','2025-07-30 18:09:17.000000','admin','admin'),('88b8d88a-22fe-4b8a-90b5-f8f0cf306744','5cb5187b-a92e-4540-930d-3be3ca46668a','1c6b38f5-28ff-4f6f-a5ce-d63343ec3631','b102c571-86b9-4019-bb52-dad16d5b5bd7','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 14:15:00.000000','2025-08-06 15:48:22.000000','admin','admin'),('8b436696-7c85-4733-b493-00c84daac680','a323c849-587c-4939-986e-ac274ee2aaef','e20f4590-cd34-435c-a3f7-3cbf2211302d','bb1f0a82-ce2f-4403-9d76-f3d19ed98dbb','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:48:26.000000','2025-08-06 13:49:39.000000','admin','admin'),('8e89b919-6d94-48ed-bfb0-664ecc24cf96','61ddbc58-8b74-4b7a-8d55-06b9b629250c','b4c3f6ef-fecb-40e5-be4e-b38725bd44d8','e91a5bc2-1f86-4f0a-b700-29eb00c8339d',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 15:52:47.000000','2025-08-06 15:52:47.000000','admin','admin'),('8ec4ea5f-9140-4694-8d7a-46d9b11ae088','996f270f-5858-4553-9470-3dddadedc890','f93ecd0e-914f-404d-b26b-f310a52843ef','b9f9aa91-6ab5-4f27-a6da-7554763f164b','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-31 19:24:21.000000','2025-07-31 19:38:46.000000','admin','admin'),('924336e3-7c9b-4893-8c54-4d34376ddf0f','61ddbc58-8b74-4b7a-8d55-06b9b629250c','b4c3f6ef-fecb-40e5-be4e-b38725bd44d8','51bac85a-59e8-41b2-94c0-04d3ed270242',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 15:52:52.000000','2025-08-06 15:52:52.000000','admin','admin'),('98a8eced-9a49-4c71-8b83-4445e1608621','996f270f-5858-4553-9470-3dddadedc890','a6e8a917-4d27-4f0b-8268-c477b768845b','f898c4de-df5e-4e9d-8004-b4781e3d2887','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-30 18:09:06.000000','2025-07-30 20:01:43.000000','admin','admin'),('9a5f2118-cd0a-40fe-849a-327b3ff661ba','996f270f-5858-4553-9470-3dddadedc890','62dedd8f-dd4d-4901-b6f5-735fda7fc229','b9f9aa91-6ab5-4f27-a6da-7554763f164b','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-31 19:24:33.000000','2025-08-03 15:37:41.000000','admin','admin'),('9f9ebd86-1387-408e-aea6-03364e9ac1b0','996f270f-5858-4553-9470-3dddadedc890','f93ecd0e-914f-404d-b26b-f310a52843ef','f89165ef-dc03-4c6a-872a-8eb257e8aae1',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-31 19:38:54.000000','2025-07-31 19:38:54.000000','admin','admin'),('a916ed3d-7185-4ee3-aff4-83e2c19e3128','996f270f-5858-4553-9470-3dddadedc890','62dedd8f-dd4d-4901-b6f5-735fda7fc229','f89165ef-dc03-4c6a-872a-8eb257e8aae1','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-31 19:24:39.000000','2025-07-31 19:39:38.000000','admin','admin'),('acc18eb8-6fbf-4cbc-98ea-4f863aa2ebbf','5b4d27ea-bcc5-4e60-bf6d-d09abc86ff00','ca11b6ca-e628-4f57-8bb2-8582772a7a90','7979e5c1-93f2-4543-9692-1cf289f2b037',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-03 15:41:01.000000','2025-08-03 15:41:01.000000','admin','admin'),('adf8b51e-d885-48dd-ad94-9f1f32094e00','996f270f-5858-4553-9470-3dddadedc890','a5dd2be0-9d2c-4ae7-bee3-b9d799b80958','e6d866bf-3709-434f-b641-ceba3cbac2fd','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-31 19:23:03.000000','2025-08-03 15:33:54.000000','admin','admin'),('b168e286-f259-41dd-a2a6-e109efb14fc2','996f270f-5858-4553-9470-3dddadedc890','e2e05f1f-bd3e-462b-85b1-d0cc99413a4d','86bb3f3f-1020-46e4-8d1e-0252c614f75c',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 12:36:52.000000','2025-08-06 12:36:52.000000','admin','admin'),('b2599921-7974-4e0a-8c61-eb3c8e70a882','996f270f-5858-4553-9470-3dddadedc890','3f4195f0-d2b5-43ee-8f44-1fc6ddee460b','86bb3f3f-1020-46e4-8d1e-0252c614f75c','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-07-31 19:22:50.000000','2025-08-03 17:59:00.000000','admin','admin'),('b3551c85-57bb-456f-875d-f0594f08edb3','a323c849-587c-4939-986e-ac274ee2aaef','0c86d624-4246-4c7e-bf5d-bd1b99446a3c','57557edb-93d9-45d5-955b-cd99468fee5d',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:51:25.000000','2025-08-06 13:51:25.000000','admin','admin'),('b5a938ca-1933-4b1b-90bb-6137e7f35182','61ddbc58-8b74-4b7a-8d55-06b9b629250c','b4c3f6ef-fecb-40e5-be4e-b38725bd44d8','45a80c8a-01e5-443c-914c-1870bddcf8fe',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',1,0,'2025-08-06 15:53:10.000000','2025-08-06 15:53:10.000000','admin','admin'),('b6177540-1b69-4874-a11d-e1080d975ea9','a323c849-587c-4939-986e-ac274ee2aaef','04b1c2eb-a3cf-426b-8151-ebbbfac4c588','bb1f0a82-ce2f-4403-9d76-f3d19ed98dbb',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:46:50.000000','2025-08-06 13:46:50.000000','admin','admin'),('b766677f-fbbc-45ce-8283-b6418296eb62','996f270f-5858-4553-9470-3dddadedc890','0a48e05f-4550-4882-81aa-c6e0df62dc48','22172170-8250-4d93-bb0f-12b35f4114b4',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-03 15:36:15.000000','2025-08-03 15:36:15.000000','admin','admin'),('b9564e26-a9d1-4c1c-ab97-c93bbc6cd7ee','996f270f-5858-4553-9470-3dddadedc890','3f4195f0-d2b5-43ee-8f44-1fc6ddee460b','85084775-29a9-4f92-b431-df234ac40235','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',1,0,'2025-07-31 19:29:04.000000','2025-07-31 19:58:58.000000','admin','admin'),('bf293c13-39aa-4f60-892d-674de481833f','a323c849-587c-4939-986e-ac274ee2aaef','bcc13e3b-600d-4c60-967e-b91a8d6a8fe3','dc979882-d399-4c2d-9a46-af69825fc38f',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:44:00.000000','2025-08-06 13:44:00.000000','admin','admin'),('c5e93908-5708-4404-99a9-e49f76ab78df','a323c849-587c-4939-986e-ac274ee2aaef','04b1c2eb-a3cf-426b-8151-ebbbfac4c588','226f4ba9-0440-48f7-be4d-d1752370a176','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:44:20.000000','2025-08-06 13:47:52.000000','admin','admin'),('c992397d-8e0d-41ca-b830-28c295e7e51b','996f270f-5858-4553-9470-3dddadedc890','0a48e05f-4550-4882-81aa-c6e0df62dc48','b9f9aa91-6ab5-4f27-a6da-7554763f164b',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-03 15:33:20.000000','2025-08-03 15:33:20.000000','admin','admin'),('caef6ffa-f1ae-4815-ade3-ba688994b3ff','5cb5187b-a92e-4540-930d-3be3ca46668a','1c6b38f5-28ff-4f6f-a5ce-d63343ec3631','d3028ea2-2e01-4929-abc8-b3be7945e7d1','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',1,0,'2025-08-06 14:14:39.000000','2025-08-06 14:14:45.000000','admin','admin'),('ccbde2c0-d38b-4251-8f4a-a9442f453d10','5cb5187b-a92e-4540-930d-3be3ca46668a','1c6b38f5-28ff-4f6f-a5ce-d63343ec3631','714f0e75-b257-4ad6-9ea9-b60bd3392985',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 14:14:24.000000','2025-08-06 14:14:24.000000','admin','admin'),('cf6f05ac-1ef5-4ed0-9aca-ed07c878bd30','a323c849-587c-4939-986e-ac274ee2aaef','e20f4590-cd34-435c-a3f7-3cbf2211302d','57557edb-93d9-45d5-955b-cd99468fee5d',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:50:52.000000','2025-08-06 13:50:52.000000','admin','admin'),('d4073dd2-ab36-42dd-a043-a901bfd1cd99','a323c849-587c-4939-986e-ac274ee2aaef','bcc13e3b-600d-4c60-967e-b91a8d6a8fe3','b6dac4cb-373b-4055-a7ca-8da39bf7d26e',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:43:54.000000','2025-08-06 13:43:54.000000','admin','admin'),('d4cc7044-49f4-4184-816c-53702bb746e4','61ddbc58-8b74-4b7a-8d55-06b9b629250c','b4c3f6ef-fecb-40e5-be4e-b38725bd44d8','8eb7d7f4-fcbf-4d15-ac7d-8bbcc4717422','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 15:53:15.000000','2025-08-06 15:53:20.000000','admin','admin'),('dee3f0b0-6bca-456c-9921-e6fdfacf890e','5cb5187b-a92e-4540-930d-3be3ca46668a','1c6b38f5-28ff-4f6f-a5ce-d63343ec3631','850df8d5-6aa2-4111-be88-9305393abd19',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 14:14:52.000000','2025-08-06 14:14:52.000000','admin','admin'),('dfaf9d77-0a98-4179-b33f-c6f273ba75b9','61ddbc58-8b74-4b7a-8d55-06b9b629250c','b4c3f6ef-fecb-40e5-be4e-b38725bd44d8','cade020e-d637-4926-a1e9-dfda89ee9795',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 15:52:33.000000','2025-08-06 15:52:33.000000','admin','admin'),('e1032240-71d9-453e-9cba-3b5a5f89f3e1','a323c849-587c-4939-986e-ac274ee2aaef','0c86d624-4246-4c7e-bf5d-bd1b99446a3c','bb1f0a82-ce2f-4403-9d76-f3d19ed98dbb',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:50:45.000000','2025-08-06 13:50:45.000000','admin','admin'),('e2e3c2d4-20ff-4986-80c1-bc71793d2c4e','5cb5187b-a92e-4540-930d-3be3ca46668a','1c6b38f5-28ff-4f6f-a5ce-d63343ec3631','c1930e46-c3c0-409d-ab3c-af34e5d9cd5e','0','','a52c4775-308c-4d4c-b1ac-7894dac55a1d',1,0,'2025-08-06 14:14:32.000000','2025-08-06 15:48:06.000000','admin','admin'),('e7c623d5-bfe6-4ec7-a24f-07b24aad5ff0','5b4d27ea-bcc5-4e60-bf6d-d09abc86ff00','0ff1096c-c3dd-4302-88b2-bc76eb814247','43258ea3-78b2-4ff2-8594-a334262027d1',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-03 15:41:10.000000','2025-08-03 15:41:10.000000','admin','admin'),('e9395007-41c3-463f-8165-2f9617b8d952','61ddbc58-8b74-4b7a-8d55-06b9b629250c','b4c3f6ef-fecb-40e5-be4e-b38725bd44d8','47502e41-eb51-41e4-a569-bc3bec12e214',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 15:52:40.000000','2025-08-06 15:52:40.000000','admin','admin'),('f6d6e0d0-01bd-4aa4-9e7b-d6f32793eb69','a323c849-587c-4939-986e-ac274ee2aaef','af7656ca-37e7-4607-8a06-64644576378c','6c10bbb3-65cf-4a57-8047-3852ebbfc08a',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:40:53.000000','2025-08-06 13:40:53.000000','admin','admin'),('f992b4c2-1289-45d1-8d6b-6e331be4d2a7','e93e00f2-7bf3-4086-9f21-136407c13ef1','15c2e9cb-606e-444a-868b-33320c24a504','3393f709-0103-41d7-954e-1f7228b0e439',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d',0,0,'2025-08-06 13:20:10.000000','2025-08-06 13:20:10.000000','admin','admin');
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
INSERT INTO `dpgroupmap` VALUES ('377f56f3-ccb6-4c05-ac5c-2978d105e8fa','996f270f-5858-4553-9470-3dddadedc890','d1b6d2a6-9046-4f6e-afd1-207baa7ae478','0566c117-fd04-45b9-8b65-b629116e6467',NULL,'62dedd8f-dd4d-4901-b6f5-735fda7fc229',NULL,'','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-03 18:33:53.000000','2025-08-07 19:20:59.000000','admin','admin'),('3dfef5a8-b702-4cd6-bd33-20b9fe0b1b21','5cb5187b-a92e-4540-930d-3be3ca46668a',NULL,NULL,NULL,'1c6b38f5-28ff-4f6f-a5ce-d63343ec3631',NULL,'','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-07 12:58:23.000000','2025-08-07 12:58:23.000000','admin','admin'),('9858fd2f-60d7-4a2e-8fc0-401c091141c0','996f270f-5858-4553-9470-3dddadedc890','d1b6d2a6-9046-4f6e-afd1-207baa7ae478','d6bfa883-6314-4ae2-8a77-3257887b9dec',NULL,'a5dd2be0-9d2c-4ae7-bee3-b9d799b80958',NULL,'','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-03 18:33:35.000000','2025-08-07 19:18:06.000000','admin','admin'),('aa583075-8340-4d0a-8d09-28246a4a7073','5b4d27ea-bcc5-4e60-bf6d-d09abc86ff00','5ccfe169-e7a8-41b3-9a36-3db6bdbe9475','e23e7fea-877b-4a0b-83a5-758857dc569c','983d4cbc-dde3-4493-8897-9383ffc6efd1','ca11b6ca-e628-4f57-8bb2-8582772a7a90',NULL,'','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-24 18:32:49.000000','2025-08-03 16:01:00.000000','admin','admin'),('b5bcd70a-e0fd-43d0-86e7-80f2ccdbbdf1','996f270f-5858-4553-9470-3dddadedc890','d1b6d2a6-9046-4f6e-afd1-207baa7ae478','9ead731f-c832-44a4-8da2-c73d1ab32a55',NULL,'a6e8a917-4d27-4f0b-8268-c477b768845b',NULL,'','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-03 18:33:12.000000','2025-08-03 18:33:12.000000','admin','admin'),('b9dd99bc-2db2-4524-8646-13e9de5806ad','e93e00f2-7bf3-4086-9f21-136407c13ef1',NULL,NULL,NULL,'15c2e9cb-606e-444a-868b-33320c24a504',NULL,'','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-06 13:25:35.000000','2025-08-06 13:25:35.000000','admin','admin'),('ca9d3baf-b2d1-4b07-900b-c20e8d79fcae','5b4d27ea-bcc5-4e60-bf6d-d09abc86ff00',NULL,NULL,NULL,'Item-test/',NULL,'','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-30 17:47:10.000000','2025-07-30 17:47:10.000000','admin','admin'),('caa0da47-4d87-48e2-829d-a73c669fdf7d','996f270f-5858-4553-9470-3dddadedc890','d1b6d2a6-9046-4f6e-afd1-207baa7ae478','72b31fa5-7ee3-4e94-97a8-687a4289052d',NULL,'f93ecd0e-914f-404d-b26b-f310a52843ef',NULL,'','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-03 18:33:48.000000','2025-08-07 19:20:52.000000','admin','admin'),('cde04149-94ce-4344-84a9-f71a417def8e','996f270f-5858-4553-9470-3dddadedc890','d1b6d2a6-9046-4f6e-afd1-207baa7ae478','9ead731f-c832-44a4-8da2-c73d1ab32a55',NULL,'3f4195f0-d2b5-43ee-8f44-1fc6ddee460b',NULL,'','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-24 18:04:06.000000','2025-08-07 19:17:57.000000','admin','admin'),('d1626d65-fd0c-4c37-ae58-d619d1cd9c44','996f270f-5858-4553-9470-3dddadedc890','d1b6d2a6-9046-4f6e-afd1-207baa7ae478','19e52c96-a06a-4f07-afa7-b227d4dd5fa8',NULL,'0a48e05f-4550-4882-81aa-c6e0df62dc48',NULL,'','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-03 18:33:43.000000','2025-08-07 19:20:43.000000','admin','admin'),('df424f87-b377-4ba2-878f-6ad2f2d67d6f','9994f272-6709-4608-9fa2-b1f61f4049c4','ae6938fe-ade0-4740-b820-82da31d1305e',NULL,NULL,'f4e27717-b93c-4e83-8f2d-c83cc862b1e9',NULL,'','a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-06 13:24:48.000000','2025-08-06 13:24:48.000000','admin','admin');
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
INSERT INTO `field` VALUES ('04b1c2eb-a3cf-426b-8151-ebbbfac4c588','3',NULL,'Add Company/Departments','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-06 13:31:51.773000','2025-08-06 13:32:01.208000','admin','admin','Table',NULL,NULL,'Department Info','a323c849-587c-4939-986e-ac274ee2aaef'),('0a48e05f-4550-4882-81aa-c6e0df62dc48','4',NULL,'Department','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-31 19:19:23.249000','2025-07-31 19:57:55.769000','admin','admin','Table',NULL,NULL,'Department Setup','996f270f-5858-4553-9470-3dddadedc890'),('0c86d624-4246-4c7e-bf5d-bd1b99446a3c','5',NULL,'Add Company/Organogram','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-06 13:33:14.390000','2025-08-06 13:33:14.390000','admin','admin','Tree',NULL,NULL,'Reportng Organogram','a323c849-587c-4939-986e-ac274ee2aaef'),('0ff1096c-c3dd-4302-88b2-bc76eb814247','2','','Item-test-2','C','',NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-26 17:49:32.327000','2025-07-27 18:26:47.422000','admin','admin','Tree','',0,'test','5b4d27ea-bcc5-4e60-bf6d-d09abc86ff00'),('15c2e9cb-606e-444a-868b-33320c24a504','1',NULL,'Add Currency/New Currency','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-06 13:19:31.805000','2025-08-06 13:19:31.805000','admin','admin','List',NULL,NULL,'New Currency','e93e00f2-7bf3-4086-9f21-136407c13ef1'),('1c6b38f5-28ff-4f6f-a5ce-d63343ec3631','1',NULL,'Chart of Accounts/List of All Accounts','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-06 14:10:09.141000','2025-08-06 14:10:59.164000','admin','admin','Table',NULL,NULL,'All Accounts','5cb5187b-a92e-4540-930d-3be3ca46668a'),('31bb91be-c5af-476c-8566-762f5a77e044','4',NULL,'Add Voucher/Others','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-07 14:27:58.457000','2025-08-07 14:27:58.457000','admin','admin','List',NULL,NULL,'Tag & Attachments','eebc0ad6-3c6e-4add-87c5-45b0c4229121'),('3f4195f0-d2b5-43ee-8f44-1fc6ddee460b','2',NULL,'Company Type','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-31 19:58:39.869000','2025-07-31 19:58:39.869000','admin','admin','Table',NULL,NULL,'Company Relation Setup','996f270f-5858-4553-9470-3dddadedc890'),('62dedd8f-dd4d-4901-b6f5-735fda7fc229','6',NULL,'Organogram','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-31 19:20:55.213000','2025-08-03 14:33:41.807000','admin','admin','Tree',NULL,NULL,'Organogram / Reporting Setup','996f270f-5858-4553-9470-3dddadedc890'),('78bcb9d4-b45a-46b9-b374-8c2f59bc7e94','3',NULL,'Add Voucher/Details','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-07 13:48:10.261000','2025-08-07 14:27:32.662000','admin','admin','Table',NULL,NULL,'Transaction Details','eebc0ad6-3c6e-4add-87c5-45b0c4229121'),('9534e690-b810-4f01-b3a2-99283ad99a6e','1',NULL,'Journal / Voucher/List of All Vouchers','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-07 14:30:42.881000','2025-08-07 14:30:42.881000','admin','admin','Table',NULL,NULL,'All Vouchers','c9fafd10-c441-43f3-96fa-15b7995f4c56'),('a5dd2be0-9d2c-4ae7-bee3-b9d799b80958','3',NULL,'Location','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-31 19:18:39.354000','2025-07-31 19:58:04.201000','admin','admin','List',NULL,NULL,'Location & Branch Setup','996f270f-5858-4553-9470-3dddadedc890'),('a6e8a917-4d27-4f0b-8268-c477b768845b','1',NULL,'Company Info','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-30 18:08:33.801000','2025-07-31 19:53:18.903000','admin','admin','List',NULL,NULL,'Company Info of Company','996f270f-5858-4553-9470-3dddadedc890'),('af7656ca-37e7-4607-8a06-64644576378c','1',NULL,'Add Company/Company Info','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-06 13:28:24.676000','2025-08-06 13:28:24.676000','admin','admin','List',NULL,NULL,'Basic Info','a323c849-587c-4939-986e-ac274ee2aaef'),('b4c3f6ef-fecb-40e5-be4e-b38725bd44d8','1',NULL,'Add Account/New Account','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-06 15:52:14.900000','2025-08-06 15:52:14.900000','admin','admin','Table',NULL,NULL,'Create New Account','61ddbc58-8b74-4b7a-8d55-06b9b629250c'),('b5552c30-15be-4349-92bc-1b0fbff37f13','2',NULL,'Add Voucher/Mode','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-07 13:46:35.424000','2025-08-07 13:46:35.424000','admin','admin','List',NULL,NULL,'For Payment / Receive','eebc0ad6-3c6e-4add-87c5-45b0c4229121'),('bcc13e3b-600d-4c60-967e-b91a8d6a8fe3','2',NULL,'Add Company/Location & Branch','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-06 13:31:03.790000','2025-08-06 13:31:03.790000','admin','admin','Table',NULL,NULL,'Location Info','a323c849-587c-4939-986e-ac274ee2aaef'),('ca11b6ca-e628-4f57-8bb2-8582772a7a90','1','','Item-test-1','C','',NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-13 17:55:08.845000','2025-07-27 18:26:55.005000','admin','admin','tree','',0,'test','5b4d27ea-bcc5-4e60-bf6d-d09abc86ff00'),('e20f4590-cd34-435c-a3f7-3cbf2211302d','4',NULL,'Add Company/Designations','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-06 13:32:37.801000','2025-08-06 13:32:37.801000','admin','admin','Table',NULL,NULL,'Set Designation','a323c849-587c-4939-986e-ac274ee2aaef'),('e2e05f1f-bd3e-462b-85b1-d0cc99413a4d','7',NULL,'Organizational Setup/List of companies','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-06 12:35:36.568000','2025-08-06 12:35:36.568000','admin','admin','Table',NULL,NULL,'List of All Companies','996f270f-5858-4553-9470-3dddadedc890'),('e7de628b-f532-4131-9cf0-20c85118fa5e','1',NULL,'Add Voucher/Basic Info','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-07 13:45:52.314000','2025-08-07 13:45:52.314000','admin','admin','List',NULL,NULL,'Basic Info','eebc0ad6-3c6e-4add-87c5-45b0c4229121'),('f4e27717-b93c-4e83-8f2d-c83cc862b1e9','1',NULL,'Currency Setup/All Currencies','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-08-06 13:09:08.746000','2025-08-06 13:09:08.746000','admin','admin','Table',NULL,NULL,'List of All Currencies','9994f272-6709-4608-9fa2-b1f61f4049c4'),('f93ecd0e-914f-404d-b26b-f310a52843ef','5',NULL,'Designation','C',NULL,NULL,NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-31 19:20:18.675000','2025-07-31 19:57:50.971000','admin','admin','Table',NULL,NULL,'Designation Setup','996f270f-5858-4553-9470-3dddadedc890');
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
INSERT INTO `item` VALUES ('083f14b0-7665-4b83-b6d3-aee50eb80792','Advance Request','ea425177-675a-4dc2-83e6-293dfcc3c108','1','N','View','','List of Advance Money Requests','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-13 20:18:20.518000','2025-07-31 15:52:12.649000','admin','admin'),('08419323-d4cf-466c-afd7-7a90dd0350ac','Add Purchase Return','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','10','N','Entry','','New Purchase Return','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:13:35.491000','2025-07-31 15:48:09.324000','admin','admin'),('08a5c769-b71a-420b-8145-fd969559c338','Letter of Credit','809dace8-03d1-4ee9-917a-bf1ddabe359f','1','N','View','','List of All L/C','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-13 11:37:34.299000','2025-07-31 15:31:41.122000','admin','admin'),('0908fb1e-d06a-4833-b6df-92fcd5a5a886','Add New','cd3eccd2-48b5-4376-bd78-8d9473709a19','6','N','Entry','','New Invoice/List/Bill','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-21 15:10:13.797000','2025-07-31 15:35:14.946000','admin','admin'),('097cfdf2-f415-4a83-9d22-07a11740354e','Reconciliation','e9f43875-7e77-4ad1-98fc-6df5fb99e0c2','05','N','View','','List of Recon. Rules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:39:34.648000','2025-07-31 15:11:36.011000','admin','admin'),('0b142982-10a4-4134-9f40-cc2ba56c1939','Expense Claim','ea425177-675a-4dc2-83e6-293dfcc3c108','2','N','View','','List of Claimed Expenses','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-13 20:18:57.550000','2025-07-31 15:52:18.284000','admin','admin'),('0c6c8355-bc79-4a73-83fa-38512e97c2a6','Add Cost Centre','64547663-9950-4e9e-882c-69992a57e7cb','03','N','Entry','','New Cost Centre','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:52:12.171000','2025-07-31 15:19:33.370000','admin','admin'),('0e32390d-cd3c-41fd-b986-c4b61be588e5','Disposal','e129b8dc-9600-49dd-8bef-ec50db77d9da','06','N','View','','Disposal Schedule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:48:54.077000','2025-07-31 15:16:24.487000','admin','admin'),('12a57c4a-5a44-4668-89e6-960fbbe5525a','Add Project','96a5286c-1404-48a5-8108-1fd34c21ab73','02','N','Entry','','New Project','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:55:58.070000','2025-07-31 15:22:03.697000','admin','admin'),('14e384db-1135-4d49-abc7-6245958090a5','Recurring Bill / Expense','a984fb09-8a37-43fe-9076-bc11d451dbe5','04','N','View','','List of 	Recurring Bills','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:33:23.131000','2025-07-31 15:09:30.995000','admin','admin'),('153729ec-cff9-40b2-97a9-d510b173e5e7','Add Con. Account','05f960bc-2aef-4f1a-8a9b-a713c6143bf3','5','N','Entry','','New Consolidated Account','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-08 20:44:32.074000','2025-07-31 15:36:34.450000','admin','admin'),('16207e60-f981-415a-a683-908229be87b2','Add Bill','a984fb09-8a37-43fe-9076-bc11d451dbe5','06','N','Entry','','New Bill','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:35:46.555000','2025-07-31 15:09:52.804000','admin','admin'),('1912e526-4d84-4e94-a397-4a617e3c4bed','Add Auditor','cf3250ea-e67c-45a7-8020-efdef79fc3d6','06','N','Entry','','New Auditor','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-24 18:43:40.902000','2025-07-31 15:06:59.789000','admin','admin'),('191bdb96-2f59-4dd2-ae9a-5e8aa2075fb6','Add Sales Receipt','1405b8aa-4e49-4cc9-bd26-764f87dd055e','08','N','Entry','','New Sales Receipt','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-09 17:50:33.045000','2025-07-31 15:08:27.683000','admin','admin'),('1af33e5d-6423-4ec5-b271-28843ad83654','Add Asset','e129b8dc-9600-49dd-8bef-ec50db77d9da','07','N','Entry','','New Asset','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:49:16.512000','2025-07-31 15:16:35.220000','admin','admin'),('1bba20c3-3c01-4961-8018-71cf8cb6cc1a','Financial Modelling','e7346c4c-b50b-47c5-95a7-1cc3f3062fa2','04','N','View','','FM Schedules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 12:00:30.799000','2025-07-31 15:26:25.894000','admin','admin'),('1c02efec-cc33-4a24-a76f-07ac6b21e208','Vendor Credit','a984fb09-8a37-43fe-9076-bc11d451dbe5','05','N','View','','List of Vendor Credits','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:35:26.393000','2025-07-31 15:09:39.943000','admin','admin'),('221c4e58-dff7-4368-8412-dee82d9581b6','Add Customer','0edc1b72-e5e9-4658-a456-06906c9aa80d','02','N','Entry','','New Customer','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:25:22.989000','2025-07-31 15:41:52.441000','admin','admin'),('2754af0e-1136-4f06-8ad8-76b47d31905b','Sales Order','0edc1b72-e5e9-4658-a456-06906c9aa80d','05','N','View','','List of Sales Orders','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:28:43.013000','2025-07-31 15:42:23.173000','admin','admin'),('2c2978cc-e969-4362-89d6-336b67f3cc35','Utilization Tracking','809dace8-03d1-4ee9-917a-bf1ddabe359f','3','N','View','','Utilization Schedule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-15 12:25:26.539000','2025-07-31 15:33:15.992000','admin','admin'),('2d29cfef-3655-45d3-b312-6e8f96830807','Reconsiliation Rule','05f960bc-2aef-4f1a-8a9b-a713c6143bf3','4','N','View','','List of Rules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-08 20:46:20.508000','2025-07-31 15:36:27.553000','admin','admin'),('36f3da69-2369-4401-b856-f12f4fbf3c99','Purchase Return','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','09','N','View','','List of Purchase Return','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:13:01.846000','2025-07-31 15:47:48.593000','admin','admin'),('395d1a1b-7b43-4251-901a-c99f4ab86a25','Add Loan','ddac32d5-ce66-4f08-8d1d-806f08e0171f','05','Y','Entry','','New Loan','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-21 14:47:43.252000','2025-07-31 19:08:13.961000','admin','admin'),('3bc79640-ba6d-435e-b287-7605c20290b5','Expiry Alerts','809dace8-03d1-4ee9-917a-bf1ddabe359f','4','N','View','','Rules for Expiry Alert','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-15 12:28:06.967000','2025-07-31 15:33:27.877000','admin','admin'),('3bd78023-3993-4b20-9d1b-079668b9c885','Repayment Schedule','ddac32d5-ce66-4f08-8d1d-806f08e0171f','03','N','View','','Schedule of Repayment','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-21 14:46:32.753000','2025-07-31 15:27:58.456000','admin','admin'),('3ca59eec-4633-4dfe-97ec-16a940f87717','Add Purchase Order','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','06','N','Entry','','New Purchase Order','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:11:34.443000','2025-07-31 15:46:47.555000','admin','admin'),('3ce909de-a200-4674-83bd-eec54877b420','GRN','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','07','N','View','','List of Receive Notes','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:12:00.842000','2025-07-31 15:47:18.501000','admin','admin'),('3e9187a1-ac71-403d-8870-762ffd51cddd','Purchase Order','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','05','N','View','','List of Purchase Orders','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:11:09.464000','2025-07-31 15:46:08.406000','admin','admin'),('4067bdff-f934-4b53-bb74-fc2a7157f6ec','Add GRN','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','08','N','Entry','','New Receive Note','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:12:29.555000','2025-07-31 15:47:40.415000','admin','admin'),('416f2dc6-ef21-4523-8aa6-41090e2c7b33','Add Quotation','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','04','N','Entry','','New Quotation','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:10:49.126000','2025-07-31 15:46:01.805000','admin','admin'),('44e2850c-ce34-4049-a8a4-c374e2783363','Add Revenue Centre','64547663-9950-4e9e-882c-69992a57e7cb','04','N','Entry','','New Revenue Centre','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:52:32.936000','2025-07-31 15:19:39.316000','admin','admin'),('485e64be-11ec-45ea-81cf-fafc515838ff','Credit Note','1405b8aa-4e49-4cc9-bd26-764f87dd055e','05','N','View','','List of Credit Notes','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-09 17:49:08.419000','2025-07-31 15:08:06.096000','admin','admin'),('4956bb0a-9d2d-4cf7-ba92-c958f1407270','Amendments','809dace8-03d1-4ee9-917a-bf1ddabe359f','2','N','View','','List of Amendments','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-15 12:19:37.749000','2025-07-31 15:32:06.413000','admin','admin'),('4bb89504-22e1-4f5e-90bf-be646981880d','Add Recon. Rule','e9f43875-7e77-4ad1-98fc-6df5fb99e0c2','06','N','Entry','','New Recon. Rule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-31 15:14:32.824000','2025-07-31 15:14:32.824000','admin','admin'),('4bf7d8d0-8692-4757-aab3-4553d893cfcc','Bill of Lading','cd3eccd2-48b5-4376-bd78-8d9473709a19','3','N','View','','List of Bill of Lading','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-15 12:29:16.621000','2025-07-31 15:34:44.131000','admin','admin'),('4f848800-2ea9-4b9b-a01e-cc04a040cd2c','Shipping Bill','cd3eccd2-48b5-4376-bd78-8d9473709a19','5','N','View','','List of Shipping Bill','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-15 12:29:57.252000','2025-07-31 15:35:19.043000','admin','admin'),('518db015-bf58-4da2-a019-439156e69ba4','Consolidations','05f960bc-2aef-4f1a-8a9b-a713c6143bf3','2','N','View','','List of Consolidated Statements','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-08 20:12:56.619000','2025-07-31 19:07:39.785000','admin','admin'),('56c43a0c-2937-462f-bbb3-6eca51b6972a','Time & Expense Tracking','96a5286c-1404-48a5-8108-1fd34c21ab73','04','N','View','','Tracking Schedules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:56:48.972000','2025-07-31 15:24:11.535000','admin','admin'),('5b4d27ea-bcc5-4e60-bf6d-d09abc86ff00','Item-test','dc337edf-8acd-45db-b01a-7e4293a2f029','1','Y','Entry','','test','a52c4775-308c-4d4c-b1ac-7894dac55a1d','IS','2025-07-21 12:33:38.627000','2025-07-31 15:50:16.622000','admin','admin'),('5cb5187b-a92e-4540-930d-3be3ca46668a','Chart of Accounts','cf3250ea-e67c-45a7-8020-efdef79fc3d6','01','N','View','','List of All Accounts','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-08 19:43:24.717000','2025-07-31 15:06:09.229000','admin','admin'),('5f288d86-19e8-4b2c-91d2-558937a83d5c','Asset Acquisition','e129b8dc-9600-49dd-8bef-ec50db77d9da','01','N','View','','List of all Assets','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:46:37.471000','2025-07-31 15:15:32.394000','admin','admin'),('5f36d5df-bee8-46a7-aa32-664690863a2f','Performance Mgt','e7346c4c-b50b-47c5-95a7-1cc3f3062fa2','05','N','View','','Rules for Performance','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 12:00:50.370000','2025-07-31 15:26:42.430000','admin','admin'),('61ddbc58-8b74-4b7a-8d55-06b9b629250c','Add Account','cf3250ea-e67c-45a7-8020-efdef79fc3d6','04','N','Entry','','New Account','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-08 20:43:12.583000','2025-07-31 15:06:42.712000','admin','admin'),('62fc7d12-e403-4327-a192-6faa3e3b0f89','Inter-company Recon','05f960bc-2aef-4f1a-8a9b-a713c6143bf3','3','N','View','','Inter-company Transactions','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-08 20:44:51.994000','2025-07-31 15:35:58.312000','admin','admin'),('64922f71-cf1c-4d08-a455-d99603000874','Market Analysis','052eee4e-3e8a-4b3a-b8ef-ff7036436cc1','05','N','View','','Analysis Rules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-13 11:37:02.903000','2025-07-31 15:31:10.686000','admin','admin'),('65340de7-9587-40a5-9f43-8ad75697a19e','Share Management','052eee4e-3e8a-4b3a-b8ef-ff7036436cc1','02','N','View','','Schedule for Share','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-13 11:35:26.639000','2025-07-31 15:30:10.992000','admin','admin'),('6765811a-9b92-4319-81f7-51799651a942','Attendance','3fbe0e76-b801-4912-8040-cedaf367a2af','3','N','View','','Attendance Schedule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-13 11:43:04.542000','2025-07-31 15:51:06.870000','admin','admin'),('68a56585-1403-4f57-ba8b-a1f83b68eb71','Sales Receipt','1405b8aa-4e49-4cc9-bd26-764f87dd055e','02','N','View','','List of Sales Receipts','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-08 17:52:27.406000','2025-07-31 15:07:20.029000','admin','admin'),('69780a21-3331-45d3-8b3b-fc8eed4668ca','Job Costing','64547663-9950-4e9e-882c-69992a57e7cb','08','N','Entry','','Rules for Costing','a52c4775-308c-4d4c-b1ac-7894dac55a1d','IS','2025-07-10 11:54:38.843000','2025-07-31 15:21:16.112000','admin','admin'),('6af99983-27ed-4d74-83ed-0bf3af6aed0d','Cost Centre','64547663-9950-4e9e-882c-69992a57e7cb','01 ','N','View','','List of Cost Centres','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:51:28.662000','2025-07-31 15:19:22.159000','admin','admin'),('6e547220-d6f9-4ee9-80fa-f4c208565c6b','Tax Setup','d343c3cd-6e3e-4116-97da-066a05173843','01','N','View','','List of Tax Rates','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:43:54.389000','2025-07-31 15:17:35.047000','admin','admin'),('705f0e11-b352-470b-84b9-0f4c5f6c653b','Product & Service Costing','64547663-9950-4e9e-882c-69992a57e7cb','06','N','Entry','','Rules for Costing','a52c4775-308c-4d4c-b1ac-7894dac55a1d','IS','2025-07-10 11:53:42.007000','2025-07-31 15:20:54.717000','admin','admin'),('7605baf1-c5cb-44e6-80aa-1cead09b49c2','Items','9d7953d3-2866-4b52-9c0d-8a559a12a0a4','1','N','View','','List of All Items','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:15:06.865000','2025-07-31 15:48:19.614000','admin','admin'),('76c17f9f-7f00-452c-bf64-3e5fba3435fa','Add Payment Made','a984fb09-8a37-43fe-9076-bc11d451dbe5','07','N','Entry','','New Payment','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:36:04.183000','2025-07-31 15:10:05.155000','admin','admin'),('7a0e8d40-a051-4e84-80f7-00bb571c990a','Disbursement Tracking','ddac32d5-ce66-4f08-8d1d-806f08e0171f','02','N','View','','Schedule of Disbursment','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-21 14:46:06.383000','2025-07-31 15:27:47.056000','admin','admin'),('7b5259f5-7ae8-4846-bc6d-ded8eb60504d','Expense','a984fb09-8a37-43fe-9076-bc11d451dbe5','03','N','View','','List of All Expenses','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:32:22.460000','2025-07-31 15:10:44.949000','admin','admin'),('7f662fcb-a07f-4c56-892a-78c749557130','Invoice','1405b8aa-4e49-4cc9-bd26-764f87dd055e','01','N','View','','List of invoices','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-08 17:47:30.465000','2025-07-31 15:07:10.307000','admin','admin'),('7fe5b7a0-9f06-48cc-bf26-7d5d45f14f16','Cons. Chart of Accounts','05f960bc-2aef-4f1a-8a9b-a713c6143bf3','1','N','View','','All Accounts','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-28 12:35:06.353000','2025-07-31 15:35:32.135000','admin','admin'),('810b288a-3cd1-4bd6-820c-1795facf8903','Customer','0edc1b72-e5e9-4658-a456-06906c9aa80d','01','N','View','','List of All Customers','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:25:03.746000','2025-07-31 15:41:00.961000','admin','admin'),('81f22350-6d23-441d-8dc5-6f80fcee5b69','Employee','3fbe0e76-b801-4912-8040-cedaf367a2af','1','N','View','','List of Employees','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-13 11:42:22.551000','2025-07-31 15:50:39.545000','admin','admin'),('84d49968-13ac-4f4f-a5e9-004275c390ed','Billing & Revenue Recognition','96a5286c-1404-48a5-8108-1fd34c21ab73','05','N','View','','Recognition Schedules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:57:49.807000','2025-07-31 15:24:17.680000','admin','admin'),('867559ad-0653-4165-aa8a-ca4363d71913','Add Payment Receipt','1405b8aa-4e49-4cc9-bd26-764f87dd055e','09','N','Entry','','New Payment Receipt','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:30:21.800000','2025-07-31 15:08:35.432000','admin','admin'),('8690ac58-a5d1-460c-8584-68a758c206e4','Add Items','9d7953d3-2866-4b52-9c0d-8a559a12a0a4','2','N','Entry','','New Items','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:15:46.582000','2025-07-31 15:48:28.245000','admin','admin'),('86c25608-9986-425b-8be7-cb3135e2e829','Packing List','cd3eccd2-48b5-4376-bd78-8d9473709a19','2','N','View','','List of Packing List','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-15 12:29:02.055000','2025-07-31 15:34:37.271000','admin','admin'),('8888fdf5-55fe-460e-b91f-aad218eac5fc','Process Costing','64547663-9950-4e9e-882c-69992a57e7cb','09','N','Entry','','Rules for Costing','a52c4775-308c-4d4c-b1ac-7894dac55a1d','IS','2025-07-10 11:54:55.037000','2025-07-31 15:21:33.985000','admin','admin'),('8cc35be4-3624-4114-9dbc-b3411b6ee26d','Audit & Compliance','cf3250ea-e67c-45a7-8020-efdef79fc3d6','03','N','View','','List of Auditors','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-08 20:13:46.925000','2025-07-31 15:06:33.019000','admin','admin'),('8ee154e3-1b86-4513-9ad7-db4a059255ad','Bank','e9f43875-7e77-4ad1-98fc-6df5fb99e0c2','02','N','View','','List of Bank A/Cs','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:37:38.182000','2025-07-31 15:11:05.179000','admin','admin'),('91d9e78c-ac99-4a68-8217-e76b12a68511','Compliance Tracking','d343c3cd-6e3e-4116-97da-066a05173843','04','N','View','','Rules of Compliance','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:45:53.602000','2025-07-31 15:18:06.546000','admin','admin'),('927d8556-8fde-454f-8cee-852d6f59ccf0','Add Quote','0edc1b72-e5e9-4658-a456-06906c9aa80d','04','N','Entry','','New Quotes','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:26:28.730000','2025-07-31 15:42:07.572000','admin','admin'),('9611027a-d508-4e82-a215-e5280937bce2','Revenue Centre','64547663-9950-4e9e-882c-69992a57e7cb','02','N','View','','List of Revenue Centres','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:51:48.347000','2025-07-31 15:19:27.501000','admin','admin'),('996f270f-5858-4553-9470-3dddadedc890','Organizational Setup','adf6e054-4ae5-4565-a0ee-d0e60ed50ab3','01','N','View','','Company / List of Company','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-06 16:59:44.875000','2025-07-31 15:39:08.958000','admin','admin'),('9994f272-6709-4608-9fa2-b1f61f4049c4','Currency Setup','adf6e054-4ae5-4565-a0ee-d0e60ed50ab3','03','N','View','','List of Currencies','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-21 13:07:39.672000','2025-07-31 15:40:11.198000','admin','admin'),('9ac67656-5add-4415-b622-78d349bfec7e','Inventory Adjustment','9d7953d3-2866-4b52-9c0d-8a559a12a0a4','3','N','View','','Adjustment Entries','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:16:02.061000','2025-07-31 15:48:45.236000','admin','admin'),('9bdaaf2c-33f2-45c7-abf0-beba5d0c0dbe','Add Budget','96a5286c-1404-48a5-8108-1fd34c21ab73','07','N','Entry','',' New Budget','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-21 15:06:14.565000','2025-07-31 15:25:18.218000','admin','admin'),('9c996204-ae36-4002-925c-c281e6c7f08b','Cash','e9f43875-7e77-4ad1-98fc-6df5fb99e0c2','01','N','View','','List of Cash A/Cs','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:37:18.451000','2025-07-31 15:10:58.976000','admin','admin'),('9e312751-a953-4a12-9cd3-9df2170a5231','EMI Automation','ddac32d5-ce66-4f08-8d1d-806f08e0171f','04','N','View','','Rules of EMI Posting','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-21 14:47:03.797000','2025-07-31 15:28:52.490000','admin','admin'),('9fcdd276-3e01-4025-b62c-0c1d12897611','Maintenance','e129b8dc-9600-49dd-8bef-ec50db77d9da','05','N','View','','Maintenance Schedule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:48:36.002000','2025-07-31 15:16:16.755000','admin','admin'),('a044d8d6-2bcf-4226-a727-c8d18f9af377','Cost Element Accounting','64547663-9950-4e9e-882c-69992a57e7cb','05','N','View','','Cost Reports','a52c4775-308c-4d4c-b1ac-7894dac55a1d','IS','2025-07-10 11:52:59.404000','2025-07-31 15:21:20.882000','admin','admin'),('a0632231-df7c-419a-9016-f1c7b876e3f2','Loan Register','ddac32d5-ce66-4f08-8d1d-806f08e0171f','01','Y','View','','List of all Loans','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-21 14:45:33.616000','2025-07-31 19:08:04.697000','admin','admin'),('a323c849-587c-4939-986e-ac274ee2aaef','Add Company','adf6e054-4ae5-4565-a0ee-d0e60ed50ab3','02','N','Entry','','Create Company','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-08 20:14:46.037000','2025-07-31 15:39:29.552000','admin','admin'),('a592af95-6138-407c-8477-7982fb8bd424','Vendor','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','01','N','View','','List of All Vendors','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:09:32.103000','2025-07-31 15:44:45.871000','admin','admin'),('a96047f6-ef0f-4ea3-9fde-03cef1739eee','Adjust Advance','ea425177-675a-4dc2-83e6-293dfcc3c108','3','N','View','','List of Advance Adjustments','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-13 20:19:53.189000','2025-07-31 15:52:35.836000','admin','admin'),('a989196f-6a7b-4ac3-8144-a6e196087271','Bill','a984fb09-8a37-43fe-9076-bc11d451dbe5','01','N','View','','List of All Bills','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:31:44.962000','2025-07-31 15:08:56.695000','admin','admin'),('ac61daa5-4fdf-4069-93f3-f7a6bd5a9182','Add Compliance','96a5286c-1404-48a5-8108-1fd34c21ab73','08','N','Entry','','New Compliance','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-31 15:25:09.674000','2025-07-31 15:25:09.674000','admin','admin'),('af9e6b07-dce6-4b0c-9c97-dca08de698fd','Leave Management','3fbe0e76-b801-4912-8040-cedaf367a2af','2','N','View','','Leave Schedule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-13 11:42:44.194000','2025-07-31 15:50:45.245000','admin','admin'),('b1aabe66-c893-4960-957e-31a375c3130e','Quote','0edc1b72-e5e9-4658-a456-06906c9aa80d','03','N','View','','List of All Quotes','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:26:03.255000','2025-07-31 15:42:00.413000','admin','admin'),('b2179dfb-be65-41df-a978-92ce96f273cb','Budgeting','96a5286c-1404-48a5-8108-1fd34c21ab73','03','N','View','','Budget Schedules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:56:34.450000','2025-07-31 15:23:56.380000','admin','admin'),('b5c5ead6-e043-45be-b177-0b90e5f29721','Add Challan','0edc1b72-e5e9-4658-a456-06906c9aa80d','08','N','Entry','','New Challan','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:33:43.000000','2025-07-31 15:43:53.029000','admin','admin'),('b62fcb24-879e-45bd-979f-03d09070a86c','Add Com. Rule','d343c3cd-6e3e-4116-97da-066a05173843','05','N','Entry','','New Com. Rule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-31 15:18:55.789000','2025-07-31 15:18:55.789000','admin','admin'),('b7ec9557-0506-4ba5-9e7c-a7740b2aa877','Add Account','e9f43875-7e77-4ad1-98fc-6df5fb99e0c2','04','N','Entry','','New Account','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:38:21.122000','2025-07-31 15:11:20.578000','admin','admin'),('b9c882d8-7d56-49ba-9303-c51f264fd06a','Payroll Setup','dabd23fd-26b5-407e-83c7-c8335f517c0a','1','N','View','','Set Payroll Sheet','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-21 14:57:01.897000','2025-07-31 15:51:41.355000','admin','admin'),('bbf38bae-0a95-4b8f-93df-b2be5150e08b','Compensation','3fbe0e76-b801-4912-8040-cedaf367a2af','4','N','View','','Compensation Setup','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-13 11:43:28.819000','2025-07-31 15:51:14.146000','admin','admin'),('bc50a01c-00ec-4e5d-af26-b0884bdd3670','Commercial Invoice','cd3eccd2-48b5-4376-bd78-8d9473709a19','1','N','View','','List of Com. Invoice','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-15 12:28:46.292000','2025-07-31 15:34:28.864000','admin','admin'),('bceb1b2b-bdc5-4501-88cc-bd2904401b8b','Share Capital Setup','052eee4e-3e8a-4b3a-b8ef-ff7036436cc1','01','N','View','','Share Structure','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-13 11:35:12.718000','2025-07-31 15:29:53.793000','admin','admin'),('be01e24a-1d6c-4940-a4e9-377972f166a9','Reporting and Analytics','e7346c4c-b50b-47c5-95a7-1cc3f3062fa2','03','N','View','','Schedules of Reporting','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 12:00:05.620000','2025-07-31 15:26:02.563000','admin','admin'),('bf1906c4-f9da-4307-ad23-e1721bd1fa85','Add Budget','e7346c4c-b50b-47c5-95a7-1cc3f3062fa2','07','N','Entry','','New Budget / Forecast','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-21 14:27:02.334000','2025-07-31 15:27:06.101000','admin','admin'),('c396975a-419a-47da-8735-db0ce4d63cdf','Wallet','e9f43875-7e77-4ad1-98fc-6df5fb99e0c2','03','N','View','','List of Wallets','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:37:55.617000','2025-07-31 15:11:12.626000','admin','admin'),('c4b264c7-73db-4189-85ee-6f72d8fab8fc','Add Invoice','1405b8aa-4e49-4cc9-bd26-764f87dd055e','07','N','Entry','','New Invoice','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-09 17:50:04.681000','2025-07-31 15:08:20.578000','admin','admin'),('c4e8556f-0055-4818-9e44-816f7b2a5157','Add Vendor','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','02','Y','Entry','','New Vendor','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:09:57.184000','2025-07-31 15:45:02.235000','admin','admin'),('c635fc81-2e0e-4042-b81e-339c094a840c','Pay Run','dabd23fd-26b5-407e-83c7-c8335f517c0a','2','N','Entry','','Run Payroll','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-13 11:43:47.791000','2025-07-31 15:51:56.677000','admin','admin'),('c6fdabf3-1aa7-466c-824c-ace6400d2d6e','Quotation','d63cb0fe-1fe0-4cde-a554-fa132cddda9c','03','N','View','','List of All Quotations','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:10:18.102000','2025-07-31 15:45:22.971000','admin','admin'),('c7095bfe-4005-4099-921b-f84c283fc802','Variance Analysis','e7346c4c-b50b-47c5-95a7-1cc3f3062fa2','02','N','View','','Rules of Analysis','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:59:49.297000','2025-07-31 15:25:53.028000','admin','admin'),('c942985e-ff92-4070-9170-dec8efa3e0b0','Delivery Challan','0edc1b72-e5e9-4658-a456-06906c9aa80d','07','N','View','','List of All Challans','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:29:49.056000','2025-07-31 15:43:18.369000','admin','admin'),('c95004af-a57d-4f88-bd12-357d75f04b70','Asset Revaluation','e129b8dc-9600-49dd-8bef-ec50db77d9da','04','N','View','','Revaluaction Schedule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:48:17.744000','2025-07-31 15:16:09.573000','admin','admin'),('c9fafd10-c441-43f3-96fa-15b7995f4c56','Journal / Voucher','cf3250ea-e67c-45a7-8020-efdef79fc3d6','02','Y','View','','List of All Vouchers','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-08 20:12:31.794000','2025-07-31 15:06:22.802000','admin','admin'),('cc42a4de-a42d-44ef-b8ae-a976b9b29c07','Certificate of Origin','cd3eccd2-48b5-4376-bd78-8d9473709a19','4','N','View','','List of Certificate','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-15 12:29:35.304000','2025-07-31 15:34:58.821000','admin','admin'),('cc9725f3-25c0-46b9-bc19-6fd08413c458','Add Sales Order','0edc1b72-e5e9-4658-a456-06906c9aa80d','06','N','Entry','','New Sales Order','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 15:29:10.774000','2025-07-31 15:43:14.621000','admin','admin'),('cfc0e06e-c8f8-4da7-bfb0-4301d1f1f195','Payment made','a984fb09-8a37-43fe-9076-bc11d451dbe5','02','N','View','','List of All Payments','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:32:02.930000','2025-07-31 15:09:06.791000','admin','admin'),('d580b963-ca71-4b62-bfb1-73d8e7f7baa0','Recurring Invoices / Subscription','1405b8aa-4e49-4cc9-bd26-764f87dd055e','04','N','View','','List of Recurring Invoices','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-09 17:46:47.655000','2025-07-31 15:07:43.101000','admin','admin'),('d6991222-bac4-4a49-95cb-4b58dcb0d759','Revenue Recognition','1405b8aa-4e49-4cc9-bd26-764f87dd055e','06','N','View','',' List of Recognition Schedules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-09 17:49:24.195000','2025-07-31 15:08:13.547000','admin','admin'),('d8b48f45-94c5-41db-8130-9292fca2fa73','Add L/C','809dace8-03d1-4ee9-917a-bf1ddabe359f','5','N','Entry','','New L/C','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-21 15:08:42.032000','2025-07-31 15:33:45.181000','admin','admin'),('d950d245-fab7-4b59-86dc-fb69591ecb66','EPS Calculation','052eee4e-3e8a-4b3a-b8ef-ff7036436cc1','03','N','View','','Rules for EPS','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-13 11:35:36.336000','2025-07-31 15:30:35.556000','admin','admin'),('dcc85e15-4934-4164-a31f-9cc7026fe4c2','Activity based Costing','64547663-9950-4e9e-882c-69992a57e7cb','07','N','Entry','','Rules for Costing','a52c4775-308c-4d4c-b1ac-7894dac55a1d','IS','2025-07-10 11:54:00.121000','2025-07-31 15:20:49.285000','admin','admin'),('dfb30eaa-6509-4f7d-b682-45cf61e2f604','Add Amendment','809dace8-03d1-4ee9-917a-bf1ddabe359f','6','N','Entry','','New Amendment','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-21 15:08:59.328000','2025-07-31 15:33:54.882000','admin','admin'),('e392cf72-c970-4433-9666-988ed9cc70bc','Add Tax Rate','d343c3cd-6e3e-4116-97da-066a05173843','02','N','Entry','','New Tax Rate','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:44:12.967000','2025-07-31 15:17:39.010000','admin','admin'),('e85c74af-3bab-4547-b12b-9aa3baaf4591','Depreciation','e129b8dc-9600-49dd-8bef-ec50db77d9da','03','N','View','','Depreciation Schedule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:47:49.083000','2025-07-31 15:15:55.251000','admin','admin'),('e93e00f2-7bf3-4086-9f21-136407c13ef1','Add Currency','adf6e054-4ae5-4565-a0ee-d0e60ed50ab3','04','N','Entry','','New Currency','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-08 20:20:28.269000','2025-07-31 15:40:26.958000','admin','admin'),('ed93d4f7-0a21-47bb-8093-305b8ef8d6db','Withholding Mgt','d343c3cd-6e3e-4116-97da-066a05173843','03','N','View','','Withholding Schedule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:44:37.144000','2025-07-31 15:17:51.884000','admin','admin'),('ede3d41b-e4c6-43c7-82f0-5423292b1fdc','Add Expense','a984fb09-8a37-43fe-9076-bc11d451dbe5','08','N','Entry','','New Expense','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:36:22.240000','2025-07-31 15:10:21.817000','admin','admin'),('edee2a02-298d-4da1-a0ce-6c28711b3f91','Add Credit Note','1405b8aa-4e49-4cc9-bd26-764f87dd055e','10','N','Entry','','New Credit Note','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:31:11.200000','2025-07-31 15:08:41.778000','admin','admin'),('eebc0ad6-3c6e-4add-87c5-45b0c4229121','Add Voucher','cf3250ea-e67c-45a7-8020-efdef79fc3d6','05','Y','Entry','','New Journal','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-08 20:43:44.027000','2025-07-31 15:06:51.340000','admin','admin'),('ef120ebf-b09d-4997-93a0-64a549f46946','Sales Return','0edc1b72-e5e9-4658-a456-06906c9aa80d','09','N','View','','List of Sales Returns','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-13 11:40:25.505000','2025-07-31 15:44:08.794000','admin','admin'),('f029eddc-1146-46d1-975e-b1c9f64caba4','Project Compliance','96a5286c-1404-48a5-8108-1fd34c21ab73','06','N','View','','List of Compliance Rules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:58:09.268000','2025-07-31 15:24:25.074000','admin','admin'),('f6a98bbd-c94d-47ab-b520-25d1ba19c1f9','Add Depriciation Rate','e129b8dc-9600-49dd-8bef-ec50db77d9da','08','N','Entry','','List of Depriciation Rates','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-21 15:01:22.930000','2025-07-31 15:16:42.956000','admin','admin'),('f78d560a-69ae-48a4-aadf-b11fdbf00f53','Project Setup','96a5286c-1404-48a5-8108-1fd34c21ab73','01','N','View','','List of All Projects','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:55:27.369000','2025-07-31 15:21:56.714000','admin','admin'),('fc057ab9-cdf9-49ac-b52a-87655eff0e1e','Financial KPI tracking','e7346c4c-b50b-47c5-95a7-1cc3f3062fa2','06','N','View','','Rules for KPI Track','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 12:01:11.098000','2025-07-31 15:26:49.805000','admin','admin'),('fd161920-95bd-4b3b-a112-122a6144f221','Budget & Forecast','e7346c4c-b50b-47c5-95a7-1cc3f3062fa2','01','N','View','','Schedules','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:59:29.514000','2025-07-31 15:25:46.507000','admin','admin'),('fdcba465-4f12-444c-b40e-b561d06b15a5','Profit Distribution','052eee4e-3e8a-4b3a-b8ef-ff7036436cc1','04','N','View','','Diatribution Schedule','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-13 11:35:48.241000','2025-07-31 15:30:49.178000','admin','admin'),('fefc2804-c993-4a0e-9046-e286e045e040','Asset Tracking','e129b8dc-9600-49dd-8bef-ec50db77d9da','02','N','View','','List of Locationwise Assets','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:47:01.146000','2025-07-31 15:15:40.608000','admin','admin'),('ff7b4a10-5ca1-41ec-be36-90289dd8df32','Add Vendor Credit','a984fb09-8a37-43fe-9076-bc11d451dbe5','09','N','Entry','','New Vendor Credit','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-10 11:36:41.043000','2025-07-31 15:10:29.652000','admin','admin'),('ffc8051e-bd1f-4120-a303-0edd80b59253','Payment Receipt','1405b8aa-4e49-4cc9-bd26-764f87dd055e','03','N','View','','List of Payment Receipts','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-09 17:46:18.928000','2025-07-31 15:07:34.879000','admin','admin'),('ffcb635a-b508-484d-84d6-1a44e960af0d','Add Sales Return','0edc1b72-e5e9-4658-a456-06906c9aa80d','10','N','Entry','','New Sales Return','a52c4775-308c-4d4c-b1ac-7894dac55a1d','GP','2025-07-13 11:40:50.306000','2025-07-31 15:49:27.260000','admin','admin');
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
INSERT INTO `sub_item` VALUES ('008249fc-a1a5-4ddb-9b42-512f0d26720c','Item Details','','08419323-d4cf-466c-afd7-7a90dd0350ac',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Section',NULL,'','','2025-07-13 13:35:32.939000','2025-07-29 19:47:52.578000','admin','admin'),('02f6309c-5ccc-4345-a1b3-79ff4fdb66cd','Other Details','','221c4e58-dff7-4368-8412-dee82d9581b6',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Tab',NULL,'','','2025-07-13 15:22:13.702000','2025-07-21 16:27:20.538000','admin','admin'),('04a58f00-fd7b-48b4-80ee-576fa5c69e4b','Basic Information','','b5c5ead6-e043-45be-b177-0b90e5f29721',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Section',NULL,'','','2025-07-21 16:22:16.791000','2025-07-21 16:34:41.044000','admin','admin'),('05fc8c78-3259-4a05-8ede-f876168e63f1','Order Details','','3ca59eec-4633-4dfe-97ec-16a940f87717',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','5','','','Mix-Tab',NULL,'','','2025-07-13 13:22:31.096000','2025-07-21 16:38:03.381000','admin','admin'),('07fe8f5e-31cc-4a5c-9ec3-a1322af90b68','Other Details','','927d8556-8fde-454f-8cee-852d6f59ccf0',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Tab',NULL,'','','2025-07-13 15:30:11.163000','2025-07-21 16:27:42.763000','admin','admin'),('0a1f229e-5150-4508-a41e-48de96fa2997','Item Description','','927d8556-8fde-454f-8cee-852d6f59ccf0',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Tab',NULL,'','','2025-07-13 15:30:27.632000','2025-07-21 16:27:48.751000','admin','admin'),('0bdd47a0-eeb0-4f0e-9435-663e12f83bc0','Basic Information','','867559ad-0653-4165-aa8a-ca4363d71913',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Section',NULL,'','','2025-07-21 15:55:28.569000','2025-07-31 15:59:23.589000','admin','admin'),('0fed4934-de2b-4b12-950f-7ca730a0f423','Item Details','','ff7b4a10-5ca1-41ec-be36-90289dd8df32',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Section',NULL,'','','2025-07-21 16:10:22.638000','2025-07-21 16:10:22.638000','admin','admin'),('121de1f3-1a7f-4c45-bb89-b3b79cddab71','Tax Method','','3ca59eec-4633-4dfe-97ec-16a940f87717',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Tab',NULL,'','','2025-07-13 13:22:22.072000','2025-07-21 16:37:59.025000','admin','admin'),('126fa9bc-c98c-4d6e-817b-1d05703bb0f6','Other Details','','c4e8556f-0055-4818-9e44-816f7b2a5157',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Tab',NULL,'','','2025-07-13 12:58:31.098000','2025-07-21 16:36:05.603000','admin','admin'),('182d722b-fda9-4f38-b8f5-fc8f28c96455','Customer info','','cc9725f3-25c0-46b9-bc19-6fd08413c458',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Tab',NULL,'','','2025-07-21 16:21:12.810000','2025-07-21 16:21:12.810000','admin','admin'),('1ba34c07-de15-4151-b29f-853592961519','Other Details','','191bdb96-2f59-4dd2-ae9a-5e8aa2075fb6',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Tab',NULL,'','','2025-07-21 15:51:23.184000','2025-07-31 15:59:08.455000','admin','admin'),('1ce277e8-e51f-471d-a82a-20fb3b8abf49','Bill Details','','16207e60-f981-415a-a683-908229be87b2',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Tab',NULL,'','','2025-07-13 12:02:09.384000','2025-07-31 16:00:05.900000','admin','admin'),('2287b499-e908-4d19-9e59-5a9aa3f52538','General Info','','927d8556-8fde-454f-8cee-852d6f59ccf0',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Tab',NULL,'','','2025-07-13 15:23:03.899000','2025-07-21 16:27:36.736000','admin','admin'),('2db67149-08a5-4e49-94ba-2362f58205f6','Others','','b5c5ead6-e043-45be-b177-0b90e5f29721',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Section',NULL,'','','2025-07-21 16:22:36.898000','2025-07-21 16:34:57.039000','admin','admin'),('2df031e5-b9b6-4393-9b79-11bd15841bdb','Basic Information','','08419323-d4cf-466c-afd7-7a90dd0350ac',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Section',NULL,'','','2025-07-13 13:24:16.409000','2025-07-21 16:39:10.277000','admin','admin'),('2ffa86c3-328a-4153-a4d5-e5a2a9ea5e35','Delivery & payment','','927d8556-8fde-454f-8cee-852d6f59ccf0',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Tab',NULL,'','','2025-07-13 15:30:36.626000','2025-07-21 16:27:56.495000','admin','admin'),('31090ade-d4b6-4a23-b4e2-3776c5efda91','Receive Details','','867559ad-0653-4165-aa8a-ca4363d71913',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Tab',NULL,'','','2025-07-21 15:55:52.280000','2025-07-31 15:59:35.197000','admin','admin'),('322cb8bb-c110-4958-8c35-d1466f515dd6','Contra','','c9fafd10-c441-43f3-96fa-15b7995f4c56',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Tab',NULL,'','List of Contra Vouchers','2025-07-13 11:54:47.030000','2025-07-31 16:05:33.066000','admin','admin'),('32bd7bc7-b072-420c-8d95-221a419ea454','Attachment','','927d8556-8fde-454f-8cee-852d6f59ccf0',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','7','','','Mix-Tab',NULL,'','','2025-07-13 15:31:08.243000','2025-07-21 16:28:11.061000','admin','admin'),('336a359b-ec98-466e-80d8-04053824e6d0','Customer info','','ffcb635a-b508-484d-84d6-1a44e960af0d',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Section',NULL,'','','2025-07-21 16:22:56.752000','2025-07-21 16:33:56.156000','admin','admin'),('33829c2a-b1f3-4691-8d62-7aae67b0ec9f','Tax Information','','927d8556-8fde-454f-8cee-852d6f59ccf0',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','5','','','Mix-Tab',NULL,'','','2025-07-13 15:30:45.535000','2025-07-21 16:28:02.147000','admin','admin'),('38bf478e-b7f5-4e79-8f5c-ec808950b312','Item Details','','ffcb635a-b508-484d-84d6-1a44e960af0d',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Section',NULL,'','','2025-07-21 16:23:03.024000','2025-07-21 16:34:01.183000','admin','admin'),('3c90d955-ccaf-4d69-998f-82de057071df','Others','','08419323-d4cf-466c-afd7-7a90dd0350ac',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Section',NULL,'','','2025-07-13 13:35:41.231000','2025-07-21 16:39:25.574000','admin','admin'),('3ccde9a6-9166-4f66-877f-702a27064ba5','Basic Info','','8690ac58-a5d1-460c-8584-68a758c206e4',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Section',NULL,'','','2025-07-21 16:30:17.593000','2025-07-21 16:31:38.981000','admin','admin'),('3cd6f136-f7c2-4c09-a61b-76156e97183b','Multi-Company Setup','','996f270f-5858-4553-9470-3dddadedc890',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Tab',NULL,'','List of Companies','2025-07-13 11:45:30.115000','2025-07-20 15:18:27.368000','admin','admin'),('3d04ad7d-ceda-4381-8318-711a9a260466','Item Details','','b5c5ead6-e043-45be-b177-0b90e5f29721',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Section',NULL,'','','2025-07-21 16:22:29.395000','2025-07-21 16:34:51.879000','admin','admin'),('4a882c62-66cc-4948-ab3d-7641e7ccad30','Item Details','','8690ac58-a5d1-460c-8584-68a758c206e4',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Section',NULL,'','','2025-07-21 16:30:27.850000','2025-07-21 16:31:28.042000','admin','admin'),('4a9b4672-40ce-4b3a-be31-e3435c168a94','Other Details','','416f2dc6-ef21-4523-8aa6-41090e2c7b33',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Tab',NULL,'','','2025-07-13 13:11:22.472000','2025-07-21 16:36:33.203000','admin','admin'),('4ad68452-78b8-4905-b9ec-a4aa7f990bb5','Payment Details','','76c17f9f-7f00-452c-bf64-3e5fba3435fa',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Tab',NULL,'','','2025-07-21 16:06:52.831000','2025-07-31 16:00:42.767000','admin','admin'),('5063cc04-31f1-4be9-bb21-470b3a78d41c','Basic Information','','ff7b4a10-5ca1-41ec-be36-90289dd8df32',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Section',NULL,'','','2025-07-21 16:10:14.502000','2025-07-21 16:10:14.502000','admin','admin'),('57800517-0cf3-47c2-88b4-1d9377c24b3e','Basic Information','','16207e60-f981-415a-a683-908229be87b2',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Section',NULL,'','','2025-07-13 12:01:51.945000','2025-07-31 15:59:59.099000','admin','admin'),('5c56fdff-9e6c-4df2-bc2a-095bc04d3474','Others','','3ca59eec-4633-4dfe-97ec-16a940f87717',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','7','','','Mix-Tab',NULL,'','','2025-07-13 13:23:00.435000','2025-07-21 16:38:12.527000','admin','admin'),('5ccfe169-e7a8-41b3-9a36-3db6bdbe9475','Sub_Item-test','','5b4d27ea-bcc5-4e60-bf6d-d09abc86ff00',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','P-Button','Edit','Tab',NULL,'Nev-Test','Intro-Test','2025-07-21 12:34:12.516000','2025-07-21 13:10:36.567000','admin','admin'),('5f792cdb-040d-4924-aff0-3bdb008b3585','Terms & Condition','','c4b264c7-73db-4189-85ee-6f72d8fab8fc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','5','','','Tab',NULL,'','','2025-07-13 12:00:50.272000','2025-07-31 15:58:07.002000','admin','admin'),('601196e6-a452-4ec6-acc5-0582739a74de','Attachments','','c4b264c7-73db-4189-85ee-6f72d8fab8fc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','6','','','Tab',NULL,'','','2025-07-13 12:00:58.125000','2025-07-31 15:58:11.930000','admin','admin'),('62182da5-134e-46c0-808e-66a8f284bc04','Tax Method','','cc9725f3-25c0-46b9-bc19-6fd08413c458',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Tab',NULL,'','','2025-07-21 16:21:28.655000','2025-07-21 16:21:28.655000','admin','admin'),('6300bd2a-c0cb-4328-bcfb-699f0db25df5','Shipping Information','','c4b264c7-73db-4189-85ee-6f72d8fab8fc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Tab',NULL,'','','2025-07-13 12:00:41.514000','2025-07-31 15:58:02.832000','admin','admin'),('6330c9b1-7f90-4e86-bd23-c5c194c47fae','Other Details','','ede3d41b-e4c6-43c7-82f0-5423292b1fdc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Tab',NULL,'','','2025-07-21 16:09:12.204000','2025-07-31 16:04:01.472000','admin','admin'),('66b6b3b7-e0a2-48a0-b7ee-666ff68b0cf6','Contact Person','','c4e8556f-0055-4818-9e44-816f7b2a5157',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Tab',NULL,'','','2025-07-13 12:58:23.702000','2025-07-21 16:36:00.247000','admin','admin'),('67d96bef-f1c0-44c7-add3-f7acd9a59080','Payment','','c9fafd10-c441-43f3-96fa-15b7995f4c56',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Tab',NULL,'','List of Payment Vouchers','2025-07-13 11:54:38.971000','2025-07-31 16:05:26.362000','admin','admin'),('68178556-ab23-430d-a033-f1f0e95e8a38','Journal','','c9fafd10-c441-43f3-96fa-15b7995f4c56',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Tab',NULL,'','List of Journal Vouchers','2025-07-13 11:55:00.045000','2025-07-31 16:05:40.197000','admin','admin'),('72a8002f-11ae-46bd-b22a-ff2e46be5b00','Other Details','','867559ad-0653-4165-aa8a-ca4363d71913',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Tab',NULL,'','','2025-07-21 15:55:44.891000','2025-07-31 15:59:32.254000','admin','admin'),('7c019e8b-100b-4421-acf3-42ac60cde3d2','Others','','ffcb635a-b508-484d-84d6-1a44e960af0d',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Section',NULL,'','','2025-07-21 16:25:51.369000','2025-07-21 16:34:05.995000','admin','admin'),('7c30cde5-d27c-4243-9033-e518a8760652','Payment','','eebc0ad6-3c6e-4add-87c5-45b0c4229121',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Section',NULL,'','New Payment Voucher','2025-07-13 11:51:31.165000','2025-07-31 15:56:11.268000','admin','admin'),('804b13fb-c63d-4029-b78b-c3ad3bff648a','Other Details','','76c17f9f-7f00-452c-bf64-3e5fba3435fa',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Tab',NULL,'','','2025-07-21 16:06:43.831000','2025-07-31 16:00:39.472000','admin','admin'),('81f3b76e-1491-4391-b95b-13f0815d355a','Others','','8690ac58-a5d1-460c-8584-68a758c206e4',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','6','','','Mix-Section',NULL,'','','2025-07-21 16:33:06.862000','2025-07-21 16:33:06.862000','admin','admin'),('83052c79-c91a-451b-b81a-12368d6ff1e1','Receive Details','','191bdb96-2f59-4dd2-ae9a-5e8aa2075fb6',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Tab',NULL,'','','2025-07-21 15:51:31.622000','2025-07-31 15:59:11.451000','admin','admin'),('84de4e77-e14b-4e9e-9ca4-639a84f8dd85','Primary Information','','221c4e58-dff7-4368-8412-dee82d9581b6',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Tab',NULL,'','','2025-07-13 15:21:42.491000','2025-07-21 16:27:04.161000','admin','admin'),('863c35e8-cf63-4945-9069-114ee8611970','Terms & Condition','','16207e60-f981-415a-a683-908229be87b2',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Tab',NULL,'','','2025-07-13 12:02:24.871000','2025-07-31 16:00:09.111000','admin','admin'),('87b20204-504f-46a1-a6bc-dbe8203a98cd','Terms & Condition','','416f2dc6-ef21-4523-8aa6-41090e2c7b33',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','6','','','Mix-Tab',NULL,'','','2025-07-13 13:12:04.568000','2025-07-21 16:37:11.169000','admin','admin'),('886f4e6b-6a2f-4574-89ed-491d57fd001c','General Info','','416f2dc6-ef21-4523-8aa6-41090e2c7b33',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Tab',NULL,'','','2025-07-13 13:11:12.299000','2025-07-21 16:36:26.677000','admin','admin'),('940d66dd-93f5-4f3a-a222-af37a2a42032','Item Details','','ede3d41b-e4c6-43c7-82f0-5423292b1fdc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Tab',NULL,'','','2025-07-21 16:09:03.102000','2025-07-31 16:03:57.906000','admin','admin'),('9727a302-2d5f-41a5-abf3-4a9ed3b326e9','Delivary Details','','3ca59eec-4633-4dfe-97ec-16a940f87717',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Tab',NULL,'','','2025-07-13 13:22:13.596000','2025-07-21 16:37:55.181000','admin','admin'),('97b6abd5-e82d-41ce-8644-ff92d4345628','Attachment','','416f2dc6-ef21-4523-8aa6-41090e2c7b33',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','7','','','Mix-Tab',NULL,'','','2025-07-13 13:12:11.603000','2025-07-21 16:37:14.808000','admin','admin'),('999af9fb-4c77-4572-be25-51d1002dc9cd','Configure Sales','','8690ac58-a5d1-460c-8584-68a758c206e4',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Section',NULL,'','','2025-07-21 16:30:45.691000','2025-07-21 16:32:03.974000','admin','admin'),('9b146eff-2aec-4664-b44d-8616e8a8ca4c','Tags','','c4b264c7-73db-4189-85ee-6f72d8fab8fc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','7','','','Tab',NULL,'','','2025-07-13 12:01:07.835000','2025-07-31 15:58:15.416000','admin','admin'),('9c9cc1e2-5aa6-45d0-b31e-299f5b439874','Delivary Details','','cc9725f3-25c0-46b9-bc19-6fd08413c458',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Tab',NULL,'','','2025-07-21 16:21:20.370000','2025-07-21 16:21:20.370000','admin','admin'),('9d2581f4-4251-4a57-87cd-58ba9d7b528b','Item Description','','416f2dc6-ef21-4523-8aa6-41090e2c7b33',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Tab',NULL,'','','2025-07-13 13:11:31.773000','2025-07-21 16:36:54.993000','admin','admin'),('9d9a10c0-6e8a-402d-b554-a0401f8240cc','Contra','','eebc0ad6-3c6e-4add-87c5-45b0c4229121',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Section',NULL,'','New Contra Voucher','2025-07-13 11:51:39.044000','2025-07-31 15:56:20.362000','admin','admin'),('a1c4491f-4257-4de8-a06c-8934629a1181','Vendor Contact','','16207e60-f981-415a-a683-908229be87b2',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Tab',NULL,'','','2025-07-13 12:02:01.465000','2025-07-31 16:00:02.766000','admin','admin'),('a2b84135-7fac-4124-ab83-8ed7772b911c','Basic Information','','76c17f9f-7f00-452c-bf64-3e5fba3435fa',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Section',NULL,'','','2025-07-21 16:06:17.067000','2025-07-31 16:00:29.991000','admin','admin'),('a5c7cad4-1427-467e-8777-ca7d5e8a9167','Customer Contact','','c4b264c7-73db-4189-85ee-6f72d8fab8fc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Tab',NULL,'','','2025-07-13 12:00:21.593000','2025-07-31 15:57:51.590000','admin','admin'),('a68f274d-1e1d-49c0-9d3e-9886e88d03a1','Others','','4067bdff-f934-4b53-bb74-fc2a7157f6ec',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Sec',NULL,'','','2025-07-13 13:33:05.039000','2025-07-28 12:52:06.398000','admin','admin'),('abbd4e9b-11a8-411a-ba46-8bd102c34314','Other Details','','ff7b4a10-5ca1-41ec-be36-90289dd8df32',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Section',NULL,'','','2025-07-21 16:10:31.869000','2025-07-21 16:10:31.869000','admin','admin'),('abfd8147-e58d-47cd-8111-2ab6326bd273','Vendor info','','4067bdff-f934-4b53-bb74-fc2a7157f6ec',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Section',NULL,'','','2025-07-13 13:32:36.485000','2025-07-21 16:38:49.274000','admin','admin'),('ae6938fe-ade0-4740-b820-82da31d1305e','Multi-Currencty Setup','','9994f272-6709-4608-9fa2-b1f61f4049c4',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Tab',NULL,'','List of Currencies','2025-07-13 11:45:44.034000','2025-07-29 17:50:41.664000','admin','admin'),('b0282fa8-750c-42c1-ac98-a06fc2ae65b6','Basic Information','','3ca59eec-4633-4dfe-97ec-16a940f87717',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Tab',NULL,'','','2025-07-13 13:21:52.777000','2025-07-21 16:37:37.002000','admin','admin'),('b1b2e257-66e2-4e8a-ab01-c06f625f0669','Terms & Condition','','3ca59eec-4633-4dfe-97ec-16a940f87717',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','6','','','Mix-Tab',NULL,'','','2025-07-13 13:22:39.455000','2025-07-21 16:38:08.100000','admin','admin'),('b91950bd-7306-493a-9a85-63b29463d81a','Other Details','','edee2a02-298d-4da1-a0ce-6c28711b3f91',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Section',NULL,'','','2025-07-21 15:56:34.671000','2025-07-21 15:56:34.671000','admin','admin'),('bb315402-7f6a-4f29-9f3f-e921a0f5aa2f','Attachments','','16207e60-f981-415a-a683-908229be87b2',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','5','','','Tab',NULL,'','','2025-07-13 12:02:43.942000','2025-07-31 16:00:12.706000','admin','admin'),('c1c319c2-6691-412d-a618-a7a7b9b745c5','Basic Information','','ede3d41b-e4c6-43c7-82f0-5423292b1fdc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Section',NULL,'','','2025-07-21 16:08:55.605000','2025-07-31 16:00:54.232000','admin','admin'),('c375b6e7-0736-49be-9f43-fe249a31586b','Terms & Condition','','927d8556-8fde-454f-8cee-852d6f59ccf0',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','6','','','Mix-Tab',NULL,'','','2025-07-13 15:30:58.597000','2025-07-21 16:28:06.771000','admin','admin'),('c3b8ee89-3784-4557-8dde-4e55ab8844c7','Delivery & payment','','416f2dc6-ef21-4523-8aa6-41090e2c7b33',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Mix-Tab',NULL,'','','2025-07-13 13:11:41.549000','2025-07-21 16:36:59.126000','admin','admin'),('c47f80c5-3ef7-4876-b361-3a52a635bc13','Primary Info','','c4e8556f-0055-4818-9e44-816f7b2a5157',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Tab',NULL,'','','2025-07-13 12:57:10.505000','2025-07-21 16:35:46.490000','admin','admin'),('c6c2ce6d-cdce-4fd2-a954-e01fcab285bd','Terms & Condition','','cc9725f3-25c0-46b9-bc19-6fd08413c458',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','6','','','Mix-Tab',NULL,'','','2025-07-21 16:21:43.913000','2025-07-21 16:21:43.913000','admin','admin'),('c732abc2-2753-4ab4-8d7f-76beafb3fad5','Order Details','','cc9725f3-25c0-46b9-bc19-6fd08413c458',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','5','','','Mix-Tab',NULL,'','','2025-07-21 16:21:36.494000','2025-07-21 16:21:36.494000','admin','admin'),('c741d50c-0945-4af5-819b-8338fc872a08','Vendor info','','3ca59eec-4633-4dfe-97ec-16a940f87717',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Tab',NULL,'','','2025-07-13 13:22:01.609000','2025-07-21 16:37:43.530000','admin','admin'),('c8bbbbe7-b805-43fc-b073-6b23d46fbfd6','Configure Inventory','','8690ac58-a5d1-460c-8584-68a758c206e4',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','5','','','Mix-Section',NULL,'','','2025-07-21 16:32:58.623000','2025-07-21 16:32:58.623000','admin','admin'),('c9043159-1fe0-40d9-851a-665fb933612e','Remarks','','221c4e58-dff7-4368-8412-dee82d9581b6',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','5','','','Mix-Tab',NULL,'','','2025-07-13 15:22:23.847000','2025-07-21 16:27:26.306000','admin','admin'),('ce2d0a89-dfa1-4b63-94a5-074b40d32161','Contact Person','','221c4e58-dff7-4368-8412-dee82d9581b6',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Tab',NULL,'','','2025-07-13 15:22:05.653000','2025-07-21 16:27:15.219000','admin','admin'),('d1acba50-2121-49b7-a3bb-fae1c7ed1605','Item Details','','edee2a02-298d-4da1-a0ce-6c28711b3f91',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Section',NULL,'','','2025-07-21 15:56:25.462000','2025-07-21 15:56:25.462000','admin','admin'),('d1b6d2a6-9046-4f6e-afd1-207baa7ae478','Company Setup','','996f270f-5858-4553-9470-3dddadedc890',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Tab',NULL,'','Setup your company','2025-07-13 11:45:21.068000','2025-07-20 15:18:19.186000','admin','admin'),('d32ae6e7-da66-4b8a-8113-23037c2bf0b0','Vendor info','','08419323-d4cf-466c-afd7-7a90dd0350ac',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Section',NULL,'','','2025-07-13 13:35:24.673000','2025-07-21 16:39:17.415000','admin','admin'),('d493cef0-a04c-4278-bbd1-8b563417fa2d','Remarks','','c4e8556f-0055-4818-9e44-816f7b2a5157',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','5','','','Mix-Tab',NULL,'','','2025-07-13 12:58:38.984000','2025-07-21 16:36:10.359000','admin','admin'),('d51ec6a2-06f6-412e-95bb-a29165269549','Configure Purchase','','8690ac58-a5d1-460c-8584-68a758c206e4',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Section',NULL,'','','2025-07-21 16:30:36.174000','2025-07-21 16:31:44.759000','admin','admin'),('d5c736fa-e451-4641-92ca-b78ee2f53d4a','Basic Information','','cc9725f3-25c0-46b9-bc19-6fd08413c458',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Tab',NULL,'','','2025-07-21 16:21:03.492000','2025-07-21 16:21:03.492000','admin','admin'),('d5fb6786-394e-47d8-a432-c5a248bab471','Basic Information','','edee2a02-298d-4da1-a0ce-6c28711b3f91',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Section',NULL,'','','2025-07-21 15:56:08.096000','2025-07-21 15:56:17.494000','admin','admin'),('dbb5f5af-2c43-4ee3-919c-29d29986ddb5','Basic Information','','c4b264c7-73db-4189-85ee-6f72d8fab8fc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Section',NULL,'','','2025-07-13 12:00:02.155000','2025-07-31 15:57:28.379000','admin','admin'),('dd71bbb8-0f91-44f6-ad79-97dc3364d2d0','Invoice Details','','c4b264c7-73db-4189-85ee-6f72d8fab8fc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Tab',NULL,'','','2025-07-13 12:00:32.577000','2025-07-31 15:57:54.803000','admin','admin'),('dd7fac19-a7bd-4a27-b6e0-0cea5526e193','Tags','','16207e60-f981-415a-a683-908229be87b2',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','6','','','Tab',NULL,'','','2025-07-13 12:02:56.011000','2025-07-31 16:00:23.478000','admin','admin'),('ddc832e2-49e7-4249-8085-229c5faa4cf0','Item Details','','867559ad-0653-4165-aa8a-ca4363d71913',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Tab',NULL,'','','2025-07-21 15:55:36.616000','2025-07-31 15:59:28.631000','admin','admin'),('dfe1b7dc-9552-413a-a738-58a6676f6c38','Basic Information','','4067bdff-f934-4b53-bb74-fc2a7157f6ec',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Section',NULL,'','','2025-07-13 13:24:07.010000','2025-07-21 16:38:21.013000','admin','admin'),('e24302e4-2292-429c-83dc-8babc0a01ea5','Tax Information','','416f2dc6-ef21-4523-8aa6-41090e2c7b33',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','5','','','Mix-Tab',NULL,'','','2025-07-13 13:11:54.083000','2025-07-21 16:37:03.957000','admin','admin'),('e2a7d3cb-294c-41b5-bb5c-cd0e053b803b','Address','','c4e8556f-0055-4818-9e44-816f7b2a5157',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Tab',NULL,'','','2025-07-13 12:57:30.206000','2025-07-21 16:35:51.816000','admin','admin'),('e2fd1cc6-c439-4524-aca0-889b6b5e846b','Basic Information','','ffcb635a-b508-484d-84d6-1a44e960af0d',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Mix-Section',NULL,'','','2025-07-21 16:22:49.657000','2025-07-21 16:33:49.588000','admin','admin'),('ea036931-3706-4fdf-afbb-7a2824ad1ff0','Basic Information','','191bdb96-2f59-4dd2-ae9a-5e8aa2075fb6',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Section',NULL,'','','2025-07-21 15:51:00.323000','2025-07-31 15:58:59.293000','admin','admin'),('ea6168e3-98e6-4f01-b4cd-b8fb0f54da15','Journal','','eebc0ad6-3c6e-4add-87c5-45b0c4229121',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Section',NULL,'','New Journal Voucher','2025-07-13 11:51:47.664000','2025-07-31 15:56:29.446000','admin','admin'),('ead682b1-649f-46bd-85d6-8647bab03165','Item Details','','76c17f9f-7f00-452c-bf64-3e5fba3435fa',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Tab',NULL,'','','2025-07-21 16:06:27.003000','2025-07-31 16:00:33.699000','admin','admin'),('ec3ae7f0-ac20-44d6-a2d7-9ddc6d94fad0','Receive','','c9fafd10-c441-43f3-96fa-15b7995f4c56',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Tab',NULL,'','List of Receive Vouchers','2025-07-13 11:54:24.421000','2025-07-31 16:05:19.095000','admin','admin'),('ee795db3-a07a-46af-b352-7565cde10bfc','Address','','221c4e58-dff7-4368-8412-dee82d9581b6',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Tab',NULL,'','','2025-07-13 15:21:52.112000','2025-07-21 16:27:09.458000','admin','admin'),('efa47c5c-e9d6-4c1e-9527-f06fb642711d','Others','','cc9725f3-25c0-46b9-bc19-6fd08413c458',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','7','','','Mix-Tab',NULL,'','','2025-07-21 16:21:56.418000','2025-07-21 16:21:56.418000','admin','admin'),('f7351fb3-6f1b-40aa-b908-5e4cd4f67a4f','Item Details','','191bdb96-2f59-4dd2-ae9a-5e8aa2075fb6',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Tab',NULL,'','','2025-07-21 15:51:14.052000','2025-07-31 15:59:03.607000','admin','admin'),('fa53a855-c733-4645-9cb8-eb52a3ad898e','Receive','','eebc0ad6-3c6e-4add-87c5-45b0c4229121',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','1','','','Section',NULL,'','New Receive Voucher','2025-07-13 11:51:20.388000','2025-07-31 15:55:57.968000','admin','admin'),('fc6c33dc-39ae-4c3a-916b-e6ddaecfaeeb','Item Details','','4067bdff-f934-4b53-bb74-fc2a7157f6ec',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','3','','','Mix-Section',NULL,'','','2025-07-13 13:32:53.696000','2025-07-21 16:38:55.092000','admin','admin'),('fdcc3907-6763-4804-be8c-5a21ea508356','Customer info','','b5c5ead6-e043-45be-b177-0b90e5f29721',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2','','','Mix-Section',NULL,'','','2025-07-21 16:22:23.091000','2025-07-21 16:34:45.184000','admin','admin'),('fe6ff73a-b5b7-4d35-a7fa-0edafd99da70','Payment Details','','ede3d41b-e4c6-43c7-82f0-5423292b1fdc',NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','4','','','Tab',NULL,'','','2025-07-21 16:09:21.053000','2025-07-31 16:04:04.859000','admin','admin');
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
INSERT INTO `sub_sub_item` VALUES ('0566c117-fd04-45b9-8b65-b629116e6467','Organogram Setup','d1b6d2a6-9046-4f6e-afd1-207baa7ae478','','Tab','','','5',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-31 16:11:05.944000','2025-07-31 16:11:05.944000','admin','admin',''),('19e52c96-a06a-4f07-afa7-b227d4dd5fa8','Department Setup','d1b6d2a6-9046-4f6e-afd1-207baa7ae478','','Tab','','','3',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-31 16:10:41.105000','2025-08-07 19:20:10.829000','admin','admin',''),('72b31fa5-7ee3-4e94-97a8-687a4289052d','Designation Setup','d1b6d2a6-9046-4f6e-afd1-207baa7ae478','','Tab','','','4',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-31 16:10:54.902000','2025-08-07 19:20:27.383000','admin','admin',''),('9ead731f-c832-44a4-8da2-c73d1ab32a55','Company Info','d1b6d2a6-9046-4f6e-afd1-207baa7ae478','','Section','','','1',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-31 16:09:52.428000','2025-07-31 16:10:12.525000','admin','admin',''),('d6bfa883-6314-4ae2-8a77-3257887b9dec','Location Setup','d1b6d2a6-9046-4f6e-afd1-207baa7ae478','','Tab','','','2',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-31 16:10:08.384000','2025-07-31 16:10:08.384000','admin','admin',''),('e23e7fea-877b-4a0b-83a5-758857dc569c','SS_Item-test','5ccfe169-e7a8-41b3-9a36-3db6bdbe9475','','Mix-Tab','Button-Test','Nev-Test','1',NULL,NULL,'a52c4775-308c-4d4c-b1ac-7894dac55a1d','2025-07-21 12:34:49.302000','2025-07-21 13:09:49.492000','admin','admin','Edit Button');
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
/*!50003 DROP PROCEDURE IF EXISTS `GetAllButton` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllButton`()
BEGIN
SELECT * FROM button order by CAST(serialNumber AS UNSIGNED);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
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
        CAST(md.serialNumber AS UNSIGNED),
        CAST(app.serialNumber AS UNSIGNED),
        CAST( menu.serialNumber AS UNSIGNED),
        CAST(item.serialNumber AS UNSIGNED),
        CAST(fi.serialNumber AS UNSIGNED);
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
		CAST(md.serialNumber AS UNSIGNED),
        CAST(app.serialNumber AS UNSIGNED),
        CAST( menu.serialNumber AS UNSIGNED),
        CAST(item.serialNumber AS UNSIGNED),
		CAST(dp.serialNumber AS UNSIGNED),
        CAST(fi.serialNumber AS UNSIGNED);
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
    ORDER BY 
        CAST(md.serialNumber AS UNSIGNED),
        CAST(app.serialNumber AS UNSIGNED),
       CAST( menu.serialNumber AS UNSIGNED),
        CAST(i.serialNumber AS UNSIGNED),
--         si.serialNumber,
--         ssi.serialNumber,
--         sssi.serialNumber,
        CAST(fi.serialNumber AS UNSIGNED),
		CAST(dp.serialNumber AS UNSIGNED)
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
SELECT item.name as itemName,si.name as subItemName,ssi.name as subSubItemName,sssi.name as subsubsubItemName,
field.fieldGroupCode,field.tier,field.displayType as dpgroupDisplayType,dgm.* ,
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
left join sub_sub_sub_item sssi on dgm.subSubSubItemId=sssi.id
    ORDER BY 
        CAST(md.serialNumber AS UNSIGNED),
        CAST(app.serialNumber AS UNSIGNED),
        CAST( menu.serialNumber AS UNSIGNED),
        CAST(item.serialNumber AS UNSIGNED),
--         si.serialNumber,
--         ssi.serialNumber,
--         sssi.serialNumber,
        CAST(field.serialNumber AS UNSIGNED);
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
left join sub_sub_sub_item sssi on sssi.subSubItemId=ssi.id
    ORDER BY 
        CAST(md.serialNumber AS UNSIGNED),
        CAST(app.serialNumber AS UNSIGNED),
        CAST( menu.serialNumber AS UNSIGNED),
        CAST(item.serialNumber AS UNSIGNED),
--         si.serialNumber,
--         ssi.serialNumber,
--         sssi.serialNumber,
        CAST(field.serialNumber AS UNSIGNED);
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
    md.serialNumber AS moduleserialNumber,
    md.name AS modulename,
    app.serialNumber AS appserialNumber,
    app.name AS appname,
    menu.serialNumber AS menuserialNumber,
    menu.title,

    item.serialNumber AS itemserialNumber,
    item.name AS itemName,
    item.itemType AS itemType,
    item.buttonType AS regName,
    item.buttonLabel AS itemViewEntry,
    item.description AS itemdescription,
    si.serialNumber AS siserialNumber,
    si.name AS siitem,
    si.layout AS silayout,
    si.description AS sidescription,
    si.buttonLabel AS sibuttonLabel,
    si.navigationTo AS sisinavigationTo,

    ssi.serialNumber AS ssiserialNumber,
    ssi.name AS ssiname,
    ssi.layout AS ssilayout,
    ssi.buttonLabel AS ssibuttonLabel,
    ssi.navigationTo AS ssinavigationTo,

    sssi.serialNumber AS sssiserialNumber,
    sssi.name AS sssiname,
    sssi.layout AS sssilayout,

    fi.serialNumber AS groupserialNumber,
    fi.fieldGroupCode,
    fi.id AS dpgroupid,
    fi.tier AS dpgrouptier,
    fi.displayType AS dpgroupdisplay,
    fi.description AS dpgroupremarks,

    dp.*

FROM modules md 
INNER JOIN app ON md.id = app.moduleId
INNER JOIN menu ON app.id = menu.appId
INNER JOIN item ON menu.id = item.menuId

-- item to sub-items
LEFT JOIN sub_item si ON item.id = si.itemId
LEFT JOIN sub_sub_item ssi ON si.id = ssi.subItemId
LEFT JOIN sub_sub_sub_item sssi ON ssi.id = sssi.subSubItemId
-- item to field (group)
LEFT JOIN field fi ON fi.itemId = item.id
-- item to datapoint directly (so we can check connection)
LEFT JOIN datapoint dp ON dp.itemid = item.id
-- filter mapping of datapoint to field
LEFT JOIN datapointmap dpm ON dpm.itemId = item.id AND dpm.dpGroupId = fi.id AND dpm.dataPointId = dp.id
-- optional other joins (not affecting dp mapping logic)
LEFT JOIN dpgroupmap ON dpgroupmap.itemId = item.id and dpgroupmap.subItemId=si.id and dpgroupmap.subSubItemId=ssi.id and dpgroupmap.subSubSubItemId=sssi.id
LEFT JOIN template_button_map tbm ON tbm.itemId = item.id
LEFT JOIN button b ON b.id = tbm.buttonName
-- finally: only keep datapoint if it's mapped to the field
WHERE (dpm.dataPointId IS NOT NULL OR dp.id IS NULL)
ORDER BY 
    CAST(md.serialNumber AS UNSIGNED),
    CAST(app.serialNumber AS UNSIGNED),
    CAST(menu.serialNumber AS UNSIGNED),
    CAST(item.serialNumber AS UNSIGNED),
    CAST(si.serialNumber AS UNSIGNED),
    CAST(ssi.serialNumber AS UNSIGNED),
    CAST(sssi.serialNumber AS UNSIGNED),
    CAST(fi.serialNumber AS UNSIGNED),
    CAST(dp.serialNumber AS UNSIGNED);
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

-- Dump completed on 2025-08-07 20:48:58
