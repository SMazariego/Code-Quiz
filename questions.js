 
var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#begin");
var questionspool = document.querySelector("#questionspool");
var header = document.querySelector("#wrapper");
var secondsLeft = 88;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");
var questions = [
    {
        title: "SQL is pronounced . . .",
        choices: ["squeal", "sequal", "skill", "SQL"], 
        answer: "SQL"
    },
    {
        title: "The abbreviation API stands for . . .",
        choices: ["All Parties Involved", "A Petty Introvert", "Application Programming Interface", "A Pale Inny"],
        answer: "Application Programming Interface"
    },
    {
        title: "Javascript is . . .",
        choices: ["something people in LA do inside coffee shops", "a dynamic programming language", "computer mumbo jumbo", "a headache"],
        answer: "a dynamic programming language"
    },
    {
        title: "What is an array?",
        choices: ["Arrays are a special type of objects.", "an eel", "variables", "a set of brackets"],
        answer: "Arrays are a special type of objects."
    },
    {
        title: "The best web browser is ",
        choices: ["Edge", "Chrome", "Mozilla", "Safari"],
        answer: "Edge"
    },

];




timer.addEventListener("click", function () {
    
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Your Time Has Expired";
            }
        }, 1000);
    }
    render(questionIndex);
});


function render(questionIndex) {
  
    questionspool.innerHTML = "";
    ulCreate.innerHTML = "";
    
    for (var i = 0; i < questions.length; i++) {
      
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionspool.textContent = userQuestion;
    }
   
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionspool.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
      
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!" + questions[questionIndex].answer;
         
        } else {
           
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong, the correct answer is . . .  " + questions[questionIndex].answer;
        }

    }
  
    questionIndex++;

    if (questionIndex >= questions.length) {
    
        allDone();
        createDiv.textContent = "Finished!" + " " + "Your Score is  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionspool.appendChild(createDiv);

}

function allDone() {
    questionspool.innerHTML = "";
    currentTime.innerHTML = "";

    
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionspool.appendChild(createH1);

   
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionspool.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionspool.appendChild(createP2);
    }


    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter initials: ";

    questionspool.appendChild(createLabel);


    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionspool.appendChild(createInput);

  
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionspool.appendChild(createSubmit);

  
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("Got to Enter Something");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            
            window.location.replace("./HighScores.html");
        }
    });

}
const SCORE_POINTS = 10;
const MAX_QUESTIONS = 4;


// Start Game
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];

    // Timer
    var timeInterval = setInterval(function () {
        if (timeLeft >= 1) {
            timeEl.textContent = "Time: " + timeLeft;
            timeLeft--;
        }
        else if (timeLeft === 0) {
            timeEl.textContent = "Time: " + timeLeft;
            clearInterval(timeInterval);
            endQuiz();
        }
        if (timeLeft === 0) {
            score = 0
            localStorage.setItem('allscores', score);
            window.location.assign('highscores.html');
        }
    }, 1000);

        if (score === 10) {
            score = timeLeft - 40;
        } else if (score === 20) {
            score = timeLeft - 30;
        } else if (score === 30) {
            score = timeLeft - 20;
        } else if (score === 40) {
            score = timeLeft - 10;
        } else if (score === 50) {
            score = timeLeft;
        };

        localStorage.setItem('allscores', score);

        return window.location.assign("highscores.html");
    };

