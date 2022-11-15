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
var timeEl = document.querySelector(".time");
var secondsLeft = 75;
var questionList = 0;
var quizEl = document.getElementById("questions")
var endScreenEl = document.getElementById('end-screen');


// starts the quiz
var startButton = document.querySelector("#start");

startButton.addEventListener("click", function(){
document.getElementById("start-screen").classList.add("hide");
quizEl.classList.remove("hide");
askQuestion();

});
// timer function
function setTime() {
    var timer = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft;
    
        if(secondsLeft === 0) {
         
          clearInterval(timer);
          
        }
    
      }, 1000);
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
          console.log("wrong")
        } else {
          console.log("correct")
        }
        questionList++;
        if (questionList===questions.length) {
          document.getElementById("question-title").classList.add("hide");
          document.querySelector(".choices").innerHTML = "";
          endScreenEl.removeAttribute('class');
        } else {
        askQuestion();
        };
      }
      document.querySelector(".choices").appendChild(button)



    })

}