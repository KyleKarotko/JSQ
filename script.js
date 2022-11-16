//Questions for quiz

var questions = [
    {
      title: 'Commonly used data types DO NOT include:',
      choices: ['strings', 'booleans', 'alerts', 'numbers'],
      answer: 'alerts',
    },
    {
      title: 'The condition in an if / else statement is enclosed within ____.',
      choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
      answer: 'parentheses',
    },
    {
      title: 'Arrays in JavaScript can be used to store ____.',
      choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above',],
      answer: 'all of the above',
    },
    {
      title:
        'String values must be enclosed within ____ when being assigned to variables.',
      choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
      answer: 'quotes',
    },
    {
      title:
        'A very useful tool used during development and debugging for printing content to the debugger is:',
      choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
      answer: 'console.log',
    },
  ];
  
// Global vars
var secondsLeft = 75;
var questionList = 0;
var quizEl = document.getElementById("questions")
var feedbackEl = document.getElementById('feedback');
var endScreenEl = document.getElementById('end-screen');
var timerEl = document.getElementById('time');
var initialsEl = document.getElementById('initials');
var timerId;
var time = questions.length * 15;
var submitBtn = document.getElementById('submit');



// starts the quiz
var startButton = document.querySelector("#start");

startButton.addEventListener("click", function(){
document.getElementById("start-screen").classList.add("hide");
quizEl.classList.remove("hide");
askQuestion();

timerId = setInterval(setTime, 1000);
timerEl.textContent = time;
});


// timer function
function setTime(){
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    saveScore();
  }
}

    
// function to ask questions
function askQuestion(){
    var currentQuestion = questions[questionList];
    document.getElementById("question-title").textContent = currentQuestion.title;
    document.querySelector(".choices").innerHTML = ""
    currentQuestion.choices.forEach(function(choice){
      var button = document.createElement("button")
      button.textContent = choice
      button.setAttribute("value",choice)
      button.onclick = function(){
        if (this.value !== currentQuestion.answer){
          time -= 15;
          timerEl.textContent = time;
          feedbackEl.textContent = 'Wrong';
          
        } else {
          
          feedbackEl.textContent = 'Correct!';
        }
        feedbackEl.setAttribute('class', 'feedback');
        setTimeout(function () {
        feedbackEl.setAttribute('class', 'feedback hide');
        }, 1000);
        questionList++;
        
        if (time <= 0 || questionList === questions.length) {
          document.getElementById("question-title").classList.add("hide");
          document.querySelector(".choices").innerHTML = "";
          endScreenEl.removeAttribute('class');
          gameOver();
          if (time < 0 || questionList === questions.length) {
            gameOver();
          } else {
            askQuestion();
          }
          
        } else {
          askQuestion();
        };
        
      }
      document.querySelector(".choices").appendChild(button)

    })

}
// Game over

function gameOver() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');
  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;
  quizEl.setAttribute('class', 'hide');
}

// save scores

function saveScore() {
  var finalScoreEl = document.getElementById('highscores');
  finalScoreEl.textContent = time;
  var initials = initialsEl.value;
   
    var currentScore = JSON.parse(window.localStorage.getItem('highscores'));
    var newScore = {
      score: time,
      initials: initials,
    };
    currentScore.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(currentScore));

    submitBtn.onclick = saveScore;
  }

    // display highscores
    
  function showScores(){
    var currentScore = JSON.parse(window.localStorage.getItem('highscores'));
    for (var i = 0; i < currentScore.length; i += 1) {
      var liEl= document.createElement('li');
      liEl.textContent = currentScore[i].initials + ' - ' + currentScore[i].score;
      var olEl = document.getElementById('highscores');
      olEl.appendChild(liTag);
  }
};
