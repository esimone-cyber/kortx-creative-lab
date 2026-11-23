(function(){'use strict';const c=window.AD_CONFIG;let feedDate=null,last='';const fmt=(date,opt)=>new Intl.DateTimeFormat('en-US',{timeZone:c.timeZone,...opt}).format(date);
function render(){const now=new Date(),date=feedDate&&feedDate>now?feedDate:DrawSchedule.next(now,c),key=date.toISOString();const today=fmt(now,{year:'numeric',month:'numeric',day:'numeric'})===fmt(date,{year:'numeric',month:'numeric',day:'numeric'});if(key!==last){last=key;const day=fmt(date,{weekday:'long'});document.getElementById('day').textContent=day;document.getElementById('date').textContent=fmt(date,{month:'long',day:'numeric'});document.querySelector('.calendar-body').animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:450});}}
async function refreshFeed(){if(!c.feedUrl)return;try{const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),8000);let response;try{response=await fetch(c.feedUrl,{cache:'no-store',signal:controller.signal});}finally{clearTimeout(timer)}if(!response.ok)throw Error('Feed unavailable');const xml=new DOMParser().parseFromString(await response.text(),'application/xml');if(xml.querySelector('parsererror'))throw Error('Invalid RSS');const values=Array.from(xml.getElementsByTagName('*')).filter(e=>e.localName==='nextDrawDate').map(e=>e.textContent.trim());const dates=values.filter(v=>/T.*(?:Z|[+-]\d\d:\d\d)$/.test(v)).map(v=>new Date(v)).filter(d=>Number.isFinite(+d)&&d>new Date()).sort((a,b)=>a-b);feedDate=dates[0]||null;render();}catch(e){feedDate=null;render();}}
function applyJackpot(data){
 const record=Array.isArray(data)?data.find(x=>x.id==='powerball'):data;
 if(!record||record.id!=='powerball')throw Error('Expected Powerball payload');
 const n=Number(record.jackpot);if(!Number.isFinite(n)||n<=0)throw Error('Invalid jackpot');
 const unit=n>=1e9?'BILLION':n>=1e6?'MILLION':'';
 const value=new Intl.NumberFormat('en-US',{maximumFractionDigits:3}).format(n/(unit==='BILLION'?1e9:unit==='MILLION'?1e6:1));
 document.getElementById('jackpot-value').textContent=value;
 document.getElementById('jackpot-unit').textContent=unit;
 document.querySelector('.amount').setAttribute('aria-label',new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n)+' jackpot');
 document.querySelector('.amount-main').style.fontSize=value.length>5?'52px':value.length>4?'64px':'82px';
}
async function refreshJackpot(){
 if(!c.jackpotFeedUrl)return;
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),8000);
 try{const r=await fetch(c.jackpotFeedUrl,{cache:'no-store',signal:controller.signal});if(!r.ok)throw Error('Jackpot feed unavailable');applyJackpot(await r.json());}
 catch(e){console.warn('Jackpot feed unavailable; retaining last supplied value.');}
 finally{clearTimeout(timer);}
}
applyJackpot(c.jackpotSnapshot);refreshJackpot();
if(c.jackpotFeedUrl)setInterval(refreshJackpot,Math.max(30000,c.jackpotRefreshMs));
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshJackpot();});
document.getElementById('cta').href=window.clickTag||c.clickUrl;render();setInterval(render,1000);document.addEventListener('visibilitychange',()=>{if(!document.hidden){render();refreshFeed();}});refreshFeed();if(c.feedUrl)setInterval(refreshFeed,Math.max(30000,c.feedRefreshMs));})();
