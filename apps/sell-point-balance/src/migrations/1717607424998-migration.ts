import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1717607424998 implements MigrationInterface {
  name = 'Migration1717607424998';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`balances\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime(6) NULL, \`accountUuid\` varchar(255) NOT NULL, \`balanceAmountBefore\` decimal(13,4) NOT NULL, \`balanceAmountAfter\` decimal(13,4) NOT NULL, \`amount\` decimal(13,4) NOT NULL, UNIQUE INDEX \`IDX_7d56b53de2b04cb9f903de1cbf\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_7d56b53de2b04cb9f903de1cbf\` ON \`balances\``);
    await queryRunner.query(`DROP TABLE \`balances\``);
  }
}
