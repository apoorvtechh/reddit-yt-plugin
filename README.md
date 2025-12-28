# InsightReddit — Reddit Sentiment Analyzer (Chrome Extension)

Analyze sentiment across Reddit discussions in real time and uncover community opinions at scale.

**Author:** Apoorv Gupta  
**Contact:** apoorvtechh@gmail.com  
**Project Synopsis:** https://synopsis-yqdbpufcczaocxsai2zp3w.streamlit.app/

---

## Overview

InsightReddit is a production-ready Chrome Extension that performs real-time sentiment analysis on Reddit comment threads. It automatically extracts comments from active Reddit posts and delivers structured sentiment insights directly within the browser using a deployed machine learning backend.

---

## Installation

1. Open the Chrome Web Store listing:  
   https://chromewebstore.google.com/detail/insightreddit/ldhjhlbadkgikjmdaknfejeoogpgpgbh
2. Click **Add to Chrome**.
3. Navigate to any Reddit post. Sentiment insights will appear automatically.

**Note:** Supported only on Google Chrome (Manifest V3). Not supported on Firefox or Edge.

---

## Features

- One-click sentiment analysis for Reddit comment threads  
- Sentiment distribution across Positive, Neutral, and Negative classes  
- Word cloud visualization per sentiment category  
- Aggregated metrics including total comments, unique commenters, average comment length, and overall sentiment score  
- Top comments grouped by sentiment  
- Dark-themed, responsive UI optimized for readability  
- Low-latency inference via a hosted ML backend

---

## Project Structure




InsightReddit/

│

├── manifest.json

├── popup.html

├── popup.css

├── popup.js

├── README.md

│

├── icons/

│   ├── icon16.png

│   ├── icon48.png

│   └── icon128.png

│

└── libs/

├── chart.umd.min.js

└── wordcloud2.js

## Requirements

- Google Chrome (Manifest V3 compatible)
- Active internet connection
- Backend service running at https://insightreddit.duckdns.org

---

## Tech Stack

**Frontend:** HTML, CSS (Dark Theme), JavaScript, Chart.js, WordCloud2.js  
**Backend:** Python (Flask), Machine Learning sentiment model, Docker, AWS EC2, DuckDNS

---

## Use Cases

- Social sentiment analysis  
- Community opinion monitoring  
- Product and topic perception analysis  
- NLP and MLOps portfolio demonstration  
- Real-world browser-based ML deployment example

---

## License

This project is intended for educational and portfolio purposes.
