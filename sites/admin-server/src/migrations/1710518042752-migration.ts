import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1710518042752 implements MigrationInterface {
    name = 'Migration1710518042752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(255) NOT NULL`);
    }

}
