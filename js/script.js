// Preparo gli elementi necessari
const submitChoiceButton = document.querySelector(".submit-button");
const containerGrid = document.querySelector(".grid");
const gameOverMessage = document.querySelector(".game-over-message");
gameOverMessage.classList.add("d-none");
const playAgain = document.querySelector(".play-again-btn");
const gameOverContainer = document.querySelector(".contain-game");


// Levels
const levelOne = 100;
const levelTwo = 81;
const levelThree = 49;

/********************************************
 *                                          *
 *               FUNCTIONS                  *
 *                                          *
 ********************************************/
/**
 * funzione per generare una griglia dinamica a seconda dei diversi livelli e per generare 16 bombe casuali nel range di box;
 * @param {HTMLElement} grid l'elemento nel quale inserire i box;
 * @param {Int} level livello scelto dall'utente e dimensione griglia;
 */
function generateGrid(grid, level) { //GENERA
    // Parti da un luogo sempre vuoto
    grid.innerHTML = "";
    // TODO: Creo le bombe - invoco la funzione 
    const bombs = createBombs(level);

    // Per n volte
    for (let i = 1; i <= level; i++) {
        // Crea un div e assegna loro una classe (dimensioni e bordo)
        const boxElements = document.createElement("div");

        // TODO: check se le i includono l'elemento corrente- aggiungo la classe- 

        // Prendi il valore inserito dall'utente (il livello)
        let levelUserSelection = document.querySelector("#levels").value;
        if (levelUserSelection == "level-1") {
            boxElements.classList.add("box");
        } if (levelUserSelection == "level-2") {
            boxElements.classList.add("box-2");
        } else if (levelUserSelection == "level-3") {
            boxElements.classList.add("box-3");
        }
        // Metti i box creati all'interno della grid
        grid.append(boxElements);
        // Numerali
        boxElements.innerHTML += i;
        // Prendili da parte
        let boxCell = i;
        console.log(boxCell);
        // Setta l'attributo che tiene il conto della posizione dei box
        boxElements.setAttribute("data-index", i);

        // TENTATIVO DI INSERIRE LE CLASSI PRIMA

        if (bombs.includes(i)) {
            boxElements.classList.toggle("bomb");
            // boxElements.classList.toggle("cell-warning");

        } else {
            boxElements.classList.add("safe");
            // boxElements.classList.toggle("cell-bg");
        }
        // Rendili cliccabili
        boxElements.addEventListener(
            "click",
            function () {

                const cellIndex = parseInt(this.getAttribute("data-index"));

                console.log(cellIndex)
                console.log(this);
                // Se hai cliccato non puoi rifarlo
                this.classList.toggle("no-more-click");
                // Stampali in console
                console.log("Il box che hai cliccato è il numero: " + boxCell);

                // Se la cella selezionata è tra i numeri random generati dal pc- la casella diventa rossa
                if (bombs.includes(boxCell)) {

                    this.classList.toggle("cell-warning");
                    this.innerHTML = '<font size="6">💣</font>';
                    gameOver();

                    // SUPERBONUS 1- le caselle non si cliccano più
                    let stopGame = document.querySelectorAll(".grid>div");
                    stopGame.forEach((element) => {
                        element.classList.add("no-more-click");
                    });

                } else {
                    this.classList.toggle("cell-bg");
                }


            }
        )

    }
}
// FUNZIONE CHE TERMINA IL GIOCO
// INSERISCO UN CICLO PER GENERARE NUMERI RANDOM (in base al livello selezionato dall'utente)
function createBombs(levels) {
    const placeBombs = [];
    while (placeBombs.length < 16) {
        // Math.random inclusive formula
        let randomBombNumber = Math.floor(Math.random() * (levels - 1 + 1) + 1);

        if (!placeBombs.includes(randomBombNumber)) {
            placeBombs.push(randomBombNumber);
        }
        console.log(placeBombs);
    }
    return placeBombs;
}

function gameOver() {
    const activeBoxes = document.querySelectorAll(".cell-bg");
    console.log(activeBoxes);
    let userPoints = document.querySelector(".points");
    userPoints.innerHTML = `${activeBoxes.length}`;

    const bombBoxes = document.querySelectorAll(".bomb");
    console.log(bombBoxes);
    bombBoxes.forEach((element) => { element.classList.add("cell-warning"); });
    bombBoxes.forEach((element) => { element.innerHTML = '<font size="6">💣</font>'; });

    // gameOverMessage.classList.toggle("d-none");
    // playAgain.addEventListener(
    //     "click",
    //     function () {
    //         containerGrid.innerHTML = "";
    //         gameOverContainer.innerHTML = "";
    //     }
    // )

    return activeBoxes;
}



// function gameOverMessage() {
//     const gameOver = document.querySelector("game-over-message");
//     gameOver.classList.add("d-block");
// }

/*************************************
 *                                   *
 *             ON CLICK              *
 *************************************/
play()
// Al click del bottone, a seconda della scelta del giocatore - crea la griglia- genera la bombe
function play() {
    submitChoiceButton.addEventListener(
        "click",
        function () {
            // Annullare la visione dei punti quando ri-giochi
            let userPoints = document.querySelector(".points");
            userPoints.innerHTML = ``;
            // prendo i valori per sapere il livello scelto dal giocatore
            let levelUserSelection = document.querySelector("#levels").value;

            if (levelUserSelection == "level-1") {
                generateGrid(containerGrid, levelOne);

            } if (levelUserSelection == "level-2") {
                generateGrid(containerGrid, levelTwo);

            } else if (levelUserSelection == "level-3") {
                generateGrid(containerGrid, levelThree);
            }
        }

    )
}

// function bombsOut(box) {

//     let boxes = document.querySelectorAll(".grid div");

//     for (boxes of boxes) {
//         const boxesIndex = parseInt(boxes.getAttribute("data-index"));
//         if (placeBombs.includes(boxesIndex)) {
//             boxes.classList.add("warning-cell");
//         }
//     }
// }
