function calculateSavings() {
  clearErrors();
  const v1 = validateField(document.getElementById('savInitial'), 0, 100000000);
  const v2 = validateField(document.getElementById('savMonthly'), 0, 10000000);
  const v3 = validateField(document.getElementById('savRate'), 0, 100);
  const v4 = validateField(document.getElementById('savYears'), 1, 60);
  if (!v1 || !v2 || !v3 || !v4) return;

  const initial = getVal('savInitial');
  const monthly = getVal('savMonthly');
  const annualRate = getVal('savRate');
  const years = getVal('savYears');
  const r = annualRate / 100 / 12;
  const n = years * 12;

  let futureValue;
  if (r === 0) {
    futureValue = initial + monthly * n;
  } else {
    futureValue = initial * Math.pow(1 + r, n) + monthly * (Math.pow(1 + r, n) - 1) / r;
  }

  const totalContrib = initial + monthly * n;
  const interestEarned = futureValue - totalContrib;

  document.getElementById('resFuture').textContent = formatCurrency(futureValue);
  document.getElementById('resContrib').textContent = formatCurrency(totalContrib);
  document.getElementById('resSavInterest').textContent = formatCurrency(interestEarned);

  const results = document.getElementById('savResults');
  results.style.display = 'block';
  results.classList.add('fade-in');

  drawPieChart('savChart', [
    { label: 'Initial', value: initial },
    { label: 'Contributions', value: monthly * n },
    { label: 'Interest', value: interestEarned }
  ], ['#667eea', '#3b82f6', '#22c55e']);

  document.getElementById('savLegend').innerHTML = `
    <div class="legend-item"><span class="legend-dot" style="background:#667eea"></span>Initial: ${formatCurrency(initial)}</div>
    <div class="legend-item"><span class="legend-dot" style="background:#3b82f6"></span>Contributions: ${formatCurrency(monthly * n)}</div>
    <div class="legend-item"><span class="legend-dot" style="background:#22c55e"></span>Interest: ${formatCurrency(interestEarned)}</div>
  `;
}
