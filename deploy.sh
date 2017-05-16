#!/usr/bin/env bash

cd cypher-codemirror \
    && yarn run build-demo \
    && cd demo \
    && git init \
    && git remote add origin git@github.com:neo4j-contrib/cypher-editor.git \
    && git checkout -b gh-pages \
    && git add --all \
    && git commit -m "Deploy website" \
    && git push -f origin gh-pages
