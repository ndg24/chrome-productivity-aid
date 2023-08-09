chrome.commands.onCommand.addListener((command) => {
    if (command === 'toggle-study-mode') {
      toggleStudyMode();
    }
  });
  
  function toggleStudyMode() {
    chrome.storage.sync.get(['studyMode', 'whitelistedSites'], (data) => {
      const studyModeEnabled = !data.studyMode;
      const whitelistedSites = data.whitelistedSites || [];
  
      chrome.storage.sync.set({ studyMode: studyModeEnabled }, () => {
        if (studyModeEnabled) {
          showNotification('Study Mode Enabled', 'You are now in study mode.');
        } else {
          showNotification('Study Mode Disabled', 'You have exited study mode.');
        }
  
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const activeTab = tabs[0];
          if (activeTab) {
            if (!studyModeEnabled || whitelistedSites.includes(activeTab.url)) {
              chrome.tabs.reload(activeTab.id);
            }
          }
        });
      });
    });
  }
  
  function showNotification(title, message) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'images/icon48.png',
      title: title,
      message: message,
    });
  }