// CPF contribution rates based on age and citizenship
const CPF_RATES = {
  sc: {
    '55below':  { employee: 0.20, employer: 0.17, oa: 0.2308, sa: 0.0615, ma: 0.0808 },
    '55to60':   { employee: 0.15, employer: 0.15, oa: 0.1693, sa: 0.0427, ma: 0.1067 },
    '60to65':   { employee: 0.095, employer: 0.115, oa: 0.0399, sa: 0.0257, ma: 0.1068 },
    '65to70':   { employee: 0.075, employer: 0.09, oa: 0.0150, sa: 0.0200, ma: 0.1068 },
    '70above':  { employee: 0.05, employer: 0.075, oa: 0.0100, sa: 0.0100, ma: 0.1068 }
  },
  pr3: {
    '55below':  { employee: 0.20, employer: 0.17, oa: 0.2308, sa: 0.0615, ma: 0.0808 },
    '55to60':   { employee: 0.15, employer: 0.15, oa: 0.1693, sa: 0.0427, ma: 0.1067 },
    '60to65':   { employee: 0.095, employer: 0.115, oa: 0.0399, sa: 0.0257, ma: 0.1068 },
    '65to70':   { employee: 0.075, employer: 0.09, oa: 0.0150, sa: 0.0200, ma: 0.1068 },
    '70above':  { employee: 0.05, employer: 0.075, oa: 0.0100, sa: 0.0100, ma: 0.1068 }
  },
  pr2: {
    '55below':  { employee: 0.15, employer: 0.17, oa: 0.2192, sa: 0.0308, ma: 0.0692 },
    '55to60':   { employee: 0.125, employer: 0.14, oa: 0.1538, sa: 0.0192, ma: 0.0923 },
    '60to65':   { employee: 0.075, employer: 0.105, oa: 0.0321, sa: 0.0107, ma: 0.0929 },
    '65to70':   { employee: 0.05, employer: 0.085, oa: 0.0107, sa: 0.0107, ma: 0.0929 },
    '70above':  { employee: 0.05, employer: 0.075, oa: 0.0100, sa: 0.0100, ma: 0.0929 }
  },
  pr1: {
    '55below':  { employee: 0.05, employer: 0.04, oa: 0.0615, sa: 0.0154, ma: 0.0154 },
    '55to60':   { employee: 0.05, employer: 0.04, oa: 0.0462, sa: 0.0077, ma: 0.0385 },
    '60to65':   { employee: 0.05, employer: 0.04, oa: 0.0154, sa: 0.0077, ma: 0.0385 },
    '65to70':   { employee: 0.05, employer: 0.04, oa: 0.0077, sa: 0.0077, ma: 0.0385 },
    '70above':  { employee: 0.05, employer: 0.04, oa: 0.0077, sa: 0.0077, ma: 0.0385 }
  }
};

const OW_CEILING = 6800;

function calculateCPF() {
  clearErrors();
  if (!validateField(document.getElementById('cpfSalary'), 1, 1000000)) return;

  const salary = getVal('cpfSalary');
  const ageGroup = document.getElementById('cpfAge').value;
  const citizenship = document.getElementById('cpfCitizen').value;
  const rates = CPF_RATES[citizenship][ageGroup];

  const cappedSalary = Math.min(salary, OW_CEILING);
  const employeeContrib = Math.round(cappedSalary * rates.employee * 100) / 100;
  const employerContrib = Math.round(cappedSalary * rates.employer * 100) / 100;
  const totalCPF = employeeContrib + employerContrib;
  const takeHome = salary - employeeContrib;

  const oaAlloc = Math.round(totalCPF * rates.oa / (rates.oa + rates.sa + rates.ma) * 100) / 100;
  const saAlloc = Math.round(totalCPF * rates.sa / (rates.oa + rates.sa + rates.ma) * 100) / 100;
  const maAlloc = Math.round((totalCPF - oaAlloc - saAlloc) * 100) / 100;

  document.getElementById('resEmployee').textContent = formatCurrency(employeeContrib);
  document.getElementById('resEmployer').textContent = formatCurrency(employerContrib);
  document.getElementById('resTotalCPF').textContent = formatCurrency(totalCPF);
  document.getElementById('resTakeHome').textContent = formatCurrency(takeHome);
  document.getElementById('resOA').textContent = formatCurrency(oaAlloc);
  document.getElementById('resSA').textContent = formatCurrency(saAlloc);
  document.getElementById('resMA').textContent = formatCurrency(maAlloc);

  const results = document.getElementById('cpfResults');
  results.style.display = 'block';
  results.classList.add('fade-in');

  drawPieChart('cpfChart', [
    { label: 'OA', value: oaAlloc },
    { label: 'SA', value: saAlloc },
    { label: 'MA', value: maAlloc }
  ], ['#667eea', '#f59e0b', '#22c55e']);

  document.getElementById('cpfLegend').innerHTML = `
    <div class="legend-item"><span class="legend-dot" style="background:#667eea"></span>OA: ${formatCurrency(oaAlloc)}</div>
    <div class="legend-item"><span class="legend-dot" style="background:#f59e0b"></span>SA: ${formatCurrency(saAlloc)}</div>
    <div class="legend-item"><span class="legend-dot" style="background:#22c55e"></span>MA: ${formatCurrency(maAlloc)}</div>
  `;
}
