import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1717467875256 implements MigrationInterface {
  name = 'Migration1717467875256';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_dbf037ed3c8a23f03a861dc2242\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` CHANGE \`transaction_account_id\` \`account_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_e2652fa8c16723c83a00fb9b17e\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_e2652fa8c16723c83a00fb9b17e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` CHANGE \`account_id\` \`transaction_account_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_dbf037ed3c8a23f03a861dc2242\` FOREIGN KEY (\`transaction_account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
