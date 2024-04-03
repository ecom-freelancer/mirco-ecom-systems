import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712164367039 implements MigrationInterface {
    name = 'Migration1712164367039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_83c2fdecbbb6bf789e55fa084fd\``);
        await queryRunner.query(`ALTER TABLE \`product_skus\` DROP FOREIGN KEY \`FK_df1b106c640be24d1b7a812e0ca\``);
        await queryRunner.query(`DROP INDEX \`IDX_696a0ac1840e051e93935685b7\` ON \`product_categories\``);
        await queryRunner.query(`ALTER TABLE \`seo_infos\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`seo_infos\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`seo_infos\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD UNIQUE INDEX \`IDX_83c2fdecbbb6bf789e55fa084f\` (\`seo_info_id\`)`);
        await queryRunner.query(`ALTER TABLE \`product_skus\` ADD UNIQUE INDEX \`IDX_df1b106c640be24d1b7a812e0c\` (\`seo_info_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_83c2fdecbbb6bf789e55fa084f\` ON \`products\` (\`seo_info_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_df1b106c640be24d1b7a812e0c\` ON \`product_skus\` (\`seo_info_id\`)`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_83c2fdecbbb6bf789e55fa084fd\` FOREIGN KEY (\`seo_info_id\`) REFERENCES \`seo_infos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_skus\` ADD CONSTRAINT \`FK_df1b106c640be24d1b7a812e0ca\` FOREIGN KEY (\`seo_info_id\`) REFERENCES \`seo_infos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_skus\` DROP FOREIGN KEY \`FK_df1b106c640be24d1b7a812e0ca\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_83c2fdecbbb6bf789e55fa084fd\``);
        await queryRunner.query(`DROP INDEX \`REL_df1b106c640be24d1b7a812e0c\` ON \`product_skus\``);
        await queryRunner.query(`DROP INDEX \`REL_83c2fdecbbb6bf789e55fa084f\` ON \`products\``);
        await queryRunner.query(`ALTER TABLE \`product_skus\` DROP INDEX \`IDX_df1b106c640be24d1b7a812e0c\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP INDEX \`IDX_83c2fdecbbb6bf789e55fa084f\``);
        await queryRunner.query(`ALTER TABLE \`seo_infos\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`seo_infos\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`seo_infos\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_696a0ac1840e051e93935685b7\` ON \`product_categories\` (\`seo_info_id\`)`);
        await queryRunner.query(`ALTER TABLE \`product_skus\` ADD CONSTRAINT \`FK_df1b106c640be24d1b7a812e0ca\` FOREIGN KEY (\`seo_info_id\`) REFERENCES \`seo_infos\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_83c2fdecbbb6bf789e55fa084fd\` FOREIGN KEY (\`seo_info_id\`) REFERENCES \`seo_infos\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
