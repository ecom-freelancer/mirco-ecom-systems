import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713003151911 implements MigrationInterface {
    name = 'Migration1713003151911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sku_inventories\` DROP FOREIGN KEY \`FK_ef0bd07b0e201194eae3ad9d198\``);
        await queryRunner.query(`DROP INDEX \`REL_ef0bd07b0e201194eae3ad9d19\` ON \`sku_inventories\``);
        await queryRunner.query(`ALTER TABLE \`sku_inventories\` DROP COLUMN \`sku\``);
        await queryRunner.query(`ALTER TABLE \`sku_inventories\` ADD \`sku\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sku_inventories\` ADD UNIQUE INDEX \`IDX_ef0bd07b0e201194eae3ad9d19\` (\`sku\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_ef0bd07b0e201194eae3ad9d19\` ON \`sku_inventories\` (\`sku\`)`);
        await queryRunner.query(`ALTER TABLE \`sku_inventories\` ADD CONSTRAINT \`FK_ef0bd07b0e201194eae3ad9d198\` FOREIGN KEY (\`sku\`) REFERENCES \`product_skus\`(\`sku\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sku_inventories\` DROP FOREIGN KEY \`FK_ef0bd07b0e201194eae3ad9d198\``);
        await queryRunner.query(`DROP INDEX \`REL_ef0bd07b0e201194eae3ad9d19\` ON \`sku_inventories\``);
        await queryRunner.query(`ALTER TABLE \`sku_inventories\` DROP INDEX \`IDX_ef0bd07b0e201194eae3ad9d19\``);
        await queryRunner.query(`ALTER TABLE \`sku_inventories\` DROP COLUMN \`sku\``);
        await queryRunner.query(`ALTER TABLE \`sku_inventories\` ADD \`sku\` int NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_ef0bd07b0e201194eae3ad9d19\` ON \`sku_inventories\` (\`sku\`)`);
        await queryRunner.query(`ALTER TABLE \`sku_inventories\` ADD CONSTRAINT \`FK_ef0bd07b0e201194eae3ad9d198\` FOREIGN KEY (\`sku\`) REFERENCES \`sku_inventories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
