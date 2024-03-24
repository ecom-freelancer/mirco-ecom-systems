import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711253356699 implements MigrationInterface {
    name = 'Migration1711253356699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`password\` \`password\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`password\` \`password\` text NULL`);
    }

}
