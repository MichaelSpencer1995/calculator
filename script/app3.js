var buttons = document.getElementsByClassName('btn');

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleButton);

}

console.log(buttons);

var currentDisplay;
var currentMiniDisplay;
var mostRecentSolve;
var lastButtonWasEquals = false;

function handleButton () {
    
    lastButtonWasEquals = false;


    var character = this.textContent;
    
    var isNumerical = character.match(/[0-9]/);
    var isOperator = character.match(/[+|\-|\/|*]/);
    var isDecimal = character.match(/\./);
    var isBackspace = character.match('CE');
    var isClearAll = character.match('AC');
    var isEquals = character.match('=');

    
    if (isNumerical) {
        handleNumber(isNumerical);
        
    } else if (isOperator) {
        handleOperator(isOperator);

    } else if (isDecimal) {
        handleDecimal();

    } else if (isBackspace) {
        handleBackspace(isBackspace);

    } else if (isClearAll) {
        handleClearAll(isClearAll);

    } else if (isEquals) {
        handleEquals(isEquals);

    } else {
        console.log('error');

    }

}


// handle number
function handleNumber(numberToPrint) {
    
        var triesRedundantZero = display.value === '0' && numberToPrint[0] === '0';
        var lastWasOperator = display.value.match(/[+|\-|\/|*]/);
    
        if (miniDisplay.value === solvedValue.toString()) {
            console.log("state was solved, new equation");
            handleClearAll();
    
        } else if (triesRedundantZero) {
            console.log('tried redundant zero/failed');
            return;
    
        } else if (lastWasOperator) {
            console.log('last was operator, clear display for number');
            display.value = '';
    
        }
    
        display.value += numberToPrint;
        miniDisplay.value += numberToPrint;
        currentNumber = display.value;
        stateSolved = false;
    
        console.log('passed/printed number');
        console.log('current number: ' + currentNumber);
    
    }
    