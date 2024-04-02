import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711987116067 implements MigrationInterface {
    name = 'Migration1711987116067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_categories\` CHANGE \`order\` \`order\` double NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_categories\` CHANGE \`order\` \`order\` double NOT NULL`);
    }

}
