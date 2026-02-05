
const CALCULATORS = [
    { 
        name: "Fuel Cost Comparison", 
        url: "fuel-comparison-calculator.html", 
        desc: "Compare Petrol, Diesel, CNG, and EV ownership costs side-by-side.", 
        color: "red", 
        cta: "Compare Costs",
        category: "Automobile"
    },
    { 
        name: "Running Cost Per KM", 
        url: "car-running-cost-per-km-calculator.html", 
        desc: "Calculate cost per km (₹/km) for Petrol, Diesel, CNG, and Electric cars.", 
        color: "blue", 
        cta: "Check Running Cost",
        category: "Automobile"
    },
    { 
        name: "CNG Mileage Calculator", 
        url: "cng-mileage-calculator.html", 
        desc: "Calculate km per kg and monthly fuel expenses based on real usage.", 
        color: "emerald", 
        cta: "Calculate Mileage",
        category: "Automobile"
    },
    { 
        name: "Interest Calculator", 
        url: "simple-interest-calculator.html", 
        desc: "Compare Simple and Compound interest returns to forecast investment growth.", 
        color: "emerald", 
        cta: "Maturity Calculator",
        category: "Finance"
    },
    { 
        name: "Profit Margin", 
        url: "profit-margin-calculator.html", 
        desc: "Determine unit profitability, markups, and bulk sales margins for business.", 
        color: "indigo", 
        cta: "Analyze Margins",
        category: "Finance"
    },
    { 
        name: "Discount Calculator", 
        url: "discount-calculator.html", 
        desc: "Calculate final prices, savings, and stackable rebates for retail shopping.", 
        color: "blue", 
        cta: "Calculate Discounts",
        category: "Finance"
    },
    { 
        name: "GST Calculator India", 
        url: "gst-calculator.html", 
        desc: "Accurately add or remove tax with detailed splits for CGST, SGST, and IGST.", 
        color: "orange", 
        cta: "Calculate GST Online",
        category: "Tax"
    }
];

const CATEGORY_ORDER = ["Automobile", "Finance", "Tax"];

function initCalculators() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // 1. Render Navbar Dropdown (Grouped by Category)
    const navList = document.getElementById('nav-dropdown-list');
    if (navList) {
        let navHtml = '';
        CATEGORY_ORDER.forEach(catName => {
            const catCalcs = CALCULATORS.filter(c => c.category === catName);
            if (catCalcs.length > 0) {
                // Category Heading
                navHtml += `<div class="px-3 py-2 mt-1 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50/50 dark:bg-slate-800/30 first:mt-0">${catName} Calculators</div>`;
                // Category Items
                navHtml += catCalcs.map(calc => `
                    <a href="${calc.url}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors group">
                        <span class="text-xs font-bold ${calc.url === currentPage ? 'text-' + calc.color + '-600' : 'text-slate-700 dark:text-slate-300'} group-hover:text-${calc.color}-600">${calc.name}</span>
                    </a>
                `).join('');
            }
        });
        navList.innerHTML = navHtml;
    }

    // 2. Render Home Grid (Visual Cards)
    const homeGrid = document.getElementById('home-calc-grid');
    if (homeGrid) {
        homeGrid.innerHTML = CALCULATORS.map(calc => `
            <a href="${calc.url}" class="nav-card bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col group dark:bg-slate-900 dark:border-slate-800">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white">${calc.name}</h3>
                    <span class="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full">${calc.category}</span>
                </div>
                <p class="text-slate-500 mb-6 flex-grow text-sm dark:text-slate-400">${calc.desc}</p>
                <span class="text-${calc.color}-600 font-bold text-[10px] uppercase tracking-widest flex items-center dark:text-${calc.color}-400">
                    ${calc.cta} &rarr;
                </span>
            </a>
        `).join('');
    }

    // 3. Render Related Links (Grouped - for calculator pages)
    const relatedLinks = document.getElementById('related-calc-links');
    if (relatedLinks) {
        let relatedHtml = '';
        CATEGORY_ORDER.forEach(catName => {
            const catCalcs = CALCULATORS.filter(c => c.category === catName && c.url !== currentPage);
            if (catCalcs.length > 0) {
                relatedHtml += `
                    <div class="col-span-full mt-6 first:mt-0">
                        <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">${catName} Tools</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${catCalcs.map(calc => `
                                <li class="list-none">
                                    <a href="${calc.url}" class="text-${calc.color}-600 font-bold hover:underline">${calc.name}</a>
                                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${calc.desc}</p>
                                </li>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
        });
        relatedLinks.innerHTML = relatedHtml;
    }
}

document.addEventListener('DOMContentLoaded', initCalculators);
