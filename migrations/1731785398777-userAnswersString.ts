import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAnswersString1731785398777 implements MigrationInterface {
    name = 'UserAnswersString1731785398777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`teams\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(100) NOT NULL, \`role\` varchar(20) NOT NULL, \`id_team\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`forms\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`description\` varchar(100) NOT NULL, \`category\` varchar(100) NOT NULL, \`teamId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`questions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` datetime(6) NULL, \`category\` varchar(100) NOT NULL, \`title\` varchar(100) NOT NULL, \`alternatives\` text NULL, \`type\` varchar(20) NOT NULL, \`formId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`answers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` datetime(6) NULL, \`userAnswers\` varchar(255) NULL, \`userHasAnswered\` tinyint NOT NULL DEFAULT 0, \`userId\` int NULL, \`userToEvaluateId\` int NULL, \`formId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_43fa4bc163ba92f3746f8aac70b\` FOREIGN KEY (\`id_team\`) REFERENCES \`teams\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`forms\` ADD CONSTRAINT \`FK_79708670818797881c521cd81bb\` FOREIGN KEY (\`teamId\`) REFERENCES \`teams\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`questions\` ADD CONSTRAINT \`FK_e635f8de2abc09c58f97c5ce70e\` FOREIGN KEY (\`formId\`) REFERENCES \`forms\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answers\` ADD CONSTRAINT \`FK_1bd66b7e0599333e61d2e3e1678\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answers\` ADD CONSTRAINT \`FK_b7eeed4b0ce7dddc5a02ba32698\` FOREIGN KEY (\`userToEvaluateId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answers\` ADD CONSTRAINT \`FK_7128c604a8af5e58b3e076132c8\` FOREIGN KEY (\`formId\`) REFERENCES \`forms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answers\` DROP FOREIGN KEY \`FK_7128c604a8af5e58b3e076132c8\``);
        await queryRunner.query(`ALTER TABLE \`answers\` DROP FOREIGN KEY \`FK_b7eeed4b0ce7dddc5a02ba32698\``);
        await queryRunner.query(`ALTER TABLE \`answers\` DROP FOREIGN KEY \`FK_1bd66b7e0599333e61d2e3e1678\``);
        await queryRunner.query(`ALTER TABLE \`questions\` DROP FOREIGN KEY \`FK_e635f8de2abc09c58f97c5ce70e\``);
        await queryRunner.query(`ALTER TABLE \`forms\` DROP FOREIGN KEY \`FK_79708670818797881c521cd81bb\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_43fa4bc163ba92f3746f8aac70b\``);
        await queryRunner.query(`DROP TABLE \`answers\``);
        await queryRunner.query(`DROP TABLE \`questions\``);
        await queryRunner.query(`DROP TABLE \`forms\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`teams\``);
    }

}
