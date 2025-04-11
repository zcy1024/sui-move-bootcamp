// @generated automatically by Diesel CLI.

diesel::table! {
    fees_events (id) {
        id -> Int4,
        event_type -> Text,
        event_data -> Jsonb,
        created_at -> Timestamp,
    }
}

diesel::table! {
    heroes (hero_id) {
        hero_id -> Bytea,
        owner -> Text,
        trx_digest -> Text,
        gas_fee -> Int8,
        created_at -> Timestamp,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    fees_events,
    heroes,
);
