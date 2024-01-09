const socket = io("ws://localhost:3500");

const activity = document.querySelector(".activity");
const msgInput = document.querySelector("input");

function sendMessage(e) {
  e.preventDefault();

  if (msgInput.value) {
    socket.emit("message", msgInput.value);
    msgInput.value = "";
  }
  msgInput.focus();
}

document.querySelector("form").addEventListener("submit", sendMessage);

socket.on("message", (data) => {
  activity.textContent = "";
  const li = document.createElement("li");
  li.textContent = data;
  document.querySelector("ul").appendChild(li);
});

msgInput.addEventListener("keypress", () => {
  socket.emit("activity", socket.id.substring(0, 5));
});

let timer;
socket.on("activity", (name) => {
  activity.textContent = `${name} is typing...`;

  clearTimeout(timer);
  timer = setTimeout(() => {
    activity.textContent = "";
  }, 3000);
});

const btn = document.querySelector(".test");
btn.addEventListener("click", () => {
  socket.emit("test", "얍");
});

socket.on("test", (data) => {
  const li = document.createElement("li");
  li.textContent = data;
  document.querySelector("ul").appendChild(li);
});
