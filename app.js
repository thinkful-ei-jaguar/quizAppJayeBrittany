'use strict';
/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      id: 1,
      question: 'Who is the oldest Kardashian sister?',
      answers: [
        'Kim',
        'Kourtney',
        'Khloe',
        'Kendall'
      ],
      correctAnswer: 'Kourtney'
    },
    {
      id: 2,
      question: 'What year did Keeping Up with the Kardashians first debut?',
      answers: [
        '2009',
        '2008',
        '2007',
        '2006'
      ],
      correctAnswer: '2007' // KUWTK debuted OCT 14, 2007
    },
    {
      id: 3,
      question: 'To date, how many seasons have there been of KUWTK?',
      answers: [
        '15',
        '9',
        '12',
        '17'
      ],
      correctAnswer: '17'
    },
    {
      id: 4,
      question: 'Which of these Kardashian/Jenners has NOT gotten their own spin-off show on E?',
      answers: [
        'Khloe', // Khloe & Lamar
        'Kim',
        'Kylie', // Life of Kylie premiered...
        'Rob' // Rob & Chyna...
      ],
      correctAnswer: 'Kim' // suprisingly...
    },
    {
      id: 5,
      question: 'Which of these KUWTK regulars has the most followers on Instagram?',
      answers: [
        'Kim',
        'Kendall',
        'Kylie',
        'Kris'
      ],
      correctAnswer: 'Kim' // 153 vs 152
    }

  ],
  questionNumber: 0,
  score: 0,
  quizStarted: false,
  answered: false,
  currentCorrectAnswer: null,
  correct: null,
  answerChoice = null
};

/**
 *
 * Your app should include a render() function, that regenerates
 * the view each time the store is updated. See your course
 * material, consult your instructor, and reference the slides
 * for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 */
function generateStarterHTML() {
  return `<header>
  <h1>Test Your Knowledge</h1>
</header>
<button class="btn js-start-btn">START</button>`;
}

function generateResultsPage() {
  return `<header>
  Results
</header>
<section>
<p>Your Score:
<span class="final-score">6</span>/10</p>
</section>
<button class="btn js-restart-btn">
RESTART
</button>`;
}

function generateAnswerChoiceHTML(answerChoice) {
  let feedback = null;
  if (store.answered === true) {
    if (store.answerChoice === answerChoice) {
      feedback = store.correct ? '<div class="correct">Correct!</div>' : '<div class="incorrect">Incorrect!</div>';
    }
  }
  return `<div id="option-container-a">
  <label for="a" />
  <input name="answerChoice" value=${answerChoice} id="a" type="radio">${answerChoice}
  ${feedback}
</div>`;
}

function generateQuestionsHTML() {
  let q = store.questions.find(q => q.id === store.questionNumber);
  store.currentCorrectAnswer = q.correctAnswer;

  let btnContent = store.answered ? 'Next' : 'Submit'

  return `<form id="main-form" action="">
  <fieldset>
      <legend>
          ${q.question}
      </legend>
      ${q.answers.map(a => generateAnswerChoiceHTML(a))}
      <button type="submit" value="submit" class="js-next-submit-btn">
      ${btnContent}
      </button>
  </fieldset>
</form>`;
}

function handleSubmitClick() {
  $('main').on('submit', '#main-form', e => {
    e.preventDefault();
    console.log('user clicked submit button');
    let answerChoice = $('input[name=answerChoice]:checked').val();
    console.log(answerChoice);

    let question = store.questions.find(q => q.id === store.questionNumber);

    if (question.correctAnswer === answerChoice) {
      store.correct = true;
    } else {
      store.correct = false;
    }

    console.log($(e.currentTarget).find('button').text());
    if ($(e.currentTarget).find('button').text().trim() === 'Submit') { // submit button pressed
      store.answered = true;
      let answerChoice = $('input[name=answerChoice]:checked').val();
      store.answerChoice = answerChoice;
    } else { //next button pressed
      store.questionNumber++;
      store.answered = false;
      store.correct = null;
    }

    render();
  });

}

// When user clicks start button, set quiz started to true, update question number, re-render
function handleStartClick() {
  $('main').on('click', '.js-start-btn', e => {
    store.quizStarted = true;
    store.questionNumber = 1;
    render();
  });
}

function render() {
  // cond
  let html = '';

  if (store.questionNumber === 0) {
    html += generateStarterHTML();
  } else if (store.questionNumber > 0 && store.questionNumber <= 5) {
    html += generateQuestionsHTML();
  } else {
    html += generateResultsPage();
  }

  $('main').html(html);
}

function handleRestartClick() {
  $('main').on('click', '.js-restart-btn', e => {
    store.questionNumber = 0;
    store.score = 0;
    store.quizStarted = false;
    store.answered = false;
    store.correct = null;
    render();
  });
}

function handleQuizApp() {
  render();
  handleStartClick(); // event listeners 
  handleSubmitClick();
  handleRestartClick();
}


$(handleQuizApp);