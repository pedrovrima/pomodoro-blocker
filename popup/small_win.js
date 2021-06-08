function traillingZero(number) {
  if (number / 10 < 1) {
    return `0${number}`;
  }

  return number;
}

function notifyBackgroundPage(e) {
  var sending = browser.runtime.sendMessage({
    call: "button",
  });
}

function timerFunction(message) {
  var button = document.getElementById("btn");
  if (message.running) {
    button.innerHTML = "Stop";
  } else {
    button.innerHTML = "Start";
  }
  let duration = message.duration;
  setTimeout(function () {
    var type = document.getElementById("type");
    type.innerHTML = message.type;
    var timer = document.getElementById("timer");
    timer.innerHTML = `${traillingZero(
      Math.floor(duration / 60000)
    )}:${traillingZero(Math.ceil((duration % 60000) / 1000))}`;
    getTimer();
  }, 300);
}

//   browser.runtime.onMessage.addListener(timerFunction)

function getTimer() {
  var sending = browser.runtime.sendMessage({
    call: "getTime",
  });

  sending.then(timerFunction);
}

getTimer();
document.getElementById("btn").addEventListener("click", notifyBackgroundPage);
