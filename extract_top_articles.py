#!/usr/bin/env python
import json
import csv
from pathlib import Path

# Load JSON
json_path = Path("Zsupplementary/fetch_top_wikiarticles_master.json")
with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Aggregate all articles with language info
all_articles = []
wikipedia = data.get("wikipedia", {})

for lang_code, articles in wikipedia.items():
    for article in articles:
        all_articles.append({
            "language": lang_code,
            "title": article["title"],
            "views": article["views"],
            "rank": article["rank"],
            "url": article["einp_url"]
        })

# Sort by views descending
all_articles.sort(key=lambda x: x["views"], reverse=True)

# Get top 20
top_20 = all_articles[:20]

# Write to CSV
csv_path = Path("Zsupplementary/top_20_wikipedia_articles.csv")
with open(csv_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["rank", "language", "title", "views", "url"])
    writer.writeheader()
    for i, article in enumerate(top_20, 1):
        article["rank"] = i
        writer.writerow(article)

print(f"✓ CSV saved to {csv_path}")
print(f"\nTop 20 Wikipedia Articles Globally:")
print("-" * 80)
for i, article in enumerate(top_20, 1):
    print(f"{i:2d}. [{article['language']}] {article['title'][:50]:50s} | {article['views']:,} views")
