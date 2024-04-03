import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712074090486 implements MigrationInterface {
    name = 'Migration1712074090486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_categories\` DROP FOREIGN KEY \`FK_696a0ac1840e051e93935685b7d\``);
        await queryRunner.query(`ALTER TABLE \`product_categories\` ADD UNIQUE INDEX \`IDX_696a0ac1840e051e93935685b7\` (\`seo_info_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_696a0ac1840e051e93935685b7\` ON \`product_categories\` (\`seo_info_id\`)`);
        await queryRunner.query(`ALTER TABLE \`product_categories\` ADD CONSTRAINT \`FK_696a0ac1840e051e93935685b7d\` FOREIGN KEY (\`seo_info_id\`) REFERENCES \`seo_infos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_categories\` DROP FOREIGN KEY \`FK_696a0ac1840e051e93935685b7d\``);
        await queryRunner.query(`DROP INDEX \`REL_696a0ac1840e051e93935685b7\` ON \`product_categories\``);
        await queryRunner.query(`ALTER TABLE \`product_categories\` DROP INDEX \`IDX_696a0ac1840e051e93935685b7\``);
        await queryRunner.query(`ALTER TABLE \`product_categories\` ADD CONSTRAINT \`FK_696a0ac1840e051e93935685b7d\` FOREIGN KEY (\`seo_info_id\`) REFERENCES \`seo_infos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
