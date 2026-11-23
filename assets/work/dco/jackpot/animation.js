(function(){
'use strict';
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const canvas=document.getElementById('confetti'),ctx=canvas.getContext('2d');ctx.scale(2,2);
let seed=61;function random(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646;}
const colors=['#ffd23f','#f8d75e','#ee3b33','#f4edcf'];
const pieces=Array.from({length:43},()=>({x:random()*330-15,y:random()*700-100,s:3+random()*4,speed:17+random()*28,phase:random()*6.28,spin:.5+random()*1.4,color:colors[Math.floor(random()*colors.length)],alpha:.28+random()*.5}));
let last=0,t=0;
function frame(now){const dt=last?Math.min((now-last)/1000,.04):0;last=now;t+=dt;ctx.clearRect(0,0,300,600);for(const p of pieces){p.y+=p.speed*dt;if(p.y>615){p.y=-15;p.x=random()*330-15;}ctx.save();ctx.translate(p.x+Math.sin(t+p.phase)*12,p.y);ctx.rotate(p.phase+t*p.spin);ctx.scale(1,Math.cos(t*2+p.phase)*.65+.35);ctx.globalAlpha=p.alpha;ctx.fillStyle=p.color;ctx.fillRect(-p.s/2,-p.s/3,p.s,p.s*.48);ctx.restore();}requestAnimationFrame(frame);}requestAnimationFrame(frame);
})();
