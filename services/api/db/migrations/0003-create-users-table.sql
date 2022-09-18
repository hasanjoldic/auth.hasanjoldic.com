CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  salt TEXT NOT NULL,

  full_name TEXT NOT NULL,

  _created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  _updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ON users(email);
CREATE INDEX ON users(full_name);
CREATE INDEX ON users(_created_at);
CREATE INDEX ON users(_updated_at);

DROP TRIGGER IF EXISTS a_users_timestamp_trigger ON users;

CREATE TRIGGER a_users_timestamp_trigger
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE PROCEDURE timestamp_trigger();