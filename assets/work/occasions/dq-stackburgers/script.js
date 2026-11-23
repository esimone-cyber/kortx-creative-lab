'use strict';
const $=s=>document.querySelector(s);
const locations=[
['Dairy Queen','Walton Village Plaza, 3053 Walton Blvd., Auburn Hills, MI 48326','0.6 mi',151,207],
['Dairy Queen (Treat)','4268 Baldwin Rd, Great Lakes Crossing Dr Ste 550, Auburn Hills, MI 48326','3.4 mi',126,195],
['Dairy Queen Store','1525 Baldwin Ave, Pontiac, MI 48340','3.5 mi',126,208],
['Dairy Queen (Treat)','1083 S Lapeer Rd, Lake Orion, MI 48360','5.5 mi',147,151],
['Dairy Queen Waterford (Treats & Cakes)','4683 Dixie Hwy, Waterford Township, MI 48329','7.5 mi',98,202],
['Dairy Queen (Treat)','6017 Rochester Rd, Troy, MI 48085','7.6 mi',187,230],
['Dairy Queen (Treat)','54804 Shelby Rd, Shelby Township, MI 48316','8.5 mi',211,191],
['Dairy Queen Store','5608 Highland Rd, Waterford Township, MI 48327','8.5 mi',89,216]
];
function track(name,detail={}){window.dispatchEvent(new CustomEvent('ad-interaction',{detail:{name,...detail}}));}
function openMap(){ $('#ad').classList.add('map-open');$('#locator').inert=false;$('#front').inert=true;$('#toggle').focus();track('map-open'); }
function closeMap(){ $('#ad').classList.remove('map-open');$('#locator').inert=true;$('#front').inert=false;$('#find').focus();track('map-close'); }
$('#find').addEventListener('click',openMap);$('#back').addEventListener('click',closeMap);
function showList(on){$('#list').hidden=!on;$('#detail').hidden=true;track(on?'list-open':'map-view');}
$('#toggle').onclick=()=>showList(true);$('#map-return').onclick=()=>showList(false);
function detail(i){const l=locations[i];$('#detail h2').textContent=l[0];$('#detail p').textContent=l[1];$('#detail a').href='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(l[0]+', '+l[1]);$('#detail').hidden=false;track('location-selected',{location:l[1]});}
locations.forEach((l,i)=>{const pin=document.createElement('button');pin.className='pin';pin.style.left=l[3]+'px';pin.style.top=l[4]+'px';pin.setAttribute('aria-label',l[0]+', '+l[1]);pin.title=l[0];pin.onclick=()=>detail(i);$('#pins').append(pin);const row=document.createElement('button');const name=document.createElement('strong');name.textContent=l[0];const address=document.createElement('span');address.textContent=l[1];const distance=document.createElement('small');distance.textContent=l[2];row.append(name,address,distance);row.onclick=()=>{showList(false);detail(i)};$('#rows').append(row);});
$('#detail-close').onclick=()=>$('#detail').hidden=true;
let scale=1,x=0,y=0,drag=null;
function render(){x=Math.max(-150*(scale-1),Math.min(150*(scale-1),x));y=Math.max(-205*(scale-1),Math.min(205*(scale-1),y));$('#map-world').style.transform=`translate(${x}px,${y}px) scale(${scale})`;$('#plus').disabled=scale>=2.5;$('#minus').disabled=scale<=1;}
$('#plus').onclick=()=>{scale=Math.min(2.5,scale+.3);render()};$('#minus').onclick=()=>{scale=Math.max(1,scale-.3);render()};$('#reset').onclick=()=>{scale=1;x=y=0;render();$('#detail').hidden=true};
$('#map-world').addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;drag={px:e.clientX,py:e.clientY,x,y};e.currentTarget.setPointerCapture(e.pointerId)});
$('#map-world').addEventListener('pointermove',e=>{if(!drag)return;x=drag.x+e.clientX-drag.px;y=drag.y+e.clientY-drag.py;render()});
$('#map-world').addEventListener('pointerup',()=>drag=null);$('#map-world').addEventListener('pointercancel',()=>drag=null);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('#detail').hidden)$('#detail').hidden=true;else if(!$('#list').hidden)showList(false);else closeMap()}});
render();
