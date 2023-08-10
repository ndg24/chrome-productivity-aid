chrome.storage.sync.get(['studyMode'], (data) => {
  studyModeActive = data.studyMode || false;

  if (studyModeActive) {
    observeAndBlock();
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if ('studyMode' in changes) {
    studyModeActive = changes.studyMode.newValue;
    if (studyModeActive) {
      observeAndBlock();
    }
  }
});

function observeAndBlock() {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        blockYouTubeContent();
      }
    }
  });

  const config = { childList: true, subtree: true };
  observer.observe(document.body, config);

  blockYouTubeContent();
}

function blockYouTubeContent() {
  if (studyModeActive && window.location.host.includes('youtube.com')) {
    const videoElements = document.querySelectorAll('video');
    videoElements.forEach((video) => {
      video.pause();
    });
  }
}
