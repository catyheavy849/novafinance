function calculateInvestment() {
  clearErrors();
  const v1 = validateField(document.getElementById('invInitial'), 0, 100000000);
  const v2 = validateField(document.getElementById('invMonthly'), 0, 10000000);
  const v3 = validateField(document.getElementById('invRate'), 0, 100);
  const v4 = validateField(document.getElementById('invYears'), 1, 60);
  if (!v1 || !v2 || !v3 || !v4) return;

  const P = getVal('invInitial');
  const PMT = getVal('invMonthly');
  const annualRate = getVal('invRate');
  const years = getVal('invYears');
  const freq = parseInt(document.getElementById('invFreq').value);

  const r = annualRate / 100;
  const rn = r / freq;
  const nt = freq * years;

  // Adjust monthly contribution to match compound frequency
  const contribPerPeriod = PMT * (12 / freq);

  let finalValue;
  if (rn === 0) {
    finalValue = P + contribPerPeriod * nt;
  } else {
    finalValue = P * Math.pow(1 + rn, nt) + contribPerPeriod * (Math.pow(1 + rn, nt) - 1) / rn;
  }

  const totalInvested = P + PMT * 12 * years;
  const gains = finalValue - totalInvested;

  document.getElementById('resFinal').textContent = formatCurrency(finalValue);
  document.getElementById('resInvested').textContent = formatCurrency(totalInvested);
  document.getElementById('resGains').textContent = formatCurrency(gains);

  const results = document.getElementById('invResults');
  results.style.display = 'block';
  results.classList.add('fade-in');

  drawPieChart('invChart', [
    { label: 'Initial', value: P },
    { label: 'Contributions', value: PMT * 12 * years },
    { label: 'Gains', value: gains }
  ], ['#667eea', '#3b82f6', '#22c55e']);

  document.getElementById('invLegend').innerHTML = `
    <div class="legend-item"><span class="legend-dot" style="background:#667eea"></span>Initial: ${formatCurrency(P)}</div>
    <div class="legend-item"><span class="legend-dot" style="background:#3b82f6"></span>Contributions: ${formatCurrency(PMT * 12 * years)}</div>
    <div class="legend-item"><span class="legend-dot" style="background:#22c55e"></span>Gains: ${formatCurrency(gains)}</div>
  `;
}
