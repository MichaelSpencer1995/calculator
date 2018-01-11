var buttons = document.getElementsByClassName('btn'); 
var solvedValue = ''; // start with solved blank so backspace can function
var numbers = [];
var formattedBlocks = [];
var currentNumber;

for (var i = 0; i < buttons.length; i++) { // create buttons
    buttons[i].addEventListener('click', handleButton);
    
}


function updateLatestNums() { //upadate formatted blocks and numbers every button click
    formattedBlocks = miniDisplay.value.replace(/\+/g, '+ ').replace(/\-/g, '- ').replace(/\//g, '/ ').replace(/\*/g, '* ').split(' ').filter(function(val) {return val !== ''});
    numbers = miniDisplay.value.replace(/\+/g, ' ').replace(/\-/g, ' ').replace(/\//g, ' ').replace(/\*/g, ' ').split(' ').filter(function(val) {return val !== ''});
    console.log(formattedBlocks);
    console.log(numbers);
}


function print(x) { // print
    display.value += x;
    miniDisplay.value += x;

}


function handleButton () { // handle button click
    var toPrint = this.textContent;
    var isNumerical = toPrint.match(/[0-9]/);
    var isOperator = toPrint.match(/[+|\-|\/|*]/);
    var isDecimal = toPrint.match(/\./);
    var isBackspace = toPrint.match('CE');
    var isClearAll = toPrint.match('AC');
    var isEquals = toPrint.match('=');
    
    if (isNumerical) {
        handleNumber(toPrint);

    } else if (isOperator) {
        handleOperator(toPrint);
    
    } else if (isDecimal) {
        handleDecimal();
        
    } else if (isBackspace) {
        handleBackspace();
        
    } else if (isClearAll) {
        handleClearAll();
        
    } else if (isEquals) {
        handleEquals();
        
    }
 
    updatedNumbers = updateLatestNums();    // update after every click
    
}


function handleNumber(numberToPrint) { // handle number
    var triesRedundantZero =  display.value === '0' && numberToPrint[0] === '0';
    var lastWasOperator =  formattedBlocks[formattedBlocks.length-1] && formattedBlocks[formattedBlocks.length-1].match(/[+|\-|\/|*]/);
    var wantsNewEquation = miniDisplay.value === solvedValue.toString();
    
    if (wantsNewEquation) {
        handleClearAll();

    } else if (triesRedundantZero) {
        return;

    } else if (lastWasOperator) {
        display.value = '';

    }

    print(numberToPrint);

}


function handleOperator(operatorToPrint) { // handle operator
    var lastWasOperator = formattedBlocks[formattedBlocks.length-1].match(/[+|\-|\/|*]/);
    var displayEmpty = display.value === '';
    var triesToSendDecimal = numbers[numbers.length-1] === '.';
    var currentNumberNotEmpty = numbers[numbers.length-1] !== '';
    var latestSolveOnScreen = solvedValue.toString() === miniDisplay.value;

    if (lastWasOperator || miniDisplay.value === '') {
        return; 
        
    } else if (displayEmpty) {
        if(latestSolveOnScreen || solvedValue === '') { 
            //you're ok

        } else {
            return;

        }

    } else if (triesToSendDecimal && currentNumberNotEmpty) {
        return;

    } 

    print(operatorToPrint);

}


function handleDecimal() { // handle decimal
    var triesExtraDecimal = formattedBlocks[formattedBlocks.length-1] && formattedBlocks[formattedBlocks.length-1].indexOf('.') >= 0;
    var blockHasOperator = formattedBlocks[formattedBlocks.length-1] && (formattedBlocks[formattedBlocks.length-1].indexOf('+') >= 0 || formattedBlocks[formattedBlocks.length-1].indexOf('-') >= 0 || formattedBlocks[formattedBlocks.length-1].indexOf('/') >= 0 || formattedBlocks[formattedBlocks.length-1].indexOf('*') >= 0);
    var lastWasOperator = display.value.match(/[+|\-|\/|*]/);
    var latestSolveOnScreen = solvedValue.toString() === miniDisplay.value;

    if (latestSolveOnScreen) {
        handleClearAll();

    } else if (lastWasOperator) {
        display.value = '';  //clear screen for operator

    } else if (triesExtraDecimal) {
        if(blockHasOperator) { //this is b/c it thinks the last formatted block is the current number
            // you're ok

        } else {
            return;

        }

    }

    print('.');

}


function handleBackspace() { // handle backspace
    var triesToEraseSolved = miniDisplay.value === solvedValue.toString();

    if (triesToEraseSolved && solvedValue !== '') {
        console.log('dont erase solved value');
        return;

    }

    display.value = display.value.slice(0, display.value.length-1);
    miniDisplay.value = miniDisplay.value.slice(0, miniDisplay.value.length-1);
    
}


function handleClearAll() { // handle clear all
    display.value = '';
    miniDisplay.value = '';
    solvedValue = '';

}


function handleEquals() { // handle equals
    var formattedNumbers = [];

    for (var i = 0; i < formattedBlocks.length; i++) {
        var firstIsZeroButNotZero = formattedBlocks[i][0] === '0' && formattedBlocks[i].length > 2;

        if(firstIsZeroButNotZero) {
            var formattedNumber = formattedBlocks[i].slice(1, formattedBlocks[i].length);

            formattedNumbers.push(formattedNumber);
            
        } else {
            formattedNumbers.push(formattedBlocks[i]);

        }
    }

    formattedEquation = formattedNumbers.join(''); 

    solvedValue = eval(formattedEquation);     // calculate
    display.value = '';
    miniDisplay.value = solvedValue;

    if(solvedValue === undefined) {     // universe broken
        handleClearAll();

    } else if (solvedValue === Infinity || isNaN(solvedValue)) {
        miniDisplay.value ="UNIVERSE BROKEN!";
        display.value = 'ERROR';
        
    }

}



