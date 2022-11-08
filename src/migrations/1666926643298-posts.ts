import { MigrationInterface, QueryRunner } from "typeorm";

export class posts1666926643298 implements MigrationInterface {
    name = 'posts1666926643298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(20) NOT NULL, \`groupId\` int NULL, \`title\` varchar(60) NOT NULL, \`content\` text NOT NULL, \`createdDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`category\` varchar(20) NULL, \`admin\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Post\` ADD CONSTRAINT \`FK_97e81bcb59530bfb061e48aee6a\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Post\` ADD CONSTRAINT \`FK_9e2216d89b4d073b57051464ac4\` FOREIGN KEY (\`groupId\`) REFERENCES \`Group\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Post\` DROP FOREIGN KEY \`FK_9e2216d89b4d073b57051464ac4\``);
        await queryRunner.query(`ALTER TABLE \`Post\` DROP FOREIGN KEY \`FK_97e81bcb59530bfb061e48aee6a\``);
        await queryRunner.query(`DROP TABLE \`Post\``);
    }

}
