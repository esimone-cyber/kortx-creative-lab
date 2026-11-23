(()=>{'use strict';
const URL='https://apps.apple.com/us/app/sheetz-food-delivery-rewards/id623188302';
window.clickTag=window.clickTag||URL;
const variants={
'before-work':{label:'BEFORE WORK',headline:['RISE. FUEL.','GO.'],intro:'Big flavor. Early start.',support:'3 miles away to the nearest location',products:[['breakfast','Breakfast sandwiches','BREAKFAST',''],['coffee','Coffee','COFFEE',''],['energy','5-hour ENERGY bottles','5-HOUR ENERGY','']]},
'lunchtime':{label:'LUNCHTIME',headline:['FUEL UP.','LUNCH ON.'],intro:'Your lunch break starts here.',support:'3 miles away to the nearest location',products:[['hotdogs','Hot dogs','HOT DOGS',''],['nachos','Nachos','NACHOS',''],['pizza','Pizza slice','PIZZA SLICE','']]},
'after-work':{label:'AFTER WORK',headline:['CLOCK OUT.','SNACK ON.'],intro:'Good picks for your downtime.',support:'3 miles away to the nearest location',products:[['beer','Beer','BEER',''],['doritos','Doritos snacks','SNACKS',''],['icecream','Ice cream cone','ICE CREAM CONE','']]}
};
const params=new URLSearchParams(location.search);const requested=params.get('daypart')||document.body.dataset.variant||'auto';
function currentPart(){let h=new Date().getHours();return h>=5&&h<11?'before-work':h>=11&&h<16?'lunchtime':'after-work'}
let part=variants[requested]?requested:currentPart(),config=variants[part],index=0,elapsed=0,last=0,playing=false,paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
const ad=document.getElementById('ad');ad.className='ad '+part;ad.setAttribute('aria-label','Sheetz '+config.label.toLowerCase()+' advertisement');
const productImg=(p)=>`<img src="assets/${p[0]}.webp" alt="${p[1]}" draggable="false">`;
ad.innerHTML=`<div class="background"></div><div class="texture"></div><img class="logo" src="assets/logo.svg" alt="Sheetz"><div class="daypart-wrap"><div class="daypart">${config.label}</div><span class="spark" aria-hidden="true">✳</span></div><h1>${config.headline.map(x=>`<span>${x}</span>`).join('')}</h1><div class="stage"><div class="intro" aria-hidden="true">${[config.products[1],config.products[2],config.products[0]].map(p=>`<div class="fan ${p[3]?'':'contain'}">${productImg(p)}</div>`).join('')}<div class="intro-caption">${config.intro}</div></div><div class="carousel" role="group" aria-label="Food carousel">${config.products.map((p,i)=>`<div class="card ${p[0]} ${p[3]} ${i===0?'active':''}" aria-hidden="${i!==0}"><div class="food">${productImg(p)}</div><div class="card-label ${p[2].length>12?'long':''}">${p[2]}</div></div>`).join('')}</div></div><div class="dots">${config.products.map((p,i)=>`<button class="dot" aria-label="Show ${p[1]}" aria-pressed="${i===0}"></button>`).join('')}</div><p class="support">${config.support}</p><div class="footer"><a class="cta" href="${window.clickTag}" target="_blank" rel="noopener noreferrer">Download App</a></div>`;
let cards=[...ad.querySelectorAll('.card')],dots=[...ad.querySelectorAll('.dot')];
function begin(){playing=true;elapsed=0;ad.classList.add('playing')}
function show(n){if(!playing)begin();cards.forEach((c,i)=>{c.classList.toggle('leaving',i===index&&i!==n);c.classList.toggle('active',i===n);c.setAttribute('aria-hidden',i!==n)});index=n;dots.forEach((d,i)=>d.setAttribute('aria-pressed',i===n));ad.dataset.product=config.products[n][0];elapsed=0}
dots.forEach((d,i)=>d.addEventListener('click',e=>{e.stopPropagation();show(i)}));
ad.addEventListener('click',e=>{if(e.target.closest('button,a'))return;window.open(window.clickTag,'_blank','noopener,noreferrer')});
let startX=null;ad.querySelector('.stage').addEventListener('pointerdown',e=>startX=e.clientX);ad.querySelector('.stage').addEventListener('pointerup',e=>{if(startX!==null&&Math.abs(e.clientX-startX)>35){show((index+(e.clientX<startX?1:2))%3);const block=e=>{e.preventDefault();e.stopImmediatePropagation()};ad.addEventListener('click',block,{capture:true,once:true})}startX=null});
ad.classList.toggle('paused',paused);ad.dataset.product=config.products[0][0];if(paused)begin();
function tick(t){let delta=last?Math.min(t-last,100):0;last=t;if(!paused&&!document.hidden){elapsed+=delta;if(!playing&&elapsed>=3400)begin();else if(playing&&elapsed>=3000)show((index+1)%3)}requestAnimationFrame(tick)}
Promise.all([...ad.querySelectorAll('img')].map(im=>im.decode().catch(()=>{})).concat(document.fonts.ready)).then(()=>requestAnimationFrame(tick));
if(requested==='auto')setInterval(()=>{if(currentPart()!==part)location.reload()},30000);
})();
