(function(){
'use strict';
const config=window.JACKPOT_CONFIG,ad=document.getElementById('ad'),label=document.getElementById('jackpot');
let lastValid=null,busy=false;
function selectRecord(data){
 if(Array.isArray(data))return data.find(x=>x&&x.id==='mega_millions');
 if(!data||typeof data!=='object')return null;
 if(data.id&&data.id!=='mega_millions')return null;
 if(data.jackpotAsString!==undefined||data.jackpot!==undefined)return data;
 return selectRecord(data.data||data.items||data.results);
}
function normalize(data){
 const row=selectRecord(data);if(!row)return null;
 const raw=String(row.jackpotAsString||'').trim();
 const match=raw.match(/^\$\s*([\d,]+(?:\.\d+)?)\s*(million|billion)?$/i);
 let value=match?Number(match[1].replace(/,/g,''))*(match[2]?(/billion/i.test(match[2])?1e9:1e6):1):Number(row.jackpot);
 if(!Number.isFinite(value)||value<=0||value>1e12)return null;
 const text=match?raw:('$'+new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(value>=1e9?value/1e9:value>=1e6?value/1e6:value)+(value>=1e9?' Billion':value>=1e6?' Million':''));
 return {text:text.toUpperCase(),row:row};
}
function apply(data,source){
 const parsed=normalize(data);if(!parsed)return false;
 lastValid=parsed.row;
 if(label.textContent!==parsed.text){label.textContent=parsed.text;label.classList.remove('refresh');void label.offsetWidth;label.classList.add('refresh');}
 label.style.fontSize='24px';for(let n=24;label.scrollWidth>260&&n>14;n--)label.style.fontSize=(n-1)+'px';
 ad.dataset.feedStatus=source;ad.dataset.updatedAt=parsed.row.updatedAt||'';
 window.dispatchEvent(new CustomEvent('jackpot:updated',{detail:{record:parsed.row,status:source}}));return true;
}
function parseFeed(text){
 try{return JSON.parse(text);}catch(e){}
 const xml=new DOMParser().parseFromString(text,'application/xml');
 if(xml.querySelector('parsererror'))throw Error('Invalid JSON or RSS XML');
 const entries=Array.from(xml.querySelectorAll('item,entry'));
 const item=entries.find(e=>/mega[\s_-]*millions/i.test(e.textContent));
 if(!item)throw Error('Mega Millions item missing');
 const field=name=>Array.from(item.getElementsByTagName('*')).find(e=>e.localName===name)?.textContent.trim();
 const direct=field('jackpotAsString');const numeric=field('jackpot');
 const title=field('title')||'',description=field('description')||field('summary')||'';
 const decoded=new DOMParser().parseFromString(description,'text/html').body.textContent;
 const combined=title+' '+decoded;
 const amount=combined.match(/(?:jackpot\s*(?:is|of|:|at|–|-)?\s*)(\$\s*[\d,.]+\s*(?:million|billion)?)/i)||combined.match(/(\$\s*[\d,.]+\s*(?:million|billion))\s*(?:estimated\s*)?jackpot/i);
 if(!direct&&!numeric&&!amount)throw Error('Jackpot field missing');
 return {id:'mega_millions',jackpotAsString:direct||(amount&&amount[1]),jackpot:numeric,updatedAt:field('pubDate')||field('updated')||''};
}
async function refresh(){
 if(busy||!config.feedUrl||document.hidden)return false;
 busy=true;const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),config.timeoutMs||8000);
 try{
  const response=await fetch(config.feedUrl,{cache:'no-store',credentials:'omit',signal:controller.signal,headers:{Accept:'application/json, application/rss+xml, application/xml, text/xml'}});
  if(!response.ok)throw Error('Feed HTTP '+response.status);
  const data=parseFeed(await response.text());if(!apply(data,'connected'))throw Error('Invalid jackpot');
  ad.dataset.fetchedAt=new Date().toISOString();return true;
 }catch(error){ad.dataset.feedStatus=lastValid?'retained':'unavailable';console.warn('Jackpot feed: retaining last valid value.',error.message);return false;}
 finally{clearTimeout(timer);busy=false;}
}
window.MegaMillionsFeed={update(data){return apply(data,'host');},refresh,getSnapshot(){return lastValid?{...lastValid}:null;},parse:parseFeed};
apply(config.fallback,'sample');
const link=document.getElementById('clickout');link.href=config.clickUrl;
link.addEventListener('click',function(event){const destination=window.clickTag||config.clickUrl;if(window.mraid&&typeof window.mraid.open==='function'){event.preventDefault();window.mraid.open(destination);}else link.href=destination;});
if(config.feedUrl){refresh();setInterval(refresh,Math.max(15000,Number(config.refreshMs)||60000));document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});}
if(document.fonts)document.fonts.ready.then(()=>apply(lastValid,ad.dataset.feedStatus));
})();
