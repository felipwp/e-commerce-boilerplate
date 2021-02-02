import { Migration } from '@mikro-orm/migrations';

export class Migration20210201025805 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "email" text not null, add column "is_admin" bool not null default false;');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}
