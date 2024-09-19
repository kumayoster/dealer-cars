/*
  Warnings:

  - Made the column `username` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(255) NULL,
    MODIFY `username` VARCHAR(32) NOT NULL;
