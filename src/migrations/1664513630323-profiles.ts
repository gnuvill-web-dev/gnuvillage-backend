import { MigrationInterface, QueryRunner } from "typeorm";

export class profiles1664513630323 implements MigrationInterface {
    name = 'profiles1664513630323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(20) NOT NULL, \`name\` varchar(20) NOT NULL, \`email\` varchar(40) NOT NULL, \`phone\` varchar(20) NOT NULL, \`department\` varchar(40) NOT NULL, \`message\` varchar(1000) NOT NULL, UNIQUE INDEX \`REL_9e70fe39bace1b4fe0a96e5720\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Profile\` ADD CONSTRAINT \`FK_9e70fe39bace1b4fe0a96e57203\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Profile\` DROP FOREIGN KEY \`FK_9e70fe39bace1b4fe0a96e57203\``);
        await queryRunner.query(`DROP INDEX \`REL_9e70fe39bace1b4fe0a96e5720\` ON \`Profile\``);
        await queryRunner.query(`DROP TABLE \`Profile\``);
    }

}
