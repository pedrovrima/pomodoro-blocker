function traillingZero(number) {
  if (number / 10 < 1) {
    return `0${number}`;
  }

  return number;
}

const makeTime = (value) =>
  `${traillingZero(Math.floor(value / 60000))}:${traillingZero(
    Math.ceil((value % 60000) / 1000)
  )}`;

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
    timer.innerHTML = `${makeTime(duration)}`;
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

// Change intervals
const getIntervals = async () => {
  var times = await browser.runtime.sendMessage({
    call: "getIntervals",
  });
  console.log(times);
  return times;
};

// const setInterval = ()
const workTime = document.getElementById("work-time");
const largeTime = document.getElementById("large-break-time");
const smallTime = document.getElementById("small-break-time");

const setIntervals = async () => {
  intervals = await getIntervals();
  workTime.innerHTML = makeTime(intervals.work);
  largeTime.innerHTML = makeTime(intervals.large_break);
  smallTime.innerHTML = makeTime(intervals.small_break);
};

const minusOneMinute = (id, obj) => {
  const element = document.getElementById(id);
  intervals[obj] = intervals[obj] > 60000 ? intervals[obj] - 60000 : 0;
  element.innerHTML = makeTime(intervals[obj]);
};

const plusOneMinute = (id, obj) => {
  const element = document.getElementById(id);
  intervals[obj] = +intervals[obj] + 60000;
  console.log(intervals[obj]);
  element.innerHTML = makeTime(intervals[obj]);
};

setIntervals();
// Work Time

document
  .getElementById("work-minus")
  .addEventListener("click", () => minusOneMinute("work-time", "work"));
document
  .getElementById("work-plus")
  .addEventListener("click", () => plusOneMinute("work-time", "work"));

// Small break

document
  .getElementById("small-break-minus")
  .addEventListener("click", () =>
    minusOneMinute("small-break-time", "small_break")
  );
document
  .getElementById("small-break-plus")
  .addEventListener("click", () =>
    plusOneMinute("small-break-time", "small_break")
  );

// Large break

document
  .getElementById("large-break-minus")
  .addEventListener("click", () =>
    minusOneMinute("large-break-time", "large_break")
  );
document
  .getElementById("large-break-plus")
  .addEventListener("click", () =>
    plusOneMinute("large-break-time", "large_break")
  );

// Set times

document.getElementById("set-interval").addEventListener("click", () =>
  browser.runtime.sendMessage({
    call: "setIntervals",
    values: intervals,
  })
);
