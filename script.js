const words = {
  ko: [
    '사과', '바다', '하늘', '학교', '연필', '가방', '친구', '강아지', '고양이', '자동차',
    '나무', '구름', '별', '달', '공룡', '로봇', '기차', '우산', '딸기', '바나나',
    '우주', '마법', '피자', '축구', '놀이터', '책상', '의자', '가족', '아침', '점심'
  ],
  en: [
    'cat', 'sun', 'dog', 'book', 'star', 'moon', 'tree', 'ball', 'fish', 'cake',
    'apple', 'school', 'friend', 'robot', 'train', 'piano', 'happy', 'tiger', 'pizza', 'green'
  ]
};

const speedMap = { easy: 42, normal: 58, fast: 76 };
const praise = ['좋아!', '멋지다!', '별 하나!', '잘했어!', '손가락 빠르다!', '팡!'];

const els = {
  game: document.querySelector('#game'),
  word: document.querySelector('#word'),
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
  y: 18,
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

function setWord() {
  state.current = pickWord();
  state.y = 18;
  els.word.textContent = state.current;
  els.word.style.top = `${state.y}px`;
  els.word.style.left = `${24 + Math.random() * 52}%`;
  els.input.value = '';
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
  showPop('⭐');
  setWord();
}

function miss() {
  state.combo = 0;
  updateScore();
  els.message.textContent = '괜찮아. 다음 단어 가자.';
  showPop('🌈');
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
  els.message.textContent = '준비됐다. 보고 그대로 치면 된다.';
  updateScore();
  setWord();
  els.input.focus();
  cancelAnimationFrame(state.raf);
  state.raf = requestAnimationFrame(tick);
}

els.input.addEventListener('input', () => {
  const typed = els.input.value.trim();
  if (!state.running) return;
  if (typed === state.current) success();
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
    else if (els.input.value.trim() === state.current) success();
  }
});

els.pills.forEach((pill) => {
  pill.addEventListener('click', () => {
    const mode = pill.dataset.mode;
    const speed = pill.dataset.speed;
    if (mode) {
      state.mode = mode;
      document.querySelectorAll('[data-mode]').forEach((el) => el.classList.toggle('active', el === pill));
      els.message.textContent = mode === 'ko' ? '한글 단어로 간다.' : '영어 단어로 간다.';
    }
    if (speed) {
      state.speed = speed;
      document.querySelectorAll('[data-speed]').forEach((el) => el.classList.toggle('active', el === pill));
      els.message.textContent = speed === 'easy' ? '천천히 간다.' : speed === 'fast' ? '빠르게 간다.' : '보통 속도로 간다.';
    }
    if (state.running) setWord();
    els.input.focus();
  });
});

setWord();
updateScore();
