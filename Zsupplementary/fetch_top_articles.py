#!/usr/bin/env python3
"""
Fetch top N articles from Wikipedia and Wiktionary for all 2-char language codes.
Translates them to EinP URLs and outputs to timestamped + master files.
"""

import json
import requests
import time
from datetime import datetime
import sys

# Configuration
N = int(sys.argv[1]) if len(sys.argv) > 1 else 50
DATE = "2024/07/20"  # Use a known good date with data

def load_language_codes():
    """Load 2-char language codes from Wikipedia sitematrix."""
    url = "https://en.wikipedia.org/w/api.php?action=sitematrix&format=json"
    response = requests.get(url)
    data = response.json()
    
    sm = data['sitematrix']
    wikipedias = []
    wiktionaries = []
    
    for key in sm:
        if key in ['count', 'specials']:
            continue
        lang_data = sm[key]
        if 'site' in lang_data:
            code = lang_data['code']
            for site in lang_data['site']:
                if site['code'] == 'wiki' and 'closed' not in site and len(code) == 2:
                    wikipedias.append(code)
                elif site['code'] == 'wiktionary' and 'closed' not in site and len(code) == 2:
                    wiktionaries.append(code)
    
    return sorted(set(wikipedias)), sorted(set(wiktionaries))

def fetch_top_articles(lang, project_type='wikipedia', n=50):
    """Fetch top N articles for a language from Wikipedia or Wiktionary."""
    project = f"{lang}.{project_type}"
    url = f"https://wikimedia.org/api/rest_v1/metrics/pageviews/top/{project}/desktop/{DATE}"
    
    try:
        response = requests.get(url, headers={'User-Agent': 'EinP-TopArticles/1.0'})
        if response.status_code == 200:
            data = response.json()
            if 'items' in data and len(data['items']) > 0:
                articles = data['items'][0].get('articles', [])
                # Filter out special pages and take top N
                filtered = [
                    a for a in articles 
                    if not a['article'].startswith('Special:') 
                    and a['article'] not in ['Main_Page', 'Portal:Current_events']
                ][:n]
                return filtered
        elif response.status_code == 404:
            print(f"  No data for {lang}")
            return []
        else:
            print(f"  Error {response.status_code} for {lang}")
            return []
    except Exception as e:
        print(f"  Exception for {lang}: {e}")
        return []
    
    return []

def translate_to_einp_url(lang, article, project_type='encyclopedia'):
    """Translate Wikipedia/Wiktionary article to EinP URL."""
    return f"https://everythinginperspective.vercel.app/{project_type}/{lang}/{article}"

def main():
    print(f"Fetching top {N} articles for all 2-char languages...")
    
    # Load language codes
    print("Loading language codes from Wikimedia...")
    wiki_langs, wikt_langs = load_language_codes()
    print(f"Found {len(wiki_langs)} Wikipedia 2-char codes, {len(wikt_langs)} Wiktionary 2-char codes")
    
    results = {
        'generated_at': datetime.now().isoformat(),
        'top_n': N,
        'source_date': DATE,
        'wikipedia': {},
        'wiktionary': {}
    }
    
    # Fetch Wikipedia articles
    print(f"\nFetching Wikipedia top {N} for {len(wiki_langs)} languages...")
    for i, lang in enumerate(wiki_langs, 1):
        print(f"  [{i}/{len(wiki_langs)}] {lang}...", end=' ')
        articles = fetch_top_articles(lang, 'wikipedia', N)
        if articles:
            results['wikipedia'][lang] = [
                {
                    'title': a['article'],
                    'views': a['views'],
                    'rank': a['rank'],
                    'einp_url': translate_to_einp_url(lang, a['article'], 'encyclopedia')
                }
                for a in articles
            ]
            print(f"✓ {len(articles)} articles")
        else:
            print("✗ No data")
        time.sleep(0.1)  # Rate limiting
    
    # Fetch Wiktionary articles
    print(f"\nFetching Wiktionary top {N} for {len(wikt_langs)} languages...")
    for i, lang in enumerate(wikt_langs, 1):
        print(f"  [{i}/{len(wikt_langs)}] {lang}...", end=' ')
        articles = fetch_top_articles(lang, 'wiktionary', N)
        if articles:
            results['wiktionary'][lang] = [
                {
                    'title': a['article'],
                    'views': a['views'],
                    'rank': a['rank'],
                    'einp_url': translate_to_einp_url(lang, a['article'], 'dictionary')
                }
                for a in articles
            ]
            print(f"✓ {len(articles)} articles")
        else:
            print("✗ No data")
        time.sleep(0.1)  # Rate limiting
    
    # Output files
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    master_file = 'fetch_top_articles_master.json'
    timestamped_file = f'fetch_top_articles_{timestamp}.json'
    
    # Write both files
    for filepath in [master_file, timestamped_file]:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(results, f, ensure_ascii=False, indent=2)
    
    print(f"\n✓ Written to {master_file}")
    print(f"✓ Written to {timestamped_file}")
    print(f"\nSummary:")
    print(f"  Wikipedia languages with data: {len(results['wikipedia'])}")
    print(f"  Wiktionary languages with data: {len(results['wiktionary'])}")
    total_articles = sum(len(v) for v in results['wikipedia'].values()) + sum(len(v) for v in results['wiktionary'].values())
    print(f"  Total articles: {total_articles}")

if __name__ == '__main__':
    main()
