let studyModeActive = false;
let whitelistedSites = [];

chrome.storage.sync.get(['studyMode', 'whitelistedSites'], (data) => {
  studyModeActive = data.studyMode || false;
  whitelistedSites = data.whitelistedSites || [];

  if (studyModeActive && window.location.host.includes('youtube.com') && !isWhitelistedSite()) {
    observeAndBlock();
  }
});

function isWhitelistedSite() {
  const currentSite = window.location.host;
  return whitelistedSites.includes(currentSite);
}

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
  const videoElements = document.querySelectorAll('video');
  videoElements.forEach((video) => {
    video.pause();
  });
}