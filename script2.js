let timer;
    let minutes = 0, seconds = 0;
    let timerStarted = false;

    function startTimer() {
        timer = setInterval(updateTimer, 1000);
        timerStarted = true;
    }

    function stopTimer() {
        clearInterval(timer);
        timerStarted = true;
    }

    function resetTimer() {
        clearInterval(timer);
        minutes = 0;
        seconds = 0;
        updateTimer();
        timerStarted = false;
    }

    function updateTimer() {
        if (timerStarted) {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            const formattedTime = padNumber(minutes) + ':' + padNumber(seconds);
            document.getElementById('timer').innerText = formattedTime;
        }
    }

    function padNumber(number) {
        return (number < 10) ? '0' + number : number;
    }

    document.addEventListener('click', function () {
        if (!timerStarted) {
            startTimer();
        }
    });


//Inizializzare le variabili
let cardGame1 = document.createElement("img");
let cardGame2 = document.createElement("img");
let cardGame3 = document.createElement("img");
let cardGame4 = document.createElement("img");
let cardGame5 = document.createElement("img");
let cardGame6 = document.createElement("img");
let cardGame7 = document.createElement("img");
let cardGame8 = document.createElement("img");
let cardGameRetro = document.createElement("img");

let html = "";

cardGame1.src = "img/card1.jpg";
cardGame2.src = "img/card2.jpg";
cardGame3.src = "img/card3.jpg";
cardGame4.src = "img/card4.jpg";
cardGame5.src = "img/card5.jpg";
cardGame6.src = "img/card6.jpg";
cardGame7.src = "img/card7.jpg";
cardGame8.src = "img/card8.jpg";
cardGameRetro.src = "img/retro.jpg";

/*document.body.appendChild(cardGame1);
document.body.appendChild(cardGame2);
document.body.appendChild(cardGame3);
...*/

cardsArray = [cardGame1, cardGame2, cardGame3, cardGame4, cardGame5, cardGame6, cardGame7, cardGame8];

let flippedCards = [];

deck = [...cardsArray, ...cardsArray]; 
//deck = cardsArray.concat(cardsArray) Coppia di carte
//console.log(deck);

const shuffledArray = shuffle(deck); //Mescola le carte
console.log(shuffledArray); 
const gameGrid = document.querySelector(".game-grid");
gameGrid.addEventListener("click", handleCardClick);
printBoard();

let foundPairs = 0;

function shuffle(array){ 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 
    

function printBoard() {
  
  for (let i = 0; i < shuffledArray.length; i++) {
    // Crea un elemento div per rappresentare una carta
      const cardDiv = document.createElement("div");
      cardDiv.id = 'card-' + i;
      cardDiv.classList.add('singleCard');

    // Crea un elemento div per rappresentare la parte anteriore e posteriore della carta
      const cardInner = document.createElement("div");
      cardInner.classList.add('card-inner');

      const cardFront = document.createElement("div");
      cardFront.classList.add('card-front');
    // Sostituisci con il percorso dell'immagine della parte anteriore della carta
      cardFront.innerHTML = '<img src="img/retro.jpg" alt="Card Front">'; 

    // Crea un elemento div per rappresentare la parte posteriore della carta
      const cardBack = document.createElement("div");
      cardBack.classList.add('card-back');
      cardBack.innerHTML = shuffledArray[i].outerHTML;

    // Aggiungi la parte anteriore e posteriore della carta al suo elemento interno
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);

    // Aggiungi l'elemento interno (con la parte anteriore e posteriore della carta) all'elemento della carta
      cardDiv.appendChild(cardInner);
    // Aggiungi la carta al tavolo di gioco (gameGrid)  
      gameGrid.appendChild(cardDiv);
  }
}

function flip() {
  for (let i = 0; i < shuffledArray.length; i++) {
    // Ottieni l'elemento div della carta corrente utilizzando l'ID univoco
      const cardDiv = document.getElementById('card-' + i);
    // Aggiungi o rimuovi la classe 'flipCard' per girare la carta
      cardDiv.classList.toggle('flipCard');
  }
}

function handleCardClick(event) {
  const clickedCard = event.target.closest(".singleCard");
  
  // Verifica che l'elemento esista e che non abbia già la classe 'flipCard'
  if (clickedCard && !clickedCard.classList.contains('flipCard')) {
    
    // Aggiungi la classe 'flipCard' per girare la carta
    clickedCard.classList.add('flipCard');

    // Aggiungi la carta all'array delle carte girate
    flippedCards.push(clickedCard);

    // Se ci sono due carte girate, avvia la funzione di confronto dopo un breve ritardo
    if (flippedCards.length === 2) {
        setTimeout(compareFlippedCards, 200); 
    }
  }
}

function compareFlippedCards() {
    // Estrai le due carte girate dall'array
    const [card1, card2] = flippedCards;

    // Ottieni il percorso dell'immagine dalla parte posteriore delle carte
    const img1 = card1.querySelector('.card-back img').src;
    const img2 = card2.querySelector('.card-back img').src;

    // Confronta le immagini delle due carte
    if (img1 === img2) {
        
        // Le carte sono identiche, lasciale scoperte
        flippedCards = []; // Resetta l'array delle carte girate
    } else {
        // Le carte non sono identiche, ricoprile dopo un breve ritardo
        setTimeout(() => {
            
            // Rimuovi la classe 'flipCard' per girare nuovamente le carte
            card1.classList.remove('flipCard');
            card2.classList.remove('flipCard');
            flippedCards = []; // Resetta l'array delle carte girate
        }, 500);
    }

    if (img1 === img2) {
      // Le carte sono identiche, lasciale scoperte
      flippedCards = []; // Resetta l'array delle carte girate
      foundPairs++;

      // Verifica se tutte le coppie sono state trovate
      if (foundPairs === cardsArray.length) {
          showWinMessage();
      }
  } else {
    
  }
}

function showWinMessage() {
  const winMsg = document.querySelector(".win-msg");
  const container = document.querySelector(".container");

  // Nascondi il div con classe "container"
  container.style.display = "none";

  winMsg.style.display = "flex";
  stopTimer();
}

