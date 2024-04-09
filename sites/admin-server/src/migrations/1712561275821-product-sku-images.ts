import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712561275821 implements MigrationInterface {
    name = 'Migration1712561275821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_skus\` ADD \`images\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_skus\` DROP COLUMN \`images\``);
    }

}
