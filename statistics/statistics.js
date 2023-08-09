document.addEventListener('DOMContentLoaded', () => {
    const sessionCount = document.getElementById('sessionCount');
    const totalStudyTime = document.getElementById('totalStudyTime');
  
    chrome.storage.sync.get(['sessions', 'totalTime'], (data) => {
      const sessions = data.sessions || 0;
      const totalTime = data.totalTime || 0;
  
      sessionCount.textContent = sessions;
      totalStudyTime.textContent = totalTime;
    });
  });