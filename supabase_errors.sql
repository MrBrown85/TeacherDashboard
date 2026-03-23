CREATE TABLE IF NOT EXISTS error_logs (
  id BIGSERIAL PRIMARY KEY,
  teacher_id UUID,
  page TEXT,
  message TEXT,
  stack TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Allow any authenticated user to insert errors
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert their own errors" ON error_logs
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = teacher_id);

-- Only the service role can read errors (for admin dashboard later)
CREATE POLICY "Service role can read all errors" ON error_logs
  FOR SELECT TO service_role
  USING (true);
