-- Run this once against whatever Neon database DATABASE_URL points to
-- (via the Neon SQL editor, or `psql "$DATABASE_URL" -f schema.sql`)
-- before the app's first request, since nothing else creates this table.

CREATE TABLE IF NOT EXISTS creations (
  id         SERIAL PRIMARY KEY,
  user_id    TEXT NOT NULL,
  prompt     TEXT NOT NULL,
  content    TEXT NOT NULL,
  type       TEXT NOT NULL,
  publish    BOOLEAN DEFAULT false,
  likes      TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_creations_user_id ON creations(user_id);
CREATE INDEX IF NOT EXISTS idx_creations_publish ON creations(publish);
