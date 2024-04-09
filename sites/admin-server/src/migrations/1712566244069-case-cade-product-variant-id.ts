import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712566244069 implements MigrationInterface {
    name = 'Migration1712566244069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_attribute_groups\` DROP FOREIGN KEY \`FK_1bc6d3fb7b848db20b21d6aeef9\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_groups\` ADD CONSTRAINT \`FK_1bc6d3fb7b848db20b21d6aeef9\` FOREIGN KEY (\`sku\`) REFERENCES \`product_skus\`(\`sku\`) ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_attribute_groups\` DROP FOREIGN KEY \`FK_1bc6d3fb7b848db20b21d6aeef9\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_groups\` ADD CONSTRAINT \`FK_1bc6d3fb7b848db20b21d6aeef9\` FOREIGN KEY (\`sku\`) REFERENCES \`product_skus\`(\`sku\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
