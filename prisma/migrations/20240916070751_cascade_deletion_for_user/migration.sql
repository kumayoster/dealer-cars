-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_carId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Cars`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
