import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712285545757 implements MigrationInterface {
    name = 'Migration1712285545757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_attributes\` ADD \`product_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_attributes\` ADD CONSTRAINT \`FK_f5a6700abd0494bae3032cf5bbd\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_attributes\` DROP FOREIGN KEY \`FK_f5a6700abd0494bae3032cf5bbd\``);
        await queryRunner.query(`ALTER TABLE \`product_attributes\` DROP COLUMN \`product_id\``);
    }

}
