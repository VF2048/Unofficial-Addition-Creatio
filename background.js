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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
  }

});
