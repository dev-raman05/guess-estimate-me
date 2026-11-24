window.GM_DATA = window.GM_DATA || {};
window.GM_DATA.problems = window.GM_DATA.problems || [];

window.GM_DATA.problems.push(
  {
    id: 'vol2-refrigerator-india',
    title: 'Market Size of the Indian Refrigerator Industry',
    prompt: 'Estimate the annual market size (units & revenue) of the Indian refrigerator industry.',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Replacement & Stock-Flow',
    templateId: 'tpl-durable',
    tags: ['Appliances', 'Durable Goods', 'Replacement Cycle'],
    clarifyingQuestions: [
      { q: 'Residential household refrigerators only, or commercial/industrial deep freezers too?', a: 'Residential household refrigerators only (~85–90% of unit volume).', why: 'Ties cleanly to household count.' },
      { q: 'Are we estimating annual unit sales or annual ₹ revenue?', a: 'Annual unit sales and revenue.', why: 'Durable goods require lifespan division!' }
    ],
    strategyOverview: 'Classic Durable Goods Stock + Replacement Model! Convert India’s 1.4B population into Households (÷ 4 = 350M households). Segment by City Tier: Tier 1 (20% = 70M HH), Tier 2 (50% = 175M HH), Tier 3/Rural (30% = 105M HH). Apply Penetration Rates (80%, 60%, 30%) → Total Stock = 192.5M refrigerators. Divide by 7-year average lifespan = 27.5M annual replacement units × ₹25,000 avg price = ₹68,750 Crore!',
    formula: 'Annual Market Size = (Total Installed Households Stock ÷ Avg Lifespan) × Avg Refrigerator Price',
    assumptions: [
      { label: 'India Pop = 1.4B; Avg Family Size = 4 → 350M Households', rationale: '1 fridge per owning household.' },
      { label: 'Tier Segmentation: Tier 1 (20% @ 80% pen = 56M), Tier 2 (50% @ 60% = 105M), Tier 3/Rural (30% @ 30% = 31.5M)', rationale: 'Total installed base = 192.5M refrigerators (~55% household penetration).' },
      { label: 'Lifespan = 7 years (replacement ≈ 27.5M/yr) | Avg Price = ₹25,000', rationale: 'Unit check: avoid writing "₹68,750 Million" (₹6,875 Cr), whereas 27.5M × ₹25,000 = ₹6,87,500 Million = ₹68,750 Crore! Catching that 10x decimal slip is super helpful!' }
    ],
    tree: {
      label: 'India Households (1.4B ÷ 4 = 350M)',
      valueText: '350M HH',
      children: [
        { label: 'Tier 1 (20% = 70M HH) × 80% pen', valueText: '56M fridges' },
        { label: 'Tier 2 (50% = 175M HH) × 60% pen', valueText: '105M fridges', highlight: true },
        { label: 'Tier 3 / Rural (30% = 105M HH) × 30% pen', valueText: '31.5M fridges' },
        {
          label: 'Total Stock = 192.5M ÷ 7 Yr Lifespan',
          valueText: '27.5M Units/Yr',
          children: [
            { label: '× ₹25,000 Avg Price', valueText: '₹68,750 Crore/Yr (Unit check: ₹68,750M)', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~1.5 – 2.75 Crore Units/year (~₹35,000 – ₹68,750 Crore/year)',
    acceptableRange: { min: 25000, max: 80000, unit: '₹ Crore/year', display: '₹25,000 Cr – ₹80,000 Cr/yr' },
    sanityCheck: 'Real Indian refrigerator industry sells ~1.5–1.8 Crore units/year (~₹35,000–45,000 Cr) because real India household fridge penetration is ~38–40% (13–14 Cr units ÷ 9–10 yr lifespan ≈ 1.4 Cr replacement + ~30L first-time buyers)! In the unadjusted baseline, 27.5M × ₹25,000 = ₹68,750 Crore (687.5B), NOT ₹68,750 Million (68.7B). Always multiply Millions × Thousands carefully!',
    interviewerTrap: 'Multiplying 27.5 Million × ₹25,000 and accidentally writing "68,750 Million" instead of "687,500 Million (₹68,750 Crore)"! Shortcut: 27.5M × 25K = 27.5 × 25 × 10⁹ = 687.5 Billion!',
    variations: [
      { question: 'What if we add first-time refrigerator buyers from unpenetrated Tier-2/3 homes?', hint: '157.5M unpenetrated households × ~3% annual new adoption ≈ +4.7M extra units/yr!' },
      { question: 'Estimate the market size of washing machines in India.', hint: 'Lower penetration (~20–25% urban-skewed) + ~8-yr lifespan + ₹20,000 avg price.' }
    ],
    guidedPractice: {
      correctApproach: 'Stock & Replacement',
      funnelOptions: [
        { label: 'Pop ÷ HH Size → Tier/Urban Penetration → Installed Fridge Stock ÷ Avg Lifespan (+ First-Time Buyers) × Price', correct: true, feedback: 'Spot on! Refrigerators are durable household assets—never forget lifespan division!' },
        { label: 'India Population × 30% × ₹25,000', correct: false, feedback: 'Individuals don’t buy their own fridges—households share them, and not every year!' },
        { label: 'Appliance Stores in India × 100', correct: false, feedback: 'Hard to anchor store count nationwide cleanly.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'hhM', label: 'Total Households (M)', defaultVal: 320, min: 280, max: 360, step: 10, unit: 'M' },
        { key: 'penPct', label: 'Household Penetration %', defaultVal: 42, min: 25, max: 65, step: 2, unit: '%' },
        { key: 'life', label: 'Avg Lifespan (Years)', defaultVal: 8, min: 5, max: 12, step: 1, unit: 'yrs' },
        { key: 'newBuyM', label: 'First-Time New Buyers (M/yr)', defaultVal: 3.0, min: 1.0, max: 6.0, step: 0.5, unit: 'M' },
        { key: 'priceK', label: 'Avg Price (₹K)', defaultVal: 24, min: 15, max: 35, step: 1, unit: '₹K' }
      ],
      computeFormulaText: '[(HH × Penetration% ÷ Lifespan) + First-Time Buyers] × Avg Price',
      compute: (v) => {
        const unitsM = (v.hhM * (v.penPct / 100)) / v.life + v.newBuyM;
        const revCr = (unitsM * 1e6 * v.priceK * 1000) / 1e7;
        return {
          value: revCr,
          formatted: `₹${Math.round(revCr).toLocaleString('en-IN')} Crore/Yr`,
          breakdown: [
            { label: 'Annual Units Sold', val: `${unitsM.toFixed(1)} Million units` },
            { label: 'Installed Base', val: `${(v.hhM * v.penPct / 100).toFixed(1)}M fridges` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-wheat-india',
    title: 'Consumption of Wheat in India Per Month',
    prompt: 'Estimate the total consumption of wheat (in kg / tonnes) in India per month.',
    difficulty: 3,
    archetype: 'Usage & Behavioral',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Agriculture', 'Food Staples', 'Regional Split'],
    clarifyingQuestions: [
      { q: 'Are we estimating direct human household/restaurant food consumption (atta/roti/bread), or livestock feed too?', a: 'Human consumption primarily (roti/chapati as primary proxy).', why: 'Roti accounts for ~85% of human wheat consumption in India.' },
      { q: 'Do we factor in regional dietary differences (North vs South/East)?', a: 'Yes! Critical in India since South/East eat rice-heavy diets while North/West eat wheat-heavy diets.', why: 'Shows genuine cultural/regional awareness.' }
    ],
    strategyOverview: 'Regional Diet Top-Down Funnel! Split India’s 1.4B population equally (33% = 462M each) into High Wheat States (North/Central/West: 2.5 roti-meals/day), Medium Wheat States (1.5 roti-meals/day), and Low Wheat/Rice-Heavy States (South/East/NE: 0.5 roti-meals/day). Multiply by ~2 rotis/meal × 40g (0.04 kg) flour per roti × 30 days/month!',
    formula: 'Monthly Wheat (kg) = ∑ [Regional Pop × Roti Meals/Day × Rotis/Meal × Wheat kg/Roti] × 30 Days',
    assumptions: [
      { label: 'Regional Split (1.4B ÷ 3 = ~462M each): High (2.5 meals/day), Medium (1.5), Low (0.5)', rationale: 'North eats rotis at almost every meal; South eats rice/idli/dosa primarily.' },
      { label: 'Average Rotis per Roti-Meal = 2 rotis (adjusting infants & heavy eaters); Wheat per Roti = 40g (0.04 kg)', rationale: '1 kg atta makes ~25 average chapatis!' },
      { label: 'Daily Total = 92.4M + 55.44M + 18.48M = 166.32M kg/day × 30 days = 4.98 Billion kg/month (~5M tonnes/mo)', rationale: 'Note: Adding non-roti wheat (bread/biscuits/maida/noodles ~15%) brings it to ~5.7–6M tonnes/month.' }
    ],
    tree: {
      label: 'India Population (1.4B) → Regional Diet Split',
      valueText: '1,400M',
      children: [
        { label: 'High Wheat States (462M × 2.5 meals × 2 rotis × 0.04kg)', valueText: '92.4M kg/day', highlight: true },
        { label: 'Medium Wheat States (462M × 1.5 × 2 × 0.04kg)', valueText: '55.44M kg/day' },
        { label: 'Low Wheat / Rice States (462M × 0.5 × 2 × 0.04kg)', valueText: '18.48M kg/day' },
        { label: 'Total Daily (166.3M kg) × 30 Days', valueText: '4.98 Billion kg/Month (~5M Tonnes)', highlight: true }
      ]
    },
    finalAnswer: '~5 to 7 Billion kg / month (5 – 7 Million Tonnes/Month)',
    acceptableRange: { min: 4, max: 10, unit: 'Billion kg/month', display: '4B – 10B kg/month (4M – 10M tonnes)' },
    sanityCheck: '5 Billion kg/month × 12 months = 60 Million Tonnes/year! India produces ~105–110 Million Tonnes of wheat annually (of which ~80–90MT goes to domestic food/processing + ~15–20MT to seed/feed/exports/wastage). Adding bread/bakery/wastage (~25–30%) lands us right on ~75–80MT/year! Outstanding accuracy.',
    interviewerTrap: 'Assuming all 1.4B Indians eat 6 rotis every day (ignoring South & East India’s rice preference) OR misjudging flour weight per roti (saying 200g per roti instead of 35–40g)!',
    variations: [
      { question: 'Estimate monthly rice consumption in India.', hint: 'Flip the regional weights: Low-wheat (South/East) become High-rice (2.5 meals/day × ~100g dry rice)! ≈ ~8–9 Billion kg/month.' },
      { question: 'Estimate the retail market size of packaged atta (e.g., Aashirvaad) in India.', hint: 'Filter to Urban (35%) × Packaged Share (~35–40%) × ₹45/kg!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Population → Regional Wheat vs Rice Split → Meals with Roti/Day × Rotis/Meal × 40g/Roti × 30', correct: true, feedback: 'Spot on! Regional dietary segmentation is the #1 insight for Indian food staple guesstimates.' },
        { label: 'Area of Punjab × Wheat Yield', correct: false, feedback: 'That estimates wheat PRODUCTION (which includes exports & storage), not domestic monthly consumption!' },
        { label: 'Grocery Stores × 100 Bags', correct: false, feedback: 'Loose chakki atta and PDS ration distribution bypass modern retail!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'India Population (M)', defaultVal: 1400, min: 1300, max: 1500, step: 50, unit: 'M' },
        { key: 'avgMeals', label: 'Avg Roti-Meals / Day', defaultVal: 1.5, min: 1.0, max: 2.2, step: 0.1, unit: 'meals' },
        { key: 'rotisPerMeal', label: 'Rotis / Meal', defaultVal: 2.0, min: 1.5, max: 3.5, step: 0.5, unit: 'rotis' },
        { key: 'gramsRoti', label: 'Wheat Flour / Roti (g)', defaultVal: 40, min: 25, max: 60, step: 5, unit: 'g' }
      ],
      computeFormulaText: 'Pop × Avg Roti-Meals/Day × Rotis/Meal × (g ÷ 1,000) × 30 Days',
      compute: (v) => {
        const dailyKgM = v.popM * v.avgMeals * v.rotisPerMeal * (v.gramsRoti / 1000);
        const monthlyB = (dailyKgM * 30) / 1000;
        return {
          value: monthlyB,
          formatted: `${monthlyB.toFixed(2)} Billion kg/Mo`,
          breakdown: [
            { label: 'Annual Consumption', val: `${(monthlyB * 12).toFixed(1)} Million Tonnes/Yr` },
            { label: 'Daily Kg / Person', val: `${(dailyKgM / v.popM).toFixed(3)} kg` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-weight-loss-drugs',
    title: 'Number of Weight Loss Drugs Sold by a Pharma Co. in India',
    prompt: 'Estimate the annual number of patients/units of a prescription weight-loss drug (like GLP-1 / Ozempic / Wegovy) sold by a pharma company with no direct competitors in India.',
    difficulty: 4,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Healthcare / Pharma', 'Patient Funnel', 'Prevalence'],
    clarifyingQuestions: [
      { q: 'Is this a prescription-only drug for clinically diagnosed obesity (not OTC cosmetic slimming teas)?', a: 'Yes, doctor-prescribed only for medically diagnosed obesity.', why: 'Requires medical diagnosis + doctor access filter!' },
      { q: 'Are we estimating the number of patients/courses or total individual doses/pens?', a: 'Unique annual patient treatments (The baseline stops at ~16.1M patient base; mention monthly doses × 12 if asked for packs!).', why: 'Always distinguish patients vs monthly refills!' }
    ],
    strategyOverview: 'Classic Healthcare Epidemiology Funnel: Total Pop (1.4B) → Urban (40% = 560M) vs Rural (60% = 840M) → Income Segmentation → Obesity Prevalence % (higher in urban affluent: 20%/15%/5% vs rural 10%/5%/1%) → Medical Diagnosis & Eligibility % (40–60%) → Affordability % (90%/70%/50% urban; near 0% rural due to healthcare infra + high drug price!) → Expected Adoption % (80%/60%/40%).',
    formula: 'Patients = ∑ [Geo/Income Pop × Obesity Prevalence % × Medical Eligibility % × Affordability % × Adoption %]',
    assumptions: [
      { label: 'Urban (40% = 560M): Upper 56M, Mid 336M, Lower 168M | Rural (60% = 840M) effectively 0 final adoption due to infra/cost', rationale: 'Expensive GLP-1 injectables require cold chain, specialists, and ₹10,000–20,000/month out-of-pocket.' },
      { label: 'Urban Obesity Prevalence: Upper 20% (11.2M), Mid 15% (50.4M), Lower 5% (8.4M)', rationale: 'Sedentary urban lifestyles & calorie-dense diets correlate with higher obesity.' },
      { label: 'Eligibility (60%/50%/40%) → Affordability (90%/70%/50%) → Adoption (80%/60%/40%)', rationale: 'Gives Upper = 4.83M, Mid = 10.58M, Lower = 0.67M → Total = 16.09M patients (or ~1.5–4M if price is ₹15k/mo!).' }
    ],
    tree: {
      label: 'India Pop (1.4B) → Urban (40% = 560M)',
      valueText: '560M Urban',
      children: [
        { label: 'Urban Upper (56M → 20% obese → 60% elig → 90% afford → 80% adopt)', valueText: '4.83M patients' },
        { label: 'Urban Middle (336M → 15% obese → 50% elig → 70% afford → 60% adopt)', valueText: '10.58M patients', highlight: true },
        { label: 'Urban Lower (168M → 5% → 40% → 50% → 40%)', valueText: '0.67M patients' },
        { label: 'Total Target Patients (Baseline)', valueText: '16.09 Million Patients', highlight: true }
      ]
    },
    finalAnswer: '~2M – 16M Patients (Baseline: 16.09M; note high ₹10K/mo cost limits middle-class affordability to ~10–15% = ~2–3M patients)',
    acceptableRange: { min: 1.5, max: 20, unit: 'Million patients', display: '1.5M – 20M patients' },
    sanityCheck: 'Always sanity check Affordability in pharma cases! If a patented weight-loss drug costs ₹12,000/month (₹1.44 Lakh/year), 70% of India’s Middle Income (336M) CANNOT afford ₹1.44L/year out-of-pocket—only top ~5–10% of urban middle class can! Mentioning that brings 16M down to a hyper-realistic ~2.5–3.5M patients (still a massive ₹35,000+ Cr market)!',
    interviewerTrap: 'Using high affordability (70%) and adoption (60%) for an expensive unsubsidized drug in India where insurance doesn’t cover weight-loss drugs!',
    variations: [
      { question: 'What if the patent expires and generics cut price by 80% (to ₹2,000/month)?', hint: 'Middle-income affordability & adoption jump 3–4x, expanding patient volume toward ~10–15M!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Pop → Urban/Income → Disease Prevalence % → Diagnosed & Medically Eligible % → Affordability % → Adoption %', correct: true, feedback: 'Masterclass! The 4-gate Pharma Funnel (Prevalence → Diagnosis → Affordability → Share/Adoption) wins every Healthcare consulting case!' },
        { label: 'Number of Pharmacies × 50 Boxes', correct: false, feedback: 'Prescription specialty drugs require specialist endocrinologist demand, not random pharmacy stocking.' },
        { label: 'Gym Memberships × 2', correct: false, feedback: 'Medically diagnosed clinical obesity patients are different from gym-goers.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'urbanM', label: 'Urban Population (M)', defaultVal: 560, min: 400, max: 650, step: 20, unit: 'M' },
        { key: 'obesePct', label: 'Clinical Obesity Prevalence %', defaultVal: 12, min: 5, max: 25, step: 1, unit: '%' },
        { key: 'diagPct', label: 'Diagnosed & Eligible %', defaultVal: 45, min: 20, max: 70, step: 5, unit: '%' },
        { key: 'affordPct', label: 'Can Afford Out-of-Pocket %', defaultVal: 25, min: 5, max: 80, step: 5, unit: '%' },
        { key: 'adoptPct', label: 'Doctor & Patient Adoption %', defaultVal: 50, min: 20, max: 80, step: 5, unit: '%' }
      ],
      computeFormulaText: 'Urban Pop × Obesity% × Eligible% × Affordability% × Adoption%',
      compute: (v) => {
        const pts = v.urbanM * (v.obesePct / 100) * (v.diagPct / 100) * (v.affordPct / 100) * (v.adoptPct / 100);
        return {
          value: pts,
          formatted: `${pts.toFixed(2)} Million Patients`,
          breakdown: [
            { label: 'Clinically Obese Urban Pool', val: `${(v.urbanM * v.obesePct / 100).toFixed(1)} M` },
            { label: 'Annual Doses (12 mo/patient)', val: `${(pts * 12).toFixed(1)} Million` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-candles-assam-diwali',
    title: 'Number of Candles Sold in Assam During Diwali',
    prompt: 'Estimate the number of candles sold in Assam during the Diwali festival.',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['State-Specific', 'Seasonal Festival', 'Cultural Split', 'Assam'],
    clarifyingQuestions: [
      { q: 'Wax candles only (excluding earthen diyas and electric fairy lights)?', a: 'Yes, wax candles only.', why: 'Diyas/LEDs are substitutes—account for that in packs/household.' },
      { q: 'Should we include corporate/social gifting candles in addition to household lighting?', a: 'Yes, include a small secondary gifting segment (~2%).', why: 'Shows thoroughness.' }
    ],
    strategyOverview: 'Cultural/Religious Segmentation Funnel! Start with Assam Population (~35 Million). Primary Consumption: Hindu population (~60% = 21M) → convert to Households (÷ 4 = 5.25M HH) → Cultural segments: Assamese & Bengalis (80% = 4.2M HH × 2 packs/day × 3 Diwali days × 5 candles/pack = 126M) + Marwadis/Others (20% = 1.05M HH × 1 pack/day × 3 days × 5 = 15.75M). Add Secondary Gifting (2% pop = 175K HH × 1 pack × 5 = 875K). Total = ~14.26 Crore candles!',
    formula: 'Total Candles = ∑ (Cultural Household Segment × Packs/Day × Festival Days × Candles/Pack) + Gifting',
    assumptions: [
      { label: 'Assam Population = 35 Million (Hindu ~60% = 21M; Avg Family Size = 4 → 5.25M Hindu HH)', rationale: 'Diwali lighting is primarily celebrated by Hindu households (plus some non-Hindu gifting/festive participation).' },
      { label: 'Diwali Lighting Days = 3 days (Chhoti Diwali, Diwali, Bhai Dooj); 5 candles/pack', rationale: 'Standard festive candle pack sizing.' },
      { label: 'Consumption: Assamese/Bengali (80% = 4.2M HH) buy 2 packs/day × 3d = 6 packs; Marwadis (20%) buy 1 pack/day (prefer diyas/lights) = 3 packs', rationale: 'Reflects regional diya vs candle preferences (though 30 candles/home across 3 days implies ~10 candles lit per evening, or ~2–3 packs total across Diwali if households reuse/use LEDs too!).' }
    ],
    tree: {
      label: 'Assam Population (35M)',
      valueText: '35M',
      children: [
        {
          label: 'Primary: Hindu (60% = 21M ÷ 4 = 5.25M HH)',
          valueText: '5.25M HH',
          children: [
            { label: 'Assamese & Bengalis (80% = 4.2M HH × 6 packs × 5)', valueText: '12.60 Crore (126M)', highlight: true },
            { label: 'Marwadis/Others (20% = 1.05M HH × 3 packs × 5)', valueText: '1.58 Crore (15.75M)' }
          ]
        },
        { label: 'Secondary: Gifting (2% = 700K ÷ 4 = 175K HH × 5)', valueText: '8.75 Lakh' },
        { label: 'Total Candles Sold', valueText: '14.26 Crore (142.6M) Candles', highlight: true }
      ]
    },
    finalAnswer: '~5 Crore – 14.3 Crore Candles (Baseline: 14.26 Cr)',
    acceptableRange: { min: 30, max: 160, unit: 'Million candles', display: '3 Crore – 16 Crore candles' },
    sanityCheck: '5.25M households lighting ~10–25 candles total across the 3-day Diwali festival = ~5 to 13 Crore candles! (Also note rural poor households might buy 1 small ₹10 pack instead of 6 packs, so ~6–10 Cr is super balanced.)',
    interviewerTrap: 'Applying 100% of Assam’s 35M population without checking Assam’s demographic religious split (~60% Hindu), OR calculating per individual instead of per HOUSEHOLD!',
    variations: [
      { question: 'Estimate the market size of earthen diyas sold in Uttar Pradesh during Diwali.', hint: 'UP Pop 24 Cr ÷ 5 = 4.8 Cr HH × ~80% Hindu = 3.84 Cr HH × ~20–30 diyas/HH!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'State Pop → Religious/Cultural Filter ÷ Household Size → Packs/HH across Diwali Days × Candles/Pack + Gifting', correct: true, feedback: 'Spot on! Household-level + cultural segmentation is essential for regional festival guesstimates.' },
        { label: 'Wax Factories in India ÷ 28 States', correct: false, feedback: 'Assam isn’t 1/28th average of India in population or festive traditions.' },
        { label: '35M × 10 Candles', correct: false, feedback: 'Forgets households (1 family lights candles together) and demographic religious split.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'Assam Population (M)', defaultVal: 35, min: 30, max: 40, step: 1, unit: 'M' },
        { key: 'hinduPct', label: 'Primary Celebrating %', defaultVal: 60, min: 45, max: 75, step: 5, unit: '%' },
        { key: 'hhSize', label: 'Household Size', defaultVal: 4.5, min: 3.5, max: 5.5, step: 0.5, unit: 'ppl' },
        { key: 'candlesHH', label: 'Avg Candles / Household', defaultVal: 20, min: 8, max: 35, step: 2, unit: 'candles' }
      ],
      computeFormulaText: '(Pop × Celebrating% ÷ HH Size) × Avg Candles/HH',
      compute: (v) => {
        const totalM = (v.popM * (v.hinduPct / 100) / v.hhSize) * v.candlesHH;
        return {
          value: totalM,
          formatted: `${totalM.toFixed(1)} Million (${(totalM / 10).toFixed(2)} Cr)`,
          breakdown: [
            { label: 'Celebrating Households', val: `${(v.popM * v.hinduPct/100 / v.hhSize).toFixed(2)} M HH` },
            { label: 'Market Value (@ ₹3/candle)', val: `₹${(totalM * 0.3).toFixed(1)} Crore` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-pizzas-delhi',
    title: 'Number of Pizzas Sold in Delhi Per Month',
    prompt: 'Estimate the number of pizzas sold in Delhi per month.',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Food & Beverage', 'Delhi', 'Income & Age Split', 'QSR'],
    clarifyingQuestions: [
      { q: 'Include both dine-in, takeaway, and delivery (Domino’s, Pizza Hut, local pizzerias)?', a: 'Yes, all commercially sold pizzas across Delhi.', why: 'Covers full market.' },
      { q: 'Counting whole pizzas (not individual slices)?', a: 'Yes, whole pizzas (regular/medium/large).', why: 'Remember groups/families often share 1–2 pizzas!' }
    ],
    strategyOverview: 'Top-Down Income × Age Demand Funnel! Delhi Pop (30M) → Income Split: Lower (30% = 9M, excluded due to pricing), Middle (50% = 15M), Upper (20% = 6M). Age Split: Exclude 60+ (~10%), keep 0–18 (30%) and 18–60 (60%). Apply Pizza Penetration (80% Mid, 100% Upper) and Monthly Consumption per person (Mid: 0.5/1.0; Upper: 1.0/1.5) → ~1.62 Cr pizzas (or adjust by ÷2 for group sharing → ~60–80 Lakh pizzas/month!).',
    formula: 'Monthly Pizzas = ∑ (Income Pop × Age % × Pizza Penetration % × Pizzas/Person/Month)',
    assumptions: [
      { label: 'Delhi Pop = 30M; Income: Lower 30% (excluded), Middle 50% (15M), Upper 20% (6M)', rationale: 'Pizzas (~₹200–700) are discretionary urban fast food.' },
      { label: 'Age (excluding 60+ 10%): 0–18 (30%) & 18–60 (60%)', rationale: 'Youth and working adults drive QSR consumption.' },
      { label: 'Penetration: 80% Middle, 100% Upper; Frequency: 0.5–1.0/mo (Mid), 1.0–1.5/mo (Upper)', rationale: 'Gives 9M + 7.2M = 16.2M (or ~5–8M whole pizzas if adjusted for 2–3 people sharing 1 medium/large pizza!).' }
    ],
    tree: {
      label: 'Delhi Population (30M)',
      valueText: '30M',
      children: [
        { label: 'Lower Income (30% = 9M)', valueText: 'Excluded', muted: true },
        {
          label: 'Middle Income (50% = 15M)',
          valueText: '9.0M pizzas/mo',
          children: [
            { label: '0–18 (4.5M × 80% × 0.5/mo)', valueText: '1.8M' },
            { label: '18–60 (9M × 80% × 1.0/mo)', valueText: '7.2M', highlight: true }
          ]
        },
        {
          label: 'Upper Class (20% = 6M)',
          valueText: '7.2M pizzas/mo',
          children: [
            { label: '0–18 (1.8M × 100% × 1.0/mo)', valueText: '1.8M' },
            { label: '18–60 (3.6M × 100% × 1.5/mo)', valueText: '5.4M' }
          ]
        },
        { label: 'Total Monthly Pizzas (Baseline)', valueText: '1.62 Crore (16.2M) Pizzas/Mo', highlight: true }
      ]
    },
    finalAnswer: '~60 Lakh – 1.62 Crore Pizzas/Month (Supply-adjusted ~50–80 Lakh whole pizzas)',
    acceptableRange: { min: 4, max: 18, unit: 'Million pizzas/month', display: '4M – 18M pizzas/month' },
    sanityCheck: 'Let’s do a quick Supply Cross-Check! Jubilant FoodWorks (Domino’s India, ~65–70% organized share) has ~2,000 stores across India, with ~200–250 stores in Delhi NCR selling ~400–500 pizzas/store/day = ~25–30 Lakh Domino’s pizzas/month → + Pizza Hut/local cafes = ~50–65 Lakh whole pizzas/month! Notice why The baseline got 16.2M: it assumed 1 whole pizza per individual rather than ~2 people sharing 1 medium pizza! Mentioning sharing brings you within 10% of real corporate earnings data!',
    interviewerTrap: 'Counting 1.0–1.5 whole pizzas per PERSON per month when families/friends typically share a medium/large pizza (dividing by ~2 sharing factor)!',
    variations: [
      { question: 'How many Domino’s outlets are there in Delhi NCR?', hint: 'Total monthly Domino’s pizzas (~25–30L) ÷ (400 pizzas/day × 30 = 12,000/mo) ≈ ~210–250 stores!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'City Pop → Income & Age Filter → Pizza Penetration → Frequency ÷ Sharing Factor (or individual mini pizzas)', correct: true, feedback: 'Spot on! Accounting for group sharing on medium/large pizzas gets you straight to real Domino’s store math.' },
        { label: 'Cheese Imported into Delhi ÷ 200g', correct: false, feedback: 'Cheese goes into burgers, sandwiches, pastas, and home cooking too.' },
        { label: 'Delivery Riders × 300', correct: false, feedback: 'Riders deliver biryani, groceries, and burgers too.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'Delhi Pop (M)', defaultVal: 30, min: 20, max: 40, step: 5, unit: 'M' },
        { key: 'eligPct', label: 'Target Income & Age %', defaultVal: 60, min: 40, max: 75, step: 5, unit: '%' },
        { key: 'eatPct', label: 'Pizza Consumers %', defaultVal: 70, min: 40, max: 90, step: 5, unit: '%' },
        { key: 'freqMo', label: 'Pizza Occasions / Mo', defaultVal: 1.0, min: 0.4, max: 2.0, step: 0.2, unit: '/mo' },
        { key: 'shareFactor', label: 'Avg People Sharing 1 Pizza', defaultVal: 2.0, min: 1.0, max: 3.0, step: 0.5, unit: 'ppl' }
      ],
      computeFormulaText: '(Pop × Eligible% × Consumer% × Occasions/Mo) ÷ Sharing Factor',
      compute: (v) => {
        const pizzasM = (v.popM * (v.eligPct / 100) * (v.eatPct / 100) * v.freqMo) / v.shareFactor;
        return {
          value: pizzasM,
          formatted: `${pizzasM.toFixed(1)} Million Pizzas/Mo`,
          breakdown: [
            { label: 'Daily Pizzas Sold', val: `${Math.round(pizzasM * 1e6 / 30).toLocaleString('en-IN')}/day` },
            { label: 'Monthly Revenue (@ ₹350)', val: `₹${Math.round(pizzasM * 35).toLocaleString('en-IN')} Cr/mo` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-used-tyres-delhi',
    title: 'Number of Used Tyres Currently in Delhi',
    prompt: 'Estimate the number of used 4-wheeler tyres currently on vehicles in Delhi.',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Replacement & Stock-Flow',
    templateId: 'tpl-durable',
    tags: ['Automotive', 'Delhi', 'Stock vs Sales', 'Spare Tyre'],
    clarifyingQuestions: [
      { q: 'Does "used tyres" mean tyres currently fitted on active cars (4 running + 1 spare = 5), or discarded scrap tyres in landfills?', a: 'Tyres currently in use on 4-wheelers in Delhi (5 per car).', why: 'Always verify whether "used" means "in-use" vs "scrapped/second-hand"!' },
      { q: 'Personal passenger cars only, or buses/trucks/2-wheelers too?', a: 'Personal 4-wheelers (note commercial vehicles add ~10–15%).', why: 'Ties cleanly to household car ownership.' }
    ],
    strategyOverview: 'Stock Model (NO lifespan division since it asks for tyres currently in use!). Delhi NCR Pop (3.5 Crore) → Urban (30% in baseline — or 90% if NCT! Note Baseline used 30% Urban / 70% Rural NCR with 4 vs 5 HH size, let’s track clearly!) → Convert to Households → 4-Wheeler Usage % → Income Group Cars/HH → Total Cars (~30.5 Lakh) × 5 tyres/car (4 wheels + 1 spare) = ~1.52 Crore tyres!',
    formula: 'Used Tyres = ∑ (Households by Geo & Income × Car Ownership × Cars/HH) × 5 Tyres',
    assumptions: [
      { label: 'Delhi NCR Pop = 3.5 Cr; Urban family size = 4, Rural = 5', rationale: 'Households own cars, not individuals.' },
      { label: 'Total Cars in Delhi ≈ 30.47 Lakh (0.305 Cr) across Urban & Rural income tiers', rationale: 'Matches ~30–35 Lakh registered cars in Delhi NCR!' },
      { label: '5 Tyres per Car (4 active + 1 stepney/spare tyre)', rationale: '30.47 Lakh × 5 = 1.523 Crore used tyres.' }
    ],
    tree: {
      label: 'Delhi Pop (3.5 Cr) → Car-Owning Households',
      valueText: '~30.47 Lakh Cars',
      children: [
        { label: 'Urban Cars (High 9.45L + Mid 12.99L + Low 2.95L)', valueText: '~25.4 Lakh cars', highlight: true },
        { label: 'Rural NCR Cars (High 0.74L + Mid 2.57L + Low 1.76L)', valueText: '~5.1 Lakh cars' },
        { label: 'Total 30.47L Cars × 5 Tyres/Car (4 + 1 Spare)', valueText: '1.52 Crore Used Tyres', highlight: true }
      ]
    },
    finalAnswer: '~1.52 Crore Used Tyres (15.2 Million tyres on ~30.5L cars)',
    acceptableRange: { min: 10, max: 25, unit: 'Million tyres', display: '10M – 25M tyres' },
    sanityCheck: 'Delhi NCR has ~30–35 Lakh active cars (~10% car ownership per capita). Multiplying by 5 tyres gives ~1.5–1.75 Crore tyres currently in use. Clean!',
    interviewerTrap: 'Forgetting the 5th spare tyre in the boot, OR dividing by 4-year tyre lifespan when the prompt asks for tyres CURRENTLY in use rather than annual tyre replacements!',
    variations: [
      { question: 'How many tyres are discarded/scrapped in Delhi every year?', hint: '1.52 Cr tyres ÷ ~4-year lifespan = ~38 Lakh scrap tyres/year!' }
    ],
    guidedPractice: {
      correctApproach: 'Stock & Replacement',
      funnelOptions: [
        { label: 'Delhi Pop ÷ HH Size → Income-wise Car Ownership → Total Cars × 5 Tyres (incl. spare)', correct: true, feedback: 'Spot on! Stopping at Total Stock × 5 tyres matches "currently in use".' },
        { label: 'Total Cars × 5 ÷ 4-Year Lifespan', correct: false, feedback: 'Dividing by lifespan gives ANNUAL sales, not total tyres currently on cars!' },
        { label: 'Petrol Pumps in Delhi × 1,000', correct: false, feedback: 'Unreliable proxy compared to household car ownership.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popCr', label: 'Delhi NCR Pop (Crore)', defaultVal: 3.5, min: 2.0, max: 4.5, step: 0.5, unit: 'Cr' },
        { key: 'hhSize', label: 'Avg Household Size', defaultVal: 4.2, min: 3.5, max: 5.0, step: 0.2, unit: 'ppl' },
        { key: 'carsPerHH', label: 'Avg Cars / Household', defaultVal: 0.37, min: 0.2, max: 0.6, step: 0.03, unit: 'cars' },
        { key: 'tyresCar', label: 'Tyres per Car', defaultVal: 5, min: 4, max: 5, step: 1, unit: 'tyres' }
      ],
      computeFormulaText: '(Pop ÷ HH Size) × Avg Cars/HH × Tyres/Car',
      compute: (v) => {
        const carsCr = (v.popCr / v.hhSize) * v.carsPerHH;
        const tyresCr = carsCr * v.tyresCar;
        return {
          value: tyresCr * 10,
          formatted: `${tyresCr.toFixed(2)} Crore Tyres`,
          breakdown: [
            { label: 'Total Cars', val: `${(carsCr * 100).toFixed(1)} Lakh` },
            { label: 'Annual Scrapped (÷4 yrs)', val: `${(tyresCr * 100 / 4).toFixed(1)} Lakh/yr` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-instagram-new-users',
    title: 'Number of Users Who Joined Instagram Globally Last Year',
    prompt: 'Estimate the number of new users who joined Instagram globally in the last year.',
    difficulty: 4,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Global Tech', 'Social Media', 'Growth Rate', 'PM Classic'],
    clarifyingQuestions: [
      { q: 'Are we counting unique new human users (not duplicate/bot/brand accounts)?', a: 'Unique new first-time individual users globally.', why: 'Prevents bot/spam inflation.' },
      { q: 'Include developing and under-developed regions, plus China block caveat?', a: 'Good catch! Note that China (~1.4B people) blocks Instagram—mentioning that upfront wins instant bonus points!', why: 'China has zero legal Instagram access.' }
    ],
    strategyOverview: 'Global Digital Cohort Growth Funnel! Start with Global Population (8B). Split into Developed (20% = 1.6B), Developing (60% = 4.8B), Under-developed (20% = 1.6B) → apply Urban/Rural splits & Smartphone Penetration (90%/80% Dev, 70%/40% Developing, 40%/10% Under-dev) → ~3.95B Global Smartphone Users! Segment by Age (exclude 0–18 or keep teens at lower %, focus 18–25: 15%, 25–40: 30%, 40–60: 20%, 60+: 10%) → Instagram Penetration (70%/45%/20%/5%) → Total IG Users (~1.13B) × New User Growth % (33% for young 18–25 cohort entering annually + 8% older cohorts) = ~194 Million new users!',
    formula: 'New Users = Global Smartphone Users × ∑ (Age% × IG Usage% × New Joiner Rate%)',
    assumptions: [
      { label: 'Global Smartphone Pool = 3.95 Billion (via Developed 20% / Developing 60% / Under-dev 20% urban-rural phone splits)', rationale: 'Matches global ~4B–4.5B smartphone users (~5B minus China exclusion adjusts neatly to ~3.95B!).' },
      { label: 'Instagram Penetration among Smartphone Users: 18–25 (70% = 415M), 25–40 (45% = 533M), 40–60 (20% = 158M), 60+ (5% = 20M)', rationale: 'Note: Baseline excluded 0–18, though 13–17 teens actually join heavily (~100M+ new teen accounts/yr)!' },
      { label: 'Annual New Joiner Rate: 18–25 (33% = 136.9M), 25–40 (8% = 42.7M), 40–60 (8% = 12.6M), 60+ (8% = 1.6M)', rationale: 'Total = 193.8M (~194 Million new users last year!).' }
    ],
    tree: {
      label: 'Global Population (8B) → Smartphone Users (3.95B)',
      valueText: '3.95B Phones',
      children: [
        { label: '18–25 Yrs (593M × 70% IG = 415M) × 33% new', valueText: '136.9M new', highlight: true },
        { label: '25–40 Yrs (1.18B × 45% IG = 533M) × 8% new', valueText: '42.7M new' },
        { label: '40–60 Yrs (790M × 20% IG = 158M) × 8% new', valueText: '12.6M new' },
        { label: '60+ Yrs (395M × 5% IG = 20M) × 8% new', valueText: '1.6M new' },
        { label: 'Total New Users Joined Last Year', valueText: '~193.8 Million Users', highlight: true }
      ]
    },
    finalAnswer: '~150 – 200 Million New Users/Year (Baseline: 193.85M)',
    acceptableRange: { min: 80, max: 280, unit: 'Million users/yr', display: '80M – 280M new users/year' },
    sanityCheck: 'Instagram sits around ~2 Billion MAUs growing ~7–10% annually in emerging markets (India, LatAm, SE Asia) = ~140–200 Million net/gross new users per year! Plus 13–17 year-old cohorts turn 13 every year (~130M kids globally turn 13/yr!). Dead-on!',
    interviewerTrap: 'Forgetting to exclude China (1.4B people blocked from Meta!) OR forgetting that IG’s biggest annual inflow of "new" users is teenagers turning 13–18 rather than 40-year-olds!',
    variations: [
      { question: 'How many Reels are watched globally on Instagram per day?', hint: '2B MAUs × 60% DAU (1.2B) × ~30 mins/day × ~2 Reels/min = ~72 Billion Reels/day!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Global Pop (excl. China) → Regional Smartphone Users → Age-Split IG Penetration → Annual New Cohort/Growth %', correct: true, feedback: 'Spot on! Never forget China exclusion and teen/young-adult cohort inflows on global consumer tech questions.' },
        { label: '8B × 10%', correct: false, feedback: '800M people joining in one year would saturate Earth in 3 years!' },
        { label: 'App Store Downloads ÷ 12', correct: false, feedback: 'You wouldn’t know annual downloads without sizing the user base, plus reinstalls double-count.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'igMauM', label: 'Current Global IG Users (M)', defaultVal: 1800, min: 1000, max: 2500, step: 100, unit: 'M' },
        { key: 'growthPct', label: 'Annual New User Growth %', defaultVal: 10, min: 4, max: 20, step: 1, unit: '%' },
        { key: 'churnRepPct', label: 'Churn/Second-Account Uplift %', defaultVal: 2, min: 0, max: 8, step: 1, unit: '%' }
      ],
      computeFormulaText: 'Existing IG User Base × (Net Growth% + Churn Replacement%)',
      compute: (v) => {
        const joinedM = v.igMauM * ((v.growthPct + v.churnRepPct) / 100);
        return {
          value: joinedM,
          formatted: `${Math.round(joinedM)} Million New Users/Yr`,
          breakdown: [
            { label: 'Monthly New Signups', val: `${(joinedM / 12).toFixed(1)} M/month` },
            { label: 'Daily Signups', val: `${Math.round(joinedM * 1e6 / 365).toLocaleString('en-IN')}/day` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-skincare-india',
    title: 'Market Size of the Skin Care Industry in India',
    prompt: 'Estimate the annual market size (revenue) of the organized skin care industry in India.',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Beauty & Personal Care', 'India', 'Gender Split', 'Kepler Cannon'],
    clarifyingQuestions: [
      { q: 'Organized skincare products (face wash, moisturizer, sunscreen, serums), excluding basic bath soaps?', a: 'Yes, dedicated skincare products only (not basic bar soap).', why: 'Justifies filtering out BPL and most rural markets.' },
      { q: 'Are we estimating annual revenue (₹) or units?', a: 'Annual ₹ market revenue.', why: 'Needs ticket size × annual purchase frequency.' }
    ],
    strategyOverview: 'Individual Consumer Funnel (NOT household—skincare is personal!). India Pop (1.4B) → Urban (35% = 490M; rural excluded for organized skincare due to traditional remedies/cost) → Exclude BPL (15–20% = 74M) → Remaining 416M → Gender Split (50% Male = 208M, 50% Female = 208M) → Skincare Adoption (70% Female = 146M, 30% Male = 62M → 208M users) × 4 purchases/yr (every 3 months) × ₹350 avg price = ~₹29,120–29,155 Crore!',
    formula: 'Market Size = Urban Non-BPL Pop × ∑ (Gender% × Adoption%) × (12 ÷ Replacement Months) × Avg Price',
    assumptions: [
      { label: 'Urban Pop = 35% (490M); Exclude BPL (~15% = 74M) → 416M Urban Middle/Upper', rationale: 'Skincare is an individual personal-care purchase.' },
      { label: 'Adoption: 70% of Females (146M) + 30% of Males (62M) = 208M Skincare Users', rationale: 'Note segment rounding: 15% of 490M = 73.5M BPL + 40% Lower-Mid + 30% Upper-Mid + 15% Upper (draft wrote 20/30/30/20 summing to 100%, though 7.4+19.6+14.7+7.4 = 49.1 Cr!).' },
      { label: 'Purchase Frequency: Every 3 months (4x/year) @ ₹350 avg product price (or multiple SKUs for affluent)', rationale: '20.8 Cr × 4 × ₹350 = ₹29,120 Crore (~$3.5B).' }
    ],
    tree: {
      label: 'India Pop (1.4B) → Urban Non-BPL (~416M)',
      valueText: '416M (41.6 Cr)',
      children: [
        { label: 'Female (208M × 70% use)', valueText: '14.6 Cr users', highlight: true },
        { label: 'Male (208M × 30% use)', valueText: '6.2 Cr users' },
        {
          label: 'Total 20.8 Cr Users × 4x/Yr × ₹350',
          valueText: '₹29,155 Crore / Year',
          highlight: true
        }
      ]
    },
    finalAnswer: '~₹25,000 – ₹35,000 Crore/year (~$3–4 Billion)',
    acceptableRange: { min: 15000, max: 50000, unit: '₹ Crore/year', display: '₹15,000 Cr – ₹50,000 Cr/yr' },
    sanityCheck: 'India’s Beauty & Personal Care (BPC) industry is ~$20B, of which dedicated Skin Care is ~$3–4 Billion (~₹25,000–35,000 Crore)! ₹29,155 Crore hits industry research reports right on target!',
    interviewerTrap: 'Treating skincare like a household appliance (dividing by 4) instead of an individual purchase, OR forgetting male grooming (~30% urban adoption) and high-frequency urban female multi-SKU users.',
    variations: [
      { question: 'Estimate the D2C / online skincare market (Mamaearth, Minimalist, Nykaa) in India.', hint: 'Take ~20–25% e-commerce share of ₹30,000 Cr = ~₹6,000–7,500 Cr!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'India Pop → Urban Non-BPL → Gender-Split Adoption (Female vs Male) × Replenishment Frequency × Price', correct: true, feedback: 'Spot on! Gender split + replenishment cadence every 3 months nails personal care market sizing.' },
        { label: 'Households ÷ 4 × ₹350', correct: false, feedback: 'Individuals buy personal face wash/sunscreen/serums—plus 1 purchase/yr is too low!' },
        { label: 'Nykaa Stores × ₹1 Crore', correct: false, feedback: 'Kiranas, chemists, and online marketplaces sell 80%+ of Indian skincare.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'urbanNonBplM', label: 'Urban Non-BPL Pop (M)', defaultVal: 416, min: 300, max: 500, step: 20, unit: 'M' },
        { key: 'femPen', label: 'Female Adoption %', defaultVal: 70, min: 40, max: 90, step: 5, unit: '%' },
        { key: 'malePen', label: 'Male Adoption %', defaultVal: 30, min: 10, max: 60, step: 5, unit: '%' },
        { key: 'freqYr', label: 'Purchases / Year', defaultVal: 4, min: 2, max: 8, step: 1, unit: '/yr' },
        { key: 'price', label: 'Avg Spend / Purchase (₹)', defaultVal: 350, min: 200, max: 800, step: 50, unit: '₹' }
      ],
      computeFormulaText: '[(Pop÷2 × Fem%) + (Pop÷2 × Male%)] × Purchases/Yr × Price',
      compute: (v) => {
        const usersM = (v.urbanNonBplM / 2) * (v.femPen / 100 + v.malePen / 100);
        const revCr = (usersM * 1e6 * v.freqYr * v.price) / 1e7;
        return {
          value: revCr,
          formatted: `₹${Math.round(revCr).toLocaleString('en-IN')} Crore/Yr`,
          breakdown: [
            { label: 'Total Skincare Users', val: `${usersM.toFixed(1)} Million` },
            { label: 'Annual Spend / User', val: `₹${v.freqYr * v.price}` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-cinema-revenue',
    title: 'Weekly Revenue of an Average Urban Indian Cinema',
    prompt: 'Estimate the weekly revenue of an average urban multiplex cinema in India.',
    difficulty: 3,
    archetype: 'Revenue & Cost',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-outlet',
    tags: ['Entertainment', 'Multiplex', 'Ticket + F&B'],
    clarifyingQuestions: [
      { q: 'Are we looking at a typical 4-screen multiplex (like PVR/INOX) in a Tier-1 city?', a: 'Yes, a 4-screen urban multiplex (~200 seats per screen).', why: 'Sets capacity cleanly.' },
      { q: 'Include Food & Beverages (popcorn/cola) and advertising, or tickets + F&B?', a: 'Tickets + Food & Beverages (note F&B is huge profit driver for PVR!).', why: 'F&B typically adds ~25–35% on top of ticket sales!' }
    ],
    strategyOverview: 'Multiplex Supply-Side Capacity + Ancillary F&B Revenue! 4 screens × 200 seats = 800 seats × 4 shows/day = 3,200 daily tickets available. Segment into Weekdays (5 days) vs Weekends (2 days), and Non-Peak morning/noon shows (2 shows @ lower price & 30–40% occupancy) vs Peak evening/night shows (2 shows @ higher price & 60–80% occupancy). Add F&B revenue (~20% buying popcorn @ ₹450 shared by 4–5? Or ~25–30% buying ₹250–300 snacks/person!).',
    formula: 'Weekly Rev = ∑ [Tickets Available × Occupancy % × Ticket Price] + [Total Viewers × F&B Attach % × F&B Spend]',
    assumptions: [
      { label: '4 Screens × 200 Seats = 800 Seats; 4 Shows/Day (2 Non-Peak + 2 Peak) = 1,600 tickets/slot/day', rationale: 'Morning & noon are off-peak; evening & night are peak.' },
      { label: 'Weekdays (5d): Non-Peak (5×1,600 = 8K @ 30% × ₹200 = ₹4.8L? Note Baseline used 1-day ×4=1,92,000? Let’s check!)', rationale: 'Check the weekly multiplier carefully! Trace the math carefully: 3200 tickets/day = 1600 non-peak + 1600 peak. The baseline computed ONLY ONE weekday (1600 × 30% × ₹200 = ₹96k? No, 1600 × 2? Wait: 3200/2 = 1600 × 30% = 480 × 200 = 96,000; why did Baseline print 1,92,000? Because 3200 was ALL 4 shows, so 1600×2=3200? And it forgot to multiply Weekdays ×5 and Weekends ×2, or counted only 2 days?! Let’s compute the TRUE 7-day weekly math clearly!).' },
      { label: 'TRUE 7-Day Ticket Math: 1,600 seats/slot × [5 WD × (30%×₹200 + 60%×₹300) + 2 WE × (40%×₹250 + 80%×₹350)] = ₹19.2L + ₹12.16L = ₹31.36L/week (if 200 seats × 4 screens = 800 seats)! Baseline uses 3,200 tickets PER SHOW-PAIR (which equals 4 screens × 200 seats × 4 shows = 3,200/day, × 7 days = 22,400 weekly tickets)!', rationale: 'At ~50% avg weekly occupancy (~11,000 viewers/week) × ₹280 avg ticket = ~₹31 Lakh/week tickets + ~₹10 Lakh F&B (30% × ₹300) = ~₹41 Lakh/week!' }
    ],
    tree: {
      label: '4-Screen Multiplex (800 Seats × 4 Shows/Day = 3,200/day)',
      valueText: '22,400 Seats/Week',
      children: [
        { label: 'Weekdays (5d × 3,200 = 16,000 slots × 45% avg occ = 7,200 pax × ₹267)', valueText: '~₹19.2 Lakh' },
        { label: 'Weekends (2d × 3,200 = 6,400 slots × 60% avg occ = 3,840 pax × ₹317)', valueText: '~₹12.2 Lakh' },
        {
          label: 'Total ~11,040 Weekly Viewers → Tickets (₹31.4L) + F&B (~₹10L)',
          valueText: '~₹41 Lakh/Wk (Baseline: ₹64.64L)',
          highlight: true
        }
      ]
    },
    finalAnswer: '~₹35 Lakh – ₹65 Lakh/Week (~₹1.5 – ₹2.5 Crore/Month)',
    acceptableRange: { min: 25, max: 80, unit: '₹ Lakh/week', display: '₹25 Lakh – ₹80 Lakh/week' },
    sanityCheck: 'PVR INOX reports ~₹10–12 Crore annual revenue per 4–5 screen property = ~₹20–25 Lakh/week on average nationwide (and ~₹40–60 Lakh/week for busy Tier-1 urban multiplexes)! Watch out for accidental multi-day doubling (1,92,000 + 5,76,000 + 3,20,000 + 8,96,000 = 19.84L? Actually 19.84L × ~3? No, Baseline printed ₹62.72L!). Always verify `Total Weekly Seats = Screens × Seats × Shows × 7` so you never double-count!',
    interviewerTrap: 'Forgetting F&B (which contributes ~25–35% of multiplex revenue and ~60% of profit!) OR miscalculating `5 Weekdays + 2 Weekends` occupancy multipliers.',
    variations: [
      { question: 'How much profit does this cinema make weekly after distributor share?', hint: 'Movie distributors take ~45–50% of Net Ticket Revenue, while cinema keeps ~75% margin on F&B!' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Screens × Seats × Shows/Day × (5 WD + 2 WE) × Peak/Off-Peak Occupancy × Ticket Price + F&B Spend', correct: true, feedback: 'Spot on! Peak vs off-peak shows + weekday vs weekend + F&B attach rate is the complete multiplex model.' },
        { label: 'City Population × 1 Movie/Month ÷ 20 Cinemas', correct: false, feedback: 'Supply capacity per screen is far cleaner and gives accurate single-outlet revenue.' },
        { label: 'Popcorn Sold × 4', correct: false, feedback: 'F&B attach rate varies—ticket seating capacity is the primary driver.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'screens', label: 'Screens in Multiplex', defaultVal: 4, min: 2, max: 8, step: 1, unit: 'screens' },
        { key: 'seats', label: 'Avg Seats / Screen', defaultVal: 200, min: 100, max: 300, step: 25, unit: 'seats' },
        { key: 'shows', label: 'Shows / Screen / Day', defaultVal: 4, min: 3, max: 6, step: 1, unit: 'shows' },
        { key: 'avgOcc', label: 'Blended Weekly Occupancy %', defaultVal: 50, min: 25, max: 85, step: 5, unit: '%' },
        { key: 'tktPrice', label: 'Avg Ticket Price (₹)', defaultVal: 280, min: 150, max: 450, step: 20, unit: '₹' },
        { key: 'fbPerPax', label: 'Avg F&B Spend / Viewer (₹)', defaultVal: 90, min: 40, max: 200, step: 10, unit: '₹' }
      ],
      computeFormulaText: 'Screens × Seats × Shows × 7 Days × Occupancy% × (Ticket + F&B/Viewer)',
      compute: (v) => {
        const viewers = v.screens * v.seats * v.shows * 7 * (v.avgOcc / 100);
        const revLakh = (viewers * (v.tktPrice + v.fbPerPax)) / 1e5;
        return {
          value: revLakh,
          formatted: `₹${revLakh.toFixed(1)} Lakh/Week`,
          breakdown: [
            { label: 'Weekly Ticket Sales', val: `₹${(viewers * v.tktPrice / 1e5).toFixed(1)} Lakh` },
            { label: 'Weekly F&B Sales', val: `₹${(viewers * v.fbPerPax / 1e5).toFixed(1)} Lakh (${Math.round(viewers)} pax)` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-bowling-alley-food',
    title: 'Weekly Food Revenue of a Bowling Alley in Delhi',
    prompt: 'Estimate the weekly food & beverage revenue of a bowling alley in Delhi.',
    difficulty: 3,
    archetype: 'Revenue & Cost',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-outlet',
    tags: ['Entertainment', 'F&B Attach', 'Capacity'],
    clarifyingQuestions: [
      { q: 'Food & beverage revenue ONLY (excluding bowling game lane fees)?', a: 'Yes, food/beverage revenue only.', why: 'Focuses strictly on F&B attach rate of bowlers.' },
      { q: 'Small neighborhood alley (5 lanes) or large arcade/mall bowling center (10–12 lanes)?', a: 'Small/mid 5-lane alley open ~8–10 hours/day.', why: 'Sets lane capacity cleanly.' }
    ],
    strategyOverview: 'Two-step Outlet Capacity + F&B Conversion! Step 1 (Footfall): 5 lanes × 2–4 bowlers/lane/hr × 8–10 hrs/day → apply Weekday (60%) vs Weekend (80%) occupancy across 5 WD + 2 WE = ~368–600 bowlers/week! Step 2 (Food Conversion): Split customers into Upper (50%, 75% order food) and Middle (50%, 50% order food) → ~62.5% overall attach rate × ₹250–350 avg spend/person = Weekly Food Revenue!',
    formula: 'Weekly Food Rev = [Lanes × Pax/Lane/Hr × Hrs × (5×WD% + 2×WE%)] × Food Attach% × Spend/Person',
    assumptions: [
      { label: '5 Lanes × 2 bowlers/lane/hr = 10/hr × 8 effective hrs = 80/day (note The baseline wrote 10 hrs in text, 8 hrs in box; and typically groups of 3–4 bowl together!)', rationale: 'Groups of 3–4 friends actually bowl 1 game/hour (~15–20 players/hr at full capacity!).' },
      { label: 'Weekday (5d @ 60% = 240 pax) + Weekend (2d @ 80% = 128 pax) = 368 bowlers/wk (Baseline)', rationale: 'Pitfall: avoid splitting 368 into 50% Mid (184) and mistakenly printed 75% Upper (276) summing to 460 instead of 184! Always verify 50%+50%=100%!' },
      { label: 'Attach Rate: ~60% buy food @ ₹250–350/person → ~₹75,000/week (or ~₹1–1.2L/week with 3-person groups)', rationale: 'Captive leisure audience buys fries, pizza, mocktails.' }
    ],
    tree: {
      label: '5-Lane Bowling Alley (80 max/day)',
      valueText: '368 Bowlers/Week',
      children: [
        { label: 'Weekdays (5d × 48 = 240) + Weekends (2d × 64 = 128)', valueText: '368 bowlers' },
        { label: 'Food Buyers (~62% weighted attach: ~230–300 pax)', valueText: '~230–300 diners', highlight: true },
        { label: '× ₹250 Avg Food Spend', valueText: '~₹58K – ₹75K / Week', highlight: true }
      ]
    },
    finalAnswer: '~₹60,000 – ₹1,20,000 / Week (~₹2.5 – ₹5 Lakh / Month just from food)',
    acceptableRange: { min: 40000, max: 180000, unit: '₹/week', display: '₹40,000 – ₹1,80,000/week' },
    sanityCheck: 'At ₹350/game, 368 bowlers generate ~₹1.3L/week from bowling + ~₹75K/week from F&B = ~₹2L/week (~₹8–9L/month total). For a small 5-lane alley, ~35% of revenue coming from high-margin snacks/drinks is right on industry benchmarks!',
    interviewerTrap: 'Catching the classic MECE bug where 50% Middle + 75% Upper totaled 125% (turning 368 people into 460 people)! Always keep MECE percentages summing to 100%!',
    variations: [
      { question: 'What is the total monthly revenue (Games + Arcade + Food) of a 10-lane Smaaash/Timezone?', hint: 'Scale 5→10 lanes + 4 players/lane/hr + arcade games ≈ ~₹30–40 Lakh/month.' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Lanes × Players/Lane/Hr × Open Hours × (WD + WE Occupancy) × Food Order% × Avg Food Spend', correct: true, feedback: 'Spot on! Always estimate venue footfall via lane capacity first, then apply F&B attach rate.' },
        { label: 'Delhi Population × 1%', correct: false, feedback: 'Sizes the city, not one specific small 5-lane alley.' },
        { label: 'Kitchen Staff × ₹50,000', correct: false, feedback: 'Kitchen staff depends on food demand, not the reverse.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'lanes', label: 'Bowling Lanes', defaultVal: 5, min: 4, max: 12, step: 1, unit: 'lanes' },
        { key: 'paxLaneHr', label: 'Avg Bowlers / Lane / Hr', defaultVal: 2.5, min: 1.5, max: 4.5, step: 0.5, unit: 'ppl' },
        { key: 'hrsDay', label: 'Operating Hours / Day', defaultVal: 10, min: 6, max: 14, step: 1, unit: 'hrs' },
        { key: 'occPct', label: 'Weekly Avg Occupancy %', defaultVal: 65, min: 30, max: 90, step: 5, unit: '%' },
        { key: 'attachPct', label: 'Food Order Attach %', defaultVal: 65, min: 30, max: 90, step: 5, unit: '%' },
        { key: 'spend', label: 'Avg Food Spend / Diner (₹)', defaultVal: 280, min: 150, max: 500, step: 20, unit: '₹' }
      ],
      computeFormulaText: 'Lanes × Bowlers/Lane/Hr × Hrs × 7 × Occupancy% × Attach% × Spend',
      compute: (v) => {
        const bowlers = v.lanes * v.paxLaneHr * v.hrsDay * 7 * (v.occPct / 100);
        const rev = bowlers * (v.attachPct / 100) * v.spend;
        return {
          value: rev,
          formatted: `₹${Math.round(rev).toLocaleString('en-IN')}/Week`,
          breakdown: [
            { label: 'Weekly Bowlers', val: `${Math.round(bowlers)}` },
            { label: 'Monthly Food Rev', val: `₹${(rev * 4.3 / 1e5).toFixed(2)} Lakh/mo` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-burgers-delhi',
    title: 'Number of Burgers Consumed Per Day in Delhi',
    prompt: 'Estimate the number of burgers consumed per day in Delhi.',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['QSR', 'Fast Food', 'Delhi', 'Income Funnel'],
    clarifyingQuestions: [
      { q: 'Include both organized chains (McDonald’s/BK/KFC) and local street/cafe burgers?', a: 'Yes, all commercially sold burgers (clarify if street bun-tikki counts!).', why: 'Street burgers can double total volume in lower-middle segments.' },
      { q: 'Average across a normal day (monthly ÷ 30)?', a: 'Yes, daily average.', why: 'Smooths out weekend rushes.' }
    ],
    strategyOverview: 'Top-Down Age + Income Funnel! Delhi Pop (30M) → Exclude toddlers 0–5 (10% = 3M) → 27M Eligible → Income Split: BPL (10% = 2.7M, 0), Lower Mid (50% = 13.5M), Upper Mid (30% = 8.1M), High (10% = 2.7M). Apply Fast Food Preference % (20%/55%/70%) → Burger Share among fast food (25%/35%/30%) → Burgers/Month (2, 4, 6) → Sum monthly burgers (10.95M) ÷ 30 days = 3,65,000 burgers/day!',
    formula: 'Daily Burgers = [∑ (Eligible Pop × Income% × Fast Food% × Burger Preference% × Burgers/Mo)] ÷ 30',
    assumptions: [
      { label: 'Eligible Pop = 27M (30M minus 10% aged 0–5)', rationale: 'Very young kids rarely eat whole burgers.' },
      { label: 'Fast Food × Burger Share: Lower-Mid (20% × 25% = 0.67M), Upper-Mid (55% × 35% = 1.55M), High (70% × 30% = 0.56M)', rationale: 'Total ~2.78M regular burger eaters (~9% of Delhi).' },
      { label: 'Monthly Rate: LM 2/mo (1.35M), UM 4/mo (6.2M), High 6/mo (3.4M) → 10.95M/month ÷ 30 = 3.65 Lakh/day', rationale: 'Wait—check if 45+ eats burgers at same rate as 16–30! Age-weighting adds even sharper realism.' }
    ],
    tree: {
      label: 'Delhi Pop (30M) → Eligible 5+ Yrs (27M)',
      valueText: '27M Eligible',
      children: [
        { label: 'Lower Mid (13.5M × 20% FF × 25% Burger = 0.67M) × 2/mo', valueText: '1.35M/mo' },
        { label: 'Upper Mid (8.1M × 55% FF × 35% Burger = 1.55M) × 4/mo', valueText: '6.2M/mo', highlight: true },
        { label: 'High (2.7M × 70% FF × 30% Burger = 0.56M) × 6/mo', valueText: '3.4M/mo' },
        { label: 'Total 10.95M/Month ÷ 30 Days', valueText: '~3.65 Lakh Burgers/Day', highlight: true }
      ]
    },
    finalAnswer: '~3.5 Lakh – 5 Lakh Burgers/Day',
    acceptableRange: { min: 200000, max: 800000, unit: 'Burgers/day', display: '2 Lakh – 8 Lakh burgers/day' },
    sanityCheck: 'Supply cross-check: Delhi NCR has ~150+ McDonald’s/Burger King/KFC outlets selling ~1,000–1,200 burgers/day each = ~1.6–1.8 Lakh branded QSR burgers/day + ~2 Lakh local cafe/street burgers = ~3.6–4 Lakh/day! Remarkably accurate!',
    interviewerTrap: 'Assuming everyone who eats fast food eats burgers exclusively—pizza, momos, rolls, and chaat compete heavily, so the "Fast Food → Burger Share (~30%)" filter is crucial!',
    variations: [
      { question: 'How many momos plates are consumed in Delhi per day?', hint: 'Much higher penetration across ALL income tiers & street stalls (~15–25 Lakh plates/day)!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Delhi Pop → Age Eligibility → Income Split → Fast-Food Users → Burger Share% × Monthly Rate ÷ 30', correct: true, feedback: 'Spot on! Adding the "Fast-Food → Burger Share" step prevents confusing pizza/chaat eaters with burger eaters.' },
        { label: 'McDonald’s Outlets × 5,000', correct: false, feedback: 'Misses Burger King, Wendy’s, cafes, and local street burger carts (plus 5,000/day/outlet is way too high).' },
        { label: 'Bread Loaves Sold ÷ 10', correct: false, feedback: 'Burger buns are specific bakery supply, not household bread loaves.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'Delhi Pop (M)', defaultVal: 30, min: 20, max: 40, step: 5, unit: 'M' },
        { key: 'eligPct', label: 'Age 5–50 Target %', defaultVal: 75, min: 60, max: 90, step: 5, unit: '%' },
        { key: 'burgerUserPct', label: '% Eating Burgers Monthly', defaultVal: 15, min: 5, max: 30, step: 2.5, unit: '%' },
        { key: 'burgersMo', label: 'Avg Burgers / Eater / Mo', defaultVal: 3.5, min: 1.5, max: 6.0, step: 0.5, unit: '/mo' }
      ],
      computeFormulaText: '(Pop × Eligible% × Eater% × Burgers/Mo) ÷ 30 Days',
      compute: (v) => {
        const monthly = v.popM * 1e6 * (v.eligPct / 100) * (v.burgerUserPct / 100) * v.burgersMo;
        const daily = monthly / 30;
        return {
          value: daily,
          formatted: `${(daily / 1e5).toFixed(2)} Lakh Burgers/Day`,
          breakdown: [
            { label: 'Monthly Burgers', val: `${(monthly / 1e6).toFixed(2)} Million` },
            { label: 'Daily Revenue (@ ₹120 avg)', val: `₹${(daily * 120 / 1e5).toFixed(1)} Lakh/day` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-srcc-netflix-hours',
    title: 'Daily Netflix Viewing Hours at a University College',
    prompt: 'Estimate the total daily Netflix viewing hours across all students at a 4,000-student university college.',
    difficulty: 1,
    archetype: 'Usage & Behavioral',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Streaming', 'Campus', 'DAU vs MAU', 'Beginner Friendly'],
    clarifyingQuestions: [
      { q: 'Regular semester day (not exam week or holidays)?', a: 'Normal weekday/average college day.', why: 'Exam week viewing drops or shifts.' },
      { q: 'Include students using shared family/friend accounts?', a: 'Yes, anyone with Netflix access (not just direct payers!).', why: 'Password sharing makes college access much higher than paid ownership!' }
    ],
    strategyOverview: 'Super clean Beginner Funnel! Start with Total Students (4,000) → Segment by Income (High 20% = 800, Middle 50% = 2,000, Low 30% = 1,200) → Netflix Access/Penetration (100%, 50%, 10% → 1,920 students with access) → Daily Active User % (25% watch on a given day = 480 active viewers) × Avg Daily Watch Time (1–1.5 hrs) = 480–720 hours/day!',
    formula: 'Daily Hours = Total Students × ∑ (Income% × Access%) × Daily Active Rate % × Avg Watch Time (hrs)',
    assumptions: [
      { label: 'Total College Students = 4,000 (UG + PG)', rationale: 'Standard large DU college.' },
      { label: 'Income Penetration: High (20% × 100% = 800), Mid (50% × 50% = 1,000), Low (30% × 10% = 120) = 1,920 users (~48%)', rationale: 'Shared ₹649 4-screen plans make access widespread among middle/upper students.' },
      { label: 'Daily Active Users (DAU/MAU) = 25% (~480 students watching today) × 1 hour/day = 480 hours/day', rationale: 'Students juggle YouTube, Instagram, Prime Video, and classes—not all 1,920 watch Netflix daily!' }
    ],
    tree: {
      label: 'Total College Students (4,000)',
      valueText: '4,000 students',
      children: [
        { label: 'High (800 × 100%) + Mid (2,000 × 50%) + Low (1,200 × 10%)', valueText: '1,920 Netflix users' },
        {
          label: 'Daily Active Rate (25% watch today)',
          valueText: '480 Daily Watchers',
          highlight: true,
          children: [
            { label: '× 1 Hour Avg Watchtime/Day', valueText: '480 Viewing Hours/Day', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~480 – 1,000 Viewing Hours/Day',
    acceptableRange: { min: 300, max: 1800, unit: 'Hours/day', display: '300 – 1,800 viewing hours/day' },
    sanityCheck: '480–800 hours across 4,000 students = ~7–12 minutes per student per day averaged across the entire college (or ~1–1.5 hrs for the ~15% actively bingeing a series today). Super realistic!',
    interviewerTrap: 'Assuming 100% of Netflix subscribers watch Netflix EVERY single day (confusing MAU with DAU)! Differentiating Account Holders (48%) from Daily Active Watchers (25% of holders = 12% of campus) is a classic PM skill.',
    variations: [
      { question: 'How much internet bandwidth (GB) does the college consume daily from Netflix?', hint: '480–800 hours × ~1–1.5 GB/hour (HD/Mobile mix) ≈ ~600–1,000 GB/day!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Total Students → Income/Access Penetration → Daily Active % (DAU) × Avg Hours/Session', correct: true, feedback: 'Spot on! Distinguishing Total Users from Daily Active Watchers is key for any digital engagement metric.' },
        { label: '4,000 × 3 Hours', correct: false, feedback: 'Assumes 100% of students have Netflix and binge 3 hours every day—way too high!' },
        { label: 'Hostel Wi-Fi Speed × 24 Hours', correct: false, feedback: 'Day scholars watch at home, and students use YouTube/Instagram/classes too.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'students', label: 'Total Students', defaultVal: 4000, min: 1000, max: 10000, step: 500, unit: 'ppl' },
        { key: 'accessPct', label: 'Netflix Access %', defaultVal: 48, min: 20, max: 80, step: 5, unit: '%' },
        { key: 'dauPct', label: 'Daily Active % (DAU/MAU)', defaultVal: 30, min: 15, max: 60, step: 5, unit: '%' },
        { key: 'hrs', label: 'Avg Hours / Active Watcher', defaultVal: 1.25, min: 0.5, max: 3.0, step: 0.25, unit: 'hrs' }
      ],
      computeFormulaText: 'Students × Access% × Daily Active% × Avg Watch Hours',
      compute: (v) => {
        const hrs = v.students * (v.accessPct / 100) * (v.dauPct / 100) * v.hrs;
        return {
          value: hrs,
          formatted: `${Math.round(hrs).toLocaleString('en-IN')} Hours/Day`,
          breakdown: [
            { label: 'Daily Active Watchers', val: `${Math.round(v.students * v.accessPct/100 * v.dauPct/100)}` },
            { label: 'Avg Mins / Student Overall', val: `${Math.round((hrs * 60) / v.students)} mins/day` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-domestic-flights-delhi',
    title: 'Domestic Flights Taking Off from Delhi Airport in a Day',
    prompt: 'Estimate the number of domestic passenger flights taking off from Delhi Airport in a day.',
    difficulty: 3,
    archetype: 'Supply & Capacity',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-bottleneck',
    tags: ['Aviation', 'Delhi IGI', 'Domestic vs Intl', 'Runway Capacity'],
    clarifyingQuestions: [
      { q: 'Domestic departures ONLY (excluding international departures and all landings)?', a: 'Yes, domestic takeoffs only.', why: 'Means you must multiply total runway movements by 50% (departures) AND ~75–80% (domestic share)!' }
    ],
    strategyOverview: 'Refined Runway Bottleneck Model! Refined multi-tier utilization approach: Total runway capacity = 3–4 active runways (Baseline uses 3 terminals × 3 runways = 9 units at lower utilization, OR 4 runways at 100% peak / 50% mid / 25% night!). Peak (6 hrs: 6–9 AM, 6–9 PM @ 4-min gap = 15/hr × 100% = 90/runway), Mid-Peak (12 hrs @ 10-min gap = 6/hr × 50% = 36), Non-Peak (6 hrs @ 15-min gap = 4/hr × 25% = 6). Total Movements = 1,188 → 50% Departures (594) × 75% Domestic = 446 domestic departures/day!',
    formula: 'Domestic Takeoffs = Operational Units × ∑ [Hours × Max Rate × Utilization %] × 50% Departures × 75% Domestic',
    assumptions: [
      { label: 'Peak (6 hrs @ 15/hr × 100%), Mid-Peak (12 hrs @ 6/hr × 50%), Non-Peak (6 hrs @ 4/hr × 25%)', rationale: 'Captures morning & evening business-travel wave vs midday & red-eye lulls.' },
      { label: 'Total Runway Movements = 1,188 (across operational slots)', rationale: 'Matches real IGI ~1,200–1,400 daily total air traffic movements!' },
      { label: '50% Departures (594) × 75% Domestic = 446 Domestic Takeoffs/Day', rationale: 'International accounts for ~20–25% of IGI traffic (widebodies carry more pax per plane).' }
    ],
    tree: {
      label: 'IGI Runway Daily Movements (1,188 Total)',
      valueText: '1,188 Movements',
      children: [
        { label: 'Peak (810) + Mid-Peak (324) + Non-Peak (54)', valueText: '1,188 total ops' },
        {
          label: '× 50% Departures',
          valueText: '594 Total Takeoffs',
          children: [
            { label: '× 75% Domestic Share', valueText: '446 Domestic Departures/Day', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~446 – 520 Domestic Departures/Day',
    acceptableRange: { min: 350, max: 650, unit: 'Flights/day', display: '350 – 650 domestic departures/day' },
    sanityCheck: 'Delhi IGI averages ~1,300 total movements/day → ~650 departures/day, of which ~78–80% (~500–520/day) are domestic and ~130–150 are international. 446 is almost exact!',
    interviewerTrap: 'Saying "3 terminals × 3 runways = 9 runways" (Delhi only has 4 physical runways total!). Phrase it as "4 runways running ~20–25 movements/hr peak" to show real operational accuracy while getting the exact same ~1,200 movements.',
    variations: [
      { question: 'How many domestic passengers depart Delhi daily?', hint: '446 flights × 170 seats × 85% load factor ≈ ~64,000 domestic departing passengers/day!' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Runways × Peak/Mid/Off-Peak Hourly Movements × 50% Departures × ~75% Domestic Share', correct: true, feedback: 'Spot on! Always divide movements by 2 for departures and filter out international share.' },
        { label: 'India Flights ÷ 28 States', correct: false, feedback: 'Delhi IGI alone handles ~20% of all Indian air traffic!' },
        { label: 'Boarding Gates × 24', correct: false, feedback: 'Ignores runway slot constraints and night closures/lulls.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'runways', label: 'Active Runways', defaultVal: 4, min: 2, max: 5, step: 1, unit: 'runways' },
        { key: 'avgMovesHr', label: 'Avg Movements/Hr/Runway (24h)', defaultVal: 12.5, min: 8, max: 20, step: 0.5, unit: '/hr' },
        { key: 'depPct', label: 'Departure Share %', defaultVal: 50, min: 45, max: 55, step: 5, unit: '%' },
        { key: 'domPct', label: 'Domestic Share %', defaultVal: 78, min: 65, max: 90, step: 2, unit: '%' }
      ],
      computeFormulaText: 'Runways × 24h × Avg Moves/Hr × Departure% × Domestic%',
      compute: (v) => {
        const dom = v.runways * 24 * v.avgMovesHr * (v.depPct / 100) * (v.domPct / 100);
        return {
          value: dom,
          formatted: `${Math.round(dom)} Domestic Takeoffs/Day`,
          breakdown: [
            { label: 'Total Airport Movements', val: `${Math.round(v.runways * 24 * v.avgMovesHr)}/day` },
            { label: 'Intl Takeoffs', val: `${Math.round(dom / (v.domPct/100) * (1 - v.domPct/100))}/day` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-college-canteens',
    title: 'Number of College Canteens Operating in Delhi',
    prompt: 'Estimate the number of college canteens operating in Delhi.',
    difficulty: 3,
    archetype: 'Volume & Geometry',
    approachType: 'Geometry & Proxy',
    templateId: 'tpl-geometry',
    tags: ['Spatial / Land Area', 'Education', 'Delhi'],
    clarifyingQuestions: [
      { q: 'Are we estimating canteens in recognized higher-education colleges/universities (excluding K-12 schools)?', a: 'Higher education colleges & universities in Delhi.', why: 'Separates colleges from thousands of schools.' },
      { q: 'Does a big campus have multiple canteens (main canteen + Nescafe/Maggi kiosks)?', a: 'Count formal main college canteens (1–2 per campus depending on size).', why: 'Sets canteens-per-college multiplier.' }
    ],
    strategyOverview: 'Two brilliant approaches! Approach A (Land Area Proxy): Delhi Land Area = ~350,000 acres (~1,480 sq km) → ~5% dedicated to higher education campuses (Wait—check sanity! 5% of Delhi = 17,500 acres → Large 50%/70 acres = 125, Medium 30%/25 acres = 280, Small 20%/5 acres = 350 → 755 colleges → ~1,020 canteens; note The baseline summed 250+420+350 = 1,020 though printed "670" in final green box!). Approach B (Student Demand Sanity Check!): Delhi Pop 2–3 Cr → Age 18–22 (~8% = ~20L) × ~30% college enrollment = ~6–7 Lakh college students ÷ ~1,500–2,000 avg students/college = ~300–400 colleges × ~1.5 canteens/college = ~450–600 canteens!',
    formula: 'Approach A: (City Acres × College Land % × Tier Share ÷ Avg Campus Acres) × Canteens/College',
    assumptions: [
      { label: 'Delhi Total Land Area = ~3,50,000 Acres (~1,484 sq km); ~2–5% for educational/college campuses', rationale: 'Notice ~1.5–2% is realistically higher-ed campuses (~5,000–7,000 acres), while ~5% includes K-12 schools too!' },
      { label: 'Campus Tiers (Refined): Large (70 acres, 2 canteens), Medium (25 acres, 1.5), Small (5 acres, 1)', rationale: 'Large universities (DU North/South, JNU, IITD, Jamia, DTU) have 2+ canteens; standalone colleges have 1.' },
      { label: 'Student-Population Cross-Check: ~6 Lakh college students ÷ 1,500 avg enrollment ≈ ~400 colleges × 1.5 ≈ 600 canteens!', rationale: 'Both methods converge cleanly in the 500–700 canteen ballpark!' }
    ],
    tree: {
      label: 'Delhi Land Area (3,50,000 Acres) → College Land (5% = 17,500)',
      valueText: '17,500 Acres',
      children: [
        { label: 'Large (50% = 8,750 ac ÷ 70 ac = 125) × 2 canteens', valueText: '250 canteens' },
        { label: 'Medium (30% = 7,000 ac ÷ 25 ac = 280) × 1.5 canteens', valueText: '420 canteens', highlight: true },
        { label: 'Small (20% = 1,750 ac ÷ 5 ac = 350) × 1 canteen', valueText: '350 canteens' },
        { label: 'Sum (250+420+350 = 1,020; Student Check ≈ 500–650)', valueText: '670 (Baseline) | ~600 (Pop Check)', highlight: true }
      ]
    },
    finalAnswer: '~500 – 750 College Canteens in Delhi (Student check: ~600; Baseline: 670)',
    acceptableRange: { min: 300, max: 1100, unit: 'Canteens', display: '300 – 1,100 college canteens' },
    sanityCheck: 'Delhi actually has ~200–250 major colleges/institutes (90+ DU colleges + GGSIPU + JNU + IIT + Jamia + DTU + NSUT + private coaching/institutes ~400+ campuses total). With ~1–2 canteens per campus, ~450–650 canteens is extraordinarily realistic! (Catching the 250+420+350 = 1,020 vs 670 addition slip—and noting 5% of Delhi’s land for colleges alone is high—shows top-1% rigor!)',
    interviewerTrap: 'Using 5% of Delhi’s total land exclusively for colleges without verifying against student population (5% of 1,500 sq km = 75 sq km, which is huge—almost half of all built-up institutional land!). Always cross-check Area-Proxy answers with Population/Student Demand!',
    variations: [
      { question: 'Estimate the daily revenue of an average college canteen.', hint: '1,500 students × ~40% buying daily × ₹60 avg order = ₹36,000/day!' }
    ],
    guidedPractice: {
      correctApproach: 'Geometry & Proxy',
      funnelOptions: [
        { label: 'Either City Land Area × College % ÷ Campus Size × Canteens, OR College-Age Pop × Enrollment % ÷ Students/College × Canteens', correct: true, feedback: 'Bonus mastery! Knowing BOTH the Land-Area approach and Student-Population cross-check makes you unstoppable.' },
        { label: 'Delhi Population ÷ 1,000', correct: false, feedback: 'Random arbitrary rule of thumb without derivation.' },
        { label: 'Total Metro Stations × 10', correct: false, feedback: 'Metro stations don’t map evenly to colleges.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'Delhi Pop (M)', defaultVal: 25, min: 18, max: 35, step: 2, unit: 'M' },
        { key: 'youthPct', label: 'College-Age (18–22) %', defaultVal: 9, min: 6, max: 12, step: 1, unit: '%' },
        { key: 'enrollPct', label: 'College Enrollment %', defaultVal: 30, min: 15, max: 50, step: 5, unit: '%' },
        { key: 'stuPerCol', label: 'Avg Students / College', defaultVal: 1800, min: 1000, max: 3500, step: 200, unit: 'ppl' },
        { key: 'cantPerCol', label: 'Avg Canteens / College', defaultVal: 1.5, min: 1.0, max: 2.5, step: 0.25, unit: 'canteens' }
      ],
      computeFormulaText: '(Pop × College Age% × Enrollment% ÷ Students/College) × Canteens/College',
      compute: (v) => {
        const colleges = (v.popM * 1e6 * (v.youthPct / 100) * (v.enrollPct / 100)) / v.stuPerCol;
        const canteens = colleges * v.cantPerCol;
        return {
          value: canteens,
          formatted: `${Math.round(canteens)} Canteens`,
          breakdown: [
            { label: 'Est. Colleges in Delhi', val: `${Math.round(colleges)} colleges` },
            { label: 'Total College Students', val: `${Math.round(colleges * v.stuPerCol).toLocaleString('en-IN')}` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-footwear-india',
    title: 'Number of Footwear Pairs Bought in India in a Year',
    prompt: 'Estimate the total number of footwear pairs bought in India in a single year.',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Apparel & Footwear', 'India', 'Gender & Income', 'Meesho'],
    clarifyingQuestions: [
      { q: 'Does "footwear" include ALL categories (slippers/chappals, sandals, sports shoes, formal shoes)?', a: 'Yes, all footwear types combined.', why: 'Slippers/chappals drive massive rural & lower-income unit volumes!' },
      { q: 'Unit volume (pairs/year) or ₹ revenue?', a: 'Total pairs bought annually.', why: 'Sets final output unit cleanly.' }
    ],
    strategyOverview: 'Top-Down Geographic × Income × Gender Funnel! India Pop (1.4B) → Urban (35% = 490M) & Rural (65% = 910M) → Income Split (Urban: 10% Upper, 50% Mid, 40% Lower; Rural: 5% Upper, 25% Mid, 70% Lower) → Gender Split (50/50 Urban; 60/40 Male-skewed or 50/50 Rural) → Annual Pairs Bought (women buy slightly more variety ~1.5–5 pairs/yr vs men ~1–4 pairs/yr). Sum Urban (1.42B) + Rural (1.26B) = 2.68 Billion pairs/year!',
    formula: 'Annual Footwear = ∑ (Geo & Income & Gender Pop × Annual Pairs Bought per Person)',
    assumptions: [
      { label: 'Urban (490M): Upper 10% (4/5 pairs M/F), Middle 50% (3/4 pairs), Lower 40% (1.5/2 pairs)', rationale: 'Includes office formals, sneakers, festive ethnic, and home slippers.' },
      { label: 'Rural (910M): Upper 5% (2/3 pairs), Middle 25% (1.5/2 pairs), Lower 70% (1/1.5 pairs)', rationale: 'Affordable chappals/sandals dominate rural repeat volume.' },
      { label: 'Note: Urban = 1.421B + Rural = 1.260B = 2.681 Billion pairs/year (~1.9 pairs/Indian/yr)', rationale: 'Also check Rural gender split: actual rural India gender split is ~51/49 (not 60/40), though the weighted average pairs/person hardly changes!' }
    ],
    tree: {
      label: 'India Population (1.4B)',
      valueText: '1,400M',
      children: [
        {
          label: 'Urban (35% = 490M)',
          valueText: '1.421 Billion pairs',
          highlight: true,
          children: [
            { label: 'Upper (49M × avg 4.5) + Mid (245M × 3.5) + Lower (196M × 1.75)', valueText: '220.5M + 857.5M + 343M' }
          ]
        },
        {
          label: 'Rural (65% = 910M)',
          valueText: '1.260 Billion pairs',
          children: [
            { label: 'Upper (45.5M) + Mid (227.5M) + Lower (637M)', valueText: '109.2M + 386.7M + 764.4M' }
          ]
        },
        { label: 'Total Annual Footwear Bought', valueText: '2.68 Billion Pairs / Year', highlight: true }
      ]
    },
    finalAnswer: '~2.5 – 3.0 Billion Pairs/Year (~1.9 pairs per person per year)',
    acceptableRange: { min: 1.8, max: 4.0, unit: 'Billion pairs/yr', display: '1.8B – 4.0B pairs/year' },
    sanityCheck: 'India is the world’s 2nd largest footwear market, producing & consuming ~2.5–3.0 Billion pairs/year (~₹1.5–2 Lakh Crore retail value at ~₹600–700 avg price including ₹150 chappals and ₹3,000 sneakers)! 2.68B hits real-world industry stats bullseye!',
    interviewerTrap: 'Excluding rural low-income segments completely (everyone buys at least 1 pair of ₹100–200 chappals/sandals per year!) OR using ₹3,000 sneaker pricing for the entire market.',
    variations: [
      { question: 'Estimate the revenue of the branded sports shoe market in India.', hint: 'Filter to Urban Mid/Upper (~290M) × ~35% sports shoe buyers × ~0.7 pairs/yr × ₹2,500 ≈ ~₹18,000 Cr!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Population → Urban/Rural → Income & Gender → Annual Pairs/Person by Category', correct: true, feedback: 'Spot on! Footwear is an essential across every income tier—only frequency and price tier change.' },
        { label: 'Shoe Factories in Agra × 10,000', correct: false, feedback: 'Imports and fragmented MSME workshops make production hard to anchor.' },
        { label: 'Population × 10 Pairs', correct: false, feedback: '14 billion pairs would be more than the entire global production!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'India Population (M)', defaultVal: 1400, min: 1300, max: 1500, step: 50, unit: 'M' },
        { key: 'urbanPairs', label: 'Avg Urban Pairs / Person / Yr', defaultVal: 2.9, min: 1.5, max: 5.0, step: 0.2, unit: 'pairs' },
        { key: 'ruralPairs', label: 'Avg Rural Pairs / Person / Yr', defaultVal: 1.4, min: 0.8, max: 3.0, step: 0.2, unit: 'pairs' },
        { key: 'avgPrice', label: 'Blended Avg Price (₹/pair)', defaultVal: 650, min: 300, max: 1200, step: 50, unit: '₹' }
      ],
      computeFormulaText: '[(Pop × 35% × Urban Pairs) + (Pop × 65% × Rural Pairs)] × Avg Price',
      compute: (v) => {
        const pairsB = (v.popM * 0.35 * v.urbanPairs + v.popM * 0.65 * v.ruralPairs) / 1000;
        const revKCr = (pairsB * 1e9 * v.avgPrice) / 1e10;
        return {
          value: pairsB,
          formatted: `${pairsB.toFixed(2)} Billion Pairs/Yr`,
          breakdown: [
            { label: 'Per Capita Avg', val: `${(pairsB * 1000 / v.popM).toFixed(2)} pairs/person` },
            { label: 'Total Retail Value', val: `₹${Math.round(revKCr * 1000).toLocaleString('en-IN')} Cr` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-weddings-india',
    title: 'Number of Weddings Taking Place in India in a Year',
    prompt: 'Estimate the number of weddings taking place in India in one year.',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Demographics', 'Weddings', 'Divide-by-2 Rule', 'Meesho'],
    clarifyingQuestions: [
      { q: 'Counting total weddings (events) or total individuals getting married?', a: 'Total weddings! (CRITICAL: 1 wedding = 2 people getting married, so divide by 2!).', why: 'Classic double-counting trap!' }
    ],
    strategyOverview: 'Two brilliant demographic methods! Method A (Cohort Entry / Age-Distribution Trick — FASTEST!): India Pop = 1.4B, Life Expectancy = 70 yrs → ~2 Crore (20M) Indians turn marrying age (~24–26) every single year! At ~95% lifetime marriage rate, ~1.9 Cr individuals marry for the first time (+ ~10% remarriages ≈ ~2.1 Cr people) ÷ 2 people per wedding = ~1.05 Crore (10.5M) weddings/year! Method B (Baseline Geographic Age-Rate Funnel): Urban (490M) + Rural (910M) → Age 21–40 (25%) @ 5%–6% annual rate + Age 40+ (35%) @ 0.5–1% = 23.08M people marrying ÷ 2 = 11.54 Million weddings!',
    formula: 'Annual Weddings = [∑ (Eligible Population × Annual Marriage Rate %)] ÷ 2',
    assumptions: [
      { label: 'Urban (490M): Age 21–40 (25% = 122.5M × 5% = 6.13M) + 40+ (35% = 171.5M × 1% = 1.72M) = 7.84M people → ÷2 = 3.92M weddings', rationale: 'Wait—check math! 5% of 21–40 cohort over 20 years = 100% married by age 40! That intuition makes 5–6% super defensible!' },
      { label: 'Rural (910M): Age 21–40 (227.5M × 6% = 13.65M) + 40+ (318.5M × 0.5% = 1.59M) = 15.24M people → ÷2 = 7.62M weddings', rationale: 'Rural areas tend to have slightly higher/earlier marriage rates.' },
      { label: 'DIVIDE BY 2! Two people form ONE wedding → 23.08M ÷ 2 = 11.54 Million Weddings/Year', rationale: 'Never forget ÷ 2!' }
    ],
    tree: {
      label: 'India Population (1.4B)',
      valueText: '1,400M',
      children: [
        { label: 'Urban People Marrying (6.13M + 1.72M = 7.84M) ÷ 2', valueText: '3.92M Weddings' },
        { label: 'Rural People Marrying (13.65M + 1.59M = 15.24M) ÷ 2', valueText: '7.62M Weddings', highlight: true },
        { label: 'Total Annual Weddings in India', valueText: '~1.15 Crore (11.54M) Weddings/Yr', highlight: true }
      ]
    },
    finalAnswer: '~1 Crore – 1.2 Crore Weddings/Year (10M – 12M)',
    acceptableRange: { min: 8, max: 15, unit: 'Million weddings/yr', display: '8M – 15M weddings/year' },
    sanityCheck: 'India officially witnesses ~1 to 1.2 Crore weddings annually (generating ~$130 Billion in wedding spend—the #1 reason interviewers love asking this!). Both the Cohort Entry check (20M turning 25 ÷ 2 = 10M) and the Demographic Rate tree (11.54M) land straight on the real number!',
    interviewerTrap: 'FORGETTING TO DIVIDE BY 2! Calculating 22 million brides & grooms and reporting 22 million weddings doubles the true figure!',
    variations: [
      { question: 'Estimate the annual size of India’s Wedding Industry (₹ / $).', hint: '11M weddings × segmented budget (Lower 50% @ ₹3L, Mid 40% @ ₹12L, Upper 10% @ ₹50L → avg ₹11L) ≈ ~₹12 Lakh Crore (~$140B)!' },
      { question: 'Estimate gold jewellery demand driven by Indian weddings.', hint: '~11M weddings × ~30–40g average gold bought per wedding = ~350–450 tonnes!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Pop → Cohort Turning Marrying Age (or Age 21–40 × Annual Marriage Rate) → Sum People Marrying ÷ 2', correct: true, feedback: 'Textbook! Never forget the ÷ 2 step for couples!' },
        { label: 'Pop × 5%', correct: false, feedback: '70 million people don’t get married every single year!' },
        { label: 'Banquet Halls in India × 100', correct: false, feedback: 'Many rural and temple weddings don’t use commercial banquet halls.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'India Population (M)', defaultVal: 1400, min: 1300, max: 1500, step: 50, unit: 'M' },
        { key: 'lifeExp', label: 'Life Expectancy (Yrs)', defaultVal: 70, min: 65, max: 75, step: 5, unit: 'yrs' },
        { key: 'marryPct', label: 'Cohort % Ever Marrying', defaultVal: 95, min: 80, max: 99, step: 1, unit: '%' },
        { key: 'remarryPct', label: 'Remarriage Uplift %', defaultVal: 10, min: 0, max: 20, step: 2, unit: '%' },
        { key: 'avgBudgetL', label: 'Avg Spend / Wedding (₹L)', defaultVal: 10, min: 4, max: 25, step: 1, unit: '₹L' }
      ],
      computeFormulaText: '[(Pop ÷ LifeExp) × Marry% × (1 + Remarry%) ÷ 2] Weddings',
      compute: (v) => {
        const cohortM = v.popM / v.lifeExp;
        const weddingsM = (cohortM * (v.marryPct / 100) * (1 + v.remarryPct / 100)) / 2;
        const mktLakhCr = (weddingsM * 1e6 * v.avgBudgetL * 1e5) / 1e12;
        return {
          value: weddingsM,
          formatted: `${weddingsM.toFixed(2)} Million Weddings/Yr`,
          breakdown: [
            { label: 'Individuals Turning Marrying Age', val: `${cohortM.toFixed(1)} M/yr` },
            { label: 'Wedding Market Spend', val: `₹${mktLakhCr.toFixed(1)} Lakh Cr (~$${Math.round(mktLakhCr*12)}B)` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-ev-2w-india',
    title: 'Number of EV 2-Wheelers to be Sold in India Next Year',
    prompt: 'Estimate the number of electric two-wheelers (EV 2Ws) expected to be sold in India next year.',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Replacement & Stock-Flow',
    templateId: 'tpl-durable',
    tags: ['EV & Mobility', 'Durable Growth', 'New + Replacement', 'Meesho'],
    clarifyingQuestions: [
      { q: 'Personal EV scooters/bikes only, or B2B delivery fleets (Zepto/Zomato/Yulu) too?', a: 'Personal residential EV 2-wheelers (optionally note ~10% B2B fleet uplift).', why: 'Ties to household 2W adoption.' },
      { q: 'Are we looking at NEXT year’s sales (meaning both first-time EV upgraders AND existing EV replacements)?', a: 'Yes: Annual EV Sales = New Adopters + EV Replacements!', why: 'Rapidly growing EV category is driven heavily by NEW adopters, not just replacements!' }
    ],
    strategyOverview: 'Growth + Replacement Durable Model! Convert 1.4B population to Households (Urban 35% ÷ 3–4, Rural 65% ÷ 5) → 2W Penetration (Urban 60%, Rural 40% → ~170M 2W homes) → EV Interest by Income → ~93.66M interested pool (or better yet: Annual Total 2W Sales in India ≈ ~1.8–2.0 Crore units/year × EV Penetration Share next year ~7–10% = ~14–20 Lakh EV 2Ws!! Compare baseline 9.97M vs 2W industry total!).',
    formula: 'Method A (Market Share): Total Annual 2W Sales × EV Share % | Method B (Baseline): New Growth + (Existing EV Stock ÷ 5-yr Life)',
    assumptions: [
      { label: 'Baseline Approach: 93.66M EV-interested 2W households × 7% new growth (6.55M) + existing EV stock (~17M ÷ 5 yrs = 3.41M) = 9.97M', rationale: 'Wait—always do a 15-second Sanity Check!' },
      { label: 'SANITY CHECK: India’s ENTIRE 2-wheeler market (petrol + electric combined!) sells ~1.8–2.0 Crore (18–20M) units/year!', rationale: 'If EV 2Ws alone sold 10M next year, EVs would be >50% of all 2-wheelers in India overnight! Real EV 2W penetration in India is ~6–10% (~12–20 Lakh units/year)!' },
      { label: 'Clean Interview Formula: ~30 Cr Households × 55% 2W ownership = ~16.5 Cr 2Ws ÷ 8-yr life = ~2 Cr annual 2W sales × ~8–10% EV share = ~16–20 Lakh EV 2Ws next year!', rationale: 'Using Total Annual Category Sales × EV Penetration Share prevents accidentally making EVs 50% of the entire 2W industry!' }
    ],
    tree: {
      label: 'India Total 2W Market Check (~18–20M Sold/Year)',
      valueText: '1.8–2.0 Cr Annual 2Ws',
      children: [
        { label: 'Stock-Flow Model (7% growth on 93.6M pool + replacement)', valueText: '9.97M (50% share — high!)' },
        { label: 'Sanity-Checked EV Share (~8–10% of 18–20M annual 2W sales)', valueText: '~1.5M – 2.0M (15–20 Lakh EVs/Yr)', highlight: true }
      ]
    },
    finalAnswer: '~15 – 20 Lakh (1.5M – 2.0M) EV 2Ws realistically [Baseline: 9.97M]',
    acceptableRange: { min: 1.0, max: 11.0, unit: 'Million EVs/yr', display: '1.0M – 10M EV 2Ws/year' },
    sanityCheck: 'India currently sells ~18–20 Million two-wheelers per year (Hero, Honda, TVS, Bajaj, Ola, Ather). Real-world EV 2W sales hit ~1.0–1.5 Million (~6–8% penetration) growing toward ~1.8–2.2M! Showing an interviewer BOTH the household funnel AND the "Total 2W Sales × EV %" sanity check is peak consulting maturity.',
    interviewerTrap: 'Calculating a new tech category (EVs) in isolation without checking what % of TOTAL category sales (20M total 2Ws) your answer implies! Never let a niche sub-category silently exceed 50% of total sales unless justified.',
    variations: [
      { question: 'How many public EV charging points would India need for 20 Lakh EV 2Ws?', hint: 'Most 2Ws charge at home overnight; assume ~10% rely on public fast chargers ÷ ~20 bikes/charger/day!' }
    ],
    guidedPractice: {
      correctApproach: 'Stock & Replacement',
      funnelOptions: [
        { label: 'Total 2-Wheeler Stock ÷ Lifespan (+ Growth) = Annual 2W Sales × Projected EV Share % (Urban vs Rural)', correct: true, feedback: 'Brilliant! Anchoring EV sales as a share of total annual 2W replacement + growth prevents absurd overestimates.' },
        { label: 'Petrol Stations × 100', correct: false, feedback: 'Unrelated to EV sales.' },
        { label: 'India Population × 5%', correct: false, feedback: '70 million EVs in one year would triple India’s total vehicle manufacturing capacity!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'total2WStockM', label: 'Total 2W Stock in India (M)', defaultVal: 170, min: 140, max: 220, step: 10, unit: 'M' },
        { key: 'life', label: 'Avg 2W Lifespan (Yrs)', defaultVal: 9, min: 6, max: 12, step: 1, unit: 'yrs' },
        { key: 'evSharePct', label: 'EV Share of Annual 2W Sales %', defaultVal: 10, min: 5, max: 35, step: 2.5, unit: '%' }
      ],
      computeFormulaText: '(Total 2W Stock ÷ Lifespan) × EV Penetration Share %',
      compute: (v) => {
        const annual2W = v.total2WStockM / v.life;
        const evsM = annual2W * (v.evSharePct / 100);
        return {
          value: evsM,
          formatted: `${(evsM * 10).toFixed(1)} Lakh EV 2Ws/Yr`,
          breakdown: [
            { label: 'Total Annual 2Ws Sold', val: `${annual2W.toFixed(1)} Million` },
            { label: 'EV Units (Millions)', val: `${evsM.toFixed(2)} Million` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-zepto-workers',
    title: 'Number of Workers Required to Cater 3,000 Zepto Orders',
    prompt: 'Estimate the total number of workers required in a Zepto dark store (or cluster) to fulfill 3,000 orders in a day.',
    difficulty: 3,
    archetype: 'Supply & Capacity',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-workforce',
    tags: ['Quick Commerce', 'Operations', 'Peak-Load Staffing', 'Meesho'],
    clarifyingQuestions: [
      { q: 'Include BOTH inside-darkstore pickers/packers AND delivery riders + supervisors/guards?', a: 'Yes, end-to-end fulfillment workforce (Pickers, Delivery Riders, Supervisors, Security).', why: 'Tests operational completeness!' },
      { q: 'Do riders batch multiple orders or deliver 1 order per 15-min round trip?', a: 'Assume 1 order per 15-min trip (4 orders/hr) to keep 10-minute SLA!', why: 'Strict 10-min SLA limits batching.' }
    ],
    strategyOverview: 'Peak-Load Workforce Sizing (Operations Classic!). Daily Orders = 3,000. Split into Day Shift (7 AM–11 PM, 16 hrs = 85% = 2,550 orders) and Night Shift (11 PM–7 AM, 8 hrs = 15% = 450 orders). Inside Day Shift, orders concentrate heavily in 4 Peak Hours (7–9 AM & 7–9 PM = 60% of 3,000 = 1,800 orders → 450 orders/hour!) vs 12 Non-Peak Hours (750 orders → 62.5/hr). You MUST staff the Day Shift for the 450 orders/hr PEAK load! Divide 450 orders/hr by Picker capacity (20 orders/hr @ 3 min/order = 23 pickers) and Rider capacity (4 orders/hr @ 15 min round-trip = 113 riders). Do same for Night Shift (56 orders/hr → 3 pickers + 14 riders) + 4 Supervisors + 2 Security Guards = 158 workers!',
    formula: 'Workers = (Peak Day Orders/Hr ÷ Picker Rate + Peak Day ÷ Rider Rate) + Night Staff + Support Staff',
    assumptions: [
      { label: 'Day Shift (16 hrs): 4 Peak Hrs handle 1,800 orders (450/hr) | 12 Non-Peak Hrs handle 750 orders (62.5/hr)', rationale: 'Note: In an interview, ask if 16-hr Day Shift is split into TWO 8-hr worker shifts (morning & evening)! Two shifts could require overlapping peak coverage or shift-handovers.' },
      { label: 'Night Shift (8 hrs): 450 orders ÷ 8 hrs = ~56 orders/hr', rationale: 'Low late-night volume.' },
      { label: 'Productivity: Picker = 3 mins/order (20/hr); Rider = 15 mins/round-trip (4/hr)', rationale: 'Day Peak needs 450÷20 = 23 pickers + 450÷4 = 113 riders = 136 Day staff; Night needs 3 + 14 = 17 staff + 6 Support = 159 workers!' }
    ],
    tree: {
      label: '3,000 Daily Zepto Orders',
      valueText: '3,000 Orders/Day',
      children: [
        {
          label: 'Day Shift (85% = 2,550 orders) — Staffed for Peak 450/hr',
          valueText: '136 Day Workers',
          highlight: true,
          children: [
            { label: 'Darkstore Pickers (450 ÷ 20/hr)', valueText: '23 pickers' },
            { label: 'Delivery Riders (450 ÷ 4/hr)', valueText: '113 riders', highlight: true }
          ]
        },
        { label: 'Night Shift (15% = 450 ÷ 8h = 56/hr → 3 Pickers + 14 Riders)', valueText: '17 Night Workers' },
        { label: 'Supervisors (4) + Security Guards (2)', valueText: '6 Support Staff' },
        { label: 'Total Workforce Required', valueText: '158 – 159 Workers', highlight: true }
      ]
    },
    finalAnswer: '~158 Workers (136 Day + 17 Night + 6 Support)',
    acceptableRange: { min: 110, max: 220, unit: 'Workers', display: '110 – 220 total workers' },
    sanityCheck: 'Wait—check shift length! A human worker works an 8–9 hour shift, NOT a 16-hour day shift! If Peak 1 is 7–9 AM and Peak 2 is 7–9 PM (12 hours apart!), one rider cannot easily cover both peaks in a single 8-hour shift unless working split shifts or part-time gig surges! Mentioning "part-time gig riders covering evening peaks vs full-time 8-hr pickers" shows elite operations intuition!',
    interviewerTrap: 'Dividing 3,000 orders ÷ 24 hours = 125 orders/hr average and staffing for 125/hr! During the 7–9 PM dinner/grocery rush (450 orders/hr), your dark store would crash with 45-minute delays!',
    variations: [
      { question: 'What is the daily delivery cost per order if a rider earns ₹900/day?', hint: '113 riders × ~22 orders/day avg → ~₹40/order delivery cost (or ~₹20–30/order with batched/gig surge models!).' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Split Daily Orders into Peak vs Off-Peak Hours → Size Pickers & Riders for PEAK Hour Rate + Night + Support', correct: true, feedback: 'Spot on! Peak-hour capacity sizing is the golden rule of quick-commerce & logistics operations!' },
        { label: '3,000 Orders ÷ 24 Hours ÷ 4 Orders/Hr', correct: false, feedback: 'Staffing for 24-hr average leaves you 3.5x understaffed during evening peaks!' },
        { label: '3,000 ÷ 30 Orders/Worker', correct: false, feedback: 'Mixes pickers, riders, shifts, and non-peak idle hours blindly.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'orders', label: 'Daily Orders', defaultVal: 3000, min: 1000, max: 6000, step: 500, unit: 'orders' },
        { key: 'peakSharePct', label: '% Orders in 4 Peak Hrs', defaultVal: 60, min: 40, max: 75, step: 5, unit: '%' },
        { key: 'pickerRate', label: 'Picker Capacity (ord/hr)', defaultVal: 20, min: 12, max: 30, step: 2, unit: '/hr' },
        { key: 'riderRate', label: 'Rider Capacity (ord/hr)', defaultVal: 4, min: 2, max: 6, step: 0.5, unit: '/hr' }
      ],
      computeFormulaText: 'Peak Hr Orders ÷ Picker Rate + Peak Hr Orders ÷ Rider Rate + Night & Support',
      compute: (v) => {
        const peakHr = (v.orders * (v.peakSharePct / 100)) / 4;
        const dayPickers = Math.ceil(peakHr / v.pickerRate);
        const dayRiders = Math.ceil(peakHr / v.riderRate);
        const nightWorkers = Math.ceil((v.orders * 0.15 / 8) / v.pickerRate) + Math.ceil((v.orders * 0.15 / 8) / v.riderRate);
        const total = dayPickers + dayRiders + nightWorkers + 6;
        return {
          value: total,
          formatted: `${total} Workers`,
          breakdown: [
            { label: 'Peak Hour Load', val: `${Math.round(peakHr)} orders/hr` },
            { label: 'Day Pickers / Riders', val: `${dayPickers} pickers + ${dayRiders} riders` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-cab-rides-day',
    title: 'Number of Rides a Cab Driver Takes in a Day',
    prompt: 'Estimate the average number of rides an Ola/Uber cab driver completes in a single day.',
    difficulty: 2,
    archetype: 'Supply & Capacity',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-workforce',
    tags: ['Mobility', 'Unit Productivity', 'Time Cycle', 'Meesho'],
    clarifyingQuestions: [
      { q: 'Full-time city driver in a metro like Delhi or Bengaluru?', a: 'Yes, full-time urban driver (~10–12 hr shift).', why: 'Part-time drivers do far fewer.' },
      { q: 'Include idle time, breaks, deadhead pickup travel, and waiting?', a: 'Yes! Realistic driver utilization (~75–80%) + full 4-part ride cycle time.', why: 'Ignoring deadhead pickup/repositioning inflates rides by 40%!' }
    ],
    strategyOverview: 'Cycle-Time Productivity Model! Calculate Productive Driving Minutes = Shift Length (11 hrs) × Utilization Rate (80%, accounting for lunch/tea/idle wait between requests) = 8.8 hrs = 528 productive minutes. Break down ONE complete Ride Cycle: Pickup travel to customer (8 mins) + Loading/OTP wait (2 mins) + Actual trip duration (30 mins) + Repositioning after drop-off (5 mins) = 45 minutes/ride. Divide 528 ÷ 45 = ~11–12 rides/day!',
    formula: 'Rides/Day = (Shift Hours × 60 × Utilization %) ÷ (Pickup + Wait + Trip + Repositioning Mins)',
    assumptions: [
      { label: 'Total Shift = 11 Hours; Effective Utilization = 80% → 8.8 hrs = 528 active minutes/day', rationale: 'Accounts for meals, fuel/CNG refill queues, and low-demand afternoon lulls.' },
      { label: 'Ride Cycle Breakdown = 8m pickup + 2m wait + 30m trip + 5m repositioning = 45 mins/ride', rationale: 'Note: Baseline draft text briefly printed "20 min / 35 min" in bullets #1–2 while its diagram used 30 min / 45 min—both give ~11–15 rides/day!' }
    ],
    tree: {
      label: 'Driver Daily Shift (11 Hrs × 80% = 528 Productive Mins)',
      valueText: '528 Mins/Day',
      children: [
        { label: 'Ride Cycle Time: Pickup (8m) + Wait (2m) + Trip (30m) + Reposition (5m)', valueText: '45 mins/ride' },
        { label: '528 Mins ÷ 45 Mins/Ride', valueText: '11.7 → ~11–12 Rides / Day', highlight: true }
      ]
    },
    finalAnswer: '~11 – 14 Rides/Day',
    acceptableRange: { min: 8, max: 18, unit: 'Rides/day', display: '8 – 18 rides/day' },
    sanityCheck: '12 rides × ~₹220 avg fare = ~₹2,640 gross daily earnings (~₹1,800–2,000 net to driver after Uber commission, before CNG/EMI = ~₹25,000–35,000/month take-home)! Matches real Indian gig-driver earnings reports!',
    interviewerTrap: 'Only counting the 25–30 minute ride itself and forgetting pickup drive time, OTP waiting, CNG refill queues, and empty repositioning!',
    variations: [
      { question: 'How many km does that cab drive in a day?', hint: '12 rides × (~10 km paid + ~2.5 km empty pickup/reposition) ≈ ~150 km/day!' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Shift Hours × Utilization % ÷ Full Ride Cycle Time (Pickup + Wait + Trip + Reposition)', correct: true, feedback: 'Textbook time-motion operations breakdown!' },
        { label: 'Delhi Rides ÷ 10,000 Drivers', correct: false, feedback: 'Circular—you need rides/driver to find total drivers!' },
        { label: 'Fuel Tank Capacity ÷ Mileage', correct: false, feedback: 'Doesn’t tell you ride count vs trip length or idle AC running.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'shiftHrs', label: 'Daily Shift Hours', defaultVal: 11, min: 6, max: 14, step: 1, unit: 'hrs' },
        { key: 'utilPct', label: 'Active Utilization %', defaultVal: 80, min: 55, max: 95, step: 5, unit: '%' },
        { key: 'tripMins', label: 'Avg Paid Trip Mins', defaultVal: 28, min: 15, max: 45, step: 2, unit: 'mins' },
        { key: 'overheadMins', label: 'Pickup + Wait + Idle Mins', defaultVal: 15, min: 5, max: 25, step: 2, unit: 'mins' }
      ],
      computeFormulaText: '(Shift Hrs × 60 × Util%) ÷ (Paid Trip Mins + Overhead Mins)',
      compute: (v) => {
        const prodMins = v.shiftHrs * 60 * (v.utilPct / 100);
        const cycle = v.tripMins + v.overheadMins;
        const rides = prodMins / cycle;
        return {
          value: rides,
          formatted: `${rides.toFixed(1)} Rides/Day`,
          breakdown: [
            { label: 'Total Cycle Time', val: `${cycle} mins/ride` },
            { label: 'Est. Daily Gross (@ ₹230)', val: `₹${Math.round(rides * 230).toLocaleString('en-IN')}` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-bandra-worli-cars',
    title: 'Number of Cars Crossing Bandra–Worli Sea Link Monthly',
    prompt: 'Estimate the number of cars crossing the Bandra–Worli Sea Link (Mumbai) in a month.',
    difficulty: 3,
    archetype: 'Supply & Capacity',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-bottleneck',
    tags: ['Mumbai', 'Infrastructure', 'Toll / Traffic', 'Meesho'],
    clarifyingQuestions: [
      { q: 'Passenger cars ONLY (excluding buses, taxis/commercial if specified, or include cabs as cars)?', a: 'Include private cars + cabs (The baseline takes 70% cars out of total vehicles; note 2W & heavy trucks are banned on Sea Link!).', why: 'Remember: 2-wheelers and autos are NOT allowed on Bandra–Worli Sea Link!' },
      { q: 'Counting total crossings across BOTH directions (Northbound + Southbound)?', a: 'Yes, total bridge crossings (if toll booths = 8–16 across both/one-way plaza).', why: 'Clarifies directionality.' }
    ],
    strategyOverview: 'Toll Booth Bottleneck Throughput Model! Assume toll plaza operates 24 hrs with 8–16 booths (The baseline assumes 8 booths). Split 24 hrs into Low (10 hrs @ 1 veh/2 min = 30/hr across booths? Note: Check Baseline arithmetic! Baseline took 30/hr × 10 hrs = 300 veh TOTAL instead of 30/hr PER BOOTH × 8 booths = 2,400!! Let’s inspect the Sanity Check!).',
    formula: 'Monthly Cars = Daily Vehicles (Active Booths × Hrs × Flow Rate) × (5 WD + 2×1.25 WE) × 4 Weeks × Car Share %',
    assumptions: [
      { label: '8 Toll Booths (or 8 active lanes across directions), 24 hrs/day: Low 10h, Med 6h, High 8h', rationale: 'Morning South Mumbai office rush & evening Bandra return rush.' },
      { label: 'Rate PER BOOTH: Low (1/2 min = 30/hr), Med (1/30s = 120/hr), High (1/10s = 360/hr)', rationale: 'CRITICAL MATH CHECK: Look carefully at the common pitfall: many drafts wrote "8 booths" and "Every hour in ALL booths: Low 30/hr × 10 = 300, Med 120 × 6 = 720, High 360 × 8 = 2,880 → 3,900 veh/day"! Wait: 1 car every 10 seconds through ONE booth = 360 cars/hr per booth, NOT across 8 booths combined! Across 8 booths (say 4 active at peak), 4 booths × 360/hr × 8 hrs = 11,520 + off-peak = ~15,000–30,000 vehicles/day!' },
      { label: 'Car Share: On Sea Link, ~90–95% of vehicles are 4W Cars/Cabs (2W & autos prohibited!)', rationale: 'Baseline The baseline got 81,900 cars/month (~2,700/day), whereas REAL Bandra-Worli Sea Link handles ~35,000–45,000 vehicles/DAY = ~10–13 Lakh cars/month!' }
    ],
    tree: {
      label: 'Bandra–Worli Sea Link (8 Active Lanes/Booths)',
      valueText: 'Per-Booth Flow × Active Booths',
      children: [
        { label: 'Baseline Baseline Calc (3,900/day × 7.5 eq. days/wk × 4 wks × 70%)', valueText: '81,900 Cars/Mo (~2.7K/day)' },
        { label: 'Corrected Multi-Booth Calc (~4 active booths avg × ~40K veh/day × 30d × 90% cars)', valueText: '~10–12 Lakh Cars/Month', highlight: true }
      ]
    },
    finalAnswer: '~8 – 13 Lakh Cars/Month (~30,000–40,000/day) [Baseline: 81,900/mo]',
    acceptableRange: { min: 500000, max: 1800000, unit: 'Cars/month', display: '5 Lakh – 18 Lakh cars/month (real: ~10–12L/mo)' },
    sanityCheck: 'CRITICAL SANITY CHECK: An iconic 8-lane sea bridge in Mumbai costing ₹1,600 Crore would be empty if only 2,700 cars crossed it per day (1 car every 30 seconds across an entire 8-lane highway!). In reality, ~35,000–40,000 cars cross BWSL daily (~11–12 Lakh/month). Catching the missing `× Active Booths` multiplier is why sanity checks are a superpower!',
    interviewerTrap: 'Computing flow rate per SINGLE toll booth (1 car every 10 sec = 360/hr) and forgetting to multiply by the number of active booths!',
    variations: [
      { question: 'Estimate daily toll revenue collected on the Bandra–Worli Sea Link.', hint: '35,000 cars/day × ₹85 one-way toll ≈ ~₹30 Lakh/day (~₹9 Crore/month)!' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Active Toll Booths × (Peak/Med/Low Hours × Cars/Hr/Booth) × Days/Month × Car %', correct: true, feedback: 'Spot on! Always multiply per-booth flow rate by active booths AND sanity check cars/day!' },
        { label: 'Mumbai Cars ÷ 2', correct: false, feedback: 'Most Mumbai cars never cross from Bandra to Worli on any given day.' },
        { label: 'Bridge Length ÷ Car Length', correct: false, feedback: 'Measures stationary bumper-to-bumper capacity, not monthly traffic flow.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'activeBooths', label: 'Avg Active Booths', defaultVal: 4, min: 2, max: 8, step: 1, unit: 'booths' },
        { key: 'peakRate', label: 'Peak Cars/Hr/Booth', defaultVal: 300, min: 120, max: 450, step: 30, unit: '/hr' },
        { key: 'offRate', label: 'Avg Non-Peak Cars/Hr/Booth', defaultVal: 70, min: 20, max: 150, step: 10, unit: '/hr' },
        { key: 'carPct', label: 'Passenger Car Share %', defaultVal: 90, min: 65, max: 98, step: 5, unit: '%' }
      ],
      computeFormulaText: 'Active Booths × [(8h × Peak) + (16h × OffPeak)] × 30 Days × Car%',
      compute: (v) => {
        const dailyVeh = v.activeBooths * (8 * v.peakRate + 16 * v.offRate);
        const monthlyCarsL = (dailyVeh * 30 * (v.carPct / 100)) / 1e5;
        return {
          value: monthlyCarsL,
          formatted: `${monthlyCarsL.toFixed(1)} Lakh Cars/Month`,
          breakdown: [
            { label: 'Daily Vehicles Crossing', val: `${Math.round(dailyVeh).toLocaleString('en-IN')}/day` },
            { label: 'Est. Monthly Toll (@ ₹85)', val: `₹${(monthlyCarsL * 85 / 100).toFixed(1)} Crore` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-ac-sales-delhi',
    title: 'Annual Air Conditioner Sales in Delhi',
    prompt: 'Estimate the annual sales (units) of air conditioners in Delhi.',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Replacement & Stock-Flow',
    templateId: 'tpl-durable',
    tags: ['Appliances', 'Delhi', 'Replacement Cycle', 'Meesho'],
    clarifyingQuestions: [
      { q: 'Residential households only, or commercial offices/malls/schools too?', a: 'Residential ACs only first (mention ~20–25% commercial uplift if needed).', why: 'Ties cleanly to Delhi households.' },
      { q: 'Include first-time buyers in addition to replacement sales?', a: 'The baseline models pure replacement (1.29M); adding ~3–5% first-time/new home buyers boosts accuracy!', why: 'Complete durable formula = Replacement + New Growth.' }
    ],
    strategyOverview: 'Household Durable Replacement Model! Delhi Pop (30M) ÷ 4 members/household = 7.5M households. Segment by Income: Upper (20% = 1.5M), Middle (60% = 4.5M), Lower (20% = 1.5M). Apply AC Penetration (100%, 60%, 20% → 4.5M owning HH) and ACs per Household (4, 1.5, 1) → Total Installed Stock = 10.35 Million ACs! Divide by 8-year lifespan = 1.29 Million (~12.9 Lakh) ACs sold/year!',
    formula: 'Annual ACs = (Total Residential AC Stock ÷ 8-Yr Lifespan) + New Household Adoption',
    assumptions: [
      { label: 'Delhi Pop = 30M; HH Size = 4 → 7.5M Households', rationale: 'Standard NCR residential base.' },
      { label: 'Upper (1.5M × 100% × 4 ACs = 6.0M) + Middle (4.5M × 60% × 1.5 ACs = 4.05M) + Lower (1.5M × 20% × 1 AC = 0.3M)', rationale: 'Total installed base = 10.35 Million ACs (note Delhi summers hit 47°C, driving huge AC adoption!).' },
      { label: 'AC Lifespan = 8 Years → Replacement Demand = 10.35M ÷ 8 = 1.294 Million ACs/year', rationale: 'Plus ~2–3% annual new household/first-time upgrades (~2–3 Lakh).' }
    ],
    tree: {
      label: 'Delhi Households (30M ÷ 4 = 7.5M HH)',
      valueText: '7.5M HH',
      children: [
        { label: 'Upper (1.5M × 100% × 4 ACs)', valueText: '6.00M ACs' },
        { label: 'Middle (4.5M × 60% × 1.5 ACs)', valueText: '4.05M ACs', highlight: true },
        { label: 'Lower (1.5M × 20% × 1 AC)', valueText: '0.30M ACs' },
        {
          label: 'Total Stock = 10.35M ACs ÷ 8 Yr Lifespan',
          valueText: '12.94 Lakh (1.29M) ACs/Yr',
          highlight: true
        }
      ]
    },
    finalAnswer: '~10 – 15 Lakh ACs Sold/Year in Delhi (~1.29M)',
    acceptableRange: { min: 700000, max: 2000000, unit: 'ACs/year', display: '7 Lakh – 20 Lakh ACs/year' },
    sanityCheck: 'India sells ~1.1–1.3 Crore (~11–13M) room ACs annually! Delhi NCR accounts for ~10–12% of national residential AC sales (~11–15 Lakh units/year) due to extreme summer heat and high urban income! Dead-on!',
    interviewerTrap: 'Assuming only 1 AC per household in upper/upper-middle Delhi homes (many 3BHKs have 2–4 ACs!) OR forgetting to divide total stock by 8-year lifespan.',
    variations: [
      { question: 'Estimate the annual electricity consumption (MWh) of residential ACs in Delhi during summer.', hint: '10.35M ACs × ~50% running 8 hrs/day × 1.5 kW × 120 summer days!' }
    ],
    guidedPractice: {
      correctApproach: 'Stock & Replacement',
      funnelOptions: [
        { label: 'Delhi Pop ÷ HH Size → Income Penetration × ACs/HH → Total Stock ÷ Lifespan (+ New Adoption)', correct: true, feedback: 'Spot on! Accounting for multi-AC households + 8-year replacement lifespan nails this.' },
        { label: 'Electronic Stores × 50', correct: false, feedback: 'Online marketplaces + seasonality make store averages tough.' },
        { label: '7.5M Households × 1', correct: false, feedback: 'Not every household buys a brand-new AC every year!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'hhM', label: 'Delhi Households (M)', defaultVal: 7.5, min: 5, max: 10, step: 0.5, unit: 'M' },
        { key: 'avgAC', label: 'Avg ACs / Household (blended)', defaultVal: 1.38, min: 0.7, max: 2.2, step: 0.1, unit: 'ACs' },
        { key: 'life', label: 'Avg Lifespan (Yrs)', defaultVal: 8, min: 5, max: 12, step: 1, unit: 'yrs' },
        { key: 'newUplift', label: 'First-Time/Commercial Uplift %', defaultVal: 15, min: 0, max: 35, step: 5, unit: '%' }
      ],
      computeFormulaText: '(Households × Avg ACs ÷ Lifespan) × (1 + Uplift%)',
      compute: (v) => {
        const rep = (v.hhM * v.avgAC) / v.life;
        const total = rep * (1 + v.newUplift / 100);
        return {
          value: total * 10,
          formatted: `${(total * 10).toFixed(1)} Lakh ACs/Yr`,
          breakdown: [
            { label: 'Installed AC Base', val: `${(v.hhM * v.avgAC).toFixed(2)} Million` },
            { label: 'Est. Revenue (@ ₹35K)', val: `₹${Math.round(total * 3500).toLocaleString('en-IN')} Cr` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-ev-4w-india',
    title: 'Market Size of Electric 4-Wheelers (EV Cars) in India',
    prompt: 'Estimate the annual market size (units sold) of passenger Electric Vehicles (4-wheelers) in India.',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Replacement & Stock-Flow',
    templateId: 'tpl-durable',
    tags: ['EV & Mobility', 'Automotive', 'India'],
    clarifyingQuestions: [
      { q: '4-wheeler personal cars only, or commercial EV fleets (BluSmart/Uber EV) too?', a: 'Personal 4-wheelers first (clarify ~10–15% commercial fleet uplift).', why: 'Matches household ownership funnel.' },
      { q: 'Annual sales or total EV car stock currently on roads?', a: 'Annual unit sales (Stock ÷ Lifespan or Annual Car Sales × EV Share).', why: 'Always check whether installed stock or annual sales!' }
    ],
    strategyOverview: 'Compare an Unchecked Stock Model vs Real-World EV Penetration Check! Unchecked Stock Model: Urban Pop (35% = 560M; wait 35% of 1.4B is 490M, The baseline wrote 560M = 40%) ÷ 4 = 140M Urban HH → Exclude BPL (10%) → Lower Mid (70M × 20% × 1 = 14M cars), Upper Mid (42M × 60% × 2 = 50.4M cars), High (14M × 100% × 3 = 42M cars) = 106.4M cars?! Wait—let’s sanity check! 106M personal cars in Urban India alone is 2.5x higher than ALL cars in India (~40–45M)! AND assuming 10–30% of those 106M cars are ALREADY EVs gives 17.64M EVs on road (and 1.76M sold/yr) — whereas India actually sells ~4M total cars/yr with ~2.5–4% EV share = ~1.2–2 Lakh EV cars/year! Let’s show BOTH the unadjusted baseline tree AND the realistic sanity-checked model!',
    formula: 'Realistic: Annual Car Sales (~4M) × EV Penetration Share (~3–5%) | Baseline: Urban Cars × EV% ÷ 10-Yr Life',
    assumptions: [
      { label: 'Baseline Funnel: Urban HH (140M) → ~106.4M cars → EV adoption 10% Upper-Mid (5.04M) + 30% High (12.6M) = 17.64M EVs ÷ 10-yr life = 1.76M EVs/yr', rationale: 'Great tree structure, BUT let’s check the numbers!' },
      { label: 'Sanity Check Adjustment: India has ~40–45M total personal cars (34/1000 pop!), selling ~4M new cars/year. Current EV 4W share is ~3–5% → ~1.2–2.0 Lakh EV cars/yr (rising to ~4–5 Lakh with 10% share)!', rationale: 'Explaining WHY 106M cars is 2.5x too high makes you sound like a seasoned partner!' }
    ],
    tree: {
      label: 'India Passenger 4W EV Market',
      valueText: 'Baseline: 1.76M | Real: ~1.5–4L/yr',
      children: [
        { label: 'Baseline Model: Urban HH (140M) → 106M cars → 17.64M EVs ÷ 10 yrs', valueText: '17.64 Lakh (1.76M)/yr' },
        { label: 'Sanity Check: Total Cars ~42M ÷ 10 yrs = 4.2M annual cars × 4–8% EV share', valueText: '~1.7 – 3.4 Lakh EVs/Yr', highlight: true }
      ]
    },
    finalAnswer: '~1.5 – 4 Lakh EV Cars/Year realistically (Baseline: 17.64 Lakh/year)',
    acceptableRange: { min: 100000, max: 1800000, unit: 'EV Cars/year', display: '1 Lakh – 18 Lakh EV cars/year' },
    sanityCheck: 'India’s entire passenger vehicle industry sells ~42 Lakh (4.2 Million) cars/year total (Maruti + Hyundai + Tata + Mahindra). EVs represent ~3–5% today (~1.5–2 Lakh/year) heading toward ~10% (~4 Lakh/year). Never accidentally report 17.6 Lakh EVs/yr without noticing that equals 42% of India’s car sales!',
    interviewerTrap: 'Assuming Upper-Middle Indian households own 2 cars each AND High Income own 3 cars each—creating 106M cars in urban India when India’s total 4-wheeler fleet is ~45M!',
    variations: [
      { question: 'Estimate Tata Motors’ annual EV revenue in India.', hint: '~2 Lakh EVs × ~60% Tata share = 1.2L cars × ₹13 Lakh avg = ~₹15,600 Crore!' }
    ],
    guidedPractice: {
      correctApproach: 'Stock & Replacement',
      funnelOptions: [
        { label: 'Total Annual Car Sales (Stock ÷ Lifespan + Growth) × EV Share % of New Sales', correct: true, feedback: 'Spot on! EV share of NEW car sales is much smaller than long-term target penetration.' },
        { label: 'Charging Stations × 1,000', correct: false, feedback: 'Charging infra lags vehicle sales and most EVs charge at home.' },
        { label: 'Urban Households × 30%', correct: false, feedback: 'Overstates total car ownership and annual replacement drastically.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'totalCarsM', label: 'India Total Personal Cars (M)', defaultVal: 42, min: 30, max: 60, step: 2, unit: 'M' },
        { key: 'life', label: 'Car Lifespan (Yrs)', defaultVal: 10, min: 7, max: 12, step: 1, unit: 'yrs' },
        { key: 'newGrowthM', label: 'First-Time Car Buyers (M/yr)', defaultVal: 1.0, min: 0.5, max: 2.0, step: 0.25, unit: 'M' },
        { key: 'evSharePct', label: 'EV % of New Sales', defaultVal: 5, min: 2, max: 25, step: 1, unit: '%' }
      ],
      computeFormulaText: '[(Cars ÷ Lifespan) + First-Time Buyers] × EV Share %',
      compute: (v) => {
        const annualCarsM = v.totalCarsM / v.life + v.newGrowthM;
        const evLakh = annualCarsM * (v.evSharePct / 100) * 10;
        return {
          value: evLakh,
          formatted: `${evLakh.toFixed(1)} Lakh EV Cars/Yr`,
          breakdown: [
            { label: 'Total Annual Car Sales', val: `${(annualCarsM * 10).toFixed(1)} Lakh` },
            { label: 'Market Size (@ ₹14L avg)', val: `₹${Math.round(evLakh * 14).toLocaleString('en-IN')} Cr` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-metro-trains-delhi',
    title: 'Number of Operational Metro Trains in Delhi NCR',
    prompt: 'Estimate the number of operational metro trains running across the Delhi NCR network.',
    difficulty: 4,
    archetype: 'Supply & Capacity',
    approachType: 'Hybrid (Demand + Supply)',
    templateId: 'tpl-bottleneck',
    tags: ['Public Transit', 'Delhi Metro', 'Demand vs Supply'],
    clarifyingQuestions: [
      { q: 'Counting full trainsets (each having 6–8 coaches), not individual coaches?', a: 'Operational trainsets (each 6 coaches, ~1,500 passenger capacity).', why: 'Prevents 6x–8x coach vs train confusion!' },
      { q: 'Should we estimate based on passenger demand OR network line length + headway?', a: 'Solve via Demand (Unique Riders × Trips ÷ Train Daily Capacity), then cross-check via Line Headway!', why: 'Two independent checks make your estimate bulletproof!' }
    ],
    strategyOverview: 'Hybrid Demand-to-Supply Matching! Step 1 (Daily Journeys Demanded): Delhi NCR Pop (30M) → Urban (80% = 24M) → Age Split (18–60 = 14.4M) × Metro Adoption (75%/50%/20%) = 6.66M → Income Filter (Lower Mid 50%, Upper Mid 30%, High 5% → 1.87M unique daily riders) × 1.7 avg trips/day = 3.18M daily journeys! Step 2 (Train Daily Capacity): 1 train (6 coaches × 250 = 1,500 capacity) × 8.5 trips/day = 12,750 journeys/train. Divide 3.18M ÷ 12,750 = 249 operational trains!',
    formula: 'Trains = Daily Metro Journeys Demanded ÷ (Train Capacity × Trips per Train per Day)',
    assumptions: [
      { label: 'Unique Daily Metro Riders = ~1.87M × 1.7 trips/day = 3.18M–6M daily passenger journeys', rationale: 'Note: Real DMRC logs ~4–6 Million daily passenger journeys (~2–3M unique commuters taking round trips = 2 trips/day!).' },
      { label: 'Train Capacity = 6 coaches × 250 pax/coach = 1,500 avg riders/trip × ~8.5–10 trips/day = ~12,750–15,000 journeys/train/day', rationale: 'Wait—check! A metro runs 17 hrs/day (6 AM–11 PM), with ~60–90 min per end-to-end trip = ~12–16 trips/day, though average occupancy across off-peak trips is ~50–60% (~12,000–15,000 passengers carried per train/day)!' },
      { label: 'Alternative Route Check: ~10 Metro lines × ~40 km avg ÷ ~35 km/h (~70 min one-way = 140 min round-trip) ÷ 5-min avg headway = ~28 trains/line × 10 lines = ~280 trains!', rationale: 'Real DMRC operates ~330–350 trainsets!' }
    ],
    tree: {
      label: 'Delhi Pop (30M) → Daily Metro Riders (1.87M)',
      valueText: '1.87M Riders × 1.7 trips',
      children: [
        { label: 'Total Daily Journeys Demanded', valueText: '3.17 Million Journeys/Day', highlight: true },
        { label: 'Daily Capacity per Train (1,500 × 8.5 trips)', valueText: '12,750 Journeys/Train' },
        { label: '3,170,160 ÷ 12,750 = Operational Metro Trains', valueText: '249 Trains (Headway check: ~280–330)', highlight: true }
      ]
    },
    finalAnswer: '~250 – 330 Operational Metro Trains',
    acceptableRange: { min: 180, max: 450, unit: 'Metro trains', display: '180 – 450 trains' },
    sanityCheck: 'Delhi Metro actually has ~340 trainsets (~300 operational daily + spares/maintenance) carrying ~50–60 Lakh journeys/day across 10+ lines! Both the Demand method (249 trains) and the Line Headway method (10 lines × 140m round-trip ÷ 5m headway = 280 trains) hit right inside the exact ballpark!',
    interviewerTrap: 'Assuming every train runs at 100% crush-load (1,500 people) on EVERY trip all day long (including 2 PM afternoon!) OR mixing up single coaches (~2,000) with whole trains (~300)!',
    variations: [
      { question: 'Estimate Delhi Metro’s daily ticket revenue.', hint: '3.2M–5M journeys × ₹30 avg fare ≈ ~₹10–15 Crore/day!' }
    ],
    guidedPractice: {
      correctApproach: 'Hybrid (Demand + Supply)',
      funnelOptions: [
        { label: 'Daily Metro Journeys Demanded ÷ (Train Capacity × Trips/Day), cross-checked via Lines × Round-Trip Time ÷ Headway', correct: true, feedback: 'Masterclass! Having both Demand÷Capacity AND Headway÷Round-Trip Time puts you in top 1% of candidates.' },
        { label: 'Metro Stations × 2', correct: false, feedback: 'Wait—stations vs trains depends on line length and train frequency, not 2 trains parked at every station.' },
        { label: 'Delhi Cars ÷ 1,000', correct: false, feedback: 'Metro adoption is much broader across middle/lower-middle commuters than car ownership.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'ridersM', label: 'Daily Unique Riders (M)', defaultVal: 2.2, min: 1.0, max: 3.5, step: 0.2, unit: 'M' },
        { key: 'tripsRider', label: 'Avg Trips / Rider / Day', defaultVal: 1.8, min: 1.2, max: 2.2, step: 0.1, unit: 'trips' },
        { key: 'paxPerTrip', label: 'Avg Pax / Train / Trip', defaultVal: 1200, min: 800, max: 1800, step: 100, unit: 'pax' },
        { key: 'tripsTrain', label: 'Trips / Train / Day', defaultVal: 10, min: 6, max: 16, step: 1, unit: 'trips' }
      ],
      computeFormulaText: '(Unique Riders × Trips/Rider) ÷ (Pax/Trip × Trips/Train)',
      compute: (v) => {
        const journeys = v.ridersM * 1e6 * v.tripsRider;
        const trainCap = v.paxPerTrip * v.tripsTrain;
        const trains = journeys / trainCap;
        return {
          value: trains,
          formatted: `${Math.round(trains)} Operational Trains`,
          breakdown: [
            { label: 'Total Daily Journeys', val: `${(journeys / 1e6).toFixed(2)} Million` },
            { label: 'Est. Total Coaches (×6–8)', val: `${Math.round(trains * 7).toLocaleString('en-IN')} coaches` }
          ]
        };
      }
    }
  },
  {
    id: 'vol2-theory-fast-food',
    title: 'Daily Revenue of a Fast Food Chain Outlet in New Delhi',
    prompt: 'Estimate the daily revenue of a fast-food chain outlet (e.g., McDonald’s / Burger King) in New Delhi.',
    difficulty: 2,
    archetype: 'Revenue & Cost',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-outlet',
    tags: ['QSR', 'Fast Food', 'Supply Capacity', '3 Channels'],
    clarifyingQuestions: [
      { q: 'Include Dine-in, Takeaway, and Delivery (Zomato/Swiggy), or Dine-in only?', a: 'Calculate Dine-in from seating capacity first, then add Takeaway + Delivery shares (~40–50% of total)!', why: 'In modern QSRs, Takeaway + Delivery can equal or exceed Dine-in!' },
      { q: 'High-street busy outlet or quiet residential mall?', a: 'Busy high-street outlet (~60 seats, open 12 hrs: 11 AM–11 PM).', why: 'Sets seating & operating hours cleanly.' }
    ],
    strategyOverview: 'Textbook QSR Channel + Seating Capacity Model! Total Revenue = Avg Price × Items Sold across Dine-In, Takeaway, and Delivery. For Dine-In: Seats (60) × Operational Hours (12) × Avg Occupancy (50%) ÷ Avg Seat Duration (0.5 hr) = 720 dine-in customers × ₹250 avg bill = ₹1.80 Lakh/day (or in baseline: items/person × ₹100/item). Add Takeaway + Delivery (~40–50% of total orders) → ~₹2.5–3.2 Lakh/day!',
    formula: 'Daily Rev = [Seats × Hrs × Occupancy % ÷ Meal Duration × Avg Dine-In Bill] ÷ Dine-In Revenue Share %',
    assumptions: [
      { label: 'Seating = 60 seats; Open = 12 hrs/day (11 AM–11 PM); Blended Occupancy = 50% (80% peak, 30% off-peak)', rationale: 'Standard urban QSR footprint.' },
      { label: 'Avg Meal Duration = 30 mins (0.5 hr) → 720 dine-in customers/day (or ~300–400 orders if groups of 2 share tables!)', rationale: 'Note: 1 occupied seat usually means 1 individual meal (~₹200–250/person).' },
      { label: 'Channel Mix: Dine-In ~55%, Takeaway ~15%, Delivery ~30%', rationale: 'Delivery & takeaway bypass the seating bottleneck completely!' }
    ],
    tree: {
      label: 'QSR Outlet Revenue Channels',
      valueText: '~₹2.2 – 3.0 Lakh/Day',
      children: [
        { label: 'Dine-In: 60 seats × 12h × 50% ÷ 0.5h = 720 pax × ₹200', valueText: '₹1,44,000/day', highlight: true },
        { label: 'Takeaway (~15%) + Delivery (~30%) [= ~80% on top of Dine-In]', valueText: '~₹1,16,000/day' },
        { label: 'Total Daily Outlet Revenue', valueText: '~₹2.60 Lakh / Day (~₹78L/mo)', highlight: true }
      ]
    },
    finalAnswer: '~₹1.5 – ₹3.0 Lakh/Day (~₹45–90 Lakh/Month)',
    acceptableRange: { min: 80000, max: 400000, unit: '₹/day', display: '₹80,000 – ₹4,00,000/day' },
    sanityCheck: 'McDonald’s India (Westlife/Connaught Plaza) reports average annual sales per store of ~₹6–8 Crore/year = ~₹1.7–2.2 Lakh/day! Our channel-adjusted estimate (~₹2.2–2.6L/day) is spot on!',
    interviewerTrap: 'Only counting Dine-In seating capacity and forgetting that 40–50% of fast-food volume is Delivery & Takeaway (which aren’t capped by restaurant chairs)!',
    variations: [
      { question: 'What happens if the outlet cuts table time from 40 mins to 25 mins via self-order kiosks?', hint: 'Dine-in peak throughput jumps ~35–60% during rush hours!' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Dine-In (Seats × Hrs × Occupancy ÷ Seat Time × Ticket) + Takeaway & Delivery Channel Uplift', correct: true, feedback: 'Spot on! Always model Dine-In via seats and add Takeaway + Delivery separately.' },
        { label: 'Delhi Population ÷ 500 Outlets', correct: false, feedback: 'You don’t know total outlets or individual visit frequency across all chains.' },
        { label: 'Burgers Sold in Delhi ÷ 100', correct: false, feedback: 'Chain outlets also sell fries, beverages, wraps, and ice cream.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'seats', label: 'Dine-In Seats', defaultVal: 55, min: 20, max: 100, step: 5, unit: 'seats' },
        { key: 'occPct', label: 'Avg Seat Occupancy %', defaultVal: 45, min: 20, max: 75, step: 5, unit: '%' },
        { key: 'seatHrs', label: 'Avg Seat Duration (hrs)', defaultVal: 0.5, min: 0.3, max: 1.0, step: 0.1, unit: 'hrs' },
        { key: 'bill', label: 'Avg Spend / Person (₹)', defaultVal: 220, min: 120, max: 400, step: 20, unit: '₹' },
        { key: 'dineShare', label: 'Dine-In Share of Total Rev %', defaultVal: 55, min: 35, max: 80, step: 5, unit: '%' }
      ],
      computeFormulaText: '(Seats × 12h × Occ% ÷ SeatDuration × Spend) ÷ Dine-In Share%',
      compute: (v) => {
        const dineRev = (v.seats * 12 * (v.occPct / 100) / v.seatHrs) * v.bill;
        const totalRev = dineRev / (v.dineShare / 100);
        return {
          value: totalRev,
          formatted: `₹${(totalRev / 1e5).toFixed(2)} Lakh/Day`,
          breakdown: [
            { label: 'Dine-In vs Delivery/Takeaway', val: `₹${(dineRev/1e3).toFixed(0)}K / ₹${((totalRev-dineRev)/1e3).toFixed(0)}K` },
            { label: 'Annual Store Revenue', val: `₹${(totalRev * 365 / 1e7).toFixed(2)} Crore/Yr` }
          ]
        };
      }
    }
  }
);
