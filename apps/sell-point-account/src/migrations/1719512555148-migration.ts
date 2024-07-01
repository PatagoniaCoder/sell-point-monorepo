import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1719512555148 implements MigrationInterface {
  name = 'Migration1719512555148';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime(6) NULL, \`accountNumber\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`status\` enum ('PENDING', 'CREATED', 'CANCELED') NOT NULL, UNIQUE INDEX \`IDX_45705ce5c594e0b9f6158a4337\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_45705ce5c594e0b9f6158a4337\` ON \`accounts\``);
    await queryRunner.query(`DROP TABLE \`accounts\``);
  }
}
