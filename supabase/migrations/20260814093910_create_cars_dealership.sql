/*
# Create car dealership tables (single-tenant, no auth)

1. New Tables
- `cars`: stores car listings for a luxury car dealership.
  Columns: brand, model, year, price, body_type, fuel_type, transmission,
  mileage_km, color, horsepower, engine_cc, seats, description, image_url,
  gallery (array of additional image URLs), is_featured, is_sold, condition_status
  (new/used), features (text array), created_at, updated_at.

2. Security
- Enable RLS on `cars`.
- This is a single-tenant public showroom with NO sign-in screen, so all
  CRUD is open to anon + authenticated (the anon-key frontend must be able
  to read and write).
*/

CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  price numeric(12,2) NOT NULL,
  body_type text NOT NULL DEFAULT 'sedan',
  fuel_type text NOT NULL DEFAULT 'petrol',
  transmission text NOT NULL DEFAULT 'automatic',
  mileage_km integer NOT NULL DEFAULT 0,
  color text NOT NULL DEFAULT 'أسود',
  horsepower integer NOT NULL DEFAULT 200,
  engine_cc integer NOT NULL DEFAULT 2000,
  seats integer NOT NULL DEFAULT 5,
  description text,
  image_url text,
  gallery text[] DEFAULT '{}',
  is_featured boolean NOT NULL DEFAULT false,
  is_sold boolean NOT NULL DEFAULT false,
  condition_status text NOT NULL DEFAULT 'new',
  features text[] DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_cars" ON cars;
CREATE POLICY "anon_select_cars" ON cars FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_cars" ON cars;
CREATE POLICY "anon_insert_cars" ON cars FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_cars" ON cars;
CREATE POLICY "anon_update_cars" ON cars FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_cars" ON cars;
CREATE POLICY "anon_delete_cars" ON cars FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS cars_brand_idx ON cars(brand);
CREATE INDEX IF NOT EXISTS cars_body_type_idx ON cars(body_type);
CREATE INDEX IF NOT EXISTS cars_is_featured_idx ON cars(is_featured);
CREATE INDEX IF NOT EXISTS cars_price_idx ON cars(price);
