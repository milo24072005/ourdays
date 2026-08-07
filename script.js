const terminal=document.getElementById("terminal");
const boot=document.getElementById("boot");
const main=document.getElementById("main");
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));

async function line(text,delay=500){
 terminal.textContent+=text+"\n";
 await sleep(delay);
}

async function typeLine(text,speed=18){
 for(const c of text){
  terminal.textContent+=c;
  await sleep(speed);
 }
 terminal.textContent+="\n";
 await sleep(350);
}

function updateClock(){
 const start=new Date("2026-08-05T00:00:00+07:00");
 let diff=Math.max(0,new Date()-start);
 let s=Math.floor(diff/1000);
 let d=Math.floor(s/86400); s%=86400;
 let h=String(Math.floor(s/3600)).padStart(2,"0"); s%=3600;
 let m=String(Math.floor(s/60)).padStart(2,"0");
 let sec=String(s%60).padStart(2,"0");
 days.textContent=String(d).padStart(3,"0");
 clock.textContent=`${h}:${m}:${sec}`;
}

async function loveMeter(){
 const nums=["213%","541%","9999%","∞","LỖI"];
 for(const n of nums){
  terminal.textContent+=`> Mức độ yêu: ${n}\n`;
  await sleep(220);
 }
 terminal.textContent+="> Yêu quá, không đo được.\n";
 await sleep(900);
}

async function bootSeq(){
 await line("╭──────────────────────────────╮");
 await line(" HỆ THỐNG GHÉP ĐÔI VŨ TRỤ v5.08 ");
 await line("╰──────────────────────────────╯\n",300);

 await typeLine("> Khởi động hệ thống...");
 await typeLine("✓ Hoàn tất");

 await typeLine("> Đang quét 8.147.922.381 con người...");
 await typeLine("> Loại bỏ các phương án không phù hợp...");
 const arr=["8.147.922.380","2.482.193","151","12","3","2","1"];
 for(const a of arr){
   terminal.textContent+=`  còn lại: ${a}\n`;
   await sleep(180);
 }
 await typeLine("> Đang đồng bộ trái tim...");
 await typeLine("✓ Đồng bộ thành công");

 await loveMeter();

 await typeLine("> Đang xác nhận kết quả...");
 await sleep(700);
 await typeLine("> ...");
 await typeLine("> Cuối cùng cũng tìm đúng người rồi.");
 await sleep(1200);

 boot.style.opacity="0";
 await sleep(800);
 boot.classList.add("hidden");
 main.classList.remove("hidden");
 updateClock();
 setInterval(updateClock,1000);
}
bootSeq();