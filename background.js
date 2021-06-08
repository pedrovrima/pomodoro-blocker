// TIMER

var duration = 3000;
var type = "work";
var number_work = 0;
var timer;
var running = false;
var durations = { work: 3000, interval: 1000, break: 3000 };

const setDuration = (type) => {
  return durations[type];
};

const setType = () => {
  if (type === "work") {
    if (number_work < 4) {
      type = "interval";
    } else {
      type = "break";
    }
  } else {
    type = "work";
  }
};

const countWork = () => {
  if (type === "work") {
    number_work++;
  } else {
    if (type === "break") {
      number_work = 0;
    }
  }
};

const runTimer = () => {
  duration = duration - 300;
  console.log(duration, type, number_work);
  if (duration < 0) {
    countWork();
    setType();
    window.clearTimeout(timer);
    duration = setDuration(type);
    timer = window.setInterval(runTimer, 300);
  }
};

var now;
browser.storage.local.set({ date: new Date() });

// function sendTime() {
//  now = new Date()
// }

// browser.runtime.onMessage.addListener(notify);

// function notify(message) {
//   browser.notifications.create({
//     "type": "basic",
//     "iconUrl": browser.extension.getURL("link.png"),
//     "title": "You clicked a link!",
//     "message": message.url
//   });
// }

var toBlock = [];

function handleMessage(request, sender, sendResponse) {
  if (sender.envType === "content_child") {
    sendResponse(toBlock);
  } else {
    if (request.call === "getTime") {
      sendResponse({ type, duration, running });
    }
    if (request.call === "button") {
      if (running) {
        window.clearTimeout(timer);
      } else {
        timer = window.setInterval(runTimer, 300);
      }
      running = !running;
    }
  }
}

//   browser.notifications.create({
//     "type": "basic",
//     // "iconUrl": browser.extension.getURL("link.png"),
//     "title": "You clicked a link!",
//     "message": "oi"
//   });

browser.runtime.onMessage.addListener(handleMessage);
