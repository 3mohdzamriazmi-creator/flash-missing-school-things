'use strict';

// Each picture is drawn here, so the game works offline with no downloads.
const schoolThings = [
  { word: 'pen', picture: '<g transform="rotate(35 100 85)"><rect x="87" y="24" width="27" height="99" rx="7" fill="#508fd0"/><path d="M87 111h27l-8 27H95z" fill="#e6e9e9"/><path d="m95 138 5 14 6-14" fill="#344f67"/><rect x="86" y="17" width="29" height="42" rx="8" fill="#304e72"/><path d="M111 24h9v35" fill="none"/><path d="M94 66v33" stroke="#9bcbf0"/></g>' },
  { word: 'rubber', picture: '<g transform="rotate(-17 100 85)"><path d="m42 62 15-18h111l-15 18z" fill="#ffbbb5"/><path d="m153 62 15-18v63l-15 18z" fill="#c87780"/><rect x="42" y="62" width="111" height="63" rx="4" fill="#f2959e"/><path d="M91 62h45v63H91z" fill="#639ec7"/><path d="m91 62 15-18h45l-15 18z" fill="#9ec9e2"/><path d="M100 76h27m-27 9h27m-27 9h18" stroke="#d4e8ef" stroke-width="3"/></g>' },
  { word: 'pencil', picture: '<g transform="rotate(38 100 85)"><path d="M87 42h26v84H87z" fill="#f2bc4d"/><path d="M96 42h8v84h-8z" fill="#ffe590" stroke="none"/><path d="m87 126 13 28 13-28z" fill="#e6b987"/><path d="m96 146 4 8 4-8" fill="#3a4b51"/><rect x="86" y="25" width="28" height="20" fill="#c4d7dc"/><path d="M87 25V15q13-9 26 0v10" fill="#ed8d9f"/><path d="M88 34h24" stroke="#8199a0"/></g>' },
  { word: 'book', picture: '<g transform="rotate(-9 100 85)"><path d="M50 34h92q12 0 12 13v92H54q-15 0-15-14V48q0-14 11-14" fill="#e88050"/><path d="M53 43h91v82H53z" fill="#f09566" stroke="none"/><path d="M54 34v89M42 124q4-7 12-7h100v22H54q-15 0-15-13" fill="#fff0d5"/><path d="M54 125h89m-88 7h88" stroke="#cdbb9e" stroke-width="2"/><path d="m97 58 6 12 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2z" fill="#ffdf87" stroke="#bd6037" stroke-width="2"/><path d="M67 105h64" stroke="#b85f38" stroke-width="3"/></g>' },
  { word: 'notebook', picture: '<g transform="rotate(8 100 85)"><rect x="51" y="23" width="104" height="127" rx="7" fill="#83b5c7"/><rect x="58" y="19" width="91" height="124" rx="4" fill="#fffdf3"/><path d="M76 19v123" stroke="#ed9b98" stroke-width="2"/><path d="M82 44h55m-55 16h55m-55 16h55m-55 16h55m-55 16h55m-55 16h55" stroke="#a5c9d8" stroke-width="2"/><path d="M63 30H48q-8 0-8 7t8 7h15m0 9H48q-8 0-8 7t8 7h15m0 9H48q-8 0-8 7t8 7h15m0 9H48q-8 0-8 7t8 7h15m0 9H48q-8 0-8 7t8 7h15" fill="none" stroke="#566f7e" stroke-width="4"/></g>' },
  { word: 'bag', picture: '<path d="M79 39V26q21-15 42 0v13" fill="none" stroke="#397769" stroke-width="8"/><path d="M54 64q-7 34-5 71m97-71q7 34 5 71" fill="none" stroke="#386d62" stroke-width="9"/><path d="M62 56q0-22 38-22t38 22l7 84q0 14-14 14H69q-14 0-14-14z" fill="#67b5a1"/><path d="M72 69h56M71 69q29-20 58 0" fill="none" stroke="#337365"/><rect x="71" y="91" width="58" height="49" rx="10" fill="#f4c467"/><path d="M72 103h56" fill="none" stroke="#9a702e"/><path d="M117 104v10" stroke="#745a34" stroke-width="4"/><rect x="87" y="49" width="26" height="14" rx="4" fill="#d8eee3" stroke="#3e8b78" stroke-width="2"/>' },
  { word: 'desk', picture: '<path d="M46 77h13v77H46zm96 0h13v77h-13z" fill="#678c9d"/><path d="M39 70h127v40H39z" fill="#e5ae68"/><path d="M67 80h73v23H67z" fill="#f4c887"/><path d="M98 87h13" stroke="#946332" stroke-width="4"/><path d="m28 65 18-20h119l10 20v12H28z" fill="#b57848"/><path d="m28 65 18-20h119l10 20z" fill="#f0c587"/><path d="M59 133h83" stroke="#678c9d" stroke-width="7"/><path d="M50 53h102" stroke="#d7a467" stroke-width="2"/>' },
  { word: 'ruler', picture: '<g transform="rotate(-25 100 85)"><rect x="20" y="62" width="164" height="47" rx="5" fill="#f5c55a"/><path d="M33 63v21m12-21v12m12-12v21m12-21v12m12-12v21m12-21v12m12-12v21m12-21v12m12-12v21m12-21v12m12-12v21m12-21v12" stroke="#86652b" stroke-width="2"/><g fill="#86652b" stroke="none" font-family="Arial,sans-serif" font-size="11"><text x="29" y="99">0</text><text x="53" y="99">1</text><text x="77" y="99">2</text><text x="101" y="99">3</text><text x="125" y="99">4</text><text x="149" y="99">5</text></g></g>' },
  { word: 'pencil case', picture: '<g transform="rotate(-8 100 85)"><path d="M163 66q25-16 24 6t-23 16" fill="none" stroke="#7865a1" stroke-width="6"/><rect x="25" y="59" width="145" height="67" rx="16" fill="#a492c8"/><path d="M28 77h137" stroke="#655383" stroke-width="4"/><path d="M39 77h115" stroke="#e5dcee" stroke-width="3" stroke-dasharray="3 4"/><path d="M144 78v14l10-1-3-13" fill="#f2c769" stroke="#8c6c3f" stroke-width="2"/><path d="m66 95 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#e8dcf7" stroke="none"/><path d="M88 107h38" stroke="#d1c2e4" stroke-width="4"/></g>' }
];

const roundNames = ["Let's Look", "Let's Think", "You're a Star!"];
const choiceCounts = [2, 4, 6];
const totalQuestions = schoolThings.length * choiceCounts.length;
const ui = Object.fromEntries([
  'score', 'round-label', 'play-screen', 'round-screen', 'final-screen',
  'question-title', 'object-picture', 'answers', 'feedback', 'next',
  'round-message', 'next-round', 'final-score', 'final-title', 'progress',
  'progress-label', 'progress-count', 'restart', 'play-again', 'retry', 'listen', 'audio-status'
].map(id => [id, document.getElementById(id)]));
let round = 0;
let question = 0;
let score = 0;
let found = 0;
let answered = false;
let order = [];
let pronunciation = null;

function stopAudio() {
  if (pronunciation) {
    pronunciation.pause();
    pronunciation.currentTime = 0;
    pronunciation = null;
  }
  ui['audio-status'].textContent = '';
}

function playWord() {
  if (ui['play-screen'].hidden) return;
  stopAudio();
  const player = new Audio(schoolAudio[order[question].word]);
  pronunciation = player;
  ui['audio-status'].textContent = 'Listen!';
  player.addEventListener('ended', () => {
    if (pronunciation === player) ui['audio-status'].textContent = 'Tap to hear it again.';
  });
  // Starting inside this button handler satisfies mobile autoplay rules.
  player.play().catch(() => {
    if (pronunciation === player) ui['audio-status'].textContent = 'No sound? Tap Listen again.';
  });
}

function retryQuestion() {
  if (answered || ui['play-screen'].hidden) return;
  [...ui.answers.children].forEach(button => {
    button.disabled = false;
    button.classList.remove('wrong');
    button.querySelector('.answer-mark')?.remove();
  });
  ui.retry.hidden = true;
  ui.feedback.textContent = 'Try again! Tap the right word.';
  ui.feedback.className = 'feedback';
  ui.answers.firstElementChild.focus();
}

// Focused controls stay below the sticky score panel, including after rotation.
if ('ResizeObserver' in window) {
  new ResizeObserver(entries => {
    document.documentElement.style.setProperty('--status-height', `${entries[0].target.offsetHeight}px`);
  }).observe(document.querySelector('.game-status'));
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function showScreen(screen) {
  stopAudio();
  ['play-screen', 'round-screen', 'final-screen'].forEach(id => {
    ui[id].hidden = id !== screen;
  });
}

function updateProgress() {
  ui.score.textContent = score;
  ui.progress.value = found;
  ui.progress.textContent = `${found} of ${totalQuestions} questions answered`;
  ui.progress.setAttribute('aria-valuetext', `${found} of ${totalQuestions} questions answered`);
  ui['progress-count'].textContent = `${found} of ${totalQuestions} answered`;
  document.querySelectorAll('.round-step').forEach((step, index) => {
    const done = found >= (index + 1) * schoolThings.length;
    step.classList.toggle('active', index === round && !done);
    step.classList.toggle('done', done);
    if (index === round && !done) step.setAttribute('aria-current', 'step');
    else step.removeAttribute('aria-current');
    step.querySelector('.step-status').textContent = done ? '✓' : index === round ? 'NOW' : '';
  });
}

function showQuestion(moveFocus = true) {
  showScreen('play-screen');
  answered = false;
  ui.next.hidden = true;
  ui.retry.hidden = true;
  ui.feedback.textContent = 'You can do it!';
  ui.feedback.className = 'feedback';
  ui['round-label'].textContent = `Round ${round + 1} of 3 · ${roundNames[round]}`;
  // One question counter across the whole game; rounds have their own label.
  const currentQuestion = round * schoolThings.length + question + 1;
  ui['progress-label'].textContent = `Question ${currentQuestion} of ${totalQuestions}`;
  const thing = order[question];
  ui['object-picture'].innerHTML = `<svg class="object-art" width="200" height="170" viewBox="0 0 200 170" role="img" aria-label="${thing.word}" xmlns="http://www.w3.org/2000/svg"><g stroke="#405651" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${thing.picture}</g></svg>`;
  const distractors = shuffle(schoolThings.filter(item => item.word !== thing.word));
  const choices = shuffle([thing, ...distractors.slice(0, choiceCounts[round] - 1)]);
  ui.answers.replaceChildren();
  ui.answers.classList.toggle('many', round === 2);
  choices.forEach(choice => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer';
    const label = document.createElement('span');
    label.className = 'answer-word';
    label.textContent = choice.word;
    button.append(label);
    button.addEventListener('click', () => chooseAnswer(button, choice.word));
    ui.answers.append(button);
  });
  updateProgress();
  // Bring the new prompt into view after answering lower down on a phone.
  if (moveFocus) {
    ui['question-title'].focus();
    // The picture now sits above the prompt; keep both in view on phones.
    ui['object-picture'].parentElement.scrollIntoView({ block: 'start' });
  }
}

function chooseAnswer(button, word) {
  // Guard against double-clicks: each picture can earn points only once.
  if (answered || button.disabled) return;
  const correct = word === order[question].word;
  button.classList.add(correct ? 'correct' : 'wrong');
  const mark = document.createElement('span');
  mark.className = 'answer-mark';
  mark.setAttribute('aria-hidden', 'true');
  mark.textContent = correct ? '✓' : '×';
  button.append(mark);
  if (!correct) {
    button.disabled = true;
    ui.feedback.textContent = 'Not yet! Try another word.';
    ui.feedback.className = 'feedback retry';
    ui.retry.hidden = false;
    // Keep keyboard pupils on a usable answer after a wrong choice.
    const available = [...ui.answers.children].find(answer => !answer.disabled);
    if (available) available.focus({ preventScroll: true });
    return;
  }
  answered = true;
  ui.retry.hidden = true;
  score += 10;
  found += 1;
  [...ui.answers.children].forEach(answer => { answer.disabled = true; });
  ui.feedback.textContent = `Yes! It is a ${word}. +10 points!`;
  ui.feedback.className = 'feedback success';
  const lastPicture = question === schoolThings.length - 1;
  const nextText = lastPicture ? (round === 2 ? 'See my score' : 'Finish round') : 'Next question';
  ui.next.innerHTML = `${nextText} <span aria-hidden="true">→</span>`;
  ui.next.hidden = false;
  updateProgress();
  ui.next.focus();
}

function nextPicture() {
  if (!answered) return;
  if (question < schoolThings.length - 1) {
    question += 1;
    showQuestion();
  } else if (round < 2) {
    showScreen('round-screen');
    ui['round-message'].textContent = `Round ${round + 1} is done!`;
    ui['next-round'].innerHTML = `Start round ${round + 2} <span aria-hidden="true">→</span>`;
    ui['progress-label'].textContent = `${found} of ${totalQuestions} questions complete`;
    ui['round-message'].focus();
  } else {
    showScreen('final-screen');
    ui['final-score'].textContent = score;
    ui['round-label'].textContent = 'All 3 rounds done!';
    ui['progress-label'].textContent = `${totalQuestions} of ${totalQuestions} questions complete`;
    ui['final-title'].focus();
  }
}

function restart(moveFocus = true) {
  round = 0;
  question = 0;
  score = 0;
  found = 0;
  order = shuffle(schoolThings);
  showQuestion(moveFocus);
}

ui.next.addEventListener('click', nextPicture);
ui['next-round'].addEventListener('click', () => {
  if (ui['round-screen'].hidden || round >= 2) return;
  round += 1;
  question = 0;
  order = shuffle(schoolThings);
  showQuestion();
});
ui.restart.addEventListener('click', () => restart());
ui['play-again'].addEventListener('click', () => restart());
ui.retry.addEventListener('click', retryQuestion);
ui.listen.addEventListener('click', playWord);
document.addEventListener('visibilitychange', () => { if (document.hidden) stopAudio(); });
restart(false);
