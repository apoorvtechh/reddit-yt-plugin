document.addEventListener("DOMContentLoaded", async () => {
  const messageText = document.getElementById("messageText");
  const spinner = document.getElementById("spinner");
  const analyzeBtn = document.getElementById("analyzeBtn");
  const resultsDiv = document.getElementById("results");

  const positivePercentEl = document.getElementById("positivePercent");
  const neutralPercentEl = document.getElementById("neutralPercent");
  const negativePercentEl = document.getElementById("negativePercent");

  const totalCommentsEl = document.getElementById("totalComments");
  const uniqueCommentsEl = document.getElementById("uniqueComments");
  const avgLengthEl = document.getElementById("avgLength");
  const sentimentScoreEl = document.getElementById("sentimentScore");

  const positiveCommentsEl = document.getElementById("positiveComments");
  const neutralCommentsEl = document.getElementById("neutralComments");
  const negativeCommentsEl = document.getElementById("negativeComments");

  let sentimentChart = null;

  function setLoading(isLoading, message = "") {
    if (isLoading) {
      spinner.style.display = "inline-block";
    } else {
      spinner.style.display = "none";
    }
    messageText.textContent = message;
  }

  function renderComments(container, comments) {
    container.innerHTML = "";
    comments.forEach(text => {
      const div = document.createElement("div");
      div.className = "comment";
      div.textContent = text;
      container.appendChild(div);
    });
  }

  function updatePercentageBar(type, value) {
    const percentText = document.getElementById(`${type}Percent`);
    const barFill = document.querySelector(`.${type} .bar-fill`);
    percentText.textContent = `${value}%`;
    barFill.style.width = `${value}%`;
  }

  function drawSentimentChart(data) {
    const ctx = document.getElementById("sentimentChart").getContext("2d");
    if (sentimentChart) sentimentChart.destroy();
    sentimentChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Positive", "Neutral", "Negative"],
        datasets: [{
          data: [data.positive, data.neutral, data.negative],
          backgroundColor: ["#4ade80", "#facc15", "#f87171"],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom", labels: { color: "#e5e5e5" } }
        }
      }
    });
  }

  function drawWordCloud(canvasId, comments) {
    const text = comments.join(" ");
    const words = text.split(/\s+/).filter(w => w.length > 3);
    const freq = {};
    words.forEach(w => freq[w] = (freq[w] || 0) + 1);
    const list = Object.entries(freq);

    WordCloud(document.getElementById(canvasId), {
      list,
      gridSize: 8,
      weightFactor: 8,
      fontFamily: "Segoe UI",
      color: "random-light",
      backgroundColor: "#1e1e1e"
    });
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab || !tab.url) return;

    const url = new URL(tab.url);
    if (!url.hostname.includes("reddit.com")) {
      setLoading(false, "❌ This extension only works on Reddit.");
      return;
    }

    const match = url.pathname.match(/comments\/([^/]+)/);
    if (!match) {
      setLoading(false, "👉 Open a Reddit post to analyze comments.");
      return;
    }

    const postId = match[1];
    setLoading(false, `✅ Reddit post detected: ${postId}`);
    analyzeBtn.style.display = "block";

    analyzeBtn.addEventListener("click", async () => {
      setLoading(true, "Fetching comments...");
      try {
        const fetchRes = await fetch(`http://localhost:5000/fetch/${postId}`);
        const fetchData = await fetchRes.json();
        if (fetchData.error) throw new Error(fetchData.error);

        setLoading(true, `💬 Analyzing ${fetchData.results.length} comments...`);

        // 📊 Update metrics
        totalCommentsEl.textContent = fetchData.results.length;
        uniqueCommentsEl.textContent = new Set(fetchData.results.map(c => c.comment)).size;
        avgLengthEl.textContent = Math.round(fetchData.results.reduce((sum, c) => sum + c.comment.length, 0) / fetchData.results.length);

        // 🎯 Sentiment Score (0–10)
        const pos = fetchData.percentages.positive;
        const neu = fetchData.percentages.neutral;
        const neg = fetchData.percentages.negative;
        const score = ((pos * 1 + neu * 0.5 + neg * 0) / 100 * 10).toFixed(1);
        sentimentScoreEl.textContent = score;

        // 🥧 Pie chart + Bars
        drawSentimentChart(fetchData.percentages);
        updatePercentageBar("positive", pos);
        updatePercentageBar("neutral", neu);
        updatePercentageBar("negative", neg);

        // 🧠 Word Clouds
        const posComments = fetchData.results.filter(c => c.sentiment === "Positive").map(c => c.comment);
        const neuComments = fetchData.results.filter(c => c.sentiment === "Neutral").map(c => c.comment);
        const negComments = fetchData.results.filter(c => c.sentiment === "Negative").map(c => c.comment);

        drawWordCloud("positiveCloud", posComments);
        drawWordCloud("neutralCloud", neuComments);
        drawWordCloud("negativeCloud", negComments);

        // 💬 Top Comments
        renderComments(positiveCommentsEl, posComments.slice(0, 5));
        renderComments(neutralCommentsEl, neuComments.slice(0, 5));
        renderComments(negativeCommentsEl, negComments.slice(0, 5));

        resultsDiv.style.display = "block";
        setLoading(false, `✅ Analysis complete`);
      } catch (err) {
        console.error(err);
        setLoading(false, `❌ Error: ${err.message}`);
      }
    });
  });
});
