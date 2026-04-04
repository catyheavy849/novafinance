function calculateAffordability() {
  clearErrors();
  const v1 = validateField(document.getElementById('affIncome'), 1, 10000000);
  const v2 = validateField(document.getElementById('affDebts'), 0, 10000000);
  const v3 = validateField(document.getElementById('affDown'), 0, 100000000);
  const v4 = validateField(document.getElementById('affRate'), 0.01, 100);
  const v5 = validateField(document.getElementById('affTenure'), 1, 35);
  if (!v1 || !v2 || !v3 || !v4 || !v5) return;

  const income = getVal('affIncome');
  const existingDebts = getVal('affDebts');
  const downPayment = getVal('affDown');
  const annualRate = getVal('affRate');
  const years = getVal('affTenure');

  // TDSR limit: 55% of gross income
  const tdsrLimit = income * 0.55;
  const maxMonthly = Math.max(0, tdsrLimit - existingDebts);

  const r = annualRate / 100 / 12;
  const n = years * 12;

  // Work backwards: maxLoan = maxMonthly * ((1+r)^n - 1) / (r * (1+r)^n)
  let maxLoan;
  if (r === 0) {
    maxLoan = maxMonthly * n;
  } else {
    maxLoan = maxMonthly * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
  }

  const maxProperty = maxLoan + downPayment;
  const tdsrUsed = ((existingDebts + maxMonthly) / income * 100);

  document.getElementById('resAffProp').textContent = formatCurrency(maxProperty);
  document.getElementById('resAffLoan').textContent = formatCurrency(maxLoan);
  document.getElementById('resAffMonthly').textContent = formatCurrency(maxMonthly);
  document.getElementById('resAffTDSR').textContent = tdsrUsed.toFixed(1) + '%';

  const results = document.getElementById('affResults');
  results.style.display = 'block';
  results.classList.add('fade-in');
}
