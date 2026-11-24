window.GM_DATA = window.GM_DATA || {};
window.GM_DATA.problems = window.GM_DATA.problems || [];

window.GM_DATA.problems.push(
  {
    id: 'iitg-watches-delhi',
    title: 'Number of Watches Currently in Use in Delhi',
    prompt: 'Estimate the number of wristwatches currently in use in Delhi.',
    difficulty: 1,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-durable',
    tags: ['Beginner Friendly', 'Delhi', 'Income Split', 'Smartwatches'],
    clarifyingQuestions: [
      { q: 'Include both analog/quartz watches and smartwatches/fitness bands?', a: 'Yes, all wristwatches in working condition currently in use.', why: 'Avoids arbitrarily slicing out smartwatches.' },
      { q: 'Assume 1 active watch per user at any moment, or collectors with multiple?', a: 'The baseline uses 1 watch/owner (mention collectors ~10% have 2+ for extra credit!).', why: 'Keeps mental math fast.' }
    ],
    strategyOverview: 'Clean Level-1 Income Split Funnel! Delhi Pop = 3 Crore (30M). Rural ~2% is ignored for simplicity. Split 3 Cr by Income: Upper (20%, 75% own a watch), Middle (40%, 50% own), Lower (40%, 25% own). Weighted ownership = (0.2×0.75) + (0.4×0.50) + (0.4×0.25) = 0.15 + 0.20 + 0.10 = 45%. 3 Cr × 45% = 1.35 Crore watches!',
    formula: 'Watches = Delhi Pop × ∑ (Income Share % × Watch Ownership %)',
    assumptions: [
      { label: 'Delhi Population = 3 Crore (ignore ~2% rural or absorb into lower)', rationale: 'Clean round benchmark.' },
      { label: 'Income Ownership: Upper (20% × 75%), Middle (40% × 50%), Lower (40% × 25%)', rationale: 'Blended 45% watch ownership (note: children 0–10 rarely wear watches, balanced slightly by affluent collectors owning 2–3 watches!).' }
    ],
    tree: {
      label: 'Delhi Population (3 Crore)',
      valueText: '3.0 Crore',
      children: [
        { label: 'Upper (20%) × 75% own', valueText: '45 Lakh' },
        { label: 'Middle (40%) × 50% own', valueText: '60 Lakh', highlight: true },
        { label: 'Lower (40%) × 25% own', valueText: '30 Lakh' },
        { label: 'Total Watches Currently in Use', valueText: '1.35 Crore Watches', highlight: true }
      ]
    },
    finalAnswer: '~1.2 – 1.5 Crore Watches in Delhi (Baseline: 1.35 Crore)',
    acceptableRange: { min: 8000000, max: 20000000, unit: 'Watches', display: '80 Lakh – 2 Crore watches' },
    sanityCheck: '45% penetration across 3 Crore people = roughly 1 in 2 Delhiites wears a wristwatch/smartwatch regularly. Very intuitive!',
    interviewerTrap: 'Forgetting to specify whether smartwatches count or dividing by lifespan (this asks for watches CURRENTLY IN USE, not annual sales!).',
    variations: [
      { question: 'Estimate the number of laptops in working condition in Delhi.', hint: 'Split into Personal (75L HH × weighted laptops/HH = 45L) + Work Laptops (1.5 Cr workers × 25% office × 25% laptops = 9.4L) × 90% working = ~49.5 Lakh laptops!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Delhi Pop → Income Brackets × Watch Ownership % (noting age/collectors balance)', correct: true, feedback: 'Cleanest beginner funnel! Easy fractions (3/20 + 4/20 + 2/20 = 9/20 = 45%) make mental math instant.' },
        { label: 'Watch Stores × 500', correct: false, feedback: 'Measures store inventory, not watches currently worn across 3 Crore residents.' },
        { label: '3 Cr ÷ 5-Year Battery Life', correct: false, feedback: 'Battery/watch lifespan is for annual sales, not watches currently in use.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popCr', label: 'Delhi Population (Cr)', defaultVal: 3.0, min: 2.0, max: 4.0, step: 0.5, unit: 'Cr' },
        { key: 'upOwn', label: 'Upper (20%) Own %', defaultVal: 75, min: 50, max: 95, step: 5, unit: '%' },
        { key: 'midOwn', label: 'Middle (40%) Own %', defaultVal: 50, min: 30, max: 75, step: 5, unit: '%' },
        { key: 'lowOwn', label: 'Lower (40%) Own %', defaultVal: 25, min: 10, max: 45, step: 5, unit: '%' }
      ],
      computeFormulaText: 'Pop × (0.2×Upper% + 0.4×Middle% + 0.4×Lower%)',
      compute: (v) => {
        const pct = 0.2 * v.upOwn + 0.4 * v.midOwn + 0.4 * v.lowOwn;
        const totalCr = v.popCr * (pct / 100);
        return {
          value: totalCr * 10,
          formatted: `${totalCr.toFixed(2)} Crore Watches`,
          breakdown: [
            { label: 'Blended Ownership', val: `${pct.toFixed(1)}%` },
            { label: 'Annual Sales (÷ 5 yr life)', val: `${(totalCr * 100 / 5).toFixed(1)} Lakh/yr` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-aeroplanes-flying',
    title: 'Number of Aeroplanes Flying in India Right Now',
    prompt: 'Estimate the number of aeroplanes flying in Indian airspace right now.',
    difficulty: 4,
    archetype: 'Supply & Capacity',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-bottleneck',
    tags: ['Little’s Law', 'Geometric Mean', 'Aviation', 'MBB Classic'],
    clarifyingQuestions: [
      { q: 'Commercial passenger flights ONLY (excluding military, private jets, cargo)?', a: 'Commercial passenger flights in Indian airspace right now.', why: 'Focuses on scheduled airport operations.' },
      { q: 'Do we assume a normal day/time window (non-festive)?', a: 'Yes, give a Peak vs Off-Peak range and geometric mean!', why: 'Showcases Little’s Law + Geometric Mean tricks.' }
    ],
    strategyOverview: 'Masterclass in Little’s Law (`Active = Takeoff Rate × Avg Flight Duration`) + Geometric Mean! Step 1: Avg domestic flight duration spans 1 to 4 hours → Geometric Mean = √(1×4) = 2 hours! Step 2: Segment India’s ~130 operational airports into Major (5 airports × 2 runways @ 5-min gap = 120/hr), Medium (25 airports × 1 runway @ 10-min gap = 150/hr), Small (100 airports × 1 runway @ 30-min gap = 200/hr) → Max Capacity = 470 takeoffs/hr → × 2 hrs = 940 (~1,000 flights at 100% capacity). Step 3: Adjust for airport utilization (25% off-peak to 75% peak → 250–750 range; GM = √(250×750) ≈ 400–430 planes in the air right now)!',
    formula: 'Planes in Air = (Hourly Airport Takeoffs across India × Avg Flight Duration) × Utilization %',
    assumptions: [
      { label: 'Avg Flight Duration = √(1 hr × 4 hrs) = 2 hours', rationale: 'Geometric mean of short hops (1h) and cross-country flights (3–4h).' },
      { label: '130 Airports: 5 Major (2 runways, 5m gap = 120/hr), 25 Medium (10m gap = 150/hr), 100 Small (30m gap = 200/hr) = 470/hr max', rationale: 'Note: Small regional airports only operate a few flights/day, which 25–75% utilization adjusts cleanly—or cross-check via Fleet Size!' },
      { label: 'Fleet Size Sanity Check: IndiGo (~350 planes) + Air India Group (~220) + SpiceJet/Akasa (~100) ≈ ~670–700 commercial planes in India, with ~55–65% airborne at daytime = ~400 planes!', rationale: 'BOTH Little’s Law AND Fleet Check land at ~400 planes! Mind-blowing accuracy!' }
    ],
    tree: {
      label: 'India Airport Supply (130 Airports, Max 470 Takeoffs/Hr)',
      valueText: '470/hr Max Capacity',
      children: [
        { label: '5 Major (2 rwy, 5m) + 25 Med (10m) + 100 Small (30m)', valueText: '120 + 150 + 200 = 470/hr' },
        { label: '× 2 Hr Avg Flight Duration (Little’s Law)', valueText: '940 (~1,000) Max Airborne' },
        { label: 'Peak (75% = 750) vs Off-Peak (25% = 250) → GM', valueText: '~400 – 430 Planes Flying Now', highlight: true }
      ]
    },
    finalAnswer: '~400 Planes in the air right now (Range: 250–750 depending on hour)',
    acceptableRange: { min: 200, max: 750, unit: 'Planes', display: '200 – 750 planes airborne' },
    sanityCheck: '400 flights × 150 seats × 80% load = 48,000 flyers airborne right now. Over 16 active flying hours (8 two-hour slots), 48,000 × 8 ≈ ~3.8–4.5 Lakh daily domestic air passengers (~14–15 Crore annual domestic air flyers in India)! Real DGCA traffic is ~15 Crore domestic passengers/year! Literally textbook perfection.',
    interviewerTrap: 'Assuming 100% airport takeoff capacity 24 hours a day (gives ~1,000 flights—impossible when India’s entire commercial fleet is ~700 aircraft!).',
    variations: [
      { question: 'How many people are currently in the air over India?', hint: '400 planes × 150 seats × 80% load = ~48,000 passengers + ~2,400 crew ≈ ~50,000 people!' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Airports by Tier × Hourly Takeoffs × Avg Flight Duration (Little’s Law) × Time-of-Day Utilization %', correct: true, feedback: 'Masterclass! Little’s Law + Airport Tiering + Fleet Sanity Check is unstoppable.' },
        { label: 'India Population × 0.01%', correct: false, feedback: 'Arbitrary guess without derivation.' },
        { label: 'Number of Pilots ÷ 2', correct: false, feedback: 'Pilots work in shifts and take rest days—airport/flight capacity is far cleaner.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'dailyTakeoffs', label: 'Daily Flights Across India', defaultVal: 3200, min: 1500, max: 5000, step: 200, unit: 'flights' },
        { key: 'activeHrs', label: 'Effective Active Day Hours', defaultVal: 16, min: 12, max: 20, step: 1, unit: 'hrs' },
        { key: 'avgDur', label: 'Avg Flight Duration (hrs)', defaultVal: 2.0, min: 1.5, max: 3.0, step: 0.25, unit: 'hrs' }
      ],
      computeFormulaText: '(Daily Flights ÷ Active Hrs) × Avg Flight Duration',
      compute: (v) => {
        const rate = v.dailyTakeoffs / v.activeHrs;
        const flying = rate * v.avgDur;
        return {
          value: flying,
          formatted: `${Math.round(flying)} Planes Airborne`,
          breakdown: [
            { label: 'Avg Takeoffs / Hr (India)', val: `${Math.round(rate)} flights/hr` },
            { label: 'People Airborne (~130 pax)', val: `${Math.round(flying * 130).toLocaleString('en-IN')}` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-tea-india-week',
    title: 'Cups of Tea Consumed in All of India Every Week',
    prompt: 'How many cups of tea are consumed in all of India every week?',
    difficulty: 1,
    archetype: 'Usage & Behavioral',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Beginner Friendly', 'India', 'Age Split', 'Weighted Average'],
    clarifyingQuestions: [
      { q: 'All types of tea (milk chai, black, green) across home + outside stalls?', a: 'Yes, total cups consumed across India in 7 days.', why: 'Covers full consumption.' },
      { q: 'Treat all 7 days of the week identically?', a: 'Yes, multiply daily weighted average per person by 7.', why: 'Keeps calculation swift.' }
    ],
    strategyOverview: 'Clean Expected-Value Table Approach! Start with India Pop = 140 Crore. Split by Age: 0–14 (25%: 90% drink 0, 10% drink 1 → 0.025/person), 15–25 (20%: 40% drink 0, 50% drink 1, 10% drink 2 → 0.14/person), 25+ (55%: 10% drink 0, 50% drink 1, 40% drink 2 → 0.715/person). Sum expected daily cups per Indian = 0.025 + 0.14 + 0.715 = 0.88 cups/day × 7 days × 140 Cr = 862.4 Crore (~850 Crore) cups/week!',
    formula: 'Weekly Cups = India Pop × [∑ (Age % × Frequency % × Cups/Day)] × 7 Days',
    assumptions: [
      { label: 'India Population = 140 Crore; Age split: 0–14 (25%), 15–25 (20%), 25+ (55%)', rationale: 'Tea habit builds in late teens/adulthood.' },
      { label: 'Weighted daily average = 0.88 cups/person overall (~1.2–1.5 cups/adult)', rationale: 'Note: Some heavy chai drinkers take 3–4 cups/day, balanced by South Indian coffee drinkers & non-drinkers.' }
    ],
    tree: {
      label: 'India Pop (140 Cr) → Weighted Daily Cups/Person = 0.88',
      valueText: '0.88 Cups/Person/Day',
      children: [
        { label: 'Age 0–14 (25%): 10% × 1 cup', valueText: '0.025 contribution' },
        { label: 'Age 15–25 (20%): 50%×1 + 10%×2', valueText: '0.140 contribution' },
        { label: 'Age 25+ (55%): 50%×1 + 40%×2', valueText: '0.715 contribution', highlight: true },
        { label: '0.88 × 7 Days × 140 Crore', valueText: '~850 – 862 Crore Cups/Week', highlight: true }
      ]
    },
    finalAnswer: '~850 Crore Cups/Week (~123 Crore cups/day)',
    acceptableRange: { min: 500, max: 1400, unit: 'Crore cups/week', display: '500 Cr – 1,400 Cr cups/week' },
    sanityCheck: 'India consumes ~1.1–1.2 Million tonnes (1.1B kg) of tea leaves annually! At ~2.5–3 grams of tea leaves per cup, that makes ~350–450 Billion cups/year ÷ 52 weeks ≈ ~700–850 Crore cups/week! Bullseye!',
    interviewerTrap: 'Assuming 100% of adults drink 3 cups/day (forgetting South India’s strong coffee culture and children 0–14!).',
    variations: [
      { question: 'How many video games are sold across all platforms in India annually?', hint: 'Same age-split matrix! Focus heavily on 10–30 age bracket × gaming PC/console/mobile ownership.' },
      { question: 'What is the average age of people who buy cars in India?', hint: 'Weight ages 22–30 (20%), 30–45 (55%), 45–60 (25%) → ~37–39 years!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Population → Age Group Brackets × Consumption Distribution (0/1/2 cups) × 7 Days', correct: true, feedback: 'Spot on! Expected-value probability tables look super clean and structured on a notepad.' },
        { label: 'Tea Estates in Assam × 1,000', correct: false, feedback: 'India exports a portion of tea leaves and varies yield by estate—consumer demand is way cleaner.' },
        { label: 'Milk Sold ÷ 100 ml', correct: false, feedback: 'Milk is drunk plain, used in curd, paneer, sweets, and coffee too!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popCr', label: 'India Pop (Crore)', defaultVal: 140, min: 130, max: 150, step: 5, unit: 'Cr' },
        { key: 'avgDaily', label: 'Weighted Avg Cups/Person/Day', defaultVal: 0.88, min: 0.5, max: 1.5, step: 0.05, unit: 'cups' }
      ],
      computeFormulaText: 'India Population × Weighted Cups/Person/Day × 7 Days',
      compute: (v) => {
        const wkCr = v.popCr * v.avgDaily * 7;
        return {
          value: wkCr,
          formatted: `${Math.round(wkCr)} Crore Cups/Wk`,
          breakdown: [
            { label: 'Daily Cups across India', val: `${Math.round(v.popCr * v.avgDaily)} Crore/day` },
            { label: 'Annual Tea Leaves (~2.5g/cup)', val: `${(wkCr * 52 * 0.0025 / 100).toFixed(2)}M Tonnes` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-chewing-gum',
    title: 'Market Size of Chewing Gum in India',
    prompt: 'Estimate the annual market size (revenue) of the chewing gum market in India.',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['FMCG', 'Impulse Buy', 'Age Frequency Matrix'],
    clarifyingQuestions: [
      { q: 'All chewing gums & bubble gums (Center Fresh, Happydent, Boomer, Orbit), or sugar-free mints too?', a: 'Chewing/bubble gums (typically ₹1–2/piece or ₹5–10 packs).', why: 'Sets average pack price cleanly.' }
    ],
    strategyOverview: 'Age × Frequency Matrix! India Pop = 140 Cr → Focus on Middle & Upper Income (50% = 70 Cr, ignoring rural/urban lower-income ~50%, though note kids everywhere buy ₹1 Center Fresh!). Segment 70 Cr by Age (excluding 0–14? Wait—kids 6–14 actually chew bubble gum too! The baseline excludes <15 & 50+ leaving ages 15–50 = 36 Cr!). Categorize each age bracket into High (2 packs/wk), Medium (1 pack/wk), Low (0.5 packs/wk) at ₹5/pack × 50 weeks/year = ₹8,000 Crore!',
    formula: 'Market Size = ∑ (Age Segment Consumers × Frequency Bucket % × Packs/Yr × Price/Pack)',
    assumptions: [
      { label: 'Focus Pool = 70 Cr (50% middle/high income); Active Ages 15–50 = 36 Cr (Baseline)', rationale: '18–24 has highest frequency (60% buy 2 packs/wk); 35–50 lowest.' },
      { label: 'Pack Price = ₹5 (4 pieces) | Weeks/Year = 50 (clean rounding!)', rationale: 'Note: In reality, Center Fresh/Happydent single ₹1–2 pieces dominate impulse paan-shop counter change! So ~₹2,500–5,000 Cr is real-world Indian gum market size (since not 100% of 18–50 buy packs every week!).' }
    ],
    tree: {
      label: 'Target Middle/Upper Ages 15–50 (~36 Cr)',
      valueText: '36 Cr People',
      children: [
        { label: '15–17 (7 Cr): Med/Low freq @ ₹250–500/yr', valueText: '₹1,062.5 Cr' },
        { label: '18–24 (7 Cr): High skew (60% × ₹500/yr)', valueText: '₹2,625 Cr', highlight: true },
        { label: '25–35 (11 Cr): Med skew', valueText: '₹2,375 Cr' },
        { label: '35–50 (11 Cr): Low skew', valueText: '₹1,937.5 Cr' },
        { label: 'Total Chewing Gum Market (Baseline)', valueText: '₹8,000 Crore / Year', highlight: true }
      ]
    },
    finalAnswer: '~₹3,000 – ₹8,000 Crore/Year (Baseline: ₹8,000 Cr)',
    acceptableRange: { min: 2000, max: 10000, unit: '₹ Crore/year', display: '₹2,000 Cr – ₹10,000 Cr/yr' },
    sanityCheck: 'India’s confectionery + gum industry is ~₹25,000–35,000 Crore, with chewing/bubble gum accounting for ~₹3,000–5,000 Cr (~15%). Mentioning that ₹5/week assumes 100% of middle/upper 15–50 chew gum weekly—and discounting by ~50% active gum chewers yields ~₹4,000 Cr—is super sharp!',
    interviewerTrap: 'Assuming 100% of an age group buys chewing gum every week without a "Non-Consumers = 0%" bucket!',
    variations: [
      { question: 'Estimate the market size of formal ties in India.', hint: 'White-collar corporate/hospitality/school uniform segments × ties bought/2–3 yrs × ₹500!' },
      { question: 'Estimate the annual size of socks sales in India.', hint: 'Urban/Mid-income + students × ~3–4 pairs/year × ₹120!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Pop → Income & Age Segments (incl. Non-Chewers) × Weekly/Monthly Frequency × 50 Weeks × Price', correct: true, feedback: 'Spot on! Including a Non-Chewer % keeps the estimate from inflating.' },
        { label: 'Paan Shops × 100 Jars', correct: false, feedback: 'Modern trade, supermarkets, and impulse queues sell large shares too.' },
        { label: 'Sugar Production ÷ 1,000', correct: false, feedback: 'Chewing gum uses negligible share of national sugar.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'chewersCr', label: 'Active Gum Chewers (Crore)', defaultVal: 20, min: 10, max: 40, step: 2, unit: 'Cr' },
        { key: 'packsYr', label: 'Avg ₹5-Packs / Chewer / Yr', defaultVal: 45, min: 15, max: 80, step: 5, unit: 'packs' },
        { key: 'packPrice', label: 'Avg Pack Price (₹)', defaultVal: 5, min: 2, max: 10, step: 1, unit: '₹' }
      ],
      computeFormulaText: 'Active Chewers × Packs/Year × Pack Price',
      compute: (v) => {
        const revCr = v.chewersCr * v.packsYr * v.packPrice;
        return {
          value: revCr,
          formatted: `₹${revCr.toLocaleString('en-IN')} Crore/Yr`,
          breakdown: [
            { label: 'Annual Spend / Chewer', val: `₹${v.packsYr * v.packPrice}/yr` },
            { label: 'Total Packs Sold', val: `${(v.chewersCr * v.packsYr / 100).toFixed(1)} Billion packs` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-atms-delhi',
    title: 'Number of ATMs in Delhi',
    prompt: 'Estimate the number of ATM machines currently in Delhi.',
    difficulty: 3,
    archetype: 'Supply & Capacity',
    approachType: 'Hybrid (Demand + Supply)',
    templateId: 'tpl-bottleneck',
    tags: ['Banking', 'Spatial Density', 'Delhi'],
    clarifyingQuestions: [
      { q: 'All bank ATMs across Delhi (both standalone and bank-branch attached)?', a: 'Yes, all active ATMs in Delhi.', why: 'Covers full cash withdrawal infrastructure.' },
      { q: 'Factor in UPI reducing cash ATM usage?', a: 'Great point to mention in sensitivity! The baseline models via ATM cards/population density.', why: 'Shows modern fintech awareness.' }
    ],
    strategyOverview: 'Two great ways! Method A (Card-Density Model): Delhi Pop (3 Cr ÷ 4 = 75L HH) → Income Split (Lower 40% × 1 card, Mid 40% × 2, Upper 20% × 4 → avg 2 cards/HH) = 1.5 Cr ATM/debit cards. Split into High-Density areas (60% = 90L cards @ 1 ATM per 5,000 cards = 1,800) + Low-Density areas (40% = 60L cards @ 1 ATM per 2,500 cards = 2,400) = 4,200 ATMs! Method B (Area Grid Check): Delhi Area ~1,500 sq km → ~700 sq km inhabited × ~6 ATMs/sq km = ~4,200 ATMs! Validate via monthly transactions: 1 ATM (16 hrs × 20 txns/hr = 320/day → ~7,200–9,000/mo) easily serves 5,000 cards (~1.5 withdrawals/card/month)!',
    formula: 'ATMs = (High-Density Cards ÷ Cards/ATM) + (Low-Density Cards ÷ Cards/ATM)',
    assumptions: [
      { label: 'Delhi Pop = 3 Cr (75L HH); Avg 2 ATM/Debit cards per household = 1.5 Cr cards', rationale: 'Working adults + Jan Dhan accounts.' },
      { label: 'High-Density (60% = 90L): 1 ATM / 5,000 cards | Low-Density (40% = 60L): 1 ATM / 2,500 cards', rationale: 'Low-density suburbs still need geographic coverage even with fewer users.' },
      { label: 'Transaction Validation: 16h × 20/hr (3m/txn) = 320 txns/day (~7,200–9,600/mo) for 5,000 cards', rationale: 'Means 1–1.5 ATM visits per card per month (realistic in the UPI era!).' }
    ],
    tree: {
      label: 'Delhi Households (75L) × 2 Cards = 1.5 Cr Cards',
      valueText: '1.5 Crore Cards',
      children: [
        { label: 'High-Density Areas (60% = 90L ÷ 5,000 cards/ATM)', valueText: '1,800 ATMs' },
        { label: 'Low-Density Areas (40% = 60L ÷ 2,500 cards/ATM)', valueText: '2,400 ATMs' },
        { label: 'Total ATMs in Delhi', valueText: '4,200 ATMs', highlight: true }
      ]
    },
    finalAnswer: '~4,000 – 5,000 ATMs in Delhi (Baseline: 4,200 ATMs)',
    acceptableRange: { min: 2500, max: 7000, unit: 'ATMs', display: '2,500 – 7,000 ATMs' },
    sanityCheck: 'India has ~2.1–2.2 Lakh ATMs nationwide. Delhi NCR accounts for ~2–2.5% of India’s population and ~4–5% of urban banking infrastructure → ~4,500–5,500 ATMs! Remarkably close to 4,200!',
    interviewerTrap: 'Using the exact same cards-per-ATM ratio across dense commercial markets and sparse residential outskirts!',
    variations: [
      { question: 'How much cash is dispensed across all ATMs in Delhi daily?', hint: '4,200 ATMs × ~120 withdrawals/day × ₹3,500 avg = ~₹175 Crore/day!' }
    ],
    guidedPractice: {
      correctApproach: 'Hybrid (Demand + Supply)',
      funnelOptions: [
        { label: 'Cards in City → High/Low Density Split ÷ Cards Supported per ATM (validated by txns/day)', correct: true, feedback: 'Spot on! Validating via 3-minute transaction turnaround time makes this bulletproof.' },
        { label: 'Delhi Population ÷ 1,000', correct: false, feedback: '30,000 ATMs in one city would mean an ATM in every apartment building!' },
        { label: 'Metro Stations × 2', correct: false, feedback: 'Misses thousands of bank branch and market-street ATMs.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'cardsLakh', label: 'Active Debit Cards in Delhi (L)', defaultVal: 150, min: 100, max: 220, step: 10, unit: 'L' },
        { key: 'txnsPerCardMo', label: 'ATM Visits / Card / Month', defaultVal: 1.5, min: 0.5, max: 3.0, step: 0.25, unit: '/mo' },
        { key: 'txnsPerAtmDay', label: 'Avg Txns / ATM / Day', defaultVal: 150, min: 80, max: 280, step: 10, unit: '/day' }
      ],
      computeFormulaText: '(Total Cards × Monthly Visits) ÷ (Txns/ATM/Day × 30 Days)',
      compute: (v) => {
        const atms = (v.cardsLakh * 1e5 * v.txnsPerCardMo) / (v.txnsPerAtmDay * 30);
        return {
          value: atms,
          formatted: `${Math.round(atms).toLocaleString('en-IN')} ATMs`,
          breakdown: [
            { label: 'Daily City Withdrawals', val: `${Math.round(v.cardsLakh * 1e5 * v.txnsPerCardMo / 30).toLocaleString('en-IN')}` },
            { label: 'Cards per ATM', val: `${Math.round(v.cardsLakh * 1e5 / atms).toLocaleString('en-IN')}` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-noodles-campus',
    title: 'Packets of Noodles Consumed Monthly at a Residential College Campus',
    prompt: 'How many packets of instant noodles (like Maggi) are consumed monthly at a residential college campus?',
    difficulty: 2,
    archetype: 'Usage & Behavioral',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Campus', 'FMCG', 'Segmented Frequency'],
    clarifyingQuestions: [
      { q: 'Are we estimating an IIT-sized residential campus (~7,000 students + resident faculty/staff families)?', a: 'Yes! Students + on-campus faculty/staff families (exclude daily non-resident workers/guards).', why: 'Captures ALL campus residents without leaking non-residents.' },
      { q: 'Both hostel canteen Maggi AND room-cooked packets?', a: 'Yes, total monthly packets consumed on campus.', why: 'Covers midnight hostel kettles + night canteens!' }
    ],
    strategyOverview: 'Micro-Community Segmentation! Resident Population = 7,000 Students + 700 Faculty/Staff (400 profs across 8 depts + 300 staff) with 1 avg family member each = 1,400 family members (8,400 total residents). Segment Students into Frequent (20% = 1,400 × 4/wk = 22.4K/mo), Medium (50% = 3,500 × 2/wk = 28K/mo), Light (30% = 2,100 × 1/wk = 8.4K/mo) → 58,800 packets/mo! Segment Staff Families similarly (lower frequency: 6/mo, 4/mo, 2/mo across 1,400 people = 5,320/mo). Total = ~64,120 (~65,000 packets/month)!',
    formula: 'Monthly Packets = ∑ (Student Tiers × Weekly Packets × 4) + ∑ (Faculty/Family Tiers × Monthly Packets)',
    assumptions: [
      { label: 'Campus Size = 7,000 Students + 1,400 Resident Faculty/Staff & Families = 8,400 people', rationale: 'Typical large IIT/NIT residential campus.' },
      { label: 'Students eat much more instant noodles (avg ~2.1 packs/wk = ~8.4/mo) vs Families (~3.8 packs/mo)', rationale: 'Late-night studying and hostel culture drive student Maggi demand!' },
      { label: 'Validation: 65,000 ÷ 30 ÷ 8,400 = 0.26 packets/person/day (~1 packet every 4 days)', rationale: 'Extremely realistic!' }
    ],
    tree: {
      label: 'Residential Campus (8,400 Residents)',
      valueText: '8,400 People',
      children: [
        { label: '7,000 Students: Freq 20% (22.4K) + Med 50% (28K) + Light 30% (8.4K)', valueText: '58,800 packets/mo', highlight: true },
        { label: '1,400 Staff & Families: Freq 20% (1.68K) + Med 50% (2.8K) + Light 30% (0.84K)', valueText: '5,320 packets/mo' },
        { label: 'Total Monthly Consumption', valueText: '~64,120 (~65,000) Packets/Mo', highlight: true }
      ]
    },
    finalAnswer: '~65,000 Packets/Month (~2,167 packets/day)',
    acceptableRange: { min: 35000, max: 100000, unit: 'Packets/month', display: '35,000 – 1,00,000 packets/month' },
    sanityCheck: '65,000 ÷ 30 = ~2,167 packets/day across 8,400 people = 1 packet every ~4 days per person (or ~1 packet every 3.5 days per student). Spot on for an IIT/college campus!',
    interviewerTrap: 'Only counting students and forgetting resident professors’ families (who have kids!) OR assuming 100% of students eat Maggi every single day.',
    variations: [
      { question: 'What is the monthly revenue of the campus night canteens from Maggi alone?', hint: 'If ~40% of 58,800 student packets (~23.5K) are bought cooked at ₹35/plate → ~₹8.2 Lakh/month!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Campus Residents (Students + Faculty Families) → Usage Frequency Buckets (High/Med/Low) × 4 Weeks', correct: true, feedback: 'Spot on! Always validate with average packets/person/day (~0.25/day).' },
        { label: 'Campus Area ÷ Packet Size', correct: false, feedback: 'Area has nothing to do with food consumption!' },
        { label: 'Hostel Rooms × 10', correct: false, feedback: 'Doesn’t justify frequency per student or faculty households.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'students', label: 'Hostel Students', defaultVal: 7000, min: 2000, max: 12000, step: 500, unit: 'ppl' },
        { key: 'stuWk', label: 'Avg Packs / Student / Week', defaultVal: 2.1, min: 0.5, max: 4.0, step: 0.2, unit: '/wk' },
        { key: 'staffFam', label: 'Resident Staff & Family', defaultVal: 1400, min: 0, max: 3000, step: 200, unit: 'ppl' },
        { key: 'famMo', label: 'Avg Packs / Family Member / Mo', defaultVal: 3.8, min: 1, max: 6, step: 0.4, unit: '/mo' }
      ],
      computeFormulaText: '(Students × Weekly Packs × 4) + (Staff/Family × Monthly Packs)',
      compute: (v) => {
        const total = v.students * v.stuWk * 4 + v.staffFam * v.famMo;
        return {
          value: total,
          formatted: `${Math.round(total).toLocaleString('en-IN')} Packets/Mo`,
          breakdown: [
            { label: 'Daily Consumption', val: `${Math.round(total / 30).toLocaleString('en-IN')} packets/day` },
            { label: 'Avg / Resident / Day', val: `${(total / 30 / (v.students + v.staffFam)).toFixed(2)} packs` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-hotel-shampoo-global',
    title: 'Hotel-Sized Mini Bottles of Shampoo Sold Every Year Globally',
    prompt: 'How many hotel-sized mini bottles of shampoo are sold (supplied to hotels) globally every year?',
    difficulty: 4,
    archetype: 'Supply & Capacity',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-outlet',
    tags: ['Global Hospitality', 'B2B Supply', 'Occupancy'],
    clarifyingQuestions: [
      { q: 'Counting mini single-stay bottles globally (noting luxury chains switching to wall dispensers)?', a: 'Yes, global mini shampoo bottles supplied to hotels (you can note wall-dispenser shift as a sensitivity!).', why: 'Huge real-world hospitality trend!' }
    ],
    strategyOverview: 'Global Hotel Room Supply Model! Estimate Major Travel Cities globally (~4,000 major cities) × ~15 hotels/city (10 provide mini bottles; others use dispensers/soaps) × 50 rooms/hotel = 20 Lakh (2M) eligible rooms. Avg Occupancy = 62.5% (25% peak @ 100% + 75% off-peak @ 50%) → 12.5 Lakh (1.25M) occupied rooms/day! Room mix: Studio (30%) & Suite (40%) use 1 bottle per 2-day stay (0.5/day); Family (30%) use 2 bottles per 2-day stay (1/day) → Weighted 0.65 bottles/occupied room/day × 1.25M × 365 = ~29.65 Crore (~30 Crore) bottles/year!',
    formula: 'Annual Bottles = Cities × Hotels Offering Minis × Rooms/Hotel × Avg Occupancy % × Bottles/Occupied Room/Day × 365',
    assumptions: [
      { label: '4,000 Major Cities × 10 hotels offering minis × 50 rooms = 2M eligible hotel rooms worldwide', rationale: 'Wait—check global hotel room benchmark! Real world has ~18–20 Million hotel rooms worldwide (~5–6M in upper/midscale offering mini bottles!), so 2M–5M is right in the ballpark!' },
      { label: 'Weighted Avg Occupancy = 62.5% → 1.25M occupied rooms/day', rationale: 'Matches global hospitality occupancy (~60–65%).' },
      { label: 'Consumption: 70% rooms use 0.5/day + 30% family rooms use 1/day = 0.65 bottles/room/day', rationale: 'Even if unused, housekeeping often replaces opened bottles!' }
    ],
    tree: {
      label: '4,000 Cities × 10 Hotels × 50 Rooms = 2M Eligible Rooms',
      valueText: '2M Rooms',
      children: [
        { label: '× 62.5% Avg Occupancy = 1.25M Occupied Rooms/Day', valueText: '1.25M occupied/day' },
        { label: '× Weighted 0.65 Bottles/Room/Day (0.7×0.5 + 0.3×1)', valueText: '8.125 Lakh bottles/day', highlight: true },
        { label: '× 365 Days', valueText: '~29.66 Crore (~300M) Bottles/Yr', highlight: true }
      ]
    },
    finalAnswer: '~30 Crore (300 Million) Mini Bottles/Year globally',
    acceptableRange: { min: 150, max: 1000, unit: 'Million bottles/yr', display: '150M – 1,000M mini bottles/year' },
    sanityCheck: 'Global tourism sees ~1.4 Billion international arrivals + ~5+ Billion domestic hotel nights/year. Roughly ~300–500M mini shampoo bottles/year (especially as Marriott/IHG phase them out for bulk dispensers) is super plausible!',
    interviewerTrap: 'Using global population top-down (hard to know how many nights each of 8B people stays in hotels!) instead of global room inventory supply-side!',
    variations: [
      { question: 'How much shampoo (in liters) goes into those 300M bottles?', hint: '300M × 30 ml/bottle = 9 Million Liters/year!' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Cities × Hotels Providing Minis × Avg Rooms × Occupancy % × Bottles per Room-Night × 365', correct: true, feedback: 'Spot on! Hospitality amenity sizing is always cleaner via room inventory × occupancy.' },
        { label: '8B Population × 2 Trips/Year', correct: false, feedback: 'Most global citizens stay with family/friends or don’t travel to hotels annually.' },
        { label: 'Plastic Bottles Recycled ÷ 100', correct: false, feedback: 'Impossible to know mini-hotel-bottle share of global plastic.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'roomsM', label: 'Eligible Hotel Rooms Globally (M)', defaultVal: 2.5, min: 1.0, max: 6.0, step: 0.5, unit: 'M' },
        { key: 'occPct', label: 'Avg Occupancy %', defaultVal: 62.5, min: 45, max: 80, step: 2.5, unit: '%' },
        { key: 'btlPerNight', label: 'Avg Bottles / Room-Night', defaultVal: 0.65, min: 0.3, max: 1.2, step: 0.05, unit: 'btls' }
      ],
      computeFormulaText: 'Global Eligible Rooms × Occupancy% × Bottles/Night × 365',
      compute: (v) => {
        const totalM = v.roomsM * (v.occPct / 100) * v.btlPerNight * 365;
        return {
          value: totalM,
          formatted: `${Math.round(totalM)} Million Bottles/Yr`,
          breakdown: [
            { label: 'Occupied Rooms / Night', val: `${(v.roomsM * v.occPct / 100).toFixed(2)} M` },
            { label: 'Liquid Volume (@ 30ml)', val: `${(totalM * 0.03).toFixed(1)}M Liters/yr` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-mazda-usa',
    title: 'Number of Mazda Dealerships in the USA',
    prompt: 'How many Mazda car dealerships are there in the USA?',
    difficulty: 4,
    archetype: 'Market Sizing',
    approachType: 'Hybrid (Demand + Supply)',
    templateId: 'tpl-durable',
    tags: ['USA Market', 'Automotive', 'Replacement + Growth', 'Market Share'],
    clarifyingQuestions: [
      { q: 'New-car franchised Mazda dealerships in the US?', a: 'Yes, official Mazda retail dealerships.', why: 'Links directly to annual new Mazda car sales!' }
    ],
    strategyOverview: 'Two-Phase Durable Demand → Dealer Capacity Model! Step 1 (Existing Car Stock): US Pop = 330M ÷ 2.5 household size = 132M households. Segment Urban (80% × 100% own × 75% mass-market = 79.2M) + Rural (20% × 60% own × 90% mass-market = 14.2M) = 93.4M non-luxury/low-to-mid cars! Step 2 (Annual New Sales): Replacement (93.4M ÷ 6-yr life = 15.57M) + 1% Growth (0.93M) = 16.5M annual cars sold! Step 3 (Mazda Share & Dealers): Mazda = ~2% market share = 3,30,000 Mazdas/year ÷ ~600 cars sold per dealer per year (50/month) = 550 Mazda dealers!',
    formula: 'Dealers = [(Existing US Cars ÷ Avg Life + Growth) × Mazda Market Share %] ÷ Annual Sales per Dealer',
    assumptions: [
      { label: 'US Pop = 330M; Avg HH Size = 2.5 → 132M Households; ~93.4M mass-market cars', rationale: 'USA has far higher car ownership (~1.8–2 cars/HH) and smaller households than India!' },
      { label: '6-Yr Replacement + 1% Growth → ~16.5M total US new cars/year (real US market is ~15–16M/yr!)', rationale: 'Incredible accuracy on total US annual vehicle sales!' },
      { label: 'Mazda US Share = ~2% (~3.3 Lakh cars/yr) ÷ 600 cars/year/dealer (50/month) = 550 dealers', rationale: 'Real Mazda USA has ~550–600 dealerships!' }
    ],
    tree: {
      label: 'US Pop (330M ÷ 2.5 = 132M HH) → 93.4M Stock',
      valueText: '93.4M Cars',
      children: [
        { label: 'Replacement (93.4M ÷ 6 yrs = 15.57M) + 1% Growth (0.93M)', valueText: '16.5M US Sales/Yr' },
        { label: 'Mazda Market Share (2% of 16.5M)', valueText: '3,30,000 Mazdas/Yr', highlight: true },
        { label: '÷ 600 Cars Sold/Dealer/Year (50/month)', valueText: '550 Mazda Dealers', highlight: true }
      ]
    },
    finalAnswer: '~550 Mazda Dealers in the USA',
    acceptableRange: { min: 350, max: 800, unit: 'Dealers', display: '350 – 800 dealerships' },
    sanityCheck: 'In reality, Mazda sells ~330,000–360,000 cars annually in the US across ~550–590 franchised dealerships (~2% US market share)! Both annual industry volume (16.5M) and Mazda dealer count (550) match official NADA/Mazda USA numbers almost to the digit!',
    interviewerTrap: 'Using Indian household size (4.4) or Indian car ownership rates for the USA! Always swap to US benchmarks (Pop 330M, HH Size 2.5, ~1.8 cars/HH).',
    variations: [
      { question: 'How many Maruti Suzuki dealerships are there in India?', hint: 'India ~4M annual cars × ~42% Maruti share ≈ ~1.68M cars ÷ ~450/dealer ≈ ~3,700 showrooms!' }
    ],
    guidedPractice: {
      correctApproach: 'Hybrid (Demand + Supply)',
      funnelOptions: [
        { label: 'US Households → Existing Cars → Annual Sales (Stock÷Life + Growth) × Mazda Share ÷ Sales/Dealer', correct: true, feedback: 'Spot on! Always pair US benchmarks (330M pop, 2.5 HH size) with Stock+Growth → Dealer Throughput.' },
        { label: '50 States × 5', correct: false, feedback: 'California and Texas have 20x more dealerships than Wyoming or Vermont!' },
        { label: 'Highway Miles ÷ 100', correct: false, feedback: 'Rural interstates don’t determine dealership counts—metro population & sales volume do.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'usSalesM', label: 'Total US Annual Car Sales (M)', defaultVal: 16.0, min: 12, max: 20, step: 0.5, unit: 'M/yr' },
        { key: 'mazdaPct', label: 'Mazda Market Share %', defaultVal: 2.0, min: 1.0, max: 4.0, step: 0.2, unit: '%' },
        { key: 'carsDealer', label: 'Avg Cars Sold / Dealer / Yr', defaultVal: 600, min: 300, max: 1000, step: 50, unit: 'cars' }
      ],
      computeFormulaText: '(Total US Annual Sales × Mazda Share%) ÷ Cars Sold/Dealer/Yr',
      compute: (v) => {
        const mazdaSales = v.usSalesM * 1e6 * (v.mazdaPct / 100);
        const dealers = mazdaSales / v.carsDealer;
        return {
          value: dealers,
          formatted: `${Math.round(dealers)} Dealers`,
          breakdown: [
            { label: 'Annual Mazdas Sold', val: `${Math.round(mazdaSales).toLocaleString('en-IN')}` },
            { label: 'Cars / Dealer / Month', val: `${(v.carsDealer / 12).toFixed(0)}` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-mall-loose-change',
    title: 'Loose Change Found on the Floor of an Average Mall in a Day',
    prompt: 'How much loose change (money) would you expect to find on the floor of an average shopping mall in a day?',
    difficulty: 4,
    archetype: 'Volume & Geometry',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-outlet',
    tags: ['Creative Proxy', 'Retail Mall', 'Probability'],
    clarifyingQuestions: [
      { q: 'Counting only dropped coins (change), or paper notes too?', a: 'Dropped coins primarily (₹1, ₹2, ₹5, ₹10).', why: 'Paper notes are much rarer to drop unnoticed, or clarify both!' },
      { q: 'Average Tier-1 urban mall open 16 hours/day (10 AM–10 PM / 12 AM)?', a: 'Standard 2-floor urban mall (~60 stores).', why: 'Sets store & counter capacity cleanly.' }
    ],
    strategyOverview: 'Spatial → Counter Capacity → Behavioral Drop Funnel! Step 1 (Mall Stores): 2 floors × 3,00,000 sq ft usable/floor = 6,00,000 sq ft ÷ 10,000 sq ft/store = 60 stores. Step 2 (Daily Visitors via Billing Counters): Peak 4 hrs (2 counters/store × 12 orders/hr × 60 stores ≈ 1,500 visitors/hr × 4 = 6,000) + Med 6 hrs (1,000/hr = 6,000) + Low 6 hrs (500/hr = 3,000) = 15,000 daily visitors! Step 3 (Coin Drop): 50% pay cash (note: in UPI India, cash is ~20–30%!) × 5% (or ~1% realistic!) lose a coin × ₹2–5 avg coin value = ₹750/day (Baseline; ~₹150–400/day in UPI India)!',
    formula: 'Loose Change = Daily Mall Visitors × Cash Payment % × Coin Drop Probability % × Avg Coin Value',
    assumptions: [
      { label: '60 Stores in Mall (6L usable sq ft ÷ 10k sq ft/store) → 15,000 daily visitors via billing throughput', rationale: 'Clever bottom-up way to estimate mall footfall from scratch!' },
      { label: 'Cash Buyers = 50% (Baseline; ~25% in 2026 UPI-first malls) | Drop Rate = 5% (or 1% realistic) | Avg Coin = ₹2–5', rationale: 'Notice 5% means 1 in 20 cash payers drops a coin—pretty clumsy! Realistically ~1% (1 in 100 cash payers) drops a ₹5 coin = ~₹200–350/day.' }
    ],
    tree: {
      label: 'Mall Usable Area (6L sq ft) ÷ 10K/Store = 60 Stores',
      valueText: '15,000 Visitors/Day',
      children: [
        { label: 'Peak (4h × 1,500) + Med (6h × 1,000) + Low (6h × 500)', valueText: '15,000 shoppers' },
        { label: '× 50% Cash Buyers (7,500) × 5% Drop Rate (375 coins)', valueText: '375 dropped coins' },
        { label: '× ₹2 Avg Coin Value', valueText: '₹750 / Day (UPI-adjusted: ~₹200–400)', highlight: true }
      ]
    },
    finalAnswer: '~₹200 – ₹750 / Day (Baseline: ₹750/day)',
    acceptableRange: { min: 100, max: 1200, unit: '₹/day', display: '₹100 – ₹1,200/day' },
    sanityCheck: 'Walking around a huge mall, housekeeping sweeps up maybe 30–100 dropped ₹1/₹2/₹5 coins across 60 stores, food court, and parking = ~₹150–500/day! Mentioning UPI reducing physical cash usage in India adds brilliant modern realism.',
    interviewerTrap: 'Guessing a flat number like "₹500" without breaking down (1) Mall Footfall AND (2) Cash Transaction % × Drop Probability × Avg Coin Value!',
    variations: [
      { question: 'How much change falls into a typical sofa per year?', hint: 'Urban households × % using cash × loose pocket coin drop probability × ₹5.' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Mall Area ÷ Store Size → Counter Throughput Footfall × Cash Payment % × Drop Probability × Avg Coin', correct: true, feedback: 'Textbook! Turning a weird brainteaser into Store Area → Counter Footfall → Drop Funnel is pure consulting magic.' },
        { label: 'Mall Revenue × 1%', correct: false, feedback: '1% of a mall’s revenue would be ₹1+ Lakh/day lying on the floor!' },
        { label: 'Security Guards × ₹100', correct: false, feedback: 'Unrelated proxy.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'visitors', label: 'Daily Mall Visitors', defaultVal: 15000, min: 5000, max: 35000, step: 2500, unit: 'ppl' },
        { key: 'cashPct', label: 'Cash Payment %', defaultVal: 30, min: 10, max: 60, step: 5, unit: '%' },
        { key: 'dropPct', label: 'Drop Coin Probability %', defaultVal: 2, min: 0.5, max: 5, step: 0.5, unit: '%' },
        { key: 'avgCoin', label: 'Avg Coin Value (₹)', defaultVal: 4, min: 1, max: 10, step: 1, unit: '₹' }
      ],
      computeFormulaText: 'Daily Visitors × Cash% × Drop Probability% × Avg Coin Value',
      compute: (v) => {
        const rs = v.visitors * (v.cashPct / 100) * (v.dropPct / 100) * v.avgCoin;
        return {
          value: rs,
          formatted: `₹${Math.round(rs)} / Day`,
          breakdown: [
            { label: 'Cash Shoppers', val: `${Math.round(v.visitors * v.cashPct / 100).toLocaleString('en-IN')}` },
            { label: 'Coins Dropped / Day', val: `${Math.round(v.visitors * v.cashPct/100 * v.dropPct/100)} coins` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-newspaper-words',
    title: 'How Many Words Are in an Average Daily Newspaper?',
    prompt: 'Estimate the total number of words in an average daily broadsheet newspaper (e.g., Times of India / The Hindu).',
    difficulty: 3,
    archetype: 'Volume & Geometry',
    approachType: 'Geometry & Proxy',
    templateId: 'tpl-geometry',
    tags: ['Spatial / Area', 'Print Media', 'Word Density'],
    clarifyingQuestions: [
      { q: 'Standard broadsheet English daily (approx. 20–24 pages), excluding classifieds/supplements?', a: 'Standard 24-page daily broadsheet (4 full-page ad/photo pages → 20 content pages).', why: 'Sets page count cleanly.' },
      { q: 'Total words printed, or UNIQUE vocabulary words?', a: 'Total word count first (see Variations for unique words!).', why: 'Unique words is a classic follow-up curveball!' }
    ],
    strategyOverview: 'Spatial Print-Area Method! Page dimensions = 12 in × 20 in = 240 sq in. Subtract ~33% photos/ads (80 sq in) and borders/margins (~56–60 sq in, leaving ~100 sq in net text area/page). Split net text into 90% body copy (90 sq in × 30 words/sq in = 2,700) + 10% headlines (10 sq in × 8 words/sq in = 80) = 2,780 words/page × 20 text pages = 55,600 (~50,000–60,000 words)! Validate via Article Count: ~200 articles × ~250–300 words/article = ~50,000–60,000 words!',
    formula: 'Total Words = Text Pages × (Net Text Area × Weighted Words per Sq Inch)',
    assumptions: [
      { label: 'Page Size = 12" × 20" = 240 sq in; 24 pages total (4 pages full-page ads/photos → 20 content pages)', rationale: 'Broadsheet dimensions (actually ~13"×21" ≈ 273 sq in; 12×20 is super clean!).' },
      { label: 'Net Text Area per Page ≈ 100 sq in (after ~33% images/ads + ~24% margins/gutters)', rationale: '90% body text (@ 30 words/sq in) + 10% headlines (@ 8 words/sq in) = 2,780 words/page.' },
      { label: 'Validation: 2,780 × 20 = 55,600 words ≈ ~200 articles × ~275 words/article', rationale: 'Matches real newspaper editorial word counts (~50K–80K words)!' }
    ],
    tree: {
      label: '24-Page Broadsheet (12" × 20" = 240 sq in/page)',
      valueText: '20 Content Pages',
      children: [
        { label: 'Minus Images/Ads (80 sq in) & Margins/Spacing (60 sq in)', valueText: '100 sq in text/page' },
        { label: 'Body (90 sq in × 30 w/in²) + Headings (10 sq in × 8 w/in²)', valueText: '2,780 words/page', highlight: true },
        { label: '× 20 Content Pages', valueText: '55,600 (~55K) Words', highlight: true }
      ]
    },
    finalAnswer: '~50,000 – 65,000 Words (Baseline: 55,600 words)',
    acceptableRange: { min: 30000, max: 90000, unit: 'Words', display: '30,000 – 90,000 words' },
    sanityCheck: 'An average news story runs ~250–400 words. With ~8–10 stories per page across 20 pages (~180 articles × ~300 words) = ~54,000 words! Also ~8 columns × ~150 lines × ~5 words/line × ~10 full text-equivalent pages = 60,000 words!',
    interviewerTrap: 'Forgetting to subtract full-page advertisements (front-page jackets, classifieds) and images (~40–50% of a real newspaper is ads & photos!).',
    variations: [
      { question: 'Estimate the number of UNIQUE words in a newspaper.', hint: 'Heaps’ Law / sample-sentence trick! In 55,000 total words, common stopwords ("the, is, a, in") repeat constantly—unique vocabulary is roughly ~4,000–7,000 words (~8–12%)!' }
    ],
    guidedPractice: {
      correctApproach: 'Geometry & Proxy',
      funnelOptions: [
        { label: 'Page Dimensions → Subtract Ads/Images/Margins → Body vs Headline Word Density × Text Pages (check via Articles)', correct: true, feedback: 'Spot on! Dual-checking via Article Count × Avg Words/Article confirms your spatial math.' },
        { label: 'Weight of Newspaper ÷ Weight of Ink', correct: false, feedback: 'Impossible to estimate ink weight per word mentally!' },
        { label: 'Number of Journalists × 5,000', correct: false, feedback: 'Syndicated feeds (PTI/Reuters), ads, and editing make journalist count noisy.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'pages', label: 'Text-Bearing Pages', defaultVal: 20, min: 10, max: 32, step: 2, unit: 'pages' },
        { key: 'netSqIn', label: 'Net Text Area / Page (sq in)', defaultVal: 100, min: 60, max: 160, step: 10, unit: 'in²' },
        { key: 'wordsSqIn', label: 'Avg Words / Sq Inch', defaultVal: 28, min: 18, max: 38, step: 2, unit: 'w/in²' }
      ],
      computeFormulaText: 'Text Pages × Net Text Area/Page × Avg Words/Sq In',
      compute: (v) => {
        const words = v.pages * v.netSqIn * v.wordsSqIn;
        return {
          value: words,
          formatted: `${words.toLocaleString('en-IN')} Words`,
          breakdown: [
            { label: 'Words / Page', val: `${(v.netSqIn * v.wordsSqIn).toLocaleString('en-IN')}` },
            { label: 'Est. Articles (~280 w)', val: `${Math.round(words / 280)} articles` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-fuel-station-mumbai',
    title: 'Daily Revenue of an Average Fuel Station in Mumbai',
    prompt: 'Estimate the daily revenue of an average petrol/diesel fuel station in Mumbai.',
    difficulty: 3,
    archetype: 'Revenue & Cost',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-outlet',
    tags: ['Energy / Retail', 'Mumbai', 'Pump Capacity'],
    clarifyingQuestions: [
      { q: 'Focus on petrol + diesel retail fuel revenue (ignoring negligible air-check/lubricant bottle add-ons)?', a: 'Yes, petrol & diesel sales (CNG optional if noted).', why: 'Fuel accounts for 98%+ of pump revenue.' },
      { q: 'Standard urban Mumbai fuel station (~4 dispenser islands = 8 nozzles)?', a: 'Yes, 4 booths × 2 nozzles = 8 dispensers operating 16–24 hrs.', why: 'Sets physical refueling throughput.' }
    ],
    strategyOverview: 'Nozzle-Throughput Capacity Model! 4 islands × 2 nozzles = 8 active nozzles. Split 24 hrs into Peak (6 hrs @ 80% utilization = 288 nozzle-mins), Normal (10 hrs @ 40%), Night (8 hrs @ 10%). Wait: average refueling time = 3 minutes/vehicle (20 vehicles/hr at 100%). Compute daily vehicles served (~8 nozzles × weighted ~7.5 hrs full-eq × 20/hr = ~1,200 vehicles/day) → Split 55% 2-Wheelers (@ ₹300 avg fill) + 40% Cars/Autos (@ ₹1,500 avg) + 5% Heavy/Trucks (@ ₹5,000) = ~₹12 Lakh/day!',
    formula: 'Daily Rev = Nozzles × Effective Full-Load Hours × (60 ÷ Refuel Mins) × Weighted Avg Bill',
    assumptions: [
      { label: '8 Nozzles; Refueling + UPI/cash billing takes ~3–4 mins/vehicle (~15–20/hr max)', rationale: 'Matches urban pump queue speed.' },
      { label: 'Effective Utilization across 24 hrs: Peak 6h (80%) + Mid 10h (40%) + Night 8h (10%) = 9.6 full-eq hrs/nozzle', rationale: '9.6 × 8 nozzles × 15 veh/hr = ~1,152 (~1,200) vehicles/day!' },
      { label: 'Vehicle Mix & Spend: 50% 2W (₹300), 45% 4W/Auto (₹1,500), 5% Trucks/Buses (₹5,000) → Weighted ₹1,075/vehicle', rationale: 'Total Daily Revenue ≈ ~₹12–13 Lakh/day (~12,000–13,000 liters/day at ~₹100/L)!' }
    ],
    tree: {
      label: 'Mumbai Fuel Station (4 Booths × 2 Nozzles = 8)',
      valueText: '8 Nozzles',
      children: [
        { label: 'Peak (6h×80%) + Mid (10h×40%) + Night (8h×10%) = 9.6 Eq Hrs × 15/hr', valueText: '~1,152 Vehicles/Day', highlight: true },
        { label: '50% 2W (₹300) + 45% 4W (₹1,500) + 5% Heavy (₹5,000)', valueText: '₹1,075 Avg Ticket' },
        { label: 'Total Daily Fuel Revenue', valueText: '~₹12.4 Lakh / Day (~12.4 KL/day)', highlight: true }
      ]
    },
    finalAnswer: '~₹10 – ₹15 Lakh/Day (~10,000 – 15,000 Liters/day)',
    acceptableRange: { min: 600000, max: 2500000, unit: '₹/day', display: '₹6 Lakh – ₹25 Lakh/day' },
    sanityCheck: 'In India, average petrol pumps sell ~6,000–8,000 Liters/day (~₹6–8L/day), while busy metro pumps in Mumbai sell ~12,000–20,000 Liters/day (~₹12–20L/day)! Note dealer commission is only ~₹3–4/liter (~₹45k gross margin/day before staff & rent)!',
    interviewerTrap: 'Forgetting to separate 2-wheelers (₹200–350 fills) from 4-wheelers (₹1,500–2,500 fills) and commercial diesel trucks (₹5,000+)!',
    variations: [
      { question: 'How many fuel stations are there in India? (Follow-up Case)', hint: 'See next problem! Total vehicle fuel demand ÷ ~8,000–10,000 L/day avg pump throughput!' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Nozzles × Effective Utilized Hours ÷ Refuel Time × Weighted Vehicle Ticket (2W vs 4W vs Heavy)', correct: true, feedback: 'Spot on! Always split 2W vs 4W ticket sizes—they differ by 5x!' },
        { label: 'Mumbai Vehicles ÷ 500', correct: false, feedback: 'Doesn’t tell you how many stations share those vehicles unless you know total Mumbai station count.' },
        { label: '8 Nozzles × 24 Hrs × 20 Vehicles × ₹2,000', correct: false, feedback: '100% utilization for 24 hours at ₹2,000/fill would give ₹77 Lakh/day—4 AM isn’t rush hour!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'nozzles', label: 'Fuel Nozzles at Station', defaultVal: 8, min: 4, max: 16, step: 2, unit: 'nozzles' },
        { key: 'eqHrs', label: 'Full-Load Equiv Hours / Day', defaultVal: 9.5, min: 4, max: 16, step: 0.5, unit: 'hrs' },
        { key: 'vehHr', label: 'Vehicles / Nozzle / Hr', defaultVal: 15, min: 10, max: 25, step: 1, unit: '/hr' },
        { key: 'avgBill', label: 'Weighted Avg Fuel Bill (₹)', defaultVal: 1050, min: 500, max: 2000, step: 50, unit: '₹' }
      ],
      computeFormulaText: 'Nozzles × Equiv Hours × Veh/Hr × Weighted Avg Bill',
      compute: (v) => {
        const veh = v.nozzles * v.eqHrs * v.vehHr;
        const revLakh = (veh * v.avgBill) / 1e5;
        return {
          value: revLakh,
          formatted: `₹${revLakh.toFixed(1)} Lakh/Day`,
          breakdown: [
            { label: 'Daily Vehicles Fueled', val: `${Math.round(veh).toLocaleString('en-IN')}` },
            { label: 'Est. Volume (@ ₹100/L)', val: `${Math.round(veh * v.avgBill / 100).toLocaleString('en-IN')} L/day` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-fuel-stations-india',
    title: 'How Many Fuel Stations (Petrol Pumps) Are There in India?',
    prompt: 'Estimate the total number of fuel stations (petrol/diesel pumps) in India.',
    difficulty: 3,
    archetype: 'Supply & Capacity',
    approachType: 'Hybrid (Demand + Supply)',
    templateId: 'tpl-workforce',
    tags: ['Energy / Infra', 'India', 'Demand-Supply Match'],
    clarifyingQuestions: [
      { q: 'Retail petrol/diesel stations across urban, rural, and highway corridors?', a: 'Yes, all retail fuel outlets in India.', why: 'Covers IOCL, BPCL, HPCL, Reliance, Nayara.' }
    ],
    strategyOverview: 'Demand-to-Supply Matching Model! Step 1 (Total National Daily Demand): Use vehicle anchors (~26 Cr 2-wheelers × ~5% refuel/day = 1.3 Cr 2W fills + ~5 Cr 4W/Commercial × ~15% refuel/day = 75 Lakh fills) ≈ ~2.0–2.5 Crore vehicle refuels/day (or ~40–45 Crore liters/day). Step 2 (Avg Station Throughput): Remember a typical Indian pump (averaging busy cities + quieter rural/highway pumps) serves ~300–400 vehicles/day (~6,000–7,000 L/day, less than a busy Mumbai pump!). Divide 2.2 Cr daily fills ÷ 300 fills/pump = ~73,000–85,000 fuel stations!',
    formula: 'Fuel Stations = Total Daily Vehicle Refuels in India ÷ Avg Refuels Served per Station per Day',
    assumptions: [
      { label: 'Vehicle Stock: ~22–26 Cr 2-Wheelers (~1 refuel every 15 days) + ~5 Cr 4W/Trucks (~1 every 7–10 days)', rationale: 'Gives ~1.5 Cr + ~0.6 Cr = ~2.1 Crore vehicle refuels/day nationwide.' },
      { label: 'National Avg Station Throughput = ~250–300 vehicles/day (~5,500–7,000 L/day)', rationale: 'Lower than metro Mumbai’s 1,100/day because 60%+ of pumps are on highways or semi-urban/rural roads!' }
    ],
    tree: {
      label: 'India Total Daily Refuels (~2.1 Cr/day)',
      valueText: '2.1 Crore Fills/Day',
      children: [
        { label: '2-Wheelers (~22 Cr ÷ 15-day refuel cycle)', valueText: '~1.47 Cr fills/day', highlight: true },
        { label: '4-Wheelers & Commercial (~5 Cr ÷ 8-day cycle)', valueText: '~0.63 Cr fills/day' },
        { label: '2.1 Cr ÷ ~280 Avg Fills/Pump/Day', valueText: '~75,000 – 85,000 Fuel Stations', highlight: true }
      ]
    },
    finalAnswer: '~70,000 – 90,000 Fuel Stations in India',
    acceptableRange: { min: 50000, max: 120000, unit: 'Stations', display: '50,000 – 1,20,000 stations' },
    sanityCheck: 'India officially has ~88,000–90,000 retail petrol/diesel fuel stations (IOCL ~37K, BPCL ~22K, HPCL ~22K, private ~8K)! Demand-Supply matching gets right onto the actual national count!',
    interviewerTrap: 'Using Mumbai’s busy 1,200 vehicles/day throughput for ALL of India—that gives only ~18,000 pumps because it ignores rural/highway pumps operating at ~150–250 fills/day!',
    variations: [
      { question: 'How many EV fast-charging stations would India need if 30% of vehicles went electric?', hint: 'Remember 80% of EVs charge at HOME overnight, while public fast chargers take 30–45 mins (not 3 mins!)—requiring far more charging points per public vehicle!' }
    ],
    guidedPractice: {
      correctApproach: 'Hybrid (Demand + Supply)',
      funnelOptions: [
        { label: 'National Vehicle Stock ÷ Refuel Cycle Days = Total Daily Refuels ÷ National Avg Fills/Station/Day', correct: true, feedback: 'Spot on! And remember national avg station throughput is ~3–4x lower than a prime Mumbai station.' },
        { label: 'India Area ÷ 10 sq km', correct: false, feedback: 'Forests, mountains, deserts, and farmland don’t have stations every 10 sq km!' },
        { label: 'Population ÷ 1,000', correct: false, feedback: '14 Lakh fuel stations would mean 15x more pumps than exist in India!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'twoWCr', label: '2-Wheelers in India (Cr)', defaultVal: 22, min: 15, max: 30, step: 2, unit: 'Cr' },
        { key: 'fourWCr', label: '4W & Commercial (Cr)', defaultVal: 5, min: 3, max: 8, step: 0.5, unit: 'Cr' },
        { key: 'avgFillsPump', label: 'Avg Fills / Pump / Day', defaultVal: 260, min: 150, max: 500, step: 20, unit: '/day' }
      ],
      computeFormulaText: '[(2W÷15d) + (4W÷8d)] ÷ Avg Fills/Pump/Day',
      compute: (v) => {
        const fills = (v.twoWCr * 1e7) / 15 + (v.fourWCr * 1e7) / 8;
        const stations = fills / v.avgFillsPump;
        return {
          value: stations,
          formatted: `${Math.round(stations).toLocaleString('en-IN')} Fuel Stations`,
          breakdown: [
            { label: 'Daily Vehicle Fills (India)', val: `${(fills / 1e7).toFixed(2)} Crore/day` },
            { label: 'People per Station', val: `${Math.round(1.4e9 / stations).toLocaleString('en-IN')}` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-flipkart-bbd-phones',
    title: 'Smartphones Purchased on Flipkart During Big Billion Days Sale',
    prompt: 'Estimate the number of customers purchasing smartphones from Flipkart during its annual Big Billion Days Diwali sale.',
    difficulty: 4,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-durable',
    tags: ['E-Commerce', 'Flipkart', 'Seasonality', 'Replacement Cycle'],
    clarifyingQuestions: [
      { q: 'Counting Flipkart Big Billion Days (roughly 7–10 day Diwali flagship sale)?', a: 'Yes, the entire Big Billion Days Diwali festive event.', why: 'Captures huge festive spike (~40–50% of annual online smartphone sales!).' }
    ],
    strategyOverview: 'E-Commerce Funnel + Replacement Cycle + Festive Seasonality! India Pop (1.4B) × Internet Penetration (40% = ~560M–600M) → Urban (30%) & Rural (70%) → Income Split × Online Shopping Propensity → ~190M–200M total potential online phone shoppers. Apply Flipkart’s Online Electronics Market Share (~40% vs Amazon 40%, Croma/Brand sites 20%) = 80M Flipkart addressable shoppers. Divide by 3-Year Smartphone Replacement Cycle = 27M annual Flipkart phone buyers × ~40–50% Festive Diwali Sale concentration = ~1.1–1.3 Crore smartphones during BBD!',
    formula: 'BBD Buyers = (Online Smartphone Base × Flipkart Share % ÷ 3-Yr Replacement) × Festive Sale Share %',
    assumptions: [
      { label: 'Internet Users (~600M) → Online Shoppers by Urban/Rural Income = ~190M–200M', rationale: 'Matches India’s ~200M e-commerce transacting base.' },
      { label: 'Flipkart Market Share = 40% (~80M) ÷ 3-Year Phone Replacement = ~27M/yr', rationale: 'Wait—check! Flipkart’s annual smartphone unit volume is actually ~2.5–3 Crore phones/yr! Dead-on!' },
      { label: 'Diwali / BBD Season Share = ~40–50% of annual online smartphone sales (or ~25–30% in the 1-week BBD event specifically)', rationale: 'Gives ~0.8–1.3 Crore (8M–13M) phones during the Big Billion Days sale!' }
    ],
    tree: {
      label: 'India Pop (1.4B) × 40% Internet (~560–600M)',
      valueText: '~600M Internet',
      children: [
        { label: 'Online Smartphone Buyers (Urban 99M + Rural 91M)', valueText: '~190–200M pool' },
        { label: '× Flipkart 40% Share = 80M ÷ 3-Yr Replacement', valueText: '~27M/Year on Flipkart', highlight: true },
        { label: '× 50% Diwali Season Share (or ~30% in BBD week)', valueText: '~1.3 Crore (13M) Phones', highlight: true }
      ]
    },
    finalAnswer: '~80 Lakh – 1.3 Crore Smartphones (8M – 13M units)',
    acceptableRange: { min: 5, max: 18, unit: 'Million phones', display: '5M – 18M smartphones' },
    sanityCheck: 'India sells ~15 Crore smartphones/year, of which ~45% (~6.7 Cr) sell online; Flipkart holds ~45–50% online phone share (~3 Cr/yr), and ~30–40% of online phone sales happen during the Big Billion Days festive surge (~1–1.2 Crore smartphones)! Literally indistinguishable from real industry reports!',
    interviewerTrap: 'Forgetting BOTH the 3-year replacement lifespan AND the massive festive seasonality spike (estimating 1 week = 1/52 of the year instead of ~30–40% of the year)!',
    variations: [
      { question: 'Estimate Flipkart’s GMV (₹) just from smartphones during BBD.', hint: '1.1 Crore phones × ₹16,000 ASP ≈ ~₹17,600 Crore GMV in one sale!' }
    ],
    guidedPractice: {
      correctApproach: 'Stock & Replacement',
      funnelOptions: [
        { label: 'Internet Pop → Online Shopper Funnel × Flipkart Share ÷ 3-Yr Replacement × Festive BBD Share %', correct: true, feedback: 'Spot on! Combining Replacement Cycle with Festive Concentration nails e-commerce sale sizing.' },
        { label: 'Annual Phones ÷ 52 Weeks', correct: false, feedback: 'Big Billion Days isn’t a normal week—it drives ~30–50% of festive quarter volume!' },
        { label: 'Delivery Vans × 500', correct: false, feedback: 'Vans carry groceries, clothes, and TVs too.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'onlineBaseM', label: 'Online Phone Buyer Base (M)', defaultVal: 190, min: 100, max: 300, step: 15, unit: 'M' },
        { key: 'fkShare', label: 'Flipkart Share %', defaultVal: 42, min: 25, max: 60, step: 5, unit: '%' },
        { key: 'life', label: 'Phone Replacement (Yrs)', defaultVal: 3, min: 2, max: 4, step: 0.5, unit: 'yrs' },
        { key: 'bbdPct', label: 'BBD Festive Concentration %', defaultVal: 40, min: 20, max: 60, step: 5, unit: '%' }
      ],
      computeFormulaText: '(Online Base × Flipkart% ÷ Replacement Yrs) × BBD Sale %',
      compute: (v) => {
        const annualFk = (v.onlineBaseM * (v.fkShare / 100)) / v.life;
        const bbd = annualFk * (v.bbdPct / 100);
        return {
          value: bbd,
          formatted: `${bbd.toFixed(1)} Million Phones`,
          breakdown: [
            { label: 'Annual Flipkart Phones', val: `${annualFk.toFixed(1)} M/yr` },
            { label: 'Est. BBD GMV (@ ₹16K)', val: `₹${Math.round(bbd * 1600).toLocaleString('en-IN')} Cr` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-gmail-india',
    title: 'Number of Active Gmail Users in India',
    prompt: 'Determine the number of monthly active Gmail users in India.',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Google PM', 'Tech Funnel', 'India', 'Active Users'],
    clarifyingQuestions: [
      { q: 'Counting unique monthly active individuals (not duplicate burner/work accounts)?', a: 'Unique active Gmail users in India (MAUs).', why: 'Remember every Android phone requires a Google account, though not all use Gmail actively!' }
    ],
    strategyOverview: 'Age × Tech-Access × Email-Need Funnel! India Pop = 1.4B → Age Split: 0–18 (25% = 350M: 10% net × 10% email × 50% active = 1.75M), 19–60 (60% = 840M: 50% net × 80% email × 80% active = 268.8M ~ 27 Cr), 60+ (15% = 210M: 50% net × 25% email × 50% active = 13.1M). Total Active Email Users = ~28.5 Cr (285M) × Gmail Market Share (~85% over Yahoo/Outlook/Rediff) = ~24.2 Crore (~240M) active Gmail users!',
    formula: 'Active Gmail = ∑ (Age Pop × Internet % × Email Need % × Monthly Active %) × Gmail Share %',
    assumptions: [
      { label: 'Note: Android phones in India are ~95% of smartphones (~650M), each signed into a Google ID—active email checkers are ~250–350M!', rationale: 'Distinguishing passive Android login vs active Gmail usage is a great PM insight.' },
      { label: 'Gmail Share = 85% (dominant consumer email in India)', rationale: 'Yahoo & Outlook hold corporate/legacy ~15%.' }
    ],
    tree: {
      label: 'India Population (1.4B = 140 Cr)',
      valueText: '140 Crore',
      children: [
        { label: '0–18 Yrs (35 Cr × 10% net × 10% email × 50% act)', valueText: '0.175 Cr (1.75M)' },
        { label: '19–60 Yrs (84 Cr × 50% net × 80% email × 80% act)', valueText: '27.0 Cr (270M)', highlight: true },
        { label: '60+ Yrs (21 Cr × 50% net × 25% email × 50% act)', valueText: '1.31 Cr (13.1M)' },
        { label: '28.5 Cr Active Email × 85% Gmail Share', valueText: '~24 Crore (240M) Active Users', highlight: true }
      ]
    },
    finalAnswer: '~24 Crore – 35 Crore Monthly Active Gmail Users',
    acceptableRange: { min: 150, max: 450, unit: 'Million users', display: '150M – 450M active users' },
    sanityCheck: 'India has ~700M internet/smartphone users (~95% Android). Roughly half (~300–350M) actively send/read personal or work emails monthly (~240–300M on Gmail). Spot on!',
    interviewerTrap: 'Assuming all 700M smartphone users are active email users (millions of blue-collar/rural users use WhatsApp & YouTube exclusively and never open Gmail!).',
    variations: [
      { question: 'Estimate the number of WhatsApp messages sent daily in India.', hint: '500M active WhatsApp users × ~40–50 messages sent/user/day (factoring forwards & group chats) = ~20–25 Billion messages/day!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Pop → Age Split → Internet Penetration → Email Usage Need % → Active Rate × Gmail Share (85%)', correct: true, feedback: 'Textbook Google PM sizing!' },
        { label: 'Android Phones × 100%', correct: false, feedback: 'Having a Google Play login doesn’t mean the user actively uses Gmail.' },
        { label: 'Office Workers × 2', correct: false, feedback: 'Misses college students, job seekers, e-commerce shoppers, and personal accounts.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'netM', label: 'Internet Users in India (M)', defaultVal: 650, min: 400, max: 900, step: 50, unit: 'M' },
        { key: 'emailNeedPct', label: 'Active Email Users %', defaultVal: 45, min: 25, max: 70, step: 5, unit: '%' },
        { key: 'gmailShare', label: 'Gmail Share %', defaultVal: 85, min: 70, max: 95, step: 5, unit: '%' }
      ],
      computeFormulaText: 'Internet Users × Active Email% × Gmail Share%',
      compute: (v) => {
        const users = v.netM * (v.emailNeedPct / 100) * (v.gmailShare / 100);
        return {
          value: users,
          formatted: `${Math.round(users)} Million (${(users / 10).toFixed(1)} Cr)`,
          breakdown: [
            { label: 'Active Email Pool', val: `${Math.round(v.netM * v.emailNeedPct / 100)} M` },
            { label: '% of India Pop', val: `${(users / 1400 * 100).toFixed(1)}%` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-medium-factories-mumbai',
    title: 'Number of Medium-Sized Factories in Mumbai',
    prompt: 'Estimate the number of medium-sized factories operating in Mumbai.',
    difficulty: 4,
    archetype: 'Supply & Capacity',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-workforce',
    tags: ['Manufacturing', 'Mumbai', 'Geometric Mean', 'Workforce Proxy'],
    clarifyingQuestions: [
      { q: 'How should we define a "medium-sized factory"?', a: 'Define by workforce size: 50 to 200 blue-collar workers (Geometric Mean = √(50×200) = 100 workers)!', why: 'Always define subjective adjectives ("medium", "large", "rich") upfront!' },
      { q: 'Mumbai city proper or broader MMR industrial belts (Thane/Navi Mumbai/Bhiwandi)?', a: 'Mumbai / MMR industrial workforce (~2 Crore pop).', why: 'Most manufacturing sits in outer Mumbai/MIDC belts.' }
    ],
    strategyOverview: 'Workforce-to-Establishment Proxy Model! First define "medium factory" = 50–200 workers → Geometric Mean = 100 workers/factory. Mumbai Pop (2 Cr) → Working Age (50% = 1 Cr) → Blue-Collar Workers (75% = 75 Lakh) → Manufacturing/Factory Share (10% = 7.5 Lakh, since retail/construction/logistics employ most blue-collar workers!) → Medium-Sized Factory Share (30% vs Small workshops 50% & Large plants 20%) = 2.25 Lakh workers ÷ 100 workers/factory = 2,250 medium-sized factories!',
    formula: 'Factories = (City Pop × Working % × Blue-Collar % × Factory % × Medium Share %) ÷ √(Min × Max Workers)',
    assumptions: [
      { label: 'Medium Factory Workforce = √(50 × 200) = 100 blue-collar workers', rationale: 'Geometric mean cleanly anchors wide ranges.' },
      { label: 'Mumbai Pop = 2 Cr → 1 Cr workforce → 75L blue-collar → 10% in factories (7.5L) → 30% medium-sized (2.25L)', rationale: 'Mumbai is a services/finance hub, so factory share of blue-collar is ~10–15% (most do construction, transport, retail, domestic work).' }
    ],
    tree: {
      label: 'Mumbai Pop (2 Cr) → Workforce (1 Cr) → Blue-Collar (75L)',
      valueText: '75 Lakh Blue-Collar',
      children: [
        { label: 'Working in Factories (10%)', valueText: '7.5 Lakh factory workers' },
        { label: 'In Medium-Sized Factories (30%)', valueText: '2.25 Lakh workers', highlight: true },
        { label: '÷ 100 Avg Workers/Factory (GM of 50–200)', valueText: '2,250 Medium Factories', highlight: true }
      ]
    },
    finalAnswer: '~2,000 – 2,500 Medium-Sized Factories',
    acceptableRange: { min: 1000, max: 5000, unit: 'Factories', display: '1,000 – 5,000 factories' },
    sanityCheck: 'Maharashtra has ~25,000–30,000 registered factories under the Factories Act, with Mumbai/Thane industrial belts hosting ~25–30% (~7,000–8,000 total factories across small/medium/large). ~2,250 medium factories (~30% of 7,500) is eerily accurate!',
    interviewerTrap: 'Not defining "medium-sized" upfront OR assuming 75% of blue-collar workers work in factories (forgetting retail, drivers, construction, and hospitality!).',
    variations: [
      { question: 'Estimate total number of SME manufacturing units in Surat.', hint: 'Pop 70L → Textile & diamond manufacturing bias (~35–40% of blue-collar in workshops/factories!).' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Define Medium Size (GM=100 workers) → City Workforce → Blue-Collar → Factory % → Medium % ÷ 100', correct: true, feedback: 'Spot on! Workforce proxy is one of the cleanest tools in consulting for sizing B2B establishments.' },
        { label: 'Industrial Land Area ÷ 1 Acre', correct: false, feedback: 'Hard to guess industrial MIDC acreage inside Mumbai without workforce validation.' },
        { label: 'Electricity Consumption ÷ 1 MW', correct: false, feedback: 'Residential AC & commercial skyscrapers dominate Mumbai power load.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'workforceL', label: 'City Workforce (Lakh)', defaultVal: 100, min: 50, max: 160, step: 10, unit: 'L' },
        { key: 'bluePct', label: 'Blue-Collar %', defaultVal: 75, min: 50, max: 85, step: 5, unit: '%' },
        { key: 'factPct', label: '% Blue-Collar in Factories', defaultVal: 10, min: 5, max: 25, step: 2, unit: '%' },
        { key: 'medPct', label: '% in Medium Factories', defaultVal: 30, min: 15, max: 50, step: 5, unit: '%' },
        { key: 'avgWorkers', label: 'Workers / Medium Factory', defaultVal: 100, min: 50, max: 200, step: 25, unit: 'ppl' }
      ],
      computeFormulaText: '(Workforce × BlueCollar% × Factory% × Medium%) ÷ Workers/Factory',
      compute: (v) => {
        const medWorkers = v.workforceL * 1e5 * (v.bluePct / 100) * (v.factPct / 100) * (v.medPct / 100);
        const factories = medWorkers / v.avgWorkers;
        return {
          value: factories,
          formatted: `${Math.round(factories).toLocaleString('en-IN')} Factories`,
          breakdown: [
            { label: 'Medium Factory Workers', val: `${(medWorkers / 1e5).toFixed(2)} Lakh` },
            { label: 'Total Factories (all sizes)', val: `${Math.round(factories / (v.medPct / 100)).toLocaleString('en-IN')}` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-expressway-rush-toll',
    title: 'Hourly Rush-Hour Toll Collection on Delhi–Mumbai Expressway',
    prompt: 'How much money is collected per hour during rush hour at a toll plaza on the Delhi–Mumbai Expressway?',
    difficulty: 2,
    archetype: 'Supply & Capacity',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-bottleneck',
    tags: ['Infrastructure', 'FASTag', 'Rush Hour', 'Quick Math'],
    clarifyingQuestions: [
      { q: 'Counting both directions combined at peak capacity?', a: 'Yes, 8 active lanes (4 each direction) operating at 100% rush-hour capacity via cashless FASTag.', why: 'Clarifies lane count & payment speed.' }
    ],
    strategyOverview: 'Crisp Supply-Side Bottleneck! 8 lanes operating cashlessly via FASTag take ~8 seconds per vehicle = 3,600 ÷ 8 = 450 vehicles/hour/lane! 8 lanes × 450 = 3,600 vehicles/hour × ₹50 (or ₹100 blended with trucks) avg toll = ₹1,80,000/hour (₹1.8–3.6 Lakh/hr)!',
    formula: 'Hourly Toll = Lanes × (3,600 sec ÷ Sec/Vehicle) × Weighted Avg Toll',
    assumptions: [
      { label: '8 FASTag Lanes running at peak capacity; 8 sec/vehicle = 450 cars/hr/lane', rationale: 'RFID FASTag scan + boom barrier lift takes ~6–10 seconds.' },
      { label: '3,600 vehicles/hour × ₹50 avg toll (or ~₹100 if heavy trucks included) = ₹1.8L–₹3.6L/hour', rationale: 'Expressways actually charge distance-based tolls (~₹100–300+ avg exit toll!).' }
    ],
    tree: {
      label: 'Expressway Toll Plaza (8 Lanes)',
      valueText: '8 Active Lanes',
      children: [
        { label: 'FASTag Speed (8 sec/car → 3,600 ÷ 8)', valueText: '450 vehicles/hr/lane' },
        { label: '× 8 Lanes', valueText: '3,600 vehicles/hr', highlight: true },
        { label: '× ₹50 Avg Toll (₹100 w/ trucks)', valueText: '₹1.8 Lakh / Hour (up to ₹3.6L)', highlight: true }
      ]
    },
    finalAnswer: '~₹1.8 Lakh – ₹3.6 Lakh / Rush Hour',
    acceptableRange: { min: 100000, max: 600000, unit: '₹/hour', display: '₹1 Lakh – ₹6 Lakh/hour' },
    sanityCheck: '3,600 vehicles/hr across 8 lanes = 1 car every 8 seconds per lane, which matches visible highway rush-hour queue flow without gridlock. Clean!',
    interviewerTrap: 'Assuming 1 minute per vehicle (cash era) instead of 8–10 seconds with cashless FASTag.',
    variations: [
      { question: 'How much does the plaza collect across an entire 24-hour day?', hint: '4 rush hrs (100%) + 12 mid hrs (40%) + 8 night hrs (15%) ≈ 10 eq. rush hours × ₹1.8L = ₹18 Lakh/day!' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Active Lanes × (3,600 ÷ Secs per Vehicle via FASTag) × Avg Toll Fee', correct: true, feedback: 'Spot on! Super clean mental math (3,600 ÷ 8 = 450/hr).' },
        { label: 'Length of Expressway × ₹100', correct: false, feedback: 'You need vehicle flow rate per hour past the plaza!' },
        { label: 'Cars in Mumbai ÷ 100', correct: false, feedback: 'Only a tiny fraction of Mumbai cars are on the expressway at a single hour.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'lanes', label: 'Active FASTag Lanes', defaultVal: 8, min: 4, max: 16, step: 2, unit: 'lanes' },
        { key: 'secsPerVeh', label: 'Seconds / Vehicle', defaultVal: 8, min: 5, max: 15, step: 1, unit: 'sec' },
        { key: 'avgToll', label: 'Weighted Avg Toll (₹)', defaultVal: 75, min: 40, max: 250, step: 15, unit: '₹' }
      ],
      computeFormulaText: 'Lanes × (3,600 ÷ Sec/Veh) × Avg Toll',
      compute: (v) => {
        const vehHr = v.lanes * (3600 / v.secsPerVeh);
        const rev = vehHr * v.avgToll;
        return {
          value: rev,
          formatted: `₹${(rev / 1e5).toFixed(2)} Lakh/Hour`,
          breakdown: [
            { label: 'Vehicles / Hour', val: `${Math.round(vehHr).toLocaleString('en-IN')}` },
            { label: 'Vehicles / Lane / Hr', val: `${Math.round(3600 / v.secsPerVeh)}` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-diaper-india',
    title: 'Size of the Diaper Market in India',
    prompt: 'Estimate the annual market size (revenue) of the diaper industry in India.',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['FMCG', 'Baby + Adult Diapers', 'Life Expectancy Proxy'],
    clarifyingQuestions: [
      { q: 'Include BOTH baby diapers AND adult/elderly incontinence diapers?', a: 'Yes! Including adult diapers shows complete MECE thinking (and is a common interviewer surprise!).', why: 'Seniors/post-surgery patients drive a fast-growing ~25–30% segment.' },
      { q: 'Disposable diapers only (excluding reusable cloth nappies)?', a: 'Yes, commercial disposable diapers (~₹10–12 each).', why: 'Low-income rural families heavily use cloth nappies—filter accordingly!' }
    ],
    strategyOverview: 'Dual-Segment MECE Demand Funnel! Segment 1 (Infants 0–3 yrs): Use the Life Expectancy uniform trick: 140 Cr ÷ 70 yrs × 3 yrs = 6 Crore infants! Segment by Income & Affordability: High (10% × 100% = 0.6 Cr), Middle (30% × 70% = 1.26 Cr), Lower (60% × 10% = 0.36 Cr) = 2.22 Cr diaper-using babies × 5/day × 365 × ₹10 = ₹40,515 Cr! Segment 2 (Adults/Elderly): Age 26–59 (56 Cr × 2% medical need = 1 Cr) + Age 60+ (21–42 Cr × 10% = 4.2 Cr) × 2/day × 365 × ₹10 (adjusted for affordability ~30%!). Compare unadjusted total vs real Indian market!',
    formula: 'Total Market = (Baby Diaper Users × Daily Usage × 365 × Price) + (Adult Need Pool × Affordability % × Daily Usage × 365 × Price)',
    assumptions: [
      { label: '0–3 Infants = (140 Cr ÷ 70) × 3 = 6 Crore babies (or ~7–7.5 Cr using India’s ~2.4 Cr annual births × 3 yrs!)', rationale: 'Note: Birth rate 16/1000 × 140 Cr ≈ 2.24 Cr births/year × 3 yrs = 6.7 Cr babies—almost identical to 6 Cr!' },
      { label: 'Baby Affordability: 2.22 Cr babies × 5/day? Wait—Sanity Check! Not all 2.22 Cr wear 5 disposables/day all 365 days (middle-class uses ~1–2/day for outings/night + cloth at home!)', rationale: 'Watch out for that! At 1.5–2 disposables/day avg → ~₹12,000–15,000 Cr baby market (+ ~₹2,000–3,000 Cr adult market after affordability filter) = ~₹15,000–18,000 Crore realistically (vs the baseline’s ₹78,000 Cr)!' }
    ],
    tree: {
      label: 'India Population (140 Crore)',
      valueText: '140 Crore',
      children: [
        { label: 'Infants 0–3 (6 Cr → 2.22 Cr affordable) × Daily Usage × 365 × ₹10', valueText: '₹40,515 Cr (Baseline) | ~₹12K Cr (Real)' },
        { label: 'Adults 26+ & Seniors 60+ (Medical/Incontinence)', valueText: '₹37,960 Cr (Baseline) | ~₹3K Cr (Real)' },
        { label: 'Total Diaper Market', valueText: '₹15,000 Cr (Real) | ₹78,000 Cr (Baseline)', highlight: true }
      ]
    },
    finalAnswer: '~₹15,000 Crore/year realistically (Baseline: ₹78,000 Crore)',
    acceptableRange: { min: 10000, max: 85000, unit: '₹ Crore/year', display: '₹10,000 Cr – ₹80,000 Cr/yr' },
    sanityCheck: 'CRITICAL SANITY CHECK: Baseline noted ₹78,000 Cr ÷ 35 Cr households ÷ 12 = ₹185/mo across ALL India, or ₹720/mo among 25% of homes! Real Indian disposable diaper industry (Pampers, MamyPoko, Huggies + Friends Adult) is ~$2 Billion (~₹15,000–18,000 Crore) because middle-class Indian families use disposables mainly at NIGHT/travel (1–2/day, not 5/day!) and only ~15% of 60+ elderly afford ₹30/day adult diapers! Saying that wins instant offers.',
    interviewerTrap: 'Forgetting ADULT/elderly diapers completely, OR assuming middle-class Indian families use 5 disposable diapers every day like US households (vs night-only 1–2/day)!',
    variations: [
      { question: 'Estimate the market size of sanitary pads in India.', hint: '140 Cr × 50% female × ~45% menstruating age (13–49) = ~31 Cr women × ~55% disposable pad penetration × 12 cycles × 10 pads × ₹8 ≈ ~₹16,000 Cr!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Split into Infants (0–3 yrs via Births/Life Exp) + Adults/Seniors (60+ medical need) × Affordability × Daily Disposables × Price', correct: true, feedback: 'Spot on! Always include BOTH Baby and Adult segments, and use 1–2/day for India night/outing usage!' },
        { label: 'All Households × 5 Diapers/Day', correct: false, feedback: 'Only ~15–20% of households have a 0–3 infant or incontinent elder at any time!' },
        { label: 'Hospitals in India × 1,000', correct: false, feedback: '95%+ of diapers are bought in pharmacies, kiranas, and online for home use.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'babiesCr', label: '0–3 Babies in India (Cr)', defaultVal: 6.5, min: 5.5, max: 8.0, step: 0.5, unit: 'Cr' },
        { key: 'babyPen', label: 'Disposable Diaper Pen %', defaultVal: 35, min: 15, max: 60, step: 5, unit: '%' },
        { key: 'babyDay', label: 'Avg Disposables / Baby / Day', defaultVal: 1.8, min: 1.0, max: 5.0, step: 0.2, unit: '/day' },
        { key: 'adultSharePct', label: 'Adult Segment Uplift %', defaultVal: 20, min: 5, max: 50, step: 5, unit: '%' },
        { key: 'price', label: 'Avg Price / Diaper (₹)', defaultVal: 10, min: 6, max: 18, step: 1, unit: '₹' }
      ],
      computeFormulaText: '(Babies × Pen% × PerDay × 365 × Price) × (1 + Adult Uplift%)',
      compute: (v) => {
        const babyCr = v.babiesCr * (v.babyPen / 100) * v.babyDay * 365 * v.price;
        const totalCr = babyCr * (1 + v.adultSharePct / 100);
        return {
          value: totalCr,
          formatted: `₹${Math.round(totalCr).toLocaleString('en-IN')} Crore/Yr`,
          breakdown: [
            { label: 'Baby Diaper Segment', val: `₹${Math.round(babyCr).toLocaleString('en-IN')} Cr` },
            { label: 'Adult Diaper Segment', val: `₹${Math.round(totalCr - babyCr).toLocaleString('en-IN')} Cr` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-cement-india',
    title: 'Size of the Indian Cement Industry',
    prompt: 'Estimate the annual market size (tonnes & revenue) of the Indian cement industry.',
    difficulty: 5,
    archetype: 'Market Sizing',
    approachType: 'Hybrid (Demand + Supply)',
    templateId: 'tpl-durable',
    tags: ['Infrastructure', 'B2B Heavy Industry', 'Construction'],
    clarifyingQuestions: [
      { q: 'Include residential housing, commercial real estate, AND public infrastructure (roads/bridges/railways)?', a: 'Yes! Roughly ~55–60% Housing, ~25% Infrastructure, ~15–20% Commercial/Industrial.', why: 'Housing alone misses half the cement consumed in highways & metros!' }
    ],
    strategyOverview: 'Two-Pillar Construction Demand Model! Pillar 1 (Residential Housing — ~60% of demand): India has ~35 Cr households. New household formation (~1% pop growth = 35L homes/yr) + Urbanization/Replacement (~2% of concrete homes rebuilt every 50 yrs ≈ 40–50L homes/yr) = ~80–100 Lakh new/renovated housing units/yr! Avg 1,000 sq ft home uses ~350–400 bags (50 kg/bag = ~20 tonnes of cement) → ~180–200 Million Tonnes/yr! Pillar 2 (Infra + Commercial = remaining ~40%): ~150–180 Million Tonnes/yr → Total = ~350–400 Million Tonnes/year × ~₹350/bag (₹7,000/tonne) ≈ ~₹2.5–2.8 Lakh Crore!',
    formula: 'Market Size = [(New + Replaced Homes/Yr × Cement Tonnes/Home) ÷ Housing Share %] × Price per Tonne',
    assumptions: [
      { label: 'Annual Concrete Home Builds + Major Renovations ≈ ~1 Crore homes/yr (new growth + 50-yr replacement + mud-to-pucca upgrades)', rationale: 'Includes PMAY rural pucca housing upgrades.' },
      { label: 'Cement per 1,000 sq ft Home ≈ 350–400 bags (1 bag = 50 kg → ~18–20 Tonnes)', rationale: 'Industry thumb rule: ~0.4 bags of cement per sq ft built!' },
      { label: 'Housing Share = ~55–60%; Infra + Commercial = ~40–45% → Total ≈ 350–400M Tonnes × ₹7,000/tonne', rationale: '1 Tonne = 20 bags × ₹350/bag = ₹7,000/tonne.' }
    ],
    tree: {
      label: 'India Cement Demand Drivers',
      valueText: '~375M Tonnes/Yr',
      children: [
        { label: 'Residential (~1 Cr homes/yr × ~20 tonnes)', valueText: '~200M Tonnes (~55%)', highlight: true },
        { label: 'Infrastructure & Commercial (~45% split)', valueText: '~175M Tonnes' },
        { label: '375M Tonnes × ₹7,000/Tonne (₹350/50kg bag)', valueText: '~₹2.6 Lakh Crore/Yr', highlight: true }
      ]
    },
    finalAnswer: '~350 – 420 Million Tonnes/Yr (~₹2.5 – ₹3.0 Lakh Crore)',
    acceptableRange: { min: 150000, max: 450000, unit: '₹ Crore/year', display: '₹1.5 Lakh Cr – ₹4.5 Lakh Cr/yr' },
    sanityCheck: 'India is the world’s 2nd largest cement market, producing & consuming ~390–420 Million Tonnes annually (UltraTech alone has ~150MT capacity at ~₹70,000 Cr revenue)! Our housing + infra triangulation hits ~375MT (~₹2.6L Cr) within 10% of actual!',
    interviewerTrap: 'Sizing ONLY residential housing and forgetting highways, metro rail, dams, factories, and commercial offices (~40–45% of cement demand)!',
    variations: [
      { question: 'Estimate how many 50 kg bags of cement are needed to build a 2,000 sq ft house.', hint: 'Thumb rule: ~0.4 bags/sq ft × 2,000 = ~800 bags (~40 tonnes)!' }
    ],
    guidedPractice: {
      correctApproach: 'Stock & Replacement',
      funnelOptions: [
        { label: 'Annual Homes Built/Replaced × Bags/Home ÷ Housing Share (60%) × Price per Bag', correct: true, feedback: 'Textbook! Knowing the ~0.4 bags/sq ft thumb rule and the 60/40 Housing vs Infra split wins industrial cases.' },
        { label: 'Hardware Stores × 1,000 Bags', correct: false, feedback: '70%+ of bulk infra/builder cement is sold B2B directly from plants, bypassing retail stores!' },
        { label: 'India Land Area × 10 kg', correct: false, feedback: 'Unrelated to construction volume.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'homesL', label: 'New/Replaced Homes / Yr (L)', defaultVal: 100, min: 50, max: 160, step: 10, unit: 'L/yr' },
        { key: 'tonnesHome', label: 'Tonnes Cement / Home', defaultVal: 20, min: 12, max: 30, step: 2, unit: 'T' },
        { key: 'housingPct', label: 'Housing Share of Market %', defaultVal: 55, min: 40, max: 70, step: 5, unit: '%' },
        { key: 'bagPrice', label: 'Price per 50kg Bag (₹)', defaultVal: 350, min: 280, max: 450, step: 10, unit: '₹' }
      ],
      computeFormulaText: '[(Homes × Tonnes) ÷ Housing%] × (Bag Price × 20 Bags/Tonne)',
      compute: (v) => {
        const resT = (v.homesL * 1e5 * v.tonnesHome) / 1e6;
        const totT = resT / (v.housingPct / 100);
        const revCr = (totT * 1e6 * v.bagPrice * 20) / 1e7;
        return {
          value: revCr,
          formatted: `₹${(revCr / 1e5).toFixed(2)} Lakh Cr (${Math.round(totT)} MT)`,
          breakdown: [
            { label: 'Residential Tonnes', val: `${Math.round(resT)} Million T` },
            { label: 'Total Bags / Year', val: `${(totT * 20 / 1000).toFixed(1)} Billion bags` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-traffic-signals',
    title: 'Number of Traffic Signals in Your City (e.g., Delhi / Bengaluru)',
    prompt: 'Estimate the number of traffic signals (signalized intersections) in a major city like Delhi or Bengaluru.',
    difficulty: 4,
    archetype: 'Volume & Geometry',
    approachType: 'Geometry & Proxy',
    templateId: 'tpl-geometry',
    tags: ['Spatial Grid', 'Urban Planning', 'Road Network'],
    clarifyingQuestions: [
      { q: 'Are we counting signalized INTERSECTIONS (junctions) or individual traffic light poles/faces?', a: 'Signalized intersections (clarify 1 intersection usually has 4 poles!).', why: 'Prevents 4x pole vs intersection mismatch!' },
      { q: 'Which city (e.g., Delhi ~1,500 sq km or Bengaluru ~700 sq km)?', a: 'Let’s model a major metro (~1,000–1,500 sq km, e.g., Delhi).', why: 'City area sets your grid size!' }
    ],
    strategyOverview: 'Two Spatial Methods! Method A (Grid Matrix): Imagine a ~35 km × 40 km city (~1,400 sq km), of which ~50% (~700 sq km) is dense urban grid (~25 km × 28 km). Major arterial roads run roughly every 1 km North–South (25 roads) and East–West (28 roads) → 25 × 28 = 700 major intersections! Plus ~30% secondary sub-arterial intersections = ~900–1,000 signalized junctions! Method B (Block/Area Density): ~700 urban sq km × ~1.5 signalized intersections/sq km = ~1,050 intersections (× 4 poles = ~4,200 signal poles)!',
    formula: 'Signal Intersections = (N–S Major Roads × E–W Major Roads × Signalized %) OR Urban Area (sq km) × Signals/sq km',
    assumptions: [
      { label: 'Delhi Total Area = ~1,500 sq km; Dense Urban Road Grid = ~50% (~750 sq km)', rationale: 'Excludes Ridge forest, Yamuna floodplain, agricultural outskirts, airport.' },
      { label: 'Arterial Spacing ≈ 1 km apart → ~27 N–S × 27 E–W ≈ ~730 major junctions + ~300 secondary = ~1,000 signalized intersections', rationale: 'Suburban residential lanes use speed-breakers/roundabouts rather than signals.' }
    ],
    tree: {
      label: 'Delhi Area (~1,500 sq km) → Dense Urban Grid (~750 sq km)',
      valueText: '~750 sq km',
      children: [
        { label: 'Major Grid (~1 km spacing: ~27 N-S × 27 E-W)', valueText: '~730 arterial intersections', highlight: true },
        { label: 'Secondary Roads + Ring Intersections (~40% extra)', valueText: '~300 junctions' },
        { label: 'Total Signalized Intersections (× 4 poles if counting poles)', valueText: '~1,000 Intersections (~4,000 Poles)', highlight: true }
      ]
    },
    finalAnswer: '~900 – 1,200 Signalized Intersections in Delhi (~3,600–4,800 individual light poles)',
    acceptableRange: { min: 400, max: 2000, unit: 'Intersections', display: '400 – 2,000 intersections (Bengaluru ~500, Delhi ~1,000)' },
    sanityCheck: 'Delhi Traffic Police officially operates ~1,000 traffic signal junctions (~400+ blinkers/signals in Bengaluru, ~700 in Mumbai)! Our 1 km arterial grid model lands right on ~1,000 junctions!',
    interviewerTrap: 'Assuming EVERY tiny neighborhood street corner has a traffic light (that would give 50,000!) OR not clarifying whether "traffic signal" means 1 intersection vs 4 light poles at that intersection!',
    variations: [
      { question: 'Estimate the total length of paved roads in the USA.', hint: 'US Area (~9.8M sq km) × ~70% inhabited grid spaced every ~1–2 miles → ~4 Million miles (~6.5M km)!' }
    ],
    guidedPractice: {
      correctApproach: 'Geometry & Proxy',
      funnelOptions: [
        { label: 'City Area → Dense Urban % → Grid Spacing (N-S × E-W Roads) × Signalized Share %', correct: true, feedback: 'Spot on! Always clarify Intersection vs Pole, and space arterial roads realistically (~1 km apart).' },
        { label: 'Number of Cars ÷ 1,000', correct: false, feedback: 'Signals depend on road network geometry, not car ownership.' },
        { label: 'Traffic Police ÷ 5', correct: false, feedback: 'Many automated signals have no permanent officer.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'areaKm2', label: 'City Area (sq km)', defaultVal: 1500, min: 400, max: 2000, step: 100, unit: 'km²' },
        { key: 'urbanGridPct', label: 'Dense Urban Grid %', defaultVal: 55, min: 35, max: 80, step: 5, unit: '%' },
        { key: 'sigPerKm2', label: 'Signal Intersections / sq km', defaultVal: 1.25, min: 0.5, max: 2.5, step: 0.25, unit: '/km²' }
      ],
      computeFormulaText: 'City Area × Dense Grid% × Signals per sq km',
      compute: (v) => {
        const ints = v.areaKm2 * (v.urbanGridPct / 100) * v.sigPerKm2;
        return {
          value: ints,
          formatted: `${Math.round(ints).toLocaleString('en-IN')} Intersections`,
          breakdown: [
            { label: 'Individual Signal Poles (×4)', val: `${Math.round(ints * 4).toLocaleString('en-IN')} poles` },
            { label: 'Grid Area Covered', val: `${Math.round(v.areaKm2 * v.urbanGridPct / 100)} sq km` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-cigarettes-india',
    title: 'Number of Cigarettes Smoked in India Per Month',
    prompt: 'Estimate the number of cigarettes smoked in India in a month.',
    difficulty: 3,
    archetype: 'Usage & Behavioral',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Tobacco / FMCG', 'Multi-Layer Split', 'Gender & Locality'],
    clarifyingQuestions: [
      { q: 'Machine-made cigarettes only, excluding bidis & smokeless tobacco?', a: 'Cigarettes only (bidis are 5x–8x larger by volume in rural India!).', why: 'Crucial distinction in Indian tobacco cases!' }
    ],
    strategyOverview: 'Multi-Level Demographic Matrix! India Pop = 140 Cr. Exclude <16 yrs (30% = 42 Cr). Split 16–22 (10% = 14 Cr) and 22+ (60% = 84 Cr) across Urban/Rural and Male/Female. Apply Smoking Penetration (much higher in Urban Male ~50–60% vs Female ~5–20% and Rural Male ~20–25% who often smoke bidis!) × Cigarettes per Month (20 to 90 sticks/month = 1–3/day) → Total = ~1,269 Crore (12.7 Billion) cigarettes/month!',
    formula: 'Monthly Cigarettes = ∑ (Age × Locality × Gender Pop × Smoker % × Sticks/Month)',
    assumptions: [
      { label: 'Exclude <16 (30%); Active Ages: 16–22 (10% = 14 Cr) & 22+ (60% = 84 Cr)', rationale: 'Note: Baseline table accidentally typed "Hyderabad is 0.9 Cr" in one intro sentence while its entire table correctly used 140 Cr India!' },
      { label: 'Urban Male 22+ drives bulk: 7.56 Cr smokers × 90 sticks/mo (~3/day) = 680.4 Cr/month', rationale: 'Notice rural male cigarette penetration is lower (20%) because bidis dominate rural smoking.' },
      { label: 'Total Monthly Sticks = 1,269 Crore (~12.7 Billion/month = ~152 Billion/year)', rationale: 'Let’s check real India stats!' }
    ],
    tree: {
      label: 'India Pop (140 Cr) → Age 16+ (98 Cr)',
      valueText: '98 Crore (16+)',
      children: [
        { label: 'Age 16–22 (14 Cr): Urban M/F + Rural M/F', valueText: '131.9 Cr sticks/mo' },
        { label: 'Age 22+ Urban Male (7.56 Cr × 90/mo)', valueText: '680.4 Cr sticks/mo', highlight: true },
        { label: 'Age 22+ Urban Female (151 Cr) + Rural (306 Cr)', valueText: '457.0 Cr sticks/mo' },
        { label: 'Total Monthly Cigarettes', valueText: '~1,269 Cr (~12.7B)/Month', highlight: true }
      ]
    },
    finalAnswer: '~800 – 1,300 Crore Cigarettes/Month (~100–150 Billion sticks/year)',
    acceptableRange: { min: 600, max: 1600, unit: 'Crore sticks/month', display: '600 Cr – 1,600 Cr cigarettes/month' },
    sanityCheck: 'India’s legal + illicit cigarette market is ~90–110 Billion sticks/year (~750–920 Crore/month), with ITC holding ~75–80% of legal share! Our ~800–1,270 Cr/month (especially if urban male smoking penetration is ~35–40% rather than 60%) hits right on the true national figure!',
    interviewerTrap: 'Not clarifying "Cigarettes ONLY vs Bidis" (bidis sell ~600–800 Billion/year!) OR assuming female smoking rates equal male rates in India.',
    variations: [
      { question: 'Estimate ITC’s annual revenue from cigarettes.', hint: '~90B legal sticks × ~75% ITC share = ~68B sticks × ~₹10 retail (~₹4 net of excise/GST to ITC) ≈ ~₹27,000–30,000 Crore!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'India Pop → Age 16+ → Urban/Rural × Gender → Cigarette Smoker % (excl. Bidis) × Sticks/Month', correct: true, feedback: 'Spot on! Gender + Urban/Rural + Bidis distinction are the three keys to this case.' },
        { label: 'Panwadis in India × 1,000', correct: false, feedback: 'No clean way to know total panwadis nationwide without population.' },
        { label: 'Tobacco Crop Weight ÷ 1g', correct: false, feedback: 'India exports huge tobacco leaf and uses most domestically for chewing tobacco/bidis.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'adultPopCr', label: 'India 16+ Pop (Crore)', defaultVal: 98, min: 85, max: 110, step: 2, unit: 'Cr' },
        { key: 'smokerPct', label: 'Blended Cigarette Smoker %', defaultVal: 14, min: 6, max: 25, step: 1, unit: '%' },
        { key: 'sticksDay', label: 'Avg Sticks / Smoker / Day', defaultVal: 2.5, min: 1.0, max: 6.0, step: 0.5, unit: '/day' }
      ],
      computeFormulaText: 'Adult Pop × Cigarette Smoker% × Sticks/Day × 30 Days',
      compute: (v) => {
        const monthlyCr = v.adultPopCr * (v.smokerPct / 100) * v.sticksDay * 30;
        return {
          value: monthlyCr,
          formatted: `${Math.round(monthlyCr)} Crore / Month`,
          breakdown: [
            { label: 'Total Cigarette Smokers', val: `${(v.adultPopCr * v.smokerPct / 100).toFixed(1)} Crore` },
            { label: 'Annual Sticks', val: `${(monthlyCr * 12 / 100).toFixed(1)} Billion/yr` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-misc-phone-bill',
    title: 'What Will My Monthly Phone Bill Be in 5 Years? (KPMG Case)',
    prompt: 'Estimate how much your family’s monthly mobile phone bill will amount to five years from now.',
    difficulty: 3,
    archetype: 'Fermi & Brainteaser',
    approachType: 'Hybrid (Demand + Supply)',
    templateId: 'tpl-fmcg',
    tags: ['KPMG Interview', 'Extrapolation', 'Inflation', 'Clarification Heavy'],
    clarifyingQuestions: [
      { q: 'How many lines/members are on the current family plan, and what are their current tariffs?', a: 'KPMG Interview Setup: User + Spouse on prepaid unlimited + 1.5 GB/day (~₹299/mo each), plus 10-yr-old child on half-price 6 GB/month plan (~₹150/mo)!', why: 'This question is 100% a CLARIFICATION test—you cannot solve "MY bill" without asking about the user’s profile!' },
      { q: 'Do we factor in telecom tariff inflation (ARPU hikes) and the child’s growing data needs?', a: 'Yes! In 5 years, child turns 15 (upgrading to full teen data plan!), plus ~6–8% annual telecom price inflation.', why: 'Shows multi-driver forecasting instead of flat inflation!' }
    ],
    strategyOverview: 'Clarification + Structural Forecast Model! Step 1: Establish current baseline via questions (~₹299 + ₹299 + ₹150 = ~₹750/month). Step 2: Identify 3 structural drivers over 5 years: (A) Lifecycle change—10-yr-old turns 15, upgrading from half-plan to full 1.5–2 GB/day teen plan (+100% on child’s line!); (B) Telecom ARPU/Tariff Inflation (~7–8% CAGR in India = × 1.45 over 5 yrs); (C) 5G/OTT bundle upgrades (~+10–15%). Result: (~₹300 × 3 lines) × 1.45 inflation × 1.1 upgrade ≈ ~₹1,400–1,500/month!',
    formula: 'Future Bill = ∑ (Future Line Base Cost after Lifecycle Shift) × (1 + Tariff CAGR)^5 × Tech/Bundle Factor',
    assumptions: [
      { label: 'Current Baseline: 2 Adults @ ~₹300/mo + 1 Child (10 yrs) @ ~₹150/mo = ₹750/month', rationale: 'Standard Indian prepaid unlimited + 1.5 GB/day pack (~₹299/28d).' },
      { label: 'Lifecycle Shift: Child turns 15 → upgrades to full ₹300/mo base plan → New Base = ₹900/mo', rationale: 'Teens stream video/social media heavily.' },
      { label: 'Telecom Inflation: ~7–8% annual tariff hike (~1.4× over 5 yrs) + 10% 5G/OTT data tier shift', rationale: 'Indian telecom ARPU is actively rising from ~₹200 toward ₹300+.' }
    ],
    tree: {
      label: 'Current Family Plan (₹750/mo)',
      valueText: '₹750/mo Today',
      children: [
        { label: '1. Lifecycle Upgrade (Child 10→15 yrs matches adult plan)', valueText: 'Base → ₹900/mo' },
        { label: '2. Telecom Tariff Inflation (~7% CAGR for 5 yrs = ×1.40)', valueText: '₹1,260/mo', highlight: true },
        { label: '3. 5G / OTT Add-On Bundle (~+15%)', valueText: '~₹1,450 / Month in 5 Years', highlight: true }
      ]
    },
    finalAnswer: '~₹1,350 – ₹1,600 / Month (roughly 2x today’s ₹750 bill)',
    acceptableRange: { min: 1000, max: 2500, unit: '₹/month', display: '₹1,000 – ₹2,500/month' },
    sanityCheck: 'Going from ₹750 to ~₹1,450 over 5 years represents ~14% total annual family spend growth (half from tariff hikes, half from child growing into a teenager + 5G usage). Super logical!',
    interviewerTrap: 'Simply multiplying ₹750 × (1.06)^5 without noticing the 10-year-old child turns 15 (changing usage tier) OR forgetting to ask about the existing plan!',
    variations: [
      { question: 'What if the family switches to a consolidated Postpaid Family Plan with bundled Netflix/Prime?', hint: 'Postpaid family + OTT typically runs ₹1,200–1,800/mo + 18% GST today → ~₹2,000–2,500 in 5 yrs.' }
    ],
    guidedPractice: {
      correctApproach: 'Hybrid (Demand + Supply)',
      funnelOptions: [
        { label: 'Ask for Baseline Plan → Model Lifecycle Upgrade (Child 10→15) × Telecom Tariff Inflation × 5G Usage Shift', correct: true, feedback: 'Textbook KPMG answer! Asking clarifying questions + identifying the child’s age transition is the whole point of this case.' },
        { label: 'Guess ₹2,000 randomly', correct: false, feedback: 'Without clarifying current lines and data needs, any number is a blind guess.' },
        { label: 'India Telecom Revenue ÷ 140 Cr', correct: false, feedback: 'Ignores the specific family scenario provided by the interviewer.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'adultCost', label: 'Current Adult Line / Mo (₹)', defaultVal: 300, min: 200, max: 600, step: 50, unit: '₹' },
        { key: 'lines', label: 'Total Lines in 5 Yrs', defaultVal: 3, min: 1, max: 5, step: 1, unit: 'lines' },
        { key: 'cagr', label: 'Telecom Tariff Growth %/Yr', defaultVal: 8, min: 3, max: 15, step: 1, unit: '%' },
        { key: 'upgradePct', label: '5G/Data Tier Upgrade %', defaultVal: 15, min: 0, max: 40, step: 5, unit: '%' }
      ],
      computeFormulaText: '(Adult Plan × Lines) × (1 + CAGR)^5 × (1 + Data Upgrade%)',
      compute: (v) => {
        const bill = v.adultCost * v.lines * Math.pow(1 + v.cagr / 100, 5) * (1 + v.upgradePct / 100);
        return {
          value: bill,
          formatted: `₹${Math.round(bill).toLocaleString('en-IN')} / Month`,
          breakdown: [
            { label: '5-Yr Inflation Multiplier', val: `${Math.pow(1 + v.cagr / 100, 5).toFixed(2)}x` },
            { label: 'Annual Family Bill', val: `₹${Math.round(bill * 12).toLocaleString('en-IN')}/yr` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-misc-penguins-antarctica',
    title: 'How Many Penguins Can Live in Antarctica?',
    prompt: 'Estimate the maximum carrying capacity (how many penguins can live) in Antarctica.',
    difficulty: 5,
    archetype: 'Fermi & Brainteaser',
    approachType: 'Geometry & Proxy',
    templateId: 'tpl-geometry',
    tags: ['Ecological Carrying Capacity', 'Brainteaser', 'Spatial', 'Climate Twist'],
    clarifyingQuestions: [
      { q: 'Are we estimating maximum carrying capacity (spatial + food limits) rather than current population?', a: 'Yes, "can live" = ecological carrying capacity (habitat space vs food supply)!', why: 'Look for the binding bottleneck: Ice Coastline Space vs Krill/Fish Food!' }
    ],
    strategyOverview: 'Ecological Bottleneck Model! Antarctica Area = ~14 Million sq km (almost circular continent, radius ~2,100 km → Coastline Perimeter = 2πr ≈ 13,000–18,000 km with bays/peninsulas!). CRITICAL INSIGHT: Penguins do NOT live in the barren frozen inland desert (-60°C, 1,000 km from ocean)—they ONLY nest along the coastal ice shelf (~1–2 km strip)! Coastal Habitat = 18,000 km × 1 km = 18,000 sq km. Next check TWO constraints: (1) Space limit: if ~5,000–10,000 penguins per coastal sq km (dense rookeries separated by empty coastline) → ~90–180 Million penguins; (2) Food limit (Krill/Fish biomass in Southern Ocean): ~300–500M tonnes krill sustainably consumed × ~15% penguin share ÷ ~0.5 kg/day × 365 (180 kg/yr/penguin) = ~250–400M max! Taking the tighter coastal/colony limit (~50–150 Million), climate change shrinks sea-ice habitat by ~20–30%!',
    formula: 'Carrying Capacity = Min(Coastal Habitat Area × Colony Density, Sustainable Prey Biomass ÷ Annual Consumption/Penguin)',
    assumptions: [
      { label: 'Antarctica Area = ~14M sq km → Coastline ~18,000 km × ~1 km livable coastal strip = ~18,000 sq km', rationale: 'Inland ice sheet is uninhabitable; penguins need ocean access for food.' },
      { label: 'Effective Coastal Density (accounting for cliffs/glaciers/uninhabitable rocks ~70% unusable): ~5,000–10,000/km² on usable 5,400 km²', rationale: 'Gives ~30M – 60M (up to ~100M) coastal nesting capacity!' },
      { label: 'Climate Change Twist: Sea-ice melt reduces breeding shelves by 20–30% & krill stocks by ~20%!', rationale: 'Cuts carrying capacity proportionally.' }
    ],
    tree: {
      label: 'Antarctica (~14M sq km) → Coastal Ice Shelf (~18,000 km)',
      valueText: 'Habitat Bottleneck',
      children: [
        { label: 'Usable Coastal Strip (30% of 18,000 km × 1 km = 5,400 km²)', valueText: '5,400 sq km usable' },
        { label: 'Nesting/Foraging Capacity (~8,000–10,000 penguins/sq km)', valueText: '~45M – 55M Penguins', highlight: true },
        { label: 'Current Real Pop Check (~20–40M total penguins in Antarctica)', valueText: 'Matches Nature!', highlight: true }
      ]
    },
    finalAnswer: '~40 Million – 100 Million Penguins carrying capacity',
    acceptableRange: { min: 20, max: 150, unit: 'Million penguins', display: '20M – 150M penguins' },
    sanityCheck: 'Actual Antarctic penguin population (Adélie, Chinstrap, Emperor, Gentoo) is ~20–30 Million breeding pairs (~40–60 Million total birds)! Identifying "Coastline-only habitat, NOT all 14M sq km" is the exact insight interviewers wait for!',
    interviewerTrap: 'Multiplying ALL 14 Million sq km of Antarctica by 100 penguins/sq km = 1.4 Billion penguins—forgetting that inland Antarctica is a lifeless -60°C ice desert 1,000 km from fish!',
    variations: [
      { question: 'How does climate change alter your estimate?', hint: 'Reduces coastal pack-ice breeding platforms AND warms waters reducing krill—dropping carrying capacity by 25–40%!' }
    ],
    guidedPractice: {
      correctApproach: 'Geometry & Proxy',
      funnelOptions: [
        { label: 'Continent Coastline Perimeter × Coastal Strip Width × Usable Share % × Colony Density (checked vs Ocean Food)', correct: true, feedback: 'Genius! Recognizing that penguins only inhabit the coastal fringe—not the 14M sq km interior—is top-1% reasoning.' },
        { label: '14 Million sq km × 100 Penguins/sq km', correct: false, feedback: 'Inland Antarctica is 1,000 km from food and -60°C—no penguin can survive there!' },
        { label: 'Number of Zoo Penguins × 1,000', correct: false, feedback: 'Zoo counts aren’t tied to Antarctica’s carrying capacity.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'coastKm', label: 'Antarctic Coastline (km)', defaultVal: 18000, min: 12000, max: 25000, step: 1000, unit: 'km' },
        { key: 'usablePct', label: 'Usable Coastal Habitat %', defaultVal: 30, min: 15, max: 50, step: 5, unit: '%' },
        { key: 'perKm', label: 'Penguins / Usable Coast km', defaultVal: 10000, min: 3000, max: 20000, step: 1000, unit: '/km' }
      ],
      computeFormulaText: 'Coastline × Usable% × Penguins per Coastal km',
      compute: (v) => {
        const capM = (v.coastKm * (v.usablePct / 100) * v.perKm) / 1e6;
        return {
          value: capM,
          formatted: `${capM.toFixed(1)} Million Penguins`,
          breakdown: [
            { label: 'Usable Coastline', val: `${Math.round(v.coastKm * v.usablePct / 100).toLocaleString('en-IN')} km` },
            { label: 'Daily Krill/Fish Needed (~0.5kg)', val: `${Math.round(capM * 500).toLocaleString('en-IN')} Tonnes/day` }
          ]
        };
      }
    }
  },
  {
    id: 'iitg-misc-dog-hairs',
    title: 'Are There Two Dogs in the World With the Same Number of Hairs?',
    prompt: 'Are there two dogs in the world with the exact same number of hairs? Prove it logically.',
    difficulty: 3,
    archetype: 'Fermi & Brainteaser',
    approachType: 'Geometry & Proxy',
    templateId: 'tpl-geometry',
    tags: ['Pigeonhole Principle', 'Probability', 'Brainteaser', 'Classic'],
    clarifyingQuestions: [
      { q: 'Counting all living dogs globally (~700M–900M dogs)?', a: 'Yes, global dog population (or even just >100M dogs)!', why: 'You only need to prove Total Dogs > Max Hairs on One Dog!' }
    ],
    strategyOverview: 'Pure Mathematical Pigeonhole Principle! You don’t need exact numbers—just prove `Total Dogs (N) > Maximum Possible Hairs on Any Dog (H)`! Step 1 (Estimate H — Max hairs on a big fluffy dog): Large Golden Retriever / Husky body ≈ Cylinder of length 1m, radius 0.25m → Surface Area = 2πrL ≈ 1.57 m² (~15,000 cm²). Density = ~500–2,000 hairs/cm² → Max H ≈ 1.5M to 30 Million hairs (upper bound certainly <100 Million hairs!). Step 2 (Estimate N — Global Dogs): 8B people ÷ 4 = 2B households × ~25% own pet dog (~500M) + ~300–400M strays = ~800M–900M dogs worldwide! Since N (~900M) >> H (~30M), by the Pigeonhole Principle, probability = 100% (guaranteed mathematically)!',
    formula: 'If Dogs (N) > Max Hairs per Dog (H) → Probability = 100% (Pigeonhole Principle!)',
    assumptions: [
      { label: 'Dog Surface Area ≈ ~1.5 m² (15,000 cm²) × Hair Density (~1,000–2,000/cm²) = ~15M–30M hairs max', rationale: 'Even the fluffiest Alaskan Malamute has well under 50–100M hairs.' },
      { label: 'Global Dogs ≈ ~800–900 Million (pet dogs + street dogs)', rationale: 'Even in the US + India alone there are >150M dogs!' }
    ],
    tree: {
      label: 'Pigeonhole Proof: Compare Dogs (N) vs Max Hairs (H)',
      valueText: 'Is N > H?',
      children: [
        { label: 'H (Max Hairs on 1 Dog): 15,000 cm² × ~2,000/cm²', valueText: '~30 Million Hairs (upper bound)' },
        { label: 'N (Dogs Globally): ~500M pets + ~400M strays', valueText: '~900 Million Dogs', highlight: true },
        { label: 'Since 900M Dogs >> 30M Possible Hair Counts', valueText: 'YES — 100% Certainty!', highlight: true }
      ]
    },
    finalAnswer: 'YES — 100% Guaranteed by the Pigeonhole Principle (~900M Dogs >> ~30M Max Hairs)',
    acceptableRange: { min: 100, max: 100, unit: '% certainty', display: '100% Mathematical Certainty (N > H)' },
    sanityCheck: 'Even if a super-fluffy dog had 50 Million hairs, there are ~900 Million dogs—that’s ~18 dogs sharing every possible hair-count bucket on average! Even by the Birthday Paradox, you’d only need ~√(2×30M) ≈ 7,700 dogs for a 50% chance of a match!',
    interviewerTrap: 'Trying to compute an exact factorial probability when N > H already guarantees 100% certainty via the Pigeonhole Principle!',
    variations: [
      { question: 'Are there two people in Delhi with the exact same number of hairs on their head?', hint: 'Human scalp has ~100,000–150,000 hairs; Delhi has 30 Million people → 30M >> 150K → YES, 100%!' }
    ],
    guidedPractice: {
      correctApproach: 'Geometry & Proxy',
      funnelOptions: [
        { label: 'Estimate Max Hairs on a Dog (Surface Area × Density) vs Total Global Dogs → Prove Dogs > Max Hairs (Pigeonhole)', correct: true, feedback: 'Masterclass! Proving N > H turns a scary probability question into a 60-second airtight proof.' },
        { label: 'Say "Probably No because every dog is unique"', correct: false, feedback: 'Intuition fails on large numbers—900M dogs can’t all pick distinct integers below 30M!' },
        { label: 'Count hairs on 10 dogs and average', correct: false, feedback: 'You need the UPPER BOUND H compared to Total Population N.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'dogsM', label: 'Global Dog Population (M)', defaultVal: 900, min: 200, max: 1200, step: 50, unit: 'M' },
        { key: 'areaCm2', label: 'Large Dog Surface Area (cm²)', defaultVal: 15000, min: 5000, max: 25000, step: 2500, unit: 'cm²' },
        { key: 'density', label: 'Max Hairs / cm²', defaultVal: 1500, min: 500, max: 3000, step: 250, unit: '/cm²' }
      ],
      computeFormulaText: 'Compare Global Dogs (N) vs Max Possible Hairs (Area × Density)',
      compute: (v) => {
        const maxHairsM = (v.areaCm2 * v.density) / 1e6;
        const guaranteed = v.dogsM > maxHairsM;
        return {
          value: guaranteed ? 100 : 50,
          formatted: guaranteed ? 'YES (100% Guaranteed)' : 'Check Birthday Paradox',
          breakdown: [
            { label: 'Max Hairs on Big Dog', val: `${maxHairsM.toFixed(1)} Million` },
            { label: 'Dogs / Hair Bucket Ratio', val: `${(v.dogsM / maxHairsM).toFixed(1)}x` }
          ]
        };
      }
    }
  },
  {
    id: 'web-golf-balls-bus',
    title: 'How Many Golf Balls Can Fit Inside a School Bus?',
    prompt: 'Estimate how many golf balls can fit inside a standard school bus.',
    difficulty: 3,
    archetype: 'Volume & Geometry',
    approachType: 'Geometry & Proxy',
    templateId: 'tpl-geometry',
    tags: ['Volume Packing', '3D Geometry', 'Classic'],
    clarifyingQuestions: [
      { q: 'Standard full-size 50-seater school bus with seats STILL inside (not stripped hollow)?', a: 'Standard bus with seats/dashboard inside (subtract ~20–25% unusable volume!).', why: 'Mentioning seats & sphere packing efficiency is what interviewers test!' }
    ],
    strategyOverview: 'Volume Packing Geometry! Bus interior dimensions: ~35 ft (10.5 m) long × ~8 ft (2.4 m) wide × ~6.5 ft (2 m) tall = ~1,820 cu ft (~50 m³). Subtract ~20% for seats, engine hump, & wheel wells → ~1,450 cu ft (~40 m³) usable air space! Golf ball diameter ≈ 1.68 in (~4.27 cm → radius 2.13 cm): Sphere volume = (4/3)πr³ ≈ ~40.5 cm³ (or bounding cube d³ ≈ 78 cm³!). Using Sphere Packing Efficiency (~64% for random pouring): Usable Volume (40 × 10⁶ cm³) × 0.64 ÷ 40.5 cm³ ≈ ~6,30,000 (~5–6.5 Lakh) golf balls!',
    formula: 'Golf Balls = (Bus Volume × Usable Space % × Packing Efficiency 0.64) ÷ Single Golf Ball Sphere Volume',
    assumptions: [
      { label: 'Bus Interior = 10.5m × 2.4m × 2.0m ≈ 50 m³ (minus 20% seats/dashboard = 40 m³)', rationale: 'Easy mental anchors: ~10m long, 2.5m wide, 2m tall.' },
      { label: 'Golf Ball Diameter ≈ 4.3 cm (r ≈ 2.15 cm) → Sphere Vol ≈ 41 cm³ (or bounding cube 4.3³ ≈ 80 cm³!)', rationale: 'Note: Bounding cube method (Vol ÷ d³) gives packing efficiency ~52%, whereas Random Sphere Packing is ~64%!' },
      { label: '40,000,000 cm³ × 0.64 ÷ 41 cm³ ≈ 6,24,000 (~5–6 Lakh golf balls!)', rationale: 'If stripped hollow without seats, ~7.5–8 Lakh!' }
    ],
    tree: {
      label: 'School Bus Interior (10.5m × 2.4m × 2.0m = 50 m³)',
      valueText: '50 m³ Gross',
      children: [
        { label: 'Minus 20% Seats/Engine/Dashboard', valueText: '40 m³ Usable Space' },
        { label: '× 64% Random Sphere Packing Efficiency', valueText: '25.6 m³ Solid Ball Volume' },
        { label: '÷ 41 cm³ per Golf Ball (40×10⁻⁶ m³)', valueText: '~6,25,000 (~5–6.5L) Golf Balls', highlight: true }
      ]
    },
    finalAnswer: '~5 Lakh – 6.5 Lakh Golf Balls',
    acceptableRange: { min: 350000, max: 900000, unit: 'Golf balls', display: '3.5 Lakh – 9 Lakh golf balls' },
    sanityCheck: 'In cubic feet: ~1,450 usable cu ft × ~360–400 golf balls/cu ft (packed) ≈ ~5.2–5.8 Lakh golf balls! Two independent unit systems (cm³ and cu ft) agree completely!',
    interviewerTrap: 'Forgetting TWO deductions: (1) Subtracting ~20% for bus seats/aisle structures, AND (2) Multiplying by ~64% sphere packing efficiency (air gaps between spheres)!',
    variations: [
      { question: 'How many tennis balls fit inside the same school bus?', hint: 'Tennis ball diameter (~6.7 cm) is ~1.56x golf ball → volume is 1.56³ ≈ 3.8x bigger → ~6.2L ÷ 3.8 ≈ ~1.6 Lakh tennis balls!' }
    ],
    guidedPractice: {
      correctApproach: 'Geometry & Proxy',
      funnelOptions: [
        { label: 'Bus Interior Volume × Usable % (minus seats) × Sphere Packing Efficiency (64%) ÷ Sphere Volume of 1 Ball', correct: true, feedback: 'Classic Google/McKinsey masterclass! Never forget seats + 64% sphere packing efficiency.' },
        { label: 'Bus Length ÷ Ball Diameter', correct: false, feedback: '1-dimensional length misses width and height (3D volume scales by L×W×H!).' },
        { label: 'Bus Weight ÷ Ball Weight', correct: false, feedback: 'A heavy steel bus weight has nothing to do with interior air volume.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'busVolM3', label: 'Bus Interior Volume (m³)', defaultVal: 50, min: 30, max: 70, step: 5, unit: 'm³' },
        { key: 'usablePct', label: 'Usable Space (excl. seats) %', defaultVal: 80, min: 65, max: 100, step: 5, unit: '%' },
        { key: 'packPct', label: 'Sphere Packing Efficiency %', defaultVal: 64, min: 52, max: 74, step: 2, unit: '%' }
      ],
      computeFormulaText: '(Bus m³ × 10⁶ × Usable% × Packing%) ÷ 41 cm³',
      compute: (v) => {
        const balls = (v.busVolM3 * 1e6 * (v.usablePct / 100) * (v.packPct / 100)) / 41;
        return {
          value: balls,
          formatted: `${(balls / 1e5).toFixed(2)} Lakh Golf Balls`,
          breakdown: [
            { label: 'Exact Count', val: `${Math.round(balls).toLocaleString('en-IN')}` },
            { label: 'Weight of Balls (~45g ea)', val: `${(balls * 0.045 / 1000).toFixed(1)} Tonnes` }
          ]
        };
      }
    }
  },
  {
    id: 'web-piano-tuners',
    title: 'How Many Piano Tuners Are There in Chicago (or Mumbai)?',
    prompt: 'Estimate the number of piano tuners working in a major metro like Chicago (~3M city / ~9M metro) or Mumbai.',
    difficulty: 3,
    archetype: 'Fermi & Brainteaser',
    approachType: 'Hybrid (Demand + Supply)',
    templateId: 'tpl-workforce',
    tags: ['Fermi Classic', 'Service Capacity', 'Demand-Supply Match'],
    clarifyingQuestions: [
      { q: 'Are we modeling Chicago city (~2.7–3M) or Greater Chicago Metro (~9M)?', a: 'Clarify! Standard Chicago city proper (~2.7–3M, ~1M households); scale 3x if metro.', why: 'Classic Fermi baseline!' },
      { q: 'Include institutional pianos (schools, churches, concert halls) alongside households?', a: 'Yes! Schools/churches/music academies add ~20–25% on top of households.', why: 'Shows complete MECE coverage.' }
    ],
    strategyOverview: 'The Original 1940s Enrico Fermi Problem—every consultant should know this by heart! Step 1 (Annual Tuning Demand): ~3M population ÷ 2.5 HH size = ~1.2M households × ~4–5% own a piano = ~50,000–60,000 household pianos (+ ~15,000 in schools/churches/bars = ~70,000 pianos). Tuned avg ~0.8–1 time/year = ~60,000–70,000 tunings/year! Step 2 (Supply per Tuner): 1 tuning takes ~2 hours (including city commute!). At 2 tunings/day × 250 working days/yr = 500 tunings/tuner/year. Step 3: 65,000 ÷ 500 = ~130 piano tuners!',
    formula: 'Tuners = [(Households × Piano % + Institutional Pianos) × Tunings/Yr] ÷ (Tunings/Day × Working Days/Yr)',
    assumptions: [
      { label: 'Chicago City = 2.7–3M (~1.1M HH) × 5% piano ownership = 55,000 + ~15,000 schools/churches = ~70,000 pianos', rationale: 'Institutional pianos are tuned more often (2–4x/yr), balancing casual homes tuned every 2 yrs → ~1 tuning/yr avg.' },
      { label: '1 Tuner completes ~2 tunings/day (each takes ~2–2.5 hrs + travel) × 250 work days = 500 tunings/yr', rationale: 'Gives ~140 full-time equivalent piano tuners!' }
    ],
    tree: {
      label: 'Chicago City (~3M ÷ 2.5 = 1.2M HH)',
      valueText: '1.2M Households',
      children: [
        { label: 'Household Pianos (5% = 60K) + Schools/Churches (15K)', valueText: '75,000 Pianos' },
        { label: '× ~0.9 Tunings/Year Avg', valueText: '~67,500 Tunings/Yr', highlight: true },
        { label: '÷ 500 Tunings/Tuner/Year (2/day × 250d)', valueText: '~135 Piano Tuners', highlight: true }
      ]
    },
    finalAnswer: '~100 – 150 Piano Tuners (in Chicago city; ~250–350 in Greater Metro)',
    acceptableRange: { min: 60, max: 350, unit: 'Tuners', display: '60 – 350 piano tuners' },
    sanityCheck: 'Historical Chicago Yellow Pages listed ~120–150 piano tuners when Fermi first posed this question! That is why Demand-to-Supply matching is the ultimate consulting superpower.',
    interviewerTrap: 'Assuming a tuner works 8 hours straight doing 8 tunings/day (forgetting ~1 hour travel + setup per house!) or forgetting school/church/concert pianos.',
    variations: [
      { question: 'How many full-time AC repair technicians work in Delhi during summer?', hint: '10.35M ACs × ~1.5 services/yr ÷ (~4 visits/day × 180 peak-season days ≈ 720 visits) ≈ ~20,000–25,000 technicians!' }
    ],
    guidedPractice: {
      correctApproach: 'Hybrid (Demand + Supply)',
      funnelOptions: [
        { label: 'Total Pianos (Homes + Schools/Churches) × Annual Tunings ÷ (Tunings/Day × Work Days/Yr)', correct: true, feedback: 'Spot on! You just solved the original Enrico Fermi problem like a pro.' },
        { label: 'Chicago Population ÷ 10,000', correct: false, feedback: 'No logical derivation behind dividing by 10,000.' },
        { label: 'Music Stores × 2', correct: false, feedback: 'Most piano tuners are independent freelancers, not sitting inside retail stores.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'hhK', label: 'City Households (K)', defaultVal: 1200, min: 500, max: 3500, step: 100, unit: 'K' },
        { key: 'pianoPct', label: 'HH Piano Ownership %', defaultVal: 5, min: 1, max: 10, step: 0.5, unit: '%' },
        { key: 'tuneYr', label: 'Avg Tunings / Piano / Yr', defaultVal: 1.0, min: 0.5, max: 2.0, step: 0.25, unit: '/yr' },
        { key: 'tunerCapYr', label: 'Tunings / Tuner / Year', defaultVal: 500, min: 300, max: 800, step: 50, unit: '/yr' }
      ],
      computeFormulaText: '(Households × Piano% × 1.25 Inst. Uplift × Tunings/Yr) ÷ Tunings/Tuner/Yr',
      compute: (v) => {
        const pianos = v.hhK * 1000 * (v.pianoPct / 100) * 1.25;
        const tuners = (pianos * v.tuneYr) / v.tunerCapYr;
        return {
          value: tuners,
          formatted: `${Math.round(tuners)} Piano Tuners`,
          breakdown: [
            { label: 'Total Pianos in City', val: `${Math.round(pianos).toLocaleString('en-IN')}` },
            { label: 'Annual Tunings Demanded', val: `${Math.round(pianos * v.tuneYr).toLocaleString('en-IN')}` }
          ]
        };
      }
    }
  },
  {
    id: 'web-whatsapp-messages-india',
    title: 'Number of WhatsApp Messages Sent Daily in India',
    prompt: 'Estimate the total number of WhatsApp messages sent per day in India.',
    difficulty: 3,
    archetype: 'Usage & Behavioral',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['PM Interview', 'WhatsApp', 'Behavioral Segments', 'Group Chats'],
    clarifyingQuestions: [
      { q: 'Count every message delivered (so 1 message in a 20-person group = 1 sent or 20 received)?', a: 'Messages SENT by senders (1 sent message, even if posted in a group—mention group fan-out as bonus!).', why: 'Huge distinction in messaging system architecture!' }
    ],
    strategyOverview: 'Digital User Tiering Funnel! India Pop (1.4B) → Smartphone Users (~700M) → WhatsApp Adoption (~85% of smartphone Indians = ~580–600M MAUs) → Daily Active Users (DAU ~85% = ~500M daily users!). Segment 500M DAU by Intensity: Power/Youth/Business Users (20% = 100M × 100 msgs/day = 10B), Regular Users (50% = 250M × 30 msgs/day = 7.5B), Light/Occasional/Seniors (30% = 150M × 6 msgs/day = 0.9B) = ~18.4 Billion messages sent/day!',
    formula: 'Daily Messages = Smartphone Pop × WhatsApp % × DAU % × ∑ (Intensity Tier % × Msgs/Day)',
    assumptions: [
      { label: 'India Smartphone Users ≈ ~700M; WhatsApp Penetration = 85% (~600M MAU); DAU = ~85% (~500M DAU)', rationale: 'WhatsApp is near-universal utility on Indian smartphones.' },
      { label: 'Power/Young/SMB (20% × 100/day = 10B) + Regular (50% × 30/day = 7.5B) + Light (30% × 6/day = 0.9B)', rationale: 'Weighted avg = ~37 messages sent/DAU/day → ~18–20 Billion messages sent/day!' }
    ],
    tree: {
      label: 'India Smartphone Users (~700M) → Daily WhatsApp (~500M DAU)',
      valueText: '500M Daily Users',
      children: [
        { label: 'Power / Youth / SMB (20% = 100M × 100 msgs/day)', valueText: '10.0 Billion/day', highlight: true },
        { label: 'Regular Users (50% = 250M × 30 msgs/day)', valueText: '7.5 Billion/day' },
        { label: 'Light / Elderly (30% = 150M × 6 msgs/day)', valueText: '0.9 Billion/day' },
        { label: 'Total Messages Sent Daily in India', valueText: '~18.4 Billion Messages/Day', highlight: true }
      ]
    },
    finalAnswer: '~15 – 25 Billion WhatsApp Messages Sent/Day in India',
    acceptableRange: { min: 8, max: 35, unit: 'Billion messages/day', display: '8B – 35B messages/day' },
    sanityCheck: 'Meta reports ~100–140 Billion WhatsApp messages globally per day across ~2.5B DAU (~40–50 msgs/user/day). India (~500M DAU = ~20% of global WhatsApp users) sending ~18–22 Billion messages/day fits global WhatsApp stats like clockwork!',
    interviewerTrap: 'Applying a flat "10 messages/day" to everyone without segmenting power chatters/youth vs light Good-Morning forwarders—or confusing messages SENT with messages RECEIVED in group chats!',
    variations: [
      { question: 'How much server storage (TB) per day is needed just for text messages in India?', hint: '20B messages × ~100 bytes text/metadata = ~2 TB/day just for text (media photos/videos add Petabytes!).' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'India Pop → Smartphone Users → WhatsApp % → DAU % → Power/Medium/Light Usage Tiers × Msgs/Day', correct: true, feedback: 'Spot on! Behavioral intensity tiering (Power/Med/Light) is the secret weapon of PM guesstimates.' },
        { label: 'Telecom SMS Volume × 10', correct: false, feedback: 'Almost all SMS today is bank OTPs and spam, completely unrelated to chat volume.' },
        { label: '500M × 2', correct: false, feedback: 'Nobody sends only 2 WhatsApp texts a day—each back-and-forth conversation is 10–20 quick texts!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'dauM', label: 'India WhatsApp DAU (M)', defaultVal: 500, min: 350, max: 650, step: 25, unit: 'M' },
        { key: 'avgMsgs', label: 'Weighted Avg Msgs Sent / DAU / Day', defaultVal: 37, min: 15, max: 65, step: 3, unit: 'msgs' }
      ],
      computeFormulaText: 'Daily Active Users × Weighted Avg Messages Sent/Day',
      compute: (v) => {
        const msgsB = (v.dauM * 1e6 * v.avgMsgs) / 1e9;
        return {
          value: msgsB,
          formatted: `${msgsB.toFixed(1)} Billion Msgs/Day`,
          breakdown: [
            { label: 'Messages / Second (avg)', val: `${Math.round(msgsB * 1e9 / 86400).toLocaleString('en-IN')}/sec` },
            { label: 'Share of Global (~120B)', val: `${(msgsB / 120 * 100).toFixed(1)}%` }
          ]
        };
      }
    }
  },
  {
    id: 'web-windows-city',
    title: 'How Many Windows Are There in a Metro City (e.g., Mumbai / Delhi)?',
    prompt: 'Estimate the total number of windows in buildings across a metro city like Delhi or Mumbai.',
    difficulty: 4,
    archetype: 'Volume & Geometry',
    approachType: 'Hybrid (Demand + Supply)',
    templateId: 'tpl-geometry',
    tags: ['Spatial & Real Estate', 'MBB Classic', 'Residential + Commercial'],
    clarifyingQuestions: [
      { q: 'Counting building windows ONLY (excluding car/bus/train windows)?', a: 'Building windows only (residential + commercial/institutional).', why: 'Prevents mixing vehicle glass with architecture.' },
      { q: 'Count 1 window frame unit (whether 2-pane sliding or casement) as 1 window?', a: 'Yes, 1 architectural window opening = 1 window.', why: 'Keeps window unit clean.' }
    ],
    strategyOverview: 'Residential + Commercial/Institutional MECE Breakdown! Pillar 1 (Residential — via Households): Delhi/Mumbai Pop (~20M) ÷ 4.2 = ~4.8M Households (or 30M Delhi ÷ 4 = 7.5M HH). Split into Slum/Informal/1-Room (35% × ~1.5 windows = 4M), Mid 2BHK Apartments (50% × ~6 windows = 22.5M), High/Luxury 4BHK/Bungalows (15% × ~12 windows = 13.5M) → ~40M residential windows! Pillar 2 (Commercial, Offices, Schools, Hospitals, Shops): Add ~25–30% of residential (~10–12M windows) → Total ≈ ~50–55 Million windows!',
    formula: 'Total Windows = ∑ (Households by Tier × Windows/Home) + Commercial/Office/School Windows',
    assumptions: [
      { label: 'Delhi NCR (30M ÷ 4 = 7.5M HH): Informal/1-Rm (35% × 1.5 win), Mid Flats (50% × 6 win), Luxury (15% × 12 win)', rationale: 'Typical 2BHK flat has 1 living + 2 bed + 1 kitchen + 2 small bath = ~6 windows.' },
      { label: 'Commercial/Institutional Uplift (~25–30% on top of residential)', rationale: 'Glass office buildings in Gurgaon/Noida/CP + schools + hospitals.' }
    ],
    tree: {
      label: 'Delhi Buildings (30M Pop → 7.5M HH + Commercial)',
      valueText: '~52 Million Windows',
      children: [
        { label: 'Residential: Low (3.9M) + Mid (22.5M) + High (13.5M)', valueText: '~40 Million windows', highlight: true },
        { label: 'Commercial, Offices, Schools & Hospitals (~30% uplift)', valueText: '~12 Million windows' },
        { label: 'Total Building Windows in Delhi', valueText: '~52 Million Windows', highlight: true }
      ]
    },
    finalAnswer: '~40 – 60 Million Building Windows (for a 20–30M Indian metro)',
    acceptableRange: { min: 25, max: 85, unit: 'Million windows', display: '25M – 85M windows' },
    sanityCheck: '52 Million windows ÷ 30M residents = ~1.7 windows per resident (~6.9 windows per household including office/school windows shared by the family). Super intuitive!',
    interviewerTrap: 'Trying to count buildings from city land area without knowing average building height/floor counts—Households × Windows/Home + Commercial % is 10x faster and cleaner!',
    variations: [
      { question: 'Estimate annual glass replacement / window market in Delhi.', hint: '52M windows ÷ ~25-yr life + ~3% new construction = ~3.5M window units/yr!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'City Pop ÷ HH Size → Housing Tiers × Windows/Home + Commercial/Office/School Uplift', correct: true, feedback: 'Spot on! Household-anchored housing tiers are way cleaner than guessing skyscraper heights across an entire city.' },
        { label: 'City Area ÷ 10 sq ft', correct: false, feedback: 'Vertical multi-story buildings pack multiple apartments onto the same ground footprint!' },
        { label: 'Glass Factories × 1,000', correct: false, feedback: 'Unrelated to city stock.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'hhM', label: 'City Households (M)', defaultVal: 7.5, min: 3, max: 10, step: 0.5, unit: 'M' },
        { key: 'avgWin', label: 'Weighted Windows / Home', defaultVal: 5.3, min: 3, max: 8, step: 0.3, unit: 'win' },
        { key: 'commPct', label: 'Commercial & School Uplift %', defaultVal: 30, min: 15, max: 50, step: 5, unit: '%' }
      ],
      computeFormulaText: '(Households × Windows/Home) × (1 + Commercial Uplift%)',
      compute: (v) => {
        const totalM = v.hhM * v.avgWin * (1 + v.commPct / 100);
        return {
          value: totalM,
          formatted: `${totalM.toFixed(1)} Million Windows`,
          breakdown: [
            { label: 'Residential Windows', val: `${(v.hhM * v.avgWin).toFixed(1)} M` },
            { label: 'Commercial/Institutional', val: `${(totalM - v.hhM * v.avgWin).toFixed(1)} M` }
          ]
        };
      }
    }
  }
);
