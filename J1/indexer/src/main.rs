use clap::Parser;
use sui_hero_indexer::create_indexer;
use sui_indexer_alt_framework::{cluster, Result};
use url::Url;

#[derive(clap::Parser, Debug)]
struct Args {
    #[clap(
        long,
        default_value = "postgres://postgres:postgrespw@localhost:5432/sui_hero"
    )]
    database_url: Url,

    #[clap(flatten)]
    cluster_args: cluster::Args,

    #[clap(long)]
    local_ingestion_path: Option<String>,

    #[clap(long)]
    remote_store_url: Option<Url>,

    #[clap(long)]
    rpc_api_url: Option<Url>,

    #[clap(long)]
    rpc_username: Option<String>,

    #[clap(long)]
    rpc_password: Option<String>,
}

#[tokio::main]
async fn main() -> Result<()> {
    let args = Args::parse();

    let indexer = create_indexer(args.database_url, args.cluster_args).await?;
    let _ = indexer.run().await?.await;
    Ok(())
}
