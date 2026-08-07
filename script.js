const terminal=document.getElementById("terminal");
const loading=document.getElementById("loading");
const main=document.getElementById("main");

const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));

async function type(text,speed=65){
  terminal.textContent="";
  for(const ch of text){
    terminal.textContent+=ch;
    await sleep(speed);
  }
}

async function connecting(){
  terminal.textContent="connecting";
  for(let i=0;i<3;i++){
    await sleep(500);
    terminal.textContent+=".";
  }
}

async function erase(){
  while(terminal.textContent.length){
    terminal.textContent=terminal.textContent.slice(0,-1);
    await sleep(35);
  }
}

function updateClock(){
  const start=new Date("2026-08-05T00:00:00+07:00");
  const now=new Date();

  let diff=now-start;
  if(diff<0) diff=0;

  const totalSeconds=Math.floor(diff/1000);

  const days=Math.floor(totalSeconds/86400);
  const hours=String(Math.floor((totalSeconds%86400)/3600)).padStart(2,"0");
  const minutes=String(Math.floor((totalSeconds%3600)/60)).padStart(2,"0");
  const seconds=String(totalSeconds%60).padStart(2,"0");

  document.getElementById("days").textContent=days;
  document.getElementById("clock").textContent=`${hours}:${minutes}:${seconds}`;
}

async function start(){
  await connecting();
  await sleep(500);
  await erase();
  await type("we found the cutest pair !");
  await sleep(1200);

  loading.style.opacity="0";
  await sleep(800);

  loading.classList.add("hidden");
  main.classList.remove("hidden");

  updateClock();
  setInterval(updateClock,1000);
}

start();
