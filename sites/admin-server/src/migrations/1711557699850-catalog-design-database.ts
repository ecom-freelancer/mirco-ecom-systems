import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711557699850 implements MigrationInterface {
    name = 'Migration1711557699850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`jobs\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`detated_at\` datetime(6) NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NULL, \`status\` enum ('pending', 'processing', 'completed', 'failed') NULL DEFAULT 'pending', \`action\` enum ('import_inventory_sku') NOT NULL, \`job_key\` varchar(255) NULL, \`source\` text NULL, \`total_task\` int NULL DEFAULT '0', \`completed_task\` int NULL DEFAULT '0', \`failed_task\` int NULL DEFAULT '0', UNIQUE INDEX \`IDX_ba8cef5776e910f9f053ec5ec6\` (\`job_key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job_tasks_entity\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`detated_at\` datetime(6) NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`job_id\` int NOT NULL, \`status\` enum ('pending', 'processing', 'completed', 'failed') NULL DEFAULT 'pending', \`source\` text NULL, \`message\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`seo_infos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`short_description\` text NULL, \`image\` varchar(255) NULL, \`keywords\` text NOT NULL, \`no_index\` tinyint NULL DEFAULT 0, \`canonial\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(24) NOT NULL, \`order\` double NOT NULL, \`image\` text NULL, \`display\` tinyint NULL DEFAULT 0, \`seo_info_id\` int NULL, \`parent_id\` int NULL, UNIQUE INDEX \`IDX_03fac833e3bd77ac8884680530\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`detated_at\` datetime(6) NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`slug\` varchar(50) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`user_manual\` text NULL, \`images\` text NULL, \`brand\` varchar(255) NOT NULL, \`keywords\` varchar(255) NULL, \`delivery_type\` enum ('only_by_email') NOT NULL, \`product_status\` enum ('draft', 'published', 'hide') NULL DEFAULT 'draft', \`seo_info_id\` int NULL, \`category_id\` int NULL, UNIQUE INDEX \`IDX_464f927ae360106b783ed0b410\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_attributes\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`detated_at\` datetime(6) NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`order\` double NOT NULL DEFAULT '0', \`show_name_in_content\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_attribute_options\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`detated_at\` datetime(6) NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`amount\` int NULL DEFAULT '1', \`order\` double NULL, \`attribute_id\` int NOT NULL, UNIQUE INDEX \`IDX_ffdc60ecce53be6b5d0bb798d2\` (\`name\`, \`attribute_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_attribute_group_items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`attribute_group_id\` int NOT NULL, \`attribute_id\` int NOT NULL, \`attribute_option_id\` int NOT NULL, UNIQUE INDEX \`IDX_84e90f5a53f7b9fb86b688272d\` (\`attribute_group_id\`, \`attribute_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_attribute_groups\` (\`id\` int NOT NULL AUTO_INCREMENT, \`product_id\` int NOT NULL, \`sku\` varchar(255) NULL, UNIQUE INDEX \`REL_1bc6d3fb7b848db20b21d6aeef\` (\`sku\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_skus\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`detated_at\` datetime(6) NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`sku\` varchar(100) NOT NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(100) NOT NULL, \`description\` text NULL, \`sellable\` tinyint NULL DEFAULT 0, \`sell_price\` double NOT NULL DEFAULT '0', \`list_price\` double NOT NULL DEFAULT '0', \`seo_info_id\` int NULL, \`product_id\` int NOT NULL, \`variant_id\` int NULL, UNIQUE INDEX \`IDX_2f61ca6320aadc7ad6de50e039\` (\`slug\`), UNIQUE INDEX \`REL_0989b42726d65e528e5b221a01\` (\`variant_id\`), PRIMARY KEY (\`sku\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sku_inventories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sku\` int NOT NULL, \`total_volume\` int NULL DEFAULT '0', UNIQUE INDEX \`REL_ef0bd07b0e201194eae3ad9d19\` (\`sku\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`inventory_entities\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`detated_at\` datetime(6) NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`bar_code\` text NOT NULL, \`has_key\` varchar(255) NULL DEFAULT '', \`status\` enum ('enable', 'draft', 'sold') NOT NULL DEFAULT 'draft', \`sku_inventory_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`app_variables\` (\`key\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`type\` enum ('string', 'number', 'boolean', 'json', 'array') NOT NULL DEFAULT 'string', \`value\` text NOT NULL, PRIMARY KEY (\`key\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product_categories\` ADD CONSTRAINT \`FK_696a0ac1840e051e93935685b7d\` FOREIGN KEY (\`seo_info_id\`) REFERENCES \`seo_infos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_categories\` ADD CONSTRAINT \`FK_5f151d414daab0290f65b517ed4\` FOREIGN KEY (\`parent_id\`) REFERENCES \`product_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_83c2fdecbbb6bf789e55fa084fd\` FOREIGN KEY (\`seo_info_id\`) REFERENCES \`seo_infos\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9a5f6868c96e0069e699f33e124\` FOREIGN KEY (\`category_id\`) REFERENCES \`product_categories\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_options\` ADD CONSTRAINT \`FK_1c7ac1b88618b3f5558424e8b6d\` FOREIGN KEY (\`attribute_id\`) REFERENCES \`product_attributes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_group_items\` ADD CONSTRAINT \`FK_4b9137b25360aee52dcfa730c49\` FOREIGN KEY (\`attribute_group_id\`) REFERENCES \`product_attribute_groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_group_items\` ADD CONSTRAINT \`FK_84f2f5a5cd17f36b60d317d6511\` FOREIGN KEY (\`attribute_id\`) REFERENCES \`product_attributes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_group_items\` ADD CONSTRAINT \`FK_a469c5062af562874f5fa35381e\` FOREIGN KEY (\`attribute_option_id\`) REFERENCES \`product_attribute_options\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_groups\` ADD CONSTRAINT \`FK_b70a3cacfaef95a0f4731ef77e3\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_groups\` ADD CONSTRAINT \`FK_1bc6d3fb7b848db20b21d6aeef9\` FOREIGN KEY (\`sku\`) REFERENCES \`product_skus\`(\`sku\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_skus\` ADD CONSTRAINT \`FK_df1b106c640be24d1b7a812e0ca\` FOREIGN KEY (\`seo_info_id\`) REFERENCES \`seo_infos\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_skus\` ADD CONSTRAINT \`FK_e684b596b9ec2474335e7695267\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_skus\` ADD CONSTRAINT \`FK_0989b42726d65e528e5b221a019\` FOREIGN KEY (\`variant_id\`) REFERENCES \`product_attribute_groups\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sku_inventories\` ADD CONSTRAINT \`FK_ef0bd07b0e201194eae3ad9d198\` FOREIGN KEY (\`sku\`) REFERENCES \`sku_inventories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`inventory_entities\` ADD CONSTRAINT \`FK_aff198cab32aecb4828544578fe\` FOREIGN KEY (\`sku_inventory_id\`) REFERENCES \`sku_inventories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`inventory_entities\` DROP FOREIGN KEY \`FK_aff198cab32aecb4828544578fe\``);
        await queryRunner.query(`ALTER TABLE \`sku_inventories\` DROP FOREIGN KEY \`FK_ef0bd07b0e201194eae3ad9d198\``);
        await queryRunner.query(`ALTER TABLE \`product_skus\` DROP FOREIGN KEY \`FK_0989b42726d65e528e5b221a019\``);
        await queryRunner.query(`ALTER TABLE \`product_skus\` DROP FOREIGN KEY \`FK_e684b596b9ec2474335e7695267\``);
        await queryRunner.query(`ALTER TABLE \`product_skus\` DROP FOREIGN KEY \`FK_df1b106c640be24d1b7a812e0ca\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_groups\` DROP FOREIGN KEY \`FK_1bc6d3fb7b848db20b21d6aeef9\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_groups\` DROP FOREIGN KEY \`FK_b70a3cacfaef95a0f4731ef77e3\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_group_items\` DROP FOREIGN KEY \`FK_a469c5062af562874f5fa35381e\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_group_items\` DROP FOREIGN KEY \`FK_84f2f5a5cd17f36b60d317d6511\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_group_items\` DROP FOREIGN KEY \`FK_4b9137b25360aee52dcfa730c49\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_options\` DROP FOREIGN KEY \`FK_1c7ac1b88618b3f5558424e8b6d\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9a5f6868c96e0069e699f33e124\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_83c2fdecbbb6bf789e55fa084fd\``);
        await queryRunner.query(`ALTER TABLE \`product_categories\` DROP FOREIGN KEY \`FK_5f151d414daab0290f65b517ed4\``);
        await queryRunner.query(`ALTER TABLE \`product_categories\` DROP FOREIGN KEY \`FK_696a0ac1840e051e93935685b7d\``);
        await queryRunner.query(`DROP TABLE \`app_variables\``);
        await queryRunner.query(`DROP TABLE \`inventory_entities\``);
        await queryRunner.query(`DROP INDEX \`REL_ef0bd07b0e201194eae3ad9d19\` ON \`sku_inventories\``);
        await queryRunner.query(`DROP TABLE \`sku_inventories\``);
        await queryRunner.query(`DROP INDEX \`REL_0989b42726d65e528e5b221a01\` ON \`product_skus\``);
        await queryRunner.query(`DROP INDEX \`IDX_2f61ca6320aadc7ad6de50e039\` ON \`product_skus\``);
        await queryRunner.query(`DROP TABLE \`product_skus\``);
        await queryRunner.query(`DROP INDEX \`REL_1bc6d3fb7b848db20b21d6aeef\` ON \`product_attribute_groups\``);
        await queryRunner.query(`DROP TABLE \`product_attribute_groups\``);
        await queryRunner.query(`DROP INDEX \`IDX_84e90f5a53f7b9fb86b688272d\` ON \`product_attribute_group_items\``);
        await queryRunner.query(`DROP TABLE \`product_attribute_group_items\``);
        await queryRunner.query(`DROP INDEX \`IDX_ffdc60ecce53be6b5d0bb798d2\` ON \`product_attribute_options\``);
        await queryRunner.query(`DROP TABLE \`product_attribute_options\``);
        await queryRunner.query(`DROP TABLE \`product_attributes\``);
        await queryRunner.query(`DROP INDEX \`IDX_464f927ae360106b783ed0b410\` ON \`products\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP INDEX \`IDX_03fac833e3bd77ac8884680530\` ON \`product_categories\``);
        await queryRunner.query(`DROP TABLE \`product_categories\``);
        await queryRunner.query(`DROP TABLE \`seo_infos\``);
        await queryRunner.query(`DROP TABLE \`job_tasks_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_ba8cef5776e910f9f053ec5ec6\` ON \`jobs\``);
        await queryRunner.query(`DROP TABLE \`jobs\``);
    }

}
