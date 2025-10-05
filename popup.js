document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("sendRequest");
  const responseDiv = document.getElementById("response");

  sendButton.addEventListener("click", async () => {
    // 📝 Pick a random comment from a small list
    const sampleComments = [
      "This is amazing!",
      "I really don't like this update.",
      "It's okay, not too bad.",
      "Absolutely terrible experience.",
      "Wow, great job Reddit team!"
    ];
    const randomText = sampleComments[Math.floor(Math.random() * sampleComments.length)];

    try {
      // 🌐 Send to your Flask API
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ comments: [randomText] })
      });

      const result = await res.json();
      console.log("API Response:", result);

      // Display the result in popup
      responseDiv.innerText = `Comment: "${randomText}" → Sentiment: ${result[0].sentiment}`;
    } catch (error) {
      console.error("Error:", error);
      responseDiv.innerText = `❌ Error: ${error.message}`;
    }
  });
});
