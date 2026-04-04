function calculateRetirement() {
  clearErrors();
  const v1 = validateField(document.getElementById('retAge'), 18, 80);
  const v2 = validateField(document.getElementById('retRetireAge'), 30, 90);
  const v3 = validateField(document.getElementById('retSavings'), 0, 100000000);
  const v4 = validateField(document.getElementById('retMonthly'), 0, 10000000);
  const v5 = validateField(document.getElementById('retRate'), 0, 50);
  if (!v1 || !v2 || !v3 || !v4 || !v5) return;

  const currentAge = getVal('retAge');
  const retireAge = getVal('retRetireAge');
  const savings = getVal('retSavings');
  const monthly = getVal('retMonthly');
  const annualRate = getVal('retRate');

  if (retireAge <= currentAge) {
    const group = document.getElementById('retRetireAge').closest('.form-group');
    group.classList.add('has-error');
    group.querySelector('.error-msg').textContent = 'Retirement age must be greater than current age';
    return;
  }

  const years = retireAge - currentAge;
  const r = annualRate / 100 / 12;
  const n = years * 12;

  let fund;
  if (r === 0) {
    fund = savings + monthly * n;
  } else {
    fund = savings * Math.pow(1 + r, n) + monthly * (Math.pow(1 + r, n) - 1) / r;
  }

  const totalContrib = savings + monthly * n;
  const growth = fund - totalContrib;

  document.getElementById('resRetFund').textContent = formatCurrency(fund);
  document.getElementById('resRetYears').textContent = years + ' years';
  document.getElementById('resRetContrib').textContent = formatCurrency(totalContrib);
  document.getElementById('resRetGrowth').textContent = formatCurrency(growth);

  const results = document.getElementById('retResults');
  results.style.display = 'block';
  results.classList.add('fade-in');

  drawPieChart('retChart', [
    { label: 'Current Savings', value: savings },
    { label: 'Future Contributions', value: monthly * n },
    { label: 'Investment Growth', value: growth }
  ], ['#667eea', '#3b82f6', '#22c55e']);

  document.getElementById('retLegend').innerHTML = `
    <div class="legend-item"><span class="legend-dot" style="background:#667eea"></span>Current Savings: ${formatCurrency(savings)}</div>
    <div class="legend-item"><span class="legend-dot" style="background:#3b82f6"></span>Contributions: ${formatCurrency(monthly * n)}</div>
    <div class="legend-item"><span class="legend-dot" style="background:#22c55e"></span>Growth: ${formatCurrency(growth)}</div>
  `;
}
