document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("study-popup");

  // Local fallback study tips
  const fallbackTips = [
    "Stay focused and take short breaks.",
    "Set clear goals for each study session.",
    "Use active recall to improve memory.",
    "Teach what you learn to someone else.",
    "Eliminate distractions for better concentration.",
    "Stay hydrated and get enough sleep.",
  ];

  // Fetch random tip from API
  fetch("https://zenquotes.io/api/random")
    .then((response) => response.json())
    .then((data) => {
      const tip =
        data[0]?.q ||
        fallbackTips[Math.floor(Math.random() * fallbackTips.length)];
      const author = data[0]?.a || "";
      popup.innerHTML = `<p>💡 ${tip}${
        author ? " — <em>" + author + "</em>" : ""
      }</p>`;
      popup.classList.add("show");
    })
    .catch((error) => {
      console.error("Error fetching tip:", error);
      // fallback tip
      const randomTip =
        fallbackTips[Math.floor(Math.random() * fallbackTips.length)];
      popup.innerHTML = `<p>💡 ${randomTip}</p>`;
      popup.classList.add("show");
    });

  // Optional: hide popup on logout
  function hidePopup() {
    popup.classList.remove("show");
  }

  // Example: attach hidePopup() to your logout button
  // const logoutBtn = document.getElementById("logout-button");
  // if (logoutBtn) {
  //   logoutBtn.addEventListener("click", hidePopup);
  // }
});
