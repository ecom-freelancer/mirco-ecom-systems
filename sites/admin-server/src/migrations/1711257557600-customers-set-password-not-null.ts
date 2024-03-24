import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711257557600 implements MigrationInterface {
    name = 'Migration1711257557600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customers\` CHANGE \`password\` \`password\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customers\` CHANGE \`password\` \`password\` text NULL`);
    }

}
