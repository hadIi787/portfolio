// DARK/LIGHT MODE TOGGLE
const body = document.body;
const modeToggle = document.querySelector('.mode-toggle');
const gear = document.querySelector('.gear');

modeToggle.addEventListener('click', () => {
  modeToggle.classList.add('rotating');
  setTimeout(() => modeToggle.classList.remove('rotating'), 700);
  body.classList.toggle('light-mode');
});

// PARALLAX SCROLLING
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrollY = window.scrollY;
  if (hero) {
    hero.style.transform = `translateY(${scrollY * 0.2}px)`;
  }
  const bg = document.querySelector('.background-animated');
  if (bg) {
    bg.style.transform = `translateY(${scrollY * 0.1}px)`;
  }
});

// LAYERED FADE-INS
function fadeInOnScroll() {
  const fadeEls = document.querySelectorAll('.about, .projects, .skills, .education, .contact, .project-card');
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.style.opacity = 1;
      el.style.transform = 'none';
    }
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// TEXT REVEAL (already handled by CSS animation on .layered-text)

// 3D TILT ON PROJECT CARDS
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.querySelector('.project-tilt').style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('.project-tilt').style.transform = 'none';
  });
  card.addEventListener('focus', () => {
    card.querySelector('.project-tilt').style.transform = 'rotateY(10deg) scale(1.04)';
  });
  card.addEventListener('blur', () => {
    card.querySelector('.project-tilt').style.transform = 'none';
  });
});

// BUTTON RIPPLE EFFECT
const buttons = document.querySelectorAll('.btn-glow');
buttons.forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${e.offsetX}px`;
    ripple.style.top = `${e.offsetY}px`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

// CONTACT FORM FLOATING LABELS (handled by CSS, but ensure placeholder for :not(:placeholder-shown))
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
  input.placeholder = ' ';
});

// ANIMATED DIGITAL DATA STREAMS & CIRCUIT LINES
// (CSS handles most, but add subtle JS for extra flicker)
setInterval(() => {
  const bg = document.querySelector('.background-animated');
  if (bg) {
    bg.style.opacity = 0.7 + Math.random() * 0.1;
  }
}, 1200);

// ANIMATED BACKGROUND PARTICLES, BINARY CODE, CIRCUIT LINES
const canvas = document.getElementById('bg-particles');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resizeCanvas);

// Particle, binary, and circuit line data
const particles = Array.from({length: 60}, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  r: Math.random() * 2 + 1,
  dx: (Math.random() - 0.5) * 0.3,
  dy: (Math.random() - 0.5) * 0.3,
  color: ''
}));
const binaryStreams = Array.from({length: 24}, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  speed: 0.5 + Math.random() * 0.7,
  length: 8 + Math.floor(Math.random() * 8),
  chars: Array.from({length: 16}, () => Math.random() > 0.5 ? '1' : '0'),
  color: ''
}));
const circuitLines = Array.from({length: 10}, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  len: 80 + Math.random() * 120,
  angle: Math.random() * Math.PI * 2,
  flicker: 0,
  color: ''
}));

function getColors() {
  const isLight = document.body.classList.contains('light-mode');
  return {
    particle: isLight ? 'rgba(41,98,255,0.18)' : 'rgba(0,229,255,0.7)',
    binary: isLight ? 'rgba(41,98,255,0.22)' : 'rgba(0,229,255,0.7)',
    circuit: isLight ? 'rgba(41,98,255,0.18)' : 'rgba(0,229,255,0.5)',
    dot: isLight ? 'rgba(41,98,255,0.25)' : 'rgba(0,229,255,0.9)'
  };
}

function animateBG() {
  ctx.clearRect(0, 0, width, height);
  const colors = getColors();
  // Particles
  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > width) p.dx *= -1;
    if (p.y < 0 || p.y > height) p.dy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = colors.particle;
    ctx.shadowColor = colors.dot;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
  });
  // Binary code streams
  binaryStreams.forEach(s => {
    s.y += s.speed;
    if (s.y > height + s.length * 18) {
      s.x = Math.random() * width;
      s.y = -s.length * 18;
      s.chars = Array.from({length: 16}, () => Math.random() > 0.5 ? '1' : '0');
    }
    ctx.font = 'bold 16px monospace';
    ctx.fillStyle = colors.binary;
    ctx.save();
    ctx.translate(s.x, s.y);
    for (let i = 0; i < s.length; i++) {
      ctx.globalAlpha = 0.7 - i * 0.06;
      ctx.fillText(s.chars[i % s.chars.length], 0, i * 18);
    }
    ctx.restore();
    ctx.globalAlpha = 1;
  });
  // Circuit lines
  circuitLines.forEach(l => {
    l.flicker = Math.random() > 0.95 ? 1 : 0;
    ctx.save();
    ctx.translate(l.x, l.y);
    ctx.rotate(l.angle);
    ctx.strokeStyle = colors.circuit;
    ctx.lineWidth = 2 + l.flicker * 2;
    ctx.shadowColor = colors.dot;
    ctx.shadowBlur = l.flicker ? 16 : 0;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(l.len, 0);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();
  });
  requestAnimationFrame(animateBG);
}
animateBG();

// FLOATING AI/TECH KEYWORDS
const keywords = [
  'Neural Net', 'Autonomous Drive', 'TensorFlow', 'Deep Learning', 'Reinforcement',
  'Simulink', 'CAN Bus', 'Python', 'C++', 'cursor.ai', 'Business Intelligence',
  'AI', 'ML', 'ROS', 'Edge AI', 'Smart Mobility', 'GAN', 'Vision', 'Data Stream',
  'Innovation', 'Automotive', 'Simulation', 'Scratch', 'OpenCV', 'NLP', 'RL', 'AI Cloud'
];
function createFloatingKeywords() {
  const container = document.querySelector('.floating-keywords');
  container.innerHTML = '';
  const w = window.innerWidth, h = window.innerHeight;
  keywords.forEach((kw, i) => {
    const el = document.createElement('span');
    el.className = 'floating-keyword';
    el.textContent = kw;
    // Random position, avoid center (main content)
    let x, y;
    let tries = 0;
    do {
      x = Math.random() * (w - 120);
      y = Math.random() * (h - 40);
      tries++;
    } while ((x > w * 0.25 && x < w * 0.75 && y > h * 0.2 && y < h * 0.7) && tries < 10);
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.animationDelay = `${Math.random() * 8}s`;
    container.appendChild(el);
  });
}
window.addEventListener('resize', createFloatingKeywords);
createFloatingKeywords();
// Re-create on dark/light mode toggle
const observer = new MutationObserver(createFloatingKeywords);
observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

// PAGE/SECTION ENTRY ANIMATIONS
function animateSectionsOnLoad() {
  // Hero: 3D flip + blur + zoom
  const hero = document.querySelector('.hero-animate');
  if (hero) {
    hero.classList.add('page-flip-in');
    setTimeout(() => hero.classList.remove('page-flip-in'), 800);
  }
  // About, Projects, Skills, Education, Passions, Contact: fade, parallax, blur
  [
    '.about-animate', '.projects-animate', '.skills-animate', '.education-animate', '.passions-animate', '.contact-animate'
  ].forEach(sel => {
    const el = document.querySelector(sel);
    if (el) {
      el.classList.add('section-fade-in', 'parallax-in', 'blur-in');
      setTimeout(() => {
        el.classList.remove('section-fade-in', 'parallax-in', 'blur-in');
      }, 900);
    }
  });
}
window.addEventListener('DOMContentLoaded', animateSectionsOnLoad);

// On scroll, animate sections as they enter viewport
function animateSectionsOnScroll() {
  const animatedSections = document.querySelectorAll('.about-animate, .projects-animate, .skills-animate, .education-animate, .passions-animate, .contact-animate');
  animatedSections.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80 && !el.classList.contains('section-fade-in')) {
      el.classList.add('section-fade-in', 'parallax-in', 'blur-in', 'scroll-anim');
      setTimeout(() => {
        el.classList.remove('section-fade-in', 'parallax-in', 'blur-in', 'scroll-anim');
      }, 950);
    }
  });
}
window.addEventListener('scroll', animateSectionsOnScroll);

// NAV TAB ACTIVE HIGHLIGHT & SMOOTH SCROLL (button version)
const navTabs = document.querySelectorAll('.nav-tab');
const sectionIds = ['hero', 'about', 'projects', 'skills', 'data-analysis', 'education', 'passions', 'contact'];
function setActiveTabByScroll() {
  let found = false;
  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const sec = document.getElementById(sectionIds[i]);
    if (sec && window.scrollY + 120 >= sec.offsetTop) {
      navTabs.forEach(tab => tab.classList.remove('active'));
      const tab = Array.from(navTabs).find(t => t.dataset.tab === sectionIds[i]);
      if (tab) tab.classList.add('active');
      found = true;
      break;
    }
  }
  if (!found) navTabs.forEach(tab => tab.classList.remove('active'));
}
window.addEventListener('scroll', setActiveTabByScroll);
setActiveTabByScroll();
// THREE.JS 3D PAGE FLIP TRANSITION
let threeRenderer, threeScene, threeCamera, threePlane, threeAnimating = false;
function initThreeBG() {
  const canvas = document.getElementById('three-bg');
  if (!canvas) return;
  threeRenderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  threeRenderer.setSize(window.innerWidth, window.innerHeight);
  threeScene = new THREE.Scene();
  threeCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
  threeCamera.position.z = 2.5;
  const geometry = new THREE.PlaneGeometry(2.5, 1.5, 32, 32);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x00e5ff,
    metalness: 0.7,
    roughness: 0.2,
    transparent: true,
    opacity: 0.93,
    transmission: 0.7,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    sheen: 1,
    sheenColor: new THREE.Color('#2962FF'),
    side: THREE.DoubleSide
  });
  threePlane = new THREE.Mesh(geometry, material);
  threeScene.add(threePlane);
  window.addEventListener('resize', () => {
    threeRenderer.setSize(window.innerWidth, window.innerHeight);
    threeCamera.aspect = window.innerWidth / window.innerHeight;
    threeCamera.updateProjectionMatrix();
  });
}
function playThreeTransition(onComplete) {
  if (!threeRenderer || !threeScene || !threeCamera || !threePlane) return onComplete();
  if (threeAnimating) return;
  threeAnimating = true;
  threePlane.rotation.y = 0;
  let t = 0;
  function animate() {
    t += 0.06;
    threePlane.rotation.y = t;
    threeRenderer.render(threeScene, threeCamera);
    if (t < Math.PI / 2) {
      requestAnimationFrame(animate);
    } else {
      setTimeout(() => {
        // Fade out effect
        let fade = 1;
        function fadeOut() {
          fade -= 0.08;
          threePlane.material.opacity = Math.max(0, fade * 0.93);
          threeRenderer.render(threeScene, threeCamera);
          if (fade > 0) requestAnimationFrame(fadeOut);
          else {
            threePlane.material.opacity = 0.93;
            threeAnimating = false;
            onComplete();
          }
        }
        fadeOut();
      }, 80);
    }
  }
  animate();
}
initThreeBG();
navTabs.forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();
    const targetId = tab.dataset.tab;
    const target = document.getElementById(targetId);
    if (target) {
      playThreeTransition(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      navTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // Optional: shine effect
      tab.classList.add('tab-shine');
      setTimeout(() => tab.classList.remove('tab-shine'), 700);
    }
  });
});

// ANIMATED DATA GRAPHS (Bar and Line)
function animateBarChart() {
  const canvas = document.getElementById('barChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const colors = getColors();
  const barColors = [colors.particle, colors.dot, colors.particle, colors.dot, colors.particle];

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const labels = ['Model A', 'Model B', 'Model C', 'Model D', 'Model E'];
  const values = [82, 91, 76, 88, 95];
  const max = 100;
  let progress = 0;

  function drawBars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 16px Orbitron, Share Tech Mono, monospace';
    ctx.textAlign = 'center';
    
    for (let i = 0; i < values.length; i++) {
      const x = 60 + i * 65;
      const y = canvas.height - 30;
      const barH = Math.min(progress, values[i]) / max * (canvas.height - 70);
      
      ctx.save();
      ctx.shadowColor = barColors[i];
      ctx.shadowBlur = 16;
      ctx.fillStyle = barColors[i];
      ctx.fillRect(x, y - barH, 40, barH);
      ctx.shadowBlur = 0;
      ctx.restore();
      
      ctx.fillStyle = '#FFFFFF'; // Bright white for text
      ctx.fillText(labels[i], x + 20, canvas.height - 8);
      ctx.fillText(Math.round(Math.min(progress, values[i])) + '%', x + 20, y - barH - 10);
    }

    if (progress < Math.max(...values)) {
      progress += 2.5;
      requestAnimationFrame(drawBars);
    }
  }
  drawBars();
}

function animateLineChart() {
  const canvas = document.getElementById('lineChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const colors = getColors();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const points = [120, 140, 110, 160, 180, 150, 200, 170, 210, 190];
  const max = 220;
  let progress = 0;

  function drawLine() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.strokeStyle = colors.particle; // Use theme color
    ctx.lineWidth = 4;
    ctx.shadowColor = colors.particle;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    
    for (let i = 0; i < points.length; i++) {
      const x = 40 + i * 36;
      const y = canvas.height - 30 - (Math.min(progress, points[i]) / max) * (canvas.height - 70);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();

    for (let i = 0; i < points.length; i++) {
      const x = 40 + i * 36;
      const y = canvas.height - 30 - (Math.min(progress, points[i]) / max) * (canvas.height - 70);
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, 2 * Math.PI);
      ctx.fillStyle = colors.dot; // Use theme color
      ctx.shadowColor = colors.dot;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    if (progress < Math.max(...points)) {
      progress += 4;
      requestAnimationFrame(drawLine);
    }
  }
  drawLine();
}
// Animate graphs when Data Analysis section enters viewport
function animateGraphsOnScroll() {
  const sec = document.getElementById('data-analysis');
  if (!sec) return;
  const rect = sec.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80 && !sec.classList.contains('graphs-animated')) {
    sec.classList.add('graphs-animated');
    animateBarChart();
    animateLineChart();
  }
}
window.addEventListener('scroll', animateGraphsOnScroll);
window.addEventListener('DOMContentLoaded', () => {
  animateGraphsOnScroll();
  animateBarChart();
  animateLineChart();
});
window.addEventListener('resize', () => {
  animateBarChart();
  animateLineChart();
});

document.addEventListener('DOMContentLoaded', () => {
  // Your existing code...
});

// Custom Cursor Optimization
(function() {
  let cursor = document.querySelector('.custom-cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
  }
  // Remove any old corners
  cursor.innerHTML = '';
  // Add four corners
  ['tl','tr','bl','br'].forEach(pos => {
    const corner = document.createElement('div');
    corner.className = 'custom-cursor-corner ' + pos;
    cursor.appendChild(corner);
  });
  let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
  let rafId;

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    rafId = requestAnimationFrame(animateCursor);
  }

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafId) animateCursor();
  });
})();