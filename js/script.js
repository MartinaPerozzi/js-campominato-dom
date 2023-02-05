// Preparo gli elementi necessari
const submitChoiceButton = document.querySelector(".submit-button");
const containerGrid = document.querySelector(".grid");


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
    // Per n volte
    for (let i = 1; i <= level; i++) {
        // Crea un div e assegna loro una classe (dimensioni e bordo)
        const boxElements = document.createElement("div");

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
                if (placeBombs.includes(boxCell)) {

                    this.classList.toggle("cell-warning");
                    this.innerHTML = '<font size="6">💣</font>';
                    gameOver(cellIndex);

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

    // INSERISCO UN CICLO PER GENERARE NUMERI RANDOM (in base al livello selezionato dall'utente)
    let placeBombs = [];
    while (placeBombs.length < 16) {
        // Math.random inclusive formula
        let randomBombNumber = Math.floor(Math.random() * (level - 1 + 1) + 1);

        if (!placeBombs.includes(randomBombNumber)) {
            placeBombs.push(randomBombNumber);
        }
        console.log(placeBombs);
    }
    return placeBombs;

}
// FUNZIONE CHE TERMINA IL GIOCO
function gameOver(boxElements) {
    const activeBoxes = document.querySelectorAll(".cell-bg");
    console.log(activeBoxes);
    let userPoints = document.querySelector(".points");
    userPoints.innerHTML = `${activeBoxes.length}`;

    return activeBoxes;
}

/*************************************
 *                                   *
 *             ON CLICK              *
 *************************************/

// Al click del bottone, a seconda della scelta del giocatore - crea la griglia- genera la bombe
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

