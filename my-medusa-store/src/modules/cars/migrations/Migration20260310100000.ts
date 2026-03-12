import { Migration } from "@medusajs/framework/mikro-orm/migrations"

export class Migration20260310100000 extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      create table if not exists "car_feature" (
        "id" text not null,
        "product_id" text not null,
        "feature_name" text not null,
        "feature_value" text null,
        "created_at" timestamptz not null default now(),
        "updated_at" timestamptz not null default now(),
        "deleted_at" timestamptz null,
        constraint "car_feature_pkey" primary key ("id")
      );
    `)
    this.addSql(`create index if not exists "IDX_car_feature_product_id" on "car_feature" ("product_id");`)
    this.addSql(`create index if not exists "IDX_car_feature_deleted_at" on "car_feature" ("deleted_at") where deleted_at is null;`)

    this.addSql(`
      create table if not exists "car_specification" (
        "id" text not null,
        "product_id" text not null,
        "spec_group" text not null,
        "spec_name" text not null,
        "spec_value" text null,
        "created_at" timestamptz not null default now(),
        "updated_at" timestamptz not null default now(),
        "deleted_at" timestamptz null,
        constraint "car_specification_pkey" primary key ("id")
      );
    `)
    this.addSql(`create index if not exists "IDX_car_specification_product_id" on "car_specification" ("product_id");`)
    this.addSql(`create index if not exists "IDX_car_specification_deleted_at" on "car_specification" ("deleted_at") where deleted_at is null;`)

    this.addSql(`
      create table if not exists "car_review" (
        "id" text not null,
        "product_id" text not null,
        "reviewer_name" text not null,
        "rating" real not null,
        "review_text" text null,
        "created_at" timestamptz not null default now(),
        "updated_at" timestamptz not null default now(),
        "deleted_at" timestamptz null,
        constraint "car_review_pkey" primary key ("id")
      );
    `)
    this.addSql(`create index if not exists "IDX_car_review_product_id" on "car_review" ("product_id");`)
    this.addSql(`create index if not exists "IDX_car_review_deleted_at" on "car_review" ("deleted_at") where deleted_at is null;`)

    this.addSql(`
      create table if not exists "car_related" (
        "id" text not null,
        "product_id" text not null,
        "related_product_id" text not null,
        "created_at" timestamptz not null default now(),
        "updated_at" timestamptz not null default now(),
        "deleted_at" timestamptz null,
        constraint "car_related_pkey" primary key ("id")
      );
    `)
    this.addSql(`create index if not exists "IDX_car_related_product_id" on "car_related" ("product_id");`)
    this.addSql(`create index if not exists "IDX_car_related_related_product_id" on "car_related" ("related_product_id");`)
    this.addSql(`create index if not exists "IDX_car_related_deleted_at" on "car_related" ("deleted_at") where deleted_at is null;`)
  }

  async down(): Promise<void> {
    this.addSql(`drop table if exists "car_feature" cascade;`)
    this.addSql(`drop table if exists "car_specification" cascade;`)
    this.addSql(`drop table if exists "car_review" cascade;`)
    this.addSql(`drop table if exists "car_related" cascade;`)
  }
}
