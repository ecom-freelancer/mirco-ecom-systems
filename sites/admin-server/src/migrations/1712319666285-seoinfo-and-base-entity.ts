import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712319666285 implements MigrationInterface {
    name = 'Migration1712319666285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`seo_infos\` CHANGE \`title\` \`title\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`seo_infos\` CHANGE \`keywords\` \`keywords\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`seo_infos\` CHANGE \`keywords\` \`keywords\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`seo_infos\` CHANGE \`title\` \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`created_at\``);
    }

}
