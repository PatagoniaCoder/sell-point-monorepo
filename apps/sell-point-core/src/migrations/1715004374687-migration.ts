import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715004374687 implements MigrationInterface {
    name = 'Migration1715004374687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`accountNumber\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`accounts\``);
    }

}
