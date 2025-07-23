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
  `createdAt` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
