// Simple Interest Calculator
function calcSimpleInterest() {
  clearErrors();
  const v1 = validateField(document.getElementById('siPrincipal'), 1, 100000000);
  const v2 = validateField(document.getElementById('siRate'), 0.01, 100);
  const v3 = validateField(document.getElementById('siYears'), 0.1, 100);
  if (!v1 || !v2 || !v3) return;

  const P = getVal('siPrincipal');
  const r = getVal('siRate') / 100;
  const t = getVal('siYears');
  const interest = P * r * t;
  const total = P + interest;

  document.getElementById('siInterest').textContent = formatCurrency(interest);
  document.getElementById('siTotal').textContent = formatCurrency(total);
  document.getElementById('siResults').hidden = false;
}

// Credit Card Interest Calculator
function calcCreditCard() {
  clearErrors();
  const v1 = validateField(document.getElementById('ccBalance'), 1, 10000000);
  const v2 = validateField(document.getElementById('ccRate'), 0.01, 100);
  const v3 = validateField(document.getElementById('ccPayment'), 1, 10000000);
  if (!v1 || !v2 || !v3) return;

  let balance = getVal('ccBalance');
  const annualRate = getVal('ccRate');
  const payment = getVal('ccPayment');
  const monthlyRate = annualRate / 100 / 12;

  // Check if payment covers at least the monthly interest
  if (payment <= balance * monthlyRate) {
    const group = document.getElementById('ccPayment').closest('.form-group');
    group.classList.add('has-error');
    group.querySelector('.error-msg').textContent = 'Payment too low to cover interest. Increase your monthly payment.';
    return;
  }

  let months = 0;
  let totalPaid = 0;
  let remaining = balance;

  while (remaining > 0 && months < 600) {
    const interest = remaining * monthlyRate;
    const pay = Math.min(payment, remaining + interest);
    remaining = remaining + interest - pay;
    totalPaid += pay;
    months++;
  }

  const totalInterest = totalPaid - balance;

  document.getElementById('ccMonths').textContent = months + ' months';
  document.getElementById('ccInterest').textContent = formatCurrency(totalInterest);
  document.getElementById('ccTotal').textContent = formatCurrency(totalPaid);
  document.getElementById('ccResults').hidden = false;
}

// GST Calculator (Singapore 9%)
function calcGST() {
  clearErrors();
  if (!validateField(document.getElementById('gstAmount'), 0.01, 100000000)) return;

  const amount = getVal('gstAmount');
  const type = document.getElementById('gstType').value;
  const GST_RATE = 0.09;

  let before, gst, after;
  if (type === 'add') {
    before = amount;
    gst = amount * GST_RATE;
    after = amount + gst;
  } else {
    after = amount;
    before = amount / (1 + GST_RATE);
    gst = after - before;
  }

  document.getElementById('gstBefore').textContent = formatCurrency(before);
  document.getElementById('gstTax').textContent = formatCurrency(gst);
  document.getElementById('gstAfter').textContent = formatCurrency(after);
  document.getElementById('gstResults').hidden = false;
}

// Singapore Income Tax Estimator (YA2024 rates)
function calcIncomeTax() {
  clearErrors();
  if (!validateField(document.getElementById('taxIncome'), 0, 100000000)) return;

  const income = getVal('taxIncome');

  // Singapore progressive tax brackets (YA2024)
  const brackets = [
    { limit: 20000, rate: 0 },
    { limit: 30000, rate: 0.02 },
    { limit: 40000, rate: 0.035 },
    { limit: 80000, rate: 0.07 },
    { limit: 120000, rate: 0.115 },
    { limit: 160000, rate: 0.15 },
    { limit: 200000, rate: 0.18 },
    { limit: 240000, rate: 0.19 },
    { limit: 280000, rate: 0.195 },
    { limit: 320000, rate: 0.20 },
    { limit: 500000, rate: 0.22 },
    { limit: 1000000, rate: 0.23 },
    { limit: Infinity, rate: 0.24 }
  ];

  let tax = 0;
  let prev = 0;
  for (const bracket of brackets) {
    if (income <= prev) break;
    const taxable = Math.min(income, bracket.limit) - prev;
    tax += taxable * bracket.rate;
    prev = bracket.limit;
  }

  const effectiveRate = income > 0 ? (tax / income) * 100 : 0;
  const afterTax = income - tax;

  document.getElementById('taxAmount').textContent = formatCurrency(tax);
  document.getElementById('taxEffRate').textContent = effectiveRate.toFixed(2) + '%';
  document.getElementById('taxAfter').textContent = formatCurrency(afterTax);
  document.getElementById('taxResults').hidden = false;
}

// Currency Converter
function calcCurrency() {
  clearErrors();
  if (!validateField(document.getElementById('fxAmount'), 0.01, 100000000)) return;

  const sgd = getVal('fxAmount');
  const rate = parseFloat(document.getElementById('fxCurrency').value);
  const converted = sgd * rate;
  const currName = document.getElementById('fxCurrency').selectedOptions[0].text;

  document.getElementById('fxSGD').textContent = formatCurrency(sgd);
  document.getElementById('fxConverted').textContent = formatNumber(converted, 2) + ' ' + currName.split(' ')[0];
  document.getElementById('fxRate').textContent = '1 SGD = ' + rate;
  document.getElementById('fxResults').hidden = false;
}

// Net Worth Calculator
function calcNetWorth() {
  const cash = getVal('nwCash');
  const invest = getVal('nwInvest');
  const cpf = getVal('nwCPF');
  const property = getVal('nwProperty');
  const other = getVal('nwOther');
  const mortgage = getVal('nwMortgage');
  const carLoan = getVal('nwCarLoan');
  const debt = getVal('nwDebt');

  const totalAssets = cash + invest + cpf + property + other;
  const totalLiabilities = mortgage + carLoan + debt;
  const netWorth = totalAssets - totalLiabilities;

  document.getElementById('nwAssets').textContent = formatCurrency(totalAssets);
  document.getElementById('nwLiabilities').textContent = formatCurrency(totalLiabilities);
  const nwEl = document.getElementById('nwTotal');
  nwEl.textContent = formatCurrency(netWorth);
  nwEl.className = 'result-value ' + (netWorth >= 0 ? 'green' : 'red');
  document.getElementById('nwResults').hidden = false;
}

// Break-even Calculator
function calcBreakeven() {
  clearErrors();
  const v1 = validateField(document.getElementById('beFixed'), 0, 100000000);
  const v2 = validateField(document.getElementById('bePrice'), 0.01, 10000000);
  const v3 = validateField(document.getElementById('beCost'), 0, 10000000);
  if (!v1 || !v2 || !v3) return;

  const fixed = getVal('beFixed');
  const price = getVal('bePrice');
  const cost = getVal('beCost');

  if (price <= cost) {
    const group = document.getElementById('bePrice').closest('.form-group');
    group.classList.add('has-error');
    group.querySelector('.error-msg').textContent = 'Price must be greater than variable cost';
    return;
  }

  const margin = price - cost;
  const units = Math.ceil(fixed / margin);
  const revenue = units * price;

  document.getElementById('beUnits').textContent = formatNumber(units, 0) + ' units';
  document.getElementById('beRevenue').textContent = formatCurrency(revenue);
  document.getElementById('beMargin').textContent = formatCurrency(margin) + '/unit';
  document.getElementById('beResults').hidden = false;
}

// Monthly Expense Tracker
function calcExpenses() {
  const inputs = document.querySelectorAll('.expense-input');
  let total = 0;
  inputs.forEach(input => {
    total += parseFloat(input.value) || 0;
  });

  document.getElementById('expTotal').textContent = formatCurrency(total);
  document.getElementById('expDaily').textContent = formatCurrency(total / 30);
  document.getElementById('expAnnual').textContent = formatCurrency(total * 12);
  document.getElementById('expResults').hidden = false;
}

// Education Loan Calculator
function calcEduLoan() {
  clearErrors();
  const v1 = validateField(document.getElementById('eduLoan'), 1, 10000000);
  const v2 = validateField(document.getElementById('eduRate'), 0, 100);
  const v3 = validateField(document.getElementById('eduYears'), 1, 30);
  if (!v1 || !v2 || !v3) return;

  const P = getVal('eduLoan');
  const annualRate = getVal('eduRate');
  const years = getVal('eduYears');
  const r = annualRate / 100 / 12;
  const n = years * 12;

  let monthly;
  if (r === 0) {
    monthly = P / n;
  } else {
    monthly = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalRepay = monthly * n;
  const totalInterest = totalRepay - P;

  document.getElementById('eduMonthly').textContent = formatCurrency(monthly);
  document.getElementById('eduTotal').textContent = formatCurrency(totalRepay);
  document.getElementById('eduInterest').textContent = formatCurrency(totalInterest);
  document.getElementById('eduResults').hidden = false;
}
