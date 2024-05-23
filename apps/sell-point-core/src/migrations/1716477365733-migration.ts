import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1716477365733 implements MigrationInterface {
  name = 'Migration1716477365733';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`balance\` CHANGE \`last_transaction_uuid\` \`last_transaction_uuid\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`balance\` CHANGE \`last_transaction_uuid\` \`last_transaction_uuid\` varchar(255) NOT NULL`,
    );
  }
}
