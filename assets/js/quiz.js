 // Time and Score variables 
 // Using 'const' and 'let' variables to distinguish between identifiers that won't be reassigned and ones that might)
 let timeEl = document.querySelector("p.time");
 let secondsRemain = 75;
 let scoreEl = document.querySelector("#score");

 // Section Intro
 const introEl = document.querySelector("#intro");

 // Question Section
 const questionsEl = document.querySelector("#questions");

 // Location of question
 let questionEl = document.querySelector("#question");

 // How many questions user has answered 
 let questionCount = 0;

 // Correct or Incorrect text display after question is answered (yaynay)
 const yaynayEl = document.querySelector("#yaynay");

 // Final Section
 const finalEl = document.querySelector("#final");

 // User's Initials
 let initialsInput = document.querySelector("#initials");

 // High Score Section
 const highScoresEl = document.querySelector("#highscores");

 // The Ordered List
 let scoreListEl = document.querySelector("#score-list");

 // Array of Scores
 let scoreList = [];

 // Start, Answer, Submit, Back-Up, Clear Score, and View Score Buttons
 const startBtn = document.querySelector("#start");
 const ansBtn = document.querySelector("button.ansBtn");
 const ans1Btn = document.querySelector("#answer1");
 const ans2Btn = document.querySelector("#answer2");
 const ans3Btn = document.querySelector("#answer3");
 const ans4Btn = document.querySelector("#answer4");
 const submitScrBtn = document.querySelector("#submit-score");
 const goBackBtn = document.querySelector("#goback");
 const clearScrBtn = document.querySelector("#clearscores");
 const viewSrcBtn = document.querySelector("#view-scores");

 // Object for Questions and Answers (true/false)
 const questions = [
     {
         question:"",
         answers:[],
         correctAnswer:""
     },

     {
        question:"",
        answers:[],
        correctAnswer:""
    },

    {
        question:"",
        answers:[],
        correctAnswer:""
    },

    {
        question:"",
        answers:[],
        correctAnswer:""
    },

    {
        question:"",
        answers:[],
        correctAnswer:""
    }
 ];

// Timer Function (this function subtracts 1 second from the timer, and when the time is equal to zero, or we run out of questions it displays final score)
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}s`;

        if(secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}

// This function is to set the questions, it also takes count and displays the next question/answers
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

// This function checks the answer and then moves to the next question
function checkAnswer(event) {
    event.preventDefault();

    // Shows yaynay section with Correct of Incorrect displayed 
    yaynayEl.style.display = "block";
    let p = document.createElement("p");
    yaynayEl.appendChild(p);

    // Sets time out after 1 second
    setTimeout(function (){
        p.style.display = 'none';
    }, 1000);

    // Answer checker
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    }
    else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    // Cycles through the questions by increasing its index by one
    if (questionCount < questions.Lenght){
        questionCount++;
    }

    // Calling back setQuestion to bring in the next question when an answer button is clicked
    setQuestion(questionCount); 
}

// Function for adding scores to the highscores list
function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highScoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({initials: init, score: secondsLeft});

    scoreList = scoreList.sort((a,b) => {
        if (a.score < b.score) {
            return 1;
        } else {
            return -1;
        }
    });

    scoreList.innerHTML = "";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    storeScores();
    displayScores();
}

// Function to store scores in local storage
function storeScores () {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

// Function to display high scores (getting them from JSON sting using JSON parse)
function displayScores () {
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    // If previous scores exist, this updates the scoreList array and adds new scores
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// This function provides the user the option to clear their scores
function clearScores () {
    localStorage.clear();
    scoreListEl.innerHTML = "";
}