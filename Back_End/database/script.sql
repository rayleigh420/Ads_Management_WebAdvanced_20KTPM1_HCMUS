CREATE TABLE `district` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `department_officier` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`)
);

ALTER TABLE `district_officier` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `manage_district_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `modification_request` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `new_location_id` INT NOT NULL,
    `request_time` DATETIME NOT NULL,
    `reason` TEXT NOT NULL,
    `officer_id` INT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `license_request` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `advertising_board_id` INT NOT NULL,
    `email_of_company` VARCHAR(50) NOT NULL,
    `phone_number_of_company` VARCHAR(12) NOT NULL,
    `address_of_company` VARCHAR(200) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `status` INT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `user` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(12) NULL,
    `date_of_birth` DATE NOT NULL,
    `auth_provider` INT,
    `role_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`role_id`) REFERENCES `role`(`id`)
);

CREATE TABLE `advertising_location` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `lat` VARCHAR(20) NOT NULL,
    `long` VARCHAR(20) NOT NULL,
    `location_type` INT NOT NULL,
    `advertising_type` INT NOT NULL,
    `image_id` INT NULL,
    `is_planned` TINYINT NOT NULL DEFAULT '1',
    `ward_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`ward_id`) REFERENCES `ward`(`id`)
);

CREATE TABLE `report` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `report_type` INT NOT NULL,
    `fullname_of_reporter` BIGINT NOT NULL,
    `email_of_reporter` VARCHAR(50) NULL,
    `phone_number_of_reporter` VARCHAR(12) NOT NULL,
    `content` TEXT NOT NULL,
    `image_id` INT UNSIGNED NULL COMMENT 'toi da 2 hinhn',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `udpated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `role` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `ward_officier` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `officier_id` INT UNSIGNED NULL,
    `manage_ward_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `ward` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `district_id` INt UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`district_id`) REFERENCES `district`(`id`)
);

CREATE TABLE `advertising_board` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `location_id` INT UNSIGNED NOT NULL,
    `size` VARCHAR(20) NULL,
    `board_type` INT NOT NULL ,
    `image_id` INT UNSIGNED NULL,
    `expireDate` DATE NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`location_id`) REFERENCES `advertising_location`(`id`)
);

ALTER TABLE `district_officier` ADD CONSTRAINT `district_officier_manage_district_id_foreign` FOREIGN KEY (`manage_district_id`) REFERENCES `district` (`id`);
ALTER TABLE `advertising_board` ADD CONSTRAINT `advertising_board_location_id_foreign` FOREIGN KEY (`location_id`) REFERENCES `advertising_location` (`id`);
ALTER TABLE `user` ADD CONSTRAINT `user_id_foreign` FOREIGN KEY (`id`) REFERENCES `ward_officier` (`id`);
ALTER TABLE `user` ADD CONSTRAINT `user_id_foreign_2` FOREIGN KEY (`id`) REFERENCES `modification_request` (`id`);
ALTER TABLE `ward` ADD CONSTRAINT `ward_district_id_foreign` FOREIGN KEY (`district_id`) REFERENCES `district` (`id`);
ALTER TABLE `ward_officier` ADD CONSTRAINT `ward_officier_manage_ward_id_foreign` FOREIGN KEY (`manage_ward_id`) REFERENCES `ward` (`id`);
ALTER TABLE `advertising_location` ADD CONSTRAINT `advertising_location_ward_id_foreign` FOREIGN KEY (`ward_id`) REFERENCES `ward` (`id`);
ALTER TABLE `department_officier` ADD CONSTRAINT `department_officier_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `user` ADD CONSTRAINT `user_id_foreign_3` FOREIGN KEY (`id`) REFERENCES `district_officier` (`id`);
