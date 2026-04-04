function calculateBudget() {
  clearErrors();
  if (!validateField(document.getElementById('budIncome'), 1, 100000000)) return;

  const income = getVal('budIncome');
  const housing = getVal('budHousing');
  const insurance = getVal('budInsurance');
  const loans = getVal('budLoans');
  const utilities = getVal('budUtilities');
  const food = getVal('budFood');
  const transport = getVal('budTransport');
  const entertain = getVal('budEntertain');
  const others = getVal('budOthers');
  const savingsTarget = getVal('budSavings');

  const totalFixed = housing + insurance + loans + utilities;
  const totalVariable = food + transport + entertain + others;
  const totalExpenses = totalFixed + totalVariable + savingsTarget;
  const remaining = income - totalExpenses;

  document.getElementById('resFixed').textContent = formatCurrency(totalFixed);
  document.getElementById('resVariable').textContent = formatCurrency(totalVariable);
  document.getElementById('resSavTarget').textContent = formatCurrency(savingsTarget);

  const balEl = document.getElementById('resBalance');
  balEl.textContent = formatCurrency(remaining);
  balEl.className = 'result-value ' + (remaining >= 0 ? 'green' : 'red');

  // Progress bars
  const categories = [
    { name: 'Housing / Rent', value: housing, color: '#667eea' },
    { name: 'Insurance', value: insurance, color: '#8b5cf6' },
    { name: 'Loan Repayments', value: loans, color: '#ec4899' },
    { name: 'Utilities & Phone', value: utilities, color: '#06b6d4' },
    { name: 'Food & Groceries', value: food, color: '#f59e0b' },
    { name: 'Transport', value: transport, color: '#22c55e' },
    { name: 'Entertainment', value: entertain, color: '#ef4444' },
    { name: 'Others', value: others, color: '#6b7280' },
    { name: 'Savings', value: savingsTarget, color: '#3b82f6' }
  ].filter(c => c.value > 0);

  let barsHTML = '';
  categories.forEach(cat => {
    const pct = Math.min((cat.value / income) * 100, 100);
    barsHTML += `
      <div class="progress-bar-container">
        <div class="progress-label">
          <span>${cat.name}</span>
          <span>${formatCurrency(cat.value)} (${pct.toFixed(1)}%)</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${pct}%;background:${cat.color}"></div>
        </div>
      </div>`;
  });
  document.getElementById('budgetBars').innerHTML = barsHTML;

  const results = document.getElementById('budResults');
  results.style.display = 'block';
  results.classList.add('fade-in');

  // Pie chart
  const chartData = categories.map(c => ({ label: c.name, value: c.value }));
  if (remaining > 0) {
    chartData.push({ label: 'Remaining', value: remaining });
    categories.push({ name: 'Remaining', value: remaining, color: '#10b981' });
  }
  const colors = categories.map(c => c.color);

  drawPieChart('budChart', chartData, colors);

  let legendHTML = '';
  categories.forEach((c, i) => {
    legendHTML += `<div class="legend-item"><span class="legend-dot" style="background:${c.color}"></span>${c.name}: ${formatCurrency(c.value)}</div>`;
  });
  document.getElementById('budLegend').innerHTML = legendHTML;
}
