const input = document.getElementById("input");
const output = document.getElementById("output");

const cpuBar = document.getElementById("cpuBar");
const ramBar = document.getElementById("ramBar");
const netBar = document.getElementById("netBar");
const cpuText = document.getElementById("cpuText");
const ramText = document.getElementById("ramText");

/* CPU/RAM/NET animation */
setInterval(() => {
  const cpu = Math.floor(Math.random() * 100);
  const ram = Math.floor(Math.random() * 16);
  const net = Math.floor(Math.random() * 100);

  cpuBar.style.width = cpu + "%";
  ramBar.style.width = (ram * 6) + "%";
  netBar.style.width = net + "%";

  cpuText.textContent = cpu + "%";
  ramText.textContent = ram + "GB";
}, 1200);

/* Typing effect */
function typeLine(text, speed = 15) {
  return new Promise(resolve => {
    let i = 0;
    const line = document.createElement("div");
    output.appendChild(line);

    const typing = setInterval(() => {
      line.textContent += text[i];
      i++;
      output.scrollTop = output.scrollHeight;
      if (i >= text.length) {
        clearInterval(typing);
        resolve();
      }
    }, speed);
  });
}

/* Commands */
const commands = {
  help: `Available commands:
- whoami      : Show your name
- projects    : Show GitHub projects
- contact     : Contact info
- ls          : List files/folders
- banner      : Display ASCII name
- neofetch    : Portfolio summary
- logs        : Live system/network logs
- clear       : Clear terminal
- about       : About this portfolio`,

  whoami: "Md Shaiful Islam",
  projects: `My Projects:
- Portfolio Site
- Terminal UI Demo
- JS Games
- Web Apps
- GitHub: https://github.com/romeopias`,
  contact: `Contact Me:
- Email: shaiful.pias@gmail.com
- WhatsApp: +8801850602619
- LinkedIn: https://linkedin.com/in/yourprofile`,
  ls: `Directory listing:
- index.html
- style.css
- script.js
- terminal/
- projects/`,
  banner: `
███╗   ███╗ █████╗ ███████╗██╗███████╗██╗     
████╗ ████║██╔══██╗██╔════╝██║██╔════╝██║     
██╔████╔██║███████║███████╗██║█████╗  ██║     
██║╚██╔╝██║██╔══██║╚════██║██║██╔══╝  ██║     
██║ ╚═╝ ██║██║  ██║███████║██║███████╗███████╗
╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚══════╝╚══════╝
`,
  neofetch: `Name      : Md Shaiful Islam
Role      : Web Developer & Income Tax Lawyer 
Skills    : HTML, CSS, JS, React
GitHub    : https://github.com/romeopias
Portfolio : https://yourusername.github.io/portfolio`,
  logs: `Live logs are running automatically...`,
  about: `Welcome to my interactive portfolio terminal!
This terminal showcases my projects, contact info, and hacker-style UI.`,
  clear: () => output.innerHTML = ""
};

/* Input Handler */
input.addEventListener("keydown", async e => {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    input.value = "";
    await typeLine("> " + cmd);
    if (commands[cmd]) {
      if (typeof commands[cmd] === "function") commands[cmd]();
      else await typeLine(commands[cmd]);
    } else {
      await typeLine("ACCESS DENIED: UNKNOWN COMMAND");
    }
  }
});

/* Real-time system logs */
const systemLogs = [
  "Initializing secure shell...",
  "Loading kernel modules...",
  "Verifying encrypted packets...",
  "Handshake successful with remote node",
  "Firewall status: ACTIVE",
  "Monitoring inbound traffic...",
  "No threats detected",
  "Encrypting outbound stream...",
  "Port scan blocked",
  "System integrity: OK",
  "Network latency: nominal",
  "AI watchdog running",
  "Session alive"
];

function randomLog() {
  const log = systemLogs[Math.floor(Math.random() * systemLogs.length)];
  typeLine(`[SYS] ${log}`, 8);
}
setInterval(randomLog, 6000);

/* Network traffic */
function networkStream() {
  const packet = "NET ▶ " +
    Math.random().toString(36).substring(2, 10).toUpperCase() +
    " :: " + Math.floor(Math.random() * 9999) + "kb";
  typeLine(packet, 5);
}
setInterval(networkStream, 8000);

/* Matrix background */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#00ff00";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const text = letters[Math.floor(Math.random()*letters.length)];
    ctx.fillText(text, i * fontSize, y * fontSize);
    drops[i] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
  });
}
setInterval(drawMatrix, 33);

