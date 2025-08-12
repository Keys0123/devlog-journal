const form = document.getElementById('logForm');
const entryText = document.getElementById('entryText');
const entriesList = document.getElementById('entriesList');

// Load existing entries on page load
window.onload = () => {
  loadEntries();
};

// Handle form submission
form.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const entry = {
    text: entryText.value.trim(),
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  };

  if (entry.text !== "") {
    saveEntry(entry);
    entryText.value = '';
    loadEntries();
  }
});

// Save to localStorage
function saveEntry(entry) {
  const existing = JSON.parse(localStorage.getItem('devlog_entries')) || [];
  existing.unshift(entry); // add to beginning
  localStorage.setItem('devlog_entries', JSON.stringify(existing));
}

// Load and display entries
function loadEntries() {
  const entries = JSON.parse(localStorage.getItem('devlog_entries')) || [];
  entriesList.innerHTML = '';

  if (entries.length === 0) {
    entriesList.innerHTML = "<p>No entries yet. Start writing!</p>";
    return;
  }

  entries.forEach((entry, index) => {
    const div = document.createElement('div');
    div.classList.add('entry');
    div.innerHTML = `
      <div class="entry-meta">${entry.date} • ${entry.time}</div>
      <div class="entry-text">${entry.text}</div>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    entriesList.appendChild(div);
  });

  // Attach delete event listeners
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      deleteEntry(index);
    });
  });
}
// Delete an entry
function deleteEntry(index) {
  const entries = JSON.parse(localStorage.getItem('devlog_entries')) || [];
  entries.splice(index, 1);
  localStorage.setItem('devlog_entries', JSON.stringify(entries));
  loadEntries();
}
document.getElementById("log-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const entry = document.getElementById("log-entry").value;
  if (entry.trim() !== "") {
    // Save in list
    const li = document.createElement("li");
    li.textContent = entry;
    document.getElementById("log-list").appendChild(li);

    // Clear text box
    document.getElementById("log-entry").value = "";
  }
});

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




