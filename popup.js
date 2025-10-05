document.addEventListener("DOMContentLoaded", async () => {
  const messageText = document.getElementById("messageText");
  const spinner = document.getElementById("spinner");
  const analyzeBtn = document.getElementById("analyzeBtn");
  const resultsDiv = document.getElementById("results");

  const positivePercentEl = document.getElementById("positivePercent");
  const neutralPercentEl = document.getElementById("neutralPercent");
  const negativePercentEl = document.getElementById("negativePercent");

  const positiveCommentsEl = document.getElementById("positiveComments");
  const neutralCommentsEl = document.getElementById("neutralComments");
  const negativeCommentsEl = document.getElementById("negativeComments");

  // ✅ Helper: Render a list of comments into a container
  function renderComments(container, comments, cssClass) {
    container.innerHTML = "";
    comments.forEach(text => {
      const div = document.createElement("div");
      div.className = `comment ${cssClass}`;
      div.textContent = text;
      container.appendChild(div);
    });
  }

  // ✅ Helper: Show or hide the spinner
  function setLoading(isLoading, message = "") {
    if (isLoading) {
      spinner.style.display = "inline-block";
    } else {
      spinner.style.display = "none";
    }
    messageText.textContent = message;
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
        // 🟡 ✅ Fetch comments using correct Flask route
        const fetchRes = await fetch(`http://localhost:5000/fetch/${postId}`);
        const fetchData = await fetchRes.json();

        if (fetchData.error) throw new Error(fetchData.error);

        setLoading(true, `💬 Fetched ${fetchData.results.length} comments. Analyzing...`);

        // ✅ Percentages already included in the same response in our backend
        const predictData = fetchData;

        // ✅ Analysis done
        setLoading(false, `✅ Analysis complete for ${fetchData.results.length} comments.`);

        // Update percentages
        positivePercentEl.textContent = `${predictData.percentages.positive}%`;
        neutralPercentEl.textContent = `${predictData.percentages.neutral}%`;
        negativePercentEl.textContent = `${predictData.percentages.negative}%`;

        // Render top 5 per category
        const topPos = predictData.results.filter(r => r.sentiment === "Positive").slice(0, 5).map(r => r.comment);
        const topNeu = predictData.results.filter(r => r.sentiment === "Neutral").slice(0, 5).map(r => r.comment);
        const topNeg = predictData.results.filter(r => r.sentiment === "Negative").slice(0, 5).map(r => r.comment);

        renderComments(positiveCommentsEl, topPos, "positive");
        renderComments(neutralCommentsEl, topNeu, "neutral");
        renderComments(negativeCommentsEl, topNeg, "negative");

        resultsDiv.style.display = "block";
      } catch (err) {
        console.error(err);
        setLoading(false, `❌ Error: ${err.message}`);
      }
    });
  });
});
