#!/usr/bin/env python
import json
import csv
from pathlib import Path
from collections import defaultdict

# Load JSON
json_path = Path("fetch_top_wikiarticles_master.json")
with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

def filter_articles(articles):
    """Filter out articles with ':' in title (special namespaces)"""
    return [a for a in articles if ':' not in a['title']]

# Process Wikipedia
wikipedia_articles = []
wikipedia = data.get("wikipedia", {})

for lang_code, articles in wikipedia.items():
    filtered = filter_articles(articles)
    for article in filtered:
        wikipedia_articles.append({
            "language": lang_code,
            "title": article["title"],
            "views": article["views"],
            "rank": article["rank"],
            "url": article["einp_url"],
            "source": "Wikipedia"
        })

# Process Wiktionary
wiktionary_articles = []
wiktionary = data.get("wiktionary", {})

for lang_code, articles in wiktionary.items():
    filtered = filter_articles(articles)
    for article in filtered:
        wiktionary_articles.append({
            "language": lang_code,
            "title": article["title"],
            "views": article["views"],
            "rank": article["rank"],
            "url": article["einp_url"],
            "source": "Wiktionary"
        })

# Sort by views descending
wikipedia_articles.sort(key=lambda x: x["views"], reverse=True)
wiktionary_articles.sort(key=lambda x: x["views"], reverse=True)

# Write Wikipedia CSV
wiki_csv = Path("wikipedia_all_articles.csv")
with open(wiki_csv, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["rank", "language", "title", "views", "url"])
    writer.writeheader()
    for i, article in enumerate(wikipedia_articles, 1):
        writer.writerow({
            "rank": i,
            "language": article["language"],
            "title": article["title"],
            "views": article["views"],
            "url": article["url"]
        })

print(f"✓ Wikipedia CSV saved: {wiki_csv} ({len(wikipedia_articles)} articles)")

# Write Wiktionary CSV
dict_csv = Path("wiktionary_all_entries.csv")
with open(dict_csv, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["rank", "language", "title", "views", "url"])
    writer.writeheader()
    for i, article in enumerate(wiktionary_articles, 1):
        writer.writerow({
            "rank": i,
            "language": article["language"],
            "title": article["title"],
            "views": article["views"],
            "url": article["url"]
        })

print(f"✓ Wiktionary CSV saved: {dict_csv} ({len(wiktionary_articles)} entries)")

# Create matrix: Language × View Count Ranges
view_ranges = [(0, 100), (100, 1000), (1000, 10000), (10000, 100000), (100000, float('inf'))]
range_labels = ['0-100', '100-1K', '1K-10K', '10K-100K', '100K+']

def build_matrix(articles, source_name):
    """Build language × view_range matrix"""
    matrix_data = defaultdict(lambda: {label: 0 for label in range_labels})
    
    for article in articles:
        lang = article['language']
        views = article['views']
        for (min_v, max_v), label in zip(view_ranges, range_labels):
            if min_v <= views < max_v:
                matrix_data[lang][label] += 1
                break
    
    # Write matrix CSV
    matrix_csv = Path(f"{source_name.lower()}_matrix_language_by_viewrange.csv")
    with open(matrix_csv, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["Language"] + range_labels)
        for lang in sorted(matrix_data.keys()):
            row = [lang] + [matrix_data[lang][label] for label in range_labels]
            writer.writerow(row)
    
    print(f"✓ {source_name} matrix saved: {matrix_csv}")

build_matrix(wikipedia_articles, "Wikipedia")
build_matrix(wiktionary_articles, "Wiktionary")

print(f"\n--- Summary ---")
print(f"Wikipedia: {len(wikipedia_articles)} articles (excluding special namespaces)")
print(f"Wiktionary: {len(wiktionary_articles)} entries (excluding special namespaces)")
