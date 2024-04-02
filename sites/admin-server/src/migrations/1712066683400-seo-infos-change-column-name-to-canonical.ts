import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712066683400 implements MigrationInterface {
    name = 'Migration1712066683400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`seo_infos\` CHANGE \`canonial\` \`canonical\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`seo_infos\` DROP COLUMN \`canonical\``);
        await queryRunner.query(`ALTER TABLE \`seo_infos\` ADD \`canonical\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`seo_infos\` DROP COLUMN \`canonical\``);
        await queryRunner.query(`ALTER TABLE \`seo_infos\` ADD \`canonical\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`seo_infos\` CHANGE \`canonical\` \`canonial\` varchar(255) NULL`);
    }

}
