import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1715906709925 implements MigrationInterface {
  name = 'Migration1715906709925';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`transaction_type_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime(6) NULL, \`uuid\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`action\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`transaction_type_entity\``);
  }
}
