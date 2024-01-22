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

      //   console.log("Active tab URL is", tabUrl);

      // Check if the tab URL starts with "https://www.instagram.com/reels/"
      if (
        tabUrl &&
        (tabUrl.startsWith("https://www.instagram.com/reels/") ||
          tabUrl.startsWith("https://www.youtube.com/shorts/") ||
          tabUrl.startsWith("https://www.instagram.com/reel/") ||
          tabUrl.startsWith("https://instagram.com/p/"))
      ) {
        chrome.runtime.sendMessage({
          text: "navigate",
          url: "https://www.google.com",
        });
      }
    });
  });
});
observer.observe(document.body, { childList: true, subtree: true });
