document.addEventListener('DOMContentLoaded', () => {
  const logList = document.getElementById('log-list');
  const logForm = document.getElementById('log-form');
  const logEntry = document.getElementById('log-entry');

  if (!logList || !logForm || !logEntry) {
    console.error('DevLog: missing element(s). Check that IDs are: log-form, log-entry, log-list');
    return;
  }

  const getSaved = () => {
    try {
      return JSON.parse(localStorage.getItem('devLogs') || '[]');
    } catch (err) {
      console.error('DevLog: failed to parse localStorage:', err);
      return [];
    }
  };

  function render() {
    const saved = getSaved();
    logList.innerHTML = '';

    if (saved.length === 0) {
      const p = document.createElement('p');
      p.textContent = 'No entries yet. Start writing!';
      logList.appendChild(p);
      return;
    }

    saved.forEach((entry, index) => {
      const li = document.createElement('li');
      li.className = 'devlog-item';

      const span = document.createElement('span');
      span.className = 'devlog-text';
      span.textContent = `${entry.text}  —  (${entry.date})`;
      li.appendChild(span);

      const del = document.createElement('button');
      del.className = 'delete-btn';
      del.textContent = 'Delete';
      del.addEventListener('click', () => {
        const arr = getSaved();
        arr.splice(index, 1);
        localStorage.setItem('devLogs', JSON.stringify(arr));
        render();
      });
      li.appendChild(del);

      logList.appendChild(li);
    });
  }

  render();

  logForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = logEntry.value.trim();
    if (!text) return;

    const now = new Date();
    const dateString = now.toLocaleString(); // shows date + time

    const arr = getSaved();
    arr.unshift({ text: text, date: dateString }); // store object
    localStorage.setItem('devLogs', JSON.stringify(arr));

    logEntry.value = '';
    render();
  });
});
