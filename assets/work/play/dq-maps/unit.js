(() => {
'use strict';
const C=window.DQ_CONFIG, $=id=>document.getElementById(id);
let interacted=false;
function track(name){window.dispatchEvent(new CustomEvent('dq:interaction',{detail:{name}}));}
document.querySelectorAll('.clickout').forEach(a=>{a.href=C.clickout;a.addEventListener('click',()=>{interacted=true;track('clickout');});});
$('find').onclick=()=>{interacted=true;$('hero').inert=true;$('locator').hidden=false;$('find').setAttribute('aria-expanded','true');$('back').focus({preventScroll:true});track('list_open');};
function close(){$('locator').hidden=true;$('hero').inert=false;$('find').setAttribute('aria-expanded','false');$('find').focus({preventScroll:true});track('list_close');}
$('back').onclick=close;
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('locator').hidden)close();});
let plays=1;
const loop=setInterval(()=>{if(interacted||plays>=C.introPlays||matchMedia('(prefers-reduced-motion:reduce)').matches){clearInterval(loop);return;}plays++;$('hero').getAnimations({subtree:true}).forEach(a=>{a.cancel();a.play();});},C.loopInterval);
})();
