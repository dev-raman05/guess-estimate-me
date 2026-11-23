window.GM_DATA = window.GM_DATA || {};

window.GM_DATA.curriculum = {
  roadmap: [
    {
      id: 'stage-1',
      stageNum: 1,
      title: 'Internalize the 6-Step Algorithm',
      duration: '20 mins',
      goal: 'Stop freezing when asked a random number question. Learn the exact 6-step sequence every MBB & PM candidate follows.',
      actionView: 'academy',
      actionTab: 'algorithm',
      tasks: [
        { id: 't1-1', text: 'Read the 6-Step Flow (Clarify → Structure → Assume → Solve → Communicate → Validate)' },
        { id: 't1-2', text: 'Practice reading the Word-for-Word Opening Script out loud twice' },
        { id: 't1-3', text: 'Review the Top 7 Fatal Mistakes that instantly fail candidates' }
      ]
    },
    {
      id: 'stage-2',
      stageNum: 2,
      title: 'Memorize the 25 Core Anchors',
      duration: '25 mins',
      goal: 'Never guess India’s population, urban/rural split, household size, or metro populations wrong.',
      actionView: 'memorize',
      actionTab: 'flashcards',
      tasks: [
        { id: 't2-1', text: 'Study the India & Global Demographic Cheat Sheet (1.4B pop, 35/65 split, 4/5 household size)' },
        { id: 't2-2', text: 'Master at least 20 flashcards in the Spaced-Repetition Deck' },
        { id: 't2-3', text: 'Score 80%+ on the 60-Second Rapid-Fire Benchmark & Math Drill' }
      ]
    },
    {
      id: 'stage-3',
      stageNum: 3,
      title: 'Recognize the 6 Master Archetypes',
      duration: '30 mins',
      goal: 'Every guesstimate in the world is just one of 6 blueprints in disguise. Learn to spot the blueprint in 10 seconds.',
      actionView: 'academy',
      actionTab: 'templates',
      tasks: [
        { id: 't3-1', text: 'Use the Approach Decision Wizard (Demand vs Supply vs Replacement vs Geometry)' },
        { id: 't3-2', text: 'Complete at least 8 out of 12 "Spot the Right Approach" mini-scenarios' },
        { id: 't3-3', text: 'Review the 6 Master Templates & memorize their anchor formulas' }
      ]
    },
    {
      id: 'stage-4',
      stageNum: 4,
      title: 'Guided Practice Across Difficulties',
      duration: '45 mins',
      goal: 'Solve problems step-by-step using Guided Coach mode before peeking at the full visual tree.',
      actionView: 'practice',
      actionTab: 'guided',
      tasks: [
        { id: 't4-1', text: 'Solve 3 Level 1–2 Easy problems (e.g., Tea Cups in Delhi, Watches in Delhi, Pens in India)' },
        { id: 't4-2', text: 'Solve 3 Level 3 Medium problems (e.g., Swiggy Orders, Refrigerator Market, Coffee Shop Milk)' },
        { id: 't4-3', text: 'Solve 2 Level 4–5 Hard/Supply problems (e.g., Flights at Delhi Airport, Zepto Workforce, Paint an Airbus)' }
      ]
    },
    {
      id: 'stage-5',
      stageNum: 5,
      title: 'Timed Mock Interviews & Curveballs',
      duration: '30 mins',
      goal: 'Simulate real interview pressure with a 10-minute timer, live issue-tree builder, and interviewer curveballs.',
      actionView: 'mock',
      actionTab: 'simulator',
      tasks: [
        { id: 't5-1', text: 'Complete 2 timed 10-minute mock interviews using the Issue-Tree Workbench' },
        { id: 't5-2', text: 'Practice delivering the 30-second Pyramid Principle Synthesis out loud' },
        { id: 't5-3', text: 'Review variations on at least 10 problems in the Library to prep for follow-up twists' }
      ]
    }
  ],

  sixSteps: [
    {
      stepNum: 1,
      id: 'clarify',
      name: 'Clarify Scope & Definitions',
      tagline: 'Never solve the wrong problem. 60 seconds here saves 10 minutes of wasted math.',
      timeBudget: '1–1.5 mins',
      whyInterviewersCare: 'Real clients give vague prompts ("Estimate car sales" or "Size the coffee market"). Interviewers test whether you pause to define units, geography, timeframe, and product scope before jumping into numbers.',
      checklist: [
        'Geography: City (Delhi vs Delhi-NCR), Country (India vs Global), or Urban-only?',
        'Timeframe: Daily, weekly, monthly, or annual?',
        'Metric / Unit: Volume (units/cups/orders) or Value (Revenue in ₹/$)?',
        'Scope boundaries: New + used? Commercial + personal? Domestic + international?',
        'Special edge cases: Peak season vs regular day? Include taxes/discounts?'
      ],
      wordForWordScript: `"Thank you, that's an interesting problem. Before I structure my approach, I'd like to ask 2–3 quick clarifying questions to make sure we're aligned on scope:\n1. Are we looking at [Geography: e.g., Delhi city or entire Delhi-NCR]?\n2. Should I calculate the figure in terms of [Volume / Units] or [Annual Revenue]?\n3. Are we focusing only on [Segment A, e.g. personal/retail], or should I include [Segment B, e.g. commercial/B2B] as well?"`,
      badExample: 'Jumping straight in: "Okay, India has 1.4 billion people, let\'s divide by 2 for gender..." (Wait—the interviewer wanted Bangalore revenue, not India volume!)',
      goodExample: '"Before I begin, just to clarify: when you say market size of refrigerators in India, do you mean annual sales revenue in INR, or total installed base? And should I include commercial freezers or focus on residential households?"'
    },
    {
      stepNum: 2,
      id: 'structure',
      name: 'Structure (MECE Issue Tree)',
      tagline: 'Build the mathematical equation and tree BEFORE putting in a single number.',
      timeBudget: '1.5–2 mins',
      whyInterviewersCare: 'Consultants get paid for structured thinking. MECE (Mutually Exclusive, Collectively Exhaustive) ensures you neither double-count nor miss a huge segment. Always get interviewer buy-in on your tree.',
      checklist: [
        'Choose your weapon: Top-Down (Demand), Bottom-Up (Supply/Capacity), Replacement, or Proxy.',
        'Check MECE: Do your buckets add up to 100% with zero overlap? (e.g. Urban + Rural = 100%; Age 0–15 + 15–35 + 35–60 + 60+ = 100%).',
        'Sketch the formula first: e.g. Market Size = Target Population × Penetration × Frequency × Ticket Size.',
        'Keep branches to 2–4 clean splits—avoid 7 tiny slices that explode your mental math.',
        'Ask for alignment: "Does this structure look comprehensive to you, or should we factor in anything else?"'
      ],
      wordForWordScript: `"Great, thank you for clarifying. Let me take 20 seconds to organize my thoughts.\n[Pause 15–20 sec, draw tree]\nI'd like to approach this from the [Demand-side / Supply-side] because [reason: e.g., capacity is the main bottleneck / this is a mass-consumer item].\nAt a high level, my equation is: Total = [Component A] × [Component B] × [Component C].\nTo break down [Component A] in a MECE way, I'll segment by [Urban vs Rural] and then by [Income/Age]. Does this structure make sense to proceed?"`,
      badExample: 'Listing overlapping buckets like "Students, Office-goers, Women, and Delhiites" (a female student in Delhi gets counted 3 times!).',
      goodExample: '"I will segment Delhi’s 3 Crore population into Age 0–15 (non-consumers, 20%) and 15+ (80%), and split the 15+ population cleanly by occupation: Office-goers (30%), Non-office workers (30%), and Non-working adults (40%)."'
    },
    {
      stepNum: 3,
      id: 'assume',
      name: 'State Defensible Assumptions',
      tagline: 'Never pull numbers out of thin air. Every assumption needs a quick 1-line "because...".',
      timeBudget: '1–2 mins',
      whyInterviewersCare: 'Interviewers don’t expect you to memorize trivia, but they brutally penalize unreasoned guesses. Saying "30% because..." shows business intuition and lets the interviewer course-correct if they want a different figure.',
      checklist: [
        'Anchor to known benchmarks first (India = 140 Cr, Urban = 35%, Family size = 4 urban / 5 rural).',
        'Round ruthlessly for clean mental math (use 100M instead of 103M, 30 days/month, 50 weeks/year when appropriate).',
        'Attach a rationale to every number ("Because affordability limits low-income groups...").',
        'Check proportions across segments (High income adoption > Middle > Low; Peak occupancy > Off-peak).'
      ],
      wordForWordScript: `"Moving into the numbers, I'll use India's population benchmark of 140 Crore, with an Urban-Rural split of 35% and 65%. For urban households, I'll assume an average family size of 4, which gives roughly 12.25 Crore—let's round to 12 Crore urban households for clean math. Because this is a discretionary product, I'll assume 80% penetration in high-income, 50% in middle-income, and 10% in lower-income households. Does that feel reasonable?"`,
      badExample: '"Let\'s say 43% of people buy it and they spend ₹317." (Impossible mental math + zero rationale!)',
      goodExample: '"Let\'s assume 40% penetration for middle-income households since the product costs ~₹25,000, making it an aspirational purchase, and an average replacement lifespan of 7 years—so ~14%, or 1/7th, is replaced each year."'
    },
    {
      stepNum: 4,
      id: 'solve',
      name: 'Compute Cleanly & Think Out Loud',
      tagline: 'Silence kills interviews. Narrate your math step-by-step using round numbers.',
      timeBudget: '3–4 mins',
      whyInterviewersCare: 'Silent calculation makes the interviewer assume you are lost, and if you slip on a zero (10 lakh vs 1 crore), they can’t help you. Thinking out loud turns the interview into a collaborative working session.',
      checklist: [
        'Keep units visible on every line (M, Cr, Lakh, ₹, hrs, days) — 90% of errors are dropped zeros!',
        'Write down intermediate subtotals clearly on your scratchpad.',
        'Use percentages and simple fractions (1/4, 1/7, 10%, 25%, 50%) rather than awkward decimals.',
        'Summarize each branch before moving to the next ("So Urban gives us 8 Crore units; now let\'s calculate Rural").'
      ],
      wordForWordScript: `"Let's crunch the Urban branch first: 35% of 140 Crore is 49 Crore—let's round to 50 Crore for clean calculation. Dividing by 4 members per household gives 12.5 Crore urban households. High income is 10% of that, so 1.25 Crore households; at 90% penetration that's ~1.1 Crore units..."`,
      badExample: 'Staring at paper silently for 90 seconds, then blurting out: "So the answer is 42,84,120."',
      goodExample: '"36 million urban people divided by 4 per household gives 9 million households. 60% middle income is 5.4 million, and 50% adoption gives 2.7 million. Let me hold 2.7 million for middle income and compute high income next..."'
    },
    {
      stepNum: 5,
      id: 'communicate',
      name: 'Signpost & Engage Continuously',
      tagline: 'Treat the interviewer like a senior partner or teammate, not an examiner.',
      timeBudget: 'Ongoing',
      whyInterviewersCare: 'Consulting is 50% analysis and 50% client communication. Candidates who signpost ("First... Second... Now moving to...") feel calm, executive, and easy to follow even on complex trees.',
      checklist: [
        'Use explicit signposts when switching branches ("Now that we have demand per day, let\'s check supply capacity").',
        'Pause after setting up the tree and after major assumptions to invite feedback.',
        'If the interviewer challenges an assumption ("Isn\'t 80% too high?"), agree gracefully, recalibrate live, and show flexibility.',
        'Never get defensive—an interviewer nudge is usually a gift helping you avoid a trap.'
      ],
      wordForWordScript: `"Just to recap where we are: we've estimated total daily demand at 6 lakh orders. Before I divide by rides per cab, I want to check if 10 rides per cab per day sounds fair for Delhi NCR, or if traffic congestion would bring that closer to 8?"`,
      badExample: 'Ignoring an interviewer’s raised eyebrow or arguing "No, I read online it\'s definitely 80%."',
      goodExample: '"That\'s a great point—if post-COVID hybrid work reduced office commute days from 5 to 3.5 days, let\'s scale down the corporate segment by 30%, bringing the weekly hours from 80M down to ~56M."'
    },
    {
      stepNum: 6,
      id: 'validate',
      name: 'Sanity Check & Synthesize',
      tagline: 'Never end right after your multiplication! Stress-test your answer in 15 seconds.',
      timeBudget: '1–1.5 mins',
      whyInterviewersCare: 'This is what separates Top 5% offers from rejections. A quick per-capita, % of GDP, or alternate-method sanity check catches dropped zeros AND proves executive judgment.',
      checklist: [
        'Per-Capita Check: Divide your answer by total population/households. Does each person really eat 40 pizzas a month? No -> recalibrate!',
        'GDP / Market Share Check: Is your Indian sneaker market larger than India’s entire GDP? Check order of magnitude!',
        'Supply vs Demand Cross-Check: If you solved top-down demand, quickly check if existing supply (stores/flights/staff) could even serve that!',
        'Deliver a Pyramid Summary: Final rounded range + key drivers + biggest sensitivity/caveat.'
      ],
      wordForWordScript: `"To sanity-check this ₹40,000 Crore estimate: divided across 35 Crore Indian households, that's roughly ₹1,140 per household per year—or ~₹100/month—which feels very reasonable given urban vs rural disparities. Wait, if I cross-check from the supply side with ~50,000 outlets, each would do ₹80 lakh/year, which also aligns nicely. So I'd confidently place the market size in the ₹35,000–45,000 Crore range, with urban adoption rate being the biggest driver."`,
      badExample: '"So the final answer is 2,31,52,50,000. Done." (Overly false precision + zero sanity check!)',
      goodExample: '"We arrived at ~576 flights arriving in Delhi per day. As a sanity check, at ~150 seats and 80% occupancy, that’s ~70,000 passengers/day—or ~2.5 crore passengers/year—which matches one of the world\'s busiest airports, though slightly conservative since Delhi handles ~6-7 Cr total flyers including departures."'
    }
  ],

  decisionWizard: {
    approaches: [
      {
        id: 'demand-top-down',
        name: 'Top-Down (Demand-Side)',
        badge: 'Most Common (~55% of cases)',
        whenToUse: 'Use when estimating consumer products, digital apps, retail demand, or anything bought/consumed by people or households where supply is not the bottleneck.',
        signalWords: ['Market size of...', 'How many people use...', 'Consumption per day/month/year', 'Number of smartphones/pens/tea cups/pizzas'],
        coreFormula: 'Total Population → Target Demographic Filter → Affordability/Access → Penetration/Adoption → Frequency × Ticket Size',
        watchOutFor: 'Don\'t apply individual filters to household items (e.g., refrigerators, ACs, Wi-Fi routers, cars)—divide by Household Size FIRST!'
      },
      {
        id: 'supply-bottom-up',
        name: 'Bottom-Up (Supply / Capacity-Side)',
        badge: 'High-Yield (~25% of cases)',
        whenToUse: 'Use when there is a physical bottleneck, fixed seating/lanes/runways/booths, or you are estimating revenue of a single outlet (salon, cinema, petrol pump, toll plaza, coffee shop, airport).',
        signalWords: ['Revenue of a...', 'How many flights take off...', 'Toll plaza collection', 'Workers needed for...', 'ATMs / Petrol pumps'],
        coreFormula: 'Number of Units (Chairs/Lanes/Counters/Runways) × Operating Hours × Peak/Off-Peak Utilization % × Turnover Rate × Ticket Size',
        watchOutFor: 'Peak vs Non-Peak hours and Weekday vs Weekend occupancy make or break supply-side answers. Also check if demand actually fills the capacity!'
      },
      {
        id: 'replacement-stock',
        name: 'Stock + Replacement & Growth (Durable Goods)',
        badge: 'Interview Favorite',
        whenToUse: 'Use for durable goods bought once every few years (Cars, ACs, Refrigerators, Tyres, Smartphones, TVs, EVs, Watches). Never multiply total stock by 1/year!',
        signalWords: ['Annual sales of...', 'Cars/ACs/Phones sold per year', 'Used tyres', 'EVs sold next year'],
        coreFormula: 'Annual Sales = Replacement Demand (Total Existing Stock ÷ Average Lifespan) + First-Time New Demand (Growth Rate × Base or New Households)',
        watchOutFor: 'Forgetting replacement lifespan is the #1 beginner blunder! If 30 Crore households own fridges with a 10-year life, annual sales are ~3 Cr, not 30 Cr.'
      },
      {
        id: 'geometry-proxy',
        name: 'Geometry, Physics & Clever Proxy',
        badge: 'Curveball / Consulting Classic',
        whenToUse: 'Use for physical space/volume packing, area-based counts, or unmeasurable quantities where a related observable variable acts as a clean proxy.',
        signalWords: ['Paint required to...', 'Golf balls in a bus', 'Words in a newspaper', 'College canteens / Factories / Traffic signals', 'Mall loose change'],
        coreFormula: 'Volume/Area Ratio (Usable Container Volume ÷ Object Volume × Packing Efficiency ~0.65–0.75) OR Proxy Anchor × Scaling Ratio',
        watchOutFor: 'Remember packing efficiency (~65% for spheres, ~75-85% for irregular shapes) and subtract non-usable space (seats in a bus, windows on a car, margins on a newspaper)!'
      }
    ],
    scenarios: [
      {
        id: 'sc-1',
        question: 'Estimate the daily revenue of a single McDonald’s outlet in Connaught Place.',
        options: ['Top-Down (Population Funnel)', 'Bottom-Up (Supply/Capacity)', 'Stock & Replacement', 'Geometry / Proxy'],
        correctIndex: 1,
        explanation: 'Single-outlet revenue is capped by physical capacity (cash counters, kitchen throughput, and dine-in seats across peak/off-peak hours). Always add delivery/takeaway as separate channels!'
      },
      {
        id: 'sc-2',
        question: 'Estimate the annual market size of refrigerators in India.',
        options: ['Top-Down (Population Funnel)', 'Bottom-Up (Supply/Capacity)', 'Stock & Replacement', 'Geometry / Proxy'],
        correctIndex: 2,
        explanation: 'A refrigerator is a household durable good with a ~7–10 year lifespan! Calculate household stock first, divide by lifespan for replacement demand, and add new/first-time buyers.'
      },
      {
        id: 'sc-3',
        question: 'Estimate the number of pens bought in India in a day.',
        options: ['Top-Down (Population Funnel)', 'Bottom-Up (Supply/Capacity)', 'Stock & Replacement', 'Geometry / Proxy'],
        correctIndex: 0,
        explanation: 'Pens are high-frequency individual consumables with no supply bottleneck. Start with 1.4B population, segment by age/literacy/student-vs-working, apply active pen user %, and multiply by purchase frequency.'
      },
      {
        id: 'sc-4',
        question: 'Estimate the number of flights taking off from Delhi Airport in a day.',
        options: ['Top-Down (Population Funnel)', 'Bottom-Up (Supply/Capacity)', 'Stock & Replacement', 'Geometry / Proxy'],
        correctIndex: 1,
        explanation: 'Airport takeoffs are constrained by physical runways/boarding gates and minimum time gaps between flights across Peak, Mid-Peak, and Off-Peak hours. Cross-check later with daily passenger demand!'
      },
      {
        id: 'sc-5',
        question: 'Estimate the amount of paint required to paint an Airbus A320 / 620.',
        options: ['Top-Down (Population Funnel)', 'Bottom-Up (Supply/Capacity)', 'Stock & Replacement', 'Geometry / Proxy'],
        correctIndex: 3,
        explanation: 'Break the plane into a cylinder (fuselage) + wings & tail (approx equal to fuselage area), compute surface area, factor in paint coverage per liter, and multiply by number of coats (usually 3)!'
      },
      {
        id: 'sc-6',
        question: 'Estimate the number of college canteens operating in Delhi.',
        options: ['Top-Down (Population Funnel)', 'Bottom-Up (Supply/Capacity)', 'Stock & Replacement', 'Geometry / Proxy'],
        correctIndex: 3,
        explanation: 'You can use Geographic Area / Land Proxy (Delhi area ~350,000 acres → % dedicated to colleges → divide by avg campus size → canteens per campus) OR Student Demand Proxy (18–22 college-going population ÷ avg college size).'
      },
      {
        id: 'sc-7',
        question: 'Estimate the number of aeroplanes flying in India right now.',
        options: ['Top-Down (Population Funnel)', 'Bottom-Up (Supply/Capacity)', 'Stock & Replacement', 'Geometry / Proxy'],
        correctIndex: 1,
        explanation: 'Use Little’s Law / Supply Throughput: (Flights taking off per hour across Major, Medium, and Small airports) × (Average flight duration ~2 hours) × (Time-of-day utilization factor).'
      },
      {
        id: 'sc-8',
        question: 'Estimate the number of Spotify Premium subscribers in India.',
        options: ['Top-Down (Population Funnel)', 'Bottom-Up (Supply/Capacity)', 'Stock & Replacement', 'Geometry / Proxy'],
        correctIndex: 0,
        explanation: 'Pure digital consumer demand funnel: Population → Urban/Rural & Income → Internet/Smartphone Penetration → Age Split → Music Listeners % → Spotify Share → Paid Conversion %.'
      },
      {
        id: 'sc-9',
        question: 'Estimate the daily revenue of a Delhi–Gurgaon Toll Plaza.',
        options: ['Top-Down (Population Funnel)', 'Bottom-Up (Supply/Capacity)', 'Stock & Replacement', 'Geometry / Proxy'],
        correctIndex: 1,
        explanation: 'Classic bottleneck supply model: Total booths (both directions) × Low/Medium/High frequency hours × Vehicles per hour per booth → split by 2W / 4W / Heavy Vehicle × respective toll tariff.'
      },
      {
        id: 'sc-10',
        question: 'Estimate the number of used tyres currently on cars in Delhi.',
        options: ['Top-Down (Population Funnel)', 'Bottom-Up (Supply/Capacity)', 'Stock & Replacement', 'Geometry / Proxy'],
        correctIndex: 2,
        explanation: 'Stock model (no lifespan division needed if asking "in use right now", or include spare tyre = 5 tyres per car): Households → Income split → Car ownership → Multiply cars × 5 tyres (4 active + 1 spare).'
      },
      {
        id: 'sc-11',
        question: 'Estimate the number of golf balls that can fit inside a school bus.',
        options: ['Top-Down (Population Funnel)', 'Bottom-Up (Supply/Capacity)', 'Stock & Replacement', 'Geometry / Proxy'],
        correctIndex: 3,
        explanation: 'Geometry / Volume packing: Compute bus interior volume (Length × Width × Height), subtract ~20–25% for seats/aisle obstacles, multiply by packing efficiency (~0.65–0.74 for spheres), and divide by 1 golf ball volume.'
      },
      {
        id: 'sc-12',
        question: 'Estimate the number of workers needed to fulfill 3,000 Zepto orders/day.',
        options: ['Top-Down (Population Funnel)', 'Bottom-Up (Supply/Capacity)', 'Stock & Replacement', 'Geometry / Proxy'],
        correctIndex: 1,
        explanation: 'Workforce bottleneck sizing! You MUST size for PEAK-HOUR orders, not average orders—otherwise orders fail SLA during morning/evening rushes. Split into Darkstore pickers (3 min/order) + Riders (15 min/order) + Supervisors.'
      }
    ]
  },

  masterTemplates: [
    {
      id: 'tpl-fmcg',
      num: 1,
      name: 'FMCG, Food & Digital Consumer Funnel',
      category: 'Demand-Side (Top-Down)',
      formula: 'Population × Geography/Income Filter × Age/Need Filter × Product Penetration × Brand Market Share × Frequency × Price',
      whenToUse: 'Tea cups, biscuits, pizzas, burgers, skincare, diapers, cigarettes, Spotify, Gmail, Swiggy orders.',
      anatomy: [
        '1. Geographic Scope (India = 140 Cr, Urban 35% / Rural 65%; or City like Delhi = 3 Cr)',
        '2. Affordability / Income Filter (Upper 10%, Middle 40-50%, Lower/BPL often excluded for premium goods)',
        '3. Age / Demographic Eligibility (Exclude 0-15 for coffee/credit cards/alcohol, or focus 0-3 + 60+ for diapers)',
        '4. Tech / Access Gate (Smartphone or Internet penetration if digital product)',
        '5. Usage Frequency & Ticket Size (Heavy/Medium/Light users × ₹ price)'
      ],
      proTip: 'Check whether the item is bought per PERSON (biscuits, skincare, cigarettes, pens) or per HOUSEHOLD (wheat/attā, candles, cars, ACs). Never mix up the two!',
      exampleIds: ['vol1-healthy-biscuits', 'vol1-swiggy-delhi', 'vol2-burgers-delhi', 'vol2-skincare-india']
    },
    {
      id: 'tpl-durable',
      num: 2,
      name: 'Durable Goods & Replacement Cycle',
      category: 'Stock + Replacement + Growth',
      formula: 'Annual Sales = (Existing Stock ÷ Avg Lifespan) + (New First-Time Buyers from Population/Income Growth)',
      whenToUse: 'Refrigerators, ACs, Cars, EVs, Smartphones, Watches, Laptops, Tyres, Mazda dealers.',
      anatomy: [
        '1. Convert Population → Households (÷ 4 Urban, ÷ 5 Rural) if household durable',
        '2. Segment by Income or City Tier (Tier 1/2/3 or Upper/Middle/Lower)',
        '3. Apply Ownership Penetration & Units per Household → Total Installed Stock',
        '4. Divide Total Stock by Average Lifespan (e.g. Phone 3 yrs, EV/Car 6–10 yrs, AC 8 yrs)',
        '5. Add First-Time Buyers (Stock × Growth % or Unpenetrated Households × Adoption Rate)'
      ],
      proTip: 'If asked "how many are CURRENTLY IN USE" (Watches, Tyres), stop at Step 3 (Total Stock)! Only divide by Lifespan when asked for "ANNUAL SALES" or "SOLD IN A YEAR".',
      exampleIds: ['vol2-refrigerator-india', 'vol2-ac-sales-delhi', 'vol2-ev-2w-india', 'iitg-mazda-usa']
    },
    {
      id: 'tpl-outlet',
      num: 3,
      name: 'Single Outlet / Store Revenue',
      category: 'Supply-Side (Capacity)',
      formula: 'Revenue = Seats/Counters × Operating Hours × Occupancy % (Peak vs Off-Peak) ÷ Service Time × Days × Avg Order Value',
      whenToUse: 'Salon, Dentist clinic, Coffee shop, Bowling alley, Urban cinema, Petrol pump, Fast food chain, Food court.',
      anatomy: [
        '1. Define Unit Capacity (Chairs in a salon, screens & seats in a cinema, lanes in bowling alley, machines in coffee shop)',
        '2. Split Operating Hours into Peak vs Non-Peak (and Weekdays vs Weekends — weekends typically 1.25x–1.5x higher!)',
        '3. Apply Occupancy % and divide by Service/Turnover Time (e.g. 30 min haircut vs 2 hr female salon session)',
        '4. Add secondary channels if applicable (Takeaway/Delivery for restaurants, F&B Popcorn/Coke for Cinemas)',
        '5. Multiply Total Customers by Weighted Average Order Value (AOV)'
      ],
      proTip: 'Watch out for "weighted average" traps! A salon serving 20 men at ₹250 and 5 women at ₹2,000 has weighted revenue, NOT simple average of (250+2000)/2!',
      exampleIds: ['vol1-salon-revenue', 'vol1-dentist-revenue', 'vol2-cinema-revenue', 'vol1-coffee-shop-milk']
    },
    {
      id: 'tpl-bottleneck',
      num: 4,
      name: 'Infrastructure & Bottleneck Throughput',
      category: 'Supply-Side (Flow Rate)',
      formula: 'Throughput = No. of Parallel Channels (Runways/Gates/Booths/Counters) × Hours × Flow Rate per Hour × Utilization %',
      whenToUse: 'Airport flights, Toll plaza revenue, Bandra-Worli Sea Link traffic, ATMs in Delhi, Metro trains needed, Mall visitors.',
      anatomy: [
        '1. Identify the binding physical bottleneck (Runways or Boarding gates at airport; Toll booths on highway; Train coach capacity)',
        '2. Break 24 hours into Peak, Mid-Peak, and Non-Peak slots with realistic time gaps between events (e.g. 4 min vs 10 min vs 30 min)',
        '3. Multiply by Utilization % and number of parallel units (e.g. 15 booths each side = 30 booths)',
        '4. Split output by type if revenue/mix differs (2W vs 4W vs Heavy Vehicles; Domestic vs International)',
        '5. Cross-check with Demand Side (e.g., total riders ÷ daily capacity per train = trains needed)'
      ],
      proTip: 'Always double-check directionality! A toll plaza usually collects both ways (Delhi→Gurgaon + Gurgaon→Delhi). An airport runway handles BOTH arrivals and departures (so divide total movements by 2 for departures only!).',
      exampleIds: ['vol1-toll-plaza', 'vol2-domestic-flights-delhi', 'vol2-metro-trains-delhi', 'iitg-aeroplanes-flying']
    },
    {
      id: 'tpl-geometry',
      num: 5,
      name: 'Geometry, Area & Volume Packing',
      category: 'Spatial / Proxy Estimation',
      formula: 'Count = (Usable Container Volume or Area × Packing Efficiency) ÷ Single Item Volume/Area (or Coverage Rate)',
      whenToUse: 'Paint for car or Airbus, Words in newspaper, Golf balls in a bus, College canteens via land area, Traffic signals on grid.',
      anatomy: [
        '1. Approximate irregular shapes with clean primitives (Car = 2 cuboids; Airplane = Cylinder + Wings/Tail ≈ 2× Cylinder; Newspaper = Rectangle)',
        '2. Subtract non-applicable zones (Car windows, newspaper margins/borders/photos, seats inside bus)',
        '3. Account for physical realities (Sphere packing density ~65–74%, Multiple coats of paint ×3)',
        '4. Convert units carefully (sq ft vs sq meters: 1 m² ≈ 10.76 sq ft; 1 acre ≈ 43,560 sq ft)',
        '5. Sanity check dimensions against objects you know (adult height ~5.5–6 ft, car length ~4 m / 13 ft)'
      ],
      proTip: 'Never forget unit conversions and coats/layers! Painting a plane needs 3 coats; 1 gallon ≈ 3.8 liters; 1 acre = 43,560 sq ft.',
      exampleIds: ['vol1-paint-car', 'vol1-paint-airbus', 'vol2-college-canteens', 'iitg-newspaper-words']
    },
    {
      id: 'tpl-workforce',
      num: 6,
      name: 'Fleet, Workforce & Logistics Sizing',
      category: 'Peak-Load Supply & Demand Matching',
      formula: 'Fleet or Staff Needed = Peak-Hour Demand Volume ÷ (Throughput per Worker/Vehicle per Hour × Utilization)',
      whenToUse: 'Ola/Uber cabs in Delhi, Cab driver daily rides, Workers for 3,000 Zepto orders, Delivery fleet sizing.',
      anatomy: [
        '1. Determine Total Daily Demand (e.g. 3,000 orders or 6.3 lakh cab rides)',
        '2. Split into Day vs Night and Peak vs Non-Peak hours (typically 60% of orders happen in 4 peak hours!)',
        '3. Size the staff/fleet for PEAK HOUR capacity (you cannot tell customers at 8 PM to wait until 3 AM!)',
        '4. Calculate Unit Productivity (Driver shift 11 hrs × 80% utilization ÷ 45 min cycle = ~11 rides/day; Zepto picker 20 orders/hr, rider 4 orders/hr)',
        '5. Add non-productive buffer roles (supervisors, security, idle/maintenance cabs ~10%)'
      ],
      proTip: 'In service operations, ALWAYS size workforce/fleet for PEAK HOURS rather than 24-hour averages, and include deadhead/repositioning time in ride cycles!',
      exampleIds: ['vol2-zepto-workers', 'vol2-cab-rides-day', 'vol1-ola-uber-delhi', 'iitg-fuel-stations-india']
    }
  ],

  mentalMathAndSecrets: {
    mathTricks: [
      {
        title: 'The Geometric Mean Trick (When Guessing Ranges)',
        formula: 'GM = √(Low × High)',
        explanation: 'Whenever you only know a wide range (e.g., "An airline flight takes between 1 hr and 4 hrs", or "A medium factory employs 50 to 200 workers"), don’t take the arithmetic mean—take the Geometric Mean! It resists extreme upper outliers and yields cleaner round numbers.',
        example: 'Range 1 to 4 hours → √(1 × 4) = 2 hours. Range 50 to 200 workers → √(50 × 200) = √10,000 = 100 workers.'
      },
      {
        title: 'The Ergodic / Fraction-of-Time Trick',
        formula: '% of People Doing X Right Now ≈ % of Time Spent Doing X',
        explanation: 'For large steady-state populations ("How many people are in the air right now?", "How many students are watching Netflix right now?"), the share of time an average unit spends in an activity equals the share of units doing it at any instant.',
        example: 'If an average student spends 1 hour out of 16 waking hours watching Netflix (~6%), then at any random moment ~6% of students are watching Netflix.'
      },
      {
        title: 'Instant India ↔ International Unit Bridges',
        formula: '1 Crore = 10 Million | 100 Crore = 1 Billion | 1 Lakh = 100 Thousand',
        explanation: 'Interviewers in India frequently mix Crores and Millions. Pick ONE unit system per problem and convert immediately at the start.',
        example: '140 Crore = 1,400 Million = 1.4 Billion. 3.5 Crore (Delhi) = 35 Million. ₹1 Lakh Crore = ₹1 Trillion (~$12 Billion USD at ₹83–85/$).'
      },
      {
        title: 'Strategic Rounding ("Friendly Math" Rule)',
        formula: 'Round 365 → 360 or 350 | 52 weeks → 50 weeks | 7 → keep 14, 21, 35, 70',
        explanation: 'Guesstimates only care about being within ±20–30% (same order of magnitude). Rounding 52 weeks to 50 introduces only a 4% error while cutting mental calculation time by 70%!',
        example: 'Instead of 1.43B × 36.5% × 7.2%, use 1.4B × 35% × 7% = 1.4B × 0.0245 ≈ 34.3M.'
      },
      {
        title: 'Little’s Law for Queues & Systems',
        formula: 'Inventory in System (L) = Arrival Rate (λ) × Avg Time in System (W)',
        explanation: 'Pure magic for "How many planes are in the air?", "How many customers are inside a mall?", or "How many cars are on a bridge right now?"',
        example: 'If 470 flights take off per hour in India and average flight time is 2 hours, then ~470 × 2 = 940 flights at peak capacity!'
      }
    ],
    interviewerSecrets: [
      {
        firm: 'McKinsey & Company (Interviewer-Led)',
        style: 'Fast, structured, tightly steered by the interviewer.',
        whatTheyLookFor: 'Crisp hypothesis, flawless mental math without pausing silently, and instant responsiveness if they say "Ignore rural for now" or "What if price drops 20%?".',
        proTip: 'Expect the interviewer to cut you off and pivot mid-tree—don’t get flustered, it’s normal at McKinsey!'
      },
      {
        firm: 'BCG, Bain & BCN (Candidate-Led)',
        style: 'You own the roadmap from start to finish.',
        whatTheyLookFor: 'Structured MECE tree upfront, proactive signposting ("Next I’ll estimate replacement demand..."), realistic Indian economic segmentation, and a strong sanity check.',
        proTip: 'BCN loves checking unit economics and asking "Which single assumption is your answer most sensitive to?" at the end.'
      },
      {
        firm: 'Product Management (Google, Flipkart, Meesho)',
        style: 'Product sense + behavioral funnel + monetization.',
        whatTheyLookFor: 'Realistic tech funnels (Smartphone → Internet → App Adoption → Active Users → Paying Users), distinguishing DAU vs MAU, and sizing for peak load (e.g. Big Billion Day or Zepto 8 AM rush).',
        proTip: 'Always check whether a digital service is free vs freemium vs transactional (e.g. Spotify free vs Premium, or Swiggy order frequency by income).'
      },
      {
        firm: 'Boutique Strategy & Analytics (Kearney, Indus, RedSeer, Trinity, ZS)',
        style: 'Deep operational realism, healthcare/supply chain precision, and spreadsheet-clean math.',
        whatTheyLookFor: 'Multi-layered funnels (e.g., Prevalence → Diagnosis/Eligibility → Affordability → Adoption), exact capacity turnaround times, and realistic margins.',
        proTip: 'In healthcare/pharma cases (Trinity, Kearney), remember: Total Population → Disease Prevalence → Diagnosed % → Eligible % → Affordable % → Brand Share!'
      }
    ],
    fatalMistakes: [
      {
        mistake: '1. Jumping straight into math without clarifying scope',
        fix: 'Always spend 45–60 seconds asking 2–3 crisp scope questions (Geography, Timeframe, Volume vs Revenue, Segments).'
      },
      {
        mistake: '2. Mixing Individuals and Households',
        fix: 'Ask yourself: "Does one person buy this (shoes, coffee, SIM card) or does a whole family share one (fridge, car, TV, broadband)?"'
      },
      {
        mistake: '3. Ignoring Lifespan on Durable Goods',
        fix: 'Stock ≠ Annual Sales! Divide total cars/ACs/phones in use by their replacement lifespan (e.g., 3–10 years) to get annual sales.'
      },
      {
        mistake: '4. Double-counting or overlapping MECE buckets',
        fix: 'Check that every split sums to 100% cleanly. Never split into "Delhi residents, College students, and Working adults" simultaneously.'
      },
      {
        mistake: '5. Silent Math & Dropped Zeros',
        fix: 'Narrate every step out loud and write units next to every single number (Cr / M / Lakh). One missed zero makes ₹100 Cr into ₹10 Cr!'
      },
      {
        mistake: '6. Designing for Average Hours instead of Peak Capacity',
        fix: 'For toll booths, Zepto riders, metro trains, or restaurants, bottlenecks happen during PEAK hours. Always split Peak vs Off-Peak.'
      },
      {
        mistake: '7. Stopping at the final number without a Sanity Check',
        fix: 'Always divide back to a per-person, per-day, or per-outlet check. Catching your own absurd number earns MORE respect than getting it right silently!'
      }
    ]
  }
};
