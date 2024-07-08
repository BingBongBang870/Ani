//this would be the object shape for storing the questions  
 //you can change the questions to your own taste or even add more questions..
 const questions = [
    {
        question: "When is my birthday?",
        optionA: "December 17 2004",
        optionB: "October 11 2010",
        optionC: "November 11 2004",
        optionD: "November 17 2004",
        correctOption: "optionD",
        img: "bdaypic.jpg"
    },

    {
        question: "What position did I play vb in?",
        optionA: "libero",
        optionB: "outside hitter",
        optionC: "middle blocker",
        optionD: "pinch server",
        correctOption: "optionB",
        img: "vbq.jpg"
    },

    {
        question: "How much damge do you die at in vanguard?",
        optionA: "10",
        optionB: "4",
        optionC: "6",
        optionD: "100 million",
        correctOption: "optionC",
        img: "vanguardq.jpeg"
    },

    {
        question: "Where was the first place we visited in Pennsauken?",
        optionA: "my house",
        optionB: "s-mart",
        optionC: "Hung-Vuong (asian supermarket)",
        optionD: "Norsworthy",
        correctOption: "optionA",
        img: "sauken.jpeg"
    },

    {
        question: "What is my middle name?",
        optionA: "Thanh",
        optionB: "Minh",
        optionC: "Tran",
        optionD: "Diuc",
        correctOption: "optionB",
        img: "midname.jpg"
    },

    {
        question: "Which club was I not apart of?",
        optionA: "Latin Club",
        optionB: "Year Book Club",
        optionC: "Mu Alpha Theta",
        optionD: "Engineer Club",
        correctOption: "optionD",
        img: "clubq.jpg"
    },

    {
        question: "Which is NOT true during my time at EOF?",
        optionA: "I got dunked on by a D3 player",
        optionB: "I woke up late for class",
        optionC: "I got ramen from tep",
        optionD: "I learned to do laundry for the first time",
        correctOption: "optionB",
        img: "EOF.jpg"
    },

    {
        question: "Which artists did I listen to alot? (emphasis on past tense)",
        optionA: "Billy Joel",
        optionB: "Post Malone",
        optionC: "Tessa Violet",
        optionD: "Arianna Grande",
        correctOption: "optionA",
        img: "iu.jpeg"
    },

    {
        question: "Which drama have I not watched?",
        optionA: "Extraordinary Attorney Wu",
        optionB: "It's Okay To Not Be Okay",
        optionC: "Itaewon Class",
        optionD: "My Love From The Stars",
        correctOption: "optionC",
        img: "kdrama.jpeg"
    },

    {
        question: "Which side is my scar on",
        optionA: "Left",
        optionB: "Right",
        optionC: "Top",
        optionD: "Bottom",
        correctOption: "optionA",
        img: "Scar.jpg"
    }
]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("display-img").src = currentQuestion.img;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "okay we might need to talk."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Yay good work!"
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "ILL buy you a smitski!!!"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}