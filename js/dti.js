function calculateDTI() {
  clearErrors();
  const v1 = validateField(document.getElementById('dtiIncome'), 1, 100000000);
  const v2 = validateField(document.getElementById('dtiDebt'), 0, 100000000);
  if (!v1 || !v2) return;

  const income = getVal('dtiIncome');
  const debt = getVal('dtiDebt');
  const ratio = (debt / income) * 100;

  document.getElementById('resDTI').textContent = ratio.toFixed(1) + '%';
  document.getElementById('resDTIIncome').textContent = formatCurrency(income);
  document.getElementById('resDTIDebt').textContent = formatCurrency(debt);

  const dtiEl = document.getElementById('resDTI');
  document.getElementById('dtiBarPct').textContent = ratio.toFixed(1) + '%';
  const bar = document.getElementById('dtiBar');
  bar.style.width = Math.min(ratio, 100) + '%';

  let statusHTML = '';
  if (ratio < 35) {
    bar.className = 'progress-fill green';
    dtiEl.className = 'result-value green';
    statusHTML = '<div class="badge badge-success">&#10003; Healthy - Your debt level is comfortable and you have good borrowing capacity.</div>';
  } else if (ratio < 50) {
    bar.className = 'progress-fill orange';
    dtiEl.className = 'result-value orange';
    statusHTML = '<div class="badge badge-warning">&#9888; Moderate - Your debt is manageable but there\'s room for improvement.</div>';
  } else {
    bar.className = 'progress-fill red';
    dtiEl.className = 'result-value red';
    statusHTML = '<div class="badge badge-danger">&#9888; High - Consider reducing your debt obligations before taking on new credit.</div>';
  }
  document.getElementById('dtiStatus').innerHTML = statusHTML;

  const results = document.getElementById('dtiResults');
  results.style.display = 'block';
  results.classList.add('fade-in');
}
