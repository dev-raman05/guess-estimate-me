window.GM_DATA = window.GM_DATA || {};
window.GM_DATA.problems = window.GM_DATA.problems || [];

window.GM_DATA.problems.push(
  {
    id: 'vol1-healthy-biscuits',
    title: 'Market Size of the Healthy Biscuit Industry in India',
    prompt: 'Estimate the annual market size (revenue) of the healthy biscuit industry in India.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 14 (Book p. 10)',
    company: 'Accenture',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['FMCG', 'India', 'Age & Income Funnel', 'Food'],
    clarifyingQuestions: [
      { q: 'Are we estimating annual revenue (₹) or unit volume (packs)?', a: 'Annual market revenue in India (INR).', why: 'Determines whether you multiply by price at the end.' },
      { q: 'What counts as a "healthy biscuit"?', a: 'Digestive, oats, ragi, sugar-free, and multigrain biscuits priced at a premium over regular glucose biscuits.', why: 'Justifies filtering out lower-income and rural segments.' },
      { q: 'Should we focus only on B2C household/retail consumption?', a: 'Yes, individual consumer retail demand.', why: 'Avoids institutional/airline catering complexity.' }
    ],
    strategyOverview: 'Use a Top-Down Demand Funnel starting from India’s 1.4B population. Because healthy biscuits are awareness-driven and relatively expensive, filter first by Urban (35%), then Upper Income (10%), and segment by Age (skewed heavily toward 40+ health-conscious consumers). Multiply target consumers by annual consumption and unit price.',
    formula: 'Market Size = Target Consumers × Biscuits per Year × Price per Biscuit',
    assumptions: [
      { label: 'India Population = 1.4 Billion; Urban = 35% (490M)', rationale: 'Healthy biscuits require retail reach and nutrition awareness concentrated in cities.' },
      { label: 'Target Upper-Income Urban = 10% (49M)', rationale: 'Premium health biscuits cost ~5–10x regular Parle-G, skewing heavily to affluent households.' },
      { label: 'Core 40+ Health-Conscious Segment = 35% (17.15M)', rationale: 'Older adults buy digestive/sugar-free biscuits regularly for blood sugar and heart health.' },
      { label: 'Consumption = 1.5 biscuits/day (3 per 2 days × 180 two-day cycles = 540/yr)', rationale: 'Morning/evening tea companion habit.' },
      { label: 'Price = ₹25 per biscuit (or ₹50 per 2-pack)', rationale: 'Note: In practice, a full digestive pack (~₹30–50) holds ~10–15 biscuits, so verify packet vs single biscuit pricing with your interviewer!' }
    ],
    tree: {
      label: 'India Population',
      valueText: '1,400M (1.4B)',
      children: [
        {
          label: 'Urban (35%)',
          valueText: '490M',
          highlight: true,
          children: [
            {
              label: 'Upper Income (10%)',
              valueText: '49M',
              highlight: true,
              children: [
                { label: 'Age 0–25 (40%)', valueText: '19.6M', muted: true },
                { label: 'Age 25–40 (25%)', valueText: '12.25M', muted: true },
                {
                  label: 'Age 40+ Target (35%)',
                  valueText: '17.15M consumers',
                  highlight: true,
                  children: [
                    { label: '× 540 biscuits/yr × ₹25', valueText: '₹23,152.5 Cr (₹231.5B)', highlight: true }
                  ]
                }
              ]
            },
            { label: 'Middle (40%)', valueText: '196M (excluded in base)', muted: true },
            { label: 'Lower (50%)', valueText: '245M (excluded)', muted: true }
          ]
        },
        { label: 'Rural (65%)', valueText: '910M (negligible premium share)', muted: true }
      ]
    },
    finalAnswer: '~₹23,153 Crore (₹231.5 Billion) [Book Value]; Realistic retail benchmark ~₹3,000–6,000 Cr if priced per pack',
    acceptableRange: { min: 2000, max: 30000, unit: '₹ Crore', display: '₹3,000 Cr – ₹25,000 Cr (depending on per-biscuit vs per-pack pricing)' },
    sanityCheck: 'Book value gives ₹23,153 Cr (~₹13,500/consumer/year = ₹37/day), which is high for biscuits alone because the book priced a single biscuit at ₹25 instead of ₹2.5–₹5. Pointing this out in an interview—and adjusting to ₹3–5/biscuit (~₹2,300–4,600 Cr)—shows sharp business sense!',
    interviewerTrap: 'Beginner mistake: Confusing price per PACK (₹50) with price per SINGLE BISCUIT (₹25), inflating the market 10x! Also ignoring younger 25–40 gym-goers (protein/oats cookies) entirely.',
    variations: [
      { question: 'Estimate the market size of protein bars in Urban India.', hint: 'Shift age skew from 40+ to 18–35 fitness-conscious urban upper/upper-middle class.' },
      { question: 'What if middle-income urban consumers (25–40 yrs) also adopt digestive biscuits at 20%?', hint: 'Add 196M × 25% × 20% = 9.8M extra consumers into the funnel.' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Population → Urban/Rural → Income Filter → Age Filter → Frequency × Price', correct: true, feedback: 'Spot on! Premium FMCG products rely heavily on Urban + Income affordability + Age preference filters.' },
        { label: 'Total Bakeries in India × Ovens per Bakery × Biscuits baked/hour', correct: false, feedback: 'Supply-side capacity is hard to size for packaged national FMCG brands—demand funnel is far cleaner.' },
        { label: 'Total Households ÷ 7-year Biscuit Lifespan', correct: false, feedback: 'Biscuits are consumables eaten daily, not durable goods with a multi-year lifespan!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'India Population (M)', defaultVal: 1400, min: 1300, max: 1500, step: 50, unit: 'M' },
        { key: 'urbanPct', label: 'Urban %', defaultVal: 35, min: 25, max: 45, step: 5, unit: '%' },
        { key: 'incomePct', label: 'Target Income %', defaultVal: 10, min: 5, max: 30, step: 5, unit: '%' },
        { key: 'agePct', label: 'Target Age 40+ %', defaultVal: 35, min: 20, max: 60, step: 5, unit: '%' },
        { key: 'perYear', label: 'Units / Consumer / Year', defaultVal: 540, min: 100, max: 730, step: 20, unit: 'units' },
        { key: 'price', label: 'Price per Unit (₹)', defaultVal: 25, min: 2, max: 50, step: 1, unit: '₹' }
      ],
      computeFormulaText: 'Pop × Urban% × Income% × Age% × Units/Yr × Price',
      compute: (v) => {
        const consumers = v.popM * (v.urbanPct / 100) * (v.incomePct / 100) * (v.agePct / 100);
        const revCr = (consumers * 1e6 * v.perYear * v.price) / 1e7;
        return {
          value: revCr,
          formatted: `₹${Math.round(revCr).toLocaleString('en-IN')} Crore`,
          breakdown: [
            { label: 'Target Consumers', val: `${consumers.toFixed(2)} Million` },
            { label: 'Total Annual Units', val: `${(consumers * v.perYear / 1000).toFixed(2)} Billion` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-ola-uber-delhi',
    title: 'Number of Ola & Uber Cabs Running in Delhi NCR in a Day',
    prompt: 'Estimate the number of Ola and Uber cabs running in Delhi NCR in a day.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 15 (Book p. 11)',
    company: 'Accenture',
    difficulty: 2,
    archetype: 'Supply & Capacity',
    approachType: 'Hybrid (Demand + Supply)',
    templateId: 'tpl-workforce',
    tags: ['Mobility', 'Delhi NCR', 'Fleet Sizing', 'Peak/Off-Peak'],
    clarifyingQuestions: [
      { q: 'Are we estimating active cabs on the road on a typical weekday?', a: 'Yes, total operational cabs fulfilling daily demand across 24 hours.', why: 'Clarifies fleet active vs total registered.' },
      { q: 'Should we include auto-rickshaws/bikes on Ola/Uber or only 4-wheeler cabs?', a: 'Only 4-wheeler cabs (Mini, Sedan, SUV).', why: 'Keeps ticket/usage behavior focused on cab riders.' }
    ],
    strategyOverview: 'Estimate total daily cab rides demanded from Delhi NCR’s population segmented by Urban/Rural and Income (taking adoption % of riders per day), adjust for peak vs non-peak occupancy/utilization, and divide total daily rides by average rides completed by one cab per day (~10 rides/day).',
    formula: 'Cabs Running = Total Daily Cab Rides Demanded ÷ Average Rides per Cab per Day',
    assumptions: [
      { label: 'Delhi NCR Population = 33 Million (Urban 40%, Rural/Outskirts 60% — or 70/30 NCR split)', rationale: 'Note: In Vol 1 PDF, Rural/Urban split was modeled at 60/40 for broader NCR; Vol 2 adjusts this cleanly to 1.98M total users.' },
      { label: 'Daily Cab Riders = ~2.24M potential pool × Peak/Non-Peak occupancy factors', rationale: 'Peak hours (40%) at 50% active ride share + Non-peak (60%) at 20% → ~718,000 daily cab rides.' },
      { label: 'Rides per Cab per Day = 10 rides', rationale: 'In an 11-hour shift at ~45 min per ride cycle (including pickup), a driver completes ~10–12 trips/day.' }
    ],
    tree: {
      label: 'Delhi NCR Population (33M)',
      valueText: '33M',
      children: [
        {
          label: 'Potential Cab User Pool (by Income & Area)',
          valueText: '2.24M',
          children: [
            { label: 'Peak Hours (40% = 897K) × 50% active', valueText: '448K rides', highlight: true },
            { label: 'Non-Peak (60% = 1.34M) × 20% active', valueText: '269K rides' }
          ]
        },
        {
          label: 'Total Daily Rides ÷ 10 Rides/Cab',
          valueText: '718K ÷ 10 = 71,800 Cabs',
          highlight: true
        }
      ]
    },
    finalAnswer: '~63,000 – 72,000 Cabs per day',
    acceptableRange: { min: 40000, max: 120000, unit: 'Cabs', display: '40,000 – 1,20,000 cabs' },
    sanityCheck: 'Delhi NCR has ~35L–40L total passenger cars; ~70,000 app cabs represents ~2% of all cars on the road and ~7L daily rides (~2% of Delhi population taking a cab on a given day). Very realistic!',
    interviewerTrap: 'Watch out for the Vol 1 PDF arithmetic typo where Rural Lower was printed as "118M" and Middle as ".594M". In an interview, verify sub-segments add back to 33M (never exceed total population!). Also remember 1 ride can carry ~1.5 passengers on average (pool/friends), so dividing by avg group size ~1.2–1.5 makes it even sharper.',
    variations: [
      { question: 'How many Uber drivers work in Bengaluru?', hint: 'Scale Delhi NCR (~33M) down to Bengaluru (~14–15M) and adjust upward for IT-commuter cab penetration.' },
      { question: 'What is Uber’s daily commission revenue in Delhi NCR?', hint: 'Multiply 718K rides × ₹250 avg fare × 25% take rate = ~₹4.5 Cr/day.' }
    ],
    guidedPractice: {
      correctApproach: 'Hybrid (Demand + Supply)',
      funnelOptions: [
        { label: 'Daily Cab Rides Demanded (from Pop × Income × Usage) ÷ Rides per Cab per Day', correct: true, feedback: 'Correct! Matching daily ride demand with per-driver daily capacity (~10 rides/day) gives exact fleet size.' },
        { label: 'Total Roads in Delhi ÷ Length of One Cab', correct: false, feedback: 'Road length measures traffic jam capacity, not active Ola/Uber supply!' },
        { label: 'Delhi Population ÷ Household Size × 50%', correct: false, feedback: 'Cabs are commercial vehicles shared across hundreds of riders, not owned 1-per-household.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'NCR Population (M)', defaultVal: 33, min: 20, max: 40, step: 1, unit: 'M' },
        { key: 'dailyRiderPct', label: '% Pop Taking Cab/Day', defaultVal: 2.2, min: 0.5, max: 5, step: 0.2, unit: '%' },
        { key: 'paxPerRide', label: 'Avg Riders per Ride', defaultVal: 1.0, min: 1.0, max: 1.8, step: 0.1, unit: 'pax' },
        { key: 'ridesPerCab', label: 'Rides / Cab / Day', defaultVal: 10, min: 6, max: 16, step: 1, unit: 'rides' }
      ],
      computeFormulaText: '(Population × Daily Rider % ÷ Pax/Ride) ÷ Rides/Cab/Day',
      compute: (v) => {
        const rides = (v.popM * 1e6 * (v.dailyRiderPct / 100)) / v.paxPerRide;
        const cabs = rides / v.ridesPerCab;
        return {
          value: cabs,
          formatted: `${Math.round(cabs).toLocaleString('en-IN')} Cabs`,
          breakdown: [
            { label: 'Total Daily Rides', val: `${Math.round(rides).toLocaleString('en-IN')}` },
            { label: 'Rides per Cab', val: `${v.ridesPerCab}` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-flights-delhi-week',
    title: 'Number of Flights Taking Off from Delhi Airport in a Week',
    prompt: 'Estimate the number of flights taking off from Delhi Airport in a week.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 16 (Book p. 12)',
    company: 'Accenture',
    difficulty: 2,
    archetype: 'Supply & Capacity',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-bottleneck',
    tags: ['Aviation', 'Delhi IGI', 'Supply Capacity', 'Runways'],
    clarifyingQuestions: [
      { q: 'Only commercial passenger takeoffs, or cargo/charter too?', a: 'Focus on commercial passenger departures.', why: 'Cargo operates mostly late night and is a smaller fraction.' },
      { q: 'Both domestic and international flights?', a: 'Yes, all flights departing IGI Airport.', why: 'Prevents leaving out Terminal 3 international ops.' }
    ],
    strategyOverview: 'Use a pure Supply-Side Capacity approach. Separate Weekdays (Mon–Fri, 5 days) and Weekends (Sat–Sun, 2 days). Split operating hours into Peak and Non-Peak, calculate departures per hour based on turnaround/headway (1 flight every 5 min peak = 12/hr; every 10 min non-peak = 6/hr), and scale across operational units (terminals/runways).',
    formula: 'Weekly Takeoffs = [Mon–Fri Daily Takeoffs × 5] + [Sat–Sun Daily Takeoffs × 2]',
    assumptions: [
      { label: 'Operational Units = 6 departure channels (Book assumes 6 terminals; in reality IGI has 3 terminals / 3–4 runways)', rationale: 'Note: In an interview, saying "3 terminals or 4 runways (3 active for departures/arrivals)" is even more realistic than 6 terminals!' },
      { label: 'Mon–Fri: 8 Peak hours (12/hr) + 6 Non-Peak hours (6/hr) per unit', rationale: 'Peak morning (10–2) and evening (5–9) see 1 takeoff every 5 min; off-peak every 10 min; late-night maintenance/low ops.' },
      { label: 'Sat–Sun: 10 Peak hours + 6 Non-Peak hours per unit', rationale: 'Weekend leisure travel extends peak window.' }
    ],
    tree: {
      label: 'Delhi Airport Weekly Takeoffs',
      valueText: '5,880 Takeoffs/wk',
      children: [
        {
          label: 'Mon–Fri (5 Days)',
          valueText: '4,000 flights',
          children: [
            { label: 'Peak (8 hrs × 12/hr = 96) + Non-Peak (6 hrs × 6/hr = 36)', valueText: '132/unit × 6 ≈ 800/day', highlight: true }
          ]
        },
        {
          label: 'Sat–Sun (2 Days)',
          valueText: '1,880 flights',
          children: [
            { label: 'Peak (10 hrs × 12/hr = 120) + Non-Peak (6 hrs × 6/hr = 36)', valueText: '156/unit × 6 ≈ 940/day', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~5,880 Takeoffs/Week (~840/Day) [Real-world IGI handles ~700–750 departures/day = ~5,000/week!]',
    acceptableRange: { min: 3500, max: 7500, unit: 'Flights/week', display: '3,500 – 7,500 flights/week' },
    sanityCheck: '840 flights/day × 150 seats × 80% occupancy ≈ 1 lakh departing passengers/day (2 lakh total arrivals+departures/day = ~7.3 Cr/year), which matches IGI Airport’s real ~7 Cr annual passenger throughput remarkably well!',
    interviewerTrap: 'IGI Delhi actually has 3 Terminals (T1, T2, T3) and 4 Runways—not 6 terminals! Always phrase bottlenecks around RUNWAYS (physical takeoff bottleneck) rather than terminals, and check that departures = 50% of total runway movements (the other 50% are landings).',
    variations: [
      { question: 'How many flights take off from Mumbai airport in a day?', hint: 'Mumbai CSMIA is famously single-runway constrained (1 active runway at a time!) → ~450–500 departures/day.' },
      { question: 'Estimate annual passengers passing through Delhi Airport.', hint: 'Multiply daily departures × 2 (arrivals) × 150 seats × 80% load factor × 365.' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Runways/Channels × (Peak Hrs × Rate + Non-Peak Hrs × Rate) × Days in Week', correct: true, feedback: 'Exactly right! Airport throughput is physically bottlenecked by runway/gate time gaps.' },
        { label: 'India Population × % Traveling by Air ÷ 52 Weeks', correct: false, feedback: 'Hard to know Delhi’s exact share of national flyers top-down without airport capacity!' },
        { label: 'Total Planes Owned by IndiGo & Air India ÷ 7', correct: false, feedback: 'Aircraft fly multiple legs across many cities—fleet count doesn’t tell you Delhi takeoffs directly.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'runways', label: 'Effective Takeoff Channels', defaultVal: 3, min: 1, max: 6, step: 1, unit: 'channels' },
        { key: 'peakHrs', label: 'Peak Hours / Day', defaultVal: 10, min: 4, max: 14, step: 1, unit: 'hrs' },
        { key: 'peakRate', label: 'Takeoffs/Hr (Peak)', defaultVal: 18, min: 8, max: 30, step: 2, unit: '/hr' },
        { key: 'offHrs', label: 'Off-Peak Hours / Day', defaultVal: 10, min: 4, max: 14, step: 1, unit: 'hrs' },
        { key: 'offRate', label: 'Takeoffs/Hr (Off-Peak)', defaultVal: 8, min: 2, max: 15, step: 1, unit: '/hr' }
      ],
      computeFormulaText: 'Channels × [(Peak Hrs × Peak Rate) + (Off-Peak Hrs × Off-Peak Rate)] × 7 Days',
      compute: (v) => {
        const daily = v.runways * (v.peakHrs * v.peakRate + v.offHrs * v.offRate);
        const weekly = daily * 7;
        return {
          value: weekly,
          formatted: `${weekly.toLocaleString('en-IN')} Flights/Week`,
          breakdown: [
            { label: 'Daily Takeoffs', val: `${daily.toLocaleString('en-IN')}` },
            { label: 'Est. Daily Departing Pax (~130/flt)', val: `${(daily * 130).toLocaleString('en-IN')}` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-teacups-delhi',
    title: 'Number of Teacups Consumed in Delhi in One Day',
    prompt: 'Estimate the number of teacups consumed in Delhi in one day.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 17 (Book p. 13)',
    company: 'Accenture',
    difficulty: 1,
    archetype: 'Usage & Behavioral',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Beverages', 'Delhi', 'Beginner Friendly', 'Daily Consumption'],
    clarifyingQuestions: [
      { q: 'Are we counting both home-brewed tea and outside tapri/office tea?', a: 'Yes, total cups consumed across all locations in a day.', why: 'Ensures office cups aren’t dropped.' },
      { q: 'Does "Delhi" mean Delhi-NCR (~30–40M) or NCT proper (~20M)?', a: 'Standard Delhi-NCR benchmark (~30–40M; book uses 40M or 30M).', why: 'Always align base population upfront!' }
    ],
    strategyOverview: 'A classic Level-1 warm-up guesstimate! Start with Delhi population, exclude young children (0–15 yrs, ~20%), split into Urban vs Rural (or directly by Occupation), segment tea drinkers vs non-drinkers, and assign realistic cups/day (office-goers drink extra cups at work!).',
    formula: 'Total Cups = ∑ (Segment Population × Tea Drinker % × Cups per Day)',
    assumptions: [
      { label: 'Delhi Population = 40M (exclude 20% children 0–15 → 32M eligible)', rationale: 'Young children predominantly drink milk/health drinks rather than tea.' },
      { label: 'Urban (40% = 12.8M) vs Rural NCR (60% = 19.2M)', rationale: 'Note: In Delhi NCT proper, Urban is 97%; in broader NCR/book benchmark, 40/60 or 80/20 is used—state clearly!' },
      { label: 'Urban Drinkers: 30% Normal (2 cups/day), 30% Office-goers (4 cups/day), 40% Non-drinkers', rationale: 'Office-goers consume 2 cups at home + 2 office chai breaks.' },
      { label: 'Rural Drinkers: 70% drink tea at 3 cups/day; 30% non-drinkers', rationale: 'Tea is the primary household hospitality beverage.' }
    ],
    tree: {
      label: 'Eligible Population (15+ Yrs)',
      valueText: '32 Million',
      children: [
        {
          label: 'Urban (12.8M)',
          valueText: '23.04M cups',
          children: [
            { label: 'Normal Drinkers (30% = 3.84M) × 2 cups', valueText: '7.68M' },
            { label: 'Office Goers (30% = 3.84M) × 4 cups', valueText: '15.36M', highlight: true },
            { label: 'Non-Drinkers (40%)', valueText: '0', muted: true }
          ]
        },
        {
          label: 'Rural (19.2M)',
          valueText: '40.32M cups',
          children: [
            { label: 'Tea Drinkers (70% = 13.44M) × 3 cups', valueText: '40.32M', highlight: true },
            { label: 'Non-Drinkers (30%)', valueText: '0', muted: true }
          ]
        }
      ]
    },
    finalAnswer: '~6.34 Crore Cups/Day (63.36 Million) [Using 30M city base gives ~4.5 Crore cups/day]',
    acceptableRange: { min: 30000000, max: 80000000, unit: 'Cups/day', display: '3 Crore – 8 Crore cups/day' },
    sanityCheck: '6.34 Cr cups across 4 Cr total people = ~1.6 cups per person per day overall (~2 cups per adult). Completely intuitive for North India!',
    interviewerTrap: 'Make sure you explicitly exclude children 0–15 and account for office-goers drinking extra cups at work—that single nuance shows practical thinking!',
    variations: [
      { question: 'How many cups of tea are consumed in all of India in a week?', hint: 'Scale to 140 Cr population × ~0.9–1.2 cups/person/day × 7 days ≈ 850–1,000 Cr cups/week.' },
      { question: 'Estimate daily milk consumption in Delhi just for tea.', hint: 'Multiply 6.3 Cr cups × ~75 ml milk per cup ≈ 47 Lakh liters/day!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Population → Exclude 0–15 yrs → Segment by Occupation/Area → Drinker % × Cups/Day', correct: true, feedback: 'Cleanest MECE structure! Separating office-goers captures higher daily frequency.' },
        { label: 'Count every tea stall in Delhi × Hours open', correct: false, feedback: 'Most tea in India is consumed at HOME, not at stalls—supply-side stalls would miss ~70% of consumption!' },
        { label: 'Tea leaves sold ÷ Cup weight × 365', correct: false, feedback: 'You wouldn’t know annual tea leaf sales in Delhi without estimating cups first.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'Delhi Population (M)', defaultVal: 40, min: 20, max: 45, step: 2, unit: 'M' },
        { key: 'adultPct', label: 'Eligible 15+ %', defaultVal: 80, min: 70, max: 85, step: 5, unit: '%' },
        { key: 'drinkerPct', label: '% Adults Drinking Tea', defaultVal: 65, min: 45, max: 85, step: 5, unit: '%' },
        { key: 'avgCups', label: 'Avg Cups / Drinker / Day', defaultVal: 3.0, min: 1.5, max: 4.5, step: 0.25, unit: 'cups' }
      ],
      computeFormulaText: 'Pop × Eligible % × Drinker % × Avg Cups/Day',
      compute: (v) => {
        const cups = v.popM * 1e6 * (v.adultPct / 100) * (v.drinkerPct / 100) * v.avgCups;
        return {
          value: cups,
          formatted: `${(cups / 1e7).toFixed(2)} Crore Cups/Day`,
          breakdown: [
            { label: 'Daily Cups (Millions)', val: `${(cups / 1e6).toFixed(2)} M` },
            { label: 'Per Capita Overall', val: `${(cups / (v.popM * 1e6)).toFixed(2)} cups/person` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-salon-revenue',
    title: 'Estimating the Annual Revenue of a Salon',
    prompt: 'Estimate the annual revenue of a medium-sized unisex salon in a metro city.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 19 (Book p. 15)',
    company: 'Bain (BCN)',
    difficulty: 2,
    archetype: 'Revenue & Cost',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-outlet',
    tags: ['Retail Outlet', 'Service Capacity', 'Weekday vs Weekend', 'BCN'],
    clarifyingQuestions: [
      { q: 'Is it a unisex salon in a Tier-1 city or a local men’s barber shop?', a: 'Mid-to-premium unisex salon in a Tier-1 neighborhood.', why: 'Female services (hair spa/color/facials) have much higher ticket size and duration.' },
      { q: 'Should we include retail product sales (shampoos/serums)?', a: 'Focus primarily on core salon services.', why: 'Keeps the tree crisp and focused on chair occupancy.' }
    ],
    strategyOverview: 'Single-outlet revenue = Supply-Side Capacity model! Calculate total chair-hours available per day (Chairs × Hours), adjust for Weekday (70%) vs Weekend (85%) occupancy across ~362 operating days (258 weekdays + 104 weekend days), and multiply by average revenue per chair-hour (or customers × AOV).',
    formula: 'Annual Revenue = Chair-Hours/Day × Occupancy % × Revenue per Chair-Hour × Operating Days',
    assumptions: [
      { label: 'Salon has 20 chairs & operates 11 hours/day (220 chair-hours/day capacity)', rationale: 'Standard mid-size mall/high-street unisex salon.' },
      { label: 'Male customer: 0.5 hrs, ₹250 (₹500/chair-hr) | Female customer: 2 hrs, ₹2,000 (₹1,000/chair-hr)', rationale: 'Wait—notice how Male vs Female chair productivity differs! Always compute revenue per chair-hour cleanly.' },
      { label: '362 operating days/year: 258 weekdays (70% occupancy) & 104 weekend days (85% occupancy)', rationale: 'Excludes 3 national holidays; weekends see higher grooming traffic.' }
    ],
    tree: {
      label: 'Daily Capacity: 20 Chairs × 11 Hrs = 220 Chair-Hrs',
      valueText: '220 hrs/day',
      children: [
        {
          label: 'Weekdays (258 days @ 70% occ.)',
          valueText: '154 utilized hrs/day',
          children: [
            { label: '× ₹600 effective avg rev/hr × 258 days', valueText: '₹2.38 Crore', highlight: true }
          ]
        },
        {
          label: 'Weekends (104 days @ 85% occ.)',
          valueText: '187 utilized hrs/day',
          children: [
            { label: '× ₹600 effective avg rev/hr × 104 days', valueText: '₹1.17 Crore', highlight: true }
          ]
        },
        {
          label: 'Total Annual Revenue',
          valueText: '₹3.55 Crore / Year',
          highlight: true
        }
      ]
    },
    finalAnswer: '~₹3.55 Crore/year (~₹30 Lakh/month) for a large 20-chair flagship salon',
    acceptableRange: { min: 50, max: 450, unit: '₹ Lakh/year', display: '₹60 Lakh – ₹4 Crore/year (scales directly with chairs: 6–20)' },
    sanityCheck: 'Watch the Vol 1 PDF math carefully: 20 chairs is huge (a flagship Toni&Guy/Geetanjali)! For a typical 6–8 chair neighborhood salon, revenue would be ~₹1–1.2 Cr/yr (~₹8–10L/month), which easily covers ₹2–3L rent + 8 stylists salaries + supplies and leaves healthy 20% margin.',
    interviewerTrap: 'In the Vol 1 book, notice they accidentally mixed "220 chair-hours" with "Average Order Value ₹600" instead of "Revenue per Chair-Hour"! Never multiply chair-hours by per-visit ticket size unless service duration = 1 hour—always match units (Hours × ₹/Hour OR Customers × ₹/Customer)!',
    variations: [
      { question: 'What is the annual profit of this salon?', hint: 'Subtract Fixed Costs (Rent ₹2–4L/mo + Salaries ₹4–8L/mo + Utilities) and Variable Costs (Products ~15% of rev).' },
      { question: 'How many salons are there in Delhi?', hint: 'Demand side: 3 Cr population ÷ 1 haircut/month vs capacity of 1 salon.' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Chairs × Operating Hours × Peak/Weekend Occupancy × Revenue per Chair-Hour × Days', correct: true, feedback: 'Yes! Matching chair-hours with hourly revenue (or dividing by service duration) ensures exact unit consistency!' },
        { label: 'City Population × Haircut Price ÷ Total Salons', correct: false, feedback: 'You don’t know total salons in the city—supply-side unit capacity is way cleaner.' },
        { label: 'Salon Area in Sq Ft × ₹1,000', correct: false, feedback: 'Area doesn’t capture utilization, service duration, or weekday vs weekend differences.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'chairs', label: 'Number of Chairs', defaultVal: 12, min: 4, max: 25, step: 2, unit: 'chairs' },
        { key: 'hours', label: 'Open Hours / Day', defaultVal: 11, min: 8, max: 14, step: 1, unit: 'hrs' },
        { key: 'wdOcc', label: 'Weekday Occupancy %', defaultVal: 60, min: 30, max: 90, step: 5, unit: '%' },
        { key: 'weOcc', label: 'Weekend Occupancy %', defaultVal: 85, min: 50, max: 100, step: 5, unit: '%' },
        { key: 'revPerHr', label: 'Avg Revenue / Chair-Hr (₹)', defaultVal: 700, min: 250, max: 1500, step: 50, unit: '₹/hr' }
      ],
      computeFormulaText: 'Chairs × Hours × [(258×WD% + 104×WE%)] × Rev/Chair-Hr',
      compute: (v) => {
        const cap = v.chairs * v.hours;
        const wdRev = cap * (v.wdOcc / 100) * 258 * v.revPerHr;
        const weRev = cap * (v.weOcc / 100) * 104 * v.revPerHr;
        const totalCr = (wdRev + weRev) / 1e7;
        return {
          value: totalCr * 100,
          formatted: `₹${totalCr.toFixed(2)} Crore/yr`,
          breakdown: [
            { label: 'Monthly Revenue', val: `₹${((wdRev + weRev) / 12 / 1e5).toFixed(1)} Lakh/mo` },
            { label: 'Weekday vs Weekend', val: `₹${(wdRev/1e5).toFixed(0)}L / ₹${(weRev/1e5).toFixed(0)}L` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-fantasy-sports',
    title: 'Market Size of Fantasy Sports Users in India',
    prompt: 'Estimate the market size (active users / revenue) of fantasy sports platforms (like Dream11) in India.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 20 (Book p. 16)',
    company: 'Bain (BCN)',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Digital App', 'Gaming', 'India', 'Men/Youth Skew'],
    clarifyingQuestions: [
      { q: 'Are we estimating active users (volume) or annual platform revenue (₹)?', a: 'Start with active user base (book stops at users), and optionally extend to ARPU.', why: 'Clarifies exact target metric.' },
      { q: 'Include all fantasy sports (cricket, football, kabaddi) or cricket only?', a: 'All fantasy sports (cricket dominates ~85–90%).', why: 'Avoids over-narrowing.' }
    ],
    strategyOverview: 'Top-Down Digital Consumer Funnel. Start with 1.4B population, filter for primary audience (historically heavily male-skewed ~50% = 700M, though note ~15–20% female users exist too), select prime digital-payment age group (18–25 or 18–35), layer Smartphone Penetration, Internet/UPI readiness, Sports Interest %, and Fantasy App Adoption %.',
    formula: 'Users = Pop × Target Gender % × Target Age % × Smartphone % × Internet/Payment % × Sports Interest % × Fantasy Adoption %',
    assumptions: [
      { label: 'Primary User Base: Male (50% = 700M), Age 18–25 (20% = 140M) [plus 26–35 bonus in broader models]', rationale: 'Young adults have UPI/payment access and high IPL/cricket engagement.' },
      { label: 'Smartphone Penetration = 80% (112M) & Active Internet/UPI = 50% (56M)', rationale: 'Requires digital wallet/UPI to enter paid contests.' },
      { label: 'Interested in Sports = 80% (44.8M) → Fantasy App Users = 50% (22.4M)', rationale: 'High cricket fandom converts roughly half of active digital sports fans.' }
    ],
    tree: {
      label: 'India Population (1.4B)',
      valueText: '1,400M',
      children: [
        {
          label: 'Male (50%)',
          valueText: '700M',
          children: [
            {
              label: 'Prime Age 18–25 (20%)',
              valueText: '140M',
              children: [
                {
                  label: 'Mobile (80%) → Internet/UPI (50%)',
                  valueText: '56M',
                  children: [
                    { label: 'Sports Fans (80%) × App Users (50%)', valueText: '22.4M Users', highlight: true }
                  ]
                }
              ]
            },
            { label: 'Other ages 26–40 (can add 10–15M)', valueText: 'Bonus segment', muted: true }
          ]
        },
        { label: 'Female (50%)', valueText: 'Negligible in base model (~10–15% real)', muted: true }
      ]
    },
    finalAnswer: '~22.4 Million core young users (or ~5–8 Crore total paying/active fantasy users including 26–40 yrs)',
    acceptableRange: { min: 15, max: 100, unit: 'Million users', display: '15M – 100M users' },
    sanityCheck: 'Dream11 + My11Circle report ~15–20 Cr registered accounts, of which ~3–5 Cr are active paid users during IPL season. Adding the 26–35 age bracket easily brings 22.4M into the 40–50M realistic active range!',
    interviewerTrap: 'Completely zeroing out ages 26–40 makes the estimate conservative—in an interview, include 18–35 (or keep 26–40 at a lower 20% adoption rate) to stay truly MECE!',
    variations: [
      { question: 'Estimate Dream11’s revenue during the 2-month IPL season.', hint: 'Active users × ~₹500 entry/month × 15% platform rake × 2 months.' },
      { question: 'How many active UPI users are there in India?', hint: 'Use similar Urban/Rural + Smartphone + Bank Account funnel (~350–500M).' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Pop → Gender/Age Skew → Smartphone & Internet/UPI → Sports Interest → App Adoption', correct: true, feedback: 'Perfect! Every digital monetization app needs Tech Access + Behavioral Interest + Conversion.' },
        { label: 'Number of IPL Matches × Stadium Seats', correct: false, feedback: 'Fantasy sports is a nationwide digital product, not capped by stadium seating!' },
        { label: 'Total Cricket Bats Sold × 10', correct: false, feedback: 'Playing cricket physically and playing fantasy apps have weak correlation.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'India Population (M)', defaultVal: 1400, min: 1300, max: 1500, step: 50, unit: 'M' },
        { key: 'agePct', label: 'Target Age (18–35) %', defaultVal: 25, min: 15, max: 35, step: 5, unit: '%' },
        { key: 'techPct', label: 'Smartphone + UPI %', defaultVal: 45, min: 25, max: 70, step: 5, unit: '%' },
        { key: 'sportsPct', label: 'Sports Interest %', defaultVal: 70, min: 40, max: 90, step: 5, unit: '%' },
        { key: 'adoptPct', label: 'Fantasy Adoption %', defaultVal: 40, min: 15, max: 70, step: 5, unit: '%' }
      ],
      computeFormulaText: 'Pop × Target Age% × (Smartphone & UPI)% × Sports% × Adoption%',
      compute: (v) => {
        const users = v.popM * (v.agePct / 100) * (v.techPct / 100) * (v.sportsPct / 100) * (v.adoptPct / 100);
        return {
          value: users,
          formatted: `${users.toFixed(1)} Million Users`,
          breakdown: [
            { label: 'Digital Target Pool', val: `${(v.popM * v.agePct/100 * v.techPct/100).toFixed(1)} M` },
            { label: 'Est. Annual Rev (@ ₹1,000 ARPU)', val: `₹${Math.round(users * 100).toLocaleString('en-IN')} Cr` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-swiggy-delhi',
    title: 'Number of Orders Placed on Swiggy in Delhi in a Day',
    prompt: 'Estimate the number of food delivery orders placed on Swiggy in Delhi in a day.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 21 (Book p. 17) & Vol 2 p. 31',
    company: 'Bain (BCN)',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['FoodTech', 'Swiggy', 'Delhi', 'App Funnel'],
    clarifyingQuestions: [
      { q: 'Are we estimating food delivery only, or Instamart quick-commerce orders too?', a: 'Core restaurant food delivery orders only.', why: 'Instamart has a completely different frequency and basket.' },
      { q: 'Should we estimate for Delhi NCR (~35–40M) or NCT (~20M)?', a: 'Delhi NCR region (~30–40M).', why: 'Sets your top-line population anchor.' }
    ],
    strategyOverview: 'Apply a clean Demand-Side Digital Funnel on Delhi NCR: Filter to Urban population → exclude BPL/Low income → apply Smartphone + Internet penetration → apply Online Food Delivery adoption → take Swiggy’s market share (~40% vs Zomato ~55%) → multiply by order frequency (note: Vol 1 assumed 1–2 orders/day, whereas Vol 2 fixed that to a much more realistic 1–2 orders/WEEK ÷ 7!).',
    formula: 'Daily Swiggy Orders = ∑ (Segment Users × Swiggy Share × Orders per Week ÷ 7)',
    assumptions: [
      { label: 'Delhi NCR Population = 40M; Urban = 90% (36M) [or Vol 1: 40% Urban]', rationale: 'Swiggy operates heavily in urbanized Delhi NCR zones (use 80–90% urban for Delhi!).' },
      { label: 'Target Income: Middle (60% = 21.6M) & High (20% = 7.2M); Low excluded', rationale: 'Delivery fees + restaurant markups make daily use unaffordable for low-income.' },
      { label: 'Internet (85% Mid / 95% High) × Food App Adoption (50% Mid / 70% High) × Swiggy Share (40%)', rationale: 'Swiggy & Zomato hold a near-duopoly in NCR (~40% Swiggy).' },
      { label: 'Frequency: Middle = 1 order/week, High = 2 orders/week (divide weekly total by 7)', rationale: 'Vol 2 corrected Vol 1’s typo of 1–2 orders/day (which gave 2.48M/day—almost higher than all of India!).' }
    ],
    tree: {
      label: 'Delhi NCR (40M) → Urban (90% = 36M)',
      valueText: '36M Urban',
      children: [
        {
          label: 'Middle Income (60% = 21.6M)',
          valueText: '3.67M Swiggy users',
          children: [
            { label: 'Net (85%) × App (50%) × Swiggy (40%) × 1/wk', valueText: '3.67M orders/wk' }
          ]
        },
        {
          label: 'High Income (20% = 7.2M)',
          valueText: '1.91M Swiggy users',
          children: [
            { label: 'Net (95%) × App (70%) × Swiggy (40%) × 2/wk', valueText: '3.83M orders/wk' }
          ]
        },
        {
          label: 'Daily Orders = 7.5M/wk ÷ 7',
          valueText: '~1.07 Million Orders/Day',
          highlight: true
        }
      ]
    },
    finalAnswer: '~5 Lakh – 10.7 Lakh orders/day (Vol 2 refined ~10.7L/day; note Vol 1 gave 24.8L/day)',
    acceptableRange: { min: 300000, max: 1500000, unit: 'Orders/day', display: '3 Lakh – 15 Lakh orders/day' },
    sanityCheck: 'All-India Swiggy handles roughly 2–2.5 Million food orders per day. Delhi NCR typically drives ~15–20% of India’s food delivery volume (~3.5–5 Lakh orders/day)! If your answer hits 2.5M in Delhi alone, check if you forgot to divide by households (group orders!) or confused weekly with daily frequency.',
    interviewerTrap: 'Massive trap in Vol 1: Assuming every individual middle-class user orders 1–2 times PER DAY instead of PER WEEK, AND forgetting that a family of 4 shares ONE order rather than ordering 4 separate Swiggy deliveries!',
    variations: [
      { question: 'How many Swiggy delivery riders are needed in Delhi?', hint: 'Take 5 Lakh orders/day → 60% in 4 peak lunch/dinner hours (75K orders/hr) ÷ 2.5 orders/hr per rider = ~30,000 active riders!' },
      { question: 'Estimate Swiggy’s annual revenue from Delhi.', hint: 'Daily orders × ₹450 AOV × ~22% commission + delivery fees × 365.' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Urban Pop → Income Split → Internet & App Adoption → Swiggy Market Share → Weekly Orders ÷ 7', correct: true, feedback: 'Spot on! And bonus points if you mention household/group ordering!' },
        { label: 'Total Restaurants in Delhi × 100', correct: false, feedback: 'Restaurants vary wildly from street carts to 5-star hotels; consumer demand funnel is far cleaner.' },
        { label: 'Swiggy Riders × 50', correct: false, feedback: 'You wouldn’t know the rider count without estimating order demand first.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'Delhi NCR Pop (M)', defaultVal: 35, min: 20, max: 45, step: 5, unit: 'M' },
        { key: 'hhSize', label: 'Avg Ordering Unit Size', defaultVal: 2.5, min: 1, max: 4, step: 0.5, unit: 'ppl' },
        { key: 'adoptPct', label: 'Affluent & App User %', defaultVal: 35, min: 15, max: 60, step: 5, unit: '%' },
        { key: 'swiggyShare', label: 'Swiggy Market Share %', defaultVal: 45, min: 30, max: 60, step: 5, unit: '%' },
        { key: 'ordersPerWk', label: 'Avg Orders / Week', defaultVal: 1.0, min: 0.25, max: 3.0, step: 0.25, unit: '/wk' }
      ],
      computeFormulaText: '(Pop ÷ Ordering Unit) × User% × Swiggy Share% × Orders/Wk ÷ 7',
      compute: (v) => {
        const users = (v.popM * 1e6 / v.hhSize) * (v.adoptPct / 100);
        const daily = (users * (v.swiggyShare / 100) * v.ordersPerWk) / 7;
        return {
          value: daily,
          formatted: `${(daily / 1e5).toFixed(2)} Lakh Orders/Day`,
          breakdown: [
            { label: 'Ordering Units (Target)', val: `${(users / 1e6).toFixed(2)} M` },
            { label: 'Daily Orders (Exact)', val: `${Math.round(daily).toLocaleString('en-IN')}` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-toll-plaza',
    title: 'Daily Revenue of a Delhi–Gurgaon Toll Plaza',
    prompt: 'Estimate the total revenue collected by a Delhi–Gurgaon toll plaza in a day.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 22 (Book p. 18) & Vol 2 p. 30',
    company: 'Bain (BCN)',
    difficulty: 3,
    archetype: 'Supply & Capacity',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-bottleneck',
    tags: ['Highway', 'Toll Plaza', 'Time Segmentation', 'Mix Pricing'],
    clarifyingQuestions: [
      { q: 'Are we counting both directions (Delhi→Gurgaon AND Gurgaon→Delhi)?', a: 'Yes, both directions combined.', why: 'Doubles the number of active toll lanes/booths!' },
      { q: 'Does FASTag apply, and are 2-wheelers exempted or charged?', a: 'Assume 2W/4W/Heavy commercial all pay respective tariffs (or clarify 2W exemption in expressways!).', why: 'On many expressways, 2-wheelers pay ₹0 or aren’t allowed—always ask!' }
    ],
    strategyOverview: 'Classic Infrastructure Bottleneck model. Calculate total booths across both directions (15 each side = 30 booths). Split 24 hours into Low (10 hrs), Medium (6 hrs), and High (8 hrs) traffic windows. Compute throughput per booth per hour (e.g., 1 vehicle every 5 min / 1 min / 10 sec), sum total vehicles, and multiply by vehicle mix (10% 2W @ ₹50, 60% 4W @ ₹100, 30% Heavy @ ₹300).',
    formula: 'Daily Revenue = ∑ [Booths × Hours(slot) × Vehicles/Hr(slot)] × ∑ [Vehicle Mix % × Toll Fee]',
    assumptions: [
      { label: '30 Booths total (15 Delhi→Gurgaon + 15 Gurgaon→Delhi), operational 24 hrs', rationale: 'Major NCR expressway toll plazas (like Kherki Daula / Sirhaul) are massive 24–32 lane gateways.' },
      { label: 'Traffic Slots: High (8 hrs), Medium (6 hrs), Low (10 hrs)', rationale: 'Morning & evening office rush (8–12 AM, 5–9 PM) drives bulk of traffic.' },
      { label: 'Throughput (Vol 1 vs Vol 2): Vol 1 = 60/12/6 veh/hr (18,360 total) | Vol 2 FASTag = 360/60/12 veh/hr (1,00,800 total)', rationale: 'Cashless FASTag processes 1 car every ~10 seconds during rush hour!' },
      { label: 'Vehicle Mix & Tariff: 10% 2W (₹50) | 60% 4W (₹100) | 30% Heavy (₹300)', rationale: 'Weighted average toll = 0.1(50) + 0.6(100) + 0.3(300) = ₹155/vehicle.' }
    ],
    tree: {
      label: '30 Toll Booths (24 Hours)',
      valueText: '30 booths',
      children: [
        { label: 'Low Freq (10 hrs × 6 veh/hr × 30) [FASTag: 12/hr → 3,600]', valueText: '1,800 veh (Vol 1)' },
        { label: 'Medium Freq (6 hrs × 12 veh/hr × 30) [FASTag: 60/hr → 10,800]', valueText: '2,160 veh (Vol 1)' },
        {
          label: 'High Freq (8 hrs × 60 veh/hr × 30) [FASTag: 360/hr → 86,400]',
          valueText: '14,400 veh (Vol 1)',
          highlight: true,
          children: [
            { label: 'Weighted Mix (₹155 avg toll) × 18,360 (Vol 1) / 1,00,800 (Vol 2)', valueText: '₹28.5L (Vol 1) | ₹1.56 Cr (Vol 2)', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '₹28.46 Lakh/day (Vol 1 conservative) to ₹1.56 Crore/day (Vol 2 FASTag peak)',
    acceptableRange: { min: 25, max: 180, unit: '₹ Lakh/day', display: '₹25 Lakh – ₹1.8 Crore/day' },
    sanityCheck: 'Kherki Daula & DND/Gurgaon toll corridors historically processed ~60,000–1,00,000+ vehicles/day. At ~₹100–150 avg toll, ₹60L–₹1.2 Cr/day is dead-on realistic!',
    interviewerTrap: 'Not all 30 booths run at 100% capacity simultaneously during low-traffic night hours (many lanes are closed at 2 AM!). Mentioning active lane utilization adds extra polish.',
    variations: [
      { question: 'How much money is collected during 1 rush hour on Delhi–Mumbai Expressway?', hint: '8 lanes × 450 cars/hr (8 sec/car) × ₹50–100 = ₹1.8–3.6 Lakh/hr.' },
      { question: 'Estimate annual revenue loss if toll collection stops for 10 days.', hint: 'Multiply daily revenue × 10.' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Booths × (High/Med/Low Traffic Hours × Veh/Hr/Booth) × Weighted Vehicle Toll', correct: true, feedback: 'Spot on! Peak vs off-peak throughput per lane is the core driver.' },
        { label: 'Population of Gurgaon ÷ 4 × ₹100', correct: false, feedback: 'Highway traffic includes commercial trucks, airport commuters, and interstate travelers—supply booth throughput is much better.' },
        { label: 'Length of Highway in km × ₹1,000', correct: false, feedback: 'Toll revenue depends on vehicle flow rate past the plaza, not total road length.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'booths', label: 'Total Booths (Both Sides)', defaultVal: 24, min: 8, max: 36, step: 2, unit: 'booths' },
        { key: 'peakHrs', label: 'Peak Hours / Day', defaultVal: 8, min: 4, max: 12, step: 1, unit: 'hrs' },
        { key: 'peakRate', label: 'Peak Veh/Hr/Booth', defaultVal: 240, min: 60, max: 450, step: 30, unit: 'veh/hr' },
        { key: 'offRate', label: 'Avg Non-Peak Veh/Hr/Booth', defaultVal: 40, min: 10, max: 100, step: 10, unit: 'veh/hr' },
        { key: 'avgToll', label: 'Weighted Avg Toll (₹)', defaultVal: 140, min: 50, max: 250, step: 10, unit: '₹' }
      ],
      computeFormulaText: 'Booths × [(Peak Hrs × Peak Rate) + ((24 - Peak Hrs) × Off-Peak Rate)] × Avg Toll',
      compute: (v) => {
        const veh = v.booths * (v.peakHrs * v.peakRate + (24 - v.peakHrs) * v.offRate);
        const revLakh = (veh * v.avgToll) / 1e5;
        return {
          value: revLakh,
          formatted: `₹${revLakh.toFixed(1)} Lakh/Day`,
          breakdown: [
            { label: 'Total Vehicles / Day', val: `${Math.round(veh).toLocaleString('en-IN')}` },
            { label: 'Monthly Revenue', val: `₹${(revLakh * 30 / 100).toFixed(2)} Crore` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-credit-cards-india',
    title: 'Number of Credit Cards in India',
    prompt: 'Estimate the total number of credit cards currently issued/in circulation in India.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 23–24 (Book p. 19–20) & Vol 2 p. 32',
    company: 'Bain (BCN)',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Fintech', 'Banking', 'India', 'Multi-Card Ownership'],
    clarifyingQuestions: [
      { q: 'Are we counting credit cards ONLY, or debit + credit cards?', a: 'Credit cards only (all issued/active cards, including multiple cards per user).', why: 'Debit cards have near-universal Jan Dhan penetration (~95 Cr), whereas credit cards are niche (~10 Cr!).' },
      { q: 'Personal retail cards only, or corporate cards too?', a: 'Personal credit cards held by Indian consumers.', why: 'Keeps segmentation clean.' }
    ],
    strategyOverview: 'Demand Funnel starting from 1.4B population: Segment by Income (High 10%, Middle 60%, Low 30%) → filter by Earning/Adult Population → Willingness for Formal Credit → Bank Approval / Application Rate → Multiply by Average Cards Held per User (affluent users often hold 2–3 cards!).',
    formula: 'Total Credit Cards = ∑ (Income Pop × Earning % × Credit Willingness % × Approval % × Cards per User)',
    assumptions: [
      { label: 'Income Split: High 10% (140M), Middle 60% (840M), Low 30% (420M)', rationale: 'Note: In an interview, also filter out 0–18 age (~30%) FIRST so you don’t assign credit cards to children!' },
      { label: 'Willingness & Formal Eligibility: High (50% willing × 70% approved), Mid (30% × 40%), Low (10% × 20%)', rationale: 'Low-income relies mostly on informal credit/UPI rather than formal bank credit cards.' },
      { label: 'Cards per Cardholder: High = 2 cards, Middle = 1 card, Low = 1 card', rationale: 'High-income travelers hold multiple reward/co-branded cards.' }
    ],
    tree: {
      label: 'India Population (1.4B)',
      valueText: '1,400M',
      children: [
        { label: 'High Income (140M) → Earn (100%) → Willing (50%) → Apply (70%) × 2 cards', valueText: '100M cards', highlight: true },
        { label: 'Middle Income (840M) → Earn (50%) → Willing (30%) → Apply (40%) × 1 card', valueText: '50M cards (Vol 2: 100M)' },
        { label: 'Low Income (420M) → Willing (10%) → Apply (20%) × 1 card', valueText: '10M cards' },
        { label: 'Total Credit Cards', valueText: '160M (Vol 1) | 210M (Vol 2)', highlight: true }
      ]
    },
    finalAnswer: '~100M – 160M Cards (Note: RBI actuals are ~10.5 Crore = 105M credit cards across ~60–70M unique users)',
    acceptableRange: { min: 70, max: 220, unit: 'Million cards', display: '70M – 220M credit cards' },
    sanityCheck: 'Cheat sheet benchmark says Credit Card penetration in India is ~5–7% of population (~70–100M unique people). At ~1.5 cards per person, 100M–150M cards aligns closely with RBI published numbers (~10.5 Cr cards)!',
    interviewerTrap: 'Two classic mistakes: (1) Confusing debit cards (~950M) with credit cards (~105M); (2) Using 100% of High/Low income as "Earning" without filtering out ages 0–21 (students/children aren’t eligible for primary credit cards!).',
    variations: [
      { question: 'Estimate annual credit card transaction value in India.', hint: '10 Cr cards × ₹15,000 avg monthly spend × 12 = ~₹18 Lakh Crore/yr.' },
      { question: 'How many UPI-linked RuPay credit cards exist?', hint: 'Take ~10–15% share of total credit cards.' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Population → Adult/Earning Filter → Income Brackets → Bank Eligibility/Willingness → Cards per User', correct: true, feedback: 'Spot on! Always include Eligibility/KYC + Cards-per-user multiplier.' },
        { label: 'Number of ATMs × 1,000', correct: false, feedback: 'ATMs serve debit cards and cash withdrawals, not credit card issuance.' },
        { label: 'India Population × 50%', correct: false, feedback: 'Credit card penetration in India is single-digit (~5–7%), not 50%!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'India Population (M)', defaultVal: 1400, min: 1300, max: 1500, step: 50, unit: 'M' },
        { key: 'adultPct', label: 'Eligible Age (21+) %', defaultVal: 60, min: 50, max: 70, step: 5, unit: '%' },
        { key: 'penPct', label: 'Eligible Credit Card Pen %', defaultVal: 10, min: 3, max: 25, step: 1, unit: '%' },
        { key: 'cardsPerUser', label: 'Avg Cards / Holder', defaultVal: 1.5, min: 1.0, max: 2.5, step: 0.1, unit: 'cards' }
      ],
      computeFormulaText: 'Pop × Adult (21+)% × Card Penetration% × Avg Cards/Holder',
      compute: (v) => {
        const holders = v.popM * (v.adultPct / 100) * (v.penPct / 100);
        const cards = holders * v.cardsPerUser;
        return {
          value: cards,
          formatted: `${cards.toFixed(1)} Million Cards`,
          breakdown: [
            { label: 'Unique Cardholders', val: `${holders.toFixed(1)} Million` },
            { label: '% of Total India Pop', val: `${((holders / v.popM) * 100).toFixed(1)}%` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-paint-car',
    title: 'Amount of Paint Required to Paint Your Car',
    prompt: 'Estimate the amount of paint required to paint a standard car.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 25 (Book p. 21)',
    company: 'Bain (BCN)',
    difficulty: 2,
    archetype: 'Volume & Geometry',
    approachType: 'Geometry & Proxy',
    templateId: 'tpl-geometry',
    tags: ['Geometry', 'Surface Area', 'Proxy', 'Unit Conversion'],
    clarifyingQuestions: [
      { q: 'What type of car (Hatchback, Sedan, or SUV)?', a: 'Standard hatchback (like Maruti Swift / Hyundai i20).', why: 'Sets car dimensions (~3.8–4m long).' },
      { q: 'Exterior body paint only, and how many coats (primer + base + clear)?', a: 'Exterior painted metal surface; clarify coats (~2–3 coats or use door-paint proxy).', why: 'Car windows/windshield/underbody aren’t painted.' }
    ],
    strategyOverview: 'Approximate the car’s shape using 2 stacked cuboids (Lower body + Upper cabin), compute total exterior surface area (remembering NOT to paint the underside or cabin-to-body shared seam!), subtract glass window/windshield areas, and apply paint coverage per square meter (using a house door as an intuitive proxy!).',
    formula: 'Paint Needed = (Body Surface Area - Windows/Unpainted Area) × Coats ÷ Coverage (m²/Liter)',
    assumptions: [
      { label: 'Lower Cuboid ≈ 4m (L) × 1.7m (W) × 0.8m (H) | Upper Cabin ≈ 1.8m × 1.5m × 0.7m', rationale: 'Note: Vol 1 PDF had a slight formula typo using 2×(L+B+H) instead of 2×(LB+BH+LH)! Always compute true surface area (m²) cleanly!' },
      { label: 'Window/Glass area to subtract ≈ 2.5–3 m² (front + rear windshield + 4 side windows)', rationale: 'Glass is never painted.' },
      { label: 'Coverage Proxy: Standard 2 m² door takes ~0.5–1 L per coat (so ~4–5 m²/L with 2–3 coats)', rationale: 'In real automotive painting, ~3–5 Liters of paint covers a whole car across coats (note Vol 1 book arrived at ~20 gallons due to unit/proxy exaggeration—flagging realistic ~4–6L in an interview is huge!).' }
    ],
    tree: {
      label: 'Hatchback Exterior Surface Area',
      valueText: '~12–15 m² net metal',
      children: [
        { label: 'Lower Body (~3.8m × 1.7m × 0.8m, no bottom)', valueText: '~15.3 m²' },
        { label: 'Upper Cabin (~1.8m × 1.5m × 0.7m, minus bottom) - Windows (~3 m²)', valueText: '~4.3 m² - 3 m² ≈ 1.3 m²' },
        { label: 'Net Paintable Area (~15–16 m²) × 2–3 coats ÷ ~8–10 m²/L', valueText: '~4 – 6 Liters (Book: 20 gal proxy)', highlight: true }
      ]
    },
    finalAnswer: '~4 to 6 Liters (approx. 1.5 gallons) realistically; [Book proxy answer: 20 gallons]',
    acceptableRange: { min: 3, max: 25, unit: 'Liters', display: '3 – 20 Liters (1 – 5 Gallons)' },
    sanityCheck: 'A standard 1-Liter wall paint tin covers ~10–12 m² for 1 coat. A car’s metal surface is ~15 m²; with 3 coats (primer + base + clear) and spray overspray loss (~30%), you need ~5–6 Liters (~1.5 gallons). Catching Vol 1’s "2×(L+B+H)" perimeter vs surface area typo makes you look sharp!',
    interviewerTrap: 'Using perimeter 2(L+B+H) instead of area 2(LB+BH+LH), forgetting to subtract windows/underside, and confusing wall-paint bucket thickness with automotive spray.',
    variations: [
      { question: 'How much paint is needed to paint a standard bedroom?', hint: '4 walls (2×(L+B)×H) + ceiling (L×B) minus door & window areas ÷ 10 m²/L × 2 coats.' },
      { question: 'Estimate the volume of a hatchback car.', hint: 'Use the same 2-cuboid model: ~3.8 × 1.7 × 1.4m ≈ 7–9 m³!' }
    ],
    guidedPractice: {
      correctApproach: 'Geometry & Proxy',
      funnelOptions: [
        { label: 'Approximate car as 2 cuboids → Calculate Exterior Surface Area → Subtract Glass → Multiply Coats ÷ Paint Coverage', correct: true, feedback: 'Clean geometric breakdown! Never forget to subtract windows and underside.' },
        { label: 'Weight of Car ÷ Density of Paint', correct: false, feedback: 'Paint goes onto surface area, not the solid internal volume/weight of the steel!' },
        { label: 'Number of Doors × 5 Liters', correct: false, feedback: 'Doors are only part of the car—roof, hood, trunk, and bumpers matter too.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'length', label: 'Car Length (m)', defaultVal: 3.9, min: 3.5, max: 5.0, step: 0.1, unit: 'm' },
        { key: 'width', label: 'Car Width (m)', defaultVal: 1.7, min: 1.5, max: 2.0, step: 0.1, unit: 'm' },
        { key: 'height', label: 'Body Height (m)', defaultVal: 1.4, min: 1.2, max: 1.8, step: 0.1, unit: 'm' },
        { key: 'coats', label: 'Number of Coats', defaultVal: 3, min: 1, max: 4, step: 1, unit: 'coats' },
        { key: 'coverage', label: 'Coverage (m² / Liter)', defaultVal: 10, min: 5, max: 15, step: 1, unit: 'm²/L' }
      ],
      computeFormulaText: '(Top + Sides - Glass ~3m²) × Coats ÷ Coverage',
      compute: (v) => {
        const netArea = Math.max(5, (v.length * v.width) + 2 * (v.length * v.height * 0.65) + 2 * (v.width * v.height * 0.65) - 3.0);
        const liters = (netArea * v.coats) / v.coverage;
        return {
          value: liters,
          formatted: `${liters.toFixed(1)} Liters`,
          breakdown: [
            { label: 'Net Paintable Area', val: `${netArea.toFixed(1)} m²` },
            { label: 'In US Gallons', val: `${(liters / 3.8).toFixed(2)} gal` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-bollywood-movies',
    title: 'Number of Bollywood Movies Released in India in a Year',
    prompt: 'Estimate the number of Bollywood (Hindi feature) movies released in India in a year.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 26 (Book p. 22)',
    company: 'Bain (BCN)',
    difficulty: 2,
    archetype: 'Supply & Capacity',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-bottleneck',
    tags: ['Media & Entertainment', 'Bollywood', 'Supply-Side', 'Weekly Cadence'],
    clarifyingQuestions: [
      { q: 'Are we counting only Hindi Bollywood films or all Indian languages (Tollywood, Kollywood, etc.)?', a: 'Hindi Bollywood theatrical + major OTT releases.', why: 'India makes ~1,800 films total across all languages, of which Bollywood Hindi is ~250–350!' },
      { q: 'Include small/independent/OTT-direct films or theatrical releases only?', a: 'All feature films released across High, Medium, and Low budget tiers.', why: 'Low-budget indie/OTT releases make up the largest count.' }
    ],
    strategyOverview: 'Use a Calendar Supply-Side Cadence approach! Movies in India traditionally release every Friday (~48–50 regular Fridays/year after excluding 2–4 major holiday weekends). Segment movies into High, Medium, and Low budgets, estimate average releases per Friday for each tier, and add special National Holiday releases (Republic Day, Independence Day, Diwali, Eid).',
    formula: 'Total Movies = [Fridays × (High + Medium + Low Budget per Friday)] + Holiday Specials',
    assumptions: [
      { label: '48 regular Fridays + ~4 special holiday slots (Republic Day, Eid, Aug 15, Diwali/Christmas)', rationale: '52 weeks in a year; big tentpoles lock holiday weekends.' },
      { label: 'High Budget: 1 movie/Friday (48) | Medium Budget: 2/Friday (96) | Low/Indie Budget: 4/Friday (192)', rationale: 'Studios space out big-budget clashes while low-budget/regional-dubbed Hindi films release frequently.' },
      { label: '4 extra holiday-specific releases', rationale: 'Mid-week or festive Wednesday/Thursday big releases.' }
    ],
    tree: {
      label: 'Bollywood Annual Releases',
      valueText: '340 Movies/Year',
      children: [
        { label: 'High Budget (1/Friday × 48)', valueText: '48 movies' },
        { label: 'Medium Budget (2/Friday × 48)', valueText: '96 movies' },
        { label: 'Low / Indie Budget (4/Friday × 48)', valueText: '192 movies', highlight: true },
        { label: 'National Holiday Releases', valueText: '4 movies' }
      ]
    },
    finalAnswer: '~250 – 340 Bollywood Movies per year',
    acceptableRange: { min: 180, max: 450, unit: 'Movies/year', display: '180 – 450 Bollywood movies/year' },
    sanityCheck: 'India’s film certification board (CBFC) certifies ~1,800–2,000 films annually across ~20 languages; Hindi accounts for ~15–20% = ~300–350 films! Spot on.',
    interviewerTrap: 'Using single-screen cinema capacity or consumer ticket demand works poorly here; releasing cadence (Fridays × Budget Tiers) is far faster and cleaner! Also don’t mix up Bollywood (Hindi ~300) with all Indian cinema (~1,800).',
    variations: [
      { question: 'Estimate the annual box office revenue of Bollywood.', hint: 'Segment the 340 movies by hit/avg/flop: e.g., 10 blockbusters × ₹300 Cr + 40 hits × ₹75 Cr + 290 small × ₹5 Cr ≈ ₹7,500 Cr.' },
      { question: 'How many total screens exist in India?', hint: 'Population ÷ catchment per theater (~1.5 lakh people/screen) ≈ 9,000–10,000 screens.' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Release Fridays (~48–50) × Movies/Friday by Budget Tier + Holiday Releases', correct: true, feedback: 'Brilliant! Movies are released on a weekly Friday cadence, making calendar-supply effortless.' },
        { label: 'India Population × Movie Tickets Bought ÷ 12', correct: false, feedback: 'Ticket demand tells you revenue or footfall, not how many distinct movie titles were produced!' },
        { label: 'Number of Actors in Mumbai ÷ 5', correct: false, feedback: 'Way too noisy—use Friday release slots instead.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'fridays', label: 'Release Fridays / Year', defaultVal: 48, min: 45, max: 52, step: 1, unit: 'wks' },
        { key: 'highPerWk', label: 'High-Budget / Friday', defaultVal: 1, min: 0.5, max: 2, step: 0.5, unit: 'films' },
        { key: 'medPerWk', label: 'Medium-Budget / Friday', defaultVal: 2, min: 1, max: 4, step: 0.5, unit: 'films' },
        { key: 'lowPerWk', label: 'Low/Indie / Friday', defaultVal: 4, min: 1, max: 6, step: 0.5, unit: 'films' },
        { key: 'holidays', label: 'Special Holiday Films', defaultVal: 4, min: 0, max: 12, step: 2, unit: 'films' }
      ],
      computeFormulaText: 'Fridays × (High + Med + Low) + Holiday Specials',
      compute: (v) => {
        const total = Math.round(v.fridays * (v.highPerWk + v.medPerWk + v.lowPerWk) + v.holidays);
        return {
          value: total,
          formatted: `${total} Movies/Year`,
          breakdown: [
            { label: 'Big/Medium Releases', val: `${Math.round(v.fridays * (v.highPerWk + v.medPerWk))}` },
            { label: 'Low/Indie Releases', val: `${Math.round(v.fridays * v.lowPerWk)}` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-tyre-industry',
    title: 'Market Size of the 4-Wheeler Tyre Industry in India',
    prompt: 'Estimate the annual market size (revenue) of the tyre industry in India.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 27 (Book p. 23)',
    company: 'Bain (BCN)',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Replacement & Stock-Flow',
    templateId: 'tpl-durable',
    tags: ['Automotive', 'Durable Replacement', 'Tyres', 'OEM vs Aftermarket'],
    clarifyingQuestions: [
      { q: 'Are we looking at passenger 4-wheelers only, or also 2-wheelers, trucks & commercial vehicles?', a: 'Personal residential 4-wheelers first (clarify commercial/2W if interviewer asks).', why: 'Heavy trucks replace 6–12 tyres far more frequently than private cars!' },
      { q: 'Both OEM (new cars) and Replacement aftermarket tyres?', a: 'Replacement demand + OEM demand (or clarify scope).', why: 'Remember cars have 5 tyres (4 running + 1 spare) and tyres get replaced every ~4–5 years!' }
    ],
    strategyOverview: 'Durable Stock + Replacement model! Start with 1.4B population → Urban (30%, family size 4) vs Rural (70%, family size 5) → Households affording 4-wheelers → Cars per household → Total Cars × 5 tyres/car = Total Installed Tyres (~10–25 Crore tyres). Divide by Tyre Lifespan (~4–5 yrs) OR price directly for replacement/annual demand.',
    formula: 'Annual Revenue = [(Total 4-Wheelers × 5 Tyres ÷ Lifespan) + (New Cars Sold × 5)] × Avg Tyre Price',
    assumptions: [
      { label: 'India Pop = 1.4B; Urban 30% (420M / 4 = 105M HH) & Rural 70% (980M / 5 = 196M HH)', rationale: 'Note: In Vol 1 PDF, a scaling error divided 420M by 1000 giving "0.426" households but still scaled cars to 4.26M + 16.44M = ~20.7M total cars—which actually matches India’s ~3–5 Cr personal cars fairly well!' },
      { label: 'Cars in India ≈ 3.5–4.5 Crore (Cheat sheet: 34 cars per 1,000 people ≈ 4.76 Cr cars)', rationale: 'Using cheat sheet anchor: 34/1000 × 1.4B = ~4.8 Crore 4-wheelers!' },
      { label: '5 Tyres per Car (4 active + 1 spare), Lifespan ~4–5 years, Avg Price = ₹4,000–5,000/tyre', rationale: 'Notice Vol 1 PDF forgot to divide total stock (103.5M tyres) by lifespan (4–5 yrs)—dividing by 4 gives ~25–30M replacement tyres + ~20M OEM tyres for ~4M new cars/yr = ~45–50M car tyres/yr!' }
    ],
    tree: {
      label: 'India Population (1.4B)',
      valueText: '1.4B (~30–35 Cr HH)',
      children: [
        { label: 'Total 4-Wheelers Stock (Rural 4.3M + Urban 16.4M — or ~4.8 Cr via benchmark)', valueText: '20.7M – 48M Cars' },
        {
          label: 'Total Tyres on Road (× 5 tyres/car)',
          valueText: '103.5M tyres (Book)',
          children: [
            { label: 'Without Lifespan Division (Book Total Stock × ₹4,000)', valueText: '₹41,391 Cr (₹414B)' },
            { label: 'True Annual (÷ 4 yr life + ~4M OEM cars × 5) × ₹4,500', valueText: '~₹20,000 – ₹45,000 Cr', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~₹20,000 – ₹45,000 Crore/yr (4W personal); ~₹90,000+ Cr including 2W & Commercial Trucks',
    acceptableRange: { min: 15000, max: 100000, unit: '₹ Crore/year', display: '₹15,000 Cr – ₹1,00,000 Cr/yr' },
    sanityCheck: 'India sells ~4M new cars/year (20M OEM tyres) + ~35–40M replacement tyres = ~55–60M passenger car tyres/yr × ₹4,500 ≈ ₹25,000–27,000 Cr! Including 2-wheelers and heavy trucks triples it to ~₹85,000–95,000 Cr—right in line with the real ₹90,000 Cr Indian tyre market!',
    interviewerTrap: 'Huge trap in Vol 1 PDF: Multiplying TOTAL stock of tyres on existing cars by ₹4,000 gives STOCK VALUE, not ANNUAL market revenue! You MUST divide installed tyre stock by lifespan (~4 years) and add OEM new car tyres!',
    variations: [
      { question: 'Estimate the market size for commercial truck tyres in India.', hint: 'Trucks have 10–18 tyres and run 80,000 km/yr, replacing tyres every 1–1.5 years!' },
      { question: 'How many used tyres are currently in Delhi?', hint: 'See Vol 2 Problem: Delhi 3.5 Cr → Cars (~3M) × 5 tyres = ~1.5 Cr used tyres!' }
    ],
    guidedPractice: {
      correctApproach: 'Stock & Replacement',
      funnelOptions: [
        { label: 'Households → Car Ownership → × 5 Tyres ÷ Tyre Lifespan + (New Annual Cars × 5) × Price', correct: true, feedback: 'Textbook! Separating Replacement Demand from OEM New-Car Demand is what interviewers love.' },
        { label: 'Total Road Length ÷ Tyre Circumference', correct: false, feedback: 'Road length doesn’t measure vehicle count or tyre wear.' },
        { label: 'Total Cars × 4 × ₹4,000 (without lifespan)', correct: false, feedback: 'Careful! Every car owner doesn’t buy 4 brand-new tyres every single year!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'carsM', label: 'Total 4-Wheelers in India (M)', defaultVal: 45, min: 20, max: 60, step: 5, unit: 'M' },
        { key: 'tyresPerCar', label: 'Tyres per Car (incl. spare)', defaultVal: 5, min: 4, max: 5, step: 1, unit: 'tyres' },
        { key: 'lifespan', label: 'Avg Tyre Lifespan (yrs)', defaultVal: 4, min: 2, max: 6, step: 0.5, unit: 'yrs' },
        { key: 'newCarsM', label: 'New Cars Sold / Year (M)', defaultVal: 4, min: 2, max: 6, step: 0.5, unit: 'M' },
        { key: 'price', label: 'Avg Tyre Price (₹)', defaultVal: 4500, min: 3000, max: 7000, step: 500, unit: '₹' }
      ],
      computeFormulaText: '[(Cars × Tyres ÷ Lifespan) + (New Cars × Tyres)] × Price',
      compute: (v) => {
        const repTyres = (v.carsM * v.tyresPerCar) / v.lifespan;
        const oemTyres = v.newCarsM * v.tyresPerCar;
        const totalTyres = repTyres + oemTyres;
        const revCr = (totalTyres * 1e6 * v.price) / 1e7;
        return {
          value: revCr,
          formatted: `₹${Math.round(revCr).toLocaleString('en-IN')} Crore/Yr`,
          breakdown: [
            { label: 'Replacement + OEM Tyres', val: `${repTyres.toFixed(1)}M + ${oemTyres.toFixed(1)}M = ${totalTyres.toFixed(1)}M` },
            { label: 'In Billion ₹', val: `₹${(revCr / 100).toFixed(1)} Billion` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-education-loans',
    title: 'Number of Outstanding Education Loans in India',
    prompt: 'Estimate the number of active/outstanding education loans in India.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 29 (Book p. 25) & Vol 2 p. 34',
    company: 'BCG',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Banking', 'Education', 'BCG', 'Public vs Private'],
    clarifyingQuestions: [
      { q: 'Are we counting domestic higher-education loans only, or study-abroad loans too?', a: 'Domestic undergraduate/postgraduate students.', why: 'Abroad loans have huge ticket sizes (~₹40L) but smaller volume (~1–2L/yr).' },
      { q: 'What is the typical repayment tenure of an outstanding loan?', a: 'Active cohort + borrowers still repaying (~7–10 years total cycle).', why: 'Clarifies why 18–25 age cohort acts as a clean proxy.' }
    ],
    strategyOverview: 'Start with India’s 18–25 age cohort (20% of 1.4B = 280M) — or note that since loans stay outstanding ~7 years, the 7-year college-graduating cohort (280M) neatly proxies active outstanding loans! Segment out BPL (30%), split remaining into Lower Middle (35%), Upper Middle (25%), Elite (10%), apply Higher-Ed Enrollment %, Public vs Private Institution split, and Loan Uptake %.',
    formula: 'Loans = ∑ [Cohort × Income % × College Enrollment % × (Public%×Loan% + Private%×Loan%)]',
    assumptions: [
      { label: '18–25 Age Cohort = 20% of 1.4B = 280M (spans ~7–8 years, matching loan tenure)', rationale: 'Clever cohort proxy: each graduating year stays in repayment ~7 yrs.' },
      { label: 'Exclude BPL (30%). Lower Mid 35% (98M), Upper Mid 25% (70M), Elite 10% (28M)', rationale: 'Lower-middle relies heavily on subsidized public colleges or loans for private degrees.' },
      { label: 'Enrollment: Lower Mid 50% (49M), Upper Mid 90% (63M), Elite 100% (28M)', rationale: 'Total ~140M enrolled/graduating across cohort (or ~4–5 Cr currently in college).' },
      { label: 'Public/Private & Loan %: LM (80% Pub @ 50% loan + 20% Pvt @ 80%), UM (60% Pub @ 20% + 40% Pvt @ 40%), Elite (0% Pub loan + 60% Pvt @ 10%)', rationale: 'Private universities charge much higher tuition, driving higher loan rates.' }
    ],
    tree: {
      label: 'India 18–25 Cohort (280M)',
      valueText: '280M',
      children: [
        { label: 'Lower Middle (98M → 49M college): Pub 19.6M + Pvt 7.84M', valueText: '27.44M loans', highlight: true },
        { label: 'Upper Middle (70M → 63M college): Pub 7.56M + Pvt 10.08M', valueText: '17.64M loans' },
        { label: 'Elite (28M → 28M college): Pvt 10%', valueText: '1.68M loans' },
        { label: 'Total Outstanding Loans', valueText: '46.76 Million (Book)', highlight: true }
      ]
    },
    finalAnswer: '~4.7 Cr (46.8M) in Book model [Note: RBI formal bank edu loans are ~20–30 Lakh active accounts—clarify formal bank vs informal/NBFC/cohort!]',
    acceptableRange: { min: 2, max: 50, unit: 'Million loans', display: '2M (formal RBI banks) – 47M (broad cohort)' },
    sanityCheck: 'Wait—always do a 15-second sanity check! India has ~4.3 Crore total college students across all 3–4 years (~1.1 Cr/year). If 46.7M people had active formal education loans, nearly 100% of graduates across 7 years would have a bank loan! Real formal bank education loans in India are ~25–30 Lakh (~2.5–3M) because most Indian families pay tuition out of savings or take informal/gold loans. Highlighting "Only ~5–10% of private/collateral-eligible students actually qualify for formal bank loans" turns a good answer into a BCG-offer answer!',
    interviewerTrap: 'Overestimating formal bank loan penetration in India! Public colleges cost ₹10k–30k/year so very few take formal bank loans (50% in book is way too high; ~5% is realistic!).',
    variations: [
      { question: 'Estimate the total ₹ value of outstanding education loans in India.', hint: 'Multiply formal loans (~3M) × avg ₹8–10 Lakh = ~₹2.5–3 Lakh Crore.' },
      { question: 'How many Indian students take loans to study abroad each year?', hint: '~1.3M Indians abroad → ~400K new students/yr × ~40–50% taking loans ≈ 1.8 Lakh loans/yr.' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: '18–25 Cohort → Income Split → College Enrollment % → Public vs Private Tuition Need → Loan Uptake %', correct: true, feedback: 'Great structure! And adding a bank-eligibility filter (~10–20%) makes the final number super realistic.' },
        { label: 'Number of Banks × 1,000', correct: false, feedback: 'Branches don’t tell you education loan demand across income tiers.' },
        { label: 'Number of Schools × 50', correct: false, feedback: 'Education loans apply to higher education (college/postgrad), not K-12 schools.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'cohortM', label: 'Annual College Intake (M)', defaultVal: 12, min: 8, max: 16, step: 1, unit: 'M/yr' },
        { key: 'pvtShare', label: 'Private / High-Fee Share %', defaultVal: 40, min: 20, max: 70, step: 5, unit: '%' },
        { key: 'loanPct', label: '% Eligible & Taking Formal Loan', defaultVal: 10, min: 2, max: 40, step: 2, unit: '%' },
        { key: 'tenure', label: 'Avg Loan Tenure (Years)', defaultVal: 6, min: 3, max: 10, step: 1, unit: 'yrs' }
      ],
      computeFormulaText: 'Annual Intake × High-Fee Share% × Loan Uptake% × Avg Tenure',
      compute: (v) => {
        const annual = v.cohortM * (v.pvtShare / 100) * (v.loanPct / 100);
        const outstanding = annual * v.tenure;
        return {
          value: outstanding,
          formatted: `${outstanding.toFixed(2)} Million Loans`,
          breakdown: [
            { label: 'New Loans / Year', val: `${(annual * 10).toFixed(2)} Lakh` },
            { label: 'Total Active Accounts', val: `${(outstanding * 10).toFixed(1)} Lakh` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-dentist-revenue',
    title: 'Daily Revenue of a Dentist Clinic in Delhi',
    prompt: 'Estimate the average daily revenue of a dentist in Delhi.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 31 (Book p. 27)',
    company: 'Indus Insights',
    difficulty: 2,
    archetype: 'Revenue & Cost',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-outlet',
    tags: ['Healthcare', 'Single Clinic', 'Turnaround Time', 'Indus Insights'],
    clarifyingQuestions: [
      { q: 'Is this a solo practitioner with 1 dental chair, or a multi-chair chain like Clove Dental?', a: 'Solo independent dentist (1 chair) in Delhi.', why: 'Multiplies capacity cleanly by 1 chair.' },
      { q: 'Only consultations, or full procedures (root canals, scaling, braces)?', a: 'All clinical treatments: consultation-only, simple, and complicated procedures.', why: 'Procedures drive 80%+ of clinic revenue!' }
    ],
    strategyOverview: 'Single-chair Supply-Side Capacity model! Dentist operates 9 hours/day (11 AM–8 PM), 7 days/week. Segment Weekdays (5 days) vs Weekends (2 days) and Peak (100% occupancy) vs Non-Peak (50% occupancy). Divide chair-hours by 20-min average patient slot (3 patients/hour) to get weekly patients, then split by complexity (50% complicated @ ₹2,500, 30% simple @ ₹1,500, 20% consultation @ ₹1,000) and divide weekly revenue by 7.',
    formula: 'Daily Rev = [Weekly Patients × Weighted Fee per Patient] ÷ 7',
    assumptions: [
      { label: 'Operating Hours = 9 hrs/day (11 AM–8 PM); Avg patient turnaround = 20 mins (3 patients/hr)', rationale: '5 min intro + 10 min procedure/check + 5 min billing/prep.' },
      { label: 'Weekday (5 days): 3 Peak hrs (100% = 9 pax) + 6 Non-Peak hrs (50% = 9 pax) = 18 pax/day', rationale: 'Wait—check Vol 1 PDF carefully! In Vol 1, they added Peak (9) + Non-Peak (9) for ONLY ONE weekday (18) + ONE weekend (22.5) = 40.5 patients and then divided ₹76,950 by 7! Catching that missing ×5 weekdays and ×2 weekends in the PDF is critical!' },
      { label: 'Corrected 7-day total: (5 × 18) + (2 × 22.5) = 90 + 45 = 135 patients/week → ~19.3 patients/day', rationale: 'Or if each patient takes ~30–40 mins for complicated procedures, ~10–12 patients/day!' },
      { label: 'Mix & Total Fee (incl. ₹1,000 consult): 50% Complicated (₹2,500) + 30% Simple (₹1,500) + 20% Consult (₹1,000) = ₹1,900 weighted avg', rationale: 'Wait: Complicated root canals can be ₹4,000–6,000 across multiple sittings, averaging ₹2,000–2,500 per sitting.' }
    ],
    tree: {
      label: 'Solo Dentist Clinic (9 Hrs/Day, 3 slots/hr)',
      valueText: 'Avg ~11–19 patients/day',
      children: [
        { label: 'Book Calc (1 WD + 1 WE = 40.5 ÷ 7 = 5.8 pax/day × ₹1,900)', valueText: '₹10,993/day (Book)' },
        { label: 'Full 7-Day Calc (135 pax/wk ÷ 7 = 19.3 pax/day × ₹1,900)', valueText: '₹36,640/day (Corrected)', highlight: true },
        { label: 'Realistic 40-min avg slot (~10 pax/day × ₹1,800)', valueText: '~₹18,000/day', highlight: true }
      ]
    },
    finalAnswer: '~₹11,000 – ₹36,000/day (Realistic solo Delhi dentist: ~₹15,000–25,000/day = ₹4.5–7.5 Lakh/month)',
    acceptableRange: { min: 8000, max: 45000, unit: '₹/day', display: '₹8,000 – ₹45,000/day' },
    sanityCheck: 'A solo Delhi dentist makes ~₹4–6 Lakh/month gross revenue, pays ~₹60k rent + ₹40k assistant + ₹50k consumables/lab fees, netting ~₹2.5–3.5 Lakh/month profit—matches real Delhi practitioner economics!',
    interviewerTrap: 'Watch out for the Vol 1 PDF math bug! The PDF added ONE weekday (18) + ONE weekend day (22.5) = 40.5 and then divided by 7 instead of multiplying weekdays × 5 and weekends × 2 (or dividing by 2)! Always double-check your weighted average denominator!',
    variations: [
      { question: 'Estimate the number of dentists in Delhi.', hint: 'Population 3 Cr × ~1 visit/year ÷ (19 pax/day × 300 days ≈ 5,700 visits/yr) ≈ ~5,000–6,000 dentists!' },
      { question: 'What if the dentist adds a second chair and junior associate?', hint: 'Supply capacity doubles, though occupancy drops slightly (~70%) → ~1.5x revenue.' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Operating Hours × Peak/Non-Peak Occupancy ÷ Time per Patient × Weighted Procedure Fee', correct: true, feedback: 'Spot on! Always verify whether weekday/weekend weights match your divisor (5+2=7).' },
        { label: 'Delhi Population × % With Cavities ÷ Total Clinics', correct: false, feedback: 'You don’t know total clinics upfront—chair turnaround time is much more reliable.' },
        { label: 'Toothpaste Market Size ÷ 100', correct: false, feedback: 'Not a reliable proxy for individual clinic revenue.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'hours', label: 'Operating Hours / Day', defaultVal: 9, min: 6, max: 12, step: 1, unit: 'hrs' },
        { key: 'occPct', label: 'Avg Overall Occupancy %', defaultVal: 65, min: 30, max: 95, step: 5, unit: '%' },
        { key: 'minsPerPax', label: 'Avg Mins / Patient', defaultVal: 30, min: 15, max: 60, step: 5, unit: 'mins' },
        { key: 'avgFee', label: 'Weighted Avg Fee (₹)', defaultVal: 1800, min: 800, max: 3500, step: 100, unit: '₹' }
      ],
      computeFormulaText: '(Hours × 60 × Occupancy% ÷ Mins/Patient) × Weighted Fee',
      compute: (v) => {
        const patients = (v.hours * 60 * (v.occPct / 100)) / v.minsPerPax;
        const rev = patients * v.avgFee;
        return {
          value: rev,
          formatted: `₹${Math.round(rev).toLocaleString('en-IN')}/Day`,
          breakdown: [
            { label: 'Patients / Day', val: `${patients.toFixed(1)} patients` },
            { label: 'Monthly Revenue (30d)', val: `₹${(rev * 30 / 1e5).toFixed(2)} Lakh` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-laundry-delhi',
    title: 'Annual Revenue of a Laundry Service in Delhi',
    prompt: 'Estimate the annual revenue of a neighborhood laundry & dry-cleaning service in Delhi.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 32 (Book p. 28)',
    company: 'Indus Insights',
    difficulty: 3,
    archetype: 'Revenue & Cost',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-outlet',
    tags: ['Local Business', 'Delhi', 'Revenue Streams', 'Capacity'],
    clarifyingQuestions: [
      { q: 'Is this a single neighborhood dhobi/laundry shop or a chain like UClean/Tumbledry?', a: 'Single local neighborhood laundry & dry-cleaning shop in a middle-class Delhi locality.', why: 'Sets scale (~2–3 washing machines, 100–150 clothes/day).' },
      { q: 'Include secondary streams like dry-cleaning, same-day express, and pickup/delivery?', a: 'Yes, segment into Primary (wash & fold) and Secondary (dry-cleaning, express, pickup).', why: 'High-margin add-ons often drive 50%+ of revenue!' }
    ],
    strategyOverview: 'Segment by Revenue Streams (Bottom-Up Daily Volume × Price per Item) and cross-check against machine/ironing capacity (e.g., 2 washing machines × cycles/day). Multiply Daily Revenue (~₹2,020–₹2,500) by operating days (~360–365 days/year) to get annual revenue.',
    formula: 'Annual Revenue = [∑ (Service Stream Daily Clothes × Price/Cloth)] × Operating Days/Year',
    assumptions: [
      { label: 'Primary Stream (Wash & Fold/Iron): 100 clothes/day @ ₹9–10/cloth = ₹900/day', rationale: 'Daily bread-and-butter volume from nearby bachelor/working households.' },
      { label: 'Dry Cleaning: 7 clothes/day @ ₹60 = ₹420/day', rationale: 'Sarees, suits, winter jackets.' },
      { label: 'Same-Day Express: 10 clothes/day @ ₹40 = ₹400/day | Pickup & Delivery premium: 10 @ ₹30 = ₹300/day', rationale: 'Convenience premiums.' },
      { label: 'Total Daily Revenue = ₹2,020/day × 365 days ≈ ₹7.37 Lakh/year (Note: Vol 1 PDF had a miscalculation dividing by hours/day getting ₹3.38L; ₹2,020 × 365 = ₹7.37L!)', rationale: 'Always verify daily × days = annual without random extra multipliers!' }
    ],
    tree: {
      label: 'Daily Revenue Streams',
      valueText: '₹2,020/day',
      children: [
        { label: 'Wash & Fold (100/day × ₹9)', valueText: '₹900/day' },
        { label: 'Dry Cleaning (7/day × ₹60)', valueText: '₹420/day' },
        { label: 'Same Day (10 × ₹40) + Pickup (10 × ₹30)', valueText: '₹700/day' },
        { label: 'Annual Revenue (× 365 days)', valueText: '₹7.37 Lakh/Yr (Book: ₹3.38L)', highlight: true }
      ]
    },
    finalAnswer: '~₹7.4 Lakh/year (₹60,000/month) [Note: Catching Vol 1 PDF’s ₹3.38L arithmetic slip]',
    acceptableRange: { min: 3, max: 20, unit: '₹ Lakh/year', display: '₹3.5 Lakh – ₹20 Lakh/year' },
    sanityCheck: 'A neighborhood laundry shop serves ~15–20 regular households/day (~₹120–150 per order = ₹2,000–2,500/day = ₹60–75k/month). After paying ~₹15–20k rent + ₹15k helper + electricity/detergent, the owner nets ~₹25–30k/month—totally realistic!',
    interviewerTrap: 'Catching the Vol 1 PDF mistake where it printed ₹2,020/day and then computed ₹3.38L/year instead of ₹2,020 × 365 = ₹7.37L! In an interview, always sanity-check Daily × 365 mentally (₹2,000 × 365 ≈ ₹7.3 Lakh)!',
    variations: [
      { question: 'How many customers can 2 commercial 10kg washing machines serve?', hint: '10kg ≈ 30 clothes/cycle × 8 cycles/day × 2 machines = 480 clothes max capacity.' },
      { question: 'Estimate the market size of organized laundry chains in Delhi.', hint: 'Upper/Upper-Mid urban households (20% of 75L HH = 15L HH) × 30% outsourcing × ₹1,000/mo.' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Segment Service Streams (Wash, Dry Clean, Express) × Daily Items × Price × Operating Days', correct: true, feedback: 'Clean and realistic! You can also cross-check via Catchment Households (e.g., 500 nearby flats × 20% usage).' },
        { label: 'Delhi Population × ₹500', correct: false, feedback: 'Overestimates massively—a single shop only serves a 1–2 km neighborhood radius!' },
        { label: 'Number of Clothes Owned ÷ 10', correct: false, feedback: 'Clothes owned doesn’t measure paid laundry outsourcing.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'washQty', label: 'Wash/Iron Clothes/Day', defaultVal: 120, min: 40, max: 300, step: 20, unit: 'pcs' },
        { key: 'washPrice', label: 'Wash Price (₹/pc)', defaultVal: 12, min: 5, max: 25, step: 1, unit: '₹' },
        { key: 'dcQty', label: 'Dry Clean Items/Day', defaultVal: 10, min: 2, max: 40, step: 2, unit: 'pcs' },
        { key: 'dcPrice', label: 'Dry Clean Price (₹/pc)', defaultVal: 80, min: 40, max: 200, step: 10, unit: '₹' },
        { key: 'days', label: 'Operating Days/Yr', defaultVal: 350, min: 300, max: 365, step: 5, unit: 'days' }
      ],
      computeFormulaText: '[(Wash Qty × Price) + (Dry Clean Qty × Price)] × Operating Days',
      compute: (v) => {
        const daily = v.washQty * v.washPrice + v.dcQty * v.dcPrice;
        const annualLakh = (daily * v.days) / 1e5;
        return {
          value: annualLakh,
          formatted: `₹${annualLakh.toFixed(2)} Lakh/Yr`,
          breakdown: [
            { label: 'Daily Revenue', val: `₹${daily.toLocaleString('en-IN')}` },
            { label: 'Monthly Revenue', val: `₹${(daily * 30).toLocaleString('en-IN')}` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-food-court-mall',
    title: 'Weekly Revenue from Food Stalls in a Delhi Mall Food Court',
    prompt: 'Estimate the weekly revenue from all food stalls in a mall food court in Delhi.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 33 (Book p. 29)',
    company: 'Indus Insights',
    difficulty: 3,
    archetype: 'Revenue & Cost',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-outlet',
    tags: ['F&B', 'Mall', 'Footfall Conversion', 'Delhi'],
    clarifyingQuestions: [
      { q: 'Are we counting only food court quick-service stalls, or full-service sit-down restaurants too?', a: 'Food court stalls (~15–30 stalls in a typical Delhi mall).', why: 'Avoids mixing ₹2,000 sit-down dining bills with ₹300 food court orders.' },
      { q: 'Include online delivery orders (Zomato/Swiggy) from those mall outlets?', a: 'Walk-in mall diner revenue primarily (optionally note 20% delivery uplift).', why: 'Anchors cleanly to mall footfall.' }
    ],
    strategyOverview: 'Two great routes! Route A (Footfall Conversion): Estimate weekly mall footfall (Weekdays ~20K/day × 5 + Weekends ~35K/day × 2 ≈ 1.7L visitors/week) × % eating at food court (~20–30%) ÷ avg group size (or × individual AOV ₹250–350). Route B (Stall Capacity): 20–30 stalls × orders/hour (peak vs non-peak) × AOV. Note: Vol 1 PDF had a huge unit error arriving at ₹1.56L for ALL 30 stalls combined (only ₹5,200/week per stall!!)—let’s see the realistic check!',
    formula: 'Weekly Revenue = Weekly Mall Visitors × Food Court Conversion % × Avg Spend per Visitor',
    assumptions: [
      { label: 'Mall Footfall: ~22,000/day Weekdays (×5 = 110K) + ~24,000–35,000/day Weekends (×2 = 50–70K) ≈ 1.6L–1.8L/wk', rationale: 'Notice Vol 1 PDF accidentally computed 23,460/week TOTAL instead of per day!' },
      { label: '% of Mall Visitors Eating at Food Court = ~25% (~40,000–45,000 diners/wk)', rationale: 'Shoppers & moviegoers frequently grab a meal or snack.' },
      { label: 'Average Spend per Diner = ₹250–₹350', rationale: 'Combo meal + drink at McDonald’s/Haldiram’s/Domino’s.' }
    ],
    tree: {
      label: 'Delhi Mall Weekly Food Court Revenue',
      valueText: '~₹1.1 – 1.4 Crore/wk',
      children: [
        { label: 'Weekday Footfall (22K × 5 = 110K) + Weekend (30K × 2 = 60K)', valueText: '1,70,000 visitors/wk' },
        { label: 'Food Court Conversion (25% eat)', valueText: '42,500 diners/wk', highlight: true },
        { label: '× ₹300 Avg Spend per Person', valueText: '₹1.275 Crore/wk (~₹4.25L/stall across 30 stalls)', highlight: true },
        { label: '[Book PDF printed ₹1.56L — missing ~80x factor!]', valueText: 'Sanity check caught it!', muted: true }
      ]
    },
    finalAnswer: '~₹1.0 – 1.4 Crore/week (~₹3.5–4.5 Lakh/week per stall across 30 stalls)',
    acceptableRange: { min: 50, max: 200, unit: '₹ Lakh/week', display: '₹50 Lakh – ₹2 Crore/week (for 20–30 stalls)' },
    sanityCheck: 'CRITICAL SANITY CHECK: In the Vol 1 PDF, the final figure was ₹1,56,400/week for 30 stalls = ₹5,200 per stall per week = ₹740/day!! No mall food stall can even pay ₹2 Lakh/month mall rent on ₹740/day! Realistic sales are ~₹40,000–65,000/day per stall → ~₹3.5–4.5 Lakh/week per stall → ~₹1–1.35 Cr/week for 30 stalls! This is a golden example of WHY Step 6 (Sanity Check) saves your interview!',
    interviewerTrap: 'Dividing daily mall footfall by 7 instead of multiplying by 7, or forgetting to multiply by number of stalls! Always divide your final answer by the number of stalls to check daily sales per stall.',
    variations: [
      { question: 'What is the monthly revenue of a single McDonald’s outlet in a mall?', hint: 'Take ₹4.5L/week × 4.3 ≈ ₹18–20 Lakh/month (or higher ~₹30–40L for anchor brands).' },
      { question: 'How many total malls exist in Delhi NCR?', hint: 'Pop 3.5 Cr ÷ ~4–5L catchment per mall ≈ ~70–80 malls.' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Weekly Mall Footfall × % Dining at Food Court × Avg Spend (cross-checked with per-stall daily sales)', correct: true, feedback: 'Spot on! Cross-checking per-stall revenue prevents 10x–100x math errors.' },
        { label: 'Total Delhi Population × ₹300', correct: false, feedback: 'You are sizing ONE mall food court, not all of Delhi!' },
        { label: 'Mall Parking Slots × 10', correct: false, feedback: 'Metro commuters and pedestrians visit malls without parking.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'wdFoot', label: 'Weekday Daily Footfall', defaultVal: 20000, min: 5000, max: 40000, step: 2500, unit: 'ppl' },
        { key: 'weFoot', label: 'Weekend Daily Footfall', defaultVal: 35000, min: 10000, max: 70000, step: 5000, unit: 'ppl' },
        { key: 'eatPct', label: '% Eating at Food Court', defaultVal: 25, min: 10, max: 45, step: 5, unit: '%' },
        { key: 'spend', label: 'Avg Spend / Diner (₹)', defaultVal: 300, min: 150, max: 500, step: 25, unit: '₹' },
        { key: 'stalls', label: 'No. of Stalls (for check)', defaultVal: 25, min: 10, max: 40, step: 5, unit: 'stalls' }
      ],
      computeFormulaText: '[(WD × 5) + (WE × 2)] × Eat % × Avg Spend',
      compute: (v) => {
        const weeklyFoot = v.wdFoot * 5 + v.weFoot * 2;
        const revLakh = (weeklyFoot * (v.eatPct / 100) * v.spend) / 1e5;
        return {
          value: revLakh,
          formatted: `₹${revLakh.toFixed(1)} Lakh/Week`,
          breakdown: [
            { label: 'Weekly Diners', val: `${Math.round(weeklyFoot * v.eatPct / 100).toLocaleString('en-IN')}` },
            { label: 'Daily Rev / Stall (Sanity)', val: `₹${Math.round((revLakh * 1e5) / 7 / v.stalls).toLocaleString('en-IN')}/day` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-books-lifetime',
    title: 'Number of Books Read by an Indian During Their Lifetime',
    prompt: 'Estimate the average number of books read by an Indian during their lifetime.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 34 (Book p. 30)',
    company: 'Indus Insights',
    difficulty: 2,
    archetype: 'Usage & Behavioral',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Behavioral', 'Education', 'Cohort Lifecycle', 'Indus Insights'],
    clarifyingQuestions: [
      { q: 'Does "books" include school/college textbooks, or only leisure/non-academic books?', a: 'All books (academic textbooks + leisure fiction/non-fiction).', why: 'School textbooks account for ~70–80% of books read by the average citizen!' },
      { q: 'Should we average across ALL Indians (including non-literate), or literate Indians only?', a: 'Across an average Indian (hence multiply by ~70–78% literacy rate!).', why: 'Crucial distinction—clarify upfront!' }
    ],
    strategyOverview: 'Lifecycle Cohort approach! Follow one hypothetical literate Indian across life stages (assuming ~70 yr life expectancy): Age 7–18 (School, 12 yrs), Age 18–35 (College/Early Career, 17 yrs), Age 35–60/70 (Adult, 25–30 yrs). Within each stage, split Avid vs Non-Avid readers, compute annual books read, sum across all life years, and multiply by India’s Literacy Rate (~70–75%).',
    formula: 'Avg Books = [∑ (Years in Life Stage × Weighted Books/Yr)] × Literacy Rate',
    assumptions: [
      { label: 'Minimum reading age = 7 yrs; Literacy Rate = 70%–75%', rationale: 'Illiterate population (~25–30%) reads 0 books.' },
      { label: 'Age 7–18 (11 yrs): 50% read 10/yr (school texts+stories), 50% read 5/yr → avg 7.5/yr = ~75–80 books', rationale: 'Mandatory school curriculum drives peak book volume.' },
      { label: 'Age 18–35 (17 yrs): 30% avid (4/yr) + 70% non-avid (2/yr) → avg 2.6–3/yr = ~44–51 books', rationale: 'College texts + early career reading.' },
      { label: 'Age 35–60+ (25 yrs): 30% avid (3/yr) + 70% non-avid (1/yr) → avg 1.6–2/yr = ~40–50 books', rationale: 'Leisure/religious/professional reading only.' }
    ],
    tree: {
      label: 'Lifetime Books (Literate Individual)',
      valueText: '~181 books',
      children: [
        { label: 'Age 7–18 (~10–11 yrs × 7.5 books/yr)', valueText: '75–80 books', highlight: true },
        { label: 'Age 18–35 (17 yrs × 3 books/yr)', valueText: '51 books' },
        { label: 'Age 35–60 (25 yrs × 2 books/yr)', valueText: '50 books' },
        { label: 'Adjusted for Literacy Rate (× 0.70)', valueText: '~127 Books / Lifetime', highlight: true }
      ]
    },
    finalAnswer: '~120 – 130 Books in a lifetime (~180 for literate Indians)',
    acceptableRange: { min: 60, max: 200, unit: 'Books', display: '60 – 200 books/lifetime' },
    sanityCheck: 'Including ~8–10 school textbooks per grade (Grades 1–12 ≈ ~80–100 textbooks alone for those completing school, adjusted for ~60% high-school completion and ~75% literacy) plus ~30–40 adult/college books = ~110–130 books. Very reasonable! (Note: if Leisure-only, answer drops sharply to ~15–25 books!)',
    interviewerTrap: 'Forgetting to ask if school textbooks count! Leisure-only vs all-books changes the answer by ~5x.',
    variations: [
      { question: 'How many books are sold in India annually?', hint: '140 Cr pop ÷ 70 yr life × 127 books ≈ ~250 Cr books/year (adjusted for second-hand/borrowed books ÷ 2 ≈ ~125 Cr sold!).' },
      { question: 'Estimate leisure (non-academic) books read by an urban graduate in a lifetime.', hint: '55 adult yrs × ~1.5–2 books/yr ≈ ~80–110 leisure books.' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Life Stages (School, College, Adult) × Weighted Reading Rate × Literacy Rate', correct: true, feedback: 'Spot on! Breaking down by life stage captures the huge spike in school years.' },
        { label: 'Total Bookstores in India × Books per Store', correct: false, feedback: 'Library borrowing, shared textbooks, and digital PDFs aren’t captured by store inventory.' },
        { label: 'Average Words Read per Minute × Lifespan', correct: false, feedback: 'Impossible to know what share of waking hours is spent reading books vs WhatsApp/work.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'literacy', label: 'Literacy Rate %', defaultVal: 75, min: 60, max: 95, step: 5, unit: '%' },
        { key: 'schoolRate', label: 'School Books/Yr (11 yrs)', defaultVal: 7.5, min: 3, max: 12, step: 0.5, unit: '/yr' },
        { key: 'youngRate', label: 'Age 18–35 Books/Yr (17 yrs)', defaultVal: 3.0, min: 0.5, max: 6, step: 0.5, unit: '/yr' },
        { key: 'adultRate', label: 'Age 35+ Books/Yr (30 yrs)', defaultVal: 1.5, min: 0.2, max: 5, step: 0.3, unit: '/yr' }
      ],
      computeFormulaText: '[(11 × School) + (17 × Young) + (30 × Adult)] × Literacy %',
      compute: (v) => {
        const literate = 11 * v.schoolRate + 17 * v.youngRate + 30 * v.adultRate;
        const avg = literate * (v.literacy / 100);
        return {
          value: avg,
          formatted: `${Math.round(avg)} Books / Lifetime`,
          breakdown: [
            { label: 'Literate Individual Avg', val: `${Math.round(literate)} books` },
            { label: 'Books / Year Overall', val: `${(avg / 70).toFixed(1)} books/yr` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-commute-delhi',
    title: 'Weekly Commute Time for Office-Goers in Delhi',
    prompt: 'Estimate the total weekly commute time (in hours) spent by office-goers in Delhi.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 35 (Book p. 31) & Vol 2 p. 28',
    company: 'Indus Insights',
    difficulty: 3,
    archetype: 'Usage & Behavioral',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Workforce', 'Delhi NCR', 'Hybrid Work', 'Indus Insights'],
    clarifyingQuestions: [
      { q: 'Does "office-goers" mean white-collar/tertiary sector workers only, or factory/informal workers too?', a: 'Tertiary / service sector office workers (~60% of Delhi workforce).', why: 'Matches standard corporate/govt office definition.' },
      { q: 'Include commutes to/from satellite cities (Gurgaon, Noida, Faridabad)?', a: 'Yes—essential in Delhi NCR!', why: 'Cross-city commutes take ~3 hrs/day round-trip vs ~1.5 hrs within Delhi.' }
    ],
    strategyOverview: 'Demand-Side Workforce Segmentation: Delhi Pop (30M) → Working Age (20–50 yrs = 50% = ~14.5M) → Tertiary/Office Sector (60% = 8.73M) → Split by Commute Distance (50% Outside Delhi to Gurgaon/Noida @ 3 hrs/day vs 50% Within Delhi @ 1.5 hrs/day) and Work Model (60% On-site 5 days/wk vs 40% Hybrid 3 days/wk).',
    formula: 'Weekly Hours = ∑ (Office Segment Workers × Round-Trip Hrs/Day × In-Office Days/Week)',
    assumptions: [
      { label: 'Delhi Pop = 30M; Working-age workforce = ~14.5M; Tertiary/Office Sector = 60% (8.73M)', rationale: 'Delhi is predominantly a service/government economy (~60% tertiary, 38% secondary, 2% primary).' },
      { label: '50% commute Outside Delhi (3 hrs/day round-trip), 50% Within Delhi (1.5 hrs/day)', rationale: 'NCR cross-border traffic between Delhi, Gurugram & Noida adds major travel time.' },
      { label: 'On-site (60% @ 5 days/wk) vs Hybrid (40% @ 3 days/wk)', rationale: 'Hybrid work post-pandemic reduces weekly office commute days by ~40%.' }
    ],
    tree: {
      label: 'Delhi Workforce (14.5M) → Office/Tertiary (60% = 8.73M)',
      valueText: '8.73M Office-Goers',
      children: [
        {
          label: 'Outside Delhi (50% = 4.36M, 3 hrs/day)',
          valueText: '55M hrs/wk',
          children: [
            { label: 'On-Site (60% × 5d × 3h)', valueText: '39.28M hrs', highlight: true },
            { label: 'Hybrid (40% × 3d × 3h)', valueText: '15.71M hrs' }
          ]
        },
        {
          label: 'Within Delhi (50% = 4.36M, 1.5 hrs/day)',
          valueText: '27.5M hrs/wk',
          children: [
            { label: 'On-Site (60% × 5d × 1.5h)', valueText: '19.64M hrs' },
            { label: 'Hybrid (40% × 3d × 1.5h)', valueText: '7.85M hrs' }
          ]
        },
        {
          label: 'Total Weekly Commute Hours',
          valueText: '~82.5 Million Hrs/Wk (Vol 2) [Vol 1: ~49.8M hrs]',
          highlight: true
        }
      ]
    },
    finalAnswer: '~5 Crore to 8.25 Crore Hours/Week (50M – 82.5M hours)',
    acceptableRange: { min: 40, max: 100, unit: 'Million hours/week', display: '40M – 100M hours/week' },
    sanityCheck: '82.5M hours ÷ 8.73M office-goers ≈ 9.4 hours/week per office-goer (~2 hours/day across 4.2 avg office days/week). Completely realistic for Delhi NCR!',
    interviewerTrap: 'Forgetting ROUND-TRIP (multiply one-way commute by 2!) or forgetting hybrid work-from-home schedules.',
    variations: [
      { question: 'Estimate the value of productivity lost due to traffic congestion in Delhi.', hint: 'Compute excess commute time (~30% of 82.5M hrs) × avg hourly wage (~₹300/hr).' },
      { question: 'What % of those commute hours happen on Delhi Metro?', hint: 'Multiply by Metro mode share (~30–35% of office-goers).' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'City Pop → Working Age → Tertiary/Office % → Within vs Cross-City Commute Time × Office Days/Wk', correct: true, feedback: 'Spot on! Splitting on-site vs hybrid and intra-city vs NCR makes your answer razor-sharp.' },
        { label: 'Metro Trains × 24 Hours', correct: false, feedback: 'Cars, buses, autos, and 2-wheelers carry most office commuters alongside Metro.' },
        { label: 'Total Cars in Delhi × Speed Limit', correct: false, feedback: 'Cars carry families/errands too, and speed limit doesn’t give commuter headcount.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'officeM', label: 'Office-Goers in Delhi (M)', defaultVal: 8.7, min: 4, max: 12, step: 0.5, unit: 'M' },
        { key: 'outsidePct', label: '% Commuting Outside Delhi', defaultVal: 50, min: 20, max: 70, step: 5, unit: '%' },
        { key: 'outHrs', label: 'Cross-City Round Trip (hrs)', defaultVal: 3.0, min: 1.5, max: 4.0, step: 0.5, unit: 'hrs' },
        { key: 'inHrs', label: 'Within-Delhi Round Trip (hrs)', defaultVal: 1.5, min: 0.5, max: 2.5, step: 0.25, unit: 'hrs' },
        { key: 'avgDays', label: 'Avg Office Days / Week', defaultVal: 4.2, min: 3.0, max: 6.0, step: 0.2, unit: 'days' }
      ],
      computeFormulaText: 'Workers × [(Out% × Out Hrs) + (In% × In Hrs)] × Avg Office Days',
      compute: (v) => {
        const hrsM = v.officeM * ((v.outsidePct / 100) * v.outHrs + ((100 - v.outsidePct) / 100) * v.inHrs) * v.avgDays;
        return {
          value: hrsM,
          formatted: `${hrsM.toFixed(1)} Million Hrs/Wk`,
          breakdown: [
            { label: 'Avg Hrs / Worker / Wk', val: `${(hrsM / v.officeM).toFixed(1)} hrs` },
            { label: 'Annual Commute Hours', val: `${(hrsM * 50 / 1000).toFixed(2)} Billion hrs` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-lok-sabha-expenditure',
    title: 'Govt Expenditure in the Lok Sabha Elections',
    prompt: 'Estimate the expenditure incurred by the Government of India in conducting the Lok Sabha elections.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 36 (Book p. 32)',
    company: 'Indus Insights',
    difficulty: 4,
    archetype: 'Revenue & Cost',
    approachType: 'Hybrid (Demand + Supply)',
    templateId: 'tpl-bottleneck',
    tags: ['Public Policy', 'Extrapolation', 'Cost Estimation', 'India'],
    clarifyingQuestions: [
      { q: 'Government administrative/ECI spend ONLY, or political party campaign spending too?', a: 'Government of India administrative cost only (not private party rallies/ads).', why: 'Party + candidate spend is ~10x larger (~₹1.3 Lakh Cr!) than govt ECI expenditure.' },
      { q: 'Are we looking at a single election cycle (e.g., 2024)?', a: 'Yes, total cost for one general election.', why: 'Sets time horizon cleanly.' }
    ],
    strategyOverview: 'Two valid paths: (1) Extrapolation from prior election benchmarks (2014 ~₹3,800 Cr → 2019 ~₹8,000 Cr → +45% inflation/voter growth/tech = ~₹12,000 Cr); OR (2) Zero-based Bottom-Up Cost Model (more impressive if you don’t know 2019 data!): Eligible Voters (~96 Cr) ÷ ~1,000 voters/booth = ~10 Lakh polling booths × (5 staff allowances + EVM maintenance + security deployment + logistics/training) = ~₹10,000–14,000 Crore!',
    formula: 'Zero-Based: (Polling Booths × Cost per Booth) + Central Security/Logistics/Voter Awareness',
    assumptions: [
      { label: 'Eligible Voters (18+ = ~70% of 1.4B) ≈ 960M–980M voters', rationale: 'Universal adult suffrage in India.' },
      { label: '1 Polling Booth per ~1,000 voters → ~10 Lakh (1 Million) polling stations', rationale: 'ECI rule caps voters per polling booth around 1,000–1,500.' },
      { label: 'Cost per Booth ≈ ₹80,000 – ₹1,20,000 (polling staff pay/TA/DA, EVM transport, ink, tents, security)', rationale: '~5–6 personnel per booth × 3–4 days duty + security + admin.' },
      { label: 'Extrapolation Check: 2019 (~₹8,000 Cr) × (1 + 30% inflation + 5% voter growth + 10% tech/security + 5% buffer)', rationale: 'Matches Vol 1 extrapolation of ₹12,180 Crore!' }
    ],
    tree: {
      label: 'Lok Sabha Election Govt Cost',
      valueText: '~₹12,180 Crore',
      children: [
        { label: 'Path A (Extrapolation): 2019 Base (₹8,000 Cr) × 1.45 (+5% buffer)', valueText: '₹12,180 Cr', highlight: true },
        { label: 'Path B (Bottom-Up): ~96 Cr Voters ÷ 1,000 = ~9.6L Booths × ₹1.2L/booth', valueText: '~₹11,500 Cr', highlight: true }
      ]
    },
    finalAnswer: '~₹12,000 Crore (approx. ₹125 per eligible voter)',
    acceptableRange: { min: 8000, max: 18000, unit: '₹ Crore', display: '₹8,000 Cr – ₹18,000 Cr' },
    sanityCheck: 'Dividing ₹12,000 Cr by 96 Crore registered voters = ₹125 per voter (just ~$1.50/voter) to run the world’s largest democratic exercise across 7 phases! Completely reasonable.',
    interviewerTrap: 'In an interview, don’t assume you magically know the 2019 budget was ₹8,000 Cr unless you cite it carefully—having the Polling Booth Bottom-Up model ready proves first-principles problem solving!',
    variations: [
      { question: 'Estimate total spending (Govt + Political Parties + Candidates) in an election.', hint: '543 Lok Sabha seats × ~₹10–15 Cr real spend/constituency + national media ads + govt ₹12k Cr ≈ ~₹1+ Lakh Crore!' },
      { question: 'How many polling staff are deployed in India?', hint: '10 Lakh booths × ~5 polling officers + ~2–3 security personnel = ~70–80 Lakh personnel.' }
    ],
    guidedPractice: {
      correctApproach: 'Hybrid (Demand + Supply)',
      funnelOptions: [
        { label: 'Voters (~96 Cr) ÷ Voters/Booth (~1,000) → Booths × Cost/Booth (Staff + Logistics + Security)', correct: true, feedback: 'Yes! Building from polling stations up works even if you have zero prior budget numbers memorized.' },
        { label: 'India GDP × 5%', correct: false, feedback: '5% of India’s GDP would be ₹16 Lakh Crore—way bigger than the entire national defense budget!' },
        { label: '543 MPs × ₹1 Crore', correct: false, feedback: 'Only ₹543 Crore wouldn’t even pay the TA/DA of 50 lakh polling officers!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'votersCr', label: 'Eligible Voters (Crore)', defaultVal: 96, min: 85, max: 105, step: 2, unit: 'Cr' },
        { key: 'perBooth', label: 'Voters per Polling Booth', defaultVal: 1000, min: 800, max: 1500, step: 100, unit: 'voters' },
        { key: 'costPerBoothK', label: 'All-in Cost / Booth (₹K)', defaultVal: 120, min: 60, max: 200, step: 10, unit: '₹K' }
      ],
      computeFormulaText: '(Eligible Voters ÷ Voters/Booth) × All-in Cost per Booth',
      compute: (v) => {
        const booths = (v.votersCr * 1e7) / v.perBooth;
        const totalCr = (booths * v.costPerBoothK * 1000) / 1e7;
        return {
          value: totalCr,
          formatted: `₹${Math.round(totalCr).toLocaleString('en-IN')} Crore`,
          breakdown: [
            { label: 'Polling Booths', val: `${(booths / 1e5).toFixed(2)} Lakh booths` },
            { label: 'Cost per Voter', val: `₹${Math.round((totalCr * 1e7) / (v.votersCr * 1e7))}` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-alco-bev-mumbai',
    title: 'Market Size for an Alco-Beverage Firm in Mumbai',
    prompt: 'Estimate the target market size (addressable consumers) for a branded alco-beverage firm in Mumbai.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 38 (Book p. 34)',
    company: 'Kepler Cannon',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Beverages', 'Mumbai', 'Slum vs Urban', 'Legal Drinking Age'],
    clarifyingQuestions: [
      { q: 'Are we estimating the number of target consumers (volume) or annual ₹ revenue?', a: 'Target consumer base (book) — optionally multiply by monthly spend for revenue.', why: 'Matches firm’s SOM/SAM sizing.' },
      { q: 'Branded/premium spirits & beer, or cheap local/country liquor too?', a: 'Branded retail & bar/pub alcohol (hence exclude slum/BPL population).', why: 'Slums account for ~40% of Mumbai’s population!' }
    ],
    strategyOverview: 'Mumbai-specific Top-Down Funnel! Always remember Mumbai’s iconic 60% Formal Urban / 40% Slum split. Exclude Slum (40%) for branded alcohol, exclude underage 0–18 (or legal drinking age 0–21/25 in Maharashtra!), segment remaining urban population by Age drinking propensity (18–30: 80%, 30–50: 50%, 50+: 20%), and apply Income Affordability filters.',
    formula: 'Target Market = Mumbai Pop × Formal Urban % × Age Drinking % × Income Affordability %',
    assumptions: [
      { label: 'Mumbai Population = 20 Million; Formal Urban = 60% (12M), Slum = 40% (8M excluded)', rationale: 'Branded spirits target middle/upper formal households.' },
      { label: 'Age Drinking Propensity (among 12M): 18–30 (20% × 80% = 1.92M) + 30–50 (30% × 50% = 1.8M) + 50+ (30% × 20% = 0.72M) ≈ 4.4M (~4M)', rationale: 'Note: 0–18 (20%) excluded legally & ethically. (In Maharashtra, legal age for hard liquor is 25, beer 21!)' },
      { label: 'Income Affordability (on 4M): Lower Mid 35% (×50% = 0.7M) + Upper Mid 40% (×75% = 1.2M) + Upper 15% (×90% = 0.54M) [10% BPL = 0]', rationale: 'Sums to ~2.44M (~2.5 Million) target drinkers.' }
    ],
    tree: {
      label: 'Mumbai Population (20M)',
      valueText: '20M',
      children: [
        {
          label: 'Formal Urban (60% = 12M)',
          valueText: '12M',
          children: [
            {
              label: 'Drinking Age & Propensity (~4M interested)',
              valueText: '4M',
              children: [
                { label: 'Lower Mid (35% × 50%)', valueText: '0.70M' },
                { label: 'Upper Mid (40% × 75%)', valueText: '1.20M', highlight: true },
                { label: 'Upper Class (15% × 90%)', valueText: '0.54M' },
                { label: 'Total Target Market', valueText: '~2.5 Million Consumers', highlight: true }
              ]
            }
          ]
        },
        { label: 'Slum Settlements (40% = 8M)', valueText: 'Excluded for branded spirits', muted: true }
      ]
    },
    finalAnswer: '~25 Lakh (2.5 Million) Target Consumers in Mumbai',
    acceptableRange: { min: 1.5, max: 4.5, unit: 'Million consumers', display: '1.5M – 4.5M consumers' },
    sanityCheck: '2.5M consumers out of 20M total Mumbai population = 12.5% of total city (~20% of adults). Given cultural/religious abstention and gender skew in India (~35–40% male adult drinkers, ~10–15% female), 12.5–15% overall city penetration is very believable!',
    interviewerTrap: 'Forgetting Mumbai’s 40% informal/slum housing demographic OR forgetting gender skew in Indian alcohol consumption (women drink at significantly lower rates than men, so applying a single 80% rate to 18–30 year olds without gender nuance can overestimate!).',
    variations: [
      { question: 'What is the annual ₹ revenue of this Mumbai market?', hint: '2.5M consumers × ~2 bottles/month × 12 × ₹800 avg bottle = ~₹4,800 Crore/yr.' },
      { question: 'Estimate the market for craft beer in Bengaluru.', hint: 'Pop 15M → 25–40 age tech/young workforce → pub culture affordability.' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Mumbai Pop → Formal Urban (60%) → Legal Age & Drinking Propensity → Income Affordability', correct: true, feedback: 'Spot on! Mumbai’s 60/40 Urban/Slum split is a classic insider benchmark.' },
        { label: 'Number of Wine Shops in Mumbai × 500', correct: false, feedback: 'Bars, pubs, clubs, and home delivery vary wildly per outlet—consumer funnel is clearer.' },
        { label: '140 Cr ÷ 28 States', correct: false, feedback: 'Mumbai is a dense commercial metro, not an average 1/28th slice of India!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'Mumbai Pop (M)', defaultVal: 20, min: 15, max: 25, step: 1, unit: 'M' },
        { key: 'urbanPct', label: 'Non-Slum Urban %', defaultVal: 60, min: 50, max: 70, step: 5, unit: '%' },
        { key: 'adultPct', label: 'Legal Age (21+) %', defaultVal: 70, min: 60, max: 80, step: 5, unit: '%' },
        { key: 'drinkerPct', label: '% Drinking Alcohol', defaultVal: 30, min: 15, max: 50, step: 5, unit: '%' }
      ],
      computeFormulaText: 'Pop × Formal Urban% × Legal Age% × Drinker%',
      compute: (v) => {
        const users = v.popM * (v.urbanPct / 100) * (v.adultPct / 100) * (v.drinkerPct / 100);
        return {
          value: users,
          formatted: `${users.toFixed(2)} Million Consumers`,
          breakdown: [
            { label: '% of Mumbai Total Pop', val: `${((users / v.popM) * 100).toFixed(1)}%` },
            { label: 'Est. Annual Spend (@ ₹10K/yr)', val: `₹${Math.round(users * 1000).toLocaleString('en-IN')} Cr` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-red-cars-delhi',
    title: 'Number of Red Cars in Delhi',
    prompt: 'Estimate the number of red cars currently in Delhi.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 40 (Book p. 36)',
    company: 'Nation with NaMo',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-durable',
    tags: ['Automotive', 'Color Mix', 'Delhi', 'Personal Vehicles'],
    clarifyingQuestions: [
      { q: 'Personal cars only, or commercial vehicles/cabs too?', a: 'Personal cars only (cabs are mostly white/yellow/black!).', why: 'Crucial! Commercial fleets have ~0% red cars.' },
      { q: 'Include shades of maroon/cherry red under red?', a: 'Yes, all red-family paint colors (~10–15% share).', why: 'White/silver/grey dominate ~75% of Indian car sales; red is ~10–15%.' }
    ],
    strategyOverview: 'Top-Down Household Car Ownership Funnel! Delhi Population (33M) ÷ 4 members/household = 8.25M households. Segment into Lower/Lower-Mid (75%, excluded or very low ownership), Upper Middle (15% = 1.24M HH × 1 car = 1.24M), Upper Class (10% = 0.825M HH × 2 cars = 1.65M). Total Personal Cars = 2.89M. Multiply by Red Car share (10–15%).',
    formula: 'Red Cars = (Delhi Pop ÷ Household Size) × ∑ (Income Share × Cars/HH) × Red Color %',
    assumptions: [
      { label: 'Delhi Pop = 33M; Household size = 4 → 8.25 Million households', rationale: 'Cars are household-level durable assets!' },
      { label: 'Lower/Lower-Mid (75%) = 0 cars (or small %); Upper Mid (15%) = 1 car/HH (1.24M); Upper (10%) = 2 cars/HH (1.65M)', rationale: 'Total ~2.89M cars (note Vol 1 diagram forgot ÷4 inside the Lower Middle box label, though its final 2.89M sum correctly used ÷4!).' },
      { label: 'Red Car Share = 15% (10–15% realistic; White ~45%, Silver/Grey ~30%, Blue/Black/Red ~25%)', rationale: 'White & silver dominate for heat reflection & resale value; red is ~10–15%.' }
    ],
    tree: {
      label: 'Delhi Households (33M ÷ 4 = 8.25M HH)',
      valueText: '8.25M HH',
      children: [
        { label: 'Lower / Lower-Mid (75%)', valueText: '0 cars (budget 2W)', muted: true },
        { label: 'Upper Middle (15% = 1.24M HH) × 1 car', valueText: '1.24M cars' },
        { label: 'Upper Class (10% = 0.825M HH) × 2 cars', valueText: '1.65M cars' },
        {
          label: 'Total Personal Cars = 2.89M',
          valueText: '2.89M cars',
          children: [
            { label: '× 15% Red Color Share', valueText: '~4,33,125 Red Cars', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~3 Lakh – 4.3 Lakh Red Cars in Delhi',
    acceptableRange: { min: 200000, max: 600000, unit: 'Red cars', display: '2 Lakh – 6 Lakh red cars' },
    sanityCheck: 'Delhi RTO actually has ~30–35 Lakh registered passenger cars! Taking ~10–15% red share gives 3–5 Lakh red cars—spot on!',
    interviewerTrap: 'Forgetting to divide Population by Household Size (4) before multiplying by Cars/HH, OR assuming red is 25–30% (Indian buyers heavily favor White/Silver for heat and resale!).',
    variations: [
      { question: 'How many red cars are sold in Delhi per month?', hint: 'Divide 4.3L red cars by ~8-year car lifespan ÷ 12 months ≈ ~4,500 red cars/month.' },
      { question: 'What if the question asked "How many white cabs in Delhi"?', hint: 'Take ~70,000 Ola/Uber cabs × ~70% white share ≈ ~49,000 white cabs!' }
    ],
    guidedPractice: {
      correctApproach: 'Stock & Replacement',
      funnelOptions: [
        { label: 'Delhi Pop ÷ Household Size → Income Segmentation → Cars/HH → Total Cars × Red Color %', correct: true, feedback: 'Spot on! Cars are household assets, and stopping at Stock (not dividing by lifespan) matches "currently in Delhi".' },
        { label: 'Total Cars ÷ 8-Year Lifespan × 15%', correct: false, feedback: 'Only divide by lifespan if asked for ANNUAL SALES, not total stock currently in the city!' },
        { label: '15% of Delhi Population', correct: false, feedback: 'Wait—not every individual owns a car!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'Delhi Pop (M)', defaultVal: 33, min: 20, max: 40, step: 1, unit: 'M' },
        { key: 'hhSize', label: 'Household Size', defaultVal: 4, min: 3.5, max: 5, step: 0.5, unit: 'ppl' },
        { key: 'carPenPct', label: 'Avg Cars / 100 Households', defaultVal: 35, min: 20, max: 55, step: 5, unit: 'cars/100 HH' },
        { key: 'redPct', label: 'Red Car Share %', defaultVal: 12, min: 5, max: 20, step: 1, unit: '%' }
      ],
      computeFormulaText: '(Pop ÷ HH Size) × (Cars/100 HH) × Red Share %',
      compute: (v) => {
        const totalCars = (v.popM * 1e6 / v.hhSize) * (v.carPenPct / 100);
        const redCars = totalCars * (v.redPct / 100);
        return {
          value: redCars,
          formatted: `${(redCars / 1e5).toFixed(2)} Lakh Red Cars`,
          breakdown: [
            { label: 'Total Personal Cars', val: `${(totalCars / 1e5).toFixed(1)} Lakh` },
            { label: 'Red Cars (Exact)', val: `${Math.round(redCars).toLocaleString('en-IN')}` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-chairs-delhi',
    title: 'Number of Chairs in Households of Delhi',
    prompt: 'Estimate the total number of chairs in households across Delhi.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 41 (Book p. 37)',
    company: 'Nation with NaMo',
    difficulty: 1,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-durable',
    tags: ['Households', 'Delhi', 'Beginner Friendly', 'Furniture'],
    clarifyingQuestions: [
      { q: 'Households ONLY, or offices/schools/restaurants too?', a: 'Residential households only (as prompted).', why: 'Excludes huge commercial/school volumes.' },
      { q: 'Do dining chairs, study/office chairs, and plastic balcony chairs all count?', a: 'Yes, all movable seating chairs (excluding sofas/beds).', why: 'Explains why an upper-middle home has 10+ chairs!' }
    ],
    strategyOverview: 'Clean Level-1 Household Inventory model! Convert Delhi Population (20M–30M) into Families/Households (÷ 4 or 5), segment by Income (Low, Lower-Mid, Upper-Mid, High), assign realistic Chairs per Household (2, 5, 10, 20), and sum across segments.',
    formula: 'Total Chairs = ∑ [(Delhi Pop ÷ Family Size) × Income % × Chairs per Household]',
    assumptions: [
      { label: 'Delhi Pop = 20M (NCT proper); Avg Family Size = 5 → 40 Lakh (4M) households', rationale: 'Or 30M ÷ 4 = 7.5M households if using NCR.' },
      { label: 'Income Split: Low 30% (1.2M HH), Lower-Mid 30% (1.2M HH), Upper-Mid 30% (1.2M HH), High 10% (0.4M HH)', rationale: 'Reflects wide housing size disparity in Delhi.' },
      { label: 'Chairs/HH: Low = 2, Lower-Mid = 5 (4 dining + 1 study), Upper-Mid = 10 (6 dining + 2 study + 2 balcony), High = 20', rationale: 'Counts dining, study, WFH, and plastic/patio chairs.' }
    ],
    tree: {
      label: 'Delhi Households (20M ÷ 5 = 4M Families)',
      valueText: '4M Families',
      children: [
        { label: 'Low Income (30% = 1.2M HH) × 2 chairs', valueText: '24 Lakh' },
        { label: 'Lower Middle (30% = 1.2M HH) × 5 chairs', valueText: '60 Lakh' },
        { label: 'Upper Middle (30% = 1.2M HH) × 10 chairs', valueText: '120 Lakh (1.2 Cr)', highlight: true },
        { label: 'High Income (10% = 0.4M HH) × 20 chairs', valueText: '80 Lakh' },
        { label: 'Total Household Chairs', valueText: '2.84 Crore (28.4 Million)', highlight: true }
      ]
    },
    finalAnswer: '~2.8 Crore – 4.5 Crore Household Chairs (28.4M for 20M pop)',
    acceptableRange: { min: 20, max: 65, unit: 'Million chairs', display: '20M – 65M chairs' },
    sanityCheck: '28.4M chairs ÷ 4M households = ~7.1 chairs per household (or ~1.4 chairs per person). A typical 4–5 person middle-class home easily owns 4–6 dining chairs + 1–2 study/plastic chairs = 6–8 chairs. Dead-on!',
    interviewerTrap: 'Forgetting WFH/study chairs and plastic chairs, or accidentally including sofas/commercial office chairs.',
    variations: [
      { question: 'How many chairs are there in total in Delhi (including offices & schools)?', hint: 'Add Students (~4M × 1.5 seats at school + tuition) + Office workers (~8M × 1 seat) + Restaurants/Public (~2M)!' },
      { question: 'Estimate annual replacement sales of plastic chairs in Delhi.', hint: 'Filter plastic share (~50%) ÷ ~5-year lifespan.' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Delhi Pop ÷ Family Size → Income Segmentation × Chairs per Family', correct: true, feedback: 'Super clean! Always convert to households for home furniture.' },
        { label: 'Furniture Shops in Delhi × 100', correct: false, feedback: 'Store inventory turns over weekly and doesn’t reflect installed household stock.' },
        { label: 'Trees in India ÷ 10', correct: false, feedback: 'Many chairs are plastic/metal and wood comes from nationwide supply.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'Delhi Population (M)', defaultVal: 20, min: 15, max: 35, step: 5, unit: 'M' },
        { key: 'hhSize', label: 'Family Size', defaultVal: 5, min: 3.5, max: 5.5, step: 0.5, unit: 'ppl' },
        { key: 'avgChairs', label: 'Weighted Avg Chairs / Family', defaultVal: 7.1, min: 4, max: 12, step: 0.5, unit: 'chairs' }
      ],
      computeFormulaText: '(Population ÷ Family Size) × Weighted Avg Chairs per Family',
      compute: (v) => {
        const hh = v.popM / v.hhSize;
        const chairs = hh * v.avgChairs;
        return {
          value: chairs,
          formatted: `${chairs.toFixed(1)} Million Chairs`,
          breakdown: [
            { label: 'Total Households', val: `${hh.toFixed(1)} Million` },
            { label: 'Chairs per Person', val: `${(chairs / v.popM).toFixed(2)}` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-srcc-metro',
    title: 'SRCC Students Traveling by Metro Everyday',
    prompt: 'Estimate the number of students in SRCC (or a large DU college) who travel by metro every day.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 42 (Book p. 38)',
    company: 'Nation with NaMo',
    difficulty: 2,
    archetype: 'Usage & Behavioral',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Campus', 'Delhi Metro', 'Commute', 'Student Life'],
    clarifyingQuestions: [
      { q: 'Are we estimating an average regular college day (adjusting for attendance)?', a: 'Regular academic day (book assumes 100% present; realistic ~75–85% attendance!).', why: 'Attendance rate is a great nuance to mention.' },
      { q: 'Include all UG + PG students?', a: 'Yes, entire enrolled student body (~3,500–4,000 students).', why: 'Avoids undercounting PG or B.Com/BA batches.' }
    ],
    strategyOverview: 'Micro-population Bottom-Up/Funnel! Start with Total Enrolled Students (3,500). Split immediately by Accommodation: Outstation students (~60% = 2,100) live in nearby hostels/PGs within walking/e-rickshaw distance of North Campus (~0% Metro) vs Local Delhi NCR Day Scholars (~40% = 1,400). Segment Day Scholars by Income (Low 40%, Mid 50%, High 10%) and apply Metro mode share for each tier.',
    formula: 'Metro Users = Total Students × Day-Scholar % × ∑ (Income % × Metro Mode Share %)',
    assumptions: [
      { label: 'Total Students = 3,500 (approx. 1,000 per UG year + ~500 PG)', rationale: 'Typical large DU college size.' },
      { label: '60% Outstation (live in Vijay Nagar / Hudson Lane / Hostels → walk/e-rickshaw), 40% Delhi Locals (1,400)', rationale: 'Outstation students don’t commute across the city daily.' },
      { label: 'Income Metro Split (on 1,400 locals): Low (40% = 560, 30% Metro = 168), Mid (50% = 700, 40% Metro = 280), High (10% = 140, 40% Metro = 56)', rationale: 'Low income often prefers cheaper DTC bus; High income mixes Metro & personal cars/cabs.' }
    ],
    tree: {
      label: 'Total SRCC Students (3,500)',
      valueText: '3,500 students',
      children: [
        { label: 'Outstation in Nearby PGs/Hostels (60% = 2,100)', valueText: '0 Metro (walk/e-rickshaw)', muted: true },
        {
          label: 'Delhi Locals / Day Scholars (40% = 1,400)',
          valueText: '1,400',
          children: [
            { label: 'Low Income (560 × 30% Metro)', valueText: '168 students' },
            { label: 'Middle Income (700 × 40% Metro)', valueText: '280 students', highlight: true },
            { label: 'High Income (140 × 40% Metro)', valueText: '56 students' }
          ]
        },
        { label: 'Total Daily Metro Commuters', valueText: '504 Students / Day', highlight: true }
      ]
    },
    finalAnswer: '~504 Students/day (~14–15% of total student body)',
    acceptableRange: { min: 350, max: 900, unit: 'Students/day', display: '350 – 900 students/day' },
    sanityCheck: 'Vishwavidyalaya Metro station serves ~10 North Campus colleges (~50,000 total students). At ~15–20% daily metro commuters per college, that’s ~7,500–10,000 student riders/day at Vishwavidyalaya station—super realistic!',
    interviewerTrap: 'Assuming ALL 3,500 students live all over Delhi and commute by metro—ignoring that 50–60% of DU students live in walking-distance PGs/hostels around Kamla Nagar & Hudson Lane!',
    variations: [
      { question: 'What if average daily college attendance is 75%?', hint: '504 × 0.75 = ~378 students/day.' },
      { question: 'Estimate daily Metro riders across ALL North Campus DU colleges.', hint: '10 colleges × 5,000 avg students = 50,000 students → ~10,540 metro commuters/day (see Problem #26)!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Total Students → Outstation PGs vs Day Scholars → Income/Distance Mode Split (Bus/Metro/Car)', correct: true, feedback: 'Nailed it! Separating outstation PG residents from day scholars is the key insight.' },
        { label: 'Seats on Yellow Line Metro ÷ 10', correct: false, feedback: 'Yellow Line serves millions of general commuters, not just one college.' },
        { label: 'Total Students × 80%', correct: false, feedback: 'Way too high—most DU students live next to campus in hostels/PGs!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'students', label: 'Total Enrolled Students', defaultVal: 3500, min: 2000, max: 6000, step: 500, unit: 'ppl' },
        { key: 'localPct', label: 'Delhi Day-Scholar %', defaultVal: 40, min: 20, max: 70, step: 5, unit: '%' },
        { key: 'attendPct', label: 'Daily Attendance %', defaultVal: 85, min: 60, max: 100, step: 5, unit: '%' },
        { key: 'metroShare', label: 'Metro Share (among Locals) %', defaultVal: 40, min: 20, max: 70, step: 5, unit: '%' }
      ],
      computeFormulaText: 'Students × Local% × Attendance% × Metro Share%',
      compute: (v) => {
        const riders = v.students * (v.localPct / 100) * (v.attendPct / 100) * (v.metroShare / 100);
        return {
          value: riders,
          formatted: `${Math.round(riders)} Students/Day`,
          breakdown: [
            { label: 'Day Scholars Present', val: `${Math.round(v.students * v.localPct/100 * v.attendPct/100)}` },
            { label: '% of Total College', val: `${((riders / v.students) * 100).toFixed(1)}%` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-wine-bottles',
    title: 'Number of Wine Bottles Sold in India in a Year',
    prompt: 'Estimate the number of wine bottles sold in India in one year.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 43 (Book p. 39)',
    company: 'Nation with NaMo',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Alco-Bev', 'India', 'Luxury Segment', 'Sanity Check Crucial'],
    clarifyingQuestions: [
      { q: 'Wine ONLY (grape/fruit wine), excluding whiskey, beer, vodka & country liquor?', a: 'Yes, grape/table wine only (very niche compared to whiskey/beer in India!).', why: 'Wine is <1–2% of total Indian alcohol consumption!' },
      { q: '750ml bottles only, excluding cans/tetra packs/barrels?', a: 'Yes, standard wine bottles (~80% of wine sold).', why: 'Adjusts container format cleanly.' }
    ],
    strategyOverview: 'Top-Down Niche Alcohol Funnel! Start with 1.4B population → filter to Legal Drinking Age 21+ (~65%) → filter to Upper/Upper-Middle Urban (~15–20% max, since wine is a luxury niche in India) → filter Alcohol Drinkers (~30%) → Wine Preference Share (~10–15% of urban affluent drinkers, as whiskey/beer dominate!) → Bottles/Year (e.g. 4–12 bottles/yr for casual/regular wine drinkers) × 80% bottle share.',
    formula: 'Bottles = India Pop × Legal Age % × Target Urban Affluent % × Drinker % × Wine Share % × Bottles/Yr × Bottle Format %',
    assumptions: [
      { label: 'Book Note: Vol 1 PDF arrived at 3.13 BILLION bottles/yr (assuming 40 bottles/yr across 98M wine drinkers!!)—Wait, let’s sanity check!', rationale: '3.13B bottles = ~2.3 billion liters of wine, which is more than FRANCE or ITALY drinks! Real India wine consumption is ~30–50 Million liters (~40–70 Million bottles/year)!' },
      { label: 'Realistic India Wine Funnel: 1.4B × 65% (21+) × 15% (Urban Upper/Upper-Mid) × 30% (Alcohol Drinkers) × 15% (Drink Wine) ≈ 6.1M wine drinkers', rationale: 'Wine is heavily concentrated in Mumbai, Delhi NCR, Bengaluru, Pune, Goa.' },
      { label: 'Frequency: ~6–10 bottles/yr per wine drinker (occasional 2–4, regular 15–20) × 85% in bottles', rationale: 'Gives ~40–60 Million bottles/year!' }
    ],
    tree: {
      label: 'India Population (1.4B)',
      valueText: '1,400M',
      children: [
        { label: 'Age 21+ (65%) × Urban Affluent (15%)', valueText: '~136.5M' },
        { label: 'Alcohol Drinkers (30%) × Wine Drinkers (15%)', valueText: '~6.1M Wine Drinkers', highlight: true },
        { label: '× ~8 bottles/yr × 85% Bottle format', valueText: '~42–50 Million Bottles/Yr', highlight: true },
        { label: '[Vol 1 PDF Answer: 3.13 Billion — 60x too high!]', valueText: 'Use Sanity Check to avoid!', muted: true }
      ]
    },
    finalAnswer: '~40 – 65 Million Bottles/Year realistically [Book PDF printed 3.13 Billion]',
    acceptableRange: { min: 25, max: 120, unit: 'Million bottles/year', display: '25M – 120M bottles/year (realistic)' },
    sanityCheck: 'CRITICAL SANITY CHECK: Sula Vineyards holds ~55–60% of India’s domestic wine market and sells ~1.2–1.5 Million cases (~15–18M bottles/year)! That means the ENTIRE Indian wine market is ~30–50 Million bottles/year—NOT 3.13 Billion! Checking global analogies (France drinks ~3B bottles/yr; India prefers whiskey/beer) protects you from a 60x blunder.',
    interviewerTrap: 'Vol 1 PDF fell into a classic beginner trap: assuming 100M Indians each drink 40 bottles of wine/year (~1 bottle every week!), forgetting that 85%+ of Indian alcohol drinkers consume spirits/beer, not grape wine!',
    variations: [
      { question: 'Estimate the market size of Sula Vineyards in India.', hint: '~45M bottles × 50% share × ₹700 retail ≈ ~₹1,500 Cr retail (~₹600 Cr net company revenue).' },
      { question: 'Estimate total beer bottles consumed in India annually.', hint: 'Much larger mass market (~300–400 Million cases = ~3.5–4.5 Billion bottles/year).' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Pop → Legal Age 21+ → Urban Upper/Upper-Mid → Alcohol Drinkers → Wine Niche Share (~10–15%) × Bottles/Yr', correct: true, feedback: 'Yes! Separating "Alcohol Drinkers" from "Wine Drinkers" avoids overestimating by 50x!' },
        { label: 'Total Grapes Grown in Nashik ÷ 1 kg', correct: false, feedback: 'Most grapes in India are eaten as table fruit or dried into raisins, not fermented into wine.' },
        { label: 'All Adults × 40 Bottles/Yr', correct: false, feedback: 'That would make India consume more wine than France and Italy combined!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'India Population (M)', defaultVal: 1400, min: 1300, max: 1500, step: 50, unit: 'M' },
        { key: 'affluentAdultPct', label: 'Urban Affluent 21+ %', defaultVal: 10, min: 5, max: 20, step: 2.5, unit: '%' },
        { key: 'alcPct', label: '% Drinking Alcohol', defaultVal: 30, min: 15, max: 45, step: 5, unit: '%' },
        { key: 'wineShare', label: '% Choosing Wine', defaultVal: 15, min: 5, max: 30, step: 5, unit: '%' },
        { key: 'bottlesYr', label: 'Avg Bottles / Wine Drinker / Yr', defaultVal: 8, min: 2, max: 20, step: 2, unit: 'btls' }
      ],
      computeFormulaText: 'Pop × Urban Affluent 21+% × Drinker% × Wine Share% × Bottles/Yr',
      compute: (v) => {
        const drinkers = v.popM * (v.affluentAdultPct / 100) * (v.alcPct / 100) * (v.wineShare / 100);
        const bottles = drinkers * v.bottlesYr;
        return {
          value: bottles,
          formatted: `${bottles.toFixed(1)} Million Bottles/Yr`,
          breakdown: [
            { label: 'Wine Drinkers in India', val: `${drinkers.toFixed(2)} Million` },
            { label: 'Est. Retail Value (@ ₹800)', val: `₹${Math.round(bottles * 80).toLocaleString('en-IN')} Cr` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-india-gate',
    title: 'Number of People That Visit India Gate in a Day',
    prompt: 'Estimate the number of people who visit India Gate in New Delhi on a given day.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 44 (Book p. 40)',
    company: 'Nation with NaMo',
    difficulty: 3,
    archetype: 'Supply & Capacity',
    approachType: 'Hybrid (Demand + Supply)',
    templateId: 'tpl-outlet',
    tags: ['Tourism', 'Landmark', 'Delhi', 'Footfall'],
    clarifyingQuestions: [
      { q: 'Are we estimating a regular weekday or a weekend/public holiday?', a: 'A normal weekday (mention weekends can be 1.5x–2x higher).', why: 'Picnic footfall spikes hugely on Sat/Sun evenings.' },
      { q: 'Count pedestrians entering Kartavya Path / India Gate lawns, or drive-bys too?', a: 'Actual visitors stopping/walking at the monument grounds.', why: 'Excludes passing commuters on the roundabout.' }
    ],
    strategyOverview: 'Two-segment Demand Funnel (Local Delhi Residents + Daily Tourists) OR Supply-Side Hourly Lawn Capacity cross-check! Segment 1 (Tourists): ~1 Lakh daily tourists in Delhi × ~50–70% visit iconic India Gate (~60,000). Segment 2 (Locals): 20M–30M residents → ~1–2% visit a leisure spot on a weekday ÷ ~10 major hangout spots (~30,000–50,000). Total ≈ 90,000–1,20,000 visitors/day!',
    formula: 'Daily Visitors = (Daily Tourists × India Gate Visit %) + (Local Leisure Seekers ÷ Major Spots)',
    assumptions: [
      { label: 'Daily Tourists in Delhi = ~1,00,000 (1 Lakh); ~60–75% visit India Gate (must-see landmark)', rationale: 'India Gate is #1 free landmark on almost every tourist itinerary (60K–75K).' },
      { label: 'Local Residents = 20M (Lower 10M, Middle 8M, High 2M); weekday leisure outing rate ~1–2%', rationale: 'Middle & lower-middle families frequent India Gate as it is free and central.' },
      { label: '10 major leisure landmarks in Delhi (India Gate, CP, Red Fort, Qutub, Lotus Temple, Akshardham, etc.)', rationale: 'Allocates ~40K–50K local visitors to India Gate.' }
    ],
    tree: {
      label: 'Daily India Gate Visitors',
      valueText: '~1,16,500 Visitors/Day',
      children: [
        { label: 'Tourists in Delhi (1,00,000/day × ~60–70% share)', valueText: '~65,000 tourists', highlight: true },
        { label: 'Local Delhiites (20M × ~2.5% out for leisure ÷ 10 spots)', valueText: '~50,000 locals', highlight: true },
        { label: 'Total Daily Footfall', valueText: '~1.15 Lakh Visitors/Day', highlight: true }
      ]
    },
    finalAnswer: '~80,000 – 1,20,000 Visitors/Day (Book: 1,16,500)',
    acceptableRange: { min: 40000, max: 180000, unit: 'Visitors/day', display: '40,000 – 1,80,000 visitors/day' },
    sanityCheck: 'Cross-check via Supply/Spatial Capacity! India Gate lawns span ~16 hours active (6 AM–10 PM). Peak evening 4 hrs (6–10 PM) holds ~15,000 people at a time turning over every 60–90 mins (~45K–60K evening visitors) + ~40K daytime visitors = ~90,000–1,00,000/day! Matches closely.',
    interviewerTrap: 'Forgetting to separate TOURISTS from LOCALS! Tourists have a 60–80% probability of visiting India Gate, while locals have <0.3% probability on any random Tuesday.',
    variations: [
      { question: 'Estimate daily ice-cream sales at India Gate.', hint: '1,16,500 visitors × ~20% buying ice cream (summer) × ₹40 = ~₹9.3 Lakh/day!' },
      { question: 'How many people visit Taj Mahal in a day?', hint: 'Agra tourists (~30K–40K/day) × ~80% ticketed visitors ≈ ~25,000–35,000/day.' }
    ],
    guidedPractice: {
      correctApproach: 'Hybrid (Demand + Supply)',
      funnelOptions: [
        { label: 'Split into Tourists (high visit %) + Local Delhiites (leisure % ÷ top spots), verified by lawn capacity', correct: true, feedback: 'Spot on! Separating tourists from locals makes your assumptions completely defensible.' },
        { label: 'Delhi Population × 10%', correct: false, feedback: '2 million people visiting India Gate EVERY single day would cause a stampede!' },
        { label: 'Cars on Rajpath × 4', correct: false, feedback: 'Most visitors arrive via Central Secretariat/Janpath Metro and buses, not private cars.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'touristsK', label: 'Daily Tourists in Delhi (K)', defaultVal: 100, min: 40, max: 200, step: 10, unit: 'K' },
        { key: 'tourVisitPct', label: 'Tourist Visit %', defaultVal: 65, min: 40, max: 90, step: 5, unit: '%' },
        { key: 'localPopM', label: 'Delhi Local Pop (M)', defaultVal: 20, min: 15, max: 35, step: 5, unit: 'M' },
        { key: 'localVisitPct', label: '% Locals Visiting Today', defaultVal: 0.25, min: 0.1, max: 0.6, step: 0.05, unit: '%' }
      ],
      computeFormulaText: '(Tourists × Visit%) + (Local Pop × Local Daily Visit%)',
      compute: (v) => {
        const t = v.touristsK * 1000 * (v.tourVisitPct / 100);
        const l = v.localPopM * 1e6 * (v.localVisitPct / 100);
        const total = t + l;
        return {
          value: total,
          formatted: `${Math.round(total).toLocaleString('en-IN')} Visitors/Day`,
          breakdown: [
            { label: 'Tourists', val: `${Math.round(t).toLocaleString('en-IN')}` },
            { label: 'Locals', val: `${Math.round(l).toLocaleString('en-IN')}` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-du-north-campus-metro',
    title: 'Students Using Metro to Commute to DU North Campus',
    prompt: 'Estimate the number of students using the Delhi Metro to commute to North Campus colleges of Delhi University daily.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 45 (Book p. 41)',
    company: 'Nation with NaMo',
    difficulty: 2,
    archetype: 'Usage & Behavioral',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Education', 'Delhi Metro', 'DU North Campus', 'Accommodation Split'],
    clarifyingQuestions: [
      { q: 'Regular academic semester weekday?', a: 'Yes, regular working day (no exam/vacation dip).', why: 'Avoids seasonal outliers.' },
      { q: 'Which colleges are included in North Campus?', a: 'Major colleges around Vishwavidyalaya (~10 colleges: SRCC, Hindu, Stephens, Hansraj, Miranda, Ramjas, Kirori Mal, SGTB Khalsa, Daulat Ram, IP).', why: 'Bottom-up college count is super accurate!' }
    ],
    strategyOverview: 'Bottom-Up Campus Aggregation! Start with ~10 North Campus colleges × ~5,000 average enrolled students = 50,000 students. Segment by Accommodation: Hostels (3,000) + Nearby PGs (30,000) = 33,000 living nearby (walk/e-rickshaw). Remaining 17,000 are Day Scholars from across Delhi. Split Day Scholars by Income & Transport Preference to get Metro riders.',
    formula: 'Metro Commuters = (Colleges × Avg Students) × Day Scholar % × Long-Distance Commuter % × Metro Share %',
    assumptions: [
      { label: '10 Colleges × 5,000 students/college = 50,000 total students', rationale: 'Matches real DU North Campus student enrollment.' },
      { label: 'Accommodation Split: 6% Hostels (3,000), 60% PGs (30,000), 34% Day Scholars (17,000)', rationale: 'Only Day Scholars commute long distances via Metro.' },
      { label: 'Day Scholar Income & Metro Share: Low (32% = 5,440 → 30% Metro), Middle (44% = 7,480 → 90% Metro), High (4% = 680 → ~0–30% Metro) [or blended ~62% of 17K]', rationale: 'Middle-class day scholars rely overwhelmingly on Vishwavidyalaya Metro.' }
    ],
    tree: {
      label: 'DU North Campus (10 Colleges × 5,000 = 50,000)',
      valueText: '50,000 students',
      children: [
        { label: 'Hostels (3,000) + Nearby PGs (30,000)', valueText: '33,000 (walk/e-rickshaw)', muted: true },
        {
          label: 'Day Scholars (17,000)',
          valueText: '17,000',
          children: [
            { label: 'Low Income (5,440 × 30% Metro = 1,632)', valueText: '1,632' },
            { label: 'Middle Income (7,480 × 90% Metro = 6,732) + residual', valueText: '~8,900', highlight: true },
            { label: 'Total Daily Metro Commuters', valueText: '10,540 Students/Day', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~10,540 Students/Day (~21% of North Campus)',
    acceptableRange: { min: 7000, max: 16000, unit: 'Students/day', display: '7,000 – 16,000 students/day' },
    sanityCheck: 'Vishwavidyalaya station sees ~20,000–25,000 entries/exits on a normal college day (~10,000–12,000 unique round-trip commuters including faculty/staff). 10,540 students fits like a glove!',
    interviewerTrap: 'Notice in Vol 1 PDF, 5,440 + 7,480 + 680 = 13,600 (meaning ~20% of the 17,000 day scholars live nearby in North Delhi and walk/cycle!). Stating that explicitly makes your math sum cleanly to 100%.',
    variations: [
      { question: 'How many e-rickshaws operate around Vishwavidyalaya Metro station?', hint: '10,540 metro arrivals + 30,000 PG students taking short hops ÷ ~40 passengers/e-rickshaw/day ≈ ~500–800 e-rickshaws.' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'No. of Colleges × Students/College → Hostels/PGs vs Day Scholars → Commute Mode Split', correct: true, feedback: 'Perfect! Counting colleges bottom-up avoids guessing Delhi-wide student numbers.' },
        { label: 'Delhi Population × 1%', correct: false, feedback: 'Doesn’t capture North Campus’s specific PG concentration.' },
        { label: 'Metro Trains × 1,500', correct: false, feedback: 'Yellow Line carries commuters across the whole city, not just DU.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'colleges', label: 'Colleges in North Campus', defaultVal: 10, min: 6, max: 15, step: 1, unit: 'colleges' },
        { key: 'perCollege', label: 'Students / College', defaultVal: 5000, min: 3000, max: 7000, step: 500, unit: 'ppl' },
        { key: 'dayPct', label: 'Day Scholars %', defaultVal: 35, min: 20, max: 60, step: 5, unit: '%' },
        { key: 'metroPct', label: 'Metro Share (Day Scholars) %', defaultVal: 60, min: 30, max: 85, step: 5, unit: '%' }
      ],
      computeFormulaText: 'Colleges × Students/College × Day Scholar% × Metro%',
      compute: (v) => {
        const riders = v.colleges * v.perCollege * (v.dayPct / 100) * (v.metroPct / 100);
        return {
          value: riders,
          formatted: `${Math.round(riders).toLocaleString('en-IN')} Students/Day`,
          breakdown: [
            { label: 'Total North Campus Students', val: `${(v.colleges * v.perCollege).toLocaleString('en-IN')}` },
            { label: 'Total Day Scholars', val: `${Math.round(v.colleges * v.perCollege * v.dayPct/100).toLocaleString('en-IN')}` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-flights-day-delhi',
    title: 'Number of Flights Arriving/Departing Delhi Airport in a Day',
    prompt: 'Estimate the number of flights arriving at Delhi Airport in a single day.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 46 (Book p. 42)',
    company: 'Nation with NaMo',
    difficulty: 2,
    archetype: 'Supply & Capacity',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-bottleneck',
    tags: ['Aviation', 'Runway Bottleneck', 'Delhi IGI'],
    clarifyingQuestions: [
      { q: 'Arrivals ONLY, or combined movements (arrivals + departures)?', a: 'Arrivals (or departures, since daily arrivals ≈ departures!).', why: 'Always verify whether to divide total runway movements by 2.' },
      { q: 'Include both domestic and international flights?', a: 'Yes, all commercial flights.', why: 'Covers full airport runway utilization.' }
    ],
    strategyOverview: 'Runway/Terminal Throughput model! Split 24 hours into Peak (12 hrs: 8 AM–8 PM, 1 arrival every 10 min = 6/hr) and Non-Peak (12 hrs: 8 PM–8 AM, 1 every 30 min = 2/hr). Weighted average = 4 flights/hr × 24 hrs = 96 arrivals/runway/day. Multiply by active runways/terminals (book uses 3 terminals × 2 runways = 6 channels → 576 arrivals/day; note realistically IGI has 4 physical runways splitting arrivals & departures → ~650–700 arrivals/day!).',
    formula: 'Daily Arrivals = Active Channels × 24 hrs × Weighted Avg Arrivals/Hr',
    assumptions: [
      { label: 'Peak (12 hrs @ 10-min gap = 6/hr) + Non-Peak (12 hrs @ 30-min gap = 2/hr) → 4/hr weighted avg', rationale: 'Captures day vs red-eye night slowdown.' },
      { label: '3 Terminals × 2 Runways/Terminal (or 4 physical runways at ~15–20 total movements/hr each)', rationale: 'Note: In reality, runways belong to the AIRPORT (IGI has 4), not 2 per terminal—stating 4 airport runways avoids an aviation fact-check!' }
    ],
    tree: {
      label: 'IGI Operating Hours (24 hrs)',
      valueText: 'Weighted 4/hr/channel',
      children: [
        { label: 'Peak Hours (12 hrs, 10-min gap = 6/hr)', valueText: '72 flights' },
        { label: 'Non-Peak (12 hrs, 30-min gap = 2/hr)', valueText: '24 flights' },
        {
          label: '96 arrivals/day × 6 channels (Book: 3 term × 2 runways)',
          valueText: '576 Flights Arriving/Day',
          highlight: true
        }
      ]
    },
    finalAnswer: '~576 – 700 Arrivals/Day (~1,200–1,400 total movements)',
    acceptableRange: { min: 400, max: 900, unit: 'Arrivals/day', display: '400 – 900 arrivals/day' },
    sanityCheck: 'Delhi IGI handles ~1,300–1,400 total movements (half arrivals = ~650–700/day). 576 is within 15% of actual!',
    interviewerTrap: 'Saying "each terminal has 2 runways" (T1/T2/T3 share the airport’s 4 runways!). Using "4 shared runways at ~15 movements/hr peak, 50% arrivals" is even cleaner.',
    variations: [
      { question: 'How many domestic departures leave Delhi daily?', hint: 'See Vol 2 Problem #19: ~75% of ~600 departures = ~450 domestic departures/day.' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Runways × Operating Hours × Arrival Rate (Peak vs Non-Peak)', correct: true, feedback: 'Spot on! Runways are the physical bottleneck of any major airport.' },
        { label: 'Delhi Population × 5%', correct: false, feedback: 'Doesn’t account for transit flyers or airline scheduling capacity.' },
        { label: 'Baggage Carousels × 20', correct: false, feedback: 'Runway slot spacing is much cleaner and better-known than baggage belts.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'runways', label: 'Active Arrival Runways/Channels', defaultVal: 4, min: 2, max: 6, step: 1, unit: 'runways' },
        { key: 'peakGap', label: 'Peak Landing Gap (mins)', defaultVal: 6, min: 3, max: 12, step: 1, unit: 'mins' },
        { key: 'offGap', label: 'Night Landing Gap (mins)', defaultVal: 20, min: 10, max: 40, step: 5, unit: 'mins' }
      ],
      computeFormulaText: 'Runways × [(12h × 60÷PeakGap) + (12h × 60÷OffGap)]',
      compute: (v) => {
        const daily = v.runways * (12 * (60 / v.peakGap) + 12 * (60 / v.offGap));
        return {
          value: daily,
          formatted: `${Math.round(daily)} Arrivals/Day`,
          breakdown: [
            { label: 'Peak Arrivals/Hr/Runway', val: `${(60 / v.peakGap).toFixed(1)}` },
            { label: 'Total Movements (Arr + Dep)', val: `${Math.round(daily * 2).toLocaleString('en-IN')}/day` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-sarvana-bhavana',
    title: 'Monthly Revenue of a Saravana Bhavan Outlet',
    prompt: 'Estimate the monthly revenue of a single Saravana Bhavan restaurant outlet.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 47–48 (Book p. 43–44)',
    company: 'Nation with NaMo',
    difficulty: 3,
    archetype: 'Revenue & Cost',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-outlet',
    tags: ['Restaurant', 'QSR', 'Occupancy', 'Weighted Ticket'],
    clarifyingQuestions: [
      { q: 'Dine-in only, or include takeaway/Zomato/Swiggy delivery?', a: 'Focus on Dine-in capacity first (optionally add 20–30% delivery uplift).', why: 'Matches book framework cleanly.' },
      { q: 'Standard city outlet size (e.g. Connaught Place / Chennai)?', a: 'Busy urban outlet serving ~120 seats/customers per hour at 100% capacity.', why: 'South Indian tiffin outlets turn tables fast (~30 min/meal)!' }
    ],
    strategyOverview: 'Restaurant Supply-Side Capacity model! 11 operating hours/day (10 AM–11 PM — note 10 AM–11 PM is 13 hrs, or 11 hrs net active). Split Weekdays (22 days) into Peak (4 hrs @ 100% occupancy) and Non-Peak (7 hrs @ 50% occupancy). Weekends (8 days) see 1.5x weekday daily average (900 × 1.5 = 1,350/day). Compute Weighted Average Order Value across Coffee (30% @ ₹100), Dosa (50% @ ₹200), Special Dosa (20% @ ₹300) = ₹190/customer → Total Revenue!',
    formula: 'Monthly Rev = [(Weekday Pax × 22) + (Weekend Pax × 8)] × Weighted Avg Spend',
    assumptions: [
      { label: 'Max Capacity = 120 customers/hour (e.g., 60 seats turning over every 30 minutes!)', rationale: 'Quick-turnover South Indian restaurants turn tables in ~25–30 mins.' },
      { label: 'Weekday (22 days): 4 Peak hrs (100% = 480) + 7 Non-Peak hrs (50% = 420) = 900 pax/day (19,800/mo)', rationale: 'Lunch/dinner & evening tiffin rush drive peaks.' },
      { label: 'Weekend (8 days): 1.5× weekday volume = 1,350 pax/day (10,800/mo) → 30,600 monthly diners', rationale: 'Wait—check physical cap! 1,350 pax/day ÷ (11 hrs × 120) = ~102% utilization—slightly over 100%, or simply extend weekend operating hours slightly!' },
      { label: 'Weighted Avg Spend = 0.3(₹100) + 0.5(₹200) + 0.2(₹300) = ₹190/person', rationale: 'Or ~₹250–300 if including GST + beverages + sides.' }
    ],
    tree: {
      label: 'Monthly Customers (30 Days)',
      valueText: '30,600 Customers',
      children: [
        { label: 'Weekdays (22d × 900 pax/day)', valueText: '19,800 pax' },
        { label: 'Weekends (8d × 1,350 pax/day)', valueText: '10,800 pax' },
        {
          label: 'Weighted Avg Order = ₹190',
          valueText: '₹190/customer',
          children: [
            { label: 'Total Monthly Revenue', valueText: '₹58.14 Lakh / Month', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~₹58.14 Lakh/month (~₹7 Crore/year)',
    acceptableRange: { min: 25, max: 90, unit: '₹ Lakh/month', display: '₹25 Lakh – ₹90 Lakh/month' },
    sanityCheck: 'Wait: 1,350 customers/day on weekends exceeds 11 hrs × 120/hr (1,320 max capacity)! Good interviewers notice that! Saying "On weekends, occupancy hits ~90% across 11–12 hours (~1,200 pax/day), not 102%" shows sharp capacity realism while still yielding ~₹55–60 Lakh/month!',
    interviewerTrap: 'Assuming Weekend = 1.5 × Weekday without checking if 1.5× breaches 100% physical seating capacity! Never exceed 100% occupancy.',
    variations: [
      { question: 'What if Zomato/Swiggy adds 25% incremental orders?', hint: '₹58L × 1.25 ≈ ~₹72.5 Lakh gross sales (minus ~22% aggregator commission).' },
      { question: 'Estimate monthly profit margin of the outlet.', hint: 'Food COGS (~30%) + Rent (~12%) + Staff (~20%) + Utilities (~8%) = ~25–30% EBITDA (~₹15L/mo).' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Seats ÷ Meal Duration × Operating Hours × Peak/Off-Peak Occupancy × Weighted Avg Bill', correct: true, feedback: 'Spot on! Just make sure weekend traffic stays ≤ 100% of physical capacity!' },
        { label: 'City Population × South Indian Population %', correct: false, feedback: 'People of all backgrounds eat dosas, and we only want ONE outlet’s revenue.' },
        { label: 'Number of Chefs × ₹5 Lakh', correct: false, feedback: 'Revenue is bottlenecked by customer seating/table turnover first.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'seats', label: 'Seating Capacity', defaultVal: 60, min: 30, max: 120, step: 10, unit: 'seats' },
        { key: 'turnMins', label: 'Avg Meal Duration (mins)', defaultVal: 30, min: 20, max: 60, step: 5, unit: 'mins' },
        { key: 'wdOcc', label: 'Weekday Avg Occupancy %', defaultVal: 68, min: 30, max: 90, step: 5, unit: '%' },
        { key: 'weOcc', label: 'Weekend Avg Occupancy %', defaultVal: 90, min: 50, max: 100, step: 5, unit: '%' },
        { key: 'aov', label: 'Weighted Avg Spend (₹)', defaultVal: 190, min: 120, max: 400, step: 10, unit: '₹' }
      ],
      computeFormulaText: 'Seats × (60÷Turn) × 11h × (22×WD% + 8×WE%) × Avg Spend',
      compute: (v) => {
        const capPerDay = v.seats * (60 / v.turnMins) * 11;
        const custs = capPerDay * (22 * (v.wdOcc / 100) + 8 * (v.weOcc / 100));
        const revLakh = (custs * v.aov) / 1e5;
        return {
          value: revLakh,
          formatted: `₹${revLakh.toFixed(1)} Lakh/Mo`,
          breakdown: [
            { label: 'Monthly Diners', val: `${Math.round(custs).toLocaleString('en-IN')}` },
            { label: 'Daily Avg Revenue', val: `₹${Math.round(revLakh * 1e5 / 30).toLocaleString('en-IN')}` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-quick-commerce',
    title: 'Market Size of Quick Commerce in India (Users)',
    prompt: 'Estimate the market size (active user base / GMV) of Quick Commerce (Blinkit, Zepto, Instamart) in India.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 50 (Book p. 46)',
    company: 'RedSeer',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Quick Commerce', 'Blinkit/Zepto', 'Urban Tiering', 'RedSeer'],
    clarifyingQuestions: [
      { q: 'Are we estimating active users or annual Gross Order Value (₹)?', a: 'Active/potential user base first (then multiply by orders/month × AOV for revenue!).', why: 'Matches RedSeer user sizing.' },
      { q: 'Include Tier 2/3 towns or Metro + Tier 1 cities only?', a: 'Metro + Tier 1 cities primarily (where 10-min dark stores exist).', why: 'Quick commerce unit economics currently require dense Tier-1/Metro clusters.' }
    ],
    strategyOverview: 'Top-Down Geographic + Age Funnel! Start with India Urban Population (~30% of 1.4B = 420M — note Vol 1 printed 1.4B at top and then correctly used 420M’s slices below!). Segment Urban into Metros (10% of Urban or ~40M — book uses 40M), Tier 1 (50% = 220M), Tier 2/3 (40% = 160M, excluded for dark stores). Within Metro & Tier 1, apply Age Segmentation (0–30: 40%, 30–50: 30%, 50+: 30%) and realistic Adoption rates (90%/70%/20% in Metro; 70%/50%/0% in Tier 1).',
    formula: 'Users = ∑ [Eligible City Tier Pop × Age Share % × Q-Comm Adoption %]',
    assumptions: [
      { label: 'India Urban Pop ≈ 420M (30% of 1.4B); Rural (70%) has zero 10-min dark stores', rationale: 'Dark stores need ~3,000+ dense households within a 2–3 km radius.' },
      { label: 'Metro (40M: 0–30 = 16M, 30–50 = 12M, 50+ = 12M) & Tier 1 (220M: 0–30 = 80M, 30–50 = 60M, 50+ = 80M)', rationale: 'Matches Vol 1 numerical branches (14.4M + 8.4M + 2.4M = 25.2M Metro; 56M + 30M = 86M Tier 1).' },
      { label: 'Note: Converting Users → Households (÷4) + Affordability filter gives ~25–30M ordering households!', rationale: 'Crucial distinction for GMV calculation!' }
    ],
    tree: {
      label: 'India Urban Pop (~420M) [Dark Store Cities Only]',
      valueText: '260M Metro + T1',
      children: [
        {
          label: 'Metro Cities (~40M)',
          valueText: '25.2M users',
          children: [
            { label: '0–30 (16M × 90%) + 30–50 (12M × 70%) + 50+ (12M × 20%)', valueText: '14.4M + 8.4M + 2.4M' }
          ]
        },
        {
          label: 'Tier 1 Cities (~220M)',
          valueText: '86M users',
          children: [
            { label: '0–30 (80M × 70%) + 30–50 (60M × 50%) + 50+ (0%)', valueText: '56M + 30M', highlight: true }
          ]
        },
        { label: 'Total Addressable Q-Comm Users (Book)', valueText: '111.2 Million (TAM)', highlight: true }
      ]
    },
    finalAnswer: '~111.2M TAM individuals (~25–35M active ordering households; ~₹40,000–60,000 Cr GMV)',
    acceptableRange: { min: 25, max: 130, unit: 'Million users', display: '25M (active HH) – 120M (individual TAM)' },
    sanityCheck: 'India’s quick commerce market (Blinkit + Zepto + Swiggy Instamart + BB Now) hit ~$5–7 Billion GMV (~₹45,000–60,000 Cr) with ~25–30 Million monthly transacting households! If 111M individuals represent ~3.5 people/household, 111M ÷ 3.5 ≈ 31M households! Dead-on.',
    interviewerTrap: 'Vol 1 forgot to divide by Household Size (or filter Income/Children 0–15!) before applying 90% adoption—an 8-year-old doesn’t order groceries on Blinkit! Always add a 15+ or Household filter for clean realism.',
    variations: [
      { question: 'Estimate Blinkit’s annual GMV in India.', hint: '30M households × ~3 orders/month × 12 × ₹600 AOV × ~45% Blinkit share ≈ ~₹29,000 Cr.' },
      { question: 'How many dark stores does Zepto need in Bengaluru?', hint: 'Bengaluru area ~700 sq km ÷ ~12 sq km per 2-km radius dark store ≈ ~60–100 dark stores (more in dense pockets).' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Urban Pop → Metro & Tier-1 Only → Household/Age Eligibility → Tech & Income Adoption', correct: true, feedback: 'Spot on! Excluding Rural and Tier-3 cities immediately shows business intuition about dark-store unit economics.' },
        { label: 'All 1.4B Indians × 50%', correct: false, feedback: 'Rural India does not have 10-minute dark-store delivery infrastructure!' },
        { label: 'Delivery Bikes × 5', correct: false, feedback: 'You wouldn’t know bike count nationwide without sizing order volume first.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'urbanM', label: 'Metro + Tier-1 Urban Pop (M)', defaultVal: 260, min: 150, max: 400, step: 20, unit: 'M' },
        { key: 'hhSize', label: 'Household Size', defaultVal: 4, min: 3, max: 5, step: 0.5, unit: 'ppl' },
        { key: 'adoptPct', label: 'Affluent Q-Comm Adoption %', defaultVal: 45, min: 20, max: 70, step: 5, unit: '%' },
        { key: 'ordersMo', label: 'Orders / Household / Month', defaultVal: 3, min: 1, max: 8, step: 0.5, unit: '/mo' },
        { key: 'aov', label: 'Avg Order Value (₹)', defaultVal: 600, min: 300, max: 1000, step: 50, unit: '₹' }
      ],
      computeFormulaText: '(Metro+T1 Pop ÷ HH) × Adoption% × Orders/Mo × 12 × AOV',
      compute: (v) => {
        const hhUsers = (v.urbanM / v.hhSize) * (v.adoptPct / 100);
        const gmvCr = (hhUsers * 1e6 * v.ordersMo * 12 * v.aov) / 1e7;
        return {
          value: hhUsers,
          formatted: `${hhUsers.toFixed(1)}M HH (~₹${Math.round(gmvCr).toLocaleString('en-IN')} Cr GMV)`,
          breakdown: [
            { label: 'Individual Reach (×4)', val: `${(hhUsers * v.hhSize).toFixed(1)} Million` },
            { label: 'Monthly Orders', val: `${(hhUsers * v.ordersMo).toFixed(1)} Million` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-digital-ad-market',
    title: 'Size of Non-Traditional (Digital) Advertising Market in India',
    prompt: 'Estimate the size (ad impressions or revenue) of the advertising market on platforms other than traditional media (TV/Print/Outdoor) in India.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 51 (Book p. 47)',
    company: 'RedSeer',
    difficulty: 4,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['AdTech', 'Digital Media', 'Impressions', 'RedSeer'],
    clarifyingQuestions: [
      { q: 'Measure in total daily/annual Ad Impressions OR ₹ Ad Revenue?', a: 'Clarify! Book computes Daily Ad Impressions (~25,225 Billion? Wait—let’s check units!), whereas revenue requires CPM (~₹50–150 per 1,000 impressions).', why: 'Unit errors explode here if you don’t separate impressions vs ₹!' },
      { q: 'Which digital platforms are covered?', a: 'Social Media (Meta/YouTube), OTT, Mobile Apps, and E-commerce (Amazon/Flipkart ads).', why: 'Covers full digital ad ecosystem.' }
    ],
    strategyOverview: 'Digital Impression → CPM Monetization model! Start with India Internet Users (~750M–1.05B) → Active daily users across OTT, Social Media, Apps, and E-commerce → Avg Hours Spent per Day on ad-supported platforms (~2–3 hrs/day total across platforms!) × Ads Encountered per Hour (e.g., ~25–30 ads/hr) × 365 days × Blended CPM (₹50–100 per 1,000 impressions) = Annual Digital Ad Market Revenue!',
    formula: 'Annual Ad Revenue = Active Digital Users × Daily Ad-Supported Hours × Ads/Hr × 365 × (CPM ÷ 1,000)',
    assumptions: [
      { label: 'Active Internet Users = 750M–882M (Book: 1.4B × 75% internet × ~84% active)', rationale: 'Note: In Vol 1 PDF, adding individual platform hours (11 hrs/day?!) and calling 252B impressions "Billions" gave 25,225.2 Billion! Let’s be realistic: people spend ~2.5–3 hrs/day on ad-supported apps total!' },
      { label: 'Daily Time on Ad-Supported Digital Platforms ≈ 2.5 hours/day; ~20 ads/hour = 50 ads/day', rationale: 'Instagram Reels, YouTube pre-roll/mid-roll, OTT AVOD, and Amazon sponsored listings.' },
      { label: 'Blended CPM (Cost per 1,000 impressions) ≈ ₹40–60 (including low-cost display & high-cost video/search)', rationale: 'India digital CPMs average ~$0.50–$1.00 = ₹40–80.' }
    ],
    tree: {
      label: 'Active Digital Users in India (~750M)',
      valueText: '750M Users',
      children: [
        { label: 'Avg Time on Ad-Supported Apps (Social/YT/OTT/E-comm)', valueText: '2.5 hrs/day' },
        { label: 'Ads Encountered per Hour', valueText: '20 ads/hr → 50 ads/day/user' },
        {
          label: 'Total Daily Impressions = 37.5 Billion/day (~13.7 Trillion/yr)',
          valueText: '13.7T impressions/yr',
          children: [
            { label: '× Blended CPM ₹50 per 1,000 impressions', valueText: '~₹68,500 Crore/Yr (Book: 252B/day impr.)', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~₹60,000 – ₹80,000 Crore/Year (~37B–252B daily ad impressions)',
    acceptableRange: { min: 35000, max: 120000, unit: '₹ Crore/year', display: '₹35,000 Cr – ₹1,20,000 Cr/yr' },
    sanityCheck: 'India’s total digital advertising market (Google + Meta + Amazon + OTT) is roughly ₹50,000–65,000 Crore/year! Multiplying impressions by realistic ₹40–50 CPM lands right on the money. Remember in Vol 1 PDF: 882M × 11 hrs × 26 ads = 252 Billion/day (the PDF wrote "25,225.2 Billion" by misplacing a decimal!).',
    interviewerTrap: 'Double-counting time spent across platforms (nobody spends 11 hours/day actively watching ads!) OR forgetting to convert Impressions into ₹ Revenue via CPM (Cost per Mille).',
    variations: [
      { question: 'Estimate YouTube’s ad revenue in India.', hint: '~450M monthly YouTube users × 45 min/day × ~6 video ads/hr × 365 × ₹120 CPM ≈ ~₹10,000–15,000 Cr.' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Internet Users × Daily Ad-Supported Hours × Ads/Hr × 365 × (CPM ÷ 1,000)', correct: true, feedback: 'Textbook AdTech sizing! Using Impressions × CPM is the gold standard in PM/Consulting interviews.' },
        { label: 'Number of Marketing Agencies × ₹10 Crore', correct: false, feedback: 'Agencies vary hugely and self-serve SME Google/Meta ads bypass agencies completely.' },
        { label: 'TV Ad Market ÷ 2', correct: false, feedback: 'Digital has already overtaken TV in India—never blindly scale down from TV!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'usersM', label: 'Active Internet Users (M)', defaultVal: 750, min: 500, max: 1000, step: 50, unit: 'M' },
        { key: 'hrsDay', label: 'Daily Digital Hours', defaultVal: 2.5, min: 1, max: 5, step: 0.5, unit: 'hrs' },
        { key: 'adsHr', label: 'Ads per Hour', defaultVal: 20, min: 10, max: 40, step: 5, unit: 'ads' },
        { key: 'cpm', label: 'Blended CPM (₹ / 1,000)', defaultVal: 45, min: 20, max: 100, step: 5, unit: '₹' }
      ],
      computeFormulaText: 'Users × Hours/Day × Ads/Hr × 365 × (CPM ÷ 1,000)',
      compute: (v) => {
        const imprYrB = (v.usersM * 1e6 * v.hrsDay * v.adsHr * 365) / 1e9;
        const revCr = ((imprYrB * 1e9) / 1000 * v.cpm) / 1e7;
        return {
          value: revCr,
          formatted: `₹${Math.round(revCr).toLocaleString('en-IN')} Crore/Yr`,
          breakdown: [
            { label: 'Daily Impressions', val: `${(imprYrB / 365).toFixed(1)} Billion/day` },
            { label: 'Annual Impressions', val: `${(imprYrB / 1000).toFixed(2)} Trillion` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-animation-vfx',
    title: 'Size of Animation & VFX Market in India (Viewer Reach / Value)',
    prompt: 'Estimate the size of the Animation and VFX market in India.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 52 (Book p. 48)',
    company: 'RedSeer',
    difficulty: 4,
    archetype: 'Market Sizing',
    approachType: 'Hybrid (Demand + Supply)',
    templateId: 'tpl-outlet',
    tags: ['Media & VFX', 'Studio Capacity', 'B2B / Consumer', 'RedSeer'],
    clarifyingQuestions: [
      { q: 'Are we sizing India’s VFX/Animation STUDIO production revenue (B2B domestic + exports), or viewer consumption?', a: 'Clarify! Book calculates total consumer content views (~4.18B content units); in an interview, also offer Supply-Side Studio Production Revenue (studios × artists × billing)!', why: 'B2B VFX studios earn revenue per project/artist-hour, not per viewer!' },
      { q: 'Include Movies, TV shows, Cartoons, and Gaming?', a: 'Yes, all animated/VFX-heavy media.', why: 'Covers full entertainment spectrum.' }
    ],
    strategyOverview: 'Compare both lenses: (1) Book Demand/Reach view: Segment Urban/Rural population by Age (5–15, 15–40, 45+) across Movies, TV Shows, and Cartoons → total ~4.18B viewing instances. (2) Supply-Side B2B Studio Revenue view (stronger for business interviews!): ~300 Bollywood + ~1,500 Regional movies + TV/OTT + Gaming/Global Outsourcing → VFX budget per title (~₹5–20 Cr for tentpoles, ₹1 Cr for mid, ₹20L for low) OR ~50,000 VFX artists × ₹25–30L annual revenue/artist = ~₹12,500–15,000 Crore!',
    formula: 'B2B Studio Rev = (Titles Produced × Avg VFX/Animation Spend) + International Outsourcing (or Artists × Rev/Artist)',
    assumptions: [
      { label: 'Book Viewership Tree: Age 5–15 (cartoons heavy), 15–40 (movies heavy), 45+ (TV/movies) across Urban/Rural = 4.18B content touchpoints', rationale: 'Shows high cross-demographic exposure to VFX/animation.' },
      { label: 'B2B Revenue Check: ~50,000–60,000 Indian VFX/Animation artists × ~₹20–25L annual studio billing per artist', rationale: 'India is a massive global VFX outsourcing hub (DNEG, Technicolor, Prime Focus).' }
    ],
    tree: {
      label: 'India Animation / VFX Market',
      valueText: '4.18B views (Book) | ~₹12K–15K Cr B2B',
      children: [
        { label: 'Demand Reach (Book): 5–15 (1.4B) + 15–40 (1.4B) + 45+ (1.38B)', valueText: '4.18 Billion Views' },
        { label: 'Supply-Side B2B (50K Artists × ₹25L billing/yr)', valueText: '~₹12,500 Crore/Yr', highlight: true }
      ]
    },
    finalAnswer: '~₹10,000 – ₹15,000 Crore/year (B2B Industry Revenue) | 4.18B viewer touchpoints (Book)',
    acceptableRange: { min: 6000, max: 25000, unit: '₹ Crore/year', display: '₹6,000 Cr – ₹25,000 Cr/yr' },
    sanityCheck: 'FICCI-EY India M&E reports place India’s Animation & VFX industry around ₹11,000–13,000 Crore! Estimating ~50,000 artists × ₹22–25L billing hits ₹11,000–12,500 Cr immediately.',
    interviewerTrap: 'Estimating B2B industry size using consumer eyeballs WITHOUT translating views into studio billing/ad/ticket share! Always pivot B2B markets to Production Titles × Budget OR Workforce × Revenue/Employee.',
    variations: [
      { question: 'How many VFX artists work in India?', hint: '~300–400 studios × ~100–150 artists avg ≈ ~45,000–50,000 artists.' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Count Movies/Shows/Games × Avg VFX Budget (+ Global Outsourcing), OR Artists × Annual Billing', correct: true, feedback: 'Yes! B2B production markets are best sized from titles/budgets or artist capacity.' },
        { label: 'India Population × ₹1,000', correct: false, feedback: 'Consumers don’t buy VFX directly—studios do!' },
        { label: 'Movie Tickets × 50%', correct: false, feedback: 'VFX studios typically get ~10–25% of a movie’s production budget, not 50% of box office!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'artistsK', label: 'VFX/Animation Workforce (K)', defaultVal: 50, min: 20, max: 100, step: 5, unit: 'K' },
        { key: 'revPerArtistL', label: 'Annual Studio Rev / Artist (₹L)', defaultVal: 24, min: 10, max: 40, step: 2, unit: '₹L' }
      ],
      computeFormulaText: 'VFX Artists × Annual Studio Billing per Artist',
      compute: (v) => {
        const revCr = (v.artistsK * 1000 * v.revPerArtistL * 1e5) / 1e7;
        return {
          value: revCr,
          formatted: `₹${Math.round(revCr).toLocaleString('en-IN')} Crore/Yr`,
          breakdown: [
            { label: 'Studio Workforce', val: `${v.artistsK},000 artists` },
            { label: 'In Billion USD (@ ₹84/$)', val: `$${(revCr * 1e7 / 84 / 1e9).toFixed(2)} B` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-paint-airbus',
    title: 'Volume of Paint Required to Paint an Airbus A320 (620)',
    prompt: 'Estimate the volume of paint (in liters) required to paint an Airbus A320 (listed as 620 in book) aircraft.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 54 (Book p. 50)',
    company: 'Trinity Life Sciences',
    difficulty: 4,
    archetype: 'Volume & Geometry',
    approachType: 'Geometry & Proxy',
    templateId: 'tpl-geometry',
    tags: ['Geometry', 'Aviation', 'Cylinder Approximation', 'Trinity'],
    clarifyingQuestions: [
      { q: 'Are we painting the entire exterior livery (primer + base + clear coat)?', a: 'Yes, exterior fuselage, wings, and tail, typically 3 coats.', why: '3 layers multiplies paint volume 3x!' },
      { q: 'Single-aisle narrowbody (A320, ~180 seats) or widebody (A350/B777)?', a: 'Standard narrowbody (~20–30 rows of seats, ~110–120 ft long).', why: 'Sets fuselage length and diameter.' }
    ],
    strategyOverview: 'Build the aircraft from Human-Scale Dimensions! 20 rows Economy (×3 ft = 60 ft) + 5 rows Business (×5 ft = 25 ft) + Cockpit (10 ft) + Kitchen/Galley (10–15 ft) = ~110 ft total length. Cabin height = 6 ft person + 2 ft overhead bin + 2 ft cargo belly = ~10 ft diameter (radius r = 5 ft; book uses diameter ≈ 10 ft, note book mislabeled height 80/central 6). Cylindrical fuselage area = π × D × L ≈ 3.14 × 10 × 110 ≈ 3,454 sq ft! Double that to include Wings + Tail (≈ 3,454 sq ft) → 6,908 sq ft total. At 5L per 500 sq ft (1L/100 sq ft), 1 coat = 69L → × 3 coats = ~207 Liters!',
    formula: 'Volume = [(π × D × L) × 2 (for Wings+Tail)] ÷ Coverage (sq ft/L) × No. of Coats',
    assumptions: [
      { label: 'Length = 60ft (20 Econ rows×3ft) + 25ft (5 Biz×5ft) + 10ft Cockpit + 15ft Galley = 110 ft', rationale: 'Clever human-scale estimation using seat pitch!' },
      { label: 'Fuselage Diameter ≈ 10 ft (6ft person + 2ft overhead + 2ft cargo hold) → Surface = π × 10 × 110 ≈ 3,454 sq ft', rationale: 'Cylinder lateral area = π × D × L.' },
      { label: 'Wings + Tail ≈ 100% of Fuselage Surface = 3,454 sq ft → Total = 6,908 sq ft', rationale: 'Top + bottom surfaces of both wings + vertical/horizontal stabilizers.' },
      { label: 'Coverage: 5L per 500 sq ft (100 sq ft/L) × 3 coats = 207.24 Liters', rationale: 'Matches aviation industry benchmarks (~200–350 Liters for an A320)!' }
    ],
    tree: {
      label: 'Airbus Narrowbody Dimensions',
      valueText: 'L = 110 ft | D = 10 ft',
      children: [
        { label: 'Cylindrical Fuselage (π × 10 × 110)', valueText: '3,454 sq ft' },
        { label: 'Wings + Tail (~1× Fuselage)', valueText: '3,454 sq ft' },
        {
          label: 'Total Area = 6,908 sq ft ÷ 100 sq ft/L',
          valueText: '69.08 L/coat',
          children: [
            { label: '× 3 Coats of Paint', valueText: '207.24 Liters', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~207 Liters (approx. 200–300 Liters)',
    acceptableRange: { min: 150, max: 450, unit: 'Liters', display: '150 – 450 Liters' },
    sanityCheck: 'Actual Boeing/Airbus specs state an Airbus A320 requires ~200–250 Liters of paint (adding ~100–150 kg weight after drying)! Using human-scale seat rows got us within 10% of real aerospace engineering data!',
    interviewerTrap: 'Forgetting to double the wing area (wings have BOTH a top and bottom surface!) or forgetting the 3 layers of aerospace coating.',
    variations: [
      { question: 'How many ping-pong balls fit inside this Airbus fuselage?', hint: 'Interior cabin volume = π × 5² × 85 ft (excluding cargo/cockpit) × 0.65 packing ÷ ball volume!' },
      { question: 'What is the weight added to the plane by painting it?', hint: '~200L wet × ~50% solid retention ≈ ~100–120 kg.' }
    ],
    guidedPractice: {
      correctApproach: 'Geometry & Proxy',
      funnelOptions: [
        { label: 'Estimate Length via Seat Rows + Diameter via Human Height → Cylinder Area + Wings/Tail × Coats ÷ Coverage', correct: true, feedback: 'Masterclass! Estimating plane length from seat pitch (3 ft/row) is peak consulting thinking.' },
        { label: 'Weight of Plane ÷ 1,000', correct: false, feedback: 'Surface area scales with L×D, not aircraft weight.' },
        { label: 'Car Paint × 10', correct: false, feedback: 'A plane has massive wings and 3 aerospace coats—always build geometry from first principles.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'lengthFt', label: 'Fuselage Length (ft)', defaultVal: 110, min: 90, max: 240, step: 10, unit: 'ft' },
        { key: 'diamFt', label: 'Fuselage Diameter (ft)', defaultVal: 10, min: 9, max: 20, step: 1, unit: 'ft' },
        { key: 'coats', label: 'Paint Coats', defaultVal: 3, min: 1, max: 4, step: 1, unit: 'coats' },
        { key: 'sqFtPerL', label: 'Coverage (sq ft / L)', defaultVal: 100, min: 60, max: 140, step: 10, unit: 'sq ft/L' }
      ],
      computeFormulaText: '(π × Diameter × Length × 2) ÷ Coverage × Coats',
      compute: (v) => {
        const area = Math.PI * v.diamFt * v.lengthFt * 2;
        const liters = (area / v.sqFtPerL) * v.coats;
        return {
          value: liters,
          formatted: `${liters.toFixed(1)} Liters`,
          breakdown: [
            { label: 'Total Exterior Area', val: `${Math.round(area).toLocaleString('en-IN')} sq ft` },
            { label: 'Paint / Coat', val: `${(area / v.sqFtPerL).toFixed(1)} L` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-coffee-shop-milk',
    title: 'Milk Required by Each Coffee Shop in Connaught Place',
    prompt: 'Estimate the amount of milk (in liters) required by a single coffee shop in Connaught Place (Delhi) per day.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 55–57 (Book p. 51–53) & Vol 2 p. 51',
    company: 'Trinity Life Sciences',
    difficulty: 3,
    archetype: 'Supply & Capacity',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-outlet',
    tags: ['F&B', 'Coffee Shop', 'Machine Bottleneck', 'Trinity'],
    clarifyingQuestions: [
      { q: 'What size of coffee shop—a single-espresso-machine boutique café or a massive Starbucks?', a: 'Standard single-barista/single-group cafe open 8 AM–10 PM (14 hrs).', why: '1 espresso machine sets a crisp prep-time bottleneck (~7 mins/order).' },
      { q: 'Does the cafe also use milk for shakes/desserts or strictly coffee beverages?', a: 'Coffee beverages primarily (Black, Latte/Cappuccino, Regular Milk Coffee).', why: 'Allows clean menu-mix weighted calculation.' }
    ],
    strategyOverview: 'Machine-Throughput Supply Model! Cafe opens 14 hrs/day (8 AM–10 PM). Split into 3 time slots (8–12 PM: 4 hrs, 12–4 PM: 4 hrs, 4–10 PM: 6 hrs) across Weekdays (5d) and Weekends (2d) with varying occupancy (50%–90%). Divide occupied minutes by 7 mins prep/billing time per coffee → Weekday avg 82/day, Weekend avg 94/day → Daily weighted avg = 85 coffees/day. Multiply by Menu Mix milk volumes: Black (20% × 0 ml) + Latte/Capp (50% × 75–150 ml) + Regular (30% × 250 ml) = ~9.6–13 Liters/day!',
    formula: 'Daily Milk = Avg Daily Coffees × ∑ (Drink Mix % × Milk ml per Cup)',
    assumptions: [
      { label: '14 operational hours (840 mins); Avg prep/order time = 7 mins per coffee', rationale: 'Single barista/machine workflow.' },
      { label: 'Weekday occ: 70% / 50% / 80% → 82 coffees/day (×5 = 410) | Weekend: 60% / 80% / 90% → 94 coffees/day (×2 = 188)', rationale: 'Weighted average = (410 + 188) ÷ 7 = 85.4 coffees/day.' },
      { label: 'Milk per Cup: 20% Black (0 ml), 50% Latte/Cappuccino (75 ml in book, ~150–180 ml realistically), 30% Regular (250 ml)', rationale: 'Weighted milk = 0 + 37.5 + 75 = 112.5 ml/coffee × 85 = 9.56 L/day (+ ~10% wastage ≈ 10.5 L).' }
    ],
    tree: {
      label: 'Coffee Shop Daily Throughput (8 AM–10 PM)',
      valueText: '85 Coffees/Day Avg',
      children: [
        { label: 'Weekdays (5d × 82 coffees: 24 + 17 + 41)', valueText: '410 coffees' },
        { label: 'Weekends (2d × 94 coffees: 20 + 27 + 46)', valueText: '188 coffees' },
        {
          label: 'Weighted Average = 85 Coffees/Day',
          valueText: '85/day',
          children: [
            { label: 'Black (20% × 0ml) + Latte (50% × 75ml = 3.19L) + Regular (30% × 250ml = 6.38L)', valueText: '9.56 Liters / Day', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~9.6 – 15 Liters/Day per coffee shop',
    acceptableRange: { min: 8, max: 35, unit: 'Liters/day', display: '8 – 35 Liters/day (higher for busy 2-barista Starbucks)' },
    sanityCheck: '85–100 coffees/day at ₹200 avg price = ~₹18,000–20,000 daily coffee revenue (~₹5.5–6L/month, plus food/pastries ≈ ₹10L/month), easily sustaining a Connaught Place café! Also ~10–15 Liters of milk (including ~10% foam/wastage) is right on the nose for an independent cafe.',
    interviewerTrap: 'Notice a typo in Vol 2 p. 56 diagram: it printed a "÷" icon instead of "×" between Order % and 85 coffees, though the final 3,187 ml & 6,375 ml math was correct multiplication! Also remember a real cafe adds ~10% wastage/steaming froth buffer AND a cafe like Starbucks serves ~250–300 cups/day using 2 espresso heads (~30–40L milk/day).',
    variations: [
      { question: 'How much total milk is consumed by ALL coffee shops in Connaught Place?', hint: '~30–40 coffee shops in Inner/Outer Circle CP × 12–15 L/day ≈ ~400–550 Liters/day.' },
      { question: 'How many coffee beans (in kg) does that shop need monthly?', hint: '85 coffees/day × 30 days × 18g double shot ≈ ~46 kg/month.' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Operating Hours (Peak/Off-Peak) × Occupancy ÷ Prep Time × Drink Mix Milk Volume', correct: true, feedback: 'Textbook supply-side capacity + product mix weighted average!' },
        { label: 'Delhi Population ÷ Number of Cafes × 200ml', correct: false, feedback: 'Connaught Place attracts tourists, shoppers, and office workers from across NCR, and total cafes isn’t known.' },
        { label: 'Seats in Cafe × 1 Liter', correct: false, feedback: 'Doesn’t account for turnover rate, operating hours, or black coffee orders.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'cupsDay', label: 'Daily Coffees Sold', defaultVal: 85, min: 40, max: 350, step: 15, unit: 'cups' },
        { key: 'milkSharePct', label: '% Orders Containing Milk', defaultVal: 80, min: 50, max: 95, step: 5, unit: '%' },
        { key: 'avgMilkMl', label: 'Avg Milk / Milk-Drink (ml)', defaultVal: 150, min: 80, max: 250, step: 10, unit: 'ml' },
        { key: 'wastePct', label: 'Froth/Wastage Buffer %', defaultVal: 10, min: 0, max: 20, step: 5, unit: '%' }
      ],
      computeFormulaText: 'Daily Cups × Milk Drink% × Avg ml × (1 + Wastage%) ÷ 1,000',
      compute: (v) => {
        const liters = (v.cupsDay * (v.milkSharePct / 100) * v.avgMilkMl * (1 + v.wastePct / 100)) / 1000;
        return {
          value: liters,
          formatted: `${liters.toFixed(1)} Liters/Day`,
          breakdown: [
            { label: 'Milk-Based Coffees', val: `${Math.round(v.cupsDay * v.milkSharePct / 100)} cups` },
            { label: 'Monthly Milk (30d)', val: `${Math.round(liters * 30)} Liters` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-pens-india',
    title: 'Number of Pens Bought in a Day in India',
    prompt: 'Estimate the number of pens bought in a single day in India.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 58 (Book p. 54)',
    company: 'Trinity Life Sciences',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Stationery', 'India', 'Age Segmentation', 'Daily Volume'],
    clarifyingQuestions: [
      { q: 'Ballpoint/gel writing pens bought by individuals, or include luxury fountain pens & corporate bulk stationery?', a: 'Standard writing pens (ball/gel) across all consumers.', why: 'Volume is driven 99% by affordable ₹5–20 pens.' },
      { q: 'Divide monthly/annual purchases by 30/365 to get daily average?', a: 'Yes, daily run-rate average.', why: 'Smooths out exam/school-opening spikes.' }
    ],
    strategyOverview: 'Clean Age-Based Demand Funnel! Start with 1.4B population: Exclude infants/toddlers 0–5 (10% = 140M). Segment remaining 90%: Students/Youth 6–18 (20% = 280M), Working/Adults 19–60 (50% = 700M), Seniors 60+ (20% = 280M). Apply Active Pen Buyer % (linked to literacy/enrollment: 80%, 70%, 40%) and Monthly Purchase Rate (4/mo for students, 2/mo for adults, 0.5/mo for seniors). Sum monthly total (~1.93B) and divide by 30 days!',
    formula: 'Daily Pens = [∑ (Age Pop × Active Buyer % × Pens/Month)] ÷ 30',
    assumptions: [
      { label: '0–5 excluded (10%); 6–18 (20% = 280M), 19–60 (50% = 700M), 60+ (20% = 280M)', rationale: 'Sums cleanly: 10+20+50+20 = 100%.' },
      { label: 'Active Pen Buyers: Youth 80% (224M), Adults 70% (490M), Seniors 40% (112M)', rationale: 'Matches ~78–80% literacy among young/adults.' },
      { label: 'Pens/Month: Students = 4/mo (homework/exams/loss!), Adults = 2/mo, Seniors = 0.5/mo', rationale: 'Note: In digital era, adults may buy ~0.5–1/mo and students ~2–3/mo; book uses 4/2/0.5.' }
    ],
    tree: {
      label: 'India Population (1.4B)',
      valueText: '1,400M',
      children: [
        { label: '0–5 Years (10% = 140M)', valueText: '0 pens', muted: true },
        { label: '6–18 Youth (280M × 80% = 224M) × 4/mo', valueText: '896M/mo', highlight: true },
        { label: '19–60 Adults (700M × 70% = 490M) × 2/mo', valueText: '980M/mo', highlight: true },
        { label: '60+ Seniors (280M × 40% = 112M) × 0.5/mo', valueText: '56M/mo' },
        { label: '1.932 Billion/Month ÷ 30 Days', valueText: '~6.44 Crore (64.4M) Pens/Day', highlight: true }
      ]
    },
    finalAnswer: '~3 Crore – 6.4 Crore Pens/Day (Book: 64.4 Million/day)',
    acceptableRange: { min: 15, max: 80, unit: 'Million pens/day', display: '15M – 80M pens/day' },
    sanityCheck: '64M/day × 365 ≈ ~23 Billion pens/year (~16 pens/person/year). In reality, India’s organized pen industry produces ~8–12 Billion pens/year (~2.5–3.5 Crore pens/day)! Adjusting adult usage to 1 pen/month (reflecting smartphone notes & laptops) brings the estimate right down to ~3.5 Crore/day—matching industry production!',
    interviewerTrap: 'Forgetting to exclude ages 0–5 (toddlers!) or ignoring illiteracy (~20–25% of adults). Also remember white-collar workers type far more than write today—adjusting adult rate to 0.5–1/mo shows real-world awareness.',
    variations: [
      { question: 'Estimate the annual ₹ market size of ballpoint pens in India.', hint: '~3 Cr/day × 365 × ₹10 avg price ≈ ~₹11,000 Crore/yr!' },
      { question: 'How many pencils are sold in India daily?', hint: 'Shift heavy usage down to ages 4–12 (~25 Cr kids × 2 pencils/mo ÷ 30 ≈ ~1.6 Cr pencils/day).' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Pop → Exclude 0–5 → Age Groups × Literacy/Active % × Pens/Month ÷ 30', correct: true, feedback: 'Textbook! Age segmentation cleanly isolates high-usage students from lower-usage adults.' },
        { label: 'Stationery Shops in India × 100', correct: false, feedback: 'Hard to anchor total stationery shops in rural + urban India without a population denominator.' },
        { label: 'Total Paper Sold ÷ 1,000', correct: false, feedback: 'Most paper is printing/packaging/newspapers, not handwritten notes.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'studentsM', label: 'Active Student Writers (M)', defaultVal: 224, min: 150, max: 300, step: 10, unit: 'M' },
        { key: 'stuPens', label: 'Pens / Student / Month', defaultVal: 3.0, min: 1.0, max: 5.0, step: 0.5, unit: '/mo' },
        { key: 'adultsM', label: 'Active Adult Writers (M)', defaultVal: 490, min: 300, max: 600, step: 20, unit: 'M' },
        { key: 'adultPens', label: 'Pens / Adult / Month', defaultVal: 1.0, min: 0.25, max: 3.0, step: 0.25, unit: '/mo' }
      ],
      computeFormulaText: '[(Students × Student Rate) + (Adults × Adult Rate)] ÷ 30 Days',
      compute: (v) => {
        const monthlyM = v.studentsM * v.stuPens + v.adultsM * v.adultPens;
        const dailyM = monthlyM / 30;
        return {
          value: dailyM,
          formatted: `${dailyM.toFixed(1)} Million Pens/Day`,
          breakdown: [
            { label: 'Annual Pens Sold', val: `${(dailyM * 365 / 1000).toFixed(1)} Billion/yr` },
            { label: 'Market Value (@ ₹10 avg)', val: `₹${Math.round(dailyM * 365 * 10 / 10).toLocaleString('en-IN')} Cr` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-spotify-premium',
    title: 'Number of Spotify Premium Subscribers in India',
    prompt: 'Estimate the number of paid Spotify Premium subscribers in India.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 59 (Book p. 55) & Vol 2 p. 56',
    company: 'Trinity Life Sciences',
    difficulty: 4,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Freemium App', 'Streaming', 'PM Classic', 'Trinity'],
    clarifyingQuestions: [
      { q: 'Paying Spotify Premium users ONLY, or all Monthly Active Users (including free ad-supported)?', a: 'Paying Premium subscribers only (Student, Individual, Family, Duo plans).', why: 'Paid conversion in India is famously low (~3–8% of MAUs) because free tier + YouTube exist!' },
      { q: 'Include bundled telecom freebies (if any) or direct paying users?', a: 'Direct paying subscribers.', why: 'Reflects true willingness to pay.' }
    ],
    strategyOverview: 'Multi-Layer Digital Freemium Funnel! India Pop (1.4B) → Urban (35%) & Rural (65%) → Income Split → Internet/Smartphone Penetration = ~435M internet users. Segment those 435M users by Age (0–14: 26%, 15–24: 18%, 25–34: 16%, 35–44: 24%, 45+: 26% — note 0–44 + 45+ check!). Apply Music Streamer % (50–90%) → Spotify Market Share (30% vs JioSaavn/Wynk/YT Music) → Paid Premium Conversion % across age groups.',
    formula: 'Subscribers = Internet Pop × ∑ [Age % × Music Listener % × Spotify Share % × Paid Conversion %]',
    assumptions: [
      { label: 'Total Internet Connectivity Pool = 435M (via Urban/Rural × Income × Internet%)', rationale: 'Note: In real 2024–26 India, internet users are ~700–800M, though ~435M active digital entertainment users is very reasonable!' },
      { label: 'Music Streamers by Age: 0–14 (50%), 15–24 (90%), 25–34 (85%), 35–44 (60%), 45+ (40%)', rationale: 'Youth stream audio heavily.' },
      { label: 'Spotify Share among Music Streamers = 30%', rationale: 'Competes with YouTube Music, JioSaavn, Gaana, Wynk, Apple Music.' },
      { label: 'Paid Premium Conversion (Book): 5% (0–14), 40% (15–24 & 25–34), 20% (35–44), 10% (45+) → ~20M Paid Subscribers', rationale: 'Wait—Sanity Check! In India, 40% paid conversion on a freemium app is VERY high (global Spotify paid conversion is ~40%, but India is ~5–10%!). Always mention India’s lower willingness to pay (~5–10% paid → ~3–8M paid users)!' }
    ],
    tree: {
      label: 'India Pop (1.4B) → Internet Users (435M)',
      valueText: '435M Internet Pool',
      children: [
        { label: 'Music Streamers across Age Segments', valueText: '~267M Streamers' },
        {
          label: 'Spotify Users (30% Market Share)',
          valueText: '~80M Spotify MAUs',
          children: [
            { label: 'Book Paid Rate (5–40% by age)', valueText: '19.96M Subscribers (Book)' },
            { label: 'Realistic India Paid Rate (5–8% of 80M)', valueText: '~4–7M Paid Subscribers', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~4M – 20M Paid Subscribers (Book: 19.96M; Industry realistic: ~5–8M)',
    acceptableRange: { min: 3, max: 22, unit: 'Million subscribers', display: '3M – 22M subscribers' },
    sanityCheck: 'CRITICAL SANITY CHECK: Globally Spotify has ~600M MAUs and ~240M Premium (~40% paid). In India, Spotify reports ~60–80M MAUs, and because ₹119/mo faces tough competition from free YouTube/JioSaavn, India’s paid conversion is closer to ~5–10% (~4–8M subscribers), NOT 40%! Catching that emerging-market willingness-to-pay nuance is pure PM/Consulting gold.',
    interviewerTrap: 'Notice Vol 1 & Vol 2 age buckets in this tree add up to 26+18+16+24+26 = 110% (tiny PDF sum error!). Always make sure your age buckets sum to exactly 100%, AND don’t apply US/EU 40% paid SaaS conversion rates blindly to India!',
    variations: [
      { question: 'Estimate Spotify’s annual subscription revenue in India.', hint: '6M subscribers × ₹1,000/yr blended (Student ₹59/mo, Individual ₹119/mo, Family ₹179/mo) ≈ ~₹600 Crore/yr.' },
      { question: 'Estimate Netflix paying subscribers in India.', hint: 'Similar funnel, higher price barrier (~₹199–649/mo) → ~8–12M paid accounts.' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Pop → Internet/Smartphone Pool → Age-Split Music Listeners → Spotify Share → Paid Conversion %', correct: true, feedback: 'Spot on! Bonus points if you keep India’s freemium paid conversion realistic (~5–12%).' },
        { label: 'Credit Card Holders × 50%', correct: false, feedback: 'Spotify accepts UPI autopay in India—credit card ownership isn’t the only gate!' },
        { label: 'Total Songs on Spotify × 100', correct: false, feedback: 'Catalog size doesn’t determine subscriber count.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'netPopM', label: 'Internet Users in India (M)', defaultVal: 700, min: 400, max: 900, step: 50, unit: 'M' },
        { key: 'streamPct', label: '% Streaming Music', defaultVal: 45, min: 25, max: 70, step: 5, unit: '%' },
        { key: 'spotShare', label: 'Spotify Market Share %', defaultVal: 25, min: 15, max: 45, step: 5, unit: '%' },
        { key: 'paidPct', label: 'Paid Conversion %', defaultVal: 8, min: 3, max: 40, step: 1, unit: '%' }
      ],
      computeFormulaText: 'Internet Users × Music Streamers% × Spotify Share% × Paid Conversion%',
      compute: (v) => {
        const mau = v.netPopM * (v.streamPct / 100) * (v.spotShare / 100);
        const paid = mau * (v.paidPct / 100);
        return {
          value: paid,
          formatted: `${paid.toFixed(2)} Million Paid`,
          breakdown: [
            { label: 'Spotify Total MAUs', val: `${mau.toFixed(1)} Million` },
            { label: 'Annual Sub Rev (@ ₹1,000/yr)', val: `₹${Math.round(paid * 100).toLocaleString('en-IN')} Cr` }
          ]
        };
      }
    }
  },
  {
    id: 'vol1-theory-maharashtra-plates',
    title: 'Number of License Plates in the State of Maharashtra',
    prompt: 'Estimate the total number of vehicle license plates currently in the state of Maharashtra.',
    source: '180DC SRCC Vol 1',
    pdfRef: 'Guesstimates-Book-Volume-1-6.pdf — p. 8 (Theory Demand-Side Example)',
    company: '180DC SRCC',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-durable',
    tags: ['Automotive', 'State-Level', 'Maharashtra', 'Households'],
    clarifyingQuestions: [
      { q: 'Does every motorized vehicle (both 2-wheelers & 4-wheelers) carry 2 license plates (front + back)?', a: 'Yes, Indian motor vehicles require both front and rear HSRP plates = 2 plates per vehicle.', why: 'Doubles final vehicle count to plates!' },
      { q: 'Personal households only, or commercial trucks/taxis/buses too?', a: 'Personal residential vehicles first (optionally add ~12% commercial fleet uplift).', why: 'Matches demand-side household ownership tree.' }
    ],
    strategyOverview: 'Clean State-Level Household Ownership Model! Start with Maharashtra Population (~120 Million / 12 Crore) ÷ 4 members/household = 30 Million households. Segment by Income: High (10% = 3M), Middle (60% = 18M), Low (30% = 9M). Apply Vehicle Ownership % (90%, 50%, 30%) and Avg Vehicles/Owning-HH (2, 1.5, 1) → Total Vehicles = 21.6M. Multiply by 2 plates/vehicle = 43.2 Million license plates!',
    formula: 'License Plates = (State Pop ÷ HH Size) × ∑ (Income% × Ownership% × Vehicles/HH) × 2 Plates',
    assumptions: [
      { label: 'Maharashtra Pop = 120 Million; Avg Household Size = 4 → 30M households', rationale: 'Maharashtra is India’s 2nd most populous state (~9% of India).' },
      { label: 'High (10% = 3M HH): 90% own × 2 vehicles = 5.4M | Middle (60% = 18M): 50% own × 1.5 = 13.5M | Low (30% = 9M): 30% own × 1 = 2.7M', rationale: 'Includes both 2-wheelers (scooters/bikes) and 4-wheelers.' },
      { label: '2 License Plates per Vehicle (front + rear)', rationale: 'Total Vehicles = 21.6M × 2 = 43.2M plates (+ ~10% commercial vehicles ≈ ~47–50M).' }
    ],
    tree: {
      label: 'Maharashtra Pop (120M ÷ 4 = 30M HH)',
      valueText: '30M Households',
      children: [
        { label: 'High (3M HH × 90% × 2 veh)', valueText: '5.4M vehicles' },
        { label: 'Middle (18M HH × 50% × 1.5 veh)', valueText: '13.5M vehicles', highlight: true },
        { label: 'Low (9M HH × 30% × 1 veh)', valueText: '2.7M vehicles' },
        { label: 'Total 21.6M Vehicles × 2 Plates/Vehicle', valueText: '43.2 Million License Plates', highlight: true }
      ]
    },
    finalAnswer: '~43.2 Million (4.32 Crore) License Plates (~21.6M vehicles)',
    acceptableRange: { min: 30, max: 65, unit: 'Million plates', display: '30M – 65M license plates' },
    sanityCheck: 'Maharashtra accounts for ~9–10% of India’s ~260M total registered vehicles (higher per-capita income than national avg → ~25–30M vehicles × 2 plates = ~50–60M plates). 43.2M personal + ~5M commercial = ~48M plates—spot on!',
    interviewerTrap: 'Multiplying only by 1 (counting vehicles instead of license PLATES—every vehicle has front + back = 2!) or forgetting 2-wheelers.',
    variations: [
      { question: 'How many license plates are manufactured annually in Maharashtra?', hint: 'Divide 21.6M existing vehicles by ~10-yr lifespan (~2.16M) + ~5% growth (~1M) = ~3.1M new vehicles × 2 = ~6.2M plates/yr.' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'State Pop ÷ Household Size → Income Split × Vehicle Ownership × Vehicles/HH × 2 Plates/Vehicle', correct: true, feedback: 'Perfect! Never forget the ×2 for front and rear plates.' },
        { label: 'Total Length of Roads ÷ Car Length', correct: false, feedback: 'Most vehicles are parked at home/work at any moment, not bumper-to-bumper on highways.' },
        { label: 'Number of Traffic Police × 1,000', correct: false, feedback: 'Unrelated proxy.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'Maharashtra Pop (M)', defaultVal: 120, min: 110, max: 135, step: 5, unit: 'M' },
        { key: 'hhSize', label: 'Household Size', defaultVal: 4, min: 3.5, max: 5, step: 0.5, unit: 'ppl' },
        { key: 'avgVeh', label: 'Avg Vehicles / Household', defaultVal: 0.72, min: 0.4, max: 1.2, step: 0.05, unit: 'veh/HH' },
        { key: 'commPct', label: 'Commercial Vehicle Uplift %', defaultVal: 12, min: 0, max: 25, step: 2, unit: '%' }
      ],
      computeFormulaText: '(Pop ÷ HH) × Avg Vehicles/HH × (1 + Commercial%) × 2 Plates',
      compute: (v) => {
        const veh = (v.popM / v.hhSize) * v.avgVeh * (1 + v.commPct / 100);
        const plates = veh * 2;
        return {
          value: plates,
          formatted: `${plates.toFixed(1)} Million Plates`,
          breakdown: [
            { label: 'Total Vehicles', val: `${veh.toFixed(1)} Million` },
            { label: 'Total Households', val: `${(v.popM / v.hhSize).toFixed(1)} Million` }
          ]
        };
      }
    }
  }
);
