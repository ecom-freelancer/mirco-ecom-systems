import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712289606131 implements MigrationInterface {
    name = 'Migration1712289606131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_attribute_options\` DROP FOREIGN KEY \`FK_1c7ac1b88618b3f5558424e8b6d\``);
        await queryRunner.query(`ALTER TABLE \`product_attributes\` DROP FOREIGN KEY \`FK_f5a6700abd0494bae3032cf5bbd\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` CHANGE \`detated_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`job_tasks_entity\` CHANGE \`detated_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_options\` CHANGE \`detated_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_attributes\` CHANGE \`detated_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`detated_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_skus\` CHANGE \`detated_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`inventory_entities\` CHANGE \`detated_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_options\` ADD CONSTRAINT \`FK_1c7ac1b88618b3f5558424e8b6d\` FOREIGN KEY (\`attribute_id\`) REFERENCES \`product_attributes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_attributes\` ADD CONSTRAINT \`FK_f5a6700abd0494bae3032cf5bbd\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_attributes\` DROP FOREIGN KEY \`FK_f5a6700abd0494bae3032cf5bbd\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_options\` DROP FOREIGN KEY \`FK_1c7ac1b88618b3f5558424e8b6d\``);
        await queryRunner.query(`ALTER TABLE \`inventory_entities\` CHANGE \`deleted_at\` \`detated_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_skus\` CHANGE \`deleted_at\` \`detated_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`deleted_at\` \`detated_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_attributes\` CHANGE \`deleted_at\` \`detated_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_options\` CHANGE \`deleted_at\` \`detated_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`job_tasks_entity\` CHANGE \`deleted_at\` \`detated_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`jobs\` CHANGE \`deleted_at\` \`detated_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_attributes\` ADD CONSTRAINT \`FK_f5a6700abd0494bae3032cf5bbd\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_options\` ADD CONSTRAINT \`FK_1c7ac1b88618b3f5558424e8b6d\` FOREIGN KEY (\`attribute_id\`) REFERENCES \`product_attributes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
