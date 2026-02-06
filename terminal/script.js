const input = document.getElementById("input");
const output = document.getElementById("output");
const typeSound = document.getElementById("typeSound");

/* ================= MATRIX ================= */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

let matrixSpeed = 33;
let matrixIntensity = 1;
let typingTimeout;

function drawMatrix() {
  ctx.fillStyle = `rgba(0,0,0,${0.08 / matrixIntensity})`;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = `rgba(0,255,156,${matrixIntensity})`;
  ctx.font = fontSize + "px monospace";

  drops.forEach((y,i)=>{
    const text = letters[Math.floor(Math.random()*letters.length)];
    ctx.fillText(text,i*fontSize,y*fontSize);
    drops[i] = y*fontSize > canvas.height && Math.random()>0.97 ? 0 : y+1;
  });
}

function matrixLoop(){
  drawMatrix();
  setTimeout(matrixLoop, matrixSpeed);
}
matrixLoop();

/* ================= TERMINAL ================= */
let history = [];
let historyIndex = 0;

function print(text, speed=14){
  return new Promise(res=>{
    const line = document.createElement("div");
    output.appendChild(line);
    let i=0;
    const t=setInterval(()=>{
      line.textContent+=text[i];
      typeSound.currentTime=0;
      typeSound.play();
      i++;
      output.scrollTop=output.scrollHeight;
      if(i>=text.length){clearInterval(t);res();}
    },speed);
  });
}

/* BOOT */
(async ()=>{
  const boot=[
    "Booting secure terminal...",
    "Loading kernel modules...",
    "Establishing encrypted channel...",
    "Access granted ✔",
    "",
    "Type `help` to begin"
  ];
  for(const b of boot) await print(b);
})();

/* ================= MAP ================= */
const mapContainer=document.getElementById("mapContainer");
const mapCanvas=document.getElementById("map");
const mapCtx=mapCanvas.getContext("2d");
mapCanvas.width=innerWidth;
mapCanvas.height=innerHeight;

const worldPoints=[
  {x:.52,y:.45,name:"Bangladesh 🇧🇩"},
  {x:.50,y:.43,name:"India 🇮🇳"},
  {x:.46,y:.40,name:"Germany 🇩🇪"},
  {x:.35,y:.42,name:"UK 🇬🇧"},
  {x:.28,y:.48,name:"USA 🇺🇸"}
];

function drawMap(){
  mapCtx.clearRect(0,0,mapCanvas.width,mapCanvas.height);
  mapCtx.strokeStyle="rgba(0,255,156,0.1)";
  for(let i=0;i<20;i++){
    mapCtx.beginPath();
    mapCtx.moveTo(0,(mapCanvas.height/20)*i);
    mapCtx.lineTo(mapCanvas.width,(mapCanvas.height/20)*i);
    mapCtx.stroke();
  }
  worldPoints.forEach(p=>{
    mapCtx.beginPath();
    mapCtx.arc(p.x*mapCanvas.width,p.y*mapCanvas.height,4,0,Math.PI*2);
    mapCtx.fillStyle="#00ff9c";
    mapCtx.fill();
  });
}

/* ================= COMMANDS ================= */
const commands={
  help:`help | whoami | skills | projects | hack | trace | map | theme dark | theme light | clear`,
  whoami:"Md Shaiful Islam",
  skills:"HTML CSS JavaScript React GitHub",
  projects:"Portfolio • Terminal UI • Web Apps",

  hack:async()=>{
    const steps=[
      "Scanning ports...",
      "Injecting payload...",
      "Bypassing firewall...",
      "Decrypting data...",
      "ACCESS GRANTED ✔"
    ];
    for(const s of steps){
      matrixSpeed=8;matrixIntensity=3;
      await print("[HACK] "+s,25);
    }
  },

  trace:async()=>{
    const steps=[
      "Target IP: 185.176.43.92",
      "Dhaka → Mumbai → Frankfurt → New York",
      "Latency: 132ms",
      "Trace completed ✔"
    ];
    for(const s of steps) await print("[TRACE] "+s,22);
  },

  map:async()=>{
    mapContainer.style.display="block";
    drawMap();
    await print("Global map launched.");
    await print("Type `exit` to close.");
  },

  exit:()=>{
    mapContainer.style.display="none";
    mapCtx.clearRect(0,0,mapCanvas.width,mapCanvas.height);
  },

  theme:async(arg)=>{
    if(arg==="light"){document.body.classList.add("light");await print("Light mode enabled");}
    else if(arg==="dark"){document.body.classList.remove("light");await print("Dark mode enabled");}
    else await print("theme dark | theme light");
  },

  clear:()=>output.innerHTML=""
};

/* INPUT */
input.addEventListener("keydown",async e=>{
  matrixSpeed=Math.max(10,matrixSpeed-2);
  matrixIntensity=Math.min(2.5,matrixIntensity+0.1);
  clearTimeout(typingTimeout);
  typingTimeout=setTimeout(()=>{matrixSpeed=33;matrixIntensity=1;},1200);

  if(e.key==="Enter"){
    const full=input.value.trim();
    const [cmd,arg]=full.split(" ");
    history.push(full);
    historyIndex=history.length;
    input.value="";
    await print("root@portfolio:~$ "+full);
    if(commands[cmd]){
      const res=typeof commands[cmd]==="function"?commands[cmd](arg):commands[cmd];
      if(res) await print(res);
    }else await print("command not found");
  }

  if(e.key==="ArrowUp"){historyIndex--;input.value=history[historyIndex]||"";}
  if(e.key==="ArrowDown"){historyIndex++;input.value=history[historyIndex]||"";}
});

/* MOBILE SWIPE */
let startY=0;
document.addEventListener("touchstart",e=>startY=e.touches[0].clientY);
document.addEventListener("touchend",e=>{
  const diff=startY-e.changedTouches[0].clientY;
  if(diff>50){historyIndex--;input.value=history[historyIndex]||"";}
  if(diff<-50){historyIndex++;input.value=history[historyIndex]||"";}
});
