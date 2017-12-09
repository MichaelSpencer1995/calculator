// states
var currentValue ='';
var solved = '';
var stateSolved = false;

//  elements 
var buttons = document.getElementsByClassName('numbers');
var ac = document.getElementById('ac');
var decimal = document.getElementById('decimal');

// listeners 
decimal.addEventListener('click', handleDecimal);
ac.addEventListener('click', allClear);
window.addEventListener('keydown', findWhichKey, false);

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleNumber);
}

// functions 
function findWhichKey(key) {
    if(key.keyCode == '96' || key.keyCode == '48') {
        handleNumber.call(buttons[13]); // 0

    } else if(key.keyCode == '99' || key.keyCode == '51') {
        handleNumber.call(buttons[12]); // 3
        
    } else if(key.keyCode == '98' || key.keyCode == '50') {
        handleNumber.call(buttons[11]); // 2

    } else if(key.keyCode == '97' || key.keyCode == '49') {
        handleNumber.call(buttons[10]); // 1

    } else if(key.keyCode == '107') {
        handleNumber.call(buttons[9]); //plus

    } else if(key.keyCode == '102' || key.keyCode == '54') {
        handleNumber.call(buttons[8]); // 6

    } else if(key.keyCode == '101' || key.keyCode == '53') {
        handleNumber.call(buttons[7]); // 5

    } else if(key.keyCode == '100' || key.keyCode == '52') {
        handleNumber.call(buttons[6]); // 4

    } else if(key.keyCode == '109') {
        handleNumber.call(buttons[5]); // minus

    } else if(key.keyCode == '105' || key.keyCode == '57') {
        handleNumber.call(buttons[4]); // 9

    } else if(key.keyCode == '104' || key.keyCode == '58') {
        handleNumber.call(buttons[3]); // 8
        
    } else if(key.keyCode == '103' || key.keyCode == '59') {
        handleNumber.call(buttons[2]); // 7
        
    } else if(key.keyCode == '106') {
        handleNumber.call(buttons[1]); // multiply
        
    } else if(key.keyCode =='111') {
        handleNumber.call(buttons[0]); // divide
        
    } else if(key.keyCode == '110') {
        handleDecimal(); // decimal
        
    } else if(key.keyCode =='13') {
        calc(); // calculate
        
    } else if(key.keyCode == '187') {
        allClear(); // calculate
        
    } else if(key.keyCode == '8') {
        clear(); // calculate
        
    }
}



function handleNumber () {
    var print = this.textContent;
    
    if(print.match(/[+|\-|\/|*]/)) {
        var lastWasOperator = miniDisplay.value[miniDisplay.value.length-1].match(/[+|\-|\/|*]/);
        var isEmptyDisplay = miniDisplay.value.length === 0;
        

        if(isEmptyDisplay || lastWasOperator) {
            stateSolved = false;
            console.log('empty display or last was operator so cant print operator // return');
            return; // wont print
            
        } else {
            console.log('clearscreen for operator?');
            display.value = '';
            stateSolved = false;
        }
        
    } else {
        var notSolved = solved !== '';
        var displayEmpty = display.value === '';
        if(notSolved && displayEmpty) { //its probably this
            stateSolved = false;
            console.log('nothing solved and empty display input / all clear');
            allClear();

        }

    }

    // currentValue.toString() = display.value;
    console.log('passed')
    miniDisplay.value += print;
    display.value += print;
    currentValue = display.value;
    stateSolved = false;
}

// handle decimal


function handleDecimal () {
    var hasDecimal = currentValue.indexOf('.') >= 0;
    if(stateSolved) {
        console.log('it ran');
        allClear();
        stateSolved = false;
    } else if(hasDecimal) {
        console.log('current value has decimal return');
        stateSolved = false;
        return;

    } else {
        console.log('add . to display and mini and current value set equal to display');
        display.value += '.';
        miniDisplay.value += '.';
        currentValue = display.value;
        stateSolved = false;
    }
}


// clear

var ce = document.getElementById('ce');
ce.addEventListener('click', clear);

function clear() {
    if(miniDisplay.value !== solved.toString()) {
        console.log('clear( if mini display value !== solved.toString');
        display.value = display.value.slice(0, display.value.length-1);
        miniDisplay.value = miniDisplay.value.slice(0, miniDisplay.value.length-1);
        currentValue = display.value;
        stateSolved = false;
    }
}


// all clear


function allClear() {
    console.log('allClear( solved display mini and current reset')
    solved = '';
    display.value = '';
    miniDisplay.value = '';
    currentValue = '';
    stateSolved = false;
}

// calculate

var equals = document.getElementById('equals');
equals.addEventListener('click', calc);

function calc() {
    var lastWasOperator = miniDisplay.value[miniDisplay.value.length-1].match(/[+|\-|\/|*]/);
   
    if(lastWasOperator) {
        console.log('last was operator cant solve')
        return;

    }
    console.log('passed, eval mini set to solve, display and current val reset state set to solved')
    solved = eval(miniDisplay.value);
    miniDisplay.value = solved;
    display.value = '';
    currentValue = '';
    stateSolved = true;
}