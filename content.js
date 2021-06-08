// //BLOCK WORDS
// findString = function findText(text) {
//   if (window.find(text)) {
//     document.documentElement.innerHTML = "";
//     document.documentElement.innerHTML = "This site is blocked2";
//     document.documentElement.scrollTop = 0;
//   }
// };

// window.addEventListener("click", notifyExtension);

// function notifyExtension(e) {
//   if (e.target.tagName != "A") {
//     return;
//   }
//   browser.runtime.sendMessage({ url: e.target.href });
// }

// findString("WordToBlock");

// //BLOCK THE PARTIAL DOMAINS
// findURL = function changeURL(text) {
//   var current = window.location.href;
//   if (current === text) {
//     window.location.replace("https://www.google.co.in");
//   }
// };

// //BLOCK THE ENTIRE DOMAIN WITH THE FOLLOWING FUNCTION
findAllURL = function changeAllURL(text) {
  var current = window.location.href;
  if (current.startsWith(text)) {
    document.documentElement.innerHTML = "";
    document.documentElement.innerHTML = "Domain is blocked2";
    document.documentElement.scrollTop = 0;
  }
};

// var toBlock = ["https://www.facebook.com/"];

// browser.runtime.onMessage.addListener(notify);

// function notify(message) {
//   toBlock.push("https://www.youtube.com/");
// }

// //   function notify(message) {
// //       toBlock.push()
// //   }

// findURL("https://pt.quora.com/");

function handleResponse(message) {
  message.map((blck) => findAllURL(blck));
  console.log(message);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function notifyBackgroundPage(e) {
  var sending = browser.runtime.sendMessage({
    greeting: "Greeting from the content script",
  });
  sending.then(handleResponse, handleError);
}


browser.runtime.sendMessage()

notifyBackgroundPage();
