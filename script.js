const questions = [

{
question:"Which language is used for web development?",
options:["Python","HTML","C++","Java"],
answer:"HTML"
},

{
question:"Which company created JavaScript?",
options:["Google","Netscape","Microsoft","IBM"],
answer:"Netscape"
},

{
question:"Which CSS property changes text color?",
options:["font-style","color","background","text-align"],
answer:"color"
},

{
question:"Which tag is used for images?",
options:["img","picture","src","image"],
answer:"img"
}

]

let current = 0
let score = 0
let time = 10
let timer

const question = document.getElementById("question")
const options = document.getElementById("options")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const timeDisplay = document.getElementById("time")
const resultBox = document.getElementById("result-box")

const correctSound = document.getElementById("correctSound")
const wrongSound = document.getElementById("wrongSound")

const themeBtn = document.getElementById("themeToggle")

themeBtn.onclick = () => {

document.body.classList.toggle("dark")

}

function loadQuestion(){

clearInterval(timer)

let q = questions[current]

question.innerText = q.question

options.innerHTML=""

q.options.forEach(opt=>{

let btn = document.createElement("button")
btn.innerText = opt

btn.onclick = ()=>selectAnswer(btn,q.answer)

options.appendChild(btn)

})

updateProgress()

startTimer()

}

function selectAnswer(button,correct){

let buttons = options.querySelectorAll("button")

buttons.forEach(btn=>{

btn.disabled=true

if(btn.innerText===correct){

btn.classList.add("correct")

}

})

if(button.innerText===correct){

score++
correctSound.play()

}else{

button.classList.add("wrong")
wrongSound.play()

}

}

next.onclick=()=>{

current++

if(current<questions.length){

loadQuestion()

}else{

showResult()

}

}

function updateProgress(){

let percent = (current/questions.length)*100
progress.style.width = percent+"%"

}

function startTimer(){

time=10
timeDisplay.innerText=time

timer=setInterval(()=>{

time--
timeDisplay.innerText=time

if(time===0){

clearInterval(timer)
current++

if(current<questions.length){

loadQuestion()

}else{

showResult()

}

}

},1000)

}

function showResult(){

document.querySelector(".quiz-container").style.display="none"

resultBox.classList.remove("hidden")

let percent = Math.round((score/questions.length)*100)

let scores = JSON.parse(localStorage.getItem("quizScores")) || []

scores.push(percent)

scores.sort((a,b)=>b-a)

scores = scores.slice(0,5)

localStorage.setItem("quizScores",JSON.stringify(scores))

let leaderboard = scores.map(s=>`<li>${s}%</li>`).join("")

resultBox.innerHTML =

`
<h2>🎉 Quiz Completed</h2>

<h3>Your Score: ${score}/${questions.length}</h3>

<p>Percentage: ${percent}%</p>

<h4>🏆 Leaderboard</h4>
<ul>${leaderboard}</ul>

<button onclick="location.reload()">Restart Quiz</button>
`

}

loadQuestion()