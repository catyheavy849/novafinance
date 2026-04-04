function calculateMortgage() {
  clearErrors();
  const v1 = validateField(document.getElementById('propPrice'), 1, 100000000);
  const v2 = validateField(document.getElementById('downPayment'), 0, 100);
  const v3 = validateField(document.getElementById('mortRate'), 0.01, 100);
  const v4 = validateField(document.getElementById('mortTenure'), 1, 35);
  if (!v1 || !v2 || !v3 || !v4) return;

  const price = getVal('propPrice');
  const downPct = getVal('downPayment');
  const rate = getVal('mortRate');
  const years = getVal('mortTenure');

  const downAmt = price * downPct / 100;
  const loanAmt = price - downAmt;
  const r = rate / 100 / 12;
  const n = years * 12;

  let monthly;
  if (r === 0) {
    monthly = loanAmt / n;
  } else {
    monthly = loanAmt * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalRepay = monthly * n;
  const totalInterest = totalRepay - loanAmt;

  document.getElementById('resDown').textContent = formatCurrency(downAmt);
  document.getElementById('resLoan').textContent = formatCurrency(loanAmt);
  document.getElementById('resMortMonthly').textContent = formatCurrency(monthly);
  document.getElementById('resMortInterest').textContent = formatCurrency(totalInterest);
  document.getElementById('resMortTotal').textContent = formatCurrency(totalRepay);

  const results = document.getElementById('mortResults');
  results.style.display = 'block';
  results.classList.add('fade-in');

  drawPieChart('mortChart', [
    { label: 'Down Payment', value: downAmt },
    { label: 'Principal', value: loanAmt },
    { label: 'Interest', value: totalInterest }
  ], ['#22c55e', '#667eea', '#ef4444']);

  document.getElementById('mortLegend').innerHTML = `
    <div class="legend-item"><span class="legend-dot" style="background:#22c55e"></span>Down Payment: ${formatCurrency(downAmt)}</div>
    <div class="legend-item"><span class="legend-dot" style="background:#667eea"></span>Principal: ${formatCurrency(loanAmt)}</div>
    <div class="legend-item"><span class="legend-dot" style="background:#ef4444"></span>Interest: ${formatCurrency(totalInterest)}</div>
  `;
}
