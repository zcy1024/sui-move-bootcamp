use clap::Parser;
use diesel::QueryDsl;
use diesel_async::{AsyncConnection, AsyncPgConnection, RunQueryDsl};
use sui_hero_indexer::{
    create_indexer,
    schema::{
        fees_events::{self, dsl::fees_events as fees_events_table},
        heroes::{self, dsl::heroes as heroes_table},
    },
    Fee, StoredHero,
};
use sui_indexer_alt_framework::cluster;
use testcontainers::runners::AsyncRunner;
use testcontainers_modules::postgres::Postgres;

pub const MIGRATIONS: diesel_async_migrations::EmbeddedMigrations =
    diesel_async_migrations::embed_migrations!();

#[derive(clap::Parser, Debug)]
struct TestArgs {
    #[clap(flatten)]
    cluster_args: cluster::Args,
}

#[tokio::test]
async fn test_end_to_end() {
    // Simulate parsing args
    let test_args = TestArgs::parse_from([
        "test",
        "--local-ingestion-path",
        "tests/checkpoints",
        "--first-checkpoint",
        "183081694",
        "--last-checkpoint",
        "183081700",
    ]);

    // TestContainers setup
    let container = Postgres::default().start().await.unwrap();
    let port = container.get_host_port_ipv4(5432).await.unwrap();

    let database_url = format!("postgres://postgres:postgres@localhost:{}/postgres", port);

    // Database setup
    let mut conn = AsyncPgConnection::establish(&database_url)
        .await
        .expect("Failed to connect to database");

    MIGRATIONS
        .run_pending_migrations(&mut conn)
        .await
        .expect("Failed to run migrations");

    // Create and run indexer
    let indexer = create_indexer(database_url.parse().unwrap(), test_args.cluster_args)
        .await
        .expect("Failed to create indexer");

    // Run indexer in background
    let indexer_handle =
        tokio::spawn(async move { indexer.run().await.expect("Failed to run indexer").await });

    // Wait for some time to process checkpoints
    tokio::time::sleep(std::time::Duration::from_secs(10)).await;

    // Verify heroes
    let heroes = heroes_table
        .select((
            heroes::hero_id,
            heroes::owner,
            heroes::trx_digest,
            heroes::gas_fee,
        ))
        .load::<StoredHero>(&mut conn)
        .await
        .expect("Failed to get heroes");

    assert_eq!(heroes.len(), 1);
    assert_eq!(
        heroes[0].hero_id,
        vec![
            184, 224, 122, 211, 154, 9, 201, 16, 12, 64, 215, 37, 188, 166, 69, 194, 211, 136, 179,
            77, 147, 112, 144, 2, 232, 228, 143, 59, 48, 171, 94, 144
        ]
    );
    assert_eq!(
        heroes[0].owner,
        "0x054fa15fe4f0f55c7e35ada640e848c736ec51aaf3f3b304e3d2b44c6a806fa2"
    );
    assert_eq!(
        heroes[0].trx_digest,
        "5WALRy76GvkK8hKroUsUkCfkkBbciUtHS3nhwcVmBRLe"
    );
    assert_eq!(heroes[0].gas_fee, 2330532);

    // Verify fee events
    let fee_events = fees_events_table
        .select((
            fees_events::event_type,
            fees_events::treasury_id,
            fees_events::amount,
            fees_events::admin,
            fees_events::timestamp,
        ))
        .load::<Fee>(&mut conn)
        .await
        .expect("Failed to get fee events");
    assert_eq!(fee_events.len(), 1);
    assert_eq!(fee_events[0].event_type, "TakeFeesEvent");
    assert_eq!(
        fee_events[0].treasury_id,
        "0xca0dbdcc0e3bc141ca2c42790c25261a2572cb8e70cdcea61ddd0671cf03c0ab"
    );
    assert_eq!(fee_events[0].amount, 100000000);
    assert_eq!(
        fee_events[0].admin,
        "0xadc3a0bb21840f732435f8b649e99df6b29cd27854dfa4b020e3bee07ea09b96"
    );
    assert_eq!(fee_events[0].timestamp, 1744303596894);
    indexer_handle.abort();
}
