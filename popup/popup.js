document.addEventListener('DOMContentLoaded', () => {
    const studyModeToggle = document.getElementById('studyMode');
    const optionsLink = document.getElementById('optionsLink');
  
    studyModeToggle.addEventListener('change', () => {
      const studyModeEnabled = studyModeToggle.checked;
      chrome.storage.sync.set({ studyMode: studyModeEnabled }, () => {
        if (studyModeEnabled) {
          chrome.tabs.reload();
          showNotification('Study Mode Enabled', 'You are now in study mode.');
          incrementSession();
        } else {
          showNotification('Study Mode Disabled', 'You have exited study mode.');
        }
      });
    });
  
    optionsLink.addEventListener('click', () => {
      chrome.runtime.openOptionsPage();
    });
  
    chrome.storage.sync.get('studyMode', (data) => {
      studyModeToggle.checked = data.studyMode || false;
    });
  });
  
  function showNotification(title, message) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'images/icon48.png',
      title: title,
      message: message,
    });
  }
  
  function incrementSession() {
    chrome.storage.sync.get('sessions', (data) => {
      const sessions = data.sessions || 0;
      chrome.storage.sync.set({ sessions: sessions + 1 });
    });
  }