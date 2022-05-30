// GAME GLOBAL VARIABLES 

let myCharacters = [];
let enemyCharacters = [];
let table = [];
let isRobotOn = false;
let isCompanion = false;
let isEnemyFind = false;
let potionAndStairs = [];
let levelCounter = 1;
let tableSize = 4;
let robotPartImagesArray = false;

//TERMINA AQUI

// GENERAL GAME OPTIONS

const newGame = document.getElementById("newGameButton");
newGame.onclick = () => startNewGame();

const loadSavedGame = document.getElementById("loadGameButton");
loadSavedGame.onclick = () => loadGame();
loadSavedGame.disabled = true;

const saveCurrentGame = document.getElementById("saveGameButton");
saveCurrentGame.onclick = () => saveGame();
saveCurrentGame.disabled = true;

// Carga las array de imágenes del json.
const robotImageLoader = async () => {
    const getImageArray = await fetch('./json/robotImages.json').then(r => r.json());
    robotPartImagesArray = getImageArray.robotPartImagesArray;
    loadSavedGame.disabled = false;
    saveCurrentGame.disabled = false;
}

robotImageLoader();

// Controla la nueva partida. Limpia la UI y llama a la función de createCharacter,
// generando un robot aleatorio para el jugador. Finalmente llama la función para crear la selección
// de personaje.
function startNewGame() {

    const gameOptions = document.getElementById("gameOptions");
    gameOptions.style.display = "none";
    const defaultStats = [100, 100, 100, 100, 100, 1];
    createCharacter("player", defaultStats, myCharacters, "ally");
    const newRandomRobot = randomRobotBody();
    myCharacters[0].setRobotParts(
        newRandomRobot[0],
        newRandomRobot[1],
        newRandomRobot[2]
    );
    generateCharacterSelectionPage()
}

// Controla la funcionalidad de guardar la partida.
// Llama a la librería SweetAlert para confirmar la opción elegida por el jugador.
function saveGame() {

    Swal.fire({
        title: "¿Deseas guardar la partida?",
        showDenyButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            localStorage.setItem("SavedGame", JSON.stringify(myCharacters));
            localStorage.setItem("TableSize", JSON.stringify(tableSize));
            localStorage.setItem("Level", JSON.stringify(levelCounter));
        }
    })
}

// Carga los datos previamente guardados en el localStore.
// Llama a la creación de personajes para crear personajes iguales a los guardados.
// Luego llama a la función startGame para iniciar la partida.
function loadGame() {
    const myCharactersInfo = localStorage.getItem("SavedGame");

    if (myCharactersInfo !== null) {
        const mySavedCharacters = JSON.parse(myCharactersInfo);

        tableSize = JSON.parse(localStorage.getItem("TableSize"));
        levelCounter = JSON.parse(localStorage.getItem("Level"));

        let player = "";
        mySavedCharacters.forEach((e, idx) => {
            player = (e.id == "player") ? "player" : "partner";
            const savedStats = [
                e.turn,
                e.maxHp,
                e.hp,
                e.attack,
                e.defense,
                e.level,
            ];

            createCharacter(player, savedStats, myCharacters, "ally");

            myCharacters[idx].changeElement(e.element);
            myCharacters[idx].setRobotParts(
                e.head,
                e.torso,
                e.legs
            );
        })
        const gameOptions = document.getElementById("gameOptions");
        gameOptions.style.display = "none";
        startGame();
        (myCharacters[1]) && uIRobotCreator(myCharacters[1], "allyAvatarWrap");
        isCompanion = (myCharacters[1]) ? true : false;
    }
}

// Inicia la partida. Se asegura que el personaje tiene elemento seleccionado.
// Instancia los div donde irán los componentes de la UI.
// Y llama las funciones para crear la UI de la partida.
function startGame() {
    if (myCharacters[0].element !== undefined) {
        const container = document.getElementById("container");
        container.innerHTML = `
            <div class="playerUI" id="playerUI"></div>
            <div class="tableContainerWrap" id="tableContainerWrap"></div>
            <div class="enemiesUI" id="enemiesUI"></div>
        `;
        tableConstructor(tableSize, tableSize);
        const isSaveGame = document.getElementById("gameOptionsInGame");
        isSaveGame.style.display = "block";
        attackAndRunButtonGenerator();
        generatePlayerUI();
        generateCharacterUI("enemiesUI", "enemyAvatarWrap");
        generateCharacterUI("playerUI", "allyAvatarWrap");
    }
}
// Se encarga de gestionar cuando uno pierde la partida.
// Limpia la UI y llama a la función de defaultGameValues para resetear todo a los valores inciales.
// Y luego muestra en pantalla el Options y la imagen de lossGame.
function lossGame() {
    const attackAndRunOptions = document.getElementById("attackAndRunButtons");
    const isSaveGame = document.getElementById("gameOptionsInGame");
    attackAndRunOptions.style.display = "none";
    isSaveGame.style.display = "none";
    const optionsLoader = () => {
        const container = document.getElementById("container");
        const gameOptions = document.getElementById("gameOptions");
        const lossGame = document.getElementById("lossGame");
        attackAndRunOptions.remove();
        container.innerHTML = "";
        gameOptions.style.display = "flex";
        lossGame.style.display = "block";
        defaultGameValues();
    }
    timeOutInLoss(optionsLoader);
}

async function timeOutInLoss(callback) {

    const promise = new Promise((resolve) => {
        setTimeout(() => resolve(callback()), 3000)
    });

    const result = await promise;
}

// Resetea todas las variables a sus valores iniciales.
function defaultGameValues() {
    myCharacters = [];
    enemyCharacters = [];
    table = [];
    isRobotOn = false;
    isEnemyFind = false;
    isCompanion = false;
    saveCurrentGame.disabled = false;
    levelCounter = 1;
    potionAndStairs = [];
    tableSize = 4;
}

// Desconstruye la array de potionAndStairs y verifica 
// si el personaje está en la posición de alguna de ellas.
function potionAndStairsChecker(robotPosition) {
    const [potion, stairs] = potionAndStairs;
    (potion === robotPosition) ? healParty(potion) : null;
    (stairs === robotPosition) ? nextGameLevel() : null;
}

// Añade 50 de vida a los personajes.
// Esta función restablecerá la maxHp de los personajes.
function healParty(potion) {
    for (let i = 0; i < myCharacters.length; i++) {
        myCharacters[i].hp = myCharacters[i].maxHp;
        myCharacters[i].reprintStats();
    }
    const container = document.getElementById(potion);
    container.innerHTML = "";
    createTableElement(potion, "tableRobotHead", myCharacters[0].head);
    potionAndStairs[0] = "";
}
// Genera un nuevo mapa de un nivel siguiente.
// A medida de que avanzas genera mapas más grandes según un patrón.
// Y subirá el lvl de dificultad de los mismos.
function nextGameLevel() {
    levelCounter++;
    tableSize++;
    tableSize = (tableSize >= 8) ? 8 : tableSize;
    const container = document.getElementById("tableContainerWrap");
    container.innerHTML = "";
    tableConstructor(tableSize, tableSize);
}

//TERMINA AQUI

// CLASS CONSTRUCTOR

// La clase Character, que permite construir perosonajes aliados y enemigos.
class Character {
    constructor(id, turn, maxHp, hp, attack, defense, level, party) {
        this.id = id;
        this.turn = parseInt(turn);
        this.maxHp = parseInt(maxHp);
        this.hp = parseInt(hp);
        this.attack = parseInt(attack);
        this.defense = parseInt(defense);
        this.level = level;
        this.party = party;
        this.haveActive;
        this.element;
        this.head;
        this.torso;
        this.legs;
    }

    // Método para setear las imagenes propias del character.
    setRobotParts(head, torso, legs) {
        this.head = head || this.head;
        this.torso = torso || this.torso;
        this.legs = legs || this.legs;
    }

    // metodo para setear el elemento.
    changeElement(setElement) {
        this.element = setElement;
    }

    // Sube niveles al personaje. Añade stats al robot de forma aleatoria.
    // Luego llama al método propio de re-impresión de los stats en la UI.
    levelUp(amount) {
        for (let i = 0; i < amount; i++) {
            const hpIncrease = Math.ceil(Math.random() * 9);
            this.maxHp += hpIncrease;
            this.hp += hpIncrease;
            this.turn += Math.ceil(Math.random() * 9);
            this.attack += Math.ceil(Math.random() * 9);
            this.defense += Math.ceil(Math.random() * 9);
            this.level += 1;
        }
        this.reprintStats();
    }

    // Imprime en pantalla los stats visibles del personaje.
    reprintStats() {
        const levelUpStats = [
            this.level,
            this.hp,
            this.turn,
            this.attack,
            this.defense,
        ];
        const idPrinter = [
            "robot_lvl_id_reprinteable_" + this.id,
            "robot_hp_id_reprinteable_" + this.id,
            "robot_turn_id_reprinteable_" + this.id,
            "robot_attack_id_reprinteable_" + this.id,
            "robot_defense_id_reprinteable_" + this.id,
        ]

        idPrinter.forEach((x, idx) => {
            printStatsChange(x, levelUpStats[idx]);
        })
    }

    // Añade o resta una cantidad a un stat determinado.
    changeStats(stat, amount, math) {
        switch (stat) {
            case "hp":
                this.hp = statController(math, this.hp, amount)
                break;
            case "attack":
                this.attack = statController(math, this.attack, amount)
                break;
            case "defense":
                this.defense = statController(math, this.defense, amount)
                break;
            default:
                break;
        }
    }
}

const statController = (math, obj, amount) => {
    if (math == "+") {
        return obj += amount;
    } else {
        return obj -= amount;
    }
}

//Dado un array (normalmente el array de myCharacters, aunque permite el de enemyCharacters también) y el índice
//devuelve la imagen correspondiente al elemento de ese personaje.
const elementMatch = (character) => {
    const elementImagesArray = [
        "./images/ui/fire.svg",
        "./images/ui/thunder.svg",
        "./images/ui/water.svg",
    ]
    switch (character.element) {
        case "fire":
            return elementImagesArray[0];
        case "electric":
            return elementImagesArray[1];
        case "water":
            return elementImagesArray[2];
        default:
            break;
    }
}

//TERMINA AQUI

//CHARACTER FUNCTIONS

// Crea un personaje.
function createCharacter(id, stats, array, party) {
    const character = new Character(id, stats[0], stats[1], stats[2], stats[3], stats[4], stats[5], party);
    array.push(character);
}
// Genera un elemento random (usado para intanciar enemigos).
const elementRandom = () => {
    const elementRandom = Math.ceil(Math.random() * 3);
    let element = "";
    switch (elementRandom) {
        case 1:
            element = "electric";
            break;
        case 2:
            element = "fire";
            break;
        case 3:
            element = "water";
            break;
        default:
            element = "none";
            break;
    }
    return element;
}

//Genera un cuerpo de robot aleatorio
const randomRobotBody = () => {
    let randomRobot = [];
    for (let i = 0; i < 3; i++) {
        const randomPart = Math.floor(Math.random() * 3);
        randomRobot.push(robotPartImagesArray[i][randomPart]);
    };
    return randomRobot
}

//TERMINA AQUI

// PLAYER MOVEMENT

// Controla el movimiento del personaje. Cada vez que se presiona una tecla, se ejecuta.
// Verifica si hay parsonaje en el tablero y no hay enemigo encontrado 
// y llama la función para verificar el movimiento.
window.onkeydown = (e) => {
    if (isRobotOn && !isEnemyFind) {
        const robot = document.getElementById("tableRobotHead");
        const robotPapa = robot.parentElement;
        movement(e, robotPapa.id, robot)
    }
};

// Controla el movimiento del personaje. 
// A cada tecla de las flechas del teclado mueve el robot en esa dirección.
function movement(e, parentId, childnode) {
    const xLenght = table.length - 1;
    const yLenght = (table[0]).length - 1;
    const x = parseInt(parentId.slice(1, 2));
    const y = parseInt(parentId.slice(2, 3));
    const parentNode = (id) => {
        const newParentNode = document.getElementById(id);
        return newParentNode
    }
    const movementSwitch = (a, axis, sign) => {
        const newAxis = (sign === "+") ? a + 1 : a - 1;
        const newPosition = (axis === "x") ? "p" + newAxis + y : "p" + x + newAxis;
        parentNode(newPosition).append(childnode);
        potionAndStairsChecker(newPosition);
        randomEnemyEncounter();
    };

    switch (e.code) {
        case "ArrowLeft":
            (x > 0) && movementSwitch(x, "x", "-");
            break;
        case "ArrowRight":
            (x < xLenght) && movementSwitch(x, "x", "+");
            break;
        case "ArrowUp":
            (y > 0) && movementSwitch(y, "y", "-");
            break;
        case "ArrowDown":
            (y < yLenght) && movementSwitch(y, "y", "+");
            break;
        default:
            break;
    }
}

//TERMINA AQUI 

// PLAYER ACTIONS

// Declara el ataque del personaje. Y llama en cada momento al consoleGameController para darle el feedback al jugador.
// En un bucle llama a la función de selección de turno (para ver quien ataca primero)
// y luego llama a la función para aplicar los cambios en la vida de los enemigos o aliados.
function callAttack() {
    const clearConsoleGame = document.getElementById("gameConsoleDisplay");
    clearConsoleGame.innerHTML = "";

    let isCombatOver = false;
    let turn = 0;

    consoleGameController({
        event: "Fase de turno:",
        isInfo: false
    })
    const combatCharacters = turnSelector(myCharacters, enemyCharacters);

    consoleGameController({
        event: "Fase de combate:",
        isInfo: false
    })

    do {
        const attacker = combatCharacters[combatCharacters.length - 1 - turn];
        turn++;
        const defender = findDefender(attacker, combatCharacters);
        combatHpResult(defender, attacker,)
        winVerification(defender, attacker.party);
        isCombatOver = endCombatFase(combatCharacters, attacker);
    } while (!isCombatOver && isEnemyFind);
}

// Agrupa a los combatientes en una misma array para poder saber quien va primero.
// Dado que NO queremos cambiar los valores de los robots ahora (dado que son valores temporales),
// y solo los queremos cambiar al finalizar el resultado del combate,
// genera una nueva array con unas propiedades clonadas.
function turnSelector(playerArray, enemyArray) {
    const allCharacters = [
        ...playerArray,
        ...enemyArray,
    ]

    const combatCharacters = allCharacters.map((e) => Object.assign({}, e));
    combatCharacters.forEach((e, idx) => {
        const rollDice = openDiceRoller()
        e.turn = e.turn + rollDice;
        consoleGameController({
            event: "turnDiceRolled",
            isInfo: true,
            character: e,
            diceRoll: rollDice,
            amount: e.turn,
        })
    })
    // Ordena según el turno + tirada a cada robot. 
    const compareTurn = (a, b) => {
        if (a.turn < b.turn) {
            return -1;
        }
        if (a.turn > b.turn) {
            return 1;
        } else return 0;
    }
    combatCharacters.sort(compareTurn);
    return combatCharacters;
}

// Busca al defensor en la array de combate.
function findDefender(attacker, combatCharacters) {

    const defenderSearcher = (party) => {
        const defenderIndex = combatCharacters.findIndex(e => e.party === party)
        const defender = combatCharacters[defenderIndex];
        return defender;
    }

    if (attacker.party === "ally") {
        return defenderSearcher("enemy")
    } else {
        return defenderSearcher("ally")
    }
}

// Busca los combatientes y, ahora sí, aplican los daños a los robots.
function combatHpResult(defender, attacker) {

    const defenderSearcher = (array) => {
        const index = array.findIndex(e => e.id === defender.id);
        return array[index];
    }

    const defenderInCharactersArray = (defender.party === "ally")
        ? defenderSearcher(myCharacters)
        : defenderSearcher(enemyCharacters);

    defender.hp = calculateAttack(attacker, defender);
    defenderInCharactersArray.hp = defender.hp; // Le aplica la nueva vida al defensor.
    defenderInCharactersArray.reprintStats(); // reimprime las stats.
    return defenderInCharactersArray;
}

// Busca si el atacante es el último de la lista y devuelve true en tal caso.
function endCombatFase(combatCharacters, attacker) {
    const attackerPlaceInCombat = combatCharacters.findIndex((e) => e.id === attacker.id)
    return (attackerPlaceInCombat == 0) ? true : false;
}

//Verifica si hay un ganador
function winVerification(defender) {
    const winCondition = (defender.hp <= 0) ? true : false;
    (winCondition) && winCombat(defender);
    return winCondition;
}

// Verifica quien ha ganado el combate y resuelve según si es aliado o enemigo.
function winCombat(defender) {

    if (defender.party === "enemy") {
        const defenderIndex = enemyCharacters.findIndex(e => e.id === defender.id)
        captureAlly(enemyCharacters[defenderIndex]);
        deleteCharacters(defenderIndex, defender, enemyCharacters);
        if (enemyCharacters.length === 0) {
            clearAllEnemiesCharacters();
            for (let i = 0; i < myCharacters.length; i++) {
                myCharacters[i].levelUp(1);
            }
        }
    } else {
        (defender.id === "player") ? lossGame() : deleteCharacters(1, defender, myCharacters);
    }
}


// Otorga un número aleatorio entre 1 a 100 y si es mayor que 90 se considera "abierta"
// Por lo que repite lanzamiento y añade esos valores a la tirada.
function openDiceRoller() {
    let dice = Math.ceil(Math.random() * 100);
    let openValue = 90;
    let valueDice = 0
    valueDice += dice;
    if (dice > 90) {
        openValue = dice;
    }
    while ((dice >= openValue) && (dice <= 100)) {
        dice = Math.ceil(Math.random() * 100);
        valueDice = valueDice + dice;
        openValue++;
    }
    return valueDice;
}

// Calcula el combate, imprime en la consola de juego mediante el consoleGameController
// y devuelve la vida resultante.
function calculateAttack(attacker, defender) {

    const atkDice = openDiceRoller();
    const defDice = openDiceRoller();
    attacker.attack += atkDice;
    defender.defense += defDice;

    consoleGameController({
        event: "attackDiceRolled",
        isInfo: true,
        character: attacker,
        diceRoll: atkDice,
        amount: attacker.attack,
    })

    consoleGameController({
        event: "defenseDiceRolled",
        isInfo: true,
        character: defender,
        diceRoll: defDice,
        amount: defender.defense,
    })

    let asaultResult = attacker.attack - defender.defense;
    strongerElement(attacker.element, defender.element) ? asaultResult + 30 : null;
    const newLifePoints = () => {
        if (asaultResult >= 0) {
            const newHp = defender.hp - asaultResult;
            defender.haveActive = false;
            return newHp;
        } else {
            return defender.hp;
        };
    }

    consoleGameController({
        event: "HpDealtResult",
        isInfo: true,
        character: defender,
        amount: asaultResult,
    })

    return newLifePoints();
}

// Devuelve true cuando el elemento a tiene ventaja sobre el elemento b. Y false si no la tiene.
function strongerElement(a, b) {
    switch (a) {
        case "fire":
            (b === "electric") ? true : false;
        case "electric":
            (b === "water") ? true : false;
            break;
        case "water":
            (b === "fire") ? true : false;
            break;
    }
}

// Es una función que permite huir del enemigo. 
// En el proyecto final haré que calcule según el turno y lance dados para huir.
function tryToRun() {
    const combatCharacters = turnSelector(myCharacters, enemyCharacters);
    if (combatCharacters[combatCharacters.length - 1].party === "ally") {
        clearAllEnemiesCharacters();

        consoleGameController({
            event: "¡Has huído con éxito!",
            isInfo: false
        })
    } else {
        attackAndRunButtons(false, true);
        consoleGameController({
            event: "¡INTENTO FRACASADO! Debes combatir",
            isInfo: false
        })
    }
}

//TERMINA AQUI

// HTML CONTRUCTOR

// Crea un div vacío
function generateDiv(className, container, id) {
    const div = document.createElement("div");
    div.className = className;
    id ? div.id = id : null;
    container.append(div);
    return div
}

// Crea un botón vacío
function generateButton(text, className, container, event, id) {
    const button = document.createElement("button");
    button.innerText = text;
    button.className = className;
    id ? button.id = id : null;
    button.onclick = event;
    container.append(button);
    return button;
}

// Modifica un stat en pantalla
function printStatsChange(statId, amount) {
    const statContainer = document.getElementById(statId);
    statContainer.innerText = amount;
}

//TERMINA AQUI

// GAME CONSOLE UI CONTROLLER

// Imprime en pantalla lo que ha sucedido en el combate. Recibe un objeto 
// e instancia un texto que da feedback al jugador.
function consoleGameController({ event, isInfo, character, amount, diceRoll }) {
    const container = document.getElementById("gameConsoleDisplay");
    const infoWrap = generateDiv("infoWrap", container);
    if (isInfo) {
        // Verifica si es aliado u enemigo y lo devuelve para imprimir con su estilo propio.
        const combatParty = () => {
            switch (character.party) {
                case "ally":
                    return `<span class="blackConsole">${(character.id === "player") ? "Tu robot" : "Tu acompañante"}</span>`;
                case "enemy":
                    return `El robot <span class="blackConsole"> enemigo ${character.id + 1}</span>`;
                default:
                    break;
            }
        }

        // Imprime la información en la gameConsoleDisplay.
        const infoWrapPrinter = (eventShown) => {
            infoWrap.innerHTML = `${combatParty()} ha lanzado <span class="greenConsole">${diceRoll}</span>. ${eventShown} total es <span class="blackConsole">${amount}</span>`;
        }

        switch (event) {
            case "turnDiceRolled":
                infoWrapPrinter("El turno");
                break;
            case "attackDiceRolled":
                infoWrapPrinter("El ataque");
                break;
            case "defenseDiceRolled":
                infoWrapPrinter("La defensa");
                break;
            case "HpDealtResult":
                const hpAmount = (amount > 0) ? Math.abs(amount) : 0;
                infoWrap.innerHTML = `${combatParty()} ha perdido <span class="redConsole">${hpAmount}</span> de vida.`;
                break;
            default:
                break;
        }
    } else {
        infoWrap.innerText = event;
        infoWrap.className += " consoleGameEventTitle";
    }
}

//TERMINA AQUI

// CHARACTER PAGE GENERATOR

// Activa o desactiva los botones de "atacar" y de "huir".
function attackAndRunButtons(condition, run) {
    const attackButton = document.getElementById("attack-button");
    const tryToRunButton = document.getElementById("try_to_run-button");
    attackButton.disabled = condition;
    (run) ? tryToRunButton.disabled = true : tryToRunButton.disabled = condition;
}

// Genera la UI del CharacterCreator
function generateCharacterSelectionPage() {
    const container = document.getElementById("container");
    const characterWrap = generateDiv("characterWrap", container, "characterWrap");
    characterWrap.innerHTML += `
    <div class="robotWrap"> 
        <div class="robotAvatarBg" id="robotAvatarBg">
            <div class="robotAvatar">
                <div class="avatarRobotHead" id="robotHead"> </div>
                <div class="avatarRobotTorso" id="robotTorso"> </div>
                <div class="avatarRobotLeg" id="robotLeg"> </div>
            </div>
        </div>
    </div>
    <div class="statsWrap" id="statsWrap">
        <div class="characterPageTitle">CREADOR DE PERSONAJE</div>
        <div class="robotPartWrap" id="robotPartWrap">
        </div>
        <div>
            <div class="elementPageTitle">SELECCIONA UN ELEMENTO</div>
            <div class="elementBtnWrap" id="elementBtnWrap"></div>
        <div>
    </div>
    <div class="buttonStartWrap">
        <button class="button-red" id="startGameButton">Comenzar</button>
    <div>
    `
    generateRobotPartButton();

    robotAvatarBuilder(myCharacters[0].head, "robotHead");
    robotAvatarBuilder(myCharacters[0].torso, "robotTorso");
    robotAvatarBuilder(myCharacters[0].legs, "robotLeg");
    generateElementSelectorButtons();

    const startGameButton = document.getElementById("startGameButton");
    startGameButton.onclick = () => startGame();
}

// Instancia cada boton para elegir la pieza del robot del jugador.
function generateRobotPartButton() {
    const robotPartWrap = document.getElementById("robotPartWrap");
    const robotPartIdArray = [
        ["buttonHead1", "buttonHead2", "buttonHead3"],
        ["buttonTorso1", "buttonTorso2", "buttonTorso3"],
        ["buttonLegs1", "buttonLegs2", "buttonLegs3"],
    ]
    robotPartIdArray.map((e, idx) => {
        const butonRobotPartWrap = generateDiv("butonRobotPartWrap", robotPartWrap);
        for (let i = 0; i < 3; i++) {
            butonRobotPartWrap.innerHTML += `
            <div id=${robotPartIdArray[idx][i]}></div>
            `
        }
    })

    // Gerena el evento onclick para cada boton de pieza del robot.
    robotPartImagesArray.map((e, idx) => {
        for (let i = 0; i < 3; i++) {
            const buttonPart = document.getElementById(robotPartIdArray[idx][i]);
            buttonPart.style.backgroundImage = `url(${e[i]})`
            buttonPart.onclick = (x) => { changeAvatarRobotPartAndImage(idx, e[i]) }
        }
    })
}

// Setea un fondo de imagen a un div, dados la imagen y el id.
function robotAvatarBuilder(robotPart, idContainer) {
    const div = document.getElementById(idContainer);
    div.style.backgroundImage = `url(${robotPart})`;
}

// Modifica la imagen del robot según las opciones elegidas por el jugador.
function changeAvatarRobotPartAndImage(idx, avatarImage) {
    const robotAvatarPartIdArray = ["robotHead", "robotTorso", "robotLeg"];
    switch (idx) {
        case 0:
            myCharacters[0].setRobotParts(avatarImage, "", "");
            break;
        case 1:
            myCharacters[0].setRobotParts("", avatarImage, "");
            break;
        case 2:
            myCharacters[0].setRobotParts("", "", avatarImage);
            break;

        default:
            break;
    }
    robotAvatarBuilder(avatarImage, robotAvatarPartIdArray[idx]);
}

// Genera los botones para elegir el elemento del robot del jugador.
function generateElementSelectorButtons() {
    const elementSelector = document.getElementById("elementBtnWrap");
    const elementOptionsId = [
        "buttonFire",
        "buttonElectric",
        "buttonWater",
    ]
    const elementImagesArray = [
        "./images/ui/fire.svg",
        "./images/ui/thunder.svg",
        "./images/ui/water.svg",
    ]
    elementOptionsId.map((e, idx) => {
        elementSelector.innerHTML += `
            <div id=${e} onclick="selectPlayerRobotElement(${idx})"></div>
            `
        const elementBtnStyle = document.getElementById(e);
        elementBtnStyle.style.backgroundImage = `url(${elementImagesArray[idx]})`;
    }
    )
}

// Según el elemento elegido, setea el color y la imagen de background para el avatar. 
function selectPlayerRobotElement(idx) {
    const robotAvatarBg = document.getElementById("robotAvatarBg");
    const switchElement = (element, color, src) => {
        myCharacters[0].changeElement(element);
        robotAvatarBg.style.backgroundColor = color;
        robotAvatarBg.style.backgroundImage = src;
    }
    switch (idx) {
        case 0:
            switchElement("fire", "#ffb3b3", 'url("./images/ui/fire_avatar_bg.svg")');
            break;
        case 1:
            switchElement("electric", "#ffff99", 'url("./images/ui/thunder_avatar_bg.svg")');
            break;
        case 2:
            switchElement("water", "#b3ffff", 'url("./images/ui/water_avatar_bg.svg")');
            break;
        default:
            break;
    }

}
//TERMINA AQUI

// ATTACK AND RUN BUTONS

// Crea los botones de "atacar" y de "huir".
function attackAndRunButtonGenerator() {
    const container = document.getElementById("main");
    const attackAndRunButtonContainer = generateDiv("attackAndRunButtons", container, "attackAndRunButtons");
    generateButton("Atacar", "button-red", attackAndRunButtonContainer, () => callAttack(), "attack-button");
    generateButton("Huir", "button-blue", attackAndRunButtonContainer, () => tryToRun(), "try_to_run-button");
    attackAndRunButtons(true);
}

//TERMINA AQUI

// TABLE CONSTRUCTOR

// Construye el tablero de juego de proporción x-y llamando a la función generateTable.
// Además, instancia en el tablero el juagador, una "potion" y una "stairs".
function tableConstructor(x, y) {
    potionAndStairs = [];
    generateTable(x, y, generateXYId(x, y));
    const tableContainerWrap = document.getElementById("tableContainerWrap");
    generateDiv("gameConsoleDisplay", tableContainerWrap, "gameConsoleDisplay");
    const robot = randomPosition(x, y)
    createTableElement(robot, "tableRobotHead", myCharacters[0].head);
    isRobotOn = true;
    let potion = randomPosition(x, y);
    let stairs = randomPosition(x, y);
    while (robot == potion) {
        potion = randomPosition(x, y);
    }
    while (stairs == potion || stairs == robot) {
        stairs = randomPosition(x, y);
    }
    createTableElement(potion, "potion", "./images/ui/potion.svg");
    createTableElement(stairs, "stairs", "./images/ui/stairs.svg");
    potionAndStairs.push(potion);
    potionAndStairs.push(stairs);
}

// genera un tablero con cada casilla un id propia según un array.
function generateTable(columns, rows, array) {
    const tableContainerWrap = document.getElementById("tableContainerWrap");
    const gameContainer = generateDiv("gameTableContainer", tableContainerWrap)
    // itera tantas veces como columnas hay y crea un div por cada columna
    for (let i = 0; i < columns; i++) {
        generateDiv("column", gameContainer, "column" + i);
    }
    // por cada columna anterior genera una nueva iteración por cada fila y crea una posición en el tablero
    const column = document.querySelectorAll(".column");
    let x = 0
    column.forEach(box => {
        for (let i = 0; i < rows; i++) {
            generateDiv("emptyBox", box, array[x][i]);
        }
        x++;
    }
    )
}
// Genera una matriz (una array[array1, array2, array3])
// donde cada valor de las arrays tiene el id de la posición del tablero.
function generateXYId(x, y) {
    let a = [];
    let b = [];
    let counter = 0
    for (let i = 0; i < x; i++) {
        for (let u = 0; u < y; u++) {
            b.push("p" + counter + u)
        }
        counter++
        a.push(b)
        b = [];
    }
    table = a
    return a
}

// Genera una posición aleatoria en el tablero.
function randomPosition(x, y) {
    const randomPlace = "p" + (Math.floor(Math.random() * x)) + (Math.floor(Math.random() * y));
    return randomPlace;
}

// Función para instanciar objetos en un lugar aleatorio del tablero de juego.
function createTableElement(position, elementClassName, src) {
    const element = document.createElement("img");
    element.className = elementClassName;
    element.src = src;
    element.id = elementClassName;
    const randomSpawn = document.getElementById(position);
    randomSpawn.append(element);
    return element;
}

//TERMINA AQUI 

// PLAYER UI

// Crea la UI del componente del jugador.
function generatePlayerUI() {
    const container = document.getElementById("playerUI");

    container.innerHTML += `
    <div class="statsAndAvatarWrap">
        <div class="playerAvatarWrap"> 
            <div class="uIRobotAvatar">
                <div class="uIAvatarRobotHead" id="uIAvatarRobotHead"> </div>
                <div class="uIAvatarRobotTorso" id="uIAvatarRobotTorso"> </div>
                <div class="uIAvatarRobotLeg" id="uIAvatarRobotLeg"> </div>
            </div>
        </div>
        <div class="statsUIWrap" id="statsUIWrap">
            <div><div class="robotStatsUi">Lv:</div><span id="robot_lvl_id_reprinteable_player">${myCharacters[0].level}</span></div>
            <div class="robotStatsUi" id="player_elementUI"></div>
            <div><div class="robotStatsUi robotHpUi" ></div><span id="robot_hp_id_reprinteable_player">${myCharacters[0].hp}</span></div>
            <div><div class="robotStatsUi robotTurnUi"></div><span id="robot_turn_id_reprinteable_player">${myCharacters[0].turn}</span></div>
            <div><div class="robotStatsUi robotAttackUi"></div><span id="robot_attack_id_reprinteable_player">${myCharacters[0].attack}</span></div>
            <div><div class="robotStatsUi robotDefenseUi"></div><span id="robot_defense_id_reprinteable_player">${myCharacters[0].defense}</span></div>
        </div>
    </div>
    `

    const enemyElementImage = document.getElementById("player_elementUI")
    enemyElementImage.style.backgroundImage = `url(${elementMatch(myCharacters[0])})`;

    robotAvatarBuilder(myCharacters[0].head, "uIAvatarRobotHead");
    robotAvatarBuilder(myCharacters[0].torso, "uIAvatarRobotTorso");
    robotAvatarBuilder(myCharacters[0].legs, "uIAvatarRobotLeg");
}
//TERMINA AQUI

// ENEMIES CHARACTERS

// Instancia una cantidad de enemigos cuando esta función es llamada.
function randomEnemyEncounter() {
    // Según la dificultad de la mazmorra define la cantidad de enemigos que aparecerán.
    const levelEnemyFinder = (x) => {
        if (x < 3) {
            return 1;
        } else if (x < 6) {
            return 2;
        } else {
            return 3;
        }
    }
    // Una posibilidad del 15% de que aparezcan enemigos.
    const findEnemy = Math.ceil(Math.random() * 100) > 85;
    // Si aparecen enemigos entonces los crea e imprime en pantalla
    if (findEnemy && !isEnemyFind) {
        const enemyCounter = Math.ceil(Math.random() * levelEnemyFinder(levelCounter));
        for (let i = 0; i < enemyCounter; i++) {
            const element = elementRandom();
            const maxHp = Math.ceil(Math.random() * 50 + 60);
            const stats = [
                Math.ceil(Math.random() * 40 + 50),
                maxHp,
                maxHp,
                Math.ceil(Math.random() * 40 + 50),
                Math.ceil(Math.random() * 40 + 50),
                Math.ceil(Math.random() * levelCounter),
            ];
            createCharacter(i, stats, enemyCharacters, "enemy");
            const newRandomRobot = randomRobotBody();
            enemyCharacters[i].setRobotParts(
                newRandomRobot[0],
                newRandomRobot[1],
                newRandomRobot[2]
            );
            enemyCharacters[i].changeElement(element);
            uIRobotCreator(enemyCharacters[i], "enemyAvatarWrap");
            enemyCharacters[i].levelUp(levelCounter)
        }
        attackAndRunButtons(false);
        saveCurrentGame.disabled = true;
        isEnemyFind = true;
    }
}
//TERMINA AQUI 

// ALLIED CHARACTERS

// Borra el personaje aliado cuando es destruido.
// Función que se usará en el proyecto final. 

function captureAlly(enemy) {

    const captureSuccess = Math.ceil(Math.random() * 100) > 70;
    // Si la captura es un éxito entonces crea el aliado y lo imprime en pantalla.
    if (captureSuccess && !isCompanion) {

        const stats = [
            enemy.turn,
            enemy.maxHp,
            enemy.maxHp,
            enemy.attack,
            enemy.defense,
            enemy.level,
        ];
        createCharacter("partner", stats, myCharacters, "ally");

        myCharacters[1].setRobotParts(
            enemy.head,
            enemy.torso,
            enemy.legs,
        );
        myCharacters[1].changeElement(enemy.element);
        uIRobotCreator(myCharacters[1], "allyAvatarWrap");
        isCompanion = true;
    }
}

//TERMINA AQUI

// UI ALLY AND ENEMY HTML CREATOR

// Genera la UI de aliados y enemigos
function generateCharacterUI(id, className) {
    const container = document.getElementById(id);
    container.innerHTML += `<div class="${className}" id="${className}"> </div>`;
}

//Genera el HTML del personaje aliado o enemigo
function uIRobotCreator(character, containerId) {

    const idx = character.id;
    const container = document.getElementById(containerId);

    const robotIdDiv = "robot_div_" + idx;
    const robotIdArray = [
        "robot_lvl_id_reprinteable_" + idx,
        "robot_hp_id_reprinteable_" + idx,
        "robot_turn_id_reprinteable_" + idx,
        "robot_attack_id_reprinteable_" + idx,
        "robot_defense_id_reprinteable_" + idx,
    ];

    const robotAvatarParts = [
        "avatarRobotHead_" + idx,
        "avatarRobotTorso_" + idx,
        "avatarRobotLeg_" + idx,
    ];

    const otherElementUI = "otherElementUI_" + idx;

    container.innerHTML += `
        <div class="otherIdController statsAndAvatarWrap" id=${robotIdDiv}>
            <div class="otherStatsUIWrap" id="otherStatsUIWrap">
                <div> 
                    <div class="otherRobotStatsUi" id=${otherElementUI} ></div>
                    <div><div class="otherRobotStatsUi">Lv:</div><span class="lvlOtherAvatarMargin" id=${robotIdArray[0]}>${character.level}</span></div>
                    <div><div class="otherRobotStatsUi robotHpUi" ></div><span id=${robotIdArray[1]}>${character.hp}</span></div>
                </div>
                <div> 
                    <div><div class="otherRobotStatsUi robotTurnUi"></div><span id=${robotIdArray[2]}>${character.turn}</span></div>
                    <div><div class="otherRobotStatsUi robotAttackUi"></div><span id=${robotIdArray[3]}>${character.attack}</span></div>
                    <div><div class="otherRobotStatsUi robotDefenseUi"></div><span id=${robotIdArray[4]}>${character.defense}</span></div>
                </div>
            </div>
            <div class="uIOtherRobotAvatar">
                <div class="uIOtherAvatarRobotHead" id=${robotAvatarParts[0]}> </div>
                <div class="uIOtherAvatarRobotTorso" id=${robotAvatarParts[1]}> </div>
                <div class="uIOtherAvatarRobotLeg" id=${robotAvatarParts[2]}> </div>
            </div>
        </div>
    `
    const enemyElementImage = document.getElementById(otherElementUI)
    enemyElementImage.style.backgroundImage = `url(${elementMatch(character)})`;

    robotAvatarBuilder(character.head, robotAvatarParts[0]);
    robotAvatarBuilder(character.torso, robotAvatarParts[1]);
    robotAvatarBuilder(character.legs, robotAvatarParts[2]);
}
//TERMINA AQUI

// UI ACTIONS

// Permite eliminar un enemigo de la array de los enemigos y lo borra de la UI. 
function deleteCharacters(idx, character, array) {
    array.splice(idx, 1);
    const container = document.getElementById("robot_div_" + character.id);
    container.remove();
}

// Elimina a todos los personajes enemigos y limpia toda la UI de la zona de los enemigos.
function clearAllEnemiesCharacters() {
    enemyCharacters = [];
    const container = document.getElementById("enemyAvatarWrap");
    container.innerHTML = "";
    attackAndRunButtons(true);
    saveCurrentGame.disabled = false;
    isEnemyFind = false;
}
//TERMINA AQUI
