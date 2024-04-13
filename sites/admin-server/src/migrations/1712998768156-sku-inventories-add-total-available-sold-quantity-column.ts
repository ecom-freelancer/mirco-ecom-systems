import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712998768156 implements MigrationInterface {
    name = 'Migration1712998768156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`inventory_entities\` CHANGE \`has_key\` \`hash_key\` varchar(255) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sku_inventories\` ADD \`total_available\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sku_inventories\` ADD \`sold_quantity\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`inventory_entities\` DROP COLUMN \`hash_key\``);
        await queryRunner.query(`ALTER TABLE \`inventory_entities\` ADD \`hash_key\` varchar(255) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`inventory_entities\` CHANGE \`status\` \`status\` enum ('enable', 'disable', 'draft', 'sold') NOT NULL DEFAULT 'draft'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`inventory_entities\` CHANGE \`status\` \`status\` enum ('enable', 'draft', 'sold') NOT NULL DEFAULT 'draft'`);
        await queryRunner.query(`ALTER TABLE \`inventory_entities\` DROP COLUMN \`hash_key\``);
        await queryRunner.query(`ALTER TABLE \`inventory_entities\` ADD \`hash_key\` varchar(255) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sku_inventories\` DROP COLUMN \`sold_quantity\``);
        await queryRunner.query(`ALTER TABLE \`sku_inventories\` DROP COLUMN \`total_available\``);
        await queryRunner.query(`ALTER TABLE \`inventory_entities\` CHANGE \`hash_key\` \`has_key\` varchar(255) NULL DEFAULT ''`);
    }

}
