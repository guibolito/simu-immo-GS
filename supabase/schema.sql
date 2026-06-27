-- Abonnements Stripe
create table if not exists subscriptions (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid not null references auth.users(id) on delete cascade,
  stripe_customer_id      text,
  stripe_subscription_id  text unique,
  status                  text not null default 'inactive',
  current_period_end      timestamptz,
  created_at              timestamptz not null default now(),
  unique(user_id)
);

-- RLS : chaque utilisateur ne voit que ses propres données
alter table subscriptions enable row level security;

create policy "Users can read own subscription"
  on subscriptions for select
  using (auth.uid() = user_id);

-- Index
create index if not exists subscriptions_user_id_idx on subscriptions(user_id);
create index if not exists subscriptions_stripe_sub_idx on subscriptions(stripe_subscription_id);
