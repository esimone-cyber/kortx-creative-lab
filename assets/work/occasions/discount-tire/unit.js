const offers = [
  { brand: 'Pirelli', url: 'https://www.discounttire.com/promotions/pirelli-tires', title: '$80 Instant Savings on any set of Pirelli tires', expiry: '08/03/2026' },
  { brand: 'Method wheels', url: 'https://www.discounttire.com/promotions/method-race-wheels', title: 'Price Reduction on Select Method Race Wheels', expiry: '07/24/2026' },
  { brand: 'Goodyear', url: 'https://www.discounttire.com/promotions/goodyear-tires', title: '$80 Instant Savings on select sets of Goodyear tires', expiry: '08/03/2026' }
];
const slides = [...document.querySelectorAll('.offer')];
const dots = [...document.querySelectorAll('.dot')];
const details = document.querySelector('.details');
const carousel = document.querySelector('.carousel');
const motion = document.querySelector('.background-motion');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let current = 0;
let timer;
let paused = false;
let transitions = [];
let transitionId = 0;
function show(index) {
  const next = (index + offers.length) % offers.length;
  if (next === current) return;
  const previous = current;
  const id = ++transitionId;
  transitions.forEach(animation => animation.cancel());
  transitions = [];
  slides.forEach(slide => slide.classList.remove('outgoing'));
  carousel.classList.remove('is-transitioning');
  current = next;
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === current);
    slide.setAttribute('aria-hidden', String(i !== current));
    dots[i].classList.toggle('selected', i === current);
    if (i === current) dots[i].setAttribute('aria-current', 'true');
    else dots[i].removeAttribute('aria-current');
  });
  details.href = offers[current].url;
  details.setAttribute('aria-label', `Shop the ${offers[current].brand} offer`);
  if (!reducedMotion.matches) {
    slides[previous].classList.add('outgoing');
    carousel.classList.add('is-transitioning');
    const options = { duration: 420, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'both' };
    transitions = [
      slides[previous].animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-100%)' }], options),
      slides[current].animate([{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }], options)
    ];
    Promise.all(transitions.map(animation => animation.finished)).then(() => {
      if (id !== transitionId) return;
      slides[previous].classList.remove('outgoing');
      carousel.classList.remove('is-transitioning');
      transitions.forEach(animation => animation.cancel());
      transitions = [];
    }).catch(() => { /* A new selection cancels and replaces the running transition. */ });
  }
}
function start() {
  clearInterval(timer);
  if (!paused && !document.hidden) timer = setInterval(() => show(current + 1), 3000);
  if (paused || document.hidden || reducedMotion.matches) motion.pause();
  else motion.play().catch(() => { motion.hidden = true; });
}
dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); start(); }));
carousel.addEventListener('keydown', event => {
  if (event.code === 'Space') { event.preventDefault(); paused = !paused; start(); }
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1)); start();
  }
});
document.addEventListener('visibilitychange', start);
reducedMotion.addEventListener('change', start);
motion.addEventListener('error', () => { motion.hidden = true; });
start();
