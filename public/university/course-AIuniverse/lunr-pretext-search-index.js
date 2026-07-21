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
  "id": "sec-ai-definition",
  "level": "1",
  "url": "sec-ai-definition.html",
  "type": "Section",
  "number": "1.1",
  "title": "Defining Artificial Intelligence",
  "body": " Defining Artificial Intelligence  AI is not magic. At its core, it's pattern recognition at scale. Work activity videos contain patterns: repetitive tasks, consistent tool usage, recognizable workflow types. We will learn to extract these patterns programmatically.  "
},
{
  "id": "sec-real-data-importance",
  "level": "1",
  "url": "sec-real-data-importance.html",
  "type": "Section",
  "number": "1.2",
  "title": "Why Real Data Beats Toy Examples",
  "body": " Why Real Data Beats Toy Examples  Most AI textbooks teach with clean, curated datasets. Real-world videos are messy, complex, and authentic—which is exactly why they're valuable. When you finish this textbook, you will have solved a real problem: automatically organizing and understanding work activity data.   Authentic timestamps and temporal patterns  Natural class imbalance (some tasks more common than others)  Noisy labels (your own subjective task classifications)  High-dimensional visual features   "
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
  "id": "sec-video-metadata-loading",
  "level": "1",
  "url": "sec-video-metadata-loading.html",
  "type": "Section",
  "number": "2.1",
  "title": "Loading and Indexing Video Metadata",
  "body": " Loading and Indexing Video Metadata  Stub: Video file ingestion, extraction of timestamps, frame sampling.  "
},
{
  "id": "sec-exploratory-analysis",
  "level": "1",
  "url": "sec-exploratory-analysis.html",
  "type": "Section",
  "number": "2.2",
  "title": "Exploratory Data Analysis",
  "body": " Exploratory Data Analysis  Stub: Statistical summaries, temporal patterns, class distributions.  "
},
{
  "id": "ch-algorithms-linear-regression",
  "level": "1",
  "url": "ch-algorithms-linear-regression.html",
  "type": "Chapter",
  "number": "3",
  "title": "Linear Regression From Scratch",
  "body": " Linear Regression From Scratch  In this chapter, we implement linear regression using NumPy only. This foundation prepares us for the case study's continuous regression tasks.  "
},
{
  "id": "ch-algorithms-classification",
  "level": "1",
  "url": "ch-algorithms-classification.html",
  "type": "Chapter",
  "number": "4",
  "title": "Classification From Scratch",
  "body": " Classification From Scratch  We implement logistic regression and decision trees using NumPy. These classifiers will form the core of our case study's task tagging system.  "
},
{
  "id": "ch-algorithms-neural-networks",
  "level": "1",
  "url": "ch-algorithms-neural-networks.html",
  "type": "Chapter",
  "number": "5",
  "title": "Neural Networks From Scratch",
  "body": " Neural Networks From Scratch  We build neural networks from scratch: implementing forward pass, backpropagation, and training using only NumPy. Later, we apply these techniques to analyze video frames.  "
},
{
  "id": "ch-casestudy-video-processing",
  "level": "1",
  "url": "ch-casestudy-video-processing.html",
  "type": "Chapter",
  "number": "6",
  "title": "Video Processing: From Raw Frames to Data",
  "body": " Video Processing: From Raw Frames to Data  Now we apply our foundations to the case study. We process work activity videos: loading video files, extracting key frames, applying OCR to detect text, and analyzing temporal patterns.  "
},
{
  "id": "ch-casestudy-feature-engineering",
  "level": "1",
  "url": "ch-casestudy-feature-engineering.html",
  "type": "Chapter",
  "number": "7",
  "title": "Feature Engineering: Extracting Meaning From Video",
  "body": " Feature Engineering: Extracting Meaning From Video  We design features that capture the essence of work activities: visual patterns from video frames, text detected in screenshots, temporal activity sequences, and normalized representations ready for our classifiers.  "
},
{
  "id": "ch-casestudy-pipeline-complete",
  "level": "1",
  "url": "ch-casestudy-pipeline-complete.html",
  "type": "Chapter",
  "number": "8",
  "title": "Building the Complete Pipeline: Tagging Work Activities",
  "body": " Building the Complete Pipeline: Tagging Work Activities  We assemble everything: combining video processing, feature engineering, and classification into an end-to-end pipeline. We segment video timelines into task boundaries, reconstruct activity logs, and validate our system's accuracy.  "
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
