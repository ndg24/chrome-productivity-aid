document.addEventListener('DOMContentLoaded', () => {
    const blockYouTubeCheckbox = document.getElementById('blockYouTube');
    const whitelistInput = document.getElementById('whitelistInput');
    const saveWhitelistButton = document.getElementById('saveWhitelist');
  
    chrome.storage.sync.get(['blockYouTube', 'whitelistedSites'], (data) => {
      blockYouTubeCheckbox.checked = data.blockYouTube || false;
      whitelistInput.value = data.whitelistedSites ? data.whitelistedSites.join(', ') : '';
    });
  
    saveWhitelistButton.addEventListener('click', () => {
      const shouldBlockYouTube = blockYouTubeCheckbox.checked;
      const whitelistedSites = whitelistInput.value.split(',').map(url => url.trim());
  
      chrome.storage.sync.set({
        blockYouTube: shouldBlockYouTube,
        whitelistedSites: whitelistedSites,
      }, () => {
        // Display a success message or perform any other desired action
        console.log('Whitelist saved:', whitelistedSites);
      });
    });
  });