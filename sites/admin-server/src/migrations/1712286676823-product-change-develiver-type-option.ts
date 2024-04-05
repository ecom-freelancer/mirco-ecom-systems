import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712286676823 implements MigrationInterface {
    name = 'Migration1712286676823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`delivery_type\` \`delivery_type\` enum ('online_by_email') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`delivery_type\` \`delivery_type\` enum ('only_by_email') NOT NULL`);
    }

}
