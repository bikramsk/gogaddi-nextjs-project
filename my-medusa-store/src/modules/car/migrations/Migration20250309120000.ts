import { Migration } from "@medusajs/framework/mikro-orm/migrations"

export class Migration20250309120000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `create table if not exists "car" (
        "id" text not null,
        "make" text not null,
        "model" text not null,
        "year" integer not null,
        "price" numeric(12, 2) null,
        "created_at" timestamptz not null default now(),
        "updated_at" timestamptz not null default now(),
        "deleted_at" timestamptz null,
        constraint "car_pkey" primary key ("id")
      );`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_car_deleted_at" ON "car" ("deleted_at") WHERE deleted_at IS NULL;`
    )
  }

  async down(): Promise<void> {
    this.addSql(`drop table if exists "car" cascade;`)
  }
}
