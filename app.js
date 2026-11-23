(() => {
  const DATA = window.GM_DATA || {};
  const PROBLEMS = DATA.problems || [];
  const CURRICULUM = DATA.curriculum || {};
  const CHEATSHEET = DATA.cheatsheet || {};

  const STORAGE_KEY = 'guessmaster_pro_state_v1';

  const defaultState = {
    theme: 'dark',
    fontScale: 'normal',
    mockDurationMins: 10,
    view: 'dashboard',
    academyTab: 'algorithm',
    memorizeTab: 'cheatsheet',
    selectedProblemId: PROBLEMS[0] ? PROBLEMS[0].id : null,
    studyRevealStep: 99, // 99 = full view, 1..6 = progressive step reveal
    progressiveMode: false,
    filters: {
      search: '',
      source: 'All',
      company: 'All',
      archetype: 'All',
      difficulty: 'All',
      status: 'All'
    },
    roadmapDone: {},       // taskId: true
    masteredIds: {},       // problemId: true
    bookmarkedIds: {},     // problemId: true
    flashcardStatus: {},   // cardId: 'mastered' | 'review'
    scenarioAnswers: {},   // scenarioId: selectedIndex
    bestDrillScore: 0,
    mocksCompleted: 0,
    guided: {
      problemId: PROBLEMS[0] ? PROBLEMS[0].id : null,
      step: 1,
      clarifyRevealed: {},
      selectedApproach: null,
      selectedFunnelIdx: null,
      calcInput: '',
      calcResult: '',
      userEstimate: '',
      sanityInput: '',
      gradeResult: null
    }
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(defaultState);
      const parsed = JSON.parse(raw);
      return {
        ...structuredClone(defaultState),
        ...parsed,
        filters: { ...defaultState.filters, ...(parsed.filters || {}) },
        guided: { ...defaultState.guided, ...(parsed.guided || {}) }
      };
    } catch {
      return structuredClone(defaultState);
    }
  }

  let state = loadState();
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }

  let saveTimerId = null;
  function saveStateDebounced(delay = 250) {
    clearTimeout(saveTimerId);
    saveTimerId = setTimeout(() => { saveState(); }, delay);
  }

  // Runtime transient states (timers, flashcard index, mock workbench)
  let flashState = {
    category: 'All',
    onlyReview: false,
    index: 0,
    flipped: false
  };

  let drillState = {
    active: false,
    completed: false,
    timeLeft: 60,
    timerId: null,
    advanceTimeoutId: null,
    score: 0,
    answered: 0,
    correctCount: 0,
    streak: 0,
    bestStreak: 0,
    currentIdx: 0,
    questions: [],
    lastFeedback: null,
    lockedChoice: null,
    beatBest: false
  };

  function abortRapidDrill() {
    clearInterval(drillState.timerId);
    clearTimeout(drillState.advanceTimeoutId);
    drillState = {
      active: false,
      completed: false,
      timeLeft: 60,
      timerId: null,
      advanceTimeoutId: null,
      score: 0,
      answered: 0,
      correctCount: 0,
      streak: 0,
      bestStreak: 0,
      currentIdx: 0,
      questions: [],
      lastFeedback: null,
      lockedChoice: null,
      beatBest: false
    };
  }

  let mockState = {
    problemId: PROBLEMS[0] ? PROBLEMS[0].id : null,
    durationSec: 600,
    timeLeft: 600,
    running: false,
    timerId: null,
    clarifiedIdx: {},
    showVariation: false,
    showSolutionRef: false,
    sanityNote: '',
    nodes: [
      { id: 1, label: 'Target Base Population', base: 1400000000, op: 'base', val: 1400000000, note: 'India = 1.4B' },
      { id: 2, label: 'Urban Segment (%)', base: 0, op: 'pct', val: 35, note: '35% Urban' },
      { id: 3, label: 'Affordability / Adoption (%)', base: 0, op: 'pct', val: 20, note: 'Target segment' },
      { id: 4, label: 'Frequency / Year (×)', base: 0, op: 'mul', val: 4, note: '4 times/yr' },
      { id: 5, label: 'Avg Ticket Price (× ₹)', base: 0, op: 'mul', val: 300, note: '₹300/unit' }
    ]
  };

  let wizardAnswers = { q1: null, q2: null, q3: null };
  let cheatSearch = '';
  let libResizeObserver = null;

  // Helpers
  function esc(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getProblem(id) {
    return PROBLEMS.find(p => p.id === id) || PROBLEMS[0];
  }

  function diffDots(level) {
    const cls = level >= 5 ? 'expert' : level >= 4 ? 'hard' : '';
    let html = '<span class="diff-dots" title="Difficulty ' + level + '/5">';
    for (let i = 1; i <= 5; i++) {
      html += `<span class="diff-dot ${i <= level ? 'on ' + cls : ''}"></span>`;
    }
    html += ` <span style="font-size:11px;color:var(--text-muted);margin-left:3px;">L${level}</span></span>`;
    return html;
  }

  function formatIndian(num) {
    if (!isFinite(num)) return '—';
    const abs = Math.abs(num);
    if (abs >= 1e9) return `${(num / 1e9).toFixed(2)} B (${(num / 1e7).toFixed(1)} Cr)`;
    if (abs >= 1e7) return `${(num / 1e7).toFixed(2)} Crore (${(num / 1e6).toFixed(1)} M)`;
    if (abs >= 1e5) return `${(num / 1e5).toFixed(2)} Lakh`;
    return Math.round(num).toLocaleString('en-IN');
  }

  function computeProgress() {
    const totalTasks = (CURRICULUM.roadmap || []).reduce((acc, s) => acc + s.tasks.length, 0) || 1;
    const doneTasks = Object.values(state.roadmapDone).filter(Boolean).length;
    const roadmapPct = Math.round((doneTasks / totalTasks) * 100);

    const masteredCount = Object.values(state.masteredIds).filter(Boolean).length;
    const bookmarkedCount = Object.values(state.bookmarkedIds).filter(Boolean).length;
    const cardsMastered = Object.values(state.flashcardStatus).filter(v => v === 'mastered').length;
    const totalCards = (CHEATSHEET.flashcards || []).length || 1;

    // Composite Readiness Score (weighted for steep fast-track curve)
    const readiness = Math.min(100, Math.round(
      roadmapPct * 0.30 +
      Math.min(1, masteredCount / 15) * 40 +
      Math.min(1, cardsMastered / 20) * 20 +
      Math.min(1, state.mocksCompleted / 2) * 10
    ));

    return { roadmapPct, doneTasks, totalTasks, masteredCount, bookmarkedCount, cardsMastered, totalCards, readiness };
  }

  function updateSidebarStats() {
    const p = computeProgress();
    const badgeRoadmap = document.getElementById('badge-roadmap');
    const badgeCards = document.getElementById('badge-cards');
    const badgeLib = document.getElementById('badge-library');
    const rPct = document.getElementById('readiness-pct');
    const rFill = document.getElementById('readiness-fill');
    const rSum = document.getElementById('readiness-summary');

    if (badgeRoadmap) badgeRoadmap.textContent = `${p.roadmapPct}%`;
    if (badgeCards) badgeCards.textContent = `${p.cardsMastered}/${p.totalCards}`;
    if (badgeLib) badgeLib.textContent = `${p.masteredCount}/${PROBLEMS.length}`;
    if (rPct) rPct.textContent = `${p.readiness}%`;
    if (rFill) rFill.style.width = `${p.readiness}%`;
    if (rSum) rSum.textContent = `${p.masteredCount}/${PROBLEMS.length} mastered · ${p.cardsMastered} cards`;
  }

  function applyTheme() {
    if (state.theme !== 'light' && state.theme !== 'dark') state.theme = 'dark';
    document.body.classList.toggle('light-theme', state.theme === 'light');
    document.body.classList.toggle('font-compact', state.fontScale === 'compact');
    document.body.classList.toggle('font-comfortable', state.fontScale === 'comfortable');

    document.querySelectorAll('[data-set-theme]').forEach(el => {
      el.classList.toggle('active', el.dataset.setTheme === state.theme);
    });
    document.querySelectorAll('[data-set-font]').forEach(el => {
      el.classList.toggle('btn-primary', el.dataset.setFont === (state.fontScale || 'normal'));
    });
    document.querySelectorAll('[data-set-mockmins]').forEach(el => {
      el.classList.toggle('btn-primary', Number(el.dataset.setMockmins) === (state.mockDurationMins || 10));
    });
  }

  function setView(view, opts = {}) {
    if (drillState.active && (view !== 'memorize' || (opts.memorizeTab && opts.memorizeTab !== 'drill'))) {
      abortRapidDrill();
    }
    if (view !== 'library' && libResizeObserver) {
      libResizeObserver.disconnect();
      libResizeObserver = null;
    }
    state.view = view;
    if (opts.academyTab) state.academyTab = opts.academyTab;
    if (opts.memorizeTab) state.memorizeTab = opts.memorizeTab;
    if (opts.problemId) state.selectedProblemId = opts.problemId;
    saveState();

    document.querySelectorAll('.nav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.view === view);
    });

    const titles = {
      dashboard: 'Crash Course Roadmap',
      academy: 'Approach Guide',
      memorize: 'Memorize & Drill',
      library: `Problem Library (${PROBLEMS.length})`,
      practice: 'Guided Practice Coach',
      mock: 'Mock Interview Workbench'
    };
    document.getElementById('topbar-title').textContent = titles[view] || 'GuessMaster Pro';
    document.getElementById('sidebar').classList.remove('open');
    const gs = document.getElementById('global-search');
    if (gs && gs.value !== (state.filters.search || '')) {
      gs.value = state.filters.search || '';
    }
    if (!opts.preserveFocus && typeof window.scrollTo === 'function') {
      window.scrollTo(0, 0);
    }
    render();
  }

  // ==================== VIEW 1: DASHBOARD ====================
  function renderDashboard() {
    const p = computeProgress();
    // Recommend next unmastered problem ordered by ascending difficulty
    const sortedRec = [...PROBLEMS].sort((a, b) => a.difficulty - b.difficulty);
    const nextRec = sortedRec.find(prob => !state.masteredIds[prob.id]) || sortedRec[0];

    const stagesHtml = (CURRICULUM.roadmap || []).map(stage => {
      const doneInStage = stage.tasks.filter(t => state.roadmapDone[t.id]).length;
      const allDone = doneInStage === stage.tasks.length;
      return `
        <div class="stage-card">
          <div class="stage-header">
            <div>
              <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                <span class="stage-num">${stage.stageNum}</span>
                <strong style="font-size:16px;">${esc(stage.title)}</strong>
                <span class="pill ${allDone ? 'pill-green' : 'pill-blue'}">${doneInStage}/${stage.tasks.length} done</span>
                <span class="pill">⏱️ ~${esc(stage.duration)}</span>
              </div>
              <p style="margin:8px 0 0;color:var(--text-muted);font-size:13.5px;">${esc(stage.goal)}</p>
            </div>
            <button class="btn btn-sm ${allDone ? '' : 'btn-primary'}" data-jump-view="${stage.actionView}" data-jump-tab="${stage.actionTab || ''}">
              Open Module →
            </button>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            ${stage.tasks.map(t => {
              const checked = !!state.roadmapDone[t.id];
              return `
                <label class="task-item ${checked ? 'done' : ''}">
                  <input type="checkbox" data-roadmap-task="${t.id}" ${checked ? 'checked' : ''} />
                  <span>${esc(t.text)}</span>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="hero-banner">
        <div>
          <span class="pill pill-green" style="margin-bottom:8px;">🚀 Built for 0-Experience Beginners · Fast-Track Prep</span>
          <h1>Ace Any Consulting &amp; PM Guesstimate Interview</h1>
          <p>Compiled from <strong>180DC SRCC (Vol 1 &amp; 2)</strong>, <strong>IIT Guwahati Guess-It-Matters</strong>, and top <strong>MBB / Product Management</strong> interviews—with ${PROBLEMS.length} visual issue trees, live sensitivity sliders, guided step-by-step practice, flashcards, and timed mock simulations.</p>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="btn btn-primary" data-jump-view="academy" data-jump-tab="algorithm">Start Here: 6-Step Approach →</button>
          <button class="btn btn-secondary" data-practice-id="${esc(nextRec.id)}">🎯 Practice Recommended (L${nextRec.difficulty})</button>
        </div>
      </div>

      <div class="grid-4" style="margin-bottom:22px;">
        <div class="stat-card">
          <div class="stat-label">Interview Readiness</div>
          <div class="stat-value" style="color:var(--accent-bright);">${p.readiness}%</div>
          <div class="stat-sub">Target: 80%+ before interview day</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Problems Mastered</div>
          <div class="stat-value">${p.masteredCount} <span style="font-size:15px;color:var(--text-dim);">/ ${PROBLEMS.length}</span></div>
          <div class="stat-sub">${p.bookmarkedCount} bookmarked for revision</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Benchmarks Memorized</div>
          <div class="stat-value">${p.cardsMastered} <span style="font-size:15px;color:var(--text-dim);">/ ${p.totalCards}</span></div>
          <div class="stat-sub">Best 60s Math Drill: ${state.bestDrillScore} pts</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Next Recommended Problem</div>
          <div style="font-weight:700;font-size:14px;margin:6px 0;">${esc(nextRec.title)}</div>
          <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
            ${diffDots(nextRec.difficulty)}
            <button class="btn btn-sm" data-open-problem="${esc(nextRec.id)}" style="margin-left:auto;">Open</button>
          </div>
        </div>
      </div>

      <h2 style="font-size:18px;margin:0 0 12px;">⚡ Your 2.5-Hour Steep-Curve Crash Course</h2>
      ${stagesHtml}
    `;
  }

  // ==================== VIEW 2: ACADEMY ====================
  function renderAcademy() {
    const tab = state.academyTab || 'algorithm';
    const tabsHtml = `
      <div class="page-header">
        <div>
          <h1>Learn the Guesstimate Approach</h1>
          <p>Master the 6-step consulting method, decision wizard, archetypes, and mental math shortcuts.</p>
        </div>
      </div>
      <div class="tab-bar">
        <button class="tab-btn ${tab === 'algorithm' ? 'active' : ''}" data-acad-tab="algorithm">1. The 6-Step Algorithm &amp; Scripts</button>
        <button class="tab-btn ${tab === 'wizard' ? 'active' : ''}" data-acad-tab="wizard">2. Approach Decision Wizard (12 Drills)</button>
        <button class="tab-btn ${tab === 'templates' ? 'active' : ''}" data-acad-tab="templates">3. The 6 Master Templates</button>
        <button class="tab-btn ${tab === 'secrets' ? 'active' : ''}" data-acad-tab="secrets">4. Mental Math &amp; Fatal Mistakes</button>
      </div>
    `;

    let body = '';
    if (tab === 'algorithm') {
      body = `
        <div class="card-flat" style="margin-bottom:16px;border-left:4px solid var(--accent);">
          <strong>Beginner Golden Rule:</strong> Interviewers NEVER expect you to know the exact statistical answer. They grade <strong>4 things</strong>: (1) Asking crisp scope questions, (2) Building a MECE tree before doing math, (3) Defending assumptions with a 1-line "because...", and (4) Performing a 15-second sanity check out loud.
        </div>
        <div style="display:flex;flex-direction:column;gap:14px;">
          ${(CURRICULUM.sixSteps || []).map(s => `
            <div class="card">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
                <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1 1 240px;">
                  <span class="stage-num">${s.stepNum}</span>
                  <div style="min-width:0;">
                    <h3 style="margin:0;font-size:16.5px;">${esc(s.name)}</h3>
                    <div style="font-size:12.5px;color:var(--text-muted);">${esc(s.tagline)}</div>
                  </div>
                </div>
                <span class="pill pill-blue">⏱️ Target Time: ${esc(s.timeBudget)}</span>
              </div>
              <p style="font-size:13.5px;margin:0 0 10px;"><strong>Why Interviewers Care:</strong> ${esc(s.whyInterviewersCare)}</p>
              <ul style="margin:0 0 12px;padding-left:20px;font-size:13.5px;color:var(--text-muted);">
                ${s.checklist.map(c => `<li style="margin-bottom:4px;">${esc(c)}</li>`).join('')}
              </ul>
              <div style="margin-bottom:12px;">
                <div style="font-size:12px;font-weight:700;color:var(--accent-bright);margin-bottom:5px;text-transform:uppercase;">💬 Word-for-Word Interview Script</div>
                <div class="script-box">${esc(s.wordForWordScript)}</div>
              </div>
              <div class="compare-grid">
                <div class="bad-box"><strong>❌ Beginner Trap:</strong><br/>${esc(s.badExample)}</div>
                <div class="good-box"><strong>✅ Offer-Winning Move:</strong><br/>${esc(s.goodExample)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (tab === 'wizard') {
      const wiz = CURRICULUM.decisionWizard || {};
      let rec = null;
      if (wizardAnswers.q1 === 'geometry') rec = wiz.approaches[3];
      else if (wizardAnswers.q1 === 'durable') rec = wiz.approaches[2];
      else if (wizardAnswers.q2 === 'yes') rec = wiz.approaches[1];
      else if (wizardAnswers.q1 === 'consumer' && wizardAnswers.q2 === 'no') rec = wiz.approaches[0];

      const scDone = Object.keys(state.scenarioAnswers).length;
      const scCorrect = (wiz.scenarios || []).filter(s => state.scenarioAnswers[s.id] === s.correctIndex).length;

      body = `
        <div class="card" style="margin-bottom:20px;">
          <h3 style="margin:0 0 6px;">🧭 Interactive Approach Decision Wizard</h3>
          <p style="margin:0 0 14px;font-size:13.5px;color:var(--text-muted);">Stuck on how to start a prompt? Answer 2 quick questions to pick the exact right methodology:</p>
          <div class="grid-2" style="margin-bottom:14px;">
            <div class="section-block">
              <strong style="font-size:13px;">Q1. What kind of thing are you estimating?</strong>
              <div style="display:flex;flex-direction:column;gap:6px;margin-top:8px;">
                <button class="btn btn-sm btn-block-left ${wizardAnswers.q1 === 'consumer' ? 'btn-primary' : ''}" data-wiz-q="q1" data-wiz-v="consumer">Consumable / App / Food / Service / Revenue</button>
                <button class="btn btn-sm btn-block-left ${wizardAnswers.q1 === 'durable' ? 'btn-primary' : ''}" data-wiz-q="q1" data-wiz-v="durable">Durable Asset (Car, Fridge, AC, Phone, Tyre)</button>
                <button class="btn btn-sm btn-block-left ${wizardAnswers.q1 === 'geometry' ? 'btn-primary' : ''}" data-wiz-q="q1" data-wiz-v="geometry">Physical Space / Volume / Length / Probability</button>
              </div>
            </div>
            <div class="section-block">
              <strong style="font-size:13px;">Q2. Is there a clear physical bottleneck (seats, lanes, runways, booths, single shop)?</strong>
              <div style="display:flex;flex-direction:column;gap:6px;margin-top:8px;">
                <button class="btn btn-sm btn-block-left ${wizardAnswers.q2 === 'yes' ? 'btn-primary' : ''}" data-wiz-q="q2" data-wiz-v="yes">YES — Single Outlet, Airport, Toll, Cinema, Staff</button>
                <button class="btn btn-sm btn-block-left ${wizardAnswers.q2 === 'no' ? 'btn-primary' : ''}" data-wiz-q="q2" data-wiz-v="no">NO — City/National Population Demand</button>
              </div>
            </div>
          </div>
          ${rec ? `
            <div class="good-box">
              <div style="font-size:12px;text-transform:uppercase;font-weight:700;">Recommended Strategy</div>
              <h4 style="margin:4px 0;font-size:16px;">${esc(rec.name)} <span class="pill pill-green">${esc(rec.badge)}</span></h4>
              <p style="margin:4px 0 8px;">${esc(rec.whenToUse)}</p>
              <div class="formula-banner">${esc(rec.coreFormula)}</div>
              <p style="margin:8px 0 0;font-size:12.5px;"><strong>⚠️ Watch out for:</strong> ${esc(rec.watchOutFor)}</p>
            </div>
          ` : '<div class="tip-box">Select options above to see your recommended approach &amp; formula.</div>'}
        </div>

        <div class="grid-2" style="margin-bottom:22px;">
          ${(wiz.approaches || []).map(a => `
            <div class="card-flat">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:6px;">
                <strong>${esc(a.name)}</strong>
                <span class="pill pill-blue">${esc(a.badge)}</span>
              </div>
              <p style="font-size:13px;color:var(--text-muted);margin:0 0 8px;">${esc(a.whenToUse)}</p>
              <div style="font-size:12px;margin-bottom:8px;"><strong>Signal keywords:</strong> ${a.signalWords.map(w => `<span class="pill" style="margin:2px;">${esc(w)}</span>`).join('')}</div>
              <div class="formula-banner" style="font-size:11.5px;">${esc(a.coreFormula)}</div>
            </div>
          `).join('')}
        </div>

        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
            <div>
              <h3 style="margin:0;">⚡ "Spot the Right Approach" — 12 Mini-Drills</h3>
              <p style="margin:4px 0 0;font-size:13px;color:var(--text-muted);">Train your 10-second pattern recognition before touching any numbers.</p>
            </div>
            <span class="pill pill-green">Score: ${scCorrect}/${(wiz.scenarios || []).length} (${scDone} attempted)</span>
          </div>
          <div class="grid-2">
            ${(wiz.scenarios || []).map((sc, idx) => {
              const chosen = state.scenarioAnswers[sc.id];
              const hasChosen = chosen !== undefined;
              return `
                <div class="section-block">
                  <div style="font-weight:700;font-size:13.5px;margin-bottom:8px;">${idx + 1}. ${esc(sc.question)}</div>
                  <div>
                    ${sc.options.map((opt, oi) => {
                      let cls = 'quiz-opt';
                      if (hasChosen) {
                        if (oi === sc.correctIndex) cls += ' correct';
                        else if (oi === chosen) cls += ' wrong';
                      }
                      return `<button class="${cls}" style="padding:8px 10px;font-size:12.5px;" data-sc-id="${sc.id}" data-sc-opt="${oi}">${esc(opt)}</button>`;
                    }).join('')}
                  </div>
                  ${hasChosen ? `<div style="font-size:12.5px;color:var(--text-muted);margin-top:6px;">💡 ${esc(sc.explanation)}</div>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    } else if (tab === 'templates') {
      body = `
        <div class="grid-2">
          ${(CURRICULUM.masterTemplates || []).map(t => `
            <div class="card">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
                <span class="pill pill-purple">Archetype #${t.num} · ${esc(t.category)}</span>
              </div>
              <h3 style="margin:0 0 8px;font-size:16.5px;">${esc(t.name)}</h3>
              <div class="formula-banner" style="margin-bottom:10px;font-size:12px;">${esc(t.formula)}</div>
              <p style="font-size:13px;margin:0 0 10px;"><strong>When to use:</strong> ${esc(t.whenToUse)}</p>
              <div style="font-size:12.5px;color:var(--text-muted);margin-bottom:10px;">
                <strong>Standard Tree Anatomy:</strong>
                <ul style="margin:4px 0 0;padding-left:18px;">
                  ${t.anatomy.map(a => `<li>${esc(a)}</li>`).join('')}
                </ul>
              </div>
              <div class="good-box" style="margin-bottom:12px;font-size:12.5px;"><strong>🔥 Insider Tip:</strong> ${esc(t.proTip)}</div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${t.exampleIds.map(eid => {
                  const ep = getProblem(eid);
                  return ep ? `<button class="btn btn-sm" data-open-problem="${esc(ep.id)}">📖 ${esc(ep.title.slice(0, 32))}${ep.title.length > 32 ? '…' : ''}</button>` : '';
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      const m = CURRICULUM.mentalMathAndSecrets || {};
      body = `
        <h3 style="margin:0 0 12px;">🧮 Consulting Mental Math &amp; Estimation Shortcuts</h3>
        <div class="grid-2" style="margin-bottom:22px;">
          ${(m.mathTricks || []).map(tr => `
            <div class="card-flat">
              <strong style="font-size:14.5px;">${esc(tr.title)}</strong>
              <div class="formula-banner" style="margin:8px 0;font-size:12px;">${esc(tr.formula)}</div>
              <p style="font-size:13px;color:var(--text-muted);margin:0 0 6px;">${esc(tr.explanation)}</p>
              <div style="font-size:12.5px;color:var(--accent-bright);"><strong>Example:</strong> ${esc(tr.example)}</div>
            </div>
          `).join('')}
        </div>

        <h3 style="margin:0 0 12px;">🏢 What Different Firms Actually Grade For</h3>
        <div class="grid-2" style="margin-bottom:22px;">
          ${(m.interviewerSecrets || []).map(sec => `
            <div class="card-flat" style="display:flex;flex-direction:column;gap:6px;">
              <strong style="font-size:14.5px;color:var(--accent-2);">${esc(sec.firm)}</strong>
              <div style="font-size:12.5px;"><strong>Style:</strong> ${esc(sec.style)}</div>
              <p style="font-size:13px;color:var(--text-muted);margin:0;">${esc(sec.whatTheyLookFor)}</p>
              <div class="tip-box tip-box-green" style="margin-top:auto;">💡 ${esc(sec.proTip)}</div>
            </div>
          `).join('')}
        </div>

        <h3 style="margin:0 0 12px;">🚨 Top 7 Fatal Mistakes That Cost Offers</h3>
        <div class="card">
          ${(m.fatalMistakes || []).map(fm => `
            <div class="cs-item" style="flex-direction:column;align-items:flex-start;gap:4px;">
              <strong style="color:var(--danger);font-size:13.5px;">${esc(fm.mistake)}</strong>
              <span style="font-size:13px;color:var(--text-muted);">✅ <strong>Fix:</strong> ${esc(fm.fix)}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    return tabsHtml + body;
  }

  // ==================== VIEW 3: PROBLEM LIBRARY ====================
  function getFilteredProblems() {
    const f = state.filters;
    const q = f.search.trim().toLowerCase();
    return PROBLEMS.filter(p => {
      if (f.source !== 'All' && p.source !== f.source) return false;
      if (f.company !== 'All' && p.company !== f.company) return false;
      if (f.archetype !== 'All' && p.archetype !== f.archetype) return false;
      if (f.difficulty !== 'All' && String(p.difficulty) !== String(f.difficulty)) return false;
      if (f.status === 'Mastered' && !state.masteredIds[p.id]) return false;
      if (f.status === 'Unread' && state.masteredIds[p.id]) return false;
      if (f.status === 'Bookmarked' && !state.bookmarkedIds[p.id]) return false;
      if (q) {
        const hay = `${p.title} ${p.prompt} ${p.company} ${p.archetype} ${p.source} ${(p.tags || []).join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function renderTreeNode(node) {
    if (!node) return '';
    const boxCls = node.highlight ? 'highlight' : node.muted ? 'muted' : '';
    const childrenHtml = (node.children && node.children.length)
      ? `<div class="tree-children">${node.children.map(renderTreeNode).join('')}</div>`
      : '';
    return `
      <div class="tree-node">
        <div class="tree-node-box ${boxCls}">
          <span>${esc(node.label)}</span>
          ${node.valueText ? `<span class="tree-node-val">${esc(node.valueText)}</span>` : ''}
        </div>
        ${childrenHtml}
      </div>
    `;
  }

  function renderProblemDetail(prob) {
    if (!prob) return '<div class="card">No problem matched your filters.</div>';
    const isMastered = !!state.masteredIds[prob.id];
    const isBookmarked = !!state.bookmarkedIds[prob.id];
    const stepLimit = state.progressiveMode ? state.studyRevealStep : 99;

    // Interactive model defaults
    const vars = {};
    if (prob.interactiveModel && prob.interactiveModel.variables) {
      prob.interactiveModel.variables.forEach(v => { vars[v.key] = v.defaultVal; });
    }
    const initialModelOut = prob.interactiveModel ? prob.interactiveModel.compute(vars) : null;

    return `
      <div class="problem-detail-panel" id="detail-panel" data-prob-id="${esc(prob.id)}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
          <div style="min-width:0;flex:1 1 260px;">
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px;">
              <span class="pill pill-blue">${esc(prob.company)}</span>
              <span class="pill">${esc(prob.source)}</span>
              <span class="pill pill-purple">${esc(prob.archetype)}</span>
              <span class="pill pill-green">${esc(prob.approachType)}</span>
              ${diffDots(prob.difficulty)}
            </div>
            <h2 style="margin:0 0 6px;font-size:21px;letter-spacing:-0.01em;">${esc(prob.title)}</h2>
            <div style="font-size:12px;color:var(--text-dim);">📄 Source ref: ${esc(prob.pdfRef)}</div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            <button class="btn btn-sm ${isMastered ? 'btn-primary' : ''}" data-toggle-master="${esc(prob.id)}">
              ${isMastered ? '✓ Mastered' : '○ Mark Mastered'}
            </button>
            <button class="btn btn-sm ${isBookmarked ? 'btn-warn' : ''}" data-toggle-bookmark="${esc(prob.id)}">
              ${isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
            </button>
            <button class="btn btn-sm btn-secondary" data-practice-id="${esc(prob.id)}">🎯 Guided Solve</button>
            <button class="btn btn-sm" data-mock-id="${esc(prob.id)}">⏱️ Mock Test</button>
          </div>
        </div>

        <div class="hero-banner" style="margin:0;padding:16px 18px;">
          <div style="min-width:0;flex:1 1 260px;">
            <div style="font-size:11px;text-transform:uppercase;font-weight:700;color:var(--accent-bright);">Interviewer Prompt</div>
            <div style="font-size:16px;font-weight:700;margin-top:3px;">“${esc(prob.prompt)}”</div>
          </div>
          <div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px;">
            <button class="btn btn-sm ${state.progressiveMode ? 'btn-warn' : ''}" id="toggle-progressive-btn">
              ${state.progressiveMode ? '🔒 Study Mode: Step-by-Step' : '👁️ Full Solution Visible'}
            </button>
            ${state.progressiveMode && stepLimit < 6 ? `<button class="btn btn-sm btn-primary" id="reveal-next-step-btn">Reveal Step ${stepLimit + 1}/6 →</button>` : ''}
          </div>
        </div>

        <!-- Step 1 -->
        <div class="section-block">
          <h3>Step 1: Clarifying Questions &amp; Scope</h3>
          ${(prob.clarifyingQuestions || []).map(cq => `
            <div style="margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid var(--border);">
              <div style="font-weight:600;font-size:13.5px;">❓ You ask: "${esc(cq.q)}"</div>
              <div style="font-size:13px;color:var(--accent-bright);margin-top:2px;">💬 Interviewer: ${esc(cq.a)}</div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">Why it matters: ${esc(cq.why)}</div>
            </div>
          `).join('')}
        </div>

        <!-- Step 2 -->
        ${stepLimit >= 2 ? `
        <div class="section-block">
          <h3>Step 2: Strategy &amp; Core Equation</h3>
          <p style="margin:0 0 10px;font-size:13.5px;">${esc(prob.strategyOverview)}</p>
          <div class="formula-banner">${esc(prob.formula)}</div>
        </div>` : ''}

        <!-- Step 3 -->
        ${stepLimit >= 3 ? `
        <div class="section-block">
          <h3>Step 3: Defensible Assumptions</h3>
          <ul style="margin:0;padding-left:18px;font-size:13.5px;">
            ${(prob.assumptions || []).map(a => `
              <li style="margin-bottom:6px;">
                <strong>${esc(a.label)}</strong>
                <div style="color:var(--text-muted);font-size:12.5px;">Rationale: ${esc(a.rationale)}</div>
              </li>
            `).join('')}
          </ul>
        </div>` : ''}

        <!-- Step 4: Visual Tree & Tweaker -->
        ${stepLimit >= 4 ? `
        <div class="section-block">
          <h3>Step 4: Visual Issue Tree &amp; Calculation</h3>
          <div class="issue-tree-wrap">
            ${renderTreeNode(prob.tree)}
          </div>
          <div class="good-box" style="margin-top:10px;">
            <strong>🎯 Reference Answer:</strong> ${esc(prob.finalAnswer)}
            <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">Acceptable Interview Ballpark: ${esc(prob.acceptableRange ? prob.acceptableRange.display : '')}</div>
          </div>
        </div>

        ${prob.interactiveModel ? `
        <div class="section-block" style="border-color:rgba(56,189,248,0.35);">
          <h3>🎛️ Interactive "What-If" Sensitivity Tweaker</h3>
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;">Formula: <code>${esc(prob.interactiveModel.computeFormulaText)}</code> — Drag sliders to see which assumptions swing the result most!</div>
          <div class="tweaker-grid">
            ${prob.interactiveModel.variables.map(v => `
              <div class="slider-box">
                <label>
                  <span>${esc(v.label)}</span>
                  <span class="slider-val" id="sval-${v.key}">${v.defaultVal} ${esc(v.unit)}</span>
                </label>
                <input type="range" class="model-slider" data-var-key="${v.key}" data-unit="${esc(v.unit)}"
                  min="${v.min}" max="${v.max}" step="${v.step}" value="${v.defaultVal}" />
              </div>
            `).join('')}
          </div>
          <div class="live-result-bar" id="live-model-output">
            <div>
              <div style="font-size:11px;text-transform:uppercase;font-weight:700;color:var(--accent-bright);">Live Simulated Estimate</div>
              <div style="font-size:22px;font-weight:800;" id="live-model-formatted">${esc(initialModelOut.formatted)}</div>
            </div>
            <div style="display:flex;gap:14px;flex-wrap:wrap;" id="live-model-breakdown">
              ${initialModelOut.breakdown.map(b => `<div><div style="font-size:11px;color:var(--text-muted);">${esc(b.label)}</div><strong>${esc(b.val)}</strong></div>`).join('')}
            </div>
          </div>
        </div>` : ''}` : ''}

        <!-- Step 5 -->
        ${stepLimit >= 5 ? `
        <div class="section-block">
          <h3>Step 5: Sanity Check &amp; Validation</h3>
          <p style="margin:0 0 10px;font-size:13.5px;">✅ ${esc(prob.sanityCheck)}</p>
          <div class="bad-box">
            <strong>⚠️ Common Interviewer Trap:</strong> ${esc(prob.interviewerTrap)}
          </div>
        </div>` : ''}

        <!-- Step 6 -->
        ${stepLimit >= 6 ? `
        <div class="section-block">
          <h3>Step 6: Curveball Variations to Practice</h3>
          ${(prob.variations || []).map(vr => `
            <div style="margin-bottom:8px;font-size:13.5px;">
              <strong>🔄 ${esc(vr.question)}</strong>
              <div style="color:var(--text-muted);font-size:12.5px;">Hint: ${esc(vr.hint)}</div>
            </div>
          `).join('')}
        </div>` : ''}
      </div>
    `;
  }

  function renderLibraryListHtml(filtered, activeProb) {
    return filtered.map(p => `
      <div class="problem-list-item ${activeProb && activeProb.id === p.id ? 'selected' : ''}" data-select-prob="${esc(p.id)}">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
          <span class="pill" style="font-size:10.5px;">${esc(p.company)}</span>
          <div style="display:flex;gap:5px;align-items:center;flex-wrap:wrap;">
            ${state.bookmarkedIds[p.id] ? '<span>★</span>' : ''}
            ${state.masteredIds[p.id] ? '<span class="pill pill-green" style="font-size:10px;">✓</span>' : ''}
            ${diffDots(p.difficulty)}
          </div>
        </div>
        <h4>${esc(p.title)}</h4>
        <div style="font-size:11.5px;color:var(--text-dim);">${esc(p.archetype)} · ${esc(p.source)}</div>
      </div>
    `).join('') || '<div class="card-flat">No matching problems. Click Reset Filters.</div>';
  }

  function renderLibrary() {
    const sources = ['All', ...new Set(PROBLEMS.map(p => p.source))];
    const companies = ['All', ...new Set(PROBLEMS.map(p => p.company))].sort((a, b) => a === 'All' ? -1 : b === 'All' ? 1 : a.localeCompare(b));
    const archetypes = ['All', ...new Set(PROBLEMS.map(p => p.archetype))];

    const filtered = getFilteredProblems();
    if (!filtered.some(p => p.id === state.selectedProblemId) && filtered.length) {
      state.selectedProblemId = filtered[0].id;
    }
    const activeProb = filtered.find(p => p.id === state.selectedProblemId) || filtered[0] || null;

    return `
      <div class="page-header">
        <div>
          <h1>Problem Library</h1>
          <p>Filter ${PROBLEMS.length} solved consulting &amp; PM guesstimates by source, firm, archetype, or difficulty.</p>
        </div>
      </div>
      <div class="filter-bar">
        <input type="text" class="input" id="lib-search" placeholder="Filter by title, tags, firm..." value="${esc(state.filters.search)}" aria-label="Search problems" />
        <select class="select" id="lib-source" aria-label="Filter by source">
          <option value="All" ${state.filters.source === 'All' ? 'selected' : ''}>Source: All</option>
          ${sources.filter(s => s !== 'All').map(s => `<option value="${esc(s)}" ${state.filters.source === s ? 'selected' : ''}>${esc(s)}</option>`).join('')}
        </select>
        <select class="select" id="lib-company" aria-label="Filter by company">
          <option value="All" ${state.filters.company === 'All' ? 'selected' : ''}>Firm: All</option>
          ${companies.filter(c => c !== 'All').map(c => `<option value="${esc(c)}" ${state.filters.company === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}
        </select>
        <select class="select" id="lib-archetype" aria-label="Filter by archetype">
          <option value="All" ${state.filters.archetype === 'All' ? 'selected' : ''}>Type: All</option>
          ${archetypes.filter(a => a !== 'All').map(a => `<option value="${esc(a)}" ${state.filters.archetype === a ? 'selected' : ''}>${esc(a)}</option>`).join('')}
        </select>
        <select class="select" id="lib-diff" aria-label="Filter by difficulty">
          <option value="All" ${state.filters.difficulty === 'All' ? 'selected' : ''}>Level: All</option>
          ${[1, 2, 3, 4, 5].map(d => `<option value="${d}" ${String(state.filters.difficulty) === String(d) ? 'selected' : ''}>Level ${d}</option>`).join('')}
        </select>
        <select class="select" id="lib-status" aria-label="Filter by study status">
          <option value="All" ${state.filters.status === 'All' ? 'selected' : ''}>Status: All</option>
          ${['Unread', 'Mastered', 'Bookmarked'].map(st => `<option value="${st}" ${state.filters.status === st ? 'selected' : ''}>${st}</option>`).join('')}
        </select>
      </div>

      <div style="margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <span id="lib-count-text" style="font-size:13px;color:var(--text-muted);">Showing <strong>${filtered.length}</strong> of ${PROBLEMS.length} solved guesstimates</span>
        <button class="btn btn-sm" id="clear-filters-btn">Reset Filters</button>
      </div>

      <div class="library-split">
        <div class="problem-list-panel" id="lib-list-panel">
          ${renderLibraryListHtml(filtered, activeProb)}
        </div>
        <div id="lib-detail-wrap">
          ${renderProblemDetail(activeProb)}
        </div>
      </div>
    `;
  }

  // ==================== VIEW 4: GUIDED PRACTICE COACH ====================
  function renderPractice() {
    const prob = getProblem(state.guided.problemId);
    const g = state.guided;
    const approaches = ['Top-Down (Demand-Side)', 'Bottom-Up (Supply-Side)', 'Stock & Replacement', 'Geometry & Proxy', 'Hybrid (Demand + Supply)'];

    const selectorHtml = `
      <div class="page-header">
        <div>
          <h1>Guided Practice Coach</h1>
          <p>Walk through clarifying scope, approach, MECE structure, math, and sanity checks step-by-step.</p>
        </div>
      </div>
      <div class="card-flat" style="margin-bottom:12px;display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;flex:1 1 260px;min-width:0;">
          <strong>Active Practice Problem:</strong>
          <select class="select" id="guided-prob-select" style="width:100%;max-width:440px;min-width:0;">
            ${PROBLEMS.map(p => `<option value="${esc(p.id)}" ${p.id === prob.id ? 'selected' : ''}>[L${p.difficulty}] ${esc(p.title)} (${esc(p.company)})</option>`).join('')}
          </select>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button class="btn btn-sm" id="guided-random-easy">🎲 Easy (L1–2)</button>
          <button class="btn btn-sm" id="guided-random-med">🎲 Med (L3)</button>
          <button class="btn btn-sm" id="guided-random-hard">🎲 Hard (L4–5)</button>
        </div>
      </div>
    `;

    const progressStepper = `
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px;">
        ${['1. Clarify', '2. Approach', '3. MECE Tree', '4. Compute & Estimate', '5. Sanity Check & Debrief'].map((lbl, idx) => `
          <button class="tab-btn ${g.step === idx + 1 ? 'active' : ''}" data-guided-step="${idx + 1}">${lbl}</button>
        `).join('')}
      </div>
    `;

    let stepContent = '';
    if (g.step === 1) {
      stepContent = `
        <div class="card">
          <div class="pill pill-blue" style="margin-bottom:8px;">Step 1 of 5 · Clarify Scope</div>
          <h3 style="margin:0 0 8px;">Prompt: “${esc(prob.prompt)}”</h3>
          <p style="font-size:13.5px;color:var(--text-muted);">Before touching any numbers, think about 2–3 clarifying questions you MUST ask the interviewer. Click each question below to simulate asking it:</p>
          ${(prob.clarifyingQuestions || []).map((cq, idx) => {
            const open = !!g.clarifyRevealed[idx];
            return `
              <div class="section-block" style="margin-bottom:10px;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
                  <strong style="flex:1 1 220px;min-width:0;">❓ "${esc(cq.q)}"</strong>
                  <button class="btn btn-sm ${open ? '' : 'btn-primary'}" data-clarify-idx="${idx}">${open ? 'Asked ✓' : 'Ask Interviewer'}</button>
                </div>
                ${open ? `
                  <div style="margin-top:8px;font-size:13px;color:var(--accent-bright);">💬 Interviewer: ${esc(cq.a)}</div>
                  <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">Why this matters: ${esc(cq.why)}</div>
                ` : ''}
              </div>
            `;
          }).join('')}
          <div style="margin-top:14px;text-align:right;">
            <button class="btn btn-primary" data-guided-step="2">Next: Choose Approach →</button>
          </div>
        </div>
      `;
    } else if (g.step === 2) {
      const targetApp = prob.guidedPractice ? prob.guidedPractice.correctApproach : prob.approachType;
      stepContent = `
        <div class="card">
          <div class="pill pill-blue" style="margin-bottom:8px;">Step 2 of 5 · Choose Strategic Approach</div>
          <h3 style="margin:0 0 8px;">Which primary approach fits “${esc(prob.title)}”?</h3>
          <p style="font-size:13.5px;color:var(--text-muted);">Hint: Ask yourself whether this is a consumer mass funnel, a physical capacity bottleneck, a multi-year durable asset, or a spatial/geometry question.</p>
          <div>
            ${approaches.map(ap => {
              let cls = 'quiz-opt';
              if (g.selectedApproach) {
                if (ap === targetApp) cls += ' correct';
                else if (ap === g.selectedApproach) cls += ' wrong';
              }
              return `<button class="${cls}" data-guided-approach="${esc(ap)}">${esc(ap)}</button>`;
            }).join('')}
          </div>
          ${g.selectedApproach ? `
            <div class="${g.selectedApproach === targetApp ? 'good-box' : 'bad-box'}" style="margin-top:10px;">
              <strong>${g.selectedApproach === targetApp ? '✅ Spot on!' : '💡 Recommended Approach: ' + esc(targetApp)}</strong><br/>
              ${esc(prob.strategyOverview)}
            </div>
          ` : ''}
          <div style="margin-top:14px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">
            <button class="btn" data-guided-step="1">← Back</button>
            <button class="btn btn-primary" data-guided-step="3">Next: Build MECE Tree →</button>
          </div>
        </div>
      `;
    } else if (g.step === 3) {
      const opts = (prob.guidedPractice && prob.guidedPractice.funnelOptions) || [];
      stepContent = `
        <div class="card">
          <div class="pill pill-blue" style="margin-bottom:8px;">Step 3 of 5 · Select the MECE Structure</div>
          <h3 style="margin:0 0 8px;">Choose the cleanest MECE equation / segmentation tree:</h3>
          <div>
            ${opts.map((o, idx) => {
              let cls = 'quiz-opt';
              if (g.selectedFunnelIdx !== null) {
                if (o.correct) cls += ' correct';
                else if (idx === g.selectedFunnelIdx) cls += ' wrong';
              }
              return `<button class="${cls}" data-guided-funnel="${idx}">${esc(o.label)}</button>`;
            }).join('')}
          </div>
          ${g.selectedFunnelIdx !== null && opts[g.selectedFunnelIdx] ? `
            <div class="${opts[g.selectedFunnelIdx].correct ? 'good-box' : 'bad-box'}" style="margin-top:10px;">
              ${esc(opts[g.selectedFunnelIdx].feedback)}
              <div class="formula-banner" style="margin-top:8px;">Formula: ${esc(prob.formula)}</div>
            </div>
          ` : ''}
          <div style="margin-top:14px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">
            <button class="btn" data-guided-step="2">← Back</button>
            <button class="btn btn-primary" data-guided-step="4">Next: Calculate Your Estimate →</button>
          </div>
        </div>
      `;
    } else if (g.step === 4) {
      const range = prob.acceptableRange || { min: 0, max: 0, unit: '', display: '' };
      stepContent = `
        <div class="card">
          <div class="pill pill-blue" style="margin-bottom:8px;">Step 4 of 5 · Estimate &amp; Compute</div>
          <h3 style="margin:0 0 6px;">Plug in your own assumptions and calculate!</h3>
          <div class="formula-banner" style="margin-bottom:12px;">${esc(prob.formula)}</div>

          <div class="grid-2" style="margin-bottom:14px;">
            <div class="section-block">
              <strong style="font-size:13px;">🧮 Quick Scratchpad Calculator</strong>
              <p style="font-size:12px;color:var(--text-muted);margin:4px 0 8px;">Type any expression (e.g. <code>140 * 0.35 * 0.4 * 500</code>):</p>
              <div style="display:flex;gap:8px;">
                <input type="text" class="input" id="guided-calc-expr" placeholder="e.g. 30 * 0.8 * 0.65 * 3" value="${esc(g.calcInput)}" />
                <button class="btn btn-secondary btn-sm" id="guided-calc-run">=</button>
              </div>
              <div style="margin-top:8px;font-family:var(--mono);font-size:14px;color:var(--accent-bright);overflow-wrap:anywhere;word-break:break-word;" id="guided-calc-out">
                ${g.calcResult ? `Result: ${esc(g.calcResult)}` : ''}
              </div>
            </div>

            <div class="section-block">
              <strong style="font-size:13px;">🎯 Submit Your Estimate (${esc(range.unit || 'units')})</strong>
              <p style="font-size:12px;color:var(--text-muted);margin:4px 0 8px;">Target unit: <strong>${esc(range.unit)}</strong> (Target range hidden until you submit!)</p>
              <div style="display:flex;gap:8px;">
                <input type="number" step="any" class="input" id="guided-est-val" placeholder="Enter number in ${esc(range.unit)}" value="${esc(g.userEstimate)}" />
                <button class="btn btn-primary btn-sm" id="guided-check-est">Check</button>
              </div>
              <div id="guided-grade-out">
                ${g.gradeResult ? `<div class="${g.gradeResult.ok ? 'good-box' : 'bad-box'}" style="margin-top:8px;font-size:12.5px;">${esc(g.gradeResult.msg)}</div>` : ''}
              </div>
            </div>
          </div>

          <details class="section-block">
            <summary style="cursor:pointer;font-weight:700;font-size:13px;">💡 Stuck on assumptions? Click to peek at Reference Benchmarks</summary>
            <ul style="margin:8px 0 0;padding-left:18px;font-size:13px;">
              ${(prob.assumptions || []).map(a => `<li><strong>${esc(a.label)}</strong> — ${esc(a.rationale)}</li>`).join('')}
            </ul>
          </details>

          <div style="margin-top:14px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">
            <button class="btn" data-guided-step="3">← Back</button>
            <button class="btn btn-primary" data-guided-step="5">Next: Sanity Check &amp; Debrief →</button>
          </div>
        </div>
      `;
    } else {
      const isMastered = !!state.masteredIds[prob.id];
      stepContent = `
        <div class="card">
          <div class="pill pill-green" style="margin-bottom:8px;">Step 5 of 5 · Sanity Check &amp; Full Debrief</div>
          <h3 style="margin:0 0 10px;">Final Verification &amp; Comparison</h3>
          <div class="section-block" style="margin-bottom:12px;">
            <strong style="font-size:13px;">Write your 15-second Sanity Check (how would you verify your number?):</strong>
            <textarea class="input" id="guided-sanity-txt" rows="2" style="margin-top:6px;" placeholder="e.g. Divided across 35 Cr households, that equals ₹100/month which feels reasonable...">${esc(g.sanityInput)}</textarea>
          </div>
          <div class="good-box" style="margin-bottom:12px;">
            <strong>✅ Reference Answer:</strong> ${esc(prob.finalAnswer)}<br/>
            <strong>🔍 Reference Sanity Check:</strong> ${esc(prob.sanityCheck)}
          </div>
          <div class="bad-box" style="margin-bottom:14px;">
            <strong>⚠️ Watch Out For:</strong> ${esc(prob.interviewerTrap)}
          </div>
          <div class="section-block" style="margin-bottom:14px;">
            <h3>Reference Visual Issue Tree</h3>
            <div class="issue-tree-wrap">${renderTreeNode(prob.tree)}</div>
          </div>
          <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;">
            <button class="btn" data-guided-step="4">← Back</button>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button class="btn ${isMastered ? 'btn-primary' : 'btn-secondary'}" data-toggle-master="${esc(prob.id)}">
                ${isMastered ? '✓ Mastered!' : '✓ Mark Problem Mastered'}
              </button>
              <button class="btn btn-primary" id="guided-next-unmastered">Next Unsolved Problem →</button>
            </div>
          </div>
        </div>
      `;
    }

    return selectorHtml + progressStepper + stepContent;
  }

  // ==================== VIEW 5: MOCK INTERVIEW & WORKBENCH ====================
  function computeWorkbenchNodes() {
    let runningVal = 0;
    return mockState.nodes.map((n, idx) => {
      const parsedVal = parseFloat(n.val);
      const numVal = isNaN(parsedVal) ? 0 : parsedVal;
      if (idx === 0 || n.op === 'base') {
        runningVal = numVal;
      } else if (n.op === 'pct') {
        runningVal = runningVal * (numVal / 100);
      } else if (n.op === 'mul') {
        runningVal = runningVal * numVal;
      } else if (n.op === 'div') {
        runningVal = numVal !== 0 ? runningVal / numVal : runningVal;
      } else if (n.op === 'add') {
        runningVal = runningVal + numVal;
      } else if (n.op === 'sub') {
        runningVal = runningVal - numVal;
      }
      return { ...n, computed: runningVal };
    });
  }

  function getMockPhaseLabel() {
    const elapsed = mockState.durationSec - mockState.timeLeft;
    const pctElapsed = mockState.durationSec ? (elapsed / mockState.durationSec) : 0;
    if (pctElapsed > 0.8) return 'Phase 4: Sanity Check & Pyramid Pitch!';
    if (pctElapsed > 0.35) return 'Phase 3: Assume & Compute Out Loud';
    if (pctElapsed > 0.15) return 'Phase 2: Build MECE Issue Tree';
    return 'Phase 1: Clarify Scope (0–1.5m)';
  }

  function formatMockPitchHtml(computedNodes, finalComputed) {
    return `“Based on a structured breakdown, my final estimate is roughly <strong>${formatIndian(finalComputed)}</strong>. Starting from ${esc(computedNodes[0]?.label || 'the base')} (${formatIndian(parseFloat(computedNodes[0]?.val) || 0)}), the key drivers are ${computedNodes.slice(1, 4).map(x => `${esc(x.label)} (${x.op === 'pct' ? (x.val || 0) + '%' : (x.val || 0)})`).join(', ')}. ${mockState.sanityNote ? 'As a sanity check: ' + esc(mockState.sanityNote) : 'To sanity-check this figure, I’d verify the per-capita/per-unit implied rate against real benchmarks.'}”`;
  }

  function updateMockTimerUI() {
    const timerEl = document.getElementById('mock-timer-display');
    if (timerEl) {
      const mins = Math.floor(mockState.timeLeft / 60);
      const secs = String(mockState.timeLeft % 60).padStart(2, '0');
      timerEl.textContent = `${mins}:${secs}`;
      timerEl.style.color = mockState.timeLeft <= 60 ? 'var(--danger)' : '';
      timerEl.style.borderColor = mockState.timeLeft <= 60 ? 'var(--danger)' : '';
    }
    const phaseEl = document.getElementById('mock-phase-badge');
    if (phaseEl) phaseEl.textContent = getMockPhaseLabel();
    const startBtn = document.getElementById('mock-start-pause');
    if (startBtn) startBtn.textContent = mockState.running ? '⏸ Pause' : '▶ Start Timer';
  }

  function updateMockWorkbenchCalc() {
    const computedNodes = computeWorkbenchNodes();
    const finalComputed = computedNodes.length ? computedNodes[computedNodes.length - 1].computed : 0;
    computedNodes.forEach((n, idx) => {
      const subEl = document.querySelector(`[data-wb-sub="${idx}"]`);
      if (subEl) subEl.textContent = `= ${formatIndian(n.computed)}`;
    });
    const finalEl = document.getElementById('wb-final-val');
    if (finalEl) finalEl.textContent = formatIndian(finalComputed);
    const pitchEl = document.getElementById('wb-pitch-box');
    if (pitchEl) pitchEl.innerHTML = formatMockPitchHtml(computedNodes, finalComputed);
  }

  function renderMock() {
    const prob = getProblem(mockState.problemId);
    const mins = Math.floor(mockState.timeLeft / 60);
    const secs = String(mockState.timeLeft % 60).padStart(2, '0');
    const phaseLabel = getMockPhaseLabel();

    const computedNodes = computeWorkbenchNodes();
    const finalComputed = computedNodes.length ? computedNodes[computedNodes.length - 1].computed : 0;

    return `
      <div class="page-header">
        <div>
          <h1>Timed Mock Interview &amp; Workbench</h1>
          <p>Simulate live interview pacing, clarify scope with the interviewer, and calculate your tree.</p>
        </div>
      </div>
      <div class="card" style="margin-bottom:14px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
          <div style="min-width:0;flex:1 1 280px;">
            <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-bottom:6px;">
              <span class="pill pill-purple">Mock Interview Simulator</span>
              <span class="pill pill-blue">${esc(prob.company)} · ${diffDots(prob.difficulty)}</span>
              <span class="pill pill-warn" id="mock-phase-badge">${esc(phaseLabel)}</span>
            </div>
            <h2 style="margin:0;font-size:19px;">“${esc(prob.prompt)}”</h2>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <span class="timer-pill" id="mock-timer-display" style="${mockState.timeLeft <= 60 ? 'color:var(--danger);border-color:var(--danger);' : ''}">${mins}:${secs}</span>
            <button class="btn btn-primary btn-sm" id="mock-start-pause">${mockState.running ? '⏸ Pause' : '▶ Start Timer'}</button>
            <button class="btn btn-sm" id="mock-reset-timer">↺ Reset (${state.mockDurationMins || 10}m)</button>
            <button class="btn btn-sm btn-secondary" id="mock-random-btn">🎲 New Prompt</button>
          </div>
        </div>
      </div>

      <div class="grid-2" style="align-items:start;">
        <!-- Left: Live Interactive Issue-Tree & Calculator Workbench -->
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
            <h3 style="margin:0;font-size:16px;">🌳 Your Live Issue-Tree Scratchpad</h3>
            <button class="btn btn-sm btn-primary" id="wb-add-node">+ Add Step</button>
          </div>
          <p style="font-size:12.5px;color:var(--text-muted);margin:0 0 12px;">Build your funnel top-to-bottom. Each step transforms the running value automatically!</p>

          <div id="wb-nodes-container">
            ${computedNodes.map((n, idx) => `
              <div class="wb-node-row" data-wb-idx="${idx}">
                <span style="font-size:11px;font-weight:700;color:var(--text-dim);width:18px;">#${idx + 1}</span>
                <input type="text" class="wb-label" data-wb-idx="${idx}" value="${esc(n.label)}" placeholder="Step name" />
                <select class="wb-op" data-wb-idx="${idx}" ${idx === 0 ? 'disabled' : ''}>
                  <option value="base" ${n.op === 'base' ? 'selected' : ''}>Base =</option>
                  <option value="pct" ${n.op === 'pct' ? 'selected' : ''}>× %</option>
                  <option value="mul" ${n.op === 'mul' ? 'selected' : ''}>× Val</option>
                  <option value="div" ${n.op === 'div' ? 'selected' : ''}>÷ Val</option>
                  <option value="add" ${n.op === 'add' ? 'selected' : ''}>+ Val</option>
                  <option value="sub" ${n.op === 'sub' ? 'selected' : ''}>- Val</option>
                </select>
                <input type="number" step="any" class="wb-val" data-wb-idx="${idx}" value="${esc(n.val)}" />
                <span class="tree-node-val" data-wb-sub="${idx}" title="Running subtotal">= ${formatIndian(n.computed)}</span>
                ${idx > 0 ? `<button class="btn btn-sm btn-danger wb-del" data-wb-idx="${idx}" style="padding:4px 8px;">✕</button>` : ''}
              </div>
            `).join('')}
          </div>

          <div class="live-result-bar" style="margin-top:14px;">
            <div>
              <div style="font-size:11px;text-transform:uppercase;font-weight:700;color:var(--accent-bright);">Your Workbench Estimate</div>
              <div style="font-size:21px;font-weight:800;" id="wb-final-val">${formatIndian(finalComputed)}</div>
            </div>
            <button class="btn btn-sm btn-primary" id="mock-complete-btn">✓ Complete Mock</button>
          </div>

          <div class="section-block" style="margin-top:14px;">
            <strong style="font-size:13px;">🎤 Auto-Generated 30-Sec Pyramid Synthesis Pitch</strong>
            <div class="script-box" style="margin-top:8px;font-size:12.5px;" id="wb-pitch-box">${formatMockPitchHtml(computedNodes, finalComputed)}</div>
            <input type="text" class="input" id="mock-sanity-input" style="margin-top:8px;" placeholder="Add your sanity check sentence to include in the pitch..." value="${esc(mockState.sanityNote)}" />
          </div>
        </div>

        <!-- Right: Simulated Interviewer Panel -->
        <div class="card">
          <h3 style="margin:0 0 10px;font-size:16px;">🧑‍💼 Simulated Interviewer Persona</h3>
          <p style="font-size:12.5px;color:var(--text-muted);margin:0 0 12px;">Click questions below to ask the interviewer for scope clarifications, or trigger a curveball twist mid-case!</p>

          <div class="section-block" style="margin-bottom:12px;">
            <strong style="font-size:13px;">1. Ask Clarifying Questions</strong>
            <div style="margin-top:8px;display:flex;flex-direction:column;gap:6px;">
              ${(prob.clarifyingQuestions || []).map((cq, idx) => `
                <div>
                  <button class="btn btn-sm btn-block-left" data-mock-clarify="${idx}">
                    ❓ ${esc(cq.q)}
                  </button>
                  ${mockState.clarifiedIdx[idx] ? `<div style="font-size:12.5px;color:var(--accent-bright);padding:4px 8px;">💬 "${esc(cq.a)}"</div>` : ''}
                </div>
              `).join('')}
            </div>
          </div>

          <div class="section-block" style="margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
              <strong style="font-size:13px;">2. Mid-Case Curveball Twist</strong>
              <button class="btn btn-sm btn-warn" id="mock-curveball-btn">${mockState.showVariation ? 'Hide Curveball' : '⚡ Throw Curveball'}</button>
            </div>
            ${mockState.showVariation ? `
              <div class="bad-box" style="margin-top:8px;font-size:13px;">
                <strong>Interviewer interrupts:</strong> "${esc((prob.variations && prob.variations[0]) ? prob.variations[0].question : 'How would your estimate change in a Tier-2 city?')}"
                <div style="margin-top:4px;font-size:12px;color:var(--text-muted);">Hint: ${esc((prob.variations && prob.variations[0]) ? prob.variations[0].hint : 'Adjust purchasing power & penetration downward.')}</div>
              </div>
            ` : ''}
          </div>

          <div class="section-block">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
              <strong style="font-size:13px;">3. Compare Against Reference Solution</strong>
              <button class="btn btn-sm" id="mock-reveal-sol-btn">${mockState.showSolutionRef ? 'Hide Reference' : '👁️ Reveal Answer & Tree'}</button>
            </div>
            ${mockState.showSolutionRef ? `
              <div style="margin-top:10px;">
                <div class="good-box" style="margin-bottom:8px;">
                  <strong>Reference Answer:</strong> ${esc(prob.finalAnswer)}<br/>
                  <strong>Sanity Check:</strong> ${esc(prob.sanityCheck)}
                </div>
                <div class="issue-tree-wrap">${renderTreeNode(prob.tree)}</div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  function renderCheatSheetCards(qText) {
    const q = (qText || '').trim().toLowerCase();
    const cardsHtml = (CHEATSHEET.sections || []).map(sec => {
      const items = sec.items.filter(it => !q || `${it.label} ${it.value} ${it.note}`.toLowerCase().includes(q));
      if (!items.length) return '';
      return `
        <div class="card">
          <h3 style="margin:0 0 2px;font-size:16px;">${esc(sec.title)}</h3>
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px;">${esc(sec.subtitle)}</div>
          ${items.map(it => `
            <div class="cs-item">
              <div>
                <div class="cs-label">${esc(it.label)}</div>
                <div class="cs-note">${esc(it.note)}</div>
              </div>
              <div class="cs-val">${esc(it.value)}</div>
            </div>
          `).join('')}
        </div>
      `;
    }).join('');
    return cardsHtml || `<div class="card-flat" style="grid-column:1/-1;">No benchmarks match “${esc(qText)}”.</div>`;
  }

  function renderDrillOptionsHtml(qObj) {
    if (!qObj) return '';
    return qObj.options.map((opt, idx) => `
      <button class="quiz-opt" data-drill-opt="${idx}">
        <span>${esc(opt)}</span>
        <span class="drill-key-hint">${idx + 1}</span>
      </button>
    `).join('');
  }

  // ==================== VIEW 6: MEMORIZE & DRILL ====================
  function renderMemorize() {
    const tab = state.memorizeTab || 'cheatsheet';
    const tabsHtml = `
      <div class="page-header">
        <div>
          <h1>Memorize Benchmarks &amp; Rapid Math</h1>
          <p>Study core demographics, flip through 40 flashcards, and sharpen speed with the 60s drill.</p>
        </div>
      </div>
      <div class="tab-bar">
        <button class="tab-btn ${tab === 'cheatsheet' ? 'active' : ''}" data-mem-tab="cheatsheet">📋 Master Cheat Sheet</button>
        <button class="tab-btn ${tab === 'flashcards' ? 'active' : ''}" data-mem-tab="flashcards">🗂️ Flashcard Deck (${(CHEATSHEET.flashcards || []).length})</button>
        <button class="tab-btn ${tab === 'drill' ? 'active' : ''}" data-mem-tab="drill">⚡ 60s Rapid-Fire Math &amp; Benchmark Drill</button>
      </div>
    `;

    let body = '';
    if (tab === 'cheatsheet') {
      body = `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;" class="no-print">
          <input type="text" class="input" id="cs-search" style="width:100%;max-width:360px;flex:1 1 200px;min-width:0;" placeholder="Filter benchmarks (e.g. Mumbai, UPI, household, gallon)..." value="${esc(cheatSearch)}" />
          <button class="btn btn-secondary btn-sm" onclick="window.print()">🖨️ Print Cheat Sheet</button>
        </div>
        <div class="grid-2" id="cs-grid-container">
          ${renderCheatSheetCards(cheatSearch)}
        </div>
      `;
    } else if (tab === 'flashcards') {
      const cards = CHEATSHEET.flashcards || [];
      const cats = ['All', ...new Set(cards.map(c => c.category))];
      const filtered = cards.filter(c => {
        if (flashState.category !== 'All' && c.category !== flashState.category) return false;
        if (flashState.onlyReview && state.flashcardStatus[c.id] === 'mastered') return false;
        return true;
      });
      if (flashState.index >= filtered.length) flashState.index = 0;
      const card = filtered[flashState.index];
      const masteredTotal = cards.filter(c => state.flashcardStatus[c.id] === 'mastered').length;

      body = `
        <div class="flashcard-stage">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
              <select class="select" id="fc-cat" style="width:160px;max-width:100%;">
                ${cats.map(c => `<option ${flashState.category === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}
              </select>
              <label style="font-size:13px;display:flex;align-items:center;gap:5px;cursor:pointer;">
                <input type="checkbox" id="fc-only-review" ${flashState.onlyReview ? 'checked' : ''} /> Needs Review Only
              </label>
            </div>
            <span class="pill pill-green">${masteredTotal}/${cards.length} Mastered</span>
          </div>

          ${card ? `
            <div class="flashcard" id="fc-card-box">
              <div class="flashcard-header">
                <span class="flashcard-face-label">${flashState.flipped ? 'ANSWER · CLICK TO FLIP BACK' : 'QUESTION · CLICK TO REVEAL'} (${flashState.index + 1}/${filtered.length})</span>
                <span class="pill pill-blue">${esc(card.category)}</span>
              </div>
              <div class="flashcard-body">
                ${!flashState.flipped ? `
                  <h2 style="margin:0;font-size:21px;max-width:520px;width:100%;">${esc(card.front)}</h2>
                  <div style="margin-top:8px;font-size:12.5px;color:var(--text-dim);">Click anywhere on card to flip</div>
                ` : `
                  <div style="font-size:22px;font-weight:800;color:var(--accent-bright);white-space:pre-line;max-width:100%;">${esc(card.back)}</div>
                  <div class="tip-box" style="max-width:520px;text-align:left;">💡 ${esc(card.tip)}</div>
                `}
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;gap:10px;flex-wrap:wrap;">
              <button class="btn" id="fc-prev">← Previous</button>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <button class="btn btn-warn" id="fc-mark-review">🔁 Need Review</button>
                <button class="btn btn-primary" id="fc-mark-mastered">✓ Got It!</button>
              </div>
              <button class="btn" id="fc-next">Next →</button>
            </div>
          ` : '<div class="card">All cards in this filter are mastered! Uncheck "Needs Review Only" to browse all.</div>'}
        </div>
      `;
    } else {
      const qObj = drillState.questions[drillState.currentIdx];
      const accPct = drillState.answered ? Math.round((drillState.correctCount / drillState.answered) * 100) : 0;
      body = `
        <div class="flashcard-stage">
          <div class="card" id="drill-card-box">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
              <div>
                <h3 style="margin:0;">⚡ 60-Second Rapid-Fire Consulting Drill</h3>
                <div style="font-size:12.5px;color:var(--text-muted);">Test your India anchors, unit conversions, and rapid mental math.</div>
              </div>
              <span class="pill pill-purple" id="drill-best-pill">Best Score: ${state.bestDrillScore} pts</span>
            </div>

            ${!drillState.active ? `
              <div style="text-align:center;padding:18px 10px;">
                ${drillState.completed ? `
                  <div class="good-box" style="margin-bottom:14px;">
                    <h2 style="margin:0 0 6px;">⏱️ Time’s Up! Final Score: ${drillState.score} pts ${drillState.beatBest ? '🏆 New Best!' : ''}</h2>
                    <div>Answered ${drillState.answered} (${drillState.correctCount} correct · ${accPct}% accuracy) · Best Streak: ${drillState.bestStreak}</div>
                  </div>
                ` : ''}
                <button class="btn btn-primary" id="start-drill-btn" style="font-size:14.5px;padding:10px 22px;">▶ ${drillState.completed ? 'Play Again (60s)' : 'Start 60-Second Drill'}</button>
                <p style="margin:10px auto 0;max-width:440px;font-size:11.5px;color:var(--text-muted);">Complete the full 60s to save your Best Score. Quitting or leaving early resets the drill without saving. Tip: Use keys 1–4 for speed!</p>
              </div>
            ` : `
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
                <span class="timer-pill" id="drill-timer-pill" style="${drillState.timeLeft <= 10 ? 'color:var(--danger);border-color:var(--danger);' : ''}">⏱️ ${drillState.timeLeft}s</span>
                <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
                  <span class="pill pill-green" id="drill-score-pill">Score: ${drillState.score}</span>
                  <span class="pill pill-warn" id="drill-streak-pill">Streak: ${drillState.streak}🔥</span>
                  <span class="pill" id="drill-count-pill">Q: ${drillState.answered}</span>
                  <button class="btn btn-sm btn-danger" id="quit-drill-btn">✕ Quit &amp; Reset</button>
                </div>
              </div>
              ${qObj ? `
                <div class="section-block">
                  <div id="drill-question-text" style="font-size:15px;font-weight:700;margin-bottom:8px;">${esc(qObj.q)}</div>
                  <div class="drill-feedback-slot" id="drill-feedback-slot">Pick an option or press keys 1–4</div>
                  <div class="drill-options-grid" id="drill-options-grid">
                    ${renderDrillOptionsHtml(qObj)}
                  </div>
                </div>
              ` : ''}
            `}
          </div>
        </div>
      `;
    }

    return tabsHtml + body;
  }

  // ==================== MAIN RENDER & EVENT WIRING ====================
  function render() {
    applyTheme();
    updateSidebarStats();
    const container = document.getElementById('main-content');
    if (!container) return;

    if (state.view === 'dashboard') container.innerHTML = renderDashboard();
    else if (state.view === 'academy') container.innerHTML = renderAcademy();
    else if (state.view === 'library') container.innerHTML = renderLibrary();
    else if (state.view === 'practice') container.innerHTML = renderPractice();
    else if (state.view === 'mock') container.innerHTML = renderMock();
    else if (state.view === 'memorize') container.innerHTML = renderMemorize();

    attachDynamicListeners();
  }

  function attachDynamicListeners() {
    // Roadmap checkboxes
    document.querySelectorAll('[data-roadmap-task]').forEach(cb => {
      cb.addEventListener('change', (e) => {
        state.roadmapDone[e.target.dataset.roadmapTask] = e.target.checked;
        saveState();
        render();
      });
    });

    // Jump buttons
    document.querySelectorAll('[data-jump-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        const v = btn.dataset.jumpView;
        const t = btn.dataset.jumpTab;
        setView(v, {
          academyTab: v === 'academy' && t ? t : undefined,
          memorizeTab: v === 'memorize' && t ? t : undefined
        });
      });
    });

    // Open problem in library
    document.querySelectorAll('[data-open-problem]').forEach(btn => {
      btn.addEventListener('click', () => setView('library', { problemId: btn.dataset.openProblem }));
    });

    function attachLibraryDetailListeners(root = document) {
      root.querySelectorAll('[data-practice-id]').forEach(btn => {
        btn.addEventListener('click', () => {
          startGuidedProblem(btn.dataset.practiceId);
          setView('practice');
        });
      });

      root.querySelectorAll('[data-mock-id]').forEach(btn => {
        btn.addEventListener('click', () => {
          initMockProblem(btn.dataset.mockId);
          setView('mock');
        });
      });

      const progBtn = root.querySelector('#toggle-progressive-btn');
      if (progBtn) {
        progBtn.addEventListener('click', () => {
          state.progressiveMode = !state.progressiveMode;
          state.studyRevealStep = state.progressiveMode ? 1 : 99;
          saveState();
          renderProblemDetailInPlace();
        });
      }

      const revNextBtn = root.querySelector('#reveal-next-step-btn');
      if (revNextBtn) {
        revNextBtn.addEventListener('click', () => {
          state.studyRevealStep = Math.min(6, state.studyRevealStep + 1);
          saveState();
          renderProblemDetailInPlace();
        });
      }

      root.querySelectorAll('[data-toggle-master]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.toggleMaster;
          state.masteredIds[id] = !state.masteredIds[id];
          saveState();
          if (state.view === 'library') {
            updateSidebarStats();
            updateLibraryResults(true);
          } else {
            render();
          }
        });
      });

      root.querySelectorAll('[data-toggle-bookmark]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.toggleBookmark;
          state.bookmarkedIds[id] = !state.bookmarkedIds[id];
          saveState();
          if (state.view === 'library') {
            updateSidebarStats();
            updateLibraryResults(true);
          } else {
            render();
          }
        });
      });

      const detailPanel = root.querySelector('#detail-panel');
      if (detailPanel) {
        const prob = getProblem(detailPanel.dataset.probId);
        const sliders = root.querySelectorAll('.model-slider');
        if (sliders.length && prob && prob.interactiveModel) {
          const updateSliders = () => {
            const vars = {};
            sliders.forEach(sl => {
              const val = parseFloat(sl.value);
              vars[sl.dataset.varKey] = val;
              const label = document.getElementById(`sval-${sl.dataset.varKey}`);
              if (label) label.textContent = `${val} ${sl.dataset.unit}`;
            });
            const res = prob.interactiveModel.compute(vars);
            const fEl = document.getElementById('live-model-formatted');
            const bEl = document.getElementById('live-model-breakdown');
            if (fEl) fEl.textContent = res.formatted;
            if (bEl) bEl.innerHTML = res.breakdown.map(b => `<div><div style="font-size:11px;color:var(--text-muted);">${esc(b.label)}</div><strong>${esc(b.val)}</strong></div>`).join('');
          };
          sliders.forEach(sl => sl.addEventListener('input', updateSliders));
        }
      }
    }

    function syncLibraryListHeight() {
      const listPanel = document.getElementById('lib-list-panel');
      const detailWrap = document.getElementById('lib-detail-wrap');
      if (!listPanel || !detailWrap) return;

      if (window.innerWidth <= 980) {
        listPanel.style.maxHeight = '';
        listPanel.style.removeProperty('--lib-sticky-top');
        return;
      }

      const topbar = document.querySelector('.topbar');
      const stickyTop = (topbar ? Math.ceil(topbar.getBoundingClientRect().height) : 50) + 12;
      listPanel.style.setProperty('--lib-sticky-top', `${stickyTop}px`);

      const viewportCap = Math.max(240, window.innerHeight - stickyTop - 16);
      const rightH = Math.ceil(detailWrap.getBoundingClientRect().height);
      const hasItems = !!listPanel.querySelector('.problem-list-item');
      if (rightH > 0) {
        const targetMax = hasItems
          ? (rightH < 220 ? Math.min(viewportCap, Math.max(120, rightH)) : Math.max(220, Math.min(viewportCap, rightH)))
          : Math.min(viewportCap, Math.max(80, rightH));
        listPanel.style.maxHeight = `${targetMax}px`;
      } else {
        listPanel.style.maxHeight = `${viewportCap}px`;
      }
    }

    function observeLibraryDetailHeight() {
      if (libResizeObserver) {
        libResizeObserver.disconnect();
        libResizeObserver = null;
      }
      syncLibraryListHeight();
      const detailWrap = document.getElementById('lib-detail-wrap');
      if (typeof ResizeObserver === 'function' && detailWrap) {
        libResizeObserver = new ResizeObserver(() => syncLibraryListHeight());
        libResizeObserver.observe(detailWrap);
      }
    }

    function renderProblemDetailInPlace() {
      const wrap = document.getElementById('lib-detail-wrap');
      if (!wrap) return;
      const filtered = getFilteredProblems();
      const activeProb = filtered.find(p => p.id === state.selectedProblemId) || filtered[0] || null;
      wrap.innerHTML = renderProblemDetail(activeProb);
      attachLibraryDetailListeners(wrap);
      syncLibraryListHeight();
    }

    function bindLibraryListClicks() {
      document.querySelectorAll('[data-select-prob]').forEach(el => {
        el.addEventListener('click', () => {
          state.selectedProblemId = el.dataset.selectProb;
          state.studyRevealStep = state.progressiveMode ? 1 : 99;
          saveState();
          document.querySelectorAll('#lib-list-panel .problem-list-item.selected').forEach(x => x.classList.remove('selected'));
          el.classList.add('selected');
          renderProblemDetailInPlace();
          if (window.innerWidth > 980) {
            const detailWrap = document.getElementById('lib-detail-wrap');
            const topbar = document.querySelector('.topbar');
            const stickyTop = (topbar ? Math.ceil(topbar.getBoundingClientRect().height) : 50) + 12;
            if (detailWrap && detailWrap.getBoundingClientRect().top < stickyTop) {
              const targetY = Math.max(0, window.scrollY + detailWrap.getBoundingClientRect().top - stickyTop);
              window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
          }
        });
      });
    }

    window.__gmUpdateLibraryResults = function updateLibraryResults(forceDetail = false) {
      const listPanel = document.getElementById('lib-list-panel');
      const countEl = document.getElementById('lib-count-text');
      const detailWrap = document.getElementById('lib-detail-wrap');
      if (!listPanel || !detailWrap) return;

      const prevSelectedId = state.selectedProblemId;
      const filtered = getFilteredProblems();
      if (!filtered.some(p => p.id === state.selectedProblemId)) {
        state.selectedProblemId = filtered[0] ? filtered[0].id : null;
      }
      const activeProb = filtered.find(p => p.id === state.selectedProblemId) || filtered[0] || null;

      if (countEl) countEl.innerHTML = `Showing <strong>${filtered.length}</strong> of ${PROBLEMS.length} solved guesstimates`;
      listPanel.innerHTML = renderLibraryListHtml(filtered, activeProb);
      bindLibraryListClicks();

      if (forceDetail || prevSelectedId !== (activeProb && activeProb.id)) {
        detailWrap.innerHTML = renderProblemDetail(activeProb);
        attachLibraryDetailListeners(detailWrap);
      }
      syncLibraryListHeight();
    };

    window.__gmSyncLibraryListHeight = syncLibraryListHeight;

    attachLibraryDetailListeners(document);
    bindLibraryListClicks();
    if (state.view === 'library') {
      observeLibraryDetailHeight();
    }

    // Academy tabs & wizard
    document.querySelectorAll('[data-acad-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.academyTab = btn.dataset.acadTab;
        saveState();
        render();
      });
    });

    document.querySelectorAll('[data-wiz-q]').forEach(btn => {
      btn.addEventListener('click', () => {
        wizardAnswers[btn.dataset.wizQ] = btn.dataset.wizV;
        render();
      });
    });

    document.querySelectorAll('[data-sc-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.scenarioAnswers[btn.dataset.scId] = Number(btn.dataset.scOpt);
        saveState();
        render();
      });
    });

    // Library filters & selection (in-place DOM updates preserve focus & caret)
    const bindFilter = (id, key) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener(el.tagName === 'INPUT' ? 'input' : 'change', (e) => {
          state.filters[key] = e.target.value;
          if (id === 'lib-search') {
            saveStateDebounced();
            const gs = document.getElementById('global-search');
            if (gs) gs.value = e.target.value;
            if (typeof window.__gmUpdateLibraryResults === 'function') window.__gmUpdateLibraryResults(false);
          } else {
            saveState();
            if (typeof window.__gmUpdateLibraryResults === 'function') window.__gmUpdateLibraryResults(true);
          }
        });
      }
    };
    bindFilter('lib-search', 'search');
    bindFilter('lib-source', 'source');
    bindFilter('lib-company', 'company');
    bindFilter('lib-archetype', 'archetype');
    bindFilter('lib-diff', 'difficulty');
    bindFilter('lib-status', 'status');

    const clearBtn = document.getElementById('clear-filters-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        state.filters = { ...defaultState.filters };
        const gs = document.getElementById('global-search');
        if (gs) gs.value = '';
        const ls = document.getElementById('lib-search');
        if (ls) ls.value = '';
        const src = document.getElementById('lib-source'); if (src) src.value = 'All';
        const cmp = document.getElementById('lib-company'); if (cmp) cmp.value = 'All';
        const arc = document.getElementById('lib-archetype'); if (arc) arc.value = 'All';
        const dif = document.getElementById('lib-diff'); if (dif) dif.value = 'All';
        const stt = document.getElementById('lib-status'); if (stt) stt.value = 'All';
        saveState();
        if (typeof window.__gmUpdateLibraryResults === 'function') window.__gmUpdateLibraryResults(true);
      });
    }

    // Guided Practice listeners
    const gpSel = document.getElementById('guided-prob-select');
    if (gpSel) {
      gpSel.addEventListener('change', (e) => {
        startGuidedProblem(e.target.value);
        render();
      });
    }

    const pickByDiff = (minD, maxD) => {
      const pool = PROBLEMS.filter(p => p.difficulty >= minD && p.difficulty <= maxD);
      const pick = pool[Math.floor(Math.random() * pool.length)] || PROBLEMS[0];
      startGuidedProblem(pick.id);
      render();
    };
    const rEasy = document.getElementById('guided-random-easy');
    const rMed = document.getElementById('guided-random-med');
    const rHard = document.getElementById('guided-random-hard');
    if (rEasy) rEasy.addEventListener('click', () => pickByDiff(1, 2));
    if (rMed) rMed.addEventListener('click', () => pickByDiff(3, 3));
    if (rHard) rHard.addEventListener('click', () => pickByDiff(4, 5));

    document.querySelectorAll('[data-guided-step]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.guided.step = Number(btn.dataset.guidedStep);
        saveState();
        render();
      });
    });

    document.querySelectorAll('[data-clarify-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.guided.clarifyRevealed[btn.dataset.clarifyIdx] = true;
        saveState();
        render();
      });
    });

    document.querySelectorAll('[data-guided-approach]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.guided.selectedApproach = btn.dataset.guidedApproach;
        saveState();
        render();
      });
    });

    document.querySelectorAll('[data-guided-funnel]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.guided.selectedFunnelIdx = Number(btn.dataset.guidedFunnel);
        saveState();
        render();
      });
    });

    const calcRun = document.getElementById('guided-calc-run');
    const calcInput = document.getElementById('guided-calc-expr');
    if (calcInput) {
      calcInput.addEventListener('input', (e) => {
        state.guided.calcInput = e.target.value;
        saveStateDebounced();
      });
    }
    if (calcRun && calcInput) {
      const evalCalc = () => {
        const expr = calcInput.value.trim();
        state.guided.calcInput = expr;
        if (/^[0-9+\-*/().\s]+$/.test(expr)) {
          try {
            const val = Function(`"use strict"; return (${expr});`)();
            state.guided.calcResult = isFinite(val) ? `${val.toLocaleString('en-IN')} (${formatIndian(val)})` : 'Invalid';
          } catch {
            state.guided.calcResult = 'Syntax error';
          }
        } else {
          state.guided.calcResult = 'Only numbers and + - * / ( ) allowed';
        }
        saveState();
        const outEl = document.getElementById('guided-calc-out');
        if (outEl) outEl.textContent = state.guided.calcResult ? `Result: ${state.guided.calcResult}` : '';
      };
      calcRun.addEventListener('click', evalCalc);
      calcInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          evalCalc();
        }
      });
    }

    const checkEstBtn = document.getElementById('guided-check-est');
    const estValEl = document.getElementById('guided-est-val');
    if (estValEl) {
      estValEl.addEventListener('input', (e) => {
        state.guided.userEstimate = e.target.value;
        saveStateDebounced();
      });
    }
    if (checkEstBtn && estValEl) {
      const checkEstimate = () => {
        const val = parseFloat(estValEl.value);
        state.guided.userEstimate = estValEl.value;
        const prob = getProblem(state.guided.problemId);
        const r = prob.acceptableRange;
        if (isNaN(val)) {
          state.guided.gradeResult = { ok: false, msg: 'Please enter a numerical estimate first.' };
        } else if (val >= r.min && val <= r.max) {
          state.guided.gradeResult = { ok: true, msg: `🎯 Bullseye! ${val.toLocaleString('en-IN')} ${r.unit} falls right inside the acceptable consulting ballpark (${r.display})!` };
        } else if (val >= r.min * 0.4 && val <= r.max * 2.5) {
          state.guided.gradeResult = { ok: true, msg: `👍 Same Order of Magnitude! Your ${val.toLocaleString('en-IN')} ${r.unit} is close to the ballpark (${r.display}). Check one assumption to tighten!` };
        } else {
          state.guided.gradeResult = { ok: false, msg: `⚠️ Off by an order of magnitude vs target (${r.display}). Double-check unit conversions (Crore vs Million, or lifespan division)!` };
        }
        saveState();
        const gradeOut = document.getElementById('guided-grade-out');
        if (gradeOut) {
          const gr = state.guided.gradeResult;
          gradeOut.innerHTML = gr ? `<div class="${gr.ok ? 'good-box' : 'bad-box'}" style="margin-top:8px;font-size:12.5px;">${esc(gr.msg)}</div>` : '';
        }
      };
      checkEstBtn.addEventListener('click', checkEstimate);
      estValEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          checkEstimate();
        }
      });
    }

    const sanityTxt = document.getElementById('guided-sanity-txt');
    if (sanityTxt) {
      sanityTxt.addEventListener('input', (e) => {
        state.guided.sanityInput = e.target.value;
        saveStateDebounced();
      });
    }

    const nextUnmasteredBtn = document.getElementById('guided-next-unmastered');
    if (nextUnmasteredBtn) {
      nextUnmasteredBtn.addEventListener('click', () => {
        const next = PROBLEMS.find(p => !state.masteredIds[p.id] && p.id !== state.guided.problemId) || PROBLEMS[0];
        startGuidedProblem(next.id);
        render();
      });
    }

    // Mock Simulator listeners
    const mockStartBtn = document.getElementById('mock-start-pause');
    if (mockStartBtn) {
      mockStartBtn.addEventListener('click', () => {
        if (mockState.running) {
          clearInterval(mockState.timerId);
          mockState.running = false;
          updateMockTimerUI();
        } else {
          clearInterval(mockState.timerId);
          mockState.running = true;
          updateMockTimerUI();
          mockState.timerId = setInterval(() => {
            if (!mockState.running) return;
            if (mockState.timeLeft > 0) {
              mockState.timeLeft--;
              updateMockTimerUI();
              if (mockState.timeLeft <= 0) {
                clearInterval(mockState.timerId);
                mockState.running = false;
                updateMockTimerUI();
              }
            } else {
              clearInterval(mockState.timerId);
              mockState.running = false;
              updateMockTimerUI();
            }
          }, 1000);
        }
      });
    }

    const mockResetBtn = document.getElementById('mock-reset-timer');
    if (mockResetBtn) {
      mockResetBtn.addEventListener('click', () => {
        clearInterval(mockState.timerId);
        mockState.running = false;
        mockState.timeLeft = mockState.durationSec;
        updateMockTimerUI();
      });
    }

    const mockRandBtn = document.getElementById('mock-random-btn');
    if (mockRandBtn) {
      mockRandBtn.addEventListener('click', () => {
        const pick = PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)];
        initMockProblem(pick.id);
        render();
      });
    }

    const mockCompBtn = document.getElementById('mock-complete-btn');
    if (mockCompBtn) {
      mockCompBtn.addEventListener('click', () => {
        clearInterval(mockState.timerId);
        mockState.running = false;
        state.mocksCompleted++;
        state.masteredIds[mockState.problemId] = true;
        saveState();
        mockState.showSolutionRef = true;
        render();
      });
    }

    document.querySelectorAll('[data-mock-clarify]').forEach(btn => {
      btn.addEventListener('click', () => {
        mockState.clarifiedIdx[btn.dataset.mockClarify] = true;
        render();
      });
    });

    const curveBtn = document.getElementById('mock-curveball-btn');
    if (curveBtn) curveBtn.addEventListener('click', () => { mockState.showVariation = !mockState.showVariation; render(); });

    const solRefBtn = document.getElementById('mock-reveal-sol-btn');
    if (solRefBtn) solRefBtn.addEventListener('click', () => { mockState.showSolutionRef = !mockState.showSolutionRef; render(); });

    const mockSanityEl = document.getElementById('mock-sanity-input');
    if (mockSanityEl) {
      mockSanityEl.addEventListener('input', (e) => {
        mockState.sanityNote = e.target.value;
        updateMockWorkbenchCalc();
      });
    }

    // Workbench node editing (all in-place updates so typing never drops focus)
    const wbAdd = document.getElementById('wb-add-node');
    if (wbAdd) {
      wbAdd.addEventListener('click', () => {
        mockState.nodes.push({ id: Date.now(), label: 'Next Filter / Factor', op: 'pct', val: 50 });
        render();
      });
    }
    document.querySelectorAll('.wb-del').forEach(btn => {
      btn.addEventListener('click', () => {
        mockState.nodes.splice(Number(btn.dataset.wbIdx), 1);
        render();
      });
    });
    document.querySelectorAll('.wb-label').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const idx = Number(e.target.dataset.wbIdx);
        if (mockState.nodes[idx]) {
          mockState.nodes[idx].label = e.target.value;
          updateMockWorkbenchCalc();
        }
      });
    });
    document.querySelectorAll('.wb-op').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const idx = Number(e.target.dataset.wbIdx);
        if (mockState.nodes[idx]) {
          mockState.nodes[idx].op = e.target.value;
          updateMockWorkbenchCalc();
        }
      });
    });
    document.querySelectorAll('.wb-val').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const idx = Number(e.target.dataset.wbIdx);
        if (mockState.nodes[idx]) {
          mockState.nodes[idx].val = e.target.value;
          updateMockWorkbenchCalc();
        }
      });
    });

    // Memorize tabs & Cheat sheet & Flashcards & Drill
    document.querySelectorAll('[data-mem-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const nextTab = btn.dataset.memTab;
        if (drillState.active && nextTab !== 'drill') {
          abortRapidDrill();
        }
        state.memorizeTab = nextTab;
        saveState();
        render();
      });
    });

    const csSearch = document.getElementById('cs-search');
    if (csSearch) {
      csSearch.addEventListener('input', (e) => {
        cheatSearch = e.target.value;
        const grid = document.getElementById('cs-grid-container');
        if (grid) grid.innerHTML = renderCheatSheetCards(cheatSearch);
      });
    }

    const fcCat = document.getElementById('fc-cat');
    if (fcCat) fcCat.addEventListener('change', (e) => { flashState.category = e.target.value; flashState.index = 0; flashState.flipped = false; render(); });
    const fcRev = document.getElementById('fc-only-review');
    if (fcRev) fcRev.addEventListener('change', (e) => { flashState.onlyReview = e.target.checked; flashState.index = 0; flashState.flipped = false; render(); });
    const fcBox = document.getElementById('fc-card-box');
    if (fcBox) fcBox.addEventListener('click', () => { flashState.flipped = !flashState.flipped; render(); });
    const fcPrev = document.getElementById('fc-prev');
    if (fcPrev) fcPrev.addEventListener('click', () => { flashState.index = Math.max(0, flashState.index - 1); flashState.flipped = false; render(); });
    const fcNext = document.getElementById('fc-next');
    if (fcNext) fcNext.addEventListener('click', () => { flashState.index++; flashState.flipped = false; render(); });

    const markCard = (status) => {
      const cards = (CHEATSHEET.flashcards || []).filter(c => {
        if (flashState.category !== 'All' && c.category !== flashState.category) return false;
        if (flashState.onlyReview && state.flashcardStatus[c.id] === 'mastered') return false;
        return true;
      });
      const current = cards[flashState.index];
      if (current) {
        state.flashcardStatus[current.id] = status;
        saveState();
      }
      flashState.index++;
      flashState.flipped = false;
      render();
    };
    const fcMarkRev = document.getElementById('fc-mark-review');
    const fcMarkMast = document.getElementById('fc-mark-mastered');
    if (fcMarkRev) fcMarkRev.addEventListener('click', () => markCard('review'));
    if (fcMarkMast) fcMarkMast.addEventListener('click', () => markCard('mastered'));

    const startDrillBtn = document.getElementById('start-drill-btn');
    if (startDrillBtn) startDrillBtn.addEventListener('click', startRapidDrill);

    const quitDrillBtn = document.getElementById('quit-drill-btn');
    if (quitDrillBtn) {
      quitDrillBtn.addEventListener('click', () => {
        abortRapidDrill();
        render();
      });
    }

    bindDrillOptionListeners();
  }

  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function buildShuffledDrillPool(lastPrompt = '') {
    const raw = CHEATSHEET.mathDrillQuestions || [];
    const pool = shuffleArray(raw).map(item => {
      const mappedOpts = item.options.map((text, idx) => ({ text, isCorrect: idx === item.answer }));
      const mixedOpts = shuffleArray(mappedOpts);
      return {
        q: item.q,
        options: mixedOpts.map(o => o.text),
        answer: mixedOpts.findIndex(o => o.isCorrect),
        exp: item.exp
      };
    });
    if (pool.length > 1 && lastPrompt && pool[0].q === lastPrompt) {
      const last = pool.length - 1;
      [pool[0], pool[last]] = [pool[last], pool[0]];
    }
    return pool;
  }

  function updateDrillTimerUI() {
    const pill = document.getElementById('drill-timer-pill');
    if (!pill) return;
    pill.textContent = `⏱️ ${drillState.timeLeft}s`;
    pill.style.color = drillState.timeLeft <= 10 ? 'var(--danger)' : '';
    pill.style.borderColor = drillState.timeLeft <= 10 ? 'var(--danger)' : '';
  }

  function renderDrillQuestionInPlace() {
    const qObj = drillState.questions[drillState.currentIdx];
    const qEl = document.getElementById('drill-question-text');
    const fbEl = document.getElementById('drill-feedback-slot');
    const gridEl = document.getElementById('drill-options-grid');
    if (!qObj || !qEl || !fbEl || !gridEl) return;

    qEl.textContent = qObj.q;
    fbEl.className = 'drill-feedback-slot';
    fbEl.textContent = 'Pick an option or press keys 1–4';
    gridEl.innerHTML = renderDrillOptionsHtml(qObj);
    bindDrillOptionListeners();
  }

  function advanceDrillQuestion() {
    clearTimeout(drillState.advanceTimeoutId);
    drillState.advanceTimeoutId = null;
    if (!drillState.active) return;
    drillState.lockedChoice = null;
    const prevQ = drillState.questions[drillState.currentIdx];
    if (drillState.currentIdx + 1 >= drillState.questions.length) {
      drillState.questions = buildShuffledDrillPool(prevQ ? prevQ.q : '');
      drillState.currentIdx = 0;
    } else {
      drillState.currentIdx++;
    }
    renderDrillQuestionInPlace();
  }

  function handleDrillAnswer(chosenIdx) {
    if (!drillState.active || drillState.lockedChoice !== null) return;
    const q = drillState.questions[drillState.currentIdx];
    if (!q || chosenIdx < 0 || chosenIdx >= q.options.length) return;

    drillState.lockedChoice = chosenIdx;
    drillState.answered++;
    const isCorrect = chosenIdx === q.answer;
    let pts = 0;
    if (isCorrect) {
      drillState.correctCount++;
      drillState.streak++;
      if (drillState.streak > drillState.bestStreak) drillState.bestStreak = drillState.streak;
      pts = 10 + Math.min(10, drillState.streak * 2);
      drillState.score += pts;
    } else {
      drillState.streak = 0;
    }

    const scoreEl = document.getElementById('drill-score-pill');
    const streakEl = document.getElementById('drill-streak-pill');
    const countEl = document.getElementById('drill-count-pill');
    if (scoreEl) scoreEl.textContent = `Score: ${drillState.score}`;
    if (streakEl) streakEl.textContent = `Streak: ${drillState.streak}🔥`;
    if (countEl) countEl.textContent = `Q: ${drillState.answered}`;

    const optBtns = document.querySelectorAll('#drill-options-grid [data-drill-opt]');
    optBtns.forEach(btn => {
      const idx = Number(btn.dataset.drillOpt);
      btn.disabled = true;
      const hint = btn.querySelector('.drill-key-hint');
      if (idx === q.answer) {
        btn.classList.add('correct');
        if (hint) hint.textContent = '✓';
      } else if (idx === chosenIdx) {
        btn.classList.add('wrong');
        if (hint) hint.textContent = '✕';
      }
    });

    const fbEl = document.getElementById('drill-feedback-slot');
    if (fbEl) {
      if (isCorrect) {
        fbEl.className = 'drill-feedback-slot good';
        fbEl.textContent = `✅ Correct! (+${pts} pts) — ${q.exp}`;
      } else {
        fbEl.className = 'drill-feedback-slot bad';
        fbEl.textContent = `❌ Answer: ${q.options[q.answer]} — ${q.exp}`;
      }
    }

    clearTimeout(drillState.advanceTimeoutId);
    drillState.advanceTimeoutId = setTimeout(advanceDrillQuestion, isCorrect ? 400 : 900);
  }

  function bindDrillOptionListeners() {
    document.querySelectorAll('#drill-options-grid [data-drill-opt]').forEach(btn => {
      btn.addEventListener('click', () => handleDrillAnswer(Number(btn.dataset.drillOpt)));
    });
  }

  function finishRapidDrill() {
    clearInterval(drillState.timerId);
    clearTimeout(drillState.advanceTimeoutId);
    drillState.timerId = null;
    drillState.advanceTimeoutId = null;
    drillState.active = false;
    drillState.completed = true;
    drillState.timeLeft = 0;
    drillState.lockedChoice = null;
    if (drillState.score > state.bestDrillScore) {
      state.bestDrillScore = drillState.score;
      drillState.beatBest = true;
      saveState();
    }
    if (state.view === 'memorize' && state.memorizeTab === 'drill') {
      render();
    }
  }

  function startGuidedProblem(probId) {
    state.guided = {
      problemId: probId,
      step: 1,
      clarifyRevealed: {},
      selectedApproach: null,
      selectedFunnelIdx: null,
      calcInput: '',
      calcResult: '',
      userEstimate: '',
      sanityInput: '',
      gradeResult: null
    };
    saveState();
  }

  function initMockProblem(probId) {
    clearInterval(mockState.timerId);
    mockState.problemId = probId;
    mockState.durationSec = (state.mockDurationMins || 10) * 60;
    mockState.timeLeft = mockState.durationSec;
    mockState.running = false;
    mockState.clarifiedIdx = {};
    mockState.showVariation = false;
    mockState.showSolutionRef = false;
    mockState.sanityNote = '';
  }

  function startRapidDrill() {
    abortRapidDrill();
    const pool = buildShuffledDrillPool();
    drillState = {
      active: true,
      completed: false,
      timeLeft: 60,
      score: 0,
      answered: 0,
      correctCount: 0,
      streak: 0,
      bestStreak: 0,
      currentIdx: 0,
      questions: pool,
      lastFeedback: null,
      lockedChoice: null,
      beatBest: false,
      advanceTimeoutId: null,
      timerId: setInterval(() => {
        if (!drillState.active) return;
        if (drillState.timeLeft > 1) {
          drillState.timeLeft--;
          updateDrillTimerUI();
        } else {
          finishRapidDrill();
        }
      }, 1000)
    };
    render();
  }

  // Global Topbar & Sidebar Controls
  document.querySelectorAll('.nav-btn[data-view]').forEach(btn => {
    btn.addEventListener('click', () => setView(btn.dataset.view));
  });

  document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  document.querySelectorAll('[data-set-theme]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.theme = btn.dataset.setTheme;
      saveState();
      applyTheme();
    });
  });

  document.querySelectorAll('[data-set-font]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.fontScale = btn.dataset.setFont;
      saveState();
      applyTheme();
    });
  });

  document.querySelectorAll('[data-set-mockmins]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.mockDurationMins = Number(btn.dataset.setMockmins) || 10;
      if (!mockState.running) {
        mockState.durationSec = state.mockDurationMins * 60;
        mockState.timeLeft = mockState.durationSec;
      }
      saveState();
      applyTheme();
      if (state.view === 'mock') render();
    });
  });

  const settingsModal = document.getElementById('settings-modal');
  const toggleSettings = (open) => {
    if (settingsModal) settingsModal.classList.toggle('open', open);
  };
  const openSettingsBtn = document.getElementById('open-settings-btn');
  const closeSettingsBtn = document.getElementById('close-settings-btn');
  const doneSettingsBtn = document.getElementById('done-settings-btn');
  if (openSettingsBtn) openSettingsBtn.addEventListener('click', () => toggleSettings(true));
  if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', () => toggleSettings(false));
  if (doneSettingsBtn) doneSettingsBtn.addEventListener('click', () => toggleSettings(false));
  if (settingsModal) {
    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) toggleSettings(false);
    });
  }

  const exportBtn = document.getElementById('export-progress-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `guessmaster-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  const importInput = document.getElementById('import-progress-input');
  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result || '{}'));
          state = {
            ...structuredClone(defaultState),
            ...parsed,
            filters: { ...defaultState.filters, ...(parsed.filters || {}) },
            guided: { ...defaultState.guided, ...(parsed.guided || {}) }
          };
          saveState();
          toggleSettings(false);
          render();
          alert('Progress imported successfully!');
        } catch {
          alert('Invalid backup JSON file.');
        }
      };
      reader.readAsText(file);
    });
  }

  const resetBtn = document.getElementById('reset-progress-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset all roadmap checkmarks, mastered problems, and flashcard progress?')) {
        localStorage.removeItem(STORAGE_KEY);
        state = loadState();
        toggleSettings(false);
        render();
      }
    });
  }

  const globalSearchEl = document.getElementById('global-search');
  if (globalSearchEl) {
    globalSearchEl.value = state.filters.search || '';
    globalSearchEl.addEventListener('input', (e) => {
      state.filters.search = e.target.value;
      saveStateDebounced();
      if (state.view !== 'library') {
        setView('library', { preserveFocus: true });
        if (document.activeElement !== globalSearchEl) globalSearchEl.focus();
      } else {
        const ls = document.getElementById('lib-search');
        if (ls) ls.value = e.target.value;
        if (typeof window.__gmUpdateLibraryResults === 'function') {
          window.__gmUpdateLibraryResults(false);
        }
      }
    });
    globalSearchEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        state.filters.search = e.target.value;
        if (state.view !== 'library') setView('library', { preserveFocus: true });
        else if (typeof window.__gmUpdateLibraryResults === 'function') window.__gmUpdateLibraryResults(false);
      }
    });
  }

  if (typeof document.addEventListener === 'function') {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') toggleSettings(false);
      const activeTag = (document.activeElement && document.activeElement.tagName) || '';
      const inField = ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag);
      if (e.key === '/' && !inField) {
        e.preventDefault();
        if (globalSearchEl) globalSearchEl.focus();
        return;
      }
      if (!inField && state.view === 'memorize' && state.memorizeTab === 'drill' && drillState.active) {
        if (['1', '2', '3', '4'].includes(e.key) && drillState.lockedChoice === null) {
          e.preventDefault();
          handleDrillAnswer(Number(e.key) - 1);
        } else if ((e.key === ' ' || e.key === 'Enter') && drillState.lockedChoice !== null) {
          e.preventDefault();
          advanceDrillQuestion();
        }
      }
    });
  }

  if (typeof window.addEventListener === 'function') {
    window.addEventListener('resize', () => {
      if (state.view === 'library' && typeof window.__gmSyncLibraryListHeight === 'function') {
        window.__gmSyncLibraryListHeight();
      }
    });
  }

  document.getElementById('random-practice-btn').addEventListener('click', () => {
    const pick = PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)];
    startGuidedProblem(pick.id);
    setView('practice');
  });

  if (state.mockDurationMins) {
    mockState.durationSec = state.mockDurationMins * 60;
    mockState.timeLeft = mockState.durationSec;
  }
  render();
})();
