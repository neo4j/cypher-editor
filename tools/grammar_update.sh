#!/bin/bash

java \
    -Xmx500M \
    -cp "tools/antlr-4.6-complete.jar" \
    org.antlr.v4.Tool \
    -Dlanguage=JavaScript cypher-editor-support/src/_generated/Cypher.g4

rm -f cypher-editor-support/src/_generated/Cypher.tokens
rm -f cypher-editor-support/src/_generated/CypherLexer.tokens
