#! /bin/bash

# Without PTB

COIN_ID=$(sui client gas --json | jq -r '.[] | select(.suiBalance | tonumber > 1) | .gasCoinId' | head -n 1)
echo "Selected coin ID: $COIN_ID"

SPLIT_TRX=$(sui client split-coin --coin-id $COIN_ID --amounts 1000000000 --json)
NEW_COIN_ID=$(echo $SPLIT_TRX | jq -r '.objectChanges[] | select(.type == "created" and .objectType == "0x2::coin::Coin<0x2::sui::SUI>") | .objectId')
echo "New coin ID: $NEW_COIN_ID"

TRANSFER_TRX=$(sui client transfer --object-id $NEW_COIN_ID --to 0x0267c868ec3d58b338b0461b61f240c3a50ef80328cd7dc7f7e9514d905eb4d9 --json)

# With PTB

COIN_ID=$(sui client gas --json | jq -r '.[] | select(.suiBalance | tonumber > 1) | .gasCoinId' | head -n 1)
echo "Selected coin ID: $COIN_ID"

sui client ptb \
    --split-coins @$COIN_ID [1000000000] \
    --assign coin \
    --transfer-objects [coin] @0x0267c868ec3d58b338b0461b61f240c3a50ef80328cd7dc7f7e9514d905eb4d9 \
    --json