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
  answered: false,
  correct: null,
  answerChoice: null
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
  return `<header class="starting-header">
  <h1>How Big of a Kardashian Fan Are You?</h1>
  <p>Think you know the Kardashians? Take this Quiz to test your knowledge.</p>
  <p>CLICK THE BUTTON BELOW TO GET STARTED</p>
</header>
<button class="btn start-btn js-start-btn">BEGIN</button>`;
}

function generateResultsPage() {
  return `<header>
  <h1>Results</h1>
</header>
<section>
<p>Your Score:
<span class="final-score">${store.score}</span>/5</p>
</section>${generateRestartButtonHTML}`;
}

function generateRestartButtonHTML() {
  return `<button class="btn start-btn js-restart-btn">
  RESTART
  </button>`;
}

function generateAnswerChoiceHTML(answerChoice) {
  let feedback = '';
  let required = store.answered ? '' : 'required';
  let disabled = store.answered ? 'disabled' : '';



  let currentQ = store.questions.find(q => q.id === store.questionNumber);


  let correct = currentQ.correctAnswer;
  const randID = Math.random();

  if (store.answered === true) {
    if (store.answerChoice === answerChoice) {
      feedback = store.correct ? '<div class="correct feedback">Correct!</div>' : `<div class="incorrect feedback">Incorrect! The correct answer is ${correct}</div>`;
    }
  }


  return `<div class="option-container">


  <input ${disabled} ${required} name="answerChoice" value="${answerChoice}" id="${randID}" type="radio"> 
  <label class="answerChoice" for="${randID}"> ${answerChoice} ${feedback}</label>

  </div>`;
}

function generateQuestionsHTML() {
  let q = store.questions.find(q => q.id === store.questionNumber);
  let btnContent = store.answered ? 'Next' : 'Submit';

  return `<form id="main-form" action="">
  <fieldset>
      <legend>
          <h2>${q.question}</h2>
      </legend>

     

      <div class= "answers">
        ${q.answers.map(a => generateAnswerChoiceHTML(a)).join('')}
      </div>

      <button type="submit" value="submit" class="btn js-next-submit-btn">
      ${btnContent}

      </button>
  </fieldset>
</form>`;
}

function generateScoreQuestion() {
  return `<section class="score-box">
  <p>Question:
      <span class="js-question-number">${store.questionNumber}</span>/5</p>
  <p>Score:
      <span class="js-score">${store.score}</span>/${store.questions.length}</p>
</section>`;
}

function handleSubmitClick() {
  let answerChoice = $('input[name=answerChoice]:checked').val();

  store.answered = true;
  store.answerChoice = answerChoice;

  let question = store.questions.find(q => q.id === store.questionNumber);

  if (question.correctAnswer === answerChoice) { // user got correct answer
    store.correct = true;
    store.score++;
  } else { // user got incorrect answer
    store.correct = false;
  }
}

function handleNextClick() {
  store.questionNumber++;
  store.answered = false;
  store.correct = null;
  store.answerChoice = null;
}

function handleButtonClick() {
  $('main').on('submit', '#main-form', e => {
    e.preventDefault();

    if ($(e.currentTarget).find('button').text().trim() === 'Submit') { // submit button pressed
      // update store to reflect the fact the user answered
      handleSubmitClick();

    } else { //next button pressed
      handleNextClick();
    }

    render();
  });

}

// When user clicks start button, set quiz started to true, update question number, re-render
function handleStartClick() {
  $('main').on('click', '.js-start-btn', e => {
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
    html += generateScoreQuestion();
  } else {
    html += generateResultsPage();
  }

  $('.container-main').html(html);
}

function handleRestartClick() {
  $('main').on('click', '.js-restart-btn', e => {
    store.questionNumber = 0;
    store.score = 0;
    store.quizStarted = false;
    store.answered = false;
    store.correct = null;
    store.answerChoice = null;
    render();
  });
}

function handleQuizApp() {
  render();
  handleStartClick(); // event listeners 
  handleButtonClick();
  handleRestartClick();
}


$(handleQuizApp);