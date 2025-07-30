CREATE TABLE `button` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `serialNumber` varchar(255) NOT NULL,
  `buttonAction` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
