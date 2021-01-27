import { Migration } from '@mikro-orm/migrations';

export class Migration20210122001853 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" text not null);');
  }

}
