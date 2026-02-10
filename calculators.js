
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

// --- Global Currency Logic ---
function getGlobalCurrency() {
    return localStorage.getItem('user_currency_symbol') || '₹';
}

function setGlobalCurrency(symbol) {
    localStorage.setItem('user_currency_symbol', symbol);
    // Update all UI elements on the current page
    document.querySelectorAll('.res-symbol').forEach(el => el.innerText = symbol);
    // Sync dropdown if it exists
    const select = document.getElementById('global-currency-select');
    if (select) select.value = symbol;
    // Notify the specific calculator logic to refresh results
    window.dispatchEvent(new CustomEvent('currencyChange', { detail: symbol }));
}

/**
 * Injects the currency selector if it's missing from a calculator page.
 * Standardizes placement above the calculator grid.
 */
function injectCurrencySelector() {
    if (document.getElementById('global-currency-select')) return;
    const grid = document.querySelector('.calculator-grid');
    if (!grid) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'flex justify-end mb-4';
    wrapper.innerHTML = `
        <div class="relative inline-block text-left">
            <select id="global-currency-select" onchange="setGlobalCurrency(this.value)" class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8 cursor-pointer shadow-sm">
                <option value="₹">INR (₹)</option>
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
                <option value="£">GBP (£)</option>
                <option value="د.إ">AED (د.إ)</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                <svg class="h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
        </div>
    `;
    grid.parentNode.insertBefore(wrapper, grid);
}

function initCalculators() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // 1. Render Navbar Dropdown (Grouped by Category)
    const navList = document.getElementById('nav-dropdown-list');
    if (navList) {
        let navHtml = '';
        CATEGORY_ORDER.forEach(catName => {
            const catCalcs = CALCULATORS.filter(c => c.category === catName);
            if (catCalcs.length > 0) {
                navHtml += `<div class="px-3 py-2 mt-1 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50/50 dark:bg-slate-800/30 first:mt-0">${catName} Calculators</div>`;
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

    // 3. Render Related Links (Grouped)
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

    // 4. Initialize Global Currency selector and Symbol
    injectCurrencySelector();
    setTimeout(() => {
        const symbol = getGlobalCurrency();
        setGlobalCurrency(symbol);
    }, 0);
}

document.addEventListener('DOMContentLoaded', initCalculators);
