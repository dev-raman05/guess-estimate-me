window.GM_DATA = window.GM_DATA || {};
window.GM_DATA.problems = window.GM_DATA.problems || [];

window.GM_DATA.problems.push(
  // 1
  {
    id: 'cb-automobiles-india',
    title: 'Total Registered Automobiles on Indian Roads',
    prompt: 'Estimate the total number of automobiles (cars / motor vehicles) owned across Urban and Rural households in India.',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-durable',
    tags: ['Automotive', 'India', 'Urban-Rural Split', 'Household Penetration'],
    clarifyingQuestions: [
      { q: 'Should "automobiles" count personal 4-wheeler passenger cars only, or all motor vehicles (2W + 3W + commercial)?', a: 'Start with household 4-wheeler passenger cars (~86M cars/households), then show the 2W + commercial uplift to ~350M total vehicles.', why: 'Clarifies a 4x–5x difference between personal cars and all registered motor vehicles!' },
      { q: 'Are multi-car upper-income households and commercial cabs included?', a: 'Include multi-car uplift in sensitivity (~10–20%) after computing primary household ownership.', why: 'Keeps the core income matrix clean before adding edge adjustments.' }
    ],
    strategyOverview: 'Dual-Geography Income Funnel! Start with India Population (1.46B ÷ 4 = ~365M households). Split Rural (70% = 255.5M HH) vs Urban (30% = 109.5M HH). Apply segment car-ownership rates: Rural BPL (20% × 0%), Lower (30% × 2% = 1.5M), Middle (40% × 20% = 20.4M), Upper (10% × 80% = 20.5M) = ~42.4M rural car homes! Urban Lower (40% × 5% = 2.2M), Middle (40% × 50% = 21.9M), Upper (20% × 90% = 19.7M) = ~43.8M urban car homes! Sum = ~86M car-owning households (or ~45M realistic passenger cars if rural middle ownership is ~5% + ~280M two-wheelers for ~350M total motor vehicles).',
    formula: 'Total Fleet = ∑ (Geo Households × Income Share % × Ownership Rate % × Vehicles per Owning HH)',
    assumptions: [
      { label: 'India Population = 1.46B; Avg HH Size = 4 → 365M Households (Rural 70% = 255.5M, Urban 30% = 109.5M)', rationale: 'Standard demographic breakdown across India.' },
      { label: 'Rural Ownership: BPL 0%, Lower 2%, Mid 20%, Upper 80% → 42.4M | Urban: Lower 5%, Mid 50%, Upper 90% → 43.8M', rationale: 'Produces ~86M baseline (adjusting rural mid to 5% reconciles directly with ~45M active cars!).' },
      { label: 'Multi-vehicle Uplift (+15% on upper) & All-Motor Fleet (+260M 2W + commercial) → ~350M+ total vehicles', rationale: 'FY25 new vehicle registrations ran ~26M/yr (~4.3M passenger cars/yr).' }
    ],
    tree: {
      label: 'India Households (~365M)',
      valueText: '365M HH',
      children: [
        {
          label: 'Rural (70% = 255.5M HH)',
          valueText: '42.4M Car HH',
          children: [
            { label: 'Lower 30% (2% own) + Mid 40% (20% own) + Upper 10% (80% own)', valueText: '42.4M' }
          ]
        },
        {
          label: 'Urban (30% = 109.5M HH)',
          valueText: '43.8M Car HH',
          children: [
            { label: 'Lower 40% (5% own) + Mid 40% (50% own) + Upper 20% (90% own)', valueText: '43.8M' }
          ]
        },
        { label: 'Combined Car-Owning Base (Baseline: 86M | Real Active Cars ~45–50M + ~280M 2W)', valueText: '~86M Car HH (~350M All Motor)', highlight: true }
      ]
    },
    finalAnswer: '~45–86 Million Passenger Cars (~350 Million Total Automobiles incl. 2W/CV)',
    acceptableRange: { min: 40, max: 110, unit: 'Million cars', display: '40M – 110M passenger cars' },
    sanityCheck: 'India registers ~4.3M new passenger cars and ~19M two-wheelers per year. Over a 10–12 year vehicle lifespan, ~45M–50M active passenger cars and ~250M–300M two-wheelers sit on Indian roads.',
    interviewerTrap: 'Conflating "car-owning households" with "all automobiles" (which includes ~280M+ 2-wheelers & commercial fleets) OR assigning Western 20% car ownership to Rural India.',
    variations: [
      { question: 'How many new 4-wheelers and 2-wheelers are registered annually in India?', hint: '~4.3M cars + ~19M–20M two-wheelers + ~2M 3W/CVs ≈ ~26M total annual registrations.' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Pop ÷ HH Size → Urban/Rural Split × Income Tier × Ownership Rate (+ Multi-Vehicle Uplift)', correct: true, feedback: 'Textbook demographic segmentation! Captures the sharp urban-rural disparity.' },
        { label: 'Highways in India × 1,000 Cars/Km', correct: false, feedback: 'Road length measures traffic capacity, not total household vehicle ownership.' },
        { label: 'Fuel Stations × 500 Cars', correct: false, feedback: 'Fuel throughput conflates commercial trucks, two-wheelers, and private cars.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'hhM', label: 'India Households (M)', defaultVal: 365, min: 300, max: 400, step: 5, unit: 'M' },
        { key: 'ruralOwnPct', label: 'Rural Avg Ownership %', defaultVal: 16.6, min: 4, max: 25, step: 1, unit: '%' },
        { key: 'urbanOwnPct', label: 'Urban Avg Ownership %', defaultVal: 40, min: 15, max: 50, step: 2, unit: '%' },
        { key: 'multiCar', label: 'Cars / Owning HH', defaultVal: 1.05, min: 1.0, max: 1.4, step: 0.05, unit: 'cars' }
      ],
      computeFormulaText: '[(0.7 × HH × Rural%) + (0.3 × HH × Urban%)] × Cars per Owning HH',
      compute: (v) => {
        const rural = v.hhM * 0.7 * (v.ruralOwnPct / 100);
        const urban = v.hhM * 0.3 * (v.urbanOwnPct / 100);
        const total = (rural + urban) * v.multiCar;
        return {
          value: total,
          formatted: `${total.toFixed(1)} Million Cars`,
          breakdown: [
            { label: 'Rural Car HH', val: `${rural.toFixed(1)} M` },
            { label: 'Urban Car HH', val: `${urban.toFixed(1)} M` }
          ]
        };
      }
    }
  },
  // 2
  {
    id: 'cb-tea-airport',
    title: 'Cups of Tea & Coffee Sold at Mumbai Airport (Morning Window)',
    prompt: 'Estimate the total number of cups of tea and coffee sold at Mumbai Airport on a typical weekday morning (6:00 AM – 12:00 PM).',
    difficulty: 2,
    archetype: 'Supply & Capacity',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-bottleneck',
    tags: ['Aviation', 'F&B', 'Airport Throughput', 'Runway Capacity'],
    clarifyingQuestions: [
      { q: 'Should we count both terminals (T1 domestic + T2 international/domestic) and both tea and coffee?', a: 'Yes, all terminals at Mumbai Airport, covering hot/cold tea and coffee across arrivals and departures.', why: 'Sets total passenger traffic across both terminals cleanly.' },
      { q: 'Are airport staff/crew included or passenger footfall primarily?', a: 'Passenger footfall primarily (6 AM–12 PM = 6-hour morning rush).', why: 'Staff represent <5% uplift on top of ~37K passengers.' }
    ],
    strategyOverview: 'Runway Bottleneck → Seat Capacity → Beverage Incidence! Split the 6-hour morning window (6 AM–12 PM) into Peak (2 hrs @ 30 arrivals/hr × 2 for landings+takeoffs = 120 flights) and Non-Peak (4 hrs @ 15 arrivals/hr × 2 = 120 flights) → 240 total movements! Segment Aircraft Size: Large widebody (10% = 24 × 300 seats = 7,200) + Narrowbody (90% = 216 × 180 seats = 38,880) = 46,080 seats. Apply 80% load factor → 36,864 passenger footfall! Apply Morning Beverage Incidence (20% buy × 1.1 cups/buyer) = ~8,110 cups!',
    formula: 'Morning Cups = (Peak + Off-Peak Movements) × Avg Seats × Load Factor % × Beverage Buyer % × Cups/Buyer',
    assumptions: [
      { label: '2 Runways over 6 hrs: Peak (2 hrs × 30 arr/hr × 2 = 120) + Non-Peak (4 hrs × 15 arr/hr × 2 = 120) = 240 movements', rationale: 'Standard morning flight wave across T1 & T2.' },
      { label: 'Fleet Mix: 10% widebody (300 seats) + 90% narrowbody (180 seats) = 192 avg seats × 80% load = 36,864 pax', rationale: 'Mumbai handles ~45M–52M annual pax ≈ ~140K/day (~35–40K in the busy 6 AM–12 PM block).' },
      { label: '20% of morning travelers buy tea/coffee (lounges + cafes), averaging 1.1 cups per buyer', rationale: 'Departing passengers buy while waiting; arriving passengers grab coffee before commute.' }
    ],
    tree: {
      label: 'Mumbai Airport Morning (6 AM – 12 PM)',
      valueText: '240 Movements',
      children: [
        { label: 'Peak (2h × 60/hr = 120) + Off-Peak (4h × 30/hr = 120)', valueText: '240 flights' },
        { label: 'Seat Capacity (24×300 + 216×180 = 46,080) × 80% Load', valueText: '36,864 passengers', highlight: true },
        { label: 'Beverage Purchase (20% × 36,864 = 7,373 buyers) × 1.1 cups', valueText: '8,110 Cups (6h)', highlight: true }
      ]
    },
    finalAnswer: '~8,110 Cups (6 AM – 12 PM Morning Window)',
    acceptableRange: { min: 5000, max: 14000, unit: 'Cups (6h window)', display: '5,000 – 14,000 cups' },
    sanityCheck: 'Across ~25 cafes/tea stalls/lounges at T1 + T2, 8,110 cups over 6 hours averages ~325 cups per outlet (~54 cups/hour, or ~1 cup per minute during morning rush) — completely realistic!',
    interviewerTrap: 'Counting ONLY departing passengers (ignoring arriving passengers grabbing airport chai/coffee) OR forgetting to double hourly arrivals (`× 2`) for landings + takeoffs.',
    variations: [
      { question: 'Estimate total daily beverage revenue at Mumbai Airport across 24 hours.', hint: 'Morning (6h) ≈ 35–40% of daily F&B volume → ~22,000 cups/day × ₹220 avg ≈ ~₹48 Lakh/day!' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Flight Movements (Peak + Off-Peak) × Avg Seats × Load Factor % × Buyer Incidence % × Cups/Buyer', correct: true, feedback: 'Textbook! Runway throughput anchors airport footfall cleanly.' },
        { label: 'Mumbai Population × 2% × 2 Cups', correct: false, feedback: 'City population does not determine single-day airport terminal traffic.' },
        { label: 'Number of Check-In Counters × 50', correct: false, feedback: 'Check-in counters fluctuate wildly vs runway slot capacity.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'movements', label: 'Flights (Arr+Dep, 6h)', defaultVal: 240, min: 140, max: 320, step: 20, unit: 'flights' },
        { key: 'avgSeats', label: 'Avg Seats / Flight', defaultVal: 192, min: 160, max: 240, step: 8, unit: 'seats' },
        { key: 'loadPct', label: 'Load Factor %', defaultVal: 80, min: 65, max: 95, step: 5, unit: '%' },
        { key: 'buyPct', label: 'Beverage Buyer %', defaultVal: 20, min: 10, max: 35, step: 2, unit: '%' }
      ],
      computeFormulaText: 'Movements × Avg Seats × Load% × Buyer% × 1.1 Cups/Buyer',
      compute: (v) => {
        const pax = v.movements * v.avgSeats * (v.loadPct / 100);
        const cups = pax * (v.buyPct / 100) * 1.1;
        return {
          value: Math.round(cups),
          formatted: `${Math.round(cups).toLocaleString('en-IN')} Cups (6 AM–12 PM)`,
          breakdown: [
            { label: 'Morning Passenger Footfall', val: `${Math.round(pax).toLocaleString('en-IN')} pax` },
            { label: 'Est. Revenue (@ ₹200/cup)', val: `₹${(cups * 200 / 1e5).toFixed(1)} Lakh` }
          ]
        };
      }
    }
  },
  // 3
  {
    id: 'cb-tattoos-mumbai',
    title: 'Total Number of Tattoos on People in Mumbai',
    prompt: 'Estimate the total number of permanent tattoos currently on residents of Mumbai.',
    difficulty: 2,
    archetype: 'Usage & Behavioral',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Demographics', 'Mumbai', 'Age Cohort', 'Consumer Behavior'],
    clarifyingQuestions: [
      { q: 'Are we estimating permanent inked tattoos only (excluding temporary henna/mehendi & sticker tattoos)?', a: 'Yes, permanent tattoos only across Mumbai residents.', why: 'Excluding temporary body art prevents massive cultural overcounting.' },
      { q: 'Notice the question asks for total TATTOOS, not just tattooed people — some enthusiasts get 2–3+ tattoos!', a: 'Account for multi-tattoo distribution (1, 2, 3+ tattoos per inked individual).', why: 'Average ~1.7–1.8 tattoos per tattooed person adds an important ~75% multiplier.' }
    ],
    strategyOverview: 'Age-Cohort Prevalence × Multi-Tattoo Multiplier! Start with Mumbai Population (20M). Segment by age: Youth 0–18 (20% = 4M), Young Adults 18–45 (50% = 10M, peak ink demographic), Seniors 45+ (30% = 6M). Apply tattoo count distribution within each cohort: 0–18 (1% have 1, 0.5% have 2, 0.5% have 3 → 140K tattoos), 18–45 (2% have 1, 2% have 2, 1% have 3 → 900K tattoos), 45+ (0.5% have 1, 0.25% have 2, 0.25% have 3 → 105K tattoos). Sum = ~1.145M tattoos (~640K inked people × ~1.79 avg)!',
    formula: 'Total Tattoos = ∑ [Age Cohort Pop × (1×p1% + 2×p2% + 3×p3%)]',
    assumptions: [
      { label: 'Mumbai Population = 20M: 0–18 yrs (20% = 4M), 18–45 yrs (50% = 10M), 45+ yrs (30% = 6M)', rationale: 'Young urban workforce makes 18–45 the largest demographic.' },
      { label: '0–18 (2% inked: 1%/0.5%/0.5% → 140K) | 18–45 (5% inked: 2%/2%/1% → 900K) | 45+ (1% inked: 0.5%/0.25%/0.25% → 105K)', rationale: 'Combined ~3.2% of Mumbai (~640,000 people) have ≥1 tattoo.' },
      { label: 'Weighted Avg Tattoos per Inked Person ≈ 1.79 → 640K × 1.79 = 1.145 Million Tattoos', rationale: 'Reflects modern urban repeat tattoo culture.' }
    ],
    tree: {
      label: 'Mumbai Population (20M)',
      valueText: '20M Residents',
      children: [
        { label: '0–18 Youth (4M × 2% = 80K inked → 40K×1 + 20K×2 + 20K×3)', valueText: '140K tattoos' },
        { label: '18–45 Adults (10M × 5% = 500K inked → 200K×1 + 200K×2 + 100K×3)', valueText: '900K tattoos', highlight: true },
        { label: '45+ Seniors (6M × 1% = 60K inked → 30K×1 + 15K×2 + 15K×3)', valueText: '105K tattoos' },
        { label: 'Total Across All Ages (640K Inked Residents)', valueText: '1.145 Million Tattoos', highlight: true }
      ]
    },
    finalAnswer: '~1.15 Million Permanent Tattoos (~640K Inked Residents)',
    acceptableRange: { min: 600000, max: 2500000, unit: 'Tattoos', display: '0.6M – 2.5M tattoos' },
    sanityCheck: '640K inked people across ~500 Mumbai tattoo studios over ~15 years = ~85 new/repeat tattoo sessions per studio per year (~7/month/studio + out-of-city travelers), totally grounded!',
    interviewerTrap: 'Counting tattooed PEOPLE instead of TOTAL TATTOOS (forgetting repeat inkers) OR overestimating adult 45+ prevalence (where cultural adoption was much lower 20+ years ago).',
    variations: [
      { question: 'Estimate the annual market revenue of tattoo studios in Mumbai.', hint: '~60K–80K sessions/yr × ₹3,500–₹4,000 avg ticket ≈ ~₹25–30 Crore/year.' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'City Pop → Age Cohorts × Cohort Tattoo Prevalence % × Avg Tattoos per Inked Person', correct: true, feedback: 'Spot on! Cohort segmentation + repeat-tattoo multiplier is the exact structure.' },
        { label: 'Mumbai Studios × 10 Tattoos/Day × 365', correct: false, feedback: 'Estimates annual NEW tattoos, not cumulative existing stock on living residents!' },
        { label: 'India Population ÷ 28', correct: false, feedback: 'Mumbai urban youth behavior differs dramatically from rural India.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'Mumbai Pop (M)', defaultVal: 20, min: 15, max: 25, step: 1, unit: 'M' },
        { key: 'adultInkedPct', label: '18–45 Tattooed %', defaultVal: 5.0, min: 2.0, max: 10.0, step: 0.5, unit: '%' },
        { key: 'otherInkedPct', label: 'Other Ages Tattooed %', defaultVal: 1.4, min: 0.5, max: 3.0, step: 0.2, unit: '%' },
        { key: 'avgTattoos', label: 'Avg Tattoos / Inked Person', defaultVal: 1.8, min: 1.2, max: 2.5, step: 0.1, unit: 'tattoos' }
      ],
      computeFormulaText: '[(0.5 × Pop × Adult%) + (0.5 × Pop × Other%)] × Avg Tattoos/Person',
      compute: (v) => {
        const inkedM = v.popM * 0.5 * (v.adultInkedPct / 100) + v.popM * 0.5 * (v.otherInkedPct / 100);
        const totalM = inkedM * v.avgTattoos;
        return {
          value: totalM,
          formatted: `${totalM.toFixed(2)} Million Tattoos`,
          breakdown: [
            { label: 'Inked Residents', val: `${(inkedM * 1000).toFixed(0)}K ppl` },
            { label: 'Overall Pop Inked %', val: `${((inkedM / v.popM) * 100).toFixed(1)}%` }
          ]
        };
      }
    }
  },
  // 4
  {
    id: 'cb-auto-spare-parts',
    title: 'Aftermarket Car Spare Parts Market in India’s Local Garages',
    prompt: 'Estimate the annual market size (in ₹ Thousand Crores) for 4-wheeler passenger car spare parts serviced through India’s local unorganized mechanic garages.',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-durable',
    tags: ['Automotive', 'Aftermarket', 'Spare Parts', 'Local Garages'],
    clarifyingQuestions: [
      { q: 'Are we strictly sizing local/independent unorganized garages (excluding OEM authorized dealership workshops during warranty)?', a: 'Yes, independent local garages only (~out-of-warranty vehicles & cost-conscious owners).', why: 'Authorized workshops capture ~90% of 0–3 yr in-warranty cars; local garages thrive on 3+ yr cars.' },
      { q: 'Include commercial 4W passenger cabs alongside household cars?', a: 'Yes, urban private cars + commercial taxis/cabs (rural passenger car stock is very small).', why: 'Cabs have ~2–3x higher annual mileage and frequent wear-and-tear part replacement.' }
    ],
    strategyOverview: 'Installed Car Fleet → Out-of-Warranty Filter → Local Garage Share! Start with India Active Passenger Cars (~45M: ~41M personal + ~4M commercial taxis). Separate by Vehicle Age: In-Warranty 0–3 yrs (~25% = 11M, mostly OEM service) vs Out-of-Warranty 3+ yrs (~75% = 34M). Segment Local Garage Preference: Upper-income owners (20% stay OEM), Middle/Lower & Cabs (75% use local garages for brakes, filters, clutch, suspension, AC parts) → ~24M cars visiting local garages! Apply Visits/Yr (2/yr) × Avg Spare Parts Spend/Visit (₹3,200 excl. labor) = ~₹15.4K Crore (~₹15 Thousand Crore)!',
    formula: 'Spare Parts Market = Out-of-Warranty Cars × Local Garage Share % × Repairs/Yr × Parts Cost/Repair',
    assumptions: [
      { label: 'Active 4W Passenger Fleet = ~45M (41M private + 4M commercial taxis/cabs)', rationale: 'Matches ~4.2M annual car sales × ~10–11 yr lifecycle.' },
      { label: 'Out-of-Warranty 3+ Yrs = 75% (33.75M) × 70% choosing local independent garages ≈ 23.6M cars', rationale: 'After year 3–4, OEM labor/parts premiums push 65–75% of middle-tier cars & cabs to local mechanics.' },
      { label: '2.0 garage visits/yr × ₹3,200 avg spare parts bill per visit (filters, pads, belts, bulbs, clutch) = ₹15,104 Cr', rationale: 'Excludes pure mechanic labor (~₹800–1,200/visit) and focuses cleanly on spare parts value.' }
    ],
    tree: {
      label: 'India Passenger 4W Fleet (~45M Cars)',
      valueText: '45M Vehicles',
      children: [
        { label: '0–3 Yrs In-Warranty (25% = 11.25M → mostly OEM)', valueText: '~1.1M local', muted: true },
        {
          label: '3+ Yrs Out-of-Warranty (75% = 33.75M)',
          valueText: '23.6M Local Garage Cars',
          highlight: true,
          children: [
            { label: '× 2 Repairs/Yr × ₹3,200 Parts Spend/Visit', valueText: '~₹15,104 Cr (~₹15.1K Cr)', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~₹14,000 – ₹18,000 Crore (~₹15 Thousand Crore/year)',
    acceptableRange: { min: 10, max: 30, unit: '₹ Thousand Crore/yr', display: '₹10K Cr – ₹30K Cr/yr' },
    sanityCheck: 'India’s overall automotive aftermarket (2W + 4W + CV, OEM + local) is ~₹95,000–1,10,000 Cr. Passenger 4W represents ~35–40% (~₹38K Cr), and unorganized local garages account for ~40–45% of 4W parts (~₹15–17K Cr)!',
    interviewerTrap: 'Assuming ALL cars visit local garages immediately from Year 1 (forgetting OEM warranty lock-in) OR confusing total garage revenue (which includes labor + engine oil) with spare parts only.',
    variations: [
      { question: 'How much larger is the 2-wheeler local garage spare parts market in India?', hint: '~260M active 2-wheelers × 75% local garage × 2 visits × ₹600 parts ≈ ~₹23,400 Crore/yr.' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Active Car Fleet → Out-of-Warranty Filter → Local Garage Adoption % × Visits/Yr × Parts Spend/Visit', correct: true, feedback: 'Spot on! Filtering out in-warranty OEM cars is the #1 insight in auto aftermarket sizing.' },
        { label: 'Car Sales × Price of New Car × 10%', correct: false, feedback: 'New car sales exclude the massive 3–12 year existing car stock driving repairs.' },
        { label: 'Total Mechanics in India × ₹5 Lakh', correct: false, feedback: 'Hard to cleanly isolate 4W parts vs labor vs 2W repairs per mechanic.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'fleetM', label: 'Active Passenger Cars (M)', defaultVal: 45, min: 35, max: 60, step: 2.5, unit: 'M' },
        { key: 'oowPct', label: 'Out-of-Warranty (3+ yr) %', defaultVal: 75, min: 60, max: 85, step: 5, unit: '%' },
        { key: 'localPct', label: 'Local Garage Share %', defaultVal: 70, min: 45, max: 85, step: 5, unit: '%' },
        { key: 'visitsYr', label: 'Part Repairs / Yr', defaultVal: 2.0, min: 1.0, max: 3.5, step: 0.5, unit: 'x/yr' },
        { key: 'partsCost', label: 'Avg Parts Cost / Visit (₹)', defaultVal: 3200, min: 1500, max: 6000, step: 250, unit: '₹' }
      ],
      computeFormulaText: 'Fleet × OOW% × Local% × Visits/Yr × Parts Cost ÷ ₹1,000 Cr',
      compute: (v) => {
        const carsM = v.fleetM * (v.oowPct / 100) * (v.localPct / 100);
        const cr = (carsM * 1e6 * v.visitsYr * v.partsCost) / 1e7;
        const kCr = cr / 1000;
        return {
          value: kCr,
          formatted: `₹${kCr.toFixed(1)} Thousand Crore/Yr`,
          breakdown: [
            { label: 'Cars Serviced Locally', val: `${carsM.toFixed(1)} Million` },
            { label: 'Market Size (₹ Cr)', val: `₹${Math.round(cr).toLocaleString('en-IN')} Cr` }
          ]
        };
      }
    }
  },
  // 5
  {
    id: 'cb-maruti-service-centers',
    title: 'Maruti Suzuki Service Centers Required in a Tier-2 City',
    prompt: 'Estimate the number of authorized Maruti Suzuki service centers required to serve Guwahati (or an equivalent ~1.2M–1.4M Tier-2 city).',
    difficulty: 2,
    archetype: 'Supply & Capacity',
    approachType: 'Hybrid (Demand + Supply)',
    templateId: 'tpl-bottleneck',
    tags: ['Automotive', 'Service Capacity', 'Tier-2 City', 'Demand vs Supply'],
    clarifyingQuestions: [
      { q: 'Are we estimating authorized Maruti Suzuki service workshops only (excluding roadside multi-brand mechanics)?', a: 'Yes, authorized Maruti Suzuki service workshops.', why: 'Focuses specifically on Maruti’s ~40% brand market share and authorized visit frequency.' },
      { q: 'Use a clean proxy for city population if Guwahati isn’t memorized?', a: 'Yes, anchor Guwahati (~12–14 Lakh) to comparable Tier-2 cities like Hubli (~3 Lakh households).', why: 'Shows resourceful proxy anchoring in interviews.' }
    ],
    strategyOverview: 'Hybrid Demand-to-Bay-Capacity Model! Step 1 (Maruti Car Base): City Pop = 12 Lakh ÷ 4 = 3 Lakh HH. Split Socio-Economic Income: Lower (20% × 0%), Lower-Mid (30% × 50% = 0.45L cars? Check: or realistic 20% = 0.18L), Upper-Mid (40% × 100% = 1.2L), Upper (10% × 1.5 cars = 0.45L) → Baseline = 2.1 Lakh cars! Apply Maruti 40% share → 84,000 Maruti cars. Step 2 (Daily Service Demand): At 1 authorized visit/year ÷ 300 working days = 280 Maruti cars/day! Step 3 (Center Capacity): 3 bays × 10 hrs/day ÷ 2 service-hrs/car = 15 cars/day/center → 280 ÷ 15 ≈ 19 service centers!',
    formula: 'Service Centers = [(Total Cars × Maruti Share % × Visits/Yr) ÷ 300 Working Days] ÷ [(Bays × Hours/Day) ÷ Service Hrs/Car]',
    assumptions: [
      { label: 'City Pop = 12 Lakh (~3L HH) → Income Split yields ~2.1L cars (baseline) or ~1.0–1.5L realistically', rationale: 'Sensitivity around Lower-Middle car penetration (15–50%) spans ~8–19 centers cleanly.' },
      { label: 'Maruti Suzuki Share = 40% → 84,000 Maruti cars × 1 visit/yr ÷ 300 days = 280 cars/day', rationale: 'Maruti dominates Tier-2 passenger markets (40–45% share).' },
      { label: 'Per Center Capacity: 3 service bays × 10 hrs/day ÷ 2 hrs/car = 15 cars/day → 280 ÷ 15 = 18.7 ≈ 19 centers', rationale: 'Each center handles ~4,500 scheduled services/year.' }
    ],
    tree: {
      label: 'City Households (12L ÷ 4 = 3 Lakh HH)',
      valueText: '2.1 Lakh Total Cars',
      children: [
        { label: 'Maruti Suzuki Cars (40% Market Share)', valueText: '84,000 Maruti Cars' },
        { label: 'Daily Service Demand (84K × 1/yr ÷ 300 days)', valueText: '280 Cars / Day', highlight: true },
        { label: '÷ Center Capacity (3 Bays × 10h ÷ 2h = 15 cars/day)', valueText: '19 Service Centers', highlight: true }
      ]
    },
    finalAnswer: '~12 – 19 Authorized Service Centers (Baseline: 19 Centers)',
    acceptableRange: { min: 8, max: 25, unit: 'Service centers', display: '8 – 25 service centers' },
    sanityCheck: 'Guwahati actually has ~10–14 Arena + Nexa Maruti authorized workshops across ~300K–350K total passenger cars! Adjusting Lower-Mid car penetration from 50% to ~20% lands right on ~14 service centers!',
    interviewerTrap: 'Assuming 100% of Upper-Middle + 50% of Lower-Middle Tier-2 homes own cars (yielding ~175 cars per 1,000 pop vs real Tier-2 India ~70–90/1,000) OR ignoring warranty drop-off after year 3.',
    variations: [
      { question: 'What is the monthly revenue of one such 3-bay Maruti service center?', hint: '15 cars/day × 25 days = 375 cars/mo × ₹7,500 avg bill ≈ ~₹28 Lakh/month!' }
    ],
    guidedPractice: {
      correctApproach: 'Hybrid (Demand + Supply)',
      funnelOptions: [
        { label: 'City HH × Car Ownership × Maruti Share × Visits/Yr ÷ Working Days ÷ Daily Bay Capacity', correct: true, feedback: 'Textbook Demand ÷ Supply bottleneck matching!' },
        { label: 'City Road Area ÷ Service Center Area', correct: false, feedback: 'Service centers are capacity-constrained by bays and car fleet, not road area.' },
        { label: 'India Maruti Centers ÷ 28 States', correct: false, feedback: 'State averages ignore metro vs Tier-2 vs rural car concentration.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'marutiK', label: 'Maruti Cars in City (K)', defaultVal: 84, min: 40, max: 140, step: 4, unit: 'K' },
        { key: 'visitsYr', label: 'Avg Authorized Visits/Yr', defaultVal: 1.0, min: 0.6, max: 1.5, step: 0.1, unit: '/yr' },
        { key: 'bays', label: 'Bays / Service Center', defaultVal: 3, min: 2, max: 6, step: 1, unit: 'bays' },
        { key: 'hrsPerCar', label: 'Bay-Hours / Service', defaultVal: 2.0, min: 1.5, max: 3.0, step: 0.5, unit: 'hrs' }
      ],
      computeFormulaText: '(Maruti Cars × Visits/Yr ÷ 300 Days) ÷ [(Bays × 10h) ÷ Hrs/Service]',
      compute: (v) => {
        const dailyDem = (v.marutiK * 1000 * v.visitsYr) / 300;
        const cap = (v.bays * 10) / v.hrsPerCar;
        const centers = Math.ceil(dailyDem / cap);
        return {
          value: centers,
          formatted: `${centers} Service Centers`,
          breakdown: [
            { label: 'Daily Maruti Demand', val: `${Math.round(dailyDem)} cars/day` },
            { label: 'Capacity / Center', val: `${cap.toFixed(1)} cars/day` }
          ]
        };
      }
    }
  },
  // 6
  {
    id: 'cb-mcu-revenue',
    title: 'Annual Multi-Stream Revenue of a Major Film Studio Franchise (MCU)',
    prompt: 'Estimate the annual global revenue of a major superhero film studio franchise (like MCU) across its key revenue streams.',
    difficulty: 2,
    archetype: 'Revenue & Cost',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Media & Entertainment', 'Revenue Streams', 'Global', 'Box Office + Merch'],
    clarifyingQuestions: [
      { q: 'Should we include theatrical box office, OTT/licensing, merchandise, and comics, or focus on top 3 core streams?', a: 'Break down 4 MECE pillars: Theatrical Box Office, Streaming/TV Licensing, Consumer Merchandise, and Publishing/Comics.', why: 'Franchise studios monetize far beyond just ticket sales — licensing & merch often rival box office!' },
      { q: 'Are we estimating studio gross revenue recognized in a typical 3-film release year?', a: 'Yes, studio net revenue share (~50% of theatrical gross + licensing + merch royalties) over 1 typical year.', why: 'Clarifies studio take-rate (~50% of box office vs 100% exhibitor gross).' }
    ],
    strategyOverview: 'Multi-Stream Franchise P&L Model! Stream 1 (Theatrical Box Office): 3 major releases/yr × ~80M global ticket buyers/film (~$12 avg ticket across NA/EU/Asia mix) = ~$2.88B gross box office → ~50% studio theatrical share = ~$1.44B! Stream 2 (Merchandise & Licensing): ~15M hardcore collectors/kids buying ~$60/yr + ~50M casual toys/apparel @ ~$20/yr = ~$1.9B retail → ~15% licensing/wholesale studio revenue = ~$285M–350M! Stream 3 (Streaming / Home Video / TV Rights): 3 films × ~$150M licensing value + catalog = ~$500M. Stream 4 (Comics/Publishing): ~75K–100K core subscribers + trade paperbacks ≈ ~$80M–100M → Total ≈ ~$2.3B–$2.5B/yr!',
    formula: 'Studio Revenue = (Films × Viewers × Ticket × 50% Studio Share) + Streaming/Catalog + (Merch Retail × Royalty %) + Comics',
    assumptions: [
      { label: 'Theatrical: 3 blockbuster films/yr × ~80M tickets/film (~$12 blended ticket) = $2.88B gross (~$1.44B studio share)', rationale: 'Matches ~$950M avg global gross per major franchise installment.' },
      { label: 'Streaming, Home Video & TV Licensing: ~$500M/year across new releases & deep catalog', rationale: 'SVOD windowing, airlines, TV syndication, and digital rentals.' },
      { label: 'Consumer Merchandise (~$300M studio royalty on ~$2B retail) + Comics/Publishing (~$90M)', rationale: 'Age-segmented apparel, action figures, and collectibles monetize year-round.' }
    ],
    tree: {
      label: 'Major Film Studio Annual Revenue (3-Film Year)',
      valueText: '~$2.33B / Year',
      children: [
        { label: 'Theatrical Share (3 films × $960M gross × 50% studio split)', valueText: '$1,440M', highlight: true },
        { label: 'Streaming, Digital & TV Licensing', valueText: '$500M' },
        { label: 'Licensed Merchandise (Royalty + Direct)', valueText: '$300M' },
        { label: 'Comics & Publishing (Youth + Collectors)', valueText: '$90M' }
      ]
    },
    finalAnswer: '~$2.0 Billion – $3.0 Billion / Year (Studio Net Revenue)',
    acceptableRange: { min: 1.5, max: 4.0, unit: '$ Billion/year', display: '$1.5B – $4.0B/yr' },
    sanityCheck: 'Peak MCU years (~3 films/yr) grossed ~$2.5B–$3.5B at the global box office (~$1.3B–$1.7B studio cut) plus ~$1B+ from Disney+/licensing/merchandise royalties = ~$2.3B–$2.8B annual studio top-line!',
    interviewerTrap: 'Counting 100% of box-office ticket sales as studio revenue (theaters keep ~45–50%!) OR counting total toy/t-shirt retail MSRP instead of the studio’s ~10–15% licensing royalty.',
    variations: [
      { question: 'How many comic book issues does the publishing division sell annually?', hint: '~3M monthly buyers × 6 issues/yr + collected graphic novels ≈ ~20M units/yr.' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'MECE Revenue Streams: Theatrical (Gross × Studio Cut %) + Streaming/Licensing + Merch Royalty + Comics', correct: true, feedback: 'Spot on! Always list MECE monetization pillars and adjust gross retail to studio share.' },
        { label: 'World Population × $1', correct: false, feedback: 'No structural segmentation across release cadence, ticket vs merch, or studio take-rate.' },
        { label: 'Number of Marvel Fans × ₹1,000', correct: false, feedback: 'Cannot anchor fan count cleanly without separating moviegoers from merch buyers.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'filmsYr', label: 'Major Films / Year', defaultVal: 3, min: 1, max: 5, step: 1, unit: 'films' },
        { key: 'avgGrossM', label: 'Avg Box Office Gross ($M)', defaultVal: 960, min: 400, max: 1400, step: 80, unit: '$M' },
        { key: 'studioCutPct', label: 'Studio Theatrical Cut %', defaultVal: 50, min: 40, max: 60, step: 5, unit: '%' },
        { key: 'ancillaryM', label: 'Streaming + Merch + Comics ($M)', defaultVal: 890, min: 400, max: 1500, step: 50, unit: '$M' }
      ],
      computeFormulaText: '(Films × Avg Gross × Studio Cut%) + Streaming/Merch/Comics',
      compute: (v) => {
        const theatrical = v.filmsYr * v.avgGrossM * (v.studioCutPct / 100);
        const totalM = theatrical + v.ancillaryM;
        return {
          value: totalM / 1000,
          formatted: `$${(totalM / 1000).toFixed(2)} Billion/Yr`,
          breakdown: [
            { label: 'Studio Theatrical Revenue', val: `$${Math.round(theatrical)}M` },
            { label: 'Licensing, Merch & Comics', val: `$${v.ancillaryM}M` }
          ]
        };
      }
    }
  },
  // 7
  {
    id: 'cb-tinder-india',
    title: 'Number of Tinder Users in India',
    prompt: 'Estimate the number of active Tinder users in India.',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Dating Apps', 'Digital Consumer', 'India', 'Age & City Tier Split'],
    clarifyingQuestions: [
      { q: 'Are we estimating Monthly Active Users (MAUs) vs total historical downloads?', a: 'Active users (MAUs/regular users) across India.', why: 'Dating app installs are 3x–4x larger than active users due to churn.' },
      { q: 'Should we consider rural areas or focus mainly on urban Tier-1 and Tier-2 cohorts?', a: 'Start from all of India (1.4B–1.5B), then filter out rural & older ages where dating-app penetration is minimal.', why: 'Shows structured top-down elimination before city-tier segmentation.' }
    ],
    strategyOverview: 'Urban + Age + City-Tier Digital Funnel! Start with India Population (~1.5B) → Urban share (~35–40% = 560M–600M; rural dating-app usage ≈ negligible). Filter Target Age 18–30 (~30% of urban = 180M young adults). Segment by City Tier: Tier-1 (30% = 54M), Tier-2 (30% = 54M), Tier-3 (40%, marginal). Apply Dating-App Penetration & Tinder Share: Tier-1 (50% ever-tried/open × 40% active × 50% Tinder share = 5.4M), Tier-2 (25% × 40% × 45% = 2.4M) → ~8M–15M active dating users (~29.7M unadjusted lifetime pool)!',
    formula: 'Tinder Users = Urban Pop × Age 18–30 % × ∑ (Tier % × Dating App Penetration % × Active % × Tinder Share %)',
    assumptions: [
      { label: 'India 1.5B → Urban (40% = 600M) → Ages 18–30 (30% = 180M single/dating-eligible urban youth)', rationale: 'Married adults & rural cohorts contribute <5% of volume.' },
      { label: 'Tier-1 (30% = 54M) & Tier-2 (30% = 54M); Tier-3 excluded as culturally/digitally low adoption', rationale: 'Unadjusted broad-reach baseline gives 29.7M total installs/users (5.4Cr×70%×50% + 5.4Cr×40%×50%).' },
      { label: 'Active Adjustment (~30–40% of tried/installed are current MAUs vs Bumble/Hinge) → ~8M–12M Active Users', rationale: 'Distinguishing total installs (~30M) from MAUs (~8–12M) is key PM rigor!' }
    ],
    tree: {
      label: 'India Pop (1.5B) → Urban 18–30 (180M)',
      valueText: '180M Eligible Youth',
      children: [
        { label: 'Tier-1 (54M × 70% dating pen × 50% Tinder share)', valueText: '18.9M Total Pool' },
        { label: 'Tier-2 (54M × 40% dating pen × 50% Tinder share)', valueText: '10.8M Total Pool' },
        { label: 'Baseline Broad Pool (29.7M) × 35% Active MAU Filter', valueText: '~10.4M MAUs (Baseline: 29.7M)', highlight: true }
      ]
    },
    finalAnswer: '~8 – 12 Million Active Users (Unadjusted Total Pool: ~29.7M)',
    acceptableRange: { min: 5, max: 35, unit: 'Million users', display: '5M – 35M users' },
    sanityCheck: 'Tinder has ~75M global MAUs; India represents ~10–14% of Tinder’s global active base (~8M–11M MAUs, heavily skewed 75%–80% male), while cumulative downloads top ~30M+.',
    interviewerTrap: 'Assuming equal 70%–40% adoption means ACTIVE monthly usage (people uninstall dating apps rapidly) OR ignoring gender skew (male active ratio is ~3x–4x female ratio in India).',
    variations: [
      { question: 'Estimate Tinder’s annual paid subscription revenue in India.', hint: '~10M MAUs × ~4% paid conversion = 400K subscribers × ₹2,500/yr ≈ ~₹100 Crore/yr.' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Pop → Urban % → Age 18–30 % → City Tier Penetration × Competitor Share × Active MAU Rate', correct: true, feedback: 'Textbook! Separates urban young adults, city tiers, and active vs installed users.' },
        { label: 'India Smartphones × 10%', correct: false, feedback: 'Fails to exclude rural users, married adults, and children.' },
        { label: 'Total Weddings ÷ 5', correct: false, feedback: 'Only a tiny fraction of Indian marriages originate on casual dating apps.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'urbanYouthM', label: 'Urban 18–30 Youth (M)', defaultVal: 180, min: 120, max: 220, step: 10, unit: 'M' },
        { key: 'datingAppPct', label: 'Tried Dating Apps %', defaultVal: 35, min: 15, max: 60, step: 5, unit: '%' },
        { key: 'tinderSharePct', label: 'Tinder Market Share %', defaultVal: 45, min: 25, max: 65, step: 5, unit: '%' },
        { key: 'activePct', label: 'Currently Active (MAU) %', defaultVal: 35, min: 20, max: 70, step: 5, unit: '%' }
      ],
      computeFormulaText: 'Urban Youth × Dating App% × Tinder Share% × Active MAU%',
      compute: (v) => {
        const totalPool = v.urbanYouthM * (v.datingAppPct / 100) * (v.tinderSharePct / 100);
        const maus = totalPool * (v.activePct / 100);
        return {
          value: maus,
          formatted: `${maus.toFixed(1)} Million Active Users`,
          breakdown: [
            { label: 'Ever-Tried / Total Pool', val: `${totalPool.toFixed(1)} M` },
            { label: 'Est. Paid Subs (~4%)', val: `${Math.round(maus * 40)}K users` }
          ]
        };
      }
    }
  },
  // 8
  {
    id: 'cb-cobranded-credit-cards',
    title: 'Transaction Share of Co-Branded vs. Standard Credit Cards',
    prompt: 'Estimate the proportion of monthly transactions occurring on partner co-branded cards versus standard cards for a global credit card network (150M cards).',
    difficulty: 4,
    archetype: 'Usage & Behavioral',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['FinTech & Banking', 'Credit Cards', 'Segmentation', 'Weighted Share'],
    clarifyingQuestions: [
      { q: 'Are we estimating the share of TRANSACTION COUNT or total dollar spend?', a: 'Proportion of monthly transaction COUNT across co-branded vs. standard cards.', why: 'Keeps calculation centered on monthly swipe frequency per active card.' },
      { q: 'What are the primary co-branded partner verticals?', a: 'Split co-branded cards cleanly into Airline/Travel Partners (50%) and Retail/Shopping Partners (50%).', why: 'Travel cards have higher heavy-user swipe frequency (~18/mo) than low-intent retail cards (~8/mo).' }
    ],
    strategyOverview: 'Segmented Card-Activity Weighted Funnel! Start with Global Card Base (150M): Co-Branded (30% = 45M) vs Standard (70% = 105M). Apply 80% Monthly Active Rate → 36M active co-branded vs 84M active standard. Split Co-Branded 50/50 into Airline (18M) & Retailer (18M): Airline High-Intent (85% × 18 txns/mo = 275.4M) + Low-Intent (15% × 7 = 18.9M) = 294.3M; Retailer High-Intent (55% × 16 = 158.4M) + Low-Intent (45% × 8 = 64.8M) = 223.2M → Co-Branded Total = 517.5M! Standard Cards: 84M × 16 txns/mo = 1,344M → Total = 1,861.5M monthly txns → Co-Branded Share = 27.8%!',
    formula: 'Co-Branded Share % = [∑ (Co-Branded Active × Intent % × Txns/Mo)] ÷ [Total Monthly Transactions]',
    assumptions: [
      { label: '150M Cards × 80% Monthly Active = 120M Active (36M Co-Branded [30%] vs 84M Standard [70%])', rationale: 'Wait: co-branded cards often exhibit slightly lower overall active share vs flagship cards.' },
      { label: 'Airline (18M): 85% High (18 tx/mo) + 15% Low (7) = 294.3M txns | Retail (18M): 55% High (16) + 45% Low (8) = 223.2M txns', rationale: 'Co-branded average weighted txns/mo = 517.5M ÷ 36M ≈ 14.4 txns/month.' },
      { label: 'Standard Cards: 84M active × 16 txns/mo = 1,344M txns → Total = 1,861.5M txns (Co-Branded = 27.8%)', rationale: 'Internal check: 1,861.5M ÷ 15.51 avg txns = 120M active ÷ 80% = 150M cards!' }
    ],
    tree: {
      label: 'Global Card Issuer Base (150M Cards × 80% Active = 120M)',
      valueText: '1,861.5M Txns/Mo',
      children: [
        {
          label: 'Co-Branded Cards (36M Active)',
          valueText: '517.5M Txns (27.8%)',
          highlight: true,
          children: [
            { label: 'Airline (18M): High 15.3M×18 + Low 2.7M×7', valueText: '294.3M txns' },
            { label: 'Retail (18M): High 9.9M×16 + Low 8.1M×8', valueText: '223.2M txns' }
          ]
        },
        { label: 'Standard Cards (84M Active × 16 txns/mo)', valueText: '1,344M Txns (72.2%)' }
      ]
    },
    finalAnswer: '~27.8% Co-Branded Transactions (~518M / 1,862M monthly txns)',
    acceptableRange: { min: 20, max: 38, unit: '% Co-Branded share', display: '20% – 38% transaction share' },
    sanityCheck: 'Notice Co-Branded cards represent 30% of cards (and 30% of active users) yet ~27.8% of transactions because lower-intent partner cardholders average ~14.4 txns/mo vs 16 txns/mo for everyday standard cards. Completely consistent!',
    interviewerTrap: 'Assuming Co-Branded Share of Transactions equals Co-Branded Share of Cards (30%) without weighting by usage frequency across high- vs low-intent sub-segments.',
    variations: [
      { question: 'How does the split change if we measure TOTAL SPEND ($) instead of transaction count?', hint: 'Airline co-branded tickets carry 3x–4x larger average ticket size ($400 vs $45 retail), lifting Co-Branded Spend Share to ~35–40%!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Total Cards → Card Type Split × Monthly Active Rate × Partner Sub-Segment × Txn Frequency/Mo', correct: true, feedback: 'Spot on! Weighted frequency across Airline/Retail high & low intent nails the share.' },
        { label: 'Assume Co-Branded % of Cards = % of Transactions', correct: false, feedback: 'Retail/travel partner cards have different activation and swipe frequencies than flagship cards.' },
        { label: 'Retail Stores in USA × 100 Swipes', correct: false, feedback: 'Misses online/airline travel volume and global card mix.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'coBrandCardPct', label: 'Co-Branded Card Share %', defaultVal: 30, min: 15, max: 50, step: 5, unit: '%' },
        { key: 'coActivePct', label: 'Co-Branded Active Rate %', defaultVal: 80, min: 60, max: 95, step: 5, unit: '%' },
        { key: 'coFreq', label: 'Co-Branded Txns / Active / Mo', defaultVal: 14.4, min: 8, max: 22, step: 0.4, unit: 'txns' },
        { key: 'stdFreq', label: 'Standard Txns / Active / Mo', defaultVal: 16.0, min: 10, max: 24, step: 0.5, unit: 'txns' }
      ],
      computeFormulaText: 'Co-Branded Txns ÷ (Co-Branded Txns + Standard Txns) × 100',
      compute: (v) => {
        const coTx = v.coBrandCardPct * (v.coActivePct / 100) * v.coFreq;
        const stdTx = (100 - v.coBrandCardPct) * 0.8 * v.stdFreq;
        const sharePct = (coTx / (coTx + stdTx)) * 100;
        return {
          value: sharePct,
          formatted: `${sharePct.toFixed(1)}% Co-Branded Share`,
          breakdown: [
            { label: 'Standard Card Share', val: `${(100 - sharePct).toFixed(1)}%` },
            { label: 'Weighted Avg Txns/Active', val: `${((coTx + stdTx) / (v.coBrandCardPct * v.coActivePct / 100 + (100 - v.coBrandCardPct) * 0.8)).toFixed(1)}/mo` }
          ]
        };
      }
    }
  },
  // 9
  {
    id: 'cb-campus-canteen-revenue',
    title: 'Weekly Revenue of a Large University Campus Canteen',
    prompt: 'Estimate the weekly revenue of a primary canteen near hostels and classrooms on a large 28,000-person university campus across normal, exam, and vacation weeks.',
    difficulty: 2,
    archetype: 'Revenue & Cost',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-outlet',
    tags: ['Education', 'Campus F&B', 'Seasonality', 'Footfall'],
    clarifyingQuestions: [
      { q: 'What is the total campus population and split between students and faculty/staff?', a: '28,000 total campus residents: 24,000 students + 4,000 faculty & staff.', why: 'Students and faculty exhibit sharp differences across weekends and exam periods.' },
      { q: 'Should we model a Normal Academic Week separately from Exam Week and Vacation/Fest Week?', a: 'Yes! Model a Normal Week primarily (~₹71.25L), plus Exam & Vacation sensitivities.', why: 'Seasonality shows deep operational awareness for campus businesses.' }
    ],
    strategyOverview: 'Segment-Based Footfall × Ticket Size Across Academic Calendar! Campus Pop = 24,000 Students + 4,000 Faculty (28K total) × ₹75 Avg Order Spend (tea, Maggi, snacks, meals). Normal Week: 5 Weekdays (60% students = 14.4K + 55% faculty = 2.2K → 16.6K/day × 5 = 83K) + 2 Weekends (20% students = 4.8K + 30% faculty = 1.2K → 6K/day × 2 = 12K) = 95,000 weekly orders × ₹75 = ₹71.25 Lakh/week! Exam Week (70% students, 10% faculty × 7d = 120.4K × ₹75 = ₹90.3L) | Vacation Week (10% × 28K × 7d = 19.6K × ₹75 = ₹14.7L).',
    formula: 'Weekly Revenue = [(Weekday Visits × 5) + (Weekend Visits × 2)] × Avg Spend per Visit',
    assumptions: [
      { label: 'Campus Base = 24,000 Students + 4,000 Faculty/Staff | Avg Ticket Spend = ₹75', rationale: 'Blends ₹20 tea/snack breaks with ₹100–120 full meals.' },
      { label: 'Normal Week: Weekdays 16,600/day (5d = 83K) + Weekends 6,000/day (2d = 12K) = 95,000 orders → ₹71.25 Lakh/wk', rationale: 'Weekend drop occurs because day scholars go home and hostelers eat off-campus.' },
      { label: 'Calendar Sensitivity: Exam Week (+27% → ₹90.3L/wk) vs Vacation Week (-79% → ₹14.7L/wk)', rationale: 'Note: For a smaller single canteen kiosk (~10–20% share of campus!), scale down proportionally.' }
    ],
    tree: {
      label: 'Campus Base (24K Students + 4K Faculty @ ₹75 Avg Spend)',
      valueText: '28,000 Campus Pop',
      children: [
        { label: 'Normal Week: 5 WD (83K) + 2 WE (12K) = 95,000 orders', valueText: '₹71.25 Lakh/Wk', highlight: true },
        { label: 'Exam Week: 7d × (16,800 Stu + 400 Fac) = 120,400 orders', valueText: '₹90.30 Lakh/Wk' },
        { label: 'Fest / Vacation Week: 7d × 2,800 = 19,600 orders', valueText: '₹14.70 Lakh/Wk' }
      ]
    },
    finalAnswer: '~₹71.25 Lakh/Week (Normal Week) | ~₹14.7L (Vacation) – ₹90.3L (Exams)',
    acceptableRange: { min: 15, max: 95, unit: '₹ Lakh/week', display: '₹15 Lakh – ₹95 Lakh/week (total campus canteen spend)' },
    sanityCheck: 'Total campus dining ecosystem (~28K people) spending ₹71.25L/week = ~₹254 per person per week (~₹36/day) in discretionary non-mess canteen snacks/meals. And notice if the campus has 5–8 canteens, each single stall averages ~₹9–14L/week!',
    interviewerTrap: 'Checking throughput capacity! 16,600 daily orders over 12 hours = ~1,383 orders/hour (~23/min) — that requires either a mega food-court/multi-counter complex or splitting across ~5–8 campus canteens.',
    variations: [
      { question: 'How many billing counters are needed at peak 4–6 PM to serve this volume?', hint: '~3,500 peak-hour snacks ÷ 40 orders/counter/hr = ~80–90 POS touchpoints across the campus.' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Students + Faculty × (5 Weekday % + 2 Weekend % Usage) × Avg Spend (with Calendar Scenarios)', correct: true, feedback: 'Spot on! Separating students vs faculty and weekday vs weekend capture campus demand cleanly.' },
        { label: 'City Population × 1%', correct: false, feedback: 'Campus canteens serve an isolated captive population of 28,000 residents.' },
        { label: 'Classroom Chairs × ₹100', correct: false, feedback: 'Chairs do not measure student snack/meal transaction frequency.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'studentsK', label: 'Students (K)', defaultVal: 24, min: 4, max: 30, step: 2, unit: 'K' },
        { key: 'wdPct', label: 'Weekday Usage %', defaultVal: 60, min: 20, max: 80, step: 5, unit: '%' },
        { key: 'wePct', label: 'Weekend Usage %', defaultVal: 20, min: 5, max: 50, step: 5, unit: '%' },
        { key: 'spend', label: 'Avg Spend (₹)', defaultVal: 75, min: 40, max: 120, step: 5, unit: '₹' }
      ],
      computeFormulaText: '[5 × (Students×WD% + 2.2K Fac) + 2 × (Students×WE% + 1.2K Fac)] × Spend',
      compute: (v) => {
        const wdOrders = 5 * (v.studentsK * 1000 * (v.wdPct / 100) + 2200);
        const weOrders = 2 * (v.studentsK * 1000 * (v.wePct / 100) + 1200);
        const revLakh = ((wdOrders + weOrders) * v.spend) / 1e5;
        return {
          value: revLakh,
          formatted: `₹${revLakh.toFixed(2)} Lakh/Week`,
          breakdown: [
            { label: 'Weekly Customer Orders', val: `${Math.round(wdOrders + weOrders).toLocaleString('en-IN')}` },
            { label: 'Per Single Stall (÷6)', val: `₹${(revLakh / 6).toFixed(2)} Lakh/wk` }
          ]
        };
      }
    }
  },
  // 10
  {
    id: 'cb-lays-ndls',
    title: 'Packets of Lays Chips Sold Daily at New Delhi Railway Station',
    prompt: 'Estimate the total number of Lays chips packets sold per day at New Delhi Railway Station (NDLS).',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-outlet',
    tags: ['FMCG', 'Railway Hub', 'Footfall Funnel', 'Market Share'],
    clarifyingQuestions: [
      { q: 'Include all pack sizes (₹5, ₹10, ₹20, ₹50) across platforms and concourse stalls?', a: 'Yes, total unit packets sold daily across all platform stalls and station vendors.', why: 'Most railway snacks are ₹10–₹20 single-serve packs.' },
      { q: 'Should we differentiate long-distance travelers from daily suburban commuters?', a: 'Yes! Long-distance passengers wait longer and pack journey snacks (~40% buy snacks vs ~10% for commuters).', why: 'This behavioral split is the core analytical insight.' }
    ],
    strategyOverview: 'Transit Hub Footfall Segmentation! Start with NDLS Daily Footfall (~450,000 passengers across 16 platforms). Segment by Travel Type: Long-Distance Travelers (70% = 315,000) vs Daily Commuters (30% = 135,000). Apply Snack Purchase Incidence: Long-Distance (40% = 126,000 buyers) + Commuters (10% = 13,500 buyers) = 139,500 snack buyers/day (× ~1 packet avg). Apply Lays Market Share among packaged chips/snacks (~30%) → 41,850 packets/day!',
    formula: 'Daily Lays Packets = [(Footfall × LongDist% × Snack%) + (Footfall × Commuter% × Snack%)] × Lays Share %',
    assumptions: [
      { label: 'NDLS Daily Passenger Footfall = 450,000 (16 platforms: 70% long-distance = 315K, 30% daily commuters = 135K)', rationale: 'Matches real Indian Railways busiest-hub traffic (~4.5–5L/day).' },
      { label: 'Snack Buying Incidence: 40% Long-Distance (126K) + 10% Commuters (13.5K) = 139,500 buyers/day', rationale: 'Waiting/journey snacking drives 4x higher incidence on express trains.' },
      { label: 'Lays Brand Share = 30% (vs Haldirams/Kurkure/Balaji/Biscuits) → 41,850 packets/day', rationale: 'Supply sanity check: ~50 station stalls × 24 hrs ≈ ~35 Lays packets/hr/stall (~1 every 2 mins).' }
    ],
    tree: {
      label: 'NDLS Daily Passengers (450,000)',
      valueText: '450,000 Pax',
      children: [
        { label: 'Long-Distance (70% = 315K) × 40% Snack Buyers', valueText: '126,000 buyers' },
        { label: 'Daily Commuters (30% = 135K) × 10% Snack Buyers', valueText: '13,500 buyers' },
        {
          label: 'Total Snack Buyers = 139,500/day',
          valueText: '139,500 buyers',
          children: [
            { label: '× 30% Lays Share (avg 1 packet)', valueText: '~41,850 Packets/Day', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~41,850 Lays Packets/Day (~1.25 Million/Month)',
    acceptableRange: { min: 25000, max: 70000, unit: 'Packets/day', display: '25,000 – 70,000 packets/day' },
    sanityCheck: 'Cross-check with station supply: NDLS has ~50+ food stalls/trolleys across 16 platforms. 41,850 ÷ 50 = ~837 packets/vendor/day ÷ 24h ≈ ~35 packets/hour (~1 packet every 2 minutes), super realistic at a mega hub!',
    interviewerTrap: 'Treating all 450,000 station visitors uniformly OR forgetting that biscuits, namkeen, Kurkure, and samosas compete heavily (so Lays takes ~25–30% of snack buyers, not 100%).',
    variations: [
      { question: 'What is the daily retail value of Lays sold at NDLS?', hint: '41,850 packets × ₹20 blended pack price ≈ ~₹8.37 Lakh/day (~₹30 Cr/year from 1 station!).' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Station Footfall → Long-Distance vs Commuter Split × Snack Incidence % × Lays Brand Share %', correct: true, feedback: 'Spot on! Travel duration drives snack purchase rate dramatically.' },
        { label: 'Trains/Day × 1,000', correct: false, feedback: 'Doesn’t capture passenger snack propensity or Lays vs namkeen/biscuit share.' },
        { label: 'Delhi Population × 1%', correct: false, feedback: 'Trains carry inter-city travelers from all over India, not just Delhi residents.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'footfallK', label: 'Daily Footfall (K)', defaultVal: 450, min: 250, max: 600, step: 25, unit: 'K' },
        { key: 'longPct', label: 'Long-Distance %', defaultVal: 70, min: 50, max: 85, step: 5, unit: '%' },
        { key: 'longSnackPct', label: 'Long-Dist Snack Rate %', defaultVal: 40, min: 20, max: 60, step: 5, unit: '%' },
        { key: 'laysSharePct', label: 'Lays Share %', defaultVal: 30, min: 15, max: 45, step: 5, unit: '%' }
      ],
      computeFormulaText: 'Footfall × [(Long% × LongSnack%) + ((1 - Long%) × 10%)] × Lays Share%',
      compute: (v) => {
        const longB = v.footfallK * 1000 * (v.longPct / 100) * (v.longSnackPct / 100);
        const commB = v.footfallK * 1000 * ((100 - v.longPct) / 100) * 0.10;
        const lays = (longB + commB) * (v.laysSharePct / 100);
        return {
          value: Math.round(lays),
          formatted: `${Math.round(lays).toLocaleString('en-IN')} Packets/Day`,
          breakdown: [
            { label: 'Total Snack Buyers', val: `${Math.round(longB + commB).toLocaleString('en-IN')}` },
            { label: 'Per Vendor (50 stalls)', val: `${Math.round(lays / 50)} packs/day` }
          ]
        };
      }
    }
  },
  // 11
  {
    id: 'cb-baby-strollers-us',
    title: 'Annual Market Revenue of Baby Strollers in the USA',
    prompt: 'Estimate the annual retail market size (revenue) of baby strollers sold in the United States.',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Replacement & Stock-Flow',
    templateId: 'tpl-durable',
    tags: ['Consumer Goods', 'USA', 'Replacement Cycle', 'Household Funnel'],
    clarifyingQuestions: [
      { q: 'Are we estimating new retail stroller sales only (excluding secondhand hand-me-downs/Facebook Marketplace)?', a: 'Yes, new consumer retail strollers sold annually.', why: 'Secondhand transfers & hand-me-downs for 2nd/3rd children reduce new purchase frequency!' },
      { q: 'Use US population and household benchmarks?', a: 'Yes, ~340M US population (~2.62 people/HH → ~130M US households).', why: 'US households are smaller (~2.6 people/HH) than India (~4–4.5).' }
    ],
    strategyOverview: 'US Household Child-Segment Stock + Replacement Funnel! Start with US Population (340M ÷ 2.62/HH ≈ 130M Households). Filter Households with Young Children (~40% have/recently had children = 52M? Or note realistic 0–4 yr child HH ≈ 15M–20M; baseline uses 52M × 20% stroller ownership = 10.4M strollers in stock!). Divide by 4-year usage/replacement window (× 0.25/yr) = 2.6M annual strollers sold × $200 avg price = $520 Million/year! Alternative Check: ~3.6M US births/yr × ~55% first-born (hand-me-downs for 2nd/3rd!) + ~20% multiple strollers = ~2.4M–2.8M new strollers × $220 ≈ ~$530M–$620M/year!',
    formula: 'Annual Revenue = [(US Households × Child HH % × Stroller Adoption %) ÷ Avg Usage Years] × Avg Price',
    assumptions: [
      { label: 'US Population = 340M (~2.62 avg HH size → ~129.8M–130M Households)', rationale: 'Matches US Census household structure.' },
      { label: '52M Child-Segment HH × 20% Stroller Penetration = 10.4M Installed Base ÷ 4 Yrs = 2.6M Strollers/Yr', rationale: 'Hand-me-downs across siblings keep effective replacement/purchase window ~4 years.' },
      { label: 'Average Retail Price = $200 (mix of $80 umbrella strollers & $600–1,000 travel systems) → $520M/yr', rationale: 'Cross-check via 3.6M US births/yr yields the exact same ~2.5M–2.7M annual units!' }
    ],
    tree: {
      label: 'US Households (340M ÷ 2.62 = 130M HH)',
      valueText: '130M US HH',
      children: [
        { label: 'Households with Eligible Kids (40%)', valueText: '52M HH' },
        { label: 'Stroller Penetration (20%) → Active Stock', valueText: '10.4M Strollers' },
        {
          label: 'Replacement Cycle (4 Yrs → ÷ 4/yr)',
          valueText: '2.6M Strollers/Yr',
          highlight: true,
          children: [
            { label: '× $200 Average Price', valueText: '$520 Million / Year', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~$520 Million / Year (~2.6 Million Strollers)',
    acceptableRange: { min: 400, max: 950, unit: '$ Million/year', display: '$400M – $950M/yr' },
    sanityCheck: 'US records ~3.6M births/year (~1.8M–2.0M first-borns + ~0.6M second-child/double/jogging upgrades) = ~2.5M–2.7M annual new stroller units sold, aligning closely with real US retail market (~$550M–$750M)!',
    interviewerTrap: 'Assuming EVERY newborn gets a brand-new stroller (forgetting ~45% are 2nd/3rd children reusing older sibling gear) OR using India’s 4.5 household size instead of the US ~2.6.',
    variations: [
      { question: 'Solve this using annual births directly instead of household stock.', hint: '3.6M annual US births × 60% first-born/new-stroller need × 1.15 avg strollers/buyer × $210 ≈ ~$522M/yr!' }
    ],
    guidedPractice: {
      correctApproach: 'Stock & Replacement',
      funnelOptions: [
        { label: 'US Households → Child-Age HH % × Stroller Adoption % ÷ Replacement Years (or First-Born Births) × Price', correct: true, feedback: 'Spot on! Accounting for hand-me-downs and replacement cycle prevents huge overcounting.' },
        { label: '340M × $200', correct: false, feedback: 'Confuses total population with annual newborns/families.' },
        { label: 'US Hospitals × 1,000 Strollers', correct: false, feedback: 'Parents buy strollers from retail stores/online, not hospitals.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'hhM', label: 'US Households (M)', defaultVal: 130, min: 120, max: 140, step: 2, unit: 'M' },
        { key: 'childPct', label: 'Target Child HH %', defaultVal: 40, min: 25, max: 50, step: 5, unit: '%' },
        { key: 'strollerPct', label: 'Stroller Penetration %', defaultVal: 20, min: 15, max: 35, step: 2, unit: '%' },
        { key: 'lifeYrs', label: 'Purchase Cycle (Yrs)', defaultVal: 4, min: 2, max: 6, step: 0.5, unit: 'yrs' },
        { key: 'priceUsd', label: 'Avg Stroller Price ($)', defaultVal: 200, min: 120, max: 350, step: 20, unit: '$' }
      ],
      computeFormulaText: '(HH × Child% × Stroller% ÷ Cycle Yrs) × Avg Price',
      compute: (v) => {
        const unitsM = (v.hhM * (v.childPct / 100) * (v.strollerPct / 100)) / v.lifeYrs;
        const revM = unitsM * v.priceUsd;
        return {
          value: revM,
          formatted: `$${Math.round(revM)} Million/Yr`,
          breakdown: [
            { label: 'Annual Units Sold', val: `${unitsM.toFixed(2)} Million` },
            { label: 'Installed Strollers', val: `${(unitsM * v.lifeYrs).toFixed(1)} M` }
          ]
        };
      }
    }
  },
  // 12
  {
    id: 'cb-homeopathic-medicines',
    title: 'Annual Homeopathic Medicine Units Sold by a Major Brand in India',
    prompt: 'Estimate the annual number of homeopathic medicine units sold across India by a leading pharma company’s homeopathic division (assuming 15% market share).',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Healthcare / Pharma', 'Homeopathy', 'India', 'Brand Share'],
    clarifyingQuestions: [
      { q: 'Are we sizing domestic Indian retail sales only (excluding exports), and what counts as one "unit"?', a: 'India-wide sales; 1 unit = 1 standard bottle/pack/course prescribed or bought (~1 month/episode).', why: 'Standardizes pill vials, drops, and mother-tincture bottles.' },
      { q: 'What is the brand’s estimated market share in Indian homeopathy?', a: 'Assume 15% market share (leading organized player against fragmented clinics).', why: 'Separates total category demand from company volume.' }
    ],
    strategyOverview: 'Geography × Income Healthcare Adoption Funnel! Start with India Population (1.4B) → Urban (30% = 420M) vs Rural (70% = 980M). Segment Income & Apply Homeopathic Adoption: Urban High (84M × 20% = 16.8M), Mid (168M × 15% = 25.2M), Low (168M × 10% = 16.8M) → 58.8M urban users! Rural High (98M × 15% = 14.7M), Mid (392M × 10% = 39.2M), Low (490M × 5% = 24.5M) → 78.4M rural users! Total Users = 137.2M (~10% of India) × 15% Brand Share = 20.58M Brand Users × 10 units/year = 205.8 Million units/year!',
    formula: 'Brand Annual Units = ∑ (Geo/Income Pop × Homeopathy User %) × Brand Share % × Units/User/Yr',
    assumptions: [
      { label: 'Urban (420M): High 20%×20%, Mid 40%×15%, Low 40%×10% = 58.8M homeopathy users', rationale: 'Urban middle/upper tiers use homeopathy for chronic skin, respiratory, and immunity care.' },
      { label: 'Rural (980M): High 10%×15%, Mid 40%×10%, Low 50%×5% = 78.4M users → Total = 137.2M India users', rationale: 'Matches ~10% of Indians regularly opting for AYUSH/homeopathy treatments.' },
      { label: '15% Market Share (20.58M users) × 10 units/user/year = 205.8 Million units/year', rationale: 'Chronic homeopathic regimens often run multiple bottles over months.' }
    ],
    tree: {
      label: 'India Pop (1.4B → 30% Urban / 70% Rural)',
      valueText: '1,400M',
      children: [
        { label: 'Urban Homeopathy Users (420M → 16.8M + 25.2M + 16.8M)', valueText: '58.8M users' },
        { label: 'Rural Homeopathy Users (980M → 14.7M + 39.2M + 24.5M)', valueText: '78.4M users' },
        {
          label: 'Total Category = 137.2M × 15% Company Share',
          valueText: '20.58M Brand Users',
          children: [
            { label: '× 10 Units/User/Year', valueText: '205.8 Million Units/Year', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~205.8 Million Units/Year (Range: 120M – 250M units)',
    acceptableRange: { min: 100, max: 300, unit: 'Million units/yr', display: '100M – 300M units/yr' },
    sanityCheck: 'At ₹100–120 avg retail price per small bottle/unit, 205.8M units ≈ ~₹2,000–2,400 Cr company revenue (~₹14,000–16,000 Cr total Indian homeopathy market, aligning closely with ~₹10,000–15,000 Cr industry estimates!).',
    interviewerTrap: 'Assuming unbranded local practitioner sugar-globule dispensations are 100% packaged branded bottles — clarify whether the brand supplies retail OTC packs or bulk clinic mother tinctures.',
    variations: [
      { question: 'Estimate the annual ₹ revenue of the entire Indian homeopathic medicine market.', hint: '137.2M users × 10 units × ~₹100/unit ≈ ~₹13,700 Crore/year.' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Pop → Urban/Rural × Income Split × Homeopathy Usage % × Brand Market Share % × Units/Yr', correct: true, feedback: 'Spot on! Clean AYUSH/healthcare penetration matrix.' },
        { label: 'Hospitals in India × 1,000 Patients', correct: false, feedback: 'Homeopathy is largely outpatient clinics and retail pharmacies, not hospitals.' },
        { label: 'Total Pharma Sales ÷ 2', correct: false, feedback: 'Allopathy commands ~80–85% of Indian pharma, not 50%.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'totalUsersM', label: 'India Homeopathy Users (M)', defaultVal: 137.2, min: 70, max: 200, step: 5, unit: 'M' },
        { key: 'sharePct', label: 'Company Market Share %', defaultVal: 15, min: 5, max: 30, step: 2.5, unit: '%' },
        { key: 'unitsYr', label: 'Units / User / Year', defaultVal: 10, min: 4, max: 16, step: 1, unit: 'units' }
      ],
      computeFormulaText: 'India Users × Market Share% × Units/User/Year',
      compute: (v) => {
        const unitsM = v.totalUsersM * (v.sharePct / 100) * v.unitsYr;
        return {
          value: unitsM,
          formatted: `${unitsM.toFixed(1)} Million Units/Yr`,
          breakdown: [
            { label: 'Brand Users', val: `${(v.totalUsersM * v.sharePct / 100).toFixed(2)} M` },
            { label: 'Est. Revenue (@ ₹100/unit)', val: `₹${Math.round(unitsM * 10).toLocaleString('en-IN')} Cr` }
          ]
        };
      }
    }
  },
  // 13
  {
    id: 'cb-horse-mri-uk',
    title: 'Market Size for Equine (Horse) MRI Scanners in the UK',
    prompt: 'A UK medical-device maker manufactures specialized MRI machines for veterinary clinics to diagnose lameness in horses (charging per scan + annual maintenance). Estimate its total addressable market size in the UK.',
    difficulty: 4,
    archetype: 'Market Sizing',
    approachType: 'Geometry & Proxy',
    templateId: 'tpl-fmcg',
    tags: ['Niche B2B MedTech', 'UK', 'Proxy Scaling', 'Scan + Maintenance'],
    clarifyingQuestions: [
      { q: 'Are there two revenue streams: per-scan fee revenue AND clinic machine maintenance contracts?', a: 'Yes! Size BOTH annual scan fees (# Scans × Fee/Scan) AND recurring maintenance (# Scanners × Annual Maintenance Fee).', why: 'PE/B2B MedTech cases always test razor-razorblade + maintenance recurring revenue.' },
      { q: 'How should we anchor the UK horse population if not known directly?', a: 'Use US proxy (~10M horses / 330M pop ≈ 1:30 ratio); assume UK has half that intensity (~1:60 horse-to-human ratio).', why: 'Classic cross-country proxy scaling test.' }
    ],
    strategyOverview: 'Cross-Country Proxy + Risk-Segmented Veterinary Funnel! Step 1 (UK Horse Base via US Proxy): UK Pop = 60M–67M × 1:60 horse-to-human ratio ≈ 1.0M UK horses! Step 2 (Segment by Injury Risk & Insurance): Thoroughbred/Racing/Competition Horses (~10% = 100K, high injury & insured → 20% lameness/yr × 50% MRI scan = 10K scans) vs Leisure/Riding Horses (~90% = 900K → 10% lameness × 10% MRI = 9K scans) = ~19K–20K annual scans! Step 3 (Two Revenue Streams): Scan Revenue (20,000 scans × £1,200/scan = £24M) + Machine Maintenance (~50 equine MRI clinics × £40K/yr maintenance = £2M) = ~£26M/year UK market!',
    formula: 'TAM = [∑ (Horse Segment × Lameness % × MRI Adoption %) × Fee/Scan] + (Installed Scanners × Maintenance Fee/Yr)',
    assumptions: [
      { label: 'UK Horse Population via Proxy: 60M UK Pop × (1 horse per 60 humans) = ~1.0 Million horses', rationale: 'Matches real British Equestrian estimates (~850K–1.0M UK horses).' },
      { label: 'Scans/Yr: Racing/Sport (100K × 20% injury × 50% MRI = 10K) + Leisure (900K × 10% × 10% = 9K) ≈ ~20,000 scans/yr', rationale: 'Sport/racing horses carry £50K–£500K values + vet insurance, justifying £1,000–£1,500 standing MRI scans.' },
      { label: '20,000 scans × £1,200/scan (£24M) + ~50 equine clinic machines × £40,000/yr maintenance (£2M) = £26M/yr', rationale: 'Each equine clinic averages ~400 scans/year (~1.5/working day).' }
    ],
    tree: {
      label: 'UK Horse Population (60M × 1:60 Proxy = 1M Horses)',
      valueText: '1.0M Horses',
      children: [
        { label: 'Racing / Sport (100K × 20% inj × 50% MRI)', valueText: '10,000 scans/yr' },
        { label: 'Leisure / Riding (900K × 10% inj × 10% MRI)', valueText: '9,000–10,000 scans/yr' },
        {
          label: 'Total ~20,000 Scans/Yr × £1,200/Scan',
          valueText: '£24M Scan Revenue',
          highlight: true,
          children: [
            { label: '+ 50 Scanners × £40K/Yr Maintenance', valueText: '~£26M / Yr Total TAM', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~£22M – £30M / Year (~20,000 Scans + Maintenance)',
    acceptableRange: { min: 12, max: 45, unit: '£ Million/year', display: '£12M – £45M/yr' },
    sanityCheck: 'The UK famously has ~45–60 specialized equine referral hospitals with standing MRI systems (Hallmarq/Equine MRI). At ~350–400 scans/machine/yr, 50 scanners = ~18,000–20,000 annual scans — remarkably exact!',
    interviewerTrap: 'Only estimating scan fees (forgetting high-margin annual maintenance contracts on installed MRI machines!) OR failing to separate insured racing/competition horses from uninsured hobby ponies.',
    variations: [
      { question: 'How many UK equine clinics can economically justify buying a £400,000 MRI scanner?', hint: '20,000 scans ÷ ~350–400 breakeven scans/clinic/yr ≈ ~50–57 clinics nationwide.' }
    ],
    guidedPractice: {
      correctApproach: 'Geometry & Proxy',
      funnelOptions: [
        { label: 'Proxy UK Horse Pop → Sport vs Leisure Split × Injury % × MRI Rate × Fee + Scanner Maintenance', correct: true, feedback: 'Spot on! Proxy ratio scaling + dual revenue streams (scans + maintenance) nails PE MedTech sizing.' },
        { label: 'UK Human MRI Scans × 1%', correct: false, feedback: 'Veterinary orthopedic lameness economics differ completely from NHS human diagnostics.' },
        { label: 'Total UK Farms × 1 Machine', correct: false, feedback: 'Farms do not buy MRI scanners — specialized equine hospitals do.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'horsesK', label: 'UK Horse Pop (K)', defaultVal: 1000, min: 600, max: 1400, step: 100, unit: 'K' },
        { key: 'scanRatePct', label: 'Blended Annual MRI Scan %', defaultVal: 2.0, min: 1.0, max: 3.5, step: 0.25, unit: '%' },
        { key: 'feeGbp', label: 'Fee / MRI Scan (£)', defaultVal: 1200, min: 700, max: 1800, step: 100, unit: '£' },
        { key: 'scanners', label: 'Installed UK Scanners', defaultVal: 50, min: 30, max: 80, step: 5, unit: 'units' }
      ],
      computeFormulaText: '(Horses × Scan% × Fee) + (Installed Scanners × £40K Maintenance)',
      compute: (v) => {
        const scans = v.horsesK * 1000 * (v.scanRatePct / 100);
        const scanRevM = (scans * v.feeGbp) / 1e6;
        const maintM = (v.scanners * 40000) / 1e6;
        return {
          value: scanRevM + maintM,
          formatted: `£${(scanRevM + maintM).toFixed(1)} Million/Yr`,
          breakdown: [
            { label: 'Annual Equine Scans', val: `${Math.round(scans).toLocaleString('en-IN')}` },
            { label: 'Maint. Revenue', val: `£${maintM.toFixed(1)}M/yr` }
          ]
        };
      }
    }
  },
  // 14
  {
    id: 'cb-pet-supply-india',
    title: 'Annual Market Size of the Indian Pet Care & Supply Industry',
    prompt: 'Estimate the annual market size of the Indian pet supply and pet care industry, covering household pets as well as NGO/community street animals.',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Pet Care', 'Consumer Spend', 'Direct + NGO', 'India'],
    clarifyingQuestions: [
      { q: 'Include both physical goods (food, supplements, toys) AND pet services (vet care, grooming, training)?', a: 'Yes, include both products and recurring pet services.', why: 'Grooming, vet visits, and annualized training represent ~35–40% of total wallet share!' },
      { q: 'Focus purely on domestic household pets or include NGO/shelter and fed street animals?', a: 'Include both: Household pets (direct) plus NGO/community-fed animals (indirect).', why: 'Tests thorough MECE scope expansion without double-counting.' }
    ],
    strategyOverview: 'Two-Bucket Direct + Indirect Pet Spend Model! Direct (Household Pets): India Pop 1.4B ÷ 4 = 350M HH × 7% pet-owning homes = 24.5M pet households! Annual Spend/Pet = ₹25,500: Food (100kg = ₹15,000) + Supplements (₹2,000) + Grooming (3×₹500 = ₹1,500) + Vet/Meds (₹2,500) + Toys (₹1,000) + Training (₹35K÷10 yrs = ₹3,500) → 24.5M × ₹25,500 = ₹62,475 Cr! Indirect (NGO & Street Animals): ~2.18M shelter animals (large + small NGOs) + ~2.5M community-fed street dogs = ~4.68M animals × ₹9,000/yr (₹6K food + ₹3K vet) = ₹4,208 Cr → Total Baseline ≈ ₹66,683 Cr (~₹15K–₹25K Cr commercial packaged market if accounting for home-cooked pet food!).',
    formula: 'Pet Market = (HH × Pet % × Annual Spend/Pet) + (NGO/Community Animals × Annual Care Cost)',
    assumptions: [
      { label: 'India 350M Households × 7% Pet Ownership = 24.5M Pet Households (~30–35M total pets)', rationale: 'Note: ~60–70% of Indian homes feed home food rather than ₹15K packaged kibble, making ₹62K Cr theoretical full spend (~₹15K Cr commercial packaged).' },
      { label: 'Direct Cost/Pet/Yr = ₹25,500 (Food ₹15K + Training ₹3.5K + Vet ₹2.5K + Supp ₹2K + Groom ₹1.5K + Toys ₹1K)', rationale: 'Direct segment = 24.5M × ₹25,500 = ₹62,475 Crore (₹624.75B).' },
      { label: 'Indirect: 4.675M NGO + community-fed animals × ₹9,000/yr (₹6K food + ₹3K vet) = ₹4,208 Crore', rationale: 'Avoid double-counting NGO rescues and street feeders!' }
    ],
    tree: {
      label: 'India Pet Supply & Care Market',
      valueText: 'Total: ₹66,683 Cr (₹666.8B)',
      children: [
        {
          label: 'Direct Household Pets (350M × 7% = 24.5M HH)',
          valueText: '₹62,475 Crore',
          highlight: true,
          children: [
            { label: '× ₹25,500/yr (Food ₹15K + Services/Vet/Training ₹10.5K)', valueText: '₹62,475 Cr' }
          ]
        },
        {
          label: 'Indirect NGO + Fed Street Animals (4.675M × ₹9,000)',
          valueText: '₹4,208 Crore'
        }
      ]
    },
    finalAnswer: '~₹15,000 Cr Packaged Retail | ~₹66,680 Cr Total Pet Care Value (Baseline)',
    acceptableRange: { min: 10000, max: 75000, unit: '₹ Crore/year', display: '₹10,000 Cr – ₹75,000 Cr/yr' },
    sanityCheck: 'India’s organized packaged pet care & food industry is currently ~$1.2B–$1.8B (~₹10,000–15,000 Cr) because ~70% of pet homes still serve home-cooked rice/curd/roti! Mentioning packaged kibble penetration (25–30% of owners) reconciles the ₹66,683 Cr ceiling right onto the ₹15,000 Cr commercial market!',
    interviewerTrap: 'Assuming 100% of Indian pet owners buy ₹15,000/year of packaged kibble & hire ₹35,000 dog trainers (which happens primarily in Tier-1 upper-middle/affluent pet homes).',
    variations: [
      { question: 'Isolate just the commercial packaged pet-food (kibble/treats) market in India.', hint: '24.5M pet homes × ~30% buying packaged food × ₹15,000/yr ≈ ~₹11,000 Crore/yr!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'India Households × Pet Ownership % × Basket Spend (Food + Vet + Grooming) + Indirect NGO/Street Spend', correct: true, feedback: 'Spot on! Breaking down the annual basket + direct vs NGO/street coverage is complete.' },
        { label: 'India Population × 10%', correct: false, feedback: 'Pets belong to households, not every individual in a family separately.' },
        { label: 'Pet Shops in India × 100', correct: false, feedback: 'Misses online D2C (Supertails/Amazon) and vet clinic/NGO spend.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'hhM', label: 'India Households (M)', defaultVal: 350, min: 300, max: 380, step: 10, unit: 'M' },
        { key: 'petPct', label: 'Pet-Owning HH %', defaultVal: 7, min: 3, max: 12, step: 1, unit: '%' },
        { key: 'spendYr', label: 'Annual Spend / Pet (₹)', defaultVal: 25500, min: 6000, max: 35000, step: 1500, unit: '₹' },
        { key: 'ngoCr', label: 'NGO & Street Care (₹ Cr)', defaultVal: 4208, min: 1000, max: 6000, step: 500, unit: '₹ Cr' }
      ],
      computeFormulaText: '(HH × Pet% × Annual Spend/Pet) + NGO & Community Animal Care',
      compute: (v) => {
        const directCr = (v.hhM * 1e6 * (v.petPct / 100) * v.spendYr) / 1e7;
        const totalCr = directCr + v.ngoCr;
        return {
          value: totalCr,
          formatted: `₹${Math.round(totalCr).toLocaleString('en-IN')} Crore/Yr`,
          breakdown: [
            { label: 'Pet Households', val: `${(v.hhM * v.petPct / 100).toFixed(1)} M` },
            { label: 'Direct Household Share', val: `₹${Math.round(directCr).toLocaleString('en-IN')} Cr` }
          ]
        };
      }
    }
  },
  // 15
  {
    id: 'cb-ai-consulting-tools',
    title: 'Enterprise AI Tool Sustained Adoption at a Global Consulting Firm',
    prompt: 'A global consulting firm (100,000 total workforce) is rolling out AI-powered analytics & workflow tools. Estimate the sustained active user base after 6–12 months.',
    difficulty: 4,
    archetype: 'Usage & Behavioral',
    approachType: 'Hybrid (Demand + Supply)',
    templateId: 'tpl-workforce',
    tags: ['Enterprise SaaS', 'AI Adoption', 'B2B Change Mgmt', 'Retention Funnel'],
    clarifyingQuestions: [
      { q: 'Are we estimating sustained/retained active usage (6–12 months post-rollout) rather than Day-1 license provisioning?', a: 'Yes, sustained active monthly/weekly users 6–12 months after launch.', why: 'Enterprise software licenses ≠ sustained workflow adoption!' },
      { q: 'Should we cross-check activation-retention funnel against a service-line mix breakdown?', a: 'Yes! Cross-check Top-Down Funnel (Initial Activation × 6-Month Retention) against Service-Line Weighted Adoption (Strategy/Analytics vs Audit/Tax).', why: 'Two independent methods verify internal model consistency.' }
    ],
    strategyOverview: 'Two-Method Enterprise SaaS Retention & Service-Line Check! Method A (Activation × Retention Funnel): Total Consultants (100,000) × Early SaaS Activation Benchmark (20–30%, midpoint 25% = 25,000 initial adopters) × 6-Month Retention (40–60%, midpoint 50%) = 12,500 sustained users! Method B (Service-Line Weighted Check): Strategy/Analytics (30% = 30K × 20% sustained adoption = 6,000) + Audit/Tax/Compliance (70% = 70K × 10% sustained = 7,000) = 13,000 sustained users! Apply client-NDA/training friction (-10–20%) → ~10,000–13,000 sustained users (~10–13% net adoption)!',
    formula: 'Method A: Workforce × Initial Activation % × 6-Mo Retention % | Method B: ∑ (Service Line Headcount × Adoption %)',
    assumptions: [
      { label: 'Workforce = 100,000 | SaaS Rollout Initial Activation = 25% (25,000) × 50% 6-Month Retention = 12,500 users', rationale: 'Enterprise tools see steep drop-off when not embedded directly into engagement templates.' },
      { label: 'Service-Line Mix: Strategy & Analytics (30K × 20% = 6K) + Audit/Tax (70K × 10% = 7K) = 13,000 users', rationale: 'Strategy/data teams adopt faster; Audit/Tax lag due to strict client confidentiality & regulatory controls.' },
      { label: 'Adoption Barriers (Client NDA blocks, workflow friction, training gaps) create ~10,000–13,000 net range', rationale: 'Notice Methods A & B are alternative cross-checks (do NOT add them together!).' }
    ],
    tree: {
      label: 'Global Consulting Workforce (100,000)',
      valueText: '100,000 Staff',
      children: [
        {
          label: 'Method A: Funnel (25% Initial = 25K × 50% 6-Mo Retained)',
          valueText: '12,500 Sustained Users',
          highlight: true
        },
        {
          label: 'Method B: Service-Line Mix (30K Tech/Strat×20% + 70K Audit×10%)',
          valueText: '13,000 Sustained Users',
          highlight: true
        },
        { label: 'Realistic Range (After Client Approval / Integration Friction)', valueText: '10,000 – 13,000 Active Users' }
      ]
    },
    finalAnswer: '~10,000 – 13,000 Sustained Active Users (~10–13% Workforce)',
    acceptableRange: { min: 8000, max: 22000, unit: 'Active users', display: '8,000 – 22,000 active users' },
    sanityCheck: 'Enterprise SaaS benchmarks typically see ~10–20% sustained organic workflow usage in the first 6–12 months unless mandated on client-billing platforms.',
    interviewerTrap: 'Adding Method A (12.5K) + Method B (13K) together (they are two cross-checks for the SAME pool!) OR assuming 80–90% license rollout equals active sustained usage.',
    variations: [
      { question: 'Estimate the annual consulting hours saved if each sustained user saves 2.5 hrs/week.', hint: '12,500 users × 2.5 hrs × 48 weeks ≈ ~1.5 Million hours saved/year!' }
    ],
    guidedPractice: {
      correctApproach: 'Hybrid (Demand + Supply)',
      funnelOptions: [
        { label: 'Workforce → Early Activation % × 6-Mo Retention %, cross-checked via Service-Line Adoption Mix', correct: true, feedback: 'Spot on! Dual-method enterprise B2B SaaS triangulation.' },
        { label: '100,000 × 90% Tech Workers', correct: false, feedback: 'Enterprise audit/tax dominance & client compliance constraints limit rapid adoption.' },
        { label: 'Total AI Engineers ÷ 2', correct: false, feedback: 'Tool adoption depends on end-user consultants, not internal engineering headcount.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'staffK', label: 'Total Workforce (K)', defaultVal: 100, min: 50, max: 200, step: 10, unit: 'K' },
        { key: 'initPct', label: 'Initial Activation %', defaultVal: 25, min: 10, max: 50, step: 5, unit: '%' },
        { key: 'retPct', label: '6-Month Retention %', defaultVal: 50, min: 25, max: 80, step: 5, unit: '%' }
      ],
      computeFormulaText: 'Workforce × Initial Activation% × 6-Month Retention%',
      compute: (v) => {
        const sustained = v.staffK * 1000 * (v.initPct / 100) * (v.retPct / 100);
        return {
          value: Math.round(sustained),
          formatted: `${Math.round(sustained).toLocaleString('en-IN')} Active Users`,
          breakdown: [
            { label: 'Initial Pilot Users', val: `${Math.round(v.staffK * 10 * v.initPct).toLocaleString('en-IN')}` },
            { label: 'Effective Workforce %', val: `${((v.initPct * v.retPct) / 100).toFixed(1)}%` }
          ]
        };
      }
    }
  },
  // 16
  {
    id: 'cb-notion-sessions',
    title: 'Daily Multi-User Collaboration Sessions on Notion Globally',
    prompt: 'Estimate the number of real-time multi-user collaboration sessions initiated daily on Notion worldwide.',
    difficulty: 4,
    archetype: 'Usage & Behavioral',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['SaaS & Productivity', 'Notion', 'Global', 'Collaboration Funnel'],
    clarifyingQuestions: [
      { q: 'How do we strictly define one "collaboration session"?', a: 'A 10-minute window in which more than two users concurrently edit or collaborate on the same Notion page.', why: 'Excludes solo note-taking AND purely asynchronous comments hours apart!' },
      { q: 'Exclude solo personal accounts where only 1 person edits?', a: 'Yes, isolate Team/Workspace accounts (~60% of Notion users) before calculating multi-user initiation rates.', why: 'Solo students/note-takers never trigger multi-user collaboration.' }
    ],
    strategyOverview: 'Global SaaS Funnel → Team Filter → Async Exclusion! Start with World Pop (8B) × 60% Internet (4.8B) × 50% Productivity Software Users (2.4B) × 1% Notion Penetration (~24M users) × 60% Team Workspace Accounts = 14.4M Team Users! Split Users: Students (20% = 2.88M) × 25% collaborate daily × 30% initiate a session = 0.216M sessions; Working Professionals (80% = 11.52M) × 30% collaborate daily × 50% initiate = 1.728M sessions! Gross = 1.944M sessions/day → subtract 10% for asynchronous edits outside the 10-min window = ~1.75 Million sessions/day!',
    formula: 'Daily Sessions = [∑ (Team Segment × Daily Collab % × Initiation %)] × (1 - Async Adjustment %)',
    assumptions: [
      { label: '8B Global → 60% Net (4.8B) → 50% Productivity Tools (2.4B) → 1% Notion (24M) → 60% Team Users = 14.4M', rationale: 'Note: Notion publicly reached ~30M–35M+ users (~15–20M team-eligible seats).' },
      { label: 'Students (2.88M × 25% × 30% = 0.216M) + Professionals (11.52M × 30% × 50% = 1.728M) = 1.944M/day', rationale: 'Initiation rate prevents double/triple-counting the same 3 collaborators on one session!' },
      { label: 'Subtract 10% asynchronous contributions (not simultaneous 10-min overlap) = ~1.75M Net Sessions/Day', rationale: 'Team check: 14.4M team users ÷ 6/team = 2.4M teams → 1.75M ÷ 2.4M ≈ 0.73 sessions/team/day!' }
    ],
    tree: {
      label: 'Global Pop (8B) → Team Notion Base (14.4M Users)',
      valueText: '14.4M Team Users',
      children: [
        { label: 'Students (2.88M × 25% collab × 30% initiate)', valueText: '0.216M/day' },
        { label: 'Working Pros (11.52M × 30% collab × 50% initiate)', valueText: '1.728M/day', highlight: true },
        {
          label: 'Gross Multi-User Sessions = 1.944M/day',
          valueText: '1.944M/day',
          children: [
            { label: '– 10% Async (Non-10-Min Simultaneous)', valueText: '~1.75M Sessions/Day', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~1.75 Million Collaboration Sessions/Day',
    acceptableRange: { min: 0.9, max: 3.5, unit: 'Million sessions/day', display: '0.9M – 3.5M sessions/day' },
    sanityCheck: 'Workspace check: 14.4M team users ÷ ~6 users/workspace = ~2.4M active shared workspaces. 1.75M daily multi-user sessions equals ~0.73 sessions per workspace per day (~8.75M collaborative page edits at 5 edits/session) — totally realistic vs Google Docs!',
    interviewerTrap: 'Double-counting sessions per participant (if 3 people collaborate on 1 page, count 1 session using an "Initiation Rate" ÷ group size rather than 3!) OR forgetting solo Notion note-takers.',
    variations: [
      { question: 'How many total page edits occur across these collaborative sessions daily?', hint: '1.75M sessions × ~5 edits/session ≈ ~8.75M live collaborative edits/day.' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Global Net → Productivity Tools → Notion % → Team Accounts × Segment Daily Collab % × Initiation %', correct: true, feedback: 'Spot on! Using an Initiation Rate avoids double/triple-counting the same multi-user session!' },
        { label: '24M Users × 2 Sessions/Day', correct: false, feedback: 'Overcounts solo users, inactive seats, and multi-person overlap massively.' },
        { label: 'Companies in US × 10', correct: false, feedback: 'Notion has strong global traction and large student adoption outside the US.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'notionM', label: 'Global Notion Users (M)', defaultVal: 24, min: 15, max: 50, step: 3, unit: 'M' },
        { key: 'teamPct', label: 'Team Workspace Share %', defaultVal: 60, min: 40, max: 80, step: 5, unit: '%' },
        { key: 'collabPct', label: 'Daily Active Collab %', defaultVal: 29, min: 15, max: 45, step: 2, unit: '%' },
        { key: 'initPct', label: 'Session Initiation %', defaultVal: 46, min: 25, max: 60, step: 5, unit: '%' }
      ],
      computeFormulaText: 'Users × Team% × Collab% × Initiation% × 0.90 (Sync Window)',
      compute: (v) => {
        const netM = v.notionM * (v.teamPct / 100) * (v.collabPct / 100) * (v.initPct / 100) * 0.9;
        return {
          value: netM,
          formatted: `${netM.toFixed(2)}M Sessions/Day`,
          breakdown: [
            { label: 'Team Workspace Users', val: `${(v.notionM * v.teamPct / 100).toFixed(1)} M` },
            { label: 'Live Edits (@ 5/session)', val: `${(netM * 5).toFixed(1)} M/day` }
          ]
        };
      }
    }
  },
  // 17
  {
    id: 'cb-shopify-merchants',
    title: 'Daily Active Merchants (DAU) on Shopify Globally',
    prompt: 'Estimate the number of Shopify merchants who actively log in and use the platform daily (DAU) worldwide.',
    difficulty: 3,
    archetype: 'Usage & Behavioral',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-workforce',
    tags: ['B2B SaaS', 'E-Commerce', 'Shopify', 'DAU/MAU Matrix'],
    clarifyingQuestions: [
      { q: 'Start from Shopify’s global merchant base (~2M stores) and model daily engagement across merchant size & region?', a: 'Yes! Segment merchants by Scale (Large/Mid/Small) and Region (Developed NA/EU vs Developing Markets).', why: 'Enterprise stores run daily fulfillment 100% of days; side-hustle stores log in ~10–15% of days.' },
      { q: 'Normal operating day vs peak holiday sale (BFCM)?', a: 'Normal non-promotional day (~651K DAU), noting +10–15% peak sale surge.', why: 'Keeps baseline clean with clear seasonal sensitivity.' }
    ],
    strategyOverview: '2D Scale × Region B2B Merchant Matrix! Start with Global Shopify Merchants = 2.0M: Large Retailers (15% = 300K), Mid-Scale (50% = 1.0M), Small/Side-Hustle (35% = 700K). Apply Region Mix: Large (80% NA/EU = 240K, 20% Dev = 60K); Mid (60% = 600K, 40% = 400K); Small (60% = 420K, 40% = 280K). Apply Daily Login/Active Rates: Large (100% both → 240K+60K), Mid (30% NA/EU = 180K, 20% Dev = 80K), Small (15% NA/EU = 63K, 10% Dev = 28K) → Sum = 651K DAU (~32.6% DAU/MAU stickiness; ~716K peak sale)!',
    formula: 'Daily Active Merchants = ∑ (Scale Tier × Region Split % × Daily Active Login %)',
    assumptions: [
      { label: '2.0M Merchants: 15% Large (300K), 50% Mid (1.0M), 35% Small (700K)', rationale: 'Mix of D2C brands, SMB stores, and experimental side hustles.' },
      { label: 'Large (80/20 NA-EU/Dev @ 100% DAU = 300K) | Mid (60/40 @ 30%/20% = 260K) | Small (60/40 @ 15%/10% = 91K)', rationale: 'Larger fulfillment volume mandates daily dashboard management.' },
      { label: 'Total DAU = 300K + 260K + 91K = 651K/day (~32.6% DAU/MAU; +10% Peak Sale = 716K)', rationale: 'Aligns cleanly with 25–40% B2B SaaS operational DAU benchmarks!' }
    ],
    tree: {
      label: 'Global Shopify Merchants (2.0M Stores)',
      valueText: '2.0M Merchants',
      children: [
        { label: 'Large Scale (300K: 240K NA/EU + 60K Dev @ 100% DAU)', valueText: '300K DAU', highlight: true },
        { label: 'Mid Scale (1.0M: 600K×30% + 400K×20%)', valueText: '260K DAU' },
        { label: 'Small Scale (700K: 420K×15% + 280K×10%)', valueText: '91K DAU' },
        { label: 'Total Daily Active Merchants (32.6% Stickiness)', valueText: '651K Merchants/Day', highlight: true }
      ]
    },
    finalAnswer: '~651,000 Daily Active Merchants (~716K During Peak BFCM Sales)',
    acceptableRange: { min: 400, max: 1100, unit: 'Thousand DAU', display: '400K – 1.1M daily active merchants' },
    sanityCheck: '651K / 2M = ~32.6% DAU/MAU ratio. B2B merchant/SaaS operational back-offices typically achieve 25–40% daily engagement (much higher than consumer e-commerce apps at 5–15%!).',
    interviewerTrap: 'Assuming 100% of registered Shopify stores are active daily — massive churn & side-hustle hobby stores mean 35%–50% of SMB merchants check dashboards only 1–2x/week.',
    variations: [
      { question: 'Estimate total daily Shopify orders processed across these 651K active merchants.', hint: 'Large (300K × ~250 orders = 75M? Wait ~20–30 avg across large/mid!) ≈ ~12M–18M orders/day.' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Total Merchants → Merchant Scale (Large/Mid/Small) × Region Mix × Segment Daily Active Rate %', correct: true, feedback: 'Textbook B2B segmentation! Store scale is the #1 driver of daily dashboard logins.' },
        { label: 'Global E-Commerce Sales ÷ $100', correct: false, feedback: 'Sizes total GMV/orders rather than active merchant count.' },
        { label: '8B ÷ 4 × 1%', correct: false, feedback: 'Consumer population doesn’t capture SMB merchant adoption cleanly.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'merchantsM', label: 'Total Merchants (M)', defaultVal: 2.0, min: 1.0, max: 5.0, step: 0.5, unit: 'M' },
        { key: 'largeDauPct', label: 'Large-Scale DAU % (15% base)', defaultVal: 100, min: 70, max: 100, step: 5, unit: '%' },
        { key: 'midDauPct', label: 'Mid-Scale Blended DAU % (50%)', defaultVal: 26, min: 15, max: 45, step: 2, unit: '%' },
        { key: 'smallDauPct', label: 'Small-Scale Blended DAU % (35%)', defaultVal: 13, min: 5, max: 25, step: 2, unit: '%' }
      ],
      computeFormulaText: 'Merchants × [(0.15 × Large%) + (0.50 × Mid%) + (0.35 × Small%)]',
      compute: (v) => {
        const totalK = v.merchantsM * 1000 * (0.15 * v.largeDauPct / 100 + 0.5 * v.midDauPct / 100 + 0.35 * v.smallDauPct / 100);
        return {
          value: Math.round(totalK),
          formatted: `${Math.round(totalK).toLocaleString('en-IN')}K Daily Merchants`,
          breakdown: [
            { label: 'DAU / MAU Stickiness', val: `${((totalK / (v.merchantsM * 1000)) * 100).toFixed(1)}%` },
            { label: 'Peak Holiday (+10%)', val: `${Math.round(totalK * 1.1).toLocaleString('en-IN')}K/day` }
          ]
        };
      }
    }
  },
  // 18
  {
    id: 'cb-xbox-sales',
    title: 'Global Annual & Off-Season Quarterly Xbox Console Sales',
    prompt: 'Estimate the total number of Xbox gaming consoles sold globally in a year (and in an off-season quarter).',
    difficulty: 4,
    archetype: 'Market Sizing',
    approachType: 'Replacement & Stock-Flow',
    templateId: 'tpl-durable',
    tags: ['Gaming Hardware', 'Global', 'Replacement + Growth', 'Seasonality'],
    clarifyingQuestions: [
      { q: 'Are we estimating GLOBAL unit sales across all Xbox Series models (excluding Sony PlayStation & Nintendo)?', a: 'Yes, global annual Xbox unit sales (~30% console share), plus off-season quarterly breakdown.', why: 'Global gaming hardware is concentrated in NA/EU/Japan/urban LATAM/APAC.' },
      { q: 'Account for both replacement cycles AND organic gaming household growth?', a: 'Yes: Replacement = (Installed Stock ÷ 7-Yr Lifecycle) + Annual Market Growth (5%).', why: 'Standard durable electronics flow equation.' }
    ],
    strategyOverview: 'Global Stock-Flow + Seasonality Funnel! Start with Global Pop (8B ÷ 3.5 avg HH = ~2.3B Households). Segment Income: Upper (20% = 460M × 40% pen × 1.5 consoles = 276M), Middle (40% = 920M × 15% × 0.8 = 110M), Lower (40% = 920M × 5% × 0.3 = 14M) → Total Global Console Stock = 400M! Apply Xbox Market Share (30%) → 120M Xbox Installed Base. Annual Sales: Replacement (120M ÷ 7-yr life = 17M) + New Growth (5% × 120M = 6M) = 23M/year! Off-Season Quarter (~15% share vs Q4 Holiday ~45%) = ~3.45M–3.5M units!',
    formula: 'Annual Sales = (Installed Base × Xbox % ÷ 7-Yr Life) + (Xbox Base × Growth %) | Off-Season Qtr = Annual × 15%',
    assumptions: [
      { label: '8B Global Pop ÷ 3.5 = 2.3B HH → Income Matrix yields ~400M installed gaming consoles globally', rationale: 'Note: ~150M PlayStation + ~140M Switch + ~90–120M Xbox ≈ ~400M cumulative console base!' },
      { label: 'Xbox Share = 30% (120M base) ÷ 7-yr generation lifecycle = 17M replacement + 5% growth (6M) = 23M/yr', rationale: '7-year console cycle matches Xbox One (2013) → Series X/S (2020).' },
      { label: 'Seasonality: Q4 holiday peak drives ~40–45% of sales; off-season Q2/Q3 ≈ 15% → ~3.45M units', rationale: 'Matches typical hardware Q2/Q4 seasonality.' }
    ],
    tree: {
      label: 'Global Households (8B ÷ 3.5 = 2.3B HH)',
      valueText: '400M Total Consoles',
      children: [
        { label: 'Upper 460M (276M) + Mid 920M (110M) + Lower 920M (14M)', valueText: '400M consoles' },
        {
          label: 'Xbox Base (30% Market Share)',
          valueText: '120M Xbox Base',
          children: [
            { label: 'Replacement (120M ÷ 7 yrs = 17M) + 5% Growth (6M)', valueText: '23M Units/Year', highlight: true },
            { label: 'Off-Season Quarter (15% of Annual)', valueText: '~3.45M / Quarter', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~23 Million/Year (Off-Season Quarter: ~3.45 Million Units)',
    acceptableRange: { min: 10, max: 32, unit: 'Million units/yr', display: '10M – 32M Xbox consoles/yr' },
    sanityCheck: 'Combined global Xbox One + Series X|S lifetime generation sales run ~85M–110M (~12M–18M/yr avg, peaking ~20M+ early cycle). Adjusting Xbox share from 30% to ~22–25% puts annual sales right on ~16–19M units!',
    interviewerTrap: 'Assuming equal quarterly sales (23M ÷ 4) when gaming consoles see huge Q4 Black Friday/Christmas spikes (~40–45% of annual volume) vs ~15% off-season quarters!',
    variations: [
      { question: 'Estimate annual hardware revenue for Xbox at $400 blended wholesale price.', hint: '23M × $400 ≈ ~$9.2 Billion/yr (or ~$6.5B–$7B at 17M real run-rate).' }
    ],
    guidedPractice: {
      correctApproach: 'Stock & Replacement',
      funnelOptions: [
        { label: 'Global HH → Income Penetration → Total Consoles × Xbox Share % ÷ 7-Yr Life (+ Growth) × Quarter %', correct: true, feedback: 'Spot on! Durable stock-flow + Q4/off-season seasonality is the complete model.' },
        { label: 'Global Gamers (3B) ÷ 100', correct: false, feedback: 'Most global gamers play on mobile phones, not living-room consoles.' },
        { label: 'Electronics Stores × 50', correct: false, feedback: 'Misses online D2C/Amazon dominance and store regional mix.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'totalStockM', label: 'Global Console Base (M)', defaultVal: 400, min: 300, max: 500, step: 25, unit: 'M' },
        { key: 'xboxPct', label: 'Xbox Market Share %', defaultVal: 30, min: 15, max: 40, step: 5, unit: '%' },
        { key: 'lifeYrs', label: 'Generation Cycle (Yrs)', defaultVal: 7, min: 5, max: 9, step: 1, unit: 'yrs' },
        { key: 'offSeasonPct', label: 'Off-Season Qtr %', defaultVal: 15, min: 10, max: 25, step: 5, unit: '%' }
      ],
      computeFormulaText: '[(Stock × Xbox%) ÷ Cycle + (Stock × Xbox% × 5%)] | Off-Season = Annual × Qtr%',
      compute: (v) => {
        const xboxBase = v.totalStockM * (v.xboxPct / 100);
        const annual = xboxBase / v.lifeYrs + xboxBase * 0.05;
        const offQtr = annual * (v.offSeasonPct / 100);
        return {
          value: annual,
          formatted: `${annual.toFixed(1)}M/Yr (${offQtr.toFixed(2)}M Off-Qtr)`,
          breakdown: [
            { label: 'Xbox Installed Base', val: `${xboxBase.toFixed(0)} M` },
            { label: 'Off-Season Quarter', val: `${offQtr.toFixed(2)} M` }
          ]
        };
      }
    }
  },
  // 19
  {
    id: 'cb-hotel-daily-tips',
    title: 'Daily Tip Collection at an Urban Full-Service Hotel',
    prompt: 'Estimate the total amount of customer tips collected across all departments of a mid-to-upscale full-service urban hotel (e.g., in Delhi) in a single day.',
    difficulty: 2,
    archetype: 'Revenue & Cost',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-outlet',
    tags: ['Hospitality', 'Hotel Operations', 'Multi-Stream Tips', 'Delhi'],
    clarifyingQuestions: [
      { q: 'Which hotel tip touchpoints should we include beyond restaurant dining?', a: 'Include 4 MECE departments: Dine-in Restaurant, Banquet/Events, Room Bookings (housekeeping/bellboy), and Valet Parking.', why: 'Breaking a hotel into operational revenue centers prevents missing large banquet/valet tips!' },
      { q: 'What category of hotel is this (luxury 5-star vs general full-service business hotel)?', a: 'Standard full-service urban hotel (~150 rooms, ~100 restaurant covers, ~2 daily banquet events).', why: 'Sets realistic occupancy, room tariff (₹5,000), and dining check sizes (₹3,000).' }
    ],
    strategyOverview: 'Four-Department Supply-Side Hotel Revenue Breakdown! 1. Events: 2 banquets/day × ₹3,00,000 event rev × 5% tip = ₹30,000/day. 2. Dine-In (100 tables × ₹3,000 avg bill × 5% tip): Breakfast (50% = ₹7,500) + Lunch (75% = ₹11,250) + Dinner (85% = ₹12,750) = ₹31,500/day. 3. Room Bookings: 150 rooms × 50% occ × ₹5,000 tariff × 5% tip = ₹18,750/day. 4. Valet Parking: ~200 vehicles/day across guests/diners/events × ₹50 avg tip = ₹10,000/day → Grand Total = ₹90,250/day!',
    formula: 'Daily Tips = Event Tips + ∑ (Meal Occ % × Tables × Bill × Tip%) + (Rooms × Occ% × Tariff × Tip%) + (Cars × Valet Tip)',
    assumptions: [
      { label: 'Events (2/day × ₹3L × 5% = ₹30,000) & Valet Parking (200 cars × ₹50 = ₹10,000)', rationale: 'Corporate/wedding events and valet desks generate concentrated tip volume.' },
      { label: 'Dine-In (100 tables @ ₹3,000 bill × 5%): Bfast 50% (₹7.5K) + Lunch 75% (₹11.25K) + Dinner 85% (₹12.75K) = ₹31,500', rationale: 'Three distinct meal dayparts capture full dining throughput.' },
      { label: 'Room Bookings: 150 rooms × 50% occ × ₹5,000 ADR × 5% = ₹18,750 → Total = ₹90,250/day', rationale: 'Note: In India, when service charge is already billed, cash tips may be ~2–3% vs 5% (~₹50K–₹90K/day).' }
    ],
    tree: {
      label: 'Full-Service Urban Hotel (150 Rooms | 100 Tables)',
      valueText: '₹90,250 / Day Tips',
      children: [
        { label: 'Dine-In (50% / 75% / 85% across 3 meals × ₹3,000 × 5%)', valueText: '₹31,500/day', highlight: true },
        { label: 'Banquet Events (2 events/day × ₹3L × 5%)', valueText: '₹30,000/day' },
        { label: 'Room Housekeeping/Bell (150 × 50% × ₹5,000 × 5%)', valueText: '₹18,750/day' },
        { label: 'Valet Parking (200 cars/day × ₹50 avg)', valueText: '₹10,000/day' }
      ]
    },
    finalAnswer: '~₹90,250 / Day (~₹50,000 – ₹95,000/Day)',
    acceptableRange: { min: 35000, max: 140000, unit: '₹/day', display: '₹35,000 – ₹1,40,000/day' },
    sanityCheck: 'Total daily hotel revenue under these assumptions is ~₹16 Lakh/day (₹6L events + ₹6.3L dine-in + ₹3.75L rooms). ₹90,250 equals ~5.6% blended tip/service pool (~₹1,500/staff/day across ~60 service staff), completely realistic!',
    interviewerTrap: 'Only estimating restaurant dining tips while overlooking banquets, room bell/housekeeping, and valet parking — OR forgetting whether a 5–10% mandatory service charge reduces voluntary tipping.',
    variations: [
      { question: 'How much monthly tip revenue goes to a hotel’s pooled service staff (~60 workers)?', hint: '₹90,250 × 30 days = ₹27.08 Lakh/month ÷ 60 staff ≈ ~₹45,000/worker/month.' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'MECE Departments (Dine-In Meals + Banquets + Rooms + Valet) × Throughput × Avg Check × Tip %', correct: true, feedback: 'Spot on! Splitting a hotel into its 4 operating touchpoints ensures nothing is missed.' },
        { label: 'Delhi Tourists × ₹50', correct: false, feedback: 'Estimates entire city rather than one specific hotel property’s capacity.' },
        { label: 'Hotel Waiters × ₹500', correct: false, feedback: 'Lacks capacity anchoring to tables, rooms, and events.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'tables', label: 'Restaurant Tables', defaultVal: 100, min: 30, max: 150, step: 10, unit: 'tables' },
        { key: 'rooms', label: 'Hotel Rooms', defaultVal: 150, min: 50, max: 300, step: 25, unit: 'rooms' },
        { key: 'eventsDay', label: 'Banquet Events / Day', defaultVal: 2, min: 0, max: 4, step: 1, unit: 'events' },
        { key: 'tipPct', label: 'Avg Tip Rate %', defaultVal: 5, min: 2, max: 10, step: 1, unit: '%' }
      ],
      computeFormulaText: 'Dine-In Tips + Room Tips + Event Tips + Valet (₹10K)',
      compute: (v) => {
        const dine = v.tables * (0.5 + 0.75 + 0.85) * 3000 * (v.tipPct / 100);
        const rooms = v.rooms * 0.5 * 5000 * (v.tipPct / 100);
        const events = v.eventsDay * 300000 * (v.tipPct / 100);
        const valet = 10000;
        const total = dine + rooms + events + valet;
        return {
          value: Math.round(total),
          formatted: `₹${Math.round(total).toLocaleString('en-IN')}/Day`,
          breakdown: [
            { label: 'Dine-In + Events', val: `₹${Math.round(dine + events).toLocaleString('en-IN')}` },
            { label: 'Rooms + Valet', val: `₹${Math.round(rooms + valet).toLocaleString('en-IN')}` }
          ]
        };
      }
    }
  },
  // 20
  {
    id: 'cb-red-pens-india',
    title: 'Active User Base & Annual Volume of Red Pens in India',
    prompt: 'Calculate the market size (active users and annual units) of red ink pens in India.',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Stationery', 'India', 'Color Mix', 'Age Segmentation'],
    clarifyingQuestions: [
      { q: 'Are we estimating active red-pen users or total annual units / ₹ revenue of red pens sold in India?', a: 'Calculate active pen users first (~74.2 Cr total → ~7.42 Cr red-pen share), then multiply by annual purchase rate & ₹10 price.', why: 'Students mainly use blue/black; teachers, graders, accountants, and editors drive red ink.' },
      { q: 'Who primarily consumes red ink pens vs blue/black pens?', a: 'Teachers/faculty, exam graders, auditors/CA reviewers, and medical/office staff (~10% of overall pen market).', why: 'Ink color mix (70% blue, 10% black, 10% red, 10% green/other) anchors the share cleanly.' }
    ],
    strategyOverview: 'Pen Market First → Ink Color Share Step! Start with India Pop (140 Cr). Segment by Age: 0–10 yrs (10% = 14 Cr × 20% write = 2.8 Cr), 10–25 yrs Students (30% = 42 Cr × 80% = 33.6 Cr), 25–60 yrs Adults (50% = 70 Cr × 50% = 35 Cr), 60+ yrs (10% = 14 Cr × 20% = 2.8 Cr) → Total Active Pen Market = 74.2 Crore users! Apply Ink Color Split: Blue (70%), Black (10%), Red (10%), Green/Multi (10%) → 7.42 Crore Red Pen Users/Equivalents! At ~4–5 red pens/user/yr (~35 Cr units × ₹10) ≈ ~₹350 Crore annual red pen market!',
    formula: 'Red Pen Market = [∑ (Age Pop × Literacy/Pen User %)] × Red Ink Color Share (10%) × Annual Units × ₹10',
    assumptions: [
      { label: 'Total Pen Users in India = 74.2 Crore (0–10: 2.8 Cr, 10–25: 33.6 Cr, 25–60: 35 Cr, 60+: 2.8 Cr)', rationale: 'Captures school/college enrollment and adult literate workforce.' },
      { label: 'Ink Color Share: Blue 70%, Black 10%, Red 10%, Green/Multi 10% → 7.42 Cr Red Pen User Base', rationale: 'Wait: check institutional concentration — ~1 Cr teachers + ~3 Cr students/pros using red pens for headings/correction!' },
      { label: '7.42 Cr × ~5 red pens/yr ≈ ~37 Crore red pens/yr × ₹10 = ~₹370 Crore/year', rationale: 'Matches ~10% of India’s ~₹3,500–₹4,000 Cr writing-pen retail market!' }
    ],
    tree: {
      label: 'India Population (140 Crore)',
      valueText: '140 Cr Pop',
      children: [
        { label: '0–10 (2.8 Cr) + 10–25 (33.6 Cr) + 25–60 (35 Cr) + 60+ (2.8 Cr)', valueText: '74.2 Cr Pen Users' },
        {
          label: 'Red Pen Share (10% vs 70% Blue / 10% Black / 10% Other)',
          valueText: '7.42 Crore Users',
          highlight: true,
          children: [
            { label: '× ~5 Pens/Yr × ₹10 Avg Price', valueText: '~37 Cr Units / ~₹370 Cr/Yr', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~7.42 Crore Red-Pen Users (~37 Crore Units / ~₹370 Crore/Year)',
    acceptableRange: { min: 150, max: 600, unit: '₹ Crore/year', display: '₹150 Cr – ₹600 Cr/yr (or ~7.4 Cr users)' },
    sanityCheck: 'India sells ~3.5–4 Billion writing pens annually (~₹3,500–4,000 Cr). At ~8–10% red ink share (teachers grading papers, students underlining notes, accountants auditing ledgers), ~30–40 Crore red pens/year (~₹300–400 Cr) is spot on!',
    interviewerTrap: 'Forgetting to anchor the TOTAL pen industry first before slicing for red ink — starting straight from teachers misses millions of students/nurses/accountants using red pens!',
    variations: [
      { question: 'Verify the red pen estimate purely from Teacher + Student demand bottom-up.', hint: '~1 Cr school/college teachers × 12 red pens/yr (12 Cr) + ~5 Cr students/accountants × 4/yr (20 Cr) = ~32 Cr red pens/yr!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'India Pop → Age Segments × Pen Usage % → Red Ink Color Share (10%) × Annual Units × Price', correct: true, feedback: 'Spot on! Sizing total pens first then slicing color mix avoids omissions.' },
        { label: 'Only School Teachers × 10', correct: false, feedback: 'Misses accountants, editors, medical staff, and students using red pens for annotations.' },
        { label: 'Red Cars × 100', correct: false, feedback: 'Unrelated proxy.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'penUsersCr', label: 'Total Pen Users (Crore)', defaultVal: 74.2, min: 50, max: 90, step: 2, unit: 'Cr' },
        { key: 'redSharePct', label: 'Red Ink Share %', defaultVal: 10, min: 5, max: 15, step: 1, unit: '%' },
        { key: 'pensYr', label: 'Red Pens / User / Yr', defaultVal: 5, min: 2, max: 10, step: 1, unit: 'pens' },
        { key: 'priceInr', label: 'Avg Price (₹)', defaultVal: 10, min: 5, max: 20, step: 5, unit: '₹' }
      ],
      computeFormulaText: 'Pen Users × Red Ink% × Units/Yr × ₹ Price',
      compute: (v) => {
        const unitsCr = v.penUsersCr * (v.redSharePct / 100) * v.pensYr;
        const revCr = unitsCr * v.priceInr;
        return {
          value: revCr,
          formatted: `₹${Math.round(revCr)} Crore/Yr (${unitsCr.toFixed(1)} Cr Units)`,
          breakdown: [
            { label: 'Red Pen User Base', val: `${(v.penUsersCr * v.redSharePct / 100).toFixed(2)} Cr` },
            { label: 'Monthly Volume', val: `${(unitsCr / 12).toFixed(1)} Cr/mo` }
          ]
        };
      }
    }
  },
  // 21
  {
    id: 'cb-hotel-room-supply-india',
    title: 'Total Mid-Segment Hotel Room Supply in India',
    prompt: 'Estimate the total supply of mid-range organized hotel rooms across India (excluding ultra-luxury 5-stars like Taj and unorganized roadside lodges) for a hospitality demand-forecasting SaaS.',
    difficulty: 4,
    archetype: 'Supply & Capacity',
    approachType: 'Hybrid (Demand + Supply)',
    templateId: 'tpl-bottleneck',
    tags: ['Hospitality', 'B2B Travel Tech', 'Supply vs Demand', 'India'],
    clarifyingQuestions: [
      { q: 'Strictly mid-range/branded budget-to-upscale properties (3-star/4-star/Treebo/FabHotels/Ginger), excluding luxury 5-stars and unorganized dharamshalas?', a: 'Yes, focus purely on addressable mid-segment rooms (~₹2,500–₹8,000/night).', why: 'Mid-tier hotels need automated pricing/forecasting SaaS; ultra-luxury runs bespoke revenue managers.' },
      { q: 'Should we anchor via peak travel demand (New Year/peak season) OR supply-side hotel city tiers?', a: 'Use Peak-Season Visitor Demand (peak capacity ceiling!) and sanity check against Indian city tier supply!', why: 'Peak-season room demand approximates active supply capacity (~85–90% peak occupancy) cleanly.' }
    ],
    strategyOverview: 'Peak-Season Capacity + City-Tier Supply Triangulation! Demand Peak Check (Peak New Year Weekend): India sees ~350M domestic leisure trips/yr (~25% peak hotel-stay vs staying with family = ~90M annual hotel-stay trips + ~10M foreign arrivals = 100M hotel-stay trips/yr). Peak season (20% in Dec/Jan = 20M peak-month visits ÷ 30 days × 2.5 avg stay nights) ≈ ~1.67M occupied rooms/night! Divide by 85% peak occupancy & apply mid-tier share (~65%) = ~1.28M–1.5M mid-segment rooms! Supply Cross-Check: 10 Metros (~40K mid rooms each = 400K) + 40 Tier-1/Tourism hubs (~12K = 480K) + 150 Tier-2 cities (~3K = 450K) = ~1.33 Million mid-segment rooms!',
    formula: 'Mid Rooms = (Daily Peak Visitors × Mid-Tier Hotel % ÷ Avg Guests/Room ÷ Peak Occ%) OR ∑ (City Tier × Avg Mid-Hotels × Rooms/Hotel)',
    assumptions: [
      { label: 'Demand Peak Check: ~100M annual commercial hotel trips × 20% in peak month ÷ 30 × 2.5 nights = ~1.67M peak occupied rooms', rationale: 'Excludes pilgrims/VFR travelers staying with relatives (who don’t consume hotel rooms).' },
      { label: 'At 85% peak occupancy (~1.96M total organized rooms) × ~68% mid-segment share = ~1.33M mid-tier rooms', rationale: 'Remaining ~12% is ultra-luxury (Taj/Oberoi) and ~20% ultra-budget.' },
      { label: 'City Supply Check: 10 Metros (400K) + 40 Tier-1/Leisure (480K) + 150 Tier-2 (450K) = 1.33M Rooms (~27K hotels @ 50 rooms)', rationale: 'Matches real Indian Federation of Hotel & Restaurant Associations (~1.5M–1.7M organized + mid rooms).' }
    ],
    tree: {
      label: 'India Mid-Segment Hotel Supply (~27,000 Properties)',
      valueText: '~1.33M Rooms',
      children: [
        { label: '10 Metro Cities (~400 hotels × 100 rooms)', valueText: '400K rooms' },
        { label: '40 Tier-1 & Tourism Hubs (~240 hotels × 50 rooms)', valueText: '480K rooms', highlight: true },
        { label: '150 Tier-2 Business Cities (~100 hotels × 30 rooms)', valueText: '450K rooms' },
        { label: 'Peak Demand Cross-Check (~1.67M peak nights ÷ 85% × 68%)', valueText: '~1.33M Mid Rooms', highlight: true }
      ]
    },
    finalAnswer: '~1.2 Million – 1.6 Million Mid-Segment Hotel Rooms (~27,000 Properties)',
    acceptableRange: { min: 0.8, max: 2.5, unit: 'Million rooms', display: '0.8M – 2.5M mid-tier rooms' },
    sanityCheck: 'India has ~150,000–180,000 branded/chain hotel rooms (IHCL/Marriott/ITC/Lemon Tree) plus ~1.2M–1.4M organized independent 3-star/mid-market rooms listed across MakeMyTrip/Booking/Agoda (~25K–30K properties × ~50 rooms)! Note: cross-referencing OTA listings + local agent primary research is great practical consulting intuition.',
    interviewerTrap: 'Estimating residential area by `5 sq km grid extrapolation` across all of India (noisy spatial assumptions!) OR forgetting that >65% of domestic Indian travelers stay with family/friends rather than hotels.',
    variations: [
      { question: 'Size the annual SaaS TAM if your hospitality tech charges ₹500/room/month.', hint: '1.33M rooms × ₹500 × 12 months ≈ ~₹800 Crore/yr addressable SaaS TAM in India!' }
    ],
    guidedPractice: {
      correctApproach: 'Hybrid (Demand + Supply)',
      funnelOptions: [
        { label: 'Peak Holiday Visitor Demand ÷ (Guests/Room × Peak Occ%) × Mid-Tier %, cross-checked via City Tier Supply', correct: true, feedback: 'Spot on! Peak-season capacity modeling + city-tier check avoids noisy city-area grids.' },
        { label: 'India Land Area × 1%', correct: false, feedback: 'Hotels cluster strictly in urban/tourist corridors, not flat land area.' },
        { label: 'India Population ÷ 100', correct: false, feedback: 'Lacks connection to hotel occupancy, trip volume, or room sizes.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'metroK', label: 'Metro Mid Rooms (K)', defaultVal: 400, min: 250, max: 600, step: 25, unit: 'K' },
        { key: 't1K', label: 'Tier-1 & Tourism Rooms (K)', defaultVal: 480, min: 300, max: 700, step: 30, unit: 'K' },
        { key: 't2K', label: 'Tier-2 City Rooms (K)', defaultVal: 450, min: 250, max: 700, step: 25, unit: 'K' },
        { key: 'saasInr', label: 'SaaS Fee / Room / Mo (₹)', defaultVal: 500, min: 250, max: 1000, step: 50, unit: '₹' }
      ],
      computeFormulaText: 'Total Mid Rooms = Metros + Tier-1 + Tier-2 | SaaS TAM = Rooms × Fee × 12',
      compute: (v) => {
        const roomsK = v.metroK + v.t1K + v.t2K;
        const saasCr = (roomsK * 1000 * v.saasInr * 12) / 1e7;
        return {
          value: roomsK / 1000,
          formatted: `${(roomsK / 1000).toFixed(2)}M Rooms (TAM: ₹${Math.round(saasCr)} Cr)`,
          breakdown: [
            { label: 'Est. Properties (@ ~50 rooms)', val: `${Math.round(roomsK / 50 * 1000).toLocaleString('en-IN')}` },
            { label: 'Annual SaaS Revenue TAM', val: `₹${Math.round(saasCr).toLocaleString('en-IN')} Cr/yr` }
          ]
        };
      }
    }
  },
  // 22
  {
    id: 'cb-airplanes-over-bangalore',
    title: 'Airplanes Flying Over Bengaluru in a Day',
    prompt: 'Estimate the total number of airplanes (arrivals, departures, and overhead overflights) flying over Bengaluru in a single day.',
    difficulty: 3,
    archetype: 'Supply & Capacity',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-bottleneck',
    tags: ['Aviation', 'Airspace', 'Weekday vs Weekend', 'Bengaluru'],
    clarifyingQuestions: [
      { q: 'Does "flying over Bengaluru" mean planes landing/taking off at Kempegowda Airport (BLR) PLUS passing high-altitude overflights?', a: 'Yes: BLR airport arrivals + departures PLUS ~10% transit overflights passing overhead without landing.', why: 'Clarifying airport operations vs high-altitude corridor overflights differentiates strong candidates!' },
      { q: 'Differentiate weekday vs weekend traffic?', a: 'Yes, compute weekday schedule (~1,221) and apply +20% weekend leisure uplift (~1,465).', why: 'Captures day-of-week schedule dynamics.' }
    ],
    strategyOverview: 'Runway Slot Throughput + Overflight Uplift! Weekday Model: Split 24h into Peak (13 hrs: 6 AM–12 PM & 5 PM–12 AM @ 30 landings/hr × 2 for takeoffs+landings = 780 flights) and Off-Peak (11 hrs: 12 AM–6 AM & 12 PM–5 PM @ 15 landings/hr × 2 = 330 flights) → 1,110 airport movements/day! Add 10% overhead transit overflights (+111) = ~1,221 flights on a weekday! Weekend (+20% frequency: 36/hr peak, 18/hr off-peak → 1,332 airport ops + 133 overflights) = ~1,465 flights!',
    formula: 'Daily Flights Over City = [(Peak Hrs × Peak Rate × 2) + (Off-Peak Hrs × Off-Peak Rate × 2)] × (1 + Overflight %)',
    assumptions: [
      { label: 'Weekday Runway Rate: 13 Peak hrs @ 30 arr/hr (780 ops) + 11 Off-Peak hrs @ 15 arr/hr (330 ops) = 1,110 ops', rationale: 'Symmetric landings = departures yields ×2 multiplier cleanly.' },
      { label: 'Overhead Corridor Overflights (Chennai/Hyderabad/Kochi/Mumbai routes) add +10% = +111 flights', rationale: 'Total Weekday = ~1,221 planes/day.' },
      { label: 'Weekend Surge (+20% schedule frequency) = 1,332 BLR ops + 133 overflights = ~1,465 planes/day', rationale: 'Note: BLR handles ~700–750 actual commercial ops/day (20–25/hr peak), so realistic blended ~800–1,200/day!' }
    ],
    tree: {
      label: 'Bengaluru Daily Air Traffic (24 Hours)',
      valueText: '1,221 Weekday | 1,465 Weekend',
      children: [
        { label: 'Weekday Peak (13h × 30 arr × 2) + Off-Peak (11h × 15 × 2)', valueText: '1,110 Airport Ops' },
        { label: '+ 10% High-Altitude Overflights', valueText: '+111 = ~1,221 / Weekday', highlight: true },
        { label: 'Weekend (+20% Peak 36/hr & Off-Peak 18/hr + 10%)', valueText: '~1,465 / Weekend', highlight: true }
      ]
    },
    finalAnswer: '~1,221 Flights (Weekday) | ~1,465 Flights (Weekend)',
    acceptableRange: { min: 700, max: 1600, unit: 'Flights/day', display: '700 – 1,600 flights/day' },
    sanityCheck: 'Kempegowda International (BLR) currently ranks #3 in India with ~700–780 daily airport movements (~350–390 departures + ~350–390 landings) plus ~100–150 southern-peninsula overflights = ~850–930 total planes overhead daily!',
    interviewerTrap: 'Assuming BLR runways hit 100% saturation (30 landings/hr = 60 ops/hr for 13 straight hours) which fits Delhi/Mumbai peak runways more than BLR (~20–22 arr/hr)! Adjusting Peak Rate to ~20/hr makes it exact to real BLR.',
    variations: [
      { question: 'How many distinct passengers fly into or out of Bengaluru daily?', hint: '750 movements × 175 seats × 85% load ≈ ~1.12 Lakh passengers/day!' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Peak/Off-Peak Hours × Arrival Rate × 2 (Arr + Dep) + Overhead Corridor Overflights %', correct: true, feedback: 'Spot on! Runway slots + symmetric departures + overflights is crisp.' },
        { label: 'Bengaluru Population ÷ 10,000', correct: false, feedback: 'Doesn’t capture runway capacity or transit overflights.' },
        { label: 'Airport Gates × 24', correct: false, feedback: 'Ignores dual-runway throughput and night lull utilization.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'peakArrHr', label: 'Peak Landings / Hr', defaultVal: 25, min: 15, max: 36, step: 1, unit: '/hr' },
        { key: 'offArrHr', label: 'Off-Peak Landings / Hr', defaultVal: 12, min: 6, max: 20, step: 2, unit: '/hr' },
        { key: 'overflightPct', label: 'Overhead Overflights %', defaultVal: 10, min: 5, max: 25, step: 5, unit: '%' }
      ],
      computeFormulaText: '[(13h × Peak × 2) + (11h × OffPeak × 2)] × (1 + Overflight%)',
      compute: (v) => {
        const ops = (13 * v.peakArrHr * 2) + (11 * v.offArrHr * 2);
        const total = ops * (1 + v.overflightPct / 100);
        return {
          value: Math.round(total),
          formatted: `${Math.round(total).toLocaleString('en-IN')} Planes/Day`,
          breakdown: [
            { label: 'BLR Airport Movements', val: `${ops} ops/day` },
            { label: 'Transit Overflights', val: `${Math.round(total - ops)}/day` }
          ]
        };
      }
    }
  }
  ,// 23
  {
    id: 'cb-spotify-ads-duration',
    title: 'Annual Audio Ad Duration Played on Spotify India',
    prompt: 'Estimate the total combined hours of audio advertisements listened to on Spotify India in one year.',
    difficulty: 2,
    archetype: 'Usage & Behavioral',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Audio Streaming', 'Spotify', 'Ad Impressions', 'India'],
    clarifyingQuestions: [
      { q: 'Are we excluding Spotify Premium paid subscribers (since Premium tiers have zero audio ads)?', a: 'Yes! Only free ad-supported users hear ads; exclude paid subscribers completely.', why: 'Separating free (~60–90%) vs paid users prevents overcounting ad impressions.' },
      { q: 'Should we estimate total aggregate listener ad-hours across India (not unique ad creatives)?', a: 'Yes, total cumulative hours of ads heard by all free Spotify users across 365 days.', why: 'Used directly to price audio ad inventory (CPM/CPT).' }
    ],
    strategyOverview: 'Free-User Exclusion Funnel × Daily Ad Load! Start with Spotify India User Base (~70M total active users across 1.46B India pop). Segment by Plan: Free Ad-Supported Users (60% = 42M in baseline; or realistically ~90% free / ~10% paid) vs Premium (40% = 28M, 0 ads). Daily Engagement per Free User: 90 mins (1.5 hrs) daily listening ÷ 15 mins per ad break = 6 ad slots/day × 30 sec/slot = 3 minutes of ads/user/day! Multiply: 42M × 3 mins = 126M mins/day = 2.1M ad-hours/day × 365 days = ~766.5 Million hours/year!',
    formula: 'Annual Ad Hours = Total Users × Free Plan % × (Daily Listening Mins ÷ Mins/Ad Break × Ad Sec ÷ 3,600) × 365',
    assumptions: [
      { label: 'Spotify India Base = ~70M Users: Free Ad-Supported (60% = 42M) vs Premium Ad-Free (40% = 28M)', rationale: 'Note: In India, paid Premium is closer to ~5–10% (~63–65M free users), making 42M conservative!' },
      { label: 'Free User Listening = 90 mins/day; Ad Break Every 15 mins = 6 slots/day × 30s = 3 mins ads/day', rationale: 'Or 180s = 0.05 ad-hours per free user per day.' },
      { label: 'Daily Total = 42M × 0.05 hrs = 2.1M hrs/day × 365 = 766.5 Million Ad-Hours/Year', rationale: 'Also check DAU/MAU: if 50% listen daily, scale down ~2x accordingly!' }
    ],
    tree: {
      label: 'Spotify India Users (~70M)',
      valueText: '70M Users',
      children: [
        { label: 'Premium Ad-Free Subscribers (40% = 28M)', valueText: '0 ad hours', muted: true },
        {
          label: 'Free Ad-Supported Users (60% = 42M)',
          valueText: '42M Ad-Exposed',
          highlight: true,
          children: [
            { label: '90 min/day ÷ 15 min × 30s = 3 min/day (2.1M hrs/day)', valueText: '2.1M hrs/day' },
            { label: '× 365 Days/Year', valueText: '766.5 Million Hours/Yr', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~766.5 Million Ad-Hours/Year (~2.1M Hours/Day)',
    acceptableRange: { min: 300, max: 1400, unit: 'Million hours/yr', display: '300M – 1,400M ad-hours/yr' },
    sanityCheck: '766.5M ad-hours × 120 slots/hr (30s spots) = ~92 Billion audio ad impressions/year (~6 ad slots × 42M × 365). At ~₹150–200 CPM, that implies ~₹1,400–1,800 Cr digital audio ad potential across active free streamers!',
    interviewerTrap: 'Including Premium paid subscribers OR multiplying all 70M MAUs by daily listening without distinguishing DAU/MAU ratio (~45–60% daily active).',
    variations: [
      { question: 'What is the maximum annual audio ad revenue Spotify India could generate at ₹150 CPM?', hint: '42M × 6 daily slots × 365 = 91.98B slots → at 50% DAU & 60% sell-through = ~27.6B paid impressions × ₹0.15 ≈ ~₹414 Crore/yr.' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Total Users × Free-Tier % × (Daily Listening ÷ Break Interval) × Ad Length × 365', correct: true, feedback: 'Spot on! Filtering Premium users first + calculating daily ad-minutes per user is clean.' },
        { label: 'India Radio Stations × 24 Hours', correct: false, feedback: 'Streaming audio inventory scales with active free listeners, not broadcast stations.' },
        { label: '70M × 30 Seconds × 365', correct: false, feedback: 'Each free user hears ~5–6 ad breaks per day, not just one 30s ad.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'usersM', label: 'Spotify India Users (M)', defaultVal: 70, min: 40, max: 110, step: 5, unit: 'M' },
        { key: 'freePct', label: 'Free Ad-Supported %', defaultVal: 60, min: 50, max: 95, step: 5, unit: '%' },
        { key: 'listenMins', label: 'Daily Listen Mins', defaultVal: 90, min: 30, max: 120, step: 15, unit: 'min' },
        { key: 'adSecPer15m', label: 'Ad Sec per 15 Mins', defaultVal: 30, min: 15, max: 60, step: 5, unit: 'sec' }
      ],
      computeFormulaText: 'Users × Free% × (Listen Mins ÷ 15 × Ad Sec ÷ 3,600) × 365',
      compute: (v) => {
        const freeM = v.usersM * (v.freePct / 100);
        const adHrsPerUserDay = ((v.listenMins / 15) * v.adSecPer15m) / 3600;
        const annualM = freeM * adHrsPerUserDay * 365;
        return {
          value: annualM,
          formatted: `${annualM.toFixed(1)}M Ad-Hours/Yr`,
          breakdown: [
            { label: 'Free Ad Listeners', val: `${freeM.toFixed(1)} M` },
            { label: 'Daily Ad Volume', val: `${(annualM / 365).toFixed(2)} M hrs/day` }
          ]
        };
      }
    }
  },
  // 24
  {
    id: 'cb-gym-annual-revenue',
    title: 'Annual Revenue of a Mid-Sized Gym in Delhi',
    prompt: 'Estimate the annual gross revenue of a mid-sized commercial fitness gym operating in Delhi.',
    difficulty: 1,
    archetype: 'Revenue & Cost',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-outlet',
    tags: ['Fitness & Wellness', 'Outlet Unit Economics', 'Delhi', 'Multi-Stream'],
    clarifyingQuestions: [
      { q: 'Which revenue lines should we include beyond base monthly gym memberships?', a: 'Include all 4 standard streams: Base Memberships, Personal Training (PT), Group Classes (Zumba/CrossFit), and Ancillary Sales (shakes/supplements/merch).', why: 'Personal training often equals or exceeds base membership revenue in urban gyms!' },
      { q: 'What scale is a "mid-sized Delhi gym"?', a: 'Standalone ~5,000–7,000 sq ft facility with ~700 active members.', why: 'Sets realistic member pool and PT attach rates cleanly.' }
    ],
    strategyOverview: 'Four-Stream Gym Unit Economics! Base Capacity = 700 Active Members. Stream 1 (Memberships): 700 × ₹2,500/mo = ₹17.5L/mo = ₹2.10 Cr/yr. Stream 2 (Personal Training): 30% opt-in (210 members) × ₹10,000/mo = ₹21L/mo = ₹2.52 Cr/yr! Stream 3 (Group Classes): 50% opt-in (350 members) × ₹2,000/mo = ₹7L/mo = ₹84L/yr. Stream 4 (Ancillary Shakes/Supps/Merch): 700 × ₹500/mo = ₹3.5L/mo = ₹42L/yr. Total Annual Revenue = ₹5.88 Crore/year!',
    formula: 'Annual Revenue = 12 × [(Members × Base Fee) + (Members × PT% × PT Fee) + (Members × Class% × Fee) + (Members × Ancillary)]',
    assumptions: [
      { label: 'Active Members = 700 × ₹2,500/mo Membership = ₹2.10 Crore/yr (+ ₹500/mo ancillary = ₹42 Lakh/yr)', rationale: 'Matches typical Cult/Anytime/independent tier-1 Delhi gym pricing (₹25K–30K/yr).' },
      { label: 'Personal Training: 30% attach (210 clients) × ₹10,000/mo = ₹2.52 Crore/yr', rationale: 'PT is the highest-ticket upsell stream in premium neighborhood gyms.' },
      { label: 'Group Fitness Classes (Zumba/Spin/HIIT): 50% (350 members) × ₹2,000/mo = ₹84 Lakh/yr → Total = ₹5.88 Cr/yr', rationale: 'Wait: check if group classes are bundled in ₹2,500 or priced separately (~₹4–5.9 Cr range).' }
    ],
    tree: {
      label: 'Mid-Sized Delhi Gym (700 Active Members)',
      valueText: '₹5.88 Crore / Year',
      children: [
        { label: 'Base Memberships (700 × ₹2,500/mo × 12)', valueText: '₹2.10 Crore' },
        { label: 'Personal Training (210 × ₹10,000/mo × 12)', valueText: '₹2.52 Crore', highlight: true },
        { label: 'Group Class Packages (350 × ₹2,000/mo × 12)', valueText: '₹84 Lakh' },
        { label: 'Ancillary Shakes / Supplements (700 × ₹500/mo × 12)', valueText: '₹42 Lakh' }
      ]
    },
    finalAnswer: '~₹5.88 Crore / Year (Realistic Mid-Tier Range: ₹2.5 – ₹6 Crore/yr)',
    acceptableRange: { min: 1.5, max: 7.5, unit: '₹ Crore/year', display: '₹1.5 Cr – ₹7.5 Cr/yr' },
    sanityCheck: 'Check floor space capacity: 700 members × ~4 visits/wk ÷ 7 = ~400 visits/day across ~14 open hours (6 AM–10 PM) = ~28–30 concurrent gym-goers (~50–60 at 7 PM peak), fitting a ~6,000 sq ft Delhi gym comfortably!',
    interviewerTrap: 'Only calculating base membership fees (missing Personal Training, which is often 40%+ of top-line!) OR forgetting annual membership discounts (₹2,500/mo monthly vs ~₹15K–₹20K annual upfront).',
    variations: [
      { question: 'How many trainers does this gym need if 210 members take 12 PT sessions/month?', hint: '210 × 12 = 2,520 PT hrs/month ÷ ~150 billable hrs/trainer ≈ ~16–18 trainers!' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Active Members → Add-On Attach % (PT, Group Classes, Supplements) × Monthly Fee × 12 Months', correct: true, feedback: 'Spot on! Multi-stream revenue decomposition nails unit economics cleanly.' },
        { label: 'Delhi Population ÷ Number of Gyms', correct: false, feedback: 'Doesn’t capture member pricing or high-ticket PT upsell economics.' },
        { label: 'Treadmills × ₹1 Lakh', correct: false, feedback: 'Ignores memberships, personal training, and member churn/utilization.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'members', label: 'Active Gym Members', defaultVal: 700, min: 300, max: 1200, step: 50, unit: 'ppl' },
        { key: 'baseFee', label: 'Monthly Fee (₹)', defaultVal: 2500, min: 1200, max: 4000, step: 250, unit: '₹' },
        { key: 'ptPct', label: 'Personal Training %', defaultVal: 30, min: 10, max: 40, step: 5, unit: '%' },
        { key: 'ptFee', label: 'PT Fee / Month (₹)', defaultVal: 10000, min: 5000, max: 15000, step: 1000, unit: '₹' }
      ],
      computeFormulaText: '12 × [(Members × Base Fee) + (Members × PT% × PT Fee) + Ancillary & Classes]',
      compute: (v) => {
        const baseCr = (v.members * v.baseFee * 12) / 1e7;
        const ptCr = (v.members * (v.ptPct / 100) * v.ptFee * 12) / 1e7;
        const extraCr = (v.members * (0.5 * 2000 + 500) * 12) / 1e7;
        const total = baseCr + ptCr + extraCr;
        return {
          value: total,
          formatted: `₹${total.toFixed(2)} Crore/Yr`,
          breakdown: [
            { label: 'Base Memberships', val: `₹${baseCr.toFixed(2)} Cr` },
            { label: 'Personal Training', val: `₹${ptCr.toFixed(2)} Cr` }
          ]
        };
      }
    }
  },
  // 25
  {
    id: 'cb-mumbai-red-lights-time',
    title: 'Annual Time Spent Waiting at Red Lights by a Mumbai Commuter',
    prompt: 'Estimate the total time spent waiting at red traffic lights in 1 year by an average working road commuter in Mumbai.',
    difficulty: 2,
    archetype: 'Usage & Behavioral',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-workforce',
    tags: ['Commute & Traffic', 'Mumbai', 'Calendar Split', 'Time Estimation'],
    clarifyingQuestions: [
      { q: 'Are we estimating time for a road vehicle commuter (car/cab/2W/bus) rather than a Mumbai local train commuter?', a: 'Yes, an average working road commuter traveling ~5 days/week.', why: 'Train commuters pass zero traffic signals!' },
      { q: 'Should we include weekend/personal trips alongside official office commute days?', a: 'Yes: 250 working days (office round trips) PLUS ~50 personal/unofficial road travel days out of 115 non-working days.', why: 'Captures all 365 calendar days cleanly.' }
    ],
    strategyOverview: 'Calendar Day-Type × Signal Congestion Matrix! Split 365 Days into: Working Days (250d = 50 wks × 5d, moderate traffic) vs Non-Working Days (115d: 65 stay-home + 50 personal-travel days across 30% Light, 50% Moderate, 20% Heavy traffic). Signal Wait per Round Trip: Light (8 signals × 1 min × 2 = 16 mins/day), Moderate (10 signals × 1.5 min × 2 = 30 mins/day), Heavy (12 signals × 2 min × 2 = 48 mins/day). Compute: Working (250 × 30 = 7,500 mins) + Personal Light (15 × 16 = 240) + Personal Mod (25 × 30 = 750) + Personal Heavy (10 × 48 = 480) = 8,970 mins ÷ 60 = ~149.5 Hours/Year!',
    formula: 'Annual Red-Light Hrs = [(250 × Mod Mins) + ∑ (Non-Work Travel Days × Traffic % × Round-Trip Wait Mins)] ÷ 60',
    assumptions: [
      { label: 'Calendar: 250 Working Days (Moderate) + 50 Unofficial Road-Travel Days (30% Light, 50% Mod, 20% Heavy)', rationale: 'Remaining 65 weekends/holidays spent at home or walking locally.' },
      { label: 'Round-Trip Wait: Light = 16 mins (8×1×2), Moderate = 30 mins (10×1.5×2), Heavy = 48 mins (12×2×2)', rationale: 'Average Mumbai road commute crosses ~8–12 signals each way (~50% red-hit ratio adjusted in wait avg).' },
      { label: 'Annual Total = 7,500 + 240 + 750 + 480 = 8,970 Minutes = 149.5 Hours (~6.2 Full Days/Year)', rationale: 'Matches TomTom Mumbai congestion reports (~110–150+ hrs lost in traffic delays/yr)!' }
    ],
    tree: {
      label: 'Mumbai Road Commuter (365 Calendar Days)',
      valueText: '8,970 Mins / Year',
      children: [
        { label: '250 Working Days (Moderate: 10 signals × 1.5m × 2 ways)', valueText: '7,500 mins (125 hrs)', highlight: true },
        {
          label: '50 Personal Road-Travel Days (out of 115 Off Days)',
          valueText: '1,470 mins (24.5 hrs)',
          children: [
            { label: 'Light (15d × 16m) + Mod (25d × 30m) + Heavy (10d × 48m)', valueText: '240 + 750 + 480 mins' }
          ]
        },
        { label: 'Total Red-Light Wait Time in 1 Year (8,970 ÷ 60)', valueText: '~149.5 Hours / Year', highlight: true }
      ]
    },
    finalAnswer: '~149.5 Hours / Year (~25 Mins/Calendar Day)',
    acceptableRange: { min: 90, max: 220, unit: 'Hours/year', display: '90 – 220 hours/year' },
    sanityCheck: '149.5 hours/year ÷ 300 active travel days ≈ ~30 minutes/day spent idle at signals — roughly ~15–20% of a typical ~2.5-hour daily Mumbai round-trip road commute, spot on!',
    interviewerTrap: 'Only multiplying 1-way commute time (forgetting the return trip `× 2`) OR assuming green/red ratio means 100% red at every intersection without factoring average wait per signal.',
    variations: [
      { question: 'Estimate the annual value of productive time lost across 1 Million Mumbai office car commuters.', hint: '1M × 149.5 hrs × ~₹500/hr value of time ≈ ~₹7,475 Crore/year economic productivity drag!' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Working + Off-Day Travel Split × Traffic Tiers × Signals/Way × Avg Wait/Signal × 2 (Round Trip)', correct: true, feedback: 'Textbook! Day-type segmentation + round-trip factor makes commute math tight.' },
        { label: 'Total Mumbai Signals × 2 Minutes', correct: false, feedback: 'One commuter only crosses ~10 signals on their route, not all 700+ signals in Mumbai!' },
        { label: 'Total Commute Hours × 50%', correct: false, feedback: 'Overstates signal stop time vs moving slow-crawl congestion.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'workDays', label: 'Working Commute Days/Yr', defaultVal: 250, min: 200, max: 270, step: 10, unit: 'days' },
        { key: 'signalsWay', label: 'Avg Signals / One Way', defaultVal: 10, min: 4, max: 18, step: 1, unit: 'signals' },
        { key: 'waitMin', label: 'Avg Wait / Signal (min)', defaultVal: 1.5, min: 0.75, max: 2.5, step: 0.25, unit: 'min' },
        { key: 'offDayHrs', label: 'Personal Travel Red-Light Hrs', defaultVal: 24.5, min: 10, max: 50, step: 2.5, unit: 'hrs' }
      ],
      computeFormulaText: '(Working Days × Signals × Wait Mins × 2 Ways ÷ 60) + Personal Travel Hrs',
      compute: (v) => {
        const workHrs = (v.workDays * v.signalsWay * v.waitMin * 2) / 60;
        const total = workHrs + v.offDayHrs;
        return {
          value: total,
          formatted: `${total.toFixed(1)} Hours/Year`,
          breakdown: [
            { label: 'Office Commute Signal Wait', val: `${workHrs.toFixed(1)} hrs` },
            { label: 'Equivalent Full Days', val: `${(total / 24).toFixed(1)} days/yr` }
          ]
        };
      }
    }
  },
  // 26
  {
    id: 'cb-lawyer-pages-read',
    title: 'Number of Legal Pages Read by a Lawyer in a Day',
    prompt: 'Estimate the total number of pages (across contracts, case filings, and briefs) a corporate/litigation lawyer reads on a typical workday.',
    difficulty: 2,
    archetype: 'Usage & Behavioral',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-workforce',
    tags: ['Productivity', 'Professional Services', 'Reading Speed', 'Workday Split'],
    clarifyingQuestions: [
      { q: 'Are we looking at a corporate/litigation lawyer on an average 9-hour workday?', a: 'Yes, an average 8–10 hour workday where ~5 hours are spent actively reading.', why: 'Lawyers also spend 3–5 hrs drafting, in court/calls, and client meetings.' },
      { q: 'Should we separate dense legal statutes/contracts from lighter briefs and emails?', a: 'Yes! Reading speed drops sharply on dense clauses (~170 wpm) vs routine correspondence/briefs (~250 wpm).', why: 'Differentiates deep legal review from rapid skimming.' }
    ],
    strategyOverview: 'Time-Budget × Document-Difficulty Speed Model! Workday = 9 hrs → 5.0 hrs dedicated to reading (2.5 hrs Complex Contracts/Case Law + 2.5 hrs Simple Briefs/Emails). Compute Words Read: Complex (2.5h × 60m × 170 wpm = 25,500 words) + Simple (2.5h × 60m × 250 wpm = 37,500 words) = 63,000 gross words/day! Divide by 300–400 words per legal page (@ 300 w/page = 85 + 125 = 210 gross pages; @ 400 w/page = ~158 gross pages). Apply 90% focus/distraction efficiency factor → ~189 Pages/Day (@ 300 words/pg) or ~142 Pages/Day (@ 400 words/pg)!',
    formula: 'Pages/Day = [∑ (Category Hours × 60 × WPM) ÷ Words/Page] × Efficiency Factor (90%)',
    assumptions: [
      { label: 'Active Reading Time = 5.0 hrs/day (2.5 hrs Complex @ 170 wpm = 25,500 words; 2.5 hrs Simple @ 250 wpm = 37,500 words)', rationale: 'Note: Avoid swapping 170 vs 250 multiplication between complex & simple!' },
      { label: 'Words per Legal Page = ~300–350 words (wide margins, double-spaced briefs, numbered clauses)', rationale: '63,000 words ÷ 300 words/page = 210 raw pages/day.' },
      { label: 'Focus Efficiency = 90% (breaks, calls, re-reading) → 210 × 0.90 = 189 Pages/Day', rationale: 'Scales cleanly to ~140–190 pages depending on 300 vs 400 words/page.' }
    ],
    tree: {
      label: 'Lawyer Active Reading Time (5 Hours / Day)',
      valueText: '63,000 Gross Words',
      children: [
        { label: 'Complex Contracts/Laws (2.5h × 60 × 170 wpm ÷ 300 w/pg)', valueText: '85 Pages' },
        { label: 'Simple Briefs/Emails (2.5h × 60 × 250 wpm ÷ 300 w/pg)', valueText: '125 Pages', highlight: true },
        { label: 'Gross (210 Pages) × 90% Focus Efficiency', valueText: '~189 Pages / Day', highlight: true }
      ]
    },
    finalAnswer: '~150 – 190 Pages / Day (Baseline: 189 Pages)',
    acceptableRange: { min: 100, max: 260, unit: 'Pages/day', display: '100 – 260 pages/day' },
    sanityCheck: 'Lawyers billed 2,000+ hours/year famously consume ~120–200 pages of legal discovery, pleadings, and contracts daily (~35–40 pages per active reading hour, ~1.5 mins/page).',
    interviewerTrap: 'Assuming a lawyer spends all 10 work hours reading (forgetting drafting, court hearings, calls!) OR keeping the same reading WPM for dense M&A contracts vs emails.',
    variations: [
      { question: 'How many pages would a law firm of 200 associates read in 1 week (5 days)?', hint: '200 lawyers × 189 pages/day × 5 days ≈ ~1.89 Lakh pages/week!' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Reading Hours/Day → Doc Difficulty Split × WPM × 60 ÷ Words/Page × Focus Efficiency %', correct: true, feedback: 'Textbook workflow time-and-speed model!' },
        { label: 'Books on Office Shelf ÷ 30', correct: false, feedback: 'Reference statutes stay on shelves; daily reading scales with working hours & WPM.' },
        { label: '8 Hours × 60 Pages/Hr', correct: false, feedback: 'Ignores non-reading work (court/drafting/calls) and complexity differences.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'readHrs', label: 'Daily Reading Hours', defaultVal: 5.0, min: 2.0, max: 8.0, step: 0.5, unit: 'hrs' },
        { key: 'avgWpm', label: 'Blended Reading Speed (WPM)', defaultVal: 210, min: 140, max: 300, step: 10, unit: 'wpm' },
        { key: 'wordsPg', label: 'Words / Legal Page', defaultVal: 300, min: 250, max: 450, step: 25, unit: 'w/pg' },
        { key: 'effPct', label: 'Focus Efficiency %', defaultVal: 90, min: 70, max: 100, step: 5, unit: '%' }
      ],
      computeFormulaText: '(Reading Hrs × 60 × Avg WPM ÷ Words/Page) × Efficiency%',
      compute: (v) => {
        const pages = ((v.readHrs * 60 * v.avgWpm) / v.wordsPg) * (v.effPct / 100);
        return {
          value: Math.round(pages),
          formatted: `${Math.round(pages)} Pages/Day`,
          breakdown: [
            { label: 'Effective Words Read', val: `${Math.round(pages * v.wordsPg).toLocaleString('en-IN')}` },
            { label: 'Avg Mins / Page', val: `${((v.readHrs * 60) / pages).toFixed(2)} mins` }
          ]
        };
      }
    }
  },
  // 27
  {
    id: 'cb-bgmi-daily-playtime',
    title: 'Total Daily Time Spent Playing BGMI in India',
    prompt: 'Estimate the total combined hours spent playing BGMI (Battlegrounds Mobile India) across India in a single day.',
    difficulty: 2,
    archetype: 'Usage & Behavioral',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Mobile Gaming', 'Digital Engagement', 'DAU/MAU', 'India'],
    clarifyingQuestions: [
      { q: 'Are we estimating combined active gameplay hours across all daily players nationwide (not per user)?', a: 'Yes, total cumulative hours played across India in 24 hours.', why: 'Standard gaming engagement / server-load sizing metric.' },
      { q: 'Exclude passive e-sports YouTube viewers who watch without actively playing?', a: 'Yes, strictly active gameplay sessions inside the BGMI app.', why: 'Avoids mixing streaming viewership with active game DAU.' }
    ],
    strategyOverview: 'Top-Down Gaming Funnel × Player Engagement Mix! Start with India Pop (1.4B) × 50% Smartphone Penetration = 700M smartphone users × 60% play mobile games = 420M mobile gamers! Apply BGMI Share (~10% of mobile gamers = 42M active players; vs casual puzzle games like Ludo/Candy Crush). Apply Daily Active Rate (45% DAU/MAU = 18.9M daily players)! Segment Session Duration: Casual (50% × 40m = 20m) + Regular (40% × 100m = 40m) + Hardcore (10% × 200m = 20m) = 80 mins (1.33 hrs) weighted avg/day → 18.9M × 1.33 hrs = ~25.14 Million hours/day!',
    formula: 'Daily Hours = (Pop × Smartphone% × Mobile Gamer% × BGMI Share% × DAU%) × ∑ (Tier% × Avg Play Hrs)',
    assumptions: [
      { label: '1.4B Pop × 50% Smartphones (700M) × 60% Gamers (420M) × 10% BGMI Share = 42M Players', rationale: 'Matches BGMI’s real ~40M–50M monthly active player base in India!' },
      { label: 'Daily Active Rate (DAU/MAU) = 45% → 18.9M Daily Players', rationale: 'Competitive multiplayer shooters hold high ~40–45% stickiness.' },
      { label: 'Weighted Avg Session: 50% Casual (40m) + 40% Regular (100m) + 10% Hardcore (200m) = 80 mins (1.33 hrs) → 25.14M hrs/day', rationale: 'Roughly 2–3 classic 25-minute Erangel matches per active session!' }
    ],
    tree: {
      label: 'India Pop (1.4B) → Smartphone Gamers (420M)',
      valueText: '420M Gamers',
      children: [
        { label: 'BGMI Players (10% Gamer Share = 42M MAUs) × 45% DAU', valueText: '18.9M Daily Players', highlight: true },
        { label: 'Weighted Playtime (50%×40m + 40%×100m + 10%×200m)', valueText: '80 mins (1.33 hrs)' },
        { label: 'Total Daily India Playtime (18.9M × 1.33 hrs)', valueText: '~25.14M Hours / Day', highlight: true }
      ]
    },
    finalAnswer: '~25.1 Million Hours / Day',
    acceptableRange: { min: 15, max: 45, unit: 'Million hours/day', display: '15M – 45M hours/day' },
    sanityCheck: 'Krafton reported ~100M+ cumulative BGMI downloads in India with ~15M–20M daily active players averaging ~60–90 minutes/day (~2.5 classic matches) = ~20M–28M daily hours. Spot on!',
    interviewerTrap: 'Assuming all 42M installed/monthly BGMI players play EVERY single day (ignoring DAU/MAU ~45%) OR ignoring hardcore streamers/grinders who pull the weighted average up to ~80 mins.',
    variations: [
      { question: 'How many total BGMI matches (~25 mins, 100 players/match) are hosted daily on Indian servers?', hint: '25.14M hrs × 60 ÷ 25 mins = 60.3M player-matches ÷ 100 players ≈ ~6 Lakh matches/day!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Pop → Smartphone % → Mobile Gamer % → BGMI Share % × DAU % × Weighted Playtime Tiers', correct: true, feedback: 'Textbook mobile gaming funnel! Separates MAUs, DAU stickiness, and casual/hardcore skew.' },
        { label: 'Google Play Downloads × 2 Hours', correct: false, feedback: 'Cumulative downloads ignore uninstalls and inactive accounts.' },
        { label: 'College Students × 1 Hour', correct: false, feedback: 'Teenagers & young working adults outside campuses make up a huge share of BGMI players.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'gamersM', label: 'India Mobile Gamers (M)', defaultVal: 420, min: 300, max: 550, step: 20, unit: 'M' },
        { key: 'bgmiPct', label: 'BGMI Share % of Gamers', defaultVal: 10, min: 5, max: 18, step: 1, unit: '%' },
        { key: 'dauPct', label: 'DAU / MAU Stickiness %', defaultVal: 45, min: 25, max: 60, step: 5, unit: '%' },
        { key: 'avgMins', label: 'Avg Playtime / DAU (min)', defaultVal: 80, min: 45, max: 120, step: 5, unit: 'min' }
      ],
      computeFormulaText: 'Mobile Gamers × BGMI% × DAU% × (Avg Mins ÷ 60)',
      compute: (v) => {
        const dauM = v.gamersM * (v.bgmiPct / 100) * (v.dauPct / 100);
        const hrsM = dauM * (v.avgMins / 60);
        return {
          value: hrsM,
          formatted: `${hrsM.toFixed(1)}M Hours/Day`,
          breakdown: [
            { label: 'Daily Active Players', val: `${dauM.toFixed(1)} M` },
            { label: 'Daily Matches (~100 pax, 25m)', val: `${Math.round((hrsM * 60) / (25 * 100) * 10)} Lakh` }
          ]
        };
      }
    }
  },
  // 28
  {
    id: 'cb-cocacola-cans-india',
    title: 'Annual Consumer Spend on Coca-Cola Cans in India',
    prompt: 'Estimate the total annual consumer expenditure (in ₹ Crore) on Coca-Cola aluminum cans in India.',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['FMCG Beverages', 'Packaging Mix', 'India', 'Urban-Rural Split'],
    clarifyingQuestions: [
      { q: 'Are we estimating strictly 300/330ml aluminum CANS (excluding PET bottles & glass returnables), and Coca-Cola trademark brand?', a: 'Yes, Coca-Cola brand aluminum cans only (~₹40 MRP/can; exclude Sprite/Thums Up/Fanta or PET bottles).', why: 'Aluminum cans carry premium pricing (₹40) and make up only ~8–10% of Indian cola volume!' },
      { q: 'Should we segment Urban vs Rural frequency since cans sell mainly in modern trade, QSR, & quick commerce?', a: 'Yes! Segment Urban (40%) vs Rural (60%) carbonated drink frequency first, then isolate Coca-Cola & Can share.', why: 'Clearly captures why urban convenience drives ~70% of can consumption.' }
    ],
    strategyOverview: 'Urban-Rural Beverage Funnel × Packaging Share! Start with India Pop (1.4B): Rural (60% = 840M × 30% soda drinkers = 252M) vs Urban (40% = 560M × 60% drinkers = 336M). Segment Frequency: Monthly (12/yr), Weekly (52/yr), Occasional (1/yr) → Rural (30%×12 + 10%×52 + 60%×1 = ~2.37B units/yr) + Urban (45%×12 + 15%×52 + 40%×1 = ~4.57B units/yr) = 6.94 Billion carbonated drinks/yr! Apply Coca-Cola Co./Brand Share (60% → 4.16B units) × Aluminum Can Packaging Share (10% vs 90% PET/glass) = 416 Million Cans × ₹40/can = ₹1,664 Crore (₹16.64 Billion)/yr!',
    formula: 'Annual Can Spend = [(Rural + Urban Soda Servings/Yr) × Brand Share % × Can Packaging %] × ₹40',
    assumptions: [
      { label: 'India 1.4B: Rural (840M × 30% = 252M drinkers → 2.37B/yr) + Urban (560M × 60% = 336M → 4.57B/yr) = 6.94B', rationale: 'Notice carefully: weekly rate is ×52 weeks/yr (`50.4M × 52 = 2,620.8M`), not ×12!' },
      { label: 'Brand Share (60% = 4.16B servings) × Can Packaging Mix (10% cans vs 90% PET/glass) = 416 Million Cans/Yr', rationale: 'India overwhelmingly buys ₹20 small PET & 750ml/2L family bottles, keeping cans at ~8–10%.' },
      { label: '416 Million Cans × ₹40 MRP/can = ₹1,664 Crore (₹16.64 Billion) per year', rationale: 'Unit check: 416M × 40 = 16,640 Million = ₹1,664 Crore (avoid writing "416 Billion cans"!).' }
    ],
    tree: {
      label: 'India Carbonated Drinks Demand (6.94B Servings/Yr)',
      valueText: '6.94B Servings',
      children: [
        { label: 'Rural (252M drinkers: 30% Mo / 10% Wk / 60% Occ)', valueText: '2.37B servings' },
        { label: 'Urban (336M drinkers: 45% Mo / 15% Wk / 40% Occ)', valueText: '4.57B servings', highlight: true },
        {
          label: 'Brand Share (60% = 4.16B) × Can Share (10%)',
          valueText: '416M Cans/Year',
          children: [
            { label: '× ₹40 Avg MRP per Can', valueText: '₹1,664 Cr (₹16.64B)/Yr', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~₹1,664 Crore / Year (~416 Million Cans/Yr)',
    acceptableRange: { min: 600, max: 3000, unit: '₹ Crore/year', display: '₹600 Cr – ₹3,000 Cr/yr' },
    sanityCheck: 'Coca-Cola India’s annual net revenue tops ~₹4,500–5,500+ Cr (~₹12,000+ Cr retail sales across Coke/Thums Up/Sprite/Maaza). Aluminum cans at ~10% of flagship cola retail spend (~₹1,000–1,700 Cr) align accurately!',
    interviewerTrap: 'Writing `840 Billion` instead of `840 Million` OR multiplying `416 Million × ₹40` incorrectly (`416M × 40 = ₹1,664 Crore`, NOT ₹16.64 Crore)! Always double-check Billion vs Million labels.',
    variations: [
      { question: 'How much aluminum (in tonnes) is consumed annually by those 416M cans?', hint: '416M cans × ~14 grams/can ≈ ~5,824 Metric Tonnes of aluminum/yr!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Pop → Urban/Rural Soda Drinkers × Frequency Tiers → Brand Share % × Can Packaging % × MRP', correct: true, feedback: 'Spot on! Packaging mix filter (Cans ~10% vs PET/Glass ~90%) is critical.' },
        { label: 'India Supermarkets × 1,000', correct: false, feedback: 'Misses restaurants, QSRs, quick commerce, railways, and vending machines.' },
        { label: 'Total Soft Drink Market ÷ 2', correct: false, feedback: 'Cans are a small premium packaging slice (~10%), not 50%!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'totalSodaB', label: 'India Soda Servings (B/yr)', defaultVal: 6.94, min: 4.0, max: 12.0, step: 0.5, unit: 'B' },
        { key: 'brandPct', label: 'Brand Share %', defaultVal: 60, min: 30, max: 70, step: 5, unit: '%' },
        { key: 'canPct', label: 'Aluminum Can Mix %', defaultVal: 10, min: 5, max: 20, step: 2, unit: '%' },
        { key: 'price', label: 'Can Price (₹)', defaultVal: 40, min: 35, max: 50, step: 5, unit: '₹' }
      ],
      computeFormulaText: '(Total Soda Servings × Brand% × Can%) × Price ÷ ₹1 Crore',
      compute: (v) => {
        const cansM = v.totalSodaB * 1000 * (v.brandPct / 100) * (v.canPct / 100);
        const revCr = (cansM * 1e6 * v.price) / 1e7;
        return {
          value: Math.round(revCr),
          formatted: `₹${Math.round(revCr).toLocaleString('en-IN')} Crore/Yr`,
          breakdown: [
            { label: 'Annual Can Volume', val: `${Math.round(cansM)}M cans` },
            { label: 'Monthly Spend', val: `₹${Math.round(revCr / 12).toLocaleString('en-IN')} Cr/mo` }
          ]
        };
      }
    }
  },
  // 29
  {
    id: 'cb-du-fest-sponsorship',
    title: 'Annual Corporate Sponsorship Spend on Delhi University Fests',
    prompt: 'Estimate the total annual amount spent by corporate sponsors on college cultural & departmental fests across Delhi University (DU).',
    difficulty: 3,
    archetype: 'Revenue & Cost',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-outlet',
    tags: ['Marketing & Events', 'Campus Sponsorships', 'Delhi University', 'Tiered Budget'],
    clarifyingQuestions: [
      { q: 'Include cash + major in-kind corporate sponsorships across flagship fests, department fests, and society events?', a: 'Yes, include flagship union fests (Tier 1), department/society fests (Tier 2 & 3), and Pan-DU festivals.', why: 'Flagship cultural fests grab headlines, while ~80+ department fests add substantial cumulative spend.' },
      { q: 'Cover all 3 DU campus zones (North, South, and Off-Campus colleges)?', a: 'Yes: ~20 North, ~15 South, and ~40+ Off-Campus colleges with sharp tier participation drop-off.', why: 'Major FMCG/tech recruiters target high-footfall North/South Campus colleges disproportionately.' }
    ],
    strategyOverview: 'Campus Zone × Event-Tier Budget Model! Count Fest-Hosting DU Colleges (~26 active): North Campus (~70% = 14), South Campus (~45% = 7), Off-Campus (~10% = 4–5). Segment Event Tiers & Budgets: 1. Tier-1 Flagship Fests (~35 North + 7 South + 2 Off-Campus = 44 mega/major events × ₹6 Lakh = ₹2.64 Cr). 2. Tier-2 Department Fests (~63 North + 18 South + 6 Off-Campus = 87 dept fests × ₹4 Lakh = ₹3.48 Cr). 3. Tier-3 Society Events (~200 societies × 1 event/yr × ₹0.5 Lakh = ₹1.00 Cr). 4. Pan-DU Festivals (2 mega × ₹8 Lakh = ₹16 Lakh) → Total = ₹7.28 Crore/year!',
    formula: 'Annual Sponsorship = ∑ (Event Tier Count × Avg Corporate Sponsorship Budget)',
    assumptions: [
      { label: 'Tier-1 Flagship Fests (44 across North/South/Off × ₹6 Lakh) = ₹2.64 Crore', rationale: 'Top North Campus fests attract ₹10–25L+, while smaller fests pull ₹2–4L (blended avg ₹6L).' },
      { label: 'Tier-2 Dept/Major Society Fests (87 × ₹4 Lakh) = ₹3.48 Crore | Tier-3 Workshops/Societies (200 × ₹0.5L) = ₹1.00 Cr', rationale: 'Commerce, econ, tech, and consulting clubs run annual conclaves with ₹1–5L sponsor pools.' },
      { label: 'Pan-DU Events (2 × ₹8 Lakh = ₹16 Lakh) → Grand Total = ₹7.28 Crore/Year', rationale: 'Checks cleanly against ~100–120 youth-targeting FMCG/EdTech/banking brands spending ₹5–10L/yr on DU.' }
    ],
    tree: {
      label: 'Delhi University Corporate Fest Sponsorships',
      valueText: '₹7.28 Crore / Year',
      children: [
        { label: 'Tier-1 Flagship Fests (44 events × ₹6 Lakh)', valueText: '₹2.64 Crore' },
        { label: 'Tier-2 Department Fests (87 events × ₹4 Lakh)', valueText: '₹3.48 Crore', highlight: true },
        { label: 'Tier-3 Small Society Events (200 × ₹50K) + 2 Pan-DU (₹16L)', valueText: '₹1.16 Crore' }
      ]
    },
    finalAnswer: '~₹7.3 Crore / Year (~₹6 – ₹10 Crore/Yr)',
    acceptableRange: { min: 3.5, max: 14, unit: '₹ Crore/year', display: '₹3.5 Cr – ₹14 Cr/yr' },
    sanityCheck: 'Spread across ~75+ DU colleges (~150,000+ regular students), ₹7.28 Cr averages ~₹10L/college/year across large North/South colleges (~₹25–30L each) and small off-campus colleges (~₹1–2L), super realistic!',
    interviewerTrap: 'Only counting famous 3-day North Campus annual fests (ignoring ~250+ smaller departmental/society fests) OR assuming all 75+ colleges run ₹20L mega fests.',
    variations: [
      { question: 'How much total corporate campus-marketing budget reaches IIT + DU + IIM fests across India?', hint: '~30 Tier-1 mega fests @ ₹40L (₹12 Cr) + ~300 Tier-2 college fests @ ₹5L (₹15 Cr) + societies ≈ ~₹35–50 Crore/yr.' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Active DU Colleges (North/South/Off) × Event Tiers (Flagship/Dept/Society) × Avg Sponsorship Budget', correct: true, feedback: 'Spot on! Tiered event classification captures both mega fests and smaller society conclaves.' },
        { label: 'India Advertising Market × 5%', correct: false, feedback: 'Campus events are <0.05% of national ad spend — unusable top-down.' },
        { label: 'DU Student Count × ₹5,000', correct: false, feedback: 'Corporate sponsorships are fixed by event tiers and campus prestige, not flat per student.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 't1Count', label: 'Tier-1 Flagship Events', defaultVal: 44, min: 20, max: 70, step: 4, unit: 'events' },
        { key: 't1BudgetL', label: 'Tier-1 Avg Budget (₹L)', defaultVal: 6.0, min: 3.0, max: 12.0, step: 1.0, unit: '₹L' },
        { key: 't2Count', label: 'Tier-2 Dept Fests', defaultVal: 87, min: 40, max: 140, step: 5, unit: 'events' },
        { key: 't2BudgetL', label: 'Tier-2 Avg Budget (₹L)', defaultVal: 4.0, min: 1.5, max: 7.0, step: 0.5, unit: '₹L' }
      ],
      computeFormulaText: '[(T1 × T1 Budget) + (T2 × T2 Budget) + ₹116L Tier-3/Pan-DU] ÷ 100',
      compute: (v) => {
        const cr = (v.t1Count * v.t1BudgetL + v.t2Count * v.t2BudgetL + 116) / 100;
        return {
          value: cr,
          formatted: `₹${cr.toFixed(2)} Crore/Yr`,
          breakdown: [
            { label: 'Tier-1 Share', val: `₹${((v.t1Count * v.t1BudgetL) / 100).toFixed(2)} Cr` },
            { label: 'Tier-2 Share', val: `₹${((v.t2Count * v.t2BudgetL) / 100).toFixed(2)} Cr` }
          ]
        };
      }
    }
  },
  // 30
  {
    id: 'cb-momos-market-delhi',
    title: 'Annual Street-Food Market Size of Momos in Delhi',
    prompt: 'Estimate the annual consumer market size (plates sold & ₹ revenue) of momos across street carts, small eateries, and cafes in Delhi.',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Street Food', 'QSR', 'Delhi', 'Channel Pricing'],
    clarifyingQuestions: [
      { q: 'Include roadside stalls, local markets/eateries, AND premium cafes/tandoori-momo outlets?', a: 'Yes, cover all 3 vendor channels across Delhi NCR (~33M pop).', why: 'Channel pricing varies 2x from ₹50 street plates to ₹100+ cafe plates!' },
      { q: 'Are we estimating annual value (₹ Crore) and monthly/annual plates?', a: 'Calculate monthly plate volume first, annualize × 12, then multiply by channel-weighted plate price.', why: 'Clean top-down demand + channel pricing overlay.' }
    ],
    strategyOverview: 'Top-Down Consumer Frequency Funnel + 3-Channel Pricing! Delhi Pop = 33M → Street Food Eaters (65% = 21.45M) × Momo Preference (60% = 12.87M eaters). Segment Eating Frequency: Hardcore (10% = 1.29M × 6/mo = 7.7M), Regular (40% = 5.15M × 3/mo = 15.4M), Casual (50% = 6.44M × 1/mo = 6.4M) → ~29.53M plates/month × 12 = ~354 Million plates/year! Distribute by Vendor Channel: Street Carts (50% = 177M × ₹50 = ₹885 Cr) + Small Eateries (40% = 141.6M × ₹70 = ₹991.2 Cr) + Premium/Tandoori (10% = 35.4M × ₹100 = ₹354 Cr) = ₹2,230.2 Crore/year!',
    formula: 'Annual Revenue = [Pop × StreetFood% × Momo% × Avg Plates/Mo × 12] × ∑ (Channel Share% × Channel Price)',
    assumptions: [
      { label: 'Delhi 33M × 65% Street Food (21.45M) × 60% Momo Eaters = 12.87M unique momo consumers', rationale: 'Momos are arguably Delhi’s single highest-volume evening street snack.' },
      { label: 'Frequency Mix: Hardcore 10% (6/mo) + Regular 40% (3/mo) + Casual 50% (1/mo) = 2.3 avg plates/mo = 29.53M/mo (354M/yr)', rationale: 'Matches ~10 Lakh plates/day across Delhi NCR!' },
      { label: 'Channel Price Mix: 50% Street (₹50) + 40% Eateries (₹70) + 10% Premium (₹100) = ₹63 blended price → ₹2,230 Cr/yr', rationale: 'Supply sanity check: ~15,000–20,000 momo carts/shops selling ~50–65 plates/day ≈ ~10 Lakh plates/day!' }
    ],
    tree: {
      label: 'Delhi Pop (33M) → Momo Eaters (12.87M)',
      valueText: '29.53M Plates/Month',
      children: [
        { label: 'Monthly Mix: 1.28M×6 + 5.14M×3 + 6.43M×1', valueText: '354M Plates / Year' },
        { label: 'Street Carts (50% = 177M × ₹50)', valueText: '₹885 Crore' },
        { label: 'Small Eateries (40% = 141.6M × ₹70) + Premium (10% × ₹100)', valueText: '₹991.2 Cr + ₹354 Cr' },
        { label: 'Total Delhi Momo Market Revenue', valueText: '₹2,230 Crore / Year', highlight: true }
      ]
    },
    finalAnswer: '~₹2,230 Crore / Year (~354 Million Plates/Yr | ~10 Lakh Plates/Day)',
    acceptableRange: { min: 1000, max: 3500, unit: '₹ Crore/year', display: '₹1,000 Cr – ₹3,500 Cr/yr' },
    sanityCheck: 'Cross-check supply: ~354M/yr ÷ 365 = ~9.7 Lakh plates/day. Across ~15,000 street carts + shops in Delhi NCR (~65 plates/vendor/day × ~₹63 avg price = ~₹4,100 daily sales), totally realistic!',
    interviewerTrap: 'Using a single flat ₹50 street-cart price (missing higher-ticket cafe/tandoori/kurkure momos at ₹100–₹180!) OR ignoring seasonal winter surge vs summer lull.',
    variations: [
      { question: 'How many kilograms of maida/refined flour does Delhi consume daily making momos?', hint: '~10 Lakh plates × 8 pcs × ~10g dough ≈ ~80,000 kg (80 tonnes) of maida/day!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'City Pop → Street-Food Share → Momo Share × Consumption Frequency Tiers × Channel Weighted Price', correct: true, feedback: 'Textbook QSR demand funnel + channel pricing overlay!' },
        { label: 'Number of Restaurants × 10 Plates', correct: false, feedback: 'Misses thousands of unorganized roadside stalls generating 50% of volume.' },
        { label: 'Delhi Wheat Demand ÷ 10', correct: false, feedback: 'Overwhelming majority of wheat goes to rotis, not momos.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'Delhi NCR Pop (M)', defaultVal: 33, min: 20, max: 38, step: 1, unit: 'M' },
        { key: 'eaterPct', label: 'Momo Eaters % of Pop', defaultVal: 39, min: 25, max: 55, step: 2, unit: '%' },
        { key: 'platesMo', label: 'Avg Plates / Eater / Mo', defaultVal: 2.3, min: 1.0, max: 4.0, step: 0.2, unit: 'plates' },
        { key: 'avgPrice', label: 'Blended Plate Price (₹)', defaultVal: 63, min: 45, max: 90, step: 3, unit: '₹' }
      ],
      computeFormulaText: 'Pop × Eater% × Avg Plates/Mo × 12 × Avg Price',
      compute: (v) => {
        const annualPlatesM = v.popM * (v.eaterPct / 100) * v.platesMo * 12;
        const revCr = (annualPlatesM * 1e6 * v.avgPrice) / 1e7;
        return {
          value: Math.round(revCr),
          formatted: `₹${Math.round(revCr).toLocaleString('en-IN')} Crore/Yr`,
          breakdown: [
            { label: 'Annual Plates Sold', val: `${Math.round(annualPlatesM)} Million` },
            { label: 'Daily Plates', val: `${(annualPlatesM * 10 / 365).toFixed(1)} Lakh/day` }
          ]
        };
      }
    }
  },
  // 31
  {
    id: 'cb-kinder-joy-delhi',
    title: 'Weekly Sales of Harry Potter Edition Kinder Joys in Delhi',
    prompt: 'Estimate the number of Harry Potter limited-edition Kinder Joys sold in Delhi during a promotional week.',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['FMCG Confectionery', 'SKU Share', 'Delhi', 'Promo Demand'],
    clarifyingQuestions: [
      { q: 'Are we estimating ONLY the Harry Potter licensed edition SKUs (~40% promo shelf mix) vs all Kinder Joy eggs?', a: 'Yes: estimate total weekly Kinder Joy demand first, then isolate the ~40% Harry Potter collector SKU share.', why: 'Separating baseline brand volume from the licensed-edition slice prevents double-counting.' },
      { q: 'Should we include teenager/young-adult nostalgia buyers alongside children aged 3–15?', a: 'Yes! Viral Potterhead demand pulls significant 16–30 impulse purchases alongside parents buying for kids.', why: 'Captures the real-world social-media collector surge for licensed drops!' }
    ],
    strategyOverview: 'Dual-Cohort Age + Income Frequency Funnel × SKU Share! Start with Delhi Pop (33M): Children 3–15 yrs (20% = 6.6M) + Non-Children >15 (80% = 26.4M). Children Income/Frequency: High (10% = 0.66M × 1/wk = 0.66M), Middle (50% = 3.3M ÷ 3 wks = 1.10M/wk), Low (40% = 2.64M ÷ 8 wks = 0.33M/wk) → 2.09M/wk! Teen/Adult Impulse Collectors: 15% of 26.4M = 3.96M buying every 3 weeks (or ~15%×0.33/wk = 1.32M/wk) → Total Weekly Kinder Joys = 3.41M units! Apply 40% Harry Potter Edition Mix → ~1.36 Million Harry Potter Kinder Joys/week!',
    formula: 'Weekly Promo Units = [∑ (Child Income Pop × Weekly Freq) + (Adult Promo Pool × Weekly Freq)] × Promo SKU Share %',
    assumptions: [
      { label: 'Children 3–15 (6.6M): High 0.66M (1/wk) + Mid 3.3M (1/3wk = 1.1M) + Low 2.64M (1/8wk = 0.33M) = 2.09M/wk', rationale: 'Price (~₹45–₹50) limits low-income frequency to occasional treats (~once every 2 months).' },
      { label: 'Non-Child Teen/Adult Surge (15% of 26.4M = 3.96M × ~1/3 wk) ≈ 1.32M/wk → Total = 3.41M/wk', rationale: 'Viral unboxing & collector scarcity lifted adult purchases during the campaign.' },
      { label: 'Harry Potter SKU Share = 40% (vs Pink/Blue/Regular eggs) = ~1.36 Million units/week (~1.9L/day)', rationale: 'Supply cross-check: ~65,000 kiranas/chemists/quick-comm hubs selling ~3 HP eggs/day ≈ ~1.95L/day!' }
    ],
    tree: {
      label: 'Delhi Population (33M)',
      valueText: '3.41M Kinder Joys/Wk',
      children: [
        { label: 'Children 3–15 (6.6M): 0.66M + 1.10M + 0.33M', valueText: '2.09M/wk' },
        { label: 'Teen/Adult Fans (15% of 26.4M = 3.96M × ~0.33/wk)', valueText: '1.32M/wk' },
        {
          label: 'Total Kinder Joy Weekly Volume = 3.41M',
          valueText: '3.41M Units/Wk',
          children: [
            { label: '× 40% Harry Potter Edition Share', valueText: '~1.36M Units / Week', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~1.36 Million Harry Potter Kinder Joys / Week (Delhi)',
    acceptableRange: { min: 500000, max: 2200000, unit: 'Units/week', display: '5 Lakh – 22 Lakh units/week' },
    sanityCheck: 'Cross-check Delhi retail outlets: ~70,000 kirana stores, sweet/dairy booths, supermarkets, & quick-commerce dark stores. Selling ~2.5–3 Harry Potter eggs/store/day ≈ ~1.9 Lakh/day = ~1.35 Million/week!',
    interviewerTrap: 'Excluding young adults/teenagers (missing the collector hype behind Harry Potter!) OR treating 100% of Kinder Joy shelf stock as Harry Potter SKUs (pink/blue regular lines still account for ~60%).',
    variations: [
      { question: 'What is the weekly retail revenue (at ₹50 MRP) from Harry Potter Kinder Joys in Delhi?', hint: '1.36M × ₹50 = ₹6.8 Crore/week from one promotional edition in one metro!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Pop → Children (Income × Purchase Frequency) + Teen/Adult Collectors × Promo Edition Share %', correct: true, feedback: 'Spot on! Modeling both kids + adult promo impulse buyers then applying SKU share is clean.' },
        { label: 'School Count × 500 Kids', correct: false, feedback: 'Kids don’t buy chocolates inside schools — retail frequency varies by household income.' },
        { label: '33M × 40%', correct: false, feedback: 'Not every resident buys a Harry Potter egg every week!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popM', label: 'Delhi Pop (M)', defaultVal: 33, min: 20, max: 38, step: 1, unit: 'M' },
        { key: 'childWkM', label: 'Child Weekly Base (M/wk)', defaultVal: 2.09, min: 1.0, max: 3.5, step: 0.2, unit: 'M' },
        { key: 'adultWkM', label: 'Adult Promo Base (M/wk)', defaultVal: 1.32, min: 0.3, max: 2.5, step: 0.2, unit: 'M' },
        { key: 'hpSharePct', label: 'Harry Potter SKU Share %', defaultVal: 40, min: 20, max: 60, step: 5, unit: '%' }
      ],
      computeFormulaText: '(Child Weekly + Adult Weekly) × Harry Potter SKU Share%',
      compute: (v) => {
        const scale = v.popM / 33;
        const hpM = (v.childWkM + v.adultWkM) * scale * (v.hpSharePct / 100);
        return {
          value: hpM,
          formatted: `${hpM.toFixed(2)} Million Units/Wk`,
          breakdown: [
            { label: 'Total Kinder Joys/Wk', val: `${((v.childWkM + v.adultWkM) * scale).toFixed(2)} M` },
            { label: 'Weekly Value (@ ₹50 MRP)', val: `₹${(hpM * 5).toFixed(2)} Crore` }
          ]
        };
      }
    }
  },
  // 32
  {
    id: 'cb-jaipur-water-bottles',
    title: 'Packaged Drinking Water Bottles Sold Daily in Jaipur',
    prompt: 'Estimate the total number of packaged drinking water bottles (single-serve 500ml/1L) sold in Jaipur in a single day.',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Hybrid (Demand + Supply)',
    templateId: 'tpl-fmcg',
    tags: ['FMCG Beverages', 'Tourism Hub', 'Jaipur', 'Resident + Tourist'],
    clarifyingQuestions: [
      { q: 'Are we counting individual retail 500ml/1L PET bottles (excluding 20L bulk household water jars)?', a: 'Yes, packaged 500ml/1L retail bottles across residents, daily tourists, and hotels/restaurants/events.', why: '20L home water cans operate via an entirely separate subscription delivery market.' },
      { q: 'Jaipur is a major tourism hub — should daily visiting tourists be modeled separately from residents?', a: 'Yes! Separate Residents (40L), Daily Tourists (50K/day), and Commercial Venues (hotels/restaurants/events) carefully avoiding double-counting!', why: 'Tourists have near-100% bottled-water reliance (2 bottles/day) vs ~30% out-of-home residents.' }
    ],
    strategyOverview: 'Three-Bucket Non-Overlapping Demand Model! 1. Residents & Commuters: Jaipur Pop = 40 Lakh (4M) × 30% buy packaged water out-of-home on a given day × 1 bottle/day = 12,00,000 bottles/day! 2. Daily Tourists: ~50,000 active tourists/day × 2 bottles/day = 1,00,000 bottles/day! 3. Incremental Hospitality & Events (avoiding tourist overlap): 1,500 hotels (50 rooms × 70% occ × 2 = 1.05L) + 5,000 restaurants (× 20/day = 1.0L) + 200 daily events (× 500 = 1.0L) → adjusted to ~2,00,000 incremental commercial bottles after removing tourist overlap → Grand Total ≈ 15,00,000 (15 Lakh) Bottles/Day!',
    formula: 'Daily Bottles = (Resident Pop × Daily Buyer% × 1) + (Tourists × 2) + Net Incremental Commercial (Hotels/Restaurants/Events)',
    assumptions: [
      { label: 'Jaipur Residents = 40 Lakh × 30% out-of-home buyers × 1 bottle/day = 12,00,000 bottles/day', rationale: 'Warm Rajasthan climate keeps on-the-go 1L bottle purchase elevated.' },
      { label: 'Daily Tourists = ~50,000/day × 2 bottles/day = 1,00,000 bottles/day', rationale: 'Matches ~1.8 Cr annual Jaipur tourist visits ÷ 365 days ≈ ~50K/day.' },
      { label: 'Hotels/Restaurants/Events gross ~3.05L/day, trimmed to 2,00,000 incremental to avoid tourist double-count = 15 Lakh/day', rationale: 'Notice how flagging hotel/tourist overlap shows true consulting rigor!' }
    ],
    tree: {
      label: 'Jaipur Daily Packaged Water Bottles',
      valueText: '15.0 Lakh Bottles/Day',
      children: [
        { label: 'Residents (40L × 30% out-of-home × 1 bottle)', valueText: '12,00,000/day', highlight: true },
        { label: 'Tourists (50,000 daily × 2 bottles)', valueText: '1,00,000/day' },
        { label: 'Net Commercial (Hotels + Restaurants + Events, adj. overlap)', valueText: '2,00,000/day' }
      ]
    },
    finalAnswer: '~15 Lakh Bottles / Day (~₹3 Crore/Day @ ₹20 MRP)',
    acceptableRange: { min: 700000, max: 2200000, unit: 'Bottles/day', display: '7 Lakh – 22 Lakh bottles/day' },
    sanityCheck: '15 Lakh bottles ÷ 40 Lakh residents = ~0.37 bottles/person/day overall (~1 bottle every ~2.7 days averaged across tourists & locals). Across ~12,000 retail pan shops, kiranas, buses, and railway stalls, that averages ~125 bottles/outlet/day (5–6 cartons/day)!',
    interviewerTrap: 'Double-counting tourists in BOTH the "Tourists visiting" bucket AND "Hotel/Restaurant guest bottles" — explicitly deducting overlap avoids inflating the commercial bucket!',
    variations: [
      { question: 'How much PET plastic (in tonnes) is generated daily by these 15 Lakh bottles?', hint: '15 Lakh × ~20g per 1L PET bottle ≈ ~30,000 kg (30 Tonnes) of PET waste daily!' }
    ],
    guidedPractice: {
      correctApproach: 'Hybrid (Demand + Supply)',
      funnelOptions: [
        { label: 'Residents (Pop × Daily Buy %) + Daily Tourists + Net Non-Overlapping Events/Restaurants', correct: true, feedback: 'Spot on! Explicitly avoiding overlap between tourists and hotels/restaurants is key.' },
        { label: '40 Lakh × 2 Liters/Day', correct: false, feedback: 'Most household water comes from home RO purifiers and municipal taps, not ₹20 PET bottles!' },
        { label: 'Water Tankers × 1,000', correct: false, feedback: 'Unrelated to packaged retail PET bottle demand.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popL', label: 'Jaipur Pop (Lakh)', defaultVal: 40, min: 30, max: 55, step: 2, unit: 'L' },
        { key: 'resBuyPct', label: 'Resident Daily Buyer %', defaultVal: 30, min: 10, max: 45, step: 5, unit: '%' },
        { key: 'touristsK', label: 'Daily Tourists (K)', defaultVal: 50, min: 20, max: 100, step: 10, unit: 'K' },
        { key: 'commL', label: 'Net Commercial / Events (L)', defaultVal: 2.0, min: 1.0, max: 4.0, step: 0.5, unit: 'L' }
      ],
      computeFormulaText: '(Pop × Resident%) + (Tourists × 2) + Net Commercial',
      compute: (v) => {
        const resL = v.popL * (v.resBuyPct / 100);
        const tourL = (v.touristsK * 2) / 100;
        const totalL = resL + tourL + v.commL;
        return {
          value: Math.round(totalL * 1e5),
          formatted: `${totalL.toFixed(1)} Lakh Bottles/Day`,
          breakdown: [
            { label: 'Daily Retail Value (@ ₹20)', val: `₹${(totalL * 20).toFixed(1)} Lakh/day` },
            { label: 'Resident Share', val: `${((resL / totalL) * 100).toFixed(0)}%` }
          ]
        };
      }
    }
  },
  // 33
  {
    id: 'cb-north-campus-pg-waste',
    title: 'Weekly Waste Generated by Student PGs in Delhi North Campus',
    prompt: 'Estimate the total solid waste (in kilograms) generated in one week by Paying Guest (PG) student accommodations inside Delhi University North Campus.',
    difficulty: 2,
    archetype: 'Usage & Behavioral',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Sustainability', 'Campus Logistics', 'Delhi', 'Waste Management'],
    clarifyingQuestions: [
      { q: 'Include ONLY students staying in private PGs located inside North Campus (excluding on-campus hostels and day scholars)?', a: 'Yes, isolate North Campus private PGs (~90% of North Campus college PG residents).', why: 'Hostels and distant off-campus PGs belong to different municipal/contractor collection routes.' },
      { q: 'Does per-student daily waste differ on weekends vs weekdays?', a: 'Yes: assume ~1.0 kg/day on weekdays (5d) and ~0.7 kg/day (-30%) on weekends (2d) as students eat out or visit home.', why: 'Breaks waste cleanly into Food, Paper, Plastic, and Misc components with day-of-week variance.' }
    ],
    strategyOverview: 'Student Housing Funnel × Categorized Per-Capita Waste! Start with North Campus Colleges (13 colleges × ~4,000 students = 52,000 students). Split Accommodation: Day Scholars (20% = 10.4K), Campus Hostels (20% = 10.4K), PG Residents (60% = 31,200). Filter Inside North Campus PGs (~90% ≈ 28,000 PG students; ~400 PGs @ 70 students). Compute Weekly Per-Student Waste: Food (0.50 kg) + Paper (0.20 kg) + Plastic (0.15 kg) + Sanitary/Misc (0.15 kg) = 1.0 kg/weekday × 5 = 5.0 kg + Weekend (0.7 kg × 2 = 1.4 kg) = 6.4 kg/student/week → 28,000 × 6.4 kg = ~1,79,200 kg (~179.2 Tonnes/week)!',
    formula: 'Weekly PG Waste (kg) = (Colleges × Students × PG% × Local%) × [(5 × Weekday kg) + (2 × Weekend kg)]',
    assumptions: [
      { label: '52,000 North Campus Students (13 × 4,000) × 60% in PGs × 90% locally in North Campus ≈ 28,000 PG residents', rationale: 'Also maps to ~400 private PG buildings averaging ~70 students each.' },
      { label: 'Per-Student Weekday Waste = 1.0 kg/day (0.5 kg Food + 0.2 kg Paper + 0.15 kg Plastic + 0.15 kg Sanitary/Misc)', rationale: 'Matches typical Indian urban per-capita residential waste (~0.7–1.0 kg/day incl. mess kitchen scraps).' },
      { label: '5 Weekdays (5.0 kg) + 2 Weekends @ -30% (1.4 kg) = 6.4 kg/wk × 28,000 = 1,79,200 kg (~179 Tonnes/week)', rationale: 'Equals ~25.6 tonnes/day (~64 kg/day per 70-student PG building)!' }
    ],
    tree: {
      label: 'DU North Campus (13 Colleges × 4,000 = 52,000 Students)',
      valueText: '52,000 Students',
      children: [
        { label: 'PG Residents (60% = 31.2K) × 90% Inside North Campus', valueText: '28,000 PG Students' },
        { label: 'Weekly Waste/Student: 5d×1.0kg + 2d×0.7kg', valueText: '6.4 kg / week', highlight: true },
        { label: 'Total North Campus PG Waste (28,000 × 6.4 kg)', valueText: '1,79,200 kg (~179.2 Tonnes/Wk)', highlight: true }
      ]
    },
    finalAnswer: '~1,79,200 kg / Week (~179.2 Tonnes/Week | ~25.6 Tonnes/Day)',
    acceptableRange: { min: 80000, max: 250000, unit: 'kg/week', display: '80 – 250 Tonnes/week' },
    sanityCheck: 'Dividing 25.6 tonnes/day across ~400 North Campus PGs equals ~64 kg/day per PG (~0.9 kg/student/day across kitchen food scraps, packaging, paper, and room bins) — equivalent to ~5–6 standard municipal compactor trucks/day!',
    interviewerTrap: 'Including day scholars and official university hostels (which aren’t PG accommodations) OR forgetting food/kitchen mess waste (~50% of PG waste weight)!',
    variations: [
      { question: 'How many garbage collection trucks (5-tonne capacity each) are needed weekly?', hint: '179.2 tonnes ÷ 5 tonnes ≈ ~36 truckloads per week (~5 trucks/day)!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'North Campus Colleges × Students × PG % × Local % × (5 Weekday + 2 Weekend Per-Student kg)', correct: true, feedback: 'Spot on! Housing segmentation + itemized waste weight per day gives crisp accuracy.' },
        { label: 'Delhi Total Waste ÷ 20', correct: false, feedback: 'City-wide municipal waste includes industrial, construction, and family households.' },
        { label: 'PG Buildings × 10 Bins', correct: false, feedback: 'Without PG occupancy & weight/student, bin count is an unanchored guess.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'studentsK', label: 'North Campus Students (K)', defaultVal: 52, min: 30, max: 70, step: 4, unit: 'K' },
        { key: 'pgLocalPct', label: '% Living in Local PGs', defaultVal: 54, min: 30, max: 70, step: 4, unit: '%' },
        { key: 'wdKg', label: 'Weekday Waste / Student (kg)', defaultVal: 1.0, min: 0.5, max: 1.5, step: 0.1, unit: 'kg' },
        { key: 'weKg', label: 'Weekend Waste / Student (kg)', defaultVal: 0.7, min: 0.3, max: 1.2, step: 0.1, unit: 'kg' }
      ],
      computeFormulaText: 'Students × Local PG% × (5 × Weekday kg + 2 × Weekend kg)',
      compute: (v) => {
        const pgStu = v.studentsK * 1000 * (v.pgLocalPct / 100);
        const totalKg = pgStu * (5 * v.wdKg + 2 * v.weKg);
        return {
          value: Math.round(totalKg),
          formatted: `${Math.round(totalKg).toLocaleString('en-IN')} kg/Week`,
          breakdown: [
            { label: 'North Campus PG Students', val: `${Math.round(pgStu).toLocaleString('en-IN')}` },
            { label: 'Daily Tonnage', val: `${(totalKg / 7000).toFixed(1)} Tonnes/day` }
          ]
        };
      }
    }
  },
  // 34
  {
    id: 'cb-sneaker-reselling-india',
    title: 'Annual Market Size of Sneaker Reselling in India',
    prompt: 'Estimate the annual market value (₹) of the limited-edition / collector sneaker reselling market in India.',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['D2C & Resale', 'Footwear', 'Luxury / Streetwear', 'Sanity Check'],
    clarifyingQuestions: [
      { q: 'Strictly secondary/collector resale market (StockX/Crepdog Crew/resellers), excluding new retail MRP sales?', a: 'Yes, strictly secondary resale GMV of sneakers in India.', why: 'Only a tiny niche of hyped sneaker purchases ever enter secondary resale!' },
      { q: 'Should we verify our unconstrained demand funnel against realistic Indian discretionary affordability?', a: 'Yes! Present the income funnel AND a critical sanity check vs real Indian sneaker resale volume (~₹500–₹2,500 Cr vs naive unconstrained totals).', why: 'Demonstrates high consulting maturity on luxury niche sizing!' }
    ],
    strategyOverview: 'Income Funnel + Secondary Resale Sanity Check! India Pop = 1.4B split into High (10% = 140M), Mid (50% = 700M), Low (40% = 560M). Baseline Funnel: Enthusiasts (40%/20%/2% → 56M/140M/11.2M) × Pairs/Yr (3/2/1 → 459M pairs) × Resale % (20%/10%/5% = 62.16M pairs resold!) × Resale Prices (₹15K/₹10K/₹5K) = ₹78,680 Cr! WAIT — Critical Sanity Check: 62M resold hyped sneakers in India would imply every urban household trades collector Jordans! Realistically, hyped sneakerheads (<1–2% of urban Tier-1 affluent youth ≈ ~500K–1M buyers × ~20% resale × ₹15K–20K) ≈ ~₹500–₹2,500 Crore/yr! Show BOTH baseline logic AND the realistic sanity-adjusted estimate.',
    formula: 'Resale GMV = ∑ (Segment Pop × Sneaker Enthusiast % × Annual Pairs × Resale Rate % × Resale Price)',
    assumptions: [
      { label: 'Unadjusted Baseline: High 140M (40%×3×20%×₹15K = ₹504B) + Mid 700M (20%×2×10%×₹10K = ₹280B) + Low (₹2.8B) = ₹786.8B', rationale: 'Wait: 459M pairs bought by "enthusiasts" exceeds India’s ENTIRE organized sneaker market!' },
      { label: 'Sanity-Adjusted Urban Youth Model: 150M Urban Gen-Z/Millennials × 20% affluent × 5% hyped sneakerheads = 1.5M buyers', rationale: 'Hyped ₹10K+ limited drops target top ~1–2% urban youth predominantly.' },
      { label: '1.5M buyers × 2 pairs/yr × 25% resale × ₹16,000 avg resale price ≈ ~₹1,200 Crore/year realistically!', rationale: 'Compare ₹1,200 Cr (~₹12B) vs India’s ~₹60,000 Cr total footwear market (~2% collector resale niche).' }
    ],
    tree: {
      label: 'India Sneaker Resale Sizing (Sanity-Checked)',
      valueText: 'Real: ~₹1,200 Cr | Raw: ₹78,680 Cr',
      children: [
        { label: 'Realistic Core: Urban Affluent Youth (150M × 20% × 5% = 1.5M)', valueText: '1.5M Sneakerheads', highlight: true },
        { label: '× 2 Pairs/Yr × 25% Enter Resale × ₹16,000 Resale Price', valueText: '~₹1,200 Crore / Year', highlight: true },
        { label: 'Unadjusted All-India Baseline (207M enthusiasts)', valueText: '₹78,680 Cr (Too High)', muted: true }
      ]
    },
    finalAnswer: '~₹1,000 – ₹2,500 Crore/Year Realistically (Naive Baseline: ₹78,680 Cr)',
    acceptableRange: { min: 500, max: 80000, unit: '₹ Crore/year', display: '₹500 Cr – ₹3,000 Cr (or up to ₹78K Cr unadjusted)' },
    sanityCheck: 'India’s ENTIRE organized footwear market across all brands (Nike, Adidas, Puma, Campus, Bata) is ~₹60,000–70,000 Crore/year. An unadjusted ₹78,680 Crore RESALE-only figure would exceed all primary footwear sales in India! Catching this via sanity check is interview gold.',
    interviewerTrap: 'Blindly reporting `40% of 140M Indians = 56M high-income sneakerheads reselling 33.6M pairs @ ₹15K = ₹50,400 Cr` without checking against India’s total sneaker/footwear GDP!',
    variations: [
      { question: 'What annual commission revenue does a consignment platform (12% take-rate) earn on ₹1,200 Cr GMV?', hint: '₹1,200 Cr × 12% take-rate = ~₹144 Crore/year platform revenue!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Target Urban Affluent Youth × Collector Adoption % × Pairs/Yr × Resale Share % × Avg Resale Ticket', correct: true, feedback: 'Spot on! Tight target definition + sanity check vs total footwear market prevents 50x bloat.' },
        { label: '1.4B × 10% × ₹10,000', correct: false, feedback: 'Wildly overestimates sneaker collector penetration across rural and older demographics.' },
        { label: 'Shoe Stores × 100', correct: false, feedback: 'Collector reselling happens overwhelmingly on Instagram, StockX, & niche D2C boutiques.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'urbanYouthM', label: 'Urban Youth Pool (M)', defaultVal: 150, min: 80, max: 250, step: 10, unit: 'M' },
        { key: 'collectorPct', label: 'Hyped Collector Share %', defaultVal: 1.0, min: 0.5, max: 5.0, step: 0.5, unit: '%' },
        { key: 'resalePairsYr', label: 'Resold Pairs / Collector / Yr', defaultVal: 0.5, min: 0.25, max: 2.0, step: 0.25, unit: 'pairs' },
        { key: 'avgPriceK', label: 'Avg Resale Price (₹K)', defaultVal: 16, min: 8, max: 25, step: 2, unit: '₹K' }
      ],
      computeFormulaText: 'Urban Youth × Collector% × Resold Pairs/Yr × Avg Resale Price',
      compute: (v) => {
        const pairsM = v.urbanYouthM * (v.collectorPct / 100) * v.resalePairsYr;
        const revCr = (pairsM * 1e6 * v.avgPriceK * 1000) / 1e7;
        return {
          value: Math.round(revCr),
          formatted: `₹${Math.round(revCr).toLocaleString('en-IN')} Crore/Yr`,
          breakdown: [
            { label: 'Annual Pairs Resold', val: `${(pairsM * 10).toFixed(1)} Lakh pairs` },
            { label: 'Collector Base', val: `${(v.urbanYouthM * v.collectorPct / 100).toFixed(2)} M` }
          ]
        };
      }
    }
  },
  // 35
  {
    id: 'cb-blinkit-deliveries-delhi',
    title: 'Weekly Blinkit Quick-Commerce Deliveries in Delhi',
    prompt: 'Estimate the total number of Blinkit orders delivered across Delhi in a single week (including both households and commercial kitchens/restaurants).',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Quick Commerce', 'Blinkit', 'Delhi', 'B2C + B2B'],
    clarifyingQuestions: [
      { q: 'Cover household grocery orders PLUS B2B restaurant emergency restocking?', a: 'Yes, include both Households (B2C) and Small Restaurants/Cafes (B2B).', why: 'Notice ~20% of local eateries also use quick-commerce for urgent dairy/produce runs!' },
      { q: 'Should we count a normal full working week?', a: 'Yes, regular non-holiday 7-day week.', why: 'Standard baseline weekly order volume.' }
    ],
    strategyOverview: 'Dual B2C Household + B2B Restaurant Funnel! B2C (Households): Delhi Pop = 33M ÷ 4 ≈ 8.0–8.25M households × 15% Blinkit adoption = ~1.2M ordering households. Split Frequency: Casual (50% = 0.6M × 1 order/wk = 0.6M) + Frequent (50% = 0.6M × 3 orders/wk = 1.8M) = 2.4M B2C orders/week! B2B (Restaurants): ~100K eateries/cafes × 20% use Blinkit = 20,000 eateries × 5 orders/wk = 0.1M (100K) B2B orders/week → Total = 2.5 Million Deliveries/Week (~3.57 Lakh/day)!',
    formula: 'Weekly Deliveries = [HH × Blinkit% × (Casual%×1 + Freq%×3)] + (Restaurants × Usage% × Orders/Wk)',
    assumptions: [
      { label: 'Delhi Households (~8.0M–8.25M) × 15% Blinkit penetration = ~1.2M active weekly/monthly households', rationale: 'Quick commerce concentrates in dense urban neighborhoods with 10-min dark-store coverage.' },
      { label: 'B2C Frequency: 50% Casual (1/wk = 0.6M) + 50% Frequent (3/wk = 1.8M) = 2.4M orders/week', rationale: 'Averages 2.0 orders/week across adopting households.' },
      { label: 'B2B Restaurants (1L × 20% = 20K × 5/wk = 0.1M) → Total = 2.5M/week (~3.57L orders/day)', rationale: 'Dark-store cross-check: ~250–300 NCR dark stores × ~1,200–1,400 orders/store/day ≈ ~3.5L/day!' }
    ],
    tree: {
      label: 'Delhi Blinkit Orders (~3.57 Lakh / Day)',
      valueText: '2.5M Deliveries/Week',
      children: [
        {
          label: 'Households (8M × 15% = 1.2M Active)',
          valueText: '2.4M Orders/Wk',
          highlight: true,
          children: [
            { label: 'Casual (0.6M × 1/wk = 0.6M) + Frequent (0.6M × 3/wk = 1.8M)', valueText: '2.4M/wk' }
          ]
        },
        { label: 'Restaurants & Cafes (100K × 20% × 5/wk)', valueText: '0.1M Orders/Wk' }
      ]
    },
    finalAnswer: '~2.5 Million Deliveries / Week (~3.57 Lakh/Day)',
    acceptableRange: { min: 1.5, max: 4.5, unit: 'Million orders/week', display: '1.5M – 4.5M orders/week' },
    sanityCheck: 'Dark-store supply cross-check: Blinkit operates ~250–300 dark stores across Delhi NCR. 2.5M/week ÷ 7 = ~3.57 Lakh orders/day ÷ ~270 dark stores ≈ ~1,320 orders/dark store/day — matching Blinkit’s public quarterly disclosures (~1,200–1,400 orders/day/mature store)!',
    interviewerTrap: 'Assuming 15% of 8M households are DAILY buyers (forgetting to check weekly frequency) OR ignoring dark-store supply sanity check.',
    variations: [
      { question: 'Estimate Blinkit’s weekly Gross Order Value (GOV) in Delhi at ₹620 Average Order Value.', hint: '2.5M × ₹620 = ₹155 Crore/week (~₹8,000+ Cr annualized run-rate in Delhi NCR alone!).' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'City Households × App Penetration % × Frequency Mix + Commercial Eateries, sanity-checked via Dark Stores', correct: true, feedback: 'Textbook! Demand funnel triangulated against dark-store daily throughput is peak PM rigor.' },
        { label: 'Delivery Riders × 50', correct: false, feedback: 'Needs rider count anchor first (which derives from orders!).' },
        { label: '33M × 1 Order/Week', correct: false, feedback: 'Conflates individuals with ordering households and ignores non-adopters.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'hhM', label: 'Delhi Households (M)', defaultVal: 8.0, min: 6.0, max: 10.0, step: 0.5, unit: 'M' },
        { key: 'penPct', label: 'Blinkit Penetration %', defaultVal: 15, min: 10, max: 30, step: 2.5, unit: '%' },
        { key: 'avgOrdersWk', label: 'Avg Orders / HH / Week', defaultVal: 2.0, min: 1.0, max: 3.5, step: 0.25, unit: '/wk' },
        { key: 'b2bM', label: 'B2B Restaurant Orders (M/wk)', defaultVal: 0.1, min: 0.05, max: 0.3, step: 0.05, unit: 'M' }
      ],
      computeFormulaText: '(HH × Pen% × Avg Orders/Wk) + B2B Orders',
      compute: (v) => {
        const totalM = v.hhM * (v.penPct / 100) * v.avgOrdersWk + v.b2bM;
        return {
          value: totalM,
          formatted: `${totalM.toFixed(2)}M Orders/Week`,
          breakdown: [
            { label: 'Daily Orders', val: `${((totalM * 10) / 7).toFixed(2)} Lakh/day` },
            { label: 'Per Dark Store (270 stores)', val: `${Math.round((totalM * 1e6) / (7 * 270))}/day` }
          ]
        };
      }
    }
  },
  // 36
  {
    id: 'cb-buses-tier2-city',
    title: 'Public & School Buses Required in a Tier-2 City on a Typical Day',
    prompt: 'Estimate the total number of operational buses required on a typical weekday in Guwahati (or an equivalent 1.4M population Tier-2 Indian city).',
    difficulty: 4,
    archetype: 'Supply & Capacity',
    approachType: 'Hybrid (Demand + Supply)',
    templateId: 'tpl-bottleneck',
    tags: ['Public Transit', 'Peak Bottleneck', 'Tier-2 City', 'Demand vs Supply'],
    clarifyingQuestions: [
      { q: 'Should we count both school buses (children 0–20) AND city public commuter buses (adults 21–60)?', a: 'Yes, include school buses and municipal/private city commuter buses.', why: 'School buses peak exclusively during 7–9 AM & 2–4 PM while commuter buses run 9 AM–9 PM.' },
      { q: 'Size fleet size based on total daily passenger-trips OR peak simultaneous 30-min intervals?', a: 'Use peak-hour/30-min simultaneous passenger load ÷ (Bus Seat Capacity × Occupancy Rate %)!', why: 'Peak demand dictates physical fleet size (off-peak buses sit idle at depots).' }
    ],
    strategyOverview: 'Age + Income Mode-Share Funnel → 30-Min Peak Capacity Bottleneck! Start with City Pop (1.4M): Youth 0–20 (30% = 0.42M → ~0.13M school/college bus riders) + Working 21–60 (60% = 0.84M: Men 0.42M & Women 0.42M split 20% Low / 70% Mid / 10% High) + 60+ (10%). Apply Adult Bus Mode Share by Class: Low (5%–25%), Mid (40%), High (negligible) → ~0.18M daily adult bus commuters + ~0.13M student trips! Over 12 active hours (24 × 30-min intervals), average simultaneous load = 0.18M ÷ 24 = 7,500 adult commuters per 30-min block (or ~2x at rush hour!) ÷ (45 seats × 70–80% occ) ≈ ~240–380 commuter buses + school fleet (note: watch out for decimal bugs like `0.18M / 24 / 31.5 = 238`, NOT `3,800`!).',
    formula: 'Buses Required = (Peak Simultaneous Passengers per Interval) ÷ (Seats per Bus × Occupancy %)',
    assumptions: [
      { label: 'City Pop 1.4M → Daily Bus Commuters: ~0.13M Students + ~0.18M–0.32M Adult Commuters', rationale: 'Lower/Middle-income segments depend heavily on public & shared transit.' },
      { label: 'Uniform 12-Hr Window (24 × 30-min blocks): 0.18M ÷ 24 = 7,500 pax/interval (Peak Rush 2.5x = ~18,750 pax/interval)', rationale: 'Always check peak multiplier: uniform average understates 9 AM rush hour by 2x–3x!' },
      { label: 'At 45 seats × 80% occupancy (~36 pax/bus): 7,500 ÷ 36 = ~208 buses uniform (or ~520 buses peak + school + 15% spare = ~900–1,200 fleet)', rationale: 'Decimal check: 0.18M ÷ 24 ÷ 31.5 = 238 (and with school buses ~800–1,500 total vs unadjusted 3,800!).' }
    ],
    tree: {
      label: 'Tier-2 City Pop (1.4M)',
      valueText: '~0.31M Daily Bus Riders',
      children: [
        { label: 'Youth 0–20 (420K → ~130K Student Riders)', valueText: '~500–700 School Buses' },
        { label: 'Adults 21–60 (840K → ~180K–320K Commuter Riders)', valueText: '7,500–18,750 Pax / 30-min' },
        { label: '÷ 36 Effective Seats/Bus (45 × 80%) + 15% Spare Fleet', valueText: '~600 – 1,200 Total Buses', highlight: true }
      ]
    },
    finalAnswer: '~600 – 1,200 Operational Buses (~240–550 City Transit + School Fleet)',
    acceptableRange: { min: 250, max: 2000, unit: 'Buses', display: '250 – 2,000 buses (vs decimal slip 3,800)' },
    sanityCheck: 'A ~1.4M–1.5M Indian Tier-2 city (like Guwahati or Kochi) actually operates ~400–600 ASTC/city stage-carriage buses + ~400–600 school/private buses (~900–1,200 total!). Notice dividing `0.18M ÷ 24 ÷ 31.5 = 238` vs mistakenly writing `3,800` — catching a 10x decimal slip via real-world sanity checks separates top candidates!',
    interviewerTrap: 'Making a `0.0038M` vs `3,800` decimal/rounding error OR using uniform flat demand over 12 hours instead of factoring a ~2.5x morning/evening peak-hour surge.',
    variations: [
      { question: 'How many extra buses are needed if a 25% fleet spare ratio is maintained for maintenance?', hint: 'Active peak ~800 buses × 1.25 = 1,000 total fleet buses in depots.' }
    ],
    guidedPractice: {
      correctApproach: 'Hybrid (Demand + Supply)',
      funnelOptions: [
        { label: 'Pop → Age & Income Mode Split → Peak Interval Simultaneous Riders ÷ (Bus Seats × Occupancy %) + Spare %', correct: true, feedback: 'Spot on! Peak simultaneous occupancy is what strictly governs fleet size.' },
        { label: 'Total Daily Riders ÷ 45', correct: false, feedback: 'Each bus runs 6–10 trips across the day; dividing daily riders by 45 assumes 1 trip/day!' },
        { label: 'City Area ÷ Bus Length', correct: false, feedback: 'Fleet sizing depends on commuter demand and bus capacity, not road length.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'ridersK', label: 'Daily City Bus Riders (K)', defaultVal: 240, min: 120, max: 450, step: 20, unit: 'K' },
        { key: 'peakSharePct', label: 'Peak-Hour Load % of Daily', defaultVal: 18, min: 10, max: 28, step: 2, unit: '%' },
        { key: 'effCap', label: 'Effective Pax / Bus (45×occ)', defaultVal: 36, min: 25, max: 50, step: 2, unit: 'pax' },
        { key: 'sparePct', label: 'Maintenance Spare %', defaultVal: 15, min: 10, max: 25, step: 5, unit: '%' }
      ],
      computeFormulaText: '[(Daily Riders × Peak-Hr Share%) ÷ Effective Cap] × (1 + Spare%)',
      compute: (v) => {
        const peakPax = v.ridersK * 1000 * (v.peakSharePct / 100);
        const activeBuses = peakPax / v.effCap;
        const totalFleet = Math.ceil(activeBuses * (1 + v.sparePct / 100));
        return {
          value: totalFleet,
          formatted: `${totalFleet.toLocaleString('en-IN')} Buses`,
          breakdown: [
            { label: 'Peak-Hour Riders', val: `${Math.round(peakPax).toLocaleString('en-IN')}` },
            { label: 'Active Peak Buses', val: `${Math.ceil(activeBuses)}` }
          ]
        };
      }
    }
  },
  // 37
  {
    id: 'cb-kaziranga-tourists',
    title: 'Annual Tourists Visiting Kaziranga National Park',
    prompt: 'Estimate the total number of safari tourists visiting Kaziranga National Park in a year.',
    difficulty: 2,
    archetype: 'Supply & Capacity',
    approachType: 'Bottom-Up (Supply-Side)',
    templateId: 'tpl-bottleneck',
    tags: ['Tourism', 'National Park', 'Supply Bottleneck', 'Assam'],
    clarifyingQuestions: [
      { q: 'Is Kaziranga open year-round, or closed during the monsoon season?', a: 'Closed during Assam monsoon months; safaris operate ~6 months (~180 days, Nov–Apr).', why: 'Ignoring the 6-month monsoon closure doubles the answer inaccurately!' },
      { q: 'Should we anchor via official Safari Fleet Capacity (Jeep + Elephant safaris) since park entry permits are strictly capped?', a: 'Yes! Supply capacity across registered safari jeeps and elephants cleanly caps visitor throughput.', why: 'Protected wildlife parks are strictly supply-constrained by licensed vehicle permits.' }
    ],
    strategyOverview: 'Park Permit Supply Bottleneck! Active Season = 6 Months × 30 Days = 180 Safari Days (closed May–Oct monsoon). Segment Safari Formats: 1. Jeep Safari: ~200 registered jeeps × 2 shifts/day (morning & afternoon) × 6 tourists/jeep = 2,400 daily seats. 2. Elephant Safari: ~25 elephants × 1 morning shift/day × 2 tourists/elephant = 50 daily seats → Total Daily Permit Capacity = 2,450 visitors/day! Apply Average Season Occupancy (~70% blending sold-out Dec–Feb weekends with shoulder weekdays) × 180 Days = 2,450 × 0.70 × 180 = ~3,08,700 (~300K Tourists/Year)!',
    formula: 'Annual Tourists = [(Jeeps × Trips × Seats) + (Elephants × Trips × Seats)] × Avg Season Occupancy % × Operating Days',
    assumptions: [
      { label: 'Operating Season = ~6 months (~180 days/year, Nov–April)', rationale: 'Brahmaputra flooding closes the park every monsoon.' },
      { label: 'Daily Safari Supply: 200 Jeeps × 2 trips × 6 pax (2,400) + 25 Elephants × 1 × 2 (50) = 2,450 capacity/day', rationale: 'Notice Elephant rides are <2% of capacity — Jeep capacity drives the estimate!' },
      { label: '70% Avg Seasonal Occupancy × 180 Days = ~3,08,700 (~3.0 Lakh Tourists/Year)', rationale: 'Matches Assam Forest Dept official footfall (~2.8–3.3 Lakh annual visitors)!' }
    ],
    tree: {
      label: 'Kaziranga Safari Supply (180 Days / Year)',
      valueText: '~2,450 Max/Day',
      children: [
        { label: 'Jeep Safari (200 jeeps × 2 trips/day × 6 seats)', valueText: '2,400/day', highlight: true },
        { label: 'Elephant Safari (25 elephants × 1 trip × 2 seats)', valueText: '50/day' },
        { label: '2,450 Capacity × 70% Season Occupancy × 180 Days', valueText: '~3.09 Lakh Tourists/Yr', highlight: true }
      ]
    },
    finalAnswer: '~3.0 – 3.1 Lakh Tourists / Year',
    acceptableRange: { min: 180000, max: 450000, unit: 'Tourists/year', display: '1.8 Lakh – 4.5 Lakh tourists/yr' },
    sanityCheck: 'Official Assam Tourism records show Kaziranga receives ~2.8–3.3 Lakh visitors per season! Also check Jeep unit economics: ~1,500 jeep trips × 180 × 70% ÷ 200 jeeps ≈ ~250 trips/jeep/season (~₹7.5 Lakh/jeep revenue).',
    interviewerTrap: 'Assuming 365 open days/year (forgetting monsoon flood closures!) OR trying a noisy India-population top-down percentage instead of the crisp vehicle-permit supply bottleneck.',
    variations: [
      { question: 'Estimate annual safari ticket & vehicle entry revenue if average combined cost is ₹800/tourist.', hint: '3.09 Lakh × ₹800 ≈ ~₹24.7 Crore/season!' }
    ],
    guidedPractice: {
      correctApproach: 'Bottom-Up (Supply-Side)',
      funnelOptions: [
        { label: 'Jeep + Elephant Safari Fleet × Trips/Day × Tourists/Ride × Season Occupancy % × Operating Days (Monsoon-Adjusted)', correct: true, feedback: 'Spot on! Strictly regulated wildlife parks are cleanest when sized from vehicle-permit capacity.' },
        { label: 'India Population × 0.1%', correct: false, feedback: 'Ignores geographic concentration and strict daily safari permit caps.' },
        { label: 'Rhino Population × 100', correct: false, feedback: 'Unrelated proxy.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'jeeps', label: 'Registered Safari Jeeps', defaultVal: 200, min: 100, max: 350, step: 25, unit: 'jeeps' },
        { key: 'days', label: 'Open Safari Days / Yr', defaultVal: 180, min: 150, max: 210, step: 10, unit: 'days' },
        { key: 'occPct', label: 'Season Occupancy %', defaultVal: 70, min: 50, max: 90, step: 5, unit: '%' }
      ],
      computeFormulaText: '[(Jeeps × 2 × 6) + 50 Elephant Seats] × Occupancy% × Open Days',
      compute: (v) => {
        const dailyCap = v.jeeps * 2 * 6 + 50;
        const total = dailyCap * (v.occPct / 100) * v.days;
        return {
          value: Math.round(total),
          formatted: `${(total / 1e5).toFixed(2)} Lakh Tourists/Yr`,
          breakdown: [
            { label: 'Daily Max Capacity', val: `${dailyCap.toLocaleString('en-IN')} pax/day` },
            { label: 'Avg Daily Visitors', val: `${Math.round(dailyCap * v.occPct / 100).toLocaleString('en-IN')}/day` }
          ]
        };
      }
    }
  },
  // 38
  {
    id: 'cb-netflix-data-india',
    title: 'Daily Internet Data Consumed by Netflix in India',
    prompt: 'Estimate the total volume of internet bandwidth/data (in GB / Petabytes) consumed daily by Netflix streaming across India.',
    difficulty: 3,
    archetype: 'Usage & Behavioral',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['OTT Streaming', 'Telecom Bandwidth', 'Video Quality', 'India'],
    clarifyingQuestions: [
      { q: 'Are we estimating combined data consumed across mobile + Wi-Fi/Smart TVs for ALL daily active Netflix viewers (paid + shared accounts)?', a: 'Yes, total daily streaming data across mobile/laptop/TV viewers in India.', why: 'TVs/4K stream ~5 GB/hr vs mobile SD ~0.3 GB/hr — quality mix drives bandwidth heavily!' },
      { q: 'Include small rural broadband adoption alongside urban metro concentration?', a: 'Urban (~30–35%) drives ~85–90% of Netflix base; add a small ~10–15% uplift for rural/semi-urban viewers.', why: 'Keeps calculation urban-anchored without missing Tier-3/rural fiber adopters.' }
    ],
    strategyOverview: 'Subscriber DAU Funnel × Resolution Data Weighting! India Pop (1.5B) → Urban (30% = 450M) → Age 15–60 (70% = 315M) → Urban Income/Netflix Access (~5% = ~15.75M–16M users; + ~10% semi-urban = ~17M) × 60% DAU = ~10M–10.5M Daily Active Watchers! Video Quality Data/Hr Mix: SD Mobile (50% × 0.3 GB/hr = 0.15 GB), HD (40% × 1.0 GB/hr = 0.40 GB), 4K Smart TV (10% × 5.0 GB/hr = 0.50 GB) → Weighted Avg = 1.05 GB/hour! At 2.0 hrs/day/DAU (2.1 GB/day) × ~10M DAU ≈ ~20–22 Million GB/day (~20–22 Petabytes/day; ~5.1M–10M DAU @ 0.5–1 Cr GB = 5–22 PB/day)!',
    formula: 'Daily Data (GB) = Active Daily Watchers × Avg Watch Hours/Day × ∑ (Quality Share % × GB/Hr)',
    assumptions: [
      { label: 'India 1.5B → Urban 15–60 (315M) → ~5% Netflix Access (~16M users, +rural ≈ ~17M) × ~50–60% DAU = ~8.5M–10M DAU', rationale: 'Password sharing & telecom bundles expand active watchers beyond paid accounts (~6–8M).' },
      { label: 'Weighted Bandwidth = 50% SD (0.3 GB/h) + 40% HD (1.0 GB/h) + 10% 4K (5.0 GB/h) = 1.05 GB/hr!', rationale: 'Notice just 10% 4K TV viewers contribute almost HALF (0.50 / 1.05 GB) of total bandwidth!' },
      { label: 'At 1–2 hrs/day: ~5.1M–10.5M viewers × ~1.05–2.1 GB = ~5M–21M GB/day (~5 to 21 Petabytes/day)', rationale: 'Matches ~2–3% of India’s ~300–450 PB/day total internet traffic!' }
    ],
    tree: {
      label: 'India Netflix Daily Viewers (~5.1M – 10M DAU)',
      valueText: '~1.05 GB / Hr Weighted',
      children: [
        { label: 'Quality Mix: 50% SD (0.3 GB) + 40% HD (1.0 GB) + 10% 4K (5.0 GB)', valueText: '1.05 GB/hr avg' },
        { label: 'Avg 1.0 – 2.0 Hours Watched / Active Viewer / Day', valueText: '1.05 – 2.1 GB / User / Day', highlight: true },
        { label: 'Total Daily Netflix India Data Traffic', valueText: '~5.4M – 21M GB/Day (~5–21 PB)', highlight: true }
      ]
    },
    finalAnswer: '~5.4 – 21 Million GB / Day (~5 to 21 Petabytes/Day)',
    acceptableRange: { min: 3, max: 35, unit: 'Petabytes/day', display: '3 PB – 35 PB/day (3M – 35M GB/day)' },
    sanityCheck: 'India’s total fixed + mobile daily internet traffic is ~400–500 Petabytes/day. Netflix accounting for ~1–4% of national daily bytes (~5–20 PB/day, while YouTube/Reels take 60%+) is remarkably grounded!',
    interviewerTrap: 'Using a single flat `1 GB/hr` assumption without showing that **4K (5 GB/hr @ 10% share)** nearly doubles total network load vs mobile SD (`0.3 GB/hr`)!',
    variations: [
      { question: 'If telecom CDNs cache 80% of Netflix titles locally, how much long-haul backbone traffic remains?', hint: '15 PB/day × 20% non-cached long-haul = ~3 Petabytes/day across backbone fiber.' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'Pop → Urban/Age → Netflix Access × DAU % × Avg Watch Hours × Resolution-Weighted GB/Hr (SD/HD/4K)', correct: true, feedback: 'Spot on! Weighting SD, HD, and 4K TV bitrates captures the true network driver.' },
        { label: 'Mobile Towers × 100 GB', correct: false, feedback: 'Misses home Wi-Fi Smart TV 4K streaming, which drives ~50% of bytes.' },
        { label: 'India Internet Users × 10 GB', correct: false, feedback: 'Most Indian internet users watch YouTube/Instagram, not paid Netflix.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'dauM', label: 'Daily Active Viewers (M)', defaultVal: 8.5, min: 3.0, max: 15.0, step: 0.5, unit: 'M' },
        { key: 'hrsDay', label: 'Avg Hours / DAU / Day', defaultVal: 1.5, min: 0.75, max: 3.0, step: 0.25, unit: 'hrs' },
        { key: 'fourKPct', label: '4K Share % (5 GB/hr)', defaultVal: 10, min: 5, max: 25, step: 5, unit: '%' }
      ],
      computeFormulaText: 'DAU × Hours/Day × Weighted GB/Hr (SD 0.3 / HD 1.0 / 4K 5.0)',
      compute: (v) => {
        const hdPct = Math.max(0, 50 - v.fourKPct);
        const gbPerHr = 0.5 * 0.3 + (hdPct / 100) * 1.0 + (v.fourKPct / 100) * 5.0;
        const pb = v.dauM * v.hrsDay * gbPerHr;
        return {
          value: pb,
          formatted: `${pb.toFixed(1)} Petabytes/Day (${pb.toFixed(1)}M GB)`,
          breakdown: [
            { label: 'Blended Bitrate', val: `${gbPerHr.toFixed(2)} GB/hr` },
            { label: 'GB per Active Viewer', val: `${(v.hrsDay * gbPerHr).toFixed(2)} GB/day` }
          ]
        };
      }
    }
  },
  // 39
  {
    id: 'cb-ev-chargers-2030',
    title: 'Public EV Charging Stations Needed in a Tier-2 City by 2030',
    prompt: 'Estimate the number of public EV charging stations a ~15 Lakh population Tier-2 city (like Guwahati) will require by 2030.',
    difficulty: 4,
    archetype: 'Supply & Capacity',
    approachType: 'Hybrid (Demand + Supply)',
    templateId: 'tpl-bottleneck',
    tags: ['EV Infrastructure', '2030 Forecast', 'Charging Capacity', 'Tier-2 City'],
    clarifyingQuestions: [
      { q: 'Which EV vehicle classes drive PUBLIC charging demand vs home wall-socket charging?', a: 'Separate 2W (mostly home-charged: 20% public), Cars (60% public reliance), 3W e-rickshaws (80% public), and Commercial/Buses (100% public).', why: 'Home charging removes ~80% of 2-wheeler demand from public stations!' },
      { q: 'What is the throughput capacity of a single public charging station?', a: 'Assume 1 average public station has ~6 charging points, each handling ~5 sessions/day = 30 sessions/day (+20% peak/downtime spare buffer).', why: 'Converts daily charging sessions cleanly into physical station counts.' }
    ],
    strategyOverview: '2030 Fleet Forecast → Public-Charging Dependence → Charger Throughput + Buffer! Current Pop = 15L @ 3% CAGR → 2030 Pop ≈ 17 Lakh. At 1 vehicle per 2 people = 8.5 Lakh 2030 vehicles: 2W (60% = 5.1L × 30% EV = 1.53L × 20% public = 31K), Cars (30% = 2.55L × 25% EV = 64K × 60% public = 38K), 3W (8% = 68K × 60% EV = 41K × 80% public = 33K), Commercial/Buses (2% = 17K × 50% EV = 9K × 100% public) → ~1.1 Lakh EVs relying on public charging! At 0.5 sessions/EV/day = ~55,000 daily sessions ÷ (6 points × 5 sessions/point = 30 sessions/station) ≈ 1,833 stations + 20% peak/downtime buffer = ~2,200 Public Stations!',
    formula: 'Stations = [(∑ Vehicle EV Base × Public Charge %) × Sessions/EV/Day ÷ (Points × Sessions/Point)] × 1.20 Buffer',
    assumptions: [
      { label: '2030 City Pop = 17L → 8.5L Vehicles: 2W (5.1L), Cars (2.55L), 3W (0.68L), Commercial (0.17L)', rationale: 'Includes 3% annual population/motorization growth through 2030.' },
      { label: '2030 EV Penetration & Public Dependence → 1.11 Lakh public-reliant EVs (~55,000 sessions/day @ 0.5/EV)', rationale: 'Note: ~2.7L total EVs (31% EV across fleet); ~41% depend meaningfully on public chargers.' },
      { label: 'Station Capacity = 6 points × 5 sessions/day = 30 sessions/day → 1,833 net + 20% peak buffer ≈ ~2,200 Stations', rationale: 'Sanity check: 2.7L total EVs ÷ 2,200 stations ≈ ~120 EVs per public station (~30–50 public-reliant EVs/station).' }
    ],
    tree: {
      label: '2030 Tier-2 Vehicle Base (17L Pop → 8.5L Vehicles)',
      valueText: '~2.7 Lakh EVs (~1.1L Public)',
      children: [
        { label: '2W (1.53L × 20% pub = 31K) + Cars (64K × 60% = 38K)', valueText: '69K Public EVs' },
        { label: '3W (41K × 80% = 33K) + Buses/CV (9K × 100%)', valueText: '42K Public EVs' },
        {
          label: '1.11L Public EVs × 0.5 Sessions/Day = 55,500 Sessions/Day',
          valueText: '55,500 Sessions/Day',
          highlight: true,
          children: [
            { label: '÷ 30 Sessions/Station (6 pts × 5) + 20% Buffer', valueText: '~2,200 Stations by 2030', highlight: true }
          ]
        }
      ]
    },
    finalAnswer: '~2,200 Public Charging Stations (~120 Total EVs per Station)',
    acceptableRange: { min: 1000, max: 3500, unit: 'Charging stations', display: '1,000 – 3,500 charging stations' },
    sanityCheck: 'Globally in mature EV hubs (Netherlands/China/Norway), public infrastructure runs ~1 public charging POINT per 10–15 EVs (or 1 multi-point hub per ~80–120 EVs). 2,200 stations × 6 points = 13,200 points across 2.7L EVs = ~1 point per 20 EVs — remarkably consistent!',
    interviewerTrap: 'Assuming ALL 2.7 Lakh EVs need public stations daily (ignoring ~80% of 2-wheelers charging overnight at home!) OR forgetting peak-hour queuing/downtime spare capacity (+20%).',
    variations: [
      { question: 'How many stations would be needed if fast-charging hubs (12 points × 10 sessions/day = 120/day) are deployed instead?', hint: '55,500 ÷ 120 × 1.2 ≈ ~555 high-capacity fast hubs!' }
    ],
    guidedPractice: {
      correctApproach: 'Hybrid (Demand + Supply)',
      funnelOptions: [
        { label: '2030 Vehicle Mix × EV % × Public-Charging Dependence % × Sessions/Day ÷ Station Throughput + Peak Buffer', correct: true, feedback: 'Spot on! Home-vs-public reliance by vehicle type is the single biggest driver.' },
        { label: 'Current Petrol Pumps × 1', correct: false, feedback: 'EVs take 20–60 mins per charge (vs 3-min petrol refuel), requiring 5x–10x more charging points.' },
        { label: '2030 Population ÷ 1,000', correct: false, feedback: 'Doesn’t account for EV adoption curve, 2W home charging, or station point counts.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'publicEvK', label: 'Public-Reliant EVs (K)', defaultVal: 111, min: 50, max: 200, step: 10, unit: 'K' },
        { key: 'sessEvDay', label: 'Public Sessions / EV / Day', defaultVal: 0.5, min: 0.2, max: 1.0, step: 0.1, unit: '/day' },
        { key: 'ptsStation', label: 'Points / Charging Station', defaultVal: 6, min: 4, max: 12, step: 2, unit: 'pts' },
        { key: 'sessPerPt', label: 'Sessions / Point / Day', defaultVal: 5, min: 3, max: 10, step: 1, unit: 'sess' }
      ],
      computeFormulaText: '[Public EVs × Sessions/Day ÷ (Points × Sess/Pt)] × 1.20 Buffer',
      compute: (v) => {
        const sess = v.publicEvK * 1000 * v.sessEvDay;
        const cap = v.ptsStation * v.sessPerPt;
        const stations = Math.ceil((sess / cap) * 1.2);
        return {
          value: stations,
          formatted: `${stations.toLocaleString('en-IN')} Stations`,
          breakdown: [
            { label: 'Daily Public Sessions', val: `${Math.round(sess).toLocaleString('en-IN')}` },
            { label: 'Total Charging Points', val: `${(stations * v.ptsStation).toLocaleString('en-IN')}` }
          ]
        };
      }
    }
  },
  // 40
  {
    id: 'cb-atm-cash-withdrawn',
    title: 'Daily Cash Withdrawn from ATMs in a Tier-2 City',
    prompt: 'Estimate the total cash (in ₹ Crore) withdrawn from all ATMs in a 15-Lakh population Tier-2 city (like Guwahati) on a normal weekday.',
    difficulty: 2,
    archetype: 'Market Sizing',
    approachType: 'Top-Down (Demand-Side)',
    templateId: 'tpl-fmcg',
    tags: ['Banking & Cash', 'UPI Substitution', 'Tier-2 City', 'Weekday Txns'],
    clarifyingQuestions: [
      { q: 'Strictly cash WITHDRAWALS across all bank ATMs on a normal non-salary, non-holiday weekday?', a: 'Yes, total cash dispensed across all banks’ ATMs on a typical weekday (ignore cash deposits).', why: 'Salary-credit days (1st–5th) & festival weekends spike 1.5x–2x.' },
      { q: 'How does UPI/digital adoption affect ATM frequency today?', a: 'Most adults still have bank accounts (90%), ~70% use ATMs occasionally, averaging ~2 withdrawals/month (vs ~5/month pre-UPI).', why: 'Reflects modern UPI cash displacement accurately!' }
    ],
    strategyOverview: 'Banked Adult Funnel × Withdrawal Frequency! Start with City Pop (15 Lakh) → Adults 18+ (70% = 10.5 Lakh) → Banked Adults (90% = 9.45 Lakh) → Active ATM Users (70% = ~6.6 Lakh users). Monthly Volume: 6.6L users × 2 withdrawals/month = 13.2 Lakh monthly withdrawals. Convert to Weekday Average: ~22 weekday equivalents (or ~30 days scaled) → 13.2L ÷ 22 weekdays = ~60,000 weekday withdrawals! Multiply by Avg Ticket Size (₹4,000) = ~₹24 Crore/Weekday (or ~13.2L ÷ 30 = 44K/day × ₹4K = ~₹17.6 Cr/day)!',
    formula: 'Weekday Cash (₹) = (Pop × 18+% × Banked% × ATM User% × Withdrawals/Mo ÷ 22 Weekday Equiv) × Avg Withdrawal (₹)',
    assumptions: [
      { label: 'City 15L → 18+ Adults (70% = 10.5L) → Banked (90% = 9.45L) → ATM Users (70% ≈ 6.6L)', rationale: 'Small merchants, informal workers, & rent/cash expenses keep ATM active base ~70%.' },
      { label: 'Frequency = 2 withdrawals/month = 13.2L monthly txns ÷ 22 weekday weights ≈ 60,000 weekday txns', rationale: 'Wait: ATMs run 30 days/mo (~44K/day uniform, or ~50–60K on active weekdays when businesses settle cash!).' },
      { label: '60,000 × ₹4,000 Avg Withdrawal = ₹24 Crore/Weekday (sensitive to ₹3,000 → ₹18 Cr)', rationale: 'ATM Supply Sanity Check: ~600–800 city ATMs × ~75–100 txns/ATM/day = 60,000 txns!' }
    ],
    tree: {
      label: 'Tier-2 City Pop (15 Lakh)',
      valueText: '15.0 Lakh Pop',
      children: [
        { label: 'Adults 18+ (70% = 10.5L) × 90% Banked × 70% Use ATMs', valueText: '6.6 Lakh ATM Users' },
        { label: '× 2/Mo = 13.2L Monthly Txns → Weekday Equiv (÷ 22)', valueText: '~60,000 Txns/Weekday', highlight: true },
        { label: '× ₹4,000 Avg Cash Per Withdrawal', valueText: '₹24 Crore / Weekday', highlight: true }
      ]
    },
    finalAnswer: '~₹18 – ₹24 Crore / Weekday (~44,000 – 60,000 Withdrawals)',
    acceptableRange: { min: 10, max: 35, unit: '₹ Crore/weekday', display: '₹10 Cr – ₹35 Cr/weekday' },
    sanityCheck: 'RBI ATM statistics show India averages ~80–100 transactions/ATM/day at ~₹4,000–₹4,800 per withdrawal! Across ~600–750 ATMs in a 15-Lakh Tier-2 city, 60,000 txns = ~85 txns/ATM (~₹3.4 Lakh cash loaded/dispensed/ATM/day)!',
    interviewerTrap: 'Confusing unique ATM USERS (6.6L) with TRANSACTIONS (13.2L/month) OR ignoring how UPI shifted average withdrawals down from 4–5/month to ~2/month!',
    variations: [
      { question: 'How much physical cash replenisher vans (₹50L capacity per van route) are needed daily?', hint: '₹24 Crore ÷ ₹50 Lakh/van-day (or ₹2 Cr/van) ≈ ~12–15 armored cash-in-transit routes!' }
    ],
    guidedPractice: {
      correctApproach: 'Top-Down (Demand-Side)',
      funnelOptions: [
        { label: 'City Pop → 18+ Adults → Banked % → ATM User % × Monthly Withdrawals ÷ Day Factor × Avg Ticket ₹', correct: true, feedback: 'Spot on! Separating ATM users from monthly transaction frequency + checking txns/ATM works cleanly.' },
        { label: 'City GDP ÷ 365', correct: false, feedback: 'GDP is overwhelmingly digital/B2B bank transfers rather than physical ATM cash.' },
        { label: 'Bank Branches × ₹1 Crore', correct: false, feedback: 'Overcounts branch vault cash & corporate accounts vs retail ATM disbursements.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'popL', label: 'City Population (Lakh)', defaultVal: 15, min: 10, max: 30, step: 2, unit: 'L' },
        { key: 'atmUserPct', label: 'ATM Users % of Pop', defaultVal: 44, min: 25, max: 60, step: 2, unit: '%' },
        { key: 'txnsMo', label: 'Withdrawals / User / Mo', defaultVal: 2.0, min: 1.0, max: 4.0, step: 0.5, unit: '/mo' },
        { key: 'avgCash', label: 'Avg Withdrawal (₹)', defaultVal: 4000, min: 2000, max: 6000, step: 500, unit: '₹' }
      ],
      computeFormulaText: '(Pop × ATM User% × Txns/Mo ÷ 22) × Avg Withdrawal ₹',
      compute: (v) => {
        const txnsDay = (v.popL * 1e5 * (v.atmUserPct / 100) * v.txnsMo) / 22;
        const crDay = (txnsDay * v.avgCash) / 1e7;
        return {
          value: crDay,
          formatted: `₹${crDay.toFixed(1)} Crore/Weekday`,
          breakdown: [
            { label: 'Weekday Withdrawals', val: `${Math.round(txnsDay).toLocaleString('en-IN')} txns` },
            { label: 'Txns/ATM (~700 ATMs)', val: `${Math.round(txnsDay / 700)} txns/ATM` }
          ]
        };
      }
    }
  },
  // 41
  {
    id: 'cb-campus-bricks',
    title: 'Total Number of Bricks Used Across a 700-Acre University Campus',
    prompt: 'Estimate the total number of bricks used in constructing all permanent buildings across a 700-acre residential university campus.',
    difficulty: 4,
    archetype: 'Volume & Geometry',
    approachType: 'Geometry & Proxy',
    templateId: 'tpl-geometry',
    tags: ['Architecture', '3D Volume Geometry', 'Campus Infrastructure', 'Unit Conversion'],
    clarifyingQuestions: [
      { q: 'Count structural/partition walls of permanent buildings (academic blocks, hostels, faculty housing), excluding roads & boundary walls?', a: 'Yes: academic, hostel, and housing buildings only; exclude roads, drains, and perimeter walls.', why: 'Keeps the geometry anchored cleanly to built-up floor area.' },
      { q: 'Use standard Indian brick dimensions and mortar allowance?', a: 'Yes: standard 9 × 4.5 × 3 inch brick (~14 bricks per cubic foot of masonry including mortar).', why: 'Civil engineering brick-density constant (~13.5–14 bricks/cu ft) turns wall volume straight into bricks!' }
    ],
    strategyOverview: 'Land Area → Built Floor Volume → Masonry Brick Density! 1. Campus Area = 700 Acres × 43,560 sq ft/acre ≈ ~30.5M sq ft! 2. Building Footprint (~15% ground coverage vs lawns/roads/lakes) = ~4.57M (~4.6M) sq ft × Average Height (3 floors) = ~13.8M sq ft Total Floor Area! 3. Wall-to-Floor Ratio (~40% equivalent wall surface area vs floor area: ~5.5M sq ft of vertical wall area) × 0.5 ft (6-inch) avg wall thickness = ~2.75M cubic feet of brickwork volume! 4. Multiply by ~14 bricks/cu ft (9"×4.5"×3" + mortar) = ~3.85 Crore (~38.5M bricks)!',
    formula: 'Total Bricks = (Acres × 43,560 × Built% × Floors × Wall-to-Floor Ratio × Wall Thickness ft) × 14 Bricks/Cu.Ft',
    assumptions: [
      { label: '700 Acres × 43,560 sq ft/acre = ~30.5M sq ft → 15% ground footprint = ~4.57M sq ft × 3 floors = ~13.7–13.8M sq ft floor area', rationale: 'Large residential campuses keep ~80–85% open green cover, roads, and sports fields.' },
      { label: 'Wall Area ≈ 40% of Total Floor Area (5.52M sq ft) × 0.5 ft (6-inch avg partition/exterior) = 2.76M cu ft brickwork', rationale: 'Notice room perimeter walls + corridors translate reliably to ~0.35–0.45× floor area.' },
      { label: '2.76M cu ft × 14 bricks/cu ft ≈ 3.86 Crore (~38.5M Bricks; ~2.8 bricks per sq ft of floor area)', rationale: 'Note: Modern buildings using RCC columns + AAC blocks use proportionately fewer clay bricks!' }
    ],
    tree: {
      label: 'Campus Area (700 Acres = ~30.5M Sq. Ft.)',
      valueText: '30.5M Sq. Ft.',
      children: [
        { label: '15% Footprint (4.57M) × 3 Avg Floors', valueText: '13.8M Sq. Ft. Floor Area' },
        { label: '40% Wall-to-Floor (5.5M sq ft) × 0.5 ft Thick', valueText: '2.75M Cu. Ft. Wall Volume', highlight: true },
        { label: '× 14 Bricks / Cu. Ft. (incl. mortar)', valueText: '~3.85 Crore (~38.5M) Bricks', highlight: true }
      ]
    },
    finalAnswer: '~3.85 Crore Bricks (~38.5 Million Bricks | ~2.8 Bricks/Sq.Ft Floor Area)',
    acceptableRange: { min: 15, max: 65, unit: 'Million bricks', display: '15M – 65M bricks (1.5 – 6.5 Crore)' },
    sanityCheck: 'Civil engineering thumb-rule: ~2.5 to 4 bricks per sq ft of floor area in framed RCC + brick infill buildings (excluding solid load-bearing pillars). 38.5M ÷ 13.8M sq ft = ~2.79 bricks/sq ft — right inside the civil engineering band!',
    interviewerTrap: 'Converting Acres to Sq. Ft. wrongly (memorize 1 Acre = 43,560 sq ft!) OR treating the entire campus floor area as solid brick blocks instead of walls (~0.5 ft thick around perimeter/rooms).',
    variations: [
      { question: 'How many truckloads (10,000 bricks/truck) were hauled to build the campus?', hint: '3.85 Crore ÷ 10,000 = ~3,850 full truckloads!' }
    ],
    guidedPractice: {
      correctApproach: 'Geometry & Proxy',
      funnelOptions: [
        { label: 'Acres × 43,560 → Footprint % × Floors → Wall Area Ratio × Wall Thickness × Bricks per Cu.Ft', correct: true, feedback: 'Textbook architectural geometry! Floor-to-wall conversion turns an overwhelming campus into crisp steps.' },
        { label: 'Students × 1,000 Bricks', correct: false, feedback: 'Needs structural area/volume anchoring for labs, auditoriums, and hostels.' },
        { label: 'Campus Area × Height', correct: false, feedback: 'Would measure solid air cube of empty buildings rather than brick wall volume!' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'acres', label: 'Campus Size (Acres)', defaultVal: 700, min: 200, max: 1200, step: 50, unit: 'acres' },
        { key: 'builtPct', label: 'Building Footprint %', defaultVal: 15, min: 8, max: 30, step: 1, unit: '%' },
        { key: 'floors', label: 'Avg Building Floors', defaultVal: 3, min: 2, max: 6, step: 1, unit: 'flrs' },
        { key: 'wallRatioPct', label: 'Wall / Floor Area Ratio %', defaultVal: 40, min: 25, max: 60, step: 5, unit: '%' }
      ],
      computeFormulaText: '(Acres × 43,560 × Built% × Floors × Wall Ratio% × 0.5 ft) × 14 Bricks/Cu.Ft',
      compute: (v) => {
        const floorSqFt = v.acres * 43560 * (v.builtPct / 100) * v.floors;
        const wallCuFt = floorSqFt * (v.wallRatioPct / 100) * 0.5;
        const bricksM = (wallCuFt * 14) / 1e6;
        return {
          value: bricksM,
          formatted: `${bricksM.toFixed(1)}M Bricks (${(bricksM / 10).toFixed(2)} Cr)`,
          breakdown: [
            { label: 'Total Built Floor Area', val: `${(floorSqFt / 1e6).toFixed(1)}M sq ft` },
            { label: 'Masonry Volume', val: `${(wallCuFt / 1e6).toFixed(2)}M cu ft` }
          ]
        };
      }
    }
  },
  // 42
  {
    id: 'cb-routers-india',
    title: 'Annual Number of Wi-Fi Routers Sold in India',
    prompt: 'Estimate the total number of Wi-Fi routers (standalone & modem-integrated) sold across residential and commercial users in India in a year.',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Replacement & Stock-Flow',
    templateId: 'tpl-durable',
    tags: ['Telecom & Hardware', 'Broadband', 'Replacement + Growth', 'India'],
    clarifyingQuestions: [
      { q: 'Include both residential home broadband routers and office/commercial routers?', a: 'Yes, cover both Residential households AND Commercial offices (plus both modem-routers and standalone routers).', why: 'Home broadband (~80%) and white-collar commercial offices (~20%) follow completely different user-per-router ratios!' },
      { q: 'Are we estimating post-COVID/current annual sales (including both replacement + new fiber growth)?', a: 'Yes: New Sales = Existing Stock × Growth Rate % + (Existing Stock ÷ 5-Yr Lifespan).', why: 'Missing either new subscriber growth (~10%) OR 5-year replacement undercounts annual shipments.' }
    ],
    strategyOverview: 'Dual Residential + Commercial Stock-Flow Formula! 1. Residential Component: India Pop (1.4B) × 50% internet users (700M) × 20% rely on fixed broadband routers = 140M home router users ÷ 5 users/router = 28M Residential Routers! Apply Stock-Flow (10% annual fiber growth + 1/5 yr replacement): (28M × 10%) + (28M ÷ 5) = 2.8M + 5.6M = 8.4M units/year! 2. Commercial Component: Workforce (~35% = 500M) × 20% white/grey-collar office staff (100M) × 70% router coverage (70M) ÷ 10 staff/router = 7M Office Routers → (7M × 10%) + (7M ÷ 5) = 0.7M + 1.4M = 2.1M (baseline ~1.9M) → Combined = ~10.3–10.5 Million Routers/Year!',
    formula: 'Annual Routers = (Existing Stock × Growth Rate %) + (Existing Stock ÷ 5-Yr Lifespan) [Residential + Commercial]',
    assumptions: [
      { label: 'Residential Base: 1.4B × 50% Net (700M) × 20% Fixed Router (140M) ÷ 5/router = 28M Routers', rationale: 'Matches ~28–40M active Indian wired broadband subscribers!' },
      { label: 'Commercial Base: 500M Workforce × 20% White/Grey Collar (100M) × 70% = 70M ÷ 10/router = 7M Routers', rationale: 'Offices/coworking/shops share higher-capacity enterprise/SMB routers across ~10 employees.' },
      { label: 'Stock-Flow (10% Growth + 20% Replacement [5-yr life] = 30% annual turnover): 28M×0.3 + 7M×0.3 ≈ ~10.3–10.5M/yr', rationale: 'Notice in baseline commercial math, `0.7 + 1.4 = 2.1M` (`8.4 + 2.1 = 10.5M`, baseline wrote 1.9M → ~10.3M)!' }
    ],
    tree: {
      label: 'India Wi-Fi Router Installed Base (35M Stock)',
      valueText: '35M Active Routers',
      children: [
        { label: 'Residential Stock (140M users ÷ 5 = 28M) × (10% + 20%)', valueText: '8.4M Units/Yr', highlight: true },
        { label: 'Commercial Stock (70M staff ÷ 10 = 7M) × (10% + 20%)', valueText: '2.1M Units/Yr' },
        { label: 'Total Annual India Router Sales (New + Replacements)', valueText: '~10.3 – 10.5M / Year', highlight: true }
      ]
    },
    finalAnswer: '~10.3 – 10.5 Million Routers / Year (~8.4M Home + ~2.1M Office)',
    acceptableRange: { min: 6, max: 16, unit: 'Million routers/yr', display: '6M – 16M routers/yr' },
    sanityCheck: 'TRAI reports ~40M wired broadband connections in India adding ~4–5M net new FTTH homes yearly (JioFiber + Airtel Xstream + ACT). Adding ~5–6M replacement upgrades over a 5–6 yr lifespan lands right on ~10–11 Million annual routers shipped in India!',
    interviewerTrap: 'Counting ONLY replacement demand (ignoring ~4M+ annual new FTTH broadband additions!) OR forgetting that 80% of Indian internet access is cellular 4G/5G without a router.',
    variations: [
      { question: 'Estimate the annual hardware revenue at ₹2,000 blended average router price.', hint: '10.5M × ₹2,000 = ₹2,100 Crore/year!' }
    ],
    guidedPractice: {
      correctApproach: 'Stock & Replacement',
      funnelOptions: [
        { label: 'Residential Users (÷ HH Size) + Commercial Office Staff (÷ 10) → Apply Stock Growth % + (Stock ÷ Lifespan)', correct: true, feedback: 'Textbook dual-segment durable stock-flow formula!' },
        { label: '700M Internet Users ÷ 5', correct: false, feedback: 'Over 80% of Indians browse exclusively on cellular mobile data without a home Wi-Fi router.' },
        { label: 'IT Companies × 100', correct: false, feedback: 'Misses ~28M residential home fiber subscribers driving 80% of volume.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'resStockM', label: 'Residential Router Stock (M)', defaultVal: 28, min: 15, max: 45, step: 2, unit: 'M' },
        { key: 'commStockM', label: 'Commercial Router Stock (M)', defaultVal: 7, min: 3, max: 15, step: 1, unit: 'M' },
        { key: 'growthPct', label: 'Annual Fiber Growth %', defaultVal: 10, min: 4, max: 18, step: 2, unit: '%' },
        { key: 'lifeYrs', label: 'Avg Lifespan (Yrs)', defaultVal: 5, min: 3, max: 8, step: 1, unit: 'yrs' }
      ],
      computeFormulaText: '(Total Stock × Growth%) + (Total Stock ÷ Lifespan)',
      compute: (v) => {
        const stock = v.resStockM + v.commStockM;
        const annual = stock * (v.growthPct / 100) + stock / v.lifeYrs;
        return {
          value: annual,
          formatted: `${annual.toFixed(1)} Million/Yr`,
          breakdown: [
            { label: 'New Growth Units', val: `${(stock * v.growthPct / 100).toFixed(1)} M` },
            { label: 'Replacement Units', val: `${(stock / v.lifeYrs).toFixed(1)} M` }
          ]
        };
      }
    }
  },
  // 43
  {
    id: 'cb-sofas-india',
    title: 'Annual Market Size of Sofas in India',
    prompt: 'Estimate the annual retail market value (in ₹ Crore) of sofas sold across India.',
    difficulty: 3,
    archetype: 'Market Sizing',
    approachType: 'Replacement & Stock-Flow',
    templateId: 'tpl-durable',
    tags: ['Furniture & Home', 'Replacement + Growth', 'India', 'Sanity Check'],
    clarifyingQuestions: [
      { q: 'Are we sizing annual retail VALUE (₹) of sofa sets sold in India (excluding single-seat armchairs)?', a: 'Yes, annual value of residential sofas + commercial adjustment (~30% hotels/offices/lounges).', why: 'Sofas are long-life durables (~10-year cycle), so stock ÷ lifespan + commercial uplift is essential.' },
      { q: 'Account for both standard/local carpenter sofas (~75%) and premium/branded sofas (~25%)?', a: 'Yes! Standard (~₹20,000) vs Premium (~₹1,00,000) yields ~₹40,000 weighted avg unit price.', why: 'Furniture exhibits huge price variance between unorganized carpenters and branded showrooms.' }
    ],
    strategyOverview: 'Household Durable Stock-Flow × Weighted Price! Start with India Pop (1.4B ÷ 5 = 280M Households). Apply Urban (30% × 30% pen) + Rural (70% × 1% pen) ≈ ~10% blended sofa penetration = 28M sofa homes × 2 avg sofas/home = 56M Residential Stock! Annual Flow: Replacement (56M ÷ 10-yr lifespan = 5.6M/yr) + 1% Pop Growth (0.56M/yr) = 6.16M sofas/yr! Apply Weighted Price: Standard (75% × ₹20K = ₹15K) + Premium (25% × ₹100K = ₹25K) = ₹40,000 avg → 6.16M × ₹40,000 = ₹24,640 Crore (₹246.4B) residential (+ ~15–30% offices/hotels/lounges = ~₹28K–₹32K Crore/yr)!',
    formula: 'Annual Sofa Market = [(HH × Pen% × Sofas/HH) × (1/Lifespan + Growth%)] × ∑ (Tier Share% × Price) × (1 + Comm%)',
    assumptions: [
      { label: '280M HH × 10% Blended Penetration (30% Urban / 1% Rural) × 2 sofas/owning HH = 56M Installed Sofas', rationale: 'Affluent homes often keep multiple living-room/den sofa sets.' },
      { label: '10-Yr Lifespan (5.6M/yr) + 1% Growth (0.56M/yr) = 6.16M Annual Residential Sofas', rationale: 'Matches slow demographic replacement of bulky home furniture.' },
      { label: 'Weighted Price = 75%×₹20K + 25%×₹100K = ₹40,000 → ₹24,640 Cr Residential (~₹880/HH/yr overall)', rationale: 'Optional +15–30% uplift covers offices, hotels, lounges, and cafes (~₹30,000 Crore total).' }
    ],
    tree: {
      label: 'India Households (1.4B ÷ 5 = 280M HH)',
      valueText: '56M Sofa Stock',
      children: [
        { label: '10% Sofa Homes (28M) × 2 Sofas/HH = 56M Stock', valueText: '56M units' },
        { label: 'Replacement (56M ÷ 10 yrs = 5.6M) + 1% Growth (0.56M)', valueText: '6.16M Sofas/Yr', highlight: true },
        { label: '× ₹40,000 Blended Price (75%×₹20K + 25%×₹100K)', valueText: '₹24,640 Cr (+Comm ~₹30K Cr)', highlight: true }
      ]
    },
    finalAnswer: '~₹24,640 Crore/Year Residential (~₹28K – ₹32K Crore incl. Commercial)',
    acceptableRange: { min: 15000, max: 40000, unit: '₹ Crore/year', display: '₹15,000 Cr – ₹40,000 Cr/yr' },
    sanityCheck: 'Dividing ₹24,640 Crore across 280M Indian households yields ~₹880 per household per year (~₹73/month averaged across all homes — or ~₹8,800/yr among the 10% sofa-owning households = ₹88K once per decade!), completely realistic!',
    interviewerTrap: 'Multiplying 56M installed sofas by ₹40,000 WITHOUT dividing by the 10-year replacement lifespan (overstating annual sales by 10x!).',
    variations: [
      { question: 'Size the residential market share of organized/D2C brands (Pepperfry, Urban Ladder, IKEA) vs local carpenters.', hint: 'Organized/branded furniture holds ~15–20% share in India → ~₹3,700–₹5,000 Cr addressable branded sofa market.' }
    ],
    guidedPractice: {
      correctApproach: 'Stock & Replacement',
      funnelOptions: [
        { label: 'India HH → Urban/Rural Penetration × Sofas/HH ÷ 10-Yr Lifespan (+ Growth) × Tiered Price (+ Commercial)', correct: true, feedback: 'Spot on! Durable furniture requires stock ÷ lifespan + commercial offices/hotels adjustment.' },
        { label: '280M × ₹40,000', correct: false, feedback: 'Families don’t buy a ₹40,000 sofa every single year, nor do 100% of rural households own sofas!' },
        { label: 'Timber Imported ÷ 10', correct: false, feedback: 'Includes beds, doors, dining tables, and construction scaffolding.' }
      ]
    },
    interactiveModel: {
      variables: [
        { key: 'hhM', label: 'India Households (M)', defaultVal: 280, min: 250, max: 350, step: 10, unit: 'M' },
        { key: 'penPct', label: 'Blended Penetration %', defaultVal: 10, min: 5, max: 20, step: 1, unit: '%' },
        { key: 'lifeYrs', label: 'Replacement Cycle (Yrs)', defaultVal: 10, min: 6, max: 14, step: 1, unit: 'yrs' },
        { key: 'avgPriceK', label: 'Blended Sofa Price (₹K)', defaultVal: 40, min: 20, max: 60, step: 5, unit: '₹K' },
        { key: 'commPct', label: 'Commercial Uplift %', defaultVal: 15, min: 0, max: 30, step: 5, unit: '%' }
      ],
      computeFormulaText: '[(HH × Pen% × 2 × (1/Life + 0.01)) × Price] × (1 + Comm%)',
      compute: (v) => {
        const stockM = v.hhM * (v.penPct / 100) * 2;
        const unitsM = stockM / v.lifeYrs + stockM * 0.01;
        const revCr = ((unitsM * 1e6 * v.avgPriceK * 1000) / 1e7) * (1 + v.commPct / 100);
        return {
          value: Math.round(revCr),
          formatted: `₹${Math.round(revCr).toLocaleString('en-IN')} Crore/Yr`,
          breakdown: [
            { label: 'Annual Units Sold', val: `${(unitsM * (1 + v.commPct / 100)).toFixed(2)} M` },
            { label: 'Annual Spend / India HH', val: `₹${Math.round((revCr * 1e7) / (v.hhM * 1e6))}/HH` }
          ]
        };
      }
    }
  }
);
