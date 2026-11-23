(() => {
'use strict';
const $=id=>document.getElementById(id), ad=$('ad'), canvas=$('scene'), ctx=canvas.getContext('2d');
const W=300,H=600,DURATION=10,PLAYER_Y=447;ctx.scale(2,2);
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const products=[{name:'Men’s 1996 Retro Nuptse Jacket',image:'assets/men.jpg',desc:'Iconic warmth. Built for cold days.'},{name:'Women’s Nuptse Short Jacket',image:'assets/women.jpg',desc:'A winter icon. A fresh silhouette.'},{name:'Men’s 1996 Retro Nuptse Vest',image:'assets/vest.jpg',desc:'Layer up. Keep exploring.'}];
const collection='https://www.thenorthface.com/en-us/c/shop-all/icons/nuptse-829805';
let state='intro',resultsElapsed=0,score=0,hits=0,elapsed=0,playerX=150,targetX=150,objects=[],particles=[],trails=[],spawnTime=0,spawnIndex=0,invincible=0,clock=0,last=0,countTime=0,productIndex=0,productTime=0,dragging=false,keys={},resumeState='playing',raf=0;

function track(name,detail={}){ad.dispatchEvent(new CustomEvent('richmedia',{bubbles:true,detail:{name,...detail}}));if(typeof window.onRichMediaEvent==='function')window.onRichMediaEvent(name,detail)}
function showScreen(id){['intro','play','results','end'].forEach(s=>{$(s).hidden=s!==id;$(s).classList.toggle('active',s===id)});ad.classList.toggle('playing',id==='play')}
function start(){score=0;hits=0;elapsed=0;$('hitPenalty').textContent='';$('hitPenalty').classList.remove('flash');playerX=targetX=150;objects=[];particles=[];trails=[];spawnTime=0;spawnIndex=0;invincible=0;keys={};dragging=false;countTime=0;state='countdown';$('paused').hidden=true;$('countdown').hidden=false;$('countNum').textContent='3';$('gameHint').style.opacity=1;showScreen('play');updateHUD();ad.focus({preventScroll:true});track('game_start');}
function updateHUD(){$('hits').textContent=hits;$('score').textContent=String(score).padStart(3,'0');$('time').textContent=Math.ceil(Math.max(0,DURATION-elapsed));$('timeFill').style.transform=`scaleX(${Math.max(0,1-elapsed/DURATION)})`;}
function showCollection(skipped=false){state='end';showScreen('end');$('countdown').hidden=true;$('paused').hidden=true;$('finalScore').textContent=score;$('resultLabel').textContent=skipped?'EXPLORE OUR APPAREL':'CLEAN RUN COMPLETE';productIndex=0;productTime=0;renderProduct();if(skipped)track('collection_skip',{score});else track('collection_view',{score});$('shop').focus({preventScroll:true});}
function finish(skipped=false){if(skipped){showCollection(true);return;}state='results';resultsElapsed=0;showScreen('results');$('countdown').hidden=true;$('paused').hidden=true;$('summaryScore').textContent=score;$('summaryHits').textContent=`${hits} obstacle ${hits===1?'hit':'hits'}`;$('resultsFill').style.transform='scaleX(1)';$('live').textContent=`Clean Run complete. Your final score is ${score} points. ${hits} obstacle hits.`;$('results').focus({preventScroll:true});track('game_complete',{score,hits});}
$('continue').onclick=()=>{if(state==='results')showCollection();};
function pause(){if(state!=='playing'&&state!=='countdown')return;resumeState=state;state='paused';keys={};dragging=false;$('paused').hidden=false;$('resume').focus({preventScroll:true});track('game_pause')}
function resume(){if(state!=='paused')return;state=resumeState;$('paused').hidden=true;last=performance.now();ad.focus({preventScroll:true});}
function renderProduct(){const p=products[productIndex],im=$('productImage');im.src=p.image;im.alt=p.name;im.classList.remove('enter');void im.offsetWidth;im.classList.add('enter');$('productName').textContent=p.name;document.querySelectorAll('.dots button').forEach((b,i)=>{b.classList.toggle('selected',i===productIndex);b.setAttribute('aria-pressed',String(i===productIndex))});}
function stepProduct(d,user=true){productIndex=(productIndex+d+products.length)%products.length;productTime=0;renderProduct();if(user)track('product_change',{product:products[productIndex].name})}
ad.addEventListener('click',()=>{if(state==='intro')start()});$('replay').onclick=()=>{track('game_replay');start()};$('apparel').onclick=()=>finish(true);$('pause').onclick=pause;$('resume').onclick=resume;$('prev').onclick=()=>stepProduct(-1);$('next').onclick=()=>stepProduct(1);document.querySelectorAll('.dots button').forEach((b,i)=>b.onclick=()=>stepProduct(i-productIndex));
[$('shop'),$('productLink')].forEach(a=>a.addEventListener('click',e=>{track('clickthrough',{product:products[productIndex].name});if(window.clickTag&&typeof window.clickTag==='string')a.href=window.clickTag;else a.href=collection;}));
function setTarget(e){const b=ad.getBoundingClientRect();targetX=Math.max(30,Math.min(270,(e.clientX-b.left)*W/b.width));}
ad.addEventListener('pointerdown',e=>{if(state!=='playing'||e.target.closest('button,a'))return;dragging=true;ad.setPointerCapture(e.pointerId);setTarget(e);e.preventDefault()});ad.addEventListener('pointermove',e=>{if(state==='playing'&&dragging){setTarget(e);e.preventDefault()}});ad.addEventListener('pointerup',()=>dragging=false);ad.addEventListener('pointercancel',()=>dragging=false);
ad.addEventListener('keydown',e=>{if(state==='intro'&&(e.key==='Enter'||e.key===' ')){e.preventDefault();start();return;}if(['ArrowLeft','ArrowRight','a','d','A','D'].includes(e.key)&&state==='playing'){keys[e.key.toLowerCase()]=true;e.preventDefault()}if(e.key==='Escape'){state==='paused'?resume():pause()}});window.addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);window.addEventListener('blur',()=>{keys={};pause()});document.addEventListener('visibilitychange',()=>{if(document.hidden)pause()});
function poly(points,fill){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath();ctx.fillStyle=fill;ctx.fill()}
function line(points,color,width){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke()}
function ellipse(x,y,rx,ry,color){ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fill()}
function mountainScene(t){let sky=ctx.createLinearGradient(0,0,0,600);sky.addColorStop(0,'#d0e3ec');sky.addColorStop(.6,'#eef4f5');sky.addColorStop(1,'#f8faf9');ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);ellipse(260,171,53,53,'#ffffff50');
poly([[-60,385],[67,218],[152,310],[224,231],[343,393]],'#c5d6df');poly([[67,218],[98,291],[70,272],[52,291],[42,276]],'#f5fafb');poly([[224,231],[256,299],[225,282],[201,290]],'#f9fcfd');
poly([[-42,418],[95,290],[210,418]],'#adc4d0');poly([[95,290],[132,369],[92,351],[69,361],[58,348]],'#e9f2f6');poly([[139,429],[270,306],[360,433]],'#b9cdd6');poly([[270,306],[295,358],[271,351],[250,371],[237,347]],'#edf5f7');
poly([[-20,421],[63,369],[157,401],[256,362],[320,384],[320,600],[-20,600]],'#f6f9f9');poly([[300,388],[231,413],[98,463],[300,442]],'#e1ecf1');
iceCourse(t,true);for(const offset of [-16,16]){const path=[];for(let y=436;y<477;y+=3){const age=(y-436)/70;path.push([151+Math.sin((t-age)*.8)*13+offset,y]);}line(path,'#c2d5df',1.3);}
tree(20,412,.55);tree(274,411,.65);tree(286,438,.38);bobsled(151+Math.sin(t*.8)*13,401,Math.sin(t*.8)*.12,1.18,0);
}
function tree(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ellipse(6,5,15,5,'#8199a526');ctx.fillStyle='#465563';ctx.fillRect(-2,-12,4,18);poly([[-17,-7],[0,-37],[17,-7]],'#294653');poly([[-14,-20],[0,-46],[14,-20]],'#3c5c6b');poly([[-10,-32],[0,-54],[10,-32]],'#557784');poly([[-8,-34],[0,-54],[8,-35],[0,-38]],'#f1f7f9');poly([[-12,-22],[-4,-33],[2,-25],[10,-22]],'#dceaf0');poly([[-14,-9],[-7,-19],[0,-12],[8,-10]],'#e2edf2');ctx.restore()}
function rock(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ellipse(4,4,16,6,'#7a929833');poly([[-16,2],[-11,-12],[2,-18],[14,-9],[18,2]],'#71828b');poly([[-11,-12],[2,-18],[14,-9],[2,-9],[-2,-5]],'#f9fcfc');ctx.restore()}
function marker(x,y,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);ellipse(2,12,11,3,'#7c9aa326');ctx.rotate(Math.PI/4);ctx.fillStyle='#df1c2f';ctx.fillRect(-9,-9,18,18);ctx.rotate(-Math.PI/4);line([[-4,0],[4,0]],'#fff',2);line([[0,-4],[0,4]],'#fff',2);ctx.restore()}
function bobsled(x,y,tilt,s,flash){
ctx.save();ctx.translate(x,y);ctx.rotate(tilt*.65);ctx.scale(s,s);
if(flash>0&&Math.floor(flash*12)%2)ctx.globalAlpha=.45;
ellipse(4,15,24,12,'#5b7e9630');
// Two metal runners, one aerodynamic shell, two helmeted riders.
line([[-18,-18],[-19,23],[-15,32]],'#667e8e',3);
line([[18,-18],[19,23],[15,32]],'#667e8e',3);
line([[-18,-12],[-18,22]],'#f7fcff',1);line([[18,-12],[18,22]],'#f7fcff',1);
ctx.beginPath();ctx.moveTo(0,-41);ctx.bezierCurveTo(17,-41,23,-20,22,2);ctx.lineTo(17,27);ctx.quadraticCurveTo(0,35,-17,27);ctx.lineTo(-22,2);ctx.bezierCurveTo(-23,-20,-17,-41,0,-41);ctx.closePath();
let shell=ctx.createLinearGradient(-22,0,22,0);shell.addColorStop(0,'#9d1022');shell.addColorStop(.28,'#ef3547');shell.addColorStop(.62,'#df1c2f');shell.addColorStop(1,'#a61124');ctx.fillStyle=shell;ctx.fill();
line([[-13,-28],[-18,-12],[-16,16]],'#ff7480',1.5);
line([[17,-12],[15,20]],'#8c1423',1.5);
ellipse(0,-2,12,23,'#152735');ellipse(0,2,9,21,'#2b4150');
for(const yy of [-12,10]){ellipse(0,yy+5,8,7,'#ca2335');ellipse(0,yy,7,8,'#172631');ellipse(-2,yy-3,3,3,'#3b5665');line([[-5,yy-1],[5,yy-1]],'#c9eaf4',2.6);}
line([[-11,26],[11,26]],'#fff',2);
ctx.fillStyle='#fff';ctx.font='bold 8px Arial';ctx.textAlign='center';ctx.fillText('01',0,-28);
ctx.restore();
}
function iceCourse(t,intro=false){
ctx.save();
if(intro){
poly([[137,355],[179,355],[260,451],[213,478],[101,478],[67,457]],'#e3f2f7');
line([[137,355],[118,382],[95,411],[67,457]],'#b5cfdd',8);
line([[179,355],[200,381],[233,417],[260,451]],'#b5cfdd',8);
line([[137,352],[118,379],[95,408],[67,454]],'#fff',3);
line([[179,352],[200,378],[233,414],[260,448]],'#fff',3);
}else{
const ice=ctx.createLinearGradient(0,0,300,0);ice.addColorStop(0,'#c3dce8');ice.addColorStop(.14,'#f4fbfd');ice.addColorStop(.5,'#e7f3f8');ice.addColorStop(.86,'#f4fbfd');ice.addColorStop(1,'#c3dce8');ctx.fillStyle=ice;ctx.fillRect(22,154,256,446);
for(const edge of [20,280]){line([[edge,152],[edge,620]],'#abc9d9',9);line([[edge+(edge<150?4:-4),152],[edge+(edge<150?4:-4),620]],'#fff',3);}
for(let i=0;i<9;i++){const yy=(i*71+t*155)%640;line([[26,yy],[33,yy+18]],'#bfd9e5',1);line([[274,yy+27],[267,yy+45]],'#bfd9e5',1);}
}
ctx.restore();
}
function snow(t){ctx.fillStyle='#ffffffaa';for(let i=0;i<30;i++){let x=(i*73+Math.sin(t*.3+i)*9)%320,y=(i*53+t*(9+i%3*7))%600;ctx.beginPath();ctx.arc(x,y,.65+(i%3)*.4,0,Math.PI*2);ctx.fill()}}
function gameScene(t){ctx.fillStyle='#eaf2f5';ctx.fillRect(0,0,W,H);poly([[0,150],[65,0],[94,0],[33,330],[0,410]],'#dce8ed');poly([[300,30],[271,164],[285,325],[300,342]],'#dbe7ed');ctx.strokeStyle='#d2e0e7';ctx.lineWidth=1;for(let i=0;i<6;i++){let y=(i*130+t*65)%800-150;line([[0,y],[35,y+32],[52,y+86]],'#d6e3e9',1);line([[300,y+70],[271,y+110],[267,y+170]],'#d6e3e9',1)}
for(let i=0;i<7;i++){let y=(i*120+t*130)%840-100;tree(9+(i%2)*9,y,.55+(i%3)*.12);tree(292-(i%2)*10,y+55,.6+(i%3)*.1)}
iceCourse(t);for(const offset of [-16,16]){if(trails.length>1)line(trails.map(p=>[p.x+offset,p.y]),'#b8ced980',1.6);}
for(let o of objects){if(o.type==='marker')marker(o.x,o.y,1+Math.sin(t*5+o.y)*.05);else if(o.type==='tree')tree(o.x,o.y,1);else rock(o.x,o.y,1)}
bobsled(playerX,PLAYER_Y,(targetX-playerX)*.008,1,invincible);
for(let p of particles){ctx.globalAlpha=Math.max(0,p.life/.65);ellipse(p.x,p.y,p.size,p.size,p.color)}ctx.globalAlpha=1;
let g=ctx.createLinearGradient(0,0,0,186);g.addColorStop(0,'#eaf2f5');g.addColorStop(.76,'#eaf2f5');g.addColorStop(1,'#eaf2f500');ctx.fillStyle=g;ctx.fillRect(0,0,W,186);let b=ctx.createLinearGradient(0,546,0,600);b.addColorStop(0,'#eaf2f500');b.addColorStop(1,'#eaf2f5');ctx.fillStyle=b;ctx.fillRect(0,546,W,54);
}
function spawn(){const lanes=[54,102,150,198,246],lane=(spawnIndex*3+Math.floor(Math.random()*3))%5;objects.push({x:lanes[lane],y:172,type:'marker'});if(spawnIndex%2===1){const other=(lane+2+spawnIndex%2)%5;objects.push({x:lanes[other],y:166,type:spawnIndex%4===1?'tree':'rock'})}spawnIndex++}
function feedback(text){$('feedback').textContent=text;$('feedback').classList.remove('show');void $('feedback').offsetWidth;$('feedback').classList.add('show')}
function burst(x,y,color){for(let i=0;i<13;i++){let a=Math.random()*Math.PI*2;particles.push({x,y,vx:Math.cos(a)*60,vy:Math.sin(a)*65,life:.65,size:1+Math.random()*2,color})}}
function update(dt){elapsed+=dt;if(elapsed>=DURATION){elapsed=DURATION;updateHUD();finish();return}if(keys.arrowleft||keys.a)targetX-=250*dt;if(keys.arrowright||keys.d)targetX+=250*dt;targetX=Math.max(30,Math.min(270,targetX));playerX+=(targetX-playerX)*Math.min(1,dt*13);invincible=Math.max(0,invincible-dt);spawnTime-=dt;if(spawnTime<=0){spawn();spawnTime=.7}let speed=145+elapsed*2.4;trails.forEach(p=>p.y+=speed*dt);trails.push({x:playerX,y:PLAYER_Y+30});trails=trails.filter(p=>p.y<620);objects.forEach(o=>{o.y+=speed*dt;let hit=Math.abs(o.y-(PLAYER_Y-8))<24&&Math.abs(o.x-playerX)<(o.type==='marker'?24:22);if(hit&&!o.hit){if(o.type==='marker'){o.hit=true;score+=100;feedback('+100');burst(o.x,o.y,'#df1c2f');track('marker_collected',{score})}else{o.hit=true;score=Math.max(0,score-50);hits++;$('hitPenalty').textContent='−50';$('hitPenalty').classList.remove('flash');void $('hitPenalty').offsetWidth;$('hitPenalty').classList.add('flash');invincible=1.1;feedback('−50');burst(playerX,PLAYER_Y,'#fff');track('obstacle_hit',{score,hits})}}});objects=objects.filter(o=>o.y<640&&!o.hit);particles.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt});particles=particles.filter(p=>p.life>0);$('gameHint').style.opacity=elapsed<3?1:0;updateHUD()}
function frame(now){let dt=Math.min(.05,(now-last)/1000||0);last=now;if(state!=='paused'&&!document.hidden)clock+=dt;if(state==='countdown'){countTime+=dt;$('countNum').textContent=Math.max(1,3-Math.floor(countTime));if(countTime>=3){state='playing';$('countdown').hidden=true;track('run_begin')}}if(state==='playing')update(dt);if(state==='results'&&!document.hidden){resultsElapsed+=dt;$('resultsFill').style.transform=`scaleX(${Math.max(0,1-resultsElapsed/4)})`;if(resultsElapsed>=4)showCollection();}if(state==='end'){productTime+=dt;if(productTime>4.5&&!reduced&&!ad.matches(':hover')&&!document.activeElement?.closest?.('.product-stage,.dots')){stepProduct(1,false)}}ctx.clearRect(0,0,W,H);if(state==='intro')mountainScene(reduced?0:clock);else if(state==='results')mountainScene(reduced?0:clock);else if(state!=='end')gameScene(clock);else{ctx.fillStyle='#f8f9f9';ctx.fillRect(0,0,W,H)}if(!reduced&&state!=='end')snow(clock);raf=requestAnimationFrame(frame)}
track('ad_ready');raf=requestAnimationFrame(frame);
})();
