const words = {
  ko: [
    '고등어', '참치', '연어', '붕어', '잉어', '상어', '고래', '오징어', '문어', '멸치',
    '갈치', '광어', '우럭', '방어', '도미', '복어', '장어', '새우', '게', '해파리',
    '사과', '바다', '하늘', '학교', '연필', '친구', '강아지', '고양이', '로봇', '기차'
  ],
  en: [
    'fish', 'tuna', 'salmon', 'shark', 'whale', 'squid', 'octopus', 'crab', 'shrimp', 'eel',
    'cat', 'sun', 'dog', 'book', 'star', 'moon', 'tree', 'ball', 'apple', 'school'
  ]
};

const fishEmoji = ['🐟', '🐠', '🐡', '🦈', '🐙', '🦑', '🦐', '🦀'];
const speedMap = { easy: 42, normal: 58, fast: 76 };
const praise = ['잡았다!', '월척이다!', '손맛 좋다!', '물고기 획득!', '낚시 성공!', '슝— 잡았다!'];

const els = {
  game: document.querySelector('#game'),
  word: document.querySelector('#word'),
  line: document.querySelector('#line'),
  catch: document.querySelector('#catch'),
  input: document.querySelector('#typing'),
  start: document.querySelector('#start'),
  message: document.querySelector('#message'),
  score: document.querySelector('#score'),
  combo: document.querySelector('#combo'),
  level: document.querySelector('#level'),
  best: document.querySelector('#best'),
  pop: document.querySelector('#pop'),
  pills: document.querySelectorAll('.pill')
};

const state = {
  running: false,
  mode: 'ko',
  speed: 'normal',
  score: 0,
  combo: 0,
  level: 1,
  best: Number(localStorage.getItem('sunwoo-keyboard-best') || 0),
  current: '',
  fish: '🐟',
  y: 18,
  x: 50,
  lastTime: 0,
  raf: null
};

els.best.textContent = state.best;

function pickWord() {
  const bank = words[state.mode];
  let next = bank[Math.floor(Math.random() * bank.length)];
  if (next === state.current && bank.length > 1) return pickWord();
  return next;
}

function positionLine() {
  const gameRect = els.game.getBoundingClientRect();
  const wordRect = els.word.getBoundingClientRect();
  const top = 52;
  const x = wordRect.left + wordRect.width / 2 - gameRect.left;
  const y = wordRect.top - gameRect.top;
  els.line.style.left = `${x}px`;
  els.line.style.top = `${top}px`;
  els.line.style.height = `${Math.max(24, y - top + 8)}px`;
}

function setWord() {
  state.current = pickWord();
  state.fish = fishEmoji[Math.floor(Math.random() * fishEmoji.length)];
  state.y = 22;
  state.x = 24 + Math.random() * 52;
  els.word.textContent = `${state.fish} ${state.current}`;
  els.word.style.top = `${state.y}px`;
  els.word.style.left = `${state.x}%`;
  els.input.value = '';
  requestAnimationFrame(positionLine);
}

function updateScore() {
  els.score.textContent = state.score;
  els.combo.textContent = state.combo;
  els.level.textContent = state.level;
  els.best.textContent = state.best;
}

function showPop(text) {
  els.pop.textContent = text;
  els.pop.classList.remove('show');
  void els.pop.offsetWidth;
  els.pop.classList.add('show');
}

function showCatch() {
  els.catch.textContent = state.fish;
  els.catch.style.left = `${state.x}%`;
  els.catch.style.top = `${Math.max(62, state.y)}px`;
  els.game.classList.remove('catching');
  els.catch.classList.remove('show');
  void els.catch.offsetWidth;
  els.game.classList.add('catching');
  els.catch.classList.add('show');
}

function success() {
  const gained = 10 + Math.min(state.combo, 10) * 2;
  state.score += gained;
  state.combo += 1;
  state.level = 1 + Math.floor(state.score / 100);
  if (state.score > state.best) {
    state.best = state.score;
    localStorage.setItem('sunwoo-keyboard-best', String(state.best));
  }
  updateScore();
  const text = praise[Math.floor(Math.random() * praise.length)];
  els.message.textContent = `${text} +${gained}점`;
  showCatch();
  showPop('💦');
  setTimeout(setWord, 180);
}

function miss() {
  state.combo = 0;
  updateScore();
  els.message.textContent = '놓쳤다. 괜찮아, 다음 물고기 간다.';
  showPop('🌊');
  setWord();
}

function tick(time) {
  if (!state.running) return;
  if (!state.lastTime) state.lastTime = time;
  const delta = (time - state.lastTime) / 1000;
  state.lastTime = time;

  const speed = speedMap[state.speed] + state.level * 5;
  state.y += speed * delta;
  els.word.style.top = `${state.y}px`;
  positionLine();

  const bottomLimit = els.game.clientHeight - els.word.clientHeight - 44;
  if (state.y >= bottomLimit) miss();
  state.raf = requestAnimationFrame(tick);
}

function startGame() {
  state.running = true;
  state.score = 0;
  state.combo = 0;
  state.level = 1;
  state.lastTime = 0;
  els.start.textContent = '다시 시작';
  els.message.textContent = '낚싯대 준비됐다. 물고기 이름을 쳐라.';
  updateScore();
  setWord();
  els.input.focus();
  cancelAnimationFrame(state.raf);
  state.raf = requestAnimationFrame(tick);
}

els.input.addEventListener('input', () => {
  const typed = els.input.value.trim().toLowerCase();
  if (!state.running) return;
  if (typed === state.current.toLowerCase()) success();
  else if (typed.length >= state.current.length) {
    els.word.classList.remove('shake');
    void els.word.offsetWidth;
    els.word.classList.add('shake');
    els.message.textContent = '조금 달라. 지우고 다시 쳐봐.';
  }
});

els.start.addEventListener('click', startGame);
els.input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (!state.running) startGame();
    else if (els.input.value.trim().toLowerCase() === state.current.toLowerCase()) success();
  }
});

els.pills.forEach((pill) => {
  pill.addEventListener('click', () => {
    const mode = pill.dataset.mode;
    const speed = pill.dataset.speed;
    if (mode) {
      state.mode = mode;
      document.querySelectorAll('[data-mode]').forEach((el) => el.classList.toggle('active', el === pill));
      els.message.textContent = mode === 'ko' ? '한글 물고기로 간다.' : '영어 물고기로 간다.';
    }
    if (speed) {
      state.speed = speed;
      document.querySelectorAll('[data-speed]').forEach((el) => el.classList.toggle('active', el === pill));
      els.message.textContent = speed === 'easy' ? '천천히 낚자.' : speed === 'fast' ? '빠르게 낚자.' : '보통 속도로 낚자.';
    }
    if (state.running) setWord();
    els.input.focus();
  });
});

window.addEventListener('resize', positionLine);
setWord();
updateScore();
