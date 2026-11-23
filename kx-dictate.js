/* KORTX dictation for every chat box on the site.
   Adds a mic button to chat textareas (aria-label starting "Message", or [data-kx-dictate]).
   V (outside a text field) starts/stops dictation · Enter sends while dictating · Esc cancels.
   Uses the browser's speech recognition (Chrome, Edge, Safari). Where it isn't available,
   the button explains how to use the computer's own dictation instead. */
(function () {
  if (window.__kxDictate) return; window.__kxDictate = true;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const SEL = 'textarea[aria-label^="Message"], textarea[data-kx-dictate]';
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  const osHint = isMac ? 'Press Fn twice (or Control twice) to use Mac dictation.' : 'Press Windows + H to use Windows dictation.';
  let rec = null, on = false, target = null, base = '', finalTxt = '', interimTxt = '', heard = false, btn = null, tip = null, raf = 0;

  const css = document.createElement('style');
  css.textContent = '@keyframes kx-mic{0%,100%{box-shadow:0 0 0 0 rgba(167,139,250,.55),0 0 18px rgba(109,94,240,.45)}50%{box-shadow:0 0 0 6px rgba(167,139,250,0),0 0 30px rgba(109,94,240,.7)}}@media (prefers-reduced-motion:reduce){.kx-mic-on{animation:none!important}}'
    /* Branded chat scrollbar: invisible until the box is hovered, then a thin cyan→violet thumb. Room on the right for the mic. */
    + '.kx-chatbox{scrollbar-width:thin;scrollbar-color:transparent transparent;padding-right:60px!important}'
    + '.kx-chatbox:hover,.kx-chatbox:focus{scrollbar-color:rgba(0,204,255,.55) transparent}'
    + '.kx-chatbox::-webkit-scrollbar{width:6px;background:transparent}'
    + '.kx-chatbox::-webkit-scrollbar-track{background:transparent;margin:10px 0}'
    + '.kx-chatbox::-webkit-scrollbar-thumb{background:transparent;border-radius:999px}'
    + '.kx-chatbox:hover::-webkit-scrollbar-thumb{background:linear-gradient(180deg,rgba(0,204,255,.7),rgba(109,94,240,.7))}'
    + '.kx-chatbox::-webkit-scrollbar-thumb:hover{background:linear-gradient(180deg,#00CCFF,#6D5EF0)}'
    + '.kx-chatbox::-webkit-resizer{background:transparent}';
  document.head.appendChild(css);

  const visible = el => { if (!el || !el.isConnected || el.disabled || el.closest('[aria-disabled="true"]')) return false; const r = el.getBoundingClientRect(); if (!(r.width > 40 && r.height > 20 && r.bottom > 50 && r.bottom <= innerHeight + 1 && getComputedStyle(el).visibility !== 'hidden')) return false;
    /* Hidden behind something (full-screen preview, modal, sticky bar)? Then no mic. */
    const x = Math.min(innerWidth - 1, r.left + 24), y = Math.max(r.top, 0) + (r.bottom - Math.max(r.top, 0)) / 2; const hits = document.elementsFromPoint(x, y).filter(n => n !== btn && n !== tip); const top = hits[0];
    return !!top && (top === el || el.contains(top) || top.contains(el)); };
  const findBox = () => { const all = [...document.querySelectorAll(SEL)].filter(visible); return all.find(x => x === document.activeElement) || all[all.length - 1] || null; };
  const setVal = (el, v) => { const set = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set; set.call(el, v); el.dispatchEvent(new Event('input', { bubbles: true })); };

  function ui() {
    btn = document.createElement('button');
    btn.type = 'button'; btn.setAttribute('aria-label', 'Dictate (V)'); btn.title = 'Dictate · press V';
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="pointer-events:none"><rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5 11a7 7 0 0 0 14 0M12 18v3"></path></svg>';
    Object.assign(btn.style, { position: 'fixed', zIndex: 2147483000, width: '32px', height: '32px', display: 'none', placeItems: 'center', borderRadius: '50%', border: '1px solid rgba(0,204,255,.45)', background: 'rgba(0,204,255,.08)', color: '#fff', cursor: 'pointer', padding: '0', transition: 'transform 200ms cubic-bezier(.16,1,.3,1), background 200ms, border-color 200ms' });
    btn.addEventListener('mouseenter', () => { if (!on) { btn.style.background = 'rgba(109,94,240,.16)'; btn.style.borderColor = 'rgba(167,139,250,.6)'; btn.style.transform = 'translateY(-2px)'; } });
    btn.addEventListener('mouseleave', () => { if (!on) paint(); btn.style.transform = ''; });
    btn.addEventListener('mousedown', e => e.preventDefault());
    btn.addEventListener('click', () => toggle());
    tip = document.createElement('div');
    tip.setAttribute('role', 'status'); tip.setAttribute('aria-live', 'polite');
    Object.assign(tip.style, { position: 'fixed', zIndex: 2147483000, display: 'none', maxWidth: '520px', padding: '6px 12px', borderRadius: '999px', border: '1px solid rgba(167,139,250,.45)', background: 'rgba(7,11,21,.94)', color: '#fff', font: '600 12px/1.4 Inter, system-ui, sans-serif', letterSpacing: '.02em', whiteSpace: 'normal', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,.5)', pointerEvents: 'none' });
    document.body.append(btn, tip);
  }
  function paint() {
    if (on) { Object.assign(btn.style, { background: 'rgba(109,94,240,.28)', borderColor: 'rgba(167,139,250,.8)' }); btn.classList.add('kx-mic-on'); btn.style.animation = 'kx-mic 1.6s cubic-bezier(.4,0,.2,1) infinite'; btn.setAttribute('aria-pressed', 'true'); }
    else { Object.assign(btn.style, { background: 'rgba(0,204,255,.08)', borderColor: 'rgba(0,204,255,.45)', animation: 'none' }); btn.classList.remove('kx-mic-on'); btn.setAttribute('aria-pressed', 'false'); }
  }
  function place() {
    raf = requestAnimationFrame(place);
    const box = on && target && visible(target) ? target : findBox();
    if (!box) { btn.style.display = 'none'; tip.style.display = 'none'; return; }
    document.querySelectorAll(SEL).forEach(x => x.classList.contains('kx-chatbox') || x.classList.add('kx-chatbox'));
    const r = box.getBoundingClientRect();
    btn.style.display = 'grid'; btn.style.left = (r.right - 50) + 'px'; btn.style.top = (r.bottom - 42) + 'px';
    if (tip.style.display !== 'none') { tip.style.left = Math.max(8, r.left) + 'px'; tip.style.top = Math.max(8, r.top - 34) + 'px'; }
  }
  /* Mic trouble popup: one clear message + a "Troubleshoot microphone" link (new tab). */
  const HELP_URL = "https://www.google.com/search?q=how+to+change+the+microphone+a+website+is+using&rlz=1C5GCEM_enUS1228US1228&oq=how+to+change+the+microphone+a+website+is+using&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yDQgCEAAYhgMYgAQYigUyBwgDEAAY7wUyBwgEEAAY7wUyBwgFEAAY7wXSAQg4MTI5ajFqN6gCALACAA&sourceid=chrome&source=chrome.ob&ie=UTF-8";
  let pop = null;
  function trouble(msg) {
    if (!pop) {
      pop = document.createElement('div'); pop.setAttribute('role', 'alertdialog'); pop.setAttribute('aria-label', 'Microphone problem');
      Object.assign(pop.style, { position: 'fixed', left: '50%', bottom: '32px', transform: 'translateX(-50%)', zIndex: 2147483001, width: 'min(440px, calc(100vw - 32px))', display: 'none', flexDirection: 'column', gap: '12px', padding: '16px 18px', borderRadius: '16px', border: '1px solid rgba(255,255,255,.08)', background: '#070B15', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.05), 0 24px 60px rgba(0,0,0,.6)', color: '#fff', font: '400 14px/1.5 Inter, system-ui, sans-serif' });
      pop.innerHTML = '<div style="display:flex;align-items:center;gap:10px"><span style="font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#66E0FF;flex:1">Microphone</span><button type="button" aria-label="Close" data-x style="width:32px;height:32px;border-radius:50%;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.04);color:#fff;font-size:16px;cursor:pointer">×</button></div><p data-m style="margin:0;color:rgba(255,255,255,.8)"></p><a data-a target="_blank" rel="noopener" style="align-self:flex-start;display:inline-flex;align-items:center;min-height:44px;padding:0 20px;border-radius:999px;border:1px solid rgba(0,204,255,.45);background:rgba(0,204,255,.08);color:#fff;font-weight:600;font-size:14px;text-decoration:none;transition:all 200ms cubic-bezier(.16,1,.3,1)">Troubleshoot microphone</a>';
      const a = pop.querySelector('[data-a]'); a.href = HELP_URL;
      a.addEventListener('mouseenter', () => Object.assign(a.style, { transform: 'translateY(-2px)', background: 'rgba(109,94,240,.16)', borderColor: 'rgba(167,139,250,.6)', boxShadow: '0 0 32px rgba(109,94,240,.55)' }));
      a.addEventListener('mouseleave', () => Object.assign(a.style, { transform: '', background: 'rgba(0,204,255,.08)', borderColor: 'rgba(0,204,255,.45)', boxShadow: 'none' }));
      a.addEventListener('click', () => { pop.style.display = 'none'; });
      pop.querySelector('[data-x]').addEventListener('click', () => { pop.style.display = 'none'; });
      document.body.appendChild(pop);
    }
    pop.querySelector('[data-m]').textContent = msg; pop.style.display = 'flex'; tip.style.display = 'none';
  }
  let tipT = 0;
  function say(text, ms) { tip.textContent = text; tip.style.display = 'block'; clearTimeout(tipT); if (ms) tipT = setTimeout(() => { if (!on) tip.style.display = 'none'; }, ms); }

  function start() {
    target = findBox(); if (!target) return;
    if (pop) pop.style.display = 'none';
    if (!SR) { target.focus(); say('Dictation isn’t built into this browser. ' + osHint, 6000); return; }
    base = target.value ? target.value.replace(/\s*$/, ' ') : ''; finalTxt = ''; interimTxt = ''; heard = false;
    rec = new SR(); rec.lang = navigator.language || 'en-US'; rec.continuous = true; rec.interimResults = true;
    rec.onresult = e => {
      /* Rebuild from the full result list each time (works whether or not the browser sends results continuously). */
      let fin = '', interim = '';
      for (let i = 0; i < e.results.length; i++) { const t = e.results[i][0].transcript; if (e.results[i].isFinal) fin += (fin && !/\s$/.test(fin) ? ' ' : '') + t.trim(); else interim += t; }
      if (fin.length >= finalTxt.length) finalTxt = fin; interimTxt = interim; heard = true;
      commit();
      if (on) say('Listening… ' + ((finalTxt + ' ' + interim).trim().slice(-70) || ''));
    };
    rec.onerror = e => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed' || e.error === 'audio-capture') trouble(e.error === 'audio-capture' ? 'No microphone was found. Plug one in or pick a different input in your sound settings.' : window.top !== window ? 'This preview can’t use the microphone. Open the live site to dictate.' : 'The browser is blocking the microphone for this site. Click the icon left of the web address → Microphone → Allow, then reload.'); else if (false) say(window.top !== window ? 'This preview can’t use the microphone. Open the live site to dictate, or ' + osHint.charAt(0).toLowerCase() + osHint.slice(1) : 'Microphone is blocked for this site. Click the icon left of the web address → Microphone → Allow, then reload.', 9000); else if (e.error !== 'no-speech' && e.error !== 'aborted') say('Dictation stopped (' + e.error + ').', 4000); };
    rec.onend = () => { if (on) { commit(); base = (base + finalTxt + (interimTxt ? ' ' + interimTxt : '')).replace(/\s*$/, ' '); finalTxt = ''; interimTxt = ''; try { rec.start(); return; } catch (x) {} } commit(); finish(); };
    try { rec.start(); } catch (x) { say('Couldn’t start dictation. ' + osHint, 5000); return; }
    done = false; on = true; paint(); target.focus(); say('Listening… · V or click to stop · Enter to send');
  }
  /* Never wipe what's in the box: keep finished words plus anything still being recognised. */
  function commit() { if (!target) return; const v = (base + finalTxt + (interimTxt ? ' ' + interimTxt : '')).replace(/\s{2,}/g, ' ').replace(/^\s+/, ''); if (v.trim() && v !== target.value) setVal(target, v); }
  let done = false;
  function finish() { if (done) return; done = true; on = false; paint(); if (heard) say('Dictation off · Enter to send', 1800); else if (!pop || pop.style.display === 'none') trouble('Didn’t hear anything. The site may be using the wrong microphone.'); }
  function stop() { if (!rec) return; on = false; paint(); commit(); try { rec.stop(); } catch (x) {} setTimeout(() => { commit(); finish(); }, 1500); }
  function toggle() { on ? stop() : start(); }
  function sendNow() {
    const box = target; stop();
    if (!box) return;
    setTimeout(() => { box.focus(); box.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true })); }, 60);
  }

  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.isComposing) return;
    const el = e.target, editable = el && (el.isContentEditable || /^(INPUT|SELECT)$/.test(el.tagName) || (el.tagName === 'TEXTAREA' && !(on && el === target)));
    if (on && e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); e.stopPropagation(); sendNow(); return; }
    if (on && e.key === 'Escape') { e.preventDefault(); if (target) { setVal(target, base.trim()); finalTxt = ''; } stop(); return; }
    if (e.key === 'v' || e.key === 'V') {
      if (on && el === target) { e.preventDefault(); stop(); return; }
      if (editable) return;
      if (!findBox()) return;
      e.preventDefault(); e.stopPropagation(); toggle();
    }
  }, true);

  const boot = () => { ui(); paint(); place(); };
  if (document.body) boot(); else addEventListener('DOMContentLoaded', boot);
})();
