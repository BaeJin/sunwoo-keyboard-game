const words = {
  ko: [
    '고등어', '참치', '연어', '붕어', '잉어', '상어', '고래', '오징어', '문어', '멸치',
    '갈치', '광어', '우럭', '방어', '도미', '복어', '장어', '새우', '게', '해파리',
    '가자미', '삼치', '꽁치', '전어', '농어', '메기', '송어', '홍어', '낙지', '조개'
  ],
  en: [
    'fish', 'tuna', 'salmon', 'shark', 'whale', 'squid', 'octopus', 'crab', 'shrimp', 'eel',
    'carp', 'trout', 'bass', 'cod', 'mackerel', 'anchovy', 'ray', 'clam', 'lobster', 'dolphin'
  ]
};


const koreanMeaning = {
  fish: '물고기', tuna: '참치', salmon: '연어', shark: '상어', whale: '고래', squid: '오징어', octopus: '문어', crab: '게', shrimp: '새우', eel: '장어',
  carp: '잉어', trout: '송어', bass: '농어', cod: '대구', mackerel: '고등어', anchovy: '멸치', ray: '가오리', clam: '조개', lobster: '바닷가재', dolphin: '돌고래'
};

const fishEmoji = ['🐟', '🐠', '🐡', '🦈', '🐙', '🦑', '🦐', '🦀'];
const praise = ['잡았다!', '월척이다!', '손맛 좋다!', '물고기 획득!', '낚시 성공!', '슝— 잡았다!'];
const GAME_SECONDS = 5 * 60;
const speedConfig = {
  easy: { maxFish: 4, spawnMin: 4200, spawnMax: 6200, swim: 10 },
  normal: { maxFish: 6, spawnMin: 3000, spawnMax: 5000, swim: 15 },
  fast: { maxFish: 8, spawnMin: 1900, spawnMax: 3400, swim: 22 }
};

const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONG = ['', 'ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const COMBO_JAMO = {
  'ㅘ': ['ㅗ', 'ㅏ'], 'ㅙ': ['ㅗ', 'ㅐ'], 'ㅚ': ['ㅗ', 'ㅣ'], 'ㅝ': ['ㅜ', 'ㅓ'], 'ㅞ': ['ㅜ', 'ㅔ'], 'ㅟ': ['ㅜ', 'ㅣ'], 'ㅢ': ['ㅡ', 'ㅣ'],
  'ㄳ': ['ㄱ', 'ㅅ'], 'ㄵ': ['ㄴ', 'ㅈ'], 'ㄶ': ['ㄴ', 'ㅎ'], 'ㄺ': ['ㄹ', 'ㄱ'], 'ㄻ': ['ㄹ', 'ㅁ'], 'ㄼ': ['ㄹ', 'ㅂ'],
  'ㄽ': ['ㄹ', 'ㅅ'], 'ㄾ': ['ㄹ', 'ㅌ'], 'ㄿ': ['ㄹ', 'ㅍ'], 'ㅀ': ['ㄹ', 'ㅎ'], 'ㅄ': ['ㅂ', 'ㅅ']
};
const keyRows = [
  [
    ['q','ㅂ','left','4'], ['w','ㅈ','left','3'], ['e','ㄷ','left','2'], ['r','ㄱ','left','1'], ['t','ㅅ','left','1'],
    ['y','ㅛ','right','1'], ['u','ㅕ','right','1'], ['i','ㅑ','right','2'], ['o','ㅐ','right','3'], ['p','ㅔ','right','4']
  ],
  [
    ['a','ㅁ','left','4'], ['s','ㄴ','left','3'], ['d','ㅇ','left','2'], ['f','ㄹ','left','1'], ['g','ㅎ','left','1'],
    ['h','ㅗ','right','1'], ['j','ㅓ','right','1'], ['k','ㅏ','right','2'], ['l','ㅣ','right','3']
  ],
  [
    ['z','ㅋ','left','4'], ['x','ㅌ','left','3'], ['c','ㅊ','left','2'], ['v','ㅍ','left','1'], ['b','ㅠ','left','1'],
    ['n','ㅜ','right','1'], ['m','ㅡ','right','1']
  ]
];
const shiftedJamo = {
  'ㅃ': { base: 'ㅂ', key: 'Q' }, 'ㅉ': { base: 'ㅈ', key: 'W' }, 'ㄸ': { base: 'ㄷ', key: 'E' }, 'ㄲ': { base: 'ㄱ', key: 'R' }, 'ㅆ': { base: 'ㅅ', key: 'T' },
  'ㅒ': { base: 'ㅐ', key: 'O' }, 'ㅖ': { base: 'ㅔ', key: 'P' }
};
const jamoToKey = Object.fromEntries(keyRows.flat().map(([key, jamo, hand, finger]) => [jamo, { key, hand, finger }]));
const letterToKey = Object.fromEntries(keyRows.flat().map(([key, jamo, hand, finger]) => [key, { key, hand, finger }]));
for (const [jamo, shift] of Object.entries(shiftedJamo)) {
  const base = jamoToKey[shift.base];
  jamoToKey[jamo] = { ...base, key: shift.key, shifted: true, shiftHand: base.hand === 'left' ? 'right' : 'left', baseJamo: shift.base };
}

const els = {
  game: document.querySelector('#game'), fishes: document.querySelector('#fishes'), line: document.querySelector('#line'),
  catch: document.querySelector('#catch'), finish: document.querySelector('#finish'), input: document.querySelector('#typing'),
  start: document.querySelector('#start'), message: document.querySelector('#message'), score: document.querySelector('#score'),
  time: document.querySelector('#time'), inWater: document.querySelector('#inWater'), best: document.querySelector('#best'),
  pop: document.querySelector('#pop'), pills: document.querySelectorAll('.pill'), keyboard: document.querySelector('#keyboard'),
  jamoTrail: document.querySelector('#jamoTrail'), nextHint: document.querySelector('#nextHint')
};

const state = {
  running: false, mode: 'ko', speed: 'normal', score: 0,
  best: Number(localStorage.getItem('sunwoo-fishing-best') || localStorage.getItem('sunwoo-keyboard-best') || 0),
  fishes: [], nextId: 1, startTime: 0, endTime: 0, nextSpawnAt: 0, lastTime: 0, raf: null, guideFish: null, guideFishId: null, isComposing: false, suppressGuideUntil: 0
};

function rand(min, max) { return min + Math.random() * (max - min); }
function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
function formatTime(seconds) { const s = Math.max(0, Math.ceil(seconds)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }
function normalize(text) { return text.trim().toLowerCase(); }
function isHangulSyllable(ch) { const code = ch.charCodeAt(0); return code >= 0xac00 && code <= 0xd7a3; }

function decomposeJamo(text) {
  const result = [];
  for (const ch of text) {
    if (!isHangulSyllable(ch)) { result.push(ch); continue; }
    const code = ch.charCodeAt(0) - 0xac00;
    const cho = Math.floor(code / 588);
    const jung = Math.floor((code % 588) / 28);
    const jong = code % 28;
    for (const j of [CHO[cho], JUNG[jung], JONG[jong]].filter(Boolean)) {
      result.push(...(COMBO_JAMO[j] || [j]));
    }
  }
  return result;
}
function guideSteps(text) {
  return state.mode === 'ko' ? decomposeJamo(text) : text.toLowerCase().split('');
}
function keyInfoFor(step) {
  return state.mode === 'ko' ? jamoToKey[step] : letterToKey[step.toLowerCase()];
}
function clearTypingInput() {
  state.suppressGuideUntil = performance.now() + 180;
  els.input.value = '';
  requestAnimationFrame(() => { els.input.value = ''; renderGuide(); });
  setTimeout(() => { els.input.value = ''; renderGuide(); }, 0);
  setTimeout(() => { state.suppressGuideUntil = 0; renderGuide(); }, 190);
}

function compareInput(targetWord, typedText) {
  const target = guideSteps(targetWord);
  const typed = guideSteps(typedText);
  let matched = 0;
  while (matched < target.length && matched < typed.length && target[matched] === typed[matched]) matched += 1;
  const hasError = typed.length > matched;
  return { target, typed, matched, hasError, errorIndex: hasError ? matched : -1, currentIndex: Math.min(matched, target.length) };
}

function buildKeyboard() {
  els.keyboard.innerHTML = '';
  for (const row of keyRows) {
    const rowEl = document.createElement('div');
    rowEl.className = 'key-row';
    for (const [key, jamo, hand, finger] of row) {
      const el = document.createElement('div');
      el.className = 'key';
      el.dataset.jamo = jamo;
      el.dataset.key = key;
      el.dataset.hand = hand;
      el.dataset.finger = finger;
      const shifted = Object.entries(shiftedJamo).find(([, value]) => value.base === jamo)?.[0] || '';
      el.innerHTML = `<span class="latin">${key.toUpperCase()}</span><strong>${jamo}</strong>${shifted ? `<span class="shifted-jamo">⇧${shifted}</span>` : ''}`;
      rowEl.appendChild(el);
    }
    els.keyboard.appendChild(rowEl);
  }
}

function updateKeyboardModeClass() {
  els.keyboard.classList.toggle('english-mode', state.mode === 'en');
  els.keyboard.classList.toggle('korean-mode', state.mode === 'ko');
}

function setGuideFish(fish = null) {
  if (fish) state.guideFishId = fish.id;
  state.guideFish = state.fishes.find((item) => item.id === state.guideFishId) || state.fishes[0] || null;
  document.querySelectorAll('.fish-card.guided').forEach((el) => el.classList.remove('guided'));
  state.guideFish?.el.classList.add('guided');
  renderGuide();
}
function renderGuide() {
  document.querySelectorAll('.key.active, .key.used, .key.error').forEach((el) => el.classList.remove('active', 'used', 'error'));
  document.querySelectorAll('.finger-dot.active, .finger-dot.error').forEach((el) => el.classList.remove('active', 'error'));
  document.querySelectorAll('.shift-key.active, .shift-key.error').forEach((el) => el.classList.remove('active', 'error'));
  if (!state.guideFish) {
    els.jamoTrail.innerHTML = '<span class="empty-guide">물고기가 나오면 입력 순서가 표시된다.</span>';
    els.nextHint.textContent = '다음: -';
    return;
  }
  const typed = performance.now() < state.suppressGuideUntil ? '' : normalize(els.input.value);
  const comparison = compareInput(state.guideFish.word, typed);
  const jamos = comparison.target;
  const matched = comparison.matched;
  const hasError = state.isComposing ? false : comparison.hasError;
  const errorIndex = comparison.errorIndex;
  const currentIndex = comparison.currentIndex;
  els.jamoTrail.innerHTML = jamos.map((jamo, i) => {
    const classes = ['jamo'];
    if (i < matched) classes.push('done');
    if (hasError && i === errorIndex) classes.push('error');
    else if (!hasError && i === currentIndex) classes.push('current');
    return `<span class="${classes.join(' ')}">${jamo}</span>`;
  }).join('');

  const focusIndex = hasError ? errorIndex : currentIndex;
  const next = jamos[focusIndex];
  const info = keyInfoFor(next);
  jamos.slice(0, matched).forEach((j) => {
    const usedInfo = keyInfoFor(j);
    const usedJamo = usedInfo?.baseJamo || j;
    const selector = state.mode === 'ko' ? `.key[data-jamo="${usedJamo}"]` : `.key[data-key="${usedInfo?.key}"]`;
    document.querySelector(selector)?.classList.add('used');
  });
  if (next && info) {
    const keyJamo = info.baseJamo || next;
    const keySelector = state.mode === 'ko' ? `.key[data-jamo="${keyJamo}"]` : `.key[data-key="${info.key}"]`;
    const key = document.querySelector(keySelector);
    key?.classList.add(hasError ? 'error' : 'active');
    els.nextHint.textContent = hasError
      ? `오타: ${next} 자리 → ${info.shifted ? 'Shift + ' : ''}${info.key.toUpperCase()}`
      : `다음: ${next} → ${info.shifted ? 'Shift + ' : ''}${info.key.toUpperCase()}`;
    document.querySelector(`.finger-dot[data-hand="${info.hand}"][data-finger="${info.finger}"]`)?.classList.add(hasError ? 'error' : 'active');
    if (info.shifted) document.querySelector(`.shift-key[data-shift="${info.shiftHand}"]`)?.classList.add(hasError ? 'error' : 'active');
  } else {
    els.nextHint.textContent = hasError ? '오타가 있다. 지우고 다시 쳐봐.' : `${state.guideFish.word} 완성 — Enter!`;
  }
}

function pickWord() {
  const active = new Set(state.fishes.map((fish) => fish.word));
  const bank = words[state.mode];
  const candidates = bank.filter((word) => !active.has(word));
  return pick(candidates.length ? candidates : bank);
}
function updateHud(now = performance.now()) {
  const remaining = state.running ? (state.endTime - now) / 1000 : GAME_SECONDS;
  els.time.textContent = formatTime(remaining); els.score.textContent = state.score; els.inWater.textContent = state.fishes.length; els.best.textContent = state.best;
}
function scheduleNextSpawn(now) { const cfg = speedConfig[state.speed]; state.nextSpawnAt = now + rand(cfg.spawnMin, cfg.spawnMax); }

function createFish(now = performance.now()) {
  if (!state.running) return;
  const cfg = speedConfig[state.speed]; if (state.fishes.length >= cfg.maxFish) return;
  const gameRect = els.game.getBoundingClientRect(); const word = pickWord(); const emoji = pick(fishEmoji);
  const fromLeft = Math.random() > 0.5; const y = rand(78, Math.max(120, gameRect.height - 112));
  const edgePadding = 92;
  const x = fromLeft ? edgePadding : gameRect.width - edgePadding;
  const vx = (fromLeft ? 1 : -1) * rand(cfg.swim * 0.65, cfg.swim * 1.35); const vy = rand(-5, 5);
  const el = document.createElement('button'); el.type = 'button'; el.className = 'fish-card'; el.dataset.id = String(state.nextId);
  const meaning = state.mode === 'en' ? koreanMeaning[word] : '';
  el.innerHTML = `<span class="fish-emoji">${emoji}</span><span class="fish-text"><span class="fish-word">${word}</span>${meaning ? `<span class="fish-meaning">${meaning}</span>` : ''}</span>`; els.fishes.appendChild(el);
  const fish = { id: state.nextId++, word, emoji, el, x, y, vx, vy, bornAt: now, hooked: false };
  el.addEventListener('click', () => { els.input.focus(); setGuideFish(fish); });
  state.fishes.push(fish); renderFish(fish); if (!state.guideFish) setGuideFish(fish); updateHud(now);
}
function renderFish(fish) { fish.el.style.left = `${fish.x}px`; fish.el.style.top = `${fish.y}px`; fish.el.style.setProperty('--flip', fish.vx < 0 ? '-1' : '1'); }
function removeFish(fish, reason = 'gone') {
  if (fish.hooked) return; fish.hooked = true; fish.el.classList.add(reason === 'caught' ? 'caught' : 'fading');
  setTimeout(() => fish.el.remove(), reason === 'caught' ? 180 : 500); state.fishes = state.fishes.filter((item) => item !== fish);
  if (state.guideFishId === fish.id) state.guideFishId = null;
  if (state.guideFish === fish) state.guideFish = null;
  setGuideFish(); updateHud();
}
function positionLineTo(fish) { els.line.style.left = `${fish.x + fish.el.offsetWidth / 2}px`; els.line.style.top = '54px'; els.line.style.height = `${Math.max(24, fish.y - 48)}px`; }
function showPop(text, fish) { els.pop.textContent = text; els.pop.style.left = `${fish.x + fish.el.offsetWidth / 2}px`; els.pop.style.top = `${fish.y}px`; els.pop.classList.remove('show'); void els.pop.offsetWidth; els.pop.classList.add('show'); }
function showCatch(fish) { els.catch.textContent = fish.emoji; els.catch.style.left = `${fish.x + fish.el.offsetWidth / 2}px`; els.catch.style.top = `${fish.y}px`; els.game.classList.remove('catching'); els.catch.classList.remove('show'); void els.catch.offsetWidth; els.game.classList.add('catching'); els.catch.classList.add('show'); positionLineTo(fish); }
function catchFish(fish) {
  state.score += 1; if (state.score > state.best) { state.best = state.score; localStorage.setItem('sunwoo-fishing-best', String(state.best)); }
  els.message.textContent = `${pick(praise)} 지금 ${state.score}마리`; showCatch(fish); showPop('💦', fish);
  clearTypingInput();
  removeFish(fish, 'caught');
  renderGuide();
  if (state.fishes.length < Math.min(3, speedConfig[state.speed].maxFish)) setTimeout(() => createFish(), 220);
}
function findMatchingFish(typed) { return state.fishes.find((fish) => normalize(fish.word) === typed); }

function tick(now) {
  if (!state.running) return;
  try {
    if (!state.lastTime) state.lastTime = now;
    const delta = Math.min(0.05, (now - state.lastTime) / 1000);
    state.lastTime = now;
    if (now >= state.endTime) { endGame(); return; }

    const gameRect = els.game.getBoundingClientRect();
    for (const fish of [...state.fishes]) {
      if (!fish.el.isConnected) continue;
      const halfWidth = Math.min(fish.el.offsetWidth / 2 || 86, Math.max(40, gameRect.width / 2 - 12));
      const halfHeight = Math.min(fish.el.offsetHeight / 2 || 32, Math.max(24, gameRect.height / 2 - 80));
      const minX = halfWidth + 10;
      const maxX = Math.max(minX, gameRect.width - halfWidth - 10);
      const minY = halfHeight + 62;
      const maxY = Math.max(minY, gameRect.height - halfHeight - 68);

      fish.x += fish.vx * delta;
      fish.y += Math.sin((now + fish.id * 700) / 1000) * 7 * delta + fish.vy * delta;
      if (fish.x <= minX) { fish.x = minX; fish.vx = Math.abs(fish.vx || speedConfig[state.speed].swim); }
      if (fish.x >= maxX) { fish.x = maxX; fish.vx = -Math.abs(fish.vx || speedConfig[state.speed].swim); }
      if (fish.y <= minY) { fish.y = minY; fish.vy = Math.abs(fish.vy || 3); }
      if (fish.y >= maxY) { fish.y = maxY; fish.vy = -Math.abs(fish.vy || 3); }
      fish.el.style.opacity = '1';
      renderFish(fish);
    }
    if (now >= state.nextSpawnAt) { createFish(now); scheduleNextSpawn(now); }
    updateHud(now);
    renderGuide();
  } catch (error) {
    console.warn('fish animation recovered', error);
  } finally {
    if (state.running) state.raf = requestAnimationFrame(tick);
  }
}
function clearFishes() { state.fishes.forEach((fish) => fish.el.remove()); state.fishes = []; state.guideFish = null; state.guideFishId = null; setGuideFish(); }
function startGame() {
  const now = performance.now(); state.running = true; state.score = 0; state.startTime = now; state.endTime = now + GAME_SECONDS * 1000; state.lastTime = 0; state.nextId = 1;
  els.game.classList.add('running'); els.start.textContent = '다시 시작'; els.message.textContent = '5분 낚시 시작. 보이는 물고기 이름을 쳐라.'; els.finish.classList.add('hidden'); clearFishes(); updateHud(now);
  for (let i = 0; i < 3; i++) createFish(now + i); setGuideFish(); scheduleNextSpawn(now); clearTypingInput(); els.input.disabled = false; els.input.focus(); cancelAnimationFrame(state.raf); state.raf = requestAnimationFrame(tick);
}
function endGame() {
  state.running = false; cancelAnimationFrame(state.raf); els.game.classList.remove('running'); els.input.disabled = true; els.start.textContent = '다시 하기'; els.time.textContent = '0:00';
  els.message.textContent = `끝. 총 ${state.score}마리 잡았다.`; els.finish.textContent = `끝! ${state.score}마리 잡았다 🎣`; els.finish.classList.remove('hidden'); clearFishes(); els.inWater.textContent = '0'; els.score.textContent = state.score; els.best.textContent = state.best;
}

els.input.addEventListener('compositionstart', () => { state.isComposing = true; renderGuide(); });
els.input.addEventListener('compositionend', () => { state.isComposing = false; renderGuide(); });
els.input.addEventListener('input', () => {
  if (performance.now() < state.suppressGuideUntil) { els.input.value = ''; renderGuide(); return; }
  if (!state.running) return;
  const typed = normalize(els.input.value);
  setGuideFish();
  if (!state.isComposing && state.guideFish && typed && compareInput(state.guideFish.word, typed).hasError) {
    els.message.textContent = '오타가 있다. 빨간 자모 자리부터 다시 맞춰봐.';
  }
  renderGuide();
});
els.start.addEventListener('click', startGame);
els.input.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  if (event.isComposing || state.isComposing) return;
  event.preventDefault();
  if (!state.running) { startGame(); return; }
  const typed = normalize(els.input.value);
  const fish = findMatchingFish(typed);
  if (fish) catchFish(fish);
  else {
    els.message.textContent = '아직 물고기 이름이 완성 안 됐다. 빨간 자모가 있으면 고쳐봐.';
    renderGuide();
  }
});
els.pills.forEach((pill) => {
  pill.addEventListener('click', () => {
    const mode = pill.dataset.mode; const speed = pill.dataset.speed;
    if (mode) { state.mode = mode; clearTypingInput(); updateKeyboardModeClass(); document.querySelectorAll('[data-mode]').forEach((el) => el.classList.toggle('active', el === pill)); els.message.textContent = mode === 'ko' ? '한글 물고기로 간다.' : '영어 물고기로 간다.'; }
    if (speed) { state.speed = speed; document.querySelectorAll('[data-speed]').forEach((el) => el.classList.toggle('active', el === pill)); els.message.textContent = speed === 'easy' ? '느긋하게 낚자.' : speed === 'fast' ? '바글바글하게 낚자.' : '보통 속도로 낚자.'; }
    if (state.running) { clearFishes(); for (let i = 0; i < 3; i++) createFish(); scheduleNextSpawn(performance.now()); }
    els.input.focus(); renderGuide();
  });
});

document.addEventListener('visibilitychange', () => {
  if (!document.hidden && state.running) {
    state.lastTime = performance.now();
    cancelAnimationFrame(state.raf);
    state.raf = requestAnimationFrame(tick);
  }
});

buildKeyboard(); updateKeyboardModeClass(); updateHud(); renderGuide(); els.input.disabled = false;
