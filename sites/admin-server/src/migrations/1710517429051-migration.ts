import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1710517429051 implements MigrationInterface {
    name = 'Migration1710517429051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
    }

}
