
var buttons = document.getElementsByClassName('btn');

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleButton);
    
}

var solvedValue = '';
var currentNumber = '';

window.addEventListener('keypress', findWhichKey);

function findWhichKey(key) {
    if(key.keyCode == '96' || key.keyCode == '48') {
        handleButton.call(buttons[13]); // 0

    } else if(key.keyCode == '99' || key.keyCode == '51') {
        handleButton.call(buttons[12]); // 3
        
    } else if(key.keyCode == '98' || key.keyCode == '50') {
        handleButton.call(buttons[11]); // 2

    } else if(key.keyCode == '97' || key.keyCode == '49') {
        handleButton.call(buttons[10]); // 1

    } else if(key.keyCode == '107') {
        handleButton.call(buttons[9]); //plus

    } else if(key.keyCode == '102' || key.keyCode == '54') {
        handleButton.call(buttons[8]); // 6

    } else if(key.keyCode == '101' || key.keyCode == '53') {
        handleButton.call(buttons[7]); // 5

    } else if(key.keyCode == '100' || key.keyCode == '52') {
        handleButton.call(buttons[6]); // 4

    } else if(key.keyCode == '109') {
        handleButton.call(buttons[5]); // minus

    } else if(key.keyCode == '105' || key.keyCode == '57') {
        handleButton.call(buttons[4]); // 9

    } else if(key.keyCode == '104' || key.keyCode == '58') {
        handleButton.call(buttons[3]); // 8
        
    } else if(key.keyCode == '103' || key.keyCode == '59') {
        handleButton.call(buttons[2]); // 7
        
    } else if(key.keyCode == '106') {
        handleButton.call(buttons[1]); // multiply
        
    } else if(key.keyCode =='111') {
        handleButton.call(buttons[0]); // divide
        
    } else if(key.keyCode == '110') {
        handleButton(); // decimal
        
    } else if(key.keyCode =='13') {
        handleButton(); // calculate
        
    } else if(key.keyCode == '187') {
        handleButton(); // calculate
        
    } else if(key.keyCode == '8') {
        handleButton(); // calculate
        
    }
}

console.log(buttons);



function handleButton () {
    // updateVariables();
    document.getElementById("miniDisplay").scrollTop = document.getElementById("miniDisplay").scrollHeight;
    document.getElementById("display").scrollTop = document.getElementById("display").scrollHeight;
   
    var character = this.textContent;
    
    var isNumerical = character.match(/[0-9]/);
    var isOperator = character.match(/[+|\-|\/|*]/);
    var isDecimal = character.match(/\./);
    var isBackspace = character.match('CE');
    var isClearAll = character.match('AC');
    var isEquals = character.match('=');
    
    var latestNumbers = miniDisplay.value.replace(/\+/g, ' + ').replace(/-/g, ' - ').replace(/\*/g, ' * ').replace(/\//g, ' / ').split(' ');

    console.log('latest numbers: ' + latestNumbers);

    if (isNumerical) {
        handleNumber(isNumerical);
        
    } else if (isOperator) {
        handleOperator(isOperator, latestNumbers);

    } else if (isDecimal) {
        handleDecimal(latestNumbers);

    } else if (isBackspace) {
        handleBackspace();

    } else if (isClearAll) {
        handleClearAll();

    } else if (isEquals) {
        handleEquals(latestNumbers);

    } else {
        console.log('error');

    }
    console.log('happens every click');
}



    
// handle number
function handleNumber(numberToPrint) {

    var triesRedundantZero = display.value === '0' && numberToPrint[0] === '0';
    var lastWasOperator = display.value.match(/[+|\-|\/|*]/);
    var wantsNewEquation = miniDisplay.value === solvedValue.toString();

    if (wantsNewEquation) {
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

    console.log('current number: ' + currentNumber);

}


// handle operator
function handleOperator(operatorToPrint, numberArr) {
    
    var lastWasOperator = display.value.match(/[+|\-|\/|*]/) || miniDisplay.value[miniDisplay.value.length-1].match(/[+|\-|\/|*]/);
    var displayEmpty = display.value === '';
    var triesToSendDecimal = currentNumber.indexOf('.') === currentNumber.length-1;
    var currentNumberNotEmpty = currentNumber !== '';
    var latestSolveOnScreen = solvedValue.toString() === miniDisplay.value;


    if (lastWasOperator || miniDisplay.value === '') {
        console.log('last was operator or display was empty/failed');
        return; 
        
    } else if (displayEmpty) {
        if(latestSolveOnScreen || solvedValue === '') {
            //you're ok

        } else {
            console.log('fail');
            return;

        }

    } else if (triesToSendDecimal && currentNumberNotEmpty) {
        console.log("can't send lone decimal as number");
        return;

    } 

    display.value = operatorToPrint;
    miniDisplay.value += operatorToPrint;
    currentNumber = numberArr[numberArr.length-1];
    // currentNumber = '';

    console.log('passed/printed operator');

}


// handle decimal
function handleDecimal(numberArr) {
    console.log('current number is: ' + currentNumber);

    var triesExtraDecimal = numberArr[numberArr.length-1].indexOf('.') >= 0;
    var lastWasOperator = display.value.match(/[+|\-|\/|*]/);
    var latestSolveOnScreen = solvedValue.toString() === miniDisplay.value;

    if (latestSolveOnScreen) {
        console.log("state was solved, new equation");
        handleClearAll();

    } else if (lastWasOperator) {
        console.log('last was operator, clear display for decimal');
        display.value = '';

    } else if (triesExtraDecimal) {
        console.log('current number has decimal/failed');
        return;
    }

    display.value += '.';
    miniDisplay.value += '.';
    currentNumber = display.value;
}


// handle backspace
function handleBackspace() {
    var triesToEraseSolved = miniDisplay.value === solvedValue.toString();

    if (triesToEraseSolved && solvedValue !== '') {
        console.log('dont erase solved value');
        return;
    }

    display.value = display.value.slice(0, display.value.length-1);
    miniDisplay.value = miniDisplay.value.slice(0, miniDisplay.value.length-1);
    
    currentNumber = display.value;
    console.log('current number: ' + currentNumber);
}


// handle clear all
function handleClearAll() {
    display.value = '';
    miniDisplay.value = '';
    currentNumber = '';
    solvedValue = '';
    console.log('handleClearAll ran!');

}


// handle equals
function handleEquals(latestNumbers) {
    // format numbers
    var formattedBlocks = [];
    var formattedEquation;

    for (var i = 0; i < latestNumbers.length; i++) {
        var firstIsZeroButNotZero = latestNumbers[i][0] === '0' && latestNumbers[i].length > 2;

        if(firstIsZeroButNotZero) {
            var formattedNumber = latestNumbers[i].slice(1, latestNumbers[i].length);

            formattedBlocks.push(formattedNumber);
            
        } else {

            formattedBlocks.push(latestNumbers[i]);
        }
    }

    formattedEquation = formattedBlocks.join('');

    console.log('formatted equation: ' + formattedEquation);
    // calculate

    // currentNumber = '';
    currentNumber = latestNumbers[latestNumbers.length-1];
    solvedValue = eval(formattedEquation);
    display.value = '';
    miniDisplay.value = solvedValue;

    console.log('current number is: ' + currentNumber);
    console.log(solvedValue);

    // universe broken
    if(solvedValue === undefined) {
        handleClearAll();

    } else if (solvedValue === Infinity || isNaN(solvedValue || solvedValue === '-Infinity' )) {
        miniDisplay.value ="UNIVERSE BROKEN!";
        display.value = 'ERROR';
        
    }

}

