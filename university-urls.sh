#!/bin/bash

# Generate timestamped filename
timestamp=$(date +"%Y-%m-%d-%H%M%S")
timestamped_file="university-urls-${timestamp}.txt"
master_file="university-urls.txt"

# Generate URLs and save to both files
for course_dir in public/university/course-*/; do
  coursename=$(basename "$course_dir")
  for html_file in "$course_dir"*.html; do
    filename=$(basename "$html_file" .html)
    echo "https://everythinginperspective.vercel.app/university/${coursename}/${filename}"
  done
done | tee "$master_file" "$timestamped_file"

echo ""
echo "✓ Master file: $master_file"
echo "✓ Timestamped file: $timestamped_file"
