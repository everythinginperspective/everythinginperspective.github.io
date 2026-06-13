#!/bin/bash

ARTICLES_DIR="/Volumes/B95P4/everythinginperspective_nuxt_1adf587/content/articles"
DOMAIN="https://everythinginperspective.github.io"

# Get all files sorted by modification time (earliest first)
ls -rt "$ARTICLES_DIR"/*.md | while read file; do
  basename=$(basename "$file")
  # Extract slug with language code - keep the .lang part, remove only .md
  slug=$(echo "$basename" | sed 's/\.md$//')
  
  # Output URL with trailing slash
  echo "${DOMAIN}/magazine/article/${slug}/"
done

