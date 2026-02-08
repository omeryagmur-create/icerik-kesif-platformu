-- Early Access Aboneleri Tablosu
CREATE TABLE early_access_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source VARCHAR(50) DEFAULT 'landing_page',
  metadata JSONB
);

-- Email aramalarını hızlandırmak için index
CREATE INDEX idx_email ON early_access_subscribers(email);
