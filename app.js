setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");


const scoreNumber = document.querySelector(".score__number");
const aiscoreNumber = document.querySelector(".aiscore__number");

if (localStorage.getItem("score")) {
  humanScore = parseInt(localStorage.getItem("score"));
  scoreNumber.textContent = humanScore;
}
else{
  localStorage.setItem("score", 0);
}

if (localStorage.getItem("aiscore")) {
  computerScore = parseInt(localStorage.getItem("aiscore"));
  aiscoreNumber.textContent = computerScore;
}
else{
  localStorage.setItem("score",0);
}

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "you win";
      const nextButton = document.querySelector(".next-button");
      nextButton.style.display = 'block';
      
      resultDivs[0].classList.toggle("winner");
      keepScore(1);
       
    } else if (aiWins) {
      resultText.innerText = "you lose";
      const nextButton = document.querySelector(".next-button");
      nextButton.style.display = 'none';
       
      resultDivs[1].classList.toggle("winner");
      keepScore(-1);
    } else {
      resultText.innerText = "draw";
      const nextButton = document.querySelector(".next-button");
      nextButton.style.display = 'none';
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
  // const nextButon = document.querySelector(".next-button");
}

function keepScore(point) {
  if(point == 1){
    localStorage.setItem("score", parseInt(parseInt(localStorage.getItem("score")) + point));
    scoreNumber.innerText = localStorage.getItem("score");
    
  }
  else{
    localStorage.setItem("aiscore", parseInt(parseInt(localStorage.getItem("aiscore")) + 1));
    aiscoreNumber.innerText = localStorage.getItem("aiscore");
  }
}

// Play Again 
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});


window.addEventListener("beforeunload", () => {
  localStorage.setItem("score", localStorage.getItem("score"));
  localStorage.setItem("aiscore", localStorage.getItem("aiscore"));
});