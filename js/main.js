/* Oluwatomi Joseph Maria — portfolio interactions
   1. Header border once the page scrolls
   2. Photo reveals on scroll (the page is fully visible without them)
   3. Active section underline in the nav
   4. Photo viewer with captions, arrows and keyboard support
   5. Copy buttons for email and phone */
(function () {
  var root = document.documentElement;

  /* 1. Header */
  var bar = document.getElementById('bar');
  function onScroll() { bar.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  if ('IntersectionObserver' in window) {
    /* 2. Photo reveals: only hide what is below the fold; reveal everything after 4s as a fallback */
    root.classList.add('js');
    var groups = [].slice.call(document.querySelectorAll('.reveal'));
    groups.forEach(function (g) {
      if (g.getBoundingClientRect().top < window.innerHeight) g.classList.add('in');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    groups.forEach(function (g) { if (!g.classList.contains('in')) io.observe(g); });
    setTimeout(function () { groups.forEach(function (g) { g.classList.add('in'); }); }, 4000);

    /* The long trace under "Talk to me" draws once it is on screen (decorative, so no fallback timer) */
    var trace = document.querySelector('.ecg-long');
    if (trace) io.observe(trace);

    /* 3. Active section */
    var links = {};
    document.querySelectorAll('.bar nav a').forEach(function (a) {
      links[a.getAttribute('href').slice(1)] = a;
    });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.toggle('active', k === e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) so.observe(s);
    });
  }

  /* 4. Photo viewer */
  var lb = document.getElementById('lb'),
      img = document.getElementById('lb-img'),
      cap = document.getElementById('lb-cap'),
      closeBtn = document.getElementById('lb-close'),
      items = [].slice.call(document.querySelectorAll('[data-full]')),
      idx = 0, last = null;

  function show(i) {
    idx = (i + items.length) % items.length;
    var b = items[idx], inner = b.querySelector('img');
    img.src = b.getAttribute('data-full');
    img.alt = inner ? inner.alt : '';
    var fc = b.parentElement.querySelector('figcaption');
    cap.textContent = fc ? fc.textContent : (inner ? inner.alt : '');
  }
  function open(i, trigger) {
    last = trigger; show(i);
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
  }
  function close() {
    lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true');
    if (last) last.focus();
  }
  items.forEach(function (b, i) { b.addEventListener('click', function () { open(i, b); }); });
  closeBtn.addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', function () { show(idx - 1); });
  document.getElementById('lb-next').addEventListener('click', function () { show(idx + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'ArrowLeft') show(idx - 1);
  });

  /* 5. Copy buttons: label blurs out, swaps to "Copied", then back */
  function setLabel(btn, text) {
    var label = btn.querySelector('.label');
    btn.classList.add('swap');
    setTimeout(function () { label.textContent = text; btn.classList.remove('swap'); }, 140);
  }
  function selectText(el) {
    var r = document.createRange(); r.selectNodeContents(el);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
  }
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    var timer;
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-copy');
      var shown = btn.closest('.contact').querySelector('.val');
      function done() {
        clearTimeout(timer);
        btn.classList.add('done'); setLabel(btn, 'Copied');
        timer = setTimeout(function () { btn.classList.remove('done'); setLabel(btn, 'Copy'); }, 1800);
      }
      function fallback() { selectText(shown); setLabel(btn, 'Selected'); timer = setTimeout(function () { setLabel(btn, 'Copy'); }, 1800); }
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(value).then(done, fallback);
        } else { fallback(); }
      } catch (err) { fallback(); }
    });
  });
})();
