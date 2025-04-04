function fetchDataFromRemoteServer(url, tableId, callback) {
  fetch(url)
    .then(response => response.text())
    .then(response => {
      const regex = /const hashtagVersion = "([^"]+)"/;
      const matchs = response.match(regex);
      if (matchs && matchs.length >= 2)
        callback(matchs[1]);
    })
    .catch(error => {
      callback(false)
      console.error(error);
    });
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  switch (request.action) {
    case "fetchData":
      const remoteUrl = request.url;
      const tableId = sender.tab.id;
      fetchDataFromRemoteServer(remoteUrl, tableId, elem => {
        sendResponse(elem);
      });
      return true;
    case "download":
      const options = {
        url: request.url
      }
      chrome.downloads.download(options)
      return true;
    case "injectScript":
      const [tabs] = await chrome.tabs.query({ active: true, currentWindow: true });
      const tabId = tabs.id
      const result = await chrome.storage.local.get();
      if (!result.Hashtags) return;

      // 2. Вставляем скрипт в страницу
      await chrome.scripting.executeScript({
        target: { tabId },
        world: "MAIN",
        func: (data) => {
          Hashtags = data.Hashtags;
          AnswersRitm = data.AnswersRitm;
          AnswersINC = data.AnswersINC;
        },
        args: [result]
      });
      return true;
  }

});
