function calculateLoan() {
  clearErrors();
  const amountEl = document.getElementById('loanAmount');
  const rateEl = document.getElementById('loanRate');
  const tenureEl = document.getElementById('loanTenure');

  const v1 = validateField(amountEl, 1, 100000000);
  const v2 = validateField(rateEl, 0.01, 100);
  const v3 = validateField(tenureEl, 1, 50);
  if (!v1 || !v2 || !v3) return;

  const P = parseFloat(amountEl.value);
  const annualRate = parseFloat(rateEl.value);
  const years = parseFloat(tenureEl.value);
  const r = annualRate / 100 / 12;
  const n = years * 12;

  let monthly;
  if (r === 0) {
    monthly = P / n;
  } else {
    monthly = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalRepayment = monthly * n;
  const totalInterest = totalRepayment - P;

  document.getElementById('resMonthly').textContent = formatCurrency(monthly);
  document.getElementById('resTotal').textContent = formatCurrency(totalRepayment);
  document.getElementById('resInterest').textContent = formatCurrency(totalInterest);

  const results = document.getElementById('loanResults');
  results.style.display = 'block';
  results.classList.add('fade-in');

  // Donut chart
  drawPieChart('loanChart', [
    { label: 'Principal', value: P },
    { label: 'Interest', value: totalInterest }
  ], ['#667eea', '#ef4444']);

  document.getElementById('loanLegend').innerHTML = `
    <div class="legend-item"><span class="legend-dot" style="background:#667eea"></span>Principal: ${formatCurrency(P)}</div>
    <div class="legend-item"><span class="legend-dot" style="background:#ef4444"></span>Interest: ${formatCurrency(totalInterest)}</div>
  `;
}
