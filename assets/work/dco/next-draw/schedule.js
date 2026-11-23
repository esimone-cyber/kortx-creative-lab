(function(root){
function parts(date,tz){return Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(date).filter(p=>p.type!=='literal').map(p=>[p.type,Number(p.value)]));}
function zoned(y,m,d,h,min,tz){const wall=Date.UTC(y,m-1,d,h,min);let stamp=wall;for(let i=0;i<4;i++){const p=parts(new Date(stamp),tz);stamp+=wall-Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second);}return new Date(stamp);}
function next(now,c){const p=parts(now,c.timeZone);for(let i=0;i<8;i++){const day=new Date(Date.UTC(p.year,p.month-1,p.day+i));if(!c.drawDays.includes(day.getUTCDay()))continue;const candidate=zoned(day.getUTCFullYear(),day.getUTCMonth()+1,day.getUTCDate(),c.hour,c.minute,c.timeZone);if(candidate>now)return candidate;}throw Error('No draw days configured');}
root.DrawSchedule={next,parts};if(typeof module!=='undefined')module.exports=root.DrawSchedule;
})(typeof window!=='undefined'?window:globalThis);
