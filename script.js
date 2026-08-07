const bootScreen = document.getElementById("boot-screen");
const mainScreen = document.getElementById("main-screen");
const statusText = document.getElementById("status-text");
const valueLine = document.getElementById("value-line");
const cursor = document.getElementById("cursor");

const progressWrap = document.getElementById("progress-wrap");
const progressBar = document.getElementById("progress-bar");
const progressLabel = document.getElementById("progress-label");

const daysEl = document.getElementById("days");
const clockEl = document.getElementById("clock");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function setValue(text = "", className = "") {
  valueLine.className = "value-line";
  if (className) valueLine.classList.add(className);
  valueLine.textContent = text;
}

async function eraseStatus(speed = 18) {
  while (statusText.textContent.length > 0) {
    statusText.textContent = statusText.textContent.slice(0, -1);
    await sleep(speed);
  }
}

async function typeStatus(text, speed = 28) {
  statusText.textContent = "";

  for (const char of text) {
    statusText.textContent += char;

    const naturalPause =
      char === "," ? 55 :
      char === "." ? 65 :
      char === "…" ? 80 :
      0;

    await sleep(speed + naturalPause);
  }
}

async function replaceStatus(text, {
  eraseSpeed = 13,
  typeSpeed = 26,
  pauseBefore = 120,
  pauseAfter = 520
} = {}) {
  await sleep(pauseBefore);
  await eraseStatus(eraseSpeed);
  await typeStatus(text, typeSpeed);
  await sleep(pauseAfter);
}

async function countRemaining() {
  const values = [
    "8.147.922.380",
    "5.804.210.441",
    "2.482.193",
    "151",
    "12",
    "3",
    "2",
    "1"
  ];

  for (let i = 0; i < values.length; i++) {
    setValue(`còn lại: ${values[i]}`, "is-soft");

    if (i < 4) {
      await sleep(150);
    } else if (i < 6) {
      await sleep(340);
    } else {
      await sleep(650);
    }
  }
}

async function runProgress() {
  progressWrap.classList.remove("hidden");
  progressBar.style.width = "0%";
  progressLabel.textContent = "0%";

  const stops = [6, 15, 27, 42, 59, 73, 86, 94, 99, 100];

  for (const value of stops) {
    progressBar.style.width = `${value}%`;
    progressLabel.textContent = `${value}%`;
    await sleep(value < 90 ? 120 : 240);
  }

  await sleep(350);
  progressWrap.classList.add("hidden");
}

async function loveMeter() {
  const values = [
    { text: "38%", delay: 130 },
    { text: "127%", delay: 120 },
    { text: "541%", delay: 115 },
    { text: "2137%", delay: 105 },
    { text: "9999%", delay: 130 },
    { text: "∞", delay: 500 }
  ];

  for (const item of values) {
    setValue(item.text);
    await sleep(item.delay);
  }

  setValue("LỖI", "is-error");
  await sleep(720);

  setValue("đang thử lại...", "is-soft");
  await sleep(500);

  setValue("LỖI", "is-error");
  await sleep(620);

  setValue("Yêu quá. Không đo được.", "is-soft");
  await sleep(1150);
}

function updateCounter() {
  const start = new Date("2026-08-05T00:00:00+07:00");
  const now = new Date();

  let diff = now - start;
  if (diff < 0) diff = 0;

  let totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;

  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  totalSeconds %= 3600;

  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  daysEl.textContent = String(days).padStart(3, "0");
  clockEl.textContent = `${hours}:${minutes}:${seconds}`;
}

async function powerOffAndEnterMain() {
  cursor.style.opacity = "0";
  setValue("");

  await sleep(480);

  bootScreen.classList.add("powering-off");
  await sleep(620);

  bootScreen.classList.add("hidden");
  mainScreen.classList.remove("hidden");
  mainScreen.classList.add("is-entering");

  updateCounter();
  setInterval(updateCounter, 1000);
}

async function bootSequence() {
  await sleep(950);

  await typeStatus("Đang khởi động hệ thống...", 34);
  await sleep(650);

  await replaceStatus("Đang quét 8.147.922.381 con người...", {
    typeSpeed: 22,
    pauseAfter: 800
  });

  await replaceStatus("Đang loại bỏ các phương án không phù hợp...", {
    typeSpeed: 22,
    pauseAfter: 220
  });

  await countRemaining();
  await sleep(850);

  setValue("");

  await replaceStatus("Đang kiểm tra kết quả...", {
    typeSpeed: 28,
    pauseAfter: 500
  });

  setValue("1 người phù hợp.", "is-soft");
  await sleep(1000);

  setValue("");

  await replaceStatus("Đang đồng bộ trái tim...", {
    typeSpeed: 28,
    pauseAfter: 220
  });

  await runProgress();

  setValue("Đồng bộ thành công.", "is-soft");
  await sleep(900);

  setValue("");

  await replaceStatus("Đang đo mức độ yêu...", {
    typeSpeed: 30,
    pauseAfter: 200
  });

  await loveMeter();

  setValue("");

  await replaceStatus("Đang xác nhận lần cuối...", {
    typeSpeed: 30,
    pauseAfter: 650
  });

  setValue("...");
  await sleep(1000);

  setValue("");

  await replaceStatus("Ôi. Cuối cùng cũng tìm đúng người rồi.", {
    eraseSpeed: 16,
    typeSpeed: 55,
    pauseBefore: 0,
    pauseAfter: 1450
  });

  await powerOffAndEnterMain();
}

bootSequence();
