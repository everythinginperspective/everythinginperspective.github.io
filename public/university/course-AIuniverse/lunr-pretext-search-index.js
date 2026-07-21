var ptx_lunr_search_style = "textbook";
var ptx_lunr_docs = [
{
  "id": "front-colophon",
  "level": "1",
  "url": "front-colophon.html",
  "type": "Colophon",
  "number": "",
  "title": "Colophon",
  "body": "  "
},
{
  "id": "sec01-ai-definition",
  "level": "1",
  "url": "sec01-ai-definition.html",
  "type": "Section",
  "number": "1.1",
  "title": "Defining Artificial Intelligence",
  "body": " Defining Artificial Intelligence  AI is not magic. At its core, it's pattern recognition at scale. Your videos contain patterns: repetitive work activities, consistent tool usage, recognizable task types. We will extract these patterns programmatically.  "
},
{
  "id": "sec01-why-real-data",
  "level": "1",
  "url": "sec01-why-real-data.html",
  "type": "Section",
  "number": "1.2",
  "title": "Why Real Data Beats Toy Examples",
  "body": " Why Real Data Beats Toy Examples  Most AI textbooks teach with clean, curated datasets. Your videos are messy, real, and complex—which is exactly why they're valuable. When you finish this textbook, you will have solved a real problem.   Authentic timestamps and temporal patterns  Natural class imbalance (some tasks more common than others)  Noisy labels (your own subjective task classifications)  High-dimensional visual features   "
},
{
  "id": "sec01-roadmap",
  "level": "1",
  "url": "sec01-roadmap.html",
  "type": "Section",
  "number": "1.3",
  "title": "Your Learning Journey",
  "body": " Your Learning Journey  This textbook is structured as a spiral: each concept appears multiple times, getting more sophisticated.   Foundations: Learn to load, explore, and visualize your data.  From Scratch: Implement ML algorithms using only NumPy. No sklearn, no TensorFlow—just linear algebra.  Case Study: Apply everything to your videos. Extract features, train classifiers, build a timeline reconstruction.   "
},
{
  "id": "sec02-loading",
  "level": "1",
  "url": "sec02-loading.html",
  "type": "Section",
  "number": "2.1",
  "title": "Loading and Indexing Video Metadata",
  "body": " Loading and Indexing Video Metadata  Stub: Video file ingestion, extraction of timestamps, frame sampling.  "
},
{
  "id": "sec02-exploration",
  "level": "1",
  "url": "sec02-exploration.html",
  "type": "Section",
  "number": "2.2",
  "title": "Exploratory Data Analysis",
  "body": " Exploratory Data Analysis  Stub: Statistical summaries, temporal patterns, class distributions.  "
},
{
  "id": "ch03-linear-regression",
  "level": "1",
  "url": "ch03-linear-regression.html",
  "type": "Chapter",
  "number": "3",
  "title": "Linear Regression From Scratch",
  "body": " Linear Regression From Scratch  Stub: Implementing linear regression using NumPy only.  "
},
{
  "id": "ch04-classification",
  "level": "1",
  "url": "ch04-classification.html",
  "type": "Chapter",
  "number": "4",
  "title": "Classification From Scratch",
  "body": " Classification From Scratch  Stub: Logistic regression and decision trees using NumPy.  "
},
{
  "id": "ch05-neural-networks",
  "level": "1",
  "url": "ch05-neural-networks.html",
  "type": "Chapter",
  "number": "5",
  "title": "Neural Networks From Scratch",
  "body": " Neural Networks From Scratch  Stub: Forward pass, backpropagation, training using NumPy.  "
},
{
  "id": "ch06-video-processing",
  "level": "1",
  "url": "ch06-video-processing.html",
  "type": "Chapter",
  "number": "6",
  "title": "Video Processing: From Raw Frames to Data",
  "body": " Video Processing: From Raw Frames to Data  Stub: Video loading, frame extraction, OCR, temporal analysis.  "
},
{
  "id": "ch07-feature-engineering",
  "level": "1",
  "url": "ch07-feature-engineering.html",
  "type": "Chapter",
  "number": "7",
  "title": "Feature Engineering: Extracting Meaning From Video",
  "body": " Feature Engineering: Extracting Meaning From Video  Stub: Visual features, text extraction, temporal patterns, feature normalization.  "
},
{
  "id": "ch08-classification-pipeline",
  "level": "1",
  "url": "ch08-classification-pipeline.html",
  "type": "Chapter",
  "number": "8",
  "title": "Building the Complete Pipeline: Tagging Your Work",
  "body": " Building the Complete Pipeline: Tagging Your Work  Stub: End-to-end classification, temporal segmentation, timeline reconstruction, validation.  "
},
{
  "id": "backmatter-2",
  "level": "1",
  "url": "backmatter-2.html",
  "type": "Colophon",
  "number": "",
  "title": "Colophon",
  "body": " This book was authored in PreTeXt .  "
}
]

var ptx_lunr_idx = lunr(function () {
  this.ref('id')
  this.field('title')
  this.field('body')
  this.metadataWhitelist = ['position']

  ptx_lunr_docs.forEach(function (doc) {
    this.add(doc)
  }, this)
})
