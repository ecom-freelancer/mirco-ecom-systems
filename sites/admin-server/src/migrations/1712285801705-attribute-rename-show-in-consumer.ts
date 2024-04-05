import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712285801705 implements MigrationInterface {
    name = 'Migration1712285801705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_attributes\` CHANGE \`show_name_in_content\` \`show_name_in_consumer\` tinyint NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_attributes\` CHANGE \`show_name_in_consumer\` \`show_name_in_content\` tinyint NOT NULL DEFAULT '1'`);
    }

}
