import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueIndexToEmail1706503788623 implements MigrationInterface {
  name = 'AddUniqueIndexToEmail1706503788623';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`password\` varchar(32) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`email\` varchar(32) NOT NULL`,
    );
  }
}
