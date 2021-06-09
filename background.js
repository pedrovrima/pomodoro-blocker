// TIMER

var type = "work";
var number_work = 0;
var timer;
var running = false;
var durations = {
  work: 25 * 60000,
  small_break: 5 * 60000,
  large_break: 15 * 60000,
};
var duration = durations.work;

const setDuration = (type) => {
  return durations[type];
};

const setType = () => {
  if (type === "work") {
    if (number_work < 4) {
      type = "small_break";
    } else {
      type = "large_break";
    }
  } else {
    type = "work";
  }
};

const countWork = () => {
  if (type === "work") {
    number_work++;
  } else {
    if (type === "large_break") {
      number_work = 0;
    }
  }
};

const runTimer = () => {
  duration = duration - 300;
  console.log(duration, type, number_work);
  if (duration < 0) {
    var audio = new Audio("ding.wav");
    audio.play();
    countWork();
    setType();
    window.clearTimeout(timer);
    duration = setDuration(type);
    timer = window.setInterval(runTimer, 300);
  }
};

var now;
// browser.storage.local.set({ date: new Date() });

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
  switch (request.call) {
    case "getTime":
      sendResponse({ type, duration, running });
      break;
    case "button":
      if (running) {
        window.clearTimeout(timer);
      } else {
        timer = window.setInterval(runTimer, 300);
      }
      running = !running;
      break;

    case "getIntervals":
      console.log(durations);
      sendResponse(durations);
      break;

    case "setIntervals":
      durations = request.values;
      break;
  }
}

//   browser.notifications.create({
//     "type": "basic",
//     // "iconUrl": browser.extension.getURL("link.png"),
//     "title": "You clicked a link!",
//     "message": "oi"
//   });

browser.runtime.onMessage.addListener(handleMessage);
