#!/bin/bash

birth_date="01-09-1986"
birth_date_timestamp=$(date -j -f "%d-%m-%Y" $birth_date "+%s000")
name="nikos"

PACKAGE_ID="0xe9d24d6a29ea914fe9ca52f9eb2b7f9933b51aae0b7ed30fd5ed63fd4cda57e1"
WEATHER_PACKAGE_ID="0xe4a4b6bbc5645b4f4bf2549951c5b197b234aac8ea0bd3ac97563c85b22d98a8"
NAME_PACKAGE_INDEXER_ID="0x67aa833c0b6a618c25147e2e5bf80002cee613eccfe4ad760e0e78552d221c0d"
AGE_CALCULATOR_PACKAGE_ID="0x37b3b7dd4d56d96b56f674cd634ad79f30ba12985617684919bbe5b5a0600bcc"
NAME_INDEXER_ID="0xa5e3bb306a9aa97db063027e6cfaa3ef037137b5387f3630d3fd6acd244fcd97"
STD_PACKAGE_ID="0x1"
CLOCK_ID="0x6"

sui client ptb \
    # TODO: Add your PTB commands here
