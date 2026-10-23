/* LPK PT PKP Petrokimia Gresik — skrip bersama */
(function () {
  // Tahun footer
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Menu mobile
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Slider beranda
  var slider = document.getElementById('heroSlider');
  if (slider) {
    var track = slider.querySelector('.slides');
    var slides = slider.querySelectorAll('.slide');
    var dotsWrap = slider.querySelector('.slider-dots');
    var idx = 0, timer;
    var dots = [];
    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Slide ' + (i + 1));
      b.addEventListener('click', function () { go(i); restart(); });
      dotsWrap.appendChild(b);
      dots.push(b);
    });
    function go(i) {
      idx = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + idx * 100 + '%)';
      dots.forEach(function (d, k) { d.classList.toggle('active', k === idx); });
    }
    function restart() { clearInterval(timer); timer = setInterval(function () { go(idx + 1); }, 4500); }
    slider.querySelector('.prev').addEventListener('click', function () { go(idx - 1); restart(); });
    slider.querySelector('.next').addEventListener('click', function () { go(idx + 1); restart(); });
    go(0); restart();
  }

  // Filter (jadwal & galeri): tombol [data-filter], item [data-category]
  document.querySelectorAll('[data-filter-group]').forEach(function (bar) {
    var target = document.querySelector(bar.getAttribute('data-filter-group'));
    var empty = document.getElementById('gridEmpty');
    if (!target) return;
    bar.querySelectorAll('[data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = btn.getAttribute('data-filter');
        bar.querySelectorAll('[data-filter]').forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        var shown = 0;
        target.querySelectorAll('[data-category]').forEach(function (it) {
          var ok = f === 'all' || it.getAttribute('data-category') === f;
          it.hidden = !ok;
          if (ok) shown++;
        });
        if (empty) empty.hidden = shown !== 0;
      });
    });
  });

  // Formulir minat -> WhatsApp
  var form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { return document.getElementById(id).value.trim(); };
      var message = 'Halo LPK PT PKP Petrokimia Gresik, saya ingin bertanya tentang program pelatihan.\n\n' +
        'Nama/Perusahaan: ' + v('nama') + '\n' +
        'Kategori: ' + v('peserta') + '\n' +
        'Bidang: ' + v('programPilihan') + '\n' +
        'Jumlah peserta: ' + (v('jumlah') || '-') + '\n' +
        'Kebutuhan: ' + (v('pesan') || '-') + '\n\n' +
        'Mohon informasi jadwal, biaya, persyaratan, dan ketersediaan program. Terima kasih.';
      window.open('https://wa.me/' + v('pic') + '?text=' + encodeURIComponent(message), '_blank', 'noopener');
    });
  }
})();
