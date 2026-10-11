'use strict';

// Each round has five original questions. All content stays on this device.
const ROUND_NAMES = [
  'Question Tag Basics',
  'Present Simple and Past Simple',
  'To Be and Modal Verbs',
  'Mixed Grammar Challenge'
];

const QUESTION_BANK = [
  { sentence: 'Your sister is a prefect,', choices: ["isn't she?", "doesn't she?", "wasn't she?"], answer: "isn't she?", explanation: '“Is” is positive, so use “isn’t”. Your sister becomes “she”.' },
  { sentence: "They don't live near the school,", choices: ["don't they?", 'do they?', 'are they?'], answer: 'do they?', explanation: '“Don’t” is negative, so the tag is positive: “do they?”' },
  { sentence: 'We can finish this project today,', choices: ['can we?', "can't we?", "don't we?"], answer: "can't we?", explanation: 'Keep the modal verb “can” and the pronoun “we”. A positive statement takes “can’t we?”' },
  { sentence: "Your brothers aren't tired,", choices: ["aren't they?", 'do they?', 'are they?'], answer: 'are they?', explanation: '“Aren’t” is negative, so use “are”. Your brothers become “they”.' },
  { sentence: "He isn't at home,", choices: ['is he?', "isn't he?", 'does he?'], answer: 'is he?', explanation: 'The statement uses negative “isn’t”, so the tag uses positive “is he?”' },

  { sentence: 'Ali plays football after school,', choices: ["don't he?", "doesn't he?", "isn't he?"], answer: "doesn't he?", explanation: '“Plays” is present simple. With “he”, use “does”. The positive statement needs “doesn’t he?”' },
  { sentence: 'Amir played badminton yesterday,', choices: ["doesn't he?", "didn't he?", "wasn't he?"], answer: "didn't he?", explanation: '“Played” is past simple. Use “didn’t”, and Amir becomes “he”.' },
  { sentence: 'They live near the park,', choices: ["don't they?", "doesn't they?", "didn't they?"], answer: "don't they?", explanation: '“Live” is positive present simple. With “they”, use the negative tag “don’t they?”' },
  { sentence: 'She visited the museum last Saturday,', choices: ["isn't she?", "doesn't she?", "didn't she?"], answer: "didn't she?", explanation: '“Visited” is past simple. A positive past-simple statement takes “didn’t she?”' },
  { sentence: "The pupils didn't arrive late,", choices: ["didn't they?", 'did they?', 'do they?'], answer: 'did they?', explanation: '“Didn’t” is negative past simple, so use positive “did”. The pupils become “they”.' },

  { sentence: "The pupils weren't noisy,", choices: ["weren't they?", 'did they?', 'were they?'], answer: 'were they?', explanation: '“Weren’t” is a negative form of “to be”. Use positive “were they?”' },
  { sentence: 'We are ready for Sports Day,', choices: ["aren't we?", "don't we?", 'are we?'], answer: "aren't we?", explanation: 'The helping verb is positive “are”, so use the negative tag “aren’t we?”' },
  { sentence: 'You should recycle these bottles,', choices: ["don't you?", "shouldn't you?", 'should you?'], answer: "shouldn't you?", explanation: 'Keep the modal verb “should”. The positive statement needs “shouldn’t you?”' },
  { sentence: 'She will join our study group,', choices: ["doesn't she?", 'will she?', "won't she?"], answer: "won't she?", explanation: '“Won’t” is the negative form of “will”. Keep the pronoun “she”.' },
  { sentence: "Your father wasn't angry,", choices: ['was he?', "wasn't he?", 'did he?'], answer: 'was he?', explanation: '“Wasn’t” is negative, so use positive “was”. Your father becomes “he”.' },

  { sentence: 'You will plant trees tomorrow,', choices: ["won't they?", "won't you?", "don't you?"], answer: "won't you?", explanation: 'Positive “will” takes negative “won’t”. Keep the pronoun “you”.' },
  { sentence: 'Your cousins visited Langkawi last month,', choices: ["didn't they?", "don't they?", "weren't they?"], answer: "didn't they?", explanation: '“Visited” is past simple. Use “didn’t”, and your cousins become “they”.' },
  { sentence: "Siti doesn't waste water,", choices: ["doesn't she?", 'is she?', 'does she?'], answer: 'does she?', explanation: '“Doesn’t” is negative present simple. Use positive “does”, and Siti becomes “she”.' },
  { sentence: 'Your friends can bake a cake,', choices: ["don't they?", "can't they?", 'can they?'], answer: "can't they?", explanation: 'Use the same modal verb: “can” becomes “can’t”. Your friends become “they”.' },
  { sentence: 'The beach was clean after our picnic,', choices: ["wasn't it?", "didn't it?", "isn't it?"], answer: "wasn't it?", explanation: 'The statement uses positive past-tense “was”, so use “wasn’t”. The beach becomes “it”.' }
];

const LESSONS = [
  { title: 'Positive statement → negative tag', description: 'When the statement is positive, make the question tag negative.', examples: ['She <strong class="positive">is</strong> your friend, <strong class="tag">isn’t she?</strong>', 'They <strong class="positive">can</strong> swim, <strong class="tag">can’t they?</strong>'], malay: 'Ayat positif → question tag negatif.', practice: 'She is your friend, _____?', choices: ['is she?', "isn't she?"], answer: "isn't she?", reason: '“Is” is positive. Change it to negative “isn’t she?”' },
  { title: 'Negative statement → positive tag', description: 'When the statement is negative, make the question tag positive.', examples: ['He <strong class="negative">isn’t</strong> at home, <strong class="tag">is he?</strong>', 'You <strong class="negative">don’t</strong> like spicy food, <strong class="tag">do you?</strong>'], malay: 'Ayat negatif → question tag positif.', practice: "You don't like spicy food, _____?", choices: ['do you?', "don't you?"], answer: 'do you?', reason: '“Don’t” is negative. The tag is positive: “do you?”' },
  { title: 'Present simple: do or does', description: 'Use “does” for he, she or it. Use “do” for I, you, we or they. Then change positive ↔ negative.', examples: ['Ali <strong class="positive">plays</strong> football, <strong class="tag">doesn’t he?</strong>', 'They <strong class="positive">live</strong> nearby, <strong class="tag">don’t they?</strong>'], malay: 'Present simple: guna “does” untuk he, she, it; “do” untuk I, you, we, they.', practice: 'Ali plays football, _____?', choices: ["doesn't he?", "don't he?"], answer: "doesn't he?", reason: 'Ali becomes “he”. “Plays” is present simple, so use “doesn’t he?”' },
  { title: 'Past simple: did', description: 'Use “did” for past-simple actions. Positive actions take “didn’t”; negative actions take “did”.', examples: ['She <strong class="positive">visited</strong> the museum, <strong class="tag">didn’t she?</strong>', 'They <strong class="negative">didn’t</strong> arrive late, <strong class="tag">did they?</strong>'], malay: 'Past simple: ayat positif guna “didn’t”; ayat negatif guna “did”.', practice: 'She visited the museum, _____?', choices: ["doesn't she?", "didn't she?"], answer: "didn't she?", reason: '“Visited” is past simple. Use “didn’t she?”' },
  { title: 'To be: match the verb', description: 'Keep the same form of “to be”: is, are, was or were. Change positive ↔ negative.', examples: ['We <strong class="positive">are</strong> ready, <strong class="tag">aren’t we?</strong>', 'He <strong class="negative">wasn’t</strong> angry, <strong class="tag">was he?</strong>'], malay: 'Padankan kata kerja “to be” dan kala: is, are, was atau were.', practice: "He wasn't angry, _____?", choices: ['was he?', "wasn't he?"], answer: 'was he?', reason: 'Keep past-tense “was”. Negative “wasn’t” takes positive “was he?”' },
  { title: 'Modal verbs: keep the modal', description: 'Use the same modal verb in the tag: can, should or will. Remember: will + not = won’t.', examples: ['You <strong class="positive">should</strong> study, <strong class="tag">shouldn’t you?</strong>', 'She <strong class="positive">will</strong> join us, <strong class="tag">won’t she?</strong>'], malay: 'Guna kata bantu modal yang sama. Bentuk negatif “will” ialah “won’t”.', practice: 'She will join us, _____?', choices: ['will she?', "won't she?"], answer: "won't she?", reason: 'Positive “will” takes negative “won’t she?”' }
];

const byId = id => document.getElementById(id);
let screen = 'menu';
let resumeScreen = null;
let lessonIndex = 0;
let tutorialPurpose = 'new';
let questionIndex = 0;
let results = Array(20).fill(null);
let attempted = false;
let lastRound = 0;

function totalScore() { return results.filter(result => result === true).length * 10; }
function completedCount() { return results.filter(result => result !== null).length; }

function moveFocus(heading) {
  heading.focus({ preventScroll: true });
  heading.scrollIntoView({ block: 'start' });
}

function showScreen(nextScreen, heading, focus = true) {
  screen = nextScreen;
  document.body.dataset.screen = screen;
  ['menu', 'tutorial', 'quiz', 'round', 'results'].forEach(name => {
    byId(`${name}-screen`).hidden = name !== screen;
  });
  if (focus) moveFocus(byId(heading));
}

function showMenu() {
  if (screen === 'quiz' || screen === 'round') resumeScreen = screen;
  if (screen === 'results') resumeScreen = null;
  byId('resume').hidden = !resumeScreen;
  byId('learn-play').textContent = resumeScreen ? 'Learn & start a new challenge →' : 'Learn & play →';
  showScreen('menu', 'menu-title');
}

function openTutorial(purpose) {
  if (purpose === 'help') resumeScreen = 'quiz';
  tutorialPurpose = purpose;
  lessonIndex = 0;
  byId('start-challenge').textContent = purpose === 'help' ? 'Back to challenge →' : 'Start Challenge →';
  renderLesson();
  showScreen('tutorial', 'tutorial-title');
}

function renderLesson() {
  const lesson = LESSONS[lessonIndex];
  byId('lesson-count').textContent = `Rule ${lessonIndex + 1} of 6`;
  byId('lesson-progress').value = lessonIndex + 1;
  byId('lesson-kicker').textContent = `RULE ${String.fromCharCode(65 + lessonIndex)}`;
  byId('lesson-title').textContent = lesson.title;
  byId('lesson-description').textContent = lesson.description;
  byId('lesson-examples').replaceChildren();
  lesson.examples.forEach(example => {
    const line = document.createElement('div');
    line.className = 'example';
    line.innerHTML = example; // Author-written examples only; no user input.
    byId('lesson-examples').append(line);
  });
  byId('lesson-malay').textContent = lesson.malay;
  byId('lesson-back').disabled = lessonIndex === 0;
  byId('lesson-next').disabled = lessonIndex === LESSONS.length - 1;
  byId('practice-question').textContent = lesson.practice;
  byId('practice-feedback').textContent = 'Tap an answer to try the rule.';
  byId('practice-feedback').className = 'feedback';
  byId('practice-answers').replaceChildren();
  lesson.choices.forEach(choice => {
    const button = makeAnswer(choice);
    button.addEventListener('click', () => {
      if (screen !== 'tutorial' || button.disabled) return;
      const correct = choice === lesson.answer;
      button.classList.add(correct ? 'correct' : 'wrong');
      button.disabled = true;
      addMark(button, correct);
      byId('practice-feedback').textContent = `${correct ? 'Exactly!' : 'Try the other answer!'} ${lesson.reason}`;
      byId('practice-feedback').className = `feedback ${correct ? 'success' : 'retry'}`;
      if (correct) [...byId('practice-answers').children].forEach(answer => { answer.disabled = true; });
    });
    byId('practice-answers').append(button);
  });
}

function makeAnswer(text, code) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'answer';
  const content = document.createElement('span');
  content.className = 'answer-content';
  if (code) {
    const letter = document.createElement('span');
    letter.className = 'choice-code';
    letter.textContent = code;
    letter.setAttribute('aria-hidden', 'true');
    content.append(letter);
  }
  const label = document.createElement('span');
  label.className = 'answer-label';
  label.textContent = text;
  content.append(label);
  button.append(content);
  return button;
}

function addMark(button, correct) {
  const mark = document.createElement('span');
  mark.className = 'answer-mark';
  mark.textContent = correct ? '✓' : '×';
  mark.setAttribute('aria-hidden', 'true');
  button.append(mark);
}

function fillStars(container, correct, total = 5) {
  container.replaceChildren();
  for (let index = 0; index < total; index += 1) {
    const star = document.createElement('span');
    star.textContent = index < correct ? '★' : '☆';
    star.className = index < correct ? 'star-earned' : '';
    container.append(star);
  }
  container.setAttribute('aria-label', `${correct} of ${total} stars earned`);
}

function roundCorrect(roundIndex) {
  return results.slice(roundIndex * 5, roundIndex * 5 + 5).filter(result => result === true).length;
}

function updateProgress() {
  const roundIndex = Math.floor(questionIndex / 5);
  const count = completedCount();
  byId('score').textContent = totalScore();
  byId('round-label').textContent = `Round ${roundIndex + 1} of 4 · ${ROUND_NAMES[roundIndex]}`;
  byId('question-count').textContent = `Question ${questionIndex + 1} of 20`;
  byId('completed-count').textContent = `${count} of 20 complete`;
  byId('game-progress').value = count;
  byId('game-progress').textContent = `${count} of 20 questions completed`;
  byId('game-progress').setAttribute('aria-valuetext', `${count} of 20 questions completed`);
  byId('round-count').textContent = `This round: question ${questionIndex % 5 + 1} of 5`;
  fillStars(byId('round-stars'), roundCorrect(roundIndex));
}

function renderQuestion() {
  const item = QUESTION_BANK[questionIndex];
  const renderedIndex = questionIndex;
  attempted = false;
  byId('quiz-title').replaceChildren(document.createTextNode(`${item.sentence} `));
  const gap = document.createElement('span');
  gap.className = 'tag-gap';
  gap.textContent = '_____?';
  byId('quiz-title').append(gap);
  byId('answers').replaceChildren();
  item.choices.forEach((choice, index) => {
    const button = makeAnswer(choice, String.fromCharCode(65 + index));
    button.addEventListener('click', () => chooseAnswer(button, choice, renderedIndex));
    byId('answers').append(button);
  });
  byId('feedback').textContent = "Choose an answer. You've got this!";
  byId('feedback').className = 'feedback';
  byId('response').className = 'response';
  byId('explanation').textContent = '';
  byId('retry').hidden = true;
  byId('next-question').hidden = true;
  updateProgress();
  resumeScreen = 'quiz';
  showScreen('quiz', 'quiz-title');
}

function chooseAnswer(button, choice, renderedIndex) {
  // One question can earn points once, even with repeated touch/click events.
  if (screen !== 'quiz' || renderedIndex !== questionIndex || results[questionIndex] !== null || button.disabled) return;
  const correct = choice === QUESTION_BANK[questionIndex].answer;
  attempted = true;
  button.classList.add(correct ? 'correct' : 'wrong');
  button.disabled = true;
  addMark(button, correct);
  byId('feedback').className = `feedback ${correct ? 'success' : 'retry'}`;
  byId('response').className = `response ${correct ? 'success' : 'retry'}`;
  byId('explanation').textContent = QUESTION_BANK[questionIndex].explanation;
  byId('next-question').hidden = false;
  if (correct) {
    results[questionIndex] = true;
    [...byId('answers').children].forEach(answer => { answer.disabled = true; });
    byId('feedback').textContent = `${questionIndex % 2 ? 'Great work!' : 'Brilliant!'} +10 points. You earned a star!`;
    byId('retry').hidden = true;
    byId('next-question').textContent = questionIndex === 19 ? 'See my results →' : questionIndex % 5 === 4 ? 'Finish round →' : 'Next question →';
    updateProgress();
    byId('next-question').focus();
  } else {
    byId('feedback').textContent = 'Not yet! 0 points. Try again before moving on.';
    byId('retry').hidden = false;
    byId('next-question').textContent = 'Move on · 0 points →';
    [...byId('answers').children].find(answer => !answer.disabled)?.focus({ preventScroll: true });
  }
}

function retryQuestion() {
  if (screen !== 'quiz' || results[questionIndex] !== null) return;
  attempted = false;
  [...byId('answers').children].forEach(button => {
    button.disabled = false;
    button.classList.remove('wrong');
    button.querySelector('.answer-mark')?.remove();
  });
  byId('retry').hidden = true;
  byId('next-question').hidden = true;
  byId('feedback').textContent = 'Try again! Match the helping verb and pronoun.';
  byId('feedback').className = 'feedback';
  byId('response').className = 'response';
  byId('explanation').textContent = '';
  byId('answers').firstElementChild.focus();
}

function startChallenge() {
  questionIndex = 0;
  results = Array(20).fill(null);
  resumeScreen = null;
  renderQuestion();
}

function nextQuestion() {
  if (screen !== 'quiz' || !attempted) return;
  if (results[questionIndex] === null) results[questionIndex] = false;
  attempted = false;
  updateProgress();
  if (questionIndex === 19) {
    showResults();
  } else if (questionIndex % 5 === 4) {
    lastRound = Math.floor(questionIndex / 5);
    const correct = roundCorrect(lastRound);
    byId('round-title').textContent = `Round ${lastRound + 1} complete!`;
    fillStars(byId('round-result-stars'), correct);
    byId('round-summary').textContent = `You earned ${correct * 10} of 50 points this round. Total: ${totalScore()} of 200.`;
    byId('next-round-label').textContent = `Up next: ${ROUND_NAMES[lastRound + 1]}`;
    resumeScreen = 'round';
    showScreen('round', 'round-title');
  } else {
    questionIndex += 1;
    renderQuestion();
  }
}

function showResults() {
  resumeScreen = null;
  const score = totalScore();
  const percent = score / 2;
  byId('final-score').textContent = score;
  byId('percentage').textContent = `${percent}%`;
  byId('correct-count').textContent = `${score / 10} / 20`;
  const badge = percent >= 90 ? 'Question Tag Master' : percent >= 70 ? 'Grammar Star' : percent >= 40 ? 'Rising Star' : 'Brave Learner';
  byId('achievement').textContent = badge;
  byId('result-message').textContent = percent >= 90 ? 'Excellent work! You matched the verbs and pronouns like a master.' : percent >= 70 ? 'Great progress! Review the tricky rules and aim for your next badge.' : 'Every try helps you learn. Revisit the rules and challenge yourself again!';
  byId('round-results').replaceChildren();
  ROUND_NAMES.forEach((name, index) => {
    const row = document.createElement('div');
    row.className = 'round-result';
    const label = document.createElement('span');
    label.textContent = `Round ${index + 1} · ${name}`;
    const points = document.createElement('strong');
    points.textContent = `${roundCorrect(index) * 10} / 50`;
    row.append(label, points);
    byId('round-results').append(row);
  });
  showScreen('results', 'results-title');
}

byId('learn-play').addEventListener('click', () => openTutorial('new'));
byId('rule-help').addEventListener('click', () => openTutorial('help'));
byId('lesson-back').addEventListener('click', () => {
  if (lessonIndex <= 0) return;
  lessonIndex -= 1;
  renderLesson();
  moveFocus(byId('lesson-title'));
});
byId('lesson-next').addEventListener('click', () => {
  if (lessonIndex >= LESSONS.length - 1) return;
  lessonIndex += 1;
  renderLesson();
  moveFocus(byId('lesson-title'));
});
byId('start-challenge').addEventListener('click', () => {
  if (tutorialPurpose === 'help' && resumeScreen) showScreen('quiz', 'quiz-title');
  else startChallenge();
});
byId('resume').addEventListener('click', () => {
  if (resumeScreen) showScreen(resumeScreen, resumeScreen === 'round' ? 'round-title' : 'quiz-title');
});
byId('retry').addEventListener('click', retryQuestion);
byId('next-question').addEventListener('click', nextQuestion);
byId('next-round').addEventListener('click', () => {
  if (screen !== 'round') return;
  questionIndex += 1;
  renderQuestion();
});
byId('restart').addEventListener('click', startChallenge);
byId('play-again').addEventListener('click', startChallenge);
document.querySelectorAll('[data-menu]').forEach(button => button.addEventListener('click', showMenu));
byId('brand-home').addEventListener('click', event => { event.preventDefault(); showMenu(); });

if ('ResizeObserver' in window) {
  new ResizeObserver(entries => {
    const height = entries[0].target.offsetHeight;
    if (height) document.documentElement.style.setProperty('--status-height', `${height}px`);
  }).observe(document.querySelector('.quiz-status'));
}
showScreen('menu', 'menu-title', false);
