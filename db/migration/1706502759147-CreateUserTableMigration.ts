import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTableMigration1706502759147
  implements MigrationInterface
{
  name = 'CreateUserTableMigration1706502759147';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(32) NOT NULL, \`email\` varchar(32) NOT NULL, \`password\` varchar(32) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
