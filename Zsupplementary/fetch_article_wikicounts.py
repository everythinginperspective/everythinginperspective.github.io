#!/usr/bin/env python3
"""
Fetch article counts for all 2-char Wikipedia and Wiktionary language editions.
Calculates percentage contribution of each language to total articles.
Outputs to timestamped + master CSV files.
"""

import csv
import json
import requests
import time
from datetime import datetime
import sys

def load_language_codes():
    """Load 2-char language codes from Wikipedia sitematrix."""
    print("Loading language codes from Wikimedia...")
    url = "https://en.wikipedia.org/w/api.php?action=sitematrix&format=json"
    for attempt in range(3):
        try:
            response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=30)
            data = response.json()
            break
        except Exception as e:
            if attempt == 2:
                raise
            time.sleep(2 ** attempt)
    
    sm = data['sitematrix']
    wikipedias = []
    wiktionaries = []
    
    for key in sm:
        if key in ['count', 'specials']:
            continue
        lang_data = sm[key]
        if 'site' in lang_data:
            code = lang_data['code']
            localname = lang_data.get('localname', code)
            for site in lang_data['site']:
                if site['code'] == 'wiki' and 'closed' not in site and len(code) == 2:
                    wikipedias.append((code, localname))
                elif site['code'] == 'wiktionary' and 'closed' not in site and len(code) == 2:
                    wiktionaries.append((code, localname))
    
    return sorted(set(wikipedias)), sorted(set(wiktionaries))

def fetch_article_count(lang, project_type='wikipedia'):
    """Fetch article count for a language from Wikipedia or Wiktionary."""
    domain = f"{lang}.{project_type}.org"
    url = f"https://{domain}/w/api.php?action=query&meta=siteinfo&siprop=statistics&format=json"
    
    try:
        response = requests.get(url, headers={'User-Agent': 'EinP-ArticleCounts/1.0'}, timeout=10)
        if response.status_code == 200:
            data = response.json()
            stats = data.get('query', {}).get('statistics', {})
            return {
                'articles': stats.get('articles', 0),
                'pages': stats.get('pages', 0),
                'edits': stats.get('edits', 0),
                'users': stats.get('users', 0)
            }
        else:
            print(f"  Error {response.status_code} for {lang}")
            return None
    except Exception as e:
        print(f"  Exception for {lang}: {e}")
        return None

def main():
    print("Fetching article counts for all 2-char language editions...\n")
    
    # Load language codes
    wiki_langs, wikt_langs = load_language_codes()
    print(f"Found {len(wiki_langs)} Wikipedia 2-char codes, {len(wikt_langs)} Wiktionary 2-char codes\n")
    
    results = []
    
    # Fetch Wikipedia counts
    print(f"Fetching Wikipedia article counts for {len(wiki_langs)} languages...")
    for i, (lang, localname) in enumerate(wiki_langs, 1):
        print(f"  [{i}/{len(wiki_langs)}] {lang} ({localname})...", end=' ')
        stats = fetch_article_count(lang, 'wikipedia')
        if stats:
            results.append({
                'project': 'wikipedia',
                'lang_code': lang,
                'language_name': localname,
                'articles': stats['articles'],
                'pages': stats['pages'],
                'edits': stats['edits'],
                'users': stats['users']
            })
            print(f"✓ {stats['articles']:,} articles")
        else:
            print("✗ No data")
        time.sleep(0.2)  # Rate limiting
    
    # Fetch Wiktionary counts
    print(f"\nFetching Wiktionary article counts for {len(wikt_langs)} languages...")
    for i, (lang, localname) in enumerate(wikt_langs, 1):
        print(f"  [{i}/{len(wikt_langs)}] {lang} ({localname})...", end=' ')
        stats = fetch_article_count(lang, 'wiktionary')
        if stats:
            results.append({
                'project': 'wiktionary',
                'lang_code': lang,
                'language_name': localname,
                'articles': stats['articles'],
                'pages': stats['pages'],
                'edits': stats['edits'],
                'users': stats['users']
            })
            print(f"✓ {stats['articles']:,} articles")
        else:
            print("✗ No data")
        time.sleep(0.2)  # Rate limiting
    
    # Calculate totals and percentages
    total_wikipedia_articles = sum(r['articles'] for r in results if r['project'] == 'wikipedia')
    total_wiktionary_articles = sum(r['articles'] for r in results if r['project'] == 'wiktionary')
    grand_total_articles = total_wikipedia_articles + total_wiktionary_articles
    
    # Add percentage columns
    for r in results:
        r['pct_of_project'] = (r['articles'] / (total_wikipedia_articles if r['project'] == 'wikipedia' else total_wiktionary_articles)) * 100 if r['articles'] > 0 else 0
        r['pct_of_grand_total'] = (r['articles'] / grand_total_articles) * 100 if grand_total_articles > 0 else 0
    
    # Sort by article count descending
    results.sort(key=lambda x: x['articles'], reverse=True)
    
    # Output files
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    master_file = 'fetch_article_wikicounts_master.csv'
    timestamped_file = f'fetch_article_wikicounts_{timestamp}.csv'
    
    # CSV headers
    fieldnames = ['project', 'lang_code', 'language_name', 'articles', 'pages', 'edits', 'users', 'pct_of_project', 'pct_of_grand_total']
    
    # Write both files
    for filepath in [master_file, timestamped_file]:
        with open(filepath, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(results)
    
    print(f"\n✓ Written to {master_file}")
    print(f"✓ Written to {timestamped_file}")
    
    # Summary statistics
    print(f"\n{'='*60}")
    print("SUMMARY STATISTICS")
    print(f"{'='*60}")
    print(f"Total Wikipedia articles:   {total_wikipedia_articles:,}")
    print(f"Total Wiktionary articles:  {total_wiktionary_articles:,}")
    print(f"Grand total articles:       {grand_total_articles:,}")
    print(f"\nWikipedia languages:        {len([r for r in results if r['project'] == 'wikipedia'])}")
    print(f"Wiktionary languages:       {len([r for r in results if r['project'] == 'wiktionary'])}")
    
    # Top 5 contributors
    print(f"\n{'='*60}")
    print("TOP 5 CONTRIBUTORS TO GRAND TOTAL")
    print(f"{'='*60}")
    for i, r in enumerate(results[:5], 1):
        print(f"{i}. {r['project'].capitalize()} {r['lang_code']} ({r['language_name']}): {r['articles']:,} articles ({r['pct_of_grand_total']:.2f}%)")
    
    print(f"\n{'='*60}")
    print("WIKIPEDIA CONTRIBUTION")
    print(f"{'='*60}")
    wiki_pct = (total_wikipedia_articles / grand_total_articles) * 100
    print(f"Wikipedia: {total_wikipedia_articles:,} articles ({wiki_pct:.2f}% of total)")
    print(f"Wiktionary: {total_wiktionary_articles:,} articles ({100-wiki_pct:.2f}% of total)")

if __name__ == '__main__':
    main()
