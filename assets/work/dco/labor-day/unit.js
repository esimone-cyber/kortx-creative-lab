(()=>{'use strict';
const c=window.AD_CONFIG;
const $=s=>document.querySelector(s);
const plus='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v12M2 8h12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const arrow='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4 8 8-8 8" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>';
const closeIcon='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 3 10 10M13 3 3 13" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
document.title='IKEA – '+c.season+' – 300×600';
$('#ad').setAttribute('aria-label','IKEA '+c.season+' interactive room');
$('.eyebrow').textContent=c.season;
$('h1').innerHTML=c.headline.map(t=>'<span>'+esc(t)+'</span>').join('');
$('.room').src='assets/'+c.room;
$('.room').alt=c.roomAlt;
$('.cta').href=c.link;
$('.cta-label').textContent=c.cta;
const scene=$('.scene');if(c.composited)scene.classList.add('furnished');
c.products.forEach((p,i)=>{
 const b=document.createElement('button');b.className='product';b.dataset.product=i;b.setAttribute('aria-label','Expand '+p.name+' product details');b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls','product-popup');
 Object.assign(b.style,{left:p.x+'px',top:p.y+'px',width:p.width+'px',zIndex:p.z||2});b.style.setProperty('--delay',(0.65+i*.25)+'s');
 if(c.composited){b.style.height=p.height+'px';}else b.innerHTML='<img src="assets/'+esc(p.image)+'" alt="'+esc(p.name)+' '+esc(p.type)+'" draggable="false">';scene.append(b);
 const h=document.createElement('button');h.className='hotspot';h.dataset.product=i;h.style.left=p.hotspot[0]-21+'px';h.style.top=p.hotspot[1]-21+'px';h.setAttribute('aria-label','Expand '+p.name+' price and description');h.setAttribute('aria-expanded','false');h.setAttribute('aria-controls','product-popup');h.innerHTML='<span class="pulse"></span><span class="core">'+plus+'</span>';scene.append(h);
});
const ambience=$('.ambience');if(c.key==='school')ambience.classList.add('study');
(c.lights||[]).forEach((l,i)=>{const s=document.createElement('i');s.className='ambient-dot';s.style.left=l[0]+'%';s.style.top=l[1]+'%';s.style.setProperty('--delay',(i*.6)+'s');ambience.append(s)});
const popup=$('.popup');let active=-1,opener=null;
function emit(action,p){window.dispatchEvent(new CustomEvent('ikea-ad-interaction',{detail:{variant:c.key,action,product:p?.name||null}}))}
function setExpanded(index){document.querySelectorAll('[data-product]').forEach(e=>e.setAttribute('aria-expanded',Number(e.dataset.product)===index?'true':'false'))}
function hide(restore=false){popup.classList.remove('open');popup.setAttribute('aria-hidden','true');popup.inert=true;scene.classList.remove('has-popup');setExpanded(-1);active=-1;if(restore&&opener)opener.focus()}
function show(i,trigger){if(active===i){hide(true);return}active=i;opener=trigger;const p=c.products[i];const [dollars,cents]=p.price.split('.');
 popup.innerHTML='<button class="close" aria-label="Close product details">'+closeIcon+'</button><a class="card-link" href="'+esc(p.link)+'" target="_blank" rel="noopener noreferrer" aria-label="Shop '+esc(p.name)+' at IKEA"><p class="card-kicker">'+esc(c.cardKicker)+'</p><h2 class="product-name" id="popup-title">'+esc(p.name)+'</h2><p class="product-type">'+esc(p.type)+'</p><div class="price" aria-label="$'+esc(p.price)+'"><span class="currency">$</span><span class="dollars">'+esc(dollars)+'</span><span class="cents">.'+esc(cents)+'</span></div><p class="description">'+esc(p.description)+'</p><p class="shop-product">View product</p><span class="arrow-strip">'+arrow+'</span></a>';
 popup.setAttribute('aria-hidden','false');popup.inert=false;popup.classList.add('open');scene.classList.add('has-popup');setExpanded(i);
 popup.querySelector('.close').addEventListener('click',()=>hide(true));popup.querySelector('.card-link').addEventListener('click',()=>emit('product-clickout',p));popup.querySelector('.card-link').focus({preventScroll:true});emit('product-expand',p);
}
scene.addEventListener('click',e=>{const b=e.target.closest('[data-product]');if(b)show(Number(b.dataset.product),b)});
$('.veil').addEventListener('click',()=>hide(true));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&active!==-1){e.preventDefault();hide(true)}});
document.addEventListener('pointerdown',e=>{if(active!==-1&&!scene.contains(e.target))hide(false)});
$('.cta').addEventListener('click',()=>emit('season-clickout'));
window.IKEAAd={variant:c.key,close:()=>hide(false),replay:()=>{hide(false);$('#ad').classList.remove('ready');void $('#ad').offsetWidth;$('#ad').classList.add('ready')}};
Promise.all([...document.images].map(im=>im.decode().catch(()=>{}))).then(()=>document.fonts.ready).then(()=>requestAnimationFrame(()=>$('#ad').classList.add('ready')));
})();
