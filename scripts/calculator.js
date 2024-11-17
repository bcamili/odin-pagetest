const calc = document.getElementById("calculator");

const calculator = document.createElement("div");
calc.appendChild(calculator);
calculator.style.width = "400px";
calculator.style.height = "500px";
calculator.style.background = "lightgrey";

const upper = document.createElement("div");
calculator.appendChild(upper);
upper.style.display = "flex";
upper.style.justifyContent = "center";

const display = document.createElement("div");
display.id = "calculatorDisplay";
upper.appendChild(display);

//max. "9999999999"
updateDisplay("0");

const lower = document.createElement("div");
lower.id = "numPad"
calculator.appendChild(lower);

const buttonList = [    "1" , "2" , "3" , "/" ,
                        "4" , "5" , "6" , "*" ,
                        "7" , "8" , "9" , "-" ,
                        "0" , "." , "+" , " " ,
                        "C" , "%" , "+/-" , "="  ];

const buttonLayout = [];

for(let i = 0; i<5;i++){
    const rowDiv = document.createElement("div");
    rowDiv.style.display = "flex";
    const rowLayout = [];

    for(let j=0; j<4;j++){
        if(i==3 && j==3){
            break
        }
        const button = createCalculatorButton(buttonList[i*4 + j]);
        rowDiv.appendChild(button);
        rowLayout.push(button);
    }

    lower.appendChild(rowDiv);
    buttonLayout.push(rowLayout);
}

let toDisplay = 0;
let firstOperand = true;
let secondOperand = false;
let divisionByZero = false;
let decimal = false;
let operation = [];

// ---- Functions ---- //

function createCalculatorButton(name){
    let newButton = document.createElement("div");
    newButton.classList.add("calcButton");
    newButton.id = "button-" + name;
    newButton.textContent = name;
    if(Number(name) >= 0){
        newButton.addEventListener("click", function () {
            if((toDisplay == 0 || firstOperand || secondOperand)&&!decimal){
                toDisplay = name;
                firstOperand = false;
                secondOperand = false;
            }else{
                toDisplay+=name;
            }
            updateDisplay(toDisplay);
        });
    }else if(name=="C"){
        newButton.addEventListener("click", function () {
            toDisplay = 0;
            firstOperand = true;
            secondOperand = false;
            divisionByZero = false;
            decimal = false;
            operation = [];
            updateDisplay(toDisplay);
        });
    }else if(name=="."){
        newButton.addEventListener("click", function () {
            if(!decimal){
                toDisplay += name;
                decimal=true;
                updateDisplay(toDisplay);
            }
        });
    }else if(name=="+/-"){
        newButton.addEventListener("click", function () {
            toDisplay *= -1;
            updateDisplay(toDisplay);
        });
    }else if(name =="%"){
        newButton.addEventListener("click", function () {
            toDisplay/=100;
            updateDisplay(toDisplay);
        })
    }else if(name=="="){
        newButton.addEventListener("click", function () {
            if(!secondOperand){
                operation.push(Number(toDisplay));
            }

            if(operation.length == 3){
                toDisplay = operate()
                if(divisionByZero){
                    updateDisplay("ERROR");
                    toDisplay = 0;
                    operation = [];
                    secondOperand = false;
                    divisionByZero = false;
                }else{
                    updateDisplay(toDisplay);
                    operation = [];
                    firstOperand = true;
                    secondOperand = false;
                }
            }else{
                toDisplay = Number(display.textContent);
                updateDisplay(toDisplay);
                operation = [];
                secondOperand = false;
            }
        });
    }else{
        newButton.addEventListener("click", function () {
            if(operation.length == 0){
                operation.push(Number(toDisplay));
                operation.push(name);
                secondOperand = true;
            }else{
                operation.push(Number(toDisplay));
                toDisplay  = operate();
                updateDisplay(toDisplay);
                operation = [];
                operation.push(Number(toDisplay));
                operation.push(name);
                secondOperand = true;
            }
        });
    }
    return newButton;
}

function operate(){
    if(operation[1] == "+"){
        let result = operation[0] + operation[2];
        if(result-Math.floor(result)!=0){
            decimal = true;
        }
        return result;
    }
    else if(operation[1] == "-"){
        let result =  operation[0] - operation[2];
        if(result-Math.floor(result)!=0){
            decimal = true;
        }
        return result;
    }
    else if(operation[1] == "*"){
        let result =  operation[0] * operation[2];
        if(result-Math.floor(result)!=0){
            decimal = true;
        }
        return result;
    }
    else{
        if(operation[2]>0){
            let result =  operation[0] / operation[2];
            if(result-Math.floor(result)!=0){
                decimal = true;
            }
            return result;
        }else{
            divisionByZero = true;
        }
    }
}

function updateDisplay(toDisplay){
    display.textContent=toDisplay;
    adjustFontSize(display)
}

function adjustFontSize(container) {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const content = container.textContent;
  
    let fontSize = parseInt(window.getComputedStyle(container).fontSize, 10);
  
    container.style.fontSize = `${fontSize}px`;
  
    while (
      (container.scrollWidth > containerWidth || container.scrollHeight > containerHeight) &&
      fontSize > 10 /* Minimum font size */
    ) {
      fontSize--;
      container.style.fontSize = `${fontSize}px`;
    }

    while (
        container.scrollWidth <= containerWidth &&
        container.scrollHeight <= containerHeight &&
        fontSize < 70
      ) {
        fontSize++;
        container.style.fontSize = `${fontSize}px`;
    
        // Break if adding more causes overflow
        if (container.scrollWidth > containerWidth || container.scrollHeight > containerHeight) {
          fontSize--;
          container.style.fontSize = `${fontSize}px`;
          break;
        }
      }
}