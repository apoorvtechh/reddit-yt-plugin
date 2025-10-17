# 🧠 InsightReddit — Reddit Sentiment Analyzer (Chrome Extension)

> Analyze Reddit vibes in seconds — spot positivity, negativity, and everything in between.

Built by **Apoorv Gupta** (📧 [apoorvtechh@gmail.com](mailto:apoorvtechh@gmail.com))  
📄 [🔗 View Project Synopsis](https://synopsis-yqdbpufcczaocxsai2zp3w.streamlit.app/)

---

## 🌟 Features

- 🚀 One-click sentiment analysis of Reddit posts  
- 📊 Sentiment distribution visualization (Positive / Neutral / Negative)  
- 🌈 Word clouds for each sentiment category  
- 🧠 Real-time metrics: total comments, unique commenters, average length, sentiment score  
- 💬 Top comments grouped by sentiment  
- 🌑 Dark theme UI with responsive cards and charts  
- ⚡ Fast backend inference using a hosted ML model

---

## 📁 Project Structure

📂 InsightReddit/

├── manifest.json

├── popup.html

├── popup.css

├── popup.js

├── README.md

├── icons/

│   ├── icon16.png

│   ├── icon48.png

│   └── icon128.png

└── libs/

├── chart.umd.min.js

└── wordcloud2.js

---

## 📌 Requirements

- 🧭 Google Chrome (Manifest V3)  
- 🌐 Internet connection  
- ⚡ Backend running at [https://insightreddit.duckdns.org](https://insightreddit.duckdns.org)

---

## 🧪 Tech Stack

- **Frontend:** HTML, CSS (Dark Theme), JavaScript, Chart.js, WordCloud2.js  
- **Backend:** Flask-based sentiment analysis model hosted inside a **Docker container on AWS EC2**  
- **Platform:** Chrome Extensions (Manifest V3)  
- **Deployment:** Docker + AWS EC2 + DuckDNS 
---

## 👨‍💻 Author

**Apoorv Gupta**  
📧 [apoorvtechh@gmail.com](mailto:apoorvtechh@gmail.com)  
🔗 [Project Synopsis](https://synopsis-yqdbpufcczaocxsai2zp3w.streamlit.app/)
