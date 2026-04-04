/* ============================================
   SG Finance Calculator - Main JS
   ============================================ */

// Theme Management
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('sgfinance-theme') || 'light';
    this.set(saved);
    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
      this.toggle();
    });
  },
  set(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sgfinance-theme', theme);
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.innerHTML = theme === 'dark' ? '&#9728;' : '&#9790;';
  },
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    this.set(current === 'dark' ? 'light' : 'dark');
  }
};

// Mobile Navigation
const NavManager = {
  init() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
      });
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
          navLinks.classList.remove('open');
          hamburger.classList.remove('active');
        }
      });
    }
    // Set active link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
};

// Currency Formatter (SGD)
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

function formatNumber(num, decimals = 2) {
  return new Intl.NumberFormat('en-SG', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
}

function formatPercent(num, decimals = 1) {
  return num.toFixed(decimals) + '%';
}

// Form Validation
function validateField(input, min = 0, max = Infinity) {
  const group = input.closest('.form-group');
  const val = parseFloat(input.value);
  if (isNaN(val) || input.value.trim() === '') {
    group?.classList.add('has-error');
    const errMsg = group?.querySelector('.error-msg');
    if (errMsg) errMsg.textContent = 'Please enter a valid number';
    return false;
  }
  if (val < min || val > max) {
    group?.classList.add('has-error');
    const errMsg = group?.querySelector('.error-msg');
    if (errMsg) errMsg.textContent = `Value must be between ${min} and ${formatNumber(max, 0)}`;
    return false;
  }
  group?.classList.remove('has-error');
  return true;
}

function getVal(id) {
  return parseFloat(document.getElementById(id)?.value) || 0;
}

function clearErrors() {
  document.querySelectorAll('.form-group.has-error').forEach(g => g.classList.remove('has-error'));
}

function resetForm(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.reset();
    clearErrors();
  }
  const results = document.querySelector('.calc-results');
  if (results) {
    results.querySelectorAll('.result-value').forEach(el => {
      el.textContent = '—';
    });
  }
}

// Simple Donut/Pie Chart using Canvas
function drawPieChart(canvasId, data, colors) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const size = Math.min(canvas.parentElement.offsetWidth - 40, 260);
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  ctx.scale(dpr, dpr);

  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 10;
  const innerRadius = radius * 0.6;
  let startAngle = -Math.PI / 2;

  data.forEach((d, i) => {
    const sliceAngle = (d.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
    ctx.arc(cx, cy, innerRadius, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    startAngle += sliceAngle;
  });

  // Center text
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim();
  ctx.font = `bold ${size * 0.07}px Inter, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(formatCurrency(total), cx, cy);
}

// Bar chart
function drawBarChart(canvasId, labels, values, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const w = Math.min(canvas.parentElement.offsetWidth - 40, 600);
  const h = 220;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.scale(dpr, dpr);

  const maxVal = Math.max(...values, 1);
  const barWidth = Math.min(40, (w - 60) / labels.length - 10);
  const chartLeft = 50;
  const chartBottom = h - 30;
  const chartHeight = h - 50;

  ctx.clearRect(0, 0, w, h);

  // Grid lines
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim();
  const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim();
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) {
    const y = chartBottom - (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(chartLeft, y);
    ctx.lineTo(w - 10, y);
    ctx.stroke();
    ctx.fillStyle = textColor;
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(formatNumber((maxVal / 4) * i, 0), chartLeft - 5, y + 3);
  }

  // Bars
  const gap = (w - chartLeft - 10) / labels.length;
  values.forEach((val, i) => {
    const barH = (val / maxVal) * chartHeight;
    const x = chartLeft + gap * i + (gap - barWidth) / 2;
    const y = chartBottom - barH;
    ctx.fillStyle = typeof color === 'string' ? color : color[i % color.length];
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, barH, [4, 4, 0, 0]);
    ctx.fill();

    ctx.fillStyle = textColor;
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], x + barWidth / 2, chartBottom + 14);
  });
}

// Navigation HTML generator
function getNavHTML(activePage) {
  return `
  <nav class="navbar">
    <a href="index.html" class="nav-brand">
      <svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill="url(#g)"/><path d="M7 14h4l2-5 3 10 2-5h3" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="g" x1="0" y1="0" x2="28" y2="28"><stop stop-color="#667eea"/><stop offset="1" stop-color="#764ba2"/></linearGradient></defs></svg>
      SG Finance
    </a>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li class="nav-dropdown">
        <button class="nav-dropdown-btn">Calculators &#9662;</button>
        <div class="nav-dropdown-menu">
          <a href="loan.html">Loan Calculator</a>
          <a href="mortgage.html">Mortgage Calculator</a>
          <a href="cpf.html">CPF Calculator</a>
          <a href="savings.html">Savings Calculator</a>
          <a href="investment.html">Investment Calculator</a>
          <a href="budget.html">Budget Planner</a>
          <a href="retirement.html">Retirement Calculator</a>
          <a href="emergency.html">Emergency Fund</a>
          <a href="dti.html">Debt-to-Income</a>
          <a href="affordability.html">Affordability</a>
          <a href="tools.html">More Tools</a>
        </div>
      </li>
      <li><a href="tools.html">Tools</a></li>
    </ul>
    <div class="nav-right">
      <button class="theme-toggle" aria-label="Toggle theme">&#9790;</button>
      <button class="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>`;
}

function getFooterHTML() {
  return `
  <footer class="footer">
    <p>&copy; ${new Date().getFullYear()} SG Finance Calculator &mdash; Powered by <a href="https://www.tertiarycourses.com.sg/" target="_blank" rel="noopener">Tertiary Infotech Academy Pte Ltd</a></p>
  </footer>`;
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  NavManager.init();
});
