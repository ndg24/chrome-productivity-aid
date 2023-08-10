document.addEventListener('DOMContentLoaded', () => {
  const blockYouTubeCheckbox = document.getElementById('blockYouTube');
  const whitelistInput = document.getElementById('whitelistInput');
  const saveWhitelistButton = document.getElementById('saveWhitelist');
  const whitelistDisplay = document.getElementById('whitelistDisplay');
  const successMessage = document.getElementById('successMessage');

  chrome.storage.sync.get(['blockYouTube', 'whitelistedSites'], (data) => {
    blockYouTubeCheckbox.checked = data.blockYouTube || false;
    whitelistInput.value = data.whitelistedSites ? data.whitelistedSites.join(', ') : '';
  });

  saveWhitelistButton.addEventListener('click', () => {
    console.log('Save Whitelist button clicked');
    const shouldBlockYouTube = blockYouTubeCheckbox.checked;
    const whitelistedSites = whitelistInput.value.split(',').map(url => url.trim());

    chrome.storage.sync.set({
      blockYouTube: shouldBlockYouTube,
      whitelistedSites: whitelistedSites,
    }, () => {
      // Display a success message and show the whitelisted URLs
      successMessage.textContent = 'Whitelist saved!';
      whitelistDisplay.textContent = `Whitelisted URLs: ${whitelistedSites.join(', ')}`;
      setTimeout(() => {
        successMessage.textContent = ''; // Clear the success message after a few seconds
      }, 3000);
    });
    console.log('Whitelisted Sites:', whitelistedSites);
  });
});
