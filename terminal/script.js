const screen = document.getElementById("screen");
const input = document.getElementById("input");

const bootLines = [
  "Initializing system...",
  "Bypassing firewall...",
  "Decrypting data stream...",
  "Access granted.",
  "Welcome, SI PIAS",
  "Type 'help' to begin."
];

const commands = {
  help: [
    "Commands:",
    "about   - user info",
    "projects- show projects",
    "clear   - clear terminal"
  ],
  about: [
    "Name: SI PIAS",
    "Role: Web Developer",
    "Status: ONLINE"
  ],
  projects: [
    "• Terminal UI",
    "• Portfolio Website",
    "• Hacker Animations"
  ]
};

// Typing effect
function typeLine(text, speed = 40) {
  return new Promise(resolve => {
    let i = 0;
    const p = document.createElement("p");
    screen.appendChild(p);

    const interval = setInterval(() => {
      p.textContent += text[i];
      i++;
      screen.scrollTop = screen.scrollHeight;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

// Boot sequence
async function boot() {
  for (let line of bootLines) {
    await typeLine(line);
  }
}

boot();

input.addEventListener("keydown", async e => {
  if (e.key === "Enter") {
    const value = input.value.trim();
    screen.innerHTML += `<p>> ${value}</p>`;
    input.value = "";

    if (value === "clear") {
      screen.innerHTML = "";
      return;
    }

    if (commands[value]) {
      for (let line of commands[value]) {
        await typeLine(line, 25);
      }
    } else {
      await typeLine("Command not found.");
    }
  }
});
