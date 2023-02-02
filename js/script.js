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
 * funzione per generare una griglia dinamica a seconda dei diversi livelli
 * @param {HTMLElement} grid l'elemento nel quale inserire i box
 * @param {Int} dimension la dimensione della griglia (in base al livello)
 */

function generateGrid(grid, dimension) { //Livello 1
    // Parti da un luogo sempre vuoto
    grid.innerHTML = "";
    // Per n volte
    for (let i = 1; i <= dimension; i++) {
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
        // Rendili cliccabili
        boxElements.addEventListener(
            "click",
            function () {
                console.log(this);
                this.classList.toggle("cell-bg");
                // Stampali in console
                console.log("Il box che hai cliccato è il numero: " + boxCell);
            }
        )

    }
}
/**
 * funzione per generare 16 bombe casuali nel range di box possibili a seconda dei livelli
 * @param {value} level il livello scelto dall'utente
 */
function generateBombs(level) {
    // INSERISCO UN CICLO PER GENERARE NUMERI RANDOM (in base al livello selezionato dall'utente)
    let placeBombs = [];
    while (placeBombs.length < 16) {
        let randomBombNumber = Math.floor(Math.random() * level - 1) + 1;

        if (!placeBombs.includes(randomBombNumber)) {
            placeBombs.push(randomBombNumber);
        }
        console.log(placeBombs);
    }
    return placeBombs;
}
/*************************************
 *                                   *
 *             ON CLICK              *
 *************************************/

// Al click del bottone, a seconda della scelta del giocatore - crea la griglia
submitChoiceButton.addEventListener(
    "click",
    function () {
        let levelUserSelection = document.querySelector("#levels").value;

        if (levelUserSelection == "level-1") {
            generateGrid(containerGrid, levelOne);
            generateBombs(levelOne);
        } if (levelUserSelection == "level-2") {
            generateGrid(containerGrid, levelTwo);
            generateBombs(levelTwo);

        } else if (levelUserSelection == "level-3") {
            generateGrid(containerGrid, levelThree);
            generateBombs(levelThree);
        }
    }

)

