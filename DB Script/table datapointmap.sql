CREATE TABLE `datapointmap` (
  `id` varchar(36) NOT NULL,
  `itemId` varchar(255) NOT NULL,
  `dpGroupId` varchar(255) NOT NULL,
  `dataPointId` varchar(255) NOT NULL,
  `serialNumber` varchar(255) DEFAULT NULL,
  `dataType` varchar(255) DEFAULT NULL,
  `userId` varchar(255) NOT NULL,
  `isHide` tinyint NOT NULL DEFAULT '0',
  `isRequired` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
