<div align="center">

# NovaFinance

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222?style=for-the-badge&logo=githubpages&logoColor=white)](https://alfredang.github.io/novafinance/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Smart financial calculators built for Singapore — loans, CPF, investments, retirement, and more.**

[Live Demo](https://alfredang.github.io/novafinance/) · [Report Bug](https://github.com/alfredang/novafinance/issues) · [Request Feature](https://github.com/alfredang/novafinance/issues)

</div>

## Screenshot

![Screenshot](screenshot.png)

## About

NovaFinance is a comprehensive suite of financial calculators tailored for Singapore residents. It provides instant, accurate calculations for everyday financial planning — from CPF contributions to mortgage affordability.

### Key Features

- **Loan Calculator** — Monthly repayments, total interest, and amortisation schedules
- **Mortgage Calculator** — Property loan calculations with down payment breakdown
- **CPF Calculator** — Employee & employer CPF contributions based on Singapore's latest rates
- **Savings Calculator** — Compound interest projections for regular savings
- **Investment Calculator** — Long-term investment growth modelling
- **Budget Planner** — Income, expenses, and savings tracking with visual breakdowns
- **Retirement Calculator** — Estimate your retirement readiness
- **Emergency Fund** — Calculate your safety net requirements
- **Debt-to-Income Ratio** — Assess borrowing capacity
- **Affordability Calculator** — Property and loan affordability checks
- **Bonus Tools** — GST calculator, tax estimator, net worth tracker, currency converter

## Tech Stack

| Category | Technology |
|----------|------------|
| Markup | HTML5 |
| Styling | CSS3 (Custom Properties, Flexbox, Grid) |
| Logic | Vanilla JavaScript (ES6+) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

## Architecture

```
┌─────────────────────────────────────┐
│            Browser (Client)         │
├─────────────────────────────────────┤
│   HTML Pages (12 calculators)       │
│         ↓           ↓               │
│   css/style.css   js/*.js           │
│   (Theming &      (Calculator       │
│    Layout)         Logic)           │
├─────────────────────────────────────┤
│         GitHub Pages CDN            │
└─────────────────────────────────────┘
```

## Project Structure

```
novafinance/
├── index.html              # Landing page
├── loan.html               # Loan calculator
├── mortgage.html           # Mortgage calculator
├── cpf.html                # CPF calculator
├── savings.html            # Savings calculator
├── investment.html         # Investment calculator
├── budget.html             # Budget planner
├── retirement.html         # Retirement calculator
├── emergency.html          # Emergency fund calculator
├── dti.html                # Debt-to-income ratio
├── affordability.html      # Affordability calculator
├── tools.html              # Additional tools
├── css/
│   └── style.css           # Global styles & theming
├── js/
│   ├── main.js             # Shared utilities & nav
│   ├── loan.js             # Loan calculator logic
│   ├── mortgage.js         # Mortgage calculator logic
│   ├── cpf.js              # CPF calculator logic
│   ├── savings.js          # Savings calculator logic
│   ├── investment.js       # Investment calculator logic
│   ├── budget.js           # Budget planner logic
│   ├── retirement.js       # Retirement calculator logic
│   ├── emergency.js        # Emergency fund logic
│   ├── dti.js              # DTI calculator logic
│   ├── affordability.js    # Affordability logic
│   └── tools.js            # Additional tools logic
└── .github/
    └── workflows/
        └── deploy-pages.yml  # GitHub Pages CI/CD
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/alfredang/novafinance.git
   cd novafinance
   ```

2. Open `index.html` in your browser — no build step required.

### Development

Since this is a static site, you can use any local server:

```bash
# Python
python3 -m http.server 8000

# Node.js (npx)
npx serve .
```

## Deployment

The site auto-deploys to GitHub Pages on every push to `main` via GitHub Actions.

To deploy your own fork:

1. Fork this repository
2. Go to **Settings → Pages → Source → GitHub Actions**
3. Push to `main` — the workflow handles the rest

Live URL: `https://<your-username>.github.io/novafinance/`

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Developed By

**[Tertiary Infotech Academy Pte. Ltd.](https://www.tertiarycourses.com.sg/)**

## Acknowledgements

- [Google Fonts — Inter](https://fonts.google.com/specimen/Inter)
- [Shields.io](https://shields.io/) for badges
- Singapore CPF Board for contribution rate references

---

<div align="center">

If you find this useful, please give it a ⭐!

</div>
