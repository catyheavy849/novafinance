function calculateEmergency() {
  clearErrors();
  const v1 = validateField(document.getElementById('emMonthly'), 1, 1000000);
  const v2 = validateField(document.getElementById('emMonths'), 1, 24);
  const v3 = validateField(document.getElementById('emCurrent'), 0, 100000000);
  if (!v1 || !v2 || !v3) return;

  const monthly = getVal('emMonthly');
  const months = getVal('emMonths');
  const current = getVal('emCurrent');

  const target = monthly * months;
  const shortfall = Math.max(0, target - current);
  const progress = Math.min((current / target) * 100, 100);

  document.getElementById('resEmTarget').textContent = formatCurrency(target);
  document.getElementById('resEmCurrent').textContent = formatCurrency(current);

  const shortfallEl = document.getElementById('resEmShortfall');
  shortfallEl.textContent = shortfall > 0 ? formatCurrency(shortfall) : 'None!';
  shortfallEl.className = 'result-value ' + (shortfall > 0 ? 'red' : 'green');

  document.getElementById('emProgressPct').textContent = progress.toFixed(1) + '%';
  const bar = document.getElementById('emProgressBar');
  bar.style.width = progress + '%';
  bar.className = 'progress-fill ' + (progress >= 100 ? 'green' : progress >= 50 ? 'orange' : 'red');

  let statusHTML = '';
  if (progress >= 100) {
    statusHTML = '<div class="badge badge-success">&#10003; Fully funded! You have a solid emergency fund.</div>';
  } else if (progress >= 50) {
    statusHTML = `<div class="badge badge-warning">&#9888; Getting there! You still need ${formatCurrency(shortfall)} more.</div>`;
  } else {
    statusHTML = `<div class="badge badge-danger">&#9888; Needs attention. Save ${formatCurrency(shortfall)} more to reach your target.</div>`;
  }
  document.getElementById('emStatus').innerHTML = statusHTML;

  const results = document.getElementById('emResults');
  results.style.display = 'block';
  results.classList.add('fade-in');
}
