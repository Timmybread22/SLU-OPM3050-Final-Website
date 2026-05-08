// Hero supply chain network animation
const heroCanvas = document.getElementById('hero-canvas');
if (heroCanvas) {
  const ctx = heroCanvas.getContext('2d');
  const LABELS = [
    'Cultivate', 'Manufacture', 'Test', 'Transport',
    'Dispense', 'Customer', 'Harvest', 'Package',
    'Extract', 'Refine', 'Distribute', 'License'
  ];
  let nodes = [];

  function initNodes() {
    heroCanvas.width = heroCanvas.offsetWidth;
    heroCanvas.height = heroCanvas.offsetHeight;
    nodes = LABELS.map(label => ({
      x: 0.05 + Math.random() * 0.9,
      y: 0.05 + Math.random() * 0.9,
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.00035,
      label,
      r: 5
    }));
    for (let i = 0; i < 22; i++) {
      nodes.push({
        x: Math.random(), y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0004,
        vy: (Math.random() - 0.5) * 0.0004,
        label: '', r: 2.5
      });
    }
  }

  function drawFrame() {
    const W = heroCanvas.width, H = heroCanvas.height;
    ctx.clearRect(0, 0, W, H);

    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0.01 || n.x > 0.99) n.vx *= -1;
      if (n.y < 0.01 || n.y > 0.99) n.vy *= -1;
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = (nodes[i].x - nodes[j].x) * W;
        const dy = (nodes[i].y - nodes[j].y) * H;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 220) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x * W, nodes[i].y * H);
          ctx.lineTo(nodes[j].x * W, nodes[j].y * H);
          ctx.strokeStyle = `rgba(74,222,128,${0.22 * (1 - d / 220)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    nodes.forEach(n => {
      // Glow effect
      if (n.label) {
        const grd = ctx.createRadialGradient(n.x*W, n.y*H, 0, n.x*W, n.y*H, 14);
        grd.addColorStop(0, 'rgba(74,222,128,0.25)');
        grd.addColorStop(1, 'rgba(74,222,128,0)');
        ctx.beginPath();
        ctx.arc(n.x * W, n.y * H, 14, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(n.x * W, n.y * H, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.label ? 'rgba(74,222,128,0.7)' : 'rgba(74,222,128,0.35)';
      ctx.fill();
      if (n.label) {
        ctx.fillStyle = 'rgba(74,222,128,0.5)';
        ctx.font = '11px Inter,sans-serif';
        ctx.fillText(n.label, n.x * W + 8, n.y * H + 4);
      }
    });

    requestAnimationFrame(drawFrame);
  }

  window.addEventListener('resize', initNodes);
  initNodes();
  drawFrame();
}

// Intersection observer for reveal animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    });
  });
}
