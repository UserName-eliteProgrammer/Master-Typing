console.log("Included");

const api = "http://api.quotable.io/random";
const quotesDisplay = document.querySelector("#quotesDisplay");
const txtArea = document.querySelector("#textArea");
const timer = document.querySelector("#timer");
let startTime = null;
let intervalID = null;

function createHTML(arrOfChars) {
  let innerHTML = "";
  for (let i = 0; i < arrOfChars.length; i++) {
    innerHTML += `<span>${arrOfChars[i]}</span>`;
  }
  return innerHTML;
}

function resetCSS() {
  txtArea.value = "";
}

function request() {
  resetCSS();

  const xhr = new XMLHttpRequest();
  xhr.open("GET", api, false);

  xhr.onload = function () {
    if (xhr.status == 200) {
      const response = JSON.parse(xhr.responseText);
      let content = response.content.split(""); // array of chars
      quotesDisplay.innerHTML = createHTML(content);
      startTimer();
    }
  };
  xhr.send();
}

function startTimer() {
  const date = new Date();
  startTime = date;
  intervalID = setInterval(() => {
    const newDate = new Date();
    timer.innerHTML = `${Math.floor((newDate - date) / 1000)}`;
  }, 1000);
}

function countWords() {
  let arr = txtArea.value.split(" ");
  return arr.length;
}

txtArea.addEventListener("input", () => {
  const spans = quotesDisplay.querySelectorAll("span");

  const inp = txtArea.value;
  for (let i = 0; i < spans.length; i++) {
    if (spans[i].innerText == inp.charAt(i)) {
      spans[i].classList.add("matched");
      spans[i].classList.remove("notMatched");
    } else {
      if (i < inp.length) {
        spans[i].classList.add("notMatched");
      } else {
        spans[i].classList.remove("notMatched");
        spans[i].classList.remove("bgRed");
      }
      spans[i].classList.remove("matched");
    }
  }

  let counter = 0;
  for (let i = 0; i < spans.length; i++) {
    if (spans[i].classList.contains("matched")) {
      counter++;
    }
  }
  if (counter == spans.length) {
    const newDate = new Date();
    clearInterval(intervalID);
    timer.innerHTML = `You took ${Math.floor(
      (newDate - startTime) / 1000
    )}s to type ${countWords()} words.`;
    timer.style.color = "white";
    timer.style.fontSize = "24px";
    txtArea.style.display = "none";
  }
});

request();
