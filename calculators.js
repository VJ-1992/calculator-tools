
const CALCULATORS = [
    { 
        name: "Running Cost Per KM", 
        url: "car-running-cost-per-km-calculator.html", 
        desc: "Calculate cost per km (₹/km) for Petrol, Diesel, CNG, and Electric cars.", 
        color: "blue", 
        cta: "Check Running Cost" 
    },
    { 
        name: "CNG Mileage Calculator", 
        url: "cng-mileage-calculator.html", 
        desc: "Calculate km per kg and monthly fuel expenses based on real usage.", 
        color: "emerald", 
        cta: "Calculate Mileage" 
    },
    { 
        name: "Discount Calculator", 
        url: "discount-calculator.html", 
        desc: "Calculate final prices, savings, and stackable rebates for retail shopping.", 
        color: "blue", 
        cta: "Calculate Discounts" 
    },
    { 
        name: "GST Calculator India", 
        url: "gst-calculator.html", 
        desc: "Accurately add or remove tax with detailed splits for CGST, SGST, and IGST.", 
        color: "orange", 
        cta: "Calculate GST Online" 
    },
    { 
        name: "Interest Calculator", 
        url: "simple-interest-calculator.html", 
        desc: "Compare Simple and Compound interest returns to forecast investment growth.", 
        color: "emerald", 
        cta: "Maturity Calculator" 
    },
    { 
        name: "Profit Margin", 
        url: "profit-margin-calculator.html", 
        desc: "Determine unit profitability, markups, and bulk sales margins for business.", 
        color: "indigo", 
        cta: "Analyze Margins" 
    },
    { 
        name: "Fuel Cost Comparison", 
        url: "fuel-comparison-calculator.html", 
        desc: "Compare Petrol, Diesel, CNG, and EV ownership costs side-by-side.", 
        color: "red", 
        cta: "Compare Costs" 
    }
];

function initCalculators() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // 1. Render Navbar Dropdown
    const navList = document.getElementById('nav-dropdown-list');
    if (navList) {
        navList.innerHTML = CALCULATORS.map(calc => `
            <a href="${calc.url}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors group">
                <span class="text-xs font-bold ${calc.url === currentPage ? 'text-' + calc.color + '-600' : 'text-slate-700 dark:text-slate-300'} group-hover:text-${calc.color}-600">${calc.name}</span>
            </a>
        `).join('');
    }

    // 2. Render Home Grid
    const homeGrid = document.getElementById('home-calc-grid');
    if (homeGrid) {
        homeGrid.innerHTML = CALCULATORS.map(calc => `
            <a href="${calc.url}" class="nav-card bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col group dark:bg-slate-900 dark:border-slate-800">
                <h3 class="text-xl font-bold mb-2 text-slate-900 dark:text-white">${calc.name}</h3>
                <p class="text-slate-500 mb-6 flex-grow text-sm dark:text-slate-400">${calc.desc}</p>
                <span class="text-${calc.color}-600 font-bold text-[10px] uppercase tracking-widest flex items-center dark:text-${calc.color}-400">
                    ${calc.cta} &rarr;
                </span>
            </a>
        `).join('');
    }

    // 3. Render Related Links (for calculator pages)
    const relatedLinks = document.getElementById('related-calc-links');
    if (relatedLinks) {
        relatedLinks.innerHTML = CALCULATORS
            .filter(calc => calc.url !== currentPage)
            .map(calc => `
                <li>
                    <a href="${calc.url}" class="text-${calc.color}-600 font-bold hover:underline">${calc.name}</a>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${calc.desc}</p>
                </li>
            `).join('');
    }
}

document.addEventListener('DOMContentLoaded', initCalculators);
