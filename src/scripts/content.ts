console.log("hello from content");

// Your code to manipulate the DOM goes here
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function () {
    // console.log("DOM changed!");
    // Your code here
    const reelsRemover =
      document.querySelector<HTMLAnchorElement>('a[href="/reels/"]');

    if (reelsRemover) {
      reelsRemover.parentNode?.removeChild(reelsRemover);
    }

    const threadsIconRemover = document.querySelector<HTMLAnchorElement>(
      'a[href="https://www.threads.net/"]'
    );

    // console.log(threadsIconRemover, "button threads");
    if (threadsIconRemover) {
      threadsIconRemover.parentNode?.removeChild(threadsIconRemover);
    }

    const youTubeShorts =
      document.querySelector<HTMLAnchorElement>('a[title="Shorts"]');

    if (youTubeShorts) {
      youTubeShorts.parentNode?.removeChild(youTubeShorts);
    }

    // content.js
    chrome.runtime.sendMessage({ text: "getActiveTabId" }, function (response) {
      const tabUrl: string = response?.tabId?.url;

      // console.log("Active tab URL is", tabUrl);

      // Define regex patterns for the URLs
      const validPatterns = [
        /^https:\/\/(www\.)?instagram\.com\/reels\//,
        /^https:\/\/(www\.)?youtube\.com\/shorts\//,
        /^https:\/\/(www\.)?instagram\.com\/reel\//,
        /^https:\/\/(www\.)?instagram\.com\/p\//,
      ];

      // Check if the tab URL matches any of the patterns
      const isMatch = validPatterns.some((pattern) => pattern.test(tabUrl));

      if (isMatch) {
        chrome.runtime.sendMessage({
          text: "navigate",
          url: "https://www.google.com",
        });
      }
    });
  });
});
observer.observe(document.body, { childList: true, subtree: true });
