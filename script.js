/* ════════════════════════════════════════════════
   ABDULLAHK PORTFOLIO — SCRIPT.JS
   Premium Animations & Interactions
   ════════════════════════════════════════════════ */

"use strict";

/* ────────────────────────────────────────────────
   1. LOADER
   ──────────────────────────────────────────────── */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hidden");
    initHeroSequence();
  }, 1200);
});

/* ────────────────────────────────────────────────
   2. CUSTOM CURSOR
   ──────────────────────────────────────────────── */
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursor-follower");
let fx = 0, fy = 0;
let mouseX = 0, mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top  = mouseY + "px";
});

(function followCursor() {
  fx += (mouseX - fx) * 0.1;
  fy += (mouseY - fy) * 0.1;
  follower.style.left = fx + "px";
  follower.style.top  = fy + "px";
  requestAnimationFrame(followCursor);
})();

/* ────────────────────────────────────────────────
   3. PARTICLE SYSTEM
   ──────────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");
  let W, H, particles = [];
  const COUNT = 70;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const colors = [
    "rgba(108,92,231,",
    "rgba(0,212,255,",
    "rgba(162,155,254,",
  ];

  function rand(a, b) { return Math.random() * (b - a) + a; }

  function createParticle() {
    return {
      x: rand(0, W),
      y: rand(0, H),
      r: rand(0.5, 2.2),
      alpha: rand(0.1, 0.55),
      vx: rand(-0.15, 0.15),
      vy: rand(-0.3, -0.05),
      color: colors[Math.floor(rand(0, colors.length))],
    };
  }

  for (let i = 0; i < COUNT; i++) particles.push(createParticle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ")";
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.0005;

      if (p.y < -10 || p.alpha <= 0) {
        Object.assign(p, createParticle(), { y: H + 5, alpha: rand(0.1, 0.55) });
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ────────────────────────────────────────────────
   4. TYPING ANIMATION (HERO)
   ──────────────────────────────────────────────── */
function initHeroSequence() {
  const arabicTarget = "السلام عليكم";
  const textEl  = document.getElementById("arabic-text");
  const cursorEl = document.getElementById("typing-cursor");
  const welcome  = document.getElementById("welcome-line");
  const cta      = document.getElementById("hero-cta");
  const scrollH  = document.getElementById("scroll-hint");

  let i = 0;
  const delay = 80; // ms per character

  // Pause cursor blink during typing
  cursorEl.style.animation = "none";
  cursorEl.style.opacity = "1";

  function typeChar() {
    if (i < arabicTarget.length) {
      textEl.textContent = arabicTarget.slice(0, i + 1);
      i++;
      setTimeout(typeChar, delay);
    } else {
      // Typing done — resume cursor blink
      cursorEl.style.animation = "";
      // Fade in subline
      setTimeout(() => {
        welcome.classList.add("visible");
        setTimeout(() => {
          cta.classList.add("visible");
          setTimeout(() => scrollH.classList.add("visible"), 400);
        }, 400);
      }, 500);
    }
  }

  // Small pause before typing starts
  setTimeout(typeChar, 300);
}

/* ────────────────────────────────────────────────
   5. NAVBAR SCROLL EFFECT
   ──────────────────────────────────────────────── */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* ────────────────────────────────────────────────
   6. MOBILE MENU
   ──────────────────────────────────────────────── */
const toggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
let menuOpen = false;

toggle.addEventListener("click", () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle("open", menuOpen);
  const spans = toggle.querySelectorAll("span");
  if (menuOpen) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity   = "0";
    spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
  } else {
    spans[0].style.transform = "";
    spans[1].style.opacity   = "1";
    spans[2].style.transform = "";
  }
});

// Close on link click
mobileMenu.querySelectorAll(".mobile-link").forEach(link => {
  link.addEventListener("click", () => {
    menuOpen = false;
    mobileMenu.classList.remove("open");
    const spans = toggle.querySelectorAll("span");
    spans[0].style.transform = "";
    spans[1].style.opacity   = "1";
    spans[2].style.transform = "";
  });
});

/* ────────────────────────────────────────────────
   7. SCROLL REVEAL (Intersection Observer)
   ──────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals
      const siblings = [...entry.target.parentElement.querySelectorAll(".reveal")];
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => {
        entry.target.classList.add("in-view");
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ────────────────────────────────────────────────
   8. SKILL BARS ANIMATION
   ──────────────────────────────────────────────── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll(".skill-fill");
      fills.forEach((fill, i) => {
        const target = fill.getAttribute("data-width");
        setTimeout(() => {
          fill.style.setProperty("--target-width", target + "%");
          fill.classList.add("animate");
          fill.style.width = target + "%";
        }, 200 + i * 120);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const skillsCols = document.querySelectorAll(".skills-col");
skillsCols.forEach(col => skillObserver.observe(col));

/* ────────────────────────────────────────────────
   9. PARALLAX BACKGROUNDS (hero orbs)
   ──────────────────────────────────────────────── */
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const orbs = document.querySelectorAll(".hero-bg-orb");
      orbs.forEach((orb, i) => {
        const speed = [0.08, 0.12, 0.06][i] || 0.08;
        orb.style.transform = `translateY(${y * speed}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
});

/* ────────────────────────────────────────────────
   10. CONTACT FORM
   ──────────────────────────────────────────────── */
function handleSubmit(e) {
  e.preventDefault();
  const btn     = document.getElementById("submit-btn");
  const form    = document.getElementById("contact-form");
  const success = document.getElementById("form-success");

  btn.disabled = true;
  btn.querySelector("#btn-text").textContent = "Sending…";

  // Simulate send
  setTimeout(() => {
    form.classList.add("hidden");
    form.style.display = "none";
    success.classList.remove("hidden");
  }, 1500);
}

/* ────────────────────────────────────────────────
   11. SMOOTH SCROLL FOR NAV LINKS
   ──────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ────────────────────────────────────────────────
   12. GLASS CARD TILT (Subtle 3D hover)
   ──────────────────────────────────────────────── */
document.querySelectorAll(".work-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) *  6;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* ────────────────────────────────────────────────
   13. PROFILE CARD TILT
   ──────────────────────────────────────────────── */
const profileCard = document.querySelector(".profile-card");
if (profileCard) {
  profileCard.addEventListener("mousemove", (e) => {
    const rect = profileCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) *  5;
    profileCard.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  profileCard.addEventListener("mouseleave", () => {
    profileCard.style.transform = "";
  });
}

/* ────────────────────────────────────────────────
   14. SCROLL PROGRESS BAR (thin line at top)
   ──────────────────────────────────────────────── */
const progressBar = document.createElement("div");
progressBar.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  height: 2px;
  background: linear-gradient(90deg, #6C5CE7, #00D4FF);
  z-index: 10001;
  width: 0%;
  transition: width 0.1s linear;
  pointer-events: none;
`;
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollH   = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = (scrollTop / scrollH) * 100;
  progressBar.style.width = pct + "%";
});
