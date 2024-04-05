import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712318759679 implements MigrationInterface {
    name = 'Migration1712318759679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_df1b106c640be24d1b7a812e0c\` ON \`product_skus\``);
        await queryRunner.query(`DROP INDEX \`IDX_83c2fdecbbb6bf789e55fa084f\` ON \`products\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`brand\` \`brand\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`brand\` \`brand\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_83c2fdecbbb6bf789e55fa084f\` ON \`products\` (\`seo_info_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_df1b106c640be24d1b7a812e0c\` ON \`product_skus\` (\`seo_info_id\`)`);
    }

}
