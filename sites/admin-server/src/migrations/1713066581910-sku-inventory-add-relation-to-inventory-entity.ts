import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713066581910 implements MigrationInterface {
    name = 'Migration1713066581910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ef0bd07b0e201194eae3ad9d19\` ON \`sku_inventories\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ef0bd07b0e201194eae3ad9d19\` ON \`sku_inventories\` (\`sku\`)`);
    }

}
