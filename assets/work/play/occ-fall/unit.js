// Annual gallery dates supplied in the creative brief. Michigan calendar days avoid DST rounding errors.
function daysUntilOpening(now,month,day){
 const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Detroit',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(now);
 const get=t=>Number(parts.find(p=>p.type===t).value);
 const year=get('year'),today=Date.UTC(year,get('month')-1,get('day'));
 let target=Date.UTC(year,month-1,day);
 if(target<=today)target=Date.UTC(year+1,month-1,day);
 return Math.round((target-today)/86400000);
}
const config={month:3,day:31};
const counter=document.getElementById('days');
function update(){const n=daysUntilOpening(new Date(),config.month,config.day);counter.textContent=n;document.getElementById('day-word').textContent=n===1?'day':'days';}
update();setInterval(update,30000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)update()});
window.clickTag=window.clickTag||'https://www.oaklandcc.edu/';
/* Whole unit is the clickout, not just the button. */
document.querySelector('.cta').addEventListener('click',function(e){e.stopPropagation();this.target='_blank';this.rel='noopener';this.href=window.clickTag});
document.body.style.cursor='pointer';
document.body.addEventListener('click',function(){window.open(window.clickTag,'_blank','noopener')});
