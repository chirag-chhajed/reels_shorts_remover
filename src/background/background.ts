console.log("hello from background");

chrome.runtime.onMessage.addListener(function (request, _sender, sendResponse) {
  if (request.text === "getActiveTabId") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      sendResponse({ tabId: tabs[0] });
    });
    return true; // Required to make sendResponse asynchronous
  }
});

chrome.runtime.onMessage.addListener(function (request) {
  if (request.text === "navigate") {
    chrome.tabs.update({ url: request.url });
  }
});
