// ----------------- Magic Particle Effect -----------------
const canvas = document.getElementById('magic-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for(let i=0;i<150;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*3 + 1,
    dx: (Math.random()-0.5)*1.5,
    dy: (Math.random()-0.5)*1.5
  });
}

canvas.addEventListener('mousemove', e => {
  particles.forEach(p=>{
    let dx = e.x - p.x;
    let dy = e.y - p.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    if(dist<120){
      p.x -= dx*0.03;
      p.y -= dy*0.03;
    }
  });
});

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='white';
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if(p.x<0||p.x>canvas.width) p.dx*=-1;
    if(p.y<0||p.y>canvas.height) p.dy*=-1;
  });
  requestAnimationFrame(animate);
}
animate();

// ----------------- Click Secret Alert -----------------
document.querySelector('.profile-img').addEventListener('click', function(){
  alert("🎉 Wow! You discovered the hidden secret inside the profile!");
});

// ----------------- Simple Scroll Animation -----------------
const cards = document.querySelectorAll('.project-card');
window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight*0.9;
  cards.forEach(card=>{
    const cardTop = card.getBoundingClientRect().top;
    if(cardTop < triggerBottom){
      card.style.opacity=1;
      card.style.transform='translateY(0)';
    } else {
      card.style.opacity=0;
      card.style.transform='translateY(50px)';
    }
  });
});
