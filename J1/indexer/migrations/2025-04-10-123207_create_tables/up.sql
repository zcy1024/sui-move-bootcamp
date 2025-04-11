-- Your SQL goes here
CREATE TABLE heroes (
    hero_id BYTEA PRIMARY KEY,
    owner TEXT NOT NULL,
    trx_digest TEXT NOT NULL,
    gas_fee BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fees_events (
    id SERIAL PRIMARY KEY,
    event_type TEXT NOT NULL,
    treasury_id TEXT NOT NULL,
    amount BIGINT NOT NULL,
    admin TEXT NOT NULL,
    timestamp BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);