 // Using 'const' and 'let' variables to distinguish between identifiers that won't be reassigned and ones that might)
 // Time and Score variables 
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
 const ansBtn = document.querySelectorAll("button.ansBtn");
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
         question:"When a user views a page containing a JavaScript program, which machine actually executes the script?",
         answers:["1. The User's machine runing the browser", "2. The web server", "3. A central machine deep within NetScape's corporate offices", "4. None of the above"],
         correctAnswer:"1"
     },

     {
        question:"______ JavaScript is also called client-side JavaScript",
        answers:["1. Microsoft", "2. Navigator", "3. LiveWire", "4. Native"],
        correctAnswer:"2"
    },

    {
        question:"__________ JavaScript is also called server-side JavaScript.",
        answers:["1. Microsoft", "2. Navigator", "3. LiveWire", "4. Native"],
        correctAnswer:"3"
    },

    {
        question:"What are variables used for in JavaScript Programs?",
        answers:["1. Storing numbers, dates, or other values", "2. Varying Randomly", "3. Causing high-school algebra flashbacks", "4. None of the above"],
        correctAnswer:"1"
    },

    {
        question:"_____ JavaScript statements embedded in an HTML page can respond to user events such as mouse-clicks, form input, and page navigation.",
        answers:["1. Client-side", "2. Server-side", "3. Local", "4. Native"],
        correctAnswer:"1"
    }
 ];

// Timer Function (this function subtracts 1 second from the timer, and when the time is equal to zero, or we run out of questions it displays final score)
function setTime() {
    let timerInterval = setInterval(function () {
        secondsRemain--;
        timeEl.textContent = `Time:${secondsRemain}s`;

        if(secondsRemain === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsRemain;
        }
    }, 1000);
}

// This function is to start the quiz
function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
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
        secondsRemain = secondsRemain - 10;
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
    scoreList.push({initials: init, score: secondsRemain});

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

// These are the event listeners to trigger the functions
// For starting the quiz
startBtn.addEventListener("click", startQuiz);

// For checking answer loop
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// Button for adding the score
submitScrBtn.addEventListener("click", addScore);

// Button that allows user to go back
goBackBtn.addEventListener("click", function () {
    highScoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsRemain = 75;
    timeEl.textContent = `Time:${secondsRemain}s`;
});

// Button that allows user toi clear previous scores
clearScrBtn.addEventListener("click", clearScores);

// This button allows user to veiw or hide high scores
viewSrcBtn.addEventListener("click", function() {
    if (highScoresEl.style.display === "none") {
        highScoresEl.style.display = "block";
    }
    else if (highScoresEl.style.display === "block") {
        highScoresEl.style.display = "none";
    } else {
        return alert("You have no high scores at this time.");
    }
});