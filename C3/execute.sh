#!/bin/bash

birth_date="01-09-1986"
birth_date_timestamp=$(date -j -f "%d-%m-%Y" $birth_date "+%s000")

name="nikos"

PACKAGE_ID="0x17acec44c97cb41a3fa5151b1eacba6df6fa2c98edeed128f4d92ff78ddfca1b"
CLOCK_ID="0x6"
NAME_INDEXER_ID="0xa5e3bb306a9aa97db063027e6cfaa3ef037137b5387f3630d3fd6acd244fcd97"

sui client call \
    --package $PACKAGE_ID \
    --module my_event_emitter \
    --function emit_greeting_event \
    --args $CLOCK_ID $NAME_INDEXER_ID $name $birth_date_timestamp
