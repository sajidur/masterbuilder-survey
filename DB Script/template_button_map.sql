CREATE TABLE `template_button_map` (
  `id` varchar(36) NOT NULL,
  `itemId` varchar(255) NOT NULL,
  `dfGroupId` varchar(255) NOT NULL,
  `subitemId` varchar(255) NOT NULL,
  `subsubitemId` varchar(255) NOT NULL,
  `subsubsubitemId` varchar(255) NOT NULL,
  `serialNumber` int NOT NULL,
  `buttonName` varchar(255) NOT NULL,
  `buttonAction` varchar(255) NOT NULL,
  `buttonType` varchar(255) NOT NULL,
  `navigationTo` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

