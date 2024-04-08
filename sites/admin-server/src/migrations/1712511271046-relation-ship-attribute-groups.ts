import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712511271046 implements MigrationInterface {
    name = 'Migration1712511271046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_attribute_group_items\` DROP FOREIGN KEY \`FK_4b9137b25360aee52dcfa730c49\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_group_items\` DROP FOREIGN KEY \`FK_84f2f5a5cd17f36b60d317d6511\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_group_items\` DROP FOREIGN KEY \`FK_a469c5062af562874f5fa35381e\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_group_items\` ADD CONSTRAINT \`FK_4b9137b25360aee52dcfa730c49\` FOREIGN KEY (\`attribute_group_id\`) REFERENCES \`product_attribute_groups\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_group_items\` ADD CONSTRAINT \`FK_84f2f5a5cd17f36b60d317d6511\` FOREIGN KEY (\`attribute_id\`) REFERENCES \`product_attributes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_group_items\` ADD CONSTRAINT \`FK_a469c5062af562874f5fa35381e\` FOREIGN KEY (\`attribute_option_id\`) REFERENCES \`product_attribute_options\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_attribute_group_items\` DROP FOREIGN KEY \`FK_a469c5062af562874f5fa35381e\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_group_items\` DROP FOREIGN KEY \`FK_84f2f5a5cd17f36b60d317d6511\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_group_items\` DROP FOREIGN KEY \`FK_4b9137b25360aee52dcfa730c49\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_group_items\` ADD CONSTRAINT \`FK_a469c5062af562874f5fa35381e\` FOREIGN KEY (\`attribute_option_id\`) REFERENCES \`product_attribute_options\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_group_items\` ADD CONSTRAINT \`FK_84f2f5a5cd17f36b60d317d6511\` FOREIGN KEY (\`attribute_id\`) REFERENCES \`product_attributes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_group_items\` ADD CONSTRAINT \`FK_4b9137b25360aee52dcfa730c49\` FOREIGN KEY (\`attribute_group_id\`) REFERENCES \`product_attribute_groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
