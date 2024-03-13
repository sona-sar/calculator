class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const numericValue = parseFloat(stringNumber);
      
        if (isNaN(numericValue)) {
          return '';
        }
      
        // Check if the absolute value of the number is greater than or equal to 1e12
        if (Math.abs(numericValue) >= 1e12) {
          return numericValue.toExponential(1);
        }
      
        const integerDigits = parseInt(stringNumber.split('.')[0]);
        const formattedInteger = integerDigits.toLocaleString('en', {
          maximumFractionDigits: 0,
        });
      
        const decimalDigits = stringNumber.split('.')[1];
      
        if (decimalDigits != null) {
          return `${formattedInteger}.${decimalDigits}`;
        } else {
          return formattedInteger;
        }
      }
    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = "";

    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
        if(this.currentOperand.toString().length < 12){
            if(number === '.' && this.currentOperand.includes('.')) return
            this.currentOperand = this.currentOperand.toString()+number.toString()
        }
        
    }
    chooseOperation(operation){
        if(this.currentOperand ==='') return
        if(this.previousOperand!== ''){
            this.compute();
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
         let computation
         const prev = parseFloat(this.previousOperand)
         const current = parseFloat(this.currentOperand)
         if(isNaN(prev) || isNaN(current)) return 

         switch(this.operation){
            case '+':
                computation = prev+current
                break
            case '-':
                computation = prev-current
                break
            case '×':
                computation = prev*current
                break
            case '÷':
                computation = prev/current
                break
            case '^':
                computation = Math.pow(prev, current)
                break;

            default:
                return
         }
         this.currentOperand = computation;
         this.operation = undefined;
         this.previousOperand = '';
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation!=null){
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else{
            this.previousOperandTextElement.innerText = ''
        }
        
        

    }


}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const acButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay();
        
        
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

acButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})