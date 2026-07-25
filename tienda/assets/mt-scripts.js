document.addEventListener('DOMContentLoaded', function () {
  initReveal();
  initCifras();
  initResenasCarrusel();
  initFaq();
});

function initReveal() {
  var els = document.querySelectorAll('.mt-reveal');
  if (!els.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(function (el) { el.classList.add('mt-visible'); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('mt-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(function (el, i) {
    el.style.setProperty('--mt-i', i % 6);
    observer.observe(el);
  });
}

function initCifras() {
  var nums = document.querySelectorAll('.mt-cifras__num[data-target]');
  if (!nums.length) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        var el = entry.target;
        var target = parseFloat(el.dataset.target) || 0;
        var suffix = el.dataset.suffix || '';

        if (reduced) {
          el.textContent = target + suffix;
          return;
        }

        var duration = 1400;
        var start = null;

        function step(timestamp) {
          if (!start) start = timestamp;
          var progress = Math.min((timestamp - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var value = Math.round(target * eased);
          el.textContent = value + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    },
    { threshold: 0.4 }
  );

  nums.forEach(function (el) { observer.observe(el); });
}

function initResenasCarrusel() {
  var sections = document.querySelectorAll('[data-mt-resenas]');
  sections.forEach(function (section) {
    var track = section.querySelector('.mt-resenas__track');
    var prev = section.querySelector('[data-mt-prev]');
    var next = section.querySelector('[data-mt-next]');
    if (!track || !prev || !next) return;

    function scrollByCard(dir) {
      var card = track.querySelector('.mt-resenas__card');
      var gap = 20;
      var amount = card ? card.getBoundingClientRect().width + gap : 300;
      track.scrollBy({ left: dir * amount, behavior: 'smooth' });
    }

    prev.addEventListener('click', function () { scrollByCard(-1); });
    next.addEventListener('click', function () { scrollByCard(1); });
  });
}

function initFaq() {
  var items = document.querySelectorAll('.mt-faq__item');
  items.forEach(function (item) {
    var btn = item.querySelector('.mt-faq__q');
    var answer = item.querySelector('.mt-faq__a');
    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('mt-open');

      item.parentElement.querySelectorAll('.mt-faq__item.mt-open').forEach(function (other) {
        if (other !== item) {
          other.classList.remove('mt-open');
          other.querySelector('.mt-faq__a').style.maxHeight = null;
          other.querySelector('.mt-faq__q').setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('mt-open');
        answer.style.maxHeight = null;
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('mt-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
