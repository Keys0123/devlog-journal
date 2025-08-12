const logList = document.getElementById("log-list");
const logForm = document.getElementById("log-form");
const logEntry = document.getElementById("log-entry");

// Load saved entries from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const savedLogs = JSON.parse(localStorage.getItem("devLogs")) || [];
  savedLogs.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    logList.appendChild(li);
  });
});

// Add new entry and save
logForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const entryText = logEntry.value.trim();
  if (entryText !== "") {
    const li = document.createElement("li");
    li.textContent = entryText;
    logList.appendChild(li);

    // Save to localStorage
    const savedLogs = JSON.parse(localStorage.getItem("devLogs")) || [];
    savedLogs.push(entryText);
    localStorage.setItem("devLogs", JSON.stringify(savedLogs));

    logEntry.value = "";
  }
});
