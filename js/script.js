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
function generateGrid(grid, level) { //Livello 1
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
        // Rendili cliccabili
        boxElements.addEventListener(
            "click",
            function () {
                console.log(this);
                let boxclicked = this;
                this.classList.toggle("cell-bg");
                // Stampali in console
                console.log("Il box che hai cliccato è il numero: " + boxCell);

                if (placeBombs.includes(boxCell)) {
                    this.classList.toggle("cell-warning");
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


/*************************************
 *                                   *
 *             ON CLICK              *
 *************************************/

// Al click del bottone, a seconda della scelta del giocatore - crea la griglia- genera la bombe
submitChoiceButton.addEventListener(
    "click",
    function () {
        let levelUserSelection = document.querySelector("#levels").value;

        if (levelUserSelection == "level-1") {
            generateGrid(containerGrid, levelOne);

        } if (levelUserSelection == "level-2") {
            generateGrid(containerGrid, levelTwo);
            generateBombs(levelTwo);

        } else if (levelUserSelection == "level-3") {
            generateGrid(containerGrid, levelThree);
            generateBombs(levelThree);
        }
    }

)

