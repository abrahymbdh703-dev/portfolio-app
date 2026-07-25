/*
# Create performance tracking tables (single-tenant, no auth)

1. New Tables
- `reports`: stores individual performance test snapshots (GTmetrix / PageSpeed / manual).
  Each row = one test run for one page. Metrics include TTFB, LCP, FCP, CLS, TBT,
  fully loaded time, performance score, structure score, and the raw tool JSON.
- `db_queries`: stores slow database queries parsed from a Query Monitor JSON export.
  Each row = one slow query with its SQL, duration, caller, and stack trace.
- `improvements`: a checklist of optimization tasks with status, category, expected
  impact, and notes — used to track the implementation phase.

2. Security
- Enable RLS on all three tables.
- This is a single-tenant dashboard with NO sign-in screen, so all CRUD is open
  to anon + authenticated (the anon-key frontend must be able to read and write).
*/

CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_url text NOT NULL,
  page_type text NOT NULL DEFAULT 'home',
  tool text NOT NULL DEFAULT 'manual',
  tested_at timestamptz NOT NULL DEFAULT now(),
  device text NOT NULL DEFAULT 'desktop',
  ttfb_ms integer,
  lcp_ms integer,
  fcp_ms integer,
  cls numeric(5,3),
  tbt_ms integer,
  fully_loaded_ms integer,
  performance_score integer,
  structure_score integer,
  total_size_kb integer,
  requests integer,
  raw jsonb,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_reports" ON reports;
CREATE POLICY "anon_select_reports" ON reports FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_reports" ON reports;
CREATE POLICY "anon_insert_reports" ON reports FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_reports" ON reports;
CREATE POLICY "anon_update_reports" ON reports FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_reports" ON reports;
CREATE POLICY "anon_delete_reports" ON reports FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS reports_page_type_idx ON reports(page_type);
CREATE INDEX IF NOT EXISTS reports_tested_at_idx ON reports(tested_at DESC);

CREATE TABLE IF NOT EXISTS db_queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid REFERENCES reports(id) ON DELETE CASCADE,
  sql text NOT NULL,
  duration_ms numeric(10,2) NOT NULL,
  caller text,
  stack text,
  query_type text,
  rows_affected integer,
  is_slow boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE db_queries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_db_queries" ON db_queries;
CREATE POLICY "anon_select_db_queries" ON db_queries FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_db_queries" ON db_queries;
CREATE POLICY "anon_insert_db_queries" ON db_queries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_db_queries" ON db_queries;
CREATE POLICY "anon_delete_db_queries" ON db_queries FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS db_queries_report_id_idx ON db_queries(report_id);
CREATE INDEX IF NOT EXISTS db_queries_duration_idx ON db_queries(duration_ms DESC);

CREATE TABLE IF NOT EXISTS improvements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  status text NOT NULL DEFAULT 'pending',
  priority text NOT NULL DEFAULT 'medium',
  expected_impact text,
  actual_impact text,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE improvements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_improvements" ON improvements;
CREATE POLICY "anon_select_improvements" ON improvements FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_improvements" ON improvements;
CREATE POLICY "anon_insert_improvements" ON improvements FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_improvements" ON improvements;
CREATE POLICY "anon_update_improvements" ON improvements FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_improvements" ON improvements;
CREATE POLICY "anon_delete_improvements" ON improvements FOR DELETE
  TO anon, authenticated USING (true);
