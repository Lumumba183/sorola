// Sorola Africa Safaris — main.js
(function () {
  "use strict";

  /* Sticky header shadow */
  var header = document.querySelector(".header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      toggle.classList.toggle("open");
      var open = nav.classList.contains("open");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.innerHTML = open
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
      });
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* Animated counters */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target, target = parseInt(el.getAttribute("data-count"), 10);
          var start = null, dur = 1600;
          function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString();
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          cio.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* Tabs (safaris page) */
  var tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      tabBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      document.querySelectorAll(".tab-panel").forEach(function (p) { p.classList.remove("active"); });
      var panel = document.getElementById(btn.getAttribute("data-tab"));
      if (panel) panel.classList.add("active");
    });
  });

  /* Testimonials slider */
  var slides = document.querySelectorAll(".testi-slide");
  var dotsWrap = document.querySelector(".testi-nav");
  if (slides.length && dotsWrap) {
    var current = 0, timer;
    slides.forEach(function (_, i) {
      var d = document.createElement("button");
      d.className = "testi-dot" + (i === 0 ? " active" : "");
      d.setAttribute("aria-label", "Show testimonial " + (i + 1));
      d.addEventListener("click", function () { show(i); reset(); });
      dotsWrap.appendChild(d);
    });
    var dots = dotsWrap.querySelectorAll(".testi-dot");
    function show(i) {
      slides[current].classList.remove("active");
      dots[current].classList.remove("active");
      current = i;
      slides[current].classList.add("active");
      dots[current].classList.add("active");
    }
    function next() { show((current + 1) % slides.length); }
    function reset() { clearInterval(timer); timer = setInterval(next, 6000); }
    reset();
  }

  /* Quote form: destination pre-select via ?package= */
  var params = new URLSearchParams(window.location.search);
  var pack = params.get("package");
  var dest = document.getElementById("destination");
  if (pack && dest) {
    for (var i = 0; i < dest.options.length; i++) {
      if (dest.options[i].value.toLowerCase() === pack.toLowerCase()) {
        dest.selectedIndex = i;
        break;
      }
    }
  }

  /* Min start date = tomorrow */
  var dateInput = document.getElementById("start-date");
  if (dateInput) {
    var t = new Date(Date.now() + 86400000);
    dateInput.min = t.toISOString().split("T")[0];
  }
})();
