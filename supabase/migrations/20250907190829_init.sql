-- Create customers table to map Paddle customer_id to email
create table
  public.customers (
    customer_id "uuid" not null,
    email text not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint customers_pkey primary key (customer_id)
  ) tablespace pg_default;

-- Create subscription table to store webhook events sent by Paddle
create table
  public.subscriptions (
    subscription_id text not null,
    subscription_status text not null,
    price_id text null,
    product_id text null,
    scheduled_change text null,
    customer_id "uuid" not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint subscriptions_pkey primary key (subscription_id),
    constraint public_subscriptions_customer_id_fkey foreign key (customer_id) references customers (customer_id)
  ) tablespace pg_default;



ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("customer_id");



CREATE POLICY "Enable read access for authenticated users to customers" ON "public"."customers" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Enable read access for authenticated users to subscriptions" ON "public"."subscriptions" FOR SELECT TO "authenticated" USING (true);



ALTER TABLE "public"."customers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;