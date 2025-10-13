-- Create customers table to map Paddle customer_id to email
create table
  public.customers (
    customer_id text not null,
    user_id "uuid" not null,
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
    customer_id text not null,
    client_context_id uuid null references public.client_context(id) on delete set null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint subscriptions_pkey primary key (subscription_id),
    constraint public_subscriptions_customer_id_fkey foreign key (customer_id) references customers (customer_id)
  ) tablespace pg_default;

create table
  public.client_context (
    id uuid default gen_random_uuid() primary key,
    user_id uuid null,
    email text null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
  ) tablespace pg_default;

-- ALTER TABLE ONLY "public"."customers"
--     ADD CONSTRAINT "customers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



-- ALTER TABLE ONLY "public"."subscriptions"
--     ADD CONSTRAINT "subscriptions_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("customer_id");



CREATE POLICY "Enable read access for authenticated users to customers" ON "public"."customers" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Enable read access for authenticated users to subscriptions" ON "public"."subscriptions" FOR SELECT TO "authenticated" USING (true);



ALTER TABLE "public"."customers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;

-- Add user_usage table for dashboard
create table
  public.user_usage (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    selections_today integer default 0,
    selections_total integer default 0,
    last_daily_reset timestamp with time zone default now(),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    unique(user_id)
  ) tablespace pg_default;

-- Add selections table for content management
create table
  public.selections (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    title text,
    content text not null,
    url text,
    domain text,
    tags text[],
    notes text,
    is_favorite boolean default false,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
  ) tablespace pg_default;

-- Enable RLS for new tables
ALTER TABLE "public"."user_usage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."selections" ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_usage
CREATE POLICY "Users can view own usage" ON "public"."user_usage" 
FOR SELECT TO "authenticated" 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own usage" ON "public"."user_usage" 
FOR UPDATE TO "authenticated" 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage" ON "public"."user_usage" 
FOR INSERT TO "authenticated" 
WITH CHECK (auth.uid() = user_id);

-- RLS policies for selections
CREATE POLICY "Users can manage own selections" ON "public"."selections" 
FOR ALL TO "authenticated" 
USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_user_usage_user_id ON public.user_usage(user_id);
CREATE INDEX idx_selections_user_id ON public.selections(user_id);
CREATE INDEX idx_selections_created_at ON public.selections(created_at desc);
CREATE INDEX idx_selections_domain ON public.selections(domain);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_usage (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user_usage when user signs up
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();